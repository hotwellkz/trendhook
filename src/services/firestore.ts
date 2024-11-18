import { 
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { User, UserSubscription, SubscriptionPlan } from '../types/database';

interface CreateUserData {
  email: string;
  displayName: string | null;
  photoURL: string | null;
}

export const createUser = async (userId: string, userData: CreateUserData): Promise<User> => {
  try {
    const userRef = doc(db, 'users', userId);
    
    const subscription: UserSubscription = {
      plan: 'free',
      tokensLeft: 10,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      lastUpdated: new Date()
    };

    const data: User = {
      id: userId,
      email: userData.email,
      displayName: userData.displayName,
      photoURL: userData.photoURL,
      createdAt: new Date(),
      subscription
    };
    
    await setDoc(userRef, {
      ...data,
      createdAt: Timestamp.fromDate(data.createdAt),
      subscription: {
        ...subscription,
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
    return {
      ...data,
      id: userId,
      createdAt: data.createdAt.toDate(),
      subscription: {
        plan: data.subscription?.plan || 'free',
        tokensLeft: data.subscription?.tokensLeft || 10,
        expiresAt: data.subscription?.expiresAt.toDate() || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        lastUpdated: data.subscription?.lastUpdated?.toDate()
      }
    } as User;
  } catch (error) {
    console.error('Error getting user:', error);
    throw new Error('Не удалось получить данные пользователя');
  }
};
