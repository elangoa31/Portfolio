import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import React, { type ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  asChild?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  className,
  asChild = false,
  ...props 
}: ButtonProps) {
  
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none rounded-none cursor-pointer";
  
  const variants = {
    primary: "bg-foreground text-background hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]",
    secondary: "bg-white/10 text-foreground hover:bg-white/15 border border-white/10",
    outline: "border border-white/20 bg-transparent hover:bg-white/5 hover:border-white/40 text-foreground"
  };

  const combinedClassName = cn(baseStyles, variants[variant], className);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      className: cn(combinedClassName, (children.props as any)?.className),
      'data-interactive': 'true',
    });
  }

  return (
    <motion.button
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      data-interactive="true"
      className={combinedClassName}
      {...props as any}
    >
      {children}
    </motion.button>
  );
}
