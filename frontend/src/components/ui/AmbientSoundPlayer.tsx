'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const AmbientSoundPlayer: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const startAudio = useCallback(() => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const masterGain = ctx.createGain();
    // Raise gain significantly so it's actually audible
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 1.5);
    masterGain.connect(ctx.destination);
    gainRef.current = masterGain;

    // Calming pentatonic chord — A minor feel
    const freqs = [220, 261.6, 329.6, 392, 440, 523.3];
    const oscs: OscillatorNode[] = [];

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      // Gentle vibrato
      osc.frequency.linearRampToValueAtTime(freq * 1.003, ctx.currentTime + 3 + i * 0.5);
      osc.frequency.linearRampToValueAtTime(freq, ctx.currentTime + 6 + i * 0.5);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.04 / (i * 0.4 + 1), ctx.currentTime + 1.5);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      oscs.push(osc);
    });

    // Soft pink noise for atmosphere
    const bufferSize = ctx.sampleRate * 4;
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
    noiseGain.gain.setValueAtTime(0.018, ctx.currentTime);
    noise.connect(noiseGain);
    noiseGain.connect(masterGain);
    noise.start();

    oscillatorsRef.current = oscs;
  }, []);

  const stopAudio = useCallback(() => {
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 0.8);
    }
    setTimeout(() => {
      oscillatorsRef.current.forEach(osc => {
        try { osc.stop(); } catch (_) {}
      });
      oscillatorsRef.current = [];
      audioCtxRef.current?.close();
      audioCtxRef.current = null;
    }, 900);
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
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Pulsing ring when playing */}
      {playing && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-yellow-400/50"
          animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <button
        onClick={toggle}
        className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          playing
            ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-black shadow-[0_0_24px_rgba(212,175,55,0.7)]'
            : 'bg-[#161b22]/90 border border-yellow-400/40 text-yellow-400 hover:border-yellow-400 hover:shadow-[0_0_16px_rgba(212,175,55,0.3)] backdrop-blur-sm'
        }`}
        aria-label={playing ? 'Mute ambient sound' : 'Play ambient sound'}
      >
        {playing ? (
          /* Animated equalizer bars */
          <div className="flex items-end gap-[2.5px] h-5 pb-0.5">
            {[3, 5, 4, 6, 3].map((h, i) => (
              <motion.div
                key={i}
                className="w-[3px] bg-black rounded-full"
                animate={{ height: [`${h * 3}px`, `${(h + 3) * 3}px`, `${h * 3}px`] }}
                transition={{ duration: 0.45 + i * 0.08, repeat: Infinity, ease: 'easeInOut', delay: i * 0.08 }}
              />
            ))}
          </div>
        ) : (
          /* Music note icon when off */
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="6" cy="18" r="3" fill="currentColor"/>
            <circle cx="18" cy="16" r="3" fill="currentColor"/>
          </svg>
        )}
      </button>

      {/* Floating music notes when playing */}
      <AnimatePresence>
        {playing && (
          <>
            {['♪', '♫', '♩'].map((note, i) => (
              <motion.span
                key={`note-${i}`}
                className="absolute text-yellow-400 font-bold pointer-events-none select-none"
                style={{ fontSize: `${10 + i * 2}px`, left: '50%' }}
                initial={{ opacity: 0, y: 0, x: '-50%', scale: 0.5 }}
                animate={{ opacity: [0, 1, 0], y: -40 - i * 12, x: `calc(-50% + ${(i - 1) * 14}px)`, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-14 top-1/2 -translate-y-1/2 bg-[#161b22] border border-yellow-400/30 px-3 py-1.5 whitespace-nowrap shadow-xl backdrop-blur-sm"
          >
            <p className="text-[10px] text-yellow-400 font-bold uppercase tracking-wider">
              {playing ? '♪ Kerala Ambience — Playing' : 'Play Ambient Sound'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
