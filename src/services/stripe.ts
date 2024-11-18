import { loadStripe } from '@stripe/stripe-js';

// Создаем один экземпляр Stripe
let stripePromise: Promise<any> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};

export const stripeService = {
  getStripe,
  
  async createCheckoutSession(userId: string, priceId: string) {
    try {
      const stripe = await getStripe();
      if (!stripe) throw new Error('Stripe не инициализирован');

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

      if (session.error) {
        throw new Error(session.error);
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Ошибка создания сессии:', error);
      throw error;
    }
  },

  async updateSubscriptionStatus(userId: string, status: string) {
    try {
      const response = await fetch('/.netlify/functions/update-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          status,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error);
      }

      return result;
    } catch (error) {
      console.error('Ошибка обновления статуса подписки:', error);
      throw error;
    }
  },

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

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error);
      }

      return result;
    } catch (error) {
      console.error('Ошибка получения информации о подписке:', error);
      throw error;
    }
  },
};
