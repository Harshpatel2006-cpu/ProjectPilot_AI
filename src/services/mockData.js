export const DEMO_STUDENT_PROFILE = {
  name: "Aarav Sharma",
  course: "B.Tech Computer Science",
  year: "Final Year (Semester 8)",
  department: "Computer Science & Engineering (AI/ML)",
  projectType: "Final-Year Major Project",
  skills: {
    programming: "Intermediate",
    ai_ml: "Intermediate",
    web_dev: "Beginner",
    mobile_dev: "Beginner",
    backend: "Intermediate",
    database: "Intermediate",
    cloud: "Beginner",
    cybersecurity: "Beginner",
    data_science: "Intermediate",
    iot: "Beginner",
  },
  skillLevels: {
    "Python": 80,
    "Machine Learning": 75,
    "React / Frontend": 45,
    "Node.js / Backend": 70,
    "SQL / MongoDB": 72,
    "Deep Learning / PyTorch": 40,
    "Cloud & Docker": 35,
  },
  preferences: {
    interests: ["Artificial Intelligence", "Predictive Analytics", "EdTech", "Healthcare Informatics"],
    preferredTechnologies: ["Python", "FastAPI", "React", "Scikit-Learn", "PostgreSQL"],
    preferredDomain: "Education / AI & Analytics",
    careerGoal: "AI/ML Engineer",
  },
  constraints: {
    teamSize: 3,
    weeksAvailable: 10,
    dailyHours: 3.5,
    budget: 5000,
    currency: "INR (₹)",
    ram: "8GB RAM",
    hasGpu: false,
    gpuDetails: "Integrated Intel Iris Xe Graphics (No Dedicated VRAM)",
    internet: "High Speed Stable Broadband",
    hardwareAvailable: "Standard Laptops, Webcam",
  },
  innovationPreference: 65, // 0 Safe -> 100 Highly Innovative
  academicPriority: "Balanced (Resume + High Viva Marks)",
};

export const SAMPLE_PROJECTS = [
  {
    id: "proj-1",
    title: "AI-Based Student Performance & Early Dropout Risk Prediction Engine",
    tagline: "Multimodal academic trajectory forecasting with actionable personalized interventions",
    isRecommendedWinner: true,
    recommendationReason: "Optimal 88% overall fit for your 3-person team, 10-week timeline, 8GB laptop (no GPU needed), and directly strengthens your AI/ML Engineer resume with tabular/ensemble modeling and explainable AI (SHAP/LIME).",
    scores: {
      skillMatch: 92,
      feasibility: 91,
      innovation: 82,
      careerValue: 92,
      vivaPotential: 88,
      aiNecessity: 89,
      overallFit: 88,
    },
    completionProbability: 87, // AI-estimated completion probability
    difficulty: "Intermediate",
    durationWeeks: 10,
    estimatedCost: "₹1,200 (Cloud Hosting & Domain)",
    domain: "EdTech & Predictive Intelligence",
    targetUsers: "Academic Counselors, University HODs, At-risk College Students",
    problem: "University advisors typically detect student academic failure only after semester exams end, when remedial intervention is already too late. Existing LMS platforms lack proactive early-warning algorithms.",
    solution: "A lightweight predictive intelligence web app that ingests ongoing quiz scores, attendance fluctuations, and assignment submission timeliness to forecast semester outcome probabilities and generate personalized remediation roadmaps.",
    aiComponent: "Ensemble Gradient Boosting (XGBoost/LightGBM) with Explainable AI (SHAP TreeExplainer) to interpret top risk drivers for faculty.",
    frontend: "React + Tailwind CSS + Recharts interactive dashboard",
    backend: "FastAPI (Python) microservice with async score calculations",
    database: "PostgreSQL + Supabase / SQLite for local demo",
    hardwareRequirements: "8GB RAM, CPU-only training (runs smoothly without discrete GPU in under 4 minutes)",
    datasetRequirements: "Kaggle Higher Education Student Academic Performance Dataset (Open-source, 10k+ rows, clean tabular format)",
    requiredSkills: ["Python", "Pandas/Scikit-Learn", "FastAPI", "React (Basic)", "PostgreSQL"],
    risks: [
      { area: "Frontend Complexity", level: "Low", mitigation: "Use pre-built Tailwind and Recharts templates for clean charts." },
      { area: "Data Drift", level: "Low", mitigation: "Utilize cross-validation on diverse benchmark academic cohorts." }
    ],
    tradeoffs: "Safe computational overhead with zero GPU dependency; focuses heavily on Explainable AI to wow external viva examiners rather than brute-force deep transformers."
  },
  {
    id: "proj-2",
    title: "Autonomous Multi-Modal Healthcare Risk & Patient Stratification Engine",
    tagline: "Deep Vision & EHR fusion for proactive chronic disease diagnostics",
    isRecommendedWinner: false,
    recommendationReason: "High theoretical innovation but severely exceeds your hardware and 10-week timeline limits.",
    scores: {
      skillMatch: 58,
      feasibility: 51,
      innovation: 94,
      careerValue: 90,
      vivaPotential: 78,
      aiNecessity: 95,
      overallFit: 71,
    },
    completionProbability: 52,
    difficulty: "Advanced / High Risk",
    durationWeeks: 16,
    estimatedCost: "₹6,500 (GPU Cloud compute & medical dataset licenses)",
    domain: "Healthcare Informatics",
    targetUsers: "Clinical diagnosticians, triage nurses",
    problem: "Medical triage is delayed when unstructured EHR notes and radiological scans are analyzed in disconnected silos.",
    solution: "Multi-modal transformer that synthesizes chest X-Ray DICOM scans with clinical patient notes to produce stratified triage urgency scores.",
    aiComponent: "Multi-modal Vision Transformer (ViT) + ClinicalBERT fusion architecture.",
    frontend: "React Medical Portal with DICOM viewer integration",
    backend: "PyTorch TorchServe + FastAPI",
    database: "MongoDB + MinIO Object Store",
    hardwareRequirements: "Minimum 16GB RAM + 8GB VRAM Dedicated NVIDIA GPU (CUDA)",
    datasetRequirements: "MIMIC-CXR or CheXpert (requires special credentialing & 100GB+ storage)",
    requiredSkills: ["Advanced PyTorch", "CUDA optimization", "DICOM parsing", "Medical NLP"],
    risks: [
      { area: "Hardware Bottleneck", level: "Critical", mitigation: "Cannot train or run batch inferences locally on 8GB RAM laptop without expensive GPU rental." },
      { area: "Dataset Compliance", level: "High", mitigation: "Strict HIPAA/IRB ethics clearance needed for university viva." }
    ],
    tradeoffs: "Has 94% innovation but 51% feasibility. Your 8GB laptop with no GPU will crash during ViT backpropagation, leading to high project failure risk."
  },
  {
    id: "proj-3",
    title: "Personalized Adaptive Micro-Learning & Knowledge Gap Engine",
    tagline: "Knowledge tracing algorithm tailored to student coding quiz habits",
    isRecommendedWinner: false,
    recommendationReason: "Strong candidate with good feasibility, but slightly less differentiated in typical university evaluation panels.",
    scores: {
      skillMatch: 86,
      feasibility: 84,
      innovation: 75,
      careerValue: 84,
      vivaPotential: 80,
      aiNecessity: 81,
      overallFit: 81,
    },
    completionProbability: 83,
    difficulty: "Intermediate",
    durationWeeks: 9,
    estimatedCost: "₹800",
    domain: "EdTech & Recommender Systems",
    targetUsers: "Self-paced coding students and bootcamp mentors",
    problem: "Standard online courses show static linear playlists regardless of student prerequisite weaknesses.",
    solution: "Item Response Theory (IRT) and Collaborative Filtering system that dynamically reorders curriculum modules based on quiz accuracy.",
    aiComponent: "Bayesian Knowledge Tracing (BKT) + LightFM Hybrid Recommender.",
    frontend: "Next.js / React interactive quiz engine",
    backend: "FastAPI / Python",
    database: "PostgreSQL",
    hardwareRequirements: "8GB RAM CPU is sufficient",
    datasetRequirements: "Assistments 2017 or EdNet public open-source benchmark",
    requiredSkills: ["Python", "FastAPI", "React", "Recommender algorithms"],
    risks: [
      { area: "Novelty Perception", level: "Medium", mitigation: "Must emphasize dynamic knowledge graph over basic quiz score sorting." }
    ],
    tradeoffs: "Very feasible for your skills, but examiners frequently view recommender engines as standard semester mini-projects."
  },
  {
    id: "proj-4",
    title: "Real-Time Driver Attention Analytics & Microsleep Risk Detector",
    tagline: "Edge vision computer vision pipeline for fatigue warning",
    isRecommendedWinner: false,
    recommendationReason: "Solid hardware demonstration, but webcam latency and lighting issues make live viva demos risky.",
    scores: {
      skillMatch: 76,
      feasibility: 72,
      innovation: 70,
      careerValue: 78,
      vivaPotential: 75,
      aiNecessity: 76,
      overallFit: 75,
    },
    completionProbability: 73,
    difficulty: "Intermediate",
    durationWeeks: 10,
    estimatedCost: "₹1,500 (Webcam Mount / Raspberry Pi optional)",
    domain: "Computer Vision & Automotive Safety",
    targetUsers: "Commercial Fleet Drivers and logistics managers",
    problem: "Fatigue accounts for 20% of highway commercial accidents, often going unnoticed until catastrophic vehicle drift.",
    solution: "Facial landmark tracker detecting Eye Aspect Ratio (EAR), Perclos, and yawn frequencies in real-time.",
    aiComponent: "MediaPipe FaceMesh + Lightweight LSTM temporal state classifier.",
    frontend: "Electron / Web Dashboard with audio buzzer warning",
    backend: "Python OpenCV & WebSocket stream server",
    database: "SQLite telemetry log",
    hardwareRequirements: "8GB RAM with USB webcam (60 FPS preferred)",
    datasetRequirements: "NTHU Driver Drowsiness Video Dataset",
    requiredSkills: ["OpenCV", "Python", "MediaPipe", "WebSocket"],
    risks: [
      { area: "Live Demo Glitch", level: "High", mitigation: "Ambient room lighting during university viva often causes false positives." }
    ],
    tradeoffs: "Fun to build, but high risk of camera connection failure or lighting glitches during live professor demonstration."
  },
  {
    id: "proj-5",
    title: "AI-Powered Smart Waste Classification & Segregation Inspector",
    tagline: "Automated municipal recycling stream purity evaluation",
    isRecommendedWinner: false,
    recommendationReason: "Requires physical sorting chamber or edge IoT hardware that stretches your ₹5,000 budget.",
    scores: {
      skillMatch: 70,
      feasibility: 65,
      innovation: 80,
      careerValue: 79,
      vivaPotential: 74,
      aiNecessity: 85,
      overallFit: 74,
    },
    completionProbability: 68,
    difficulty: "Intermediate-Advanced",
    durationWeeks: 11,
    estimatedCost: "₹4,200 (Arduino/Servo motors + Camera rig)",
    domain: "IoT & Sustainable AI",
    targetUsers: "Smart City municipal waste facilities",
    problem: "Manual waste sorting is hazardous, slow, and results in cross-contamination of recyclable materials.",
    solution: "YOLOv8-nano visual classifier running on camera stream paired with automated servo gate deflection.",
    aiComponent: "YOLOv8-nano fine-tuned on TACO dataset.",
    frontend: "React Monitoring Dashboard",
    backend: "Flask/FastAPI + Serial Arduino communication",
    database: "PostgreSQL",
    hardwareRequirements: "8GB RAM laptop + Arduino Uno + Servo Motors",
    datasetRequirements: "TACO (Trash Annotations in Context) Dataset",
    requiredSkills: ["YOLOv8", "Python", "Basic Embedded C/Arduino", "React"],
    risks: [
      { area: "Hardware Integration", level: "High", mitigation: "Motor jamming and physical assembly take 40% of time away from core ML." }
    ],
    tradeoffs: "Strong environmental appeal, but physical hardware bugs during viva evaluation often deduct presentation marks."
  }
];

export const FEASIBILITY_DIMENSIONS = [
  { name: "Skill Match", score: 92, status: "Safe", icon: "Code", detail: "Python, Scikit-learn, and backend skills directly align. React dashboard can be built with ready-made components." },
  { name: "Time Feasibility", score: 91, status: "Safe", icon: "Clock", detail: "Estimated 10 weeks is a 100% match with your available semester timeline. 3.5h/day is ample." },
  { name: "Team Compatibility", score: 95, status: "Safe", icon: "Users", detail: "Ideal 3-person split: 1 ML/Data engineer, 1 Backend/API developer, 1 Frontend/Presentation lead." },
  { name: "Hardware Feasibility", score: 96, status: "Safe", icon: "Cpu", detail: "Tabular XGBoost & SHAP run in CPU memory (< 1.8GB RAM utilized). Zero discrete GPU required." },
  { name: "Budget Feasibility", score: 94, status: "Safe", icon: "DollarSign", detail: "Total estimated spend ₹1,200 is well within your ₹5,000 allowance (Vercel/Render free tiers available)." },
  { name: "Dataset Availability", score: 88, status: "Safe", icon: "Database", detail: "Open Kaggle higher-ed benchmark dataset contains clean verified rows with no privacy red-tape." },
  { name: "Technical Complexity", score: 84, status: "Safe", icon: "Wrench", detail: "Intermediate mathematical depth with SHAP explainability provides rigorous viva defense." },
  { name: "Deployment Ease", score: 89, status: "Safe", icon: "Cloud", detail: "Easily dockerized or hosted on Render/Railway + Vercel with zero cold-start GPU costs." }
];

export const NOVELTY_ANALYSIS = {
  commonnessScore: 68,
  innovationScore: 82,
  academicValue: 88,
  realWorldRelevance: 91,
  differentiationScore: 84,
  radarData: [
    { subject: "Innovation", value: 82, fullMark: 100 },
    { subject: "Academic Value", value: 88, fullMark: 100 },
    { subject: "Real-World Impact", value: 91, fullMark: 100 },
    { subject: "Differentiation", value: 84, fullMark: 100 },
    { subject: "Viva Defensibility", value: 86, fullMark: 100 },
    { subject: "Technical Depth", value: 85, fullMark: 100 }
  ],
  commonProjectWarning: "Basic student result management portals and generic grade predictors are frequently submitted. Simply predicting a single GPA number will fail to impress strict examiners.",
  upgradeReason: "By integrating Explainable AI (SHAP value feature attribution) and automated counterfactual recommendations ('If student increases lab attendance by 12%, pass probability jumps from 48% to 76%'), your project transforms from a static toy into a clinical decision support engine."
};

export const AI_NECESSITY_EVALUATION = {
  score: 89,
  verdict: "High AI Necessity (Genuine Machine Learning Use-Case)",
  weakUsageExample: "Creating a basic CRUD student portal with a generic GPT-3 chatbot widget slapped on the corner.",
  weakUsageReason: "Chatbot does not solve the underlying prediction challenge and adds brittle API dependencies.",
  strongUsageExample: "Non-linear interaction modeling between multi-semester attendance trends, quiz velocity, and socioeconomic factors using SHAP tree explainer.",
  strongUsageReason: "Traditional rule-based if/else logic cannot capture multivariate non-linear dropout thresholds across thousands of evolving student records."
};

export const INNOVATION_TRANSFORMER_LEVELS = {
  safe: {
    level: "Safe (Low Risk)",
    title: "Ensemble Academic Performance Predictor",
    badgeColor: "emerald",
    features: [
      "Standard Random Forest & Logistic Regression comparison",
      "Interactive Streamlit / React result dashboard",
      "CSV batch student record upload"
    ],
    complexity: "Low",
    vivaImpact: "Guaranteed pass, but average marks for novelty"
  },
  balanced: {
    level: "Balanced (Recommended)",
    title: "Explainable AI Early-Warning & Counterfactual Intervention Engine",
    badgeColor: "brand",
    features: [
      "XGBoost + SHAP TreeExplainer for per-student risk factor attribution",
      "Counterfactual 'What-If' simulator for academic advisors",
      "Automated personalized remediation study plan generator",
      "Early semester alert notification pipeline"
    ],
    complexity: "Optimal",
    vivaImpact: "Outstanding marks for addressing AI transparency & real impact"
  },
  ambitious: {
    level: "Ambitious (Research-Grade)",
    title: "Graph-Neural-Network Longitudinal Academic Trajectory & Peer-Group Influence System",
    badgeColor: "violet",
    features: [
      "Temporal Graph Neural Network (GNN) modeling student study-group synergies",
      "Bayesian uncertainty estimation for borderline predictions",
      "Integration with automated LMS Canvas API webhooks"
    ],
    complexity: "High Risk",
    vivaImpact: "Conference paper potential, but 35% higher risk of incomplete implementation"
  }
};

export const PROFESSOR_VIVA_QUESTIONS = [
  {
    id: "q1",
    question: "What specific academic problem does your system solve that an experienced teacher with an Excel sheet cannot already calculate?",
    sampleAnswer: "Excel rule-based formulas only flag students after marks are already finalized. Our system detects subtle multivariate leading indicators (e.g., subtle attendance drop velocity paired with delayed assignment submission latency) 6 weeks before mid-term exams, providing actionable intervention windows.",
    criteria: ["Problem Urgency", "Proactive vs. Reactive Understanding", "Real-world Justification"]
  },
  {
    id: "q2",
    question: "Why is Machine Learning genuinely necessary here instead of a simple weighted average formula?",
    sampleAnswer: "Academic attrition is fundamentally non-linear. A drop in quiz scores combined with specific course difficulty creates compounding risk that linear weighted averages miss. XGBoost models cross-feature interactions, and SHAP reveals exact individual risk drivers.",
    criteria: ["ML Necessity", "Mathematical Rigor", "Non-linear Dynamics"]
  },
  {
    id: "q3",
    question: "What dataset will you train this model on, and how will you address potential class imbalance and algorithmic bias?",
    sampleAnswer: "We are utilizing the verified 10,000+ row Higher Education Student Attrition benchmark dataset. We apply SMOTE-NC for synthetic minority oversampling on dropout classes and monitor Equalized Odds across demographic sub-cohorts.",
    criteria: ["Dataset Integrity", "Class Imbalance Techniques", "Ethical AI Awareness"]
  },
  {
    id: "q4",
    question: "What happens if your ML model outputs a False Negative and fails to flag an at-risk student?",
    sampleAnswer: "We deliberately tune our classification threshold toward high Recall (Sensitivity >= 92%) rather than raw accuracy. In critical risk categories, the cost of an unflagged student outweighs a harmless advisor check-in.",
    criteria: ["Confusion Matrix Strategy", "Threshold Tuning", "Safety Mindset"]
  },
  {
    id: "q5",
    question: "How is your architecture deployed, and how can faculty members interpret the model's 'black box' output?",
    sampleAnswer: "Our FastAPI backend serves SHAP waterfall plots directly to the React UI, translating complex model weights into plain-English advisor tips (e.g., 'Primary risk: Math Lab Attendance -18%').",
    criteria: ["Explainability", "Full-Stack Integration", "User-Centric Architecture"]
  }
];

export const INITIAL_ROADMAP_TASKS = [
  { id: "t1", week: 1, title: "Literature Review & Requirements Finalization", category: "Research", status: "Completed", priority: "Must Have", hours: 14, assignee: "Full Team" },
  { id: "t2", week: 2, title: "Dataset Acquisition, EDA & Data Cleaning Pipeline", category: "Data", status: "Completed", priority: "Must Have", hours: 18, assignee: "ML Lead" },
  { id: "t3", week: 3, title: "Feature Engineering & Baseline Model Benchmark", category: "ML", status: "Completed", priority: "Must Have", hours: 20, assignee: "ML Lead" },
  { id: "t4", week: 4, title: "XGBoost Model Tuning & SHAP TreeExplainer Pipeline", category: "ML", status: "In Progress", priority: "Must Have", hours: 22, assignee: "ML Lead" },
  { id: "t5", week: 5, title: "FastAPI Async REST Endpoints & Schema Validation", category: "Backend", status: "In Progress", priority: "Must Have", hours: 16, assignee: "Backend Lead" },
  { id: "t6", week: 6, title: "React Dashboard UI & Recharts Risk Visualization", category: "Frontend", status: "Not Started", priority: "Must Have", hours: 24, assignee: "Frontend Lead" },
  { id: "t7", week: 7, title: "Counterfactual 'What-If' Simulation Module", category: "Frontend & ML", status: "Not Started", priority: "Should Have", hours: 18, assignee: "Full Team" },
  { id: "t8", week: 8, title: "End-to-End Testing & Docker Containerization", category: "DevOps", status: "Not Started", priority: "Must Have", hours: 12, assignee: "Backend Lead" },
  { id: "t9", week: 9, title: "Comprehensive Project Documentation & IEEE Format Paper", category: "Documentation", status: "Not Started", priority: "Must Have", hours: 20, assignee: "Full Team" },
  { id: "t10", week: 10, title: "Viva Presentation Slides & Demo Dry-Run Mock Tests", category: "Viva Prep", status: "Not Started", priority: "Must Have", hours: 15, assignee: "Full Team" },
];

export const SCOPE_MODULES = [
  { id: "m1", name: "Student Profile & CSV Ingestion Engine", category: "Must Have", required: true, estimatedDays: 4, impact: "High" },
  { id: "m2", name: "XGBoost Tabular Risk Predictor", category: "Must Have", required: true, estimatedDays: 5, impact: "High" },
  { id: "m3", name: "SHAP Explainability Waterfall Visualizer", category: "Must Have", required: true, estimatedDays: 6, impact: "High" },
  { id: "m4", name: "FastAPI Async REST API Server", category: "Must Have", required: true, estimatedDays: 4, impact: "High" },
  { id: "m5", name: "Faculty Analytics Web Portal (React + Tailwind)", category: "Must Have", required: true, estimatedDays: 7, impact: "High" },
  { id: "m6", name: "Counterfactual 'What-If' Interactive Simulator", category: "Should Have", required: false, estimatedDays: 5, impact: "Medium" },
  { id: "m7", name: "Automated Email Alerts for At-Risk Students", category: "Should Have", required: false, estimatedDays: 3, impact: "Medium" },
  { id: "m8", name: "Mobile App for iOS / Android with Push Notifications", category: "Nice to Have", required: false, estimatedDays: 14, impact: "Low / Scope Creep Risk" },
  { id: "m9", name: "Voice Assistant Integration (Alexa Skill)", category: "Nice to Have", required: false, estimatedDays: 10, impact: "Low / Scope Creep Risk" },
  { id: "m10", name: "Blockchain Immutable Student Credential Ledger", category: "Nice to Have", required: false, estimatedDays: 12, impact: "Low / Scope Creep Risk" },
];

export const MENTOR_ALERTS = [
  {
    id: "a1",
    type: "warning",
    title: "Roadmap Pace Alert",
    message: "You are currently on Week 4. FastAPI backend integration needs to start by Thursday to prevent frontend dependency blockage.",
    timestamp: "2 hours ago",
    actionText: "Open Sprint Tasks",
    actionTab: "plan"
  },
  {
    id: "a2",
    type: "success",
    title: "Model Baseline Achieved",
    message: "XGBoost baseline attained 89.4% ROC-AUC on the benchmark dataset. Proceed to SHAP tree explainer integration.",
    timestamp: "Yesterday",
    actionText: "View Model Metrics",
    actionTab: "feasibility"
  },
  {
    id: "a3",
    type: "tip",
    title: "Scope Guardian Tip",
    message: "Postpone the Voice Assistant and Blockchain modules until after the midterm viva demo. Focus 100% on the core SHAP visualizer.",
    timestamp: "3 days ago",
    actionText: "Review Scope",
    actionTab: "plan"
  },
  {
    id: "a4",
    type: "academic",
    title: "Professor Viva Readiness",
    message: "Practice Question 3 on Class Imbalance (SMOTE vs. Class Weights). Faculty evaluators frequently test this.",
    timestamp: "4 days ago",
    actionText: "Launch Professor Simulator",
    actionTab: "professor"
  }
];
