import { 
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { User } from '../types/database';

export const createUser = async (userId: string, userData: Partial<User>) => {
  try {
    const userRef = doc(db, 'users', userId);
    const data = {
      ...userData,
      createdAt: Timestamp.now(),
      subscription: {
        plan: 'free',
        tokensLeft: 10,
        expiresAt: Timestamp.fromDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
      }
    };
    await setDoc(userRef, data);
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

    const userData = userSnap.data() as User;
    return {
      ...userData,
      id: userId,
      subscription: userData.subscription || {
        plan: 'free',
        tokensLeft: 10,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    };
  } catch (error) {
    console.error('Error getting user:', error);
    throw new Error('Не удалось получить данные пользователя');
  }
};
