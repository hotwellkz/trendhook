import { Handler } from '@netlify/functions';
import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { polling: false });

export const handler: Handler = async (event) => {
  try {
    // Используем SITE_URL из переменных окружения или берем из заголовков
    const baseUrl = process.env.SITE_URL || event.headers.host;
    
    // Формируем URL для вебхука
    const webhookUrl = `https://${baseUrl}/api/telegram-webhook`;
    
    // Удаляем текущий вебхук перед установкой нового
    await bot.deleteWebHook();
    
    // Устанавливаем новый вебхук
    const result = await bot.setWebhook(webhookUrl, {
      max_connections: 100,
      allowed_updates: ['message']
    });
    
    // Получаем информацию о вебхуке для проверки
    const webhookInfo = await bot.getWebhookInfo();
    
    if (result) {
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          success: true, 
          message: `Webhook успешно установлен на ${webhookUrl}`,
          webhookInfo
        }, null, 2)
      };
    } else {
      throw new Error('Не удалось установить вебхук');
    }
  } catch (error) {
    console.error('Setup webhook error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, null, 2)
    };
  }
};
