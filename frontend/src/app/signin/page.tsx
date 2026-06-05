'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, LogIn, MessageCircle, AlertCircle } from 'lucide-react';
import { API_URL } from '@/lib/api';

export default function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const set = (k: string, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    if (error) setError(null); // clear error on typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Show inline error, never use alert()
        setError(data.message || 'Invalid email or password. Please try again.');
        return;
      }

      // Store user data
      localStorage.setItem('myladoor_user', JSON.stringify(data.user));
      localStorage.setItem('myladoor_token', data.access_token);

      // Role-based redirect: ONLY admin credentials go to /admin
      if (data.user.role === 'ADMIN' && data.user.email === 'admin@myladoor.com') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/';
      }
    } catch (err: any) {
      setError('Unable to connect to server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=2000"
          alt="background"
          fill
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#022c22]/60 via-[#0d1117] to-[#0d1117]" />
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none glow-orb" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-light text-white">
            Welcome <span className="font-bold text-gold-gradient">Back</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">Sign in to manage your bookings</p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="glass-dark p-6 sm:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />

          {/* Inline Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="mb-5 flex items-start gap-3 bg-red-500/10 border border-red-500/30 px-4 py-3 rounded-sm"
              >
                <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm leading-snug">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-200 flex items-center gap-2 ${focusedField === 'email' ? 'text-yellow-400' : 'text-gray-500'}`}>
                <Mail size={11} /> Email Address
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                autoComplete="email"
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.12)] placeholder:text-gray-700 transition-all text-base"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-200 flex items-center gap-2 ${focusedField === 'password' ? 'text-yellow-400' : 'text-gray-500'}`}>
                <Lock size={11} /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="current-password"
                  className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 pr-12 focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.12)] placeholder:text-gray-700 transition-all text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-yellow-400 transition-colors p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div className="flex justify-end">
              <a href="#" className="text-xs text-gray-500 hover:text-yellow-400 transition-colors">Forgot password?</a>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 disabled:opacity-60 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={17} />
                  Sign In
                </>
              )}
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-[1px] bg-white/8" />
              <span className="text-xs text-gray-600">OR</span>
              <div className="flex-1 h-[1px] bg-white/8" />
            </div>

            {/* WhatsApp auth */}
            <a
              href="https://wa.me/918848392990?text=I want to sign in to my Myladoor Holidays account."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-green-700 hover:bg-green-600 text-white font-bold text-sm transition-all flex items-center justify-center gap-3"
            >
              <MessageCircle size={17} />
              Continue via WhatsApp
            </a>
          </form>
        </motion.div>

        {/* Footer link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-center text-gray-500 text-sm mt-6"
        >
          Don't have an account?{' '}
          <Link href="/signup" className="text-yellow-400 font-bold hover:underline">
            Create one →
          </Link>
        </motion.p>
      </div>
    </div>
  );
}
