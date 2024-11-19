interface SEOConfig {
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
      title: "TrendVideo - AI генератор вирусного контента",
      h1: "Миллионы вирусных видео у вас в кармане",
      description: "Создавайте вирусные видео для социальных сетей с помощью искусственного интеллекта. Попробуйте бесплатно!",
      focusKeyword: "ai генератор вирусного контента",
      keywords: [
        "ai генератор видео",
        "вирусный контент",
        "генерация видео",
        "искусственный интеллект",
        "создание контента",
        "viral video",
        "content creation"
      ],
      canonicalUrl: "https://trendvideo.online",
      ogTitle: "TrendVideo - AI генератор вирусного контента",
      ogDescription: "Создавайте вирусные видео для социальных сетей с помощью искусственного интеллекта",
      ogImage: "https://trendvideo.online/og-image.jpg",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "TrendVideo AI",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    },
    aiScripts: {
      title: "Нейросеть для генерации сценариев | TrendVideo - AI генератор контента",
      h1: "Нейросеть для генерации сценариев",
      description: "Создавайте профессиональные сценарии для видео с помощью нейросети. Автоматизируйте создание контента с искусственным интеллектом. Попробуйте бесплатно!",
      focusKeyword: "нейросеть для генерации сценариев",
      keywords: [
        "нейросеть для генерации сценариев",
        "ai генератор сценариев",
        "генерация текста для видео",
        "искусственный интеллект сценарии",
        "автоматическое создание сценариев",
        "нейросеть контент",
        "ai помощник сценарист"
      ],
      canonicalUrl: "https://trendvideo.online/ai-scripts",
      ogTitle: "Нейросеть для генерации сценариев | Создавайте контент с AI",
      ogDescription: "Автоматизируйте создание сценариев для видео с помощью искусственного интеллекта. Экономьте время на создании контента!",
      ogImage: "https://trendvideo.online/ai-scripts-og.jpg",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "TrendVideo AI Scripts Generator",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "AI-powered script generator for video content"
      }
    }
  }
};
