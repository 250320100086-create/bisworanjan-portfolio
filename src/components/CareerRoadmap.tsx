import React from 'react';
import { Compass, GraduationCap, Award, Code, CheckCircle, ArrowRight } from 'lucide-react';

interface RoadmapStage {
  period: string;
  title: string;
  institution: string;
  focus: string;
  status: 'completed' | 'in_progress' | 'planned';
  highlights: string[];
}

const ROADMAP_STAGES: RoadmapStage[] = [
  {
    period: '2020 – 2023',
    title: 'B.Sc. Physics (Honours)',
    institution: 'Utkal University, Bhubaneswar',
    focus: 'Mathematical modeling, statistical mechanics, computational analysis (CGPA: 7.46)',
    status: 'completed',
    highlights: ['Strong analytical problem-solving foundation', 'Data interpretation & mathematical rigor'],
  },
  {
    period: '2024 – 2026',
    title: 'Master of Computer Applications (MCA - AI & ML)',
    institution: 'Centurion University of Technology & Management',
    focus: 'Machine learning, computer vision, FastAPI microservices, and databases (CGPA: 8.16)',
    status: 'in_progress',
    highlights: ['CyberShield Analytics & Threat Engine', 'AI Drone Computer Vision Tracking System'],
  },
  {
    period: '2026',
    title: 'Professional AI & ML Credentials',
    institution: 'Oracle & Internshala & NASSCOM',
    focus: 'Cloud architecture, Agentic AI, ML certification (98% score), network security',
    status: 'completed',
    highlights: ['Oracle Certified Foundations & Agentic AI Associate', 'Internshala Machine Learning Certified Top Performer'],
  },
  {
    period: '2026 & Beyond',
    title: 'AI/ML Engineering & Production Systems',
    institution: 'Industry Engineering Roles & Collaborations',
    focus: 'Deploying scalable AI microservices, edge computer vision pipelines, and intelligent automation',
    status: 'planned',
    highlights: ['Production ML pipelines with low-latency inference', 'Open-source AI tooling & scalable backends'],
  },
];

export const CareerRoadmap: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl bg-[#13141C] border border-[#1F212A] shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 border-b border-[#1F212A] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Compass size={16} />
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">Career & Academic Roadmap</h3>
          </div>
          <p className="text-xs text-gray-400">
            Verified academic trajectory, certifications, and forward engineering milestones
          </p>
        </div>

        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start sm:self-auto">
          Trajectory Verified
        </span>
      </div>

      <div className="relative pl-6 sm:pl-8 border-l border-[#2A2D3A] space-y-8">
        {ROADMAP_STAGES.map((stage, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Dot */}
            <div
              className={`absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                stage.status === 'completed'
                  ? 'bg-fuchsia-500 border-[#0B0C10] shadow-[0_0_10px_rgba(217,70,239,0.5)]'
                  : stage.status === 'in_progress'
                  ? 'bg-blue-500 border-[#0B0C10] shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-pulse'
                  : 'bg-[#2A2D3A] border-[#0B0C10]'
              }`}
            />

            <div className="p-5 rounded-xl bg-[#161722] border border-[#1F212A] group-hover:border-fuchsia-500/30 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-semibold text-fuchsia-400">
                  {stage.period}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase ${
                    stage.status === 'completed'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : stage.status === 'in_progress'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                  }`}
                >
                  {stage.status.replace('_', ' ')}
                </span>
              </div>

              <h4 className="text-base font-bold text-white mb-1">{stage.title}</h4>
              <p className="text-xs text-gray-400 mb-3">{stage.institution}</p>
              <p className="text-xs text-gray-300 mb-3 leading-relaxed">{stage.focus}</p>

              <div className="flex flex-wrap gap-2">
                {stage.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1F212E] border border-[#2E3142] text-[11px] text-gray-300"
                  >
                    <CheckCircle size={10} className="text-fuchsia-400" />
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
