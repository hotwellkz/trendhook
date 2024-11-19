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
      ogImage: "https://trendvideo.online/og-image.jpg",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "TrendVideo AI Script Generator",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "description": "Профессиональный генератор сценариев для видео с искусственным интеллектом",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "156"
        }
      }
    },
    // ... остальные страницы ...
  }
};
