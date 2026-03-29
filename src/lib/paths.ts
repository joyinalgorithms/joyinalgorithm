export const PATHS = {
  HOME: '/',
  PROJECTS: '/projects',
  PROJECT_DETAIL: '/projects/:id',
  CS50X_WEB_PROJECT: '/projects/cs50x-web/:project',
  RESUME: '/resume',
  TECH_STACK: '/tech-stack',
  CERTIFICATIONS: '/certifications',
  CONTACT: '/contact',
} as const

export const getProjectDetailPath = (id: string) => `/projects/${id}`
export const getCs50xWebProjectPath = (project: string) =>
  `/projects/cs50x-web/${project}`
