'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, MessageCircle, Youtube, ArrowUpRight, Clock } from 'lucide-react';

/* Live Thrissur Clock (IST = UTC+5:30) */
const ThrissurClock = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const ist = new Date(now.getTime() + (330 - now.getTimezoneOffset()) * 60000);
      setTime(ist.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
      <Clock size={12} className="text-yellow-400/60" />
      <span className="text-[10px] uppercase tracking-widest text-gray-600">Thrissur, IST</span>
      <span className="font-mono text-yellow-400/70 font-bold tabular-nums">{time}</span>
    </div>
  );
};

/* Animated Saji Myladoor Signature */
const OwnerSignature = () => (
  <div className="mt-6 pt-5 border-t border-yellow-400/10">
    <p className="text-[9px] tracking-[0.3em] uppercase text-gray-600 mb-1.5">Founded &amp; Managed By</p>
    <motion.p
      className="text-gold-gradient text-xl font-light"
      style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      Saji Myladoor
    </motion.p>
    {/* Decorative underline */}
    <motion.div
      className="h-[1px] bg-gradient-to-r from-yellow-400/60 via-yellow-400/20 to-transparent mt-1"
      initial={{ width: 0 }}
      animate={{ width: '80%' }}
      transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
    />
  </div>
);

/* 3D Flip Social Icon */
const SocialIcon = ({ icon: Icon, href, label, color = 'border-white/10 hover:border-yellow-400 hover:text-yellow-400' }: {
  icon: React.ElementType; href: string; label: string; color?: string;
}) => (
  <motion.a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ rotateY: 180, scale: 1.1 }}
    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    className={`w-9 h-9 border flex items-center justify-center text-gray-400 transition-all duration-300 ${color}`}
    style={{ transformStyle: 'preserve-3d' }}
  >
    <Icon size={16} />
  </motion.a>
);

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#070b09] border-t border-yellow-400/15 text-gray-400 relative overflow-hidden">
      {/* Gold shimmer top border */}
      <div className="divider-gold" />

      {/* Animated Kerala map SVG watermark */}
      <div className="absolute inset-0 flex items-center justify-end pointer-events-none select-none overflow-hidden">
        <svg
          viewBox="0 0 200 400"
          className="absolute right-0 top-0 h-full w-auto opacity-[0.025]"
          fill="currentColor"
          style={{ color: '#d4af37' }}
        >
          {/* Simplified Kerala silhouette path */}
          <path d="M100,10 C110,20 130,30 140,50 C150,70 145,90 155,110 C165,130 170,150 160,170 C150,190 140,200 145,220 C150,240 155,260 145,280 C135,300 120,310 115,330 C110,350 115,370 110,385 C100,395 90,390 85,380 C80,370 85,355 80,340 C75,325 60,315 55,300 C50,285 55,270 50,255 C45,240 35,225 40,210 C45,195 55,185 50,165 C45,145 35,130 40,110 C45,90 60,75 55,55 C50,35 65,20 80,15 Z" />
          <text x="90" y="200" fontSize="12" textAnchor="middle" fontFamily="serif" fontStyle="italic" fill="currentColor">
            Kerala
          </text>
        </svg>
      </div>

      {/* Background watermark */}
      <div className="absolute bottom-0 right-0 text-[14rem] font-black text-white/[0.015] select-none pointer-events-none leading-none font-display pr-4">
        MH
      </div>

      {/* Decorative glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-emerald-900/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8 relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">

          {/* Brand Column — Spans 2 cols */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="shrink-0">
                  <Image 
                    src="/images/logo.png" 
                    alt="Myladoor Holidays Logo" 
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-white font-black tracking-[0.12em] uppercase text-lg leading-none">
                    Myladoor <span className="text-yellow-400">Holidays</span>
                  </h2>
                  <span className="text-[9px] text-gray-500 tracking-[0.25em] uppercase">Est. 1994</span>
                </div>
              </div>
              <div className="w-8 h-[1px] bg-yellow-400" />
            </div>

            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              Delivering premium vehicle rental experiences since 1994. From intimate city drives to grand Kerala tours — your journey, perfected by professionals who care.
            </p>

            {/* Social Icons — 3D flip on hover */}
            <div className="flex flex-wrap gap-3">
              <SocialIcon icon={Facebook} href="#" label="Facebook" />
              <SocialIcon icon={Instagram} href="#" label="Instagram" />
              <SocialIcon icon={Twitter} href="#" label="Twitter" />
              <SocialIcon icon={Youtube} href="#" label="YouTube" />
              <SocialIcon
                icon={MessageCircle}
                href="https://wa.me/918848392990"
                label="WhatsApp"
                color="bg-green-500/10 border border-green-500/30 hover:bg-green-500/20 hover:text-green-400 text-green-500"
              />
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              {['Kerala Tourism', 'ISO Certified', '24/7 Support'].map((badge, i) => (
                <span key={i} className="text-[9px] font-bold uppercase tracking-widest text-gray-600 border border-white/8 px-3 py-1.5">
                  {badge}
                </span>
              ))}
            </div>

            {/* Thrissur live clock */}
            <ThrissurClock />

            {/* Saji Myladoor signature */}
            <OwnerSignature />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-xs tracking-[0.25em] uppercase mb-6">Explore</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'Our Fleet', href: '/fleet' },
                { name: 'Services', href: '/services' },
                { name: 'About Us', href: '/about' },
                { name: 'Book a Ride', href: '/booking' },
                { name: 'Contact', href: '/contact' },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-yellow-400 transition-all duration-300 shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-xs tracking-[0.25em] uppercase mb-6">Services</h3>
            <ul className="space-y-3">
              {[
                'Airport Transfers',
                'Corporate Travel',
                'Wedding Chauffeur',
                'Outstation Tours',
                'Pilgrimages',
                'School Trips',
              ].map((s, i) => (
                <li key={i}>
                  <Link
                    href="/services"
                    className="text-sm text-gray-500 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-yellow-400 transition-all duration-300 shrink-0" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-xs tracking-[0.25em] uppercase mb-6">Contact</h3>
            <ul className="space-y-5">
              <li className="flex gap-3 items-start">
                <MapPin size={15} className="text-yellow-400 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-500 leading-relaxed hover:text-white transition-colors">
                  <a href="https://maps.google.com/maps?q=Valakkavu,Thrissur,Kerala" target="_blank" rel="noopener noreferrer">
                    Valakkavu, Thrissur<br />
                    Kerala
                  </a>
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={15} className="text-yellow-400 shrink-0" />
                <a href="tel:+918848392990" className="text-sm text-gray-500 hover:text-white transition-colors">
                  +91 88483 92990
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={15} className="text-yellow-400 shrink-0" />
                <a href="mailto:info@myladoorholidays.com" className="text-sm text-gray-500 hover:text-white transition-colors">
                  info@myladoorholidays.com
                </a>
              </li>
            </ul>

            <div className="mt-6 space-y-3">
              <a
                href="https://wa.me/918848392990?text=Hello! I would like to enquire about a vehicle booking."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white px-4 py-3 text-sm font-bold transition-colors w-full justify-center"
              >
                <MessageCircle size={16} />
                WhatsApp Us Now
              </a>
              <Link
                href="/booking"
                className="flex items-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-3 text-xs font-black uppercase tracking-widest transition-colors w-full justify-center"
              >
                Book Online
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="divider-gold mb-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© {year} <span className="text-gray-500">Myladoor Holidays</span>. All rights reserved.</p>
          <div className="flex flex-wrap gap-6 justify-center">
            <a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Refund Policy</a>
            <Link href="/admin" className="hover:text-yellow-400 transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
