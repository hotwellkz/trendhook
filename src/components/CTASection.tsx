import React from 'react';
import { Check } from 'lucide-react';

export function CTASection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="bg-gray-800/30 rounded-[2rem] p-6 md:p-8 lg:p-12 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
          Готовы стать вирусным?
        </h2>
        <p className="text-gray-400 text-base md:text-lg lg:text-xl mb-6 md:mb-8 px-2 md:px-8 lg:px-12">
          Зарегистрируйтесь в ViralHooks и начните видеть результаты — без скрытых условий.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4 md:w-5 md:h-5 text-[#AAFF00]" />
            <span className="text-gray-400 text-sm md:text-base">Без карты</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4 md:w-5 md:h-5 text-[#AAFF00]" />
            <span className="text-gray-400 text-sm md:text-base">7 дней бесплатно</span>
          </div>
        </div>

        <div className="max-w-[280px] sm:max-w-md mx-auto">
          <div className="bg-gray-800/50 p-2 rounded-lg flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="example@gmail.com"
              className="flex-1 bg-transparent px-4 py-2 outline-none rounded-lg text-sm md:text-base w-full sm:w-auto"
            />
            <button className="bg-[#AAFF00] text-black px-4 md:px-6 py-2 rounded-lg font-medium hover:bg-[#88CC00] transition-colors text-sm md:text-base whitespace-nowrap">
              Присоединиться к бете
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}