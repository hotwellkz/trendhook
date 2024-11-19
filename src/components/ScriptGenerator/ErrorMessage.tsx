import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-red-500/10 text-red-500 p-3 md:p-4 rounded-lg flex items-start gap-2 text-sm md:text-base">
      <AlertCircle className="w-4 h-4 md:w-5 md:h-5 mt-0.5 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}
