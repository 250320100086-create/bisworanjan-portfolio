import React, { useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  BookOpen,
  ArrowRight,
  Code2,
} from 'lucide-react';
import { BlogPost } from '../data/blogData';
import { CASE_STUDIES, CaseStudy } from '../data/caseStudiesData';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onOpenCaseStudy: (caseStudy: CaseStudy) => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ post, onClose, onOpenCaseStudy }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (post) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [post, onClose]);

  if (!post) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="blog-post-title"
    >
      <div className="bg-[#13141C] border border-[#2A2D3A] rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in slide-in relative overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#1F212A] bg-gradient-to-r from-[#161724] to-[#13141C] flex items-start justify-between gap-4 flex-shrink-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
                {post.category}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar size={12} /> {post.date}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock size={12} /> {post.readingTime}
              </span>
            </div>

            <h2 id="blog-post-title" className="text-xl md:text-2xl font-bold text-white tracking-tight">
              {post.title}
            </h2>
            <p className="text-xs md:text-sm text-gray-400">{post.description}</p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close article"
            className="p-2 text-gray-400 hover:text-white bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] rounded-xl transition-colors flex-shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar space-y-6 text-sm text-gray-300 leading-relaxed">
          {/* Article paragraphs */}
          <div className="space-y-4">
            {post.content.map((p, idx) => (
              <p key={idx} className="text-gray-300 leading-relaxed text-sm md:text-base">
                {p}
              </p>
            ))}
          </div>

          {/* Code Snippets */}
          {post.codeSnippets &&
            post.codeSnippets.map((snippet, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden border border-[#2A2D3A] bg-[#0E0F16]">
                <div className="px-4 py-2 border-b border-[#1F212A] bg-[#161722] flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1.5 font-mono text-fuchsia-300">
                    <Code2 size={13} /> {snippet.caption}
                  </span>
                  <span className="uppercase text-[10px] font-mono bg-[#1C1E2B] px-2 py-0.5 rounded text-gray-400">
                    {snippet.language}
                  </span>
                </div>
                <pre className="p-4 text-xs font-mono text-gray-200 overflow-x-auto custom-scrollbar">
                  <code>{snippet.code}</code>
                </pre>
              </div>
            ))}

          {/* Tags */}
          <div className="pt-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
              Topic Tags:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded bg-[#1A1C23] border border-[#2A2D3A] text-gray-300 font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related Projects */}
          {post.relatedProjects.length > 0 && (
            <div className="pt-4 border-t border-[#1F212A]">
              <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-3">
                Directly Related Portfolio Projects:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {post.relatedProjects.map((id) => {
                  const project = CASE_STUDIES[id];
                  if (!project) return null;
                  return (
                    <div
                      key={id}
                      className="p-3.5 rounded-xl bg-[#161722] border border-[#1F212A] flex items-center justify-between group"
                    >
                      <div>
                        <p className="text-xs font-semibold text-white group-hover:text-fuchsia-300 transition-colors">
                          {project.title}
                        </p>
                        <span className="text-[10px] text-gray-400">{project.category}</span>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          onOpenCaseStudy(project);
                        }}
                        className="p-1.5 text-fuchsia-400 hover:text-white bg-[#1A1C23] rounded-lg transition-colors"
                        title="View Project Case Study"
                      >
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1F212A] bg-[#101118] flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-gray-500">Author: Bisworanjan Palar · AI / ML Developer</span>
          <button
            onClick={onClose}
            className="py-1.5 px-4 bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] text-gray-300 rounded-xl text-xs font-medium transition-colors"
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
};
