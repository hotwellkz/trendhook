import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { aiService } from '../../services/ai';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { incrementScriptCount } from '../../services/firestore';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { ErrorMessage } from './ErrorMessage';
import { GenerateButton } from './GenerateButton';
import { ScriptResult } from './ScriptResult';
import { Coins, AlertCircle } from 'lucide-react';

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

const MAX_TRIAL_AUDIENCES = 20; // Максимальное количество аудиторий в пробном периоде

export function ScriptGenerator() {
  const { user } = useAuth();
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('60');
  const [style, setStyle] = useState('');
  const [targetAudiences, setTargetAudiences] = useState<string[]>([]);
  const [objective, setObjective] = useState('');
  const [script, setScript] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Определяем лимит аудиторий на основе плана подписки
  const getAudienceLimit = () => {
    // Если пользователь в пробном периоде, даем полный доступ
    if (user?.subscription?.status === 'trial') {
      return MAX_TRIAL_AUDIENCES;
    }

    // Иначе определяем лимит по плану
    switch (user?.subscription?.plan) {
      case 'content-creator':
        return 1;
      case 'business':
        return 4;
      case 'agency':
        return 20;
      default:
        return 1;
    }
  };

  const audienceLimit = getAudienceLimit();

  const handleAddAudience = (audience: string) => {
    if (targetAudiences.length >= audienceLimit) {
      const message = user?.subscription?.status === 'trial' 
        ? `В пробном периоде доступно до ${MAX_TRIAL_AUDIENCES} целевых аудиторий`
        : `Ваш план позволяет использовать только ${audienceLimit} целевых аудиторий`;
      setError(message);
      return;
    }
    if (!targetAudiences.includes(audience)) {
      setTargetAudiences([...targetAudiences, audience]);
    }
  };

  const handleRemoveAudience = (index: number) => {
    setTargetAudiences(targetAudiences.filter((_, i) => i !== index));
  };

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

    if (targetAudiences.length === 0) {
      setError('Добавьте хотя бы одну целевую аудиторию');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Генерируем сценарий для каждой аудитории
      const scripts = await Promise.all(targetAudiences.map(audience => 
        aiService.generateScript({
          topic,
          duration: parseInt(duration),
          style,
          targetAudience: audience,
          objective
        })
      ));

      // Анализируем потенциал для каждого сценария
      const analyses = await Promise.all(scripts.map(script => 
        aiService.analyzeViralPotential(script)
      ));

      // Обновляем токены пользователя (списываем по токену за каждую аудиторию)
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, {
        'subscription.tokensLeft': user.subscription.tokensLeft - targetAudiences.length
      });

      // Обновляем статистику
      await incrementScriptCount(user.id);

      // Объединяем все сценарии и анализы
      setScript(scripts.join('\n\n=== Следующая аудитория ===\n\n'));
      setAnalysis(analyses.join('\n\n=== Следующий анализ ===\n\n'));
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
    setTargetAudiences([]);
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
            placeholder="Например: '5 способов улучшить продуктивность'"
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
              Целевые аудитории ({targetAudiences.length}/{audienceLimit})
              {user?.subscription?.status === 'trial' && (
                <span className="text-[#AAFF00] ml-2 text-sm">
                  Пробный период: доступны все аудитории
                </span>
              )}
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {targetAudiences.map((audience, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 px-3 py-1.5 rounded-lg flex items-center gap-2"
                >
                  <span className="text-sm">{audience}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAudience(index)}
                    className="text-gray-400 hover:text-white"
                  >
                    <AlertCircle className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Например: 'Предприниматели 25-45 лет'"
                className="flex-1 bg-black/40 rounded-lg px-3 md:px-4 py-2.5 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const input = e.target as HTMLInputElement;
                    if (input.value.trim()) {
                      handleAddAudience(input.value.trim());
                      input.value = '';
                    }
                  }
                }}
                disabled={targetAudiences.length >= audienceLimit || loading}
              />
              <button
                type="button"
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  if (input.value.trim()) {
                    handleAddAudience(input.value.trim());
                    input.value = '';
                  }
                }}
                className="bg-[#AAFF00] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#88CC00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={targetAudiences.length >= audienceLimit || loading}
              >
                Добавить
              </button>
            </div>
            {targetAudiences.length >= audienceLimit && (
              <p className="text-yellow-500 text-sm mt-2">
                {user?.subscription?.status === 'trial'
                  ? 'Достигнут лимит целевых аудиторий для пробного периода'
                  : 'Достигнут лимит целевых аудиторий для вашего плана'}
              </p>
            )}
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
        />
      )}
    </div>
  );
}
