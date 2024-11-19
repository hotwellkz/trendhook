import React, { useState } from 'react';
import { Activity, LogOut, User, Settings, BarChart2, PlusCircle, AlertCircle, Users } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { ScriptGenerator } from './ScriptGenerator';
import { SavedScripts } from './Dashboard/SavedScripts';
import { useAuth } from '../hooks/useAuth';

export function Dashboard() {
  const { user, loading } = useAuth();
  const [showGenerator, setShowGenerator] = useState(false);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Загрузка...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  const handleUpgrade = () => {
    navigate('/billing');
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  const isTrialExpired = user.subscription.status === 'expired';
  const isInTrial = user.subscription.status === 'trial';
  
  // Расчет оставшихся дней подписки
  const getSubscriptionDaysLeft = () => {
    const now = new Date();
    const expiresAt = new Date(user.subscription.expiresAt);
    const diff = expiresAt.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return Math.max(0, days);
  };

  const subscriptionDaysLeft = getSubscriptionDaysLeft();

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Навигация */}
      <nav className="sticky top-0 z-50 border-b border-gray-800 bg-black/95 backdrop-blur-sm">
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
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Выйти</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 max-w-6xl mx-auto px-4 py-8">
        {/* Приветствие и информация о подписке */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Добро пожаловать, {user.displayName || 'Пользователь'}!
          </h1>
          <div className="text-gray-400">
            <p>
              Ваш план: <span className="text-[#AAFF00]">{user.subscription.plan || 'Бесплатный'}</span>
              {isInTrial ? (
                <span className="ml-2 text-yellow-400">
                  (Пробный период: осталось {subscriptionDaysLeft} дней)
                </span>
              ) : !isTrialExpired && (
                <span className="ml-2 text-[#AAFF00]">
                  (Осталось {subscriptionDaysLeft} дней)
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Предупреждение об истекшей подписке */}
        {isTrialExpired && (
          <div className="mb-8 bg-red-500/10 text-red-500 p-4 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Подписка истекла</h3>
              <p className="text-sm">
                Ваша подписка закончилась. Для продолжения использования сервиса, пожалуйста, 
                выберите подходящий тарифный план.
              </p>
              <button
                onClick={handleUpgrade}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors"
              >
                Выбрать план
              </button>
            </div>
          </div>
        )}

        {/* Мобильная версия: кнопка создания и генератор */}
        <div className="md:hidden">
          {!showGenerator ? (
            <button
              onClick={() => setShowGenerator(true)}
              disabled={isTrialExpired}
              className="w-full flex items-center justify-center gap-2 bg-[#AAFF00] text-black px-6 py-3 rounded-xl font-medium hover:bg-[#88CC00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-8"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Создать новый сценарий</span>
            </button>
          ) : (
            <div className="mb-8">
              <ScriptGenerator />
            </div>
          )}
        </div>

        {/* Информационные карточки */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-gray-800/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#AAFF00]/10 rounded-lg">
                <User className="w-6 h-6 text-[#AAFF00]" />
              </div>
              <h2 className="text-xl font-semibold">Профиль</h2>
            </div>
            <div className="space-y-2 text-gray-400">
              <p>Email: {user.email}</p>
              <p>Токенов осталось: {user.subscription.tokensLeft || 0}</p>
            </div>
          </div>

          <div className="bg-gray-800/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#AAFF00]/10 rounded-lg">
                <BarChart2 className="w-6 h-6 text-[#AAFF00]" />
              </div>
              <h2 className="text-xl font-semibold">Статистика</h2>
            </div>
            <div className="space-y-2 text-gray-400">
              <p>Проанализировано видео: {user.stats?.videosAnalyzed || 0}</p>
              <p>Создано сценариев: {user.stats?.scriptsGenerated || 0}</p>
              {user.stats?.lastScriptDate && (
                <p className="text-sm">
                  Последний сценарий: {new Date(user.stats.lastScriptDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          <div className="bg-gray-800/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#AAFF00]/10 rounded-lg">
                <Settings className="w-6 h-6 text-[#AAFF00]" />
              </div>
              <h2 className="text-xl font-semibold">Настройки</h2>
            </div>
            <div className="space-y-3">
              <button 
                onClick={handleEditProfile}
                className="w-full bg-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition-colors"
              >
                Изменить профиль
              </button>
              <button
                onClick={handleUpgrade}
                className="w-full bg-[#AAFF00] text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#88CC00] transition-colors"
              >
                Улучшить план
              </button>
              <button
                onClick={() => navigate('/partners')}
                className="w-full bg-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span>Партнерская программа</span>
              </button>
            </div>
          </div>
        </div>

        {/* Сохраненные сценарии */}
        <SavedScripts />

        {/* Десктопная версия: кнопка создания и генератор */}
        <div className="hidden md:block">
          {!showGenerator ? (
            <button
              onClick={() => setShowGenerator(true)}
              disabled={isTrialExpired}
              className="flex items-center gap-2 bg-[#AAFF00] text-black px-6 py-3 rounded-xl font-medium hover:bg-[#88CC00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Создать новый сценарий</span>
            </button>
          ) : (
            <div className="mb-8">
              <ScriptGenerator />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
