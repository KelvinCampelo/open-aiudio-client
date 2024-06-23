// src/components/atoms/Button.tsx
import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  children,
  variant = 'primary',
  size = 'medium',
  icon,
}) => {
  const baseStyles = 'font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 flex items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
    success: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500',
  };

  const sizeStyles = {
    small: 'p-1 text-sm',
    medium: 'p-2',
    large: 'p-3 text-lg',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';

  const buttonStyles = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${disabled ? disabledStyles : ''}
    ${className}
  `.trim();

  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className='w-4 h-4'>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
