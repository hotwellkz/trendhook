import React from 'react';
import { MetaTags } from './SEO/MetaTags';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { PricingSection } from './PricingSection';
import { CTASection } from './CTASection';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Sparkles, Zap, Target, MessageSquare, Check } from 'lucide-react';

export function OnlineScriptGeneratorPage() {
  return (
    <>
      <MetaTags pageName="onlineScriptGenerator" />
      <Navigation />
      
      {/* Hero секция */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Генератор сценариев <span className="text-[#AAFF00]">онлайн</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Создавайте профессиональные сценарии для видео онлайн. Экономьте время и ресурсы с нашим генератором.
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
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
              alt="Онлайн генератор сценариев"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="bg-gray-800/30 py-12 md:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Преимущества онлайн генератора сценариев
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/20 p-6 rounded-xl">
              <Brain className="w-12 h-12 text-[#AAFF00] mb-4" />
              <h3 className="text-xl font-bold mb-4">Умная генерация</h3>
              <p className="text-gray-400 mb-6">
                Создавайте профессиональные сценарии за считанные минуты
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
              Как работает онлайн генератор сценариев
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#AAFF00]/10 p-3 rounded-xl">
                  <Target className="w-6 h-6 text-[#AAFF00]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">1. Выбор параметров</h3>
                  <p className="text-gray-400">
                    Укажите тему, формат и целевую аудиторию вашего видео
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#AAFF00]/10 p-3 rounded-xl">
                  <Brain className="w-6 h-6 text-[#AAFF00]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">2. Генерация</h3>
                  <p className="text-gray-400">
                    Система создает уникальный сценарий на основе ваших требований
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#AAFF00]/10 p-3 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-[#AAFF00]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">3. Редактирование</h3>
                  <p className="text-gray-400">
                    Внесите правки и адаптируйте сценарий под свои нужды
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&auto=format&fit=crop&q=60"
              alt="Процесс создания сценария"
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
    question: "Как пользоваться онлайн генератором сценариев?",
    answer: "Просто выберите тему, формат и целевую аудиторию вашего видео. Генератор автоматически создаст оптимальный сценарий, который вы сможете отредактировать под свои нужды."
  },
  {
    question: "Сколько стоит использование генератора?",
    answer: "Базовый функционал генератора доступен бесплатно. Расширенные возможности доступны в платных тарифах с пробным периодом."
  },
  {
    question: "Можно ли сохранять сгенерированные сценарии?",
    answer: "Да, все сгенерированные сценарии автоматически сохраняются в вашем личном кабинете и доступны для редактирования."
  },
  {
    question: "Подходит ли генератор для разных форматов видео?",
    answer: "Да, генератор создает сценарии для различных форматов: короткие видео, рекламные ролики, обучающий контент и другие."
  },
  {
    question: "Насколько уникальны сгенерированные сценарии?",
    answer: "Каждый сценарий создается индивидуально с учетом ваших параметров и проходит проверку на уникальность."
  },
  {
    question: "Нужно ли устанавливать программу?",
    answer: "Нет, генератор работает полностью онлайн через браузер. Не требуется установка дополнительного программного обеспечения."
  },
  {
    question: "Как часто обновляется генератор?",
    answer: "Генератор регулярно обновляется с учетом новых трендов и пользовательского опыта для улучшения качества сценариев."
  },
  {
    question: "Можно ли использовать с мобильного устройства?",
    answer: "Да, генератор полностью адаптирован для работы на мобильных устройствах и планшетах."
  },
  {
    question: "Есть ли ограничения на количество генераций?",
    answer: "В бесплатной версии доступно 10 генераций. В платных тарифах количество генераций не ограничено."
  },
  {
    question: "Как получить доступ к расширенным функциям?",
    answer: "Расширенные функции доступны после регистрации и выбора подходящего тарифного плана."
  }
];
