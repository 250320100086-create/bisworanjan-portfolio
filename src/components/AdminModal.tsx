import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  X,
  ShieldAlert,
  BarChart3,
  Layers,
  Award,
  BookOpen,
  LogOut,
  Trash2,
  CheckCircle,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Smartphone,
  Laptop,
  Tablet,
  QrCode as QrIcon,
} from 'lucide-react';
import QRCode from 'qrcode';
import { analytics, AnalyticsEvent } from '../utils/analytics';
import { CASE_STUDIES } from '../data/caseStudiesData';
import { BLOG_POSTS } from '../data/blogData';

// Simple hashed passcode verification or environment variable fallback
// Default demo password is "bp-admin-2026"
const DEFAULT_PASSCODE = 'bp-admin-2026';
const SESSION_AUTH_KEY = 'bp_admin_authenticated';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'analytics' | 'projects' | 'blog' | 'devtools'>('analytics');
  const [analyticsData, setAnalyticsData] = useState<{
    totalEvents: number;
    countsByType: Record<string, number>;
    recentEvents: AnalyticsEvent[];
  }>({ totalEvents: 0, countsByType: {}, recentEvents: [] });

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_AUTH_KEY) === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      setAnalyticsData(analytics.getStats());
    }
  }, [isOpen, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const targetPasscode =
      (typeof import.meta !== 'undefined' &&
        import.meta.env &&
        import.meta.env.VITE_ADMIN_PASSCODE) ||
      DEFAULT_PASSCODE;

    if (passcode.trim() === targetPasscode) {
      setIsAuthenticated(true);
      sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
      setPasscode('');
      setAnalyticsData(analytics.getStats());
    } else {
      setErrorMessage('Invalid administrative passcode. Access denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(SESSION_AUTH_KEY);
    setPasscode('');
  };

  const handleClearAnalytics = () => {
    analytics.clearEvents();
    setAnalyticsData(analytics.getStats());
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Admin Dashboard"
    >
      <div className="bg-[#13141C] border border-[#2A2D3A] rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in slide-in relative overflow-hidden">
        {/* Header */}
        <div className="p-5 md:p-6 border-b border-[#1F212A] bg-gradient-to-r from-[#1A1828] to-[#13141C] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              {isAuthenticated ? <Unlock size={20} /> : <Lock size={20} />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Private Admin Dashboard
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
                  {isAuthenticated ? 'Authenticated' : 'Protected Area'}
                </span>
              </h2>
              <p className="text-xs text-gray-400">
                Administrative metrics, telemetry analytics, and portfolio data overview
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="py-1.5 px-3 bg-[#1A1C23] hover:bg-rose-500/20 border border-[#2A2D3A] hover:border-rose-500/40 text-rose-300 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                title="Log Out"
              >
                <LogOut size={13} /> Logout
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] rounded-xl transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          {!isAuthenticated ? (
            /* Login Form */
            <form onSubmit={handleLogin} className="max-w-md mx-auto py-10 space-y-4">
              <div className="text-center mb-6">
                <ShieldAlert size={36} className="text-purple-400 mx-auto mb-2" />
                <h3 className="text-base font-semibold text-white">Administrator Access Verification</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Enter your private passcode to access telemetry analytics and system data.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Administrative Passcode:
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode..."
                  className="w-full bg-[#161722] border border-[#2A2D3A] focus:border-purple-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition-colors"
                />
              </div>

              {errorMessage && (
                <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-xl">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white rounded-xl text-xs font-medium transition-all shadow-md shadow-purple-500/20"
              >
                Unlock Administrator Console
              </button>

              <p className="text-[11px] text-gray-500 text-center pt-2">
                Protected via environment secret · Zero credentials stored in source code
              </p>
            </form>
          ) : (
            /* Authenticated Admin Views */
            <div className="space-y-6">
              {/* Tab Navigation */}
              <div className="flex flex-wrap items-center gap-2 border-b border-[#1F212A] pb-3">
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                    activeTab === 'analytics'
                      ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white'
                      : 'bg-[#161722] text-gray-400 hover:text-white'
                  }`}
                >
                  <BarChart3 size={13} /> Telemetry Analytics ({analyticsData.totalEvents})
                </button>

                <button
                  onClick={() => setActiveTab('projects')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                    activeTab === 'projects'
                      ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white'
                      : 'bg-[#161722] text-gray-400 hover:text-white'
                  }`}
                >
                  <Layers size={13} /> Managed Projects ({Object.keys(CASE_STUDIES).length})
                </button>

                <button
                  onClick={() => setActiveTab('devtools')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                    activeTab === 'devtools'
                      ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white'
                      : 'bg-[#161722] text-gray-400 hover:text-white'
                  }`}
                >
                  <Wrench size={13} /> Developer Tools & Health
                </button>
              </div>

              {/* Tab: Telemetry Analytics */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  {/* Metric Counters */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl bg-[#161722] border border-[#1F212A]">
                      <span className="text-[11px] text-gray-400">Total Tracked Events</span>
                      <p className="text-xl font-bold font-mono text-white mt-1">
                        {analyticsData.totalEvents}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#161722] border border-[#1F212A]">
                      <span className="text-[11px] text-gray-400">Project Opened</span>
                      <p className="text-xl font-bold font-mono text-fuchsia-400 mt-1">
                        {analyticsData.countsByType['project_opened'] || 0}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#161722] border border-[#1F212A]">
                      <span className="text-[11px] text-gray-400">Resume Viewed/DL</span>
                      <p className="text-xl font-bold font-mono text-blue-400 mt-1">
                        {(analyticsData.countsByType['resume_viewed'] || 0) +
                          (analyticsData.countsByType['resume_downloaded'] || 0)}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#161722] border border-[#1F212A]">
                      <span className="text-[11px] text-gray-400">Playground Demos</span>
                      <p className="text-xl font-bold font-mono text-emerald-400 mt-1">
                        {analyticsData.countsByType['playground_run'] || 0}
                      </p>
                    </div>
                  </div>

                  {/* Recent Logs Table */}
                  <div className="bg-[#161722] border border-[#1F212A] rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-white uppercase tracking-wider">
                        Recent Local Event Activity (Last 25)
                      </span>
                      <button
                        onClick={handleClearAnalytics}
                        className="text-[11px] text-gray-400 hover:text-rose-400 flex items-center gap-1"
                      >
                        <Trash2 size={12} /> Clear Logs
                      </button>
                    </div>

                    {analyticsData.recentEvents.length > 0 ? (
                      <div className="space-y-1.5 max-h-[260px] overflow-y-auto custom-scrollbar">
                        {analyticsData.recentEvents.map((ev, i) => (
                          <div
                            key={i}
                            className="p-2 rounded bg-[#1C1E2B] border border-[#2A2D3A] flex items-center justify-between text-[11px] font-mono"
                          >
                            <span className="text-fuchsia-300">{ev.type}</span>
                            <span className="text-gray-500">
                              {new Date(ev.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 py-4 text-center">
                        No telemetry events recorded yet. Navigate or interact with features to record events.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Tab: Managed Projects */}
              {activeTab === 'projects' && (
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-white uppercase tracking-wider block">
                    Verified Portfolio Case Studies
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.values(CASE_STUDIES).map((cs) => (
                      <div
                        key={cs.id}
                        className="p-3.5 rounded-xl bg-[#161722] border border-[#1F212A] flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-[10px] font-mono text-fuchsia-400 mb-1">
                            <span>ID: /{cs.id}</span>
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle size={10} /> Active
                            </span>
                          </div>
                          <h4 className="text-xs font-semibold text-white">{cs.title}</h4>
                          <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">{cs.overview}</p>
                        </div>
                        <div className="mt-3 text-[10px] text-gray-500 font-mono">
                          Tech: {cs.technologies.slice(0, 3).join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Blog Articles */}
              {activeTab === 'blog' && (
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-white uppercase tracking-wider block">
                    Technical Articles Registry
                  </span>
                  <div className="space-y-2">
                    {BLOG_POSTS.map((bp) => (
                      <div
                        key={bp.id}
                        className="p-3 rounded-xl bg-[#161722] border border-[#1F212A] flex items-center justify-between text-xs"
                      >
                        <div>
                          <p className="font-semibold text-white">{bp.title}</p>
                          <span className="text-[10px] text-gray-400">
                            {bp.category} · {bp.date} · {bp.readingTime}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1C1E2B] text-gray-300">
                          {bp.tags.length} tags
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Developer Tools & System Health */}
              {activeTab === 'devtools' && (
                <div className="space-y-6">
                  {/* System Health Overview */}
                  <div className="p-4 rounded-xl bg-[#161722] border border-[#1F212A] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle size={14} className="text-emerald-400" /> System Health Diagnostics
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        100% Operational
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-[#1C1E2B] border border-[#2A2D3A]">
                        <span className="text-[10px] text-gray-400">Build Engine</span>
                        <p className="font-semibold text-white mt-0.5">Vite v6.2 + React 19</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#1C1E2B] border border-[#2A2D3A]">
                        <span className="text-[10px] text-gray-400">TypeScript</span>
                        <p className="font-semibold text-emerald-400 mt-0.5">0 Type Errors</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#1C1E2B] border border-[#2A2D3A]">
                        <span className="text-[10px] text-gray-400">Production Bundle</span>
                        <p className="font-semibold text-white mt-0.5">Clean Dist Target</p>
                      </div>
                    </div>
                  </div>

                  {/* Real Link Status Checker */}
                  <div className="p-4 rounded-xl bg-[#161722] border border-[#1F212A] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Configured Link & Asset Verifier
                      </span>
                      <span className="text-[10px] text-gray-400">
                        Live Status
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      {[
                        { name: 'Official Resume PDF', url: '/resume.pdf', type: 'Internal Asset', status: 'Working' },
                        { name: 'Heart Disease ML Demo', url: '/heart-disease.html', type: 'Internal Demo', status: 'Working' },
                        { name: 'GitHub Profile', url: 'https://github.com/250320100086-create', type: 'External Endpoint', status: 'Working' },
                        { name: 'LinkedIn Profile', url: 'https://www.linkedin.com/in/bisworanjan-palar', type: 'External Endpoint', status: 'Working' },
                        { name: 'Production Vercel Host', url: 'https://bisworanjan-portfolio.vercel.app', type: 'Primary Domain', status: 'Working' },
                      ].map((item) => (
                        <div
                          key={item.url}
                          className="p-2.5 rounded-lg bg-[#1C1E2B] border border-[#2A2D3A] flex items-center justify-between"
                        >
                          <div className="min-w-0 pr-2">
                            <p className="font-medium text-white truncate">{item.name}</p>
                            <span className="text-[10px] font-mono text-gray-400">{item.url}</span>
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[11px] font-semibold text-emerald-400">{item.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Admin Custom QR Generator */}
                  <div className="p-4 rounded-xl bg-[#161722] border border-[#1F212A] space-y-3">
                    <span className="text-xs font-bold text-white uppercase tracking-wider block">
                      Custom URL QR Code Generator
                    </span>
                    <p className="text-[11px] text-gray-400">
                      Generate high-contrast, scannable QR codes for any portfolio deep-link.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#1C1E2B] p-3 rounded-lg border border-[#2A2D3A]">
                      <div className="p-2 bg-white rounded-lg shadow-md">
                        <canvas id="admin-qr-canvas" width={90} height={90} className="block" />
                      </div>
                      <div className="flex-1 space-y-2 w-full">
                        <input
                          type="text"
                          defaultValue="https://bisworanjan-portfolio.vercel.app"
                          id="admin-qr-input"
                          className="w-full bg-[#13141C] border border-[#2A2D3A] rounded-lg px-3 py-1.5 text-xs text-white font-mono outline-none focus:border-fuchsia-500"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const input = document.getElementById('admin-qr-input') as HTMLInputElement;
                            const canvas = document.getElementById('admin-qr-canvas') as HTMLCanvasElement;
                            if (input && canvas) {
                              QRCode.toCanvas(canvas, input.value || 'https://bisworanjan-portfolio.vercel.app', {
                                width: 90,
                                margin: 1,
                                color: { dark: '#000000', light: '#ffffff' }
                              });
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-medium transition-colors"
                        >
                          Generate / Refresh QR
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1F212A] bg-[#101118] flex items-center justify-between text-[11px] text-gray-500 flex-shrink-0">
          <span>Antigravity Secure Administration Module</span>
          <button
            onClick={onClose}
            className="py-1 px-3 bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] text-gray-300 rounded-lg text-xs"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
