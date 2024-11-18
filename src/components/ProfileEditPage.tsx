import React, { useState } from 'react';
import { Activity, ArrowLeft, AlertCircle, Loader2, X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { stripeService } from '../services/stripe';

interface PlanOption {
  title: string;
  price: number;
  priceId: string;
  description: string;
}

const plans: PlanOption[] = [
  {
    title: 'Контент-мейкер',
    price: 17,
    priceId: 'price_1QMAyrEcNnO76qBWbU4T8pLQ',
    description: '60 токенов в месяц'
  },
  {
    title: 'Бизнес',
    price: 37,
    priceId: 'price_1QMAzGEcNnO76qBWTTBnFGDA',
    description: '250 токенов в месяц'
  },
  {
    title: 'Агентство',
    price: 97,
    priceId: 'price_1QMAzaEcNnO76qBWBIzupvK1',
    description: 'Безлимитные токены'
  }
];

export function ProfileEditPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      if (!user?.id) {
        throw new Error('Пользователь не авторизован');
      }

      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, {
        displayName,
        updatedAt: new Date()
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Произошла ошибка при обновлении профиля');
    } finally {
      setLoading(false);
    }
  };

  const handlePlanSelect = async (priceId: string) => {
    try {
      if (!user?.id) {
        throw new Error('Пользователь не авторизован');
      }
      setShowPlanModal(false);
      await stripeService.createCheckoutSession(user.id, priceId);
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setError('Произошла ошибка при создании сессии оплаты');
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

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Редактировать профиль</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Имя пользователя
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-black/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-700/50"
              placeholder="Ваше имя"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ''}
              className="w-full bg-black/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-700/50"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              План подписки
            </label>
            <button
              type="button"
              onClick={() => setShowPlanModal(true)}
              className="w-full bg-black/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-700/50 flex justify-between items-center"
            >
              <span>{user?.subscription?.plan || 'Бесплатный'}</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 text-red-500 p-4 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-500/10 text-green-500 p-4 rounded-lg">
              Профиль успешно обновлен! Перенаправление...
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#AAFF00] text-black py-3 rounded-lg font-medium hover:bg-[#88CC00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Сохранение...</span>
              </>
            ) : (
              'Сохранить изменения'
            )}
          </button>
        </form>

        {/* План подписки - Модальное окно */}
        {showPlanModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-2xl w-full max-w-lg relative">
              <button
                onClick={() => setShowPlanModal(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Выберите план</h2>
                <div className="space-y-4">
                  {plans.map((plan) => (
                    <button
                      key={plan.priceId}
                      onClick={() => handlePlanSelect(plan.priceId)}
                      className="w-full bg-black/40 rounded-xl p-4 text-left hover:bg-black/60 transition-colors border border-gray-700/50"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{plan.title}</span>
                        <span className="text-[#AAFF00]">${plan.price}/мес</span>
                      </div>
                      <p className="text-sm text-gray-400">{plan.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
