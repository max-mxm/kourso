import { getAllArticlesMetadata } from '@/lib/blog/get-articles';
import { BLOG_CATEGORY_INFO } from '@/lib/blog/constants';

export interface LandingContentItem {
  href: string;
  type: 'guide' | 'article' | 'demo';
  title: string;
  description: string;
  tags: string[];
  accentColor: string;
  badge?: string;
  sections?: number;
  duration?: string;
  level?: string;
  publishedAt?: string;
  readingTime?: number;
}

// Ordre : du plus recent au plus ancien
const GUIDES: LandingContentItem[] = [
  {
    href: '/guides/zod-validation',
    type: 'guide',
    title: 'Zod : La validation TypeScript que vous auriez dû utiliser depuis le début',
    description:
      'Schemas, inference de types, validation de formulaires et d\'API. De la validation basique aux patterns de production.',
    tags: ['Zod', 'TypeScript', 'Validation'],
    accentColor: 'rgb(59, 130, 246)',
    sections: 13,
    duration: '3h',
    level: 'Intermediaire',
    publishedAt: '2026-02-13',
  },
  {
    href: '/guides/tanstack-react',
    type: 'guide',
    title: 'TanStack : Comment éliminer 80% de votre boilerplate React',
    description:
      'Query, Router, Table, Virtual, Form, Store et Pacer. Du data fetching a l\'architecture de production.',
    tags: ['TanStack Query', 'TanStack Router', 'React'],
    accentColor: 'rgb(249, 115, 22)',
    sections: 14,
    duration: '4h',
    level: 'Intermediaire',
    publishedAt: '2026-02-10',
  },
  {
    href: '/guides/react-19-advanced',
    type: 'guide',
    title: 'React 19 : Ce que les devs seniors font (et que vous devriez copier)',
    description:
      'Patterns avances React 19 : Compiler, Server Components, Actions. Solutions eprouvees et cas d\'usage professionnels.',
    tags: ['React 19', 'Server Components', 'Compiler'],
    accentColor: 'rgb(168, 85, 247)',
    sections: 19,
    duration: '4h',
    level: 'Avance',
    publishedAt: '2026-02-07',
  },
  {
    href: '/guides/nextjs-demo',
    type: 'guide',
    title: 'Next.js 16 : Les erreurs que j\'ai faites pour que vous ne les fassiez pas',
    description:
      'Modes de rendu SSR, SSG, ISR et Client Components. Retours d\'experience sur des projets en production avec exemples concrets.',
    tags: ['Next.js 16', 'React 19', 'TypeScript'],
    accentColor: 'rgb(0, 150, 136)',
    badge: 'POPULAIRE',
    sections: 21,
    duration: '3h',
    level: 'Intermediaire',
    publishedAt: '2026-02-03',
  },
  {
    href: '/guides/react-memoization',
    type: 'guide',
    title: 'Mémoisation React : Pourquoi vos optimisations ralentissent votre app',
    description:
      'Comprendre les 3 mecanismes de memoisation React avec des exemples concrets et testables.',
    tags: ['React', 'Performance', 'Hooks'],
    accentColor: 'rgb(59, 130, 246)',
    sections: 10,
    duration: '2h',
    level: 'Intermediaire',
    publishedAt: '2026-01-28',
  },
];

export interface LandingDemoItem {
  href: string;
  title: string;
  description: string;
  tags: string[];
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  badge: string;
  duration: string;
  relatedGuide: string;
}

const DEMOS: LandingDemoItem[] = [
  {
    href: '/demos/simulateur-performance',
    title: 'useMemo, useCallback, React.memo : quand utiliser quoi ? Testez en direct',
    description:
      'Comparez 4 strategies d\'optimisation React avec des mesures reelles de temps de rendu. Testez React.memo, useMemo et useCallback en live.',
    tags: ['React', 'Performance', 'Mesures reelles'],
    accentColor: 'rgb(249, 115, 22)',
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-amber-500',
    badge: 'INTERACTIF',
    duration: '10min',
    relatedGuide: '/guides/react-memoization',
  },
  {
    href: '/demos/simulateur-rendering',
    title: 'SSR, SSG, ISR : lequel choisir pour votre cas ? Testez en direct',
    description:
      'Visualisez les differences entre SSR, SSG, ISR, CSR et Streaming. Timelines animees et metriques Core Web Vitals en temps reel.',
    tags: ['Next.js', 'SSR', 'Core Web Vitals'],
    accentColor: 'rgb(59, 130, 246)',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-cyan-500',
    badge: 'INTERACTIF',
    duration: '5min',
    relatedGuide: '/guides/nextjs-demo',
  },
];

// Demos converties en LandingContentItem pour le catalogue
const DEMOS_AS_CONTENT: LandingContentItem[] = DEMOS.map((demo) => ({
  href: demo.href,
  type: 'demo' as const,
  title: demo.title,
  description: demo.description,
  tags: demo.tags,
  accentColor: demo.accentColor,
  badge: demo.badge,
  duration: demo.duration,
  level: 'Tous niveaux',
}));

export function getDemosForLanding(): LandingDemoItem[] {
  return DEMOS;
}

export function getGuidesForLanding(): LandingContentItem[] {
  return [...GUIDES].sort((a, b) =>
    new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime()
  );
}

export function getGuidesForCatalog(): LandingContentItem[] {
  const all = [...GUIDES, ...DEMOS_AS_CONTENT];
  return all.sort((a, b) => {
    // Items sans publishedAt en dernier
    if (!a.publishedAt && !b.publishedAt) return 0;
    if (!a.publishedAt) return 1;
    if (!b.publishedAt) return -1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export function getDemosForCatalog(): LandingContentItem[] {
  return [...DEMOS_AS_CONTENT].sort((a, b) => {
    // Items sans publishedAt en dernier
    if (!a.publishedAt && !b.publishedAt) return 0;
    if (!a.publishedAt) return 1;
    if (!b.publishedAt) return -1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export function getGuidesOnlyForCatalog(): LandingContentItem[] {
  return [...GUIDES].sort((a, b) => {
    // Items sans publishedAt en dernier
    if (!a.publishedAt && !b.publishedAt) return 0;
    if (!a.publishedAt) return 1;
    if (!b.publishedAt) return -1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
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
