import { Handler } from '@netlify/functions';
import TelegramBot from 'node-telegram-bot-api';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

// Инициализация Firebase Admin
const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

const db = getFirestore(app);
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { polling: false });

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const update = JSON.parse(event.body!);

    // Проверяем, что это текстовое сообщение
    if (!update.message?.text) {
      return { statusCode: 200, body: 'OK' };
    }

    // Проверяем, что сообщение от авторизованного администратора
    if (update.message.chat.id.toString() !== process.env.TELEGRAM_CHAT_ID) {
      return { statusCode: 403, body: 'Unauthorized' };
    }

    // Парсим chatId и сообщение из текста
    // Ожидаемый формат: /reply chatId message
    const parts = update.message.text.split(' ');
    if (parts[0] !== '/reply' || parts.length < 3) {
      await bot.sendMessage(
        update.message.chat.id,
        'Используйте формат: /reply chatId сообщение'
      );
      return { statusCode: 200, body: 'OK' };
    }

    const chatId = parts[1];
    const message = parts.slice(2).join(' ');

    // Добавляем сообщение в Firestore
    const messagesRef = db.collection('chats').doc(chatId).collection('messages');
    await messagesRef.add({
      text: message,
      sender: 'admin',
      timestamp: Timestamp.now()
    });

    // Отправляем подтверждение в Telegram
    await bot.sendMessage(
      update.message.chat.id,
      `✅ Сообщение отправлено в чат ${chatId}`
    );

    return { statusCode: 200, body: 'OK' };
  } catch (error) {
    console.error('Telegram webhook error:', error);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};
