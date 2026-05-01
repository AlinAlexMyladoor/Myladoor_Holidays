'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, Phone, User, Check, UserPlus, MessageCircle } from 'lucide-react';
import { API_URL } from '@/lib/api';

export default function SignUpPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert('Passwords do not match!');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password
        }),
      });
      if (!res.ok) throw new Error('Registration failed');
      setSubmitted(true);
    } catch (err) {
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = () => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const strength = passwordStrength();
  const strengthColors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-400', 'bg-emerald-500'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000"
          alt="background"
          fill
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1117] via-[#0d1117] to-[#022c22]/40" />
      </div>

      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-900/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-yellow-400/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <Link href="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-900 flex items-center justify-center text-white font-black text-xl shadow-lg">
              M
            </div>
            <div className="text-left">
              <span className="text-white font-black tracking-[0.1em] uppercase text-sm block">Myladoor</span>
              <span className="text-[9px] text-yellow-400 uppercase tracking-[0.3em] font-bold">HOLIDAYS</span>
            </div>
          </Link>

          <h1 className="text-3xl md:text-4xl font-light text-white">
            Create Your <span className="font-bold text-gold-gradient">Account</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">Join thousands of happy travellers</p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass-dark p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 180, damping: 12 }}
                className="w-20 h-20 bg-emerald-500/15 border-2 border-emerald-400/40 flex items-center justify-center mx-auto mb-5"
              >
                <Check size={36} className="text-emerald-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">Account Created!</h3>
              <p className="text-gray-400 text-sm mb-6">Welcome to Myladoor Holidays. You can now book premium vehicles.</p>
              <Link href="/signin">
                <button className="px-8 py-3 bg-yellow-400 text-black font-black uppercase tracking-wider text-sm hover:bg-yellow-300 transition-all">
                  Sign In Now →
                </button>
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { label: 'Full Name', key: 'name', type: 'text', icon: User, placeholder: 'John Doe' },
                { label: 'Email Address', key: 'email', type: 'email', icon: Mail, placeholder: 'you@example.com' },
                { label: 'Phone Number', key: 'phone', type: 'tel', icon: Phone, placeholder: '+91 88483 92990' },
              ].map(f => (
                <div key={f.key} className="space-y-2">
                  <label className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-200 flex items-center gap-2 ${focusedField === f.key ? 'text-yellow-400' : 'text-gray-500'}`}>
                    <f.icon size={11} /> {f.label}
                  </label>
                  <input
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => set(f.key, e.target.value)}
                    onFocus={() => setFocusedField(f.key)}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.12)] placeholder:text-gray-700 transition-all"
                  />
                </div>
              ))}

              {/* Password */}
              <div className="space-y-2">
                <label className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-200 flex items-center gap-2 ${focusedField === 'password' ? 'text-yellow-400' : 'text-gray-500'}`}>
                  <Lock size={11} /> Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Min 8 characters"
                    value={form.password}
                    onChange={e => set('password', e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 pr-12 focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.12)] placeholder:text-gray-700 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-yellow-400 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {/* Password Strength */}
                {form.password && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className={`flex-1 h-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColors[strength] : 'bg-white/10'}`} />
                      ))}
                    </div>
                    <p className={`text-[10px] font-bold ${strength >= 3 ? 'text-emerald-400' : strength >= 2 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {strengthLabels[strength]} password
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-200 flex items-center gap-2 ${focusedField === 'confirm' ? 'text-yellow-400' : 'text-gray-500'}`}>
                  <Lock size={11} /> Confirm Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Repeat password"
                  value={form.confirm}
                  onChange={e => set('confirm', e.target.value)}
                  onFocus={() => setFocusedField('confirm')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-white/5 border text-white px-4 py-3.5 focus:outline-none placeholder:text-gray-700 transition-all ${
                    form.confirm && form.password !== form.confirm
                      ? 'border-red-500/50 focus:border-red-400'
                      : 'border-white/10 focus:border-yellow-400 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.12)]'
                  }`}
                />
                {form.confirm && form.password !== form.confirm && (
                  <p className="text-red-400 text-[10px] font-bold">Passwords don't match</p>
                )}
              </div>

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
                    <UserPlus size={17} />
                    Create Account
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-500 text-sm mt-6"
        >
          Already have an account?{' '}
          <Link href="/signin" className="text-yellow-400 font-bold hover:underline">
            Sign in →
          </Link>
        </motion.p>
      </div>
    </div>
  );
}
