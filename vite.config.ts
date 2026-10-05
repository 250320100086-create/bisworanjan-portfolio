import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const PORTFOLIO_SYSTEM_PROMPT = `You are "BP's AI Assistant" (Subtitle: General AI & Portfolio Assistant), a friendly, highly intelligent, professional general-purpose AI assistant.

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

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'api-chat-handler',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Method not allowed' }));
              return;
            }

            let body = '';
            req.on('data', (chunk) => { body += chunk; });
            req.on('end', async () => {
              try {
                const parsed = JSON.parse(body || '{}');
                const messages = parsed.messages || [];

                const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
                const isValidKey = Boolean(
                  apiKey &&
                  apiKey.trim() !== '' &&
                  apiKey !== 'your_secret_key' &&
                  apiKey !== 'your_gemini_api_key_here'
                );

                if (isValidKey) {
                  try {
                    const ai = new GoogleGenAI({ apiKey: apiKey! });
                    const contents = messages.map((m: any) => ({
                      role: m.role === 'user' ? 'user' : 'model',
                      parts: [{ text: m.content || m.text || '' }]
                    }));

                    const response = await ai.models.generateContent({
                      model: 'gemini-3.6-flash',
                      contents,
                      config: { systemInstruction: PORTFOLIO_SYSTEM_PROMPT }
                    });

                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ reply: response.text || "I couldn't generate a response." }));
                    return;
                  } catch (llmErr: any) {
                    // LLM API overloaded / network failure → fall through to verified fallback
                    console.warn('[Chat API] Gemini LLM unavailable, using local fallback:', llmErr?.message);
                  }
                }

                // Fallback: verified knowledge base (no API key, or LLM overloaded)
                const lastMsg = (messages[messages.length - 1]?.content || '').toLowerCase();
                let fallbackAnswer = "I am **BP's AI Assistant** 🤖. I can answer questions about Bisworanjan Palar's portfolio, AI/ML projects, skills, education, or general knowledge!";

                if (lastMsg.includes('project') || lastMsg.includes('work') || lastMsg.includes('build')) {
                  fallbackAnswer = "Bisworanjan has developed **5 featured AI & ML projects**:\n\n1. **CyberShield Analytics Platform** (Python, ML, FastAPI, SQL)\n2. **AI Drone Surveillance System** (Python, Computer Vision, FastAPI)\n3. **AI Chatbot** (Python, NLP, FastAPI, SQL, JS)\n4. **AI Student Attendance System** (Python, Face Recognition, FastAPI)\n5. **Heart Disease Prediction System** (Python, Scikit-learn, Flask)\n\nAll source code is available on [GitHub](https://github.com/250320100086-create).";
                } else if (lastMsg.includes('technolog') || lastMsg.includes('skill') || lastMsg.includes('stack')) {
                  fallbackAnswer = "Bisworanjan's technical skill set includes:\n\n- **Languages**: Python, Java, C\n- **AI & ML**: Scikit-learn, OpenCV, NumPy, Pandas, Matplotlib, Supervised/Unsupervised Learning, Regression, Classification, SVM, Decision Trees, PCA\n- **Web & Backend**: FastAPI, Spring Boot, React.js, JavaScript, HTML/CSS, REST APIs\n- **Tools & DBs**: SQL, PostgreSQL, Git, GitHub, Maven, AWS concepts";
                } else if (lastMsg.includes('resume') || lastMsg.includes('cv') || lastMsg.includes('download')) {
                  fallbackAnswer = "You can view and download Bisworanjan's official verified resume directly at [Download Resume PDF](/resume.pdf) or open the **Resume Center** on the portfolio!";
                } else if (lastMsg.includes('contact') || lastMsg.includes('hire') || lastMsg.includes('email') || lastMsg.includes('phone')) {
                  fallbackAnswer = "You can reach Bisworanjan directly:\n\n- **Email**: bisworanjanpalar@gmail.com\n- **Phone**: +91 784 899 1691\n- **Location**: Bhubaneswar, Odisha, India\n- **LinkedIn**: [linkedin.com/in/bisworanjan-palar](https://www.linkedin.com/in/bisworanjan-palar)\n- **GitHub**: [github.com/250320100086-create](https://github.com/250320100086-create)";
                } else if (lastMsg.includes('education') || lastMsg.includes('college') || lastMsg.includes('cgpa')) {
                  fallbackAnswer = "Bisworanjan's academic qualifications:\n\n- **MCA (AI & ML)**: Centurion University (2025–2027) | **CGPA: 8.16**\n- **B.Sc. Physics (Honours)**: Utkal University (2022–2025) | **CGPA: 7.46**\n- **12th Science**: CHSE Odisha (70%)\n- **10th**: BSE Odisha (61%)";
                } else if (lastMsg.includes('certificat') || lastMsg.includes('credential')) {
                  fallbackAnswer = "Bisworanjan holds **4 verified certifications**:\n\n1. **Oracle Certified Foundations & Agentic AI Associate**\n2. **Internshala ML Training** (98% Score — Top Performer)\n3. **NSDC Network Security Engineer**\n4. **Scholiverse ML with AI** (Grade A)";
                } else if (lastMsg.includes('capital') && lastMsg.includes('odisha')) {
                  fallbackAnswer = "The capital of Odisha is **Bhubaneswar**.";
                } else if (lastMsg.includes('capital') && lastMsg.includes('india')) {
                  fallbackAnswer = "The capital of India is **New Delhi**.";
                } else if (lastMsg.includes('2') && lastMsg.includes('+') && lastMsg.includes('2')) {
                  fallbackAnswer = "2 + 2 = **4**.";
                } else if (lastMsg.includes('machine learning')) {
                  fallbackAnswer = "**Machine Learning** is a branch of artificial intelligence focused on algorithms that learn from data experience to make predictions.";
                } else if (lastMsg.includes('python')) {
                  fallbackAnswer = "**Python** is a high-level programming language famous for AI, machine learning, data science, and web APIs.";
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  reply: fallbackAnswer
                }));
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message || 'Server Error' }));
              }
            });
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
