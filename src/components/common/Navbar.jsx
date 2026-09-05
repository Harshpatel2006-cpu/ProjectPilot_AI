import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Compass, Settings, Play, ShieldAlert, Sun, Moon, LogOut } from 'lucide-react';
import { Badge } from './Badge';

export function Navbar({ onOpenMobileSidebar }) {
  const { 
    currentTab, 
    setCurrentTab, 
    activeProject, 
    loadDemoProfile, 
    setActiveModal,
    hasScopeCreepRisk 
  } = useProject();

  const { isDark, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();

  return (
    <header
      style={{
        backgroundColor: isDark ? 'rgba(9, 13, 22, 0.92)' : 'rgba(255, 255, 255, 0.95)',
        borderBottom: isDark ? '1px solid rgba(51,65,85,0.6)' : '1px solid rgba(203,213,225,0.8)',
      }}
      className="sticky top-0 z-40 w-full backdrop-blur-xl transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* Left: Brand & Mobile Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileSidebar}
            style={{ color: isDark ? '#94a3b8' : '#475569' }}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-700/40 transition"
            aria-label="Open Navigation"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <button
            onClick={() => setCurrentTab('landing')}
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-400 flex items-center justify-center shadow-glow-sm group-hover:scale-105 transition duration-300">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span
                  style={{ color: isDark ? '#f1f5f9' : '#0f172a' }}
                  className="font-bold text-lg tracking-tight group-hover:text-indigo-500 transition"
                >
                  ProjectPilot
                </span>
                <span className="text-xs font-extrabold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  AI
                </span>
              </div>
              <p
                style={{ color: isDark ? '#64748b' : '#64748b' }}
                className="text-[10px] hidden sm:block"
              >
                Decision Maker & Mentor
              </p>
            </div>
          </button>
        </div>

        {/* Center: Active Project Pill */}
        {currentTab !== 'landing' && activeProject && (
          <div
            style={{
              backgroundColor: isDark ? 'rgba(15,23,42,0.9)' : 'rgba(241,245,249,0.9)',
              border: isDark ? '1px solid #1e293b' : '1px solid #cbd5e1',
            }}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full max-w-md truncate"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span style={{ color: isDark ? '#64748b' : '#64748b' }} className="text-xs font-mono">Active:</span>
            <span style={{ color: isDark ? '#e2e8f0' : '#1e293b' }} className="text-xs font-semibold truncate">
              {activeProject.title}
            </span>
            {hasScopeCreepRisk && (
              <Badge variant="amber" size="xs">
                <ShieldAlert className="w-3 h-3" /> Scope Warning
              </Badge>
            )}
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Demo Load */}
          <button
            onClick={loadDemoProfile}
            title="Load realistic demo profile & sample projects"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-indigo-500/40 text-indigo-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition duration-200 cursor-pointer"
            style={{ backgroundColor: isDark ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.08)' }}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">1-Click</span> Demo
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
            className="relative w-[52px] h-7 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition-all duration-300"
            style={{
              background: isDark
                ? 'linear-gradient(to right, #4f46e5, #7c3aed)'
                : 'linear-gradient(to right, #f59e0b, #f97316)',
              boxShadow: isDark
                ? '0 0 12px rgba(99,102,241,0.4)'
                : '0 0 12px rgba(251,191,36,0.4)',
            }}
          >
            {/* Track background icons */}
            <Sun className="absolute left-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 transition-all duration-300" />
            <Moon className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 transition-all duration-300" />
            {/* Knob */}
            <span
              className="absolute top-0.5 w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-all duration-300"
              style={{
                transform: isDark ? 'translateX(calc(52px - 28px))' : 'translateX(2px)',
                backgroundColor: isDark ? '#0f172a' : '#ffffff',
                color: isDark ? '#818cf8' : '#f59e0b',
              }}
            >
              {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            </span>
          </button>

          {/* Settings */}
          <button
            onClick={() => setActiveModal('settings')}
            title="AI & System Settings"
            className="p-2 rounded-lg transition cursor-pointer"
            style={{ color: isDark ? '#94a3b8' : '#475569' }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = isDark ? 'rgba(51,65,85,0.5)' : 'rgba(226,232,240,0.8)';
              e.currentTarget.style.color = isDark ? '#f1f5f9' : '#0f172a';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = isDark ? '#94a3b8' : '#475569';
            }}
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Sign Out / User Avatar */}
          <div className="hidden sm:flex items-center gap-2 pl-1 border-l" style={{ borderColor: isDark ? '#1e293b' : '#e2e8f0' }}>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
              title={user?.email}
            >
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <button
              onClick={signOut}
              title="Sign Out"
              className="p-2 rounded-lg transition cursor-pointer"
              style={{ color: isDark ? '#94a3b8' : '#475569' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = isDark ? 'rgba(239,68,68,0.12)' : 'rgba(254,226,226,0.8)'; e.currentTarget.style.color = '#f87171'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = isDark ? '#94a3b8' : '#475569'; }}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </header>
  );
}
