// ... existing imports ...
import { saveScript } from '../../services/firestore';

export function ScriptGenerator() {
  // ... existing state ...
  const [scriptId, setScriptId] = useState<string | undefined>();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('Необходимо войти в систему');
      return;
    }

    // ... existing validation ...

    setLoading(true);
    setError('');

    try {
      // ... existing script generation ...

      // Save the script
      const savedScriptId = await saveScript(user.id, scripts.join('\n\n=== Следующая аудитория ===\n\n'), analyses.join('\n\n=== Следующий анализ ===\n\n'));
      setScriptId(savedScriptId);

      // ... rest of the existing code ...
    } catch (err) {
      console.error('Error generating script:', err);
      setError('Произошла ошибка при генерации сценария');
    } finally {
      setLoading(false);
    }
  };

  const handleNewIdea = () => {
    setScript('');
    setAnalysis('');
    setError('');
    setTargetAudiences([]);
    setScriptId(undefined);
  };

  return (
    <div className="w-full bg-gray-800/30 rounded-xl p-4 md:p-6 lg:p-8 mb-8 md:mb-16 lg:mb-32">
      {/* ... existing JSX ... */}
      {script && (
        <ScriptResult 
          script={script} 
          analysis={analysis} 
          onNewIdea={handleNewIdea}
          scriptId={scriptId}
        />
      )}
    </div>
  );
}
