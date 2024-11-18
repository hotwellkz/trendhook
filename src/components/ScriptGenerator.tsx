import React, { useState, useEffect } from 'react';
import { aiService } from '../services/ai';
import { useAuth } from '../hooks/useAuth';
import { AlertCircle, Loader2 } from 'lucide-react';
import { updateDoc, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

export function ScriptGenerator() {
  const { user } = useAuth();
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState(60);
  const [style, setStyle] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [objective, setObjective] = useState('');
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [error, setError] = useState('');
  const [tokens, setTokens] = useState(0);

  // Подписываемся на обновления токенов пользователя
  useEffect(() => {
    if (!user?.id) return;

    const unsubscribe = onSnapshot(
      doc(db, 'users', user.id),
      (doc) => {
        const userData = doc.data();
        setTokens(userData?.subscription?.tokensLeft || 0);
      },
      (error) => {
        console.error('Error subscribing to tokens:', error);
      }
    );

    return () => unsubscribe();
  }, [user?.id]);

  const checkTokens = async () => {
    if (!user?.id) {
      setError('Пожалуйста, войдите в систему');
      return false;
    }

    try {
      const userRef = doc(db, 'users', user.id);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        setError('Данные пользователя не найдены');
        return false;
      }

      const userData = userDoc.data();
      
      if (!userData?.subscription) {
        setError('Подписка не найдена');
        return false;
      }

      if (userData.subscription.tokensLeft <= 0) {
        setError('У вас закончились токены. Пожалуйста, обновите подписку');
        return false;
      }

      return true;
    } catch (err) {
      console.error('Error checking tokens:', err);
      setError('Не удалось проверить токены. Пожалуйста, попробуйте позже');
      return false;
    }
  };

  const updateTokens = async () => {
    if (!user?.id) return;

    try {
      const userRef = doc(db, 'users', user.id);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        throw new Error('Данные пользователя не найдены');
      }

      const userData = userDoc.data();
      const currentTokens = userData?.subscription?.tokensLeft;

      if (typeof currentTokens !== 'number' || currentTokens <= 0) {
        throw new Error('Недостаточно токенов');
      }

      await updateDoc(userRef, {
        'subscription.tokensLeft': currentTokens - 1,
        'subscription.lastUpdated': new Date()
      });

      return true;
    } catch (err) {
      console.error('Error updating tokens:', err);
      throw new Error(
        err instanceof Error 
          ? err.message 
          : 'Ошибка при обновлении токенов'
      );
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setScript('');
    setAnalysis('');
    
    if (!user?.id) {
      setError('Необходима авторизация');
      return;
    }

    try {
      const hasTokens = await checkTokens();
      if (!hasTokens) return;

      setLoading(true);
      
      // Генерируем сценарий
      const generatedScript = await aiService.generateScript({
        topic,
        duration,
        style,
        targetAudience,
        objective
      });
      
      if (!generatedScript) {
        throw new Error('Не удалось сгенерировать сценарий');
      }

      // Обновляем токены до установки результата
      await updateTokens();

      setScript(generatedScript);
      
      // Анализируем потенциал
      const viralAnalysis = await aiService.analyzeViralPotential(generatedScript);
      if (viralAnalysis) {
        setAnalysis(viralAnalysis);
      }
      
    } catch (err) {
      console.error('Generation error:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Произошла ошибка при генерации сценария'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="bg-red-500/10 text-red-500 p-4 rounded-lg flex items-center justify-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>Пожалуйста, войдите в систему, чтобы использовать генератор сценариев</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Генератор сценариев</h2>
        <div className="text-sm text-gray-400">
          Осталось токенов: <span className="text-[#AAFF00]">{tokens}</span>
        </div>
      </div>
      
      <form onSubmit={handleGenerate} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Тема видео
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full bg-black/20 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50"
            placeholder="Например: Как начать инвестировать"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Длительность (секунды)
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            min="15"
            max="180"
            className="w-full bg-black/20 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Стиль
          </label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full bg-black/20 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50"
            required
            disabled={loading}
          >
            <option value="">Выберите стиль</option>
            <option value="educational">Обучающий</option>
            <option value="entertaining">Развлекательный</option>
            <option value="motivational">Мотивационный</option>
            <option value="storytelling">Сторителлинг</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Целевая аудитория
          </label>
          <input
            type="text"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            className="w-full bg-black/20 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50"
            placeholder="Например: Начинающие инвесторы 25-35 лет"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Цель видео
          </label>
          <select
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="w-full bg-black/20 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50"
            required
            disabled={loading}
          >
            <option value="">Выберите цель</option>
            <option value="awareness">Повышение узнаваемости</option>
            <option value="engagement">Вовлечение аудитории</option>
            <option value="conversion">Конверсия</option>
            <option value="education">Обучение</option>
          </select>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-500 p-4 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#AAFF00] text-black py-2.5 rounded-lg font-medium hover:bg-[#88CC00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Генерация...</span>
            </>
          ) : (
            'Сгенерировать сценарий'
          )}
        </button>
      </form>

      {script && (
        <div className="space-y-6">
          <div className="bg-gray-800/30 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Сценарий</h3>
            <pre className="whitespace-pre-wrap text-gray-300 font-mono text-sm">{script}</pre>
          </div>

          {analysis && (
            <div className="bg-gray-800/30 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Анализ вирусного потенциала</h3>
              <pre className="whitespace-pre-wrap text-gray-300 font-mono text-sm">{analysis}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
