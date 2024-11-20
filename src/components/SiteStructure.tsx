import React from 'react';
import { Activity, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface PageInfo {
  path: string;
  title: string;
  description: string;
  category: 'main' | 'auth' | 'dashboard' | 'legal' | 'other';
}

export const sitePages: PageInfo[] = [
  // Основные страницы
  {
    path: '/',
    title: 'Главная',
    description: 'AI генератор вирусных видео для социальных сетей',
    category: 'main'
  },
  {
    path: '/pricing',
    title: 'Тарифы',
    description: 'Тарифные планы и цены',
    category: 'main'
  },
  {
    path: '/partners',
    title: 'Партнерская программа',
    description: 'Зарабатывайте с нами',
    category: 'main'
  },
  {
    path: '/ai-scripts',
    title: 'Нейросеть для генерации сценариев',
    description: 'Автоматическое создание сценариев с помощью AI',
    category: 'main'
  },
  {
    path: '/how-to-write-script',
    title: 'Как написать сценарий',
    description: 'Пошаговое руководство по написанию эффективных сценариев для видео',
    category: 'main'
  },
  {
    path: '/reels-script',
    title: 'Сценарий к Reels',
    description: 'Создание вирусных сценариев для Instagram Reels',
    category: 'main'
  },
  {
    path: '/ai-script-generator',
    title: 'Генератор сценария нейросеть',
    description: 'ИИ-генератор для создания профессиональных сценариев',
    category: 'main'
  },

  // Страницы авторизации
  {
    path: '/login',
    title: 'Вход',
    description: 'Вход в личный кабинет',
    category: 'auth'
  },
  {
    path: '/signup',
    title: 'Регистрация',
    description: 'Создание нового аккаунта',
    category: 'auth'
  },

  // Страницы дашборда
  {
    path: '/dashboard',
    title: 'Панель управления',
    description: 'Управление аккаунтом и генерация контента',
    category: 'dashboard'
  },
  {
    path: '/profile/edit',
    title: 'Редактирование профиля',
    description: 'Настройки профиля пользователя',
    category: 'dashboard'
  },
  {
    path: '/billing',
    title: 'Управление подпиской',
    description: 'Управление тарифным планом и платежами',
    category: 'dashboard'
  },
  {
    path: '/subscribers',
    title: 'Подписчики',
    description: 'Управление подписчиками (админ)',
    category: 'dashboard'
  },

  // Юридические страницы
  {
    path: '/privacy',
    title: 'Политика конфиденциальности',
    description: 'Информация о защите персональных данных',
    category: 'legal'
  },
  {
    path: '/cookies',
    title: 'Политика cookies',
    description: 'Информация об использовании cookies',
    category: 'legal'
  },
  {
    path: '/terms',
    title: 'Условия использования',
    description: 'Правила и условия использования сервиса',
    category: 'legal'
  }
];

export function SiteStructure() {
  const navigate = useNavigate();
  
  // Группировка страниц по категориям
  const groupedPages = sitePages.reduce((acc, page) => {
    if (!acc[page.category]) {
      acc[page.category] = [];
    }
    acc[page.category].push(page);
    return acc;
  }, {} as Record<string, PageInfo[]>);

  // Перевод категорий на русский
  const categoryTitles: Record<string, string> = {
    main: 'Основные страницы',
    auth: 'Авторизация',
    dashboard: 'Личный кабинет',
    legal: 'Юридическая информация',
    other: 'Прочие страницы'
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
                TrendVideo
              </button>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Назад</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Структура сайта</h1>

        {Object.entries(groupedPages).map(([category, pages]) => (
          <div key={category} className="mb-12">
            <h2 className="text-xl font-bold mb-6 text-[#AAFF00]">
              {categoryTitles[category]}
            </h2>
            <div className="grid gap-4">
              {pages.map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className="bg-gray-800/30 rounded-lg p-4 hover:bg-gray-800/50 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium group-hover:text-[#AAFF00] transition-colors">
                        {page.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {page.description}
                      </p>
                    </div>
                    <code className="text-sm text-gray-500 font-mono">
                      {page.path}
                    </code>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
