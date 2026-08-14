import { ArticleMetadata } from '@/lib/blog/types';

export const metadata: ArticleMetadata = {
  slug: 'ux-saas-ia-vitamcv',
  title: 'Construire un SaaS IA conversationnel : le cas VitamCV',
  description:
    "Guide technique pour concevoir un SaaS IA conversationnel avec Next.js, AI SDK, assistant-ui, Zustand, ToolUI, scoring et validation humaine.",
  author: 'Maxime',
  publishedAt: '2026-08-14',
  updatedAt: '2026-08-14',
  readingTime: 22,
  category: 'architecture',
  tags: ['SaaS IA', 'UX', 'Next.js', 'AI SDK', 'Zustand', 'VitamCV'],
  featured: true,
  tableOfContents: [
    { id: 'introduction', title: 'Introduction', level: 2 },
    { id: 'point-depart', title: 'Le point de depart', level: 2 },
    { id: 'stack-choisie', title: 'La stack choisie', level: 2 },
    { id: 'architecture-etat', title: "Qui possede l'etat ?", level: 2 },
    { id: 'phases-conversation', title: 'Les phases conversationnelles', level: 2 },
    { id: 'synchronisation', title: 'Synchronisation chat panel', level: 2 },
    { id: 'tool-ui-validation', title: 'ToolUI et validation humaine', level: 2 },
    { id: 'focus-mode', title: 'Focus Mode', level: 2 },
    { id: 'scoring', title: 'Scoring explicable', level: 2 },
    { id: 'durable-turns', title: 'Retry et idempotence', level: 2 },
    { id: 'lecons', title: 'Lecons frontend et IA', level: 2 },
    { id: 'checklist', title: 'Checklist SaaS IA', level: 2 },
    { id: 'conclusion', title: 'Conclusion', level: 2 },
  ],
  seoTitle: 'SaaS IA conversationnel avec Next.js et AI SDK | Blog maxpaths',
  seoDescription:
    "Guide d'architecture pour SaaS IA conversationnel : Next.js, AI SDK, assistant-ui, Zustand, ToolUI, scoring explicable et validation humaine.",
  keywords: [
    'SaaS IA',
    'AI UX',
    'Next.js',
    'AI SDK',
    'assistant-ui',
    'ToolUI',
    'VitamCV',
    'generateur CV IA',
    'tool calling',
    'Zustand',
    'UX IA',
    'conversation phase',
    'idempotent tool effects',
    'scanner CV IA',
  ],
  ogTitle: 'Construire un SaaS IA conversationnel : le cas VitamCV',
  ogDescription:
    "Un retour technique sur les vraies difficultes d'un SaaS IA : etat, tools, validation, scoring, preview et retry.",
  ogImage:
    '/api/og?title=SaaS+IA+conversationnel+avec+VitamCV&category=architecture',
  twitterCard: 'summary_large_image',
  twitterTitle: 'SaaS IA conversationnel : retour architecture',
  twitterDescription:
    'AI SDK, assistant-ui, Zustand, ToolUI, phases de prompt, scoring et idempotence dans un SaaS Next.js.',
};
