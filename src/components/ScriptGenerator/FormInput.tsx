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
    <div className="space-y-2">
      <label className="block text-white text-base">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full bg-[#0D0F12] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50"
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        min={min}
        max={max}
      />
    </div>
  );
}
