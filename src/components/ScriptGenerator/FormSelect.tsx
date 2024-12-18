import React, { useState, useRef, useEffect } from 'react';
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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCustom && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCustom]);

  const handleSelect = (option: string) => {
    if (option === 'custom') {
      setIsCustom(true);
      onChange('');
    } else {
      onChange(option);
      setIsCustom(false);
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="space-y-2 bg-black/20 p-3 md:p-4 rounded-xl relative">
      <label className="block text-white text-sm md:text-base font-medium">
        {label}
      </label>
      
      <div className="relative">
        {isCustom ? (
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full bg-black/40 rounded-lg pl-3 md:pl-4 pr-10 py-2.5 md:py-3.5 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-800/50"
              placeholder="Введите свой вариант"
              required={required}
              disabled={disabled}
            />
            <button
              type="button"
              onClick={toggleDropdown}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={toggleDropdown}
            className="w-full bg-black/40 rounded-lg px-3 md:px-4 py-2.5 md:py-3.5 text-left text-sm md:text-base text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 flex justify-between items-center disabled:opacity-50 border border-gray-800/50"
            disabled={disabled}
          >
            <span className={value ? 'text-white' : 'text-gray-500'}>
              {value || placeholder}
            </span>
            <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        )}

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-black/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-800 py-1">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                className="w-full px-3 md:px-4 py-2 text-left text-sm md:text-base text-white hover:bg-[#AAFF00]/10 transition-colors"
              >
                {option}
              </button>
            ))}
            {allowCustom && !isCustom && (
              <button
                type="button"
                onClick={() => handleSelect('custom')}
                className="w-full px-3 md:px-4 py-2 text-left text-sm md:text-base text-[#AAFF00] hover:bg-[#AAFF00]/10 transition-colors border-t border-gray-800"
              >
                Свой вариант
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
