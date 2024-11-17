import React from 'react';
import { Check } from 'lucide-react';

interface ScriptFeatureProps {
  text: string;
}

function ScriptFeature({ text }: ScriptFeatureProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-1">
        <Check className="w-5 h-5 text-[#AAFF00]" />
      </div>
      <p className="text-gray-300">{text}</p>
    </div>
  );
}

export function ScriptSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-6xl font-bold">
            #2. <span className="text-[#AAFF00]">Сценарий</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Создавайте сценарии, которые захватывают и обучают, делая информацию более доступной для вашей аудитории.
          </p>
          <div className="space-y-4">
            <ScriptFeature
              text="Написание сценария: Генерируйте сценарий на основе вирусной видео-структуры"
            />
            <ScriptFeature
              text="Редактирование: Заменяйте части сценария с помощью умных предложений"
            />
            <ScriptFeature
              text="Проверка человеческого голоса: Убедитесь, что вы не звучите как генерик ИИ!"
            />
          </div>
        </div>

        <div className="bg-gray-800/30 rounded-2xl p-6">
          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-sm text-gray-400"># Просмотры</div>
                  <div className="text-xs text-gray-500">Последние 7 месяцев</div>
                </div>
                <button className="text-sm bg-gray-700 px-3 py-1 rounded-full">
                  Еженедельно
                </button>
              </div>
              <div className="h-40 relative">
                <div className="absolute inset-0 flex items-end">
                  <div className="w-full h-full relative">
                    <svg viewBox="0 0 100 40" className="w-full h-full">
                      <path
                        d="M0 35 Q 25 15, 50 25 T 100 5"
                        fill="none"
                        stroke="#AAFF00"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold">+1204</div>
                  <div className="text-sm text-gray-400">Рост просмотров</div>
                </div>
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#AAFF00"
                      strokeWidth="3"
                      strokeDasharray="60, 100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                    60%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}