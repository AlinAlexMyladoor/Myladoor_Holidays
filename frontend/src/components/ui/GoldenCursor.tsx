'use client';
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const GoldenCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const posRef = useRef({ x: 0, y: 0 });
  const trailPositions = useRef<{ x: number; y: number }[]>(
    Array(8).fill({ x: 0, y: 0 })
  );
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      // Lerp the trail
      trailPositions.current = trailPositions.current.map((pos, i) => {
        const target = i === 0 ? posRef.current : trailPositions.current[i - 1];
        const newX = pos.x + (target.x - pos.x) * 0.35;
        const newY = pos.y + (target.y - pos.y) * 0.35;
        return { x: newX, y: newY };
      });

      trailRefs.current.forEach((el, i) => {
        if (!el) return;
        const pos = trailPositions.current[i];
        el.style.left = `${pos.x}px`;
        el.style.top = `${pos.y}px`;
        el.style.opacity = `${(1 - i / trailRefs.current.length) * 0.7}`;
        const scale = 1 - i * 0.1;
        el.style.transform = `translate(-50%, -50%) scale(${scale})`;
      });

      if (outlineRef.current) {
        const lastPos = trailPositions.current[2] || posRef.current;
        outlineRef.current.style.left = `${lastPos.x}px`;
        outlineRef.current.style.top = `${lastPos.y}px`;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    const onMouseDown = () => {
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%, -50%) scale(2)';
    };
    const onMouseUp = () => {
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <>
      {/* Main dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ transition: 'transform 0.1s ease' }}
      />
      {/* Outline ring */}
      <div ref={outlineRef} className="cursor-outline" />
      {/* Sparkle trail */}
      {Array(8).fill(null).map((_, i) => (
        <div
          key={i}
          ref={el => { if (el) trailRefs.current[i] = el; }}
          style={{
            position: 'fixed',
            width: `${10 - i}px`,
            height: `${10 - i}px`,
            borderRadius: '50%',
            background: i % 2 === 0 ? '#d4af37' : '#10b981',
            pointerEvents: 'none',
            zIndex: 99990,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${6 - i}px ${i % 2 === 0 ? '#d4af37' : '#10b981'}`,
            transition: 'opacity 0.1s',
          }}
        />
      ))}
    </>
  );
};
