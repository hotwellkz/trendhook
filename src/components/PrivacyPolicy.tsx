import React from 'react';
import { Activity, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PrivacyPolicy() {
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
          <h1 className="text-4xl font-bold mb-8">Политика конфиденциальности</h1>
          <p className="text-gray-400 mb-8">Последнее обновление: 03-10-2024</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Введение</h2>
              <p className="text-gray-400">
                Viralhooks AI стремится защищать вашу конфиденциальность. Эта Политика конфиденциальности описывает, как мы собираем, используем и защищаем вашу личную информацию при посещении нашего веб-сайта или использовании наших услуг.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Информация, которую мы собираем</h2>
              <p className="text-gray-400 mb-4">
                Мы можем собирать личную информацию, такую как ваше имя, адрес электронной почты, номер телефона и почтовый адрес, когда вы добровольно предоставляете её нам.
              </p>
              <p className="text-gray-400">
                Кроме того, мы можем автоматически собирать определенную неличную информацию, включая ваш IP-адрес, тип браузера, операционную систему и данные об использовании веб-сайта через файлы cookie и другие технологии отслеживания.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Как мы используем вашу информацию</h2>
              <p className="text-gray-400 mb-4">Мы можем использовать собранную информацию для:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Предоставления и персонализации наших услуг</li>
                <li>Общения с вами, включая ответы на ваши запросы и предоставление поддержки</li>
                <li>Анализа и улучшения нашего веб-сайта и услуг</li>
                <li>Отправки рекламных материалов и обновлений о наших продуктах и услугах (с вашего согласия)</li>
                <li>Соблюдения юридических обязательств и обеспечения наших условий обслуживания</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Обмен информацией</h2>
              <p className="text-gray-400">
                Мы можем делиться вашей личной информацией с поставщиками услуг третьих сторон, которые помогают нам в работе нашего веб-сайта, ведении нашего бизнеса или обслуживании вас. Мы также можем делиться вашей информацией, когда это требуется по закону или для защиты наших прав, собственности или безопасности, или прав других лиц.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Безопасность данных</h2>
              <p className="text-gray-400">
                Мы принимаем разумные меры для защиты безопасности вашей личной информации и предотвращения несанкционированного доступа, использования или раскрытия. Однако ни один метод передачи через интернет или электронного хранения не является полностью безопасным, и мы не можем гарантировать абсолютную безопасность.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Ваши права</h2>
              <p className="text-gray-400">
                У вас есть право на доступ, обновление или удаление вашей личной информации. Вы также можете в любое время отказаться от получения рекламных сообщений от нас, следуя инструкциям, приведенным в таких сообщениях, или связавшись с нами напрямую.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Изменения в Политике конфиденциальности</h2>
              <p className="text-gray-400">
                Мы можем время от времени обновлять эту Политику конфиденциальности, чтобы отразить изменения в наших практиках или юридических требованиях. Мы рекомендуем периодически просматривать эту страницу для получения последней информации о наших правилах конфиденциальности.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Свяжитесь с нами</h2>
              <p className="text-gray-400">
                Если у вас есть какие-либо вопросы или concerns о нашей Политике конфиденциальности или обработке вашей личной информации, пожалуйста, свяжитесь с нами:
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
