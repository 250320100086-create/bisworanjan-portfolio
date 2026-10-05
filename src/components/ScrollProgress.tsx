import React, { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'snapshot', label: 'Snapshot' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'tech-explorer', label: 'Tech Explorer' },
  { id: 'playground', label: 'AI Playground' },
  { id: 'github', label: 'GitHub' },
  { id: 'blog', label: 'Blog' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
  { id: 'footer-3d', label: 'Connect' },
];

export const ScrollProgress: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, percent)));

      // Detect current section
      const scrollPosition = scrollTop + 200;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].label);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Top Gradient Progress Bar */}
      <div className="w-full h-[2.5px] bg-[#161722]/50 backdrop-blur-sm">
        <div
          style={{ width: `${scrollPercent}%` }}
          className="h-full bg-gradient-to-r from-fuchsia-600 via-blue-500 to-fuchsia-500 transition-all duration-150 ease-out shadow-[0_0_8px_rgba(217,70,239,0.5)]"
        />
      </div>

      {/* Floating Active Section Badge on Top Right */}
      <div className="hidden md:flex items-center justify-end px-6 pt-2 pointer-events-none">
        <div className="bg-[#13141C]/80 border border-[#2A2D3A]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono text-gray-400 flex items-center gap-2 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse" />
          <span className="text-white font-medium">{activeSection}</span>
          <span className="text-gray-500">·</span>
          <span>{Math.round(scrollPercent)}%</span>
        </div>
      </div>
    </div>
  );
};
