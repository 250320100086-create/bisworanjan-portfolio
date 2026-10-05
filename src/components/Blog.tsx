import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  Search,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import { BlogModal } from './BlogModal';
import { CaseStudy } from '../data/caseStudiesData';

const CATEGORIES = [
  'All',
  'AI / ML',
  'Computer Vision',
  'Python',
  'React',
  'DBMS',
  'Java',
  'Cloud',
  'DSA',
];

interface BlogProps {
  onOpenCaseStudy: (caseStudy: CaseStudy) => void;
}

export const Blog: React.FC<BlogProps> = ({ onOpenCaseStudy }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="blog" className="py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <BookOpen size={20} />
            </span>
            <h2 className="text-2xl font-semibold text-white">Technical Articles & Engineering Notes</h2>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            In-depth breakdowns on machine learning pipelines, computer vision tracking, and database schemas
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles & tags..."
            className="w-full pl-9 pr-3 py-2 bg-[#13141C] border border-[#1F212A] focus:border-fuchsia-500/50 rounded-xl text-xs text-white placeholder-gray-500 outline-none transition-colors"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5 mb-8">
        <span className="text-xs text-gray-500 flex items-center gap-1 mr-1 max-sm:w-full max-sm:mb-1">
          <Filter size={12} /> Topics:
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white shadow-md'
                : 'bg-[#13141C] border border-[#1F212A] text-gray-400 hover:text-white hover:border-[#2A2D3A]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-[#13141C] border border-[#1F212A] rounded-2xl p-6 hover:border-fuchsia-500/40 hover:bg-[#151620] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-[#1A1C23] border border-[#2A2D3A] text-fuchsia-400">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px]">
                    <Clock size={12} />
                    <span>{post.readingTime}</span>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-white group-hover:text-fuchsia-300 transition-colors mb-2 leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 mb-4">
                  {post.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 bg-[#1A1C23] border border-[#2A2D3A] text-gray-300 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#1F212A] flex items-center justify-between text-xs">
                <span className="text-[11px] text-gray-500 flex items-center gap-1">
                  <Calendar size={11} /> {post.date}
                </span>

                <button
                  onClick={() => setActivePost(post)}
                  className="py-1.5 px-3 bg-[#1A1C23] group-hover:bg-fuchsia-600/20 border border-[#2A2D3A] group-hover:border-fuchsia-500/40 text-fuchsia-300 group-hover:text-white rounded-xl text-xs font-medium transition-all flex items-center gap-1.5"
                >
                  Read Article <ArrowRight size={13} />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-[#13141C] border border-[#1F212A] rounded-2xl">
          <p className="text-xs text-gray-400">
            No technical articles found matching &quot;{searchQuery}&quot; in category &quot;{selectedCategory}&quot;.
          </p>
        </div>
      )}

      {/* Reader Modal */}
      <BlogModal
        post={activePost}
        onClose={() => setActivePost(null)}
        onOpenCaseStudy={onOpenCaseStudy}
      />
    </section>
  );
};
