import React from 'react';
import {
  Home, Code2, Briefcase, GraduationCap,
  Award, Mail, Download, Github, Linkedin, Instagram, Send, Cpu
} from 'lucide-react';
import { GITHUB_URL, LINKEDIN_URL, INSTAGRAM_URL } from './Hero';

const NAV_ITEMS = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'Skills', href: '#skills', icon: Code2 },
  { name: 'Projects', href: '#projects', icon: Briefcase },
  { name: 'Education', href: '#education', icon: GraduationCap },
  { name: 'Experience', href: '#experience', icon: Cpu },
  { name: 'Certifications', href: '#certifications', icon: Award },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export function Sidebar() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside className="w-64 md:w-72 h-screen flex-shrink-0 bg-[#0B0C10]/95 backdrop-blur-md border-r border-[#1F212A] flex flex-col fixed left-0 top-0 overflow-y-auto hidden lg:flex custom-scrollbar z-30">
      {/* Logo Area */}
      <div className="p-8 pb-6">
        <div className="flex items-center gap-1 mb-2">
          <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-blue-500 tracking-tighter">
            BP
          </span>
        </div>
        <h1 className="text-xl font-semibold text-white tracking-wide">Bisworanjan<br />Palar</h1>
        <p className="text-xs text-gray-400 mt-1">AI & ML Developer</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-400 hover:text-white hover:bg-[#1A1C23]"
          >
            <item.icon size={18} className="text-fuchsia-500/80" />
            <span className="font-medium text-sm">{item.name}</span>
          </a>
        ))}
      </nav>

      {/* Hire Me CTA */}
      <div className="p-6 pt-2">
        <div className="bg-gradient-to-br from-[#1A1C23] to-[#0B0C10] border border-[#2A2D3A] rounded-2xl p-5 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />

          <h3 className="text-white font-semibold mb-2 relative z-10 text-base">
            Let's <span className="text-fuchsia-400">Build</span> AI Solutions!
          </h3>
          <p className="text-xs text-gray-400 mb-4 relative z-10">
            Open to AI/ML engineering roles & collaborations.
          </p>
          <button
            onClick={scrollToContact}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 text-white rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-2 relative z-10"
          >
            Get In Touch <Send size={13} />
          </button>
        </div>
      </div>

      {/* Download Resume Button */}
      <div className="px-6 pb-4">
        <a
          href="/resume.pdf"
          download="Bisworanjan_Palar_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download Resume PDF"
          className="w-full py-3 px-4 border border-[#2A2D3A] bg-[#13141C] hover:bg-[#1A1C23] hover:border-fuchsia-500/40 text-white rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-2 group"
        >
          Download Resume <Download size={14} className="text-fuchsia-400 transition-transform group-hover:translate-y-0.5" />
        </a>
      </div>

      {/* Social Links & Footer */}
      <div className="px-6 pb-8">
        <p className="text-xs text-gray-400 mb-3 font-medium">Connect with me</p>
        <div className="flex items-center gap-2.5 text-gray-400">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-[#1A1C23] border border-[#2A2D3A] rounded-xl hover:text-white hover:border-fuchsia-500/50 transition-colors"
            title="GitHub"
            aria-label="GitHub Profile"
          >
            <Github size={16} />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-[#1A1C23] border border-[#2A2D3A] rounded-xl hover:text-white hover:border-blue-500/50 transition-colors"
            title="LinkedIn"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-[#1A1C23] border border-[#2A2D3A] rounded-xl hover:text-white hover:border-pink-500/50 transition-colors"
            title="Instagram"
            aria-label="Instagram Profile"
          >
            <Instagram size={16} />
          </a>
          <a
            href={`mailto:bisworanjanpalar@gmail.com`}
            className="p-2.5 bg-[#1A1C23] border border-[#2A2D3A] rounded-xl hover:text-white hover:border-purple-500/50 transition-colors"
            title="Email"
            aria-label="Email Bisworanjan"
          >
            <Mail size={16} />
          </a>
        </div>

        <div className="mt-6 text-[10px] text-gray-500 space-y-1">
          <p>© 2026 Bisworanjan Palar</p>
          <p>Bhubaneswar, Odisha, India</p>
        </div>
      </div>
    </aside>
  );
}
