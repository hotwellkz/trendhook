import { loadStripe } from '@stripe/stripe-js';
import { db } from '../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

// Инициализация Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const stripeService = {
  // Создание сессии оплаты
  async createCheckoutSession(userId: string, priceId: string) {
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe не инициализирован');

      // Создаем сессию через Cloud Function (нужно будет настроить)
      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          priceId,
        }),
      });

      const session = await response.json();

      // Перенаправляем на страницу оплаты Stripe
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  },

  // Обновление статуса подписки пользователя
  async updateSubscriptionStatus(userId: string, status: string) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        'subscription.status': status,
      });
    } catch (error) {
      console.error('Error updating subscription status:', error);
      throw error;
    }
  },

  // Получение информации о подписке
  async getSubscriptionInfo(subscriptionId: string) {
    try {
      const response = await fetch('/.netlify/functions/get-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId,
        }),
      });

      return await response.json();
    } catch (error) {
      console.error('Error getting subscription info:', error);
      throw error;
    }
  },
};