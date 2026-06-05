'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, User, LogIn, LogOut, ShoppingBag, Settings, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';

const baseNavItems = [
  { name: 'Home', link: '/' },
  { name: 'Fleet', link: '/fleet' },
  { name: 'Services', link: '/services' },
  { name: 'About', link: '/about' },
  { name: 'Contact', link: '/contact' },
];

export const AnimatedNavbar = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const pathname = usePathname();

  /* ── Read user from localStorage & keep in sync ── */
  const syncUser = useCallback(() => {
    const saved = localStorage.getItem('myladoor_user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch { setUser(null); }
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    syncUser();
    // Re-sync whenever profile page saves to localStorage
    window.addEventListener('storage', syncUser);
    // Also listen to a custom event fired by the profile page
    window.addEventListener('myladoor-profile-updated', syncUser);
    return () => {
      window.removeEventListener('storage', syncUser);
      window.removeEventListener('myladoor-profile-updated', syncUser);
    };
  }, [syncUser, pathname]);

  const handleLogout = () => {
    localStorage.removeItem('myladoor_user');
    localStorage.removeItem('myladoor_token');
    setUser(null);
    window.location.href = '/';
  };

  useMotionValueEvent(scrollY, 'change', (current) => {
    const diff = current - prevScrollY;
    setScrolled(current > 50);
    if (current < 80) { setVisible(true); }
    else if (diff > 5) { setVisible(false); setMobileMenuOpen(false); }
    else if (diff < -5) { setVisible(true); }
    setPrevScrollY(current);
  });

  // Nav items: add "Orders" next to Contact when logged in
  const navItems = user
    ? [...baseNavItems, { name: 'Orders', link: '/orders' }]
    : baseNavItems;

  const initial = user
    ? (user.name ? user.name.charAt(0) : user.email?.charAt(0) || 'U').toUpperCase()
    : 'U';
  const displayName = user?.name || user?.email?.split('@')[0] || 'User';

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'py-3 glass-dark shadow-2xl shadow-black/50' : 'py-5 bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/images/logo.png"
                alt="Myladoor Holidays Logo"
                width={44}
                height={44}
                className="object-contain filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                priority
              />
            </div>
            <div className="leading-none">
              <span className="text-white font-black tracking-[0.1em] uppercase text-sm sm:text-base">Myladoor</span>
              <span className="block text-[10px] tracking-[0.3em] text-yellow-400 uppercase font-medium">HOLIDAYS</span>
            </div>
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                className={cn(
                  'relative text-sm font-medium tracking-wide transition-colors duration-200 group',
                  pathname === item.link ? 'text-yellow-400' : 'text-gray-300 hover:text-white'
                )}
              >
                {item.name}
                {item.name === 'Orders' && (
                  <ShoppingBag size={12} className="inline ml-1 mb-0.5 opacity-60" />
                )}
                <span className={cn(
                  'absolute -bottom-1 left-0 h-[1px] bg-yellow-400 transition-all duration-300 ease-out',
                  pathname === item.link ? 'w-full' : 'w-0 group-hover:w-full'
                )} />
              </Link>
            ))}
          </nav>

          {/* ── Right Section: Book Now + Auth Controls ── */}
          <div className="hidden lg:flex items-center gap-3">

            {/* Sign In / Sign Up (only when logged out) */}
            {!user && (
              <>
                <Link href="/signin">
                  <button className="flex items-center gap-2 text-gray-300 hover:text-white text-sm font-medium px-4 py-2 border border-white/20 hover:border-white/40 transition-all duration-200">
                    <LogIn size={15} /> Sign In
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="flex items-center gap-2 text-sm font-bold px-5 py-2 bg-yellow-400 text-black uppercase tracking-wide hover:bg-yellow-300 transition-all duration-200 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    <User size={14} /> Sign Up
                  </button>
                </Link>
              </>
            )}

            {/* Book Now — always visible */}
            <Link href="/booking">
              <button className="relative text-sm font-bold px-5 py-2 bg-emerald-700 text-white uppercase tracking-wide hover:bg-emerald-600 transition-all duration-200 shadow-lg">
                Book Now
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-400 items-center justify-center">
                    <span className="text-black text-[8px] font-black leading-none">!</span>
                  </span>
                </span>
              </button>
            </Link>

            {/* Account chip + Logout — rightmost, only when logged in */}
            {user && (
              <>
                {/* Thin divider */}
                <div className="w-[1px] h-7 bg-white/10 mx-1" />

                {/* Premium Account Chip */}
                <Link
                  href="/profile"
                  className="group flex items-center gap-2 bg-gradient-to-r from-[#0d1117] to-[#111827] hover:from-emerald-950/60 hover:to-[#0d1117] border border-yellow-400/20 hover:border-yellow-400/50 px-3 py-1.5 transition-all duration-300 shadow-[0_0_12px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                >
                  {/* Glowing avatar */}
                  <div className="relative w-7 h-7 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-black text-xs shadow-[0_0_10px_rgba(212,175,55,0.5)] shrink-0">
                    {initial}
                    <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border-2 border-[#0a0f0d] animate-pulse" />
                  </div>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-white text-[12px] font-bold max-w-[90px] truncate leading-tight">
                      {displayName}
                    </span>
                    <span className="text-[9px] text-yellow-400/60 group-hover:text-yellow-400 transition-colors flex items-center gap-1 leading-tight mt-0.5">
                      <Pencil size={7} /> Edit Profile
                    </span>
                  </div>
                </Link>

                {/* Logout — sleek dark pill */}
                <button
                  onClick={handleLogout}
                  className="group flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0d1117] border border-white/10 hover:border-red-500/40 hover:bg-red-950/30 transition-all duration-300 shadow-sm hover:shadow-[0_0_12px_rgba(239,68,68,0.15)]"
                >
                  <LogOut size={13} className="text-gray-500 group-hover:text-red-400 transition-colors" />
                  <span className="text-xs font-semibold text-gray-500 group-hover:text-red-400 transition-colors tracking-wide">
                    Logout
                  </span>
                </button>
              </>
            )}
          </div>

          {/* ── Mobile Toggle ── */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.div animate={{ rotate: isMobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </motion.div>
          </button>
        </div>
      </motion.header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 glass-dark flex flex-col pt-28 px-6 lg:hidden overflow-y-auto"
          >
            {/* Mobile Nav */}
            <div className="flex flex-col items-center text-center gap-1">
              {navItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.07, ease: 'easeOut' }}
                  className="w-full"
                >
                  <Link
                    href={item.link}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'block py-4 text-2xl font-light border-b border-white/5 transition-colors',
                      pathname === item.link ? 'text-yellow-400' : 'text-white/60 hover:text-white'
                    )}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex flex-col gap-3"
            >
              <Link href="/booking" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-4 bg-yellow-400 text-black font-bold text-lg uppercase tracking-wider">
                  Book Now
                </button>
              </Link>

              {user ? (
                <>
                  {/* User info strip */}
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-lg">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-black text-sm border-2 border-emerald-400/40">
                      {initial}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{displayName}</p>
                      <p className="text-gray-500 text-xs">{user.email || ''}</p>
                    </div>
                  </div>
                  <Link href="/profile" onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 justify-center w-full py-3 border border-white/20 text-white text-sm font-medium hover:border-yellow-400/40 transition-colors"
                  >
                    <Pencil size={15} /> Edit Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 bg-red-500/10 text-red-400 font-medium border border-red-500/30 flex items-center justify-center gap-2"
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </>
              ) : (
                <div className="flex gap-3">
                  <Link href="/signin" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full py-3 border border-white/30 text-white font-medium">Sign In</button>
                  </Link>
                  <Link href="/signup" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full py-3 bg-emerald-700 text-white font-medium">Sign Up</button>
                  </Link>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-auto pb-10 text-center text-gray-500 text-xs"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <a href="tel:+918848392990" className="hover:text-yellow-400 transition-colors">+91 88483 92990</a>
                <div className="w-1 h-1 bg-yellow-400/30 rounded-full" />
                <a href="mailto:info@myladoorholidays.com" className="hover:text-yellow-400 transition-colors">info@myladoorholidays.com</a>
              </div>
              <div className="pt-6 border-t border-white/5">
                <p className="text-[8px] tracking-[0.3em] uppercase text-gray-600 mb-2">Founded &amp; Managed By</p>
                <p className="text-yellow-400/80 text-lg font-light italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Saji Myladoor
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
