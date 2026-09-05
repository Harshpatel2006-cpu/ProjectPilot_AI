import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { 
  Activity, 
  CheckCircle2, 
  Cpu, 
  Clock, 
  Code, 
  Users, 
  DollarSign, 
  Database, 
  Wrench, 
  Cloud, 
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { Badge } from '../common/Badge';

export function FeasibilityDashboard() {
  const { activeProject, feasibilityDimensions, setCurrentTab } = useProject();

  const iconMap = {
    Code: Code,
    Clock: Clock,
    Users: Users,
    Cpu: Cpu,
    DollarSign: DollarSign,
    Database: Database,
    Wrench: Wrench,
    Cloud: Cloud
  };

  const overallFeasibility = activeProject?.scores?.feasibility || 91;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Activity className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">8-Dimension Feasibility Engine</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Validating technical constraints, 8GB RAM memory footprint, and 10-week submission deadline.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="emerald" size="lg" className="font-mono text-sm">
            <ShieldCheck className="w-4 h-4" /> Feasibility: {overallFeasibility}/100
          </Badge>
          <button
            onClick={() => setCurrentTab('novelty')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-glow transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>Novelty Radar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Hardware & Resource Guard Callout */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-brand-950/30 border border-brand-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Hardware Compatibility Verdict: 100% Passed</h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Target model (XGBoost + SHAP) utilizes &lt; 1.8GB memory. Runs smoothly on your <strong className="text-cyan-300 font-semibold">{profile.constraints?.ram || '8GB RAM'}</strong> setup without requiring CUDA/GPU.
            </p>
          </div>
        </div>

        <Badge variant="emerald" size="sm" className="shrink-0 font-bold">
          🟢 Safe for Local Development
        </Badge>
      </div>

      {/* 8 Feasibility Dimension Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {feasibilityDimensions.map((dim, idx) => {
          const Icon = iconMap[dim.icon] || Activity;
          const isSafe = dim.score >= 80;
          const isRisk = dim.score < 80 && dim.score >= 60;
          
          return (
            <div key={idx} className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-slate-800 text-brand-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-200">{dim.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-white">{dim.score}%</span>
                  <Badge variant={isSafe ? 'emerald' : (isRisk ? 'amber' : 'rose')} size="xs">
                    {dim.status}
                  </Badge>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    isSafe ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : (isRisk ? 'bg-gradient-to-r from-amber-500 to-orange-400' : 'bg-rose-500')
                  }`}
                  style={{ width: `${dim.score}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                {dim.detail}
              </p>
            </div>
          );
        })}
      </div>

      {/* AI Risk Mitigation Prescription Box */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" /> Proactive AI Risk Mitigation Plan
        </h3>
        <ul className="space-y-2 text-xs text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">1.</span>
            <span><strong>No GPU Workaround:</strong> Utilize Scikit-Learn / XGBoost CPU threads rather than local HuggingFace 7B LLM fine-tuning to prevent system crashes during college demos.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">2.</span>
            <span><strong>Dataset Imbalance:</strong> Ingest the Kaggle student benchmark and apply SMOTE-NC to avoid bias toward the majority passing class.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">3.</span>
            <span><strong>Cloud Cost Control:</strong> Deploy backend to free-tier Render/Railway container and frontend to Vercel, spending ₹0 on infrastructure.</span>
          </li>
        </ul>
      </div>

    </div>
  );
}
