import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Scissors, 
  Clock, 
  ArrowRight,
  Check,
  Sparkles
} from 'lucide-react';
import { Badge } from '../common/Badge';

export function ScopeGuardian() {
  const { scopeModules, toggleModuleScope, simplifyScope, hasScopeCreepRisk, setCurrentTab } = useProject();

  const activeModules = scopeModules.filter(m => m.required);
  const totalDays = activeModules.reduce((acc, m) => acc + m.estimatedDays, 0);
  const weeksEquivalent = Math.ceil(totalDays / 5);

  const mustHaves = scopeModules.filter(m => m.category === 'Must Have');
  const shouldHaves = scopeModules.filter(m => m.category === 'Should Have');
  const niceToHaves = scopeModules.filter(m => m.category === 'Nice to Have');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-500/20 text-brand-400">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">Scope Guardian & MoSCoW Planner</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Preventing final-year scope bloat so your team ships a 100% polished, working submission.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentTab('roadmap')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-glow transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>Dynamic Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Scope Health & Warning Status Box */}
      {hasScopeCreepRisk ? (
        <div className="p-6 rounded-3xl bg-rose-950/20 border-2 border-rose-500/50 space-y-4 animate-pulse">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-rose-300">🚨 Scope Risk: CRITICAL (Scope Creep Detected)</h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  You have selected {activeModules.length} modules totaling ~{totalDays} workdays ({weeksEquivalent} weeks), exceeding your {profile.constraints?.weeksAvailable || 10}-week limit.
                </p>
              </div>
            </div>

            <button
              onClick={simplifyScope}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-400 text-slate-950 shadow-glow transition flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Scissors className="w-4 h-4" />
              <span>Simplify My Project</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-emerald-950/20 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Scope Health: Perfectly Balanced</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Current scope ({activeModules.length} modules, ~{weeksEquivalent} weeks) comfortably fits within your {profile.constraints?.weeksAvailable || 10}-week semester timeline.
              </p>
            </div>
          </div>

          <Badge variant="emerald" size="lg" className="font-mono">
            {weeksEquivalent} / {profile.constraints?.weeksAvailable || 10} Weeks
          </Badge>
        </div>
      )}

      {/* MoSCoW Buckets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* MUST HAVE */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Must Have (Core Engine)
            </span>
            <Badge variant="emerald" size="xs">Essential</Badge>
          </div>

          <div className="space-y-2.5">
            {mustHaves.map((mod) => (
              <div
                key={mod.id}
                onClick={() => toggleModuleScope(mod.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  mod.required 
                    ? 'bg-slate-900/90 border-emerald-500/40 text-slate-200 shadow-sm' 
                    : 'bg-slate-950 border-slate-800/60 text-slate-500 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{mod.name}</span>
                  <input
                    type="checkbox"
                    checked={mod.required}
                    onChange={() => {}}
                    className="accent-emerald-500 rounded"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                  <span>~{mod.estimatedDays} days</span>
                  <span className="text-emerald-400">{mod.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SHOULD HAVE */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-brand-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Should Have (Differentiators)
            </span>
            <Badge variant="brand" size="xs">High Value</Badge>
          </div>

          <div className="space-y-2.5">
            {shouldHaves.map((mod) => (
              <div
                key={mod.id}
                onClick={() => toggleModuleScope(mod.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  mod.required 
                    ? 'bg-slate-900/90 border-brand-500/40 text-slate-200' 
                    : 'bg-slate-950 border-slate-800/60 text-slate-500 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{mod.name}</span>
                  <input
                    type="checkbox"
                    checked={mod.required}
                    onChange={() => {}}
                    className="accent-brand-500 rounded"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                  <span>~{mod.estimatedDays} days</span>
                  <span className="text-brand-300">{mod.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NICE TO HAVE */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> Nice To Have (Scope Risk)
            </span>
            <Badge variant="rose" size="xs">Optional</Badge>
          </div>

          <div className="space-y-2.5">
            {niceToHaves.map((mod) => (
              <div
                key={mod.id}
                onClick={() => toggleModuleScope(mod.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  mod.required 
                    ? 'bg-rose-950/20 border-rose-500/50 text-rose-200' 
                    : 'bg-slate-950 border-slate-800/60 text-slate-500 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{mod.name}</span>
                  <input
                    type="checkbox"
                    checked={mod.required}
                    onChange={() => {}}
                    className="accent-rose-500 rounded"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                  <span>~{mod.estimatedDays} days</span>
                  <span className="text-rose-400">{mod.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
