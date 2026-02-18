import React from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  accentSide?: 'left' | 'right' | 'top' | 'bottom' | 'none';
  accentColor?: string;
}

const ACCENT_STYLES: Record<string, Record<string, string>> = {
  left:   { borderLeft:   '2px solid' },
  right:  { borderRight:  '2px solid' },
  top:    { borderTop:    '2px solid' },
  bottom: { borderBottom: '2px solid' },
  none:   {},
};

export default function GlassPanel({
  children,
  className = '',
  accentSide = 'none',
  accentColor = 'rgba(0,200,255,0.3)',
}: GlassPanelProps) {
  const accent = accentSide !== 'none' ? ACCENT_STYLES[accentSide] : {};
  const accentStyle = accentSide !== 'none' ? { ...accent, [Object.keys(accent)[0]]: `2px solid ${accentColor}` } : {};

  return (
    <div className={`glass rounded-xl ${className}`} style={accentStyle}>
      {children}
    </div>
  );
}
