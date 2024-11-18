// Определяем типы для базы данных
interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Date;
  subscription: {
    plan: 'free' | 'content-creator' | 'business' | 'agency';
    tokensLeft: number;
    expiresAt: Date;
    lastUpdated?: Date;
  };
}

interface VideoContent {
  id: string;
  author: string;
  followers: string;
  thumbnail: string;
  platform: 'instagram' | 'tiktok' | 'youtube' | 'twitter';
  engagement: string;
  posted: string;
  videoType: string;
  objective: string;
  hook: string;
  hookType: string;
  hookFramework: string;
  viralScore: number;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Bookmark {
  id: string;
  userId: string;
  videoId: string;
  createdAt: Date;
}

interface UserAnalytics {
  id: string;
  userId: string;
  tokensUsed: number;
  searchesPerformed: number;
  videosAnalyzed: number;
  date: Date;
}

// Экспортируем все типы
export type {
  User,
  VideoContent,
  Bookmark,
  UserAnalytics
};
