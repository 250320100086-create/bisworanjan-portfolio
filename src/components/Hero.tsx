import React from 'react';
import { Send, Download, ArrowRight } from 'lucide-react';
import profileImage from "../assets/images/profile.jpg.jpeg"

export function Hero() {
  return (
    <div className="relative pt-8 pb-16">
      {/* Top Navbar */}
      <header className="flex items-center justify-between mb-16 hidden md:flex">
        <nav className="flex items-center gap-8 text-sm font-medium">
          <a href="#" className="text-white relative">
            Home
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-fuchsia-500 rounded-full"></span>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">About</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Skills</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Projects</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Experience</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Education</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
        </nav>
        <button className="py-2.5 px-5 bg-[#1A1C23] border border-[#2A2D3A] hover:bg-[#222530] text-white rounded-xl text-sm font-medium transition-all flex items-center gap-2">
          Let's Talk <Send size={14} className="text-gray-400" />
        </button>
      </header>

      {/* Hero Content */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">

        {/* Left Text Content */}
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-medium text-white">Hello, I'm</h2>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500">
                Bisworanjan
              </span>
              <br />
              Palar
            </h1>
            <h3 className="text-2xl md:text-3xl text-gray-300 font-medium mt-4">
              AI & Machine Learning <span className="text-fuchsia-400">Student</span>
            </h3>
          </div>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg">
            Passionate about building intelligent systems and solving real-world problems with data, models and code.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button className="py-3 px-6 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 text-white rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg shadow-purple-500/20">
              View My Work <ArrowRight size={18} />
            </button>
            <button className="py-3 px-6 border border-[#2A2D3A] bg-[#13141C] hover:bg-[#1A1C23] text-white rounded-xl font-medium transition-all flex items-center gap-2">
              Download CV <Download size={18} />
            </button>
          </div>

          <div className="pt-8 space-y-3">
            <p className="text-sm text-gray-400">Technologies I Work With</p>
            <div className="flex flex-wrap items-center gap-3">
              {['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'Pandas'].map((tech, i) => (
                <div key={tech} className="flex items-center gap-2 px-3 py-1.5 bg-[#13141C] border border-[#1F212A] rounded-lg text-sm text-gray-300">
                  {/* Generic colored dot as pseudo-icon */}
                  <span className={`w-2 h-2 rounded-full ${['bg-blue-400', 'bg-orange-400', 'bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-purple-500'][i % 6]
                    }`}></span>
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 relative flex justify-center lg:justify-end">
          {/* Glowing Background Rings */}
          <div className="absolute inset-0 max-w-md mx-auto flex items-center justify-center pointer-events-none">
            <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border border-blue-500/20 absolute animate-spin-slow"></div>
            <div className="w-[250px] h-[250px] md:w-[380px] md:h-[380px] rounded-full border border-purple-500/20 absolute -rotate-45"></div>
            <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-gradient-to-tr from-blue-600/30 via-purple-600/30 to-fuchsia-600/30 rounded-full blur-[80px] absolute"></div>
          </div>

          {/* Main Subject Image - Using a placeholder that fits the vibe */}
          <div className="relative z-10 w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-2 border-transparent bg-gradient-to-b from-transparent to-[#0B0C10]">
            {/* Note: In a real app, this would be the actual image. Using an Unsplash placeholder of a man in sunglasses with a dark background to mimic the provided design. */}
            <img
              src={profileImage}
              alt="Bisworanjan Palar"
              className="w-full h-full object-cover object-top mix-blend-luminosity hover:mix-blend-normal transition-all duration-500 opacity-90"
            />
            {/* Gradient overlay to blend bottom */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0B0C10] to-transparent"></div>
          </div>
        </div>

      </div>
    </div>
  );
}
