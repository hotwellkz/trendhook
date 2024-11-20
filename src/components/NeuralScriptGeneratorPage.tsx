import React from 'react';
import { MetaTags } from './SEO/MetaTags';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { PricingSection } from './PricingSection';
import { CTASection } from './CTASection';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Sparkles, Zap, Target, MessageSquare, Check, Layers, Settings } from 'lucide-react';

export function NeuralScriptGeneratorPage() {
  return (
    <>
      <MetaTags pageName="neuralScriptGenerator" />
      <Navigation />
      
      {/* Hero секция */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-[#AAFF00]">Нейросеть</span> для создания сценария
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Используйте мощь искусственного интеллекта для создания профессиональных сценариев. Экономьте время и ресурсы с нашей нейросетью.
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
              alt="Нейросеть для создания сценария"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Возможности нейросети */}
      <section className="bg-gray-800/30 py-12 md:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Возможности нейросети для создания сценариев
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/20 p-6 rounded-xl">
              <Brain className="w-12 h-12 text-[#AAFF00] mb-4" />
              <h3 className="text-xl font-bold mb-4">Глубокий анализ</h3>
              <p className="text-gray-400 mb-6">
                Нейросеть анализирует успешные видео и создает оптимальные сценарии
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Изучение трендов</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Анализ аудитории</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Оптимизация контента</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/20 p-6 rounded-xl">
              <Layers className="w-12 h-12 text-[#AAFF00] mb-4" />
              <h3 className="text-xl font-bold mb-4">Многослойная генерация</h3>
              <p className="text-gray-400 mb-6">
                Создание сценария с учетом множества параметров
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Структура контента</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Стиль изложения</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Эмоциональный окрас</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/20 p-6 rounded-xl">
              <Settings className="w-12 h-12 text-[#AAFF00] mb-4" />
              <h3 className="text-xl font-bold mb-4">Гибкая настройка</h3>
              <p className="text-gray-400 mb-6">
                Полный контроль над процессом создания
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Параметры генерации</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Форматы вывода</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#AAFF00] mt-1" />
                  <span>Стилевые настройки</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Процесс работы */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">
              Как работает нейросеть для создания сценариев
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#AAFF00]/10 p-3 rounded-xl">
                  <Target className="w-6 h-6 text-[#AAFF00]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">1. Сбор данных</h3>
                  <p className="text-gray-400">
                    Нейросеть собирает и анализирует информацию о целевой аудитории и трендах
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#AAFF00]/10 p-3 rounded-xl">
                  <Brain className="w-6 h-6 text-[#AAFF00]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">2. Обработка</h3>
                  <p className="text-gray-400">
                    Глубокий анализ и создание оптимальной структуры сценария
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#AAFF00]/10 p-3 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-[#AAFF00]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">3. Генерация</h3>
                  <p className="text-gray-400">
                    Создание уникального сценария с учетом всех параметров
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
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
    question: "Как работает нейросеть для создания сценариев?",
    answer: "Нейросеть анализирует большой объем данных, включая успешные видео, тренды и поведение аудитории, чтобы создать оптимальный сценарий для вашего контента."
  },
  {
    question: "Какие преимущества использования нейросети?",
    answer: "Основные преимущества: экономия времени, анализ трендов, уникальность контента, адаптация под аудиторию и постоянное обучение системы."
  },
  {
    question: "Насколько уникальны сгенерированные сценарии?",
    answer: "Каждый сценарий создается индивидуально с учетом ваших параметров и проходит проверку на уникальность перед выдачей результата."
  },
  {
    question: "Можно ли настроить стиль генерации?",
    answer: "Да, нейросеть позволяет настраивать множество параметров: тон повествования, стиль изложения, формат контента и другие характеристики."
  },
  {
    question: "Как быстро создается сценарий?",
    answer: "Генерация сценария занимает всего несколько секунд, включая анализ данных и оптимизацию контента."
  },
  {
    question: "Поддерживает ли нейросеть разные форматы?",
    answer: "Да, нейросеть создает сценарии для различных форматов: короткие видео, рекламные ролики, образовательный контент и другие."
  },
  {
    question: "Как часто обновляется нейросеть?",
    answer: "Система постоянно обучается на новых данных и обновляется для соответствия последним трендам и требованиям."
  },
  {
    question: "Требуется ли специальное обучение?",
    answer: "Нет, интерфейс интуитивно понятен и не требует специальных навыков или технических знаний."
  },
  {
    question: "Есть ли ограничения на использование?",
    answer: "Количество генераций зависит от выбранного тарифного плана. В бесплатной версии доступно 10 генераций."
  },
  {
    question: "Как начать использовать нейросеть?",
    answer: "Просто зарегистрируйтесь, выберите параметры сценария и получите готовый результат за считанные секунды."
  }
];
