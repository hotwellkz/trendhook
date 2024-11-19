import { 
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  DocumentData,
  updateDoc,
  increment,
  FieldValue,
  DocumentReference,
  query,
  where,
  getDocs,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { User, UserSubscription, SubscriptionPlan, SubscriptionStatus } from '../types/database';

// Интерфейс для создания пользователя
interface CreateUserData {
  email: string;
  displayName: string | null;
  photoURL: string | null;
}

// Константы для тарифных планов
const SUBSCRIPTION_DURATIONS = {
  'content-creator': {
    days: 30,
    tokens: 60
  },
  'business': {
    days: 30,
    tokens: 250
  },
  'agency': {
    days: 30,
    tokens: 999999 // Безлимитные токены
  },
  'free': {
    days: 0,
    tokens: 0
  }
};

// Остальной код файла остается без изменений...
