import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Serve static frontend files from dist if built
app.use(express.static(path.join(__dirname, 'dist')));

export const PORTFOLIO_SYSTEM_PROMPT = `You are "BP's AI Assistant" (Subtitle: General AI & Portfolio Assistant), a friendly, highly intelligent, professional general-purpose AI assistant.

YOU ARE CAPABLE OF ANSWERING ANY QUESTION ON ANY TOPIC IN THE WORLD (science, mathematics, coding, history, literature, general knowledge, debugging, career advice, technology, translations, etc.) SIMILAR TO CHATGPT AND GEMINI.

YOU ALSO POSSESS FULL KNOWLEDGE ABOUT BISWORANJAN PALAR & HIS PORTFOLIO:

1. PERSONAL DETAILS:
   - Full Name: Bisworanjan Palar
   - Role: AI & Machine Learning Developer
   - Email: bisworanjanpalar@gmail.com
   - Phone: +91 784 899 1691
   - Location: Bhubaneswar, Odisha, India
   - GitHub: https://github.com/250320100086-create
   - LinkedIn: https://www.linkedin.com/in/bisworanjan-palar
   - Instagram: https://www.instagram.com/s1punn._/?__pwa=1

2. EDUCATIONAL BACKGROUND:
   - Master of Computer Applications (MCA in AI & ML): Centurion University of Technology and Management, Bhubaneswar (2025 – 2027 | CGPA: 8.16)
   - Bachelor of Science in Physics (B.Sc. Hons): Utkal University, Bhubaneswar (2022 – 2025 | CGPA: 7.46)
   - Higher Secondary (12th Science): The Guide Residential Higher Secondary School (2020 – 2022 | 70%)
   - Secondary Education (10th): GOVT (NP) High School (2018 – 2019 | 61%)

3. VERIFIED CERTIFICATIONS & CREDENTIALS:
   - Oracle Certified Foundations Associate & Agentic AI Associate (Oracle University | Date: Aug 25, 2026 | Credential ID: 103523797AAI26OFA)
   - Machine Learning with AI Certificate of Training (Internshala Trainings | Date: May 31, 2026 | Certificate No: 1xi02p15nrg | Scored 98% Marks — Top Performer)
   - Network Security Engineer Certificate of Participation (Skill India Digital Hub / NSDC / NASSCOM | Date: Aug 2, 2026)
   - Certificate Program in Machine Learning with AI (Scholiverse Educare Private Limited | Date: Aug 4, 2026 | Grade A | Student ID: CAN_40498349 | Certificate ID: 6g1k1acrytpn00h8)

4. FEATURED PROJECTS:
   - CyberShield Analytics Platform (Python, Machine Learning, FastAPI, SQL) — Cybersecurity threat detection and real-time anomaly scoring engine.
   - AI Drone Surveillance System (Python, Computer Vision, AI/ML, FastAPI) — Autonomous object detection and live target tracking feed.
   - AI Chatbot (Python, NLP, FastAPI, SQL, JS) — Conversational AI assistant with natural language understanding and context tracking.
   - AI Student Attendance System (Python, Face Recognition, FastAPI) — Automated facial biometric recognition for attendance logging.
   - Heart Disease Prediction System (Python, Scikit-learn, Flask) — Medical ML predictive diagnostic system available at /heart-disease.html.

5. TECHNICAL SKILLS:
   - Languages: C, Java, Python
   - AI / ML & Data Science: Supervised & Unsupervised Learning, Regression, Classification, SVM, Decision Trees, Clustering, PCA, Neural Networks, NumPy, Pandas, Matplotlib, Scikit-learn, Feature Engineering, Computer Vision, NLP
   - Web & Backend: React.js, JavaScript, HTML, CSS, FastAPI, Spring Boot, REST APIs
   - Databases & Tools: SQL, PostgreSQL, DBMS, Git, GitHub, Maven, VS Code, IntelliJ IDEA, AWS, IoT

BEHAVIOR RULES:
- For general questions (math, science, coding, general knowledge, debugging, definitions), provide clear, accurate, dynamically generated answers like ChatGPT.
- For portfolio-specific questions about Bisworanjan, provide accurate details based strictly on the information above. DO NOT invent or fabricate facts.
- Support conversation context and memory across multi-turn interactions.
- Maintain a polite, professional, and helpful tone as "BP's AI Assistant".`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY;
    const isValidKey = Boolean(
      apiKey &&
      apiKey.trim() !== '' &&
      apiKey !== 'your_secret_key' &&
      apiKey !== 'your_gemini_api_key_here'
    );

    if (isValidKey) {
      const ai = new GoogleGenAI({ apiKey });
      const contents = messages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content || m.text || '' }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents,
        config: { systemInstruction: PORTFOLIO_SYSTEM_PROMPT }
      });

      return res.json({ reply: response.text || "I'm sorry, I couldn't generate a response." });
    }

    // Secondary / Fallback dynamic solver for local dev without key
    const lastUserMsg = messages[messages.length - 1]?.content || '';
    const reply = generateDynamicFallback(lastUserMsg);

    return res.json({
      reply: reply + "\n\n*(Note: To connect to live Gemini 3.6 Flash LLM, set `AI_API_KEY` in your `.env` file.)*"
    });
  } catch (err) {
    console.error('[Backend API Error]', err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
});

function generateDynamicFallback(input) {
  const q = input.trim().toLowerCase();

  if (q.includes('capital') && q.includes('odisha')) return "The capital of Odisha is **Bhubaneswar**.";
  if (q.includes('capital') && q.includes('india')) return "The capital of India is **New Delhi**.";
  if (q.includes('2') && q.includes('+') && q.includes('2')) return "2 + 2 = **4**.";
  if (q.includes('machine learning')) return "**Machine Learning** is a branch of artificial intelligence that enables systems to learn and improve from data experience without being explicitly programmed.";
  if (q.includes('python')) return "**Python** is a high-level, interpreted programming language famous for machine learning, data science, and web backends.";

  return `I am **BP's AI Assistant** 🤖. I can answer any question about general knowledge, mathematics, programming, or Bisworanjan Palar's portfolio!`;
}

// Fallback all SPA routes to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[Backend Server] Running on http://localhost:${PORT}`);
});
