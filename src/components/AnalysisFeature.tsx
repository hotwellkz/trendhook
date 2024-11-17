import React from 'react';
import { Check } from 'lucide-react';

export function AnalysisFeature({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 text-left">
      <div className="flex-shrink-0 mt-1">
        <Check className="w-4 h-4 md:w-5 md:h-5 text-[#AAFF00]" />
      </div>
      <p className="text-gray-300 text-sm md:text-base">{text}</p>
    </div>
  );
}