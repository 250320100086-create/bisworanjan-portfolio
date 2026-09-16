import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Chatbot } from './components/Chatbot';
import { Certifications } from './components/Certifications';
import { Experience } from './components/Experience';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B0C10] font-sans selection:bg-fuchsia-500/30 text-white flex">
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 min-h-screen">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 xl:px-16">
          <Hero />
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4"></div>
          <Stats />
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4"></div>
          <Skills />
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4"></div>
          <Projects />

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4"></div>
          <Experience />
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4"></div>
          <Certifications />
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4"></div>
          <Education />
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4"></div>
          <Contact />
        </div>
      </main>

      {/* Floating AI Chatbot */}
      <Chatbot />
    </div>
  );
}
