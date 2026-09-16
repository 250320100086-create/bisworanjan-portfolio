import React from 'react';
import { HeartPulse, MessageSquareText, Image as ImageIcon, LineChart, ArrowRight } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Heart Disease Prediction',
    icon: HeartPulse,
    tags: ['ML', 'Python', 'Scikit-learn'],
    description: 'ML model to predict heart disease using classification algorithms.',
    iconColor: 'text-fuchsia-500'
  },
  {
    title: 'Chatbot using NLP',
    icon: MessageSquareText,
    tags: ['NLP', 'Python', 'TensorFlow'],
    description: 'Intelligent chatbot using NLP and deep learning techniques.',
    iconColor: 'text-blue-400'
  },
  {
    title: 'Image Classification',
    icon: ImageIcon,
    tags: ['DL', 'Python', 'CNN'],
    description: 'CNN model to classify images with high accuracy.',
    iconColor: 'text-purple-400'
  },
  {
    title: 'Stock Price Prediction',
    icon: LineChart,
    tags: ['ML', 'Time Series', 'Python'],
    description: 'Time-series model to predict stock prices using LSTM.',
    iconColor: 'text-blue-500'
  }
];

export function Projects() {
  return (
    <section className="py-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-white">Featured Projects</h2>
        <button className="px-4 py-2 border border-[#2A2D3A] bg-[#13141C] hover:bg-[#1A1C23] text-gray-300 rounded-lg text-sm transition-colors">
          View All Projects
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {PROJECTS.map((project, i) => (
          <div key={i} className="group bg-[#13141C] border border-[#1F212A] rounded-2xl p-6 hover:border-blue-500/30 hover:bg-[#151620] transition-all duration-300 flex flex-col">
            <div className="mb-6">
              <project.icon size={42} strokeWidth={1.5} className={`${project.iconColor} mb-2`} />
            </div>
            
            <h3 className="text-white font-medium mb-3 text-lg">{project.title}</h3>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map(tag => (
                <span key={tag} className="text-[10px] px-2 py-1 bg-[#1A1C23] border border-[#2A2D3A] text-gray-400 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
            
            <p className="text-sm text-gray-400 mb-6 flex-1">
              {project.description}
            </p>
            
            <a href="#" className="flex items-center gap-2 text-sm text-fuchsia-400 hover:text-fuchsia-300 transition-colors mt-auto group-hover:gap-3 duration-300">
              View Project <ArrowRight size={14} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
