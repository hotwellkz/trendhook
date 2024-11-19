import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface LinkGroup {
  title: string;
  links: {
    title: string;
    path: string;
    description: string;
  }[];
}

const linkGroups: LinkGroup[] = [
  {
    title: "Генератор сценариев",
    links: [
      {
        title: "AI-генерация сценариев",
        path: "/ai-scripts",
        description: "Создавайте профессиональные сценарии с помощью ИИ"
      },
      {
        title: "Примеры сценариев",
        path: "/dashboard",
        description: "Посмотрите примеры готовых сценариев"
      }
    ]
  },
  {
    title: "Возможности",
    links: [
      {
        title: "Тарифные планы",
        path: "/billing",
        description: "Выберите подходящий тарифный план"
      },
      {
        title: "Партнерская программа",
        path: "/partners",
        description: "Зарабатывайте вместе с нами"
      }
    ]
  },
  {
    title: "Информация",
    links: [
      {
        title: "Политика конфиденциальности",
        path: "/privacy",
        description: "Узнайте, как мы защищаем ваши данные"
      },
      {
        title: "Условия использования",
        path: "/terms",
        description: "Ознакомьтесь с правилами использования сервиса"
      }
    ]
  }
];

export function RelatedLinks() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        Полезные ссылки
      </h2>
      
      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        {linkGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-xl font-bold mb-6 text-[#AAFF00]">{group.title}</h3>
            <div className="space-y-6">
              {group.links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block group"
                >
                  <div className="flex items-start gap-4 bg-gray-800/30 p-4 rounded-xl hover:bg-gray-800/50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1 group-hover:text-[#AAFF00] transition-colors">
                        {link.title}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {link.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#AAFF00] transition-colors mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
