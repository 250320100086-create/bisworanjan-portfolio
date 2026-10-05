import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const STORAGE_KEY = 'bp_portfolio_ambient_sound';

export const AmbientSoundControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const startSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 1.5); // Soft fade in
      gainRef.current = gain;

      // Soft low-frequency celestial drone
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, ctx.currentTime);

      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(110, ctx.currentTime); // A2
      osc1Ref.current = osc1;

      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(164.81, ctx.currentTime); // E3
      osc2Ref.current = osc2;

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      setIsPlaying(true);
      try { localStorage.setItem(STORAGE_KEY, 'on'); } catch {}
    } catch {
      setIsPlaying(false);
    }
  };

  const stopSound = () => {
    try {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.setValueAtTime(gainRef.current.gain.value, audioCtxRef.current.currentTime);
        gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.6);
        setTimeout(() => {
          try {
            osc1Ref.current?.stop();
            osc2Ref.current?.stop();
            audioCtxRef.current?.close();
          } catch {}
          setIsPlaying(false);
        }, 600);
      } else {
        setIsPlaying(false);
      }
      try { localStorage.setItem(STORAGE_KEY, 'off'); } catch {}
    } catch {
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopSound();
    } else {
      startSound();
    }
  };

  useEffect(() => {
    // Sound is strictly OFF by default on load to respect browser autoplay policies
    return () => {
      if (isPlaying) {
        stopSound();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      type="button"
      title="Ambient Sound adds optional background atmosphere. Sound is off by default."
      aria-label={isPlaying ? 'Ambient Sound: On (click to turn off)' : 'Ambient Sound: Off (click to turn on)'}
      className={`px-2.5 py-1.5 rounded-xl border text-xs transition-all duration-200 flex items-center gap-1.5 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 ${
        isPlaying
          ? 'bg-fuchsia-500/20 border-fuchsia-500/50 text-fuchsia-300 shadow-[0_0_12px_rgba(217,70,239,0.2)]'
          : 'bg-[#161722]/90 backdrop-blur-md border-[#2A2D3A] text-gray-400 hover:text-white hover:border-[#3A3D4E]'
      }`}
    >
      {isPlaying ? (
        <Volume2 size={13} className="text-fuchsia-400 animate-pulse flex-shrink-0" />
      ) : (
        <VolumeX size={13} className="flex-shrink-0 text-gray-400" />
      )}
      <span className="font-mono text-[10px] hidden sm:inline whitespace-nowrap">
        {isPlaying ? 'Sound: On' : 'Sound: Off'}
      </span>
    </button>
  );
};
