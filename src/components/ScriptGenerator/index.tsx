import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { aiService } from '../../services/ai';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { incrementScriptCount, saveScript } from '../../services/firestore';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { ErrorMessage } from './ErrorMessage';
import { GenerateButton } from './GenerateButton';
import { ScriptResult } from './ScriptResult';
import { Coins } from 'lucide-react';

const STYLE_OPTIONS = [
  'Обучающий',
  'Развлекательный',
  'Мотивационный',
  'Сторителлинг'
];

const OBJECTIVE_OPTIONS = [
  'Повышение узнаваемости',
  'Вовлечение аудитории',
  'Конверсия',
  'Обучение'
];

export function ScriptGenerator() {
  const { user, updateUserData } = useAuth();
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('60');
  const [style, setStyle] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [objective, setObjective] = useState('');
  const [script, setScript] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [scriptId, setScriptId] = useState<string>('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('Необходимо войти в систему');
      return;
    }

    if (user.subscription.tokensLeft <= 0) {
      setError('Недостаточно токенов. Пожалуйста, обновите план.');
      return;
    }

    if (!targetAudience.trim()) {
      setError('Укажите целевую аудиторию');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const generatedScript = await aiService.generateScript({
        topic,
        duration: parseInt(duration),
        style,
        targetAudience,
        objective
      });

      const scriptAnalysis = await aiService.analyzeViralPotential(generatedScript);

      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, {
        'subscription.tokensLeft': user.subscription.tokensLeft - 1
      });

      // Обновляем данные пользователя для отображения актуального количества токенов
      await updateUserData(user.id);

      await incrementScriptCount(user.id);

      setScript(generatedScript);
      setAnalysis(scriptAnalysis);

      const savedScriptId = await saveScript(
        user.id,
        generatedScript,
        scriptAnalysis,
        topic,
        style,
        objective
      );
      setScriptId(savedScriptId);

    } catch (err) {
      console.error('Error generating script:', err);
      setError('Произошла ошибка при генерации сценария');
    } finally {
      setLoading(false);
    }
  };

  const handleNewIdea = () => {
    setScript('');
    setAnalysis('');
    setError('');
    setTargetAudience('');
    setScriptId('');
  };

  return (
    <div className="w-full bg-gray-800/30 rounded-xl p-4 md:p-6 lg:p-8 mb-8 md:mb-16 lg:mb-32">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold">Генератор идей</h2>
        <div className="flex items-center gap-2 bg-[#AAFF00]/10 px-3 md:px-4 py-1.5 md:py-2 rounded-lg w-full sm:w-auto justify-center sm:justify-start">
          <Coins className="w-4 h-4 md:w-5 md:h-5 text-[#AAFF00]" />
          <span className="text-[#AAFF00] font-medium text-sm md:text-base">
            {user?.subscription?.tokensLeft || 0} токенов осталось
          </span>
        </div>
      </div>

      {!script && (
        <form onSubmit={handleGenerate} className="space-y-4 md:space-y-6">
          <FormInput
            label="Тема видео"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Например: 'Как начать свой бизнес с нуля'"
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

          <FormSelect
            label="Стиль"
            value={style}
            onChange={setStyle}
            options={STYLE_OPTIONS}
            placeholder="Выберите стиль видео"
            required
            disabled={loading}
            allowCustom
          />

          <div className="space-y-2 bg-black/20 p-3 md:p-4 rounded-xl">
            <label className="block text-white text-sm md:text-base font-medium">
              Целевая аудитория
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="Например: 'Предприниматели 25-45 лет'"
              className="w-full bg-black/40 rounded-lg px-3 md:px-4 py-2.5 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50"
              required
              disabled={loading}
            />
          </div>

          <FormSelect
            label="Цель видео"
            value={objective}
            onChange={setObjective}
            options={OBJECTIVE_OPTIONS}
            placeholder="Выберите цель видео"
            required
            disabled={loading}
            allowCustom
          />

          {error && <ErrorMessage message={error} />}

          <GenerateButton loading={loading} />
        </form>
      )}

      {script && (
        <ScriptResult 
          script={script} 
          analysis={analysis} 
          onNewIdea={handleNewIdea}
          scriptId={scriptId}
        />
      )}
    </div>
  );
}
