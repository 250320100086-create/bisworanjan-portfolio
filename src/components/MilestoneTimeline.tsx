import React, { memo } from "react";
import { GraduationCap, Award, Code2, Trophy, ArrowRight } from "lucide-react";
import { MILESTONES, Milestone } from "../data/milestonesData";

const CATEGORY_CONFIG: Record<
  Milestone["category"],
  { icon: React.ElementType; color: string; bg: string; border: string }
> = {
  Education: {
    icon: GraduationCap,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
  Certification: {
    icon: Award,
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/30",
  },
  "Project Engineering": {
    icon: Code2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  "Academic Honour": {
    icon: Trophy,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
  },
};

export const MilestoneTimeline = memo(function MilestoneTimeline() {
  return (
    <section id="milestones" className="py-10" aria-labelledby="milestones-heading">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 id="milestones-heading" className="text-2xl font-semibold text-white">
            Achievement & Milestone Timeline
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Verified academic, certification and project milestones — in chronological order
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-fuchsia-500/30 via-blue-500/20 to-transparent hidden sm:block" />

        <div className="space-y-6">
          {MILESTONES.map((milestone, index) => {
            const cfg = CATEGORY_CONFIG[milestone.category];
            const Icon = cfg.icon;
            return (
              <div
                key={milestone.id}
                className="flex gap-5 group"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="hidden sm:flex flex-col items-center flex-shrink-0 relative z-10">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border ${cfg.bg} ${cfg.border} ${cfg.color} transition-all duration-300 group-hover:scale-110`}
                  >
                    <Icon size={18} />
                  </div>
                </div>

                <div className="flex-1 bg-[#13141C] border border-[#1F212A] rounded-2xl p-5 hover:border-fuchsia-500/30 hover:bg-[#151620] transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div
                        className={`sm:hidden p-1.5 rounded-lg ${cfg.bg} ${cfg.border} ${cfg.color} border flex-shrink-0`}
                      >
                        <Icon size={14} />
                      </div>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.border} ${cfg.color} border tracking-wide`}
                      >
                        {milestone.category}
                      </span>
                      <span className="text-[11px] font-mono text-gray-500">{milestone.year}</span>
                    </div>
                    <span className="text-[10px] px-2.5 py-1 bg-[#1A1C23] border border-[#2A2D3A] text-gray-400 rounded-full font-mono">
                      {milestone.badge}
                    </span>
                  </div>

                  <h3 className="text-white font-semibold text-base mb-1 group-hover:text-fuchsia-300 transition-colors leading-snug">
                    {milestone.title}
                  </h3>
                  <p className="text-xs text-fuchsia-400/80 font-medium mb-2">
                    {milestone.organization}
                  </p>
                  <p className="text-sm text-gray-400 leading-relaxed">{milestone.description}</p>

                  {milestone.verifiedDetails && (
                    <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                      <ArrowRight size={11} />
                      {milestone.verifiedDetails}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
