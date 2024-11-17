import React from 'react';
import { Users, Sparkles, Search, BarChart3 } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-800/30 p-8 rounded-2xl">
      <div className="bg-gray-800/50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-[#AAFF00]">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <div className="inline-block bg-gray-800/50 rounded-full px-4 py-2 mb-6">
          <span className="text-[#AAFF00]">Особенности</span>
        </div>
        <h2 className="text-5xl font-bold mb-4">
          Не просто очередной ИИ
          <br />
          <span className="text-[#AAFF00]">инструмент</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <FeatureCard
          icon={<Users />}
          title="Забудьте про ChatGPT"
          description="Создавайте контент, который не выглядит как генерация обычных ИИ-моделей"
        />
        <FeatureCard
          icon={<Sparkles />}
          title="Уникально и эффективно"
          description="Перестаньте использовать одни и те же шаблонные хуки из generic-списков"
        />
        <FeatureCard
          icon={<Search />}
          title="Соответствует вашему стилю"
          description="ViralHooks учится у вашего стиля, чтобы каждый контент был действительно вашим"
        />
        <FeatureCard
          icon={<BarChart3 />}
          title="Студийный формат"
          description="Все хуки, подписи и идеи организованы в библиотеку студийного типа"
        />
      </div>
    </section>
  );
}