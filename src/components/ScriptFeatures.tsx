import React from 'react';
import { Brain, Sparkles, Clock, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-800/30 p-6 md:p-8 rounded-2xl">
      <div className="bg-[#AAFF00]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-[#AAFF00]">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

export function ScriptFeatures() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Умный <span className="text-[#AAFF00]">генератор сценариев</span>
          <br />для вашего контента
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Создавайте профессиональные сценарии для видео с помощью искусственного интеллекта. 
          Экономьте время и ресурсы на создании контента.
        </p>
        <Link 
          to="/signup" 
          className="inline-block bg-[#AAFF00] text-black px-8 py-3 rounded-full font-medium hover:bg-[#88CC00] transition-colors mt-8"
        >
          Попробовать бесплатно
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          icon={<Brain />}
          title="ИИ-генерация"
          description="Создавайте уникальные сценарии с помощью продвинутых алгоритмов искусственного интеллекта"
        />
        <FeatureCard
          icon={<Sparkles />}
          title="Вирусный контент"
          description="Генерируйте сценарии, которые привлекают внимание и вызывают желание поделиться"
        />
        <FeatureCard
          icon={<Clock />}
          title="Быстрый результат"
          description="Получайте готовый сценарий за считанные секунды вместо часов работы"
        />
        <FeatureCard
          icon={<Target />}
          title="Целевая аудитория"
          description="Создавайте контент, который точно попадает в интересы вашей аудитории"
        />
      </div>
    </section>
  );
}
