import React from 'react';
import { X, Check } from 'lucide-react';

interface ComparisonItemProps {
  icon: React.ReactNode;
  text: string;
}

function ComparisonItem({ icon, text }: ComparisonItemProps) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-shrink-0 w-6 h-6">{icon}</div>
      <p className="text-gray-400">{text}</p>
    </div>
  );
}

export function ComparisonSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <div className="inline-block bg-gray-800/50 rounded-full px-4 py-2 mb-6">
          <span className="text-[#AAFF00]">До vs После</span>
        </div>
        <h2 className="text-5xl font-bold">
          Избавьте себя от
          <br />
          <span className="text-[#AAFF00]">проблем</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-800/30 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-8 text-gray-400">Самостоятельно</h3>
          <ComparisonItem
            icon={<X className="text-red-500" />}
            text="Бесконечные часы мозгового штурма идей, только чтобы увидеть, как ваши посты проваливаются"
          />
          <ComparisonItem
            icon={<X className="text-red-500" />}
            text="Безумие проб и ошибок — тестирование хуков, которые не попадают в цель"
          />
          <ComparisonItem
            icon={<X className="text-red-500" />}
            text="Работа вслепую без аналитики, упущение трендов и отставание от конкурентов"
          />
        </div>

        <div className="bg-gray-800/30 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-8">С ViralHooks</h3>
          <ComparisonItem
            icon={<Check className="text-[#AAFF00]" />}
            text="1М+ хуков на основе данных, адаптированных под вашу аудиторию — никаких догадок"
          />
          <ComparisonItem
            icon={<Check className="text-[#AAFF00]" />}
            text="Сфокусируйтесь на создании качественного контента, который резонирует и привлекает"
          />
          <ComparisonItem
            icon={<Check className="text-[#AAFF00]" />}
            text="Будьте впереди с актуальной аналитикой трендов и стратегий конкурентов"
          />
        </div>
      </div>
    </section>
  );
}