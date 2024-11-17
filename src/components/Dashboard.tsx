import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Activity, LogOut, User, Settings, BarChart2, PlusCircle } from 'lucide-react';
import { auth } from '../config/firebase';
import { ScriptGenerator } from './ScriptGenerator';

export function Dashboard() {
  const { user, loading } = useAuth();
  const [showGenerator, setShowGenerator] = React.useState(false);

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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Навигация */}
      <nav className="border-b border-gray-800 bg-black/95 backdrop-blur-sm">
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
                <span>Выйти</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Основной контент */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Приветствие и статистика */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Добро пожаловать, {user.displayName || 'Пользователь'}!
          </h1>
          <p className="text-gray-400">
            Ваш план: <span className="text-[#AAFF00]">{user.subscription?.plan || 'Бесплатный'}</span>
          </p>
        </div>

        {/* Карточки с информацией */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#AAFF00]/10 rounded-lg">
                <User className="w-6 h-6 text-[#AAFF00]" />
              </div>
              <h2 className="text-xl font-semibold">Профиль</h2>
            </div>
            <div className="space-y-2 text-gray-400">
              <p>Email: {user.email}</p>
              <p>Токенов осталось: {user.subscription?.tokensLeft || 0}</p>
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
              <p>Проанализировано видео: 0</p>
              <p>Создано сценариев: 0</p>
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
              <button className="w-full bg-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition-colors">
                Изменить профиль
              </button>
              <button className="w-full bg-[#AAFF00] text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#88CC00] transition-colors">
                Улучшить план
              </button>
            </div>
          </div>
        </div>

        {/* Кнопка создания сценария */}
        <div className="mb-8">
          <button
            onClick={() => setShowGenerator(!showGenerator)}
            className="flex items-center gap-2 bg-[#AAFF00] text-black px-6 py-3 rounded-xl font-medium hover:bg-[#88CC00] transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Создать новый сценарий</span>
          </button>
        </div>

        {/* Генератор сценариев */}
        {showGenerator && <ScriptGenerator />}

        {/* Последняя активность */}
        {!showGenerator && (
          <div className="bg-gray-800/30 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Последняя активность</h2>
            <div className="text-gray-400 text-center py-8">
              Пока нет активности. Начните анализировать видео или создавать сценарии!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}