import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Globe2, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import { CASE_STUDIES, CaseStudy } from '../data/caseStudiesData';

interface SkillNode {
  name: string;
  category: string;
  relatedProjectId?: string;
  color: string;
  x3d: number;
  y3d: number;
  z3d: number;
}

const REAL_SKILLS = [
  { name: 'Python', category: 'Core Language', relatedProjectId: 'cybershield', color: '#38bdf8' },
  { name: 'Machine Learning', category: 'AI / ML', relatedProjectId: 'cybershield', color: '#d946ef' },
  { name: 'FastAPI', category: 'Backend API', relatedProjectId: 'ai-drone', color: '#34d399' },
  { name: 'OpenCV', category: 'Computer Vision', relatedProjectId: 'ai-drone', color: '#a855f7' },
  { name: 'Scikit-learn', category: 'AI / ML', relatedProjectId: 'heart-disease', color: '#f59e0b' },
  { name: 'React.js', category: 'Frontend', relatedProjectId: 'ai-chatbot', color: '#60a5fa' },
  { name: 'SQL & Postgres', category: 'Database', relatedProjectId: 'attendance-system', color: '#f43f5e' },
  { name: 'YOLO & Vision', category: 'Computer Vision', relatedProjectId: 'ai-drone', color: '#ec4899' },
  { name: 'Java', category: 'Programming', color: '#fb923c' },
  { name: 'Git & GitHub', category: 'Version Control', relatedProjectId: 'cybershield', color: '#c084fc' },
  { name: 'NLP', category: 'AI / ML', relatedProjectId: 'ai-chatbot', color: '#2dd4bf' },
  { name: 'TypeScript', category: 'Full Stack', relatedProjectId: 'ai-chatbot', color: '#818cf8' },
  { name: 'Flask', category: 'Microservices', relatedProjectId: 'heart-disease', color: '#e879f9' },
];

interface SkillGlobeProps {
  onOpenCaseStudy?: (caseStudy: CaseStudy) => void;
}

export const SkillGlobe: React.FC<SkillGlobeProps> = ({ onOpenCaseStudy }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const rotationRef = useRef({ angleX: 0.002, angleY: 0.003, currentX: 0, currentY: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });

  // Compute spherical coordinates using Fibonacci sphere algorithm
  const nodes = useMemo<SkillNode[]>(() => {
    const total = REAL_SKILLS.length;
    const radius = 140;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    return REAL_SKILLS.map((skill, i) => {
      const y = 1 - (i / (total - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      return {
        ...skill,
        x3d: x * radius,
        y3d: y * radius,
        z3d: z * radius,
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let prefersReducedMotion = false;
    if (typeof window !== 'undefined') {
      prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Update rotation if not reduced motion and not dragging
      if (!prefersReducedMotion && !isDragging) {
        rotationRef.current.currentX += rotationRef.current.angleX;
        rotationRef.current.currentY += rotationRef.current.angleY;
      }

      const cosX = Math.cos(rotationRef.current.currentX);
      const sinX = Math.sin(rotationRef.current.currentX);
      const cosY = Math.cos(rotationRef.current.currentY);
      const sinY = Math.sin(rotationRef.current.currentY);

      // Draw faint background sphere wireframe rings
      ctx.save();
      ctx.strokeStyle = 'rgba(217, 70, 239, 0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 140, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 140, 50, rotationRef.current.currentY, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Transform and sort 3D nodes by depth (z)
      const projectedNodes = nodes.map((node) => {
        // Rotate around Y axis
        const x1 = node.x3d * cosY - node.z3d * sinY;
        const z1 = node.z3d * cosY + node.x3d * sinY;

        // Rotate around X axis
        const y2 = node.y3d * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y3d * sinX;

        // Perspective projection
        const focalLength = 320;
        const scale = focalLength / (focalLength + z2);
        const x2d = centerX + x1 * scale;
        const y2d = centerY + y2 * scale;
        const alpha = Math.max(0.2, (z2 + 150) / 300);

        return {
          ...node,
          x2d,
          y2d,
          z2,
          scale,
          alpha,
        };
      });

      // Sort back-to-front
      projectedNodes.sort((a, b) => a.z2 - b.z2);

      // Draw nodes
      projectedNodes.forEach((node) => {
        const isHovered = hoveredSkill?.name === node.name;
        const baseFontSize = isHovered ? 13 : 11;
        const fontSize = Math.max(8, Math.round(baseFontSize * node.scale));

        ctx.save();
        ctx.globalAlpha = isHovered ? 1 : Math.min(1, Math.max(0.25, node.alpha));

        // Node Glow Dot
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isHovered ? 12 : 6 * node.scale;
        ctx.beginPath();
        ctx.arc(node.x2d, node.y2d, (isHovered ? 4.5 : 3) * node.scale, 0, Math.PI * 2);
        ctx.fill();

        // Node Text Label
        ctx.font = `${isHovered ? '600' : '500'} ${fontSize}px ui-sans-serif, system-ui, sans-serif`;
        ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(226, 232, 240, 0.9)';
        ctx.shadowBlur = isHovered ? 8 : 0;
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x2d, node.y2d - 8 * node.scale);

        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [nodes, hoveredSkill, isDragging]);

  // Handle canvas mouse move for hover detection and rotation drag
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDragging) {
      const deltaX = e.clientX - lastMouseRef.current.x;
      const deltaY = e.clientY - lastMouseRef.current.y;
      rotationRef.current.currentY += deltaX * 0.008;
      rotationRef.current.currentX -= deltaY * 0.008;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
      return;
    }

    // Check hit testing with current projection
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const cosX = Math.cos(rotationRef.current.currentX);
    const sinX = Math.sin(rotationRef.current.currentX);
    const cosY = Math.cos(rotationRef.current.currentY);
    const sinY = Math.sin(rotationRef.current.currentY);

    let closest: SkillNode | null = null;
    let closestDist = 22;

    nodes.forEach((node) => {
      const x1 = node.x3d * cosY - node.z3d * sinY;
      const z1 = node.z3d * cosY + node.x3d * sinY;
      const y2 = node.y3d * cosX - z1 * sinX;
      const z2 = z1 * cosX + node.y3d * sinX;

      const focalLength = 320;
      const scale = focalLength / (focalLength + z2);
      const x2d = centerX + x1 * scale;
      const y2d = centerY + y2 * scale;

      const dist = Math.hypot(x - x2d, y - y2d);
      if (dist < closestDist && z2 > -80) {
        closestDist = dist;
        closest = node;
      }
    });

    setHoveredSkill(closest);
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCanvasClick = () => {
    if (hoveredSkill && hoveredSkill.relatedProjectId && onOpenCaseStudy) {
      const cs = CASE_STUDIES[hoveredSkill.relatedProjectId];
      if (cs) onOpenCaseStudy(cs);
    }
  };

  return (
    <div className="bg-[#13141C] border border-[#1F212A] rounded-2xl p-6 relative overflow-hidden my-6">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 relative z-10 border-b border-[#1F212A] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400">
              <Globe2 size={16} />
            </span>
            <h3 className="text-lg font-semibold text-white tracking-tight">
              3D Interactive Technology Globe
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Real-Time Projection
            </span>
          </div>
          <p className="text-xs text-gray-400">
            Drag to rotate sphere · Hover to inspect technology mapping · Click to view case study
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-gray-400">
          <Sparkles size={13} className="text-fuchsia-400" />
          <span>Spherical Matrix (60 FPS Canvas)</span>
        </div>
      </div>

      {/* 3D Canvas Area */}
      <div className="relative flex items-center justify-center py-4">
        <canvas
          ref={canvasRef}
          width={400}
          height={340}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            setIsDragging(false);
            setHoveredSkill(null);
          }}
          onClick={handleCanvasClick}
          className={`max-w-full cursor-${hoveredSkill ? 'pointer' : isDragging ? 'grabbing' : 'grab'} select-none`}
          style={{ touchAction: 'none' }}
        />

        {/* Hovered Skill Floating Tooltip */}
        {hoveredSkill && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#1A1C28]/95 border border-fuchsia-500/40 rounded-xl px-4 py-2.5 shadow-xl text-center backdrop-blur-md transition-all animate-in fade-in z-20 pointer-events-none">
            <div className="flex items-center justify-center gap-2 mb-0.5">
              <span
                style={{ backgroundColor: hoveredSkill.color }}
                className="w-2 h-2 rounded-full inline-block"
              />
              <span className="text-xs font-bold text-white tracking-tight">{hoveredSkill.name}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#13141C] text-gray-400 border border-[#2A2D3A]">
                {hoveredSkill.category}
              </span>
            </div>
            {hoveredSkill.relatedProjectId && (
              <p className="text-[11px] text-fuchsia-300 flex items-center justify-center gap-1 mt-0.5">
                Click to explore {CASE_STUDIES[hoveredSkill.relatedProjectId]?.title || 'project'} <ArrowRight size={10} />
              </p>
            )}
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="flex items-center justify-between text-[11px] text-gray-500 border-t border-[#1F212A] pt-3 relative z-10">
        <span>Pure HTML5 3D coordinate mathematics · Zero external 3D engine overhead</span>
        <span className="hidden sm:inline">Respects reduced motion preference</span>
      </div>
    </div>
  );
};
