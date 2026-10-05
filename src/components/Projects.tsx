import React, { useState, useMemo, memo } from 'react';
import {
  ShieldAlert,
  Eye,
  MessageSquareCode,
  UserCheck,
  HeartPulse,
  Github,
  ExternalLink,
  FileText,
  Filter,
  Workflow,
  BarChart2,
  Maximize2,
} from 'lucide-react';
import { ProjectCaseStudyModal } from './ProjectCaseStudyModal';
import { ProjectArchitectureModal } from './ProjectArchitectureModal';
import { ProjectComparisonModal } from './ProjectComparisonModal';
import { ProjectPresentationModal } from './ProjectPresentationModal';
import { ProjectTechGraph } from './ProjectTechGraph';
import { CASE_STUDIES, CaseStudy } from '../data/caseStudiesData';
import { PROJECT_ARCHITECTURES, ProjectArchitecture } from '../data/projectArchitecturesData';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  icon: React.ElementType;
  iconColor: string;
  githubUrl: string;
  liveDemoUrl?: string;
  categoryBadge: string;
  categories: string[];
}

const CATEGORIES = [
  'All',
  'AI / ML',
  'Computer Vision',
  'Web Development',
  'Full Stack',
  'Data Science',
];

const PROJECTS: Project[] = [
  {
    id: 'cybershield',
    title: 'CyberShield Analytics Platform',
    description:
      'Advanced machine learning platform for cybersecurity threat detection, network log anomaly analysis, and automated risk scoring.',
    technologies: ['Python', 'Machine Learning', 'FastAPI', 'SQL'],
    icon: ShieldAlert,
    iconColor: 'text-fuchsia-400',
    githubUrl: 'https://github.com/250320100086-create',
    categoryBadge: 'AI / ML',
    categories: ['AI / ML', 'Data Science'],
  },
  {
    id: 'ai-drone',
    title: 'AI Drone Surveillance System',
    description:
      'Real-time autonomous drone surveillance system leveraging computer vision models for object tracking and anomaly alerts.',
    technologies: ['Python', 'Computer Vision', 'AI/ML', 'FastAPI', 'SQL'],
    icon: Eye,
    iconColor: 'text-blue-400',
    githubUrl: 'https://github.com/250320100086-create',
    categoryBadge: 'Computer Vision',
    categories: ['AI / ML', 'Computer Vision'],
  },
  {
    id: 'ai-chatbot',
    title: 'AI Chatbot',
    description:
      'Intelligent NLP conversational assistant featuring natural language understanding, intent parsing, and dynamic response generation.',
    technologies: ['Python', 'NLP', 'FastAPI', 'SQL', 'JavaScript'],
    icon: MessageSquareCode,
    iconColor: 'text-purple-400',
    githubUrl: 'https://github.com/250320100086-create',
    categoryBadge: 'Full Stack',
    categories: ['AI / ML', 'Web Development', 'Full Stack'],
  },
  {
    id: 'attendance-system',
    title: 'AI Student Attendance System',
    description:
      'Automated biometric attendance management system utilizing facial recognition neural networks and automated SQL record management.',
    technologies: ['Python', 'AI/ML', 'Face Recognition', 'FastAPI', 'SQL'],
    icon: UserCheck,
    iconColor: 'text-emerald-400',
    githubUrl: 'https://github.com/250320100086-create',
    categoryBadge: 'Computer Vision',
    categories: ['AI / ML', 'Computer Vision'],
  },
  {
    id: 'heart-disease',
    title: 'Heart Disease Prediction System',
    description:
      'Predictive healthcare classification system assessing cardiovascular risk using patient attributes and Scikit-learn algorithms.',
    technologies: ['Python', 'Machine Learning', 'Scikit-learn', 'Flask'],
    icon: HeartPulse,
    iconColor: 'text-red-400',
    githubUrl: 'https://github.com/250320100086-create',
    liveDemoUrl: '/heart-disease.html',
    categoryBadge: 'Data Science',
    categories: ['AI / ML', 'Data Science', 'Web Development'],
  },
];

export const Projects = memo(function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [selectedArchitecture, setSelectedArchitecture] = useState<ProjectArchitecture | null>(null);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [presentationCaseStudy, setPresentationCaseStudy] = useState<CaseStudy | null>(null);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.categories.includes(selectedCategory));
  }, [selectedCategory]);

  return (
    <section id="projects" className="py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">Featured AI & Machine Learning Projects</h2>
          <p className="text-xs text-gray-400 mt-1">Real-world intelligent systems built with Python, ML & Computer Vision</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsComparisonOpen(true)}
            className="px-3.5 py-2 border border-[#2A2D3A] bg-[#13141C] hover:bg-[#1A1C23] hover:border-fuchsia-500/40 text-gray-300 hover:text-white rounded-xl text-xs font-medium transition-all flex items-center gap-2"
            aria-label="Compare Projects"
          >
            <BarChart2 size={14} className="text-fuchsia-400" /> Compare Projects
          </button>
          <a
            href="https://github.com/250320100086-create"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-[#2A2D3A] bg-[#13141C] hover:bg-[#1A1C23] hover:border-fuchsia-500/40 text-gray-300 hover:text-white rounded-xl text-xs font-medium transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <Github size={14} /> View All Repositories
          </a>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="text-xs text-gray-500 flex items-center gap-1.5 mr-1 max-sm:w-full max-sm:mb-1">
          <Filter size={13} /> Filter by:
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white shadow-md shadow-fuchsia-500/20'
                : 'bg-[#13141C] border border-[#1F212A] text-gray-400 hover:text-white hover:border-[#2A2D3A]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group bg-[#13141C] border border-[#1F212A] rounded-2xl p-6 hover:border-fuchsia-500/40 hover:bg-[#151620] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className={`p-3 bg-[#1A1C23] border border-[#2A2D3A] rounded-xl ${project.iconColor}`}>
                  <project.icon size={24} />
                </div>
                <span className="text-[10px] font-mono text-gray-400 bg-[#1A1C23] border border-[#2A2D3A] px-2.5 py-1 rounded-md">
                  {project.categoryBadge}
                </span>
              </div>

              <h3 className="text-white font-medium text-lg mb-2 group-hover:text-fuchsia-300 transition-colors">
                {project.title}
              </h3>

              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] px-2.5 py-1 bg-[#1A1C23] border border-[#2A2D3A] text-gray-300 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-[#1F212A]">
              {/* Primary Actions Row */}
              <div className="flex items-center gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] hover:border-fuchsia-500/50 text-white rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5"
                >
                  <Github size={14} /> GitHub Code
                </a>

                {project.liveDemoUrl ? (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 text-white rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 shadow-md shadow-fuchsia-500/20"
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                ) : (
                  <span
                    title="Live deployment in progress"
                    className="flex-1 py-2 px-3 bg-[#1A1C23]/60 border border-[#2A2D3A]/60 text-gray-500 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 cursor-not-allowed opacity-75"
                  >
                    Demo Soon
                  </span>
                )}
              </div>

              {/* View Case Study Button */}
              <button
                onClick={() => setSelectedCaseStudy(CASE_STUDIES[project.id] || null)}
                className="w-full py-2 px-3 bg-[#151622] hover:bg-fuchsia-600/15 border border-fuchsia-500/30 hover:border-fuchsia-500/60 text-fuchsia-300 hover:text-white rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5"
              >
                <FileText size={13} className="text-fuchsia-400" /> View Case Study
              </button>

              {/* Architecture & Presentation Row */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedArchitecture(PROJECT_ARCHITECTURES[project.id] ?? null)}
                  className="flex-1 py-1.5 px-2 bg-[#13141C] hover:bg-[#1A1C23] border border-[#1F212A] hover:border-blue-500/40 text-gray-400 hover:text-blue-300 rounded-xl text-[11px] font-medium transition-all flex items-center justify-center gap-1.5"
                  aria-label={`View architecture diagram for ${project.title}`}
                >
                  <Workflow size={12} /> Architecture
                </button>
                {CASE_STUDIES[project.id] && (
                  <button
                    onClick={() => setPresentationCaseStudy(CASE_STUDIES[project.id] || null)}
                    className="flex-1 py-1.5 px-2 bg-[#13141C] hover:bg-[#1A1C23] border border-[#1F212A] hover:border-purple-500/40 text-gray-400 hover:text-purple-300 rounded-xl text-[11px] font-medium transition-all flex items-center justify-center gap-1.5"
                    aria-label={`Present ${project.title} in fullscreen mode`}
                  >
                    <Maximize2 size={12} /> Present
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Technology Relationship Graph */}
      <div className="mt-10">
        <ProjectTechGraph />
      </div>

      {/* Technical Case Study Modal */}
      <ProjectCaseStudyModal
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />

      {/* Project Architecture Diagram Modal */}
      <ProjectArchitectureModal
        architecture={selectedArchitecture}
        onClose={() => setSelectedArchitecture(null)}
      />

      {/* Project Comparison Tool */}
      <ProjectComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />

      {/* Fullscreen Project Presentation Mode */}
      <ProjectPresentationModal
        caseStudy={presentationCaseStudy}
        onClose={() => setPresentationCaseStudy(null)}
      />
    </section>
  );
});
