'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

export const RevealOnScroll = ({ children, className, delay = 0, direction = 'up', duration = 0.5 }: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  const getHiddenVariant = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 50 };
      case 'down': return { opacity: 0, y: -50 };
      case 'left': return { opacity: 0, x: 50 };
      case 'right': return { opacity: 0, x: -50 };
      case 'none': return { opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getHiddenVariant()}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : getHiddenVariant()}
      transition={{ duration, delay, ease: [0.25, 0.25, 0, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};
