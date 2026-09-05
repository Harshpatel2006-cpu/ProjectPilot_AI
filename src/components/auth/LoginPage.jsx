import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Compass, Mail, Lock, User, Eye, EyeOff,
  ArrowRight, Sun, Moon, AlertCircle, Loader2,
  Sparkles, CheckCircle2
} from 'lucide-react';

export function LoginPage() {
  const { signIn, signUp } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [mode, setMode]             = useState('login'); // 'login' | 'signup'
  const [name, setName]             = useState('');
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [showPass, setShowPass]     = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [success, setSuccess]       = useState('');

  const bg      = isDark ? '#090d16' : '#f1f5fb';
  const card    = isDark ? 'rgba(13,20,40,0.9)'  : 'rgba(255,255,255,0.96)';
  const border  = isDark ? 'rgba(51,65,85,0.7)'  : 'rgba(203,213,225,0.6)';
  const primary = isDark ? '#e2e8f0' : '#0f172a';
  const muted   = isDark ? '#94a3b8' : '#64748b';
  const inputBg = isDark ? '#0f172a' : '#ffffff';
  const inputBo = isDark ? '#334155' : '#cbd5e1';
  const inputTx = isDark ? '#e2e8f0' : '#1e293b';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error: err } = await signIn(email, password);
        if (err) setError(err.message);
      } else {
        if (!name.trim()) { setError('Please enter your full name.'); setLoading(false); return; }
        if (password.length < 6) { setError('Password must be at least 6 characters.'); setLoading(false); return; }
        const { error: err } = await signUp(email, password, name);
        if (err) setError(err.message);
        else setSuccess('Account created! Check your email to confirm, then log in.');
      }
    } catch (e) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: '🎯', text: 'AI-powered project decision engine' },
    { icon: '⚔️', text: 'Project Battle — 5 candidates ranked' },
    { icon: '🎓', text: 'Professor Viva Simulator' },
    { icon: '🗓️', text: '10-Week Dynamic Roadmap' },
    { icon: '🤖', text: 'Proactive AI Mentor Chat' },
  ];

  return (
    <div
      className="min-h-screen flex overflow-hidden"
      style={{ backgroundColor: bg, color: primary }}
    >
      {/* ── Left Panel: Branding ──────────────────────────────── */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #0f172a 60%, #090d16 100%)' }}
      >
        {/* Decorative orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', transform: 'translate(-40%, -40%)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)', transform: 'translate(40%, 40%)' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #c084fc 0%, transparent 70%)', transform: 'translate(-50%, -50%)' }} />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center shadow-glow">
              <Compass className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">ProjectPilot</span>
                <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">AI</span>
              </div>
              <p className="text-xs text-slate-400">Final-Year Project Decision Engine</p>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="relative z-10 space-y-6">
          <div>
            <h1 className="text-4xl font-extrabold text-white leading-tight mb-3">
              Don't just generate a project.
              <span className="block shimmer-text mt-1">Find the one you can build.</span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              The AI-powered platform that matches your skills, hardware, and timeline to the perfect final-year project — then mentors you to completion.
            </p>
          </div>

          {/* Feature list */}
          <ul className="space-y-3">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                <span className="text-base">{f.icon}</span>
                <span>{f.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom badge */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs text-indigo-300">
            <Sparkles className="w-3.5 h-3.5" />
            Built for Hackathon 2026 · Free to use
          </div>
        </div>
      </div>

      {/* ── Right Panel: Auth Form ────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="absolute top-6 right-6 p-2.5 rounded-xl border cursor-pointer transition-all"
          style={{
            backgroundColor: isDark ? 'rgba(30,41,59,0.8)' : 'rgba(241,245,249,0.9)',
            borderColor: isDark ? '#334155' : '#e2e8f0',
            color: isDark ? '#94a3b8' : '#64748b',
          }}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold" style={{ color: primary }}>ProjectPilot <span className="text-indigo-500">AI</span></span>
        </div>

        {/* Card */}
        <div
          className="w-full max-w-md rounded-3xl p-8 shadow-2xl animate-slide-up"
          style={{ backgroundColor: card, border: `1px solid ${border}`, backdropFilter: 'blur(16px)' }}
        >
          {/* Card Header */}
          <div className="mb-7">
            <h2 className="text-2xl font-bold mb-1" style={{ color: primary }}>
              {mode === 'login' ? 'Welcome back 👋' : 'Create your account ✨'}
            </h2>
            <p className="text-sm" style={{ color: muted }}>
              {mode === 'login'
                ? 'Sign in to continue to your project dashboard.'
                : 'Join ProjectPilot AI and start finding your perfect project.'}
            </p>
          </div>

          {/* Error / Success Banners */}
          {error && (
            <div className="mb-5 flex items-start gap-2.5 p-3.5 rounded-xl text-sm"
              style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171' }}>
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="mb-5 flex items-start gap-2.5 p-3.5 rounded-xl text-sm"
              style={{ backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', color: '#34d399' }}>
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name (signup only) */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: muted }}>Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: muted }} />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Aarav Sharma"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    style={{ backgroundColor: inputBg, border: `1.5px solid ${inputBo}`, color: inputTx }}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: muted }}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: muted }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@university.edu"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  style={{ backgroundColor: inputBg, border: `1.5px solid ${inputBo}`, color: inputTx }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: muted }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: muted }} />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? 'Min. 6 characters' : '••••••••'}
                  required
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  style={{ backgroundColor: inputBg, border: `1.5px solid ${inputBo}`, color: inputTx }}
                />
                <button type="button" onClick={() => setShowPass(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 cursor-pointer"
                  style={{ color: muted }}>
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm cursor-pointer transition-all mt-2"
              style={{
                background: loading ? '#4338ca' : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                color: '#ffffff',
                boxShadow: '0 4px 20px -4px rgba(99,102,241,0.6)',
                opacity: loading ? 0.8 : 1,
              }}
            >
              {loading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Please wait...</>
                : <>{mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight className="w-4 h-4" /></>
              }
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px" style={{ backgroundColor: border }} />
            <span className="text-xs" style={{ color: muted }}>
              {mode === 'login' ? 'New to ProjectPilot?' : 'Already have an account?'}
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: border }} />
          </div>

          {/* Mode Switch */}
          <button
            type="button"
            onClick={() => { setMode(m => m === 'login' ? 'signup' : 'login'); setError(''); setSuccess(''); }}
            className="w-full py-2.5 rounded-xl text-sm font-semibold border cursor-pointer transition-all"
            style={{
              borderColor: '#4f46e5',
              color: '#6366f1',
              backgroundColor: isDark ? 'rgba(79,70,229,0.08)' : 'rgba(99,102,241,0.06)',
            }}
          >
            {mode === 'login' ? 'Create a free account →' : '← Back to Sign In'}
          </button>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-xs text-center" style={{ color: muted }}>
          By continuing, you agree to our Terms of Service. All data is stored securely in Supabase.
        </p>
      </div>
    </div>
  );
}
