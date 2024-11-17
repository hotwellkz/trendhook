import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD1YomusyOJxJIRgn7ewrmz0CU-fmTl9HI",
  authDomain: "virahook.firebaseapp.com",
  projectId: "virahook",
  storageBucket: "virahook.firebasestorage.app",
  messagingSenderId: "678089630781",
  appId: "1:678089630781:web:e102146eb7fdee23927654"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);