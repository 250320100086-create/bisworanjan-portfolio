export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  overview: string;
  problemStatement: string;
  solution: string;
  keyFeatures: string[];
  technologies: string[];
  architecture: string;
  dataset: string;
  implementation: string;
  results: string;
  challenges: string;
  githubUrl: string;
  liveDemoUrl?: string;
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  cybershield: {
    id: 'cybershield',
    title: 'CyberShield Analytics Platform',
    category: 'AI / ML',
    subtitle: 'Machine Learning Driven Cyber Threat Detection & Risk Scoring Engine',
    overview:
      'CyberShield Analytics is an automated intelligence platform engineered to parse network logs, identify anomalous behavior in real-time, and compute threat severity indices using supervised and unsupervised ML models.',
    problemStatement:
      'Modern network environments generate millions of telemetry event logs daily. Traditional rule-based intrusion detection systems frequently miss novel zero-day attack vectors and suffer from excessive false-positive rates.',
    solution:
      'Engineered an end-to-end anomaly detection pipeline utilizing Scikit-learn classification algorithms and feature-engineered network traffic telemetry, exposed through high-performance FastAPI endpoints for real-time monitoring.',
    keyFeatures: [
      'Automated network traffic log parsing & vectorization',
      'Real-time anomaly scoring & threat level classification',
      'High-throughput FastAPI microservice interface',
      'Persistent audit trail logging with SQL database schemas',
      'Interactive risk metric visualization dashboard',
    ],
    technologies: ['Python', 'Machine Learning', 'FastAPI', 'SQL', 'Scikit-learn', 'Pandas'],
    architecture:
      'Client / Network Sensor -> FastAPI Ingestion Gateway -> Preprocessing & Feature Extraction Engine -> ML Inference Engine (Trained Classifier) -> SQL Persistence Layer & Alerting Webhook.',
    dataset:
      'Benchmark network intrusion telemetry and synthetically evaluated anomaly datasets covering TCP/UDP traffic flows, connection durations, byte ratios, and flag distributions.',
    implementation:
      'Developed with Python 3.x, structuring modular data preprocessing pipelines with Scikit-learn pipelines, model checkpointing via Joblib, and asynchronous API endpoints managed via FastAPI and Uvicorn.',
    results:
      'Demonstrated high detection accuracy on validation sets with low latency per log batch inference, providing swift risk score computation.',
    challenges:
      'Handling class imbalance inherent in network security logs (attacks represent <1% of total traffic) required rigorous sampling techniques and cost-sensitive classification thresholds.',
    githubUrl: 'https://github.com/250320100086-create',
  },
  'ai-drone': {
    id: 'ai-drone',
    title: 'AI Drone Surveillance System',
    category: 'Computer Vision',
    subtitle: 'Autonomous Real-Time Aerial Object Tracking & Threat Alerting System',
    overview:
      'An intelligent aerial computer vision system designed for autonomous drone feeds, detecting objects, people, and localized anomalies in real-time with automated alert triggers.',
    problemStatement:
      'Manual monitoring of aerial surveillance feeds is labor-intensive, error-prone, and slow to react during emergency conditions or security perimeter breaches.',
    solution:
      'Constructed a lightweight computer vision pipeline capable of running inference over live video frames, identifying designated bounding-box entities, and triggering situational awareness alerts via FastAPI.',
    keyFeatures: [
      'Real-time video frame acquisition and processing',
      'Object detection and spatial boundary coordinate tracking',
      'Automated breach event logging and threshold-based alerting',
      'RESTful telemetry endpoints for drone telemetry and camera status',
      'Optimized frame inference pipeline for constrained computing devices',
    ],
    technologies: ['Python', 'Computer Vision', 'AI/ML', 'FastAPI', 'SQL', 'OpenCV'],
    architecture:
      'Drone Camera Feed -> Frame Decoupler / Resize Pipeline -> Deep Learning / CV Detector -> Coordinate Tracking Buffer -> Alert Dispatcher & REST API.',
    dataset:
      'Aerial perspective video feeds, pedestrian tracking benchmarks, and multi-class aerial object detection datasets.',
    implementation:
      'Implemented using OpenCV and Python vision libraries, utilizing spatial tracking matrices to maintain entity IDs across successive frames with FastAPI providing external client communications.',
    results:
      'Achieved stable real-time tracking across continuous frame sequences with robust bounding box localization under varied illumination conditions.',
    challenges:
      'Motion blur from rapid drone maneuvers and scale variation from variable altitude were mitigated through adaptive frame filtering and bounding-box smoothing filters.',
    githubUrl: 'https://github.com/250320100086-create',
  },
  'ai-chatbot': {
    id: 'ai-chatbot',
    title: 'AI Chatbot',
    category: 'AI / ML',
    subtitle: 'Intelligent NLP Assistant with Context-Aware Dialog & Knowledge Retrieval',
    overview:
      'A full-stack conversational AI assistant capable of processing user queries, maintaining conversational history, recognizing user intent, and dynamically rendering responses with markdown formatting.',
    problemStatement:
      'Users need fast, interactive access to portfolio information, skills, and technical queries without navigating multiple static pages.',
    solution:
      'Developed an interactive conversational interface integrated with a dual-layer backend: Google Gemini LLM for complex generative requests, paired with a deterministic local knowledge base for offline resiliency.',
    keyFeatures: [
      'Natural language question answering across technical and personal domains',
      'Multi-turn conversational context tracking across sessions',
      'Code block syntax highlighting and markdown table formatting',
      'Zero-dependency deterministic fallback engine when API keys are absent',
      'Interactive quick-prompt recommendation chips',
    ],
    technologies: ['Python', 'NLP', 'FastAPI', 'SQL', 'JavaScript', 'React', 'Gemini API'],
    architecture:
      'React Frontend Chat UI -> Vite / Express Proxy Middleware -> LLM Integration / NLP Processing Unit -> Client Response Stream with Markdown Parsing.',
    dataset:
      'Curated knowledge representation of personal portfolio data, technical qualifications, and conversational prompts.',
    implementation:
      'Engineered in React and TypeScript with memoized message components, typing indicators, auto-scroll management, and backend Express / Vite middleware routes.',
    results:
      'Instant interactive communication with sub-second local fallback responses and conversational memory persistence.',
    challenges:
      'Preventing hallucinated claims while maintaining conversational fluidity was solved by structuring rigorous system instructions and verified knowledge constraints.',
    githubUrl: 'https://github.com/250320100086-create',
  },
  'attendance-system': {
    id: 'attendance-system',
    title: 'AI Student Attendance System',
    category: 'Computer Vision',
    subtitle: 'Automated Biometric Facial Recognition Attendance Logger',
    overview:
      'An automated biometric attendance platform using facial recognition neural networks to verify student identities in real-time and log timestamps into a relational database.',
    problemStatement:
      'Manual roll calls and paper attendance sheets waste instructional time, are prone to proxy attendance, and require tedious manual entry into school management systems.',
    solution:
      'Built a camera-based attendance recognition system that extracts facial embeddings, matches them against registered student embeddings, and automatically registers attendance in a structured database.',
    keyFeatures: [
      'Real-time webcam / camera face detection and alignment',
      'Facial feature embedding computation and Euclidean distance matching',
      'Duplicate attendance prevention logic within configurable time windows',
      'SQL database logging with timestamps and student enrollment IDs',
      'Exportable attendance reporting for faculty review',
    ],
    technologies: ['Python', 'AI/ML', 'Face Recognition', 'FastAPI', 'SQL', 'OpenCV'],
    architecture:
      'Live Camera -> Face Localization -> 128D Embedding Generation -> Nearest Neighbor Verification -> SQL Attendance Register Table.',
    dataset:
      'Registered student facial image sets captured across multiple lighting conditions and facial orientations.',
    implementation:
      'Built using Python computer vision tools and facial recognition pipelines, writing directly to SQL tables with FastAPI endpoints providing administrative data access.',
    results:
      'Sub-second facial verification per student with high recognition confidence on registered profiles.',
    challenges:
      'Handling variations in ambient classroom lighting and partial occlusions (glasses, hairstyles) addressed through histogram equalization and multi-sample enrollment.',
    githubUrl: 'https://github.com/250320100086-create',
  },
  'heart-disease': {
    id: 'heart-disease',
    title: 'Heart Disease Prediction System',
    category: 'Data Science',
    subtitle: 'Predictive Medical Machine Learning Diagnostic Assessment System',
    overview:
      'A clinical decision-support machine learning system that evaluates patient cardiovascular risk factors (blood pressure, cholesterol, ECG indicators) to classify risk probability.',
    problemStatement:
      'Cardiovascular diseases are the leading cause of global mortality. Early non-invasive screening can assist clinicians in identifying high-risk patients before acute symptoms emerge.',
    solution:
      'Trained and evaluated classification models (Logistic Regression, Decision Trees, Random Forests) on standard clinical data, wrapping the best model into an accessible web diagnostic interface.',
    keyFeatures: [
      'Multi-attribute clinical parameter input form with validation',
      'Real-time model prediction output with risk probability score',
      'Comprehensive data preprocessing and outlier handling pipeline',
      'Scikit-learn model serialization and fast deployment',
      'Live standalone browser demonstration accessible directly',
    ],
    technologies: ['Python', 'Machine Learning', 'Scikit-learn', 'Flask', 'Pandas', 'NumPy'],
    architecture:
      'Patient Clinical Input Form -> Input Normalization & Scaling -> Trained Scikit-Learn Model -> Risk Probability Output & Diagnostic Categorization.',
    dataset:
      'Clinical cardiovascular dataset containing patient age, sex, chest pain type, resting blood pressure, serum cholesterol, fasting blood sugar, and exercise-induced angina attributes.',
    implementation:
      'Developed with Python, Pandas for EDA and preprocessing, Scikit-learn for training, evaluation (Accuracy, Precision, Recall, ROC-AUC), and Flask / HTML frontend for client interaction.',
    results:
      'Delivered reliable predictive classifications with strong recall metrics to minimize false negatives on critical medical risk markers.',
    challenges:
      'Balancing precision and recall in medical diagnostics where false negatives carry higher cost than false positives, resolved through threshold calibration.',
    githubUrl: 'https://github.com/250320100086-create',
    liveDemoUrl: '/heart-disease.html',
  },
};
