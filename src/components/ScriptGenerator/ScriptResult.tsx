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
    const interval = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [scriptId]);

  // ... existing handlers ...

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
            {/* ... existing buttons ... */}
          </div>
        </div>
        {/* ... rest of the component ... */}
      </div>
    </div>
  );
}
