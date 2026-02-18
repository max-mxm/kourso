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
  // SEO & Open Graph
  seoTitle?: string;
  seoDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterTitle?: string;
  twitterDescription?: string;
}

// Ordre : du plus recent au plus ancien
const GUIDES: LandingContentItem[] = [
  {
    href: '/guides/architecture-hexagonale',
    type: 'guide',
    title: 'Architecture Hexagonale : decouplez votre metier des frameworks',
    description:
      'Ports & Adapters en pratique avec schemas, TypeScript et Next.js. Construisez un domaine testable, stable et independant de votre infrastructure.',
    tags: ['Architecture', 'TypeScript', 'Next.js', 'Testing'],
    accentColor: 'rgb(14, 116, 144)',
    sections: 9,
    duration: '2h30',
    level: 'Intermediaire',
    publishedAt: '2026-02-18',
    seoTitle: 'Architecture Hexagonale : Guide Complet Ports & Adapters',
    seoDescription: 'Apprenez l architecture hexagonale avec schemas, use cases, ports, adapters, tests et demo interactive en TypeScript.',
    ogTitle: 'Architecture Hexagonale : decoupler metier et infrastructure',
    ogDescription: 'Guide pratique Ports & Adapters avec schemas, implementation TypeScript/Next.js et demo interactive.',
    ogImage: '/api/og?title=Architecture+Hexagonale+:+Ports+%26+Adapters&category=best-practices',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Architecture Hexagonale : Guide Complet',
    twitterDescription: 'Ports, adapters, tests et migration progressive en TypeScript avec demo interactive.',
  },
  {
    href: '/guides/zod-validation',
    type: 'guide',
    title: 'Zod : La validation TypeScript que vous auriez dû utiliser depuis le début',
    description:
      'Schemas, inference de types, validation de formulaires et d\'API. De la validation basique aux patterns de production. Reduisez les bugs runtime de 70% avec une validation type-safe.',
    tags: ['Zod', 'TypeScript', 'Validation', 'Type Safety', 'Runtime'],
    accentColor: 'rgb(59, 130, 246)',
    sections: 13,
    duration: '3h',
    level: 'Intermediaire',
    publishedAt: '2026-02-13',
    seoTitle: 'Zod TypeScript : Guide Complet 2026 - Validation Type-Safe',
    seoDescription: 'Maitrisez Zod pour valider vos donnees TypeScript. Schemas, inference de types, validation de formulaires et API. Guide pratique avec exemples concrets.',
    ogTitle: 'Zod : La validation TypeScript que vous auriez du utiliser',
    ogDescription: 'Guide complet : schemas, inference de types, validation de formulaires et d\'API. Reduisez les bugs runtime de 70%.',
    ogImage: '/og-images/guides/zod-validation.jpg',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Zod : Guide Complet de Validation TypeScript',
    twitterDescription: 'Schemas, inference de types, validation de formulaires et API. Guide pratique avec exemples concrets.',
  },
  {
    href: '/guides/tanstack-react',
    type: 'guide',
    title: 'TanStack : Comment éliminer 80% de votre boilerplate React',
    description:
      'Query, Router, Table, Virtual, Form, Store et Pacer. Du data fetching a l\'architecture de production. Simplifiez vos apps React avec 7 librairies headless essentielles.',
    tags: ['TanStack Query', 'TanStack Router', 'React'],
    accentColor: 'rgb(249, 115, 22)',
    sections: 14,
    duration: '4h',
    level: 'Intermediaire',
    publishedAt: '2026-02-10',
    seoTitle: 'TanStack React : Guide Complet Query, Router, Table, Virtual',
    seoDescription: '7 librairies TanStack pour eliminer le boilerplate React. Data fetching, routing type-safe, tableaux headless, virtualisation. Architecture de production.',
    ogTitle: 'TanStack : Eliminez 80% de votre boilerplate React',
    ogDescription: 'Query, Router, Table, Virtual, Form, Store et Pacer. Du data fetching a l\'architecture de production avec 7 librairies headless.',
    ogImage: '/og-images/guides/tanstack-react.jpg',
    twitterCard: 'summary_large_image',
    twitterTitle: 'TanStack React : 7 Librairies Headless Essentielles',
    twitterDescription: 'Query, Router, Table, Virtual, Form, Store, Pacer. Simplifiez vos apps React avec des librairies headless puissantes.',
  },
  {
    href: '/guides/react-19-advanced',
    type: 'guide',
    title: 'React 19 : Ce que les devs seniors font (et que vous devriez copier)',
    description:
      'Patterns avances React 19 : Compiler, Server Components, Actions. Solutions eprouvees et cas d\'usage professionnels. Maitrisez use(), useActionState, RSC et le React Compiler.',
    tags: ['React 19', 'Server Components', 'Compiler'],
    accentColor: 'rgb(168, 85, 247)',
    sections: 19,
    duration: '4h',
    level: 'Avance',
    publishedAt: '2026-02-07',
    seoTitle: 'React 19 : Patterns Avances Server Components & Compiler',
    seoDescription: 'Patterns React 19 professionnels. use(), useActionState, useOptimistic, Server Components, React Compiler. Solutions eprouvees en production.',
    ogTitle: 'React 19 : Patterns des Devs Seniors',
    ogDescription: 'Compiler, Server Components, Actions, Streaming. Patterns avances React 19 et cas d\'usage professionnels eprouves en production.',
    ogImage: '/og-images/guides/react-19-advanced.jpg',
    twitterCard: 'summary_large_image',
    twitterTitle: 'React 19 : Patterns Avances en Production',
    twitterDescription: 'Compiler, Server Components, Actions. Solutions professionnelles React 19 eprouvees en production.',
  },
  {
    href: '/guides/nextjs-demo',
    type: 'guide',
    title: 'Next.js 16 : Les erreurs que j\'ai faites pour que vous ne les fassiez pas',
    description:
      'Modes de rendu SSR, SSG, ISR et Client Components. Retours d\'experience sur des projets en production avec exemples concrets. Choisissez le bon rendering mode pour chaque cas.',
    tags: ['Next.js 16', 'React 19', 'TypeScript'],
    accentColor: 'rgb(0, 150, 136)',
    badge: 'POPULAIRE',
    sections: 21,
    duration: '3h',
    level: 'Intermediaire',
    publishedAt: '2026-02-03',
    seoTitle: 'Next.js 16 : SSR, SSG, ISR - Guide Complet des Rendering Modes',
    seoDescription: 'Maitrisez les 5 modes de rendu Next.js 16. SSR, SSG, ISR, CSR, Streaming. Retours d\'experience production avec exemples concrets et Core Web Vitals.',
    ogTitle: 'Next.js 16 : Les Erreurs a Eviter en Production',
    ogDescription: 'SSR, SSG, ISR, Client Components, Streaming. Retours d\'experience sur des projets Next.js en production avec exemples concrets.',
    ogImage: '/og-images/guides/nextjs-demo.jpg',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Next.js 16 : Rendering Modes en Production',
    twitterDescription: 'SSR, SSG, ISR, CSR, Streaming. Guide pratique avec retours d\'experience et exemples concrets.',
  },
  {
    href: '/guides/react-memoization',
    type: 'guide',
    title: 'Mémoisation React : Pourquoi vos optimisations ralentissent votre app',
    description:
      'Comprendre les 3 mecanismes de memoisation React avec des exemples concrets et testables. React.memo, useMemo, useCallback : quand utiliser quoi et eviter l\'over-optimization.',
    tags: ['React', 'Performance', 'Hooks'],
    accentColor: 'rgb(59, 130, 246)',
    sections: 10,
    duration: '2h',
    level: 'Intermediaire',
    publishedAt: '2026-01-28',
    seoTitle: 'React Memoisation : React.memo, useMemo, useCallback Expliques',
    seoDescription: '3 mecanismes de memoisation React expliques. Quand utiliser React.memo, useMemo, useCallback. Evitez l\'over-optimization avec exemples concrets.',
    ogTitle: 'Memoisation React : Optimisez Sans Ralentir',
    ogDescription: 'React.memo, useMemo, useCallback : les 3 mecanismes expliques. Exemples concrets et testables pour eviter l\'over-optimization.',
    ogImage: '/og-images/guides/react-memoization.jpg',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Memoisation React : Le Guide Complet',
    twitterDescription: 'React.memo, useMemo, useCallback : quand utiliser quoi. Exemples concrets et erreurs a eviter.',
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
    href: '/demos/simulateur-architecture-hexagonale',
    title: 'Architecture hexagonale : testez le swap d adapters en direct',
    description:
      'Lancez un use case metier et changez les adapters de paiement/repository sans modifier le domaine. Visualisez timeline et resultat.',
    tags: ['Architecture', 'React', 'TypeScript'],
    accentColor: 'rgb(14, 116, 144)',
    gradientFrom: 'from-cyan-500',
    gradientTo: 'to-emerald-500',
    badge: 'INTERACTIF',
    duration: '8min',
    relatedGuide: '/guides/architecture-hexagonale',
  },
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
