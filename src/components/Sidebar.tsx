import React from 'react';
import {
  Home, User, Code2, Briefcase, GraduationCap,
  Award, FileText, Mail, Download, Github, Linkedin, Twitter, Instagram, Send
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', icon: Home, active: true },
  { name: 'About', icon: User },
  { name: 'Skills', icon: Code2 },
  { name: 'Projects', icon: Briefcase },
  { name: 'Experience', icon: Briefcase }, // Reusing briefcase for experience
  { name: 'Education', icon: GraduationCap },
  { name: 'Certifications', icon: Award },
  { name: 'Blog', icon: FileText },
  { name: 'Contact', icon: Mail },
];

export function Sidebar() {
  return (
    <aside className="w-64 md:w-72 h-screen flex-shrink-0 bg-[#0B0C10] border-r border-[#1F212A] flex flex-col fixed left-0 top-0 overflow-y-auto hidden lg:flex custom-scrollbar">
      {/* Logo Area */}
      <div className="p-8">
        <div className="flex items-center gap-1 mb-2">
          <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-blue-500 tracking-tighter">
            BP
          </span>
        </div>
        <h1 className="text-xl font-semibold text-white tracking-wide">Bisworanjan<br/>Palar</h1>
        <p className="text-sm text-gray-400 mt-1">AI & ML Enthusiast</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.name}
            href={`#${item.name.toLowerCase()}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              item.active 
                ? 'bg-[#1A1C23] text-white border border-[#2A2D3A]' 
                : 'text-gray-400 hover:text-white hover:bg-[#1A1C23]/50'
            }`}
          >
            <item.icon size={20} className={item.active ? 'text-fuchsia-500' : ''} />
            <span className="font-medium text-sm">{item.name}</span>
          </a>
        ))}
      </nav>

      {/* Promo Box */}
      <div className="p-6 mt-4">
        <div className="bg-gradient-to-br from-[#1A1C23] to-[#0B0C10] border border-[#2A2D3A] rounded-2xl p-5 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />
          
          <h3 className="text-white font-semibold mb-2 relative z-10 text-lg">
            Let's <span className="text-blue-400">Build</span><br/>The Future<br/>Together!
          </h3>
          <p className="text-xs text-gray-400 mb-4 relative z-10">
            I'm open to internship<br/>and full-time opportunities.
          </p>
          <button className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 relative z-10">
            Hire Me <Send size={14} />
          </button>
        </div>
      </div>

      {/* Download CV */}
      <div className="px-6 pb-6">
        <button className="w-full py-3 px-4 border border-[#2A2D3A] hover:bg-[#1A1C23] text-white rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2">
          Download CV <Download size={16} />
        </button>
      </div>

      {/* Social & Footer */}
      <div className="px-6 pb-8">
        <p className="text-xs text-gray-400 mb-3 font-medium">Connect with me</p>
        <div className="flex items-center gap-4 text-gray-400">
          <a href="#" className="hover:text-white transition-colors p-2 bg-[#1A1C23] rounded-full"><Github size={18} /></a>
          <a href="#" className="hover:text-white transition-colors p-2 bg-[#1A1C23] rounded-full"><Linkedin size={18} /></a>
          <a href="#" className="hover:text-white transition-colors p-2 bg-[#1A1C23] rounded-full"><Twitter size={18} /></a>
          <a href="#" className="hover:text-white transition-colors p-2 bg-[#1A1C23] rounded-full"><Instagram size={18} /></a>
        </div>
        
        {/* Decorative waves background simulation */}
        <div className="mt-8 h-32 w-full opacity-30 relative overflow-hidden rounded-xl border border-[#1F212A]">
           {/* Simple wavy pattern approximation using gradients */}
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0B0C10] to-[#0B0C10] opacity-50 blur-xl"></div>
           <svg className="absolute w-[200%] h-full top-0 left-0 text-blue-500/20" fill="none" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0,50 Q25,20 50,50 T100,50 T150,50" stroke="currentColor" strokeWidth="1" />
             <path d="M0,60 Q25,30 50,60 T100,60 T150,60" stroke="currentColor" strokeWidth="1" />
             <path d="M0,70 Q25,40 50,70 T100,70 T150,70" stroke="currentColor" strokeWidth="1" />
             <path d="M0,80 Q25,50 50,80 T100,80 T150,80" stroke="currentColor" strokeWidth="1" />
           </svg>
        </div>

        <div className="mt-6 text-[10px] text-gray-500 space-y-1">
          <p>© 2025 Bisworanjan Palar</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </aside>
  );
}
