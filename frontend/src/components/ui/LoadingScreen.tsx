'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export const LoadingScreen: React.FC = () => {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user already loaded this session (SSR safe)
    if (typeof window !== 'undefined' && sessionStorage.getItem('mh-loaded')) {
      setShow(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShow(false);
            if (typeof window !== 'undefined') sessionStorage.setItem('mh-loaded', 'true');
          }, 600);
          return 100;
        }
        return p + Math.random() * 12 + 3;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-[#0d1117] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Aurora background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                background: [
                  'radial-gradient(ellipse at 30% 50%, rgba(6,95,70,0.4) 0%, transparent 60%)',
                  'radial-gradient(ellipse at 70% 50%, rgba(212,175,55,0.2) 0%, transparent 60%)',
                  'radial-gradient(ellipse at 30% 50%, rgba(6,95,70,0.4) 0%, transparent 60%)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0"
            />
          </div>

          {/* 3D rotating M logo */}
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="relative mb-10"
            style={{ perspective: 800 }}
          >
            <div className="w-24 h-24 flex items-center justify-center relative z-10">
              <Image 
                src="/images/logo.png" 
                alt="Myladoor Holidays Logo" 
                width={96}
                height={96}
                className="object-contain filter drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]"
                priority
              />
            </div>
            {/* Orbital ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-[-12px] border-2 border-dashed border-yellow-400/30 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-[-24px] border border-yellow-400/15 rounded-full"
            />
          </motion.div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl font-black text-white tracking-[0.2em] uppercase">
              Myladoor <span className="text-gold-gradient">Holidays</span>
            </h1>
            <p className="text-gray-500 text-xs tracking-[0.4em] uppercase mt-2">
              By Saji Myladoor · Kerala's Premium Fleet
            </p>
          </motion.div>

          {/* Progress bar */}
          <div className="w-64 relative">
            <div className="h-[2px] bg-white/5 w-full">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-600 via-yellow-400 to-emerald-600"
                style={{ width: `${Math.min(progress, 100)}%`, backgroundSize: '200% 100%' }}
                animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <p className="text-[10px] text-gray-600 tracking-widest uppercase mt-3 text-center">
              {progress < 100 ? 'Loading Experience...' : 'Ready'}
            </p>
          </div>

          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-yellow-400"
              initial={{
                left: `${(i * 8.3) % 100}%`,
                top: '110%',
                opacity: 0,
              }}
              animate={{
                top: '-5%',
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                delay: i * 0.2,
                repeat: Infinity,
              }}
              style={{
                boxShadow: '0 0 6px #d4af37',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
