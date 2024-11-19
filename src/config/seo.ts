// ... остальной код остается прежним ...

export const seoConfig: SEOConfig = {
  siteName: "TrendVideo",
  siteUrl: "https://trendvideo.online",
  pages: {
    // ... остальные страницы ...
    
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
