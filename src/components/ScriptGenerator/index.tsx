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
  const [scriptId, setScriptId] = useState<string>('');

  const handleAddAudience = (audience: string) => {
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

    setLoading(true);
    setError('');

    try {
      const scripts = await Promise.all(targetAudiences.map(audience => 
        aiService.generateScript({
          topic,
          duration: parseInt(duration),
          style,
          targetAudience: audience,
          objective
        })
      ));

      const analyses = await Promise.all(scripts.map(script => 
        aiService.analyzeViralPotential(script)
      ));

      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, {
        'subscription.tokensLeft': user.subscription.tokensLeft - targetAudiences.length
      });

      await incrementScriptCount(user.id);

      const combinedScript = scripts.join('\n\n=== Следующая аудитория ===\n\n');
      const combinedAnalysis = analyses.join('\n\n=== Следующий анализ ===\n\n');

      setScript(combinedScript);
      setAnalysis(combinedAnalysis);

      const savedScriptId = await saveScript(
        user.id,
        combinedScript,
        combinedAnalysis,
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
    setTargetAudiences([]);
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
              Целевые аудитории
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
                    ×
                  </button>
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Например: 'Предприниматели 25-45 лет' (нажмите Enter для добавления)"
              className="w-full bg-black/40 rounded-lg px-3 md:px-4 py-2.5 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50"
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
