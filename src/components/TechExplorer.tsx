import React, { useState, useMemo } from 'react';
import {
  Compass,
  Code,
  Layers,
  FileText,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';
import { CASE_STUDIES, CaseStudy } from '../data/caseStudiesData';

export type TechCategory =
  | 'All'
  | 'Programming'
  | 'AI / ML'
  | 'Computer Vision'
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'Tools';

interface TechItem {
  name: string;
  category: TechCategory;
  level: 'Primary' | 'Working Knowledge' | 'Familiar';
  projectIds: string[];
  description: string;
}

const TECHNOLOGIES: TechItem[] = [
  {
    name: 'Python',
    category: 'Programming',
    level: 'Primary',
    projectIds: ['cybershield', 'ai-drone', 'ai-chatbot', 'attendance-system', 'heart-disease'],
    description: 'Core language for ML training, computer vision pipelines, and asynchronous APIs.',
  },
  {
    name: 'FastAPI',
    category: 'Backend',
    level: 'Primary',
    projectIds: ['cybershield', 'ai-drone', 'ai-chatbot', 'attendance-system'],
    description: 'High-performance asynchronous REST microservices serving inference models.',
  },
  {
    name: 'Scikit-learn',
    category: 'AI / ML',
    level: 'Primary',
    projectIds: ['cybershield', 'heart-disease'],
    description: 'Classification pipelines, feature scaling, model tuning, and metrics evaluation.',
  },
  {
    name: 'OpenCV',
    category: 'Computer Vision',
    level: 'Working Knowledge',
    projectIds: ['ai-drone', 'attendance-system'],
    description: 'Frame extraction, bounding-box tracking, and webcam biometric preprocessing.',
  },
  {
    name: 'SQL & PostgreSQL',
    category: 'Database',
    level: 'Primary',
    projectIds: ['cybershield', 'ai-drone', 'ai-chatbot', 'attendance-system'],
    description: 'Relational schema design, idempotent check-in logs, and indexed telemetry queries.',
  },
  {
    name: 'React.js',
    category: 'Frontend',
    level: 'Working Knowledge',
    projectIds: ['ai-chatbot'],
    description: 'Dynamic user interfaces, state management, and real-time interactive dashboards.',
  },
  {
    name: 'JavaScript / TypeScript',
    category: 'Programming',
    level: 'Working Knowledge',
    projectIds: ['ai-chatbot'],
    description: 'Full-stack client logic, typing interfaces, and asynchronous data streaming.',
  },
  {
    name: 'Java',
    category: 'Programming',
    level: 'Working Knowledge',
    projectIds: [],
    description: 'Object-oriented programming, data structures, and core backend foundations.',
  },
  {
    name: 'Flask',
    category: 'Backend',
    level: 'Working Knowledge',
    projectIds: ['heart-disease'],
    description: 'Lightweight WSGI server hosting cardiovascular risk prediction forms.',
  },
  {
    name: 'Git & GitHub',
    category: 'Tools',
    level: 'Primary',
    projectIds: ['cybershield', 'ai-drone', 'ai-chatbot', 'attendance-system', 'heart-disease'],
    description: 'Version control, repository maintenance, collaborative workflows.',
  },
];

const CATEGORIES: TechCategory[] = [
  'All',
  'Programming',
  'AI / ML',
  'Computer Vision',
  'Frontend',
  'Backend',
  'Database',
  'Tools',
];

interface TechExplorerProps {
  onOpenCaseStudy: (caseStudy: CaseStudy) => void;
}

export const TechExplorer: React.FC<TechExplorerProps> = ({ onOpenCaseStudy }) => {
  const [selectedCategory, setSelectedCategory] = useState<TechCategory>('All');
  const [selectedTech, setSelectedTech] = useState<string>('Python');

  const filteredTechs = useMemo(() => {
    if (selectedCategory === 'All') return TECHNOLOGIES;
    return TECHNOLOGIES.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  const activeTechItem = useMemo(() => {
    return TECHNOLOGIES.find((t) => t.name === selectedTech) || TECHNOLOGIES[0];
  }, [selectedTech]);

  const activeProjects = useMemo(() => {
    return activeTechItem.projectIds
      .map((id) => CASE_STUDIES[id])
      .filter((cs): cs is CaseStudy => Boolean(cs));
  }, [activeTechItem]);

  return (
    <section id="tech-explorer" className="py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Compass size={20} />
            </span>
            <h2 className="text-2xl font-semibold text-white">Interactive Technology Explorer</h2>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Select a technology to explore where and how it is applied across real portfolio projects
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white shadow-md'
                : 'bg-[#13141C] border border-[#1F212A] text-gray-400 hover:text-white hover:border-[#2A2D3A]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Technology Selector Column */}
        <div className="space-y-2 bg-[#13141C] border border-[#1F212A] rounded-2xl p-4">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-2 px-1">
            Technologies ({filteredTechs.length})
          </span>

          <div className="space-y-1.5 max-h-[360px] overflow-y-auto custom-scrollbar pr-1">
            {filteredTechs.map((tech) => (
              <button
                key={tech.name}
                onClick={() => setSelectedTech(tech.name)}
                className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                  selectedTech === tech.name
                    ? 'bg-[#1A1C28] border-fuchsia-500/50 text-white shadow-sm'
                    : 'bg-[#161722] border-[#1F212A] text-gray-400 hover:text-white hover:border-[#2A2D3A]'
                }`}
              >
                <div>
                  <p className="font-semibold text-white flex items-center gap-1.5">
                    <Code size={13} className="text-fuchsia-400" /> {tech.name}
                  </p>
                  <span className="text-[10px] text-gray-500 block mt-0.5">{tech.category}</span>
                </div>

                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    tech.level === 'Primary'
                      ? 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30'
                      : 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                  }`}
                >
                  {tech.level}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Tech Project Mapping Display */}
        <div className="lg:col-span-2 bg-[#13141C] border border-[#1F212A] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            {/* Tech Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F212A] pb-4 mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-white tracking-tight">{activeTechItem.name}</h3>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {activeTechItem.category}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{activeTechItem.description}</p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <Layers size={14} className="text-fuchsia-400" />
                <span>Used in {activeProjects.length} Verified Project(s)</span>
              </div>
            </div>

            {/* Project List */}
            {activeProjects.length > 0 ? (
              <div className="space-y-3">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                  Applied Implementation In:
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeProjects.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-xl bg-[#161722] border border-[#1F212A] hover:border-fuchsia-500/40 transition-colors flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-fuchsia-400 mb-1.5">
                          <span>{p.category}</span>
                          <CheckCircle size={12} className="text-emerald-400" />
                        </div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-fuchsia-300 transition-colors mb-1">
                          {p.title}
                        </h4>
                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-3">
                          {p.overview}
                        </p>
                      </div>

                      <button
                        onClick={() => onOpenCaseStudy(p)}
                        className="py-1.5 px-3 bg-[#1C1E2B] hover:bg-fuchsia-600/20 border border-fuchsia-500/30 text-fuchsia-300 hover:text-white rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 self-start"
                      >
                        <FileText size={12} /> View Case Study
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-[#161722] rounded-xl border border-[#1F212A]">
                <p className="text-xs text-gray-400">
                  {activeTechItem.name} is part of foundational coursework, algorithm implementations, and academic programming exercises.
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 mt-6 border-t border-[#1F212A] flex items-center justify-between text-[11px] text-gray-500">
            <span>Verified against codebase implementation</span>
            <a
              href="https://github.com/250320100086-create"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white flex items-center gap-1"
            >
              Inspect Source on GitHub <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
