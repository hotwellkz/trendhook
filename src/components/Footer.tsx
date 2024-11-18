import React from 'react';
import { Activity } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com/trendvideo.online', icon: 'instagram.svg' },
    { name: 'X (Twitter)', href: 'https://twitter.com/trendvideo_ai', icon: 'twitter.svg' },
    { name: 'YouTube', href: 'https://youtube.com/@trendvideo', icon: 'youtube.svg' },
    { name: 'Facebook', href: 'https://facebook.com/trendvideo.online', icon: 'facebook.svg' }
  ];

  const legalLinks = [
    { name: 'Политика конфиденциальности', href: 'https://trendvideo.online/privacy' },
    { name: 'Политика cookies', href: 'https://trendvideo.online/cookies' },
    { name: 'Условия использования', href: 'https://trendvideo.online/terms' }
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
              Создано с ❤️ от Pitch Liew
            </p>
            <p className="text-gray-400">
              От Создателей, Для Создателей
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
          
          {/* Социальные сети и правовые ссылки */}
          <div className="flex flex-col sm:flex-row items-center gap-6 order-1 md:order-2 w-full md:w-auto">
            {/* Социальные сети */}
            <div className="flex gap-4 justify-center">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-[#AAFF00] transition-colors"
                  aria-label={link.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center">
                    <span className="text-lg">{link.name === 'X (Twitter)' ? '𝕏' : link.name[0]}</span>
                  </div>
                </a>
              ))}
            </div>
            
            {/* Правовые ссылки */}
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              {legalLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
