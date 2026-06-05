'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HoverTiltCard } from '@/components/ui/HoverTiltCard';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { ParticleField } from '@/components/ui/ParticleField';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Users, Filter, Star, Check } from 'lucide-react';

/* ─── Vehicle Data ─────────────────────────── */
const allVehicles = [
  {
    id: 'sedan',
    name: 'Compact Sedan',
    capacity: 4,
    capacityLabel: '4 Seater',
    desc: 'Perfect for individuals or small family trips. Economical, reliable, and comfortable for city and short-distance travel.',
    image: '/images/compact-sedan.jpg',
    tag: 'ECONOMY',
    category: 'car',
    features: ['AC', 'GPS', 'Music System'],
    rating: 4.8,
  },
  {
    id: 'innova',
    name: 'Innova Crysta',
    capacity: 7,
    capacityLabel: '7 Seater',
    desc: 'Spacious, premium, and ideal for long-distance family journeys. The most popular vehicle for Kerala tours.',
    image: '/images/innova.jpg',
    tag: 'BESTSELLER',
    category: 'car',
    features: ['AC', 'GPS', 'Luggage Space', 'Push-back Seats'],
    rating: 4.9,
  },
  {
    id: 'van14',
    name: 'Traveller 14',
    capacity: 14,
    capacityLabel: '14 Seater',
    desc: 'Comfortable and spacious for small group outings and corporate trips. Deep recliner seats, AC, entertainment system.',
    image: '/images/traveller-14.webp',
    tag: 'GROUP',
    category: 'traveller',
    features: ['AC', 'Entertainment', 'USB Charging', 'Curtains'],
    rating: 4.8,
  },
  {
    id: 'van17',
    name: 'Traveller 17',
    capacity: 17,
    capacityLabel: '17 Seater',
    desc: 'Enhanced capacity Traveller with plush seating for medium-sized groups. Perfect for pilgrimages and school excursions.',
    image: '/images/traveller-17.jpg',
    tag: 'POPULAR',
    category: 'traveller',
    features: ['AC', 'Push-back Seats', 'Luggage Rack'],
    rating: 4.7,
  },
  {
    id: 'van20',
    name: 'Traveller 20',
    capacity: 20,
    capacityLabel: '20 Seater',
    desc: 'Extra space for larger corporate trips or extended family gatherings. Executive finish with added comfort features.',
    image: '/images/traveller-20.jpg',
    tag: 'CORPORATE',
    category: 'traveller',
    features: ['AC', 'Conference Setup', 'WiFi Ready'],
    rating: 4.8,
  },
  {
    id: 'urbania',
    name: 'Urbania Luxury Van',
    capacity: 12,
    capacityLabel: '12 Seater',
    desc: 'The ultimate luxury travel experience — panoramic glass roof, premium leather seats, ambient lighting. For those who demand the best.',
    image: '/images/urbania-luxury.jpg',
    tag: 'LUXURY',
    category: 'urbania',
    features: ['Panoramic Roof', 'Leather Seats', 'Ambient Lights', 'WiFi'],
    rating: 5.0,
  },
  {
    id: 'coach26',
    name: 'Mini Coach 26',
    capacity: 26,
    capacityLabel: '26 Seater',
    desc: 'Large group travel made easy — ideal for events, weddings, group tours and outstation travel.',
    image: '/images/coach-26.jpg',
    tag: 'EVENTS',
    category: 'bus',
    features: ['AC', 'PA System', 'Under-seat Storage'],
    rating: 4.7,
  },
  {
    id: 'sml',
    name: 'SML Mini Bus 36',
    capacity: 36,
    capacityLabel: '36 Seater',
    desc: 'Comfortable and reliable mini bus — perfect for local city circuits, outstation tours, and school trips.',
    image: '/images/sml-36.jpg',
    tag: 'TOURS',
    category: 'bus',
    features: ['AC', 'PA System', 'Movie Screen'],
    rating: 4.6,
  },
  {
    id: 'bus49',
    name: 'Grand Coach 49',
    capacity: 49,
    capacityLabel: '49 Seater',
    desc: 'Full-sized luxury coach for large events, company outings, pilgrimages, and intercity tours. Maximum comfort at scale.',
    image: '/images/bus.jpg',
    tag: 'EVENTS',
    category: 'bus',
    features: ['Full AC', 'Recliner Seats', 'PA System', 'TV'],
    rating: 4.8,
  },
];

/* ─── Filters ──────────────────────────────── */
const filters = [
  { label: 'All Vehicles', value: 'all', emoji: '🚘' },
  { label: 'Car / Innova', value: 'car', emoji: '🚗' },
  { label: 'Traveller', value: 'traveller', emoji: '🚐' },
  { label: 'Bus / Coach', value: 'bus', emoji: '🚌' },
  { label: 'Urbania', value: 'urbania', emoji: '⭐' },
];

const tagColors: Record<string, string> = {
  ECONOMY: 'bg-gray-700 text-gray-200',
  BESTSELLER: 'bg-yellow-400 text-black',
  POPULAR: 'bg-blue-600 text-white',
  GROUP: 'bg-emerald-700 text-white',
  CORPORATE: 'bg-purple-700 text-white',
  EVENTS: 'bg-orange-600 text-white',
  LUXURY: 'bg-gradient-to-r from-yellow-500 to-yellow-300 text-black',
  TOURS: 'bg-teal-700 text-white',
};

/* ─── Vehicle Card ─────────────────────────── */
const VehicleCard = ({ v, idx }: { v: typeof allVehicles[0]; idx: number }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: -10 }}
    transition={{ duration: 0.4, delay: idx * 0.05 }}
    className="h-[480px]"
  >
    <HoverTiltCard>
      {/* Strictly fixed height — every card identical */}
      <div className="bg-[#161b22] border border-yellow-400/8 hover:border-yellow-400/30 transition-all duration-500 group card-glow flex flex-col h-[480px] overflow-hidden">

        {/* ── Image — fixed 200px ── */}
        <div className="relative h-[200px] shrink-0 overflow-hidden">
          <Image
            src={v.image}
            alt={v.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 grayscale-[15%] group-hover:grayscale-0"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-[#161b22]/10 to-transparent z-10" />

          {/* Tag badge */}
          <span className={`absolute top-3 left-3 z-20 text-[9px] font-black tracking-[0.25em] uppercase px-3 py-1.5 ${tagColors[v.tag] || 'bg-gray-700 text-white'}`}>
            {v.tag}
          </span>
        </div>

        {/* ── Content ── */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Name + Capacity */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-white font-bold text-base leading-snug">{v.name}</h3>
            <div className="flex flex-col items-end shrink-0 gap-1">
              <span className="text-gray-400 text-xs flex items-center gap-1">
                <Users size={11} /> {v.capacityLabel}
              </span>
              <span className="text-yellow-400 text-xs flex items-center gap-1">
                <Star size={10} fill="#d4af37" /> {v.rating}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-500 text-xs font-light leading-relaxed mb-4 flex-grow">{v.desc}</p>

          {/* Feature Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {v.features.map((feat, fi) => (
              <span
                key={fi}
                className="text-[9px] font-bold tracking-wide text-gray-400 border border-white/8 px-2 py-1 uppercase flex items-center gap-1"
              >
                <Check size={8} className="text-emerald-400" /> {feat}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-2 mt-auto">
            <Link
              href="/booking"
              className="flex-1 py-3 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider text-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,95,70,0.4)]"
            >
              Book Now →
            </Link>
            <a
              href={`https://wa.me/918848392990?text=Hi! I'm interested in booking the ${v.name} (${v.capacityLabel}). Can you share availability?`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-green-900/30 border border-green-500/25 hover:bg-green-800/50 hover:border-green-400/50 text-green-400 transition-all"
              title="WhatsApp Enquiry"
            >
              <MessageCircle size={17} />
            </a>
          </div>
        </div>
      </div>
    </HoverTiltCard>
  </motion.div>
);

/* ─── Page ─────────────────────────────────── */
export default function FleetPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? allVehicles
    : allVehicles.filter(v => v.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* ── PAGE HERO ── */}
      <section className="relative h-72 md:h-96 flex items-end overflow-hidden bg-[#080c0a]">
        <Image
          src="/images/fleet-myladoor.png"
          alt="Myladoor Fleet"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117]/80 to-transparent" />
        <ParticleField count={20} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="text-yellow-400 text-[10px] font-black tracking-[0.45em] uppercase">Curated For Excellence</span>
            <h1 className="text-5xl md:text-7xl font-light text-white mt-3">
              The <span className="font-black text-gold-gradient">Fleet</span>
            </h1>
            <p className="text-gray-400 font-light max-w-xl mt-3">
              9 immaculately maintained vehicle types — from compact cars to 49-seater coaches.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* ── FILTER TABS ── */}
        <RevealOnScroll direction="up" className="mb-14">
          <div className="flex items-center gap-2 text-gray-500 text-[10px] font-semibold uppercase tracking-widest mb-4">
            <Filter size={14} /> Filter by Vehicle Type
          </div>
          <div className="flex overflow-x-auto pb-3 gap-3 no-scrollbar">
            {filters.map(f => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`flex items-center gap-2 px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                  activeFilter === f.value
                    ? 'bg-yellow-400 text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                    : 'border border-white/10 text-gray-400 hover:border-yellow-400/40 hover:text-yellow-400 bg-white/5'
                }`}
              >
                <span>{f.emoji}</span>
                {f.label}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* ── VEHICLE COUNT ── */}
        <p className="text-gray-600 text-xs uppercase tracking-widest mb-8">
          Showing {filtered.length} vehicle{filtered.length !== 1 ? 's' : ''}
          {activeFilter !== 'all' && ` · ${filters.find(f => f.value === activeFilter)?.label}`}
        </p>

        {/* ── VEHICLE GRID ── */}
        <AnimatePresence mode="popLayout">
          {/* grid-rows-1fr forces all cards equal height per row */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((v, idx) => (
              <VehicleCard key={v.id} v={v} idx={idx} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-600">
            <p className="text-lg">No vehicles found for this filter.</p>
          </div>
        )}

        {/* ── BOTTOM CTA ── */}
        <RevealOnScroll direction="up" className="mt-24 p-10 md:p-16 glass-dark text-center relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="relative z-10">
            <span className="text-yellow-400 text-[10px] font-black tracking-[0.4em] uppercase">Custom Requirements?</span>
            <h3 className="text-3xl md:text-4xl font-light text-white mt-3 mb-2">
              Need a <span className="font-bold">Custom Fleet</span> Quote?
            </h3>
            <p className="text-gray-500 max-w-lg mx-auto mb-8 font-light">
              Planning a large event or corporate gathering? We specialize in multi-vehicle coordination. Contact us for a customized quote.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href="https://wa.me/918848392990?text=I need a custom fleet quote for a large event."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-yellow-400 text-black font-black uppercase tracking-wider text-sm hover:bg-yellow-300 transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)]"
              >
                <MessageCircle size={18} /> Get Custom Quote
              </a>
              <Link
                href="/booking"
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-medium text-sm hover:border-yellow-400/50 hover:text-yellow-400 transition-all"
              >
                Standard Booking Form →
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
