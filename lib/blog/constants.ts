import { BlogCategory } from './types';

export interface BlogCategoryInfo {
  label: string;
  gradient: string;
  accentColor: string;
}

export const BLOG_CATEGORY_INFO: Record<BlogCategory, BlogCategoryInfo> = {
  fundamentals: {
    label: 'Fondamentaux',
    gradient: 'from-primary to-brand-secondary',
    accentColor: 'rgb(0, 150, 136)',
  },
  architecture: {
    label: 'Architecture',
    gradient: 'from-blue-500 to-cyan-500',
    accentColor: 'rgb(59, 130, 246)',
  },
  testing: {
    label: 'Testing',
    gradient: 'from-orange-500 to-amber-500',
    accentColor: 'rgb(249, 115, 22)',
  },
  'best-practices': {
    label: 'Bonnes Pratiques',
    gradient: 'from-purple-500 to-pink-500',
    accentColor: 'rgb(168, 85, 247)',
  },
  advanced: {
    label: 'Avancé',
    gradient: 'from-red-500 to-rose-500',
    accentColor: 'rgb(239, 68, 68)',
  },
};
