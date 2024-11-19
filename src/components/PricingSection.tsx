import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { stripeService } from '../services/stripe';
import { useAuth } from '../hooks/useAuth';

interface PricingPlan {
  title: string;
  description: string;
  price: number;
  priceId: string;
  features: string[];
  isPopular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    title: 'Контент-мейкер',
    description: 'Идеально для создателей, публикующих 1-3 видео в неделю.',
    price: 17,
    priceId: 'price_1QMAyrEcNnO76qBWbU4T8pLQ',
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
    description: 'Идеально для бизнесов с ежедневными публикациями.',
    price: 37,
    priceId: 'price_1QMAzGEcNnO76qBWTTBnFGDA',
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
    description: 'Идеально для креативных агентств с множеством клиентов.',
    price: 97,
    priceId: 'price_1QMAzaEcNnO76qBWBIzupvK1',
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

export function PricingSection() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string) => {
    try {
      if (!user) {
        navigate('/signup');
        return;
      }

      await stripeService.createCheckoutSession(user.id, priceId);
    } catch (error) {
      console.error('Ошибка подписки:', error);
      alert('Произошла ошибка при создании подписки. Пожалуйста, попробуйте позже.');
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <div className="inline-block bg-gray-800/50 rounded-full px-4 py-2 mb-6">
          <span className="text-[#AAFF00]">Тарифы</span>
        </div>
        <h2 className="text-5xl font-bold mb-4">
          Простые, Прозрачные Тарифы
        </h2>
        <p className="text-gray-400 text-xl max-w-3xl mx-auto">
          Все наши планы включают бесплатный уровень с 10 токенами и 30-дневный возврат средств при первой оплате.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {pricingPlans.map((plan) => (
          <div
            key={plan.title}
            onMouseEnter={() => setHoveredPlan(plan.priceId)}
            onMouseLeave={() => setHoveredPlan(null)}
            className={`bg-gray-800/30 rounded-2xl p-8 transition-all duration-200 relative ${
              plan.isPopular ? 'ring-2 ring-[#AAFF00]' : ''
            } ${
              hoveredPlan === plan.priceId 
                ? 'transform scale-[1.02]' 
                : ''
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
              <h3 className="text-2xl font-bold">{plan.title}</h3>
              <p className="text-gray-400">{plan.description}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-[#AAFF00]">${plan.price}</span>
                <span className="text-gray-400">/ в месяц</span>
              </div>
              <ul className="space-y-4 mt-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#AAFF00] flex-shrink-0 mt-1" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/signup')}
                className={`w-full py-3 rounded-full font-medium transition-colors ${
                  plan.isPopular || hoveredPlan === plan.priceId
                    ? 'bg-[#AAFF00] text-black hover:bg-[#88CC00]'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                Начать бесплатно
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
