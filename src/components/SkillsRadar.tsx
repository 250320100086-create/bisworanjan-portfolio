import React, { useState } from 'react';
import { Radar, Sparkles, Layers, ArrowRight } from 'lucide-react';

interface SkillDomain {
  name: string;
  category: string;
  technologies: string[];
  keyProjects: string[];
  color: string;
}

const SKILL_DOMAINS: SkillDomain[] = [
  {
    name: 'AI & Machine Learning',
    category: 'Core Focus',
    technologies: ['Scikit-learn', 'Supervised/Unsupervised ML', 'Classification', 'Regression', 'SVM', 'Decision Trees', 'PCA'],
    keyProjects: ['CyberShield Analytics Platform', 'Heart Disease Prediction System'],
    color: '#d946ef', // Fuchsia
  },
  {
    name: 'Computer Vision',
    category: 'Visual AI',
    technologies: ['OpenCV', 'Face Recognition', 'Real-time Object Tracking', 'Frame Decoupling', 'Bounding Box Extraction'],
    keyProjects: ['AI Drone Surveillance System', 'AI Student Attendance System'],
    color: '#3b82f6', // Blue
  },
  {
    name: 'Backend & APIs',
    category: 'Microservices',
    technologies: ['FastAPI', 'Flask', 'Spring Boot', 'RESTful Architectures', 'Async Endpoints', 'Pydantic'],
    keyProjects: ['CyberShield Backend', 'AI Drone Telemetry API'],
    color: '#10b981', // Emerald
  },
  {
    name: 'Data Science & EDA',
    category: 'Analytics',
    technologies: ['NumPy', 'Pandas', 'Matplotlib', 'Data Preprocessing', 'Feature Engineering', 'Anomaly Detection'],
    keyProjects: ['CyberShield Network Log Analysis', 'Medical Dataset Predictor'],
    color: '#f59e0b', // Amber
  },
  {
    name: 'Databases & Storage',
    category: 'Persistence',
    technologies: ['SQL', 'PostgreSQL', 'Relational Normalization', 'Indexed Queries', 'DBMS'],
    keyProjects: ['AI Student Attendance System', 'CyberShield Audit Database'],
    color: '#ec4899', // Pink
  },
  {
    name: 'Web & Interface',
    category: 'Frontend',
    technologies: ['React.js', 'JavaScript (ES6+)', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3'],
    keyProjects: ['AI Chatbot Assistant Interface', 'Portfolio Web Platform'],
    color: '#8b5cf6', // Violet
  },
];

export const SkillsRadar: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState<SkillDomain>(SKILL_DOMAINS[0]);

  return (
    <div className="p-6 rounded-2xl bg-[#13141C] border border-[#1F212A] shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-[#1F212A] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400">
              <Radar size={16} />
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">Interactive Skills Radar</h3>
          </div>
          <p className="text-xs text-gray-400">
            Domain breakdown of verified technologies and associated project implementations
          </p>
        </div>

        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#1A1C23] border border-[#2A2D3A] text-gray-400 self-start sm:self-auto">
          6 Core Competencies
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Domain Grid Selection */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {SKILL_DOMAINS.map((domain) => {
            const isSelected = activeDomain.name === domain.name;
            return (
              <button
                key={domain.name}
                onClick={() => setActiveDomain(domain)}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? 'bg-[#181926] border-fuchsia-500/60 shadow-[0_0_20px_rgba(217,70,239,0.15)] ring-1 ring-fuchsia-500/30'
                    : 'bg-[#161722] border-[#2A2D3A] hover:border-[#3A3D4E] hover:bg-[#1A1C28]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">
                    {domain.category}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: domain.color }}
                  />
                </div>
                <span className="text-xs font-semibold text-white tracking-tight">
                  {domain.name}
                </span>
                <span className="text-[11px] text-gray-400 truncate">
                  {domain.technologies.slice(0, 3).join(', ')}...
                </span>
              </button>
            );
          })}
        </div>

        {/* Domain Detail Inspector Card */}
        <div className="lg:col-span-6 p-5 rounded-xl bg-gradient-to-br from-[#161724] to-[#12131C] border border-[#2A2D3A] shadow-inner space-y-4">
          <div className="flex items-center justify-between border-b border-[#1F212A] pb-3">
            <div>
              <span className="text-[10px] font-mono text-fuchsia-400 uppercase tracking-widest">
                Domain Inspector
              </span>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: activeDomain.color }}
                />
                {activeDomain.name}
              </h4>
            </div>
            <span className="text-xs font-mono text-gray-500">
              {activeDomain.category}
            </span>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-gray-400 mb-2">
              Verified Technologies:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {activeDomain.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#1F212E] border border-[#2E3142] text-gray-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-gray-400 mb-2">
              Implemented in Projects:
            </label>
            <div className="space-y-1.5">
              {activeDomain.keyProjects.map((proj) => (
                <div
                  key={proj}
                  className="p-2.5 rounded-lg bg-[#141520] border border-[#222434] flex items-center justify-between text-xs text-gray-200"
                >
                  <span className="font-medium text-white">{proj}</span>
                  <ArrowRight size={12} className="text-fuchsia-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
