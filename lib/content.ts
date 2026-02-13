import { getAllArticlesMetadata } from '@/lib/blog/get-articles';
import { BLOG_CATEGORY_INFO } from '@/lib/blog/constants';

export interface LandingContentItem {
  href: string;
  type: 'guide' | 'article';
  title: string;
  description: string;
  tags: string[];
  accentColor: string;
  badge?: string;
  sections?: number;
  duration?: string;
  publishedAt?: string;
  readingTime?: number;
}

// Ordre : du plus recent au plus ancien
const GUIDES: LandingContentItem[] = [
  {
    href: '/guides/zod-validation',
    type: 'guide',
    title: 'Zod -- Validation TypeScript-first',
    description:
      'Schemas, inference de types, validation de formulaires et d\'API. De la validation basique aux patterns de production.',
    tags: ['Zod', 'TypeScript', 'Validation'],
    accentColor: 'rgb(59, 130, 246)',
    sections: 13,
    duration: '3h',
    publishedAt: '2026-02-13',
  },
  {
    href: '/guides/nextjs-demo/simulateur-performance',
    type: 'guide',
    title: 'useMemo, useCallback et React.memo teste en live',
    description:
      'Comparez 4 strategies d\'optimisation React avec des mesures reelles de temps de rendu : baseline, React.memo, useMemo et la combinaison complete.',
    tags: ['React', 'Performance', 'Interactif'],
    accentColor: 'rgb(249, 115, 22)',
    badge: 'INTERACTIF',
    duration: '10min',
    publishedAt: '2026-02-13',
  },
  {
    href: '/guides/tanstack-react',
    type: 'guide',
    title: 'TanStack -- Ecosysteme complet React',
    description:
      'Query, Router, Table, Virtual, Form, Store et Pacer. Du data fetching a l\'architecture de production.',
    tags: ['TanStack Query', 'TanStack Router', 'React'],
    accentColor: 'rgb(249, 115, 22)',
    sections: 14,
    duration: '4h',
    publishedAt: '2026-02-10',
  },
  {
    href: '/guides/react-19-advanced',
    type: 'guide',
    title: 'React 19 -- Bonnes pratiques seniors',
    description:
      'Patterns avances React 19 : Compiler, Server Components, Actions. Solutions eprouvees et cas d\'usage professionnels.',
    tags: ['React 19', 'Server Components', 'Compiler'],
    accentColor: 'rgb(168, 85, 247)',
    sections: 18,
    duration: '4h',
    publishedAt: '2026-02-07',
  },
  {
    href: '/guides/nextjs-demo',
    type: 'guide',
    title: 'Guide Next.js 16',
    description:
      'Modes de rendu SSR, SSG, ISR et Client Components. Retours d\'experience sur des projets en production avec exemples concrets.',
    tags: ['Next.js 16', 'React 19', 'TypeScript'],
    accentColor: 'rgb(0, 150, 136)',
    badge: 'POPULAIRE',
    sections: 21,
    duration: '3h',
    publishedAt: '2026-02-03',
  },
  {
    href: '/guides/react-memoization',
    type: 'guide',
    title: 'useMemo, useCallback et React.memo',
    description:
      'Comprendre les 3 mecanismes de memoisation React avec des exemples concrets et testables.',
    tags: ['React', 'Performance', 'Hooks'],
    accentColor: 'rgb(59, 130, 246)',
    sections: 10,
    duration: '2h',
    publishedAt: '2026-01-28',
  },
];

export function getGuidesForLanding(): LandingContentItem[] {
  return [...GUIDES].sort((a, b) =>
    new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime()
  );
}

export async function getArticlesForLanding(): Promise<LandingContentItem[]> {
  const articles = await getAllArticlesMetadata();

  return articles.slice(0, 3).map((article) => ({
    href: `/blog/${article.slug}`,
    type: 'article' as const,
    title: article.title,
    description: article.description,
    tags: article.tags.slice(0, 3),
    accentColor: BLOG_CATEGORY_INFO[article.category].accentColor,
    publishedAt: article.publishedAt,
    readingTime: article.readingTime,
  }));
}
