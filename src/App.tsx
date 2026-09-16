import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Chatbot } from './components/Chatbot';
import { CanvasBackground } from './components/CanvasBackground';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B0C10] font-sans selection:bg-fuchsia-500/30 text-white flex relative overflow-x-hidden">
      {/* 240-Frame Canvas Scroll Animation Background */}
      <CanvasBackground />

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Scroll Area */}
      <main className="flex-1 lg:ml-72 min-h-screen relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 xl:px-16">
          <Hero />

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4" />
          <Stats />

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4" />
          <Skills />

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4" />
          <Projects />

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4" />
          <Education />

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4" />
          <Experience />

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4" />
          <Certifications />

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4" />
          <Contact />
        </div>
      </main>

      {/* Floating AI Assistant ("BP's AI Assistant") */}
      <Chatbot />
    </div>
  );
}
