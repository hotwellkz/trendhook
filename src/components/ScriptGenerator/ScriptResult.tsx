import React, { useState } from 'react';
import { PlusCircle, Copy, Share2, Download, Check, Edit2, Save } from 'lucide-react';

interface ScriptResultProps {
  script: string;
  analysis?: string;
  onNewIdea: () => void;
}

export function ScriptResult({ script, analysis, onNewIdea }: ScriptResultProps) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedScript, setEditedScript] = useState(script);

  // ... handlers remain the same ...

  return (
    <div className="mt-4 md:mt-6 lg:mt-8 space-y-4 md:space-y-6">
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h3 className="text-lg md:text-xl font-bold">Сгенерированный сценарий:</h3>
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
            className="w-full h-[200px] md:h-[300px] lg:h-[400px] bg-black/40 rounded-lg p-4 text-white resize-none focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 text-sm md:text-base"
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
