import { Handler } from '@netlify/functions';
import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { polling: false });

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { chatId, message, userEmail } = JSON.parse(event.body!);

    // Отправляем уведомление в Telegram
    const text = `Новое сообщение от ${userEmail}\nЧат ID: ${chatId}\n\nСообщение: ${message}`;
    
    await bot.sendMessage(process.env.TELEGRAM_CHAT_ID!, text);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send notification' })
    };
  }
};
