import React from 'react';
import { Quote, CheckCircle2, MessageSquare, Star } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
              <MessageSquare size={16} />
            </span>
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              Academic & Certification Endorsements
            </h2>
          </div>
          <p className="text-xs text-gray-400">
            Verified evaluations from institutional coursework and certification authorities
          </p>
        </div>

        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#1A1C23] border border-[#2A2D3A] text-gray-400 self-start sm:self-auto">
          Verified Reviews
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TESTIMONIALS_DATA.map((t) => (
          <div
            key={t.id}
            className="p-6 rounded-2xl bg-[#13141C] border border-[#1F212A] hover:border-yellow-500/30 transition-all flex flex-col justify-between shadow-lg relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 text-[#1F212E] pointer-events-none">
              <Quote size={48} />
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>

              <p className="text-sm text-gray-300 italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3 pt-5 border-t border-[#1F212A] mt-5 relative z-10">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-500/20 to-fuchsia-500/20 border border-yellow-500/30 flex items-center justify-center font-bold text-xs text-yellow-300">
                {t.avatarInitials}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-white truncate">{t.name}</h4>
                  {t.verified && <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />}
                </div>
                <p className="text-[11px] text-gray-400 truncate">{t.role}</p>
                <p className="text-[10px] text-gray-500 truncate">{t.relationship}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
