export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: 'AI / ML' | 'Python' | 'Java' | 'React' | 'Computer Vision' | 'Cloud' | 'DSA' | 'DBMS';
  tags: string[];
  coverImage?: string;
  content: string[];
  codeSnippets?: {
    language: string;
    code: string;
    caption: string;
  }[];
  relatedProjects: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'building-realtime-drone-tracking-cv',
    title: 'Architecting Real-Time Object Tracking from Aerial Feeds with OpenCV & FastAPI',
    description:
      'A deep dive into frame decoupling, spatial coordinate filtering, and handling scale variance in aerial drone surveillance pipelines.',
    date: 'August 14, 2026',
    readingTime: '6 min read',
    category: 'Computer Vision',
    tags: ['OpenCV', 'Python', 'FastAPI', 'Computer Vision', 'Object Detection'],
    content: [
      'Aerial surveillance introduces non-trivial computer vision obstacles compared to ground-level cameras: dynamic pitch/roll motions, variable altitude, scale shifting, and motion blur caused by aggressive drone maneuvers.',
      'To build a responsive telemetry and tracking feed, the ingestion layer decouples raw video frame extraction from the deep learning inference queue. This ensures zero frame dropping even when the downstream classifier computes heavy bounding boxes.',
      'We apply adaptive thresholding and centroid tracking matrices. By computing Euclidean distance between existing object centers and candidate bounding boxes in consecutive frames, we maintain persistent tracking IDs with high stability.',
      'Telemetry coordinates are subsequently broadcasted through asynchronous FastAPI WebSockets and REST endpoints, enabling client-side HUD overlays with sub-50ms latency.',
    ],
    codeSnippets: [
      {
        language: 'python',
        caption: 'Spatial centroid distance computation for persistent entity tracking',
        code: `import numpy as np

def update_tracks(existing_centroids, candidate_boxes):
    if len(existing_centroids) == 0:
        return {i: box for i, box in enumerate(candidate_boxes)}
    
    # Calculate Euclidean distance matrix between current & candidate centroids
    dist_matrix = np.linalg.norm(
        existing_centroids[:, np.newaxis] - candidate_boxes, axis=2
    )
    # Match greedily based on minimum spatial separation
    matched_indices = np.argmin(dist_matrix, axis=1)
    return matched_indices`,
      },
    ],
    relatedProjects: ['ai-drone'],
  },
  {
    id: 'optimizing-fastapi-ml-microservices',
    title: 'High-Throughput ML Inference Pipelines Using FastAPI & Scikit-learn',
    description:
      'Production strategies for serving serialized machine learning models with asynchronous validation, memory caching, and batch inference.',
    date: 'July 28, 2026',
    readingTime: '5 min read',
    category: 'AI / ML',
    tags: ['FastAPI', 'Machine Learning', 'Python', 'Scikit-learn', 'Microservices'],
    content: [
      'Deploying Scikit-learn models behind synchronous web servers frequently introduces thread exhaustion when concurrent requests spike. Migrating to FastAPI with asynchronous request handlers provides massive throughput gains.',
      'Key optimizations include pre-warming the Joblib model pipeline during server lifespan startup rather than instantiating models per request, and leveraging Pydantic v2 schemas for vectorized batch validation.',
      'In our CyberShield Analytics Platform, network telemetry logs arrive in continuous batches. Vectorizing inputs with NumPy arrays before passing them into pipeline.predict_proba() reduced individual sample scoring latency to single-digit milliseconds.',
    ],
    codeSnippets: [
      {
        language: 'python',
        caption: 'Lifespan model pre-loading and batch scoring in FastAPI',
        code: `from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
import joblib
import numpy as np

ml_models = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load serialized model pipeline into memory once at startup
    ml_models["classifier"] = joblib.load("models/network_threat_pipeline.joblib")
    yield
    ml_models.clear()

app = FastAPI(lifespan=lifespan)

@app.post("/api/v1/predict-anomaly")
async def predict_threat(features: list[float]):
    model = ml_models.get("classifier")
    if not model:
        raise HTTPException(status_code=503, detail="Model engine not loaded")
    
    sample = np.array(features).reshape(1, -1)
    probability = float(model.predict_proba(sample)[0][1])
    return {"threat_score": probability, "is_anomaly": probability > 0.65}`,
      },
    ],
    relatedProjects: ['cybershield', 'heart-disease'],
  },
  {
    id: 'handling-class-imbalance-cybersecurity',
    title: 'Overcoming Extreme Class Imbalance in Cybersecurity Telemetry Datasets',
    description:
      'Techniques for tuning decision thresholds and cost-sensitive classification models when attack vectors represent less than 1% of logs.',
    date: 'June 19, 2026',
    readingTime: '7 min read',
    category: 'Python',
    tags: ['Python', 'Data Science', 'Machine Learning', 'Cybersecurity'],
    content: [
      'In real-world network security, benign traffic represents over 99% of total packet volume. Standard classification metrics like raw accuracy are fundamentally deceptive in this regime—a naive model predicting "benign" for every packet achieves 99% accuracy while missing 100% of cyber breaches.',
      'We employ stratified k-fold cross-validation alongside Precision-Recall AUC (PR-AUC) optimization rather than ROC-AUC, which is overly optimistic under heavy class imbalance.',
      'Adjusting class weight parameters inversely proportional to class frequencies forces the cost function to heavily penalize false negatives on threat packets. Calibrating the classification threshold based on a custom loss matrix aligns model predictions with operational security priorities.',
    ],
    codeSnippets: [
      {
        language: 'python',
        caption: 'Cost-sensitive threshold calibration via Precision-Recall curve',
        code: `from sklearn.metrics import precision_recall_curve
import numpy as np

def compute_optimal_threshold(y_true, y_probs, min_recall=0.95):
    precisions, recalls, thresholds = precision_recall_curve(y_true, y_probs)
    # Select lowest threshold that guarantees the required recall bound
    valid_idx = np.where(recalls >= min_recall)[0]
    best_idx = valid_idx[-1] if len(valid_idx) > 0 else 0
    return thresholds[best_idx] if best_idx < len(thresholds) else 0.5`,
      },
    ],
    relatedProjects: ['cybershield'],
  },
  {
    id: 'scalable-relational-schemas-biometric-attendance',
    title: 'Designing High-Integrity Relational Schemas for Biometric Attendance Systems',
    description:
      'Schema design principles, indexing strategies, and idempotency guarantees for real-time face verification logging with SQL.',
    date: 'May 04, 2026',
    readingTime: '5 min read',
    category: 'DBMS',
    tags: ['SQL', 'DBMS', 'PostgreSQL', 'Database Design'],
    content: [
      'Real-time biometric attendance requires robust schema design: biometric face embeddings (128D or 512D float vectors) must be matched swiftly, and attendance entries must enforce idempotency so a student passing the camera multiple times in a class period produces exactly one valid check-in.',
      'We enforce composite UNIQUE constraints spanning (student_id, course_session_id, attendance_date) paired with ON CONFLICT DO NOTHING clauses in PostgreSQL.',
      'B-Tree indexes on timestamps and foreign keys guarantee that classroom roll-call reports generate in milliseconds even across tables containing hundreds of thousands of semester records.',
    ],
    codeSnippets: [
      {
        language: 'sql',
        caption: 'Idempotent attendance check-in table definition with composite constraint',
        code: `CREATE TABLE IF NOT EXISTS student_attendance_logs (
    id BIGSERIAL PRIMARY KEY,
    student_id VARCHAR(32) NOT NULL,
    session_id VARCHAR(32) NOT NULL,
    attendance_date DATE NOT NULL DEFAULT CURRENT_DATE,
    check_in_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    confidence_score NUMERIC(4, 3) NOT NULL,
    verification_status VARCHAR(16) DEFAULT 'VERIFIED',
    CONSTRAINT unique_daily_session_checkin UNIQUE (student_id, session_id, attendance_date)
);

CREATE INDEX idx_attendance_date_session ON student_attendance_logs(attendance_date, session_id);`,
      },
    ],
    relatedProjects: ['attendance-system'],
  },
  {
    id: 'resilient-client-side-chatbots-gemini',
    title: 'Building Resilient Conversational AI with Dual-Tier Local Knowledge Fallback',
    description:
      'Designing client-side chatbots that offer zero-latency deterministic answers for portfolio queries while routing complex tasks to Google Gemini.',
    date: 'April 11, 2026',
    readingTime: '6 min read',
    category: 'React',
    tags: ['React', 'Gemini API', 'TypeScript', 'Chatbot', 'NLP'],
    content: [
      'Relying solely on external cloud LLM APIs creates vulnerability to rate limits, expired tokens, or network interruptions. To deliver a rock-solid user experience in interactive portfolio applications, we structured a dual-tier dialog architecture.',
      'First, an intent-matching deterministic resolver intercepts queries matching known topics (projects, certifications, education, GitHub links, contact info). These yield instant, zero-latency answers without consuming API quota.',
      'When the user asks open-ended technical questions or creative problem-solving prompts, the request is proxied asynchronously to Google Gemini with strict system instructions.',
    ],
    codeSnippets: [
      {
        language: 'typescript',
        caption: 'Intent recognition engine routing local knowledge vs LLM stream',
        code: `export async function routeChatQuery(query: string): Promise<string> {
  const normalized = query.toLowerCase().trim();
  
  // Fast path: deterministic local knowledge base
  const localMatch = resolveLocalKnowledge(normalized);
  if (localMatch) {
    return localMatch;
  }
  
  // Slow path: remote Gemini generative call
  return await queryGeminiBackend(query);
}`,
      },
    ],
    relatedProjects: ['ai-chatbot'],
  },
];
