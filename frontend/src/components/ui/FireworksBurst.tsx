'use client';
import React, { useEffect, useRef } from 'react';

/**
 * FireworksBurst — renders a full-screen canvas fireworks burst animation.
 * Simply mount this component to trigger fireworks; unmount to stop.
 */
export const FireworksBurst: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number; y: number; vx: number; vy: number;
      color: string; alpha: number; size: number; decay: number;
    }[] = [];

    const colors = ['#d4af37', '#f3d87c', '#10b981', '#fff', '#ffd700', '#ff6b35', '#a855f7'];

    const burst = (x: number, y: number) => {
      for (let i = 0; i < 80; i++) {
        const angle = (Math.PI * 2 * i) / 80;
        const speed = Math.random() * 6 + 2;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          size: Math.random() * 4 + 2,
          decay: Math.random() * 0.02 + 0.01,
        });
      }
    };

    // Launch multiple bursts across the screen
    const positions = [
      [canvas.width * 0.2, canvas.height * 0.3],
      [canvas.width * 0.5, canvas.height * 0.2],
      [canvas.width * 0.8, canvas.height * 0.3],
      [canvas.width * 0.35, canvas.height * 0.5],
      [canvas.width * 0.65, canvas.height * 0.4],
      [canvas.width * 0.1, canvas.height * 0.6],
      [canvas.width * 0.9, canvas.height * 0.6],
    ];
    positions.forEach(([x, y], i) => {
      setTimeout(() => burst(x, y), i * 250);
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1; // gravity
        p.vx *= 0.98;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (particles.length > 0) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      aria-hidden="true"
    />
  );
};
