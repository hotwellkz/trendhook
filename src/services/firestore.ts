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

// Constants for subscription plans
const SUBSCRIPTION_DURATIONS = {
  'content-creator': {
    days: 30,
    tokens: 60
  },
  'business': {
    days: 30,
    tokens: 250
  },
  'agency': {
    days: 30,
    tokens: 999999 // Unlimited tokens
  },
  'free': {
    days: 0,
    tokens: 0
  }
};

export const updateUserPlan = async (userId: string, plan: SubscriptionPlan): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    const planConfig = SUBSCRIPTION_DURATIONS[plan];
    const now = new Date();
    const expiresAt = new Date(now.getTime() + planConfig.days * 24 * 60 * 60 * 1000);

    await updateDoc(userRef, {
      'subscription.plan': plan,
      'subscription.status': plan === 'free' ? 'expired' : 'active',
      'subscription.tokensLeft': planConfig.tokens,
      'subscription.expiresAt': expiresAt,
      'subscription.lastUpdated': now
    });
  } catch (error) {
    console.error('Error updating user plan:', error);
    throw new Error('Failed to update user plan');
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
      },
      stats: {
        scriptsGenerated: data.stats?.scriptsGenerated || 0,
        videosAnalyzed: data.stats?.videosAnalyzed || 0,
        lastScriptDate: data.stats?.lastScriptDate?.toDate() || undefined
      }
    } as User;

    // Check if trial or subscription has expired
    const now = new Date();
    if (user.subscription.status === 'trial' && now > user.subscription.trialEndsAt) {
      await updateDoc(userRef, {
        'subscription.status': 'expired',
        'subscription.tokensLeft': 0,
        'subscription.lastUpdated': Timestamp.fromDate(now)
      });

      user.subscription.status = 'expired';
      user.subscription.tokensLeft = 0;
      user.subscription.lastUpdated = now;
    } else if (user.subscription.status === 'active' && now > user.subscription.expiresAt) {
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
    throw new Error('Failed to get user data');
  }
};

export const createUser = async (userId: string, userData: CreateUserData): Promise<User> => {
  try {
    const userRef = doc(db, 'users', userId);
    
    const now = new Date();
    const trialEndsAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const subscription: UserSubscription = {
      plan: 'free',
      tokensLeft: 10,
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
      subscription,
      stats: {
        scriptsGenerated: 0,
        videosAnalyzed: 0
      }
    };
    
    await setDoc(userRef, {
      ...data,
      createdAt: Timestamp.fromDate(data.createdAt),
      subscription: {
        ...subscription,
        trialEndsAt: Timestamp.fromDate(subscription.trialEndsAt),
        expiresAt: Timestamp.fromDate(subscription.expiresAt),
        lastUpdated: subscription.lastUpdated ? Timestamp.fromDate(subscription.lastUpdated) : null
      }
    });
    
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};

export const incrementScriptCount = async (userId: string): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      'stats.scriptsGenerated': increment(1),
      'stats.lastScriptDate': Timestamp.fromDate(new Date())
    });
  } catch (error) {
    console.error('Error incrementing script count:', error);
    throw new Error('Failed to update statistics');
  }
};

// Script storage functionality
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
      createdAt: Timestamp.fromDate(now),
      expiresAt: Timestamp.fromDate(expiresAt)
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
