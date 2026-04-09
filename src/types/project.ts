export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  live?: string;
  ui?: string;
  video?: string;
  abstract?: string;
}

export interface Category {
  key: string;
  label: string;
  projects: Project[];
}
