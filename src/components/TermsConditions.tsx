import React from 'react';
import { Activity, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function TermsConditions() {
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
          <h1 className="text-4xl font-bold mb-8">Условия использования</h1>
          <p className="text-gray-400 mb-8">Последнее обновление: 03-10-2024</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Принятие условий</h2>
              <p className="text-gray-400">
                Используя этот веб-сайт, вы соглашаетесь соблюдать настоящие Условия использования, а также все применимые законы и правила. Если вы не согласны с какими-либо из этих условий, вам запрещено использовать или получать доступ к этому сайту.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Лицензия на использование</h2>
              <p className="text-gray-400 mb-4">
                Разрешается временно загружать одну копию материалов (информации или программного обеспечения) на веб-сайте Viralhooks AI только для личного, некоммерческого временного просмотра. Это предоставление лицензии, а не передача права собственности.
              </p>
              <p className="text-gray-400">Согласно этой лицензии, вы не можете:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mt-2">
                <li>Изменять или копировать материалы</li>
                <li>Использовать материалы в коммерческих целях</li>
                <li>Пытаться декомпилировать или реконструировать программное обеспечение</li>
                <li>Удалять авторские права или другие записи о собственности</li>
                <li>Передавать материалы другим лицам</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Отказ от ответственности</h2>
              <p className="text-gray-400">
                Материалы на веб-сайте Viralhooks AI предоставляются "как есть". Viralhooks не дает никаких гарантий, явных или подразумеваемых, и настоящим отказывается от всех других гарантий, включая, без ограничений, подразумеваемые гарантии или условия товарной пригодности, пригодности для определенной цели или ненарушения прав интеллектуальной собственности или других прав.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Ограничения</h2>
              <p className="text-gray-400">
                Ни при каких обстоятельствах Viralhooks AI или ее поставщики не несут ответственности за любой ущерб (включая, без ограничений, ущерб от потери данных или прибыли, или из-за прерывания бизнеса), возникший в результате использования или невозможности использования материалов на веб-сайте Viralhooks AI.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Изменения и исправления</h2>
              <p className="text-gray-400">
                Материалы, появляющиеся на веб-сайте Viralhooks AI, могут включать технические, типографские или фотографические ошибки. Viralhooks AI может вносить изменения в материалы, содержащиеся на своем веб-сайте, в любое время без уведомления.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Ссылки</h2>
              <p className="text-gray-400">
                Viralhooks AI не проверяла все сайты, связанные с ее веб-сайтом, и не несет ответственности за содержание любого такого связанного сайта. Включение любой ссылки не подразумевает одобрения сайта Viralhooks AI.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Применимое право</h2>
              <p className="text-gray-400">
                Эти условия регулируются и толкуются в соответствии с законами США и Европейского экономического союза, и вы безоговорочно подчиняетесь исключительной юрисдикции судов в этих местах.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Изменения в условиях использования</h2>
              <p className="text-gray-400">
                Viralhooks AI может пересматривать эти условия обслуживания для своего веб-сайта в любое время без уведомления. Используя этот веб-сайт, вы соглашаетесь быть связанными текущей версией этих Условий использования.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Свяжитесь с нами</h2>
              <p className="text-gray-400">
                Если у вас есть какие-либо вопросы или concerns об этих Условиях использования, пожалуйста, свяжитесь с нами:
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
