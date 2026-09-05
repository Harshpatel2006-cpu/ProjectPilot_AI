import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { 
  Dna, 
  Cpu, 
  Database, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  Activity, 
  ArrowRight, 
  Code2, 
  Terminal, 
  Compass,
  GraduationCap,
  FileSpreadsheet,
  Layers
} from 'lucide-react';
import { Badge } from '../common/Badge';

export function ProjectDNA() {
  const { activeProject, setCurrentTab } = useProject();

  if (!activeProject) return null;

  const dnaBadges = [
    { label: "Domain", value: activeProject.domain, icon: Compass, color: "brand" },
    { label: "AI Engine", value: activeProject.aiComponent?.split(' ')[0] || "Ensemble ML", icon: Sparkles, color: "violet" },
    { label: "Frontend", value: activeProject.frontend?.split(' ')[0] || "React", icon: Code2, color: "cyan" },
    { label: "Backend", value: activeProject.backend?.split(' ')[0] || "FastAPI", icon: Terminal, color: "emerald" },
    { label: "Database", value: activeProject.database?.split(' ')[0] || "PostgreSQL", icon: Database, color: "amber" },
    { label: "Difficulty", value: activeProject.difficulty, icon: Activity, color: "rose" },
    { label: "Duration", value: `${activeProject.durationWeeks} Weeks`, icon: Clock, color: "brand" },
    { label: "Cost", value: activeProject.estimatedCost, icon: DollarSign, color: "emerald" },
    { label: "Hardware", value: activeProject.hardwareRequirements?.includes("GPU") ? "Requires GPU" : "CPU Friendly (8GB)", icon: Cpu, color: "cyan" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="brand" size="sm">
                <Dna className="w-3.5 h-3.5" /> Project DNA Blueprint
              </Badge>
              <Badge variant="emerald" size="sm">
                {activeProject.completionProbability}% Win Prob
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {activeProject.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              {activeProject.tagline || activeProject.problem}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            <button
              onClick={() => setCurrentTab('feasibility')}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Feasibility (84%)</span>
            </button>
            <button
              onClick={() => setCurrentTab('professor')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-glow transition flex items-center gap-1.5 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Simulate Defense</span>
            </button>
          </div>
        </div>

        {/* DNA Pills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-8 pt-6 border-t border-slate-800">
          {dnaBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div key={idx} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                  <Icon className="w-3 h-3 text-brand-400" /> {badge.label}
                </span>
                <span className="text-xs font-semibold text-slate-200 mt-1 block truncate">
                  {badge.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Structural Deep Dive Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Problem & Solution */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
              🚨 Core Problem Statement
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {activeProject.problem}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              ✅ Proposed Solution & Architecture
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {activeProject.solution}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-xs font-semibold text-slate-400">Target Stakeholders</h4>
            <p className="text-xs text-slate-200 mt-1">{activeProject.targetUsers}</p>
          </div>
        </div>

        {/* AI/ML Component & Explainability */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-brand-300 uppercase tracking-wider flex items-center gap-2">
              🧠 AI / Machine Learning Engine
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {activeProject.aiComponent}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold text-cyber-cyan uppercase tracking-wider flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" /> Dataset & Benchmark Requirements
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {activeProject.datasetRequirements}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-xs font-semibold text-slate-400">Hardware & Runtime Envelope</h4>
            <p className="text-xs text-slate-200 mt-1 font-mono">{activeProject.hardwareRequirements}</p>
          </div>
        </div>

      </div>

      {/* Tech Stack Blueprint Card */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-brand-400" /> Full-Stack Technology Blueprint
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="text-xs font-semibold text-cyan-400 block mb-1">Frontend UI & Dashboard</span>
            <p className="text-xs text-slate-300">{activeProject.frontend}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="text-xs font-semibold text-emerald-400 block mb-1">Backend REST Server</span>
            <p className="text-xs text-slate-300">{activeProject.backend}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="text-xs font-semibold text-amber-400 block mb-1">Database & Storage</span>
            <p className="text-xs text-slate-300">{activeProject.database}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
