import React, { memo } from 'react';
import {
  Code,
  Brain,
  BarChart,
  Globe,
  Server,
  Database,
  Binary,
  Wrench,
  Cloud,
} from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    category: 'Programming Languages',
    icon: Code,
    color: 'text-yellow-400',
    skills: ['Python', 'Java', 'C'],
  },
  {
    category: 'Artificial Intelligence & Machine Learning',
    icon: Brain,
    color: 'text-fuchsia-400',
    skills: [
      'Machine Learning',
      'Supervised Learning',
      'Unsupervised Learning',
      'Regression & Classification',
      'Support Vector Machines (SVM)',
      'Decision Trees',
      'Clustering & PCA',
      'Model Evaluation',
    ],
  },
  {
    category: 'Data Science & Analytics',
    icon: BarChart,
    color: 'text-orange-400',
    skills: [
      'NumPy',
      'Pandas',
      'Matplotlib',
      'Scikit-learn',
      'Data Preprocessing',
      'Exploratory Data Analysis (EDA)',
      'Feature Engineering',
    ],
  },
  {
    category: 'Web Development',
    icon: Globe,
    color: 'text-blue-400',
    skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Tailwind CSS'],
  },
  {
    category: 'Backend Development',
    icon: Server,
    color: 'text-green-400',
    skills: ['FastAPI', 'Spring Boot', 'RESTful APIs', 'Java Web Services'],
  },
  {
    category: 'Databases & Storage',
    icon: Database,
    color: 'text-teal-400',
    skills: ['SQL', 'PostgreSQL', 'DBMS Concepts', 'Relational Schemas'],
  },
  {
    category: 'Data Structures & Algorithms',
    icon: Binary,
    color: 'text-purple-400',
    skills: [
      'Arrays & Linked Lists',
      'Stacks & Queues',
      'Trees & Graphs',
      'Searching & Sorting Algorithms',
    ],
  },
  {
    category: 'Developer Tools',
    icon: Wrench,
    color: 'text-emerald-400',
    skills: ['Git', 'GitHub', 'Maven', 'VS Code', 'IntelliJ IDEA', 'Jupyter Notebooks'],
  },
  {
    category: 'Cloud & Specialized Domains',
    icon: Cloud,
    color: 'text-indigo-400',
    skills: ['AWS Concepts', 'Internet of Things (IoT)', 'Computer Networks', 'Information Security'],
  },
];

export const Skills = memo(function Skills() {
  return (
    <section id="skills" className="py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-white">Technical Skills & Expertise</h2>
          <p className="text-xs text-gray-400 mt-1">Comprehensive skill set derived from coursework, labs & project development</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SKILL_CATEGORIES.map((cat) => (
          <div
            key={cat.category}
            className="bg-[#13141C] border border-[#1F212A] rounded-2xl p-6 hover:border-fuchsia-500/30 hover:bg-[#151620] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2.5 bg-[#1A1C23] border border-[#2A2D3A] rounded-xl ${cat.color}`}>
                  <cat.icon size={20} />
                </div>
                <h3 className="text-white font-medium text-base">{cat.category}</h3>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium px-2.5 py-1 bg-[#1A1C23] border border-[#2A2D3A] text-gray-300 rounded-lg hover:border-fuchsia-500/40 hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});
