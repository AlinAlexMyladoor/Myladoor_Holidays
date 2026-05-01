'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Car, Calendar, MessageSquare, Settings,
  Users, TrendingUp, Bell, LogOut, ChevronRight, ChevronDown,
  Check, X, Eye, Phone, Mail, Clock, AlertCircle, Menu
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// ─── Mock Data ───────────────────────────────────────────
const stats = [
  { label: 'Total Bookings', value: '1,284', change: '+12%', up: true },
  { label: 'Active Inquiries', value: '48', change: '+5', up: true },
  { label: 'Revenue (Month)', value: '₹3.8L', change: '+18%', up: true },
  { label: 'Fleet Available', value: '6/9', change: '-1', up: false },
];

const bookings = [
  { id: 'MH-12091', name: 'Rajan Menon', vehicle: 'Innova Premium', from: 'Kochi', to: 'Munnar', date: '2026-04-22', pax: 6, status: 'confirmed', phone: '+91 99870 12344' },
  { id: 'MH-12090', name: 'Priya Nair', vehicle: 'Executive Van 14', from: 'Trivandrum', to: 'Kanyakumari', date: '2026-04-23', pax: 12, status: 'pending', phone: '+91 99123 84321' },
  { id: 'MH-12089', name: 'Sreejith KP', vehicle: 'Grand Coach 49', from: 'Thrissur', to: 'Guruvayur', date: '2026-04-24', pax: 44, status: 'pending', phone: '+91 88483 92990' },
  { id: 'MH-12088', name: 'Arun Thomas', vehicle: 'Compact Sedan', from: 'Kochi Airport', to: 'Fort Kochi', date: '2026-04-20', pax: 3, status: 'confirmed', phone: '+91 94470 22341' },
  { id: 'MH-12087', name: 'Deepa Varma', vehicle: 'Urbania Luxury', from: 'Calicut', to: 'Ooty', date: '2026-04-19', pax: 10, status: 'cancelled', phone: '+91 98450 11203' },
];

const vehicles = [
  { name: 'Compact Sedan', capacity: 4, status: 'available', type: 'Car', reg: 'KL07AB1234' },
  { name: 'SUV Premium', capacity: 7, status: 'booked', type: 'SUV', reg: 'KL07CD5678' },
  { name: 'Executive Van 14', capacity: 14, status: 'available', type: 'Van', reg: 'KL07EF9012' },
  { name: 'Traveller 17', capacity: 17, status: 'maintenance', type: 'Van', reg: 'KL07GH3456' },
  { name: 'Corporate Van 20', capacity: 20, status: 'booked', type: 'Van', reg: 'KL07IJ7890' },
  { name: 'Mini Coach 26', capacity: 26, status: 'available', type: 'Bus', reg: 'KL07KL1234' },
  { name: 'Urbania Luxury', capacity: 12, status: 'available', type: 'Van', reg: 'KL07MN5678' },
  { name: 'SML Mini Bus', capacity: 36, status: 'available', type: 'Bus', reg: 'KL07OP9012' },
  { name: 'Grand Coach 49', capacity: 49, status: 'available', type: 'Bus', reg: 'KL07QR3456' },
];

const inquiries = [
  { name: 'Mathew George', phone: '+91 94473 09988', message: 'Need a bus for 45 people, Mysore trip on May 10.', time: '2 hours ago', read: false },
  { name: 'Kavitha R', phone: '+91 97774 12311', message: 'Airport transfer from Kochi to Munnar - Apr 28.', time: '5 hours ago', read: false },
  { name: 'Santhosh KV', phone: '+91 98761 44529', message: 'Wedding guest transport, need 3 Innovas on May 5.', time: '1 day ago', read: true },
];
// ──────────────────────────────────────────────────────────

const statusBadge = (s: string) => {
  const classes: Record<string, string> = {
    confirmed: 'badge-confirmed',
    pending: 'badge-pending',
    cancelled: 'badge-cancelled',
    available: 'badge-confirmed',
    booked: 'badge-pending',
    maintenance: 'badge-cancelled',
  };
  return <span className={`px-3 py-1 text-xs font-semibold rounded-sm capitalize ${classes[s] || ''}`}>{s}</span>;
};

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Calendar, label: 'Bookings', id: 'bookings' },
  { icon: Car, label: 'Fleet', id: 'fleet' },
  { icon: MessageSquare, label: 'Inquiries', id: 'inquiries', badge: 2 },
  { icon: Users, label: 'Customers', id: 'customers' },
  { icon: TrendingUp, label: 'Analytics', id: 'analytics' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bookingList, setBookingList] = useState(bookings);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const updateBookingStatus = (id: string, status: string) => {
    setBookingList(b => b.map(bk => bk.id === id ? { ...bk, status } : bk));
  };

  return (
    <div className="flex min-h-screen bg-[#0d1117] text-gray-200 pt-0">

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 admin-sidebar border-r border-yellow-400/10 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}>
        {/* Logo */}
        <div className="p-6 border-b border-yellow-400/10">
          <Link href="/" className="flex items-center gap-3">
            <div className="shrink-0">
              <Image 
                src="/images/logo.png" 
                alt="Myladoor Holidays Logo" 
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-white font-bold text-sm tracking-wider">MYLADOOR</p>
              <p className="text-yellow-400 text-[9px] tracking-[0.3em]">ADMIN PANEL</p>
            </div>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {sidebarItems.map(({ icon: Icon, label, id, badge }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-all duration-200 group ${activeTab === id ? 'bg-yellow-400/10 text-yellow-400 border-l-2 border-yellow-400' : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent'}`}
            >
              <span className="flex items-center gap-3"><Icon size={17} />{label}</span>
              {badge && <span className="bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">{badge}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-yellow-400/10">
          <Link href="/signin" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-500 hover:text-red-400 transition-colors">
            <LogOut size={17} />
            Logout
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-[#0d1117]/95 backdrop-blur-sm border-b border-yellow-400/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-white font-bold capitalize">{activeTab}</h1>
              <p className="text-gray-500 text-xs">Myladoor Holidays Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-9 h-9 bg-emerald-700 flex items-center justify-center text-white font-bold text-sm">A</div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <AnimatePresence mode="wait">

            {/* ─── DASHBOARD ─── */}
            {activeTab === 'dashboard' && (
              <motion.div key="dash" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {stats.map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                      className="bg-[#161b22] border border-yellow-400/10 p-5 hover:border-yellow-400/30 transition-colors"
                    >
                      <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">{s.label}</p>
                      <p className="text-2xl font-black text-white">{s.value}</p>
                      <p className={`text-xs font-medium mt-1 ${s.up ? 'text-emerald-400' : 'text-red-400'}`}>{s.change} this month</p>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Bookings */}
                <div className="bg-[#161b22] border border-yellow-400/10">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                    <h3 className="text-white font-semibold">Recent Bookings</h3>
                    <button onClick={() => setActiveTab('bookings')} className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-500 text-xs uppercase tracking-widest border-b border-white/5">
                          {['Ref', 'Customer', 'Vehicle', 'Route', 'Date', 'Status'].map(h => (
                            <th key={h} className="px-6 py-3 text-left font-medium">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {bookingList.slice(0, 4).map(b => (
                          <tr key={b.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 text-yellow-400 font-mono font-bold text-xs">{b.id}</td>
                            <td className="px-6 py-4 text-white font-medium">{b.name}</td>
                            <td className="px-6 py-4 text-gray-400">{b.vehicle}</td>
                            <td className="px-6 py-4 text-gray-400">{b.from} → {b.to}</td>
                            <td className="px-6 py-4 text-gray-400">{b.date}</td>
                            <td className="px-6 py-4">{statusBadge(b.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── BOOKINGS ─── */}
            {activeTab === 'bookings' && (
              <motion.div key="bookings" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="bg-[#161b22] border border-yellow-400/10">
                  <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-white font-semibold">All Bookings</h3>
                    <span className="text-xs text-gray-500">{bookingList.length} total</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-500 text-xs uppercase tracking-widest border-b border-white/5">
                          {['Ref', 'Customer', 'Vehicle', 'Route', 'Date', 'Pax', 'Status', 'Actions'].map(h => (
                            <th key={h} className="px-6 py-3 text-left font-medium">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {bookingList.map(b => (
                          <tr key={b.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 text-yellow-400 font-mono font-bold text-xs whitespace-nowrap">{b.id}</td>
                            <td className="px-6 py-4">
                              <p className="text-white font-medium">{b.name}</p>
                              <p className="text-gray-500 text-xs">{b.phone}</p>
                            </td>
                            <td className="px-6 py-4 text-gray-400 whitespace-nowrap">{b.vehicle}</td>
                            <td className="px-6 py-4 text-gray-400 whitespace-nowrap">{b.from} → {b.to}</td>
                            <td className="px-6 py-4 text-gray-400 whitespace-nowrap">{b.date}</td>
                            <td className="px-6 py-4 text-center text-gray-300">{b.pax}</td>
                            <td className="px-6 py-4">{statusBadge(b.status)}</td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                {b.status === 'pending' && (
                                  <>
                                    <button onClick={() => updateBookingStatus(b.id, 'confirmed')} className="p-1.5 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/40 transition-colors rounded-sm" title="Confirm">
                                      <Check size={15} />
                                    </button>
                                    <button onClick={() => updateBookingStatus(b.id, 'cancelled')} className="p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors rounded-sm" title="Cancel">
                                      <X size={15} />
                                    </button>
                                  </>
                                )}
                                <a href={`https://wa.me/${b.phone.replace(/\D/g, '')}?text=Hello ${b.name}, regarding your booking ${b.id}...`} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-green-500/20 text-green-400 hover:bg-green-500/40 transition-colors rounded-sm" title="WhatsApp">
                                  <Phone size={15} />
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── FLEET ─── */}
            {activeTab === 'fleet' && (
              <motion.div key="fleet" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {vehicles.map((v, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      className="bg-[#161b22] border border-yellow-400/10 p-6 hover:border-yellow-400/30 transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-white font-semibold">{v.name}</h4>
                          <p className="text-gray-500 text-xs mt-1">{v.type} • {v.reg}</p>
                        </div>
                        {statusBadge(v.status)}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{v.capacity} Seater</span>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors text-xs">Edit</button>
                          <button className="px-3 py-1 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors text-xs">
                            {v.status === 'maintenance' ? 'Mark Ready' : 'Details'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ─── INQUIRIES ─── */}
            {activeTab === 'inquiries' && (
              <motion.div key="inq" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                {inquiries.map((inq, i) => (
                  <div key={i} className={`bg-[#161b22] border p-6 flex flex-col sm:flex-row gap-6 items-start ${inq.read ? 'border-white/5' : 'border-yellow-400/30'}`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-white font-semibold">{inq.name}</h4>
                        {!inq.read && <span className="bg-yellow-400/20 text-yellow-400 text-[10px] font-bold px-2 py-0.5 tracking-widest">NEW</span>}
                      </div>
                      <p className="text-gray-400 text-sm mb-3 leading-relaxed">{inq.message}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <span className="flex items-center gap-1"><Phone size={11} />{inq.phone}</span>
                        <span className="flex items-center gap-1"><Clock size={11} />{inq.time}</span>
                      </div>
                    </div>
                    <div className="flex flex-row sm:flex-col gap-2 shrink-0">
                      <a
                        href={`https://wa.me/${inq.phone.replace(/\D/g, '')}?text=Hello ${inq.name}, thank you for your enquiry with Myladoor Holidays!`}
                        target="_blank" rel="noopener noreferrer"
                        className="px-4 py-2 bg-green-600 text-white text-xs font-semibold hover:bg-green-500 transition-colors flex items-center gap-2"
                      >
                        WhatsApp Reply
                      </a>
                      <a href={`tel:${inq.phone}`} className="px-4 py-2 bg-white/5 text-gray-300 text-xs font-semibold hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2">
                        Call
                      </a>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* ─── OTHER TABS: placeholder ─── */}
            {['customers', 'analytics', 'settings'].includes(activeTab) && (
              <motion.div key="other" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-20 h-20 bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-6 text-yellow-400">
                  <AlertCircle size={36} />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2 capitalize">{activeTab}</h3>
                <p className="text-gray-500 text-sm">This module is coming soon. Backend integration required.</p>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
