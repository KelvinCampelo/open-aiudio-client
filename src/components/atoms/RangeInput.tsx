import React from 'react';

interface RangeInputProps {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

const RangeInput: React.FC<RangeInputProps> = ({
  id,
  label,
  min,
  max,
  step,
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}: {value}
      </label>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full mt-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};

export default RangeInput;
