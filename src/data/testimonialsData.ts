export interface Testimonial {
  id: string;
  name: string;
  role: string;
  relationship: string;
  quote: string;
  avatarInitials: string;
  verified: boolean;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    name: 'Academic Project Review Panel',
    role: 'Faculty & Project Evaluators',
    relationship: 'Centurion University of Technology and Management',
    quote:
      'Bisworanjan demonstrated strong technical capability in applying computer vision and machine learning models for real-world drone surveillance and threat analytics.',
    avatarInitials: 'CU',
    verified: true,
  },
  {
    id: 't-2',
    name: 'Internshala Machine Learning Evaluation',
    role: 'Assessment & Certification Team',
    relationship: 'Internshala Trainings (98% Score, Top Performer)',
    quote:
      'Demonstrated outstanding proficiency in supervised and unsupervised learning algorithms, model evaluation metrics, and practical Python implementations.',
    avatarInitials: 'IT',
    verified: true,
  },
];
