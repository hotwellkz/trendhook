import React from 'react';
import { Activity, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CookiesPolicy() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-black">
      {/* Навигация */}
      <nav className="border-b border-gray-800 bg-black/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Activity className="w-6 h-6 text-[#AAFF00]" />
              <span className="text-xl font-bold text-white">ViralHooks</span>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>На главную</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-8">Политика использования файлов cookie</h1>
          <p className="text-gray-400 mb-8">Последнее обновление: 03-10-2024</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Введение</h2>
              <p className="text-gray-400">
                Этот веб-сайт использует файлы cookie для улучшения вашего опыта просмотра и предоставления персонализированного контента и рекламы. Используя этот веб-сайт, вы соглашаетесь с использованием файлов cookie в соответствии с этой политикой.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Что такое файлы cookie?</h2>
              <p className="text-gray-400">
                Файлы cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве (компьютере, смартфоне, планшете) при посещении веб-сайта. Они широко используются для обеспечения более эффективной работы веб-сайтов, а также для предоставления информации владельцам веб-сайтов.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Как мы используем файлы cookie</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#AAFF00]">Необходимые файлы cookie</h3>
                  <p className="text-gray-400">
                    Эти файлы cookie необходимы для правильной работы веб-сайта. Они обеспечивают базовые функции, такие как навигация по страницам и доступ к защищенным разделам веб-сайта. Веб-сайт не может функционировать должным образом без этих файлов cookie.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#AAFF00]">Аналитические/эксплуатационные файлы cookie</h3>
                  <p className="text-gray-400">
                    Эти файлы cookie позволяют нам распознавать и подсчитывать количество посетителей нашего веб-сайта и видеть, как посетители перемещаются по сайту. Это помогает нам улучшить работу нашего веб-сайта, например, обеспечивая, чтобы пользователи легко находили то, что ищут.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#AAFF00]">Функциональные файлы cookie</h3>
                  <p className="text-gray-400">
                    Эти файлы cookie используются для распознавания вас при возвращении на наш веб-сайт. Это позволяет нам персонализировать наш контент для вас, приветствовать вас по имени и запоминать ваши предпочтения (например, язык или регион).
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#AAFF00]">Рекламные/таргетинговые файлы cookie</h3>
                  <p className="text-gray-400">
                    Эти файлы cookie используются для показа рекламы, которая более релевантна для вас и ваших интересов. Они также используются для ограничения количества показов рекламы и помогают измерить эффективность рекламной кампании. Они обычно размещаются рекламными сетями с разрешения оператора веб-сайта.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Управление файлами cookie</h2>
              <p className="text-gray-400">
                Вы можете контролировать и/или удалять файлы cookie по своему усмотрению. Вы можете удалить все файлы cookie, которые уже находятся на вашем устройстве, и можете настроить большинство браузеров так, чтобы они не размещались. Если вы это сделаете, однако, вам, возможно, придется вручную настраивать некоторые параметры каждый раз, когда вы посещаете сайт, а некоторые службы и функции могут не работать.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Свяжитесь с нами</h2>
              <p className="text-gray-400">
                Если у вас есть какие-либо вопросы об использовании нами файлов cookie, пожалуйста, свяжитесь с нами:
              </p>
              <p className="text-[#AAFF00] mt-2">
                hello@viralhooks.ai
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
