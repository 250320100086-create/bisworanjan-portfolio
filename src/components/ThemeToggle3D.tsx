import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const STORAGE_KEY = 'bp_portfolio_theme';

export const ThemeToggle3D: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as 'dark' | 'light' | null;
      if (saved === 'light' || saved === 'dark') {
        setTheme(saved);
        applyTheme(saved);
      } else {
        // Dark theme is strictly the default
        applyTheme('dark');
      }
    } catch {
      applyTheme('dark');
    }
  }, []);

  const applyTheme = (t: 'dark' | 'light') => {
    const root = document.documentElement;
    if (t === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    applyTheme(nextTheme);
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Ignore
    }
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Toggle theme (${theme === 'dark' ? 'Light' : 'Dark'} mode)`}
      className="relative group p-2 rounded-xl bg-[#161722] border border-[#2A2D3A] hover:border-fuchsia-500/40 text-gray-300 hover:text-white transition-all duration-200 flex items-center gap-1.5 text-xs shadow-sm hover:shadow-[0_0_15px_rgba(217,70,239,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <Sun
          size={14}
          className={`absolute text-amber-400 transition-all duration-300 transform ${
            theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
          }`}
        />
        <Moon
          size={14}
          className={`absolute text-fuchsia-400 transition-all duration-300 transform ${
            theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
      <span className="font-mono text-[10px] text-gray-400 group-hover:text-gray-200 hidden sm:inline">
        {theme === 'dark' ? 'Dark' : 'Light'}
      </span>
    </button>
  );
};
