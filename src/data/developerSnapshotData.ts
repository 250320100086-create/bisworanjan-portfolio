export interface DeveloperSnapshot {
  fullName: string;
  role: string;
  location: string;
  education: {
    degree: string;
    institution: string;
    timeline: string;
    cgpa: string;
  };
  currentFocus: string;
  projectsCount: number;
  certificationsCount: number;
  publicReposCount: number;
  primaryLanguages: string[];
  keySpecializations: string[];
  availability: string;
}

export const DEVELOPER_SNAPSHOT: DeveloperSnapshot = {
  fullName: 'Bisworanjan Palar',
  role: 'AI & Machine Learning Developer',
  location: 'Bhubaneswar, Odisha, India',
  education: {
    degree: 'MCA in Artificial Intelligence & Machine Learning',
    institution: 'Centurion University of Technology and Management',
    timeline: '2025 – 2027',
    cgpa: '8.16 CGPA',
  },
  currentFocus: 'Agentic AI Systems, Real-Time Computer Vision & Scalable ML Pipelines',
  projectsCount: 5,
  certificationsCount: 4,
  publicReposCount: 5,
  primaryLanguages: ['Python', 'Java', 'C', 'JavaScript', 'TypeScript'],
  keySpecializations: [
    'Supervised & Unsupervised Machine Learning',
    'Computer Vision & Object Tracking',
    'Natural Language Processing (NLP)',
    'FastAPI & Microservices',
    'Relational Databases & SQL Schema Design',
  ],
  availability: 'Open to AI/ML Engineering & Research Collaborations',
};
