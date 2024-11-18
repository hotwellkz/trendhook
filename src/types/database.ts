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

// Остальные интерфейсы остаются без изменений...
