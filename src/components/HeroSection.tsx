import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { BetaButton } from './BetaButton';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6 md:space-y-8"
      >
        <button 
          onClick={() => navigate('/signup')}
          className="inline-block bg-gray-800/50 rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6 hover:bg-gray-800/70 transition-colors"
        >
          <span className="text-[#AAFF00] text-sm md:text-base whitespace-normal md:whitespace-nowrap px-1">
            Получите доступ к 1М+ роликов специально для вас →
          </span>
        </button>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-2">
          Миллионы вирусных видео
          <br className="hidden md:block" />
          <span className="text-[#AAFF00]"> у вас в кармане</span>
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

        <div className="text-xs md:text-sm text-gray-400 mt-8">
          Уже используете TrendVideo?{' '}
          <button 
            onClick={() => navigate('/login')}
            className="text-[#AAFF00] hover:underline"
          >
            Войти
          </button>
        </div>

        {/* Бегущая строка */}
        <div className="relative overflow-hidden mt-12 py-6 md:py-8 bg-gray-800/30">
          <div className="animate-marquee whitespace-nowrap">
            <span className="text-gray-400 mx-6 text-lg md:text-2xl">Создано для создателей контента</span>
            <span className="text-[#AAFF00] mx-6 text-lg md:text-2xl">•</span>
            <span className="text-gray-400 mx-6 text-lg md:text-2xl">владельцев бизнеса</span>
            <span className="text-[#AAFF00] mx-6 text-lg md:text-2xl">•</span>
            <span className="text-gray-400 mx-6 text-lg md:text-2xl">креативных агентств</span>
            <span className="text-[#AAFF00] mx-6 text-lg md:text-2xl">•</span>
            <span className="text-gray-400 mx-6 text-lg md:text-2xl">и всех, кто создает контент</span>
            <span className="text-[#AAFF00] mx-6 text-lg md:text-2xl">•</span>
          </div>
          <div className="absolute top-0 animate-marquee2 whitespace-nowrap">
            <span className="text-gray-400 mx-6 text-lg md:text-2xl">Создано для создателей контента</span>
            <span className="text-[#AAFF00] mx-6 text-lg md:text-2xl">•</span>
            <span className="text-gray-400 mx-6 text-lg md:text-2xl">владельцев бизнеса</span>
            <span className="text-[#AAFF00] mx-6 text-lg md:text-2xl">•</span>
            <span className="text-gray-400 mx-6 text-lg md:text-2xl">креативных агентств</span>
            <span className="text-[#AAFF00] mx-6 text-lg md:text-2xl">•</span>
            <span className="text-gray-400 mx-6 text-lg md:text-2xl">и всех, кто создает контент</span>
            <span className="text-[#AAFF00] mx-6 text-lg md:text-2xl">•</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
