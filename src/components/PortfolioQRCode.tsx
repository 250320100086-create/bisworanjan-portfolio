import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download, Share2, Copy, Check, ExternalLink, QrCode } from 'lucide-react';
import { analytics } from '../utils/analytics';

export const OFFICIAL_PORTFOLIO_URL = 'https://bisworanjan-portfolio.vercel.app';

interface PortfolioQRCodeProps {
  size?: number;
  showActions?: boolean;
  className?: string;
  variant?: 'card' | 'compact' | 'standalone';
}

export const PortfolioQRCode: React.FC<PortfolioQRCodeProps> = ({
  size = 180,
  showActions = true,
  className = '',
  variant = 'card',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    QRCode.toCanvas(
      canvasRef.current,
      OFFICIAL_PORTFOLIO_URL,
      {
        errorCorrectionLevel: 'H', // High error tolerance (~30%)
        margin: 2, // Standard quiet zone
        width: size,
        color: {
          dark: '#000000', // Crisp black modules for universal optical camera scanning
          light: '#ffffff', // High contrast pure white background
        },
      },
      (error) => {
        if (error) {
          console.error('[QRCode Error]', error);
        } else {
          setQrGenerated(true);
        }
      }
    );
  }, [size]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'Bisworanjan_Palar_Portfolio_QR.png';
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      analytics.track('qr_downloaded', { url: OFFICIAL_PORTFOLIO_URL });
    } catch (err) {
      console.error('Failed to download QR code', err);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(OFFICIAL_PORTFOLIO_URL);
    setCopied(true);
    analytics.track('portfolio_url_copied', { source: 'qr_component' });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    analytics.track('portfolio_shared', { method: 'qr_native_share' });
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Bisworanjan Palar | AI & ML Developer Portfolio',
          text: 'Explore AI/ML projects and computer vision systems by Bisworanjan Palar.',
          url: OFFICIAL_PORTFOLIO_URL,
        });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        <div className="p-2 bg-white rounded-xl shadow-md border border-gray-200">
          <canvas
            ref={canvasRef}
            aria-label={`Scannable QR code linking to ${OFFICIAL_PORTFOLIO_URL}`}
            className="rounded-lg block"
          />
        </div>
        <span className="font-mono text-[10px] text-gray-400">Scan to visit portfolio</span>
      </div>
    );
  }

  return (
    <div
      className={`p-4 rounded-2xl bg-[#161722] border border-[#2A2D3A] flex flex-col items-center text-center ${className}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <QrCode size={16} className="text-fuchsia-400" />
        <span className="text-xs font-semibold text-white tracking-wide">
          Official Portfolio QR Code
        </span>
      </div>

      {/* ISO/IEC 18004 Scannable QR Container */}
      <div className="p-2.5 bg-white rounded-xl shadow-lg border border-gray-200 mb-3 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          aria-label={`Official QR code linking directly to ${OFFICIAL_PORTFOLIO_URL}`}
          className="rounded-lg block"
        />
      </div>

      <p className="text-[11px] text-gray-400 max-w-[200px] mb-3 leading-tight">
        Scan with mobile camera or Google Lens to view live portfolio.
      </p>

      {showActions && (
        <div className="w-full flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDownload}
              disabled={!qrGenerated}
              className="px-3 py-1.5 rounded-lg bg-[#1F212A] hover:bg-[#2A2D3A] text-gray-200 text-xs font-medium flex items-center justify-center gap-1.5 border border-[#2E313D] transition-all hover:text-white"
            >
              <Download size={13} className="text-fuchsia-400" />
              <span>Download</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg bg-[#1F212A] hover:bg-[#2A2D3A] text-gray-200 text-xs font-medium flex items-center justify-center gap-1.5 border border-[#2E313D] transition-all hover:text-white"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} className="text-blue-400" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg bg-[#1F212A] hover:bg-[#2A2D3A] text-gray-200 text-xs font-medium flex items-center justify-center gap-1.5 border border-[#2E313D] transition-all hover:text-white"
            >
              <Share2 size={13} className="text-purple-400" />
              <span>Share</span>
            </button>

            <a
              href={OFFICIAL_PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-fuchsia-600/30 to-blue-600/30 hover:from-fuchsia-600/50 hover:to-blue-600/50 text-white text-xs font-medium flex items-center justify-center gap-1.5 border border-fuchsia-500/30 transition-all"
            >
              <ExternalLink size={13} className="text-fuchsia-400" />
              <span>Open URL</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
