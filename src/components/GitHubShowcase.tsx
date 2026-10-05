import React, { useState, useEffect, memo } from 'react';
import { Github, ExternalLink, GitFork, Star, BookOpen, AlertCircle, RefreshCw, Code } from 'lucide-react';
import { GITHUB_URL } from './Hero';

interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  updatedAt?: string;
}

const GITHUB_USERNAME = '250320100086-create';

// Verified fallback repository list matching Bisworanjan's actual projects
const VERIFIED_FALLBACK_REPOS: GitHubRepo[] = [
  {
    name: 'CyberShield-Analytics-Platform',
    description: 'Machine learning platform for cybersecurity threat detection, network log anomaly analysis, and automated risk scoring.',
    language: 'Python',
    stars: 0,
    forks: 0,
    url: 'https://github.com/250320100086-create',
  },
  {
    name: 'AI-Drone-Surveillance-System',
    description: 'Real-time autonomous drone surveillance system leveraging computer vision models for object tracking and anomaly alerts.',
    language: 'Python',
    stars: 0,
    forks: 0,
    url: 'https://github.com/250320100086-create',
  },
  {
    name: 'AI-Chatbot',
    description: 'Intelligent NLP conversational assistant featuring natural language understanding and dynamic response generation.',
    language: 'Python',
    stars: 0,
    forks: 0,
    url: 'https://github.com/250320100086-create',
  },
  {
    name: 'AI-Student-Attendance-System',
    description: 'Biometric attendance management system utilizing facial recognition neural networks and automated SQL record management.',
    language: 'Python',
    stars: 0,
    forks: 0,
    url: 'https://github.com/250320100086-create',
  },
  {
    name: 'Heart-Disease-Prediction-System',
    description: 'Predictive healthcare classification system assessing cardiovascular risk using clinical patient attributes and Scikit-learn.',
    language: 'Python',
    stars: 0,
    forks: 0,
    url: 'https://github.com/250320100086-create',
  },
];

const LANGUAGE_COLORS: Record<string, string> = {
  Python: 'bg-blue-500',
  TypeScript: 'bg-blue-400',
  JavaScript: 'bg-yellow-400',
  HTML: 'bg-orange-500',
  CSS: 'bg-purple-500',
  Java: 'bg-red-500',
  C: 'bg-gray-400',
};

export const GitHubShowcase = memo(function GitHubShowcase() {
  const [repos, setRepos] = useState<GitHubRepo[]>(VERIFIED_FALLBACK_REPOS);
  const [publicRepoCount, setPublicRepoCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchGitHubData = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      // 1. Fetch user profile for accurate public repository count
      const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
      });

      if (userRes.ok) {
        const userData = await userRes.json();
        if (typeof userData.public_repos === 'number') {
          setPublicRepoCount(userData.public_repos);
        }
      }

      // 2. Fetch recent public repositories
      const reposRes = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
        { headers: { Accept: 'application/vnd.github.v3+json' } }
      );

      if (!reposRes.ok) {
        throw new Error(`GitHub API returned ${reposRes.status}`);
      }

      const reposData = await reposRes.json();
      if (Array.isArray(reposData) && reposData.length > 0) {
        const formatted: GitHubRepo[] = reposData.map((r: any) => ({
          name: r.name,
          description: r.description || 'Repository created by Bisworanjan Palar.',
          language: r.language || 'Python',
          stars: r.stargazers_count || 0,
          forks: r.forks_count || 0,
          url: r.html_url,
          updatedAt: r.updated_at ? new Date(r.updated_at).toLocaleDateString() : undefined,
        }));
        setRepos(formatted);
      }
    } catch (err) {
      // Graceful fallback to verified repositories on rate-limit or network failure
      setHasError(true);
      setRepos(VERIFIED_FALLBACK_REPOS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData();
  }, []);

  return (
    <section id="github" className="py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Github size={22} className="text-fuchsia-400" />
            <h2 className="text-2xl font-semibold text-white">GitHub Activity & Repositories</h2>
          </div>
          <p className="text-xs text-gray-400">
            Open-source code repositories, machine learning models & automated pipelines
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchGitHubData}
            disabled={isLoading}
            aria-label="Refresh GitHub Repositories"
            title="Refresh GitHub Data"
            className="p-2 border border-[#2A2D3A] bg-[#13141C] hover:bg-[#1A1C23] text-gray-400 hover:text-white rounded-xl text-xs transition-colors disabled:opacity-50"
          >
            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
          </button>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-[#2A2D3A] bg-[#13141C] hover:bg-[#1A1C23] hover:border-fuchsia-500/40 text-gray-300 hover:text-white rounded-xl text-xs font-medium transition-all flex items-center gap-2"
          >
            <Github size={14} /> @{GITHUB_USERNAME}
            <ExternalLink size={12} className="text-gray-400" />
          </a>
        </div>
      </div>

      {/* GitHub Profile Highlight Card */}
      <div className="bg-gradient-to-r from-[#13141C] via-[#161725] to-[#13141C] border border-[#1F212A] rounded-2xl p-5 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#1A1C23] border border-[#2A2D3A] flex items-center justify-center text-fuchsia-400">
            <BookOpen size={22} />
          </div>
          <div>
            <h3 className="text-white font-semibold text-base">{GITHUB_USERNAME}</h3>
            <p className="text-xs text-gray-400">
              AI & Machine Learning Developer · Centurion University
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#1A1C23] border border-[#2A2D3A] rounded-xl px-4 py-2 text-center">
            <span className="block text-lg font-bold text-white">
              {publicRepoCount !== null ? publicRepoCount : '5+'}
            </span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Repositories</span>
          </div>
          <div className="bg-[#1A1C23] border border-[#2A2D3A] rounded-xl px-4 py-2 text-center">
            <span className="block text-lg font-bold text-fuchsia-400">AI / ML</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Primary Focus</span>
          </div>
        </div>
      </div>

      {/* Notice if fallback is used */}
      {hasError && (
        <div className="mb-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A1612] border border-amber-500/20 text-xs text-amber-300">
          <AlertCircle size={14} className="flex-shrink-0 text-amber-400" />
          <span>
            Displaying verified local repository showcase (GitHub API rate limit or network offline).
          </span>
        </div>
      )}

      {/* Repository Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#13141C] border border-[#1F212A] rounded-2xl p-5 hover:border-fuchsia-500/40 hover:bg-[#151620] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Code size={16} className="text-fuchsia-400 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-medium text-sm group-hover:text-fuchsia-300 transition-colors truncate max-w-[200px]">
                    {repo.name}
                  </h4>
                </div>
                <ExternalLink size={13} className="text-gray-500 group-hover:text-fuchsia-400 transition-colors flex-shrink-0" />
              </div>

              <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 mb-4">
                {repo.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#1F212A] text-[11px] text-gray-400 font-mono">
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    LANGUAGE_COLORS[repo.language] || 'bg-blue-500'
                  }`}
                />
                <span className="text-gray-300">{repo.language}</span>
              </div>

              <div className="flex items-center gap-3">
                {repo.stars > 0 && (
                  <span className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-400" /> {repo.stars}
                  </span>
                )}
                {repo.forks > 0 && (
                  <span className="flex items-center gap-1">
                    <GitFork size={12} className="text-gray-400" /> {repo.forks}
                  </span>
                )}
                {repo.updatedAt && <span className="text-[10px] text-gray-500">{repo.updatedAt}</span>}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
});
