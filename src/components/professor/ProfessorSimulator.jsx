import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { PROFESSOR_VIVA_QUESTIONS } from '../../services/mockData';
import { 
  GraduationCap, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  Loader2, 
  ArrowRight, 
  Zap, 
  RotateCcw,
  ArrowLeft
} from 'lucide-react';
import { Badge } from '../common/Badge';

export function ProfessorSimulator() {
  const { 
    activeProject, 
    vivaQuestionIndex, 
    setVivaQuestionIndex, 
    vivaAnswers, 
    vivaEvaluations, 
    evaluateAnswer, 
    isEvaluatingViva,
    setCurrentTab 
  } = useProject();

  const [currentInput, setCurrentInput] = useState('');

  const questions = PROFESSOR_VIVA_QUESTIONS;
  const activeQ = questions[vivaQuestionIndex] || questions[0];
  const currentEval = vivaEvaluations[activeQ.id];

  const handleFillSample = () => {
    setCurrentInput(activeQ.sampleAnswer);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentInput.trim()) return;
    evaluateAnswer(activeQ, currentInput);
  };

  // Compute overall acceptance score
  const evaluatedValues = Object.values(vivaEvaluations);
  const avgScore = evaluatedValues.length > 0 
    ? Math.round(evaluatedValues.reduce((acc, curr) => acc + curr.overallScore, 0) / evaluatedValues.length)
    : 84;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <GraduationCap className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">Professor Simulator & Viva Arena</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulating strict faculty evaluators asking critical defense questions before your university review.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="amber" size="lg" className="font-mono text-sm">
            Professor Acceptance: {avgScore}/100
          </Badge>
          <button
            onClick={() => setCurrentTab('plan')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-glow transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>Scope Guardian Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Question Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {questions.map((q, idx) => {
          const isDone = Boolean(vivaEvaluations[q.id]);
          const isActive = vivaQuestionIndex === idx;

          return (
            <button
              key={q.id}
              onClick={() => {
                setVivaQuestionIndex(idx);
                setCurrentInput(vivaAnswers[q.id] || '');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-brand-600 text-white shadow-glow-sm'
                  : (isDone ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/60' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700')
              }`}
            >
              <span>Q{idx + 1}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          );
        })}
      </div>

      {/* Main Examination Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        
        {/* Question Prompt from Professor */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-amber-950/20 border border-amber-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" /> Senior Faculty Evaluator asks:
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              Question {vivaQuestionIndex + 1} of {questions.length}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            "{activeQ.question}"
          </h3>

          <div className="flex flex-wrap gap-2 pt-1">
            <span className="text-[10px] text-slate-400 font-semibold">Evaluation Criteria:</span>
            {activeQ.criteria.map((c, i) => (
              <Badge key={i} variant="outline" size="xs">{c}</Badge>
            ))}
          </div>
        </div>

        {/* Student Answer Input Box */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-slate-300">
              Your Defense Answer
            </label>
            <button
              type="button"
              onClick={handleFillSample}
              className="text-xs text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1 cursor-pointer"
            >
              <Zap className="w-3 h-3" /> Fill Benchmark Answer
            </button>
          </div>

          <textarea
            rows={4}
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder="Type your technical defense or click 'Fill Benchmark Answer'..."
            className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {vivaQuestionIndex > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setVivaQuestionIndex(prev => prev - 1);
                    setCurrentInput(vivaAnswers[questions[vivaQuestionIndex - 1].id] || '');
                  }}
                  className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:bg-slate-800 transition flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isEvaluatingViva || !currentInput.trim()}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-glow transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isEvaluatingViva ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Professor Analyzing Defense...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Answer for Evaluation</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Professor Evaluation Verdict Box */}
        {currentEval && (
          <div className="p-6 rounded-2xl bg-slate-900/95 border border-brand-500/40 space-y-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Badge variant={currentEval.overallScore >= 80 ? 'emerald' : 'amber'} size="sm">
                  {currentEval.verdict}
                </Badge>
                <span className="text-xs font-mono text-slate-400">
                  Score: <strong className="text-white">{currentEval.overallScore}/100</strong>
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span>Technical Depth: <strong className="text-brand-400">{currentEval.technicalScore}%</strong></span>
                <span>Clarity: <strong className="text-cyan-400">{currentEval.clarityScore}%</strong></span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
              “{currentEval.feedback}”
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/30 text-xs">
                <span className="text-emerald-400 font-bold block mb-1">🟢 What You Did Well:</span>
                <ul className="space-y-1 text-slate-300">
                  {currentEval.strengths?.map((s, i) => (
                    <li key={i}>• {s}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30 text-xs">
                <span className="text-amber-400 font-bold block mb-1">🟡 Where Faculty Will Push You:</span>
                <ul className="space-y-1 text-slate-300">
                  {currentEval.improvements?.map((imp, i) => (
                    <li key={i}>• {imp}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Follow Up Trap */}
            {currentEval.followUpTrap && (
              <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs text-rose-300">
                <strong className="text-rose-400 block mb-0.5">⚠️ Examiner Follow-Up Trap:</strong>
                "{currentEval.followUpTrap}"
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
