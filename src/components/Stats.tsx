import React from 'react';
import { FolderGit2, Award, TrendingUp, Code2 } from 'lucide-react';

const STATS = [
  { icon: FolderGit2, value: '10+', label: 'Projects Completed', color: 'text-fuchsia-500', bg: 'bg-fuchsia-500/10' },
  { icon: Award, value: '5+', label: 'Certifications', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { icon: TrendingUp, value: '3+', label: 'Years Learning', color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { icon: Code2, value: '100+', label: 'Problems Solved', color: 'text-fuchsia-400', bg: 'bg-fuchsia-400/10' },
];

export function Stats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-8">
      {STATS.map((stat, i) => (
        <div key={i} className="flex items-center gap-4 bg-[#13141C] border border-[#1F212A] rounded-2xl p-5 hover:bg-[#1A1C23] transition-colors">
          <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
            <stat.icon size={24} />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white">{stat.value}</h3>
            <p className="text-xs md:text-sm text-gray-400">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
