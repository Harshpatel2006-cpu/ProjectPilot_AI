import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { 
  Radar as RadarIcon, 
  AlertTriangle, 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  ShieldAlert,
  Layers
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip 
} from 'recharts';
import { Badge } from '../common/Badge';

export function NoveltyRadar() {
  const { noveltyData, activeProject, setCurrentTab } = useProject();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
              <RadarIcon className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">Novelty & Commonness Radar</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Detecting overused college project tropes and recommending high-value academic differentiation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentTab('ai-necessity')}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>AI Necessity Check</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentTab('innovation')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-glow transition flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Innovation Transformer</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Radar Chart + Metric Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Radar Chart Display */}
        <div className="lg:col-span-6 glass-card rounded-3xl p-6 border border-slate-800 flex flex-col items-center justify-center min-h-[380px]">
          <div className="w-full flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" /> Multi-Axial Novelty Plot
            </h3>
            <Badge variant="cyan" size="xs">Recharts Radar 6D</Badge>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={noveltyData.radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                <PolarGrid stroke="#334155" strokeDasharray="3 3" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" tick={false} />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.4}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#818cf8' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4 Score Metric Cards */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400">Estimated Commonness</span>
            <p className="text-2xl font-extrabold text-amber-400 font-mono">
              {noveltyData.commonnessScore}/100
            </p>
            <p className="text-[11px] text-slate-400 pt-1">
              Moderately common core theme, but upgraded with explainability.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400">Innovation Score</span>
            <p className="text-2xl font-extrabold text-brand-400 font-mono">
              {noveltyData.innovationScore}/100
            </p>
            <p className="text-[11px] text-slate-400 pt-1">
              SHAP feature attribution elevates it above standard classifiers.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400">Academic / Viva Value</span>
            <p className="text-2xl font-extrabold text-emerald-400 font-mono">
              {noveltyData.academicValue}/100
            </p>
            <p className="text-[11px] text-slate-400 pt-1">
              Direct mathematical defense of cross-feature interactions.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400">Real-World Relevance</span>
            <p className="text-2xl font-extrabold text-cyber-cyan font-mono">
              {noveltyData.realWorldRelevance}/100
            </p>
            <p className="text-[11px] text-slate-400 pt-1">
              Universities actively seek early student retention tools.
            </p>
          </div>
        </div>

      </div>

      {/* Common Project Warning & Innovation Upgrade Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Warning */}
        <div className="p-6 rounded-3xl bg-amber-950/20 border border-amber-500/40 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>⚠️ Common Project Pitfall Warning</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {noveltyData.commonProjectWarning}
          </p>
          <div className="p-3 rounded-xl bg-slate-900/80 text-[11px] text-slate-400 border border-slate-800">
            <strong className="text-rose-400 block mb-0.5">Examiner Perspective:</strong>
            “If all you show is a form where I input marks and it outputs 'Pass/Fail', you will receive baseline marks.”
          </div>
        </div>

        {/* Upgrade Suggestion */}
        <div className="p-6 rounded-3xl bg-brand-950/30 border border-brand-500/50 space-y-3">
          <div className="flex items-center gap-2 text-brand-300 font-bold text-sm">
            <Sparkles className="w-5 h-5 text-brand-400 shrink-0" />
            <span>💡 Applied Innovation Upgrade</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {noveltyData.upgradeReason}
          </p>
          <div className="p-3 rounded-xl bg-slate-900/80 text-[11px] text-slate-300 border border-brand-500/30">
            <strong className="text-emerald-400 block mb-0.5">Applied Differentiator:</strong>
            Counterfactual 'What-If' Simulation & SHAP TreeExplainer Visualizer.
          </div>
        </div>

      </div>

    </div>
  );
}
