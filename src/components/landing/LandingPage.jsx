import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  XCircle, 
  ShieldCheck, 
  GraduationCap, 
  BrainCircuit, 
  TrendingUp, 
  Zap,
  Play
} from 'lucide-react';
import { Badge } from '../common/Badge';

export function LandingPage() {
  const { setCurrentTab, loadDemoProfile } = useProject();
  const { isDark } = useTheme();

  const workflowSteps = [
    { step: "01", title: "Student Profile", desc: "Skills, 8GB RAM specs, weeks & team size", icon: "🧑‍🎓" },
    { step: "02", title: "AI Analysis", desc: "8-dimension feasibility & AI necessity test", icon: "🔬" },
    { step: "03", title: "Project Battle", desc: "5 ideas compete — 1 clear winner chosen", icon: "⚔️" },
    { step: "04", title: "Professor Test", desc: "Strict viva examination & defense grading", icon: "🎓" },
    { step: "05", title: "AI Mentor", desc: "Scope guardian & daily priority roadmap", icon: "🧠" },
  ];

  const whyCards = [
    {
      title: "1. Hyper-Personalized",
      tagline: "Tailored to You, Not Random Ideas",
      desc: "Analyzes whether you have an 8GB laptop without GPU, 10 weeks, or a 3-person team. No impossible enterprise architecture.",
      icon: Sparkles,
      color: "text-brand-500 bg-brand-500/10 border-brand-500/30"
    },
    {
      title: "2. Feasibility First",
      tagline: "Know Before You Code",
      desc: "Calculates realistic AI-estimated completion probability across 8 dimensions including dataset availability and hardware limits.",
      icon: ShieldCheck,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30"
    },
    {
      title: "3. Novelty Radar",
      tagline: "Escape Generic Projects",
      desc: "Flags overdone projects (e.g. basic chatbots on CRUD portals) and generates research-grade innovation upgrades.",
      icon: TrendingUp,
      color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/30"
    },
    {
      title: "4. Professor Simulator",
      tagline: "Survive Tough Viva Panels",
      desc: "Simulates strict academic evaluators asking brutal defense questions. Scores technical answers before you face faculty.",
      icon: GraduationCap,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/30"
    },
    {
      title: "5. Proactive Mentor",
      tagline: "Keeps You on Schedule",
      desc: "Not a passive chatbot. Alerts you when behind schedule, manages scope creep, and prescribes today's priority task.",
      icon: BrainCircuit,
      color: "text-violet-500 bg-violet-500/10 border-violet-500/30"
    }
  ];

  return (
    <div className="relative overflow-hidden pb-20">
      
      {/* Background Glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] blur-[120px] rounded-full pointer-events-none -z-10"
        style={{ backgroundColor: isDark ? 'rgba(79, 70, 229, 0.15)' : 'rgba(99, 102, 241, 0.08)' }}
      />
      <div
        className="absolute top-1/3 right-10 w-[400px] h-[300px] blur-[100px] rounded-full pointer-events-none -z-10"
        style={{ backgroundColor: isDark ? 'rgba(6, 182, 212, 0.10)' : 'rgba(6, 182, 212, 0.06)' }}
      />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 text-center">
        
        {/* Top Tagline Pill */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 transition-all"
          style={{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : '#ffffff',
            border: isDark ? '1px solid rgba(51, 65, 85, 0.8)' : '1px solid #cbd5e1',
            boxShadow: isDark ? '0 0 15px -3px rgba(99,102,241,0.25)' : '0 1px 4px rgba(0,0,0,0.06)'
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span
            className="text-xs font-semibold"
            style={{ color: isDark ? '#cbd5e1' : '#334155' }}
          >
            Next-Gen AI Final-Year Project Decision Engine
          </span>
        </div>

        {/* Main Heading */}
        <h1
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] max-w-4xl mx-auto"
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
        >
          Build the <span className="gradient-text">RIGHT</span> Final-Year Project.
        </h1>

        {/* Subheading */}
        <p
          className="mt-6 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-normal"
          style={{ color: isDark ? '#cbd5e1' : '#334155' }}
        >
          ProjectPilot AI analyzes your skills, time, team, hardware, and career goals to find a project you can{' '}
          <strong className="font-bold" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>actually build</strong>,{' '}
          <strong className="font-bold" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>get approved</strong>, and{' '}
          <strong className="font-bold" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>finish on time</strong>.
        </p>

        {/* USP Highlight Quote */}
        <div
          className="mt-6 inline-block max-w-xl p-3.5 rounded-xl text-xs sm:text-sm italic transition-all"
          style={{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.7)' : 'rgba(241, 245, 249, 0.95)',
            border: isDark ? '1px solid #1e293b' : '1px solid #cbd5e1',
            color: isDark ? '#94a3b8' : '#334155',
            boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
          }}
        >
          “Existing tools generate random ideas. ProjectPilot AI decides which project is actually suitable for you.”
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setCurrentTab('profile')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-600 via-indigo-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 shadow-glow transition duration-300 flex items-center justify-center gap-2 group cursor-pointer text-white-forced"
            style={{ color: '#ffffff' }}
          >
            <span style={{ color: '#ffffff' }}>Find My Project</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: '#ffffff' }} />
          </button>

          <button
            onClick={loadDemoProfile}
            className="w-full sm:w-auto px-7 py-4 rounded-xl font-semibold text-sm transition duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-sm"
            style={{
              backgroundColor: isDark ? 'rgba(30, 41, 59, 0.9)' : '#ffffff',
              color: isDark ? '#e2e8f0' : '#0f172a',
              border: isDark ? '1px solid #334155' : '1px solid #cbd5e1',
            }}
          >
            <Play className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
            <span>Try 1-Click Demo Profile</span>
          </button>
        </div>

        {/* Metric Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {[
            { value: "8 Dimensions", label: "Feasibility Analyzer", color: isDark ? '#818cf8' : '#4f46e5' },
            { value: "1 Clear Winner", label: "Project Battle Arena", color: isDark ? '#34d399' : '#059669' },
            { value: "Viva Simulator", label: "Strict Professor AI", color: isDark ? '#fbbf24' : '#d97706' },
            { value: "Scope Guardian", label: "Scope Creep Defense", color: isDark ? '#22d3ee' : '#0891b2' },
          ].map((b, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl transition-all"
              style={{
                backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : '#ffffff',
                border: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <p className="text-2xl font-extrabold font-mono" style={{ color: b.color }}>{b.value}</p>
              <p className="text-xs mt-0.5" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>{b.label}</p>
            </div>
          ))}
        </div>

      </section>

      {/* Visual Workflow Pipeline Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-10">
          <Badge variant="brand" size="md">The Complete Student Journey</Badge>
          <h2
            className="text-2xl sm:text-3xl font-bold mt-3"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            From Capability to Completion
          </h2>
          <p className="text-sm mt-1" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
            A rigorous decision pipeline engineered for college major project success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {workflowSteps.map((item) => (
            <div 
              key={item.step} 
              className="rounded-2xl p-5 flex flex-col items-center text-center relative group transition duration-300"
              style={{
                backgroundColor: isDark ? 'rgba(15, 23, 42, 0.75)' : '#ffffff',
                border: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              <span className="text-3xl mb-3">{item.icon}</span>
              <span
                className="text-[10px] font-mono font-bold px-2 py-0.5 rounded mb-2"
                style={{
                  backgroundColor: isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.1)',
                  color: isDark ? '#a5b4fc' : '#4f46e5'
                }}
              >
                STEP {item.step}
              </span>
              <h3 className="text-sm font-bold" style={{ color: isDark ? '#e2e8f0' : '#0f172a' }}>{item.title}</h3>
              <p className="text-xs mt-1.5 leading-relaxed" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why ProjectPilot Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-12">
          <Badge variant="cyan" size="md">Core Differentiators</Badge>
          <h2
            className="text-2xl sm:text-4xl font-extrabold mt-3"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            Why ProjectPilot AI?
          </h2>
          <p className="text-sm mt-2" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
            Why generic ChatGPT prompts fail student projects and how we fix it
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyCards.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="rounded-2xl p-6 transition duration-300 flex flex-col"
                style={{
                  backgroundColor: isDark ? 'rgba(15, 23, 42, 0.75)' : '#ffffff',
                  border: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                  boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.04)'
                }}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${c.color} mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>{c.title}</h3>
                <p className="text-xs font-semibold mt-0.5" style={{ color: isDark ? '#818cf8' : '#4f46e5' }}>{c.tagline}</p>
                <p className="text-xs mt-2.5 leading-relaxed flex-1" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>{c.desc}</p>
              </div>
            );
          })}

          {/* Quick Demo Launch Card */}
          <div
            className="rounded-2xl p-6 flex flex-col justify-between"
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : '#ffffff',
              border: isDark ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid rgba(99, 102, 241, 0.3)',
              boxShadow: isDark ? 'none' : '0 4px 12px rgba(99, 102, 241, 0.08)'
            }}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 to-cyan-500 flex items-center justify-center text-white mb-4 shadow-glow-sm">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-bold" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>Live Hackathon Demo</h3>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: isDark ? '#cbd5e1' : '#64748b' }}>
                Experience the full end-to-end workflow with pre-configured student telemetry: 8GB RAM, 10 weeks, 3-person team.
              </p>
            </div>
            <button
              onClick={loadDemoProfile}
              className="mt-6 w-full py-3 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-glow transition cursor-pointer flex items-center justify-center gap-2"
              style={{ color: '#ffffff' }}
            >
              <span style={{ color: '#ffffff' }}>Launch Demo Experience</span>
              <ArrowRight className="w-3.5 h-3.5" style={{ color: '#ffffff' }} />
            </button>
          </div>
        </div>
      </section>

      {/* Comparison: Generic Generator vs ProjectPilot AI */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div
          className="rounded-3xl p-6 sm:p-8"
          style={{
            backgroundColor: isDark ? 'rgba(13, 20, 40, 0.92)' : '#ffffff',
            border: isDark ? '1px solid rgba(51, 65, 85, 0.7)' : '1px solid #e2e8f0',
            boxShadow: isDark ? 'none' : '0 4px 16px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
              The ProjectPilot Advantage
            </h3>
            <p className="text-xs mt-1" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
              Comparing traditional idea generators against our decision engine
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Generic Tool */}
            <div
              className="p-5 rounded-2xl space-y-3"
              style={{
                backgroundColor: isDark ? 'rgba(76, 5, 25, 0.15)' : 'rgba(254, 242, 242, 0.9)',
                border: isDark ? '1px solid rgba(136, 19, 55, 0.4)' : '1px solid #fecaca',
              }}
            >
              <div className="flex items-center gap-2 font-bold text-sm" style={{ color: isDark ? '#fb7185' : '#b91c1c' }}>
                <XCircle className="w-4 h-4" /> Traditional Project Generators
              </div>
              <ul className="space-y-2 text-xs" style={{ color: isDark ? '#94a3b8' : '#475569' }}>
                <li className="flex items-start gap-2">❌ Randomly dumps 50 generic titles</li>
                <li className="flex items-start gap-2">❌ Ignores your hardware (suggests heavy LLMs for 8GB RAM laptops)</li>
                <li className="flex items-start gap-2">❌ No idea if professors will reject it as overdone</li>
                <li className="flex items-start gap-2">❌ Disappears after generating a title list</li>
              </ul>
            </div>

            {/* ProjectPilot */}
            <div
              className="p-5 rounded-2xl space-y-3"
              style={{
                backgroundColor: isDark ? 'rgba(2, 44, 34, 0.2)' : 'rgba(240, 253, 244, 0.9)',
                border: isDark ? '1px solid rgba(6, 95, 70, 0.5)' : '1px solid #bbf7d0',
              }}
            >
              <div className="flex items-center gap-2 font-bold text-sm" style={{ color: isDark ? '#34d399' : '#15803d' }}>
                <CheckCircle className="w-4 h-4" /> ProjectPilot AI Decision Engine
              </div>
              <ul className="space-y-2 text-xs" style={{ color: isDark ? '#cbd5e1' : '#334155' }}>
                <li className="flex items-start gap-2">✅ Selects 1 clear winning project with trade-offs</li>
                <li className="flex items-start gap-2">✅ Validates against your RAM, GPU, team & deadline</li>
                <li className="flex items-start gap-2">✅ Professor Simulator tests defense answers</li>
                <li className="flex items-start gap-2">✅ Proactive AI mentor tracks sprints till completion</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
