import { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getUser, createUser } from '../services/firestore';
import type { User } from '../types/database';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser: FirebaseUser | null) => {
      try {
        if (firebaseUser) {
          // Получаем данные пользователя из Firestore
          let userData = await getUser(firebaseUser.uid);
          
          if (!userData) {
            // Создаем нового пользователя в Firestore
            const newUser = {
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              displayName: firebaseUser.displayName || 'Пользователь',
              photoURL: firebaseUser.photoURL,
              createdAt: new Date(),
              subscription: {
                plan: 'free',
                tokensLeft: 10,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 дней пробного периода
              }
            };
            
            await createUser(firebaseUser.uid, newUser);
            userData = await getUser(firebaseUser.uid);
          }
          
          if (userData) {
            setUser(userData);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
        setError(error instanceof Error ? error.message : 'Ошибка авторизации');
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, error };
}
