import React from 'react';

export function ReelsLibrary() {
  const platforms = [
    { name: 'Shorts', status: 'coming soon', icon: '📱' },
    { name: 'X (Twitter)', status: 'coming soon', icon: '𝕏' },
    { name: 'Reels', status: 'support now', icon: '📸' },
    { name: 'Pinterest', status: 'coming soon', icon: '📌' },
    { name: 'Tiktok', status: 'coming soon', icon: '🎵' },
    { name: 'Facebook', status: 'coming soon', icon: '👥' }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Левая колонка с текстом */}
        <div className="space-y-4 md:space-y-6 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Наша Библиотека
            <br />
            Reels в
            <br />
            <span className="text-[#AAFF00]">Разработке</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-md mx-auto md:mx-0">
            Получите доступ к отобранной коллекции лучшего контента из
            Instagram Reels, YouTube Shorts, TikTok, X и других платформ.
          </p>
          <button className="bg-[#AAFF00] text-black px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium hover:bg-[#88CC00] transition-colors text-sm md:text-base">
            Присоединиться к бете
          </button>
        </div>

        {/* Правая колонка с сеткой платформ */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 mt-8 md:mt-0">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="bg-gray-800/30 p-4 md:p-6 rounded-xl flex flex-col items-center text-center space-y-2 hover:bg-gray-800/40 transition-colors group cursor-pointer"
            >
              <div className="text-3xl md:text-4xl mb-2 transform group-hover:scale-110 transition-transform">
                {platform.icon}
              </div>
              <h3 className="text-base md:text-xl font-bold">{platform.name}</h3>
              <p className="text-xs md:text-sm text-gray-400">
                {platform.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}