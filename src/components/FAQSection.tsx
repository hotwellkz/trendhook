import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Почему ViralHooks отличается от ChatGPT?',
    answer: 'ViralHooks — это не просто еще одна обертка над AI GPT. Это узкоспециализированный инструмент для создания короткого видео-контента, обученный на тысячах вирусных хитов для создания сценариев, хуков и идей, адаптированных под ваш уникальный голос, стиль и целевую аудиторию.'
  },
  {
    question: 'Может ли ViralHooks помочь создавать аутентичный, не роботизированный контент?',
    answer: 'Да! ViralHooks анализирует ваш стиль общения и тон голоса, чтобы генерировать контент, который звучит естественно и аутентично. Наши алгоритмы обучены различать человеческий и роботизированный текст, обеспечивая натуральное звучание.'
  },
  {
    question: 'Для кого предназначен ViralHooks?',
    answer: 'ViralHooks создан для контент-криейторов, владельцев бизнеса и креативных агентств, которые хотят создавать вовлекающий контент быстро и эффективно. Если вы создаете короткие видео для социальных сетей, ViralHooks станет вашим незаменимым помощником.'
  },
  {
    question: 'Что такое ViralHooks?',
    answer: 'ViralHooks — это AI-платформа для создания вирусного контента, которая помогает создавать захватывающие короткие видео. Она включает библиотеку из более чем 1 миллиона проанализированных вирусных роликов, инструменты для генерации идей и сценариев, а также аналитику для оценки потенциала вирусности.'
  },
  {
    question: 'Есть ли пробный период у ViralHooks?',
    answer: 'Да! Мы предлагаем 7-дневный бесплатный пробный период для всех новых пользователей. В течение этого времени вы получаете полный доступ ко всем функциям платформы, чтобы оценить её возможности.'
  },
  {
    question: 'Какие условия бесплатного плана и политики возврата?',
    answer: 'Бесплатный план включает 10 токенов для тестирования платформы. Мы также предлагаем 30-дневную гарантию возврата денег при первой оплате любого тарифного плана. Если вы не удовлетворены результатами, мы вернем вам полную стоимость без лишних вопросов.'
  }
];

function FAQItem({ question, answer }: FAQItem) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-800 last:border-b-0">
      <button
        className="w-full py-4 md:py-6 flex justify-between items-start text-left group transition-colors hover:text-[#AAFF00]"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg md:text-xl font-semibold pr-8">{question}</h3>
        <div className="flex-shrink-0 mt-1">
          {isOpen ? (
            <Minus className="w-5 h-5 md:w-6 md:h-6 text-[#AAFF00]" />
          ) : (
            <Plus className="w-5 h-5 md:w-6 md:h-6 text-[#AAFF00] group-hover:rotate-90 transition-transform" />
          )}
        </div>
      </button>
      {isOpen && (
        <div 
          className="pb-4 md:pb-6 text-gray-400 text-base md:text-lg"
          role="region"
        >
          <p className="pr-8">{answer}</p>
        </div>
      )}
    </div>
  );
}

export function FAQSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="text-center mb-8 md:mb-12 lg:mb-16">
        <div className="inline-block bg-gray-800/50 rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6">
          <span className="text-[#AAFF00] text-sm md:text-base">Частые вопросы</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Есть вопросы?
        </h2>
        <p className="text-gray-400 text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4">
          Все наши планы включают бесплатный уровень с 10 токенами и 30-дневный возврат средств при первой оплате.
        </p>
        <button className="bg-[#AAFF00] text-black px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium hover:bg-[#88CC00] transition-colors mt-6 md:mt-8 text-sm md:text-base">
          Присоединиться к бете
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-gray-800/30 rounded-2xl p-4 md:p-6 lg:p-8">
        {faqItems.map((item, index) => (
          <FAQItem key={index} {...item} />
        ))}
      </div>
    </section>
  );
}