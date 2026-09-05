# ProjectPilot AI — Final-Year Project Generator & Mentor

> **"Don't just generate a project. Find the project you can actually build."**

ProjectPilot AI is an AI-powered academic project architect and engineering mentor designed for final-year college and engineering students. It evaluates student skills, team size, timeline, and hardware constraints (RAM, GPU) to generate feasible, high-impact project candidates and guide students all the way through project defense.
live link- https://projectpilot-ai-md2z.onrender.com/
---

## 🌟 Key Features

1. **Student Capability Assessment (4-Step Wizard)**
   - Academic program details & project tier selection
   - Granular technical skill proficiency scoring
   - Career target role & application domain optimization
   - Hardware constraints (RAM, GPU) & timeline feasibility boundary mapping

2. **Project Battle Arena & Decision Matrix**
   - Side-by-side comparison of 5 project candidates across 7 evaluation metrics
   - Automated identification of the highest-probability winning project

3. **Project DNA Breakdown**
   - Full system architecture, frontend/backend/database stacks
   - Expected dataset requirements, risk mitigation matrix, and architectural tradeoffs

4. **8-Dimension Feasibility Engine**
   - Evaluates technical complexity, hardware bounds, data availability, team capability, and time constraints

5. **6D Novelty Radar**
   - Interactive radar visualization assessing research vs. industry vs. standard baseline novelty

6. **AI Necessity Reality Check**
   - Validates whether AI/ML is genuinely needed over rule-based solutions to prevent viva defense failure

7. **Innovation Transformer (3 Tiers)**
   - Conservative (Safe/Reliable), Balanced (Recommended), and Ambitious (Research Grade)

8. **Strict Professor Viva Simulator**
   - Interactive viva defense practice with real-time examiner scoring, feedback, and trap question preparation

9. **Scope Guardian (MoSCoW Method)**
   - Protects against scope creep by organizing features into Must-Have, Should-Have, and Nice-to-Have

10. **Dynamic 10-Week Roadmap & AI Mentor Hub**
    - Task tracking, weekly sprint goals, proactive mentor recommendations, and interactive AI chat

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TailwindCSS v4, Lucide Icons, Recharts, Canvas Confetti
- **Build Tool**: Vite
- **Authentication**: Supabase Auth (Email & Password with Session Persistence)
- **Backend**: Node.js & Express API Server
- **AI Integrations**: Google Gemini 1.5 Flash / OpenAI GPT-4o-mini (with intelligent heuristic fallbacks)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Harshpatel2006-cpu/ProjectPilot_AI.git
cd ProjectPilot_AI
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy `.env.example` to `.env` and fill in your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_BACKEND_URL=http://localhost:3001
```

### 4. Run the development server & backend
In terminal 1 (Frontend):
```bash
npm run dev
```

In terminal 2 (Backend):
```bash
npm run server
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📄 License
MIT License
