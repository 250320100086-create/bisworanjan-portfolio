import React, { useState, useEffect } from 'react';
import { Clock, MapPin } from 'lucide-react';

export const CityTimeWidget: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [bhubaneswarTime, setBhubaneswarTime] = useState<string>('');
  const [bhubaneswarDate, setBhubaneswarDate] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format explicitly using Asia/Kolkata timezone
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      const dateStr = now.toLocaleDateString('en-US', {
        timeZone: 'Asia/Kolkata',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      setBhubaneswarTime(timeStr);
      setBhubaneswarDate(dateStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (compact) {
    return (
      <div
        title="Current Local Time in Bhubaneswar, Odisha, India (IST / UTC+5:30)"
        className="flex items-center gap-1.5 text-[11px] font-mono text-gray-400 bg-[#161722]/90 backdrop-blur-md border border-[#2A2D3A] px-2.5 py-1.5 rounded-xl shadow-sm hover:border-[#3A3D4E] transition-colors"
      >
        <Clock size={12} className="text-fuchsia-400 flex-shrink-0" />
        <span className="text-white font-medium whitespace-nowrap">{bhubaneswarTime || 'Loading...'}</span>
        <span className="text-gray-500 font-mono text-[10px]">IST</span>
      </div>
    );
  }

  return (
    <div className="p-3.5 rounded-xl bg-[#161722] border border-[#1F212A] flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-lg bg-[#1C1E2B] border border-[#2A2D3A] text-fuchsia-400">
          <Clock size={15} />
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
            <MapPin size={11} className="text-fuchsia-400" />
            <span>Bhubaneswar, India</span>
          </div>
          <span className="text-[10px] text-gray-400 font-mono">
            {bhubaneswarDate} · IST (UTC+5:30)
          </span>
        </div>
      </div>

      <div className="text-right">
        <span className="text-sm font-bold font-mono text-fuchsia-300 tracking-tight block">
          {bhubaneswarTime || '--:--:-- --'}
        </span>
        <span className="text-[9px] text-gray-500 uppercase tracking-wider">Local Time</span>
      </div>
    </div>
  );
};
