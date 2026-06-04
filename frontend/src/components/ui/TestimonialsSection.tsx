'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

const testimonials = [
  {
    id: 1,
    name: 'Arun Krishnan',
    role: 'CEO, TechVentures Kerala',
    avatar: '/images/reviewer-arun.jpg',
    rating: 5,
    text: 'Myladoor Holidays handled our entire corporate fleet for a week-long offsite. The vehicles were immaculate, drivers professional, and the coordination was flawless. GST invoices were delivered same day. Our go-to partner for all executive travel.',
    trip: 'Corporate Offsite — Munnar',
    vehicle: 'Fleet of 3 Innova Crysta',
  },
  {
    id: 2,
    name: 'Priya Nair',
    role: 'Wedding Planner, EventCraft',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    text: 'I\'ve worked with many transport vendors for weddings, but Myladoor stands apart. The vehicles arrived 15 minutes early, were beautifully decorated, and the drivers wore formal attire. My clients were absolutely thrilled. Already booked them for 3 more weddings!',
    trip: 'Grand Wedding — Kochi',
    vehicle: '2x Urbania + 5x Innova',
  },
  {
    id: 3,
    name: 'Dr. Suresh Menon',
    role: 'Family Traveller',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    text: 'We booked the 14-seater for our family pilgrimage to Guruvayur. The driver knew all the temple routes, was patient with us, and made the trip incredibly comfortable. Even the elders in our family were impressed with the legroom and AC quality.',
    trip: 'Pilgrimage — Guruvayur',
    vehicle: 'Executive Van 14 Seater',
  },
  {
    id: 4,
    name: 'Anjali Sharma',
    role: 'HR Manager, Infosys Kochi',
    avatar: 'https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    text: 'We needed airport transfers for 85 employees across two days. Myladoor coordinated everything seamlessly — flight tracking, on-time arrivals, even real-time updates on our WhatsApp group. Exceptional service at a competitive price.',
    trip: 'Bulk Airport Transfers — CIAL',
    vehicle: '49-Seater Coach + Vans',
  },
];

export const TestimonialsSection = () => {
  const [active, setActive] = useState(0);

  const prev = () => setActive(a => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive(a => (a + 1) % testimonials.length);

  const t = testimonials[active];

  return (
    <section className="py-28 bg-[#080c0a] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-yellow-400/3 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <RevealOnScroll direction="up" className="text-center mb-20">
          <span className="text-yellow-400 text-xs font-black tracking-[0.4em] uppercase">Real Stories</span>
          <h2 className="text-4xl md:text-5xl font-light text-white mt-4 mb-2">
            What Our <span className="font-bold">Clients Say</span>
          </h2>
          <div className="divider-gold max-w-24 mx-auto mt-6" />
        </RevealOnScroll>

        {/* Stats Row */}
        <RevealOnScroll direction="up" delay={0.1} className="grid grid-cols-3 gap-4 mb-16 max-w-lg mx-auto text-center">
          {[
            { val: '4.9', label: 'Avg. Rating', suffix: '/5' },
            { val: '5K+', label: 'Reviews', suffix: '' },
            { val: '98%', label: 'Satisfaction', suffix: '' },
          ].map((s, i) => (
            <div key={i} className="glass-dark p-4">
              <div className="text-2xl font-black text-yellow-400">{s.val}<span className="text-sm text-gray-500">{s.suffix}</span></div>
              <div className="text-[10px] text-gray-500 tracking-widest uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </RevealOnScroll>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="testimonial-card p-8 md:p-12 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 text-yellow-400/10">
                <Quote size={80} strokeWidth={1} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < t.rating ? '#d4af37' : 'none'}
                    className={i < t.rating ? 'star-filled' : 'star-empty'}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light mb-8 italic">
                "{t.text}"
              </p>

              {/* Trip Info */}
              <div className="flex gap-4 mb-8 flex-wrap">
                <span className="text-[10px] font-black tracking-[0.25em] uppercase text-yellow-400 border border-yellow-400/30 px-3 py-1.5">
                  {t.trip}
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 border border-white/10 px-3 py-1.5">
                  {t.vehicle}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 overflow-hidden border-2 border-yellow-400/40 flex-shrink-0">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="text-white font-bold">{t.name}</div>
                  <div className="text-gray-500 text-sm">{t.role}</div>
                </div>
                {/* Verified badge */}
                <div className="ml-auto hidden sm:flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                  <div className="w-4 h-4 bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center rounded-full">
                    <span className="text-[8px]">✓</span>
                  </div>
                  Verified Review
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-all duration-400 ${i === active ? 'w-8 h-2 bg-yellow-400' : 'w-2 h-2 bg-white/20 hover:bg-white/40 rounded-full'}`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prev}
                className="w-12 h-12 border border-white/15 hover:border-yellow-400/50 flex items-center justify-center text-gray-400 hover:text-yellow-400 transition-all"
              >
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={next}
                className="w-12 h-12 bg-yellow-400 hover:bg-yellow-300 flex items-center justify-center text-black transition-all"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
