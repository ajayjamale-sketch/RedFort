'use strict';
import React from 'react';

interface LogoProps {
  variant?: 'full' | 'mark' | 'horizontal' | 'compact';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export function RedFortMark({ 
  className = "w-8 h-8",
  theme = 'dark'
}: { 
  className?: string; 
  theme?: 'dark' | 'light';
}) {
  const baseColor = theme === 'dark' ? '#FFFFFF' : '#0B0F19';
  const accentColor = '#F5762E'; // RedFort Signature Orange

  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="RedFort Emblem"
    >
      {/* Top-Right Fortified Bastion Bracket (Signature Orange) */}
      <path 
        d="M32 12 H88 V68 H66 V34 H32 V12Z" 
        fill={accentColor} 
      />
      
      {/* Bottom-Left Perimeter Defense Wall Bracket (Pure White / Deep Navy) */}
      <path 
        d="M12 32 H34 V66 H68 V88 H12 V32Z" 
        fill={baseColor} 
      />

      {/* Central Cyber-Physical Core Dot / Sentry Anchor */}
      <rect 
        x="42" 
        y="42" 
        width="16" 
        height="16" 
        fill={accentColor} 
        opacity="0.9"
      />
    </svg>
  );
}

export default function Logo({
  variant = 'full',
  theme = 'dark',
  size = 'md',
  showSubtitle = false,
  className = ''
}: LogoProps) {
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-[#0B0F19]';
  const textMuted = theme === 'dark' ? 'text-[#94A3B8]' : 'text-[#475569]';

  // Sizing definitions
  const sizeMap = {
    sm: {
      mark: 'w-6 h-6',
      text: 'text-lg',
      sub: 'text-[8px]',
      gap: 'space-x-2.5'
    },
    md: {
      mark: 'w-8 h-8',
      text: 'text-2xl',
      sub: 'text-[9px]',
      gap: 'space-x-3'
    },
    lg: {
      mark: 'w-10 h-10',
      text: 'text-3xl',
      sub: 'text-[11px]',
      gap: 'space-x-3.5'
    },
    xl: {
      mark: 'w-14 h-14',
      text: 'text-5xl',
      sub: 'text-xs',
      gap: 'space-x-4'
    }
  };

  const currentSize = sizeMap[size];

  if (variant === 'mark') {
    return <RedFortMark className={`${currentSize.mark} ${className}`} theme={theme} />;
  }

  return (
    <div className={`flex items-center ${currentSize.gap} ${className} select-none group`}>
      {/* Icon Mark */}
      <RedFortMark 
        className={`${currentSize.mark} shrink-0 transition-transform duration-300 group-hover:scale-105`} 
        theme={theme} 
      />

      {/* Wordmark (Ontic-inspired Clean Geometric Typography) */}
      <div className="flex flex-col justify-center">
        <div className={`font-extrabold tracking-[0.12em] font-sans leading-none ${currentSize.text} ${textPrimary}`}>
          RED<span className="text-[#F5762E]">FORT</span>
        </div>
        
        {showSubtitle && (
          <div className={`font-mono tracking-[0.25em] uppercase font-semibold mt-1 ${currentSize.sub} ${textMuted}`}>
            Enterprise Security
          </div>
        )}
      </div>
    </div>
  );
}
