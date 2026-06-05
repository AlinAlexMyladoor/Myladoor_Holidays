'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag, Car, Calendar, MapPin, Phone, MessageCircle,
  Clock, CheckCircle2, XCircle, AlertCircle, ChevronRight,
  ArrowLeft, RefreshCw, User
} from 'lucide-react';
import { API_URL } from '@/lib/api';

/* ─── Types ─────────────────────────────────── */
interface Booking {
  id: string;
  ref?: string;
  vehicleType: string;
  vehicleName?: string;
  pickupLocation: string;
  dropLocation?: string;
  from?: string;
  to?: string;
  pickupDate: string;
  returnDate?: string;
  passengers?: number;
  pax?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'Pending';
  totalAmount?: number;
  createdAt: string;
  date?: string;
  notes?: string;
  name?: string;
  phone?: string;
  email?: string;
  tripType?: string;
}

const normalizeBooking = (b: any): Booking => ({
  id: b.id || b.ref || `local-${Math.random().toString(36).slice(2)}`,
  ref: b.ref || b.id,
  vehicleType: b.vehicleType || b.vehicleName || b.vehicle || 'Vehicle Booking',
  pickupLocation: b.pickupLocation || b.from || '—',
  dropLocation: b.dropLocation || b.to,
  pickupDate: b.pickupDate || b.date || new Date().toISOString(),
  returnDate: b.returnDate,
  passengers: b.passengers || (b.pax ? parseInt(b.pax) : undefined),
  status: (b.status?.toLowerCase() || 'pending') as Booking['status'],
  totalAmount: b.totalAmount,
  createdAt: b.createdAt || b.date || new Date().toISOString(),
  notes: b.notes,
  name: b.name,
  phone: b.phone,
  email: b.email,
  tripType: b.tripType,
});

const loadLocalOrders = (): Booking[] => {
  try {
    const raw = localStorage.getItem('myladoor_orders');
    if (!raw) return [];
    return (JSON.parse(raw) as any[]).map(normalizeBooking);
  } catch { return []; }
};

/* ─── Status Config ──────────────────────────── */
interface StatusCfg { label: string; icon: React.ElementType; color: string; bg: string; dot: string; }
const statusConfig: Record<string, StatusCfg> = {
  pending:   { label: 'Pending',   icon: Clock,         color: 'text-yellow-400',  bg: 'bg-yellow-400/10 border-yellow-400/30',  dot: 'bg-yellow-400' },
  confirmed: { label: 'Confirmed', icon: CheckCircle2,  color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/30', dot: 'bg-emerald-400' },
  completed: { label: 'Completed', icon: CheckCircle2,  color: 'text-blue-400',    bg: 'bg-blue-400/10 border-blue-400/30',       dot: 'bg-blue-400' },
  cancelled: { label: 'Cancelled', icon: XCircle,       color: 'text-red-400',     bg: 'bg-red-400/10 border-red-400/30',         dot: 'bg-red-400' },
};

/* ─── Booking Card ───────────────────────────── */
const BookingCard = ({ booking, idx }: { booking: Booking; idx: number }) => {
  const statusKey = (booking.status?.toLowerCase() || 'pending') as keyof typeof statusConfig;
  const cfg = statusConfig[statusKey] ?? statusConfig.pending;
  const StatusIcon = cfg.icon;
  const pickupDate = new Date(booking.pickupDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.08, duration: 0.4 }}
      className="group relative bg-[#0d1117] border border-yellow-400/10 hover:border-yellow-400/30 transition-all duration-500 overflow-hidden"
    >
      {/* Gold left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-yellow-400/60 via-yellow-400/20 to-transparent" />
      {/* Status glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] pointer-events-none opacity-20 rounded-full ${cfg.dot}`} />

      <div className="p-5 md:p-6 pl-6 md:pl-8">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center shrink-0">
              <Car size={18} className="text-yellow-400" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base">{booking.vehicleType || 'Vehicle Booking'}</h3>
              <p className="text-gray-500 text-xs mt-0.5">
                {(booking as any).ref ? `Ref: ${(booking as any).ref}` : `Booking #${booking.id?.slice(-8).toUpperCase() || '—'}`}
              </p>
            </div>
          </div>
          {/* Status badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs font-bold uppercase tracking-wide shrink-0 ${cfg.bg} ${cfg.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${booking.status === 'pending' ? 'animate-pulse' : ''}`} />
            {cfg.label}
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar size={14} className="text-yellow-400/60 shrink-0" />
            <span>
              {pickupDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              {booking.returnDate && (
                <span className="text-gray-600"> → {new Date(booking.returnDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin size={14} className="text-yellow-400/60 shrink-0" />
            <span className="truncate">{booking.pickupLocation || '—'}</span>
          </div>
          {(booking.dropLocation) && (
            <div className="flex items-center gap-2 text-sm text-gray-400 sm:col-span-2">
              <ChevronRight size={14} className="text-yellow-400/60 shrink-0" />
              <span className="truncate">To: {booking.dropLocation}</span>
            </div>
          )}
          {booking.passengers ? (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <User size={14} className="text-yellow-400/60 shrink-0" />
              <span>{booking.passengers} Passengers</span>
            </div>
          ) : null}
          {(booking as any).tripType && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin size={14} className="text-yellow-400/60 shrink-0" />
              <span>{(booking as any).tripType}</span>
            </div>
          )}
        </div>

        {/* Notes */}
        {booking.notes && (
          <p className="text-gray-600 text-xs bg-white/3 border border-white/5 px-3 py-2 mb-4 italic">
            "{booking.notes}"
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div>
            {booking.totalAmount ? (
              <span className="text-yellow-400 font-bold">₹{booking.totalAmount.toLocaleString('en-IN')}</span>
            ) : (
              <span className="text-gray-600 text-xs">Price to be confirmed</span>
            )}
            <p className="text-gray-600 text-[10px] mt-0.5">
              Booked {new Date(booking.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
          <a
            href={`https://wa.me/918848392990?text=Hi! I want to enquire about my booking ${booking.id?.slice(-8).toUpperCase()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/30 text-green-400 text-xs font-bold hover:bg-green-600/30 transition-all"
          >
            <MessageCircle size={13} />
            WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Empty State ────────────────────────────── */
const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center py-20 px-4"
  >
    <div className="w-20 h-20 rounded-full bg-yellow-400/5 border border-yellow-400/20 flex items-center justify-center mx-auto mb-6">
      <ShoppingBag size={32} className="text-yellow-400/50" />
    </div>
    <h3 className="text-white font-bold text-xl mb-2">No Bookings Yet</h3>
    <p className="text-gray-500 text-sm mb-8 max-w-xs mx-auto">
      You haven't made any bookings yet. Start planning your Kerala journey today!
    </p>
    <Link href="/booking">
      <button className="px-8 py-3 bg-yellow-400 text-black font-black uppercase tracking-wider text-sm hover:bg-yellow-300 transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)]">
        Book a Ride →
      </button>
    </Link>
  </motion.div>
);

/* ─── Main Orders Page ───────────────────────── */
export default function OrdersPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name?: string; email?: string; id?: string } | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchBookings = async (token: string, userId: string) => {
    const local = loadLocalOrders();
    try {
      const res = await fetch(`${API_URL}/bookings/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        const api: Booking[] = (Array.isArray(data) ? data : data.bookings || []).map(normalizeBooking);
        // Merge: local first, then API ones not already in local
        const apiIds = new Set(api.map(b => b.id));
        const merged = [...local.filter(b => !apiIds.has(b.id)), ...api];
        setBookings(merged);
      } else {
        const res2 = await fetch(`${API_URL}/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res2.ok) {
          const all = await res2.json();
          const arr = (Array.isArray(all) ? all : all.bookings || [])
            .filter((b: any) => b.userId === userId || b.user?.id === userId)
            .map(normalizeBooking);
          const apiIds2 = new Set(arr.map((b: Booking) => b.id));
          setBookings([...local.filter(b => !apiIds2.has(b.id)), ...arr]);
        } else {
          setBookings(local);
        }
      }
    } catch {
      // No network — show localStorage orders
      setBookings(local);
      if (local.length === 0) setError('Could not load bookings. Please check your connection.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('myladoor_user');
    const token = localStorage.getItem('myladoor_token');
    const local = loadLocalOrders();
    if (!saved || !token) {
      // Not logged in — still show localStorage orders
      setBookings(local);
      setLoading(false);
      return;
    }
    try {
      const u = JSON.parse(saved);
      setUser(u);
      fetchBookings(token, u.id);
    } catch {
      setBookings(local);
      setLoading(false);
    }
  }, []);

  const handleRefresh = () => {
    const token = localStorage.getItem('myladoor_token');
    if (!token || !user?.id) return;
    setRefreshing(true);
    setError('');
    fetchBookings(token, user.id);
  };

  const displayName = user?.name || user?.email?.split('@')[0] || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#0a0f0d] pt-28 pb-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-yellow-400/3 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">

        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-yellow-400 transition-colors text-sm mb-8">
          <ArrowLeft size={15} />
          Back to Home
        </Link>

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-black text-xl shadow-[0_0_24px_rgba(16,185,129,0.5)] border-2 border-emerald-400/40 shrink-0">
              {initial}
            </div>
            <div>
              <p className="text-yellow-400 text-[10px] font-black tracking-[0.4em] uppercase">My Account</p>
              <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">{displayName}</h1>
              <p className="text-gray-500 text-xs mt-0.5">{user?.email || ''}</p>
            </div>
          </div>

          {/* Refresh button */}
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-5 py-2.5 border border-white/15 hover:border-yellow-400/40 text-gray-400 hover:text-yellow-400 text-sm transition-all disabled:opacity-50"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Gold divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent mb-8" />

        {/* Section heading */}
        <div className="flex items-center gap-3 mb-6">
          <ShoppingBag size={18} className="text-yellow-400" />
          <h2 className="text-white font-bold text-lg">My Bookings</h2>
          {!loading && (
            <span className="ml-1 text-[10px] font-black bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 px-2 py-0.5 uppercase tracking-wide">
              {bookings.length} {bookings.length === 1 ? 'Trip' : 'Trips'}
            </span>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-40 bg-[#0d1117] border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4 p-5 bg-red-500/10 border border-red-500/30 text-red-400"
          >
            <AlertCircle size={20} className="shrink-0" />
            <div>
              <p className="font-bold text-sm">{error}</p>
              <button onClick={handleRefresh} className="text-xs text-red-300 hover:text-red-200 mt-1 underline">
                Try again
              </button>
            </div>
          </motion.div>
        ) : bookings.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {bookings.map((b, i) => (
                <BookingCard key={b.id} booking={b} idx={i} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Bottom CTA */}
        {!loading && bookings.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10 p-6 bg-[#0d1117] border border-yellow-400/15 text-center"
          >
            <p className="text-gray-400 text-sm mb-4">Need help with a booking? We're available 24/7.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="https://wa.me/918848392990"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold text-sm transition-all"
              >
                <MessageCircle size={16} /> WhatsApp Us
              </a>
              <a
                href="tel:+918848392990"
                className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white text-sm transition-all"
              >
                <Phone size={16} /> Call Us
              </a>
              <Link href="/booking">
                <button className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm uppercase tracking-wide transition-all">
                  New Booking
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
