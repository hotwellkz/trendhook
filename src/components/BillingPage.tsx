import React from 'react';
import { Activity, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { stripeService } from '../services/stripe';

interface PlanFeature {
  text: string;
}

interface PricingPlan {
  title: string;
  price: number;
  priceId: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

interface FAQItem {
  question: string;
  answer: string;
}

function PlanFeature({ text }: PlanFeature) {
  return (
    <div className="flex items-center gap-2">
      <svg
        className="w-5 h-5 text-[#AAFF00]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      <span className="text-gray-300">{text}</span>
    </div>
  );
}

function FAQItem({ question, answer }: FAQItem) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-gray-800 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left group transition-colors hover:text-[#AAFF00]"
      >
        <span className="text-lg font-semibold pr-8">{question}</span>
        {isOpen ? (
          <Minus className="w-5 h-5 text-[#AAFF00]" />
        ) : (
          <Plus className="w-5 h-5 text-[#AAFF00] group-hover:rotate-90 transition-transform" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-400">
          <p className="pr-8">{answer}</p>
        </div>
      )}
    </div>
  );
}

const plans: PricingPlan[] = [
  {
    title: 'Контент-мейкер',
    price: 17,
    priceId: 'price_1QMAyrEcNnO76qBWbU4T8pLQ',
    description: 'Идеально для создателей, публикующих 1-3 видео в неделю.',
    features: [
      'Библиотека 1M+ Reels',
      '60 токенов в месяц',
      '1 целевая аудитория',
      '1 фирменный стиль',
      'Чат-поддержка',
      '30-дневная гарантия возврата'
    ]
  },
  {
    title: 'Бизнес',
    price: 37,
    priceId: 'price_1QMAzGEcNnO76qBWTTBnFGDA',
    description: 'Идеально для бизнесов с ежедневными публикациями.',
    features: [
      'Библиотека 1M+ Reels',
      '250 токенов в месяц',
      '4 целевых аудитории',
      '1 фирменный стиль',
      'Приоритетная поддержка',
      '30-дневная гарантия возврата'
    ],
    isPopular: true
  },
  {
    title: 'Агентство',
    price: 97,
    priceId: 'price_1QMAzaEcNnO76qBWBIzupvK1',
    description: 'Идеально для креативных агентств с множеством клиентов.',
    features: [
      'Библиотека 1M+ Reels',
      'Безлимитные токены',
      '20 целевых аудиторий',
      '20 фирменных стилей',
      'Эксклюзивная поддержка',
      '30-дневная гарантия возврата'
    ]
  }
];

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

export function BillingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isUpgrading, setIsUpgrading] = React.useState(false);

  const handleUpgrade = async (priceId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setIsUpgrading(true);
      await stripeService.createCheckoutSession(user.id, priceId);
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
    } finally {
      setIsUpgrading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Навигация */}
      <nav className="border-b border-gray-800 bg-black/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Activity className="w-6 h-6 text-[#AAFF00]" />
              <span className="text-xl font-bold text-white">ViralHooks</span>
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

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Текущий план */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Управление подпиской</h1>
          <p className="text-gray-400">Управляйте своей подпиской и платежной информацией</p>
        </div>

        <div className="bg-gray-800/30 rounded-2xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#AAFF00]/10 rounded-xl">
              <svg
                className="w-6 h-6 text-[#AAFF00]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">Текущий план</h3>
              <div className="text-gray-400">
                <p>План: {user?.subscription?.plan || 'Бесплатный'}</p>
                <p>Осталось токенов: {user?.subscription?.tokensLeft || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Выбор плана */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Сменить план</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.title}
                className={`bg-gray-800/30 rounded-2xl p-6 relative ${
                  plan.isPopular ? 'ring-2 ring-[#AAFF00]' : ''
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#AAFF00] text-black text-sm font-medium px-3 py-1 rounded-full">
                      Популярный
                    </span>
                  </div>
                )}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">{plan.title}</h3>
                  <p className="text-gray-400">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[#AAFF00]">${plan.price}</span>
                    <span className="text-gray-400">/месяц</span>
                  </div>
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <PlanFeature key={index} text={feature} />
                    ))}
                  </div>
                  <button
                    onClick={() => handleUpgrade(plan.priceId)}
                    disabled={isUpgrading}
                    className={`w-full py-2.5 rounded-lg font-medium transition-colors ${
                      plan.isPopular
                        ? 'bg-[#AAFF00] text-black hover:bg-[#88CC00]'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isUpgrading ? 'Загрузка...' : 'Выбрать план'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ секция */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <svg
              className="w-6 h-6 text-[#AAFF00]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-white">Часто задаваемые вопросы</h2>
          </div>
          <div className="bg-gray-800/30 rounded-2xl p-6">
            {faqItems.map((item, index) => (
              <FAQItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
