import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { 
  Bot, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  TrendingUp 
} from 'lucide-react';
import { Badge } from '../common/Badge';

export function AINecessityCheck() {
  const { aiNecessityData, activeProject, setCurrentTab } = useProject();

  const score = activeProject?.scores?.aiNecessity || aiNecessityData.score;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-violet-500/20 text-violet-400">
              <Bot className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">AI Necessity Reality Check</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Evaluating whether Machine Learning is genuinely required or just a superficial gimmick.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="violet" size="lg" className="font-mono text-sm">
            AI Necessity Score: {score}/100
          </Badge>
          <button
            onClick={() => setCurrentTab('innovation')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-glow transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>Innovation Transformer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Hero Summary Box */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-violet-500/30 bg-gradient-to-r from-violet-950/20 via-slate-900 to-brand-950/20 shadow-glow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <Badge variant="emerald" size="sm">
              <CheckCircle2 className="w-3.5 h-3.5" /> High AI Legitimacy
            </Badge>
            <h2 className="text-xl font-bold text-white">
              Why Machine Learning is Mathematically Justified Here
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              In **{activeProject?.title || 'this project'}**, student attrition trajectories are governed by non-linear interactions across quiz timing, attendance variance, and assignment latency. Rule-based if-else logic cannot model these compounding multidimensional risk curves.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center shrink-0">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Necessity Score</span>
            <span className="text-3xl font-extrabold text-violet-400 font-mono">{score}%</span>
            <span className="text-[10px] text-emerald-400 font-medium block mt-1">Genuine Need</span>
          </div>
        </div>
      </div>

      {/* Comparison: Weak AI Gimmick vs Strong AI Implementation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Superficial Gimmick */}
        <div className="glass-card rounded-2xl p-6 border border-rose-900/40 bg-rose-950/10 space-y-4">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <XCircle className="w-5 h-5 shrink-0" />
            <span>❌ Superficial AI Usage (What Gets Penalized)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <strong className="text-rose-400 block mb-1">Common Mistake:</strong>
            {aiNecessityData.weakUsageExample}
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-400">Why Professors Dislike This:</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {aiNecessityData.weakUsageReason}
            </p>
          </div>
        </div>

        {/* Legitimate AI Implementation */}
        <div className="glass-card rounded-2xl p-6 border border-emerald-800/40 bg-emerald-950/10 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>✅ Legitimate High-Value AI (What Gets Top Marks)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <strong className="text-emerald-400 block mb-1">Our Engineered Approach:</strong>
            {aiNecessityData.strongUsageExample}
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-400">Why Examiners Reward This:</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {aiNecessityData.strongUsageReason}
            </p>
          </div>
        </div>

      </div>

      {/* 3 Core Viva Defenses for AI Usage */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-slate-200">
          🎓 Viva Defense Formula: "Why did you use Machine Learning instead of a standard database query?"
        </h3>
        <ul className="space-y-2 text-xs text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-violet-400 font-bold">A.</span>
            <span><strong>Multi-Variate Non-Linearity:</strong> Student dropouts do not follow a simple arithmetic cutoff (e.g. &lt; 75% attendance). A student with 72% attendance but 95% lab score may be safe, while 78% attendance with decaying quiz velocity indicates critical burnout.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-violet-400 font-bold">B.</span>
            <span><strong>Explainable Attributions (SHAP):</strong> TreeExplainer decomposes the ensemble model to reveal exact per-student weights, providing advisors with prescriptive intervention levers rather than opaque scores.</span>
          </li>
        </ul>
      </div>

    </div>
  );
}
