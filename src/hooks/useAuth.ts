import { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getUser, createUser } from '../services/firestore';
import type { User } from '../types/database';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser: FirebaseUser | null) => {
      try {
        if (firebaseUser) {
          // Получаем данные пользователя из Firestore
          let userData = await getUser(firebaseUser.uid);
          
          if (!userData) {
            // Создаем нового пользователя в Firestore
            await createUser(firebaseUser.uid, {
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              subscription: {
                plan: 'free',
                tokensLeft: 10,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 дней пробного периода
              }
            });
            
            // Получаем обновленные данные пользователя
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
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}
