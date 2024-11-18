import React from 'react';
import { Loader2 } from 'lucide-react';

interface GenerateButtonProps {
  loading: boolean;
  disabled?: boolean;
}

export function GenerateButton({ loading, disabled = false }: GenerateButtonProps) {
  return (
    <button
      type="submit"
      className="w-full bg-[#AAFF00] text-black py-3 rounded-lg font-medium hover:bg-[#88CC00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={disabled || loading}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Генерация...</span>
        </div>
      ) : (
        'Сгенерировать сценарий'
      )}
    </button>
  );
}