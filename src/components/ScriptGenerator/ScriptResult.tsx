import React, { useState, useEffect } from 'react';
import { PlusCircle, Copy, Share2, Download, Check, Edit2, Save, Clock } from 'lucide-react';

interface ScriptResultProps {
  script: string;
  analysis?: string;
  onNewIdea: () => void;
  scriptId?: string;
}

export function ScriptResult({ script, analysis, onNewIdea, scriptId }: ScriptResultProps) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedScript, setEditedScript] = useState(script);
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!scriptId) return;

      const now = new Date();
      const expiresAt = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
      const diff = expiresAt.getTime() - now.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeLeft(`${days}д ${hours}ч`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}ч ${minutes}м`);
      } else {
        setTimeLeft(`${minutes}м`);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(interval);
  }, [scriptId]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editedScript || script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Сценарий видео',
        text: editedScript || script
      });
    } catch (err) {
      console.error('Failed to share:', err);
      // Fallback to copy
      handleCopy();
    }
  };

  const handleDownload = () => {
    const content = editedScript || script;
    // Create blob with UTF-8 encoding and BOM
    const blob = new Blob(['\ufeff', content], { 
      type: 'text/plain;charset=utf-8' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'script.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleEdit = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="mt-4 md:mt-6 lg:mt-8 space-y-4 md:space-y-6">
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg md:text-xl font-bold">Сгенерированный сценарий:</h3>
            {scriptId && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Сценарий будет храниться еще {timeLeft}</span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-800/50 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-gray-800/70 transition-colors text-sm md:text-base"
              title="Копировать текст"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Скопировано</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Копировать</span>
                </>
              )}
            </button>
            <button
              onClick={handleShare}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-800/50 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-gray-800/70 transition-colors text-sm md:text-base"
              title="Поделиться"
            >
              <Share2 className="w-4 h-4 md:w-5 md:h-5" />
              <span>Поделиться</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-800/50 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-gray-800/70 transition-colors text-sm md:text-base"
              title="Скачать сценарий"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              <span>Скачать</span>
            </button>
            <button
              onClick={handleEdit}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 ${
                isEditing 
                  ? 'bg-[#AAFF00] text-black hover:bg-[#88CC00]' 
                  : 'bg-gray-800/50 text-white hover:bg-gray-800/70'
              } px-3 md:px-4 py-2 rounded-lg transition-colors text-sm md:text-base`}
              title={isEditing ? "Сохранить изменения" : "Редактировать сценарий"}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Сохранить</span>
                </>
              ) : (
                <>
                  <Edit2 className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Редактировать</span>
                </>
              )}
            </button>
            <button
              onClick={onNewIdea}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#AAFF00]/10 text-[#AAFF00] px-3 md:px-4 py-2 rounded-lg hover:bg-[#AAFF00]/20 transition-colors text-sm md:text-base"
            >
              <PlusCircle className="w-4 h-4 md:w-5 md:h-5" />
              <span>Новая идея</span>
            </button>
          </div>
        </div>
        {isEditing ? (
          <textarea
            value={editedScript}
            onChange={(e) => setEditedScript(e.target.value)}
            className="w-full min-h-[200px] md:min-h-[300px] lg:min-h-[400px] bg-black/40 rounded-lg p-4 text-white resize-y focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 text-sm md:text-base"
            style={{ height: 'auto' }}
          />
        ) : (
          <div className="bg-black/40 rounded-lg p-4 whitespace-pre-wrap text-sm md:text-base">
            {editedScript || script}
          </div>
        )}
      </div>

      {analysis && (
        <div>
          <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Анализ вирусного потенциала:</h3>
          <div className="bg-black/40 rounded-lg p-4 whitespace-pre-wrap text-sm md:text-base">
            {analysis}
          </div>
        </div>
      )}
    </div>
  );
}
