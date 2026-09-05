import React, { useState, useEffect } from 'react';
import { useProject } from '../../context/ProjectContext';
import { X, Key, ShieldCheck, CheckCircle2, Zap, Server, Globe, AlertTriangle, RefreshCw } from 'lucide-react';
import { Badge } from '../common/Badge';
import { storageService } from '../../services/storageService';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export function SettingsModal() {
  const { activeModal, setActiveModal, settings, setSettings, resetAll } = useProject();
  const [apiKeyInput, setApiKeyInput] = useState(settings.apiKey || '');
  const [modelSelect, setModelSelect] = useState(settings.model || 'gemini-1.5-flash');
  const [isSaved, setIsSaved] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking'); // 'online' | 'offline' | 'checking'
  const [activeTab, setActiveTab] = useState('settings'); // 'settings' | 'data'
  const [exportData, setExportData] = useState('');

  // Load data when tab changes to data
  useEffect(() => {
    if (activeTab === 'data') {
      const allData = {};
      Object.values(storageService.keys).forEach(key => {
        allData[key] = storageService.get(key);
      });
      setExportData(JSON.stringify(allData, null, 2));
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeModal !== 'settings') return;
    setBackendStatus('checking');
    fetch(`${BACKEND_URL}/api/health`, { signal: AbortSignal.timeout(3000) })
      .then(r => r.ok ? setBackendStatus('online') : setBackendStatus('offline'))
      .catch(() => setBackendStatus('offline'));
  }, [activeModal]);

  if (activeModal !== 'settings') return null;

  const detectedProvider = apiKeyInput.startsWith('sk-') ? 'openai' : (apiKeyInput.length > 10 ? 'gemini' : null);

  const handleSave = (e) => {
    e.preventDefault();
    setSettings(prev => ({
      ...prev,
      apiKey: apiKeyInput.trim(),
      model: modelSelect
    }));
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setActiveModal(null);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel rounded-2xl p-6 border border-slate-700 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-500/20 text-brand-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AI & System Settings</h3>
              <p className="text-xs text-slate-400">Configure LLM provider, API key, and backend</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700 mr-2">
              <button 
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition ${activeTab === 'settings' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Config
              </button>
              <button 
                onClick={() => setActiveTab('data')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition ${activeTab === 'data' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Data
              </button>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {activeTab === 'settings' ? (
          <>
            {/* Backend Status */}
        <div className="mt-4 px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <Server className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-300 font-medium">Backend Server</span>
            <span className="text-slate-500 font-mono text-[11px]">{BACKEND_URL}</span>
          </div>
          {backendStatus === 'checking' && (
            <span className="text-xs text-slate-400 animate-pulse">Checking...</span>
          )}
          {backendStatus === 'online' && (
            <Badge variant="emerald" size="xs"><CheckCircle2 className="w-3 h-3" /> Online</Badge>
          )}
          {backendStatus === 'offline' && (
            <Badge variant="amber" size="xs"><AlertTriangle className="w-3 h-3" /> Offline</Badge>
          )}
        </div>
        {backendStatus === 'offline' && (
          <p className="text-[11px] text-amber-400/80 mt-1.5 px-1">
            ⚡ Backend offline — run <code className="font-mono bg-slate-800 px-1 rounded">npm run server</code> to enable server-side AI proxy. App still works with direct browser API calls.
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSave} className="mt-4 space-y-4">

          {/* API Key */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              AI API Key <span className="text-slate-500 font-normal">(Optional — works without one)</span>
            </label>
            <div className="relative">
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="AIza... (Gemini) or sk-proj-... (OpenAI)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 font-mono"
              />
              {detectedProvider && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Badge variant={detectedProvider === 'gemini' ? 'brand' : 'emerald'} size="xs">
                    {detectedProvider === 'gemini' ? '✦ Gemini' : '⬡ OpenAI'}
                  </Badge>
                </div>
              )}
            </div>
            <div className="mt-2 flex flex-col gap-1">
              <p className="text-[11px] text-slate-400 flex items-start gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>No key needed — the app has a full offline heuristic engine. Keys enable live, personalized AI responses.</span>
              </p>
              <p className="text-[11px] text-brand-300/80 flex items-start gap-1.5">
                <Globe className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>
                  Get a free Gemini key at{' '}
                  <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="underline hover:text-brand-200">
                    aistudio.google.com
                  </a>
                </span>
              </p>
            </div>
          </div>

          {/* Model */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">AI Reasoning Model</label>
            <select
              value={modelSelect}
              onChange={(e) => setModelSelect(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-200 focus:outline-none focus:border-brand-500 font-sans"
            >
              <optgroup label="Google Gemini (Recommended)">
                <option value="gemini-1.5-flash">Gemini 1.5 Flash — Fast &amp; Free</option>
                <option value="gemini-1.5-pro">Gemini 1.5 Pro — High Reasoning</option>
              </optgroup>
              <optgroup label="OpenAI">
                <option value="gpt-4o-mini">GPT-4o Mini — Fast &amp; Cost Efficient</option>
                <option value="gpt-4o">GPT-4o — High Reasoning</option>
              </optgroup>
            </select>
          </div>

          {/* Status Panel */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">AI Engine Status</div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-brand-400" /> Live AI Mode</span>
              <Badge variant={detectedProvider ? 'brand' : 'slate'} size="xs">
                {detectedProvider ? `${detectedProvider === 'gemini' ? 'Gemini' : 'OpenAI'} Ready` : 'Not Configured'}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5"><Server className="w-3.5 h-3.5 text-emerald-400" /> Backend Proxy</span>
              <Badge variant={backendStatus === 'online' ? 'emerald' : 'amber'} size="xs">
                {backendStatus === 'online' ? 'Online' : 'Offline'}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> Offline Fallback</span>
              <Badge variant="emerald" size="xs"><CheckCircle2 className="w-3 h-3" /> Always Active</Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 flex items-center justify-between border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset all saved projects and profile data to original demo state?')) {
                  resetAll();
                  setActiveModal(null);
                }
              }}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Local State
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-glow transition cursor-pointer flex items-center gap-1.5"
              >
                {isSaved ? (
                  <><CheckCircle2 className="w-4 h-4 text-emerald-300" /> Saved!</>
                ) : (
                  'Save Settings'
                )}
              </button>
            </div>
          </div>

        </form>
        </>
        ) : (
          <div className="mt-4 space-y-4">
            <p className="text-xs text-slate-400">
              ProjectPilot AI stores all student profiles, generated projects, and mentor chat history locally in your browser to respect your privacy.
            </p>
            <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
              <div className="bg-slate-800/80 px-3 py-2 border-b border-slate-700 flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase">localStorage State</span>
              </div>
              <div className="p-3 max-h-64 overflow-y-auto">
                <pre className="text-[10px] text-emerald-400 font-mono whitespace-pre-wrap">
                  {exportData}
                </pre>
              </div>
            </div>
            <div className="pt-3 flex items-center justify-between border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset all saved projects and profile data? This cannot be undone.')) {
                    resetAll();
                    setActiveModal(null);
                  }
                }}
                className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Clear All Data
              </button>
              
              <button
                type="button"
                onClick={() => {
                  const blob = new Blob([exportData], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'projectpilot_data_export.json';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600 text-white shadow-sm transition cursor-pointer flex items-center gap-1.5"
              >
                Download JSON
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
