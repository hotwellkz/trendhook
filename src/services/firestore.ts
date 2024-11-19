// ... existing imports ...
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
  deleteDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { User, UserSubscription, SubscriptionPlan, SubscriptionStatus } from '../types/database';

// ... existing code ...

export interface Script {
  id: string;
  userId: string;
  content: string;
  analysis?: string;
  createdAt: Date;
  expiresAt: Date;
}

const SCRIPT_EXPIRATION_DAYS = 2;

export const saveScript = async (userId: string, content: string, analysis?: string): Promise<string> => {
  try {
    const scriptsRef = collection(db, 'scripts');
    const now = new Date();
    const expiresAt = new Date(now.getTime() + SCRIPT_EXPIRATION_DAYS * 24 * 60 * 60 * 1000);

    const scriptDoc = doc(scriptsRef);
    await setDoc(scriptDoc, {
      userId,
      content,
      analysis,
      createdAt: now,
      expiresAt
    });

    return scriptDoc.id;
  } catch (error) {
    console.error('Error saving script:', error);
    throw new Error('Failed to save script');
  }
};

export const getScripts = async (userId: string): Promise<Script[]> => {
  try {
    const scriptsRef = collection(db, 'scripts');
    const q = query(scriptsRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      expiresAt: doc.data().expiresAt.toDate()
    })) as Script[];
  } catch (error) {
    console.error('Error getting scripts:', error);
    throw new Error('Failed to get scripts');
  }
};

export const deleteExpiredScripts = async (): Promise<void> => {
  try {
    const scriptsRef = collection(db, 'scripts');
    const q = query(scriptsRef, where('expiresAt', '<=', new Date()));
    const snapshot = await getDocs(q);

    const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting expired scripts:', error);
    throw new Error('Failed to delete expired scripts');
  }
};

// ... rest of existing code ...
