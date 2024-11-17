import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { BetaButton } from './BetaButton';

export function HeroSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6 md:space-y-8"
      >
        <div className="inline-block bg-gray-800/50 rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6">
          <span className="text-[#AAFF00] text-sm md:text-base whitespace-normal md:whitespace-nowrap px-1">
            Получите доступ к 1М+ роликов специально для вас →
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-2">
          Миллионы вирусных видео
          <br className="hidden md:block" />
          <span className="text-[#AAFF00]">у вас в кармане</span>
        </h1>
        
        <p className="text-gray-400 text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-2xl mx-auto px-2">
          Используйте вирусные видео для исследования, генерации идей и создания сценариев за СЕКУНДЫ
        </p>

        <div className="max-w-sm md:max-w-md mx-auto px-4">
          <div className="bg-gray-800/30 p-2 rounded-lg flex flex-col md:flex-row gap-2 mb-4">
            <input
              type="email"
              placeholder="example@gmail.com"
              className="flex-1 bg-transparent px-4 py-2.5 outline-none rounded-lg text-sm md:text-base w-full"
            />
            <BetaButton className="px-4 py-2.5 rounded-lg text-sm md:text-base whitespace-nowrap" />
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-xs md:text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#AAFF00]" />
              <span>Без карты</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#AAFF00]" />
              <span>7 дней бесплатно</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}