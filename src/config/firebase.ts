import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Инициализируем Firebase
const app = initializeApp(firebaseConfig);

// Инициализируем Auth
const auth = getAuth(app);

// Настраиваем Google Provider
const googleProvider = new GoogleAuthProvider();

// Добавляем необходимые scopes
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');

// Настраиваем параметры
googleProvider.setCustomParameters({
  prompt: 'select_account',
  access_type: 'offline',
  include_granted_scopes: true
});

// Экспортируем функцию для Google входа
export const signInWithGoogle = async () => {
  try {
    // Сначала проверяем, что мы находимся в правильном домене
    const currentDomain = window.location.hostname;
    if (!auth.app.options.authDomain) {
      throw new Error('Auth domain not configured');
    }

    // Пытаемся выполнить вход
    const result = await signInWithPopup(auth, googleProvider);
    
    // Возвращаем результат только если успешно
    if (result.user) {
      return result;
    }
    throw new Error('No user data received');
  } catch (error: any) {
    console.error('Error in signInWithGoogle:', error);
    // Добавляем больше контекста к ошибке
    if (error.code === 'auth/unauthorized-domain') {
      console.error('Current domain:', window.location.hostname);
      console.error('Authorized domains:', auth.app.options.authDomain);
    }
    throw error;
  }
};

export const db = getFirestore(app);
export { auth };
