// ... existing imports ...

export function ScriptGenerator() {
  // ... existing state and hooks ...

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setScript('');
    setAnalysis('');
    
    if (!user?.id) {
      setError('Необходима авторизация');
      return;
    }

    try {
      const hasTokens = await checkTokens();
      if (!hasTokens) return;

      setLoading(true);
      
      // Генерируем сценарий
      const generatedScript = await aiService.generateScript({
        topic,
        duration,
        style,
        targetAudience,
        objective
      });
      
      if (!generatedScript) {
        throw new Error('Не удалось сгенерировать сценарий');
      }

      // Обновляем токены и статистику
      await Promise.all([
        updateTokens(),
        incrementScriptCount(user.id)
      ]);

      setScript(generatedScript);
      
      // Анализируем потенциал
      const viralAnalysis = await aiService.analyzeViralPotential(generatedScript);
      if (viralAnalysis) {
        setAnalysis(viralAnalysis);
      }
      
    } catch (err) {
      console.error('Generation error:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Произошла ошибка при генерации сценария'
      );
    } finally {
      setLoading(false);
    }
  };

  // ... rest of the component ...
}
