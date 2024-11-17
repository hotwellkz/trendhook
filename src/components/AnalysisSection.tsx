import React from 'react';
import { AnalysisFeature } from './AnalysisFeature';

export function AnalysisSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* График и статистика */}
        <div className="bg-gray-800/30 rounded-2xl p-4 md:p-6 lg:p-8 order-2 md:order-1">
          <div className="bg-black/80 rounded-xl p-4 md:p-6 space-y-6">
            {/* Оценка вирусности */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-base md:text-lg font-medium">Оценка вирусности</h4>
                <button className="bg-gray-800/50 text-gray-400 px-3 py-1 rounded-lg text-xs">
                  Месячная ▼
                </button>
              </div>
              
              <div className="relative">
                <div className="relative w-full aspect-[2/1] max-w-[280px] mx-auto">
                  <svg viewBox="0 0 200 100" className="w-full h-full">
                    {/* Фоновая дуга */}
                    <path
                      d="M 30 80 A 45 45 0 0 1 170 80"
                      fill="none"
                      stroke="#333"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                    {/* Активная дуга */}
                    <path
                      d="M 30 80 A 45 45 0 0 1 140 40"
                      fill="none"
                      stroke="#AAFF00"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                    {/* Проценты */}
                    <text x="20" y="95" fill="#AAFF00" fontSize="14">0%</text>
                    <text x="170" y="95" fill="#AAFF00" fontSize="14">100%</text>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold">73.4%</div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm text-center mt-4">
                  Этот сценарий, вероятно, хорошо подойдет вашей целевой аудитории.
                </p>
              </div>
            </div>

            {/* Оценка удержания */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-base md:text-lg font-medium">Оценка удержания</h4>
                <span className="text-gray-400 text-sm">За этот год</span>
              </div>
              
              <div className="grid grid-cols-4 gap-2 h-24 md:h-32">
                {[80, 60, 70, 50].map((height, i) => (
                  <div key={i} className="bg-gray-800/50 rounded-lg relative">
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-[#AAFF00] rounded-lg transition-all duration-500"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Улучшения */}
            <div className="space-y-2">
              <h4 className="text-base md:text-lg font-medium">Рекомендации:</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Сократить до 60 секунд</li>
                <li>• Использовать больше обращений "вы/ваш"</li>
                <li>• Добавить больше юмора</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Текстовый контент */}
        <div className="space-y-6 order-1 md:order-2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            #3. <span className="text-[#AAFF00]">Анализ</span>
          </h2>
          <div className="space-y-4 md:space-y-6">
            <AnalysisFeature
              text="Оценка вирусности: Оцените потенциальное количество просмотров и показов"
            />
            <AnalysisFeature
              text="Оценка удержания: Измерьте, как долго ваш сценарий будет удерживать внимание зрителя"
            />
            <AnalysisFeature
              text="Оценка вовлеченности: Предскажите количество репостов, лайков и комментариев"
            />
          </div>
          
          {/* Кнопка CTA для мобильных устройств */}
          <div className="block md:hidden">
            <button className="bg-[#AAFF00] text-black px-6 py-2.5 rounded-full font-medium hover:bg-[#88CC00] transition-colors text-sm">
              Попробовать сейчас
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}