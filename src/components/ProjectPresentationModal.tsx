import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Github,
  ExternalLink,
  Brain,
  AlertTriangle,
  CheckCircle2,
  Layers,
  Workflow,
  BarChart2,
  Code2,
} from 'lucide-react';
import { CaseStudy } from '../data/caseStudiesData';

interface ProjectPresentationModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

const STAGES = [
  { id: 'title', label: '1. Project Overview' },
  { id: 'problem', label: '2. Problem Statement' },
  { id: 'solution', label: '3. Technical Solution' },
  { id: 'architecture', label: '4. System Architecture' },
  { id: 'features', label: '5. Key Features' },
  { id: 'technology', label: '6. Technologies' },
  { id: 'results', label: '7. Verified Results' },
  { id: 'links', label: '8. Access & Code' },
];

export const ProjectPresentationModal: React.FC<ProjectPresentationModalProps> = ({
  caseStudy,
  onClose,
}) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextStage();
      if (e.key === 'ArrowLeft') prevStage();
    };
    if (caseStudy) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [caseStudy, currentStageIdx, onClose]);

  if (!caseStudy) return null;

  const nextStage = () => {
    setCurrentStageIdx((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
  };

  const prevStage = () => {
    setCurrentStageIdx((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const stage = STAGES[currentStageIdx];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#07080D]/95 backdrop-blur-xl flex flex-col justify-between p-6 md:p-12 text-white overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Fullscreen Project Presentation"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#1F212A] pb-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400">
            <Maximize2 size={18} />
          </span>
          <div>
            <span className="text-[10px] font-mono text-fuchsia-400 uppercase tracking-widest block">
              Presentation Briefing Mode · Stage {currentStageIdx + 1} of {STAGES.length}
            </span>
            <h2 className="text-base font-bold text-white tracking-tight">{caseStudy.title}</h2>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Exit Fullscreen Presentation"
          className="p-2 text-gray-400 hover:text-white bg-[#161722] hover:bg-[#222530] border border-[#2A2D3A] rounded-xl transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Presentation Stage Content */}
      <div className="max-w-4xl mx-auto w-full my-auto py-8">
        <div className="bg-[#13141C] border border-[#2A2D3A] rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden animate-in fade-in">
          {/* Subtle Stage Header */}
          <div className="flex items-center justify-between mb-6 border-b border-[#1F212A] pb-4">
            <span className="text-xs font-mono font-bold text-fuchsia-400 uppercase tracking-wider">
              {stage.label}
            </span>
            <span className="text-xs font-mono text-gray-500">{caseStudy.category}</span>
          </div>

          {/* Dynamic Content based on stage */}
          {stage.id === 'title' && (
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                {caseStudy.title}
              </h1>
              <p className="text-base md:text-xl text-fuchsia-300 font-medium">
                {caseStudy.subtitle}
              </p>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed pt-2">
                {caseStudy.overview}
              </p>
            </div>
          )}

          {stage.id === 'problem' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-rose-400 text-sm font-semibold uppercase tracking-wider">
                <AlertTriangle size={18} /> Industry Problem
              </div>
              <p className="text-base md:text-xl text-white leading-relaxed font-medium">
                {caseStudy.problemStatement}
              </p>
            </div>
          )}

          {stage.id === 'solution' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold uppercase tracking-wider">
                <CheckCircle2 size={18} /> Engineered Solution
              </div>
              <p className="text-base md:text-xl text-white leading-relaxed font-medium">
                {caseStudy.solution}
              </p>
            </div>
          )}

          {stage.id === 'architecture' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold uppercase tracking-wider">
                <Workflow size={18} /> Architecture Pipeline
              </div>
              <p className="text-sm md:text-base font-mono text-gray-200 bg-[#161722] p-5 rounded-xl border border-[#1F212A] leading-relaxed">
                {caseStudy.architecture}
              </p>
            </div>
          )}

          {stage.id === 'features' && (
            <div className="space-y-3">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">
                Key Engineering Highlights
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {caseStudy.keyFeatures.map((feat, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-[#161722] border border-[#1F212A] text-xs text-gray-200 flex items-start gap-2.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {stage.id === 'technology' && (
            <div className="space-y-4">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                Frameworks, Tooling & Stack
              </span>
              <div className="flex flex-wrap gap-2.5">
                {caseStudy.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm px-4 py-2 rounded-xl bg-[#161722] border border-[#2A2D3A] text-white font-medium shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {stage.id === 'results' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-yellow-400 text-sm font-semibold uppercase tracking-wider">
                <BarChart2 size={18} /> Verified Outcomes
              </div>
              <p className="text-base md:text-lg text-white leading-relaxed">
                {caseStudy.results}
              </p>
            </div>
          )}

          {stage.id === 'links' && (
            <div className="space-y-6 text-center py-4">
              <h3 className="text-2xl font-bold text-white">Repository Access</h3>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={caseStudy.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 bg-[#161722] hover:bg-[#222530] border border-[#2A2D3A] hover:border-fuchsia-500/50 text-white rounded-xl text-sm font-medium transition-all flex items-center gap-2 shadow-lg"
                >
                  <Github size={18} /> GitHub Repository
                </a>

                {caseStudy.liveDemoUrl && (
                  <a
                    href={caseStudy.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-6 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 text-white rounded-xl text-sm font-medium transition-all flex items-center gap-2 shadow-lg"
                  >
                    <ExternalLink size={18} /> Launch Live Demo
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between border-t border-[#1F212A] pt-4 max-w-4xl mx-auto w-full">
        <button
          onClick={prevStage}
          disabled={currentStageIdx === 0}
          className="py-2.5 px-5 rounded-xl border border-[#2A2D3A] bg-[#13141C] hover:bg-[#1E202E] disabled:opacity-30 text-white text-xs font-medium transition-all flex items-center gap-2"
        >
          <ChevronLeft size={16} /> Previous Stage
        </button>

        <div className="flex items-center gap-1.5">
          {STAGES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentStageIdx(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentStageIdx === idx
                  ? 'bg-fuchsia-500 scale-125 shadow-md shadow-fuchsia-500/50'
                  : 'bg-[#2A2D3A] hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextStage}
          disabled={currentStageIdx === STAGES.length - 1}
          className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 disabled:opacity-30 text-white text-xs font-medium transition-all flex items-center gap-2 shadow-md shadow-fuchsia-500/20"
        >
          Next Stage <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
