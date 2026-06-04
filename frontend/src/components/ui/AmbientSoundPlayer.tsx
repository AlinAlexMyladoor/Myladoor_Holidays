'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── YouTube Ambient Music Player ─────────────────────────────────────────
   Plays the requested YouTube song (DGQwd1_dpuc) in a hidden iframe.
   Uses YouTube IFrame API for play/pause control.
─────────────────────────────────────────────────────────────────────────── */

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const YT_VIDEO_ID = 'DGQwd1_dpuc';

export const AmbientSoundPlayer: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [ready, setReady] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }

    const initPlayer = () => {
      if (!containerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: YT_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: YT_VIDEO_ID,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: () => setReady(true),
          onError: () => setReady(false),
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      playerRef.current?.destroy?.();
    };
  }, []);

  const toggle = () => {
    if (!playerRef.current) return;
    if (playing) {
      playerRef.current.pauseVideo?.();
      localStorage.setItem('mh-sound', 'off');
    } else {
      playerRef.current.playVideo?.();
      localStorage.setItem('mh-sound', 'on');
    }
    setPlaying(p => !p);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Hidden YouTube player container */}
      <div className="fixed" style={{ width: 1, height: 1, opacity: 0, pointerEvents: 'none', position: 'fixed', bottom: -100, left: -100 }}>
        <div ref={containerRef} />
      </div>

      {/* Visible control button */}
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
              className="absolute inset-0 rounded-full border-2 border-yellow-400/50"
              animate={{ scale: [1, 1.7, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-emerald-400/30"
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
          </>
        )}

        <button
          onClick={toggle}
          disabled={!ready && !playing}
          className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
            playing
              ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-black shadow-[0_0_28px_rgba(212,175,55,0.65)]'
              : 'bg-[#161b22]/90 border border-yellow-400/40 text-yellow-400 hover:border-yellow-400 hover:shadow-[0_0_16px_rgba(212,175,55,0.3)] backdrop-blur-sm disabled:opacity-50'
          }`}
          aria-label={playing ? 'Pause music' : 'Play music'}
        >
          {playing ? (
            <div className="flex items-end gap-[2.5px] h-5 pb-0.5">
              {[3, 5, 4, 7, 4, 5, 3].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-[2.5px] bg-black rounded-full"
                  animate={{ height: [`${h * 2.5}px`, `${(h + 3) * 2.8}px`, `${h * 2.5}px`] }}
                  transition={{ duration: 0.5 + i * 0.07, repeat: Infinity, ease: 'easeInOut', delay: i * 0.07 }}
                />
              ))}
            </div>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="6" cy="18" r="3" fill="currentColor"/>
              <circle cx="18" cy="16" r="3" fill="currentColor"/>
            </svg>
          )}
        </button>

        {/* Floating notes */}
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
              className="absolute left-14 top-1/2 -translate-y-1/2 bg-[#161b22]/95 border border-yellow-400/30 px-3 py-1.5 whitespace-nowrap shadow-xl backdrop-blur-sm rounded-sm"
            >
              <p className="text-[10px] text-yellow-400 font-bold uppercase tracking-wider">
                {playing ? '♪ Playing — Click to pause' : !ready ? 'Loading…' : '♪ Play Music'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
