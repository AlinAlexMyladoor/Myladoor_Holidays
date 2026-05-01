'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const HoverTiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate rotation limits (e.g., max 15 degrees)
    const rotateYVal = ((mouseX / width) - 0.5) * 20; 
    const rotateXVal = ((mouseY / height) - 0.5) * -20;

    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.5 }}
      style={{ perspective: 1000 }}
      className={cn('relative w-full preserve-3d', className)}
    >
      {children}
    </motion.div>
  );
};
