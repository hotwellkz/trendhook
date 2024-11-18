import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { aiService } from '../../services/ai';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { incrementScriptCount } from '../../services/firestore';
import { FormInput } from './FormInput';
import { ErrorMessage } from './ErrorMessage';
import { GenerateButton } from './GenerateButton';
import { ScriptResult } from './ScriptResult';

export function ScriptGenerator() {
  const { user } = useAuth();
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('60');
  const [style, setStyle] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [objective, setObjective] = useState('');
  const [script, setScript] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkTokens = async () => {
    if (!user?.subscription?.tokensLeft) {
      setError('У вас закончились токены. Пожалуйста, обновите подписку.');
      return false;
    }
    return true;
  };

  const updateTokens = async () => {
    if (!user?.id) return;

    const userRef = doc(db, 'users', user.id);
    await updateDoc(userRef, {
      'subscription.tokensLeft': (user.subscription?.tokensLeft || 0) - 1,
      'subscription.lastUpdated': new Date()
    });
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
      
      const generatedScript = await aiService.generateScript({
        topic,
        duration: parseInt(duration),
        style,
        targetAudience,
        objective
      });
      
      if (!generatedScript) {
        throw new Error('Не удалось сгенерировать сценарий');
      }

      await Promise.all([
        updateTokens(),
        incrementScriptCount(user.id)
      ]);

      setScript(generatedScript);
      
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

  return (
    <div className="bg-gray-800/30 rounded-xl p-6 mt-8">
      <form onSubmit={handleGenerate} className="space-y-6">
        <FormInput
          label="Тема видео"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="О чем будет ваше видео?"
          required
          disabled={loading}
        />

        <FormInput
          label="Длительность (в секундах)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          min="15"
          max="180"
          required
          disabled={loading}
        />

        <FormInput
          label="Стиль"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          placeholder="Например: информативный, развлекательный, обучающий"
          required
          disabled={loading}
        />

        <FormInput
          label="Целевая аудитория"
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          placeholder="Кто ваша целевая аудитория?"
          required
          disabled={loading}
        />

        <FormInput
          label="Цель"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          placeholder="Какой результат вы хотите получить?"
          required
          disabled={loading}
        />

        {error && <ErrorMessage message={error} />}

        <GenerateButton loading={loading} />
      </form>

      {script && <ScriptResult script={script} analysis={analysis} />}
    </div>
  );
}
