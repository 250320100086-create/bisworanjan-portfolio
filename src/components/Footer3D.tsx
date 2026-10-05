import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  Download,
  QrCode,
  ArrowUp,
  ChevronRight,
  Code2,
} from "lucide-react";
import { analytics } from "../utils/analytics";

const PORTFOLIO_URL = "https://bisworanjan-portfolio.vercel.app";
const GITHUB_URL = "https://github.com/250320100086-create";
const LINKEDIN_URL = "https://www.linkedin.com/in/bisworanjan-palar";
const EMAIL = "bisworanjanpalar@gmail.com";
const GOOGLE_MAPS_EMBED =
  "https://maps.google.com/maps?q=Bhubaneswar%2C%20Odisha%2C%20India&t=&z=12&ie=UTF8&iwloc=&output=embed";
const GOOGLE_MAPS_LINK =
  "https://www.google.com/maps/place/Bhubaneswar,+Odisha";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github" },
  { label: "Blog", href: "#blog" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

import QRCode from "qrcode";

interface FooterQRProps {
  url: string;
}

const FooterQRDisplay: React.FC<FooterQRProps> = ({ url }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    QRCode.toCanvas(
      canvas,
      url,
      {
        errorCorrectionLevel: 'H',
        margin: 1,
        width: 80,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      },
      (error) => {
        if (error) console.error('[Footer QR Error]', error);
      }
    );
  }, [url]);

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "Bisworanjan_Palar_Portfolio_QR.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    analytics.track("portfolio_qr_downloaded");
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="p-1.5 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <canvas ref={canvasRef} className="block rounded-lg" aria-label={`Scannable QR code linking to ${url}`} />
      </div>
      <button
        onClick={handleDownload}
        className="flex items-center gap-1 text-[10px] font-mono text-gray-400 hover:text-fuchsia-400 transition-colors"
        aria-label="Download QR Code"
      >
        <Download size={10} /> Save QR
      </button>
    </div>
  );
};

import { PortfolioStatus } from "./PortfolioStatus";

export const Footer3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      setTilt({ x: dy * 3, y: dx * -3 });
    },
    [prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer-3d"
      className="relative mt-12 overflow-hidden"
      aria-labelledby="footer-heading"
    >
      {/* Decorative top glow line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent mb-px" />

      {/* Ambient floating orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-fuchsia-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-56 h-56 bg-blue-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-10 w-40 h-40 bg-purple-500/4 rounded-full blur-2xl" />
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative"
        style={{
          transform: prefersReducedMotion
            ? "none"
            : `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.25s ease-out",
        }}
      >
        {/* Glass container */}
        <div className="bg-gradient-to-b from-[#0D0E18] to-[#0B0C10] border-t border-[#1F212A]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 xl:px-16 py-14">
            {/* === Top section === */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
              {/* Brand + CTA */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-fuchsia-400 via-purple-400 to-blue-400 tracking-tighter">
                    BP
                  </span>
                  <div>
                    <p className="text-white font-semibold text-lg leading-tight">
                      Bisworanjan Palar
                    </p>
                    <p className="text-xs text-gray-400">AI & ML Developer</p>
                  </div>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed mb-5">
                  Building intelligent AI systems — from computer vision pipelines to predictive
                  analytics. Open to engineering roles & collaborations.
                </p>

                {/* Availability indicator */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse flex-shrink-0" />
                  <span className="text-xs text-emerald-300 font-medium">
                    Available for AI/ML roles — Response &lt;24h
                  </span>
                </div>

                {/* Social links */}
                <div className="flex items-center gap-2.5">
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => analytics.track("github_clicked")}
                    className="p-2.5 bg-[#161722] border border-[#2A2D3A] rounded-xl text-gray-400 hover:text-white hover:border-fuchsia-500/50 transition-all hover:scale-110"
                    aria-label="GitHub"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => analytics.track("linkedin_clicked")}
                    className="p-2.5 bg-[#161722] border border-[#2A2D3A] rounded-xl text-gray-400 hover:text-white hover:border-blue-500/50 transition-all hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={16} />
                  </a>
                  <a
                    href={`mailto:${EMAIL}`}
                    onClick={() => analytics.track("contact_form_submitted")}
                    className="p-2.5 bg-[#161722] border border-[#2A2D3A] rounded-xl text-gray-400 hover:text-white hover:border-purple-500/50 transition-all hover:scale-110"
                    aria-label="Email"
                  >
                    <Mail size={16} />
                  </a>
                  <a
                    href="/resume.pdf"
                    download="Bisworanjan_Palar_Resume.pdf"
                    onClick={() => analytics.track("resume_downloaded")}
                    className="p-2.5 bg-[#161722] border border-[#2A2D3A] rounded-xl text-gray-400 hover:text-white hover:border-emerald-500/50 transition-all hover:scale-110"
                    aria-label="Download Resume"
                  >
                    <Download size={16} />
                  </a>
                </div>
              </div>

              {/* Navigation links */}
              <div className="lg:col-span-1">
                <h3 id="footer-heading" className="text-xs font-semibold text-fuchsia-400 uppercase tracking-widest mb-4">
                  Navigate
                </h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors group"
                    >
                      <ChevronRight
                        size={13}
                        className="text-fuchsia-500/50 group-hover:text-fuchsia-400 transition-colors flex-shrink-0"
                      />
                      {link.label}
                    </a>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-[#13141C] border border-[#1F212A] rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={13} className="text-fuchsia-400 flex-shrink-0" />
                    <span className="text-xs text-white font-semibold">
                      Bhubaneswar, Odisha, India
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 mb-3">
                    IST (UTC+5:30) · Open to remote & on-site opportunities
                  </p>
                  <a
                    href={GOOGLE_MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] text-fuchsia-400 hover:text-fuchsia-300 transition-colors font-medium"
                    aria-label="Open Bhubaneswar on Google Maps"
                  >
                    <ExternalLink size={11} /> Open in Google Maps
                  </a>
                </div>
              </div>

              {/* Map + QR */}
              <div className="lg:col-span-1 flex flex-col gap-5">
                {/* Google Maps embed — city level, no private GPS, zero API key leak */}
                <div className="flex-1 min-h-[160px] rounded-xl overflow-hidden border border-[#1F212A] relative bg-[#13141C]">
                  <iframe
                    src={GOOGLE_MAPS_EMBED}
                    width="100%"
                    height="100%"
                    style={{ minHeight: "160px", border: 0 }}
                    loading="lazy"
                    title="Bhubaneswar, Odisha, India — City Level Google Map"
                    allowFullScreen={false}
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute inset-0 pointer-events-none border border-fuchsia-500/10 rounded-xl" />
                </div>

                {/* QR Code */}
                <div className="flex items-center gap-4 p-4 bg-[#13141C] border border-[#1F212A] rounded-xl">
                  <FooterQRDisplay url={PORTFOLIO_URL} />
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <QrCode size={13} className="text-fuchsia-400" />
                      <span className="text-xs font-semibold text-white">Portfolio QR</span>
                    </div>
                    <p className="text-[10px] text-gray-400 leading-snug">
                      Scan to visit portfolio on any device
                    </p>
                    <a
                      href={PORTFOLIO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono text-fuchsia-400 hover:text-fuchsia-300 transition-colors mt-1 inline-block break-all"
                      aria-label="Visit portfolio website"
                    >
                      bisworanjan-portfolio.vercel.app
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* === Let's Connect CTA === */}
            <div className="bg-gradient-to-r from-[#161424] via-[#14162A] to-[#161424] border border-fuchsia-500/15 rounded-2xl p-6 mb-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/3 via-blue-600/5 to-fuchsia-600/3 pointer-events-none" />
              <h3 className="text-xl font-bold text-white mb-2 relative z-10">
                Let&apos;s <span className="text-fuchsia-400">Connect</span>
              </h3>
              <p className="text-sm text-gray-400 mb-4 relative z-10 max-w-xl mx-auto">
                I am actively looking for AI/ML engineering opportunities and technical collaborations.
                Reach out directly or connect on LinkedIn.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
                <a
                  href={`mailto:${EMAIL}`}
                  className="py-2.5 px-5 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 text-white rounded-xl text-sm font-medium transition-all flex items-center gap-2 shadow-md shadow-fuchsia-500/20"
                  onClick={() => analytics.track("contact_form_submitted")}
                  aria-label="Send email to Bisworanjan"
                >
                  <Mail size={15} /> Send Email
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-5 bg-[#161722] hover:bg-[#1A1C2A] border border-blue-500/30 hover:border-blue-500/60 text-blue-300 hover:text-white rounded-xl text-sm font-medium transition-all flex items-center gap-2"
                  onClick={() => analytics.track("linkedin_clicked")}
                  aria-label="Connect on LinkedIn"
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
              </div>
            </div>

            {/* === Live System Status === */}
            <div className="mb-10">
              <PortfolioStatus />
            </div>

            {/* === Bottom bar === */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#1F212A]">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Code2 size={13} className="text-fuchsia-500/60" />
                <span>© 2026 Bisworanjan Palar. All Rights Reserved.</span>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500">
                <a
                  href={PORTFOLIO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-fuchsia-400 transition-colors font-mono"
                  aria-label="Portfolio website"
                >
                  bisworanjan-portfolio.vercel.app
                </a>
                <span>·</span>
                <span>Vite + React + TypeScript</span>
              </div>

              {/* Back to top */}
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors group"
                aria-label="Scroll back to top"
              >
                <ArrowUp
                  size={14}
                  className="group-hover:text-fuchsia-400 transition-colors group-hover:-translate-y-0.5 transition-transform"
                />
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
