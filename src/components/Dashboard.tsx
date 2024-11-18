import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Activity, LogOut, User, Settings, BarChart2, PlusCircle, AlertCircle } from 'lucide-react';
import { auth } from '../config/firebase';
import { ScriptGenerator } from './ScriptGenerator';
import { useAuth } from '../hooks/useAuth';

export function Dashboard() {
  const { user, loading } = useAuth();
  const [showGenerator, setShowGenerator] = React.useState(false);
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

  const isTrialExpired = user?.subscription?.status === 'expired';
  const isInTrial = user?.subscription?.status === 'trial';
  const trialDaysLeft = isInTrial && user?.subscription?.trialEndsAt ? 
    Math.max(0, Math.ceil((user.subscription.trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))) : 
    0;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Навигация */}
      <nav className="sticky top-0 z-50 border-b border-gray-800 bg-black/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Activity className="w-6 h-6 text-[#AAFF00]" />
              <span className="text-xl font-bold">ViralHooks</span>
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

      <div className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
          {/* Приветствие и статус подписки */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Добро пожаловать, {user.displayName || 'Пользователь'}!
            </h1>
            <p className="text-gray-400 text-sm md:text-base">
              Ваш план: <span className="text-[#AAFF00]">{user.subscription?.plan || 'Бесплатный'}</span>
              {isInTrial && (
                <span className="ml-2 text-yellow-400">
                  (Пробный период: осталось {trialDaysLeft} дней)
                </span>
              )}
            </p>
          </div>

          {/* Уведомление об истекшем пробном периоде */}
          {isTrialExpired && (
            <div className="mb-6 md:mb-8 bg-red-500/10 text-red-500 p-4 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Пробный период истек</h3>
                <p className="text-sm">
                  Ваш пробный период закончился. Для продолжения использования сервиса, пожалуйста, 
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

          {/* Информационные карточки */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {/* Профиль */}
            <div className="bg-gray-800/30 rounded-xl p-4 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#AAFF00]/10 rounded-lg">
                  <User className="w-5 h-5 md:w-6 md:h-6 text-[#AAFF00]" />
                </div>
                <h2 className="text-lg md:text-xl font-semibold">Профиль</h2>
              </div>
              <div className="space-y-2 text-sm md:text-base text-gray-400">
                <p>Email: {user.email}</p>
                <p>Токенов осталось: {user.subscription?.tokensLeft || 0}</p>
              </div>
            </div>

            {/* Статистика */}
            <div className="bg-gray-800/30 rounded-xl p-4 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#AAFF00]/10 rounded-lg">
                  <BarChart2 className="w-5 h-5 md:w-6 md:h-6 text-[#AAFF00]" />
                </div>
                <h2 className="text-lg md:text-xl font-semibold">Статистика</h2>
              </div>
              <div className="space-y-2 text-sm md:text-base text-gray-400">
                <p>Проанализировано видео: 0</p>
                <p>Создано сценариев: 0</p>
              </div>
            </div>

            {/* Настройки */}
            <div className="bg-gray-800/30 rounded-xl p-4 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#AAFF00]/10 rounded-lg">
                  <Settings className="w-5 h-5 md:w-6 md:h-6 text-[#AAFF00]" />
                </div>
                <h2 className="text-lg md:text-xl font-semibold">Настройки</h2>
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
              </div>
            </div>
          </div>

          {/* Кнопка создания сценария */}
          <div className="mb-6 md:mb-8">
            <button
              onClick={() => setShowGenerator(!showGenerator)}
              disabled={isTrialExpired}
              className="flex items-center gap-2 bg-[#AAFF00] text-black px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-medium hover:bg-[#88CC00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Создать новый сценарий</span>
            </button>
          </div>

          {/* Генератор сценариев */}
          {showGenerator && (
            <div className="mb-12">
              <ScriptGenerator />
            </div>
          )}

          {/* Последняя активность */}
          {!showGenerator && (
            <div className="bg-gray-800/30 rounded-xl p-4 md:p-6 mb-12">
              <h2 className="text-xl font-semibold mb-4">Последняя активность</h2>
              <div className="text-gray-400 text-center py-8">
                Пока нет активности. Начните анализировать видео или создавать сценарии!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
