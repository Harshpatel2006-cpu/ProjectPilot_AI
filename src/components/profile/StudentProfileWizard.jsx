import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { 
  UserCheck, 
  GraduationCap, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Loader2, 
  Zap,
  Users,
  Clock,
  Cpu,
  Sparkles
} from 'lucide-react';

export function StudentProfileWizard() {
  const { profile, updateProfile, handleGenerateProjects, isGenerating, loadDemoProfile } = useProject();
  const [currentStep, setCurrentStep] = useState(1);

  const careerGoalOptions = [
    "AI/ML Engineer",
    "Software Developer",
    "Data Scientist",
    "Data Analyst",
    "Full-Stack Web Developer",
    "Mobile App Developer",
    "Cybersecurity Engineer",
    "Cloud & DevOps Engineer",
    "Academic Researcher",
    "Startup Founder / Entrepreneur"
  ];

  const domainOptions = [
    "Education / AI & Analytics",
    "Healthcare Informatics",
    "Automotive & Computer Vision",
    "IoT & Smart City Systems",
    "FinTech & Fraud Detection",
    "Cybersecurity & Threat Intelligence",
    "E-Commerce & Recommenders",
    "Environmental AI & Sustainability"
  ];

  const skillOptions = [
    { key: "programming", label: "Core Programming (Python / Java / C++)" },
    { key: "ai_ml", label: "AI & Machine Learning (Scikit / PyTorch)" },
    { key: "data_science", label: "Data Science & Analytics (Pandas / SQL)" },
    { key: "backend", label: "Backend API Engineering (FastAPI / Node)" },
    { key: "web_dev", label: "Frontend Web Dev (React / HTML / Tailwind)" },
    { key: "database", label: "Databases (PostgreSQL / MongoDB)" },
    { key: "cloud", label: "Cloud & Docker Containerization" },
    { key: "cybersecurity", label: "Cybersecurity & Cryptography" },
    { key: "mobile_dev", label: "Mobile Development (Flutter / React Native)" },
    { key: "iot", label: "IoT & Hardware Prototyping (Arduino / ESP32)" },
  ];

  const handleSkillChange = (key, level) => {
    updateProfile({
      skills: {
        ...profile.skills,
        [key]: level
      }
    });
  };

  const handleConstraintChange = (key, value) => {
    updateProfile({
      constraints: {
        ...profile.constraints,
        [key]: value
      }
    });
  };

  const handlePreferenceChange = (key, value) => {
    updateProfile({
      preferences: {
        ...profile.preferences,
        [key]: value
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-500/10 text-brand-400">
              <UserCheck className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">Student Capability Assessment</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Feed your real skills, RAM constraints, and goals so ProjectPilot AI finds your high-probability winner.
          </p>
        </div>

        <button
          onClick={loadDemoProfile}
          className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-brand-300 border border-slate-700 transition flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Zap className="w-3.5 h-3.5 text-brand-400" /> Autofill Demo Profile
        </button>
      </div>

      {/* Step Wizard Progress Indicator */}
      <div className="my-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-800 w-full -z-0" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-brand-500 transition-all duration-300 -z-0"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />

          {[
            { step: 1, label: "Academic" },
            { step: 2, label: "Skills Radar" },
            { step: 3, label: "Career & Domain" },
            { step: 4, label: "Hardware & Limits" },
          ].map((s) => (
            <button
              key={s.step}
              onClick={() => setCurrentStep(s.step)}
              className="flex flex-col items-center gap-1.5 relative z-10 cursor-pointer group"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-all duration-200 ${
                currentStep === s.step
                  ? 'bg-brand-600 text-white ring-4 ring-brand-500/20 shadow-glow-sm scale-110'
                  : (currentStep > s.step ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-900 text-slate-500 border border-slate-800')
              }`}>
                {currentStep > s.step ? <Check className="w-4 h-4" /> : s.step}
              </div>
              <span className={`text-[11px] font-medium hidden sm:block ${
                currentStep === s.step ? 'text-white font-semibold' : 'text-slate-400'
              }`}>
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Wizard Form Container */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl">
        
        {/* STEP 1: Academic Background */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-lg font-bold text-white">Academic Details</h2>
              <p className="text-xs text-slate-400">Specify your university program and project milestone tier</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={profile.name || ''}
                  onChange={(e) => updateProfile({ name: e.target.value })}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Course / Degree</label>
                <input
                  type="text"
                  value={profile.course || ''}
                  onChange={(e) => updateProfile({ course: e.target.value })}
                  placeholder="e.g. B.Tech Computer Science"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Department / Specialization</label>
                <input
                  type="text"
                  value={profile.department || ''}
                  onChange={(e) => updateProfile({ department: e.target.value })}
                  placeholder="e.g. Computer Science & Engineering (AI & ML)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project Tier</label>
                <select
                  value={profile.projectType || 'Final-Year Major Project'}
                  onChange={(e) => updateProfile({ projectType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-brand-500"
                >
                  <option value="Final-Year Major Project">Final-Year Major Project (Capstone)</option>
                  <option value="Mini Project (Pre-final)">Mini Project (Pre-final Year)</option>
                  <option value="Research Capstone Thesis">Research Capstone Thesis</option>
                  <option value="Hackathon Fast-Track Project">Hackathon Fast-Track Project</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Skills Assessment */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-lg font-bold text-white">Technical Skills Assessment</h2>
              <p className="text-xs text-slate-400">Be honest with your proficiency — this prevents impossible project suggestions</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillOptions.map((s) => {
                const currentLevel = profile.skills?.[s.key] || "Beginner";
                return (
                  <div key={s.key} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <span className="text-xs font-semibold text-slate-200 block truncate">{s.label}</span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => handleSkillChange(s.key, lvl)}
                          className={`py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                            currentLevel === lvl
                              ? (lvl === 'Advanced' ? 'bg-emerald-600 text-white font-bold' : (lvl === 'Intermediate' ? 'bg-brand-600 text-white font-bold' : 'bg-slate-700 text-white font-bold'))
                              : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Career Goals & Preferences */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-lg font-bold text-white">Career Target & Domain</h2>
              <p className="text-xs text-slate-400">We optimize project selection to maximize hiring impact on your target role</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Target Career Role</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {careerGoalOptions.map((role) => {
                    const isSelected = profile.preferences?.careerGoal === role;
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => handlePreferenceChange('careerGoal', role)}
                        className={`p-2.5 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-brand-500/20 border-brand-500 text-brand-200 font-bold shadow-glow-sm'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {role}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Preferred Application Domain</label>
                <select
                  value={profile.preferences?.preferredDomain || domainOptions[0]}
                  onChange={(e) => handlePreferenceChange('preferredDomain', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-brand-500"
                >
                  {domainOptions.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Academic Priority</label>
                <select
                  value={profile.academicPriority || 'Balanced (Resume + High Viva Marks)'}
                  onChange={(e) => updateProfile({ academicPriority: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-brand-500"
                >
                  <option value="Balanced (Resume + High Viva Marks)">Balanced (Resume Value + High Viva Marks)</option>
                  <option value="Easy to complete (Guaranteed Finish)">Easy to Complete (Guaranteed Finish on Time)</option>
                  <option value="Highly Innovative (Research / Hackathon)">Highly Innovative (Research / Conference Value)</option>
                  <option value="Maximum Viva Marks (Faculty Oriented)">Maximum Viva Marks (Strict Faculty Oriented)</option>
                  <option value="Startup / Production Ready">Startup / Production Ready Product</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Constraints & Hardware */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-lg font-bold text-white">Hardware & Timeline Constraints</h2>
              <p className="text-xs text-slate-400">Our Feasibility Engine will strictly filter out projects you cannot build on your rig</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Team Size */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-brand-400" /> Team Size
                  </span>
                  <span className="text-xs font-mono font-bold text-brand-400">
                    {profile.constraints?.teamSize || 3} Members
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={profile.constraints?.teamSize || 3}
                  onChange={(e) => handleConstraintChange('teamSize', parseInt(e.target.value))}
                  className="w-full accent-brand-500 cursor-pointer"
                />
              </div>

              {/* Weeks Available */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" /> Available Timeline
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {profile.constraints?.weeksAvailable || 10} Weeks
                  </span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="24"
                  value={profile.constraints?.weeksAvailable || 10}
                  onChange={(e) => handleConstraintChange('weeksAvailable', parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Laptop RAM */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyber-cyan" /> Laptop RAM
                </label>
                <select
                  value={profile.constraints?.ram || '8GB RAM'}
                  onChange={(e) => handleConstraintChange('ram', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200"
                >
                  <option value="4GB RAM">4GB RAM (Lightweight models only)</option>
                  <option value="8GB RAM">8GB RAM (Standard student laptop)</option>
                  <option value="16GB RAM">16GB RAM (Can run local medium models)</option>
                  <option value="32GB+ RAM">32GB+ RAM / Workstation</option>
                </select>
              </div>

              {/* GPU availability */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-200 block">Dedicated NVIDIA GPU?</span>
                  <span className="text-[10px] text-slate-400">Controls deep vision transformer feasibility</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleConstraintChange('hasGpu', !profile.constraints?.hasGpu)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    profile.constraints?.hasGpu 
                      ? 'bg-emerald-500 text-white shadow-glow-emerald' 
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {profile.constraints?.hasGpu ? "Yes (Dedicated VRAM)" : "No GPU (CPU Only)"}
                </button>
              </div>

              {/* Innovation Appetite Slider */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 sm:col-span-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Innovation Appetite
                  </span>
                  <span className="text-xs font-mono text-amber-300">
                    {profile.innovationPreference < 40 ? "Safe (Low Risk)" : (profile.innovationPreference < 75 ? "Balanced (Recommended)" : "Ambitious (Research Grade)")}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="95"
                  value={profile.innovationPreference || 65}
                  onChange={(e) => updateProfile({ innovationPreference: parseInt(e.target.value) })}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>Safe / Guaranteed Finish</span>
                  <span>Balanced</span>
                  <span>Cutting-Edge Research</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Wizard Footer Navigation */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          ) : <div />}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-glow transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isGenerating}
              onClick={() => handleGenerateProjects(profile)}
              className="px-7 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-brand-600 via-indigo-600 to-cyber-cyan hover:from-brand-500 hover:to-cyan-400 text-white shadow-glow transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Evaluating 5 Candidates & Deciding Winner...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate & Battle 5 Candidates</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
