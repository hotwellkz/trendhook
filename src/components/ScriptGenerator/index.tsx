// ... остальные импорты ...

export function ScriptGenerator() {
  // ... остальные состояния ...

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('Необходимо войти в систему');
      return;
    }

    if (user.subscription.tokensLeft <= 0) {
      setError('Недостаточно токенов. Пожалуйста, обновите план.');
      return;
    }

    if (targetAudiences.length === 0) {
      setError('Добавьте хотя бы одну целевую аудиторию');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const scripts = await Promise.all(targetAudiences.map(audience => 
        aiService.generateScript({
          topic,
          duration: parseInt(duration),
          style,
          targetAudience: audience,
          objective
        })
      ));

      const analyses = await Promise.all(scripts.map(script => 
        aiService.analyzeViralPotential(script)
      ));

      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, {
        'subscription.tokensLeft': user.subscription.tokensLeft - targetAudiences.length
      });

      await incrementScriptCount(user.id);

      const combinedScript = scripts.join('\n\n=== Следующая аудитория ===\n\n');
      const combinedAnalysis = analyses.join('\n\n=== Следующий анализ ===\n\n');

      setScript(combinedScript);
      setAnalysis(combinedAnalysis);

      // Save the script
      const savedScriptId = await saveScript(
        user.id,
        combinedScript,
        combinedAnalysis,
        topic,
        style,
        objective
      );
      setScriptId(savedScriptId);

    } catch (err) {
      console.error('Error generating script:', err);
      setError('Произошла ошибка при генерации сценария');
    } finally {
      setLoading(false);
    }
  };

  // ... остальной код ...
}
