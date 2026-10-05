export interface CurrentlyBuildingItem {
  id: string;
  title: string;
  tag: string;
  status: 'In Active Development' | 'Research & Prototyping' | 'Optimization Phase';
  description: string;
  technologies: string[];
  progressPercent: number;
}

export const CURRENTLY_BUILDING: CurrentlyBuildingItem[] = [
  {
    id: 'agentic-ai-orchestration',
    title: 'Autonomous Multi-Agent AI Task Orchestration',
    tag: 'Agentic AI',
    status: 'Research & Prototyping',
    description:
      'Designing goal-oriented autonomous agent workflows leveraging Google Gemini tool-calling, memory persistence, and automated code review pipelines.',
    technologies: ['Python', 'Gemini API', 'FastAPI', 'TypeScript'],
    progressPercent: 65,
  },
  {
    id: 'edge-cv-inference',
    title: 'Low-Latency Aerial Object Detection Optimization',
    tag: 'Computer Vision',
    status: 'Optimization Phase',
    description:
      'Tuning real-time inference latency on embedded drone sensor feeds using TensorRT pruning and adaptive frame decimation.',
    technologies: ['OpenCV', 'Python', 'YOLO', 'FastAPI'],
    progressPercent: 80,
  },
  {
    id: 'distributed-threat-scoring',
    title: 'Asynchronous Network Threat Telemetry Ingestion',
    tag: 'Cybersecurity ML',
    status: 'In Active Development',
    description:
      'Extending CyberShield with Redis-backed queue buffers for concurrent high-throughput network packet anomaly scoring.',
    technologies: ['FastAPI', 'Scikit-learn', 'SQL', 'Python'],
    progressPercent: 75,
  },
];
