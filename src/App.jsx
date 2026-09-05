import React, { useState } from 'react';
import { ProjectProvider, useProject } from './context/ProjectContext';
import { useTheme } from './context/ThemeContext';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { SettingsModal } from './components/settings/SettingsModal';
import { LoginPage } from './components/auth/LoginPage';
import { LandingPage } from './components/landing/LandingPage';
import { StudentProfileWizard } from './components/profile/StudentProfileWizard';
import { ProjectList } from './components/generator/ProjectList';
import { ProjectBattle } from './components/battle/ProjectBattle';
import { ProjectDNA } from './components/detail/ProjectDNA';
import { FeasibilityDashboard } from './components/feasibility/FeasibilityDashboard';
import { NoveltyRadar } from './components/novelty/NoveltyRadar';
import { AINecessityCheck } from './components/ai-check/AINecessityCheck';
import { InnovationTransformer } from './components/innovation/InnovationTransformer';
import { ProfessorSimulator } from './components/professor/ProfessorSimulator';
import { ScopeGuardian } from './components/planner/ScopeGuardian';
import { DynamicRoadmap } from './components/planner/DynamicRoadmap';
import { MentorDashboard } from './components/mentor/MentorDashboard';
import { MentorChat } from './components/mentor/MentorChat';
import { Compass, Loader2 } from 'lucide-react';

function AppContent() {
  const { currentTab, setCurrentTab } = useProject();
  const { isDark } = useTheme();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const renderActiveView = () => {
    switch (currentTab) {
      case 'landing':
        return <LandingPage />;
      case 'profile':
        return <StudentProfileWizard />;
      case 'projects':
        return <ProjectList />;
      case 'battle':
        return <ProjectBattle />;
      case 'dna':
        return <ProjectDNA />;
      case 'feasibility':
        return <FeasibilityDashboard />;
      case 'novelty':
        return <NoveltyRadar />;
      case 'ai-necessity':
        return <AINecessityCheck />;
      case 'innovation':
        return <InnovationTransformer />;
      case 'professor':
        return <ProfessorSimulator />;
      case 'plan':
        return <ScopeGuardian />;
      case 'roadmap':
        return <DynamicRoadmap />;
      case 'mentor':
        return <MentorDashboard />;
      case 'chat':
        return (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <MentorChat />
          </div>
        );
      default:
        return <LandingPage />;
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: isDark ? '#090d16' : '#f1f5fb', color: isDark ? '#e2e8f0' : '#1e293b' }}
    >
      {/* Top Navigation */}
      <Navbar onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex">
        {currentTab !== 'landing' && (
          <Sidebar
            mobileOpen={mobileSidebarOpen}
            onCloseMobile={() => setMobileSidebarOpen(false)}
          />
        )}

        <main className={`flex-1 min-w-0 ${currentTab === 'landing' ? 'w-full' : 'p-2 sm:p-4'}`}>
          {renderActiveView()}
        </main>
      </div>

      {/* Settings Modal */}
      <SettingsModal />

      {/* Footer */}
      <footer
        className="border-t py-6 text-center text-xs"
        style={{
          backgroundColor: isDark ? 'rgba(15,23,42,0.6)' : 'rgba(255,255,255,0.85)',
          borderColor: isDark ? '#1e293b' : '#e2e8f0',
          color: isDark ? '#64748b' : '#94a3b8',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-brand-600 flex items-center justify-center text-white">
              <Compass className="w-3 h-3" />
            </div>
            <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>ProjectPilot AI</span>
            <span>— “Don't just generate a project. Find the project you can actually build.”</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button 
              onClick={() => setCurrentTab('landing')}
              className="hover:text-brand-300 transition cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentTab('profile')}
              className="hover:text-brand-300 transition cursor-pointer"
            >
              Profile Wizard
            </button>
            <button 
              onClick={() => setCurrentTab('battle')}
              className="hover:text-brand-300 transition cursor-pointer"
            >
              Project Battle
            </button>
            <button 
              onClick={() => setCurrentTab('professor')}
              className="hover:text-brand-300 transition cursor-pointer"
            >
              Professor Simulator
            </button>
            <button 
              onClick={() => setCurrentTab('mentor')}
              className="hover:text-brand-300 transition cursor-pointer"
            >
              AI Mentor
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const { user, loading } = useAuth();
  const { isDark } = useTheme();

  // Loading spinner while checking Supabase session
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: isDark ? '#090d16' : '#f1f5fb' }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center shadow-glow animate-pulse-ring">
            <Compass className="w-8 h-8 text-white" />
          </div>
          <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#6366f1' }} />
          <p className="text-sm" style={{ color: isDark ? '#64748b' : '#94a3b8' }}>Checking session...</p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!user) {
    return <LoginPage />;
  }

  // Show main app if authenticated
  return (
    <ProjectProvider>
      <AppContent />
    </ProjectProvider>
  );
}
