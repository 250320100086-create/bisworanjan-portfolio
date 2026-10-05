import React, { useState } from 'react';
import { Copy, Check, UserCheck } from 'lucide-react';
import { DEVELOPER_SNAPSHOT } from '../data/developerSnapshotData';
import { analytics } from '../utils/analytics';

const VERIFIED_PROFILE_TEXT = `${DEVELOPER_SNAPSHOT.fullName} — ${DEVELOPER_SNAPSHOT.role}
Location: ${DEVELOPER_SNAPSHOT.location}
Email: bisworanjanpalar@gmail.com | Phone: +91 784 899 1691
Portfolio: https://bisworanjan-portfolio.vercel.app
GitHub: https://github.com/250320100086-create
LinkedIn: https://www.linkedin.com/in/bisworanjan-palar

Education:
• ${DEVELOPER_SNAPSHOT.education.degree} — ${DEVELOPER_SNAPSHOT.education.institution} (${DEVELOPER_SNAPSHOT.education.timeline} | ${DEVELOPER_SNAPSHOT.education.cgpa})
• B.Sc. (Hons) Physics — Utkal University (2022–2025 | 7.46 CGPA)

Core Technologies: Python, FastAPI, Scikit-learn, OpenCV, Computer Vision, SQL, React.js, Java.

Key Projects:
1. CyberShield Analytics Platform (Python, Machine Learning, FastAPI, SQL)
2. AI Drone Surveillance System (Python, Computer Vision, FastAPI)
3. AI Chatbot & Assistant (Python, NLP, React, Gemini API)
4. AI Student Attendance System (Python, Face Recognition, SQL)
5. Heart Disease Prediction System (Python, Scikit-learn, Flask)

Certifications:
• Oracle Certified Foundations Associate & Agentic AI Associate
• Machine Learning with AI Certificate of Training (Internshala | 98% Marks — Top Performer)
• Network Security Engineer Certificate (Skill India / NSDC / NASSCOM)`;

export const OneClickDeveloperProfile: React.FC<{ variant?: 'button' | 'card' }> = ({
  variant = 'button',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(VERIFIED_PROFILE_TEXT).then(() => {
      setCopied(true);
      analytics.track('search_performed', { action: 'copy_developer_profile' });
      setTimeout(() => setCopied(false), 2400);
    });
  };

  if (variant === 'card') {
    return (
      <div className="p-4 rounded-xl bg-[#161722] border border-[#1F212A] flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-white block">One-Click Executive Profile</span>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Copy concise verified professional credentials formatted for recruiters
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="py-1.5 px-3 bg-[#1C1E2B] hover:bg-fuchsia-600/20 border border-fuchsia-500/30 text-fuchsia-300 hover:text-white rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 flex-shrink-0"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" /> Copied!
            </>
          ) : (
            <>
              <Copy size={13} /> Copy Profile
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleCopy}
      type="button"
      title="Copy Complete Verified Developer Profile for Recruiters & Hiring Managers"
      aria-label="Copy Developer Profile"
      className="px-2.5 py-1.5 bg-[#161722]/90 backdrop-blur-md hover:bg-[#1E202D] border border-[#2A2D3A] hover:border-fuchsia-500/40 text-gray-300 hover:text-white rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
    >
      {copied ? (
        <>
          <Check size={13} className="text-emerald-400 flex-shrink-0" />
          <span className="text-emerald-300 font-medium whitespace-nowrap">Profile Copied!</span>
        </>
      ) : (
        <>
          <UserCheck size={13} className="text-fuchsia-400 flex-shrink-0" />
          <span className="whitespace-nowrap hidden sm:inline">Profile</span>
        </>
      )}
    </button>
  );
};
