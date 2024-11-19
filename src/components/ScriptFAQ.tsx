import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
}

function FAQAccordion({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left hover:text-[#AAFF00] transition-colors group"
      >
        <h3 className="font-semibold pr-8">{item.question}</h3>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''} text-gray-400 group-hover:text-[#AAFF00]`} />
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-400">
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  );
}

const faqItems: FAQItem[] = [
  {
    question: 'Как работает генератор сценариев?',
    answer: 'Наш генератор использует передовые алгоритмы искусственного интеллекта для создания уникальных сценариев. Вы вводите тему, целевую аудиторию и желаемый формат, а ИИ создает оптимальный сценарий.'
  },
  {
    question: 'Сколько времени занимает генерация сценария?',
    answer: 'Генерация одного сценария занимает всего несколько секунд. Это значительно быстрее, чем написание сценария вручную.'
  },
  {
    question: 'Можно ли редактировать сгенерированные сценарии?',
    answer: 'Да, все сгенерированные сценарии можно редактировать и адаптировать под ваши потребности. Вы сохраняете полный контроль над контентом.'
  },
  {
    question: 'Подходит ли генератор для разных типов видео?',
    answer: 'Да, генератор создает сценарии для различных форматов: образовательные видео, развлекательный контент, рекламные ролики и многое другое.'
  },
  {
    question: 'Как обеспечивается уникальность сценариев?',
    answer: 'ИИ создает каждый сценарий с нуля, учитывая ваши параметры и целевую аудиторию. Все сценарии проходят проверку на уникальность.'
  },
  {
    question: 'Есть ли ограничения на количество генераций?',
    answer: 'Количество генераций зависит от выбранного тарифного плана. В бесплатной версии доступно 10 генераций.'
  },
  {
    question: 'Можно ли сохранять сгенерированные сценарии?',
    answer: 'Да, все сценарии автоматически сохраняются в вашем личном кабинете и доступны в течение определенного времени.'
  },
  {
    question: 'Поддерживает ли генератор разные языки?',
    answer: 'На данный момент генератор поддерживает русский и английский языки. Мы постоянно работаем над добавлением новых языков.'
  },
  {
    question: 'Как начать использовать генератор сценариев?',
    answer: 'Просто зарегистрируйтесь на сайте, и вы получите доступ к генератору сценариев. Первые 7 дней использования бесплатны.'
  },
  {
    question: 'Есть ли обучающие материалы по работе с генератором?',
    answer: 'Да, мы предоставляем подробные инструкции и обучающие материалы по эффективному использованию генератора сценариев.'
  }
];

export function ScriptFAQ() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Часто задаваемые вопросы о генераторе сценариев
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Ответы на популярные вопросы о нашем ИИ-генераторе сценариев
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-gray-800/30 rounded-2xl p-6">
        {faqItems.map((item, index) => (
          <FAQAccordion key={index} item={item} />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/signup"
          className="inline-block bg-[#AAFF00] text-black px-8 py-3 rounded-full font-medium hover:bg-[#88CC00] transition-colors"
        >
          Попробовать генератор
        </Link>
      </div>
    </section>
  );
}
