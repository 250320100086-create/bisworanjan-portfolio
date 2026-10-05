import React, { useState, memo } from 'react';
import { Award, GraduationCap, Trophy, ShieldCheck, Code2, Layers, GitBranch, Terminal } from 'lucide-react';

const ACADEMIC_STATS = [
  {
    label: 'MCA CGPA',
    value: '8.16',
    subtext: 'Centurion University (2025-2027)',
    icon: GraduationCap,
    color: 'text-fuchsia-400',
    borderColor: 'border-fuchsia-500/30',
  },
  {
    label: 'B.Sc. Physics CGPA',
    value: '7.46',
    subtext: 'Utkal University (2022-2025)',
    icon: Award,
    color: 'text-blue-400',
    borderColor: 'border-blue-500/30',
  },
  {
    label: 'ML Training Score',
    value: '98%',
    subtext: 'Top Performer (Internshala)',
    icon: Trophy,
    color: 'text-yellow-400',
    borderColor: 'border-yellow-500/30',
  },
  {
    label: 'Verified Certificates',
    value: '4',
    subtext: 'Oracle, Internshala, NSDC, Scholiverse',
    icon: ShieldCheck,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
  },
];

const DEVELOPER_STATS = [
  {
    label: 'AI & ML Projects',
    value: '5+',
    subtext: 'CyberShield, Drone, Chatbot, Attendance, Heart Disease',
    icon: Code2,
    color: 'text-fuchsia-400',
    borderColor: 'border-fuchsia-500/30',
  },
  {
    label: 'Core Technologies',
    value: '15+',
    subtext: 'Python, FastAPI, Scikit-learn, SQL, React, OpenCV',
    icon: Layers,
    color: 'text-blue-400',
    borderColor: 'border-blue-500/30',
  },
  {
    label: 'Verified Certifications',
    value: '4',
    subtext: 'Oracle, Internshala (98%), NSDC, Scholiverse',
    icon: ShieldCheck,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
  },
  {
    label: 'GitHub Repositories',
    value: '5+',
    subtext: 'Open-source ML models & system architectures',
    icon: GitBranch,
    color: 'text-purple-400',
    borderColor: 'border-purple-500/30',
  },
];

export const Stats = memo(function Stats() {
  const [activeTab, setActiveTab] = useState<'academic' | 'developer'>('academic');

  const currentStats = activeTab === 'academic' ? ACADEMIC_STATS : DEVELOPER_STATS;

  return (
    <section className="py-6">
      {/* Category Toggle */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
          {activeTab === 'academic' ? 'Academic & Performance Highlights' : 'Developer & Technical Metrics'}
        </span>

        <div className="flex items-center bg-[#13141C] border border-[#2A2D3A] rounded-xl p-1 gap-1">
          <button
            onClick={() => setActiveTab('academic')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'academic'
                ? 'bg-[#1F212A] text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Academic Track
          </button>
          <button
            onClick={() => setActiveTab('developer')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'developer'
                ? 'bg-gradient-to-r from-fuchsia-600/80 to-blue-600/80 text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Terminal size={12} /> Developer Stats
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {currentStats.map((stat) => (
          <div
            key={stat.label}
            className={`bg-[#13141C] border ${stat.borderColor} rounded-2xl p-5 hover:bg-[#161722] transition-all duration-300 flex flex-col justify-between group`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-400 font-medium">{stat.label}</span>
              <div
                className={`p-2 bg-[#1A1C23] border border-[#2A2D3A] rounded-xl ${stat.color} group-hover:scale-110 transition-transform`}
              >
                <stat.icon size={18} />
              </div>
            </div>

            <div>
              <p className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-1">
                {stat.value}
              </p>
              <p className="text-[11px] text-gray-400 truncate">{stat.subtext}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

