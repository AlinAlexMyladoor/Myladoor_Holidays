'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { ParticleField } from '@/components/ui/ParticleField';
import Image from 'next/image';
import { MapPin, Phone, Mail, MessageCircle, Send, Check, Clock, Navigation } from 'lucide-react';

const contactInfoItems = [
  {
    icon: MapPin,
    title: 'Visit Our Office',
    lines: ['Myladoor Holidays, Valakkavu', 'Thrissur, Kerala'],
    link: 'https://maps.google.com/maps?q=Myladoor+Holidays,Valakkavu,Thrissur',
    linkLabel: 'Get Directions →',
  },
  {
    icon: Phone,
    title: 'Call Us Directly',
    lines: ['+91 88483 92990', 'Available: Mon – Sun, 6am to 10pm'],
    link: 'tel:+918848392990',
    linkLabel: 'Call Now →',
  },
  {
    icon: Mail,
    title: 'Send an Email',
    lines: ['info@myladoorholidays.com', 'bookings@myladoorholidays.com'],
    link: 'mailto:info@myladoorholidays.com',
    linkLabel: 'Email Us →',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    lines: ['Mon – Sat: 6:00 AM – 10:00 PM', 'Sunday: 7:00 AM – 9:00 PM'],
    link: null,
    linkLabel: null,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const msg = encodeURIComponent(
      `*Enquiry — Myladoor Holidays*\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`
    );
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      window.open(`https://wa.me/918848392990?text=${msg}`, '_blank');
    }, 1200);
  };

  const fields = [
    { label: 'Full Name', key: 'name', type: 'text', placeholder: 'John Doe', colSpan: 1 },
    { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '+91 88483 92990', colSpan: 1 },
    { label: 'Email Address', key: 'email', type: 'email', placeholder: 'you@example.com', colSpan: 2 },
    { label: 'Subject / Vehicle Type', key: 'subject', type: 'text', placeholder: 'e.g. Book Innova for Munnar trip', colSpan: 2 },
  ];

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* ── PAGE HERO ─────────────────────────── */}
      <section className="relative h-72 md:h-96 flex items-end overflow-hidden bg-[#080c0a]">
        <Image
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2000"
          alt="Contact Myladoor Holidays"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117]/80 to-transparent" />
        <ParticleField count={20} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16 w-full">
          <div>
            <span className="text-yellow-400 text-[10px] font-black tracking-[0.45em] uppercase">Reach Out</span>
            <h1 className="text-5xl md:text-7xl font-light text-white mt-3">
              Get in <span className="font-black text-gold-gradient">Touch</span>
            </h1>
            <p className="text-gray-400 font-light max-w-xl mt-3">
              We're here to help 7 days a week. Fastest response via WhatsApp.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ── CONTACT INFO SIDEBAR ─────────────── */}
          <div className="lg:col-span-2 space-y-5">
            {contactInfoItems.map((item, i) => (
              <RevealOnScroll key={i} direction="left" delay={i * 0.1}>
                <div className="group p-6 bg-[#161b22] border border-yellow-400/8 hover:border-yellow-400/25 transition-all duration-400 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex gap-5">
                    <div className="w-12 h-12 border border-yellow-400/20 group-hover:border-yellow-400/60 flex items-center justify-center shrink-0 transition-colors duration-400">
                      <item.icon size={20} className="text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-2">{item.title}</h3>
                      {item.lines.map((line, li) => (
                        <p key={li} className="text-gray-500 text-sm leading-relaxed">{line}</p>
                      ))}
                      {item.link && (
                        <a href={item.link} className="text-yellow-400 text-xs font-bold mt-2 inline-block hover:underline tracking-wide" target="_blank" rel="noopener noreferrer">
                          {item.linkLabel}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}

            {/* WhatsApp Quick Enquiry */}
            <RevealOnScroll direction="left" delay={0.4}>
              <a
                href="https://wa.me/918848392990?text=Hello! I want to enquire about a vehicle booking with Myladoor Holidays."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-green-900/20 border border-green-500/25 hover:border-green-400/50 hover:bg-green-900/40 transition-all duration-400 group"
              >
                <div className="w-14 h-14 bg-green-500/15 border border-green-500/30 flex items-center justify-center shrink-0 group-hover:bg-green-500/25 transition-all">
                  <MessageCircle size={26} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">WhatsApp Us</h3>
                  <p className="text-gray-500 text-sm">Fastest way to get a quote. We reply within minutes.</p>
                </div>
                <div className="ml-auto flex flex-col items-center gap-1">
                  <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-[9px] text-green-400 font-bold">ONLINE</span>
                </div>
              </a>
            </RevealOnScroll>

            {/* Map Preview */}
            <RevealOnScroll direction="left" delay={0.5}>
              <div className="relative h-48 bg-[#161b22] border border-yellow-400/8 overflow-hidden group hover:border-yellow-400/25 transition-colors">
                <iframe 
                  src="https://maps.google.com/maps?q=Myladoor+Holidays,Valakkavu,Thrissur&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                  className="w-full h-full opacity-60 group-hover:opacity-90 transition-opacity duration-400 grayscale contrast-125" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-400">
                  <div className="flex items-center gap-2 glass-dark px-5 py-3">
                    <Navigation size={16} className="text-yellow-400" />
                    <span className="text-white text-sm font-semibold">Interactive Map</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* ── CONTACT FORM ─────────────────────── */}
          <RevealOnScroll direction="right" className="lg:col-span-3">
            <div className="bg-[#161b22] border border-yellow-400/8 p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-yellow-400 via-yellow-400/50 to-transparent" />

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                      className="w-24 h-24 bg-emerald-500/15 border-2 border-emerald-400/40 flex items-center justify-center mx-auto mb-6"
                    >
                      <Check size={44} className="text-emerald-400" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-white mb-3">Message Sent!</h3>
                    <p className="text-gray-400 mb-2">Your enquiry has been submitted successfully.</p>
                    <p className="text-sm text-yellow-400 mb-8">We've opened WhatsApp for an immediate response.</p>

                    {/* Confirmation details */}
                    <div className="glass-dark p-4 text-left mb-8 text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Name</span>
                        <span className="text-white">{form.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Email</span>
                        <span className="text-white">{form.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Subject</span>
                        <span className="text-white">{form.subject || 'General Enquiry'}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                      className="px-8 py-3 border border-white/15 text-gray-300 text-sm hover:border-yellow-400 hover:text-yellow-400 transition-all"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="text-2xl font-bold text-white mb-2">Send an Enquiry</h2>
                    <p className="text-gray-500 text-sm mb-8">Fill out the form and we'll respond within 30 minutes.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {fields.filter(f => f.colSpan === 1).map(f => (
                          <div key={f.key} className="space-y-2">
                            <label className={`text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${focusedField === f.key ? 'text-yellow-400' : 'text-gray-500'}`}>
                              {f.label}
                            </label>
                            <input
                              type={f.type}
                              required
                              placeholder={f.placeholder}
                              value={form[f.key as keyof typeof form]}
                              onChange={e => set(f.key, e.target.value)}
                              onFocus={() => setFocusedField(f.key)}
                              onBlur={() => setFocusedField(null)}
                              className="w-full bg-white/4 border border-white/8 text-white px-4 py-3.5 focus:outline-none focus:border-yellow-400 focus:bg-yellow-400/3 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.12)] placeholder:text-gray-700 transition-all duration-300"
                            />
                          </div>
                        ))}
                      </div>

                      {fields.filter(f => f.colSpan === 2).map(f => (
                        <div key={f.key} className="space-y-2">
                          <label className={`text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${focusedField === f.key ? 'text-yellow-400' : 'text-gray-500'}`}>
                            {f.label}
                          </label>
                          <input
                            type={f.type}
                            required={f.key === 'email'}
                            placeholder={f.placeholder}
                            value={form[f.key as keyof typeof form]}
                            onChange={e => set(f.key, e.target.value)}
                            onFocus={() => setFocusedField(f.key)}
                            onBlur={() => setFocusedField(null)}
                            className="w-full bg-white/4 border border-white/8 text-white px-4 py-3.5 focus:outline-none focus:border-yellow-400 focus:bg-yellow-400/3 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.12)] placeholder:text-gray-700 transition-all duration-300"
                          />
                        </div>
                      ))}

                      <div className="space-y-2">
                        <label className={`text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${focusedField === 'message' ? 'text-yellow-400' : 'text-gray-500'}`}>
                          Message
                        </label>
                        <textarea
                          rows={5}
                          required
                          placeholder="Tell us about your travel plans, dates, group size, and any special requirements..."
                          value={form.message}
                          onChange={e => set('message', e.target.value)}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-white/4 border border-white/8 text-white px-4 py-3.5 focus:outline-none focus:border-yellow-400 focus:bg-yellow-400/3 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.12)] placeholder:text-gray-700 transition-all duration-300 resize-none"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <motion.button
                          type="submit"
                          disabled={loading}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 disabled:opacity-60 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)]"
                        >
                          {loading ? (
                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          ) : (
                            <>
                              <Send size={17} />
                              Send Enquiry
                            </>
                          )}
                        </motion.button>
                        <a
                          href="https://wa.me/918848392990?text=Hello! I have an enquiry about vehicle booking."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-7 py-4 bg-green-700 hover:bg-green-600 text-white font-bold text-sm transition-all"
                        >
                          <MessageCircle size={18} />
                          WhatsApp
                        </a>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
}
