import React from 'react';
import { ArrowRight, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ... rest of the imports and interfaces ...

export function RealTimeDataSection() {
  const navigate = useNavigate();

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 md:py-12 lg:py-16">
      {/* Верхняя часть с заголовком */}
      <div className="mb-8 md:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#AAFF00]/10 text-[#AAFF00] px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm mb-4 md:mb-6">
          <span>Получите доступ к каждому ролику из библиотеки</span>
          <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
        </div>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
          Получайте данные о видео в{' '}
          <span className="text-[#AAFF00]">реальном времени</span>{' '}
          делая создание контента{' '}
          <span className="text-[#AAFF00]">простым и понятным</span>
        </h2>

        <button 
          onClick={() => navigate('/signup')}
          className="bg-[#AAFF00] text-black px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium hover:bg-[#88CC00] transition-colors mt-6 md:mt-8 text-sm md:text-base"
        >
          Присоединиться
        </button>
      </div>

      {/* ... rest of the component ... */}
    </section>
  );
}
