import { 
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  DocumentData,
  updateDoc,
  increment,
  query,
  where,
  getDocs,
  deleteDoc,
  addDoc,
  orderBy
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { User, UserSubscription, SubscriptionPlan } from '../types/database';

interface CreateUserData {
  email: string;
  displayName: string | null;
  photoURL: string | null;
}

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
      displayName: userData.displayName || 'Пользователь',
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
      },
      stats: {
        scriptsGenerated: data.stats?.scriptsGenerated || 0,
        videosAnalyzed: data.stats?.videosAnalyzed || 0,
        lastScriptDate: data.stats?.lastScriptDate?.toDate() || undefined
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

export const incrementScriptCount = async (userId: string): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      'stats.scriptsGenerated': increment(1),
      'stats.lastScriptDate': Timestamp.fromDate(new Date())
    });
  } catch (error) {
    console.error('Error incrementing script count:', error);
    throw new Error('Не удалось обновить статистику');
  }
};

export const updateUserPlan = async (userId: string, plan: SubscriptionPlan): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 дней

    let tokensLeft = 0;
    switch (plan) {
      case 'content-creator':
        tokensLeft = 60;
        break;
      case 'business':
        tokensLeft = 250;
        break;
      case 'agency':
        tokensLeft = 999999; // Безлимит
        break;
      default:
        tokensLeft = 0;
    }

    await updateDoc(userRef, {
      'subscription.plan': plan,
      'subscription.status': plan === 'free' ? 'expired' : 'active',
      'subscription.tokensLeft': tokensLeft,
      'subscription.expiresAt': Timestamp.fromDate(expiresAt),
      'subscription.lastUpdated': Timestamp.fromDate(now)
    });
  } catch (error) {
    console.error('Error updating user plan:', error);
    throw new Error('Не удалось обновить план пользователя');
  }
};

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
