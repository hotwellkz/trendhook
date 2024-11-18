import React from 'react';

interface ScriptResultProps {
  script: string;
  analysis?: string;
}

export function ScriptResult({ script, analysis }: ScriptResultProps) {
  return (
    <div className="mt-8 space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-4">Сгенерированный сценарий:</h3>
        <div className="bg-black/40 rounded-lg p-4 whitespace-pre-wrap">
          {script}
        </div>
      </div>

      {analysis && (
        <div>
          <h3 className="text-xl font-bold mb-4">Анализ вирусного потенциала:</h3>
          <div className="bg-black/40 rounded-lg p-4 whitespace-pre-wrap">
            {analysis}
          </div>
        </div>
      )}
    </div>
  );
}
