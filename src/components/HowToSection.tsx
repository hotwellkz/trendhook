import React from 'react';
import { Check } from 'lucide-react';

interface DiscoveryItemProps {
  text: string;
}

function DiscoveryItem({ text }: DiscoveryItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-1">
        <Check className="w-5 h-5 text-[#AAFF00]" />
      </div>
      <p className="text-gray-300">{text}</p>
    </div>
  );
}

export function HowToSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <div className="inline-block bg-gray-800/50 rounded-full px-4 py-2 mb-6">
          <span className="text-[#AAFF00]">Как использовать</span>
        </div>
        <h2 className="text-5xl font-bold mb-6">
          От идеи до сценария за
          <br />
          <span className="text-[#AAFF00]">секунды</span>
        </h2>
        <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-8">
          Узнайте, как использовать ViralHooks и как это поможет вам сэкономить время и деньги,
          создавая вирусные видео быстрее, чем когда-либо.
        </p>
        <button className="bg-[#AAFF00] text-black px-8 py-3 rounded-full font-medium hover:bg-[#88CC00] transition-colors">
          Присоединиться к бете
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="aspect-square rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60"
              alt="Профессионал"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm p-4 rounded-xl">
            <h3 className="text-xl font-bold">Алексей Морозов</h3>
            <p className="text-gray-400">Владелец бизнеса на 7 цифр</p>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-4xl font-bold">#1. Исследуйте</h3>
          <p className="text-gray-400 text-lg mb-6">
            Тратите часы на просмотр социальных сетей и сохранение вирусных видео от любимых каналов?
            Попробуйте вместо этого:
          </p>
          <div className="space-y-4">
            <DiscoveryItem
              text="Вирусная библиотека: 1,000,000+ вирусных видео, каждое с более чем 10 точками данных"
            />
            <DiscoveryItem
              text="Оповещения о трендах: будьте в курсе всего, что происходит в вашей нише"
            />
            <DiscoveryItem
              text="Помощник по идеям: исследование контента с поддержкой вашего личного ассистента"
            />
          </div>
        </div>
      </div>
    </section>
  );
}