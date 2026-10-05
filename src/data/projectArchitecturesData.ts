export interface ArchitectureNode {
  id: string;
  name: string;
  role: 'Frontend' | 'Gateway' | 'ML Engine' | 'Database' | 'Output / Alert';
  technology: string;
  description: string;
}

export interface ProjectArchitecture {
  projectId: string;
  projectTitle: string;
  overview: string;
  nodes: ArchitectureNode[];
  connections: { from: string; to: string; label: string }[];
}

export const PROJECT_ARCHITECTURES: Record<string, ProjectArchitecture> = {
  cybershield: {
    projectId: 'cybershield',
    projectTitle: 'CyberShield Analytics Platform',
    overview:
      'High-throughput security log processing pipeline performing feature extraction, anomaly classification, and automated alert dispatching.',
    nodes: [
      {
        id: 'node-sensor',
        name: 'Network Telemetry Sensor',
        role: 'Frontend',
        technology: 'TCP/UDP Flow Logs',
        description: 'Collects raw network packet telemetry, connection durations, byte ratios, and header flag distributions.',
      },
      {
        id: 'node-api',
        name: 'FastAPI Ingestion Gateway',
        role: 'Gateway',
        technology: 'FastAPI / Pydantic v2',
        description: 'Asynchronous endpoint validating incoming telemetry batches and preparing vectorized payloads.',
      },
      {
        id: 'node-pipeline',
        name: 'Feature Engineering & Vectorizer',
        role: 'ML Engine',
        technology: 'NumPy / Pandas',
        description: 'Normalizes numerical fields and encodes categorical flags into numerical feature matrices.',
      },
      {
        id: 'node-model',
        name: 'Scikit-learn Anomaly Classifier',
        role: 'ML Engine',
        technology: 'Joblib / Scikit-learn',
        description: 'Pre-warmed serialized classification model computing probability scores for threat identification.',
      },
      {
        id: 'node-db',
        name: 'SQL Persistence Layer',
        role: 'Database',
        technology: 'SQL / PostgreSQL Schema',
        description: 'Persistent audit trail recording timestamped incident logs and risk severity scores.',
      },
      {
        id: 'node-hud',
        name: 'Risk Dashboard & Alert Webhook',
        role: 'Output / Alert',
        technology: 'REST / Webhooks',
        description: 'Dispatches real-time security alerts and powers interactive threat analytics visualization.',
      },
    ],
    connections: [
      { from: 'node-sensor', to: 'node-api', label: 'HTTP POST / Telemetry Batch' },
      { from: 'node-api', to: 'node-pipeline', label: 'Vector Extraction' },
      { from: 'node-pipeline', to: 'node-model', label: 'Feature Matrix Input' },
      { from: 'node-model', to: 'node-db', label: 'Save Anomaly Score' },
      { from: 'node-model', to: 'node-hud', label: 'Broadcast Threat Event' },
    ],
  },
  'ai-drone': {
    projectId: 'ai-drone',
    projectTitle: 'AI Drone Surveillance System',
    overview:
      'Low-latency aerial computer vision pipeline with frame decoupling, coordinate tracking, and automated perimeter alerts.',
    nodes: [
      {
        id: 'node-camera',
        name: 'Aerial Video Sensor',
        role: 'Frontend',
        technology: '1080p RTSP Stream',
        description: 'High-definition video feed captured from autonomous drone cameras at 30 FPS.',
      },
      {
        id: 'node-decoupler',
        name: 'Frame Decoupling Buffer',
        role: 'Gateway',
        technology: 'Python Thread Queue',
        description: 'Decouples frame capture from model inference to prevent dropped frames during high-motion tracking.',
      },
      {
        id: 'node-detector',
        name: 'Computer Vision Inference Unit',
        role: 'ML Engine',
        technology: 'OpenCV / Neural Detector',
        description: 'Executes object localization generating spatial bounding boxes (Pedestrians, Drones, Vehicles).',
      },
      {
        id: 'node-tracker',
        name: 'Centroid Spatial Tracker',
        role: 'ML Engine',
        technology: 'Euclidean Centroid Matching',
        description: 'Maintains persistent tracking identities across frames using minimum spatial distance matrices.',
      },
      {
        id: 'node-api',
        name: 'FastAPI Telemetry Server',
        role: 'Database',
        technology: 'FastAPI / SQL Logs',
        description: 'Asynchronously records coordinate histories and logs perimeter boundary intrusion events.',
      },
      {
        id: 'node-alert',
        name: 'Surveillance HUD & Notification',
        role: 'Output / Alert',
        technology: 'WebSockets / REST',
        description: 'Visual overlay displaying bounding boxes, tracking labels, and security alert triggers.',
      },
    ],
    connections: [
      { from: 'node-camera', to: 'node-decoupler', label: 'Raw Video Stream' },
      { from: 'node-decoupler', to: 'node-detector', label: 'Decimated Frame Queue' },
      { from: 'node-detector', to: 'node-tracker', label: 'Candidate Bounding Boxes' },
      { from: 'node-tracker', to: 'node-api', label: 'Tracked Entity Coordinates' },
      { from: 'node-api', to: 'node-alert', label: 'Live Telemetry Stream' },
    ],
  },
  'ai-chatbot': {
    projectId: 'ai-chatbot',
    projectTitle: 'AI Chatbot & Conversational Assistant',
    overview:
      'Dual-tier conversational engine providing instant deterministic answers for verified data and Google Gemini LLM for open-ended queries.',
    nodes: [
      {
        id: 'node-ui',
        name: 'React Conversational UI',
        role: 'Frontend',
        technology: 'React 19 / TypeScript',
        description: 'Interactive chat interface with typing indicators, markdown parsing, and quick prompts.',
      },
      {
        id: 'node-router',
        name: 'Dual-Tier Dialog Router',
        role: 'Gateway',
        technology: 'TypeScript NLP Parser',
        description: 'Analyzes query intent; routes known queries locally and proxies novel queries to Gemini.',
      },
      {
        id: 'node-kb',
        name: 'Deterministic Knowledge Base',
        role: 'ML Engine',
        technology: 'Verified Local Knowledge',
        description: 'Sub-second zero-latency responses for verified portfolio projects, skills, education, and credentials.',
      },
      {
        id: 'node-gemini',
        name: 'Google Gemini Generative API',
        role: 'ML Engine',
        technology: '@google/genai SDK',
        description: 'Processes complex natural language problem-solving queries governed by strict system prompts.',
      },
      {
        id: 'node-memory',
        name: 'Session Memory Buffer',
        role: 'Database',
        technology: 'Client Session State',
        description: 'Maintains multi-turn context throughout the visitor session with conversational history.',
      },
      {
        id: 'node-renderer',
        name: 'Markdown & Code Renderer',
        role: 'Output / Alert',
        technology: 'Tailwind CSS / DOM',
        description: 'Formats response text into formatted typography, links, and syntax-highlighted code blocks.',
      },
    ],
    connections: [
      { from: 'node-ui', to: 'node-router', label: 'User Message' },
      { from: 'node-router', to: 'node-kb', label: 'Intent Match (Fast Path)' },
      { from: 'node-router', to: 'node-gemini', label: 'LLM Proxy (Open Query)' },
      { from: 'node-gemini', to: 'node-memory', label: 'Store Message Turn' },
      { from: 'node-memory', to: 'node-renderer', label: 'Render Formatted Output' },
    ],
  },
  'attendance-system': {
    projectId: 'attendance-system',
    projectTitle: 'AI Student Attendance System',
    overview:
      'Facial recognition biometric system verifying student identities in real-time and enforcing idempotent daily SQL logging.',
    nodes: [
      {
        id: 'node-cam',
        name: 'Classroom Camera Capture',
        role: 'Frontend',
        technology: 'Webcam / IP Camera',
        description: 'Captures continuous live frames of students entering the classroom environment.',
      },
      {
        id: 'node-align',
        name: 'Face Localization & Normalization',
        role: 'Gateway',
        technology: 'OpenCV / Haar Cascades',
        description: 'Extracts bounding boxes around faces and applies histogram equalization for ambient lighting variations.',
      },
      {
        id: 'node-embed',
        name: 'Deep Metric Embedding Generator',
        role: 'ML Engine',
        technology: 'Neural Face Embedding',
        description: 'Maps normalized face crops into 128-dimensional Euclidean space vectors.',
      },
      {
        id: 'node-match',
        name: 'Nearest-Neighbor Verifier',
        role: 'ML Engine',
        technology: 'Distance Metric Thresholding',
        description: 'Compares embeddings against pre-enrolled student database with strict confidence thresholds.',
      },
      {
        id: 'node-sql',
        name: 'Idempotent SQL Attendance Register',
        role: 'Database',
        technology: 'PostgreSQL / SQL',
        description: 'Enforces composite unique constraints preventing duplicate check-ins in the same class session.',
      },
      {
        id: 'node-report',
        name: 'Administrative Attendance Portal',
        role: 'Output / Alert',
        technology: 'FastAPI / REST API',
        description: 'Exports faculty attendance reports and provides real-time verification status.',
      },
    ],
    connections: [
      { from: 'node-cam', to: 'node-align', label: 'Raw Camera Frames' },
      { from: 'node-align', to: 'node-embed', label: 'Cropped & Normalized Faces' },
      { from: 'node-embed', to: 'node-match', label: '128D Embedding Vector' },
      { from: 'node-match', to: 'node-sql', label: 'Verified Student ID Checkin' },
      { from: 'node-sql', to: 'node-report', label: 'Query Attendance Records' },
    ],
  },
  'heart-disease': {
    projectId: 'heart-disease',
    projectTitle: 'Heart Disease Prediction System',
    overview:
      'Clinical risk assessment classification system evaluating patient cardiovascular indicators to compute risk probabilities.',
    nodes: [
      {
        id: 'node-form',
        name: 'Clinical Input Web Form',
        role: 'Frontend',
        technology: 'HTML5 / CSS / Vanilla JS',
        description: 'Collects 13 clinical attributes (age, blood pressure, cholesterol, ECG, ST depression, etc.).',
      },
      {
        id: 'node-flask',
        name: 'Flask Serving Microservice',
        role: 'Gateway',
        technology: 'Python / Flask Server',
        description: 'Validates input ranges and passes parameters to data preprocessing pipelines.',
      },
      {
        id: 'node-scaler',
        name: 'StandardScaler Pipeline',
        role: 'ML Engine',
        technology: 'Scikit-learn Preprocessing',
        description: 'Transforms raw numerical inputs to zero-mean unit-variance matching training distributions.',
      },
      {
        id: 'node-clf',
        name: 'Trained Risk Classifier',
        role: 'ML Engine',
        technology: 'Scikit-learn Model',
        description: 'Computes cardiovascular risk probability with calibrated thresholding to maximize medical recall.',
      },
      {
        id: 'node-result',
        name: 'Diagnostic Assessment Report',
        role: 'Output / Alert',
        technology: 'HTML Diagnostic View',
        description: 'Displays risk categorization, key contributing indicators, and clinical screening notes.',
      },
    ],
    connections: [
      { from: 'node-form', to: 'node-flask', label: 'POST Patient Parameters' },
      { from: 'node-flask', to: 'node-scaler', label: 'Raw Clinical Vector' },
      { from: 'node-scaler', to: 'node-clf', label: 'Normalized Input Array' },
      { from: 'node-clf', to: 'node-result', label: 'Risk Probability & Status' },
    ],
  },
};
