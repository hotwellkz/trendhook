import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_FIREBASE_CLIENT_ID'
] as const;

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

// Настраиваем Google Provider
const googleProvider = new GoogleAuthProvider();

// Добавляем необходимые scopes
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');

// Устанавливаем параметры для Google Sign In
googleProvider.setCustomParameters({
  prompt: 'select_account',
  client_id: import.meta.env.VITE_FIREBASE_CLIENT_ID,
  redirect_uri: window.location.hostname === 'localhost' 
    ? 'http://localhost:5173/__/auth/handler'
    : 'https://trendvideo.online/__/auth/handler'
});

// Экспортируем функцию для Google входа
export const signInWithGoogle = async () => {
  try {
    console.log('Starting Google Sign In...');
    console.log('Current domain:', window.location.hostname);
    console.log('Auth domain:', auth.app.options.authDomain);
    console.log('Redirect URI:', googleProvider.customParameters?.redirect_uri);
    
    const result = await signInWithPopup(auth, googleProvider);
    console.log('Sign in successful:', result);
    return result;
  } catch (error: any) {
    console.error('Google Sign In Error:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    if (error.code === 'auth/unauthorized-domain') {
      error.message = `Domain ${window.location.hostname} is not authorized. Please add it to Firebase Console -> Authentication -> Settings -> Authorized domains`;
    }
    
    throw error;
  }
};

export const db = getFirestore(app);
export { auth };
