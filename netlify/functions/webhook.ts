import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// Initialize Firebase Admin
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
  
  if (!sig) {
    return { 
      statusCode: 400, 
      body: JSON.stringify({ error: 'No signature found in request' })
    };
  }

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body!,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id!;
        
        // Get the price details
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        const amount = lineItems.data[0]?.amount_total || 0;
        
        // Update user subscription and add payment record
        const userRef = db.collection('users').doc(userId);
        
        await userRef.update({
          'subscription.status': 'active',
          'subscription.stripeCustomerId': session.customer,
          'subscription.planId': session.subscription,
          'subscription.updatedAt': new Date(),
          payments: FieldValue.arrayUnion({
            id: session.id,
            amount: amount / 100, // Convert from cents to dollars
            plan: session.metadata?.plan || 'unknown',
            date: new Date(),
            status: 'succeeded'
          }),
          totalPaid: FieldValue.increment(amount / 100)
        });
        break;
      }

      case 'charge.refunded': {
        const charge = stripeEvent.data.object as Stripe.Charge;
        const customer = await stripe.customers.retrieve(charge.customer as string);
        
        if (typeof customer !== 'string' && customer.metadata.userId) {
          const userRef = db.collection('users').doc(customer.metadata.userId);
          
          await userRef.update({
            payments: FieldValue.arrayUnion({
              id: charge.id,
              amount: -(charge.amount_refunded / 100),
              plan: 'refund',
              date: new Date(),
              status: 'refunded'
            }),
            totalPaid: FieldValue.increment(-(charge.amount_refunded / 100))
          });
        }
        break;
      }

      // ... rest of the webhook handlers remain the same ...
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
