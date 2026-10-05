import React, { useState, useEffect } from 'react';
import {
  X,
  GitCompare,
  ArrowRight,
  Github,
  ExternalLink,
  Cpu,
  Layers,
  Database,
  CheckCircle2,
} from 'lucide-react';
import {
  PROJECT_COMPARISON_DATA,
  ProjectComparisonProfile,
} from '../data/projectComparisonData';

interface ProjectComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectComparisonModal: React.FC<ProjectComparisonModalProps> = ({
  isOpen,
  onClose,
}) => {
  const projectList = Object.values(PROJECT_COMPARISON_DATA);
  const [projectAId, setProjectAId] = useState<string>('cybershield');
  const [projectBId, setProjectBId] = useState<string>('ai-drone');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const projA = PROJECT_COMPARISON_DATA[projectAId] || projectList[0];
  const projB = PROJECT_COMPARISON_DATA[projectBId] || projectList[1];

  const COMPARISON_ROWS: { label: string; key: keyof ProjectComparisonProfile; icon: React.ElementType }[] = [
    { label: 'Category & Domain', key: 'category', icon: Layers },
    { label: 'AI/ML Model / Algorithm', key: 'aiMlType', icon: Cpu },
    { label: 'Primary Language', key: 'primaryLanguage', icon: CheckCircle2 },
    { label: 'Frontend Interface', key: 'frontendStack', icon: Layers },
    { label: 'Backend Architecture', key: 'backendStack', icon: Layers },
    { label: 'Persistence / Database', key: 'database', icon: Database },
    { label: 'Telemetry / Dataset Type', key: 'inputDatasetType', icon: Database },
    { label: 'Key Engineering Feature', key: 'keyFeature', icon: CheckCircle2 },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Project Comparison Tool"
    >
      <div className="bg-[#13141C] border border-[#2A2D3A] rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl animate-in slide-in relative overflow-hidden">
        {/* Header */}
        <div className="p-5 md:p-6 border-b border-[#1F212A] bg-gradient-to-r from-[#171828] to-[#13141C] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400">
              <GitCompare size={20} />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
                Project Architecture Comparison
              </h2>
              <p className="text-xs text-gray-400">
                Compare engineering design, AI models, and technology stacks side-by-side
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] rounded-xl transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 md:p-8 overflow-y-auto custom-scrollbar space-y-6 flex-1 text-xs">
          {/* Project Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#161722] border border-blue-500/30">
              <label className="block text-[11px] font-semibold text-blue-400 uppercase tracking-wider mb-2">
                Project A (Left Column):
              </label>
              <select
                value={projectAId}
                onChange={(e) => setProjectAId(e.target.value)}
                className="w-full bg-[#1C1E2B] border border-[#2A2D3A] rounded-xl p-2.5 text-xs text-white outline-none focus:border-blue-500"
              >
                {projectList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.category})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 rounded-xl bg-[#161722] border border-fuchsia-500/30">
              <label className="block text-[11px] font-semibold text-fuchsia-400 uppercase tracking-wider mb-2">
                Project B (Right Column):
              </label>
              <select
                value={projectBId}
                onChange={(e) => setProjectBId(e.target.value)}
                className="w-full bg-[#1C1E2B] border border-[#2A2D3A] rounded-xl p-2.5 text-xs text-white outline-none focus:border-fuchsia-500"
              >
                {projectList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.category})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Matrix Table */}
          <div className="border border-[#1F212A] rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 bg-[#171825] p-3 text-[11px] font-semibold text-gray-400 border-b border-[#1F212A]">
              <div className="col-span-4">Attribute</div>
              <div className="col-span-4 text-blue-300 font-bold">{projA.title}</div>
              <div className="col-span-4 text-fuchsia-300 font-bold">{projB.title}</div>
            </div>

            {COMPARISON_ROWS.map((row, idx) => (
              <div
                key={row.label}
                className={`grid grid-cols-12 p-3.5 border-b border-[#1F212A] ${
                  idx % 2 === 0 ? 'bg-[#13141C]' : 'bg-[#161722]'
                }`}
              >
                <div className="col-span-4 font-medium text-gray-300 flex items-center gap-1.5 pr-2">
                  <row.icon size={13} className="text-gray-500 flex-shrink-0" />
                  <span>{row.label}</span>
                </div>
                <div className="col-span-4 text-gray-200 pr-3 leading-relaxed">
                  {String(projA[row.key])}
                </div>
                <div className="col-span-4 text-gray-200 leading-relaxed">
                  {String(projB[row.key])}
                </div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-2">
              <a
                href={projA.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 bg-[#161722] hover:bg-[#1E202E] border border-[#2A2D3A] text-gray-300 hover:text-white rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <Github size={13} /> {projA.title} Repo
              </a>
              {projA.liveDemoUrl && (
                <a
                  href={projA.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 bg-blue-600/20 border border-blue-500/40 text-blue-300 rounded-xl flex items-center gap-1"
                >
                  <ExternalLink size={13} /> Live
                </a>
              )}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={projB.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 bg-[#161722] hover:bg-[#1E202E] border border-[#2A2D3A] text-gray-300 hover:text-white rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <Github size={13} /> {projB.title} Repo
              </a>
              {projB.liveDemoUrl && (
                <a
                  href={projB.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 bg-fuchsia-600/20 border border-fuchsia-500/40 text-fuchsia-300 rounded-xl flex items-center gap-1"
                >
                  <ExternalLink size={13} /> Live
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1F212A] bg-[#101118] text-right flex-shrink-0">
          <button
            onClick={onClose}
            className="py-1.5 px-4 bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] text-gray-300 rounded-xl text-xs font-medium transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
