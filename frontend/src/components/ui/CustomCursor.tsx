'use client';

import React, { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: 0, y: 0 });
  const outlinePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      outlinePosRef.current.x += (posRef.current.x - outlinePosRef.current.x) * 0.12;
      outlinePosRef.current.y += (posRef.current.y - outlinePosRef.current.y) * 0.12;
      if (outlineRef.current) {
        outlineRef.current.style.left = `${outlinePosRef.current.x}px`;
        outlineRef.current.style.top = `${outlinePosRef.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onMouseDown = () => {
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%, -50%) scale(0.6)';
      if (outlineRef.current) {
        outlineRef.current.style.width = '50px';
        outlineRef.current.style.height = '50px';
        outlineRef.current.style.borderColor = 'rgba(212, 175, 55, 0.8)';
      }
    };

    const onMouseUp = () => {
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      if (outlineRef.current) {
        outlineRef.current.style.width = '36px';
        outlineRef.current.style.height = '36px';
        outlineRef.current.style.borderColor = 'rgba(212, 175, 55, 0.5)';
      }
    };

    const onMouseEnterLink = () => {
      if (outlineRef.current) {
        outlineRef.current.style.width = '55px';
        outlineRef.current.style.height = '55px';
        outlineRef.current.style.borderColor = 'rgba(212, 175, 55, 0.9)';
        outlineRef.current.style.background = 'rgba(212, 175, 55, 0.05)';
      }
      if (dotRef.current) {
        dotRef.current.style.opacity = '0';
      }
    };

    const onMouseLeaveLink = () => {
      if (outlineRef.current) {
        outlineRef.current.style.width = '36px';
        outlineRef.current.style.height = '36px';
        outlineRef.current.style.borderColor = 'rgba(212, 175, 55, 0.5)';
        outlineRef.current.style.background = 'transparent';
      }
      if (dotRef.current) {
        dotRef.current.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    rafRef.current = requestAnimationFrame(animate);

    // Attach hover listeners to all interactive elements
    const attachHoverListeners = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    attachHoverListeners();
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 99999,
          width: '8px',
          height: '8px',
          background: '#d4af37',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.15s ease, opacity 0.3s ease',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={outlineRef}
        className="cursor-outline"
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 99998,
          width: '36px',
          height: '36px',
          border: '1.5px solid rgba(212, 175, 55, 0.5)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease',
        }}
      />
    </>
  );
};
