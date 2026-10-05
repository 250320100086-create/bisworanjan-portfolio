import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Linkedin,
  Mail,
  MessageSquare,
  QrCode,
  Download,
  ExternalLink,
} from 'lucide-react';
import { analytics } from '../utils/analytics';

interface SharePortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PORTFOLIO_URL = 'https://bisworanjan-portfolio.vercel.app';
const SHARE_TITLE = 'Bisworanjan Palar | AI & Machine Learning Developer Portfolio';
const SHARE_SUMMARY =
  'Explore AI/ML projects, computer vision systems, and FastAPI architectures engineered by Bisworanjan Palar.';

import QRCode from 'qrcode';

export const SharePortfolioModal: React.FC<SharePortfolioModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Render real ISO/IEC 18004 scannable QR code
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;

    QRCode.toCanvas(
      canvasRef.current,
      PORTFOLIO_URL,
      {
        errorCorrectionLevel: 'H',
        margin: 2,
        width: 180,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      },
      (error) => {
        if (error) console.error('[Share QR Error]', error);
      }
    );
  }, [isOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(PORTFOLIO_URL).then(() => {
      setCopied(true);
      analytics.track('search_performed', { action: 'share_copy_url' });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadQr = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Bisworanjan_Palar_Portfolio_QR.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!isOpen) return null;

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    PORTFOLIO_URL
  )}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${SHARE_TITLE}\n${PORTFOLIO_URL}`
  )}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(
    SHARE_TITLE
  )}&body=${encodeURIComponent(
    `Check out Bisworanjan Palar's AI & Machine Learning Portfolio:\n\n${PORTFOLIO_URL}\n\n${SHARE_SUMMARY}`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Share Portfolio"
    >
      <div className="bg-[#13141C] border border-[#2A2D3A] rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in slide-in flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#1F212A] bg-gradient-to-r from-[#181928] to-[#13141C] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400">
              <Share2 size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Share Portfolio</h3>
              <p className="text-xs text-gray-400">Distribute verified developer portfolio</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] rounded-xl transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Quick Copy Link Box */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">Direct Portfolio URL:</label>
            <div className="flex items-center gap-2 bg-[#161722] border border-[#2A2D3A] rounded-xl p-1.5 pr-2">
              <input
                type="text"
                readOnly
                value={PORTFOLIO_URL}
                className="flex-1 bg-transparent text-xs font-mono text-gray-300 px-2 outline-none select-all"
              />
              <button
                onClick={handleCopy}
                className="py-1.5 px-3 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 text-white rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shadow-sm"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-white" /> Copied
                  </>
                ) : (
                  <>
                    <Copy size={12} /> Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Share Grid */}
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
              Share Via Platform:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#161722] hover:bg-[#1E202D] border border-[#1F212A] hover:border-blue-500/40 text-gray-300 hover:text-white transition-all flex flex-col items-center justify-center gap-1.5 text-xs text-center"
              >
                <Linkedin size={18} className="text-blue-400" />
                <span>LinkedIn</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#161722] hover:bg-[#1E202D] border border-[#1F212A] hover:border-emerald-500/40 text-gray-300 hover:text-white transition-all flex flex-col items-center justify-center gap-1.5 text-xs text-center"
              >
                <MessageSquare size={18} className="text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              <a
                href={emailUrl}
                className="p-3 rounded-xl bg-[#161722] hover:bg-[#1E202D] border border-[#1F212A] hover:border-purple-500/40 text-gray-300 hover:text-white transition-all flex flex-col items-center justify-center gap-1.5 text-xs text-center"
              >
                <Mail size={18} className="text-purple-400" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* QR Code Card */}
          <div className="p-4 rounded-xl bg-[#161722] border border-[#1F212A] flex items-center justify-between gap-4">
            <canvas
              ref={canvasRef}
              width={180}
              height={180}
              className="w-20 h-20 rounded-lg border border-[#2A2D3A] flex-shrink-0"
            />
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                <QrCode size={13} className="text-fuchsia-400" />
                <span>Instant Mobile QR</span>
              </div>
              <p className="text-[11px] text-gray-400">
                Scan with any smartphone camera to open portfolio on mobile devices
              </p>
              <button
                onClick={handleDownloadQr}
                className="text-[11px] text-fuchsia-300 hover:text-white flex items-center gap-1 pt-1 underline font-medium"
              >
                <Download size={11} /> Download QR Image
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-[#1F212A] bg-[#101118] text-center">
          <button
            onClick={onClose}
            className="w-full py-2 bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] text-gray-300 rounded-xl text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
