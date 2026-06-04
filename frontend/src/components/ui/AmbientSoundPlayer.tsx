'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Nature Ambient Sound Engine ────────────────────────────────────────────
   Creates a layered generative soundscape:
   1. Flowing water (filtered noise)
   2. Wind breeze (low-pass noise)
   3. Bird chirp melody (pentatonic sine tones, randomised)
   4. Soft harmonic drone (very low hum — calming A220 base)
────────────────────────────────────────────────────────────────────────────── */

export const AmbientSoundPlayer: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const schedulerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sourceNodesRef = useRef<AudioNode[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ── Create pink/brown noise buffer ─── */
  const makeNoiseBuffer = useCallback((ctx: AudioContext, seconds: number) => {
    const bufSize = ctx.sampleRate * seconds;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufSize; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.96900 * b2 + w * 0.1538520;
      b3 = 0.86650 * b3 + w * 0.3104856;
      b4 = 0.55000 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
      b6 = w * 0.115926;
    }
    return buf;
  }, []);

  /* ── Play a single soft bird chirp ─── */
  const chirp = useCallback((ctx: AudioContext, master: GainNode, freq: number, time: number, duration: number) => {
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.6, time + duration * 0.3);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.95, time + duration);
    env.gain.setValueAtTime(0, time);
    env.gain.linearRampToValueAtTime(0.065, time + 0.04);
    env.gain.exponentialRampToValueAtTime(0.001, time + duration);
    osc.connect(env);
    env.connect(master);
    osc.start(time);
    osc.stop(time + duration + 0.05);
    sourceNodesRef.current.push(osc);
  }, []);

  /* ── Schedule random bird melody ─── */
  const scheduleBirds = useCallback((ctx: AudioContext, master: GainNode) => {
    // Pentatonic scale around A4: A3, C4, D4, E4, G4, A4, C5, E5
    const scale = [220, 261.6, 293.7, 329.6, 392, 440, 523.3, 659.3];
    const now = ctx.currentTime;

    const numNotes = 2 + Math.floor(Math.random() * 3);
    let t = now + 0.1;
    for (let i = 0; i < numNotes; i++) {
      const freq = scale[Math.floor(Math.random() * scale.length)];
      const dur = 0.18 + Math.random() * 0.22;
      chirp(ctx, master, freq, t, dur);
      t += dur + 0.05 + Math.random() * 0.15;
    }
  }, [chirp]);

  const startAudio = useCallback(() => {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return;

    const ctx = new AC() as AudioContext;
    ctxRef.current = ctx;

    /* ── Master output ── */
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 2.5);
    master.connect(ctx.destination);
    masterRef.current = master;

    /* ── 1. Flowing water — high-pass filtered noise ── */
    const waterBuf = makeNoiseBuffer(ctx, 6);
    const water = ctx.createBufferSource();
    water.buffer = waterBuf;
    water.loop = true;
    const waterHp = ctx.createBiquadFilter();
    waterHp.type = 'bandpass';
    waterHp.frequency.value = 800;
    waterHp.Q.value = 0.6;
    const waterGain = ctx.createGain();
    waterGain.gain.value = 0.28;
    water.connect(waterHp);
    waterHp.connect(waterGain);
    waterGain.connect(master);
    water.start();
    sourceNodesRef.current.push(water);

    /* ── 2. Wind — low-pass filtered noise, slowly modulated ── */
    const windBuf = makeNoiseBuffer(ctx, 8);
    const wind = ctx.createBufferSource();
    wind.buffer = windBuf;
    wind.loop = true;
    const windLp = ctx.createBiquadFilter();
    windLp.type = 'lowpass';
    windLp.frequency.value = 350;
    windLp.Q.value = 0.5;
    const windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0.12, ctx.currentTime);
    windGain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 4);
    windGain.gain.linearRampToValueAtTime(0.10, ctx.currentTime + 8);
    wind.connect(windLp);
    windLp.connect(windGain);
    windGain.connect(master);
    wind.start();
    sourceNodesRef.current.push(wind);

    /* ── 3. Calming harmonic drone (A2 + E3 fifth) ── */
    ([[110, 0.018], [164.8, 0.012], [220, 0.008]] as [number, number][]).forEach(([f, v]) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = f;
      g.gain.setValueAtTime(0, ctx.currentTime);
      g.gain.linearRampToValueAtTime(v, ctx.currentTime + 3);
      osc.connect(g);
      g.connect(master);
      osc.start();
      sourceNodesRef.current.push(osc);
    });

    /* ── 4. Bird chirp scheduler — fires every 3-7 seconds ── */
    // Initial burst after 1s
    setTimeout(() => {
      if (ctxRef.current) scheduleBirds(ctxRef.current, master);
    }, 1000);

    const id = setInterval(() => {
      if (!ctxRef.current) return;
      if (Math.random() > 0.25) scheduleBirds(ctxRef.current, master);
    }, 3500 + Math.random() * 2000);
    schedulerRef.current = id;
  }, [makeNoiseBuffer, scheduleBirds]);

  const stopAudio = useCallback(() => {
    if (schedulerRef.current) {
      clearInterval(schedulerRef.current);
      schedulerRef.current = null;
    }
    if (masterRef.current && ctxRef.current) {
      masterRef.current.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 1.2);
    }
    setTimeout(() => {
      sourceNodesRef.current.forEach(n => {
        try { (n as OscillatorNode | AudioBufferSourceNode).stop?.(); } catch (_) {}
      });
      sourceNodesRef.current = [];
      ctxRef.current?.close();
      ctxRef.current = null;
    }, 1400);
  }, []);

  const toggle = () => {
    if (playing) {
      stopAudio();
      localStorage.setItem('mh-sound', 'off');
    } else {
      startAudio();
      localStorage.setItem('mh-sound', 'on');
    }
    setPlaying(p => !p);
  };

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2 }}
      className="fixed bottom-24 left-6 z-50"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Pulsing glow ring when active */}
      {playing && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-emerald-400/50"
            animate={{ scale: [1, 1.7, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-yellow-400/30"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </>
      )}

      <button
        onClick={toggle}
        className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          playing
            ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-[0_0_28px_rgba(16,185,129,0.6)]'
            : 'bg-[#161b22]/90 border border-emerald-500/40 text-emerald-400 hover:border-emerald-400 hover:shadow-[0_0_16px_rgba(16,185,129,0.3)] backdrop-blur-sm'
        }`}
        aria-label={playing ? 'Stop nature sounds' : 'Play nature ambient sounds'}
      >
        {playing ? (
          /* Animated equalizer bars */
          <div className="flex items-end gap-[2.5px] h-5 pb-0.5">
            {[3, 5, 4, 7, 4, 5, 3].map((h, i) => (
              <motion.div
                key={i}
                className="w-[2.5px] bg-white rounded-full"
                animate={{ height: [`${h * 2.5}px`, `${(h + 3) * 2.8}px`, `${h * 2.5}px`] }}
                transition={{ duration: 0.5 + i * 0.07, repeat: Infinity, ease: 'easeInOut', delay: i * 0.07 }}
              />
            ))}
          </div>
        ) : (
          /* Leaf / nature icon when off */
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M12 22c5-3 8-8 8-13A8 8 0 0 0 4 9c0 5 3 10 8 13z" />
            <path d="M12 22V12" />
            <path d="M12 12c-2-3-5-4-8-3" />
          </svg>
        )}
      </button>

      {/* Floating nature notes when playing */}
      <AnimatePresence>
        {playing && (
          <>
            {(['🍃', '♪', '🌿'] as const).map((sym, i) => (
              <motion.span
                key={`sym-${i}`}
                className="absolute text-emerald-300 pointer-events-none select-none"
                style={{ fontSize: `${9 + i * 2}px`, left: '50%' }}
                initial={{ opacity: 0, y: 0, x: '-50%' }}
                animate={{
                  opacity: [0, 0.9, 0],
                  y: -38 - i * 10,
                  x: `calc(-50% + ${(i - 1) * 16}px)`,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 1.0, ease: 'easeOut' }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Hover tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-14 top-1/2 -translate-y-1/2 bg-[#0d1117]/95 border border-emerald-500/30 px-3 py-1.5 whitespace-nowrap shadow-xl backdrop-blur-sm rounded-sm"
          >
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: playing ? '#34d399' : '#6ee7b7' }}>
              {playing ? '🌿 Nature Sounds — Playing' : '🍃 Play Nature Sounds'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
