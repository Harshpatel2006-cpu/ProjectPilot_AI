import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Home, 
  UserCheck, 
  Lightbulb, 
  Swords, 
  Dna, 
  Activity, 
  Radar, 
  Bot, 
  Sparkles, 
  GraduationCap, 
  ShieldCheck, 
  Calendar, 
  BrainCircuit, 
  MessageSquare,
  Zap,
  ChevronRight
} from 'lucide-react';
import { Badge } from './Badge';

export function Sidebar({ mobileOpen, onCloseMobile }) {
  const { currentTab, setCurrentTab, projectProgressPercentage, hasScopeCreepRisk, activeProject } = useProject();
  const { isDark } = useTheme();

  const navigationGroups = [
    {
      group: "Core Decision Flow",
      items: [
        { id: 'landing', label: 'Overview', icon: Home, badge: null },
        { id: 'profile', label: 'Student Profile', icon: UserCheck, badge: 'Step 1' },
        { id: 'projects', label: 'Project Candidates', icon: Lightbulb, badge: '5 Ideas' },
        { id: 'battle', label: 'Project Battle', icon: Swords, badge: 'Decision', highlight: true },
        { id: 'dna', label: 'Project DNA', icon: Dna, badge: null },
      ]
    },
    {
      group: "AI Intelligence & Analysis",
      items: [
        { id: 'feasibility', label: 'Feasibility Engine', icon: Activity, badge: '8 Dims' },
        { id: 'novelty', label: 'Novelty Radar', icon: Radar, badge: null },
        { id: 'ai-necessity', label: 'AI Necessity Check', icon: Bot, badge: 'Reality Check' },
        { id: 'innovation', label: 'Innovation Transformer', icon: Sparkles, badge: '3 Tiers' },
      ]
    },
    {
      group: "Defense & Mentorship",
      items: [
        { id: 'professor', label: 'Professor Simulator', icon: GraduationCap, badge: 'Viva AI' },
        { id: 'plan', label: 'Scope Guardian', icon: ShieldCheck, badge: hasScopeCreepRisk ? 'Risk Alert' : null, alert: hasScopeCreepRisk },
        { id: 'roadmap', label: 'Dynamic Roadmap', icon: Calendar, badge: '10 Wks' },
        { id: 'mentor', label: 'AI Mentor Hub', icon: BrainCircuit, badge: `${projectProgressPercentage}%` },
      ]
    }
  ];

  const handleNavClick = (tabId) => {
    setCurrentTab(tabId);
    if (onCloseMobile) onCloseMobile();
  };

  const content = (
    <div
      className="flex flex-col h-full py-4 px-3 border-r"
      style={{
        backgroundColor: isDark ? 'rgba(10,14,30,0.98)' : 'rgba(248,250,252,0.99)',
        borderColor: isDark ? '#1e293b' : '#e2e8f0',
        color: isDark ? '#e2e8f0' : '#1e293b',
      }}
    >
      
      {/* Active Project mini-card in sidebar */}
      {activeProject && (
        <div
          className="mb-4 p-3 rounded-xl border shadow-inner"
          style={{
            background: isDark ? 'linear-gradient(to bottom, rgba(30,41,59,0.8), rgba(15,23,42,0.9))' : 'linear-gradient(to bottom, rgba(241,245,249,0.9), rgba(226,232,240,0.8))',
            borderColor: isDark ? 'rgba(51,65,85,0.6)' : '#cbd5e1',
          }}
        >
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="flex items-center gap-1 font-semibold" style={{ color: '#06b6d4' }}>
              <Zap className="w-3 h-3" /> Selected Project
            </span>
            <span className="font-mono font-bold text-emerald-400">{activeProject.completionProbability}% Win Prob</span>
          </div>
          <p className="text-xs font-semibold line-clamp-2 leading-snug" style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}>
            {activeProject.title}
          </p>
        </div>
      )}

      {/* Nav List */}
      <nav className="flex-1 space-y-6 overflow-y-auto pr-1">
        {navigationGroups.map((grp) => (
          <div key={grp.group} className="space-y-1">
            <p
              className="px-2 text-[10px] font-extrabold uppercase tracking-wider"
              style={{ color: isDark ? '#64748b' : '#94a3b8' }}
            >
              {grp.group}
            </p>
            <div className="space-y-0.5">
              {grp.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer"
                    style={isActive ? {} : {
                      color: isDark ? '#94a3b8' : '#64748b',
                    }}
                    onMouseEnter={e => { if (!isActive) { e.currentTarget.style.backgroundColor = isDark ? 'rgba(51,65,85,0.5)' : 'rgba(226,232,240,0.7)'; e.currentTarget.style.color = isDark ? '#f1f5f9' : '#1e293b'; } }}
                    onMouseLeave={e => { if (!isActive) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = isDark ? '#94a3b8' : '#64748b'; } }}
                    {...(isActive ? { style: { background: 'linear-gradient(to right, #4f46e5, #4338ca)', color: '#ffffff', boxShadow: '0 0 15px -3px rgba(99,102,241,0.3)', fontWeight: 600 } } : {})}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-brand-400 transition-colors'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.alert ? (
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                      ) : null}
                      {item.badge && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                          isActive 
                            ? 'bg-white/20 text-white' 
                            : (item.alert ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700')
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-80" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Proactive Mentor Quick Banner */}
      <div className="mt-auto pt-3 border-t border-slate-800">
        <button
          onClick={() => handleNavClick('mentor')}
          className="w-full p-2.5 rounded-xl bg-gradient-to-r from-brand-950 to-slate-900 border border-brand-500/30 text-left hover:border-brand-500/60 transition group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400 shrink-0">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold text-slate-200">AI Mentor Online</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </div>
              <p className="text-[10px] text-slate-400 truncate">Pace: 64% completed</p>
            </div>
          </div>
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-[calc(100vh-4rem)] sticky top-16 z-30">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[80vw] h-full z-10 shadow-2xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
