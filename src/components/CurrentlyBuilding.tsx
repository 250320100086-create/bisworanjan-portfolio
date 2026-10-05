import React, { memo } from "react";
import { Wrench, Loader2, FlaskConical } from "lucide-react";
import { CURRENTLY_BUILDING, CurrentlyBuildingItem } from "../data/currentlyBuildingData";

const STATUS_CONFIG: Record<
  CurrentlyBuildingItem["status"],
  { label: string; color: string; bg: string; border: string; icon: React.ElementType }
> = {
  "In Active Development": {
    label: "In Active Development",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    icon: Loader2,
  },
  "Research & Prototyping": {
    label: "Research & Prototyping",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    icon: FlaskConical,
  },
  "Optimization Phase": {
    label: "Optimization Phase",
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/30",
    icon: Wrench,
  },
};

export const CurrentlyBuilding = memo(function CurrentlyBuilding() {
  return (
    <section id="currently-building" className="py-10" aria-labelledby="currently-building-heading">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 id="currently-building-heading" className="text-2xl font-semibold text-white">
            Currently Building
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            What I am actively working on — genuine projects in development
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-xs text-emerald-300 font-medium">Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CURRENTLY_BUILDING.map((item) => {
          const status = STATUS_CONFIG[item.status];
          const StatusIcon = status.icon;
          return (
            <div
              key={item.id}
              className="bg-[#13141C] border border-[#1F212A] rounded-2xl p-6 hover:border-fuchsia-500/30 hover:bg-[#151620] transition-all duration-300 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-[10px] font-mono px-2.5 py-1 bg-[#1A1C23] border border-[#2A2D3A] text-gray-400 rounded-md">
                  {item.tag}
                </span>
                <div
                  className={`flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-full ${status.bg} ${status.border} ${status.color} border`}
                >
                  <StatusIcon size={11} className={item.status === "In Active Development" ? "animate-spin" : ""} />
                  {item.status === "In Active Development" ? "Active" : item.status === "Research & Prototyping" ? "Prototyping" : "Optimizing"}
                </div>
              </div>

              <h3 className="text-white font-semibold text-base mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-5 flex-1">
                {item.description}
              </p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-[10px] text-gray-500 mb-1.5 font-mono">
                  <span>Progress</span>
                  <span className="text-fuchsia-400">{item.progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#1A1C23] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-fuchsia-600 to-blue-500 transition-all duration-700"
                    style={{ width: `${item.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] px-2 py-0.5 bg-[#1A1C23] border border-[#2A2D3A] text-gray-300 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
});
