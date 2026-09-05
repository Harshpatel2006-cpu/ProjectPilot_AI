import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '2mb' }));

// Serve frontend build if present
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// ─── Utility: call Google Gemini ─────────────────────────────────────────────
async function callGemini(prompt, apiKey) {
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
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${err}`);
  }
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

// ─── Utility: call OpenAI ─────────────────────────────────────────────────────
async function callOpenAI(prompt, apiKey, model = 'gpt-4o-mini') {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    })
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI API error ${res.status}: ${err}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

// ─── Utility: parse JSON from LLM output ─────────────────────────────────────
function extractJSON(text) {
  const cleaned = text
    .replace(/^```json\s*/im, '')
    .replace(/^```\s*/im, '')
    .replace(/```\s*$/m, '')
    .trim();
  return JSON.parse(cleaned);
}

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'healthy',
    service: 'ProjectPilot AI Backend v2',
    timestamp: new Date().toISOString(),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    openaiConfigured: Boolean(process.env.OPENAI_API_KEY)
  });
});

// ─── Generate Projects ────────────────────────────────────────────────────────
app.post('/api/generate-projects', async (req, res) => {
  const { profile, apiKey, provider = 'gemini', model } = req.body;

  const geminiKey = apiKey || process.env.GEMINI_API_KEY;
  const openaiKey = apiKey || process.env.OPENAI_API_KEY;

  const prompt = `You are ProjectPilot AI, an elite academic project architect.
Analyze this student profile and generate exactly 5 final-year project candidates:
${JSON.stringify(profile, null, 2)}

IMPORTANT RULES:
- Exactly ONE project must have "isRecommendedWinner": true (best balance of feasibility + skills + career + hardware)
- Score all 7 dimensions realistically (0-100)
- completionProbability should reflect actual constraints (RAM, GPU, time, team size)
- The winner must have the highest overallFit score

Return a valid JSON array ONLY (no markdown, no explanation):
[
  {
    "id": "proj-1",
    "title": "...",
    "tagline": "One compelling sentence",
    "isRecommendedWinner": true,
    "recommendationReason": "2-3 sentence explanation of why THIS project fits best",
    "scores": {
      "skillMatch": 87,
      "feasibility": 91,
      "innovation": 78,
      "careerValue": 88,
      "vivaPotential": 85,
      "aiNecessity": 82,
      "overallFit": 88
    },
    "completionProbability": 89,
    "difficulty": "Intermediate",
    "durationWeeks": 10,
    "estimatedCost": "₹500 - ₹1,500",
    "domain": "Machine Learning / Education Tech",
    "targetUsers": "College administrators, faculty",
    "problem": "The core problem in 2 sentences",
    "solution": "The proposed AI solution in 2 sentences",
    "aiComponent": "Core ML/AI technique used",
    "frontend": "React.js + Chart.js",
    "backend": "FastAPI / Flask",
    "database": "PostgreSQL / SQLite",
    "hardwareRequirements": "CPU-only, 8GB RAM sufficient",
    "datasetRequirements": "Public Kaggle dataset available",
    "requiredSkills": ["Python", "Scikit-learn", "React"],
    "risks": [
      { "area": "Data Quality", "level": "Medium", "mitigation": "Use SMOTE oversampling" }
    ],
    "tradeoffs": "What is excluded and why"
  }
]`;

  try {
    let raw = '';
    if (provider === 'gemini' && geminiKey) {
      raw = await callGemini(prompt, geminiKey);
    } else if (openaiKey) {
      raw = await callOpenAI(prompt, openaiKey, model);
    } else {
      return res.status(400).json({ success: false, error: 'No API key provided. Set GEMINI_API_KEY or OPENAI_API_KEY in .env, or pass apiKey in request body.' });
    }
    const projects = extractJSON(raw);
    if (!Array.isArray(projects) || projects.length < 3) {
      throw new Error('LLM returned invalid project array');
    }
    return res.json({ success: true, projects, generatedAt: new Date().toISOString(), provider });
  } catch (err) {
    console.error('generate-projects error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ─── Professor Viva Evaluation ────────────────────────────────────────────────
app.post('/api/evaluate-viva', async (req, res) => {
  const { question, studentAnswer, project, apiKey, provider = 'gemini' } = req.body;

  const geminiKey = apiKey || process.env.GEMINI_API_KEY;
  const openaiKey = apiKey || process.env.OPENAI_API_KEY;

  const prompt = `You are a strict senior university computer science professor evaluating a final-year project defense.

Project: ${project?.title || 'AI System'}
Question: "${question?.question || question}"
Student Answer: "${studentAnswer}"

Evaluate strictly. Return JSON ONLY:
{
  "technicalScore": 85,
  "clarityScore": 80,
  "overallScore": 82,
  "verdict": "Accepted / Minor Revision Required / Weak Justification",
  "feedback": "2-3 sentence specific feedback",
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2"],
  "followUpTrap": "A tricky follow-up question the professor would ask next"
}`;

  try {
    let raw = '';
    if (provider === 'gemini' && geminiKey) {
      raw = await callGemini(prompt, geminiKey);
    } else if (openaiKey) {
      raw = await callOpenAI(prompt, openaiKey);
    } else {
      return res.status(400).json({ success: false, error: 'No API key configured.' });
    }
    const evaluation = extractJSON(raw);
    return res.json({ success: true, evaluation, provider });
  } catch (err) {
    console.error('evaluate-viva error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ─── Mentor Chat ──────────────────────────────────────────────────────────────
app.post('/api/mentor-chat', async (req, res) => {
  const { userMessage, context, apiKey, provider = 'gemini' } = req.body;
  const { activeProject, profile, tasks = [] } = context || {};

  const geminiKey = apiKey || process.env.GEMINI_API_KEY;
  const openaiKey = apiKey || process.env.OPENAI_API_KEY;

  const completedCount = tasks.filter(t => t.status === 'Completed').length;

  const prompt = `You are the Proactive AI Project Mentor in ProjectPilot AI — an intelligent academic coach.

Student: ${profile?.name || 'Student'} (${profile?.course || 'Computer Science'})
Active Project: ${activeProject?.title || 'AI Project'}
Progress: ${completedCount}/${tasks.length} tasks completed
Overall Health Score: ${Math.round((completedCount / Math.max(tasks.length, 1)) * 100)}%

Student Query: "${userMessage}"

Respond as an expert mentor. Be sharp, actionable, and encouraging. Use:
- Concrete next steps
- Time estimates where relevant  
- Scope advice if asked
- Technical depth matching the student's level

Keep response under 200 words. Use markdown formatting (bold, bullets).`;

  try {
    let reply = '';
    if (provider === 'gemini' && geminiKey) {
      reply = await callGemini(prompt, geminiKey);
    } else if (openaiKey) {
      reply = await callOpenAI(prompt, openaiKey);
    } else {
      return res.status(400).json({ success: false, error: 'No API key configured.' });
    }
    return res.json({ success: true, reply, provider });
  } catch (err) {
    console.error('mentor-chat error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ─── Feasibility Re-Analysis ──────────────────────────────────────────────────
app.post('/api/analyze-feasibility', async (req, res) => {
  const { project, profile, apiKey, provider = 'gemini' } = req.body;

  const geminiKey = apiKey || process.env.GEMINI_API_KEY;
  const openaiKey = apiKey || process.env.OPENAI_API_KEY;

  const prompt = `You are a technical feasibility analyst for final-year student projects.

Project: ${project?.title}
Student Profile: RAM=${profile?.constraints?.ram}, GPU=${profile?.constraints?.hasGpu}, Team=${profile?.constraints?.teamSize}, Weeks=${profile?.constraints?.weeksAvailable}

Run a deep feasibility analysis across these 6 dimensions and return JSON ONLY:
{
  "dimensions": [
    { "name": "Technical Complexity", "score": 85, "status": "Feasible", "detail": "why" },
    { "name": "Hardware Requirements", "score": 72, "status": "Caution", "detail": "why" },
    { "name": "Dataset Availability", "score": 90, "status": "Strong", "detail": "why" },
    { "name": "Timeline Realism", "score": 88, "status": "Feasible", "detail": "why" },
    { "name": "Team Skill Alignment", "score": 91, "status": "Strong", "detail": "why" },
    { "name": "Risk-to-Value Ratio", "score": 82, "status": "Feasible", "detail": "why" }
  ],
  "overallVerdict": "Go / Caution / Stop",
  "criticalRisks": ["risk1", "risk2"],
  "mitigations": ["mitigation1", "mitigation2"]
}`;

  try {
    let raw = '';
    if (provider === 'gemini' && geminiKey) {
      raw = await callGemini(prompt, geminiKey);
    } else if (openaiKey) {
      raw = await callOpenAI(prompt, openaiKey);
    } else {
      return res.status(400).json({ success: false, error: 'No API key configured.' });
    }
    const analysis = extractJSON(raw);
    return res.json({ success: true, analysis, provider });
  } catch (err) {
    console.error('analyze-feasibility error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ─── Innovation Upgrade ───────────────────────────────────────────────────────
app.post('/api/innovate-project', async (req, res) => {
  const { project, tier, apiKey, provider = 'gemini' } = req.body;

  const geminiKey = apiKey || process.env.GEMINI_API_KEY;
  const openaiKey = apiKey || process.env.OPENAI_API_KEY;

  const tiers = {
    conservative: 'Minimize complexity — improve the core without adding features. Focus on robustness, explainability, and clean delivery.',
    balanced: 'Add one standout innovative element that meaningfully improves impact without risky complexity.',
    ambitious: 'Push into cutting-edge territory — add advanced AI/ML capabilities like real-time learning, LLM integration, or multi-modal inputs.'
  };

  const prompt = `You are an AI innovation strategist upgrading a student final-year project.

Original Project: ${project?.title}
Problem: ${project?.problem}
Solution: ${project?.solution}
Innovation Tier: ${tier} — ${tiers[tier] || tiers.balanced}

Return JSON ONLY with the upgraded version:
{
  "upgradedTitle": "New project title",
  "upgradedTagline": "New compelling tagline",
  "keyInnovations": ["innovation 1", "innovation 2", "innovation 3"],
  "newFeatures": ["feature 1", "feature 2"],
  "innovationScore": 88,
  "addedComplexity": "Low / Medium / High",
  "upgradeRationale": "2 sentence explanation"
}`;

  try {
    let raw = '';
    if (provider === 'gemini' && geminiKey) {
      raw = await callGemini(prompt, geminiKey);
    } else if (openaiKey) {
      raw = await callOpenAI(prompt, openaiKey);
    } else {
      return res.status(400).json({ success: false, error: 'No API key configured.' });
    }
    const upgrade = extractJSON(raw);
    return res.json({ success: true, upgrade, provider });
  } catch (err) {
    console.error('innovate-project error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// SPA fallback: any non-API route serves index.html
if (fs.existsSync(distPath)) {
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 ProjectPilot AI Backend v2 running on http://localhost:${PORT}`);
  console.log(`   ✅ Gemini API: ${process.env.GEMINI_API_KEY ? 'Configured' : 'Not set (pass in request body)'}`);
  console.log(`   ✅ OpenAI API: ${process.env.OPENAI_API_KEY ? 'Configured' : 'Not set (pass in request body)'}`);
  console.log(`\n   Endpoints:`);
  console.log(`   GET  /api/health`);
  console.log(`   POST /api/generate-projects`);
  console.log(`   POST /api/evaluate-viva`);
  console.log(`   POST /api/mentor-chat`);
  console.log(`   POST /api/analyze-feasibility`);
  console.log(`   POST /api/innovate-project\n`);
});
