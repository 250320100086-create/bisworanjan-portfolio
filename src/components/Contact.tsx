import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function Contact() {
  return (
    <section className="py-10 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">Get In Touch</h2>
            <p className="text-sm text-gray-400">I'd love to connect and collaborate on exciting projects.</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1A1C23] border border-[#2A2D3A] flex items-center justify-center text-blue-400">
                <Mail size={16} />
              </div>
              <span className="text-sm text-gray-300 font-medium">BISWORANJANPALAR@GMAIL.COM</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1A1C23] border border-[#2A2D3A] flex items-center justify-center text-blue-400">
                <Phone size={16} />
              </div>
              <span className="text-sm text-gray-300">784 899 1691</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1A1C23] border border-[#2A2D3A] flex items-center justify-center text-blue-400">
                <MapPin size={16} />
              </div>
              <span className="text-sm text-gray-300">India</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-1">
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full bg-[#13141C] border border-[#1F212A] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full bg-[#13141C] border border-[#1F212A] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <textarea 
              placeholder="Your Message" 
              rows={4}
              className="w-full bg-[#13141C] border border-[#1F212A] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            ></textarea>
            <button 
              type="button"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 text-white rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
            >
              Send Message <Send size={16} />
            </button>
          </form>
        </div>

        {/* Quote Card */}
        <div className="lg:col-span-1">
          <div className="h-full bg-gradient-to-br from-[#1A1C23] to-[#0B0C10] border border-[#2A2D3A] rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-fuchsia-500/20 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />
             
             {/* Sparkles / Stars effect approximation */}
             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50"></div>

             <div className="relative z-10">
               <span className="text-5xl text-fuchsia-500/30 font-serif leading-none block mb-4">"</span>
               <p className="text-white font-medium text-lg leading-relaxed mb-4">
                 The best way to predict the future is to invent it.
               </p>
               <p className="text-sm text-gray-400 flex items-center gap-2">
                 <span className="w-4 h-px bg-gray-500"></span> Alan Kay
               </p>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}
