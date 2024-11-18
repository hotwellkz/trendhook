import { 
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  DocumentData,
  updateDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { User, UserSubscription, SubscriptionPlan } from '../types/database';

interface CreateUserData {
  email: string;
  displayName: string | null;
  photoURL: string | null;
}

const TRIAL_PERIOD_DAYS = 7;
const INITIAL_TOKENS = 10;

export const createUser = async (userId: string, userData: CreateUserData): Promise<User> => {
  try {
    const userRef = doc(db, 'users', userId);
    
    const now = new Date();
    const trialEndsAt = new Date(now.getTime() + TRIAL_PERIOD_DAYS * 24 * 60 * 60 * 1000);

    const subscription: UserSubscription = {
      plan: 'free',
      tokensLeft: INITIAL_TOKENS,
      status: 'trial',
      trialEndsAt,
      expiresAt: trialEndsAt,
      lastUpdated: now
    };

    const data: User = {
      id: userId,
      email: userData.email,
      displayName: userData.displayName,
      photoURL: userData.photoURL,
      createdAt: now,
      subscription
    };
    
    await setDoc(userRef, {
      ...data,
      createdAt: Timestamp.fromDate(data.createdAt),
      subscription: {
        ...subscription,
        trialEndsAt: Timestamp.fromDate(subscription.trialEndsAt),
        expiresAt: Timestamp.fromDate(subscription.expiresAt),
        lastUpdated: Timestamp.fromDate(subscription.lastUpdated)
      }
    });
    
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Не удалось создать пользователя');
  }
};

export const getUser = async (userId: string): Promise<User | null> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return null;
    }

    const data = userSnap.data();
    const user = {
      ...data,
      id: userId,
      createdAt: data.createdAt.toDate(),
      subscription: {
        plan: data.subscription?.plan || 'free',
        tokensLeft: data.subscription?.tokensLeft || 0,
        status: data.subscription?.status || 'trial',
        trialEndsAt: data.subscription?.trialEndsAt?.toDate() || new Date(),
        expiresAt: data.subscription?.expiresAt?.toDate() || new Date(),
        lastUpdated: data.subscription?.lastUpdated?.toDate() || null
      }
    } as User;

    // Проверяем истек ли пробный период
    const now = new Date();
    if (user.subscription.status === 'trial' && now > user.subscription.trialEndsAt) {
      // Обновляем статус подписки
      await updateDoc(userRef, {
        'subscription.status': 'expired',
        'subscription.tokensLeft': 0,
        'subscription.lastUpdated': Timestamp.fromDate(now)
      });

      user.subscription.status = 'expired';
      user.subscription.tokensLeft = 0;
      user.subscription.lastUpdated = now;
    }

    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    throw new Error('Не удалось получить данные пользователя');
  }
};

export const checkSubscriptionStatus = async (userId: string): Promise<boolean> => {
  try {
    const user = await getUser(userId);
    if (!user) return false;

    const { subscription } = user;
    const now = new Date();

    // Проверяем статус подписки
    if (subscription.status === 'trial' && now > subscription.trialEndsAt) {
      await updateDoc(doc(db, 'users', userId), {
        'subscription.status': 'expired',
        'subscription.tokensLeft': 0,
        'subscription.lastUpdated': Timestamp.fromDate(now)
      });
      return false;
    }

    return subscription.status === 'active' || 
           (subscription.status === 'trial' && now <= subscription.trialEndsAt);
  } catch (error) {
    console.error('Error checking subscription:', error);
    return false;
  }
};
