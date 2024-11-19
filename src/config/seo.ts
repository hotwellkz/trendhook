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
      title: "AI Генератор сценариев | TrendVideo - Создание вирусного контента",
      h1: "Нейросеть для генерации сценариев",
      description: "Создавайте профессиональные сценарии для видео с помощью искусственного интеллекта. Экономьте время и ресурсы на создании контента.",
      focusKeyword: "ai генератор сценариев",
      keywords: [
        "ai генератор сценариев",
        "нейросеть для сценариев",
        "автоматическая генерация сценариев",
        "искусственный интеллект для видео",
        "создание контента с ии"
      ],
      canonicalUrl: "https://trendvideo.online/ai-scripts",
      ogTitle: "AI Генератор сценариев | Создавайте вирусный контент",
      ogDescription: "Используйте искусственный интеллект для создания профессиональных сценариев. Экономьте до 90% времени!",
      ogImage: "https://trendvideo.online/og-image.jpg"
    }
  }
};
