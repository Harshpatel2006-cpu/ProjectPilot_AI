import React, { useState, useRef, useEffect } from 'react';
import { useProject } from '../../context/ProjectContext';
import { 
  BrainCircuit, 
  Send, 
  User, 
  Bot, 
  Zap, 
  MessageSquare,
  Clock
} from 'lucide-react';
import { Badge } from '../common/Badge';

export function MentorChat() {
  const { chatMessages, sendMentorMessage, activeProject, profile } = useProject();
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "What should I build today?",
    "Why am I behind schedule?",
    "Simplify my project scope",
    "Prepare me for professor viva",
    "Explain my AI model architecture",
    "How to get maximum marks?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!inputText.trim() || isSending) return;
    const msg = inputText;
    setInputText('');
    setIsSending(true);
    await sendMentorMessage(msg);
    setIsSending(false);
  };

  const handleQuickClick = async (prompt) => {
    if (isSending) return;
    setIsSending(true);
    await sendMentorMessage(prompt);
    setIsSending(false);
  };

  return (
    <div className="glass-panel rounded-3xl border border-slate-800 flex flex-col h-[650px] shadow-2xl overflow-hidden">
      
      {/* Chat Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-cyber-cyan flex items-center justify-center text-white shadow-glow-sm">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Proactive AI Project Mentor</h3>
              <Badge variant="emerald" size="xs">Live Telemetry</Badge>
            </div>
            <p className="text-[11px] text-slate-400">Context Loaded: {activeProject?.title}</p>
          </div>
        </div>

        <span className="text-[10px] font-mono text-slate-500 hidden sm:block">
          Student: {profile.name}
        </span>
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto">
        <span className="text-[10px] text-slate-500 font-bold uppercase shrink-0 flex items-center gap-1">
          <Zap className="w-3 h-3 text-amber-400" /> Prompts:
        </span>
        {quickPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleQuickClick(p)}
            disabled={isSending}
            className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:border-brand-500 transition whitespace-nowrap cursor-pointer disabled:opacity-50"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Messages List */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
        {chatMessages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                isUser 
                  ? 'bg-slate-800 text-slate-300 border border-slate-700' 
                  : 'bg-brand-600 text-white shadow-glow-sm'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[82%] sm:max-w-md p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-1.5 ${
                isUser
                  ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white rounded-tr-none'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}>
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div className={`text-[9px] font-mono flex items-center gap-1 justify-end ${
                  isUser ? 'text-indigo-200' : 'text-slate-500'
                }`}>
                  <Clock className="w-2.5 h-2.5" />
                  <span>{msg.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}

        {isSending && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-white animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping"></span>
              <span>Mentor analyzing sprint metrics & formulating guidance...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 sm:p-4 border-t border-slate-800 bg-slate-900/90 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask your mentor anything about code, viva, roadmap, or scope..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
        />
        <button
          type="submit"
          disabled={isSending || !inputText.trim()}
          className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-glow transition cursor-pointer disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
