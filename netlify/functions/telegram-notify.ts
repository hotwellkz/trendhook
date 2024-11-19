import { Handler } from '@netlify/functions';
import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { polling: false });

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { chatId, message, userEmail } = JSON.parse(event.body!);

    // Форматируем сообщение для администратора
    const text = `📩 Новое сообщение\n\n` +
                `👤 От: ${userEmail}\n` +
                `💬 Сообщение: ${message}\n\n` +
                `Чтобы ответить, используйте:\n` +
                `/reply ${chatId} ваш ответ`;
    
    await bot.sendMessage(process.env.TELEGRAM_CHAT_ID!, text, {
      parse_mode: 'HTML'
    });

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
