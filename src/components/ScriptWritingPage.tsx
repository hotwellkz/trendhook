import React from 'react';
import { MetaTags } from './SEO/MetaTags';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { PricingSection } from './PricingSection';
import { CTASection } from './CTASection';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Edit3, Target, Brain, Check } from 'lucide-react';

export function ScriptWritingPage() {
  return (
    <>
      <MetaTags pageName="scriptWriting" />
      <Navigation />
      
      {/* Hero секция */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Как написать <span className="text-[#AAFF00]">сценарий</span> для видео
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Пошаговое руководство по созданию эффективных сценариев для видеоконтента с помощью искусственного интеллекта
            </p>
            <Link 
              to="/signup"
              className="inline-block bg-[#AAFF00] text-black px-8 py-3 rounded-full font-medium hover:bg-[#88CC00] transition-colors"
            >
              Попробовать бесплатно
            </Link>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60"
              alt="Написание сценария"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Основные блоки */}
      <section className="bg-gray-800/30 py-12 md:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/20 p-6 rounded-xl">
              <BookOpen className="w-12 h-12 text-[#AAFF00] mb-4" />
              <h2 className="text-2xl font-bold mb-4">Структура сценария</h2>
              <p className="text-gray-400 mb-6">
                Узнайте, как правильно структурировать ваш сценарий для максимальной эффективности
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Захватывающий хук</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Основной контент</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Призыв к действию</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/20 p-6 rounded-xl">
              <Edit3 className="w-12 h-12 text-[#AAFF00] mb-4" />
              <h2 className="text-2xl font-bold mb-4">Процесс написания</h2>
              <p className="text-gray-400 mb-6">
                Пошаговый процесс создания эффективного сценария для вашего видео
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Исследование темы</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Создание черновика</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Редактирование</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/20 p-6 rounded-xl">
              <Target className="w-12 h-12 text-[#AAFF00] mb-4" />
              <h2 className="text-2xl font-bold mb-4">Оптимизация</h2>
              <p className="text-gray-400 mb-6">
                Как улучшить ваш сценарий для максимального вовлечения аудитории
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Анализ целевой аудитории</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>A/B тестирование</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Метрики успеха</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ секция */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Часто задаваемые вопросы о написании сценариев
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-gray-800/30 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">{item.question}</h3>
              <p className="text-gray-400">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Тарифы */}
      <PricingSection />

      {/* CTA */}
      <CTASection />

      {/* Связанные страницы */}
      <section className="max-w-6xl mx-auto px-4 py-12 mb-20">
        <h2 className="text-2xl font-bold mb-8">Полезные ресурсы</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Link 
            to="/ai-scripts"
            className="bg-gray-800/30 p-6 rounded-xl hover:bg-gray-800/50 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <Brain className="w-8 h-8 text-[#AAFF00]" />
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#AAFF00] transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI генератор сценариев</h3>
            <p className="text-gray-400">Создавайте сценарии с помощью ИИ</p>
          </Link>

          <Link 
            to="/partners"
            className="bg-gray-800/30 p-6 rounded-xl hover:bg-gray-800/50 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-[#AAFF00]" />
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#AAFF00] transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-2">Партнерская программа</h3>
            <p className="text-gray-400">Зарабатывайте на рекомендациях</p>
          </Link>

          <Link 
            to="/billing"
            className="bg-gray-800/30 p-6 rounded-xl hover:bg-gray-800/50 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8 text-[#AAFF00]" />
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#AAFF00] transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-2">Тарифные планы</h3>
            <p className="text-gray-400">Выберите подходящий тариф</p>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

const faqItems = [
  {
    question: "С чего начать написание сценария?",
    answer: "Начните с определения целевой аудитории и основной идеи видео. Затем создайте структуру: хук, основной контент и призыв к действию."
  },
  {
    question: "Какова оптимальная длина сценария?",
    answer: "Для коротких видео (до 60 секунд) сценарий должен содержать 100-150 слов. Для длинных видео - 200-300 слов на каждую минуту."
  },
  {
    question: "Как написать эффективный хук?",
    answer: "Хук должен быть кратким (5-7 секунд), интригующим и сразу захватывать внимание зрителя. Используйте неожиданные факты или вопросы."
  },
  {
    question: "Как структурировать основную часть сценария?",
    answer: "Разделите контент на 3-4 ключевых пункта. Каждый пункт должен логически вытекать из предыдущего и вести к следующему."
  },
  {
    question: "Как написать сильный призыв к действию?",
    answer: "Призыв должен быть конкретным, мотивирующим и соответствовать содержанию видео. Используйте активные глаголы и создавайте ощущение срочности."
  },
  {
    question: "Какие ошибки чаще всего допускают при написании сценария?",
    answer: "Основные ошибки: слишком длинный текст, отсутствие четкой структуры, слабый хук и неясный призыв к действию."
  },
  {
    question: "Как адаптировать сценарий под разные платформы?",
    answer: "Учитывайте особенности каждой платформы: вертикальный формат для Instagram/TikTok, горизонтальный для YouTube, разную длительность видео."
  },
  {
    question: "Нужно ли учитывать SEO при написании сценария?",
    answer: "Да, используйте релевантные ключевые слова в названии, описании и первых 30 секундах видео для лучшей оптимизации."
  },
  {
    question: "Как сделать сценарий более эмоциональным?",
    answer: "Используйте истории, примеры из жизни, эмоциональные триггеры и создавайте связь с аудиторией через общие проблемы и решения."
  },
  {
    question: "Как проверить эффективность сценария?",
    answer: "Протестируйте сценарий на небольшой аудитории, проанализируйте метрики удержания и вовлечения, собирайте обратную связь."
  }
];
