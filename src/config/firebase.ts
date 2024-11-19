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
    console.error(`Missing required environment variable: ${envVar}`);
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

// Настраиваем Google Provider с расширенными разрешениями
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');

// Добавляем дополнительные параметры для Google Sign In
googleProvider.setCustomParameters({
  prompt: 'select_account',
  client_id: '678089630781-i0kmtgnf1jqv1guu01seg0q6ag82sd5i.apps.googleusercontent.com' // Добавляем Web client ID
});

// Экспортируем функцию для Google входа с обработкой ошибок
export const signInWithGoogle = async () => {
  try {
    // Логируем текущий домен для отладки
    console.log('Current domain:', window.location.hostname);
    console.log('Auth domain:', auth.app.options.authDomain);
    
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error: any) {
    console.error('Google Sign In Error:', error);
    
    // Добавляем подробную информацию об ошибке
    if (error.code === 'auth/unauthorized-domain') {
      console.error('Domain not authorized. Please add it to Firebase Console -> Authentication -> Settings -> Authorized domains');
      error.message = `Domain ${window.location.hostname} is not authorized. Please add it to Firebase Console -> Authentication -> Settings -> Authorized domains`;
    } else if (error.code === 'auth/popup-blocked') {
      error.message = 'Popup was blocked by the browser. Please allow popups for this site.';
    } else if (error.code === 'auth/popup-closed-by-user') {
      error.message = 'Authentication popup was closed. Please try again.';
    } else if (error.code === 'auth/cancelled-popup-request') {
      error.message = 'Another authentication popup is already open.';
    }
    
    throw error;
  }
};

export const db = getFirestore(app);
export { auth };
