import React from 'react';

interface AvailabilityBadgeProps {
  statusText?: string;
  className?: string;
}

export const AvailabilityBadge: React.FC<AvailabilityBadgeProps> = ({
  statusText = 'Available for Internship / Full-Time Opportunities',
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#13141C] border border-[#2A2D3A] text-xs text-gray-300 shadow-sm hover:border-emerald-500/40 transition-colors ${className}`}
      role="status"
      aria-label={`Status: ${statusText}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span className="font-medium text-gray-200">{statusText}</span>
    </div>
  );
};
