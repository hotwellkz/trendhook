export interface SEOConfig {
  siteName: string;
  siteUrl: string;
  pages: {
    [key: string]: {
      title: string;
      h1: string;
      description: string;
      focusKeyword: string;
      keywords: string[];
      canonicalUrl: string;
      ogTitle: string;
      ogDescription: string;
      ogImage?: string;
      structuredData?: object;
    };
  };
}

export const seoConfig: SEOConfig = {
  siteName: "TrendVideo",
  siteUrl: "https://trendvideo.online",
  pages: {
    home: {
      title: "Генератор сценариев для видео с ИИ | TrendVideo - Создание вирусного контента",
      h1: "Умный генератор сценариев для вирусных видео",
      description: "Профессиональный генератор сценариев для видео с искусственным интеллектом. Создавайте вирусные сценарии для соцсетей за минуты. Попробуйте бесплатно!",
      focusKeyword: "генератор сценариев",
      keywords: [
        "генератор сценариев",
        "генератор сценариев для видео",
        "создание сценариев онлайн",
        "ai генератор сценариев",
        "написание сценариев",
        "программа для создания сценариев",
        "автоматический генератор сценариев",
        "нейросеть для сценариев",
        "сценарии для видео",
        "искусственный интеллект сценарии"
      ],
      canonicalUrl: "https://trendvideo.online",
      ogTitle: "Генератор сценариев для видео | Создавайте вирусный контент с ИИ",
      ogDescription: "Автоматизируйте создание сценариев для видео с помощью искусственного интеллекта. Экономьте время на создании контента!",
      ogImage: "https://trendvideo.online/og-image.jpg"
    },
    aiScripts: {
      title: "Нейросеть для генерации сценария для видео | ИИ генератор сценариев",
      h1: "Нейросеть для генерации сценариев",
      description: "Создавайте профессиональные сценарии для видео с помощью нейросети. Экономьте до 90% времени на написании сценариев. Попробуйте бесплатно!",
      focusKeyword: "нейросеть для генерации сценария для видео",
      keywords: [
        "нейросеть для генерации сценария для видео",
        "нейросеть для написания сценариев",
        "искусственный интеллект для видео",
        "генерация сценариев нейросетью",
        "ai генератор видео сценариев",
        "автоматическое создание сценариев",
        "нейросеть для контента",
        "генерация текста для видео",
        "написание сценариев с ии",
        "видео сценарии нейросеть"
      ],
      canonicalUrl: "https://trendvideo.online/ai-scripts",
      ogTitle: "Нейросеть для генерации сценария для видео | Экономьте время",
      ogDescription: "Используйте нейросеть для создания профессиональных видео сценариев. Экономьте до 90% времени на написании контента!",
      ogImage: "https://trendvideo.online/og-image-ai.jpg",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "TrendVideo AI Script Generator",
        "applicationCategory": "BusinessApplication",
        "offers": {
          "@type": "Offer",
          "price": "17.00",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "147"
        }
      }
    }
  }
};
