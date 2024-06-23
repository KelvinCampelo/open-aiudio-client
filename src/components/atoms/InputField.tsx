// src/components/atoms/InputField.tsx

import React from 'react';

interface InputFieldProps {
  type: 'text' | 'password' | 'email' | 'number';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
  className = '',
  id,
  name,
  required = false,
  disabled = false,
  maxLength,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      id={id}
      name={name}
      required={required}
      disabled={disabled}
      maxLength={maxLength}
    />
  );
};

export default InputField;
