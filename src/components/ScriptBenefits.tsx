import React from 'react';
import { Check } from 'lucide-react';

interface BenefitProps {
  title: string;
  description: string;
}

function Benefit({ title, description }: BenefitProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-6 h-6 mt-1">
        <Check className="w-6 h-6 text-[#AAFF00]" />
      </div>
      <div>
        <h3 className="font-bold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}

export function ScriptBenefits() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=60"
            alt="Преимущества генератора сценариев"
            className="rounded-2xl shadow-2xl"
          />
        </div>
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Почему выбирают наш генератор сценариев
          </h2>
          <div className="space-y-6">
            <Benefit
              title="Экономия времени"
              description="Создавайте качественные сценарии в 10 раз быстрее, чем вручную"
            />
            <Benefit
              title="Уникальный контент"
              description="ИИ генерирует оригинальные сценарии, учитывая ваш стиль и тон"
            />
            <Benefit
              title="Анализ трендов"
              description="Генератор учитывает актуальные тренды в вашей нише"
            />
            <Benefit
              title="Оптимизация под платформы"
              description="Создавайте сценарии, оптимизированные под разные соцсети"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
