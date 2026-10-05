import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import {
  IdCard,
  Download,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  GraduationCap,
} from 'lucide-react';
import { analytics } from '../utils/analytics';
import { OFFICIAL_PORTFOLIO_URL } from './PortfolioQRCode';
import { GITHUB_URL, LINKEDIN_URL, EMAIL_ADDRESS } from './Hero';

interface DigitalBusinessCardProps {
  onOpenResumeCenter?: () => void;
  className?: string;
}

export const DigitalBusinessCard: React.FC<DigitalBusinessCardProps> = ({
  onOpenResumeCenter,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    QRCode.toCanvas(
      canvasRef.current,
      OFFICIAL_PORTFOLIO_URL,
      {
        errorCorrectionLevel: 'H',
        margin: 1,
        width: 100,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      },
      (error) => {
        if (error) console.error('[Card QR Error]', error);
      }
    );
  }, []);

  const handleCopyCard = () => {
    const cardText = `Bisworanjan Palar | AI & Machine Learning Developer
MCA (AI & ML) - Centurion University | Bhubaneswar, Odisha, India
Portfolio: ${OFFICIAL_PORTFOLIO_URL}
GitHub: ${GITHUB_URL}
LinkedIn: ${LINKEDIN_URL}
Email: ${EMAIL_ADDRESS}`;

    navigator.clipboard.writeText(cardText);
    setCopied(true);
    analytics.track('developer_profile_copied', { source: 'digital_card' });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    analytics.track('portfolio_shared', { method: 'digital_card_native' });
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Bisworanjan Palar - Digital Business Card',
          text: 'AI & Machine Learning Developer | View verified portfolio & credentials',
          url: OFFICIAL_PORTFOLIO_URL,
        });
      } catch {
        handleCopyCard();
      }
    } else {
      handleCopyCard();
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#161724] via-[#13141C] to-[#161822] border border-[#2A2D3A] p-6 shadow-xl ${className}`}
    >
      {/* Subtle top accent gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left: Bio & Details */}
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 flex items-center gap-1">
              <IdCard size={11} /> Digital Developer Card
            </span>
            <span className="text-[10px] font-mono text-gray-500">Verified Profile</span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              Bisworanjan Palar
            </h3>
            <p className="text-xs text-fuchsia-400 font-medium">
              AI & Machine Learning Developer
            </p>
          </div>

          <div className="space-y-1.5 text-xs text-gray-300">
            <div className="flex items-center gap-2 text-gray-400">
              <GraduationCap size={13} className="text-purple-400 flex-shrink-0" />
              <span>MCA (AI & ML) · Centurion University (CGPA: 8.16)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin size={13} className="text-blue-400 flex-shrink-0" />
              <span>Bhubaneswar, Odisha, India (IST / UTC+5:30)</span>
            </div>
          </div>

          {/* Social Links Row */}
          <div className="flex items-center gap-2 pt-1">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#1F212A] hover:bg-[#2A2D3A] text-gray-300 hover:text-white border border-[#2E313D] transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={14} />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#1F212A] hover:bg-[#2A2D3A] text-gray-300 hover:text-white border border-[#2E313D] transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={14} />
            </a>
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="p-2 rounded-lg bg-[#1F212A] hover:bg-[#2A2D3A] text-gray-300 hover:text-white border border-[#2E313D] transition-colors"
              aria-label="Send Email"
            >
              <Mail size={14} />
            </a>
          </div>
        </div>

        {/* Right: Real Scannable QR & Actions */}
        <div className="flex flex-col items-center gap-3 bg-[#0E0F15] p-3.5 rounded-xl border border-[#1F212A] flex-shrink-0 self-center md:self-auto">
          <div className="p-1.5 bg-white rounded-lg shadow-md">
            <canvas ref={canvasRef} className="block rounded" aria-label="Portfolio QR Code" />
          </div>

          <div className="flex items-center gap-1.5 w-full">
            <button
              onClick={handleCopyCard}
              className="flex-1 px-2.5 py-1.5 rounded-lg bg-[#1A1C25] hover:bg-[#222432] border border-[#2A2D3A] text-gray-200 hover:text-white text-[11px] font-medium flex items-center justify-center gap-1 transition-colors"
            >
              {copied ? (
                <>
                  <Check size={11} className="text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={11} />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg bg-[#1A1C25] hover:bg-[#222432] border border-[#2A2D3A] text-gray-200 hover:text-white transition-colors"
              title="Share Card"
              aria-label="Share Business Card"
            >
              <Share2 size={12} className="text-purple-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
