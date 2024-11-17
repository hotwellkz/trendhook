export interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Date;
  subscription: {
    plan: 'free' | 'content-creator' | 'business' | 'agency';
    tokensLeft: number;
    expiresAt: Date;
  };
}

export interface VideoContent {
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

export interface Bookmark {
  id: string;
  userId: string;
  videoId: string;
  createdAt: Date;
}

export interface UserAnalytics {
  id: string;
  userId: string;
  tokensUsed: number;
  searchesPerformed: number;
  videosAnalyzed: number;
  date: Date;
}