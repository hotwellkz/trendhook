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
  addDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { User, VideoContent, Bookmark, UserAnalytics } from '../types/database';

// User Services
export const createUser = async (userId: string, userData: Partial<User>) => {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, {
    ...userData,
    createdAt: Timestamp.now(),
    subscription: {
      plan: 'free',
      tokensLeft: 10,
      expiresAt: Timestamp.fromDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)) // 7 days trial
    }
  });
};

export const getUser = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() as User : null;
};

// Video Content Services
export const getVideoContents = async (filters: Partial<VideoContent> = {}, limit = 10) => {
  const videosRef = collection(db, 'videos');
  let q = query(videosRef, orderBy('createdAt', 'desc'), limit(limit));

  // Add filters
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      q = query(q, where(key, '==', value));
    }
  });

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as VideoContent[];
};

// Bookmarks Services
export const addBookmark = async (userId: string, videoId: string) => {
  const bookmarksRef = collection(db, 'bookmarks');
  await addDoc(bookmarksRef, {
    userId,
    videoId,
    createdAt: Timestamp.now()
  });
};

export const getUserBookmarks = async (userId: string) => {
  const bookmarksRef = collection(db, 'bookmarks');
  const q = query(bookmarksRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Bookmark[];
};

// Analytics Services
export const trackUserAnalytics = async (userId: string, action: keyof UserAnalytics) => {
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
    // Create new analytics record for today
    await addDoc(analyticsRef, {
      userId,
      tokensUsed: action === 'tokensUsed' ? 1 : 0,
      searchesPerformed: action === 'searchesPerformed' ? 1 : 0,
      videosAnalyzed: action === 'videosAnalyzed' ? 1 : 0,
      date: Timestamp.fromDate(today)
    });
  } else {
    // Update existing analytics record
    const docRef = doc(db, 'analytics', querySnapshot.docs[0].id);
    await updateDoc(docRef, {
      [action]: querySnapshot.docs[0].data()[action] + 1
    });
  }
};