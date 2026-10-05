import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, X, Play, Square, ArrowRight, UserCheck } from 'lucide-react';
import { analytics } from '../utils/analytics';

const WELCOME_SEEN_KEY = 'bp_welcome_seen';

export const WELCOME_SPEECH_TEXT =
  "Welcome to my portfolio. Hi, I'm Bisworanjan Palar, an AI & Machine Learning enthusiast and developer. Explore my projects, skills, experience, and journey.";

interface WelcomeVoiceExperienceProps {
  onEnter?: () => void;
}

export const WelcomeVoiceExperience: React.FC<WelcomeVoiceExperienceProps> = ({ onEnter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceAvailable, setVoiceAvailable] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      setVoiceAvailable(true);
    }

    try {
      const seen = localStorage.getItem(WELCOME_SEEN_KEY);
      if (!seen) {
        // Show welcome overlay for first-time visitors
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore
    }
  }, []);

  // Keyboard navigation (Escape or Enter to enter portfolio)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'Enter') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const speakWelcome = () => {
    if (!synthRef.current) return;

    try {
      // Cancel any ongoing speech
      synthRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(WELCOME_SPEECH_TEXT);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Pick a natural English voice if available
      const voices = synthRef.current.getVoices();
      const preferredVoice =
        voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('David') || v.name.includes('Guy'))) ||
        voices.find((v) => v.lang.startsWith('en')) ||
        voices[0];

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        setIsPlaying(true);
        analytics.track('playground_run', { model: 'welcome_voice_speech' });
      };

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
      };

      synthRef.current.speak(utterance);
    } catch (err) {
      console.warn('[Welcome Voice]', err);
      setIsPlaying(false);
    }
  };

  const stopWelcome = () => {
    if (synthRef.current) {
      try {
        synthRef.current.cancel();
      } catch {}
    }
    setIsPlaying(false);
  };

  const handleListenAndEnter = () => {
    speakWelcome();
    // After user interaction initiated voice, dismiss overlay after short delay or keep open
    markSeen();
    setIsOpen(false);
    if (onEnter) onEnter();
  };

  const handleClose = () => {
    stopWelcome();
    markSeen();
    setIsOpen(false);
    if (onEnter) onEnter();
  };

  const markSeen = () => {
    try {
      localStorage.setItem(WELCOME_SEEN_KEY, 'true');
    } catch {}
  };

  const toggleSpeechFromButton = () => {
    if (isPlaying) {
      stopWelcome();
    } else {
      speakWelcome();
    }
  };

  return (
    <>
      {/* 1. Subtle Toolbar / Replay Button (Always accessible for return visitors) */}
      <button
        onClick={toggleSpeechFromButton}
        type="button"
        title={isPlaying ? 'Stop Welcome Voice' : 'Listen to Bisworanjan Palar Welcome Message'}
        aria-label={isPlaying ? 'Stop Welcome Voice' : 'Play Welcome Voice Message'}
        className={`px-2.5 py-1.5 rounded-xl border text-xs transition-all duration-200 flex items-center gap-1.5 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 ${
          isPlaying
            ? 'bg-fuchsia-600/30 border-fuchsia-500 text-fuchsia-300 shadow-[0_0_15px_rgba(217,70,239,0.3)] animate-pulse'
            : 'bg-[#161722]/90 backdrop-blur-md border-[#2A2D3A] text-gray-300 hover:text-white hover:border-fuchsia-500/40'
        }`}
      >
        {isPlaying ? (
          <>
            <Square size={12} className="text-fuchsia-400 fill-fuchsia-400 flex-shrink-0" />
            <span className="font-mono text-[10px] hidden sm:inline whitespace-nowrap">Stop Welcome</span>
          </>
        ) : (
          <>
            <Volume2 size={13} className="text-fuchsia-400 flex-shrink-0" />
            <span className="font-mono text-[10px] hidden sm:inline whitespace-nowrap">Welcome</span>
          </>
        )}
      </button>

      {/* 2. First-Visit 3D Glassmorphism Welcome Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-modal-title"
        >
          <div className="bg-gradient-to-b from-[#181926] via-[#13141C] to-[#101118] border border-fuchsia-500/30 rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(217,70,239,0.15)] relative overflow-hidden animate-in slide-in">
            {/* Top decorative gradient glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500" />
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close welcome modal and enter portfolio"
              className="absolute top-5 right-5 p-2 rounded-xl bg-[#1A1C25] hover:bg-[#222432] border border-[#2A2D3A] text-gray-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>

            {/* Header Icon + Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-blue-500/20 border border-fuchsia-500/30 text-fuchsia-400">
                <Sparkles size={18} />
              </span>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-fuchsia-400">
                AI & Machine Learning Developer
              </span>
            </div>

            {/* Welcome Title */}
            <h2
              id="welcome-modal-title"
              className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight mb-3"
            >
              Welcome to my portfolio
            </h2>

            {/* Exact Welcome Text */}
            <p className="text-sm text-gray-300 leading-relaxed mb-6 font-normal">
              Hi, I&apos;m <strong className="text-white font-semibold">Bisworanjan Palar</strong>, an AI & Machine Learning enthusiast and developer. Explore my projects, skills, experience, and journey.
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={handleListenAndEnter}
                className="py-3 px-5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-fuchsia-500/25 transition-all transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
              >
                <Play size={16} className="fill-white" />
                <span>Listen to Welcome</span>
              </button>

              <button
                onClick={handleClose}
                className="py-3 px-5 rounded-xl bg-[#1A1C25] hover:bg-[#222432] border border-[#2A2D3A] hover:border-[#3A3D4E] text-gray-200 hover:text-white text-sm font-medium flex items-center justify-center gap-2 transition-all"
              >
                <span>Enter Portfolio</span>
                <ArrowRight size={15} className="text-gray-400" />
              </button>
            </div>

            {/* Minimal Footer Info */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#1F212A] text-[11px] text-gray-500 font-mono">
              <span>Press Enter to continue</span>
              <span>Bhubaneswar, Odisha</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
