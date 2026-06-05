'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar, MapPin, Users, Car, Phone, User, Mail,
  MessageSquare, Check, ChevronRight, ArrowLeft, MessageCircle,
  Star, Clock, Shield, Zap
} from 'lucide-react';
import { ParticleField } from '@/components/ui/ParticleField';
import { FireworksBurst } from '@/components/ui/FireworksBurst';
import { API_URL } from '@/lib/api';

const vehicles = [
  { id: 'sedan', name: 'Compact Sedan', capacity: 4, price: '₹1,800', tag: 'Economy', img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600', features: ['AC', 'GPS', 'Music'] },
  { id: 'innova', name: 'Innova Crysta', capacity: 7, price: '₹2,500', tag: 'Bestseller', img: '/images/munnar-road.jpg', features: ['AC', 'GPS', 'Spacious'] },
  { id: 'van14', name: 'Executive Van 14', capacity: 14, price: '₹4,500', tag: 'Group', img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600', features: ['AC', 'Push-back', 'USB'] },
  { id: 'van17', name: 'Traveller 17', capacity: 17, price: '₹5,500', tag: 'Group', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600', features: ['AC', 'Luggage Rack', 'Curtains'] },
  { id: 'van20', name: 'Corporate Van 20', capacity: 20, price: '₹6,500', tag: 'Corporate', img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600', features: ['AC', 'WiFi Ready', 'Conference'] },
  { id: 'coach26', name: 'Mini Coach 26', capacity: 26, price: '₹8,000', tag: 'Events', img: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=600', features: ['AC', 'PA System', 'Storage'] },
  { id: 'urbania', name: 'Urbania Luxury', capacity: 12, price: '₹7,500', tag: 'Luxury', img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600', features: ['Panoramic Roof', 'Leather', 'WiFi'] },
  { id: 'sml', name: 'SML Mini Bus', capacity: 36, price: '₹9,000', tag: 'Tours', img: '/images/bus-interior.jpg', features: ['AC', 'PA System', 'TV'] },
  { id: 'bus49', name: 'Grand Coach 49', capacity: 49, price: '₹12,000', tag: 'Events', img: '/images/bus-interior.jpg', features: ['Full AC', 'Recliner', 'PA System'] },
];

const tripTypes = [
  { label: 'Airport Transfer', icon: '✈️' },
  { label: 'Outstation Tour', icon: '🗺️' },
  { label: 'Corporate Trip', icon: '🏢' },
  { label: 'Wedding', icon: '💒' },
  { label: 'School Trip', icon: '🎓' },
  { label: 'Pilgrimage', icon: '🛕' },
  { label: 'City Transfer', icon: '🏙️' },
  { label: 'Other', icon: '📝' },
];

const steps = [
  { id: 1, label: 'Trip Details', icon: MapPin },
  { id: 2, label: 'Choose Vehicle', icon: Car },
  { id: 3, label: 'Your Details', icon: User },
  { id: 4, label: 'Confirm', icon: Check },
];

const tagColors: Record<string, string> = {
  Economy: 'bg-gray-700 text-gray-200',
  Bestseller: 'bg-yellow-400 text-black',
  Group: 'bg-blue-700 text-blue-100',
  Corporate: 'bg-purple-800 text-purple-100',
  Events: 'bg-emerald-800 text-emerald-100',
  Luxury: 'bg-amber-700 text-amber-100',
  Tours: 'bg-teal-800 text-teal-100',
};

interface FormState {
  tripType: string;
  from: string;
  to: string;
  pickupDate: string;
  returnDate: string;
  pax: string;
  vehicle: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [refNum] = useState(`MH-${Math.floor(Math.random() * 90000) + 10000}`);
  const [form, setForm] = useState<FormState>({
    tripType: '',
    from: '',
    to: '',
    pickupDate: '',
    returnDate: '',
    pax: '',
    vehicle: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
  });

  const set = (k: keyof FormState, v: string) => setForm(f => ({ ...f, [k]: v }));

  const selectedVehicle = vehicles.find(v => v.id === form.vehicle);

  const saveOrder = async () => {
    // Save to database
    try {
      const userStr = localStorage.getItem('myladoor_user');
      const user = userStr ? JSON.parse(userStr) : null;
      await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, vehicleId: form.vehicle, userId: user?.id || null }),
      });
    } catch (err) {
      console.error('DB Error:', err);
    }
    // Save to localStorage orders
    try {
      const existing = JSON.parse(localStorage.getItem('myladoor_orders') || '[]');
      const alreadySaved = existing.some((o: any) => o.ref === refNum);
      if (!alreadySaved) {
        existing.unshift({
          ref: refNum,
          id: refNum,
          date: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          ...form,
          vehicleType: selectedVehicle?.name || form.vehicle,
          vehicleName: selectedVehicle?.name || form.vehicle,
          pickupLocation: form.from,
          dropLocation: form.to,
          passengers: parseInt(form.pax) || 0,
          status: 'pending',
        });
        localStorage.setItem('myladoor_orders', JSON.stringify(existing));
      }
    } catch (_) {}
  };

  const handleConfirm = async () => {
    await saveOrder();
    setShowFireworks(true);
    setTimeout(() => setShowFireworks(false), 5000);
    setSubmitted(true);
  };

  const handleWhatsApp = async () => {
    await saveOrder();
    const msg = encodeURIComponent(
      `*🚐 New Booking Enquiry — Myladoor Holidays*\n\n` +
      `*Ref:* ${refNum}\n*Trip Type:* ${form.tripType}\n` +
      `*From:* ${form.from}\n*To:* ${form.to}\n` +
      `*Pickup Date:* ${form.pickupDate}\n*Return Date:* ${form.returnDate || 'One Way'}\n` +
      `*Passengers:* ${form.pax}\n*Vehicle:* ${selectedVehicle?.name || form.vehicle}\n\n` +
      `*Customer Name:* ${form.name}\n*Phone:* ${form.phone}\n` +
      `*Email:* ${form.email}\n*Notes:* ${form.notes || 'None'}`
    );
    window.open(`https://wa.me/918848392990?text=${msg}`, '_blank');
    setShowFireworks(true);
    setTimeout(() => setShowFireworks(false), 5000);
    setSubmitted(true);
  };

  const handleCall = () => {
    window.location.href = 'tel:+918848392990';
  };

  const canNext1 = form.tripType && form.from && form.to && form.pickupDate && form.pax;
  const canNext2 = !!form.vehicle;
  const canNext3 = form.name && form.phone;

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* Fireworks on booking success */}
      {showFireworks && <FireworksBurst />}
      {/* ── Page Hero ── */}
      <section className="relative h-52 md:h-72 flex items-end overflow-hidden bg-[#080c0a]">
        <Image src="/images/munnar-road.jpg" alt="Booking" fill className="object-cover opacity-20" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117]/80 to-transparent" />
        <ParticleField count={15} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-10 w-full">
          <span className="text-yellow-400 text-[10px] font-black tracking-[0.45em] uppercase">Seamless Experience</span>
          <h1 className="text-4xl md:text-6xl font-light text-white mt-2">
            Book Your <span className="font-black text-gold-gradient">Ride</span>
          </h1>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* ── Step Progress ── */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute top-5 left-0 right-0 h-[1px] bg-white/8 z-0" />
          <div
            className="absolute top-5 left-0 h-[1px] bg-yellow-400/60 z-0 transition-all duration-700"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          />
          {steps.map(s => (
            <div key={s.id} className="flex flex-col items-center gap-2 z-10">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-500 ${step > s.id ? 'bg-yellow-400 text-black' : step === s.id ? 'bg-yellow-400 text-black shadow-[0_0_20px_rgba(212,175,55,0.5)]' : 'bg-[#161b22] border border-white/10 text-gray-600'}`}>
                {step > s.id ? <Check size={16} /> : <s.icon size={16} />}
              </div>
              <span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-wider hidden sm:block transition-colors ${step >= s.id ? 'text-yellow-400' : 'text-gray-600'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {submitted ? (
          /* ── SUCCESS ── */
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            {/* The Confirmation Sheet */}
            <div id="confirmation-sheet" className="bg-white text-[#0d1117] p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.5)] max-w-2xl mx-auto relative overflow-hidden booking-receipt">
              {/* Receipt Header */}
              <div className="flex justify-between items-start border-b-2 border-[#0d1117]/10 pb-8 mb-8">
                <div>
                  <Image src="/images/logo.png" alt="Logo" width={50} height={50} className="mb-4 grayscale" />
                  <h2 className="text-2xl font-black uppercase tracking-tighter">Booking Confirmation</h2>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Myladoor Holidays · Thrissur, Kerala</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-1">Reference Number</p>
                  <p className="text-xl font-mono font-black">{refNum}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{new Date().toLocaleDateString()} · {new Date().toLocaleTimeString()}</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mb-8 flex justify-center">
                <div className="border-2 border-[#0d1117] px-6 py-2 rotate-[-2deg] font-black uppercase tracking-[0.2em] text-sm">
                  Request Received
                </div>
              </div>

              {/* Summary Grid */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-12 mb-10">
                {[
                  { label: 'Customer Name', val: form.name },
                  { label: 'Phone Number', val: form.phone },
                  { label: 'Trip Type', val: form.tripType },
                  { label: 'Vehicle', val: selectedVehicle?.name || form.vehicle },
                  { label: 'From', val: form.from },
                  { label: 'To', val: form.to },
                  { label: 'Pickup Date', val: form.pickupDate },
                  { label: 'Return Date', val: form.returnDate || 'One Way' },
                  { label: 'Passengers', val: `${form.pax} Person(s)` },
                ].map((item, i) => (
                  <div key={i} className="border-b border-gray-100 pb-2">
                    <p className="text-[9px] uppercase tracking-widest font-bold text-gray-400 mb-1">{item.label}</p>
                    <p className="text-sm font-bold">{item.val}</p>
                  </div>
                ))}
              </div>

              {/* Notes */}
              {form.notes && (
                <div className="mb-10 bg-gray-50 p-4 border-l-4 border-yellow-400">
                  <p className="text-[9px] uppercase tracking-widest font-bold text-gray-400 mb-1">Special Notes</p>
                  <p className="text-xs italic">"{form.notes}"</p>
                </div>
              )}

              {/* Footer / Instructions */}
              <div className="border-t-2 border-dashed border-gray-200 pt-8 text-center">
                <p className="text-[10px] text-gray-500 leading-relaxed max-w-sm mx-auto">
                  Thank you for choosing Myladoor Holidays. Our team will contact you via WhatsApp or phone within 30 minutes to confirm availability and final pricing.
                </p>
                <div className="mt-6 flex justify-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Processing Order</span>
                </div>
              </div>

              {/* Watermark */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none rotate-[-45deg]">
                <h2 className="text-[120px] font-black">MYLADOOR</h2>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-12 flex-wrap no-print">
              <button
                onClick={() => window.print()}
                className="px-8 py-4 bg-white text-black font-black uppercase tracking-wider text-sm hover:bg-gray-100 transition-all flex items-center gap-2 shadow-xl"
              >
                Print Sheet
              </button>
              <a
                href="https://wa.me/918848392990"
                target="_blank" rel="noopener noreferrer"
                className="px-8 py-4 bg-green-600 text-white font-black uppercase tracking-wider text-sm hover:bg-green-500 transition-all flex items-center gap-2 shadow-xl"
              >
                <MessageCircle size={18} /> WhatsApp Support
              </a>
              <Link href="/" className="px-8 py-4 border border-white/20 text-white text-sm hover:border-yellow-400 transition-all">
                Back to Home
              </Link>
            </div>

            <style jsx global>{`
              @media print {
                body * { visibility: hidden; }
                #confirmation-sheet, #confirmation-sheet * { visibility: visible; }
                #confirmation-sheet {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                  margin: 0;
                  padding: 2rem;
                  box-shadow: none;
                }
                .no-print { display: none !important; }
              }
            `}</style>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            {/* ── STEP 1: Trip Details ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div className="glass-dark p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-yellow-400 via-yellow-400/40 to-transparent" />
                  <h2 className="text-white font-bold text-xl mb-6">Tell Us About Your Trip</h2>

                  {/* Trip type */}
                  <div className="mb-8">
                    <label className="text-[10px] text-gray-500 font-black uppercase tracking-[0.25em] mb-4 block">Trip Type</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {tripTypes.map(t => (
                        <button
                          key={t.label}
                          onClick={() => set('tripType', t.label)}
                          className={`p-3 border text-sm font-semibold transition-all duration-300 flex flex-col items-center gap-1.5 ${form.tripType === t.label ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400' : 'border-white/8 text-gray-400 hover:border-yellow-400/40 hover:text-yellow-400/70'}`}
                        >
                          <span className="text-xl">{t.icon}</span>
                          <span className="text-xs font-medium text-center leading-tight">{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Route */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    {[
                      { label: 'Pickup Location', key: 'from' as keyof FormState, placeholder: 'e.g. Thrissur, CIAL Airport', icon: MapPin },
                      { label: 'Destination', key: 'to' as keyof FormState, placeholder: 'e.g. Munnar, Guruvayur', icon: MapPin },
                    ].map(f => (
                      <div key={f.key}>
                        <label className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2 transition-colors ${focusedField === f.key ? 'text-yellow-400' : 'text-gray-500'}`}>
                          <f.icon size={10} /> {f.label}
                        </label>
                        <input
                          type="text"
                          placeholder={f.placeholder}
                          value={form[f.key]}
                          onChange={e => set(f.key, e.target.value)}
                          onFocus={() => setFocusedField(f.key)}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-[#1a2030] border border-white/20 text-white px-4 py-3.5 focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.12)] placeholder:text-gray-500 transition-all"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[
                      { label: 'Pickup Date', key: 'pickupDate' as keyof FormState, type: 'date', icon: Calendar },
                      { label: 'Return Date (Optional)', key: 'returnDate' as keyof FormState, type: 'date', icon: Calendar },
                      { label: 'Passengers', key: 'pax' as keyof FormState, type: 'number', icon: Users, placeholder: 'e.g. 7' },
                    ].map(f => (
                      <div key={f.key}>
                        <label className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2 transition-colors ${focusedField === f.key ? 'text-yellow-400' : 'text-gray-500'}`}>
                          <f.icon size={10} /> {f.label}
                        </label>
                        <input
                          type={f.type}
                          placeholder={'placeholder' in f ? f.placeholder : ''}
                          value={form[f.key]}
                          onChange={e => set(f.key, e.target.value)}
                          onFocus={() => setFocusedField(f.key)}
                          onBlur={() => setFocusedField(null)}
                          min={f.type === 'date' ? new Date().toISOString().split('T')[0] : undefined}
                          className="w-full bg-[#1a2030] border border-white/20 text-white px-4 py-3.5 focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.12)] placeholder:text-gray-500 transition-all [color-scheme:dark]"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => canNext1 && setStep(2)}
                    disabled={!canNext1}
                    className="flex items-center gap-3 px-10 py-4 bg-yellow-400 text-black font-black uppercase tracking-wider text-sm hover:bg-yellow-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  >
                    Choose Vehicle <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: Vehicle ── */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
                <div className="mb-6">
                  <h2 className="text-white font-bold text-xl mb-1">Select Your Vehicle</h2>
                  <p className="text-gray-500 text-sm">
                    {form.pax} passengers · {form.tripType} · {form.from} → {form.to}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
                  {vehicles.map(v => {
                    const pax = parseInt(form.pax) || 0;
                    const fits = v.capacity >= pax;
                    const selected = form.vehicle === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => fits && set('vehicle', v.id)}
                        disabled={!fits}
                        className={`relative overflow-hidden border text-left transition-all duration-300 group ${selected ? 'border-yellow-400 shadow-[0_0_25px_rgba(212,175,55,0.25)]' : fits ? 'border-white/8 hover:border-yellow-400/40' : 'border-white/5 opacity-40 cursor-not-allowed'}`}
                      >
                        {/* Image */}
                        <div className="relative h-40 overflow-hidden">
                          <Image src={v.img} alt={v.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[30%] group-hover:grayscale-0" sizes="(max-width: 768px) 100vw, 33vw" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <span className={`absolute top-3 left-3 text-[9px] font-black px-2.5 py-1 tracking-[0.2em] uppercase ${tagColors[v.tag] || 'bg-gray-700 text-gray-200'}`}>
                            {v.tag}
                          </span>
                          <span className="absolute bottom-3 right-3 text-yellow-400 text-xs font-bold glass-dark px-2 py-1">
                            {v.price}/day
                          </span>
                          {selected && (
                            <div className="absolute top-3 right-3 w-7 h-7 bg-yellow-400 flex items-center justify-center">
                              <Check size={14} className="text-black" />
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="p-4 bg-[#161b22] group-hover:bg-emerald-950/30 transition-colors">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-white font-bold text-sm">{v.name}</p>
                            <p className="text-gray-500 text-xs">{v.capacity} pax</p>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {v.features.map((feat, fi) => (
                              <span key={fi} className="text-[9px] text-gray-500 border border-white/8 px-1.5 py-0.5">{feat}</span>
                            ))}
                          </div>
                          {!fits && <p className="text-red-400 text-[10px] mt-2 font-semibold">Insufficient capacity for {form.pax} passengers</p>}
                        </div>

                        {selected && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-yellow-400" />}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between">
                  <button onClick={() => setStep(1)} className="flex items-center gap-2 px-6 py-4 border border-white/15 text-gray-400 text-sm hover:border-white/30 hover:text-white transition-all">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button onClick={() => canNext2 && setStep(3)} disabled={!canNext2} className="flex items-center gap-3 px-10 py-4 bg-yellow-400 text-black font-black uppercase tracking-wider text-sm hover:bg-yellow-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                    Your Details <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: Contact ── */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
                <div className="glass-dark p-8 mb-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-yellow-400 via-yellow-400/40 to-transparent" />
                  <h2 className="text-white font-bold text-xl mb-6">Your Contact Details</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { label: 'Full Name', key: 'name' as keyof FormState, type: 'text', icon: User, placeholder: 'John Doe', required: true },
                      { label: 'Phone Number', key: 'phone' as keyof FormState, type: 'tel', icon: Phone, placeholder: '+91 88483 92990', required: true },
                      { label: 'Email Address', key: 'email' as keyof FormState, type: 'email', icon: Mail, placeholder: 'you@example.com', required: false },
                    ].map(f => (
                      <div key={f.key} className={f.key === 'email' ? 'md:col-span-2' : ''}>
                        <label className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2 transition-colors ${focusedField === f.key ? 'text-yellow-400' : 'text-gray-500'}`}>
                          <f.icon size={10} /> {f.label} {f.required && <span className="text-red-400">*</span>}
                        </label>
                        <input
                          type={f.type}
                          required={f.required}
                          placeholder={f.placeholder}
                          value={form[f.key]}
                          onChange={e => set(f.key, e.target.value)}
                          onFocus={() => setFocusedField(f.key)}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-[#1a2030] border border-white/15 text-white px-4 py-3.5 focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.12)] placeholder:text-gray-600 transition-all"
                        />
                      </div>
                    ))}

                    <div className="md:col-span-2">
                      <label className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2 transition-colors ${focusedField === 'notes' ? 'text-yellow-400' : 'text-gray-500'}`}>
                        <MessageSquare size={10} /> Special Requests / Notes
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Any special requirements, pickup time, additional stops..."
                        value={form.notes}
                        onChange={e => set('notes', e.target.value)}
                        onFocus={() => setFocusedField('notes')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-[#1a2030] border border-white/15 text-white px-4 py-3.5 focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.12)] placeholder:text-gray-600 transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button onClick={() => setStep(2)} className="flex items-center gap-2 px-6 py-4 border border-white/15 text-gray-400 text-sm hover:border-white/30 hover:text-white transition-all">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button onClick={() => canNext3 && setStep(4)} disabled={!canNext3} className="flex items-center gap-3 px-10 py-4 bg-yellow-400 text-black font-black uppercase tracking-wider text-sm hover:bg-yellow-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                    Review & Confirm <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 4: Confirm ── */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
                <div className="glass-dark p-8 mb-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
                  <h2 className="text-white font-bold text-xl mb-6">Confirm Your Booking</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Summary */}
                    <div>
                      <h3 className="text-[10px] text-yellow-400 font-black tracking-[0.3em] uppercase mb-4">Trip Summary</h3>
                      <div className="space-y-3">
                        {[
                          { label: 'Trip Type', val: form.tripType },
                          { label: 'From', val: form.from },
                          { label: 'To', val: form.to },
                          { label: 'Pickup Date', val: form.pickupDate },
                          { label: 'Return', val: form.returnDate || 'One Way' },
                          { label: 'Passengers', val: form.pax },
                        ].map((row, i) => (
                          <div key={i} className="flex justify-between py-2.5 border-b border-white/5">
                            <span className="text-gray-500 text-sm">{row.label}</span>
                            <span className="text-white text-sm font-medium">{row.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Vehicle + Contact */}
                    <div>
                      <h3 className="text-[10px] text-yellow-400 font-black tracking-[0.3em] uppercase mb-4">Vehicle & Contact</h3>
                      {selectedVehicle && (
                        <div className="relative h-28 mb-4 overflow-hidden border border-yellow-400/20">
                          <Image
                            src={selectedVehicle.img}
                            alt={selectedVehicle.name}
                            fill
                            className="object-cover grayscale-[20%]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                          <div className="absolute bottom-3 left-3">
                            <p className="text-white font-bold text-sm">{selectedVehicle.name}</p>
                            <p className="text-gray-400 text-xs">{selectedVehicle.capacity} Seater · {selectedVehicle.price}/day</p>
                          </div>
                        </div>
                      )}
                      <div className="space-y-2">
                        {[
                          { label: 'Name', val: form.name },
                          { label: 'Phone', val: form.phone },
                          { label: 'Email', val: form.email || '—' },
                        ].map((row, i) => (
                          <div key={i} className="flex justify-between py-2 border-b border-white/5">
                            <span className="text-gray-500 text-sm">{row.label}</span>
                            <span className="text-white text-sm">{row.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Trust indicators */}
                  <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-6">
                    {[
                      { icon: Shield, text: 'Fully Insured' },
                      { icon: Clock, text: 'Confirmed in 30 mins' },
                      { icon: Zap, text: 'No Hidden Charges' },
                      { icon: Star, text: '4.9★ Rated' },
                    ].map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                        <b.icon size={14} className="text-yellow-400" />
                        {b.text}
                      </div>
                    ))}
                  </div>

                  {/* Price Estimator */}
                  {selectedVehicle && (() => {
                    const basePrice = parseInt(selectedVehicle.price.replace(/[^0-9]/g, ''));
                    const tripMultipliers: Record<string, number> = {
                      'Airport Transfer': 1.2,
                      'Wedding': 1.35,
                      'Corporate Trip': 1.15,
                      'Pilgrimage': 1.05,
                      'School Trip': 0.95,
                      'Outstation Tour': 1.0,
                      'City Transfer': 1.1,
                    };
                    const multiplier = tripMultipliers[form.tripType] || 1;
                    const estimated = Math.round(basePrice * multiplier);
                    const days = form.returnDate
                      ? Math.max(1, Math.ceil((new Date(form.returnDate).getTime() - new Date(form.pickupDate).getTime()) / 86400000))
                      : 1;
                    const total = estimated * days;

                    return (
                      <div className="mt-6 p-5 bg-yellow-400/5 border border-yellow-400/20">
                        <p className="text-yellow-400 text-[10px] font-black tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
                          <Zap size={12} /> Estimated Price
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Base rate ({selectedVehicle.name})</span>
                            <span className="text-white font-medium">₹{basePrice.toLocaleString()}/day</span>
                          </div>
                          {multiplier !== 1 && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">{form.tripType} surcharge</span>
                              <span className="text-yellow-400 font-medium">×{multiplier.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Duration</span>
                            <span className="text-white font-medium">{days} day{days > 1 ? 's' : ''}</span>
                          </div>
                          <div className="h-[1px] bg-yellow-400/20 my-2" />
                          <div className="flex justify-between">
                            <span className="text-white font-bold">Estimated Total</span>
                            <span className="text-yellow-400 font-black text-lg">₹{total.toLocaleString()}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-[10px] mt-3">* Final pricing confirmed via WhatsApp. Tolls, permits &amp; extras may apply.</p>
                      </div>
                    );
                  })()}
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-3 mt-2 flex-wrap">
                  <button onClick={() => setStep(3)} className="flex items-center gap-2 px-6 py-4 border border-white/15 text-gray-400 text-sm hover:border-white/30 hover:text-white transition-all">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* 1. Confirm & Show Receipt */}
                    <button
                      onClick={handleConfirm}
                      className="flex items-center justify-center gap-2 px-8 py-4 bg-yellow-400 text-black font-black uppercase tracking-wider text-sm hover:bg-yellow-300 transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105"
                    >
                      <Check size={16} /> Confirm &amp; Get Receipt
                    </button>
                    {/* 2. Send Enquiry on WhatsApp */}
                    <button
                      onClick={handleWhatsApp}
                      className="flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white font-black uppercase tracking-wider text-sm hover:bg-green-500 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:scale-105"
                    >
                      <MessageCircle size={16} /> Send Enquiry on WhatsApp
                    </button>
                    {/* 3. Place a Call */}
                    <button
                      onClick={handleCall}
                      className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-700 text-white font-black uppercase tracking-wider text-sm hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-105"
                    >
                      <Phone size={16} /> Place a Call
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
