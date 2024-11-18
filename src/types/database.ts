export interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Date;
  subscription: UserSubscription;
  paypalEmail?: string;
  stats?: UserStats;
}

export interface UserStats {
  scriptsGenerated: number;
  videosAnalyzed: number;
  lastScriptDate?: Date;
}

export interface UserSubscription {
  plan: SubscriptionPlan;
  tokensLeft: number;
  status: SubscriptionStatus;
  trialEndsAt: Date;
  expiresAt: Date;
  lastUpdated: Date | null;
}

export type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'cancelled';
export type SubscriptionPlan = 'free' | 'content-creator' | 'business' | 'agency';
