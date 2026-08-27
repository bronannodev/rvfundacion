import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'outline' | 'muted';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const baseStyles = "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono tracking-wider uppercase rounded-full transition-all";
  
  const variants = {
    default: "bg-[#181A1F] text-[#E2E4E8] border border-[#2A2E38]",
    accent: "bg-[#D97736]/10 text-[#E58B4E] border border-[#D97736]/30",
    outline: "bg-transparent text-[#9DA3AE] border border-[#2A2E38]",
    muted: "bg-[#101216] text-[#6B7280] border border-[#1A1D24]",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
