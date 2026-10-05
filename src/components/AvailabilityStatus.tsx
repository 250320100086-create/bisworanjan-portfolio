import React from 'react';
import { Calendar, CheckCircle, Mail, Sparkles } from 'lucide-react';

export const AvailabilityStatus: React.FC<{ onContactClick?: () => void }> = ({ onContactClick }) => {
  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-[#161724] to-[#12131D] border border-emerald-500/20 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-0.5 flex-shrink-0">
            <CheckCircle size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-bold text-white tracking-tight">Professional Availability</span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                Active
              </span>
            </div>
            <p className="text-xs text-gray-300">
              Open to AI/ML engineering roles, computer vision collaborations, and technical discussions.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400 mt-2 font-mono">
              <span className="flex items-center gap-1">
                <Calendar size={11} className="text-fuchsia-400" /> Response Time: &lt;24 Hours
              </span>
              <span>·</span>
              <span>Location: Bhubaneswar / Remote</span>
            </div>
          </div>
        </div>

        {onContactClick && (
          <button
            onClick={onContactClick}
            className="py-2 px-3.5 bg-[#1C1E2B] hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:text-white rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 self-start sm:self-auto flex-shrink-0"
          >
            <Mail size={13} /> Initiate Discussion
          </button>
        )}
      </div>
    </div>
  );
};
