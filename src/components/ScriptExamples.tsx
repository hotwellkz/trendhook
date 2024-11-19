import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ScriptExamples() {
  return (
    <section className="bg-gray-800/30 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Примеры сценариев от нашего генератора
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Посмотрите, какие сценарии создает наш ИИ-генератор для разных типов контента и целевых аудиторий.
            </p>
            <div className="space-y-4">
              <div className="bg-black/20 p-4 rounded-xl">
                <h3 className="font-bold mb-2">Образовательный контент</h3>
                <p className="text-gray-400">
                  "5 секретных приемов продуктивности, о которых вы не знали. Третий прием изменит ваш подход к работе навсегда!"
                </p>
              </div>
              <div className="bg-black/20 p-4 rounded-xl">
                <h3 className="font-bold mb-2">Развлекательный контент</h3>
                <p className="text-gray-400">
                  "Попробовал новый тренд из TikTok - вот что из этого вышло! Спойлер: это работает не так, как вы думаете"
                </p>
              </div>
              <div className="bg-black/20 p-4 rounded-xl">
                <h3 className="font-bold mb-2">Бизнес-контент</h3>
                <p className="text-gray-400">
                  "От 0 до 1 000 000: три главных правила масштабирования бизнеса в 2024 году"
                </p>
              </div>
            </div>
            <Link 
              to="/ai-scripts" 
              className="inline-flex items-center gap-2 text-[#AAFF00] mt-8 hover:underline"
            >
              Попробовать генератор
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&auto=format&fit=crop&q=60"
              alt="Генератор сценариев в действии"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
