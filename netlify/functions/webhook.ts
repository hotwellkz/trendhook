import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Инициализация Firebase Admin
const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

const db = getFirestore(app);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sig = event.headers['stripe-signature'];
  
  // Проверяем наличие подписи
  if (!sig) {
    return { 
      statusCode: 400, 
      body: JSON.stringify({ error: 'No signature found in request' })
    };
  }

  try {
    // Используем установленный вебхук-секрет
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body!,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Обработка различных событий
    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id!;
        
        await db.collection('users').doc(userId).update({
          'subscription.status': 'active',
          'subscription.stripeCustomerId': session.customer,
          'subscription.planId': session.subscription,
          'subscription.updatedAt': new Date(),
        });
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = stripeEvent.data.object as Stripe.Subscription;
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        
        if (typeof customer !== 'string' && customer.metadata.userId) {
          await db.collection('users').doc(customer.metadata.userId).update({
            'subscription.status': 'canceled',
            'subscription.updatedAt': new Date(),
          });
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = stripeEvent.data.object as Stripe.Subscription;
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        
        if (typeof customer !== 'string' && customer.metadata.userId) {
          await db.collection('users').doc(customer.metadata.userId).update({
            'subscription.status': subscription.status,
            'subscription.planId': subscription.items.data[0].price.id,
            'subscription.updatedAt': new Date(),
          });
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = stripeEvent.data.object as Stripe.Invoice;
        const customer = await stripe.customers.retrieve(invoice.customer as string);
        
        if (typeof customer !== 'string' && customer.metadata.userId) {
          await db.collection('users').doc(customer.metadata.userId).update({
            'subscription.status': 'past_due',
            'subscription.updatedAt': new Date(),
          });
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = stripeEvent.data.object as Stripe.Invoice;
        const customer = await stripe.customers.retrieve(invoice.customer as string);
        
        if (typeof customer !== 'string' && customer.metadata.userId) {
          await db.collection('users').doc(customer.metadata.userId).update({
            'subscription.status': 'active',
            'subscription.updatedAt': new Date(),
          });
        }
        break;
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error('Webhook Error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        error: 'Webhook Error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};

export { handler };