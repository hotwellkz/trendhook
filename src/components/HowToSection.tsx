import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DiscoveryItemProps {
  text: string;
}

interface TestimonialProps {
  image: string;
  name: string;
  role: string;
}

const testimonials: TestimonialProps[] = [
  {
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60",
    name: "Алексей Морозов",
    role: "Владелец бизнеса на 7 цифр"
  },
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60",
    name: "Анна Петрова",
    role: "Digital-маркетолог"
  },
  {
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=60",
    name: "Дмитрий Соколов",
    role: "CEO IT-компании"
  },
  {
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60",
    name: "Мария Иванова",
    role: "Контент-криейтор"
  },
  {
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60",
    name: "Павел Волков",
    role: "Предприниматель"
  }
];

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

function Testimonial({ image, name, role }: TestimonialProps) {
  return (
    <div className="relative flex-shrink-0 w-[300px] mx-4">
      <div className="aspect-square rounded-3xl overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm p-4 rounded-xl">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-gray-400">{role}</p>
      </div>
    </div>
  );
}

export function HowToSection() {
  const navigate = useNavigate();

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
        <button 
          onClick={() => navigate('/signup')}
          className="bg-[#AAFF00] text-black px-8 py-3 rounded-full font-medium hover:bg-[#88CC00] transition-colors"
        >
          Присоединиться
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Карусель с отзывами */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <Testimonial key={`${testimonial.name}-${index}`} {...testimonial} />
            ))}
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
