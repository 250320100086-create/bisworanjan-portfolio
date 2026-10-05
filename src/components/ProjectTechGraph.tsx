import React, { useState } from 'react';
import { Network, Layers, ExternalLink, ArrowRight, Cpu, Database, Server, Terminal, Globe } from 'lucide-react';

interface TechNode {
  id: string;
  name: string;
  type: 'Project' | 'Language' | 'Framework' | 'Model' | 'Database' | 'Deployment';
  projectIds: string[];
  color: string;
}

const TECH_NODES: TechNode[] = [
  // Projects
  { id: 'p-cybershield', name: 'CyberShield Analytics', type: 'Project', projectIds: ['p-cybershield'], color: '#d946ef' },
  { id: 'p-drone', name: 'AI Drone Surveillance', type: 'Project', projectIds: ['p-drone'], color: '#3b82f6' },
  { id: 'p-chatbot', name: 'AI Chatbot Assistant', type: 'Project', projectIds: ['p-chatbot'], color: '#a855f7' },
  { id: 'p-attendance', name: 'Student Attendance', type: 'Project', projectIds: ['p-attendance'], color: '#10b981' },
  { id: 'p-heart', name: 'Heart Disease Predictor', type: 'Project', projectIds: ['p-heart'], color: '#f59e0b' },

  // Languages
  { id: 't-python', name: 'Python', type: 'Language', projectIds: ['p-cybershield', 'p-drone', 'p-chatbot', 'p-attendance', 'p-heart'], color: '#38bdf8' },
  { id: 't-js', name: 'JavaScript / TS', type: 'Language', projectIds: ['p-chatbot'], color: '#facc15' },

  // Frameworks
  { id: 't-fastapi', name: 'FastAPI', type: 'Framework', projectIds: ['p-cybershield', 'p-drone', 'p-chatbot', 'p-attendance'], color: '#34d399' },
  { id: 't-flask', name: 'Flask', type: 'Framework', projectIds: ['p-heart'], color: '#e879f9' },
  { id: 't-react', name: 'React.js', type: 'Framework', projectIds: ['p-chatbot'], color: '#60a5fa' },

  // AI Models
  { id: 't-sklearn', name: 'Scikit-learn (SVM/Random Forest)', type: 'Model', projectIds: ['p-cybershield', 'p-heart'], color: '#f97316' },
  { id: 't-opencv', name: 'OpenCV & Computer Vision', type: 'Model', projectIds: ['p-drone', 'p-attendance'], color: '#818cf8' },
  { id: 't-nlp', name: 'NLP Intent Engine', type: 'Model', projectIds: ['p-chatbot'], color: '#2dd4bf' },

  // Databases & Storage
  { id: 't-sql', name: 'PostgreSQL / SQL', type: 'Database', projectIds: ['p-cybershield', 'p-attendance', 'p-chatbot'], color: '#f43f5e' },

  // Deployment
  { id: 't-vercel', name: 'Vercel / Cloud Microservices', type: 'Deployment', projectIds: ['p-chatbot', 'p-cybershield', 'p-heart'], color: '#ffffff' },
];

export const ProjectTechGraph: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<TechNode | null>(TECH_NODES[0]);

  const activeProjectIds = selectedNode ? selectedNode.projectIds : [];

  return (
    <div className="p-6 rounded-2xl bg-[#13141C] border border-[#1F212A] shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-[#1F212A] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Network size={16} />
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Project Architecture & Technology Graph
            </h3>
          </div>
          <p className="text-xs text-gray-400">
            Click any technology or project node to trace connected pipeline layers
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
          <span>Layer: Project → Language → Framework → Model → DB</span>
        </div>
      </div>

      {/* Nodes Map */}
      <div className="space-y-4 mb-6">
        {(['Project', 'Language', 'Framework', 'Model', 'Database', 'Deployment'] as const).map((type) => {
          const rowNodes = TECH_NODES.filter((n) => n.type === type);
          return (
            <div key={type} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="w-24 text-[10px] font-mono uppercase text-gray-500 font-semibold tracking-wider">
                {type}
              </span>
              <div className="flex flex-wrap gap-2 flex-1">
                {rowNodes.map((node) => {
                  const isSelected = selectedNode?.id === node.id;
                  const isConnected =
                    selectedNode &&
                    (node.id === selectedNode.id ||
                      node.projectIds.some((pid) => activeProjectIds.includes(pid)));

                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-fuchsia-600 text-white border-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.3)] scale-105'
                          : isConnected
                          ? 'bg-[#1D1F2E] text-gray-100 border-[#3D4058] shadow-sm'
                          : 'bg-[#161722] text-gray-400 border-[#2A2D3A] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: node.color }}
                      />
                      <span>{node.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Connection Info Banner */}
      {selectedNode && (
        <div className="p-4 rounded-xl bg-[#161724] border border-[#2A2D3A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: selectedNode.color }}
            />
            <div>
              <p className="text-xs font-semibold text-white">
                Selected: <span className="text-fuchsia-400">{selectedNode.name}</span> ({selectedNode.type})
              </p>
              <p className="text-[11px] text-gray-400">
                Connected with {activeProjectIds.length} verified project pipeline(s)
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-[#1F212E] border border-[#2E3142] text-gray-300">
            Pipeline Verified
          </span>
        </div>
      )}
    </div>
  );
};
