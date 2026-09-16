import React from 'react';
import { GraduationCap, CheckCircle2, Cpu, ShieldCheck, PieChart, Repeat } from 'lucide-react';

export function Education() {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-semibold text-white mb-8">Education</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Education Card */}
        <div className="lg:col-span-2 bg-[#13141C] border border-[#1F212A] rounded-2xl p-6 flex flex-col sm:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-[#1A1C23] border border-[#2A2D3A] flex items-center justify-center">
              <GraduationCap size={28} className="text-blue-400" />
            </div>
          </div>
          
          <div className="flex-1 relative">
            {/* Timeline dot */}
            <div className="hidden sm:block absolute -left-[2.1rem] top-3 w-2 h-2 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.8)]"></div>
            
            <h3 className="text-lg font-semibold text-white mb-1">Master of Computer Applications (MCA)</h3>
            <p className="text-sm text-gray-400 mb-3">Centurion University of Technology and Management</p>
            
            <div className="flex items-center gap-3 text-xs text-gray-500 font-medium mb-4">
              <span>2024 – 2026</span>
              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              <span className="text-blue-400">Pursuing</span>
            </div>
            
            <p className="text-sm text-gray-400">
              Specialization: <span className="text-gray-300">Artificial Intelligence & Machine Learning</span>
            </p>
          </div>
        </div>

        {/* Courses Card */}
        <div className="bg-[#13141C] border border-[#1F212A] rounded-2xl p-6">
          <h3 className="text-base font-semibold text-white mb-4">Relevant Courses</h3>
          <ul className="space-y-3">
            {['Machine Learning', 'Deep Learning', 'Data Science', 'Natural Language Processing', 'Computer Vision'].map((course) => (
              <li key={course} className="flex items-center gap-3 text-sm text-gray-400">
                <CheckCircle2 size={14} className="text-fuchsia-500 flex-shrink-0" />
                {course}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Attributes Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-[#13141C] border border-[#1F212A] rounded-2xl p-5 flex items-center gap-4">
           <div className="p-2.5 rounded-xl bg-yellow-500/10 text-yellow-500">
             <Cpu size={24} />
           </div>
           <div>
             <h4 className="text-sm font-semibold text-white mb-0.5">AI/ML</h4>
             <p className="text-[11px] text-gray-400">Passionate Learner</p>
           </div>
        </div>
        <div className="bg-[#13141C] border border-[#1F212A] rounded-2xl p-5 flex items-center gap-4">
           <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
             <ShieldCheck size={24} />
           </div>
           <div>
             <h4 className="text-sm font-semibold text-white mb-0.5">Problem Solving</h4>
             <p className="text-[11px] text-gray-400">DSA & Algorithms</p>
           </div>
        </div>
        <div className="bg-[#13141C] border border-[#1F212A] rounded-2xl p-5 flex items-center gap-4">
           <div className="p-2.5 rounded-xl bg-fuchsia-500/10 text-fuchsia-500">
             <PieChart size={24} />
           </div>
           <div>
             <h4 className="text-sm font-semibold text-white mb-0.5">Data Driven</h4>
             <p className="text-[11px] text-gray-400">Insights & Analytics</p>
           </div>
        </div>
        <div className="bg-[#13141C] border border-[#1F212A] rounded-2xl p-5 flex items-center gap-4">
           <div className="p-2.5 rounded-xl bg-green-500/10 text-green-500">
             <Repeat size={24} />
           </div>
           <div>
             <h4 className="text-sm font-semibold text-white mb-0.5">Continuous Learning</h4>
             <p className="text-[11px] text-gray-400">Staying Ahead</p>
           </div>
        </div>
      </div>
    </section>
  );
}
