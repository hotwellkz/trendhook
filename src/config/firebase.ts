import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBtZswjAtSwEDl_m7jlEzmoIsAmv6SJbjk",
  authDomain: "trendvideo.online",
  projectId: "youtubeapp-221719",
  storageBucket: "youtubeapp-221719.appspot.com",
  messagingSenderId: "678595429851",
  appId: "1:678595429851-ov2ibq0fsash3qr98hkgn8g85n69683v"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Настраиваем Google Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');

// Устанавливаем параметры для Google Sign In
googleProvider.setCustomParameters({
  prompt: 'select_account',
  login_hint: 'user@example.com'
});

// Экспортируем функцию для Google входа
export const signInWithGoogle = async () => {
  try {
    console.log('Starting Google Sign In...');
    console.log('Current domain:', window.location.hostname);
    console.log('Auth domain:', auth.app.options.authDomain);
    
    const result = await signInWithPopup(auth, googleProvider);
    console.log('Sign in successful:', result);
    return result;
  } catch (error: any) {
    console.error('Google Sign In Error:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    // Добавляем больше информации об ошибке
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
