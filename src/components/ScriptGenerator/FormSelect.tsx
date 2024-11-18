import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FormSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  allowCustom?: boolean;
}

export function FormSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  disabled = false,
  allowCustom = false
}: FormSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCustom, setIsCustom] = useState(false);

  const handleSelect = (option: string) => {
    if (option === 'custom') {
      setIsCustom(true);
    } else {
      onChange(option);
      setIsCustom(false);
    }
    setIsOpen(false);
  };

  return (
    <div className="space-y-2 bg-black/20 p-4 rounded-xl relative">
      <label className="block text-white text-base font-medium">
        {label}
      </label>
      
      {isCustom ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-black/40 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-800/50"
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
      ) : (
        <div className="relative">
          <button
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className="w-full bg-black/40 rounded-lg px-4 py-3.5 text-left text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 flex justify-between items-center disabled:opacity-50 border border-gray-800/50"
            disabled={disabled}
          >
            <span className={value ? 'text-white' : 'text-gray-500'}>
              {value || placeholder}
            </span>
            <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-black/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-800 py-1">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="w-full px-4 py-2 text-left text-white hover:bg-[#AAFF00]/10 transition-colors"
                >
                  {option}
                </button>
              ))}
              {allowCustom && (
                <button
                  type="button"
                  onClick={() => handleSelect('custom')}
                  className="w-full px-4 py-2 text-left text-[#AAFF00] hover:bg-[#AAFF00]/10 transition-colors border-t border-gray-800"
                >
                  Свой вариант
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
