import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, CornerDownLeft, Sparkles } from 'lucide-react';
import { DEVELOPER_SNAPSHOT } from '../data/developerSnapshotData';

interface CommandOutput {
  command: string;
  output: string | React.ReactNode;
}

export const DeveloperEasterEgg: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'init',
      output:
        'BP AI/ML Terminal v2.4 (React 19 / TypeScript / Vite). Type "help" for verified commands.',
    },
  ]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const keySequenceRef = useRef<string[]>([]);

  // Listen for 'dev' sequence or Ctrl+Shift+D or ~
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shortcut 1: Ctrl+Shift+D
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      // Shortcut 2: ~ (Tilde) if not inside input
      const target = e.target as HTMLElement | null;
      const isInput = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA';
      if (!isInput && e.key === '`') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      // Shortcut 3: Typing 'dev' sequence
      if (!isInput) {
        keySequenceRef.current.push(e.key.toLowerCase());
        if (keySequenceRef.current.length > 3) {
          keySequenceRef.current.shift();
        }
        if (keySequenceRef.current.join('') === 'dev') {
          setIsOpen(true);
          keySequenceRef.current = [];
        }
      }

      // Escape closes
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let output: string | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        output =
          'Available commands:\n• skills      - Core programming & ML competencies\n• projects    - 5 verified production architectures\n• certs       - Verified credentials & licenses\n• education   - Academic history & CGPA\n• whoami      - Executive profile\n• clear       - Clear terminal output\n• exit        - Close terminal console';
        break;

      case 'skills':
        output = `Core: ${DEVELOPER_SNAPSHOT.primaryLanguages.join(
          ', '
        )}\nSpecializations: ${DEVELOPER_SNAPSHOT.keySpecializations.join('\n• ')}`;
        break;

      case 'projects':
        output =
          '1. CyberShield Analytics (FastAPI, Scikit-learn, SQL)\n2. AI Drone Surveillance (Computer Vision, OpenCV, FastAPI)\n3. AI Chatbot (NLP, React, Google Gemini)\n4. AI Student Attendance System (Face Recognition, SQL)\n5. Heart Disease Diagnostic System (Scikit-learn, Flask)';
        break;

      case 'certs':
        output =
          '• Oracle Certified Foundations Associate & Agentic AI Associate\n• Internshala ML with AI (98% Score — Top Performer)\n• Skill India Network Security Engineer Credential\n• Scholiverse ML with AI (Grade A)';
        break;

      case 'education':
        output = `${DEVELOPER_SNAPSHOT.education.degree}\n${DEVELOPER_SNAPSHOT.education.institution} (${DEVELOPER_SNAPSHOT.education.timeline})\nCumulative Grade: ${DEVELOPER_SNAPSHOT.education.cgpa}`;
        break;

      case 'whoami':
        output = `${DEVELOPER_SNAPSHOT.fullName} — ${DEVELOPER_SNAPSHOT.role}\nLocation: ${DEVELOPER_SNAPSHOT.location}\nCurrent Focus: ${DEVELOPER_SNAPSHOT.currentFocus}`;
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        setIsOpen(false);
        setInputVal('');
        return;

      default:
        output = `Command not recognized: "${cmd}". Type "help" for a list of verified commands.`;
        break;
    }

    setHistory((prev) => [...prev, { command: inputVal, output }]);
    setInputVal('');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Developer Console"
    >
      <div className="bg-[#0D0E15] border border-fuchsia-500/40 rounded-2xl max-w-2xl w-full shadow-[0_0_50px_rgba(217,70,239,0.15)] overflow-hidden animate-in slide-in flex flex-col font-mono text-xs">
        {/* Terminal Titlebar */}
        <div className="px-4 py-2.5 bg-[#141520] border-b border-[#1F212A] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="text-[11px] text-gray-400 ml-2 flex items-center gap-1.5 font-medium">
              <Terminal size={12} className="text-fuchsia-400" /> bp-developer-shell@bhubaneswar: ~
            </span>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-gray-400 hover:text-white rounded"
          >
            <X size={14} />
          </button>
        </div>

        {/* Terminal Body */}
        <div
          ref={scrollRef}
          className="p-5 overflow-y-auto max-h-[380px] space-y-3.5 custom-scrollbar text-gray-300"
        >
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-1.5 text-fuchsia-400">
                <span className="text-blue-400">visitor@bp-portfolio</span>
                <span className="text-gray-500">:</span>
                <span className="text-emerald-400">~</span>
                <span className="text-gray-400">$</span>
                <span className="text-white font-semibold">{item.command}</span>
              </div>
              <pre className="text-gray-300 whitespace-pre-wrap font-mono text-[11px] leading-relaxed pl-3 border-l border-[#2A2D3A]">
                {item.output}
              </pre>
            </div>
          ))}

          {/* Prompt line */}
          <form onSubmit={handleCommand} className="flex items-center gap-1.5 pt-1">
            <span className="text-blue-400">visitor@bp-portfolio</span>
            <span className="text-gray-500">:</span>
            <span className="text-emerald-400">~</span>
            <span className="text-gray-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type 'help'..."
              className="flex-1 bg-transparent text-white outline-none font-mono text-xs caret-fuchsia-400"
            />
            <button type="submit" className="text-gray-600 hover:text-fuchsia-400">
              <CornerDownLeft size={12} />
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-[#1F212A] bg-[#0A0B10] flex items-center justify-between text-[10px] text-gray-500">
          <span>Easter Egg Console · Press ESC or type &apos;exit&apos;</span>
          <span>Trigger shortcut: ` or Ctrl+Shift+D</span>
        </div>
      </div>
    </div>
  );
};
