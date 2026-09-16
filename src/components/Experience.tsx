import React, { memo } from 'react';
import { GraduationCap, Code2, Cpu, Award } from 'lucide-react';

const ACADEMIC_EXPERIENCE = [
  {
    role: 'AI & Machine Learning Practical Training',
    organization: 'Centurion University of Technology and Management',
    period: '2024 - Present',
    description: 'Hands-on development of ML algorithms (Regression, Classification, SVM, Decision Trees, PCA) and Deep Learning models using Python, TensorFlow, and Scikit-Learn.',
    icon: Cpu,
    tags: ['Python', 'Machine Learning', 'TensorFlow', 'Scikit-learn', 'EDA'],
  },
  {
    role: 'Full Stack & Data Engineering Projects',
    organization: 'Academic & Practical Labs',
    period: '2023 - 2024',
    description: 'Designed and deployed end-to-end data analytics and predictive web applications (FastAPI, React.js, PostgreSQL/SQL, REST APIs).',
    icon: Code2,
    tags: ['FastAPI', 'React.js', 'SQL', 'PostgreSQL', 'REST API'],
  },
  {
    role: 'Physics & Analytical Foundations',
    organization: 'Utkal University',
    period: '2020 - 2023',
    description: 'Completed Bachelor of Science in Physics with CGPA 7.46. Built core skills in numerical methods, mathematical modeling, statistical physics, and logical problem solving.',
    icon: GraduationCap,
    tags: ['Physics', 'Mathematical Modeling', 'Statistics', 'Data Analysis'],
  },
];

export const Experience = memo(function Experience() {
  return (
    <section id="experience" className="py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-white">Experience & Academic Training</h2>
          <p className="text-xs text-gray-400 mt-1">Practical hands-on training, research & technical lab experience</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/20 px-3 py-1.5 rounded-lg">
          <Award size={14} /> MCA Candidate
        </div>
      </div>

      <div className="relative border-l border-[#1F212A] ml-4 md:ml-6 space-y-8">
        {ACADEMIC_EXPERIENCE.map((exp, idx) => (
          <div key={idx} className="relative pl-6 md:pl-8 group">
            {/* Timeline Dot */}
            <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#13141C] border border-[#2A2D3A] flex items-center justify-center text-blue-400 group-hover:border-fuchsia-500 group-hover:text-fuchsia-400 transition-colors">
              <exp.icon size={16} />
            </div>

            <div className="bg-[#13141C] border border-[#1F212A] rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-white font-medium text-lg">{exp.role}</h3>
                <span className="text-xs font-semibold text-fuchsia-400 bg-[#1A1C23] border border-[#2A2D3A] px-3 py-1 rounded-full w-fit">
                  {exp.period}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-300 mb-3">{exp.organization}</p>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">{exp.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span key={tag} className="text-[11px] px-2.5 py-1 bg-[#1A1C23] border border-[#2A2D3A] text-gray-300 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});
