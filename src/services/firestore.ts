import { 
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  DocumentData,
  updateDoc,
  increment,
  FieldValue,
  DocumentReference,
  query,
  where,
  getDocs,
  deleteDoc,
  addDoc,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { User, UserSubscription, SubscriptionPlan, SubscriptionStatus } from '../types/database';

// Интерфейс для сохраненного сценария
export interface SavedScript {
  id: string;
  userId: string;
  script: string;
  analysis: string;
  topic: string;
  style: string;
  objective: string;
  createdAt: Date;
  expiresAt: Date;
}

// ... остальной код ...

export const saveScript = async (
  userId: string, 
  script: string, 
  analysis: string,
  topic: string,
  style: string,
  objective: string
): Promise<string> => {
  try {
    const scriptsRef = collection(db, 'scripts');
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 дня

    const docRef = await addDoc(scriptsRef, {
      userId,
      script,
      analysis,
      topic,
      style,
      objective,
      createdAt: Timestamp.fromDate(now),
      expiresAt: Timestamp.fromDate(expiresAt)
    });

    return docRef.id;
  } catch (error) {
    console.error('Error saving script:', error);
    throw new Error('Не удалось сохранить сценарий');
  }
};

export const getUserScripts = async (userId: string): Promise<SavedScript[]> => {
  try {
    const scriptsRef = collection(db, 'scripts');
    const q = query(
      scriptsRef,
      where('userId', '==', userId),
      where('expiresAt', '>', Timestamp.fromDate(new Date())),
      orderBy('expiresAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      expiresAt: doc.data().expiresAt.toDate()
    })) as SavedScript[];
  } catch (error) {
    console.error('Error getting user scripts:', error);
    throw new Error('Не удалось получить сценарии');
  }
};
