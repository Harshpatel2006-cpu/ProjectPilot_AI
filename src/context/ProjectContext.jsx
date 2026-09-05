import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  DEMO_STUDENT_PROFILE, 
  SAMPLE_PROJECTS, 
  INITIAL_ROADMAP_TASKS, 
  SCOPE_MODULES, 
  MENTOR_ALERTS, 
  FEASIBILITY_DIMENSIONS,
  NOVELTY_ANALYSIS,
  AI_NECESSITY_EVALUATION,
  INNOVATION_TRANSFORMER_LEVELS
} from '../services/mockData';
import { storageService } from '../services/storageService';
import { aiService } from '../services/aiService';
import confetti from 'canvas-confetti';

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  // Navigation
  const [currentTab, setCurrentTab] = useState('landing');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEvaluatingViva, setIsEvaluatingViva] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'settings' | 'export' | null

  // Core Data States
  const [profile, setProfile] = useState(() => {
    return storageService.get(storageService.keys.PROFILE, DEMO_STUDENT_PROFILE);
  });

  const [projects, setProjects] = useState(() => {
    return storageService.get(storageService.keys.PROJECTS, SAMPLE_PROJECTS);
  });

  const [activeProject, setActiveProject] = useState(() => {
    const saved = storageService.get(storageService.keys.ACTIVE_PROJECT, null);
    if (saved) return saved;
    return SAMPLE_PROJECTS.find(p => p.isRecommendedWinner) || SAMPLE_PROJECTS[0];
  });

  const [tasks, setTasks] = useState(() => {
    return storageService.get(storageService.keys.ROADMAP_TASKS, INITIAL_ROADMAP_TASKS);
  });

  const [scopeModules, setScopeModules] = useState(() => {
    return storageService.get(storageService.keys.SCOPE_MODULES, SCOPE_MODULES);
  });

  const [mentorAlerts, setMentorAlerts] = useState(MENTOR_ALERTS);

  const [chatMessages, setChatMessages] = useState(() => {
    return storageService.get(storageService.keys.CHAT_MESSAGES, [
      {
        id: 'msg-init-1',
        sender: 'mentor',
        text: `👋 Hello ${DEMO_STUDENT_PROFILE.name}! I am your Proactive AI Project Mentor. Based on your 10-week timeline and 8GB RAM specs, your project **"${SAMPLE_PROJECTS[0].title}"** is on a healthy track (64% progress). How can I assist your sprint today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  });

  const [settings, setSettings] = useState(() => {
    const defaultApiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_AI_API_KEY || '';
    return storageService.get(storageService.keys.SETTINGS, {
      apiKey: defaultApiKey,
      model: defaultApiKey ? 'gemini-1.5-flash' : 'gpt-4o-mini',
      demoMode: true,
      soundEffects: true
    });
  });

  // Professor Simulator State
  const [vivaQuestionIndex, setVivaQuestionIndex] = useState(0);
  const [vivaAnswers, setVivaAnswers] = useState({});
  const [vivaEvaluations, setVivaEvaluations] = useState({});

  // Sync to local storage
  useEffect(() => {
    storageService.set(storageService.keys.PROFILE, profile);
  }, [profile]);

  useEffect(() => {
    storageService.set(storageService.keys.PROJECTS, projects);
  }, [projects]);

  useEffect(() => {
    storageService.set(storageService.keys.ACTIVE_PROJECT, activeProject);
  }, [activeProject]);

  useEffect(() => {
    storageService.set(storageService.keys.ROADMAP_TASKS, tasks);
  }, [tasks]);

  useEffect(() => {
    storageService.set(storageService.keys.SCOPE_MODULES, scopeModules);
  }, [scopeModules]);

  useEffect(() => {
    storageService.set(storageService.keys.SETTINGS, settings);
  }, [settings]);

  useEffect(() => {
    storageService.set(storageService.keys.CHAT_MESSAGES, chatMessages);
  }, [chatMessages]);

  // Actions
  const loadDemoProfile = () => {
    setProfile(DEMO_STUDENT_PROFILE);
    setProjects(SAMPLE_PROJECTS);
    setActiveProject(SAMPLE_PROJECTS.find(p => p.isRecommendedWinner) || SAMPLE_PROJECTS[0]);
    setTasks(INITIAL_ROADMAP_TASKS);
    setScopeModules(SCOPE_MODULES);
    setCurrentTab('projects');
  };

  const updateProfile = (updated) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  const handleGenerateProjects = async (customProfile = profile) => {
    setIsGenerating(true);
    try {
      const results = await aiService.generateProjects(customProfile, {
        apiKey: settings.apiKey,
        model: settings.model
      });
      setProjects(results);
      const winner = results.find(p => p.isRecommendedWinner) || results[0];
      setActiveProject(winner);
      setCurrentTab('battle');
      try {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    } catch (error) {
      console.error('Error generating projects:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const selectProject = (project) => {
    setActiveProject(project);
    setCurrentTab('dna');
  };

  const applyInnovationTier = (tierKey) => {
    const tier = INNOVATION_TRANSFORMER_LEVELS[tierKey];
    if (!tier || !activeProject) return;

    setActiveProject(prev => ({
      ...prev,
      title: tier.title,
      difficulty: tier.complexity,
      scores: {
        ...prev.scores,
        innovation: tierKey === 'ambitious' ? 95 : (tierKey === 'balanced' ? 88 : 72),
        feasibility: tierKey === 'ambitious' ? 62 : (tierKey === 'balanced' ? 89 : 96),
        overallFit: tierKey === 'balanced' ? 91 : prev.scores.overallFit
      }
    }));
    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.5 } });
    } catch (e) {}
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      let nextStatus = 'In Progress';
      if (t.status === 'Not Started') nextStatus = 'In Progress';
      else if (t.status === 'In Progress') nextStatus = 'Completed';
      else if (t.status === 'Completed') nextStatus = 'Not Started';
      return { ...t, status: nextStatus };
    }));
  };

  const toggleModuleScope = (moduleId) => {
    setScopeModules(prev => prev.map(m => {
      if (m.id === moduleId) {
        return { ...m, required: !m.required };
      }
      return m;
    }));
  };

  const simplifyScope = () => {
    // Keeps all Must-Haves, sets non-essentials to inactive
    setScopeModules(prev => prev.map(m => ({
      ...m,
      required: m.category === 'Must Have'
    })));
    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch (e) {}
  };

  const evaluateAnswer = async (question, answerText) => {
    setIsEvaluatingViva(true);
    try {
      const evalResult = await aiService.evaluateProfessorAnswer(question, answerText, activeProject, {
        apiKey: settings.apiKey
      });
      setVivaAnswers(prev => ({ ...prev, [question.id]: answerText }));
      setVivaEvaluations(prev => ({ ...prev, [question.id]: evalResult }));
    } catch (e) {
      console.error(e);
    } finally {
      setIsEvaluatingViva(false);
    }
  };

  const sendMentorMessage = async (userText) => {
    if (!userText.trim()) return;
    const userMsg = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, userMsg]);

    const reply = await aiService.getMentorChatResponse(userText, {
      activeProject,
      profile,
      tasks
    }, { apiKey: settings.apiKey });

    const mentorMsg = {
      id: `msg-mentor-${Date.now()}`,
      sender: 'mentor',
      text: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, mentorMsg]);
  };

  const resetAll = () => {
    storageService.clearAll();
    setProfile(DEMO_STUDENT_PROFILE);
    setProjects(SAMPLE_PROJECTS);
    setActiveProject(SAMPLE_PROJECTS[0]);
    setTasks(INITIAL_ROADMAP_TASKS);
    setScopeModules(SCOPE_MODULES);
    setVivaAnswers({});
    setVivaEvaluations({});
    setCurrentTab('landing');
  };

  // Derived Metrics
  const completedTasksCount = tasks.filter(t => t.status === 'Completed').length;
  const projectProgressPercentage = Math.round((completedTasksCount / (tasks.length || 1)) * 100);
  
  const activeScopeModulesCount = scopeModules.filter(m => m.required).length;
  const hasScopeCreepRisk = activeScopeModulesCount > 7;

  return (
    <ProjectContext.Provider value={{
      currentTab,
      setCurrentTab,
      isGenerating,
      isEvaluatingViva,
      activeModal,
      setActiveModal,
      profile,
      updateProfile,
      loadDemoProfile,
      projects,
      activeProject,
      selectProject,
      handleGenerateProjects,
      applyInnovationTier,
      tasks,
      toggleTaskStatus,
      scopeModules,
      toggleModuleScope,
      simplifyScope,
      hasScopeCreepRisk,
      mentorAlerts,
      chatMessages,
      sendMentorMessage,
      settings,
      setSettings,
      vivaQuestionIndex,
      setVivaQuestionIndex,
      vivaAnswers,
      vivaEvaluations,
      evaluateAnswer,
      completedTasksCount,
      projectProgressPercentage,
      resetAll,
      // Fixed constants/data sets
      feasibilityDimensions: FEASIBILITY_DIMENSIONS,
      noveltyData: NOVELTY_ANALYSIS,
      aiNecessityData: AI_NECESSITY_EVALUATION,
      innovationLevels: INNOVATION_TRANSFORMER_LEVELS
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
