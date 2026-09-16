import React from 'react';
import { Terminal, BrainCircuit, Network, BarChart3, Database, PieChart } from 'lucide-react';

const SKILLS = [
  { name: 'Python', percentage: 90, icon: Terminal, color: 'from-yellow-400 to-yellow-600' },
  { name: 'Machine Learning', percentage: 90, icon: BrainCircuit, color: 'from-pink-500 to-fuchsia-600' },
  { name: 'Deep Learning', percentage: 85, icon: Network, color: 'from-blue-500 to-indigo-600' },
  { name: 'Data Analysis', percentage: 85, icon: BarChart3, color: 'from-orange-400 to-red-500' },
  { name: 'SQL & Databases', percentage: 80, icon: Database, color: 'from-teal-400 to-emerald-600' },
  { name: 'Data Visualization', percentage: 80, icon: PieChart, color: 'from-purple-400 to-indigo-500' },
];

export function Skills() {
  return (
    <section className="py-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-white">My Skills</h2>
        <button className="px-4 py-2 border border-[#2A2D3A] bg-[#13141C] hover:bg-[#1A1C23] text-gray-300 rounded-lg text-sm transition-colors">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SKILLS.map((skill) => (
          <div key={skill.name} className="bg-[#13141C] border border-[#1F212A] rounded-2xl p-5 hover:border-[#2A2D3A] transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2.5 bg-[#1A1C23] rounded-lg text-blue-400 border border-[#2A2D3A]">
                <skill.icon size={20} />
              </div>
              <h3 className="text-white font-medium flex-1">{skill.name}</h3>
              <span className="text-xs font-semibold text-gray-400">{skill.percentage}%</span>
            </div>
            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-[#1A1C23] rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                style={{ width: `${skill.percentage}%` }}
              >
                {/* Glow effect at the end of the bar */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white/20 blur-sm rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
