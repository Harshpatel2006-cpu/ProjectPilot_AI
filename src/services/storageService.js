const STORAGE_KEYS = {
  PROFILE: 'projectpilot_student_profile',
  PROJECTS: 'projectpilot_generated_projects',
  ACTIVE_PROJECT: 'projectpilot_active_project',
  ROADMAP_TASKS: 'projectpilot_roadmap_tasks',
  SCOPE_MODULES: 'projectpilot_scope_modules',
  SETTINGS: 'projectpilot_app_settings',
  VIVA_PROGRESS: 'projectpilot_viva_progress',
  CHAT_MESSAGES: 'projectpilot_mentor_chat',
};

export const storageService = {
  get: (key, fallback = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      console.warn(`Storage get error for key ${key}:`, e);
      return fallback;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Storage set error for key ${key}:`, e);
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`Storage remove error for key ${key}:`, e);
    }
  },

  clearAll: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
    } catch (e) {
      console.warn('Storage clear error:', e);
    }
  },

  keys: STORAGE_KEYS
};
