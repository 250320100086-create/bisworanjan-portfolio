import React, { memo } from 'react';
import { Award, GraduationCap, Trophy, ShieldCheck } from 'lucide-react';

const STATS = [
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

export const Stats = memo(function Stats() {
  return (
    <section className="py-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className={`bg-[#13141C] border ${stat.borderColor} rounded-2xl p-5 hover:bg-[#161722] transition-all duration-300 flex flex-col justify-between group`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-400 font-medium">{stat.label}</span>
              <div className={`p-2 bg-[#1A1C23] border border-[#2A2D3A] rounded-xl ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={18} />
              </div>
            </div>

            <div>
              <p className={`text-3xl lg:text-4xl font-bold tracking-tight text-white mb-1`}>
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
