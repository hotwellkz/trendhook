interface PageSEO {
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
}

interface SEOConfig {
  siteName: string;
  siteUrl: string;
  pages: Record<string, PageSEO>;
}

export const seoConfig: SEOConfig = {
  siteName: "TrendVideo",
  siteUrl: "https://trendvideo.online",
  pages: {
    home: {
      title: "TrendVideo | AI Генератор Вирусных Видео для Социальных Сетей",
      h1: "Создавайте Вирусные Видео с Помощью ИИ",
      description: "TrendVideo - умный AI генератор контента для создания вирусных видео. Автоматизируйте создание контента для TikTok, Instagram Reels и YouTube Shorts. Попробуйте бесплатно!",
      focusKeyword: "генератор вирусных видео",
      keywords: [
        "генератор вирусных видео",
        "ai генератор видео",
        "создание видео для тикток",
        "генератор контента для инстаграм",
        "создание видео для соцсетей",
        "ai помощник для видео",
        "автоматизация создания контента"
      ],
      canonicalUrl: "https://trendvideo.online",
      ogTitle: "TrendVideo - AI Генератор Вирусных Видео | Создавайте Контент Автоматически",
      ogDescription: "Автоматизируйте создание вирусных видео для TikTok, Instagram и YouTube с помощью искусственного интеллекта. Экономьте время на создании контента!",
      ogImage: "https://trendvideo.online/og-image.jpg",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "TrendVideo",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "AI-powered video content generator for social media"
      }
    }
  }
};
