'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const AmbientSoundPlayer: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('mh-sound');
    if (saved === 'on') {
      // Don't auto-play; user must interact first
    }
  }, []);

  const startAudio = useCallback(() => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.04, ctx.currentTime);
    masterGain.connect(ctx.destination);
    gainRef.current = masterGain;

    // Nature-inspired ambient tones — Kerala birds/water feel
    const freqs = [220, 329.6, 440, 523.3, 659.3];
    const oscs: OscillatorNode[] = [];

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      // Gentle frequency drift
      osc.frequency.linearRampToValueAtTime(freq * 1.005, ctx.currentTime + 4 + i);
      osc.frequency.linearRampToValueAtTime(freq, ctx.currentTime + 8 + i);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.015 / (i + 1), ctx.currentTime + 2);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      oscs.push(osc);
    });

    // Add some pink noise for a nature feel
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.006, ctx.currentTime);
    noise.connect(noiseGain);
    noiseGain.connect(masterGain);
    noise.start();

    oscillatorsRef.current = oscs;
  }, []);

  const stopAudio = useCallback(() => {
    oscillatorsRef.current.forEach(osc => {
      try { osc.stop(); } catch (_) {}
    });
    oscillatorsRef.current = [];
    if (gainRef.current) {
      gainRef.current.gain.linearRampToValueAtTime(0, (audioCtxRef.current?.currentTime || 0) + 0.5);
    }
    setTimeout(() => {
      audioCtxRef.current?.close();
      audioCtxRef.current = null;
    }, 600);
  }, []);

  const toggle = () => {
    if (playing) {
      stopAudio();
      localStorage.setItem('mh-sound', 'off');
    } else {
      startAudio();
      localStorage.setItem('mh-sound', 'on');
    }
    setPlaying(!playing);
  };

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2 }}
      className="fixed bottom-24 left-6 z-50"
    >
      <button
        onClick={toggle}
        className={`group relative w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          playing
            ? 'bg-yellow-400 text-black shadow-[0_0_20px_rgba(212,175,55,0.6)]'
            : 'bg-[#161b22] border border-yellow-400/30 text-yellow-400 hover:border-yellow-400'
        }`}
        aria-label={playing ? 'Mute ambient sound' : 'Play ambient sound'}
        title={playing ? 'Mute ambient sound' : 'Play ambient Kerala atmosphere'}
      >
        {playing ? (
          <div className="flex items-end gap-[2px] h-5">
            {[1, 2, 3, 4, 3].map((h, i) => (
              <motion.div
                key={i}
                className="w-[3px] bg-black rounded-full"
                animate={{ height: [`${h * 4}px`, `${(h + 2) * 4}px`, `${h * 4}px`] }}
                transition={{ duration: 0.5 + i * 0.1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
              />
            ))}
          </div>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </button>
      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute left-14 top-1/2 -translate-y-1/2 bg-[#161b22] border border-yellow-400/20 px-3 py-1 text-[10px] text-yellow-400 font-bold uppercase tracking-wider whitespace-nowrap"
          >
            Kerala Ambience ♪
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
