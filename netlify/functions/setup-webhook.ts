import { Handler } from '@netlify/functions';
import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { polling: false });

export const handler: Handler = async (event) => {
  try {
    const baseUrl = process.env.SITE_URL || event.headers.host;
    const webhookUrl = `https://${baseUrl}/api/telegram-webhook`;
    
    const result = await bot.setWebhook(webhookUrl);
    
    if (result) {
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          success: true, 
          message: `Webhook установлен на ${webhookUrl}`,
          webhookInfo: await bot.getWebhookInfo()
        })
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
      })
    };
  }
};
