export interface Milestone {
  id: string;
  year: string;
  dateStr: string;
  category: 'Education' | 'Certification' | 'Project Engineering' | 'Academic Honour';
  title: string;
  organization: string;
  description: string;
  verifiedDetails?: string;
  badge: string;
}

export const MILESTONES: Milestone[] = [
  {
    id: 'oracle-certification',
    year: '2026',
    dateStr: 'August 25, 2026',
    category: 'Certification',
    title: 'Oracle Certified Foundations Associate & Agentic AI Associate',
    organization: 'Oracle University',
    description:
      'Verified credential in foundational cloud computing, infrastructure security, and agentic AI architectures.',
    verifiedDetails: 'Credential ID: 103523797AAI26OFA',
    badge: 'Industry Credential',
  },
  {
    id: 'scholiverse-certification',
    year: '2026',
    dateStr: 'August 04, 2026',
    category: 'Certification',
    title: 'Machine Learning with AI Specialization (Grade A)',
    organization: 'Scholiverse Educare Private Limited',
    description:
      'Advanced program covering supervised classification, regression pipelines, clustering algorithms, and model evaluation.',
    verifiedDetails: 'Certificate ID: 6g1k1acrytpn00h8 · Grade A',
    badge: 'Grade A Credential',
  },
  {
    id: 'skill-india-certification',
    year: '2026',
    dateStr: 'August 02, 2026',
    category: 'Certification',
    title: 'Network Security Engineer Certification',
    organization: 'Skill India Digital Hub / NSDC / NASSCOM',
    description:
      'Comprehensive participation credential verifying network defense fundamentals, security telemetry, and protocols.',
    badge: 'Govt / NSDC Recognized',
  },
  {
    id: 'internshala-certification',
    year: '2026',
    dateStr: 'May 31, 2026',
    category: 'Certification',
    title: 'Machine Learning with AI (98% Marks — Top Performer)',
    organization: 'Internshala Trainings',
    description:
      'Mastered predictive model training, feature engineering, and Scikit-learn algorithms, graduating in the top tier.',
    verifiedDetails: 'Certificate No: 1xi02p15nrg · 98% Score',
    badge: 'Top Performer (98%)',
  },
  {
    id: 'mca-centurion',
    year: '2025 – 2027',
    dateStr: '2025 – 2027',
    category: 'Education',
    title: 'Master of Computer Applications (MCA) — AI & ML Specialization',
    organization: 'Centurion University of Technology and Management, Bhubaneswar',
    description:
      'Pursuing advanced coursework in artificial intelligence, neural networks, computer vision, distributed databases, and algorithms.',
    verifiedDetails: 'Current Academic Standing: 8.16 CGPA',
    badge: '8.16 CGPA',
  },
  {
    id: 'ai-projects-suite',
    year: '2025 – 2026',
    dateStr: 'Ongoing',
    category: 'Project Engineering',
    title: 'Engineered 5 Featured AI/ML Production Systems',
    organization: 'Independent Engineering',
    description:
      'Constructed CyberShield Analytics, AI Drone Surveillance, AI Chatbot, Biometric Attendance System, and Heart Disease Prediction.',
    verifiedDetails: 'All repositories open-source on GitHub (@250320100086-create)',
    badge: '5 Systems Deployed',
  },
  {
    id: 'bsc-utkal',
    year: '2022 – 2025',
    dateStr: '2022 – 2025',
    category: 'Education',
    title: 'Bachelor of Science (B.Sc. Hons) in Physics',
    organization: 'Utkal University, Bhubaneswar',
    description:
      'Rigorous mathematical physics foundations: vector calculus, computational modeling, statistics, and analytical problem solving.',
    verifiedDetails: 'Graduated with 7.46 CGPA',
    badge: '7.46 CGPA',
  },
];
