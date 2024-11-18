import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-red-500/10 text-red-500 p-4 rounded-lg flex items-start gap-2">
      <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}
