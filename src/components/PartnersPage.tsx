import React, { useState } from 'react';
import { Activity, ArrowLeft, Copy, RefreshCw, ChevronDown, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

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
  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [paypalEmail, setPaypalEmail] = useState(user?.paypalEmail || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const generateReferralLink = () => {
    if (!user?.id) return;

    // Создаем уникальный код на основе ID пользователя и временной метки
    const timestamp = Date.now().toString(36);
    const uniqueId = user.id.slice(-6);
    const referralCode = `${uniqueId}_${timestamp}`;

    // Создаем полный URL с реферальным кодом
    const baseUrl = window.location.origin;
    const fullReferralLink = `${baseUrl}/signup?ref=${referralCode}`;
    
    setReferralLink(fullReferralLink);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const updatePaypalEmail = async () => {
    if (!user?.id || !paypalEmail) return;

    setIsUpdating(true);
    try {
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, {
        paypalEmail: paypalEmail,
        updatedAt: new Date()
      });
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating PayPal email:', error);
      alert('Произошла ошибка при обновлении email');
    } finally {
      setIsUpdating(false);
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
          <h2 className="text-xl font-bold mb-4">Ваша партнерская ссылка</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={referralLink}
              readOnly
              placeholder="Нажмите 'Сгенерировать ссылку' для получения вашей уникальной ссылки"
              className="flex-1 bg-black/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-700/50"
            />
            <button
              onClick={generateReferralLink}
              disabled={!user}
              className="bg-[#AAFF00] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#88CC00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Сгенерировать ссылку
            </button>
            {referralLink && (
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
          {!user && (
            <p className="text-sm text-red-400 mt-2">
              Необходимо войти в систему для генерации партнерской ссылки
            </p>
          )}
        </div>

        <div className="bg-gray-800/30 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Электронная почта PayPal</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
              placeholder="Введите свой адрес электронной почты PayPal"
              className="flex-1 bg-black/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-700/50"
            />
            <button 
              onClick={updatePaypalEmail}
              disabled={isUpdating || !user}
              className="bg-[#AAFF00] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#88CC00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Обновление...
                </>
              ) : (
                'Обновить'
              )}
            </button>
          </div>
          {updateSuccess && (
            <p className="text-sm text-green-400 mt-2">
              PayPal email успешно обновлен!
            </p>
          )}
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
