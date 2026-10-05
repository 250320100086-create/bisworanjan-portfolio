import React, { useEffect, useState } from 'react';
import {
  X,
  Github,
  ExternalLink,
  Brain,
  Layers,
  Database,
  CheckCircle2,
  AlertTriangle,
  Code2,
  BarChart2,
  Workflow,
  Share2,
  Copy,
  Check,
} from 'lucide-react';
import { CaseStudy } from '../data/caseStudiesData';
import { analytics } from '../utils/analytics';

interface ProjectCaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({
  caseStudy,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (caseStudy) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      analytics.track('project_opened', { projectId: caseStudy.id, title: caseStudy.title });

      // Synchronize deep-link URL seamlessly
      if (typeof window !== 'undefined' && window.history && window.history.pushState) {
        const targetPath = `/projects/${caseStudy.id}`;
        if (window.location.pathname !== targetPath) {
          window.history.pushState({ modal: caseStudy.id }, '', targetPath);
        }
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
      if (typeof window !== 'undefined' && window.history && window.history.pushState) {
        if (window.location.pathname.startsWith('/projects/')) {
          window.history.pushState(null, '', '/');
        }
      }
    };
  }, [caseStudy, onClose]);

  const handleCopyLink = () => {
    if (!caseStudy) return;
    const url = `${window.location.origin}/projects/${caseStudy.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = () => {
    if (!caseStudy) return;
    const url = `${window.location.origin}/projects/${caseStudy.id}`;
    if (navigator.share) {
      navigator.share({
        title: `${caseStudy.title} | Bisworanjan Palar`,
        text: caseStudy.overview,
        url,
      }).catch(() => {
        handleCopyLink();
      });
    } else {
      handleCopyLink();
    }
  };

  if (!caseStudy) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div className="bg-[#13141C] border border-[#2A2D3A] rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in slide-in relative overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-5 md:p-6 border-b border-[#1F212A] bg-gradient-to-r from-[#161724] to-[#13141C] flex-shrink-0">
          <div className="pr-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
                {caseStudy.category}
              </span>
              <span className="text-[11px] font-mono text-gray-400">Technical Case Study</span>
            </div>
            <h2 id="case-study-title" className="text-xl md:text-2xl font-bold text-white tracking-tight">
              {caseStudy.title}
            </h2>
            <p className="text-xs md:text-sm text-gray-400 mt-1">{caseStudy.subtitle}</p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Case Study"
            className="p-2 text-gray-400 hover:text-white bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] rounded-xl transition-colors flex-shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 md:p-8 space-y-6 custom-scrollbar text-sm text-gray-300">
          {/* Overview */}
          <div className="bg-[#161822] border border-[#1F212A] rounded-xl p-4 md:p-5">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 mb-2">
              <Brain size={16} className="text-fuchsia-400" /> Project Overview
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">{caseStudy.overview}</p>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#1A151D] border border-fuchsia-500/20 rounded-xl p-4 md:p-5">
              <h3 className="text-xs font-semibold text-fuchsia-400 uppercase tracking-wider flex items-center gap-2 mb-2">
                <AlertTriangle size={15} /> Problem Statement
              </h3>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                {caseStudy.problemStatement}
              </p>
            </div>

            <div className="bg-[#131A22] border border-blue-500/20 rounded-xl p-4 md:p-5">
              <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-2 mb-2">
                <CheckCircle2 size={15} /> Solution
              </h3>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{caseStudy.solution}</p>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 mb-3">
              <Workflow size={16} className="text-emerald-400" /> Key Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {caseStudy.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 bg-[#161722] border border-[#1F212A] rounded-xl text-xs text-gray-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture & Dataset */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#161722] border border-[#1F212A] rounded-xl p-4 md:p-5">
              <h3 className="text-xs font-semibold text-purple-400 uppercase tracking-wider flex items-center gap-2 mb-2">
                <Layers size={15} /> Architecture Flow
              </h3>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-mono">
                {caseStudy.architecture}
              </p>
            </div>

            <div className="bg-[#161722] border border-[#1F212A] rounded-xl p-4 md:p-5">
              <h3 className="text-xs font-semibold text-orange-400 uppercase tracking-wider flex items-center gap-2 mb-2">
                <Database size={15} /> Dataset & Preprocessing
              </h3>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">{caseStudy.dataset}</p>
            </div>
          </div>

          {/* Implementation & Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#161722] border border-[#1F212A] rounded-xl p-4 md:p-5">
              <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-2 mb-2">
                <Code2 size={15} /> Implementation Details
              </h3>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                {caseStudy.implementation}
              </p>
            </div>

            <div className="bg-[#161722] border border-[#1F212A] rounded-xl p-4 md:p-5">
              <h3 className="text-xs font-semibold text-yellow-400 uppercase tracking-wider flex items-center gap-2 mb-2">
                <BarChart2 size={15} /> Results & Outcomes
              </h3>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">{caseStudy.results}</p>
            </div>
          </div>

          {/* Challenges */}
          <div className="bg-[#161722] border border-[#1F212A] rounded-xl p-4 md:p-5">
            <h3 className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-2 mb-2">
              <AlertTriangle size={15} /> Challenges & Solutions
            </h3>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">{caseStudy.challenges}</p>
          </div>

          {/* Technologies Used */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
              Technologies & Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 bg-[#1A1C23] border border-[#2A2D3A] text-gray-300 rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 md:p-5 border-t border-[#1F212A] bg-[#101118] flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="py-2 px-4 bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] text-gray-300 rounded-xl text-xs font-medium transition-colors"
            >
              Close
            </button>

            <button
              onClick={handleCopyLink}
              className="py-2 px-3 bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] hover:border-fuchsia-500/40 text-gray-300 hover:text-white rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5"
              title="Copy deep-link to this project case study"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-400" /> Link Copied
                </>
              ) : (
                <>
                  <Copy size={13} className="text-fuchsia-400" /> Copy Link
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              className="py-2 px-3 bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] hover:border-blue-500/40 text-gray-300 hover:text-white rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5"
              title="Share this project"
            >
              <Share2 size={13} className="text-blue-400" /> Share
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={caseStudy.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] hover:border-fuchsia-500/40 text-white rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <Github size={14} /> GitHub Repository
            </a>

            {caseStudy.liveDemoUrl && (
              <a
                href={caseStudy.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 text-white rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 shadow-md"
              >
                <ExternalLink size={14} /> Open Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
