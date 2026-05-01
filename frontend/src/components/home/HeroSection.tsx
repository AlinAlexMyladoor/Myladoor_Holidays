'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Play, ChevronDown, MessageCircle, Phone, MapPin, Star } from 'lucide-react';
import { ParticleField } from '@/components/ui/ParticleField';
import { GlitterEffect } from '@/components/ui/GlitterEffect';

const backgrounds = [
  '/images/kerala-hero.jpg',
  '/images/munnar-road.jpg',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=90&w=2560',
];

const slides = [
  {
    tag: 'Premium Fleet — Thrissur, Kerala',
    headline: 'Travel in',
    accent: 'Unmatched',
    subHead: 'Elegance',
    sub: "Experience the difference with Myladoor Holidays — Kerala's finest vehicle rental service, available 24/7 from Thrissur.",
    badge: '30+ Years of Excellence',
  },
  {
    tag: 'Airport · Corporate · Weddings',
    headline: 'Every Journey,',
    accent: 'Perfectly',
    subHead: 'Crafted',
    sub: 'From 4-seater Innova to 49-seater luxury coaches — we have the perfect vehicle for every occasion and every budget.',
    badge: '5,000+ Happy Clients',
  },
  {
    tag: 'Across Kerala & Pan India',
    headline: 'Where Would',
    accent: 'You Like',
    subHead: 'To Go?',
    sub: 'Expert chauffeurs, luxury interiors, real-time flight tracking, and unwavering 24/7 WhatsApp support on every trip.',
    badge: '9 Vehicle Categories',
  },
];

const INTERVAL = 7000;

// Shooting stars for extra wow
const ShootingStars = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
        style={{ width: '120px', top: `${15 + i * 15}%`, left: '-120px' }}
        animate={{ x: ['0px', '120vw'], opacity: [0, 1, 0] }}
        transition={{
          duration: 1.5 + i * 0.3,
          delay: i * 2.5 + 1,
          repeat: Infinity,
          repeatDelay: 8 + i * 3,
          ease: 'easeIn',
        }}
      />
    ))}
  </div>
);

// Live booking ticker
const BookingTicker = () => {
  const items = ['✈️ Airport pickup · Kochi', '🏖️ Alappuzha tour · 4 pax', '💒 Wedding convoy · Thrissur', '🏢 Corporate fleet · Ernakulam'];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % items.length), 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex items-center gap-3 glass-dark px-4 py-2 border border-green-500/20">
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shrink-0" />
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="text-[11px] text-gray-300 font-medium whitespace-nowrap"
        >
          {items[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 80 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  const containerRef = useRef<HTMLDivElement>(null);

  const floatX = useTransform(x, [-0.5, 0.5], ['-12px', '12px']);
  const floatY = useTransform(y, [-0.5, 0.5], ['-8px', '8px']);
  const floatX2 = useTransform(x, [-0.5, 0.5], ['8px', '-8px']);
  const floatY2 = useTransform(y, [-0.5, 0.5], ['6px', '-6px']);

  useEffect(() => {
    let startTime = Date.now();
    const interval = setInterval(() => {
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
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const slide = slides[index];

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
          <Image src={backgrounds[index]} alt="hero background" fill priority className="object-cover" sizes="100vw" />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 z-10" />
      <div className="noise-overlay z-10" />

      {/* Aurora orbs */}
      <div className="absolute inset-0 z-[8] pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,95,70,0.25) 0%, transparent 70%)', top: '20%', left: '60%' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)', top: '60%', left: '70%' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Glitter */}
      <GlitterEffect count={30} className="z-[12]" />

      {/* Shooting stars */}
      <ShootingStars />

      {/* Particles */}
      <div className="absolute inset-0 z-[11]">
        <ParticleField count={25} />
      </div>

      {/* Right side floating cards */}
      <motion.div
        style={{ x: floatX2, y: floatY2 }}
        className="absolute top-1/4 right-[5%] z-20 hidden xl:block"
      >
        <div className="relative w-80 h-48 overflow-hidden border border-yellow-400/25 group holographic">
          <Image src="/images/fleet-banner.png" alt="Myladoor Fleet" fill className="object-cover brightness-75 group-hover:brightness-100 transition-all duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-[9px] text-yellow-400 font-black tracking-[0.3em] uppercase">Our Fleet</p>
            <p className="text-white text-xs font-bold mt-0.5">9 Premium Vehicles</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-[42%] right-[5%] z-20 hidden xl:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="glass-dark px-4 py-3 border border-green-500/20 neon-border-emerald">
          <div className="text-gray-400 mb-1 tracking-widest uppercase text-[9px]">Live Availability</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white font-bold text-sm">9 Vehicles Ready</span>
          </div>
          <div className="text-[9px] text-gray-500 mt-1 flex items-center gap-1">
            <MapPin size={8} /> Mulayam P.O, Thrissur
          </div>
        </div>
      </motion.div>

      {/* Rating badge */}
      <motion.div
        className="absolute top-[58%] right-[5%] z-20 hidden xl:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      >
        <div className="glass-dark px-4 py-2 border border-yellow-400/20">
          <div className="flex gap-0.5 mb-1">
            {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="#d4af37" className="text-yellow-400" />)}
          </div>
          <p className="text-white text-xs font-bold">4.9 / 5 Stars</p>
          <p className="text-gray-500 text-[9px]">1,200+ Reviews</p>
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
            className="max-w-3xl text-center md:text-left mx-auto md:mx-0"
          >
            {/* Tag + Ticker row */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 mb-6 md:mb-8"
            >
              <span className="inline-block text-yellow-400 text-[9px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.45em] uppercase px-4 py-2 border border-yellow-400/40 glass-dark">
                {slide.tag}
              </span>
              <div className="flex items-center gap-2 text-[9px] md:text-[10px] text-gray-400 tracking-widest uppercase">
                <div className="hidden sm:block w-6 h-[1px] bg-yellow-400/40" />
                {slide.badge}
              </div>
              <div className="block">
                <BookingTicker />
              </div>
            </motion.div>

            {/* Headline */}
            <h1 className="mb-6 md:mb-8 leading-tight md:leading-none">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="block text-white text-3xl sm:text-5xl md:text-7xl font-light tracking-tight"
              >
                {slide.headline}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="block font-black text-4xl sm:text-6xl md:text-8xl xl:text-9xl leading-none text-gold-gradient neon-gold my-2 md:my-0"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {slide.accent}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="block text-white/80 text-3xl sm:text-5xl md:text-7xl font-light tracking-tight"
              >
                {slide.subHead}
              </motion.span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="text-gray-300/80 text-sm md:text-base lg:text-lg max-w-lg leading-relaxed mb-10 font-light mx-auto md:mx-0"
            >
              {slide.sub}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Link
                href="/booking"
                className="group relative inline-flex items-center justify-center gap-3 px-6 py-4 sm:px-10 sm:py-5 bg-yellow-400 text-black font-black uppercase tracking-wider text-sm overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.5)] hover:shadow-[0_0_80px_rgba(212,175,55,0.7)] transition-shadow duration-500 neon-border-gold"
              >
                <span className="absolute inset-0 bg-white translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700 opacity-30 skew-x-12" />
                <span className="relative">Book Your Ride</span>
                <span className="relative text-lg">→</span>
              </Link>
              <a
                href="https://wa.me/918848392990?text=Hi! I want to enquire about a vehicle booking with Myladoor Holidays."
                target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-6 py-4 sm:px-10 sm:py-5 bg-green-600/80 hover:bg-green-600 text-white font-bold text-sm transition-all duration-400 backdrop-blur-sm"
              >
                <MessageCircle size={18} />
                WhatsApp Now
              </a>
              <Link
                href="/fleet"
                className="group inline-flex items-center justify-center gap-3 px-6 py-4 sm:px-10 sm:py-5 border border-white/25 text-white font-medium text-sm hover:bg-white/8 hover:border-white/40 transition-all duration-400 backdrop-blur-sm"
              >
                <Play size={16} className="text-yellow-400 group-hover:scale-125 transition-transform" />
                View Fleet
              </Link>
            </motion.div>

            {/* Quick contact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3"
            >
              <a href="tel:+918848392990" className="flex items-center gap-2 text-gray-400 text-[10px] md:text-xs hover:text-white transition-colors">
                <Phone size={12} className="text-yellow-400" />
                +91 88483 92990
              </a>
              <a href="https://maps.google.com/maps?q=Myladoor+Holidays,Valakkavu,Thrissur" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 text-[10px] md:text-xs hover:text-white transition-colors">
                <MapPin size={12} className="text-yellow-400" />
                Valakkavu, Thrissur
              </a>
              <div className="flex items-center gap-2 text-gray-400 text-[10px] md:text-xs">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                24/7 Available
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="absolute bottom-10 right-6 flex flex-col gap-3 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="relative group"
              aria-label={`Slide ${i + 1}`}
            >
              <div className={`transition-all duration-500 ${i === index ? 'w-[2px] h-12 bg-yellow-400 shadow-[0_0_8px_rgba(212,175,55,0.8)]' : 'w-[1px] h-6 bg-white/25 hover:bg-white/50'}`} />
              {i === index && (
                <motion.div
                  className="absolute top-0 left-0 w-[2px] bg-yellow-400/30"
                  style={{ height: `${progress}%` }}
                />
              )}
            </button>
          ))}
          <span className="text-[9px] text-white/30 font-bold tracking-widest mt-1">0{index + 1}</span>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-[9px] font-bold tracking-[0.5em] uppercase">Scroll to Explore</span>
          <ChevronDown size={16} className="text-white/30" />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] to-transparent z-20" />

      {/* Owner watermark */}
      <div className="absolute bottom-4 right-4 z-30 hidden lg:block">
        <p className="text-[9px] text-white/15 font-light tracking-[0.3em] uppercase">By Saji Myladoor</p>
      </div>
    </div>
  );
};
