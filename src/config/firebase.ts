import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Проверяем наличие всех необходимых переменных окружения
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
] as const;

// Проверяем, что все переменные окружения установлены
for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

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
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');

// Экспортируем функцию для Google входа
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error: any) {
    console.error('Google Sign In Error:', error);
    
    // Добавляем дополнительную информацию об ошибке
    if (error.code === 'auth/unauthorized-domain') {
      console.error('Current domain:', window.location.hostname);
      console.error('Authorized domain:', auth.app.options.authDomain);
      error.message = `Domain ${window.location.hostname} is not authorized. Please add it to Firebase Console -> Authentication -> Settings -> Authorized domains`;
    }
    
    throw error;
  }
};

export const db = getFirestore(app);
export { auth };
