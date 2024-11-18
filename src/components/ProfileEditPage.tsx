import React, { useState } from 'react';
import { Activity, ArrowLeft, AlertCircle, Loader2, X, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { stripeService } from '../services/stripe';
import { updatePassword } from 'firebase/auth';
import { auth } from '../config/firebase';

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
  const [paypalEmail, setPaypalEmail] = useState(user?.paypalEmail || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  // Состояния для смены пароля
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

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
        paypalEmail,
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

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);
    setPasswordLoading(true);

    try {
      if (!auth.currentUser) {
        throw new Error('Пользователь не авторизован');
      }

      if (newPassword !== confirmPassword) {
        throw new Error('Новые пароли не совпадают');
      }

      if (newPassword.length < 6) {
        throw new Error('Новый пароль должен содержать минимум 6 символов');
      }

      // Обновляем пароль
      await updatePassword(auth.currentUser, newPassword);

      setPasswordSuccess(true);
      setNewPassword('');
      setCurrentPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        setPasswordSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Error changing password:', err);
      setPasswordError(
        err instanceof Error 
          ? err.message 
          : 'Произошла ошибка при смене пароля'
      );
    } finally {
      setPasswordLoading(false);
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

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
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
              PayPal Email
            </label>
            <input
              type="email"
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
              className="w-full bg-black/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-700/50"
              placeholder="Ваш PayPal email для выплат"
              disabled={loading}
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

        {/* Форма смены пароля */}
        <div className="bg-gray-800/30 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Сменить пароль</h2>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Текущий пароль
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-black/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-700/50 pr-10"
                  required
                  disabled={passwordLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Новый пароль
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-black/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-700/50 pr-10"
                  required
                  disabled={passwordLoading}
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Подтвердите новый пароль
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-black/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-700/50 pr-10"
                  required
                  disabled={passwordLoading}
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {passwordError && (
              <div className="bg-red-500/10 text-red-500 p-4 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className="bg-green-500/10 text-green-500 p-4 rounded-lg">
                Пароль успешно изменен!
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gray-700 text-white py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={passwordLoading}
            >
              {passwordLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Изменение пароля...</span>
                </>
              ) : (
                'Изменить пароль'
              )}
            </button>
          </form>
        </div>

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
                      onMouseEnter={() => setHoveredPlan(plan.priceId)}
                      onMouseLeave={() => setHoveredPlan(null)}
                      className={`w-full bg-black/40 rounded-xl p-4 text-left transition-all duration-200 border ${
                        hoveredPlan === plan.priceId 
                          ? 'border-[#AAFF00] bg-black/60 scale-[1.02]' 
                          : 'border-gray-700/50 hover:bg-black/60'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{plan.title}</span>
                        <span className={`${
                          hoveredPlan === plan.priceId ? 'text-[#AAFF00]' : 'text-gray-400'
                        } transition-colors`}>${plan.price}/мес</span>
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
