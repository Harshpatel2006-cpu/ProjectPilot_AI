import React from 'react';

export function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  const base = "inline-flex items-center gap-1.5 font-medium rounded-full transition-colors";
  
  const sizeStyles = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-sm font-semibold"
  };

  const variants = {
    default: "bg-slate-800 text-slate-300 border border-slate-700",
    brand: "bg-brand-500/15 text-brand-300 border border-brand-500/30",
    emerald: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
    amber: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
    rose: "bg-rose-500/15 text-rose-300 border border-rose-500/30",
    cyan: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30",
    violet: "bg-violet-500/15 text-violet-300 border border-violet-500/30",
    outline: "bg-transparent text-slate-400 border border-slate-700",
    slate: "bg-slate-700/50 text-slate-400 border border-slate-600/50",
    glow: "bg-brand-600 text-white shadow-glow"
  };

  return (
    <span className={`${base} ${sizeStyles[size]} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
}
