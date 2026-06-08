'use client';
import Image from 'next/image';

interface AlesteticLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'auto';
}

export function AlesteticLogo({ variant = 'dark', className = '', size = 'auto' }: AlesteticLogoProps) {
  const widths = { sm: 150, md: 220, lg: 300, auto: 220 };
  const w = widths[size];
  return (
    <div className={`inline-block ${className}`} style={{ width: w }}>
      <Image
        src="/alestetic-test/images/logo-alestetic.png"
        alt="Alestetic – Centro de Estética Médica"
        width={w}
        height={60}
        style={{ width: '100%', height: 'auto' }}
        className={variant === 'dark' ? 'brightness-0 invert' : ''}
        priority
      />
    </div>
  );
}
