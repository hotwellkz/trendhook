import OpenAI from 'openai';

const getOpenAIClient = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OpenAI API key is not configured. Please check your environment variables.');
  }
  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });
};

interface GenerateScriptParams {
  topic: string;
  duration: number;
  style: string;
  targetAudience: string;
  objective: string;
}

export const aiService = {
  async generateScript({
    topic,
    duration,
    style,
    targetAudience,
    objective
  }: GenerateScriptParams) {
    try {
      const openai = getOpenAIClient();
      
      const prompt = `Создай сценарий для короткого видео со следующими параметрами:
        Тема: ${topic}
        Длительность: ${duration} секунд
        Стиль: ${style}
        Целевая аудитория: ${targetAudience}
        Цель: ${objective}
        
        Формат сценария должен включать:
        1. Хук (первые 3 секунды)
        2. Основной контент
        3. Призыв к действию
        4. Рекомендации по визуальному оформлению`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { 
            role: "system", 
            content: "Ты - эксперт по созданию вирусных коротких видео. Твоя задача - создавать эффективные сценарии, которые привлекают внимание и удерживают зрителя." 
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
      });

      if (!completion.choices[0]?.message?.content) {
        throw new Error('Не удалось получить ответ от OpenAI API');
      }

      return completion.choices[0].message.content;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          throw new Error('Ошибка авторизации API. Пожалуйста, проверьте настройки API ключа.');
        }
        if (error.message.includes('Rate limit')) {
          throw new Error('Превышен лимит запросов к API. Пожалуйста, подождите немного и попробуйте снова.');
        }
      }
      throw new Error('Произошла ошибка при генерации сценария. Пожалуйста, попробуйте позже.');
    }
  },

  async analyzeViralPotential(script: string) {
    try {
      const openai = getOpenAIClient();
      
      const prompt = `Проанализируй следующий сценарий видео и оцени его вирусный потенциал:

      ${script}

      Оцени по следующим параметрам:
      1. Сила хука (1-100)
      2. Удержание внимания (1-100)
      3. Вероятность досмотров (1-100)
      4. Потенциал вовлечения (лайки, комментарии, репосты)
      5. Рекомендации по улучшению`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { 
            role: "system", 
            content: "Ты - аналитик вирусного контента. Твоя задача - оценивать потенциал видео и давать рекомендации по улучшению." 
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.3,
      });

      if (!completion.choices[0]?.message?.content) {
        throw new Error('Не удалось получить ответ от OpenAI API');
      }

      return completion.choices[0].message.content;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          throw new Error('Ошибка авторизации API. Пожалуйста, проверьте настройки API ключа.');
        }
        if (error.message.includes('Rate limit')) {
          throw new Error('Превышен лимит запросов к API. Пожалуйста, подождите немного и попробуйте снова.');
        }
      }
      throw new Error('Произошла ошибка при анализе потенциала. Пожалуйста, попробуйте позже.');
    }
  },

  async generateHookVariations(topic: string, targetAudience: string) {
    try {
      const openai = getOpenAIClient();
      
      const prompt = `Создай 5 вариантов хуков для видео на тему "${topic}" для аудитории "${targetAudience}".
      
      Каждый хук должен быть:
      1. Не длиннее 15 слов
      2. Провоцировать любопытство
      3. Создавать эмоциональный отклик
      
      Формат:
      1. [Тип хука] Текст хука
      2. [Тип хука] Текст хука
      и т.д.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { 
            role: "system", 
            content: "Ты - эксперт по созданию цепляющих хуков для коротких видео. Твоя задача - создавать хуки, которые заставляют зрителя остановиться и начать смотреть." 
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.9,
      });

      if (!completion.choices[0]?.message?.content) {
        throw new Error('Не удалось получить ответ от OpenAI API');
      }

      return completion.choices[0].message.content;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          throw new Error('Ошибка авторизации API. Пожалуйста, проверьте настройки API ключа.');
        }
        if (error.message.includes('Rate limit')) {
          throw new Error('Превышен лимит запросов к API. Пожалуйста, подождите немного и попробуйте снова.');
        }
      }
      throw new Error('Произошла ошибка при генерации вариантов хуков. Пожалуйста, попробуйте позже.');
    }
  }
};
