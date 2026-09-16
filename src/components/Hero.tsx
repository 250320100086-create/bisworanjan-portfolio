import React, { useRef } from 'react';
import { Send, Download, ArrowRight, MapPin, Mail, Github, Linkedin, Instagram } from "lucide-react";
import profilePhoto from "./assets/images/profile.jpg";

export const INSTAGRAM_URL = "https://www.instagram.com/s1punn._/?__pwa=1";
export const GITHUB_URL = "https://github.com/250320100086-create";
export const LINKEDIN_URL = "https://www.linkedin.com/in/bisworanjan-palar";
export const EMAIL_ADDRESS = "bisworanjanpalar@gmail.com";

export function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 16;
    const rotateX = -((y / rect.height) - 0.5) * 16;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    card.style.boxShadow = "0 25px 60px rgba(217, 70, 239, 0.35)";
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.boxShadow = "0 15px 35px rgba(217, 70, 239, 0.2)";
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="home" className="relative pt-6 pb-16">
      {/* Navigation Header */}
      <header className="items-center justify-between mb-12 max-md:hidden flex bg-[#13141C]/80 border border-[#1F212A] rounded-2xl px-6 py-3.5 backdrop-blur-md sticky top-4 z-40">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-blue-500 tracking-tighter">
            BP
          </span>
          <span className="text-xs text-gray-400 font-medium pl-2 border-l border-[#2A2D3A]">
            Bisworanjan Palar
          </span>
        </div>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <a href="#home" className="text-white hover:text-fuchsia-400 transition-colors">Home</a>
          <a href="#skills" className="text-gray-400 hover:text-white transition-colors">Skills</a>
          <a href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</a>
          <a href="#education" className="text-gray-400 hover:text-white transition-colors">Education</a>
          <a href="#experience" className="text-gray-400 hover:text-white transition-colors">Experience</a>
          <a href="#certifications" className="text-gray-400 hover:text-white transition-colors">Certifications</a>
          <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
        </nav>

        <button
          onClick={scrollToContact}
          className="py-2 px-4 bg-[#1A1C23] border border-[#2A2D3A] hover:bg-fuchsia-600/20 hover:border-fuchsia-500/50 text-white rounded-xl text-xs font-medium transition-all flex items-center gap-2 group"
        >
          Let's Talk <Send size={13} className="text-fuchsia-400 transition-transform group-hover:translate-x-0.5" />
        </button>
      </header>

      {/* Hero Grid */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 pt-4">

        {/* Left Column */}
        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#13141C] border border-[#2A2D3A] text-xs text-gray-300">
              <MapPin size={13} className="text-fuchsia-400" />
              <span>Bhubaneswar, Odisha, India</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500">
                Bisworanjan
              </span>
              <br />
              Palar
            </h1>

            <h2 className="text-xl md:text-2xl text-gray-300 font-medium pt-1">
              AI & Machine Learning <span className="text-fuchsia-400 font-semibold">Developer</span>
            </h2>
          </div>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl">
            MCA candidate at Centurion University specializing in Artificial Intelligence & Machine Learning. Passionate about building predictive models, computer vision systems, backend APIs, and data-driven solutions.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={scrollToProjects}
              className="py-3 px-6 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 text-white rounded-xl text-sm font-medium transition-all flex items-center gap-2 shadow-lg shadow-fuchsia-500/20 group hover:scale-[1.02] active:scale-[0.98]"
            >
              View My Work <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="/resume.pdf"
              download="Bisworanjan_Palar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Resume PDF"
              className="py-3 px-6 border border-[#2A2D3A] bg-[#13141C] hover:bg-[#1A1C23] hover:border-fuchsia-500/40 text-white rounded-xl text-sm font-medium transition-all flex items-center gap-2 group hover:scale-[1.02] active:scale-[0.98]"
            >
              Download Resume <Download size={16} className="text-fuchsia-400 transition-transform group-hover:translate-y-0.5" />
            </a>

            <button
              onClick={scrollToContact}
              className="py-3 px-6 border border-[#2A2D3A] bg-[#13141C] hover:bg-[#1A1C23] text-gray-300 hover:text-white rounded-xl text-sm font-medium transition-all flex items-center gap-2"
            >
              Get In Touch <Send size={15} />
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-[#13141C] border border-[#1F212A] hover:border-fuchsia-500/50 hover:text-fuchsia-400 rounded-xl text-gray-400 transition-colors"
              title="GitHub"
              aria-label="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-[#13141C] border border-[#1F212A] hover:border-blue-500/50 hover:text-blue-400 rounded-xl text-gray-400 transition-colors"
              title="LinkedIn"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="p-2.5 bg-[#13141C] border border-[#1F212A] hover:border-purple-500/50 hover:text-purple-400 rounded-xl text-gray-400 transition-colors"
              title="Email"
              aria-label="Email Bisworanjan"
            >
              <Mail size={18} />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-[#13141C] border border-[#1F212A] hover:border-pink-500/50 hover:text-pink-400 rounded-xl text-gray-400 transition-colors"
              title="Instagram"
              aria-label="Instagram Profile"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* Right Column: Actual Profile Photo */}
        <div className="flex-1 relative flex justify-center lg:justify-end">
          <div className="absolute inset-0 max-w-md mx-auto flex items-center justify-center pointer-events-none">
            <div className="w-[280px] h-[280px] md:w-[420px] md:h-[420px] rounded-full border border-blue-500/20 absolute animate-spin-slow" />
            <div className="w-[230px] h-[230px] md:w-[350px] md:h-[350px] rounded-full border border-fuchsia-500/20 absolute -rotate-45" />
            <div className="w-[180px] h-[180px] md:w-[280px] md:h-[280px] bg-gradient-to-tr from-fuchsia-600/30 via-purple-600/30 to-blue-600/30 rounded-full blur-[70px] absolute" />
          </div>

          <div
            ref={cardRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="group relative z-10 w-[270px] h-[270px] md:w-[390px] md:h-[390px] rounded-3xl overflow-hidden border-2 border-fuchsia-500/40 bg-[#13141C] transition-all duration-200 cursor-pointer shadow-2xl"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500 opacity-30 blur-xl scale-105 -z-10" />

            <img
              src={profilePhoto}
              alt="Bisworanjan Palar"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0B0C10] via-[#0B0C10]/30 to-transparent" />
          </div>
        </div>

      </div>
    </div>
  );
}
