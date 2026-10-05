import React, { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { GitHubShowcase } from "./components/GitHubShowcase";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";
import { Chatbot } from "./components/Chatbot";
import { CanvasBackground } from "./components/CanvasBackground";
import { ResumeCenterModal } from "./components/ResumeCenterModal";

// Additive modules - Phase 1
import { DeveloperSnapshot } from "./components/DeveloperSnapshot";
import { Playground } from "./components/Playground";
import { TechExplorer } from "./components/TechExplorer";
import { Blog } from "./components/Blog";
import { GlobalSearchModal } from "./components/GlobalSearchModal";
import { AdminModal } from "./components/AdminModal";
import { ProjectCaseStudyModal } from "./components/ProjectCaseStudyModal";
import { CASE_STUDIES, CaseStudy } from "./data/caseStudiesData";
import { analytics } from "./utils/analytics";
import { Search, Share2 } from "lucide-react";

// Additive modules - Phase 2
import { InteractiveCursor } from "./components/InteractiveCursor";
import { AmbientBackgroundParticles } from "./components/AmbientBackgroundParticles";
import { ScrollProgress } from "./components/ScrollProgress";
import { DeveloperEasterEgg } from "./components/DeveloperEasterEgg";
import { AmbientSoundControl } from "./components/AmbientSoundControl";
import { ThemeAccentSelector } from "./components/ThemeAccentSelector";
import { ThemeToggle3D } from "./components/ThemeToggle3D";
import { CityTimeWidget } from "./components/CityTimeWidget";
import { AvailabilityStatus } from "./components/AvailabilityStatus";
import { OneClickDeveloperProfile } from "./components/OneClickDeveloperProfile";
import { SharePortfolioModal } from "./components/SharePortfolioModal";
import { MilestoneTimeline } from "./components/MilestoneTimeline";
import { CareerRoadmap } from "./components/CareerRoadmap";
import { CurrentlyBuilding } from "./components/CurrentlyBuilding";
import { Testimonials } from "./components/Testimonials";
import { WelcomeVoiceExperience } from "./components/WelcomeVoiceExperience";
import { Footer3D } from "./components/Footer3D";

export default function App() {
  const [isResumeCenterOpen, setIsResumeCenterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [deepLinkCaseStudy, setDeepLinkCaseStudy] = useState<CaseStudy | null>(null);

  const openResumeCenter = () => setIsResumeCenterOpen(true);
  const closeResumeCenter = () => setIsResumeCenterOpen(false);
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);
  const openAdmin = () => setIsAdminOpen(true);
  const closeAdmin = () => setIsAdminOpen(false);

  const handleOpenCaseStudy = (caseStudy: CaseStudy) => {
    setDeepLinkCaseStudy(caseStudy);
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Deep-linking & Analytics initialization
  useEffect(() => {
    analytics.trackSessionVisitOnce();

    const handleLocationChange = () => {
      if (typeof window === "undefined") return;
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (path === "/admin" || hash === "#admin") {
        setIsAdminOpen(true);
        return;
      }

      const projectMatch =
        path.match(/^\/projects\/([a-z0-9-]+)/) ||
        hash.match(/#\/?projects\/([a-z0-9-]+)/);

      if (projectMatch && projectMatch[1]) {
        const rawId = projectMatch[1];
        let targetId = rawId;
        if (rawId === "ai-drone-campus") targetId = "ai-drone";
        if (rawId === "student-attendance") targetId = "attendance-system";
        const found = CASE_STUDIES[targetId];
        if (found) setDeepLinkCaseStudy(found);
      }
    };

    handleLocationChange();
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0C10] font-sans selection:bg-fuchsia-500/30 text-white flex relative overflow-x-hidden">
      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-fuchsia-600 focus:text-white focus:rounded-xl focus:outline-none"
      >
        Skip to main content
      </a>

      {/* 240-Frame Canvas Scroll Animation Background */}
      <CanvasBackground />

      {/* Subtle ambient depth particles (reduced-motion safe) */}
      <AmbientBackgroundParticles />

      {/* 3D interactive cursor (fine-pointer + reduced-motion safe) */}
      <InteractiveCursor />

      {/* Section scroll progress indicator */}
      <ScrollProgress />

      {/* Hidden Developer Easter Egg (Ctrl+Shift+D or type dev) */}
      <DeveloperEasterEgg />

      {/* Sidebar Navigation */}
      <Sidebar
        onOpenResumeCenter={openResumeCenter}
        onOpenSearch={openSearch}
        onOpenAdmin={openAdmin}
      />

      {/* Mobile Top Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-[#0B0C10]/90 backdrop-blur-md border-b border-[#1F212A] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-blue-500">
            BP
          </span>
          <span className="text-xs font-semibold text-white">Bisworanjan Palar</span>
        </div>

        <div className="flex items-center gap-1.5">
          <ThemeToggle3D />
          <WelcomeVoiceExperience />
          <button
            onClick={openSearch}
            aria-label="Search Portfolio"
            className="p-2 rounded-xl bg-[#161722] border border-[#2A2D3A] text-gray-300 hover:text-white flex items-center gap-1.5 text-xs"
          >
            <Search size={14} className="text-fuchsia-400" />
            <span>Search</span>
          </button>
          <button
            onClick={() => setIsShareOpen(true)}
            aria-label="Share Portfolio"
            className="p-2 rounded-xl bg-[#161722] border border-[#2A2D3A] text-gray-300 hover:text-white"
          >
            <Share2 size={14} className="text-fuchsia-400" />
          </button>
        </div>
      </header>

      {/* Main Content Scroll Area */}
      <main id="main-content" className="flex-1 lg:ml-72 min-h-screen relative z-10 pt-14 lg:pt-0">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 xl:px-16">

          {/* Desktop Toolbar: Accent + Theme + Sound + Welcome + Time + Profile + Share */}
          <div className="hidden lg:flex items-center gap-2 flex-wrap pt-4 pb-2 justify-end">
            <CityTimeWidget compact />
            <ThemeAccentSelector />
            <ThemeToggle3D />
            <AmbientSoundControl />
            <WelcomeVoiceExperience />
            <OneClickDeveloperProfile variant="button" />
            <button
              onClick={() => setIsShareOpen(true)}
              aria-label="Share Portfolio"
              className="p-2 rounded-xl bg-[#161722] border border-[#2A2D3A] text-gray-400 hover:text-white hover:border-fuchsia-500/40 transition-all flex items-center gap-1.5 text-xs"
            >
              <Share2 size={13} className="text-fuchsia-400" />
              <span className="font-mono text-[10px] text-gray-500 hidden xl:inline">Share</span>
            </button>
          </div>

          {/* Existing Hero Section */}
          <Hero onOpenResumeCenter={openResumeCenter} />

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4" />
          {/* Existing Stats Section */}
          <Stats />

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4" />
          {/* Developer Snapshot Dashboard */}
          <DeveloperSnapshot />

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4" />
          {/* Currently Building */}
          <CurrentlyBuilding />

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4" />
          {/* Skills + 3D Skill Globe */}
          <Skills />

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4" />
          {/* Projects + Architecture/Comparison/Presentation */}
          <Projects />

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4" />
          {/* Interactive Technology Explorer */}
          <TechExplorer onOpenCaseStudy={handleOpenCaseStudy} />

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4" />
          {/* AI / ML Playground */}
          <Playground />

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4" />
          {/* GitHub Section */}
          <GitHubShowcase />

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4" />
          {/* Technical Blog */}
          <Blog onOpenCaseStudy={handleOpenCaseStudy} />

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4" />
          {/* Achievement & Milestone Timeline */}
          <MilestoneTimeline />

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4" />
          {/* Visual Career Roadmap */}
          <CareerRoadmap />

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4" />
          {/* Education Section */}
          <Education />

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4" />
          {/* Experience Section */}
          <Experience />

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4" />
          {/* Certifications Section */}
          <Certifications />

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4" />
          {/* Academic & Certification Endorsements */}
          <Testimonials />

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1F212A] to-transparent my-4" />
          {/* City Time + Availability — above contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <CityTimeWidget />
            <AvailabilityStatus onContactClick={scrollToContact} />
          </div>

          {/* Contact Section */}
          <Contact />
        </div>

        {/* 3D Footer */}
        <Footer3D />
      </main>

      {/* Floating AI Assistant */}
      <Chatbot />

      {/* Resume & Portfolio Center Modal */}
      <ResumeCenterModal isOpen={isResumeCenterOpen} onClose={closeResumeCenter} />

      {/* Global Portfolio Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={closeSearch}
        onOpenCaseStudy={handleOpenCaseStudy}
      />

      {/* Private Admin Modal */}
      <AdminModal isOpen={isAdminOpen} onClose={closeAdmin} />

      {/* Share Portfolio Modal */}
      <SharePortfolioModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />

      {/* Deep-link Case Study Modal */}
      <ProjectCaseStudyModal
        caseStudy={deepLinkCaseStudy}
        onClose={() => setDeepLinkCaseStudy(null)}
      />
    </div>
  );
}
