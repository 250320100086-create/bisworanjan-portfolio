import React, { memo } from 'react';
import {
  Activity,
  Layers,
  Award,
  GitBranch,
  GraduationCap,
  Sparkles,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { DEVELOPER_SNAPSHOT } from '../data/developerSnapshotData';
import { DigitalBusinessCard } from './DigitalBusinessCard';

export const DeveloperSnapshot = memo(function DeveloperSnapshot() {
  const data = DEVELOPER_SNAPSHOT;

  return (
    <section id="snapshot" className="py-8">
      {/* Container Card */}
      <div className="bg-[#13141C] border border-[#1F212A] rounded-2xl p-6 md:p-8 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#1F212A] pb-5 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400">
                <Activity size={16} />
              </span>
              <h2 className="text-xl font-semibold text-white tracking-tight">Developer Snapshot</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Verified Data
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Live executive summary of qualifications, active focus, and technical metrics
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 self-start sm:self-auto">
            <MapPin size={13} className="text-fuchsia-400" />
            <span>{data.location}</span>
          </div>
        </div>

        {/* 4 Quick Stat Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 relative z-10">
          <div className="p-3.5 rounded-xl bg-[#161722] border border-[#1F212A] flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
              <span>AI/ML Projects</span>
              <Layers size={14} className="text-fuchsia-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-white tracking-tight">
              {data.projectsCount}
            </p>
            <span className="text-[10px] text-gray-500 mt-1">End-to-end built</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#161722] border border-[#1F212A] flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
              <span>Certifications</span>
              <Award size={14} className="text-blue-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-white tracking-tight">
              {data.certificationsCount}
            </p>
            <span className="text-[10px] text-gray-500 mt-1">Oracle, Internshala, etc.</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#161722] border border-[#1F212A] flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
              <span>Repositories</span>
              <GitBranch size={14} className="text-purple-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-white tracking-tight">
              {data.publicReposCount}+
            </p>
            <span className="text-[10px] text-gray-500 mt-1">Public on GitHub</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#161722] border border-[#1F212A] flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
              <span>MCA Academic</span>
              <GraduationCap size={14} className="text-emerald-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-white tracking-tight">
              8.16
            </p>
            <span className="text-[10px] text-gray-500 mt-1">Centurion University CGPA</span>
          </div>
        </div>

        {/* Detailed Focus & Specializations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          <div className="p-4 rounded-xl bg-[#161722] border border-[#1F212A]">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-fuchsia-400">
              <Sparkles size={14} /> Current Technical Focus
            </div>
            <p className="text-sm font-medium text-white mb-2 leading-relaxed">
              {data.currentFocus}
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Exploring agentic workflows with LLM tool calling, optimizing latency in aerial object detection feeds, and standardizing ML microservices with FastAPI and Docker.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#161722] border border-[#1F212A]">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
              <CheckCircle2 size={14} /> Core Competencies
            </div>
            <div className="space-y-1.5">
              {data.keySpecializations.slice(0, 4).map((spec, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Digital Developer Business Card */}
        <div className="mt-6 relative z-10">
          <DigitalBusinessCard />
        </div>
      </div>
    </section>
  );
});
