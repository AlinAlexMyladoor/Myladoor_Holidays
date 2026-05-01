'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
}

export const ParticleField = ({ count = 40 }: { count?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  const COLORS = [
    'rgba(212, 175, 55,',
    'rgba(243, 216, 124,',
    'rgba(160, 124, 40,',
    'rgba(16, 185, 129,',
    'rgba(6, 95, 70,',
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.5 + 0.5,
      speedY: -(Math.random() * 0.5 + 0.2),
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.6 + 0.1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();

        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color + '0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;

        p.y += p.speedY;
        p.x += p.speedX;

        // Reset when off screen
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};
