import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BetaButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function BetaButton({ className = '', children = 'Присоединиться' }: BetaButtonProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/signup');
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-[#AAFF00] text-black font-medium hover:bg-[#88CC00] transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
