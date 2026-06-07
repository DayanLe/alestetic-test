import React from 'react';
import logoSrc from '../assets/images/logo-alestetic.png';

interface AlesteticLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'auto';
}

export function AlesteticLogo({ variant = 'dark', className = '', size = 'auto' }: AlesteticLogoProps) {
  const dimensions = {
    sm:   { width: '150px', height: 'auto' },
    md:   { width: '220px', height: 'auto' },
    lg:   { width: '300px', height: 'auto' },
    auto: { width: '100%',  height: 'auto' },
  };

  const dims = dimensions[size];

  return (
    <div className={`inline-block ${className}`} style={{ width: dims.width }}>
      <img
        src={logoSrc}
        alt="Alestetic – Centro de Estética"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        className={variant === 'dark' ? 'brightness-0 invert' : ''}
      />
    </div>
  );
}
