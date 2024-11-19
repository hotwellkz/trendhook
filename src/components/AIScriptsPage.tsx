import React from 'react';
import { MetaTags } from './SEO/MetaTags';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { PricingSection } from './PricingSection';
import { CTASection } from './CTASection';
import { BetaButton } from './BetaButton';
import { Brain, Sparkles, Zap, MessageSquare, ArrowRight } from 'lucide-react';

export function AIScriptsPage() {
  return (
    <>
      <MetaTags pageName="aiScripts" />
      <Navigation />
      
      {/* Hero секция */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Нейросеть для генерации{' '}
              <span className="text-[#AAFF00]">сценариев</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Создавайте профессиональные сценарии для видео с помощью искусственного интеллекта. Экономьте время и ресурсы на создании контента.
            </p>
            <BetaButton className="px-8 py-3 rounded-full text-lg" />
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&auto=format&fit=crop&q=60"
              alt="AI генерация сценариев"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 bg-[#AAFF00] text-black px-6 py-3 rounded-full font-medium">
              1M+ готовых сценариев
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="bg-gray-800/30 py-12 md:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Почему выбирают нашу нейросеть
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/20 p-6 rounded-xl">
              <Brain className="w-12 h-12 text-[#AAFF00] mb-4" />
              <h3 className="text-xl font-bold mb-2">Умная генерация</h3>
              <p className="text-gray-400">
                Нейросеть анализирует тренды и создает сценарии, которые привлекают внимание аудитории
              </p>
            </div>
            <div className="bg-black/20 p-6 rounded-xl">
              <Sparkles className="w-12 h-12 text-[#AAFF00] mb-4" />
              <h3 className="text-xl font-bold mb-2">Уникальный контент</h3>
              <p className="text-gray-400">
                Каждый сценарий уникален и адаптирован под ваш стиль и целевую аудиторию
              </p>
            </div>
            <div className="bg-black/20 p-6 rounded-xl">
              <Zap className="w-12 h-12 text-[#AAFF00] mb-4" />
              <h3 className="text-xl font-bold mb-2">Быстрый результат</h3>
              <p className="text-gray-400">
                Получайте готовый сценарий за считанные секунды вместо часов работы
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Как это работает */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Как работает нейросеть для генерации сценариев
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#AAFF00] text-black rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Выберите тему</h3>
                <p className="text-gray-400">
                  Укажите тему вашего видео и целевую аудиторию
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#AAFF00] text-black rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Настройте параметры</h3>
                <p className="text-gray-400">
                  Выберите стиль, длительность и формат сценария
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#AAFF00] text-black rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Получите результат</h3>
                <p className="text-gray-400">
                  Нейросеть сгенерирует оптимальный сценарий для вашего видео
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/30 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-6 h-6 text-[#AAFF00]" />
              <h3 className="text-xl font-bold">Пример сценария</h3>
            </div>
            <div className="space-y-4 text-gray-400">
              <p>🎯 Хук: "Узнайте 3 секрета успешных видео, о которых молчат блогеры"</p>
              <p>📝 Основная часть: Раскрытие каждого секрета с примерами</p>
              <p>🎬 Концовка: Призыв к действию и обещание результата</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-800/30 py-12 md:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Часто задаваемые вопросы
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqItems.map((item, index) => (
              <details key={index} className="group bg-black/20 rounded-xl">
                <summary className="flex justify-between items-center cursor-pointer p-6">
                  <h3 className="text-lg font-medium pr-8">{item.question}</h3>
                  <ArrowRight className="w-5 h-5 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-6 pb-6 text-gray-400">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <PricingSection />
      <CTASection />
      <Footer />
    </>
  );
}

const faqItems = [
  {
    question: "Как нейросеть создает сценарии для видео?",
    answer: "Нейросеть анализирует миллионы успешных видео, учитывает ваши требования и генерирует оптимальный сценарий на основе этих данных."
  },
  {
    question: "Можно ли настроить стиль генерируемых сценариев?",
    answer: "Да, вы можете выбрать различные стили: информационный, развлекательный, образовательный и другие."
  },
  {
    question: "Сколько времени занимает генерация одного сценария?",
    answer: "Генерация сценария занимает всего несколько секунд после ввода всех параметров."
  },
  {
    question: "Будут ли сценарии уникальными?",
    answer: "Да, каждый сценарий генерируется индивидуально с учетом ваших параметров и не повторяется."
  },
  {
    question: "Можно ли редактировать сгенерированные сценарии?",
    answer: "Да, вы можете редактировать любую часть сценария после генерации."
  },
  {
    question: "Какие форматы видео поддерживает нейросеть?",
    answer: "Нейросеть создает сценарии для всех популярных форматов: короткие видео, длинные ролики, рекламные клипы."
  },
  {
    question: "Есть ли ограничения на количество генераций?",
    answer: "Количество генераций зависит от выбранного тарифного плана."
  },
  {
    question: "Как обеспечивается качество сценариев?",
    answer: "Нейросеть обучена на успешных видео и постоянно совершенствуется на основе новых данных."
  },
  {
    question: "Можно ли сохранять сгенерированные сценарии?",
    answer: "Да, все сценарии сохраняются в вашем личном кабинете и доступны в течение 2 дней."
  },
  {
    question: "Нужно ли специальное обучение для работы с нейросетью?",
    answer: "Нет, интерфейс интуитивно понятен и не требует специальных навыков."
  }
];
