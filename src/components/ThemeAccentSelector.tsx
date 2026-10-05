import React, { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';

export type AccentColor = 'fuchsia' | 'blue' | 'cyan' | 'magenta';

const ACCENTS: { id: AccentColor; name: string; tooltip: string; hex: string }[] = [
  { id: 'fuchsia', name: 'Purple', tooltip: 'Purple Accent (Default)', hex: '#d946ef' },
  { id: 'blue', name: 'Blue', tooltip: 'Blue Accent', hex: '#3b82f6' },
  { id: 'cyan', name: 'Cyan', tooltip: 'Cyan Accent', hex: '#06b6d4' },
  { id: 'magenta', name: 'Pink', tooltip: 'Pink Accent', hex: '#ec4899' },
];

const STORAGE_KEY = 'bp_portfolio_accent_color';

export const ThemeAccentSelector: React.FC = () => {
  const [currentAccent, setCurrentAccent] = useState<AccentColor>('fuchsia');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as AccentColor | null;
      if (saved && ['fuchsia', 'blue', 'cyan', 'magenta'].includes(saved)) {
        setCurrentAccent(saved);
        applyAccent(saved);
      }
    } catch {
      // Ignore
    }
  }, []);

  const applyAccent = (accent: AccentColor) => {
    const root = document.documentElement;
    if (accent === 'blue') {
      root.style.setProperty('--user-accent-primary', '#3b82f6');
      root.style.setProperty('--user-accent-glow', 'rgba(59, 130, 246, 0.4)');
    } else if (accent === 'cyan') {
      root.style.setProperty('--user-accent-primary', '#06b6d4');
      root.style.setProperty('--user-accent-glow', 'rgba(6, 182, 212, 0.4)');
    } else if (accent === 'magenta') {
      root.style.setProperty('--user-accent-primary', '#ec4899');
      root.style.setProperty('--user-accent-glow', 'rgba(236, 72, 153, 0.4)');
    } else {
      root.style.removeProperty('--user-accent-primary');
      root.style.removeProperty('--user-accent-glow');
    }
  };

  const handleSelect = (accent: AccentColor) => {
    setCurrentAccent(accent);
    applyAccent(accent);
    try {
      localStorage.setItem(STORAGE_KEY, accent);
    } catch {
      // Ignore
    }
  };

  return (
    <div
      title="Accent Color Selector (changes highlights only, preserves portfolio layout)"
      className="flex items-center gap-1.5 bg-[#161722]/90 backdrop-blur-md border border-[#2A2D3A] px-2.5 py-1.5 rounded-xl shadow-sm hover:border-[#3A3D4E] transition-colors"
    >
      <Palette size={13} className="text-gray-400 mr-0.5 flex-shrink-0" />
      <div className="flex items-center gap-1.5">
        {ACCENTS.map((acc) => (
          <button
            key={acc.id}
            onClick={() => handleSelect(acc.id)}
            title={acc.tooltip}
            aria-label={acc.tooltip}
            style={{ backgroundColor: acc.hex }}
            className={`w-3.5 h-3.5 rounded-full transition-all flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              currentAccent === acc.id
                ? 'scale-125 ring-2 ring-white shadow-sm'
                : 'opacity-70 hover:opacity-100 hover:scale-110'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
