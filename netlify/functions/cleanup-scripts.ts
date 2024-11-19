import { Handler } from '@netlify/functions';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin
const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

const db = getFirestore(app);

export const handler: Handler = async (event) => {
  try {
    const now = new Date();
    const scriptsRef = db.collection('scripts');
    const expiredScripts = await scriptsRef
      .where('expiresAt', '<=', now)
      .get();

    const batch = db.batch();
    expiredScripts.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully deleted ${expiredScripts.size} expired scripts`,
      }),
    };
  } catch (error) {
    console.error('Error cleaning up scripts:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to clean up expired scripts' }),
    };
  }
};
