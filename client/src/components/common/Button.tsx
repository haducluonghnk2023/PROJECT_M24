import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'success' | 'warning';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  fullWidth = false,
  leftIcon,
  rightIcon,
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-semibold rounded-xl 
    focus:ring-4 focus:outline-none transition-all duration-300 transform 
    active:scale-95 hover:scale-105 relative overflow-hidden group
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
  `;
  
  const variantClasses = {
    primary: `
      text-white bg-gradient-to-r from-blue-600 to-blue-700 
      hover:from-blue-700 hover:to-blue-800 focus:ring-blue-300 
      shadow-lg hover:shadow-xl
      before:absolute before:inset-0 before:bg-gradient-to-r 
      before:from-white/20 before:to-transparent before:opacity-0 
      hover:before:opacity-100 before:transition-opacity before:duration-300
    `,
    secondary: `
      text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-300 
      border border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md
    `,
    danger: `
      text-white bg-gradient-to-r from-red-600 to-red-700 
      hover:from-red-700 hover:to-red-800 focus:ring-red-300 
      shadow-lg hover:shadow-xl
      before:absolute before:inset-0 before:bg-gradient-to-r 
      before:from-white/20 before:to-transparent before:opacity-0 
      hover:before:opacity-100 before:transition-opacity before:duration-300
    `,
    outline: `
      text-blue-600 border-2 border-blue-600 bg-transparent
      hover:bg-blue-600 hover:text-white focus:ring-blue-300 
      shadow-sm hover:shadow-md
      before:absolute before:inset-0 before:bg-blue-600 before:scale-x-0 
      before:origin-left hover:before:scale-x-100 before:transition-transform 
      before:duration-300
    `,
    ghost: `
      text-blue-600 bg-transparent hover:bg-blue-50 hover:text-blue-700
      focus:ring-blue-300 shadow-sm hover:shadow-md
    `,
    success: `
      text-white bg-gradient-to-r from-green-600 to-green-700 
      hover:from-green-700 hover:to-green-800 focus:ring-green-300 
      shadow-lg hover:shadow-xl
      before:absolute before:inset-0 before:bg-gradient-to-r 
      before:from-white/20 before:to-transparent before:opacity-0 
      hover:before:opacity-100 before:transition-opacity before:duration-300
    `,
    warning: `
      text-white bg-gradient-to-r from-yellow-500 to-yellow-600 
      hover:from-yellow-600 hover:to-yellow-700 focus:ring-yellow-300 
      shadow-lg hover:shadow-xl
      before:absolute before:inset-0 before:bg-gradient-to-r 
      before:from-white/20 before:to-transparent before:opacity-0 
      hover:before:opacity-100 before:transition-opacity before:duration-300
    `,
  };
  
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs min-h-[28px]',
    sm: 'px-3 py-1.5 text-sm min-h-[32px]',
    md: 'px-4 py-2 text-base min-h-[40px]',
    lg: 'px-6 py-3 text-lg min-h-[48px]',
    xl: 'px-8 py-4 text-xl min-h-[56px]',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`.trim();

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={classes}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          Đang xử lý...
        </div>
      ) : (
        <>
          {leftIcon && (
            <span className="mr-2 flex-shrink-0">
              {leftIcon}
            </span>
          )}
          <span className="relative z-10">
            {children}
          </span>
          {rightIcon && (
            <span className="ml-2 flex-shrink-0">
              {rightIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
};
