export const PATHS = {
  HOME: '/',
  PROJECTS: '/projects',
  RESUME: '/resume',
  TECH_STACK: '/tech-stack',
  CERTIFICATIONS: '/certifications',
  CONTACT: '/contact',
  // Specific feature paths
  CS50X_WEB: {
    ROOT: '/projects/cs50x-web',
    PROJECT: '/projects/cs50x-web/:project',
    CREDIT: '/projects/cs50x-web/credit',
    SCRABBLE: '/projects/cs50x-web/scrabble',
    READABILITY: '/projects/cs50x-web/readability',
    CAESAR: '/projects/cs50x-web/caesar',
    SUBSTITUTION: '/projects/cs50x-web/substitution',
    PLURALITY: '/projects/cs50x-web/plurality',
    RUNOFF: '/projects/cs50x-web/runoff',
    FILTER: '/projects/cs50x-web/filter',
  },
  CS50W: {
    ROOT: '/projects/cs50w',
    PROJECT: '/projects/cs50w/:project',
  },
  FRONTEND: {
    ROOT: '/projects/frontend',
    PROJECT: '/projects/frontend/:project',
  },
  ML_AI: {
    ROOT: '/projects/ml-ai',
    PROJECT: '/projects/ml-ai/:project',
  },
  WEB_APPS: {
    ROOT: '/projects/web-apps',
    PROJECT: '/projects/web-apps/:project',
  }
} as const;

export const getProjectDetailPath = (category: string, id: string) => `/projects/${category}/${id}`;
export const getCs50xWebProjectPath = (project: string) => `/projects/cs50x-web/${project}`;
export const getCs50wProjectPath = (project: string) => `/projects/cs50w/${project}`;
export const getFrontendProjectPath = (project: string) => `/projects/frontend/${project}`;
export const getMlAiProjectPath = (project: string) => `/projects/ml-ai/${project}`;
export const getWebAppProjectPath = (project: string) => `/projects/web-apps/${project}`;
