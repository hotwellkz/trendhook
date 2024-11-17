import React from 'react';
import { Search, Info, Clock, Filter, ChevronDown } from 'lucide-react';

interface Tag {
  icon: string;
  text: string;
}

export function SearchSection() {
  const tags = [
    { icon: '🤖', text: 'AI & Технологии' },
    { icon: '📊', text: 'Цифровой Маркетинг' },
    { icon: '💰', text: 'Финансы' },
    { icon: '💆‍♀️', text: 'Красота и Здоровье' },
    { icon: '💼', text: 'Бизнес' }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      <div className="bg-gray-800/30 rounded-2xl p-4 md:p-6 space-y-4">
        {/* Заголовок */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-[#AAFF00] rounded-lg flex items-center justify-center">
            <span className="text-black text-xl">📱</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold">Поиск Instagram Reels</h2>
          <span className="text-gray-400 text-sm">- Все вирусные Instagram Reels в вашем распоряжении</span>
        </div>

        {/* Основные фильтры */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Поиск канала..."
              className="w-full bg-black/20 rounded-lg pl-10 pr-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50"
            />
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Поиск по ключевым словам..."
              className="w-full bg-black/20 rounded-lg px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50"
            />
          </div>

          <div className="relative">
            <select className="w-full bg-black/20 rounded-lg px-4 py-2.5 text-sm text-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50">
              <option value="">Выберите язык...</option>
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        {/* Дополнительные фильтры */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <select className="w-full bg-black/20 rounded-lg px-4 py-2.5 text-sm text-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50">
              <option value="">Выберите канал...</option>
            </select>
            <Info className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          <div className="relative">
            <select className="w-full bg-black/20 rounded-lg px-4 py-2.5 text-sm text-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50">
              <option value="">Выберите нишу...</option>
            </select>
            <Info className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="1 - 400M"
              className="w-full bg-black/20 rounded-lg px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50"
            />
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="0 - 100"
              className="w-full bg-black/20 rounded-lg px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50"
            />
          </div>
        </div>

        {/* Сортировка и вид */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Сортировка:</span>
            <button className="bg-[#AAFF00]/20 text-[#AAFF00] px-3 py-1 rounded-full text-xs flex items-center gap-1">
              <Clock className="w-3 h-3" />
              По дате
            </button>
          </div>

          <div className="flex gap-2">
            <button className="bg-black/20 p-2 rounded-lg hover:bg-black/30 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
            <button className="bg-black/20 p-2 rounded-lg hover:bg-black/30 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Теги */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <button
              key={index}
              className="bg-black/20 px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-black/30 transition-colors"
            >
              <span>{tag.icon}</span>
              <span>{tag.text}</span>
            </button>
          ))}
        </div>

        {/* Кнопки действий */}
        <div className="flex justify-end gap-4 pt-4">
          <button className="px-4 py-2 rounded-lg text-sm hover:bg-black/20 transition-colors">
            Отмена
          </button>
          <button className="bg-[#AAFF00] text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#88CC00] transition-colors">
            Применить
          </button>
        </div>
      </div>
    </section>
  );
}