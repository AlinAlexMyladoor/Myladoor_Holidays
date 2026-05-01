'use client';

import React from 'react';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { ParticleField } from '@/components/ui/ParticleField';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Trophy, Heart, Star, Users, Globe, Zap, ArrowRight, MessageCircle, Award, Phone } from 'lucide-react';

const milestones = [
  {
    year: '2010',
    title: 'The Beginning',
    desc: "Myladoor Holidays started with a single Innova Crysta and a bold vision: to transform Kerala's vehicle rental landscape with professionalism and passion.",
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=600',
    icon: Star,
  },
  {
    year: '2015',
    title: 'Fleet Expansion',
    desc: 'Introduced 14-seater and 17-seater Travellers to cater to rapidly growing group tourism across Kerala. Partnered with 5 major hotel chains.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600',
    icon: Globe,
  },
  {
    year: '2019',
    title: 'Corporate Partnerships',
    desc: 'Became the preferred transport partner for 3 major IT corporations and technology hubs across Kerala. Introduced monthly fleet contracts.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600',
    icon: Trophy,
  },
  {
    year: '2023',
    title: 'Luxury Upgrade',
    desc: 'Added the Premium Urbania with panoramic roof and 49-seater intercity coaches. Crossed 4,000 satisfied client milestone.',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600',
    icon: Zap,
  },
  {
    year: '2026',
    title: 'Digital Transformation',
    desc: 'Launched a feature-rich digital platform with real-time booking, WhatsApp integration, admin dashboard, and GPS tracking. The future of Kerala travel.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600',
    icon: Heart,
  },
];

const teamValues = [
  { icon: Heart, title: 'Guest-First', desc: 'Every decision we make puts our guests comfort and satisfaction above all else.' },
  { icon: Star, title: 'Excellence', desc: 'We set the highest standards — from vehicle maintenance to driver conduct.' },
  { icon: Users, title: 'Community', desc: "We're proud to be a part of Kerala's tourism ecosystem and support local communities." },
  { icon: Globe, title: 'Sustainability', desc: 'Maintaining modern, fuel-efficient vehicles for a greener tomorrow.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* ── PAGE HERO ─────────────────────────────── */}
      <section className="relative h-80 md:h-[450px] flex items-end overflow-hidden bg-[#080c0a]">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2000"
          alt="About Myladoor Holidays"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117]/80 to-transparent" />
        <ParticleField count={25} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16 w-full">
          <div>
            <span className="text-yellow-400 text-[10px] font-black tracking-[0.45em] uppercase">Since 2010</span>
            <h1 className="text-5xl md:text-7xl font-light text-white mt-3">
              Our <span className="font-black text-gold-gradient">Story</span>
            </h1>
            <p className="text-gray-400 font-light max-w-xl mt-3 text-lg">
              From a single vehicle to Kerala's most trusted premium fleet.
            </p>
          </div>
        </div>
      </section>

      {/* ── INTRO SECTION ─────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-900/20 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealOnScroll direction="left">
              <div>
                <span className="text-yellow-400 text-[10px] font-black tracking-[0.4em] uppercase">Who We Are</span>
                <h2 className="text-4xl md:text-5xl font-light text-white mt-4 mb-6">
                  More Than Just a <span className="font-bold">Vehicle Rental</span>
                </h2>
                <p className="text-gray-400 leading-relaxed font-light mb-6">
                  Myladoor Holidays isn't just a transport company — we're your travel partners. For over 15 years, we've been crafting seamless, comfortable, and memorable journeys for thousands of families, corporates, and event groups across Kerala and South India.
                </p>
                <p className="text-gray-500 leading-relaxed font-light mb-8">
                  Our fleet of 9 vehicle categories, maintained to the highest standards, paired with professional, trained chauffeurs — ensures every trip is an experience worth remembering.
                </p>
                <div className="flex gap-4">
                  <Link href="/booking" className="inline-flex items-center gap-3 px-7 py-4 bg-yellow-400 text-black font-black uppercase tracking-wider text-sm hover:bg-yellow-300 transition-all">
                    Book Now <ArrowRight size={16} />
                  </Link>
                  <a href="https://wa.me/918848392990" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-4 border border-green-500/40 text-green-400 text-sm font-semibold hover:bg-green-900/30 transition-all">
                    <MessageCircle size={16} /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-square overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=600" alt="fleet" fill className="object-cover" />
                  <div className="absolute inset-0 border border-yellow-400/10" />
                </div>
                <div className="relative aspect-square overflow-hidden mt-8">
                  <Image src="https://images.unsplash.com/photo-1490650404312-a2175773bbf5?auto=format&fit=crop&q=80&w=600" alt="journey" fill className="object-cover" />
                  <div className="absolute inset-0 border border-yellow-400/10" />
                </div>
                <div className="relative aspect-square overflow-hidden col-span-2">
                  <Image src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=900" alt="tour" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/40 to-transparent" />
                  <div className="absolute inset-0 border border-yellow-400/10" />
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────── */}
      <section className="py-20 bg-[#080c0a] border-y border-yellow-400/8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-yellow-400/8">
            {[
              { val: 15, suffix: '+', label: 'Years in Service', icon: Trophy },
              { val: 5000, suffix: '+', label: 'Satisfied Clients', icon: Heart },
              { val: 9, suffix: '', label: 'Vehicle Types', icon: Globe },
              { val: 98, suffix: '%', label: 'Satisfaction Rate', icon: Zap },
            ].map((s, i) => (
              <RevealOnScroll key={i} direction="up" delay={i * 0.1}>
                <div className="p-10 bg-[#080c0a] text-center group hover:bg-emerald-950/30 transition-all duration-500">
                  <s.icon size={20} className="mx-auto mb-3 text-yellow-400/40 group-hover:text-yellow-400 transition-colors" />
                  <div className="text-4xl font-black text-yellow-400">
                    <AnimatedCounter end={s.val} suffix={s.suffix} />
                  </div>
                  <p className="text-gray-600 text-xs uppercase tracking-widest mt-2 font-semibold">{s.label}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <RevealOnScroll direction="up" className="text-center mb-20">
            <span className="text-yellow-400 text-[10px] font-black tracking-[0.4em] uppercase">Our Journey</span>
            <h2 className="text-4xl md:text-5xl font-light text-white mt-4">
              15 Years of <span className="font-bold">Excellence</span>
            </h2>
            <div className="divider-gold max-w-24 mx-auto mt-8" />
          </RevealOnScroll>

          <div className="relative max-w-5xl mx-auto">
            {/* Center line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-yellow-400/60 via-yellow-400/20 to-transparent hidden md:block" />

            <div className="space-y-16 md:space-y-24">
              {milestones.map((m, idx) => (
                <div
                  key={idx}
                  className={`relative flex items-start gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:items-center`}
                >
                  {/* Card */}
                  <div className="flex-1">
                    <RevealOnScroll direction={idx % 2 === 0 ? 'left' : 'right'}>
                      <div className="group p-7 md:p-9 bg-[#161b22] border border-yellow-400/8 hover:border-yellow-400/25 transition-all duration-500 card-glow relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-yellow-400/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                        <div className="flex items-start gap-5 mb-4">
                          <div className="w-12 h-12 border border-yellow-400/20 flex items-center justify-center shrink-0 group-hover:border-yellow-400/50 transition-colors">
                            <m.icon size={20} className="text-yellow-400" />
                          </div>
                          <div>
                            <span className="text-4xl font-black text-yellow-400 font-display leading-none block">{m.year}</span>
                            <h3 className="text-xl font-bold text-white mt-1">{m.title}</h3>
                          </div>
                        </div>

                        <p className="text-gray-500 text-sm leading-relaxed font-light">{m.desc}</p>
                      </div>
                    </RevealOnScroll>
                  </div>

                  {/* Center Node */}
                  <div className="hidden md:flex shrink-0 z-10 w-6 h-6 border-2 border-yellow-400 bg-[#0d1117] items-center justify-center">
                    <div className="w-2 h-2 bg-yellow-400 animate-pulse" />
                  </div>

                  {/* Image */}
                  <div className="flex-1">
                    <RevealOnScroll direction={idx % 2 === 0 ? 'right' : 'left'} delay={0.2}>
                      <div className="relative aspect-video overflow-hidden border border-yellow-400/8 group hover:border-yellow-400/25 transition-colors duration-500">
                        <Image
                          src={m.image}
                          alt={m.title}
                          fill
                          className="object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                    </RevealOnScroll>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SAJI MYLADOOR OWNER SPOTLIGHT ─────────── */}
      <section className="py-28 bg-[#0d1117] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-yellow-400/3 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <RevealOnScroll direction="up" className="text-center mb-20">
            <span className="text-yellow-400 text-[10px] font-black tracking-[0.4em] uppercase">Behind The Brand</span>
            <h2 className="text-4xl md:text-5xl font-light text-white mt-4">
              Meet the <span className="font-bold text-gold-gradient">Visionary</span>
            </h2>
            <div className="divider-gold max-w-24 mx-auto mt-8" />
          </RevealOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Portrait side */}
            <RevealOnScroll direction="left">
              <div className="relative max-w-sm mx-auto">
                {/* Main portrait frame */}
                <div className="relative aspect-[3/4] overflow-hidden border border-yellow-400/20 holographic">
                  <Image
                    src="/images/saji.png"
                    alt="Saji Myladoor — Founder, Myladoor Holidays"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <motion.p
                      className="text-3xl font-light text-white"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}
                      animate={{ opacity: [0.85, 1, 0.85] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      Saji Myladoor
                    </motion.p>
                    <p className="text-yellow-400/80 text-xs tracking-[0.3em] uppercase mt-1">Founder &amp; CEO</p>
                  </div>
                </div>

                {/* Rotating gold badge */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute -top-5 -right-5 w-20 h-20"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <path id="circle-about" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                    </defs>
                    <text fontSize="10" fill="#d4af37" fontFamily="Inter, sans-serif" fontWeight="700" letterSpacing="3">
                      <textPath href="#circle-about">✦ MYLADOOR HOLIDAYS ✦ 2010 ✦</textPath>
                    </text>
                  </svg>
                </motion.div>

                {/* Achievement badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-6 -left-6 glass-dark p-4 border border-yellow-400/20"
                >
                  <Award size={20} className="text-yellow-400 mb-1" />
                  <p className="text-white text-xs font-bold">15+ Years Leading</p>
                  <p className="text-gray-500 text-[10px]">Kerala&apos;s Premium Fleet</p>
                </motion.div>
              </div>
            </RevealOnScroll>

            {/* Content side */}
            <RevealOnScroll direction="right" delay={0.2}>
              <div>
                <span className="text-yellow-400 text-[10px] font-black tracking-[0.4em] uppercase">The Man Behind the Mission</span>

                {/* Animated gold signature */}
                <div className="my-6">
                  <motion.p
                    className="text-5xl md:text-6xl font-light text-gold-gradient"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  >
                    Saji Myladoor
                  </motion.p>
                  <motion.div
                    className="h-[2px] bg-gradient-to-r from-yellow-400 via-yellow-400/40 to-transparent mt-2"
                    initial={{ width: 0 }}
                    whileInView={{ width: '70%' }}
                    transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  />
                </div>

                <p className="text-gray-400 leading-relaxed font-light mb-6">
                  With over 15 years of hands-on experience in Kerala&apos;s transport and tourism industry, Saji Myladoor built this company from a single vehicle and an unwavering vision: to deliver transport that feels like hospitality.
                </p>
                <p className="text-gray-500 leading-relaxed font-light mb-8">
                  His philosophy is simple — every passenger deserves a driver who cares, a vehicle that&apos;s immaculate, and an experience that exceeds expectations. This belief has shaped every aspect of Myladoor Holidays.
                </p>

                {/* Key achievements */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: Trophy, label: 'Founded', val: '2010' },
                    { icon: Users, label: 'Lives Touched', val: '5,000+' },
                    { icon: Globe, label: 'Routes Covered', val: '50+ Routes' },
                    { icon: Star, label: 'Avg Rating', val: '4.9 / 5' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-[#161b22] border border-yellow-400/8 hover:border-yellow-400/25 transition-colors group">
                      <item.icon size={18} className="text-yellow-400 shrink-0 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-white font-bold text-sm">{item.val}</p>
                        <p className="text-gray-600 text-[10px] uppercase tracking-widest">{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://wa.me/918848392990?text=Hello Saji! I'd like to enquire about Myladoor Holidays."
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-7 py-4 bg-green-600 hover:bg-green-500 text-white font-bold text-sm transition-all"
                  >
                    <MessageCircle size={18} /> Chat with Saji
                  </a>
                  <a
                    href="tel:+918848392990"
                    className="inline-flex items-center gap-3 px-7 py-4 border border-yellow-400/30 text-yellow-400 font-bold text-sm hover:bg-yellow-400/5 transition-all"
                  >
                    <Phone size={18} /> Direct Line
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────── */}
      <section className="py-24 bg-[#080c0a] border-t border-yellow-400/8">
        <div className="max-w-7xl mx-auto px-4">
          <RevealOnScroll direction="up" className="text-center mb-16">
            <span className="text-yellow-400 text-[10px] font-black tracking-[0.4em] uppercase">What We Stand For</span>
            <h2 className="text-4xl md:text-5xl font-light text-white mt-4">
              Our Core <span className="font-bold">Values</span>
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamValues.map((v, i) => (
              <RevealOnScroll key={i} direction="up" delay={i * 0.1}>
                <div className="group p-8 bg-[#161b22] border border-yellow-400/8 hover:border-yellow-400/25 transition-all duration-500 text-center hover:bg-emerald-950/30 card-glow">
                  <div className="w-14 h-14 border border-yellow-400/20 flex items-center justify-center mx-auto mb-5 group-hover:border-yellow-400/60 transition-colors">
                    <v.icon size={24} className="text-yellow-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">{v.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
