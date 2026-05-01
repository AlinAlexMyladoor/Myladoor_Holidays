'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HoverTiltCard } from '@/components/ui/HoverTiltCard';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { ParticleField } from '@/components/ui/ParticleField';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Users, Filter, Star, Fuel, Shield, Check } from 'lucide-react';

const allVehicles = [
  {
    id: 'sedan',
    name: 'Compact Sedan',
    capacity: 4,
    capacityLabel: '4 Seater',
    desc: 'Perfect for individuals or small family trips. Economical, reliable, and comfortable for city and short-distance travel.',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=900',
    tag: 'ECONOMY',
    category: 'sedan',
    price: 'From ₹1,800/day',
    features: ['AC', 'GPS', 'Music'],
    rating: 4.8,
  },
  {
    id: 'innova',
    name: 'SUV Premium (Innova)',
    capacity: 7,
    capacityLabel: '7 Seater',
    desc: 'Spacious, premium, and ideal for long-distance family journeys. The most popular vehicle for Kerala tours.',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=900',
    tag: 'BESTSELLER',
    category: 'suv',
    price: 'From ₹2,500/day',
    features: ['AC', 'GPS', '7 Seater', 'Luggage'],
    rating: 4.9,
  },
  {
    id: 'van14',
    name: 'Executive Van 14',
    capacity: 14,
    capacityLabel: '14 Seater',
    desc: 'Comfortable and spacious for small group outings and corporate trips. Deep recliner seats, AC, entertainment system.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=900',
    tag: 'GROUP',
    category: 'van',
    price: 'From ₹4,500/day',
    features: ['AC', 'Entertainment', 'USB', 'Curtains'],
    rating: 4.8,
  },
  {
    id: 'van17',
    name: 'Traveller 17',
    capacity: 17,
    capacityLabel: '17 Seater',
    desc: 'Enhanced capacity Traveller with plush seating for medium-sized groups. Perfect for pilgrimages and school excursions.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=900',
    tag: 'GROUP',
    category: 'van',
    price: 'From ₹5,500/day',
    features: ['AC', 'Push Back', 'Luggage Rack'],
    rating: 4.7,
  },
  {
    id: 'van20',
    name: 'Corporate Van 20',
    capacity: 20,
    capacityLabel: '20 Seater',
    desc: 'Extra space for larger corporate trips or extended family gatherings. Executive finish with added comfort features.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=900',
    tag: 'CORPORATE',
    category: 'van',
    price: 'From ₹6,500/day',
    features: ['AC', 'Conference Setup', 'WiFi Ready'],
    rating: 4.8,
  },
  {
    id: 'coach26',
    name: 'Mini Coach 26',
    capacity: 26,
    capacityLabel: '26 Seater',
    desc: 'Large group travel made easy — ideal for events, weddings, group tours and outstation travel.',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=900',
    tag: 'EVENTS',
    category: 'coach',
    price: 'From ₹8,000/day',
    features: ['AC', 'PA System', 'Under-seat Storage'],
    rating: 4.7,
  },
  {
    id: 'urbania',
    name: 'Urbania Luxury',
    capacity: 12,
    capacityLabel: 'Premium Van',
    desc: 'The absolute luxury travel experience — panoramic glass roof, premium leather seats, ambient lighting. For those who demand the best.',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=900',
    tag: 'LUXURY',
    category: 'luxury',
    price: 'From ₹7,500/day',
    features: ['Panoramic Roof', 'Leather Seats', 'Ambient Lights', 'WiFi'],
    rating: 5.0,
  },
  {
    id: 'sml',
    name: 'SML Classic',
    capacity: 36,
    capacityLabel: 'Mini Bus',
    desc: 'Comfortable and reliable mini bus — perfect for local city circuits, outstation tours, and school trips.',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=900',
    tag: 'TOURS',
    category: 'coach',
    price: 'From ₹9,000/day',
    features: ['AC', 'PA System', 'Movie Screen'],
    rating: 4.6,
  },
  {
    id: 'bus49',
    name: 'Grand Coach 49',
    capacity: 49,
    capacityLabel: '49 Seater',
    desc: 'Full-sized luxury coach for large events, company outings, pilgrimages, and intercity tours. Maximum comfort at scale.',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=900',
    tag: 'EVENTS',
    category: 'coach',
    price: 'From ₹12,000/day',
    features: ['Full AC', 'Recliner Seats', 'PA System', 'TV'],
    rating: 4.8,
  },
];

const filters = [
  { label: 'All Vehicles', value: 'all' },
  { label: 'Sedan / SUV', value: 'sedan' },
  { label: 'SUV', value: 'suv' },
  { label: 'Vans', value: 'van' },
  { label: 'Coaches', value: 'coach' },
  { label: 'Luxury', value: 'luxury' },
];

const tagColors: Record<string, string> = {
  ECONOMY: 'tag-economy',
  BESTSELLER: 'tag-bestseller',
  GROUP: 'tag-group',
  CORPORATE: 'tag-corporate',
  EVENTS: 'tag-events',
  LUXURY: 'tag-luxury',
  TOURS: 'tag-tours',
};

export default function FleetPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? allVehicles
    : allVehicles.filter(v => v.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* ── PAGE HERO ─────────────────────────── */}
      <section className="relative h-72 md:h-96 flex items-end overflow-hidden bg-[#080c0a]">
        <Image
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=2000"
          alt="fleet hero"
          fill
          className="object-cover opacity-25"
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
              9 immaculately maintained vehicle types — from luxury sedans to 49-seater coaches.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* ── FILTER TABS ─────────────────────── */}
        <RevealOnScroll direction="up" className="flex flex-wrap gap-3 mb-14">
          <span className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-widest mr-2">
            <Filter size={14} /> Filter:
          </span>
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeFilter === f.value
                  ? 'bg-yellow-400 text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                  : 'border border-white/10 text-gray-400 hover:border-yellow-400/40 hover:text-yellow-400'
              }`}
            >
              {f.label}
            </button>
          ))}
        </RevealOnScroll>

        {/* ── VEHICLE GRID ─────────────────────── */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((v, idx) => (
              <motion.div
                key={v.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <HoverTiltCard>
                  <div className="bg-[#161b22] border border-yellow-400/8 hover:border-yellow-400/25 transition-all duration-500 group card-glow h-full flex flex-col overflow-hidden">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden shrink-0">
                      <Image
                        src={v.image}
                        alt={v.name}
                        fill
                        className="object-cover group-hover:scale-108 transition-transform duration-700 grayscale-[25%] group-hover:grayscale-0"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-[#161b22]/30 to-transparent z-10" />

                      {/* Tag */}
                      <div className="absolute top-4 left-4 z-20">
                        <span className={`text-[9px] font-black tracking-[0.25em] uppercase px-3 py-1.5 ${tagColors[v.tag] || ''}`}>
                          {v.tag}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="absolute bottom-4 right-4 z-20 glass-dark px-3 py-1">
                        <span className="text-yellow-400 text-xs font-bold">{v.price}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-bold text-lg leading-snug">{v.name}</h3>
                        <div className="flex flex-col items-end gap-1 ml-2 shrink-0">
                          <span className="text-gray-500 text-xs flex items-center gap-1">
                            <Users size={11} /> {v.capacityLabel}
                          </span>
                          <span className="text-yellow-400 text-xs flex items-center gap-1">
                            <Star size={10} fill="#d4af37" /> {v.rating}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-500 text-sm font-light flex-grow mb-4 leading-relaxed">{v.desc}</p>

                      {/* Feature Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
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
                      <div className="flex gap-3 mt-auto">
                        <Link
                          href="/booking"
                          className="flex-1 py-3 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider text-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,95,70,0.4)]"
                        >
                          Book Now →
                        </Link>
                        <a
                          href={`https://wa.me/918848392990?text=Hi! I'm interested in booking the ${v.name} (${v.capacityLabel}). Can you share availability and pricing?`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-green-900/30 border border-green-500/25 hover:bg-green-800/50 hover:border-green-400/50 text-green-400 transition-all"
                          title="WhatsApp Enquiry"
                        >
                          <MessageCircle size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </HoverTiltCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-600">
            <p className="text-lg">No vehicles found for this filter.</p>
          </div>
        )}

        {/* ── BOTTOM CTA ─────────────────────── */}
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
                <MessageCircle size={18} />
                Get Custom Quote
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
