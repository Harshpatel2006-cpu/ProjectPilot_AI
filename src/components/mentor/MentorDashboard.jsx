import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { 
  BrainCircuit, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Play, 
  MessageSquare, 
  Zap,
  Activity,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { MentorChat } from './MentorChat';

export function MentorDashboard() {
  const { 
    profile, 
    activeProject, 
    tasks, 
    completedTasksCount, 
    projectProgressPercentage, 
    mentorAlerts, 
    hasScopeCreepRisk,
    setCurrentTab 
  } = useProject();

  const overallHealth = hasScopeCreepRisk ? 68 : 84;
  const healthStatus = hasScopeCreepRisk ? "At Risk (Scope Creep)" : "Healthy (On Track)";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Greeting & Health Score Hero Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-gradient-to-r from-brand-950/40 via-slate-900 to-slate-950 shadow-glow relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-semibold text-emerald-400">Proactive Mentor Active</span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-400">Semester 8 Major Project</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Good morning, {profile.name?.split(' ')[0] || 'Aarav'} 👋
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Your project <strong className="text-white font-semibold">"{activeProject?.title}"</strong> is currently <strong className="text-emerald-400 font-semibold">{projectProgressPercentage}% completed</strong>. Sprint pace is well-matched to your 10-week submission date.
            </p>
          </div>

          {/* Health Score Pill */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-4 shrink-0 shadow-lg">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-extrabold text-2xl border ${
              overallHealth >= 80 
                ? 'bg-emerald-950/30 text-emerald-400 border-emerald-500/50' 
                : 'bg-amber-950/30 text-amber-400 border-amber-500/50'
            }`}>
              {overallHealth}
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Project Health Score</span>
              <span className={`text-sm font-bold ${overallHealth >= 80 ? 'text-emerald-300' : 'text-amber-300'}`}>
                {healthStatus}
              </span>
              <span className="text-[10px] text-slate-500 block font-mono">100 Max Score</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Score Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Feasibility</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-400 font-mono">
            {activeProject?.scores?.feasibility || 91}%
          </p>
          <p className="text-[11px] text-slate-500">8GB RAM & CPU safe</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Innovation</span>
            <Sparkles className="w-4 h-4 text-brand-400" />
          </div>
          <p className="text-2xl font-extrabold text-brand-400 font-mono">
            {activeProject?.scores?.innovation || 82}%
          </p>
          <p className="text-[11px] text-slate-500">Explainable AI Attributions</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Viva Acceptance</span>
            <GraduationCap className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-amber-400 font-mono">
            {activeProject?.scores?.vivaPotential || 84}%
          </p>
          <p className="text-[11px] text-slate-500">Strict examiner defense</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Win Probability</span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-extrabold text-cyber-cyan font-mono">
            {activeProject?.completionProbability || 87}%
          </p>
          <p className="text-[11px] text-slate-500">AI-estimated completion</p>
        </div>
      </div>

      {/* Today's Priority Task Spotlight Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-950/30 to-indigo-950/30 border border-brand-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge variant="amber" size="xs" className="font-bold uppercase tracking-wider">
              🔥 Today's Priority Sprint
            </Badge>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" /> Est: 2 Hours
            </span>
          </div>

          <h3 className="text-base font-bold text-white">
            Finalize SHAP TreeExplainer Model Evaluation & Feature Attribution
          </h3>

          <p className="text-xs text-slate-300">
            Export the top-5 feature weights JSON to unblock the React dashboard risk plot.
          </p>
        </div>

        <button
          onClick={() => setCurrentTab('roadmap')}
          className="px-6 py-3 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-glow transition flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Start Task in Roadmap</span>
        </button>
      </div>

      {/* Main Grid: Proactive Alerts + Risk Monitor + Mentor Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Proactive Alerts & Risk Monitor */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Alerts Feed */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-brand-400" /> Proactive Mentor Feed
              </h3>
              <Badge variant="outline" size="xs">{mentorAlerts.length} Alerts</Badge>
            </div>

            <div className="space-y-3">
              {mentorAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      {alert.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                      {alert.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      {alert.type === 'tip' && <Sparkles className="w-3.5 h-3.5 text-cyan-400" />}
                      {alert.type === 'academic' && <GraduationCap className="w-3.5 h-3.5 text-violet-400" />}
                      {alert.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{alert.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {alert.message}
                  </p>

                  <button
                    onClick={() => setCurrentTab(alert.actionTab)}
                    className="text-[11px] font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1 cursor-pointer pt-1"
                  >
                    <span>{alert.actionText}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Monitor Box */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Continuous Risk Monitor
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[11px] block">Time Risk</span>
                <span className="text-emerald-400 font-bold">Low (On Schedule)</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[11px] block">Scope Risk</span>
                <span className={`font-bold ${hasScopeCreepRisk ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {hasScopeCreepRisk ? 'Critical (10+ Modules)' : 'Low (Protected)'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[11px] block">Technical Risk</span>
                <span className="text-emerald-400 font-bold">Low (XGBoost Proven)</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[11px] block">Hardware Risk</span>
                <span className="text-emerald-400 font-bold">Safe (CPU Only)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Embedded Mentor Chat */}
        <div className="lg:col-span-6">
          <MentorChat />
        </div>

      </div>

    </div>
  );
}
