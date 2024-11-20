import React from 'react';
import { MetaTags } from './SEO/MetaTags';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { PricingSection } from './PricingSection';
import { CTASection } from './CTASection';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Target, Clock, MessageSquare, TrendingUp, Users } from 'lucide-react';

export function ReelsScriptPage() {
  return (
    <>
      <MetaTags pageName="reelsScript" />
      <Navigation />
      
      {/* Hero секция */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Сценарий к <span className="text-[#AAFF00]">Reels</span> который привлекает внимание
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Создавайте вирусные сценарии для Instagram Reels с помощью искусственного интеллекта. Увеличьте охваты и вовлеченность.
            </p>
            <Link 
              to="/signup"
              className="inline-block bg-[#AAFF00] text-black px-8 py-3 rounded-full font-medium hover:bg-[#88CC00] transition-colors"
            >
              Создать сценарий
            </Link>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60"
              alt="Создание сценария для Reels"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Особенности */}
      <section className="bg-gray-800/30 py-12 md:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Особенности сценариев для Reels
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/20 p-6 rounded-xl">
              <Clock className="w-12 h-12 text-[#AAFF00] mb-4" />
              <h3 className="text-xl font-bold mb-4">Оптимальная длительность</h3>
              <p className="text-gray-400">
                Создавайте сценарии идеальной длины для максимального удержания внимания в Reels
              </p>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li>• 15-30 секунд для развлекательного контента</li>
                <li>• 30-60 секунд для обучающего контента</li>
                <li>• 7-15 секунд для промо-роликов</li>
              </ul>
            </div>

            <div className="bg-black/20 p-6 rounded-xl">
              <Sparkles className="w-12 h-12 text-[#AAFF00] mb-4" />
              <h3 className="text-xl font-bold mb-4">Вирусные элементы</h3>
              <p className="text-gray-400">
                Используйте проверенные техники для создания вирусного контента
              </p>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li>• Интригующие хуки</li>
                <li>• Неожиданные повороты</li>
                <li>• Эмоциональные триггеры</li>
              </ul>
            </div>

            <div className="bg-black/20 p-6 rounded-xl">
              <Target className="w-12 h-12 text-[#AAFF00] mb-4" />
              <h3 className="text-xl font-bold mb-4">Целевая аудитория</h3>
              <p className="text-gray-400">
                Адаптируйте контент под интересы вашей аудитории
              </p>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li>• Анализ интересов</li>
                <li>• Подбор тем</li>
                <li>• Релевантные примеры</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Структура сценария */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">
              Структура идеального сценария для Reels
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#AAFF00]/10 p-3 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-[#AAFF00]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Мощный хук</h3>
                  <p className="text-gray-400">
                    Первые 3 секунды определяют успех вашего Reels. Используйте провокационные вопросы или неожиданные заявления.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#AAFF00]/10 p-3 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-[#AAFF00]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Динамичное развитие</h3>
                  <p className="text-gray-400">
                    Поддерживайте интерес быстрой сменой кадров и постоянным развитием сюжета.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#AAFF00]/10 p-3 rounded-xl">
                  <Users className="w-6 h-6 text-[#AAFF00]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Сильный финал</h3>
                  <p className="text-gray-400">
                    Завершайте ролик четким призывом к действию или неожиданным поворотом.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1622563064351-0c3d7e61c846?w=800&auto=format&fit=crop&q=60"
              alt="Структура сценария Reels"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-800/30 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Часто задаваемые вопросы о сценариях для Reels
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
            <h3 className="text-xl font-bold mb-2">Как писать сценарии</h3>
            <p className="text-gray-400">Полное руководство по написанию сценариев</p>
          </Link>

          <Link 
            to="/ai-scripts"
            className="bg-gray-800/30 p-6 rounded-xl hover:bg-gray-800/50 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <Sparkles className="w-8 h-8 text-[#AAFF00]" />
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#AAFF00] transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI генератор</h3>
            <p className="text-gray-400">Создавайте сценарии с помощью ИИ</p>
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
    question: "Какая оптимальная длительность Reels?",
    answer: "Оптимальная длительность Reels составляет 15-30 секунд. Это идеальное время для удержания внимания аудитории и передачи ключевого сообщения."
  },
  {
    question: "Как написать цепляющий хук для Reels?",
    answer: "Используйте интригующие вопросы, неожиданные факты или провокационные заявления в первые 3 секунды. Хук должен мгновенно привлекать внимание."
  },
  {
    question: "Какие элементы делают Reels вирусным?",
    answer: "Ключевые элементы: сильный хук, динамичное повествование, эмоциональный отклик, актуальные тренды и четкий призыв к действию."
  },
  {
    question: "Как структурировать сценарий для Reels?",
    answer: "Следуйте формуле: хук (3 секунды) → основной контент (10-20 секунд) → неожиданный поворот → призыв к действию (последние 3-5 секунд)."
  },
  {
    question: "Какие темы лучше всего работают в Reels?",
    answer: "Наиболее эффективны: лайфхаки, обучающий контент, закулисье бизнеса, личные истории и развлекательный контент с юмором."
  },
  {
    question: "Как адаптировать сценарий под разную аудиторию?",
    answer: "Изучите интересы и боли целевой аудитории, используйте их язык и примеры из их жизни, адаптируйте стиль повествования."
  },
  {
    question: "Сколько текста должно быть в Reels?",
    answer: "Придерживайтесь правила: одна ключевая мысль на 3-5 секунд видео. Текст должен быть кратким и легко читаемым."
  },
  {
    question: "Как создать серию связанных Reels?",
    answer: "Разделите большую тему на мини-эпизоды, используйте единый стиль и формат, создавайте интригу между видео."
  },
  {
    question: "Какие ошибки чаще всего допускают в сценариях Reels?",
    answer: "Основные ошибки: слабый хук, перегруженность информацией, отсутствие четкой структуры и неясный призыв к действию."
  },
  {
    question: "Как измерить эффективность сценария?",
    answer: "Отслеживайте показатели: досмотры, сохранения, комментарии и репосты. Анализируйте, какие элементы сценария вызывают наибольший отклик."
  }
];
