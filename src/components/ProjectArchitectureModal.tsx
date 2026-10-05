import React, { useState, useEffect } from 'react';
import {
  X,
  Workflow,
  Layers,
  ArrowRight,
  Database,
  Cpu,
  Eye,
  Server,
  Monitor,
  Info,
} from 'lucide-react';
import { ProjectArchitecture, ArchitectureNode } from '../data/projectArchitecturesData';

interface ProjectArchitectureModalProps {
  architecture: ProjectArchitecture | null;
  onClose: () => void;
}

export const ProjectArchitectureModal: React.FC<ProjectArchitectureModalProps> = ({
  architecture,
  onClose,
}) => {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (architecture) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setSelectedNode(architecture.nodes[0] || null);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [architecture, onClose]);

  if (!architecture) return null;

  const getRoleIcon = (role: ArchitectureNode['role']) => {
    switch (role) {
      case 'Frontend':
        return <Monitor size={15} className="text-blue-400" />;
      case 'Gateway':
        return <Server size={15} className="text-purple-400" />;
      case 'ML Engine':
        return <Cpu size={15} className="text-fuchsia-400" />;
      case 'Database':
        return <Database size={15} className="text-emerald-400" />;
      case 'Output / Alert':
        return <Eye size={15} className="text-orange-400" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Project Architecture Diagram"
    >
      <div className="bg-[#13141C] border border-[#2A2D3A] rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in slide-in relative overflow-hidden">
        {/* Header */}
        <div className="p-5 md:p-6 border-b border-[#1F212A] bg-gradient-to-r from-[#171828] to-[#13141C] flex items-start justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400">
                <Workflow size={16} />
              </span>
              <span className="text-[11px] font-mono text-fuchsia-400">
                Interactive Technical Blueprint
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
              {architecture.projectTitle} — System Architecture
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">{architecture.overview}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] rounded-xl transition-colors flex-shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Diagram Area */}
        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar space-y-6 flex-1">
          {/* Architecture Pipeline Flow Nodes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                End-to-End Pipeline Stages (Click Node to Inspect Details):
              </span>
              <span className="text-[11px] font-mono text-gray-500">
                {architecture.nodes.length} Connected Components
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {architecture.nodes.map((node, idx) => {
                const isSelected = selectedNode?.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between group ${
                      isSelected
                        ? 'bg-[#1C1E2D] border-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/10 ring-1 ring-fuchsia-500/50'
                        : 'bg-[#161722] border-[#1F212A] text-gray-300 hover:border-[#2A2D3A] hover:bg-[#1A1C26]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#13141C] text-gray-400 border border-[#2A2D3A]">
                          Stage 0{idx + 1}
                        </span>
                        <div className="p-1.5 rounded-lg bg-[#13141C] border border-[#2A2D3A]">
                          {getRoleIcon(node.role)}
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-white mb-1 group-hover:text-fuchsia-300 transition-colors">
                        {node.name}
                      </h4>
                      <p className="text-[11px] font-mono text-fuchsia-400/90 mb-2">
                        {node.technology}
                      </p>
                    </div>

                    <span className="text-[10px] text-gray-500 block pt-2 border-t border-[#1F212A]/60">
                      Role: {node.role}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Node Detail Inspection Card */}
          {selectedNode && (
            <div className="p-5 rounded-xl bg-[#161722] border border-fuchsia-500/30 animate-in fade-in space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-[#1C1E2B] border border-[#2A2D3A]">
                    {getRoleIcon(selectedNode.role)}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white">{selectedNode.name}</h3>
                    <span className="text-xs font-mono text-fuchsia-400">
                      Technology: {selectedNode.technology}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#1C1E2B] text-gray-300 border border-[#2A2D3A]">
                  Category: {selectedNode.role}
                </span>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed pt-2 border-t border-[#1F212A]">
                {selectedNode.description}
              </p>
            </div>
          )}

          {/* Data Flow Sequence Table */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
              Sequential Ingestion & Telemetry Bus:
            </span>
            <div className="space-y-1.5">
              {architecture.connections.map((conn, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-[#161722] border border-[#1F212A] flex items-center justify-between text-xs text-gray-300 font-mono"
                >
                  <span className="text-gray-400">Step {idx + 1}:</span>
                  <span className="text-fuchsia-300">{conn.label}</span>
                  <span className="text-gray-500">→</span>
                  <span className="text-white">
                    {architecture.nodes.find((n) => n.id === conn.to)?.name || conn.to}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1F212A] bg-[#101118] flex items-center justify-between text-xs text-gray-400 flex-shrink-0">
          <span className="flex items-center gap-1.5">
            <Info size={13} className="text-fuchsia-400" />
            <span>Architecture verified against repository implementation</span>
          </span>
          <button
            onClick={onClose}
            className="py-1.5 px-4 bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] text-gray-300 rounded-xl text-xs font-medium transition-colors"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
