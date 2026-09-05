import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Circle, 
  PlayCircle, 
  AlertCircle, 
  User, 
  ArrowRight
} from 'lucide-react';
import { Badge } from '../common/Badge';

export function DynamicRoadmap() {
  const { tasks, toggleTaskStatus, completedTasksCount, projectProgressPercentage, setCurrentTab } = useProject();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <Badge variant="emerald" size="xs"><CheckCircle2 className="w-3 h-3" /> Completed</Badge>;
      case 'In Progress':
        return <Badge variant="amber" size="xs"><PlayCircle className="w-3 h-3" /> In Progress</Badge>;
      case 'Blocked':
        return <Badge variant="rose" size="xs"><AlertCircle className="w-3 h-3" /> Blocked</Badge>;
      default:
        return <Badge variant="outline" size="xs"><Circle className="w-3 h-3" /> Not Started</Badge>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Calendar className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">10-Week Dynamic Sprint Roadmap</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Track weekly milestones from dataset acquisition to final viva examination.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="cyan" size="lg" className="font-mono text-sm">
            Progress: {completedTasksCount} / {tasks.length} Sprints ({projectProgressPercentage}%)
          </Badge>
          <button
            onClick={() => setCurrentTab('mentor')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-glow transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>AI Mentor Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress Bar Header */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-2">
        <div className="flex justify-between text-xs text-slate-300 font-semibold">
          <span>Overall Project Velocity</span>
          <span className="font-mono text-emerald-400">{projectProgressPercentage}% Completed</span>
        </div>
        <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
          <div 
            className="h-full bg-gradient-to-r from-brand-500 via-indigo-500 to-cyber-cyan transition-all duration-500 rounded-full"
            style={{ width: `${projectProgressPercentage}%` }}
          />
        </div>
        <p className="text-[11px] text-slate-400">
          💡 Click any task card below to cycle status: <em>Not Started → In Progress → Completed</em>.
        </p>
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        {tasks.map((task) => {
          const isDone = task.status === 'Completed';
          const isInProgress = task.status === 'In Progress';

          return (
            <div
              key={task.id}
              onClick={() => toggleTaskStatus(task.id)}
              className={`glass-card rounded-2xl p-5 border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group ${
                isDone 
                  ? 'bg-slate-900/40 border-slate-800/80 opacity-80' 
                  : (isInProgress ? 'bg-slate-900 border-amber-500/50 shadow-glow-sm' : 'hover:border-slate-700')
              }`}
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-mono font-bold shrink-0 border ${
                  isDone 
                    ? 'bg-emerald-950/20 text-emerald-400 border-emerald-800/40' 
                    : (isInProgress ? 'bg-amber-950/30 text-amber-300 border-amber-500/50' : 'bg-slate-800 text-slate-400 border-slate-700')
                }`}>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400">WK</span>
                  <span className="text-sm font-extrabold">{task.week}</span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className={`text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                      {task.title}
                    </h3>
                    <Badge variant="outline" size="xs">{task.category}</Badge>
                  </div>

                  <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-1 font-mono">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-500" /> ~{task.hours} hrs</span>
                    <span className="flex items-center gap-1"><User className="w-3 h-3 text-slate-500" /> {task.assignee}</span>
                  </div>
                </div>
              </div>

              <div className="self-end sm:self-auto shrink-0 flex items-center gap-3">
                {getStatusBadge(task.status)}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
