import type { ChatCompletionMessageParam } from 'openai/resources/chat';

interface GenerateScriptParams {
  topic: string;
  duration: number;
  style: string;
  targetAudience: string;
  objective: string;
}

const callOpenAIProxy = async (prompt: string) => {
  const response = await fetch('/.netlify/functions/openai-proxy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to call OpenAI API');
  }

  return response.json();
};

export const aiService = {
  async generateScript({
    topic,
    duration,
    style,
    targetAudience,
    objective
  }: GenerateScriptParams): Promise<string> {
    try {
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

      const response = await callOpenAIProxy(prompt);
      return response.content;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Ошибка генерации сценария: ${error.message}`);
      }
      throw new Error('Произошла ошибка при генерации сценария');
    }
  },

  async analyzeViralPotential(script: string): Promise<string> {
    try {
      const prompt = `Проанализируй следующий сценарий видео и оцени его вирусный потенциал:

      ${script}

      Оцени по следующим параметрам:
      1. Сила хука (1-100)
      2. Удержание внимания (1-100)
      3. Вероятность досмотров (1-100)
      4. Потенциал вовлечения (лайки, комментарии, репосты)
      5. Рекомендации по улучшению`;

      const response = await callOpenAIProxy(prompt);
      return response.content;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Ошибка анализа: ${error.message}`);
      }
      throw new Error('Произошла ошибка при анализе потенциала');
    }
  },

  async generateHookVariations(topic: string, targetAudience: string): Promise<string> {
    try {
      const prompt = `Создай 5 вариантов хуков для видео на тему "${topic}" для аудитории "${targetAudience}".
      
      Каждый хук должен быть:
      1. Не длиннее 15 слов
      2. Провоцировать любопытство
      3. Создавать эмоциональный отклик
      
      Формат:
      1. [Тип хука] Текст хука
      2. [Тип хука] Текст хука
      и т.д.`;

      const response = await callOpenAIProxy(prompt);
      return response.content;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Ошибка генерации хуков: ${error.message}`);
      }
      throw new Error('Произошла ошибка при генерации вариантов хуков');
    }
  }
};
