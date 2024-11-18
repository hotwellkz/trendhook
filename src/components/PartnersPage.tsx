import React, { useState } from 'react';
import { Activity, ArrowLeft, Copy, RefreshCw, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  item: FAQItem;
}

function FAQAccordion({ item }: FAQAccordionProps) {
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
    question: 'Как это работает?',
    answer: 'Это работает очень просто! Мы предоставляем вам уникальную партнерскую ссылку для распространения. Если кто-то зарегистрирует аккаунт и купит подписку в течение 30 дней после клика по ссылке, вы получите свою долю с продажи!'
  },
  {
    question: 'Какие комиссионные я получу?',
    answer: 'Наша партнерская программа предлагает 30% повторяющейся комиссии. Наша модель с регулярными выплатами означает отличный пассивный доход для вас.'
  },
  {
    question: 'Когда производятся выплаты?',
    answer: 'Выплаты будут отправляться 1-го числа каждого месяца через PayPal.'
  },
  {
    question: 'Существуют ли минимальные требования к выплате?',
    answer: 'Да. Вам нужно иметь минимальную сумму «неоплаченных комиссий» в размере $10 перед получением выплаты, чтобы снизить расходы на транзакционные сборы.'
  },
  {
    question: 'Как работает отслеживание партнеров?',
    answer: 'Когда кто-то нажимает на вашу ссылку, в их браузере закрепляется cookie-файл на 30 дней. Это позволяет отслеживать их, и при регистрации аккаунта они навсегда закрепляются за вами.'
  },
  {
    question: 'Могу ли я запустить рекламу для продвижения ViralHook?',
    answer: 'Да, вы можете использовать любые легальные методы продвижения, включая контекстную рекламу, социальные сети и email-маркетинг.'
  }
];

export function PartnersPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);

  const generateReferralCode = () => {
    const code = `ref_${Math.random().toString(36).substring(2, 8)}`;
    setReferralCode(code);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <nav className="border-b border-gray-800 bg-black/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Activity className="w-6 h-6 text-[#AAFF00]" />
              <button 
                onClick={() => navigate('/')}
                className="text-xl font-bold hover:text-[#AAFF00] transition-colors"
              >
                ViralHooks
              </button>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Назад</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8 pb-20">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Панель инструментов для партнеров</h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold mb-1">0</div>
            <div className="text-sm text-gray-400">КЛИК</div>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold mb-1">0</div>
            <div className="text-sm text-gray-400">РЕГИСТРАЦИЯ</div>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold mb-1">0</div>
            <div className="text-sm text-gray-400">КОНВЕРСИИ</div>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold mb-1">0 $</div>
            <div className="text-sm text-gray-400">НЕОПЛАЧЕННАЯ КОМИССИЯ</div>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold mb-1">0 $</div>
            <div className="text-sm text-gray-400">ВЫПЛАЧЕННАЯ КОМИССИЯ</div>
          </div>
        </div>

        <div className="bg-gray-800/30 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Ваш партнерский URL</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              placeholder="Введите ваш реферальный код"
              className="flex-1 bg-black/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-700/50"
            />
            <button
              onClick={generateReferralCode}
              className="bg-[#AAFF00] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#88CC00] transition-colors"
            >
              Сгенерировать URL
            </button>
            {referralCode && (
              <button
                onClick={copyToClipboard}
                className="bg-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <RefreshCw className="w-5 h-5" />
                    Скопировано!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Копировать
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="bg-gray-800/30 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Электронная почта PayPal</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Введите свой адрес электронной почты PayPal"
              className="flex-1 bg-black/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-700/50"
            />
            <button className="bg-[#AAFF00] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#88CC00] transition-colors">
              Обновить
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Примечание: сюда будут отправлены ваши комиссионные выплаты.
          </p>
        </div>

        <div className="bg-gray-800/30 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Часто задаваемые вопросы</h2>
          <div className="space-y-2">
            {faqItems.map((item, index) => (
              <FAQAccordion key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
