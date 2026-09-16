import React, { memo } from 'react';
import cutmLogo from './assets/logos/cutm.png';
import utkalLogo from './assets/logos/utkal.png';
import chseLogo from './assets/logos/chse.png';
import bseLogo from './assets/logos/bse.png';

const EDUCATION_HISTORY = [
  {
    degree: 'Master of Computer Applications (MCA)',
    specialization: 'Artificial Intelligence & Machine Learning',
    institution: 'Centurion University of Technology and Management',
    score: 'CGPA: 8.16',
    period: '2025 – 2027',
    logo: cutmLogo,
    color: 'text-fuchsia-400',
    highlight: true,
    status: 'Pursuing',
  },
  {
    degree: 'Bachelor of Science (B.Sc.)',
    specialization: 'Physics (Honours)',
    institution: 'Utkal University',
    score: 'CGPA: 7.46',
    period: '2022 – 2025',
    logo: utkalLogo,
    color: 'text-blue-400',
    status: 'Completed',
  },
  {
    degree: 'Higher Secondary Education (12th)',
    specialization: 'Science Stream (CHSE Odisha)',
    institution: 'The Guide Residential Higher Secondary School',
    score: '70%',
    period: '2020 – 2022',
    logo: chseLogo,
    color: 'text-purple-400',
    status: 'Completed',
  },
  {
    degree: 'Secondary Education (10th)',
    specialization: 'BSE Odisha Board',
    institution: 'GOVT (NP) High School',
    score: '61%',
    period: '2018 – 2019',
    logo: bseLogo,
    color: 'text-emerald-400',
    status: 'Completed',
  },
];

export const Education = memo(function Education() {
  return (
    <section id="education" className="py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-white">Educational Qualifications</h2>
          <p className="text-xs text-gray-400 mt-1">Verified academic degrees, university logos & exact duration timeline</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EDUCATION_HISTORY.map((edu, idx) => (
          <div
            key={idx}
            className={`bg-[#13141C] border ${
              edu.highlight ? 'border-fuchsia-500/40 bg-[#161422]' : 'border-[#1F212A]'
            } rounded-2xl p-6 hover:border-fuchsia-500/40 transition-all duration-300 flex flex-col justify-between group`}
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-xl bg-[#1A1C23] border border-[#2A2D3A] p-2 flex items-center justify-center overflow-hidden">
                  <img
                    src={edu.logo}
                    alt={`${edu.institution} Logo`}
                    className="w-full h-full object-contain filter group-hover:brightness-110 transition-all"
                  />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs font-bold text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/20 px-3 py-1 rounded-full">
                    {edu.score}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {edu.status}
                  </span>
                </div>
              </div>

              <h3 className="text-white font-medium text-lg mb-1 group-hover:text-fuchsia-300 transition-colors">
                {edu.degree}
              </h3>
              <p className="text-xs font-semibold text-gray-300 mb-2">{edu.specialization}</p>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">{edu.institution}</p>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-[#1F212A]">
              <span>Academic Period</span>
              <span className="font-mono font-semibold text-fuchsia-400 bg-[#1A1C23] px-2.5 py-1 rounded-md border border-[#2A2D3A]">
                {edu.period}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});
