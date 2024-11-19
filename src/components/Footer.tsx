import React from 'react';
import { Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const legalLinks = [
    { name: 'Политика конфиденциальности', href: '/privacy' },
    { name: 'Политика cookies', href: '/cookies' },
    { name: 'Условия использования', href: '/terms' },
    { name: 'Подписчики', href: '/subscribers' },
    { name: 'Партнерская программа', href: '/partners' },
    { name: 'Структура сайта', href: '/site-structure' }
  ];

  return (
    <footer className="border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Верхняя секция */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 md:mb-12">
          {/* Логотип и описание */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
              <Activity className="w-8 h-8 text-[#AAFF00]" />
              <span className="text-xl font-bold">TrendVideo</span>
            </div>
            <p className="text-gray-400 mb-4">
              Создано Studoz. inc
            </p>
            <p className="text-gray-400">
              2024
            </p>
          </div>
          
          {/* Контактная информация */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold mb-4">Связаться с нами</h3>
            <a href="mailto:hello@trendvideo.online" className="text-[#AAFF00] hover:underline inline-block">
              hello@trendvideo.online
            </a>
          </div>
        </div>

        {/* Нижняя секция */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-gray-800">
          {/* Копирайт */}
          <div className="text-gray-400 text-center md:text-left text-sm order-2 md:order-1">
            © 2024 TrendVideo AI. Все права защищены.
          </div>
          
          {/* Правовые ссылки */}
          <div className="flex flex-wrap gap-4 justify-center text-sm order-1 md:order-2">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-400 hover:text-white transition-colors whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
