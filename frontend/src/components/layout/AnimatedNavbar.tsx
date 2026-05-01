'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, User, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
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
  const [user, setUser] = useState<{name?: string; email?: string} | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem('myladoor_user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch (e) {}
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('myladoor_user');
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

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'py-3 glass-dark shadow-2xl shadow-black/50'
            : 'py-5 bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Image 
                src="/images/logo.png" 
                alt="Myladoor Holidays Logo" 
                width={48}
                height={48}
                className="object-contain filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                priority
              />
            </div>
            <div className="leading-none">
              <span className="text-white font-black tracking-[0.1em] uppercase text-sm sm:text-base">
                Myladoor
              </span>
              <span className="block text-[10px] tracking-[0.3em] text-yellow-400 uppercase font-medium">
                HOLIDAYS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                className={cn(
                  'relative text-sm font-medium tracking-wide transition-colors duration-200 group',
                  pathname === item.link
                    ? 'text-yellow-400'
                    : 'text-gray-300 hover:text-white'
                )}
              >
                {item.name}
                <span className={cn(
                  'absolute -bottom-1 left-0 h-[1px] bg-yellow-400 transition-all duration-300 ease-out',
                  pathname === item.link ? 'w-full' : 'w-0 group-hover:w-full'
                )} />
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-4 border-r border-white/20 pr-4 mr-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold text-xs uppercase shadow-lg">
                    {user.name ? user.name.charAt(0) : user.email?.charAt(0) || 'U'}
                  </div>
                  <span className="text-white text-sm font-medium hidden xl:block">{user.name || user.email?.split('@')[0]}</span>
                </div>
                <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-red-400 transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/signin">
                  <button className="flex items-center gap-2 text-gray-300 hover:text-white text-sm font-medium px-4 py-2 border border-white/20 hover:border-white/40 transition-all duration-200">
                    <LogIn size={15} />
                    Sign In
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="flex items-center gap-2 text-sm font-bold px-5 py-2 bg-yellow-400 text-black uppercase tracking-wide hover:bg-yellow-300 transition-all duration-200 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]">
                    <User size={14} />
                    Sign Up
                  </button>
                </Link>
              </>
            )}
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
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </motion.div>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#0d1117] flex flex-col pt-24 px-8 lg:hidden overflow-y-auto"
          >
            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-2">
              {navItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.07, ease: 'easeOut' }}
                >
                  <Link
                    href={item.link}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'block py-4 text-3xl font-light border-b border-white/10 transition-colors',
                      pathname === item.link ? 'text-yellow-400' : 'text-white/70 hover:text-white'
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
              className="mt-10 flex flex-col gap-4"
            >
              <Link href="/booking" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-4 bg-yellow-400 text-black font-bold text-lg uppercase tracking-wider">
                  Book Now
                </button>
              </Link>
              <div className="flex gap-3">
                {user ? (
                  <button onClick={handleLogout} className="w-full py-3 bg-red-500/20 text-red-400 font-medium border border-red-500/30">
                    Logout
                  </button>
                ) : (
                  <>
                    <Link href="/signin" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                      <button className="w-full py-3 border border-white/30 text-white font-medium">Sign In</button>
                    </Link>
                    <Link href="/signup" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                      <button className="w-full py-3 bg-emerald-700 text-white font-medium">Sign Up</button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>

            {/* Contact quick info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-auto pb-6 text-gray-500 text-sm"
            >
              <p>+91 88483 92990</p>
              <p className="mt-1">info@myladoorholidays.com</p>
              {/* Owner signature */}
              <div className="mt-6 pt-4 border-t border-white/8">
                <p className="text-[9px] tracking-[0.3em] uppercase text-gray-600 mb-1">Founded &amp; Managed By</p>
                <p
                  className="text-yellow-400/70 text-base font-light"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}
                >
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
