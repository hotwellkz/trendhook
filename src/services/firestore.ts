import { 
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { User } from '../types/database';

interface CreateUserData extends Omit<User, 'id' | 'subscription'> {
  id?: string;
  subscription?: Partial<User['subscription']>;
}

export const createUser = async (userId: string, userData: CreateUserData): Promise<User> => {
  try {
    const userRef = doc(db, 'users', userId);
    const data: User = {
      ...userData,
      id: userId,
      createdAt: new Date(),
      subscription: {
        plan: 'free',
        tokensLeft: 10,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    };
    
    await setDoc(userRef, {
      ...data,
      createdAt: Timestamp.fromDate(data.createdAt),
      subscription: {
        ...data.subscription,
        expiresAt: Timestamp.fromDate(data.subscription.expiresAt)
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
