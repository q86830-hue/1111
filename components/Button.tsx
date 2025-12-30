import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "font-bold rounded-2xl shadow-[0_4px_0_rgb(0,0,0,0.2)] md:shadow-[0_6px_0_rgb(0,0,0,0.2)] active:shadow-[0_2px_0_rgb(0,0,0,0.2)] active:translate-y-1 transition-all flex items-center justify-center border-2 border-white/20 touch-manipulation select-none";
  
  const variants = {
    primary: "bg-brand-blue text-white hover:bg-blue-400",
    secondary: "bg-brand-purple text-white hover:bg-purple-400",
    success: "bg-brand-green text-white hover:bg-green-500",
    danger: "bg-brand-pink text-white hover:bg-red-400",
    neutral: "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs md:text-sm",
    md: "px-4 py-2.5 text-base md:px-6 md:py-3 md:text-lg",
    lg: "px-6 py-3 text-lg md:px-8 md:py-4 md:text-xl",
    xl: "px-6 py-4 text-xl md:px-10 md:py-6 md:text-2xl"
  };

  return (
    <button 
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};