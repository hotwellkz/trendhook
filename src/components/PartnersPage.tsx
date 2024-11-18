import React, { useState } from 'react';
import { Activity, ArrowLeft, Copy, RefreshCw, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Как это работает?',
    answer: 'Вы получаете уникальную реферальную ссылку, которой делитесь с другими. Когда кто-то регистрируется по вашей ссылке и совершает покупку, вы получаете комиссионные.'
  },
  {
    question: 'Какие комиссионные я получу?',
    answer: '30% от первой покупки и 15% от всех последующих покупок приведенного вами пользователя.'
  },
  {
    question: 'Когда производятся выплаты?',
    answer: 'Выплаты производятся каждый месяц 1-го числа при достижении минимальной суммы в $50.'
  },
  {
    question: 'Существуют ли минимальные требования к выплате?',
    answer: 'Да, минимальная сумма для выплаты составляет $50. Если сумма меньше, она переносится на следующий месяц.'
  },
  {
    question: 'Как работает отслеживание партнеров?',
    answer: 'Мы используем современную систему отслеживания через cookies со сроком действия 30 дней. Все конверсии фиксируются в вашем личном кабинете.'
  },
  {
    question: 'Могу ли я запустить рекламу для продвижения ViralHook?',
    answer: 'Да, вы можете использовать любые легальные методы продвижения, включая контекстную рекламу, социальные сети и email-маркетинг.'
  }
];

function FAQItem({ question, answer }: FAQItem) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-800 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left group transition-colors hover:text-[#AAFF00]"
      >
        <span className="text-lg font-semibold pr-8">{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-400">
          <p className="pr-8">{answer}</p>
        </div>
      )}
    </div>
  );
}

export function PartnersPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [paypalEmail, setPaypalEmail] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);

  const generateReferralLink = () => {
    if (!referralCode) return;
    return `https://viralhooks.ai/?ref=${referralCode}`;
  };

  const copyToClipboard = async () => {
    const link = generateReferralLink();
    if (!link) return;

    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleUpdatePayPal = () => {
    // Здесь будет логика обновления PayPal email
    console.log('Updating PayPal email:', paypalEmail);
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

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Панель инструментов для партнеров</h1>
        <p className="text-gray-400 mb-8">Отслеживайте свои комиссионные и управляйте партнерской программой</p>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800/30 rounded-xl p-4">
            <div className="text-2xl font-bold mb-1">0</div>
            <div className="text-sm text-gray-400">КЛИК</div>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-4">
            <div className="text-2xl font-bold mb-1">0</div>
            <div className="text-sm text-gray-400">РЕГИСТРАЦИЯ</div>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-4">
            <div className="text-2xl font-bold mb-1">0</div>
            <div className="text-sm text-gray-400">КОНВЕРСИИ</div>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-4">
            <div className="text-2xl font-bold mb-1">0 $</div>
            <div className="text-sm text-gray-400">НЕОПЛАЧЕННАЯ КОМИССИЯ</div>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-4">
            <div className="text-2xl font-bold mb-1">0 $</div>
            <div className="text-sm text-gray-400">ВЫПЛАЧЕННАЯ КОМИССИЯ</div>
          </div>
        </div>

        {/* Реферальная ссылка */}
        <div className="bg-gray-800/30 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Ваш партнерский URL</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              placeholder="Введите ваш реферальный код"
              className="flex-1 bg-black/40 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-700/50"
            />
            <button
              onClick={copyToClipboard}
              disabled={!referralCode}
              className="bg-[#AAFF00] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#88CC00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
            >
              {copied ? (
                <>
                  <RefreshCw className="w-5 h-5" />
                  Скопировано!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Копировать URL
                </>
              )}
            </button>
          </div>
        </div>

        {/* PayPal Email */}
        <div className="bg-gray-800/30 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Электронная почта PayPal</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
              placeholder="Введите свой адрес электронной почты PayPal"
              className="flex-1 bg-black/40 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-700/50"
            />
            <button
              onClick={handleUpdatePayPal}
              className="bg-[#AAFF00] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#88CC00] transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              Обновить
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Примечание: сюда будут отправлены ваши комиссионные выплаты.
          </p>
        </div>

        {/* FAQ */}
        <div className="bg-gray-800/30 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Часто задаваемые вопросы</h2>
          <div className="space-y-2">
            {faqItems.map((item, index) => (
              <FAQItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
