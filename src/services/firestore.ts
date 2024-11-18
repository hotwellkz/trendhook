import { 
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  addDoc,
  DocumentData
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { User, VideoContent, Bookmark, UserAnalytics } from '../types/database';

// User Services
export const createUser = async (userId: string, userData: Partial<User>) => {
  try {
    const userRef = doc(db, 'users', userId);
    const data = {
      ...userData,
      id: userId,
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
    if (userSnap.exists()) {
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
    }
    return null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw new Error('Не удалось получить данные пользователя');
  }
};

// Video Content Services
export const getVideoContents = async (filters: Partial<VideoContent> = {}, maxResults = 10): Promise<VideoContent[]> => {
  try {
    const videosRef = collection(db, 'videos');
    let q = query(videosRef, orderBy('createdAt', 'desc'), limit(maxResults));

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        q = query(q, where(key, '==', value));
      }
    });

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as VideoContent[];
  } catch (error) {
    console.error('Error getting videos:', error);
    throw new Error('Не удалось получить список видео');
  }
};

// Bookmarks Services
export const addBookmark = async (userId: string, videoId: string): Promise<void> => {
  try {
    const bookmarksRef = collection(db, 'bookmarks');
    await addDoc(bookmarksRef, {
      userId,
      videoId,
      createdAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error adding bookmark:', error);
    throw new Error('Не удалось добавить в закладки');
  }
};

export const getUserBookmarks = async (userId: string): Promise<Bookmark[]> => {
  try {
    const bookmarksRef = collection(db, 'bookmarks');
    const q = query(
      bookmarksRef, 
      where('userId', '==', userId), 
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as Bookmark[];
  } catch (error) {
    console.error('Error getting bookmarks:', error);
    throw new Error('Не удалось получить закладки');
  }
};

// Analytics Services
export const trackUserAnalytics = async (userId: string, action: keyof UserAnalytics): Promise<void> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const analyticsRef = collection(db, 'analytics');
    const q = query(
      analyticsRef,
      where('userId', '==', userId),
      where('date', '==', Timestamp.fromDate(today))
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      const newAnalytics: Partial<UserAnalytics> = {
        userId,
        tokensUsed: action === 'tokensUsed' ? 1 : 0,
        searchesPerformed: action === 'searchesPerformed' ? 1 : 0,
        videosAnalyzed: action === 'videosAnalyzed' ? 1 : 0,
        date: today
      };
      await addDoc(analyticsRef, newAnalytics);
    } else {
      const docRef = doc(db, 'analytics', querySnapshot.docs[0].id);
      const currentValue = querySnapshot.docs[0].data()[action] || 0;
      await updateDoc(docRef, {
        [action]: currentValue + 1
      });
    }
  } catch (error) {
    console.error('Error tracking analytics:', error);
    throw new Error('Не удалось обновить аналитику');
  }
};
