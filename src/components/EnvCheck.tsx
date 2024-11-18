import React from 'react';

export function EnvCheck() {
  const envVars = {
    FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
    OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
    STRIPE_PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY
  };

  const missingVars = Object.entries(envVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  return (
    <div className="p-4 bg-gray-800/30 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Проверка переменных окружения</h2>
      
      {missingVars.length > 0 ? (
        <div className="text-red-500">
          <p>Отсутствуют следующие переменные:</p>
          <ul className="list-disc list-inside">
            {missingVars.map(varName => (
              <li key={varName}>{varName}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-green-500">
          Все клиентские переменные окружения доступны
        </div>
      )}
    </div>
  );
}
