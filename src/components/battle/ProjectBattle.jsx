import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { 
  Swords, 
  Trophy, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  Sparkles, 
  ArrowUpDown,
  Layers
} from 'lucide-react';
import { Badge } from '../common/Badge';

export function ProjectBattle() {
  const { projects, activeProject, selectProject, setCurrentTab } = useProject();
  const [selectedForDuel, setSelectedForDuel] = useState([
    projects[0]?.id || '',
    projects[1]?.id || ''
  ]);

  const winner = projects.find(p => p.isRecommendedWinner) || projects[0];

  const duelProject1 = projects.find(p => p.id === selectedForDuel[0]) || projects[0];
  const duelProject2 = projects.find(p => p.id === selectedForDuel[1]) || projects[1] || projects[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Swords className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">Project Battle Arena</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Comparing 5 generated candidates across 7 dimensions to select the single project you can finish with top marks.
          </p>
        </div>

        <button
          onClick={() => selectProject(winner)}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-glow transition flex items-center gap-2 cursor-pointer self-start md:self-auto"
        >
          <span>Confirm {winner?.title.split(' ')[0]} as Project</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Winner Spotlight Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border-2 border-amber-500/40 bg-gradient-to-r from-amber-950/20 via-slate-900 to-brand-950/20 shadow-glow relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="amber" size="sm" className="font-bold">
                <Trophy className="w-3.5 h-3.5 fill-current" /> Official Recommendation
              </Badge>
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                {winner.completionProbability}% Win Rate
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {winner.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
              {winner.tagline}
            </p>

            {/* Why it wins matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                <span className="text-emerald-400 font-semibold block flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Hardware Compliant
                </span>
                <span className="text-slate-400 text-[11px] mt-0.5 block">Runs fast in CPU RAM (&lt; 2GB). Zero discrete GPU needed.</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                <span className="text-brand-400 font-semibold block flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> High Viva Defensibility
                </span>
                <span className="text-slate-400 text-[11px] mt-0.5 block">SHAP explainability preempts 'black-box ML' professor skepticism.</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                <span className="text-cyber-cyan font-semibold block flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Resume Alignment
                </span>
                <span className="text-slate-400 text-[11px] mt-0.5 block">Directly strengthens target AI/ML Engineer job applications.</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col gap-2">
            <button
              onClick={() => selectProject(winner)}
              className="px-6 py-3 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Adopt Winner DNA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentTab('feasibility')}
              className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
            >
              Detailed Feasibility
            </button>
          </div>
        </div>
      </div>

      {/* Comprehensive Battle Comparison Matrix Table */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-400" /> 5-Way Competitor Scoring Matrix
          </h3>
          <p className="text-xs text-slate-400">Side-by-side evaluation of all project candidates</p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/90 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 font-mono">
                <th className="p-4">Project Candidate</th>
                <th className="p-4 text-center">Feasibility</th>
                <th className="p-4 text-center">Innovation</th>
                <th className="p-4 text-center">Career Value</th>
                <th className="p-4 text-center">Viva Marks</th>
                <th className="p-4 text-center">AI Necessity</th>
                <th className="p-4 text-center">Overall Fit</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {projects.map((proj) => {
                const isWin = proj.isRecommendedWinner;
                const isSelected = activeProject?.id === proj.id;
                return (
                  <tr 
                    key={proj.id}
                    className={`transition-colors ${
                      isWin ? 'bg-amber-500/5 hover:bg-amber-500/10' : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="p-4 min-w-[260px] max-w-xs">
                      <div className="flex items-center gap-2">
                        {isWin && <Trophy className="w-4 h-4 text-amber-400 shrink-0" />}
                        <div>
                          <p className={`font-bold ${isWin ? 'text-amber-200' : 'text-slate-200'}`}>
                            {proj.title}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">{proj.domain}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-center font-mono font-bold">
                      <span className={`px-2 py-1 rounded ${
                        proj.scores.feasibility > 80 ? 'bg-emerald-500/15 text-emerald-400' : (proj.scores.feasibility > 60 ? 'bg-amber-500/15 text-amber-400' : 'bg-rose-500/15 text-rose-400')
                      }`}>
                        {proj.scores.feasibility}%
                      </span>
                    </td>

                    <td className="p-4 text-center font-mono font-bold text-cyber-cyan">
                      {proj.scores.innovation}%
                    </td>

                    <td className="p-4 text-center font-mono font-bold text-slate-300">
                      {proj.scores.careerValue}%
                    </td>

                    <td className="p-4 text-center font-mono font-bold text-brand-300">
                      {proj.scores.vivaPotential}%
                    </td>

                    <td className="p-4 text-center font-mono font-bold text-violet-400">
                      {proj.scores.aiNecessity}%
                    </td>

                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full font-mono font-extrabold text-xs ${
                        isWin ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {proj.scores.overallFit}/100
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => selectProject(proj)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                          isSelected 
                            ? 'bg-brand-600 text-white' 
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {isSelected ? "Active" : "Select"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Head-to-Head Duel Simulator */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-cyan-400" /> Head-to-Head Duel & Trade-off Analyzer
            </h3>
            <p className="text-xs text-slate-400">Compare any two projects to see why one was favored over the other</p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedForDuel[0]}
              onChange={(e) => setSelectedForDuel([e.target.value, selectedForDuel[1]])}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200"
            >
              {projects.map((p, i) => (
                <option key={p.id} value={p.id}>Option A: {p.title.slice(0, 30)}...</option>
              ))}
            </select>

            <span className="text-xs font-bold text-slate-500">VS</span>

            <select
              value={selectedForDuel[1]}
              onChange={(e) => setSelectedForDuel([selectedForDuel[0], e.target.value])}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200"
            >
              {projects.map((p, i) => (
                <option key={p.id} value={p.id}>Option B: {p.title.slice(0, 30)}...</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card A */}
          <div className={`p-5 rounded-2xl border ${
            duelProject1.isRecommendedWinner ? 'bg-amber-950/15 border-amber-500/40' : 'bg-slate-900/80 border-slate-800'
          } space-y-4`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wide">Candidate A</span>
              {duelProject1.isRecommendedWinner && <Badge variant="amber" size="xs">Recommended</Badge>}
            </div>
            <h4 className="text-sm font-bold text-white">{duelProject1.title}</h4>
            <p className="text-xs text-slate-400">{duelProject1.tagline}</p>
            
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Feasibility:</span>
                <strong className="font-mono text-emerald-400">{duelProject1.scores.feasibility}%</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Innovation:</span>
                <strong className="font-mono text-cyber-cyan">{duelProject1.scores.innovation}%</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Hardware:</span>
                <span className="text-slate-400">{duelProject1.hardwareRequirements}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 text-xs text-slate-300">
              <strong className="text-amber-400 block mb-1">Decision Analysis:</strong>
              {duelProject1.tradeoffs || duelProject1.recommendationReason}
            </div>
          </div>

          {/* Card B */}
          <div className={`p-5 rounded-2xl border ${
            duelProject2.isRecommendedWinner ? 'bg-amber-950/15 border-amber-500/40' : 'bg-slate-900/80 border-slate-800'
          } space-y-4`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide">Candidate B</span>
              {duelProject2.isRecommendedWinner && <Badge variant="amber" size="xs">Recommended</Badge>}
            </div>
            <h4 className="text-sm font-bold text-white">{duelProject2.title}</h4>
            <p className="text-xs text-slate-400">{duelProject2.tagline}</p>
            
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Feasibility:</span>
                <strong className="font-mono text-emerald-400">{duelProject2.scores.feasibility}%</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Innovation:</span>
                <strong className="font-mono text-cyber-cyan">{duelProject2.scores.innovation}%</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Hardware:</span>
                <span className="text-slate-400">{duelProject2.hardwareRequirements}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 text-xs text-slate-300">
              <strong className="text-amber-400 block mb-1">Decision Analysis:</strong>
              {duelProject2.tradeoffs || duelProject2.recommendationReason}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
