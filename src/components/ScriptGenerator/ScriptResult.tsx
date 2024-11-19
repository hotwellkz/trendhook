import React, { useState } from 'react';
import { PlusCircle, Copy, Share2, Download, Check } from 'lucide-react';

interface ScriptResultProps {
  script: string;
  analysis?: string;
  onNewIdea: () => void;
}

export function ScriptResult({ script, analysis, onNewIdea }: ScriptResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Сценарий от ViralHooks',
          text: script
        });
      } else {
        handleCopy();
      }
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([script], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'script.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="mt-8 space-y-6">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Сгенерированный сценарий:</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 bg-gray-800/50 text-white px-4 py-2 rounded-lg hover:bg-gray-800/70 transition-colors"
              title="Копировать текст"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Скопировано</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>Копировать</span>
                </>
              )}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-gray-800/50 text-white px-4 py-2 rounded-lg hover:bg-gray-800/70 transition-colors"
              title="Поделиться"
            >
              <Share2 className="w-5 h-5" />
              <span>Поделиться</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-gray-800/50 text-white px-4 py-2 rounded-lg hover:bg-gray-800/70 transition-colors"
              title="Скачать сценарий"
            >
              <Download className="w-5 h-5" />
              <span>Скачать</span>
            </button>
            <button
              onClick={onNewIdea}
              className="flex items-center gap-2 bg-[#AAFF00]/10 text-[#AAFF00] px-4 py-2 rounded-lg hover:bg-[#AAFF00]/20 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Новая идея</span>
            </button>
          </div>
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
