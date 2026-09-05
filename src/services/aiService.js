import {
  SAMPLE_PROJECTS,
  FEASIBILITY_DIMENSIONS,
  NOVELTY_ANALYSIS,
  AI_NECESSITY_EVALUATION,
  INNOVATION_TRANSFORMER_LEVELS,
  PROFESSOR_VIVA_QUESTIONS
} from './mockData';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

// ─── Utility: try backend first ───────────────────────────────────────────────
async function tryBackend(endpoint, body) {
  try {
    const res = await fetch(`${BACKEND_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) return data;
    }
  } catch (_err) {
    // Backend not running or timed out — fall through to direct call
  }
  return null;
}

// ─── Utility: call Gemini directly from browser ───────────────────────────────
async function callGeminiBrowser(prompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.7, maxOutputTokens: 4096 }
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`Gemini ${res.status}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

// ─── Utility: call OpenAI directly from browser ───────────────────────────────
async function callOpenAIBrowser(prompt, apiKey, model = 'gpt-4o-mini') {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model, messages: [{ role: 'user', content: prompt }], temperature: 0.7 })
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

// ─── Utility: safe JSON parse from LLM output ────────────────────────────────
function extractJSON(text) {
  const cleaned = text
    .replace(/^```json\s*/im, '')
    .replace(/^```\s*/im, '')
    .replace(/```\s*$/m, '')
    .trim();
  return JSON.parse(cleaned);
}

// ─── Determine provider ───────────────────────────────────────────────────────
function getProvider(apiKey) {
  if (!apiKey || apiKey.trim().length < 10) return null;
  if (apiKey.startsWith('sk-')) return 'openai';
  return 'gemini'; // Google AI Studio / Gemini keys
}

export const aiService = {
  /**
   * Generates 5 candidate projects based on student profile.
   * Flow: Backend → Direct LLM → Intelligent mock fallback
   */
  async generateProjects(profile, options = {}) {
    const { apiKey, model = 'gpt-4o-mini' } = options;
    const provider = getProvider(apiKey);

    // 1. Try backend
    const backendResult = await tryBackend('/api/generate-projects', {
      profile, apiKey, provider: provider || 'gemini', model
    });
    if (backendResult?.projects?.length >= 3) return backendResult.projects;

    // 2. Try direct LLM call
    if (provider) {
      try {
        const prompt = buildProjectGenerationPrompt(profile);
        let raw = '';
        if (provider === 'gemini') {
          raw = await callGeminiBrowser(prompt, apiKey);
        } else {
          raw = await callOpenAIBrowser(prompt, apiKey, model);
        }
        const parsed = extractJSON(raw);
        if (Array.isArray(parsed) && parsed.length >= 3) return parsed;
      } catch (err) {
        console.warn('Direct LLM call failed, using mock engine:', err.message);
      }
    }

    // 3. Intelligent mock engine fallback
    return generateMockProjects(profile);
  },

  /**
   * Evaluates a student's answer in the Professor Simulator.
   */
  async evaluateProfessorAnswer(question, studentAnswer, project, options = {}) {
    const { apiKey } = options;
    const provider = getProvider(apiKey);

    // 1. Try backend
    const backendResult = await tryBackend('/api/evaluate-viva', {
      question, studentAnswer, project, apiKey, provider: provider || 'gemini'
    });
    if (backendResult?.evaluation) return backendResult.evaluation;

    // 2. Try direct LLM
    if (provider) {
      try {
        const prompt = buildVivaEvalPrompt(question, studentAnswer, project);
        let raw = '';
        if (provider === 'gemini') {
          raw = await callGeminiBrowser(prompt, apiKey);
        } else {
          raw = await callOpenAIBrowser(prompt, apiKey);
        }
        return extractJSON(raw);
      } catch (err) {
        console.warn('Viva evaluation LLM failed, using mock:', err.message);
      }
    }

    // 3. Intelligent scoring fallback
    return evaluateMock(studentAnswer);
  },

  /**
   * Generates proactive AI Mentor chat assistance.
   */
  async getMentorChatResponse(userMessage, context = {}, options = {}) {
    const { apiKey } = options;
    const provider = getProvider(apiKey);

    // 1. Try backend
    const backendResult = await tryBackend('/api/mentor-chat', {
      userMessage, context, apiKey, provider: provider || 'gemini'
    });
    if (backendResult?.reply) return backendResult.reply;

    // 2. Try direct LLM
    if (provider) {
      try {
        const { activeProject, profile, tasks = [] } = context;
        const completedCount = tasks.filter(t => t.status === 'Completed').length;
        const prompt = `You are the Proactive AI Project Mentor in ProjectPilot AI.
Student: ${profile?.name || 'Student'} (${profile?.course || 'CS'})
Active Project: ${activeProject?.title || 'AI Project'}
Progress: ${completedCount}/${tasks.length} tasks completed
Query: "${userMessage}"
Respond as an expert mentor. Be sharp, actionable, encouraging. Under 200 words. Use markdown.`;

        let reply = '';
        if (provider === 'gemini') {
          reply = await callGeminiBrowser(prompt, apiKey);
        } else {
          reply = await callOpenAIBrowser(prompt, apiKey);
        }
        return reply;
      } catch (err) {
        console.warn('Mentor chat LLM failed, using mock:', err.message);
      }
    }

    // 3. Heuristic response
    return getMentorMockResponse(userMessage, context);
  },

  /**
   * Re-analyzes feasibility with live AI.
   */
  async analyzeFeasibility(project, profile, options = {}) {
    const { apiKey } = options;
    const provider = getProvider(apiKey);

    const backendResult = await tryBackend('/api/analyze-feasibility', {
      project, profile, apiKey, provider: provider || 'gemini'
    });
    if (backendResult?.analysis) return backendResult.analysis;

    if (provider) {
      try {
        const prompt = buildFeasibilityPrompt(project, profile);
        let raw = provider === 'gemini'
          ? await callGeminiBrowser(prompt, apiKey)
          : await callOpenAIBrowser(prompt, apiKey);
        return extractJSON(raw);
      } catch (err) {
        console.warn('Feasibility LLM failed:', err.message);
      }
    }
    return null; // caller uses mock data
  },

  /**
   * Generates an innovation upgrade for a project.
   */
  async innovateProject(project, tier, options = {}) {
    const { apiKey } = options;
    const provider = getProvider(apiKey);

    const backendResult = await tryBackend('/api/innovate-project', {
      project, tier, apiKey, provider: provider || 'gemini'
    });
    if (backendResult?.upgrade) return backendResult.upgrade;

    if (provider) {
      try {
        const tiers = {
          conservative: 'Improve robustness and explainability without adding features.',
          balanced: 'Add one standout innovative element without risky complexity.',
          ambitious: 'Add cutting-edge AI/ML like LLM integration or multi-modal inputs.'
        };
        const prompt = `You are an AI innovation strategist upgrading a final-year student project.
Project: ${project?.title} — ${project?.solution}
Tier: ${tier} — ${tiers[tier] || tiers.balanced}
Return JSON ONLY: { "upgradedTitle": "...", "upgradedTagline": "...", "keyInnovations": ["..."], "newFeatures": ["..."], "innovationScore": 88, "addedComplexity": "Medium", "upgradeRationale": "..." }`;

        let raw = provider === 'gemini'
          ? await callGeminiBrowser(prompt, apiKey)
          : await callOpenAIBrowser(prompt, apiKey);
        return extractJSON(raw);
      } catch (err) {
        console.warn('Innovation LLM failed:', err.message);
      }
    }
    return null;
  }
};

// ─── Prompt Builders ──────────────────────────────────────────────────────────
function buildProjectGenerationPrompt(profile) {
  return `You are ProjectPilot AI, an elite academic project architect.
Student profile: ${JSON.stringify(profile, null, 2)}

Generate exactly 5 final-year project candidates. ONE must have "isRecommendedWinner": true.
Return JSON array ONLY (no markdown wrapper):
[{ "id":"proj-1","title":"...","tagline":"...","isRecommendedWinner":true,"recommendationReason":"...","scores":{"skillMatch":87,"feasibility":91,"innovation":78,"careerValue":88,"vivaPotential":85,"aiNecessity":82,"overallFit":88},"completionProbability":89,"difficulty":"Intermediate","durationWeeks":10,"estimatedCost":"₹500-₹1500","domain":"...","targetUsers":"...","problem":"...","solution":"...","aiComponent":"...","frontend":"React.js","backend":"FastAPI","database":"PostgreSQL","hardwareRequirements":"CPU-only, 8GB RAM","datasetRequirements":"Public Kaggle dataset","requiredSkills":["Python","Scikit-learn"],"risks":[{"area":"Data Quality","level":"Medium","mitigation":"SMOTE oversampling"}],"tradeoffs":"..."}]`;
}

function buildVivaEvalPrompt(question, studentAnswer, project) {
  return `You are a strict CS professor evaluating a final-year project defense.
Project: ${project?.title}
Question: "${question?.question || question}"
Student Answer: "${studentAnswer}"
Return JSON ONLY: {"technicalScore":85,"clarityScore":80,"overallScore":82,"verdict":"Accepted","feedback":"...","strengths":["..."],"improvements":["..."],"followUpTrap":"..."}`;
}

function buildFeasibilityPrompt(project, profile) {
  return `Analyze feasibility for: ${project?.title}
Hardware: RAM=${profile?.constraints?.ram}, GPU=${profile?.constraints?.hasGpu}
Team: ${profile?.constraints?.teamSize} members, ${profile?.constraints?.weeksAvailable} weeks
Return JSON ONLY: {"dimensions":[{"name":"Technical Complexity","score":85,"status":"Feasible","detail":"..."}],"overallVerdict":"Go","criticalRisks":["..."],"mitigations":["..."]}`;
}

// ─── Mock Engines ─────────────────────────────────────────────────────────────
async function generateMockProjects(profile) {
  await new Promise(r => setTimeout(r, 1400));

  const hasGpu = profile?.constraints?.hasGpu || false;
  const ram = profile?.constraints?.ram || '8GB RAM';
  const weeks = profile?.constraints?.weeksAvailable || 10;

  return SAMPLE_PROJECTS.map((proj, idx) => {
    const cloned = JSON.parse(JSON.stringify(proj));
    cloned.id = `proj-${Date.now()}-${idx}`;
    if (!hasGpu && proj.hardwareRequirements?.includes('GPU')) {
      cloned.scores.feasibility = Math.max(40, cloned.scores.feasibility - 25);
      cloned.completionProbability = Math.max(35, cloned.completionProbability - 28);
      cloned.tradeoffs = `⚠️ GPU Required: Training on your ${ram} CPU will be 40-80x slower. OOM risk is high. Feasibility severely reduced.`;
    }
    cloned.durationWeeks = Math.min(weeks, cloned.durationWeeks);
    return cloned;
  });
}

function evaluateMock(studentAnswer) {
  const length = (studentAnswer || '').trim().length;
  const hasTech = /xgb|shap|gradient|accuracy|recall|precision|latency|overfit|bias|smote|feature|pipeline|gpu|cpu|dataset|metric|algorithm|model|neural|transformer|bert|llm/i.test(studentAnswer);

  let score = 70;
  if (length > 120) score += 12;
  if (hasTech) score += 10;
  if (length < 30) score -= 25;
  score = Math.min(95, Math.max(45, score));

  return {
    technicalScore: score,
    clarityScore: Math.min(92, score + 4),
    overallScore: score,
    verdict: score >= 80 ? 'Accepted by Examiner' : (score >= 65 ? 'Minor Revision Required' : 'Weak Justification — Rejection Risk'),
    feedback: score >= 80
      ? 'Solid technical defense! You clearly articulated the mathematical justification and preempted examiner skepticism on real-world constraints.'
      : 'You answered the surface question, but failed to provide quantitative metric targets (e.g. Target Recall %, baseline comparisons, latency benchmarks).',
    strengths: [
      hasTech ? 'Directly referenced algorithmic mechanisms' : 'Clear communication style',
      'Addressed the core question without deflecting'
    ],
    improvements: [
      'Include concrete empirical metrics (e.g., target 89% Recall or <150ms inference time)',
      'Highlight how failure cases or data edge-cases are gracefully handled'
    ],
    followUpTrap: 'What specific loss function did you optimize, and how did you prevent severe overfitting on synthetic minority samples?'
  };
}

function getMentorMockResponse(query, context) {
  const { activeProject } = context || {};
  const q = (query || '').toLowerCase();

  if (q.includes('today') || q.includes('priority') || q.includes('what should')) {
    return `🎯 **Today's Strategic Priority:**\n\nFocus on finalizing the **SHAP TreeExplainer Feature Attribution pipeline** in Python.\n\n1. Run SHAP summary plots on your top 5 risk features.\n2. Export the feature importance dictionary as a JSON payload for your FastAPI backend.\n3. Estimated time: **2 hours**. Once this is hooked up, your presentation demo is 80% ready for faculty review!`;
  }
  if (q.includes('behind') || q.includes('schedule') || q.includes('late')) {
    return `⏱️ **Schedule Recovery Analysis:**\n\nYou're roughly 2 days behind on your Week 4 sprint due to backend serialization testing.\n\n**Recovery Plan:**\n- 🔪 Cut the Mobile App + Voice Assistant modules for now\n- 🎯 Stick to the single-page React analytics dashboard\n- ⚡ Pair program on FastAPI async endpoints for 1 sprint (3 hours) to unblock the frontend`;
  }
  if (q.includes('simplify') || q.includes('scope') || q.includes('remove')) {
    return `✂️ **Scope Guardian Recommendation:**\n\nFor an on-time, polished submission:\n\n- **KEEP (Must Have):** Data cleaning, XGBoost model, SHAP waterfall visualizer, React web portal\n- **REMOVE FOR NOW:** Mobile native apps, Blockchain verification, Voice assistant\n\n*Examiners reward a polished, bug-free, explainable core model 10x more than 5 half-broken extra features!*`;
  }
  if (q.includes('viva') || q.includes('professor') || q.includes('present')) {
    return `🎓 **Viva Defense Strategy:**\n\nProfessors typically probe 3 areas:\n1. **Data Bias & Imbalance** — Explain your SMOTE / class weighting approach\n2. **Why not simple rules?** — Highlight non-linear cross-feature risk dynamics\n3. **Model Explainability** — Show a live SHAP waterfall plot for an individual student\n\nUse the **Professor Simulator** tab to sharpen your defense score!`;
  }
  return `💡 **Mentor Guidance:**\n\nFor **${activeProject?.title || 'your project'}**, the key to standing out is **Explainability & Reliability**.\n\nKeep your core ML pipeline reproducible, document your confusion matrix thresholds, and ensure your web dashboard loads inferences in under 200ms. Let me know if you want me to analyze your roadmap or run a quick viva quiz!`;
}
