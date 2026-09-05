import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { 
  Sparkles, 
  ShieldCheck, 
  Flame, 
  Check, 
  ArrowRight, 
  Zap
} from 'lucide-react';
import { Badge } from '../common/Badge';

export function InnovationTransformer() {
  const { innovationLevels, activeProject, applyInnovationTier, setCurrentTab } = useProject();
  const [selectedTier, setSelectedTier] = useState('balanced');
  const [appliedNotification, setAppliedNotification] = useState(false);

  const handleApply = (tierKey) => {
    applyInnovationTier(tierKey);
    setSelectedTier(tierKey);
    setAppliedNotification(true);
    setTimeout(() => setAppliedNotification(false), 2000);
  };

  const tiers = [
    {
      key: 'safe',
      icon: ShieldCheck,
      badgeVariant: 'emerald',
      data: innovationLevels.safe
    },
    {
      key: 'balanced',
      icon: Sparkles,
      badgeVariant: 'brand',
      recommended: true,
      data: innovationLevels.balanced
    },
    {
      key: 'ambitious',
      icon: Flame,
      badgeVariant: 'violet',
      data: innovationLevels.ambitious
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">Innovation Transformer</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Choose your risk-reward level to automatically upgrade your project features, architecture, and viva appeal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {appliedNotification && (
            <Badge variant="emerald" size="sm" className="animate-bounce">
              <Check className="w-3.5 h-3.5" /> Project DNA Updated!
            </Badge>
          )}
          <button
            onClick={() => setCurrentTab('professor')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-glow transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>Test in Professor Simulator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Active Project Title Pill */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Currently Active Project:</span>
          <span className="text-xs font-bold text-white">{activeProject?.title}</span>
        </div>
        <Badge variant="brand" size="xs">
          Innovation: {activeProject?.scores?.innovation || 82}%
        </Badge>
      </div>

      {/* 3 Tier Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {tiers.map((tier) => {
          const Icon = tier.icon;
          const isSelected = selectedTier === tier.key;

          return (
            <div
              key={tier.key}
              className={`glass-card rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between relative ${
                tier.recommended 
                  ? 'border-brand-500/80 bg-gradient-to-b from-brand-950/40 via-slate-900 to-slate-950 shadow-glow' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {tier.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="amber" size="xs" className="font-bold uppercase tracking-wider shadow-sm">
                    ⭐ Recommended Sweet Spot
                  </Badge>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-slate-800 text-brand-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{tier.data.level}</h3>
                      <span className="text-[10px] text-slate-400 font-mono">Complexity: {tier.data.complexity}</span>
                    </div>
                  </div>
                  <Badge variant={tier.badgeVariant} size="xs">
                    {tier.key.toUpperCase()}
                  </Badge>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-200">
                  {tier.data.title}
                </div>

                {/* Features List */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Key Features Added:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {tier.data.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Viva Impact Note */}
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400">
                  <strong className="text-brand-300 block mb-0.5">Faculty Evaluation Impact:</strong>
                  {tier.data.vivaImpact}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  onClick={() => handleApply(tier.key)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-glow-emerald'
                      : 'bg-slate-800 text-slate-200 hover:bg-brand-600 hover:text-white'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{isSelected ? "Applied to Active Project" : `Apply ${tier.data.level.split(' ')[0]} Upgrade`}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
