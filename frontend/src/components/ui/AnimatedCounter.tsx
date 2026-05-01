'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter = ({
  end,
  suffix = '',
  prefix = '',
  duration = 2000,
  className = '',
}: AnimatedCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [count, setCount] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;

    const startTime = performance.now();
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      setCount(Math.floor(easedProgress * end));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(end);
    };

    requestAnimationFrame(tick);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={`stat-number tabular-nums ${className}`}>
      {prefix}{count}{suffix}
    </span>
  );
};
