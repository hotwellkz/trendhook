import React, { useState, useEffect } from 'react';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';

interface SavedScript {
  id: string;
  script: string;
  analysis: string;
  createdAt: string;
  topic: string;
  style: string;
  objective: string;
}

export function SavedScripts() {
  const [savedScripts, setSavedScripts] = useState<SavedScript[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedScript, setSelectedScript] = useState<SavedScript | null>(null);

  useEffect(() => {
    const scripts = JSON.parse(localStorage.getItem('savedScripts') || '[]');
    setSavedScripts(scripts);
  }, []);

  if (savedScripts.length === 0) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-[#AAFF00] hover:text-[#88CC00] transition-colors mb-4"
      >
        <Clock className="w-5 h-5" />
        <span>Сохраненные сценарии ({savedScripts.length})</span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {isExpanded && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedScripts.map((script) => (
              <div
                key={script.id}
                className="bg-black/40 rounded-lg p-4 cursor-pointer hover:bg-black/60 transition-colors"
                onClick={() => setSelectedScript(selectedScript?.id === script.id ? null : script)}
              >
                <h3 className="font-medium mb-2">{script.topic}</h3>
                <div className="text-sm text-gray-400 space-y-1">
                  <p>Стиль: {script.style}</p>
                  <p>Цель: {script.objective}</p>
                  <p>Создан: {formatDate(script.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>

          {selectedScript && (
            <div className="bg-black/40 rounded-lg p-4 mt-4">
              <h3 className="font-medium mb-4">Сценарий:</h3>
              <div className="whitespace-pre-wrap mb-6">{selectedScript.script}</div>
              
              <h3 className="font-medium mb-4">Анализ:</h3>
              <div className="whitespace-pre-wrap text-gray-400">{selectedScript.analysis}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
