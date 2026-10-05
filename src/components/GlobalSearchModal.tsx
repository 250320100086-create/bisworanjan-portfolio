import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  X,
  Briefcase,
  Code2,
  GraduationCap,
  Award,
  BookOpen,
  Mail,
  User,
  ArrowRight,
  Cpu,
} from 'lucide-react';
import { CASE_STUDIES, CaseStudy } from '../data/caseStudiesData';
import { BLOG_POSTS } from '../data/blogData';
import { analytics } from '../utils/analytics';

interface SearchItem {
  id: string;
  title: string;
  category: string;
  snippet: string;
  icon: React.ElementType;
  actionType: 'section' | 'caseStudy' | 'blog' | 'resume';
  target: string;
}

const SEARCHABLE_ITEMS: SearchItem[] = [
  // Commands & Navigation Actions
  {
    id: 'cmd-home',
    title: 'Navigate to Home',
    category: 'Commands',
    snippet: 'Go to the top hero section and overview.',
    icon: User,
    actionType: 'section',
    target: 'home',
  },
  {
    id: 'cmd-skills',
    title: 'Navigate to Skills & 3D Skill Globe',
    category: 'Commands',
    snippet: 'Explore programming languages, machine learning, and tools.',
    icon: Code2,
    actionType: 'section',
    target: 'skills',
  },
  {
    id: 'cmd-projects',
    title: 'Navigate to Projects & Architectures',
    category: 'Commands',
    snippet: 'View CyberShield, AI Drone, Attendance System, and ML models.',
    icon: Briefcase,
    actionType: 'section',
    target: 'projects',
  },
  {
    id: 'cmd-experience',
    title: 'Navigate to Experience',
    category: 'Commands',
    snippet: 'View academic projects, internships, and development roles.',
    icon: Briefcase,
    actionType: 'section',
    target: 'experience',
  },
  {
    id: 'cmd-education',
    title: 'Navigate to Education',
    category: 'Commands',
    snippet: 'MCA (Centurion University) & B.Sc Physics (Utkal University).',
    icon: GraduationCap,
    actionType: 'section',
    target: 'education',
  },
  {
    id: 'cmd-certifications',
    title: 'Navigate to Certifications',
    category: 'Commands',
    snippet: 'Oracle, Internshala, and NSDC verified credentials.',
    icon: Award,
    actionType: 'section',
    target: 'certifications',
  },
  {
    id: 'cmd-blog',
    title: 'Navigate to Technical Blog',
    category: 'Commands',
    snippet: 'Read technical engineering deep-dives.',
    icon: BookOpen,
    actionType: 'section',
    target: 'blog',
  },
  {
    id: 'cmd-contact',
    title: 'Navigate to Contact Form',
    category: 'Commands',
    snippet: 'Get in touch for AI/ML roles, projects, or collaborations.',
    icon: Mail,
    actionType: 'section',
    target: 'contact',
  },
  {
    id: 'cmd-theme-light',
    title: 'Switch to Light Theme',
    category: 'Theme',
    snippet: 'Activate clean high-contrast light mode appearance.',
    icon: Cpu,
    actionType: 'section',
    target: 'theme-light',
  },
  {
    id: 'cmd-theme-dark',
    title: 'Switch to Dark Theme',
    category: 'Theme',
    snippet: 'Activate default futuristic dark mode appearance.',
    icon: Cpu,
    actionType: 'section',
    target: 'theme-dark',
  },
  // Sections & About
  {
    id: 'sec-about',
    title: 'About Bisworanjan Palar',
    category: 'About',
    snippet:
      'AI & Machine Learning Developer pursuing MCA at Centurion University. Focused on computer vision, Python, FastAPI, and data engineering.',
    icon: User,
    actionType: 'section',
    target: 'home',
  },
  {
    id: 'sec-snapshot',
    title: 'Developer Snapshot & Metrics',
    category: 'Overview',
    snippet:
      'Verified developer summary: 5 AI/ML projects, 4 certifications, 8.16 CGPA at Centurion University.',
    icon: Cpu,
    actionType: 'section',
    target: 'snapshot',
  },
  // Skills
  {
    id: 'skill-python',
    title: 'Python (Supervised, Unsupervised ML & Automation)',
    category: 'Skills',
    snippet:
      'Core language for machine learning, Scikit-learn, OpenCV, computer vision models, data analysis with Pandas & NumPy.',
    icon: Code2,
    actionType: 'section',
    target: 'skills',
  },
  {
    id: 'skill-fastapi',
    title: 'FastAPI & RESTful Microservices',
    category: 'Skills',
    snippet:
      'High-performance asynchronous backend services, API routing, Pydantic validation, and telemetry ingestion.',
    icon: Code2,
    actionType: 'section',
    target: 'skills',
  },
  {
    id: 'skill-ml',
    title: 'Machine Learning & Predictive Modeling',
    category: 'Skills',
    snippet:
      'Classification, regression, SVM, decision trees, random forests, clustering, model evaluation with Scikit-learn.',
    icon: Code2,
    actionType: 'section',
    target: 'skills',
  },
  {
    id: 'skill-cv',
    title: 'Computer Vision & Object Localization',
    category: 'Skills',
    snippet:
      'OpenCV, real-time bounding box tracking, frame decoupling, drone surveillance, facial biometric embedding.',
    icon: Code2,
    actionType: 'section',
    target: 'skills',
  },
  {
    id: 'skill-sql',
    title: 'SQL, PostgreSQL & Relational Schemas',
    category: 'Skills',
    snippet:
      'Database normalization, indexed telemetry lookups, idempotent biometric logs, and relational architecture.',
    icon: Code2,
    actionType: 'section',
    target: 'skills',
  },
  {
    id: 'skill-java',
    title: 'Java & Object Oriented Programming',
    category: 'Skills',
    snippet:
      'Data structures, core OOP design patterns, algorithmic problem solving, and backend programming.',
    icon: Code2,
    actionType: 'section',
    target: 'skills',
  },
  {
    id: 'skill-react',
    title: 'React.js & Modern Web Interfaces',
    category: 'Skills',
    snippet:
      'Component architectures, hooks, Tailwind CSS, TypeScript integration, responsive web applications.',
    icon: Code2,
    actionType: 'section',
    target: 'skills',
  },
  // Projects
  {
    id: 'proj-cybershield',
    title: 'CyberShield Analytics Platform',
    category: 'Projects',
    snippet:
      'Machine learning cybersecurity threat detection, network log anomaly scoring with FastAPI and SQL.',
    icon: Briefcase,
    actionType: 'caseStudy',
    target: 'cybershield',
  },
  {
    id: 'proj-ai-drone',
    title: 'AI Drone Surveillance System',
    category: 'Projects',
    snippet:
      'Real-time autonomous aerial tracking, OpenCV frame processing, situational perimeter alerts via FastAPI.',
    icon: Briefcase,
    actionType: 'caseStudy',
    target: 'ai-drone',
  },
  {
    id: 'proj-ai-chatbot',
    title: 'AI Chatbot & Assistant',
    category: 'Projects',
    snippet:
      'Full-stack intelligent NLP conversational assistant with context-aware dialog and Google Gemini integration.',
    icon: Briefcase,
    actionType: 'caseStudy',
    target: 'ai-chatbot',
  },
  {
    id: 'proj-attendance',
    title: 'AI Student Attendance System',
    category: 'Projects',
    snippet:
      'Automated biometric attendance management using facial recognition neural networks and SQL logging.',
    icon: Briefcase,
    actionType: 'caseStudy',
    target: 'attendance-system',
  },
  {
    id: 'proj-heart-disease',
    title: 'Heart Disease Prediction System',
    category: 'Projects',
    snippet:
      'Cardiovascular risk classification using Scikit-learn predictive models and interactive patient assessment form.',
    icon: Briefcase,
    actionType: 'caseStudy',
    target: 'heart-disease',
  },
  // Education
  {
    id: 'edu-mca',
    title: 'MCA in AI & Machine Learning — Centurion University',
    category: 'Education',
    snippet:
      '2025–2027 · Centurion University of Technology and Management, Bhubaneswar · 8.16 CGPA.',
    icon: GraduationCap,
    actionType: 'section',
    target: 'education',
  },
  {
    id: 'edu-bsc',
    title: 'B.Sc. in Physics — Utkal University',
    category: 'Education',
    snippet:
      '2022–2025 · Utkal University, Bhubaneswar · 7.46 CGPA.',
    icon: GraduationCap,
    actionType: 'section',
    target: 'education',
  },
  // Certifications
  {
    id: 'cert-oracle',
    title: 'Oracle Certified Foundations Associate & Agentic AI Associate',
    category: 'Certifications',
    snippet:
      'Oracle University · Credential ID: 103523797AAI26OFA · Aug 2026.',
    icon: Award,
    actionType: 'section',
    target: 'certifications',
  },
  {
    id: 'cert-internshala',
    title: 'Machine Learning with AI Certificate (98% Marks, Top Performer)',
    category: 'Certifications',
    snippet:
      'Internshala Trainings · Certificate No: 1xi02p15nrg · May 2026.',
    icon: Award,
    actionType: 'section',
    target: 'certifications',
  },
  {
    id: 'cert-skill-india',
    title: 'Network Security Engineer Certificate of Participation',
    category: 'Certifications',
    snippet:
      'Skill India Digital Hub / NSDC / NASSCOM · Aug 2026.',
    icon: Award,
    actionType: 'section',
    target: 'certifications',
  },
  // Contact
  {
    id: 'contact-direct',
    title: 'Contact & Collaboration Inquiries',
    category: 'Contact',
    snippet:
      'bisworanjanpalar@gmail.com · +91 784 899 1691 · Bhubaneswar, Odisha, India.',
    icon: Mail,
    actionType: 'section',
    target: 'contact',
  },
];

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCaseStudy: (caseStudy: CaseStudy) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onOpenCaseStudy,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener (Ctrl+K / Cmd+K and Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Combine items including blog posts
  const allItems = useMemo(() => {
    const blogItems: SearchItem[] = BLOG_POSTS.map((bp) => ({
      id: `blog-${bp.id}`,
      title: bp.title,
      category: `Blog · ${bp.category}`,
      snippet: bp.description,
      icon: BookOpen,
      actionType: 'section',
      target: 'blog',
    }));
    return [...SEARCHABLE_ITEMS, ...blogItems];
  }, []);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return allItems.slice(0, 8); // show quick recommendations when empty

    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.snippet.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query, allItems]);

  const handleSelect = (item: SearchItem) => {
    analytics.track('search_performed', { query, selectedItem: item.id });
    onClose();

    if (item.target === 'theme-light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      try { localStorage.setItem('bp_portfolio_theme', 'light'); } catch {}
      return;
    }

    if (item.target === 'theme-dark') {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      try { localStorage.setItem('bp_portfolio_theme', 'dark'); } catch {}
      return;
    }

    if (item.actionType === 'caseStudy') {
      const cs = CASE_STUDIES[item.target];
      if (cs) onOpenCaseStudy(cs);
    } else {
      const el = document.getElementById(item.target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-16 md:pt-24 p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio Search"
    >
      <div className="bg-[#13141C] border border-[#2A2D3A] rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in slide-in flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#1F212A] flex items-center gap-3 bg-[#161724]">
          <Search size={18} className="text-fuchsia-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search projects, skills, ML models, education, certs... (e.g. Python, YOLO, OpenCV)"
            className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-gray-500 hover:text-white"
              aria-label="Clear input"
            >
              <X size={14} />
            </button>
          )}
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1C1E2B] text-gray-400 border border-[#2A2D3A] hidden sm:inline-block">
            ESC to close
          </span>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 custom-scrollbar space-y-1">
          {results.length > 0 ? (
            results.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-start justify-between group ${
                  selectedIndex === idx
                    ? 'bg-[#1C1E2B] border border-fuchsia-500/40 text-white'
                    : 'hover:bg-[#181924] border border-transparent text-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#1A1C23] border border-[#2A2D3A] text-fuchsia-400 mt-0.5 flex-shrink-0">
                    <item.icon size={15} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-white group-hover:text-fuchsia-300 transition-colors">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-[#161722] text-gray-400 border border-[#2A2D3A]">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {item.snippet}
                    </p>
                  </div>
                </div>

                <ArrowRight
                  size={15}
                  className="text-gray-600 group-hover:text-fuchsia-400 mt-2 flex-shrink-0 transition-colors"
                />
              </button>
            ))
          ) : (
            <div className="py-12 text-center text-xs text-gray-500">
              <Search size={28} className="mx-auto mb-2 text-gray-600" />
              <p>No results found matching &quot;{query}&quot;.</p>
              <p className="text-[11px] text-gray-600 mt-1">
                Try searching for: Python, FastAPI, Vision, Certifications, or Centurion.
              </p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 border-t border-[#1F212A] bg-[#101118] flex items-center justify-between text-[11px] text-gray-500 px-4">
          <span>Search index covers full verified portfolio</span>
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
        </div>
      </div>
    </div>
  );
};
