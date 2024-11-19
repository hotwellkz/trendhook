import { Handler } from '@netlify/functions';
import TelegramBot from 'node-telegram-bot-api';
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

// Инициализация бота
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { polling: false });

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const update = JSON.parse(event.body!);

    // Обрабатываем только текстовые сообщения
    if (!update.message?.text || !update.message.chat.id) {
      return { statusCode: 200, body: 'OK' };
    }

    // Проверяем, что сообщение от авторизованного администратора
    if (update.message.chat.id.toString() !== process.env.TELEGRAM_CHAT_ID) {
      return { statusCode: 403, body: 'Unauthorized' };
    }

    // Получаем ID чата из текста сообщения (предполагается формат: "chatId:message")
    const [chatId, ...messageParts] = update.message.text.split(':');
    if (!chatId || messageParts.length === 0) {
      await bot.sendMessage(update.message.chat.id, 'Неверный формат сообщения. Используйте: chatId:текст сообщения');
      return { statusCode: 200, body: 'OK' };
    }

    // Добавляем сообщение в Firestore
    const messagesRef = db.collection('chats').doc(chatId).collection('messages');
    await messagesRef.add({
      text: messageParts.join(':').trim(),
      sender: 'admin',
      timestamp: new Date()
    });

    await bot.sendMessage(update.message.chat.id, 'Сообщение отправлено');
    return { statusCode: 200, body: 'OK' };
  } catch (error) {
    console.error('Telegram webhook error:', error);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};
