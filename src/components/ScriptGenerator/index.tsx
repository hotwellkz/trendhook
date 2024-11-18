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
  const [targetAudience, setTargetAudience] = useState('');
  const [objective, setObjective] = useState('');
  const [script, setScript] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ... rest of the code remains the same until return statement

  return (
    <div className="w-full bg-gray-800/30 rounded-xl p-8 mb-32">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Генератор идей</h2>
        <div className="flex items-center gap-2 bg-[#AAFF00]/10 px-4 py-2 rounded-lg">
          <Coins className="w-5 h-5 text-[#AAFF00]" />
          <span className="text-[#AAFF00] font-medium">
            {user?.subscription?.tokensLeft || 0} токенов осталось
          </span>
        </div>
      </div>

      {!script && (
        <form onSubmit={handleGenerate} className="space-y-6">
          <FormInput
            label="Тема видео"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Например: '5 способов улучшить продуктивность' или 'Секреты успешного бизнеса'"
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

          <FormInput
            label="Целевая аудитория"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="Например: 'Предприниматели 25-45 лет' или 'Студенты, интересующиеся саморазвитием'"
            required
            disabled={loading}
          />

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
