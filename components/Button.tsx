import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center uppercase tracking-widest font-serif transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-luxGold text-black hover:bg-white hover:text-black border border-luxGold hover:border-white",
    gold: "bg-gradient-to-r from-luxGold to-[#FFE57F] text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]",
    secondary: "bg-luxCharcoal text-luxWhite border border-luxGray hover:border-luxGold hover:text-luxGold",
    outline: "border border-luxGold text-luxGold hover:bg-luxGold hover:text-black",
    ghost: "bg-transparent text-luxWhite hover:text-luxGold"
  };

  const sizes = {
    sm: "px-6 py-2 text-xs",
    md: "px-8 py-3 text-sm",
    lg: "px-10 py-4 text-base"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;