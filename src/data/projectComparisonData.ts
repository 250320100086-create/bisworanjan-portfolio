export interface ProjectComparisonProfile {
  id: string;
  title: string;
  category: string;
  shortSummary: string;
  primaryLanguage: string;
  aiMlType: string;
  frontendStack: string;
  backendStack: string;
  database: string;
  inputDatasetType: string;
  deploymentType: string;
  keyFeature: string;
  githubUrl: string;
  liveDemoUrl?: string;
}

export const PROJECT_COMPARISON_DATA: Record<string, ProjectComparisonProfile> = {
  cybershield: {
    id: 'cybershield',
    title: 'CyberShield Analytics',
    category: 'AI / ML Cybersecurity',
    shortSummary: 'Network log anomaly detection and real-time risk scoring engine.',
    primaryLanguage: 'Python',
    aiMlType: 'Supervised Anomaly Classification (Scikit-learn)',
    frontendStack: 'Interactive Web Dashboard (Tailwind CSS)',
    backendStack: 'FastAPI (Asynchronous REST API)',
    database: 'PostgreSQL / SQL Telemetry Tables',
    inputDatasetType: 'Network Traffic Telemetry (TCP/UDP flows)',
    deploymentType: 'Containerized Microservice Architecture',
    keyFeature: 'Sub-second anomaly scoring with cost-sensitive thresholding',
    githubUrl: 'https://github.com/250320100086-create',
  },
  'ai-drone': {
    id: 'ai-drone',
    title: 'AI Drone Surveillance',
    category: 'Computer Vision',
    shortSummary: 'Real-time aerial object tracking and automated situational alerts.',
    primaryLanguage: 'Python',
    aiMlType: 'Object Localization & Centroid Tracking (OpenCV)',
    frontendStack: 'Live Surveillance HUD Overlay',
    backendStack: 'FastAPI / Decoupled Video Ingestion Buffer',
    database: 'SQL Spatial Event Log',
    inputDatasetType: '1080p Aerial Video Streams at 30 FPS',
    deploymentType: 'Edge / Constrained Computing Stream',
    keyFeature: 'Persistent tracking IDs with zero frame drops',
    githubUrl: 'https://github.com/250320100086-create',
  },
  'ai-chatbot': {
    id: 'ai-chatbot',
    title: 'AI Chatbot & Assistant',
    category: 'Full Stack NLP',
    shortSummary: 'Conversational assistant with local knowledge and Gemini LLM fallback.',
    primaryLanguage: 'Python & TypeScript',
    aiMlType: 'Natural Language Processing & LLM Integration',
    frontendStack: 'React 19 / TypeScript / Markdown Renderer',
    backendStack: 'FastAPI / Express Middleware / @google/genai',
    database: 'Client Session Memory & Structured JSON KB',
    inputDatasetType: 'Free-form Natural Language Queries',
    deploymentType: 'Vercel Serverless / Node Proxy',
    keyFeature: 'Zero-latency deterministic answering for verified portfolio queries',
    githubUrl: 'https://github.com/250320100086-create',
  },
  'attendance-system': {
    id: 'attendance-system',
    title: 'AI Student Attendance',
    category: 'Computer Vision & Biometrics',
    shortSummary: 'Automated biometric attendance using facial recognition neural networks.',
    primaryLanguage: 'Python',
    aiMlType: 'Facial Localization & 128D Metric Embedding Matching',
    frontendStack: 'Real-time Camera Alignment Viewport',
    backendStack: 'FastAPI Biometric Verification Service',
    database: 'PostgreSQL Relational Attendance Register',
    inputDatasetType: 'Enrolled Student Facial Profile Images & Live Camera Feed',
    deploymentType: 'Local Campus Classroom Gateway',
    keyFeature: 'Idempotent daily check-in with composite UNIQUE database constraints',
    githubUrl: 'https://github.com/250320100086-create',
  },
  'heart-disease': {
    id: 'heart-disease',
    title: 'Heart Disease Prediction',
    category: 'Healthcare Data Science',
    shortSummary: 'Clinical cardiovascular risk diagnostic classification tool.',
    primaryLanguage: 'Python',
    aiMlType: 'Classification & Standardized Preprocessing (Scikit-learn)',
    frontendStack: 'Vanilla HTML5 / Modern CSS Form Interface',
    backendStack: 'Flask WSGI Web Service',
    database: 'Serialized Model Checkpoint (Joblib / Pickle)',
    inputDatasetType: '13 Clinical Patient Diagnostic Attributes',
    deploymentType: 'Standalone Web Diagnostic Deployment',
    keyFeature: 'High-recall threshold calibration to minimize critical false negatives',
    githubUrl: 'https://github.com/250320100086-create',
    liveDemoUrl: '/heart-disease.html',
  },
};
