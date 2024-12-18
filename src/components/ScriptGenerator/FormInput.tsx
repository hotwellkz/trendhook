import React from 'react';

interface FormInputProps {
  label: string;
  type?: 'text' | 'number';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  min?: string;
  max?: string;
}

export function FormInput({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  min,
  max
}: FormInputProps) {
  return (
    <div className="space-y-2 bg-black/20 p-3 md:p-4 rounded-xl">
      <label className="block text-white text-sm md:text-base font-medium">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full bg-black/40 rounded-lg px-3 md:px-4 py-2.5 md:py-3.5 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-800/50"
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        min={min}
        max={max}
      />
    </div>
  );
}
