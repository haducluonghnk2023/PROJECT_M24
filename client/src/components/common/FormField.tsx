import React, { useState } from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = '',
  leftIcon,
  rightIcon,
  helperText,
  variant = "default",
  size = "md",
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const baseInputClasses = `
    w-full transition-all duration-300 focus:outline-none
    ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-text'}
  `;

  const variantClasses = {
    default: `
      border-2 rounded-xl bg-white
      ${error 
        ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
        : isFocused 
          ? 'border-blue-500 focus:border-blue-500 focus:ring-blue-200' 
          : 'border-gray-300 hover:border-gray-400'
      }
      focus:ring-4 focus:ring-opacity-20
    `,
    filled: `
      border-0 rounded-xl bg-gray-50
      ${error 
        ? 'bg-red-50 focus:bg-red-50 focus:ring-red-200' 
        : isFocused 
          ? 'bg-blue-50 focus:bg-blue-50 focus:ring-blue-200' 
          : 'hover:bg-gray-100'
      }
      focus:ring-4 focus:ring-opacity-20
    `,
    outlined: `
      border-2 border-dashed rounded-xl bg-transparent
      ${error 
        ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
        : isFocused 
          ? 'border-blue-500 focus:border-blue-500 focus:ring-blue-200' 
          : 'border-gray-300 hover:border-gray-400'
      }
      focus:ring-4 focus:ring-opacity-20
    `,
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  };

  const inputClasses = `${baseInputClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;

  return (
    <div className={`form-field ${className}`}>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-semibold text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        
        <input
          type={inputType}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className={`
            ${inputClasses}
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon || isPassword ? 'pr-10' : ''}
          `}
        />
        
        {(rightIcon || isPassword) && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isPassword ? (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            ) : (
              <span className="text-gray-400">
                {rightIcon}
              </span>
            )}
          </div>
        )}
      </div>
      
      {error && (
        <div className="mt-2 flex items-center">
          <svg className="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-red-500 text-sm font-medium">{error}</span>
        </div>
      )}
      
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
