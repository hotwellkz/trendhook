import React, { useState } from 'react';
import { aiService } from '../services/ai';
import { useAuth } from '../hooks/useAuth';

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

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    try {
      const generatedScript = await aiService.generateScript({
        topic,
        duration,
        style,
        targetAudience,
        objective
      });
      
      setScript(generatedScript || '');
      
      // Анализируем потенциал сгенерированного сценария
      const viralAnalysis = await aiService.analyzeViralPotential(generatedScript || '');
      setAnalysis(viralAnalysis || '');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Генератор сценариев</h2>
      
      <form onSubmit={handleGenerate} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Тема видео
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full bg-black/20 rounded-lg px-4 py-2.5 text-white"
            required
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
            className="w-full bg-black/20 rounded-lg px-4 py-2.5 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Стиль
          </label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full bg-black/20 rounded-lg px-4 py-2.5 text-white"
            required
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
            className="w-full bg-black/20 rounded-lg px-4 py-2.5 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Цель видео
          </label>
          <select
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="w-full bg-black/20 rounded-lg px-4 py-2.5 text-white"
            required
          >
            <option value="">Выберите цель</option>
            <option value="awareness">Повышение узнаваемости</option>
            <option value="engagement">Вовлечение аудитории</option>
            <option value="conversion">Конверсия</option>
            <option value="education">Обучение</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#AAFF00] text-black py-2.5 rounded-lg font-medium hover:bg-[#88CC00] transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Генерация...' : 'Сгенерировать сценарий'}
        </button>
      </form>

      {script && (
        <div className="space-y-6">
          <div className="bg-gray-800/30 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Сценарий</h3>
            <pre className="whitespace-pre-wrap text-gray-300">{script}</pre>
          </div>

          {analysis && (
            <div className="bg-gray-800/30 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Анализ вирусного потенциала</h3>
              <pre className="whitespace-pre-wrap text-gray-300">{analysis}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}