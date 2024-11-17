import React from 'react';
import { ArrowRight, Instagram } from 'lucide-react';

interface VideoCard {
  author: string;
  followers: string;
  thumbnail: string;
  platform: string;
  engagement: string;
  posted: string;
  videoType: string;
  objective: string;
  hook: string;
  hookType: string;
  hookFramework: string;
}

const videoCards: VideoCard[] = [
  {
    author: 'garyvee',
    followers: '10.2M',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop',
    platform: 'instagram',
    engagement: '5.98%',
    posted: '6 часов назад',
    videoType: 'Обучающий',
    objective: 'Набор подписчиков',
    hook: 'Хотите всё бросить?',
    hookType: 'Негативный',
    hookFramework: 'Если вы сделаете [ДЕЙСТВИЕ], это точно приведет к неудаче'
  },
  {
    author: 'hormozi',
    followers: '2.7M',
    thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&fit=crop',
    platform: 'instagram',
    engagement: '2.8%',
    posted: '6 часов назад',
    videoType: 'Обучающий',
    objective: 'Набор подписчиков',
    hook: 'Только что привёл себя в форму. Идите в зал.',
    hookType: 'Мотивационный',
    hookFramework: 'Просто [ДЕЙСТВИЕ].'
  }
];

function VideoCard({ data }: { data: VideoCard }) {
  return (
    <div className="bg-gray-800/30 rounded-xl overflow-hidden">
      <div className="aspect-video relative">
        <img src={data.thumbnail} alt={data.author} className="w-full h-full object-cover" />
      </div>
      
      <div className="p-3 md:p-4 space-y-3 md:space-y-4">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden">
            <img src={data.thumbnail} alt={data.author} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1 flex-wrap">
              <span className="font-medium text-sm md:text-base">{data.author}</span>
              <span className="text-gray-400 text-xs md:text-sm">{data.followers} подписчиков</span>
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
              <Instagram className="w-3 h-3 md:w-4 md:h-4" />
            </div>
          </div>
          <button className="ml-auto bg-gray-800/50 px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm whitespace-nowrap">
            Подробнее
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm">
          <div>
            <div className="text-gray-400">Вовлечённость:</div>
            <div>{data.engagement}</div>
          </div>
          <div>
            <div className="text-gray-400">Опубликовано:</div>
            <div>{data.posted}</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <span className="bg-[#AAFF00]/20 text-[#AAFF00] px-2 py-0.5 rounded text-xs md:text-sm">
              {data.videoType}
            </span>
            <span className="bg-[#AAFF00]/20 text-[#AAFF00] px-2 py-0.5 rounded text-xs md:text-sm">
              {data.objective}
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-gray-400 text-xs md:text-sm">Хук:</div>
            <div className="text-sm md:text-base">{data.hook}</div>
          </div>

          <div className="space-y-1">
            <div className="text-gray-400 text-xs md:text-sm">Тип хука:</div>
            <div className="bg-gray-800/50 inline-block px-2 py-0.5 rounded text-xs md:text-sm">
              {data.hookType}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-gray-400 text-xs md:text-sm">Структура хука:</div>
            <div className="text-xs md:text-sm">{data.hookFramework}</div>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 bg-gray-800/50 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm hover:bg-gray-800/70 transition-colors">
            В закладки
          </button>
          <button className="flex-1 bg-[#AAFF00] text-black px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-[#88CC00] transition-colors">
            Использовать
          </button>
        </div>
      </div>
    </div>
  );
}

export function RealTimeDataSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8 md:py-12 lg:py-16">
      {/* Верхняя часть с заголовком */}
      <div className="mb-8 md:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#AAFF00]/10 text-[#AAFF00] px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm mb-4 md:mb-6">
          <span>Получите доступ к каждому ролику из библиотеки</span>
          <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
        </div>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
          Получайте данные о видео в{' '}
          <span className="text-[#AAFF00]">реальном времени</span>{' '}
          делая создание контента{' '}
          <span className="text-[#AAFF00]">простым и понятным</span>
        </h2>

        <button className="bg-[#AAFF00] text-black px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium hover:bg-[#88CC00] transition-colors mt-6 md:mt-8 text-sm md:text-base">
          Присоединиться к бете
        </button>
      </div>

      {/* Сетка с карточками видео */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {videoCards.map((card, index) => (
          <VideoCard key={index} data={card} />
        ))}
      </div>
    </section>
  );
}