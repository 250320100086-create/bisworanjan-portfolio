import React, { useEffect, useState } from 'react';
import {
  X,
  Download,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  GraduationCap,
  Award,
  Code2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { GITHUB_URL, LINKEDIN_URL, EMAIL_ADDRESS } from './Hero';
import { generatePortfolioPdf } from '../utils/portfolioPdfGenerator';
import { analytics } from '../utils/analytics';

interface ResumeCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeCenterModal: React.FC<ResumeCenterModalProps> = ({ isOpen, onClose }) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfError, setPdfError] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      analytics.track('resume_viewed');
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleDownloadPortfolioPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      setPdfError('');
      await generatePortfolioPdf();
      analytics.track('portfolio_pdf_downloaded');
    } catch (err) {
      setPdfError('Failed to generate Portfolio PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-center-title"
    >
      <div className="bg-[#13141C] border border-[#2A2D3A] rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl animate-in slide-in relative overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 md:p-6 border-b border-[#1F212A] bg-gradient-to-r from-[#161724] to-[#13141C] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#1A1C23] border border-[#2A2D3A] text-fuchsia-400">
              <FileText size={22} />
            </div>
            <div>
              <h2 id="resume-center-title" className="text-lg md:text-xl font-bold text-white tracking-tight">
                Bisworanjan Palar — Resume & Portfolio Center
              </h2>
              <p className="text-xs text-gray-400">
                AI & Machine Learning Developer · Verified Curriculum Vitae & Detailed Portfolio
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Resume Center"
            className="p-2 text-gray-400 hover:text-white bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] rounded-xl transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Action Bar */}
        <div className="px-5 py-3.5 bg-[#101118] border-b border-[#1F212A] flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            {/* Existing Download CV / Resume */}
            <a
              href="/resume.pdf"
              download="Bisworanjan_Palar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.track('resume_downloaded')}
              aria-label="Download CV"
              className="py-2 px-3.5 bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] hover:border-fuchsia-500/40 text-gray-200 hover:text-white rounded-xl text-xs font-medium transition-all flex items-center gap-1.5"
            >
              <Download size={13} className="text-fuchsia-400" /> Download CV
            </a>

            {/* Separate Detailed Portfolio PDF Download */}
            <button
              onClick={handleDownloadPortfolioPdf}
              disabled={isGeneratingPdf}
              aria-label="Download Detailed Portfolio PDF"
              className="py-2 px-3.5 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 shadow-md shadow-fuchsia-500/20"
            >
              {isGeneratingPdf ? (
                <>
                  <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Sparkles size={13} /> Download Portfolio PDF
                </>
              )}
            </button>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] hover:border-fuchsia-500/40 text-gray-300 hover:text-white rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <ExternalLink size={13} /> View CV Tab
            </a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 bg-[#1A1C23] border border-[#2A2D3A] hover:border-blue-500/40 text-gray-300 hover:text-white rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <Linkedin size={14} className="text-blue-400" /> LinkedIn
            </a>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 bg-[#1A1C23] border border-[#2A2D3A] hover:border-fuchsia-500/40 text-gray-300 hover:text-white rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <Github size={14} className="text-fuchsia-400" /> GitHub
            </a>

            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="py-2 px-3 bg-[#1A1C23] border border-[#2A2D3A] hover:border-purple-500/40 text-gray-300 hover:text-white rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <Mail size={14} className="text-purple-400" /> Email
            </a>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="px-5 py-3 bg-[#13141C] border-b border-[#1F212A] grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-2 text-gray-300">
            <GraduationCap size={15} className="text-fuchsia-400 flex-shrink-0" />
            <span>MCA in AI/ML (CGPA: 8.16)</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Award size={15} className="text-yellow-400 flex-shrink-0" />
            <span>ML Training (98% Top Performer)</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Code2 size={15} className="text-blue-400 flex-shrink-0" />
            <span>Oracle Certified Associate</span>
          </div>
        </div>

        {/* PDF Viewer Container */}
        <div className="flex-1 min-h-[440px] md:min-h-[500px] bg-[#0E0F14] relative">
          <iframe
            src="/resume.pdf"
            title="Bisworanjan Palar Resume PDF Preview"
            className="w-full h-full border-none"
          />
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#101118] border-t border-[#1F212A] flex items-center justify-between text-xs text-gray-400 flex-shrink-0">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <CheckCircle2 size={14} /> Official Verified Document
          </div>
          <button
            onClick={onClose}
            className="py-1.5 px-4 bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] text-gray-300 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
