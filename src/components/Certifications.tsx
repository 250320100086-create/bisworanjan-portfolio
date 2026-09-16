import React, { useState, memo } from 'react';
import { Award, ExternalLink, ShieldCheck, CheckCircle2, X, Eye } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  score?: string;
  grade?: string;
  skillsCovered: string[];
  pdfPath: string;
  badgeColor: string;
  verified: boolean;
}

const CERTIFICATES: Certificate[] = [
  {
    id: 'oracle-ai',
    title: 'Oracle Certified Foundations Associate & Agentic AI Associate',
    issuer: 'Oracle University / Oracle Corporation',
    date: 'August 25, 2026',
    credentialId: '103523797AAI26OFA',
    score: 'Oracle Certified',
    skillsCovered: ['Agentic AI', 'Oracle Cloud', 'Machine Learning Foundations', 'AI Architecture'],
    pdfPath: '/certificates/oracle-cert.pdf',
    badgeColor: 'text-red-400 border-red-500/30 bg-red-500/10',
    verified: true,
  },
  {
    id: 'internshala-ml',
    title: 'Machine Learning with AI — Certificate of Training',
    issuer: 'Internshala Trainings',
    date: 'May 31, 2026',
    credentialId: '1xi02p15nrg',
    score: '98% Marks (Top Performer)',
    skillsCovered: [
      'Python Programming',
      'Data Analytics & Viz',
      'AI Tools Analytics',
      'Supervised Learning (Regression & Classification)',
      'Unsupervised Learning (Clustering)',
      'ML Lifecycle Tracking',
    ],
    pdfPath: '/certificates/internshala-ml-cert.pdf',
    badgeColor: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
    verified: true,
  },
  {
    id: 'nasscom-security',
    title: 'Network Security Engineer — Certificate of Participation',
    issuer: 'Skill India Digital Hub / NSDC (NASSCOM)',
    date: 'August 2, 2026',
    skillsCovered: ['Network Security', 'Information Security', 'NSDC Framework', 'Cyber Hygiene'],
    pdfPath: '/certificates/nasscom-security-cert.pdf',
    badgeColor: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    verified: true,
  },
  {
    id: 'scholiverse-ml',
    title: 'Certificate Program in Machine Learning with AI',
    issuer: 'Scholiverse Educare Private Limited',
    date: 'August 4, 2026',
    credentialId: '6g1k1acrytpn00h8',
    grade: 'Grade A (ID: CAN_40498349)',
    skillsCovered: ['Machine Learning', 'AI Models', 'Feature Engineering', 'Model Deployment'],
    pdfPath: '/certificates/scholiverse-ml-cert.pdf',
    badgeColor: 'text-fuchsia-400 border-fuchsia-500/30 bg-fuchsia-500/10',
    verified: true,
  },
];

export const Certifications = memo(function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section id="certifications" className="py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-white">Verified Certifications & Credentials</h2>
          <p className="text-xs text-gray-400 mt-1">Original verified PDF certificates from Oracle, Internshala (98% Top Performer), NSDC, and Scholiverse</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CERTIFICATES.map((cert) => (
          <div
            key={cert.id}
            className="bg-[#13141C] border border-[#1F212A] rounded-2xl p-6 hover:border-fuchsia-500/40 hover:bg-[#151620] transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl border ${cert.badgeColor}`}>
                  <Award size={24} />
                </div>

                <div className="flex flex-col items-end gap-1">
                  {cert.score && (
                    <span className="text-xs font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full">
                      {cert.score}
                    </span>
                  )}
                  {cert.grade && (
                    <span className="text-xs font-bold text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/20 px-3 py-1 rounded-full">
                      {cert.grade}
                    </span>
                  )}
                  <span className="text-[10px] text-gray-400 font-mono">{cert.date}</span>
                </div>
              </div>

              <h3 className="text-white font-medium text-lg mb-2 group-hover:text-fuchsia-300 transition-colors">
                {cert.title}
              </h3>

              <p className="text-xs text-gray-300 font-medium mb-3">{cert.issuer}</p>

              {cert.credentialId && (
                <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono mb-4 bg-[#1A1C23] border border-[#2A2D3A] px-3 py-1.5 rounded-lg w-fit">
                  <ShieldCheck size={14} className="text-green-400" />
                  <span>Credential ID: <strong className="text-gray-200">{cert.credentialId}</strong></span>
                </div>
              )}

              <div className="space-y-1.5 mb-6">
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Key Skills Covered:</p>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skillsCovered.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] px-2.5 py-1 bg-[#1A1C23] border border-[#2A2D3A] text-gray-300 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-[#1F212A]">
              <button
                onClick={() => setSelectedCert(cert)}
                className="flex-1 py-2.5 px-3 bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] hover:border-fuchsia-500/50 text-white rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5"
              >
                <Eye size={14} /> Quick Preview
              </button>

              <a
                href={cert.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 text-white rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 shadow-md shadow-fuchsia-500/20"
              >
                <ExternalLink size={14} /> View Original PDF
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog for Real PDF Certificate Preview */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#13141C] border border-[#2A2D3A] rounded-2xl max-w-4xl w-full p-6 relative space-y-4 shadow-2xl animate-in slide-in">
            <div className="flex items-center justify-between border-b border-[#1F212A] pb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border ${selectedCert.badgeColor}`}>
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base">{selectedCert.title}</h3>
                  <p className="text-xs text-gray-400">{selectedCert.issuer}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-1.5 text-gray-400 hover:text-white bg-[#1A1C23] rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Embedded Original PDF Viewer */}
            <div className="w-full h-[520px] bg-[#1A1C23] rounded-xl overflow-hidden border border-[#2A2D3A]">
              <iframe
                src={selectedCert.pdfPath}
                title={selectedCert.title}
                className="w-full h-full border-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1.5 text-xs text-green-400 font-medium">
                <CheckCircle2 size={14} /> Official Original Document Verified
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="py-2 px-4 bg-[#1A1C23] border border-[#2A2D3A] text-gray-300 rounded-xl text-xs"
                >
                  Close
                </button>
                <a
                  href={selectedCert.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-4 bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white rounded-xl text-xs font-medium flex items-center gap-1.5 shadow-md"
                >
                  Open PDF in New Tab <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});
