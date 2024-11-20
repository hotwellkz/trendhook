import React from 'react';
import { MetaTags } from './SEO/MetaTags';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { PricingSection } from './PricingSection';
import { CTASection } from './CTASection';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Sparkles, Zap, Target, MessageSquare, Check } from 'lucide-react';

export function AIScriptGeneratorPage() {
  return (
    <>
      <MetaTags pageName="aiScriptGenerator" />
      <Navigation />
      
      {/* Hero секция */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Генератор сценария на основе <span className="text-[#AAFF00]">нейросети</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Создавайте профессиональные сценарии для видео с помощью искусственного интеллекта. Экономьте до 90% времени на написании контента.
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
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60"
              alt="AI генератор сценариев"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="bg-gray-800/30 py-12 md:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Преимущества нейросети для генерации сценариев
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/20 p-6 rounded-xl">
              <Brain className="w-12 h-12 text-[#AAFF00] mb-4" />
              <h3 className="text-xl font-bold mb-4">Умная генерация</h3>
              <p className="text-gray-400 mb-6">
                Нейросеть анализирует миллионы успешных видео и создает оптимальные сценарии
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Анализ трендов</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Адаптация под аудиторию</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Уникальный контент</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/20 p-6 rounded-xl">
              <Sparkles className="w-12 h-12 text-[#AAFF00] mb-4" />
              <h3 className="text-xl font-bold mb-4">Креативность</h3>
              <p className="text-gray-400 mb-6">
                Генерация уникальных идей и неожиданных поворотов сюжета
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Оригинальные хуки</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Интересные сюжеты</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Вирусные элементы</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/20 p-6 rounded-xl">
              <Zap className="w-12 h-12 text-[#AAFF00] mb-4" />
              <h3 className="text-xl font-bold mb-4">Скорость</h3>
              <p className="text-gray-400 mb-6">
                Мгновенная генерация готовых к использованию сценариев
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Экономия времени</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Быстрая адаптация</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Масштабирование</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Как это работает */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">
              Как работает нейросеть для генерации сценариев
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#AAFF00]/10 p-3 rounded-xl">
                  <Target className="w-6 h-6 text-[#AAFF00]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">1. Анализ целевой аудитории</h3>
                  <p className="text-gray-400">
                    Нейросеть изучает интересы, поведение и предпочтения вашей аудитории
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#AAFF00]/10 p-3 rounded-xl">
                  <Brain className="w-6 h-6 text-[#AAFF00]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">2. Генерация контента</h3>
                  <p className="text-gray-400">
                    ИИ создает уникальный сценарий, учитывая все параметры и требования
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#AAFF00]/10 p-3 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-[#AAFF00]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">3. Оптимизация и анализ</h3>
                  <p className="text-gray-400">
                    Автоматическая проверка и улучшение сценария для максимальной эффективности
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1676371785570-9c6f6d4cf走?w=800&auto=format&fit=crop&q=60"
              alt="Процесс работы нейросети"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-800/30 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Часто задаваемые вопросы
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-black/20 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">{item.question}</h3>
                <p className="text-gray-400">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingSection />
      <CTASection />

      {/* Связанные страницы */}
      <section className="max-w-6xl mx-auto px-4 py-12 mb-20">
        <h2 className="text-2xl font-bold mb-8">Полезные ресурсы</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Link 
            to="/how-to-write-script"
            className="bg-gray-800/30 p-6 rounded-xl hover:bg-gray-800/50 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <MessageSquare className="w-8 h-8 text-[#AAFF00]" />
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#AAFF00] transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-2">Написание сценариев</h3>
            <p className="text-gray-400">Руководство по созданию сценариев</p>
          </Link>

          <Link 
            to="/reels-script"
            className="bg-gray-800/30 p-6 rounded-xl hover:bg-gray-800/50 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <Sparkles className="w-8 h-8 text-[#AAFF00]" />
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#AAFF00] transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-2">Сценарии для Reels</h3>
            <p className="text-gray-400">Создание вирусных Reels</p>
          </Link>

          <Link 
            to="/billing"
            className="bg-gray-800/30 p-6 rounded-xl hover:bg-gray-800/50 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-[#AAFF00]" />
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#AAFF00] transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-2">Тарифы</h3>
            <p className="text-gray-400">Выберите подходящий план</p>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

const faqItems = [
  {
    question: "Как нейросеть создает сценарии?",
    answer: "Нейросеть анализирует миллионы успешных видео, изучает паттерны вовлечения и создает уникальные сценарии, адаптированные под вашу аудиторию и цели."
  },
  {
    question: "Насколько уникальны сгенерированные сценарии?",
    answer: "Каждый сценарий создается с нуля и проходит проверку на уникальность. ИИ учитывает ваш стиль и особенности бренда."
  },
  {
    question: "Сколько времени занимает генерация сценария?",
    answer: "Создание полного сценария занимает всего несколько секунд, включая анализ и оптимизацию контента."
  },
  {
    question: "Можно ли редактировать сгенерированные сценарии?",
    answer: "Да, все сценарии можно редактировать, адаптировать и персонализировать под ваши потребности."
  },
  {
    question: "Как обеспечивается качество сценариев?",
    answer: "Нейросеть постоянно обучается на успешных примерах и использует продвинутые алгоритмы для проверки качества контента."
  },
  {
    question: "Для каких платформ подходят сценарии?",
    answer: "Генератор создает сценарии для всех популярных платформ: YouTube, Instagram, TikTok, Facebook и других."
  },
  {
    question: "Нужны ли специальные знания?",
    answer: "Нет, интерфейс интуитивно понятен и не требует специальных навыков или технических знаний."
  },
  {
    question: "Как часто обновляется нейросеть?",
    answer: "Система постоянно обучается на новых данных и обновляется для соответствия последним трендам."
  },
  {
    question: "Есть ли ограничения на количество сценариев?",
    answer: "Количество генераций зависит от выбранного тарифного плана. Доступны различные варианты под разные потребности."
  },
  {
    question: "Как начать использовать генератор?",
    answer: "Просто зарегистрируйтесь, выберите параметры сценария и получите готовый результат за считанные секунды."
  }
];
