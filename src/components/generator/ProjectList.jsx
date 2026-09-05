import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { 
  Trophy, 
  Sparkles, 
  Cpu, 
  Clock, 
  ChevronRight, 
  Swords, 
  CheckCircle2, 
  Flame, 
  ArrowRight, 
  ShieldCheck,
  RefreshCw,
  Activity
} from 'lucide-react';
import { Badge } from '../common/Badge';

export function ProjectList() {
  const { projects, activeProject, selectProject, setCurrentTab, handleGenerateProjects, isGenerating } = useProject();

  const winner = projects.find(p => p.isRecommendedWinner) || projects[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-500/20 text-brand-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">5 Personalized Project Candidates</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Engineered specifically against your capability assessment, 8GB RAM specs, and 10-week timeline.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentTab('battle')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-brand-600 hover:from-amber-400 hover:to-brand-500 text-white shadow-glow transition flex items-center gap-2 cursor-pointer"
          >
            <Swords className="w-4 h-4" />
            <span>Launch Project Battle</span>
          </button>

          <button
            onClick={() => handleGenerateProjects()}
            disabled={isGenerating}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
            title="Regenerate candidates"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Recommended Winner Callout Hero Card */}
      {winner && (
        <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-brand-950/80 via-slate-900 to-slate-950 border-2 border-brand-500/50 shadow-glow">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Trophy className="w-48 h-48 text-brand-400" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="amber" size="sm" className="font-bold uppercase tracking-wider">
                  <Trophy className="w-3.5 h-3.5 fill-current" /> ProjectPilot Top Recommendation
                </Badge>
                <Badge variant="emerald" size="sm">
                  {winner.completionProbability}% AI-Estimated Completion Prob
                </Badge>
                <span className="text-xs text-slate-400 font-mono">Domain: {winner.domain}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {winner.title}
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {winner.tagline}
              </p>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
                <strong className="text-brand-400 block mb-1">💡 Why this project wins for you:</strong>
                {winner.recommendationReason}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                onClick={() => selectProject(winner)}
                className="px-6 py-3 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-glow transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Select & Inspect DNA</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentTab('feasibility')}
                className="px-6 py-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>Feasibility Breakdown</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of All 5 Candidate Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">All 5 Analyzed Candidates</h3>
          <span className="text-xs text-slate-400">Click any candidate to test in Professor Simulator or Feasibility</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((proj, idx) => {
            const isSelected = activeProject?.id === proj.id;
            return (
              <div
                key={proj.id}
                className={`glass-card rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                  isSelected 
                    ? 'border-brand-500/80 bg-slate-900/90 shadow-glow-sm' 
                    : 'border-slate-800/90 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      #{idx + 1}
                    </span>
                    {proj.isRecommendedWinner ? (
                      <Badge variant="amber" size="xs">
                        <Trophy className="w-3 h-3 fill-current" /> Winner
                      </Badge>
                    ) : (
                      <Badge variant="outline" size="xs">
                        {proj.difficulty}
                      </Badge>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                    {proj.tagline || proj.problem}
                  </p>

                  {/* 4-Key Score Mini Grid */}
                  <div className="grid grid-cols-3 gap-2 mt-4 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-center">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Feasibility</span>
                      <span className={`text-xs font-mono font-bold ${proj.scores.feasibility > 80 ? 'text-emerald-400' : (proj.scores.feasibility > 60 ? 'text-amber-400' : 'text-rose-400')}`}>
                        {proj.scores.feasibility}%
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Innovation</span>
                      <span className="text-xs font-mono font-bold text-cyber-cyan">
                        {proj.scores.innovation}%
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Viva Marks</span>
                      <span className="text-xs font-mono font-bold text-brand-300">
                        {proj.scores.vivaPotential}%
                      </span>
                    </div>
                  </div>

                  {/* Specs Pill List */}
                  <div className="mt-4 space-y-1.5 text-[11px] text-slate-400">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1"><Cpu className="w-3 h-3 text-slate-500" /> Hardware:</span>
                      <span className="text-slate-300 font-medium truncate max-w-[150px]">{proj.hardwareRequirements}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-500" /> Duration:</span>
                      <span className="text-slate-300 font-medium">{proj.durationWeeks} Weeks</span>
                    </div>
                  </div>

                  {/* Trade-off Note if not winner */}
                  {!proj.isRecommendedWinner && proj.tradeoffs && (
                    <div className="mt-3 p-2 rounded-lg bg-rose-950/20 border border-rose-900/30 text-[11px] text-rose-300/90 leading-tight">
                      <strong className="text-rose-400 font-semibold">Trade-off: </strong>
                      {proj.tradeoffs}
                    </div>
                  )}
                </div>

                {/* Card Action */}
                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-[10px] font-mono text-slate-500">
                    Fit: <strong className="text-white text-xs">{proj.scores.overallFit}/100</strong>
                  </div>

                  <button
                    onClick={() => selectProject(proj)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                      isSelected
                        ? 'bg-brand-600 text-white shadow-glow-sm'
                        : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    <span>{isSelected ? "Selected" : "Select Project"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
