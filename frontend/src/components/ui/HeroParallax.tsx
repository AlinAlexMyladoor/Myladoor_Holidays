'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Play, ChevronDown } from 'lucide-react';
import { ParticleField } from './ParticleField';

const backgrounds = [
  'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=90&w=2560',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=90&w=2560',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=90&w=2560',
];

const slides = [
  {
    tag: 'Premium Fleet Available',
    headline: ['Travel in'],
    accent: 'Unmatched',
    subHead: 'Elegance',
    sub: "Experience the difference with Myladoor Holidays — Kerala's finest vehicle rental service, available 24/7.",
    badge: '15+ Years of Excellence',
  },
  {
    tag: 'Airport · Corporate · Weddings',
    headline: ['Every Journey,'],
    accent: 'Perfectly',
    subHead: 'Crafted',
    sub: 'From 4-seater cars to 49-seater coaches — we have the perfect vehicle for every occasion and every budget.',
    badge: '5,000+ Happy Clients',
  },
  {
    tag: 'Across Kerala & Beyond',
    headline: ['Where Would'],
    accent: 'You Like',
    subHead: 'To Go?',
    sub: 'Expert chauffeurs, luxury interiors, real-time flight tracking, and unwavering 24/7 support on every trip.',
    badge: '9 Vehicle Categories',
  },
];

export const HeroParallax = () => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 80 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  const rotateX = useTransform(y, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(x, [-0.5, 0.5], ['-8deg', '8deg']);
  const containerRef = useRef<HTMLDivElement>(null);

  const INTERVAL = 7000;

  useEffect(() => {
    let startTime = Date.now();
    const progInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = (elapsed / INTERVAL) * 100;
      if (p >= 100) {
        setIndex(prev => (prev + 1) % slides.length);
        startTime = Date.now();
        setProgress(0);
      } else {
        setProgress(p);
      }
    }, 50);
    return () => clearInterval(progInterval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const normalX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(normalX);
    mouseY.set(normalY);
  };

  const slide = slides[index];

  const floatX = useTransform(x, [-0.5, 0.5], ['-12px', '12px']);
  const floatY = useTransform(y, [-0.5, 0.5], ['-8px', '8px']);
  const floatX2 = useTransform(x, [-0.5, 0.5], ['8px', '-8px']);
  const floatY2 = useTransform(y, [-0.5, 0.5], ['6px', '-6px']);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full relative overflow-hidden flex items-end bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`bg-${index}`}
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 z-0"
          style={{ x: floatX, y: floatY }}
        >
          <Image
            src={backgrounds[index]}
            alt="hero background"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 z-10" />
      <div className="absolute inset-0 hero-vignette z-10" />

      {/* Noise texture */}
      <div className="noise-overlay z-10" />

      {/* Particles */}
      <div className="absolute inset-0 z-[11]">
        <ParticleField count={35} />
      </div>

      {/* Floating Decorative Elements */}
      <motion.div
        style={{ x: floatX2, y: floatY2 }}
        className="absolute top-1/4 right-[10%] z-20 hidden xl:block"
      >
        <div className="relative w-64 h-40 opacity-60">
          <Image
            src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400"
            alt="vehicle preview"
            fill
            className="object-cover grayscale brightness-50"
          />
          <div className="absolute inset-0 border border-yellow-400/30" />
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute top-2 right-2 text-[8px] font-bold tracking-[0.3em] text-yellow-400 uppercase">Featured</div>
        </div>
      </motion.div>

      <motion.div
        style={{ x: floatX, y: floatY }}
        className="absolute top-[40%] right-[4%] z-20 hidden xl:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="glass-dark px-4 py-3 text-xs">
          <div className="text-gray-400 mb-1 tracking-widest uppercase text-[9px]">Live Availability</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white font-semibold">9 Vehicles Ready</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-8 pb-28 md:pb-36 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={`slide-${index}`}
            initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -30, filter: 'blur(4px)' }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="inline-block text-yellow-400 text-[10px] font-black tracking-[0.45em] uppercase px-4 py-2 border border-yellow-400/40 glass-dark">
                {slide.tag}
              </span>
              <div className="hidden sm:flex items-center gap-2 text-[10px] text-gray-400 tracking-widest uppercase">
                <div className="w-6 h-[1px] bg-yellow-400/40" />
                {slide.badge}
              </div>
            </motion.div>

            {/* Headline */}
            <h1 className="mb-8 leading-none">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="block text-white text-5xl md:text-7xl font-light tracking-tight"
              >
                {slide.headline[0]}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="block font-black text-6xl md:text-8xl xl:text-9xl leading-none text-gold-gradient font-display"
              >
                {slide.accent}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="block text-white/80 text-5xl md:text-7xl font-light tracking-tight"
              >
                {slide.subHead}
              </motion.span>
            </h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="text-gray-300/80 text-base md:text-lg max-w-lg leading-relaxed mb-12 font-light"
            >
              {slide.sub}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="/booking"
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-yellow-400 text-black font-black uppercase tracking-wider text-sm overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.4)] hover:shadow-[0_0_80px_rgba(212,175,55,0.6)] transition-shadow duration-500"
              >
                <span className="absolute inset-0 bg-white translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700 opacity-30 skew-x-12" />
                <span className="relative">Book Your Ride</span>
                <span className="relative text-lg">→</span>
              </a>
              <a
                href="/fleet"
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 border border-white/25 text-white font-medium text-sm hover:bg-white/8 hover:border-white/40 transition-all duration-400 backdrop-blur-sm"
              >
                <Play size={16} className="text-yellow-400 group-hover:scale-125 transition-transform" />
                View Full Fleet
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Controls */}
        <div className="absolute bottom-10 right-6 flex flex-col gap-3 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="relative group"
              aria-label={`Slide ${i + 1}`}
            >
              <div className={`transition-all duration-500 ${i === index ? 'w-[2px] h-12 bg-yellow-400' : 'w-[1px] h-6 bg-white/25 hover:bg-white/50'}`} />
              {i === index && (
                <motion.div
                  className="absolute top-0 left-0 w-[2px] bg-yellow-400/30"
                  style={{ height: `${progress}%` }}
                />
              )}
            </button>
          ))}
          <span className="text-[9px] text-white/30 font-bold tracking-[0.3em] uppercase mt-1">
            0{index + 1}
          </span>
        </div>

        {/* Scroll Hint */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-[9px] font-bold tracking-[0.5em] uppercase">Scroll</span>
          <ChevronDown size={16} className="text-white/30" />
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] to-transparent z-20" />
    </div>
  );
};
