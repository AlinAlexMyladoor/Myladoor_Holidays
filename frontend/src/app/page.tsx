'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { HeroSection } from '@/components/home/HeroSection';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { HoverTiltCard } from '@/components/ui/HoverTiltCard';
import { FlipCard3D } from '@/components/ui/FlipCard3D';
import { TestimonialsSection } from '@/components/ui/TestimonialsSection';
import { MarqueeBanner } from '@/components/ui/MarqueeBanner';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck, CalendarCheck, Clock, Users, ArrowRight,
  MessageCircle, Plane, Building2, Heart, TreePine,
  Trophy, Zap, Globe, HeartHandshake, Phone, Star,
  Play, ChevronRight, CheckCircle2, MapPin, X, Eye
} from 'lucide-react';

/* ─── Data ─────────────────────────────────── */
const featuredVehicles = [
  {
    name: 'Luxury Innova Crysta',
    capacity: '7 Seater',
    image: 'https://www.wheelsbingo.com/cars/toyota/toyota-innova-crysta',
    tag: 'BESTSELLER',
    features: ['GPS Tracked', 'AC', 'Luggage Space'],
    badge: 'Most Booked',
  },
  {
    name: 'Force Traveller 17',
    capacity: '17 Seater',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=900',
    tag: 'POPULAR',
    features: ['Push-back Seats', 'AC', 'Entertainment'],
    badge: 'Group Favourite',
  },
  {
    name: 'Grand Coach 49',
    capacity: '49 Seater',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&q=80&w=900',
    tag: 'EVENTS',
    features: ['Recliner Seats', 'PA System', 'AC Coach'],
    badge: 'Large Groups',
  },
];

const metrics = [
  { value: 15, suffix: '+', label: 'Years Of Service', icon: Trophy },
  { value: 9, suffix: '', label: 'Vehicle Types', icon: Globe },
  { value: 5000, suffix: '+', label: 'Happy Clients', icon: HeartHandshake },
  { value: 100, suffix: '%', label: 'On-Time Rate', icon: Zap },
];

const services = [
  { icon: Plane, label: 'Airport Transfer', color: 'text-blue-400', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800' },
  { icon: Heart, label: 'Weddings', color: 'text-pink-400', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800' },
  { icon: Building2, label: 'Corporate', color: 'text-purple-400', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800' },
  { icon: TreePine, label: 'Outstation Tours', color: 'text-green-400', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800' },
  { icon: Star, label: 'Pilgrimages', color: 'text-yellow-400', img: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800' },
  { icon: Users, label: 'School Trips', color: 'text-orange-400', img: 'https://images.unsplash.com/photo-1497375638960-ca368c7231d4?auto=format&fit=crop&q=80&w=800' },
];

const whyUs = [
  {
    icon: ShieldCheck,
    title: 'Safety First, Always',
    desc: 'GPS-tracked, fully insured vehicles. Professional background-checked drivers. Zero incident record maintained.',
    stat: '0 Incidents',
    color: 'from-emerald-950/40',
  },
  {
    icon: CalendarCheck,
    title: 'Hassle-Free Booking',
    desc: 'Book in minutes via our seamless online form or instantly via WhatsApp — available 24 hours a day, 7 days a week.',
    stat: '< 5 Min',
    color: 'from-blue-950/40',
  },
  {
    icon: Clock,
    title: 'Always On Time',
    desc: 'Your driver arrives 10 minutes early with live WhatsApp updates sent to your phone. Punctuality is our pride.',
    stat: '98% On-Time',
    color: 'from-yellow-950/40',
  },
];

/* ─── Fleet Popup Modal ─────────────────────── */
const FleetPopup = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Trigger button — shown near the top of page */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="group flex items-center gap-3 px-6 py-3 bg-[#0d1117] border border-yellow-400/40 hover:border-yellow-400 text-yellow-400 text-xs font-black uppercase tracking-[0.25em] transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]"
      >
        <Eye size={15} className="group-hover:scale-110 transition-transform" />
        Our Fleet
        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="relative z-10 w-full max-w-4xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Gold top bar */}
              <div className="h-[3px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
              <div className="bg-[#0d1117] border border-yellow-400/20 shadow-[0_0_60px_rgba(0,0,0,0.8)] p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-yellow-400 text-[9px] font-black tracking-[0.4em] uppercase">Complete Fleet</span>
                    <h3 className="text-xl md:text-2xl font-bold text-white mt-1">Myladoor Holidays Fleet</h3>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="w-9 h-9 border border-white/20 hover:border-red-400/60 flex items-center justify-center text-gray-400 hover:text-red-400 transition-all"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Fleet image */}
                <div className="relative overflow-hidden border border-yellow-400/10">
                  <Image
                    src="/images/fleet-myladoor.png"
                    alt="Myladoor Holidays Full Fleet — Innova, Bus, Traveller, Urbania"
                    width={1200}
                    height={560}
                    className="w-full object-contain"
                    priority
                  />
                </div>

                {/* Chips */}
                <div className="flex flex-wrap gap-3 justify-center mt-4">
                  {[
                    { label: 'Innova Crysta', cap: '7 Seater' },
                    { label: 'Tourist Coach', cap: '49 Seater' },
                    { label: 'Force Traveller', cap: '17 Seater' },
                    { label: 'Urbania Van', cap: '12 Seater' },
                  ].map((v, i) => (
                    <div key={i} className="glass-dark px-4 py-2 text-center border border-yellow-400/20">
                      <p className="text-white font-bold text-xs">{v.label}</p>
                      <p className="text-gray-400 text-[10px]">{v.cap}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex gap-3 mt-5 justify-center">
                  <Link
                    href="/fleet"
                    onClick={() => setOpen(false)}
                    className="px-8 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-widest transition-all"
                  >
                    View Full Fleet →
                  </Link>
                  <Link
                    href="/booking"
                    onClick={() => setOpen(false)}
                    className="px-8 py-3 border border-white/20 hover:border-yellow-400/50 text-white text-xs font-medium transition-all"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ─── Fleet Showcase Cards (3D Flip) ───────── */
const FleetCard = ({ v, idx }: { v: typeof featuredVehicles[0]; idx: number }) => (
  <RevealOnScroll direction="up" delay={idx * 0.15}>
    <FlipCard3D
      className="h-[480px]"
      front={
        <div className="card-glow bg-[#0d1117] border border-yellow-400/10 overflow-hidden h-full flex flex-col">
          <div className="relative h-64 overflow-hidden shrink-0">
            <Image
              src={v.image}
              alt={v.name}
              fill
              className="object-cover grayscale-[20%]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/20 to-transparent z-10" />
            <span className="absolute top-4 left-4 z-20 bg-yellow-400 text-black text-[9px] font-black tracking-[0.3em] uppercase px-3 py-1.5">
              {v.tag}
            </span>
            <div className="absolute top-4 right-4 z-20 glass-dark px-2 py-1">
              <span className="text-[9px] text-emerald-400 font-bold">{v.badge}</span>
            </div>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-white font-bold text-lg">{v.name}</h3>
              <span className="text-xs text-gray-600 flex items-center gap-1">
                <Users size={11} /> {v.capacity}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {v.features.map((f, fi) => (
                <span key={fi} className="text-[9px] font-bold tracking-wide text-gray-400 border border-white/8 px-2 py-1 uppercase flex items-center gap-1">
                  <CheckCircle2 size={8} className="text-emerald-400" /> {f}
                </span>
              ))}
            </div>
            <p className="text-gray-600 text-xs mt-auto">Hover to see booking options →</p>
          </div>
        </div>
      }
      back={
        <div className="h-full bg-gradient-to-br from-emerald-950 to-[#0d1117] border border-yellow-400/30 flex flex-col items-center justify-center p-8 text-center holographic">
          <div className="mb-6">
            <span className="text-yellow-400 text-[9px] font-black tracking-[0.4em] uppercase">Ready to Book?</span>
            <h3 className="text-2xl font-bold text-white mt-2">{v.name}</h3>
            <p className="text-gray-400 text-sm mt-1">{v.capacity}</p>
          </div>
          <div className="space-y-3 w-full">
            <Link
              href="/booking"
              className="block w-full py-4 bg-yellow-400 text-black font-black uppercase tracking-wider text-sm hover:bg-yellow-300 transition-all text-center shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              Book Online →
            </Link>
            <a
              href={`https://wa.me/918848392990?text=I want to book the ${v.name} (${v.capacity})`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 bg-green-700 text-white font-bold text-sm hover:bg-green-600 transition-all"
            >
              <MessageCircle size={16} /> WhatsApp Enquiry
            </a>
            <a
              href="tel:+918848392990"
              className="flex items-center justify-center gap-2 w-full py-3 border border-white/20 text-gray-300 text-sm hover:border-white/40 transition-all"
            >
              <Phone size={14} /> Call to Confirm
            </a>
          </div>
          <div className="mt-6 flex gap-2">
            {v.features.map((f, fi) => (
              <span key={fi} className="text-[9px] text-emerald-400 border border-emerald-500/20 px-2 py-0.5">{f}</span>
            ))}
          </div>
        </div>
      }
    />
  </RevealOnScroll>
);

/* ─── VIDEO SECTION ────────────────────────── */
const VideoShowcase = () => {
  const [playing, setPlaying] = useState(false);
  const YT_ID = 'DGQwd1_dpuc';

  return (
    <section className="py-32 bg-[#0a0f0d] relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <RevealOnScroll direction="left">
            <div>
              <span className="text-yellow-400 text-[10px] font-black tracking-[0.4em] uppercase">Real Kerala Journeys</span>
              <h2 className="text-4xl md:text-5xl font-light text-white mt-4 mb-6">
                See Us <span className="font-bold text-gold-gradient">In Action</span>
              </h2>
              <p className="text-gray-400 leading-relaxed font-light mb-6">
                Watch how Myladoor Holidays transforms travel across Kerala — from airport transfers and corporate trips to grand pilgrimage convoys. Every journey, handled with precision and care.
              </p>
              <ul className="space-y-3 mb-8">
                {['Thrissur · Kochi · Munnar routes', 'Corporate fleet coordination', 'Wedding convoys & event transport', 'Airport meet & greet'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-4">
                <Link href="/fleet" className="inline-flex items-center gap-3 px-8 py-4 bg-yellow-400 text-black font-black uppercase tracking-wider text-sm hover:bg-yellow-300 transition-all">
                  View Full Fleet <ArrowRight size={16} />
                </Link>
                <Link href="/booking" className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white text-sm font-medium hover:border-yellow-400/50 hover:text-yellow-400 transition-all">
                  Book Now
                </Link>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right" delay={0.2}>
            <div className="relative">
              {/* Video player */}
              <div className="relative aspect-video overflow-hidden border border-yellow-400/10 hover:border-yellow-400/30 transition-colors duration-500 bg-black">
                {playing ? (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&rel=0&modestbranding=1`}
                    title="Myladoor Holidays in Action"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <Image
                      src="https://img.youtube.com/vi/DGQwd1_dpuc/maxresdefault.jpg"
                      alt="Kerala journey video"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPlaying(true)}
                        className="w-20 h-20 bg-yellow-400/90 hover:bg-yellow-400 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-300"
                      >
                        <Play size={30} className="text-black ml-1.5" fill="#000" />
                      </motion.button>
                    </div>
                    <div className="absolute bottom-4 left-4 glass-dark px-4 py-2">
                      <p className="text-white text-xs font-semibold">Myladoor Holidays Fleet</p>
                      <p className="text-yellow-400 text-[10px]">Click to play video</p>
                    </div>
                  </>
                )}
              </div>

              {/* Floating overlay cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-8 -left-6 z-20 glass-dark p-4 border border-yellow-400/20 w-48"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-400/40 flex-shrink-0 relative">
                    <Image src="/images/airport-service.jpg" alt="driver" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold">Professional Driver</p>
                    <div className="flex gap-0.5 mt-0.5">
                      {[1,2,3,4,5].map(i => <Star key={i} size={8} fill="#d4af37" className="text-yellow-400" />)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 text-[10px]">All drivers verified &amp; licensed</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-6 -right-6 z-20 glass-dark p-4 border border-emerald-400/20"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-[10px] font-bold">LIVE FLEET TRACKING</span>
                </div>
                <p className="text-white text-xs font-semibold">9 Vehicles</p>
                <p className="text-gray-500 text-[10px]">GPS Monitored 24/7</p>
              </motion.div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

/* ─── FLEET BANNER SECTION ──────────────────── */
const FleetBanner = () => (
  <section className="bg-[#080c0a] relative overflow-hidden">
    <div className="absolute inset-0 grid-pattern opacity-30" />

    <RevealOnScroll direction="up" className="text-center pt-12 md:pt-20 pb-8 md:pb-10 px-4 relative z-10">
      <span className="text-yellow-400 text-[9px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase">Our Complete Fleet</span>
      <h2 className="text-3xl md:text-5xl font-light text-white mt-4">
        The Myladoor <span className="font-bold text-gold-gradient">Fleet</span>
      </h2>
      <p className="text-gray-500 mt-3 font-light max-w-2xl mx-auto text-xs md:text-sm">
        From compact sedans to 49-seater luxury coaches — all immaculately maintained, GPS-tracked, and available across Kerala.
      </p>
    </RevealOnScroll>

    {/* The actual fleet banner image — Myladoor uploaded image */}
    <RevealOnScroll direction="none" className="relative z-10 px-4 max-w-7xl mx-auto pb-10">
      <div className="relative overflow-hidden border border-yellow-400/10 hover:border-yellow-400/25 transition-colors duration-500 group">
        <Image
          src="/images/fleet-myladoor.png"
          alt="Myladoor Holidays Complete Fleet - Innova, Bus, Traveller, Urbania"
          width={1200}
          height={600}
          className="w-full object-contain group-hover:scale-105 transition-transform duration-1000"
          priority
        />
        {/* Overlay info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 md:p-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { label: 'Innova Crysta', cap: '7 Seater' },
              { label: 'Tourist Coach', cap: '49 Seater' },
              { label: 'Force Traveller', cap: '17 Seater' },
              { label: 'Urbania Van', cap: 'Luxury 12 Seater' },
            ].map((v, i) => (
              <div key={i} className="glass-dark px-4 py-2 text-center border border-yellow-400/20">
                <p className="text-white font-bold text-xs">{v.label}</p>
                <p className="text-gray-400 text-[10px]">{v.cap}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RevealOnScroll>

    {/* Vehicle Type Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-yellow-400/5 max-w-7xl mx-auto mb-10 px-4">
      {[
        { name: '4 Seater', sub: 'Compact Sedan', icon: '🚗' },
        { name: '7 Seater', sub: 'Innova Crysta', icon: '🚙' },
        { name: '14–20 Seater', sub: 'Executive Vans', icon: '🚐' },
        { name: '26–49 Seater', sub: 'Coaches & Buses', icon: '🚌' },
      ].map((t, i) => (
        <RevealOnScroll key={i} direction="up" delay={i * 0.1}>
          <Link href="/fleet">
            <div className="p-6 bg-[#080c0a] text-center group hover:bg-emerald-950/30 transition-all duration-500 relative overflow-hidden cursor-pointer">
              <div className="text-3xl mb-3">{t.icon}</div>
              <p className="text-white font-bold text-base">{t.name}</p>
              <p className="text-gray-500 text-xs mt-1">{t.sub}</p>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          </Link>
        </RevealOnScroll>
      ))}
    </div>
  </section>
);

/* ─── SERVICES VISUAL GRID ──────────────────── */
const ServicesGrid = () => (
  <section className="py-24 bg-[#0d1117] border-y border-yellow-400/8 relative overflow-hidden">
    <div className="absolute inset-0 grid-pattern opacity-30" />
    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <RevealOnScroll direction="up" className="text-center mb-16">
        <span className="text-yellow-400 text-[10px] font-black tracking-[0.4em] uppercase">We Cover Everything</span>
        <h2 className="text-3xl md:text-5xl font-light text-white mt-3">
          We Serve Every <span className="font-bold">Occasion</span>
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto mt-4 font-light text-sm">
          Six core service categories — each delivered with meticulous precision.
        </p>
      </RevealOnScroll>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {services.map((s, i) => (
          <RevealOnScroll key={i} direction="up" delay={i * 0.08}>
            <Link href="/services">
              <div className="group relative overflow-hidden img-zoom-wrap aspect-video cursor-pointer border border-white/5 hover:border-yellow-400/40 transition-all duration-500">
                <Image
                  src={s.img}
                  alt={s.label}
                  fill
                  className="object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <s.icon size={22} className={`mb-2 ${s.color}`} />
                  <p className="text-white font-bold text-sm">{s.label}</p>
                  <p className="text-[10px] text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                    Learn more <ChevronRight size={10} />
                  </p>
                </div>
                <div className="absolute inset-0 border-2 border-yellow-400/0 group-hover:border-yellow-400/20 transition-all duration-500 m-2" />
              </div>
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

/* ─── WHY US SECTION ────────────────────────── */
const WhyUsSection = () => (
  <section className="py-32 bg-[#0d1117] relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-950/40 rounded-full blur-[140px] pointer-events-none" />
    <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/3 rounded-full blur-[100px] pointer-events-none" />

    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <RevealOnScroll direction="up" className="text-center mb-16 md:mb-24 px-4">
        <span className="text-yellow-400 text-[9px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase">Our Promise</span>
        <h2 className="text-3xl md:text-6xl font-light text-white mt-4 mb-4">
          Why Choose <span className="font-bold text-gold-gradient">Myladoor?</span>
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto font-light text-xs md:text-sm">
          Every detail, every route, every booking — handled with meticulous precision and genuine care.
        </p>
        <div className="divider-gold max-w-24 md:max-w-32 mx-auto mt-6 md:mt-8" />
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-yellow-400/8">
        {whyUs.map((f, i) => (
          <RevealOnScroll key={i} direction="up" delay={i * 0.15}>
            <div className={`relative p-8 md:p-10 bg-[#0d1117] group hover:bg-gradient-to-br ${f.color} hover:to-[#0d1117] transition-all duration-700 overflow-hidden h-full border-b md:border-b-0 border-white/5`}>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative w-12 h-12 md:w-16 md:h-16 border border-yellow-400/20 flex items-center justify-center mb-6 md:mb-8 group-hover:border-yellow-400/60 transition-all duration-500">
                <f.icon className="text-yellow-400 group-hover:scale-110 transition-transform duration-400" size={24} />
              </div>
              <div className="absolute top-6 right-6 text-[10px] md:text-xs font-black text-yellow-400/20 group-hover:text-yellow-400/60 tracking-wider transition-colors">
                {f.stat}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 group-hover:text-yellow-50 transition-colors">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed text-[11px] md:text-sm font-light">{f.desc}</p>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-yellow-400 to-yellow-400/0 group-hover:w-full transition-all duration-700" />
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

/* ─── PHOTO GALLERY STRIP ───────────────────── */
const GalleryStrip = () => {
  const galleryImages = [
    { src: '/images/fleet-banner.png', label: 'Our Full Fleet', span: 2 },
    { src: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&q=80&w=600', label: 'Luxury Coach' },
    { src: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600', label: 'Airport Transfer' },
    { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600', label: 'Wedding Transport' },
    { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200', label: 'Munnar Hills', span: 2 },
    { src: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=600', label: 'Pilgrimage Tours' },
    { src: 'https://images.unsplash.com/photo-1563461660947-507ef49e9c47?auto=format&fit=crop&q=80&w=600', label: 'Kochi Heritage' },
  ];

  return (
    <section className="py-20 bg-[#070b09] relative overflow-hidden">
      <RevealOnScroll direction="up" className="text-center mb-12 px-4">
        <span className="text-yellow-400 text-[10px] font-black tracking-[0.4em] uppercase">Photo Gallery</span>
        <h2 className="text-3xl md:text-5xl font-light text-white mt-3">
          Fleet & <span className="font-bold">Journeys</span>
        </h2>
        <p className="text-gray-500 mt-3 text-sm font-light">Real vehicles. Real trips. Real experiences.</p>
      </RevealOnScroll>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
          {galleryImages.map((img, i) => (
            <RevealOnScroll key={i} direction="up" delay={i * 0.06} className={img.span === 2 ? 'col-span-2' : ''}>
              <div className="group relative overflow-hidden img-zoom-wrap border border-yellow-400/5 hover:border-yellow-400/30 transition-colors duration-400" style={{ aspectRatio: img.span === 2 ? '2/1' : '1/1' }}>
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:from-black/30 transition-all duration-500" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-xs font-bold">{img.label}</span>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── CTA BANNER ────────────────────────────── */
const CTABanner = () => {
  // Countdown to next slot (mock: next 12-hour mark in IST)
  const [countdown, setCountdown] = useState({ h: 0, m: 0, s: 0 });
  const [viewers, setViewers] = useState(12);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const ist = new Date(now.getTime() + (330 - now.getTimezoneOffset()) * 60000);
      const next = new Date(ist);
      next.setHours(ist.getHours() < 12 ? 12 : 24, 0, 0, 0);
      const diff = Math.max(0, next.getTime() - ist.getTime());
      setCountdown({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setViewers(v => Math.max(8, Math.min(25, v + (Math.random() > 0.5 ? 1 : -1))));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <RevealOnScroll direction="none">
      <section className="py-32 relative overflow-hidden">
        <Image
          src="/images/kerala-hero.jpg"
          alt="Book now"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#022c22] via-[#0a1409]/98 to-[#0a1409]/90 z-10" />
        <div className="absolute inset-0 grid-pattern z-10 opacity-30" />
        {/* Aurora pulse */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(6,95,70,0.3) 0%, transparent 60%)' }}
        />

        <div className="max-w-7xl mx-auto px-4 relative z-20 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-xl text-center lg:text-left mx-auto lg:mx-0">
            <span className="text-yellow-400/80 text-[9px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase">Start Your Journey</span>
            <h2 className="text-4xl md:text-6xl font-light text-white mt-4 mb-4">
              Ready to <span className="font-bold text-gold-gradient">Book?</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm md:text-base">
              Contact us via WhatsApp for instant quotes, or use our seamless online booking form. No hidden charges, no surprises — just premium service.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              {['GST Billing', '24/7 Support', 'Free Cancellation', 'GPS Tracking'].map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px] md:text-xs text-gray-400">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  {b}
                </div>
              ))}
            </div>

            {/* Urgency + Countdown row */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-center lg:justify-start mb-10 lg:mb-0">
              {/* Viewers badge */}
              <div className="flex items-center gap-2 glass-dark px-4 py-2 border border-red-500/20">
                <motion.div
                  className="w-2 h-2 bg-red-400 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-red-300 text-xs font-bold">🔥 {viewers} people viewing now</span>
              </div>
              {/* Countdown */}
              <div className="flex items-center gap-2 glass-dark px-4 py-2 border border-yellow-400/20">
                <Clock size={13} className="text-yellow-400" />
                <span className="text-gray-400 text-[10px] uppercase tracking-widest">Next slot in</span>
                <span className="font-mono text-yellow-400 font-black text-sm tabular-nums">
                  {pad(countdown.h)}:{pad(countdown.m)}:{pad(countdown.s)}
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <MapPin size={16} className="text-yellow-400 shrink-0" />
              <span className="text-sm text-gray-500">Mulayam P.O, Thrissur, Kerala — 680751</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 shrink-0">
            <Link href="/booking">
              <button className="px-10 py-5 bg-yellow-400 text-black font-black uppercase tracking-wider text-sm hover:bg-yellow-300 transition-all shadow-[0_0_40px_rgba(212,175,55,0.45)] hover:shadow-[0_0_60px_rgba(212,175,55,0.7)] hover:scale-105 active:scale-95 duration-300 w-full sm:w-auto">
                Book Online Now
              </button>
            </Link>
            <a
              href="https://wa.me/918848392990?text=Hi! I want to enquire about a vehicle."
              target="_blank" rel="noopener noreferrer"
              className="px-10 py-5 bg-green-600 text-white font-bold uppercase tracking-wider text-sm hover:bg-green-500 transition-all flex items-center gap-3 justify-center w-full sm:w-auto"
            >
              <MessageCircle size={20} />
              WhatsApp Now
            </a>
            <a
              href="tel:+918848392990"
              className="px-10 py-5 border border-white/20 text-white font-medium text-sm hover:border-white/40 transition-all flex items-center gap-3 justify-center w-full sm:w-auto"
            >
              <Phone size={18} />
              Call Directly
            </a>
          </div>
        </div>
      </section>
    </RevealOnScroll>
  );
};

/* ─── TRUST STRIP ───────────────────────────── */
const TrustStrip = () => (
  <div className="py-6 bg-[#0a0f0d] border-t border-yellow-400/10">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-3 text-center">
        {[
          { label: 'Registered', val: 'Kerala Tourism' },
          { label: 'Insurance', val: 'Fully Covered' },
          { label: 'Compliance', val: 'MV Act 1988' },
          { label: 'Response', val: '< 2 min WhatsApp' },
          { label: 'Service Area', val: 'All of Kerala + Pan India' },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-[9px] text-gray-600 uppercase tracking-widest">{item.label}</span>
            <span className="text-xs text-gray-300 font-semibold mt-0.5">{item.val}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─── MAIN HOME PAGE ────────────────────────── */
export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#0d1117]">
      {/* Hero */}
      <HeroSection />

      {/* Marquee */}
      <MarqueeBanner />

      {/* Our Fleet popup — top of page quick-view */}
      <div className="py-5 bg-[#080c0a] border-b border-yellow-400/10 flex items-center justify-center gap-4">
        <div className="h-[1px] flex-1 max-w-xs bg-gradient-to-r from-transparent to-yellow-400/30" />
        <FleetPopup />
        <div className="h-[1px] flex-1 max-w-xs bg-gradient-to-l from-transparent to-yellow-400/30" />
      </div>

      {/* Stats */}
      <section className="py-20 bg-[#0a0f0d] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-yellow-400/10">
            {metrics.map((m, i) => (
              <RevealOnScroll key={i} direction="up" delay={i * 0.1}>
                <div className={`p-8 md:p-10 text-center relative group hover:bg-yellow-400/3 transition-colors duration-500 holographic ${i !== metrics.length - 1 ? 'border-r border-yellow-400/10' : ''}`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <m.icon size={22} className="text-yellow-400/40 mx-auto mb-3 group-hover:text-yellow-400 transition-colors" />
                  <div className="text-4xl md:text-5xl font-black mb-2">
                    <AnimatedCounter end={m.value} suffix={m.suffix} className="text-yellow-400" />
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-[0.25em] font-semibold">{m.label}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Banner with Real Photo */}
      <FleetBanner />

      {/* Why Choose Us */}
      <WhyUsSection />

      {/* Featured Fleet Cards */}
      <section className="py-32 bg-[#080c0a] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-900/10 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-6 pb-8 border-b border-yellow-400/10">
            <RevealOnScroll direction="left">
              <div>
                <span className="text-yellow-400 text-[10px] font-black tracking-[0.4em] uppercase">Top Picks</span>
                <h2 className="text-5xl md:text-6xl font-light text-white mt-3">
                  Signature <span className="font-bold">Vehicles</span>
                </h2>
              </div>
            </RevealOnScroll>
            <RevealOnScroll direction="right">
              <Link href="/fleet" className="group flex items-center gap-3 text-sm font-semibold text-gray-400 hover:text-yellow-400 transition-colors">
                Explore All 9 Vehicles
                <div className="w-8 h-[1px] bg-current group-hover:w-16 transition-all duration-400" />
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </RevealOnScroll>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredVehicles.map((v, idx) => <FleetCard key={idx} v={v} idx={idx} />)}
          </div>
        </div>
      </section>

      {/* Services Visual Grid */}
      <ServicesGrid />

      {/* Video / Feature Showcase */}
      <VideoShowcase />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Photo Gallery  */}
      <GalleryStrip />

      {/* CTA Banner */}
      <CTABanner />

      {/* Trust Strip */}
      <TrustStrip />
    </div>
  );
}
