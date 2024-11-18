{/* Previous imports */}
import { AlertCircle, Loader2, ChevronDown } from 'lucide-react';

{/* Rest of the component remains the same until the select elements */}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Стиль
            </label>
            <div className="relative">
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full bg-black/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-700/50 appearance-none cursor-pointer pr-10"
                required
                disabled={loading}
              >
                <option value="" className="bg-gray-900">Выберите стиль</option>
                <option value="educational" className="bg-gray-900">Обучающий</option>
                <option value="entertaining" className="bg-gray-900">Развлекательный</option>
                <option value="motivational" className="bg-gray-900">Мотивационный</option>
                <option value="storytelling" className="bg-gray-900">Сторителлинг</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* ... other fields ... */}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Цель видео
            </label>
            <div className="relative">
              <select
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                className="w-full bg-black/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-700/50 appearance-none cursor-pointer pr-10"
                required
                disabled={loading}
              >
                <option value="" className="bg-gray-900">Выберите цель</option>
                <option value="awareness" className="bg-gray-900">Повышение узнаваемости</option>
                <option value="engagement" className="bg-gray-900">Вовлечение аудитории</option>
                <option value="conversion" className="bg-gray-900">Конверсия</option>
                <option value="education" className="bg-gray-900">Обучение</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

{/* Rest of the component remains the same */}
