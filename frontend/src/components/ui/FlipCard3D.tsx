'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FlipCard3DProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

export const FlipCard3D: React.FC<FlipCard3DProps> = ({ front, back, className = '' }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      style={{ perspective: '1200px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ transformStyle: 'preserve-3d', position: 'relative' }}
        className="w-full h-full"
      >
        {/* Front */}
        <div
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          className="w-full h-full"
        >
          {front}
        </div>
        {/* Back */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
};
