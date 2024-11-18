import { Handler } from '@netlify/functions';

const handler: Handler = async () => {
  // Список всех необходимых переменных
  const requiredEnvVars = [
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_PRIVATE_KEY',
    'FIREBASE_PROJECT_ID',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_APP_ID',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_OPENAI_API_KEY',
    'VITE_STRIPE_PUBLIC_KEY',
    'SITE_URL'
  ];

  const missingVars: string[] = [];
  const availableVars: string[] = [];

  // Проверяем каждую переменную
  requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
      missingVars.push(varName);
    } else {
      availableVars.push(varName);
    }
  });

  if (missingVars.length > 0) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Missing environment variables',
        missingVars,
        availableVars
      }, null, 2)
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'All environment variables are available',
      availableVars
    }, null, 2)
  };
};

export { handler };
