import React from 'react';
import { PlusCircle } from 'lucide-react';

interface ScriptResultProps {
  script: string;
  analysis?: string;
  onNewIdea: () => void;
}

export function ScriptResult({ script, analysis, onNewIdea }: ScriptResultProps) {
  return (
    <div className="mt-8 space-y-6">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Сгенерированный сценарий:</h3>
          <button
            onClick={onNewIdea}
            className="flex items-center gap-2 bg-[#AAFF00]/10 text-[#AAFF00] px-4 py-2 rounded-lg hover:bg-[#AAFF00]/20 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Новая идея</span>
          </button>
        </div>
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
