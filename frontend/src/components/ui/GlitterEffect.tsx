'use client';
import React, { useEffect, useRef } from 'react';

interface GlitterEffectProps {
  count?: number;
  className?: string;
}

export const GlitterEffect: React.FC<GlitterEffectProps> = ({ count = 40, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 6 + 2;
      const x = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 4 + 3;
      const colors = ['#d4af37', '#f3d87c', '#fff', '#10b981', '#ffd700'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      p.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        animation: sparkleFloat ${duration}s ${delay}s ease-in-out infinite;
        box-shadow: 0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}40;
        z-index: 20;
        opacity: 0;
      `;

      container.appendChild(p);
      particles.push(p);
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, [count]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};
