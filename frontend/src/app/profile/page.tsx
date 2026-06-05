'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Phone, MapPin, Save, ArrowLeft, ShieldCheck } from 'lucide-react';
import { API_URL } from '@/lib/api';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('myladoor_user');
    if (!saved) {
      router.push('/signin');
      return;
    }
    try {
      const u = JSON.parse(saved);
      setUser(u);
      setFormData({
        name: u.name || '',
        phone: u.phone || '',
        address: u.address || ''
      });
    } catch {
      router.push('/signin');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError('');
    setSuccess('');

    // ── Build the merged updated user ──
    const updatedUser = { ...user, ...formData };

    // ── Persist to localStorage immediately (source of truth) ──
    localStorage.setItem('myladoor_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    // Notify navbar to refresh right away
    window.dispatchEvent(new Event('myladoor-profile-updated'));
    window.dispatchEvent(new StorageEvent('storage', { key: 'myladoor_user' }));
    setSuccess('Profile updated!');
    setLoading(false);

    // ── Try to sync with backend (non-blocking) ──
    try {
      const token = localStorage.getItem('myladoor_token');
      const res = await fetch(`${API_URL}/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const serverUser = await res.json();
        // Merge server response back so next login fetch gets fresh data
        const merged = { ...updatedUser, ...serverUser };
        localStorage.setItem('myladoor_user', JSON.stringify(merged));
        setUser(merged);
        window.dispatchEvent(new Event('myladoor-profile-updated'));
      }
    } catch {
      // Silently ignore — local is already saved
    }
  };

  if (!user) return null; // loading or redirecting

  return (
    <div className="min-h-screen bg-[#0a0f0d] pt-32 pb-20 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-emerald-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-20 w-[300px] h-[300px] bg-yellow-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-2xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-yellow-400 transition-colors text-sm mb-6">
          <ArrowLeft size={15} /> Back to Home
        </Link>
        
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 border-2 border-emerald-400/40 flex items-center justify-center text-white text-2xl font-black shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            {(user.name || user.email || 'U').charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Edit Profile</h1>
            <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-400" /> Manage your personal details
            </p>
          </div>
        </div>

        {/* Edit Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0d1117] border border-white/5 p-6 md:p-10 shadow-2xl relative"
        >
          {/* Decorative gold edge */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50" />

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email (Read only) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Mail size={14} className="text-yellow-400" /> Email Address
              </label>
              <input 
                type="email" 
                value={user.email} 
                disabled 
                className="w-full bg-black/40 border border-white/5 px-4 py-3 text-gray-500 text-sm cursor-not-allowed outline-none"
              />
              <p className="text-[10px] text-gray-600">Email address cannot be changed.</p>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <User size={14} className="text-yellow-400" /> Full Name
              </label>
              <input 
                type="text" 
                name="name"
                value={formData.name} 
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full bg-[#0a0f0d] border border-white/10 focus:border-yellow-400 px-4 py-3 text-white text-sm outline-none transition-all focus:shadow-[0_0_15px_rgba(212,175,55,0.15)]"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Phone size={14} className="text-yellow-400" /> Phone Number
              </label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone} 
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                className="w-full bg-[#0a0f0d] border border-white/10 focus:border-yellow-400 px-4 py-3 text-white text-sm outline-none transition-all focus:shadow-[0_0_15px_rgba(212,175,55,0.15)]"
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <MapPin size={14} className="text-yellow-400" /> Address / Location
              </label>
              <textarea 
                name="address"
                value={formData.address} 
                onChange={handleChange}
                placeholder="Where are you located? (Helps with pickups)"
                rows={3}
                className="w-full bg-[#0a0f0d] border border-white/10 focus:border-yellow-400 px-4 py-3 text-white text-sm outline-none transition-all focus:shadow-[0_0_15px_rgba(212,175,55,0.15)] resize-none"
              />
            </div>

            {/* Alerts */}
            {error && (
              <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium">
                {error}
              </div>
            )}
            {success && (
              <div className="px-4 py-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium flex items-center gap-2">
                <ShieldCheck size={16} /> {success}
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-end gap-4">
              <Link href="/orders" className="text-sm text-gray-400 hover:text-yellow-400 transition-colors">
                View My Orders
              </Link>
              <button 
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-yellow-400 text-black font-black uppercase tracking-wider text-sm hover:bg-yellow-300 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
