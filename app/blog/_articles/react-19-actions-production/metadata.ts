import { ArticleMetadata } from '@/lib/blog/types';

export const metadata: ArticleMetadata = {
  slug: 'react-19-actions-production',
  title: 'React 19 Actions en production : moins de boilerplate pour les formulaires',
  description:
    'Guide pratique pour reduire le boilerplate des formulaires avec useActionState, useFormStatus et useOptimistic en React 19.',
  author: 'Maxime',
  publishedAt: '2026-02-18',
  readingTime: 12,
  category: 'best-practices',
  tags: ['React 19', 'Actions', 'Forms', 'Best Practices'],
  featured: false,
  tableOfContents: [
    { id: 'introduction', title: 'Introduction', level: 2 },
    { id: 'pourquoi-actions', title: 'Pourquoi les Actions changent la donne', level: 2 },
    { id: 'useactionstate', title: 'useActionState : etat et erreurs sans glue-code', level: 2 },
    { id: 'useformstatus', title: 'useFormStatus : des boutons vraiment fiables', level: 2 },
    { id: 'useoptimistic', title: 'useOptimistic : UI immediate sans tricher', level: 2 },
    { id: 'checklist-production', title: 'Checklist production', level: 2 },
    { id: 'conclusion', title: 'Conclusion', level: 2 },
  ],
  seoTitle: 'React 19 Actions en production : formulaires sans boilerplate | maxpaths Blog',
  seoDescription:
    'Guide concret pour simplifier vos formulaires React 19 avec useActionState, useFormStatus et useOptimistic. Patterns et checklist production.',
  keywords: [
    'React 19',
    'Actions',
    'useActionState',
    'useFormStatus',
    'useOptimistic',
    'forms',
    'form actions',
    'server actions',
    'optimistic ui',
    'validation',
    'pending state',
  ],
  ogTitle: 'React 19 Actions en production : moins de boilerplate',
  ogDescription:
    'Formulaires plus simples avec useActionState, useFormStatus et useOptimistic. Exemples concrets et checklist production.',
  ogImage:
    '/api/og?title=React+19+Actions+en+production&category=best-practices',
  twitterCard: 'summary_large_image',
  twitterTitle: 'React 19 Actions en production',
  twitterDescription:
    'Reduisez le boilerplate des formulaires React avec useActionState, useFormStatus et useOptimistic.',
};
