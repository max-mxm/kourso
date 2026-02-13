export interface SearchItem {
  type: 'guide' | 'guide-section' | 'article' | 'article-heading';
  title: string;
  description?: string;
  href: string;
  tags: string[];
  parentTitle?: string;
  keywords?: string[];
}

export interface GroupedResults {
  guides: SearchItem[];
  guideSections: SearchItem[];
  articles: SearchItem[];
  articleHeadings: SearchItem[];
}

// ---------------------------------------------------------------------------
// INDEX DE RECHERCHE
// Contient tous les guides, sections, articles et headings du site.
// A mettre a jour lors de l'ajout d'un nouveau guide ou article.
// Voir docs/guides/ajouter-un-cours.md pour le workflow complet.
// ---------------------------------------------------------------------------

const SEARCH_INDEX: SearchItem[] = [
  // ==========================================================================
  // GUIDE : Zod -- Validation TypeScript-first
  // ==========================================================================
  {
    type: 'guide',
    title: 'Zod -- Validation TypeScript-first',
    description: 'Schemas, inference de types, validation de formulaires et d\'API. De la validation basique aux patterns de production.',
    href: '/guides/zod-validation',
    tags: ['Zod', 'TypeScript', 'Validation'],
    keywords: ['schema', 'parse', 'safeParse', 'validation donnees', 'type-safe', 'formulaire', 'api'],
  },
  {
    type: 'guide-section',
    title: 'Introduction a Zod',
    href: '/guides/zod-validation#introduction',
    tags: ['Zod'],
    parentTitle: 'Zod -- Validation TypeScript-first',
    keywords: ['pourquoi zod', 'installation', 'decouverte', 'runtime validation'],
  },
  {
    type: 'guide-section',
    title: 'Schemas Primitifs et Methodes de Base',
    href: '/guides/zod-validation#primitive-schemas',
    tags: ['Zod'],
    parentTitle: 'Zod -- Validation TypeScript-first',
    keywords: ['z.string', 'z.number', 'z.boolean', 'z.date', 'primitives', 'types de base'],
  },
  {
    type: 'guide-section',
    title: 'parse, safeParse et Gestion des Erreurs',
    href: '/guides/zod-validation#parse-errors',
    tags: ['Zod'],
    parentTitle: 'Zod -- Validation TypeScript-first',
    keywords: ['safeParse', 'ZodError', 'gestion erreurs', 'error handling', 'try catch', 'validation erreur'],
  },
  {
    type: 'guide-section',
    title: 'Objets, Arrays et Types Complexes',
    href: '/guides/zod-validation#complex-types',
    tags: ['Zod'],
    parentTitle: 'Zod -- Validation TypeScript-first',
    keywords: ['z.object', 'z.array', 'z.record', 'z.tuple', 'types complexes', 'nested', 'imbrique'],
  },
  {
    type: 'guide-section',
    title: 'Schemas Composables',
    href: '/guides/zod-validation#composable-schemas',
    tags: ['Zod'],
    parentTitle: 'Zod -- Validation TypeScript-first',
    keywords: ['merge', 'extend', 'pick', 'omit', 'partial', 'composition', 'reutilisation'],
  },
  {
    type: 'guide-section',
    title: 'Transforms, Refinements et Pipes',
    href: '/guides/zod-validation#transforms-refinements',
    tags: ['Zod'],
    parentTitle: 'Zod -- Validation TypeScript-first',
    keywords: ['transform', 'refine', 'superRefine', 'pipe', 'preprocessing', 'coercion', 'transformation'],
  },
  {
    type: 'guide-section',
    title: 'Performance, Bundle Size et Alternatives',
    href: '/guides/zod-validation#performance-bundle',
    tags: ['Zod'],
    parentTitle: 'Zod -- Validation TypeScript-first',
    keywords: ['bundle size', 'taille bundle', 'valibot', 'yup', 'joi', 'alternatives', 'tree-shaking', 'performance'],
  },
  {
    type: 'guide-section',
    title: "Validation des Variables d'Environnement",
    href: '/guides/zod-validation#env-validation',
    tags: ['Zod'],
    parentTitle: 'Zod -- Validation TypeScript-first',
    keywords: ['env', 'process.env', 'variables environnement', 't3-env', 'configuration', 'dotenv'],
  },
  {
    type: 'guide-section',
    title: 'Formulaires -- React Hook Form + Zod',
    href: '/guides/zod-validation#form-validation',
    tags: ['Zod', 'React Hook Form'],
    parentTitle: 'Zod -- Validation TypeScript-first',
    keywords: ['react-hook-form', 'formulaire', 'form', 'zodResolver', 'useForm', 'validation formulaire'],
  },
  {
    type: 'guide-section',
    title: 'Next.js Server Actions et Zod',
    href: '/guides/zod-validation#server-actions',
    tags: ['Zod', 'Next.js'],
    parentTitle: 'Zod -- Validation TypeScript-first',
    keywords: ['server action', 'validation serveur', 'useActionState', 'formulaire serveur', 'next.js actions'],
  },
  {
    type: 'guide-section',
    title: 'Validation API -- Requetes et Reponses',
    href: '/guides/zod-validation#api-validation',
    tags: ['Zod', 'API'],
    parentTitle: 'Zod -- Validation TypeScript-first',
    keywords: ['api route', 'route handler', 'validation requete', 'request validation', 'response validation', 'endpoint'],
  },
  {
    type: 'guide-section',
    title: 'Patterns Avances',
    href: '/guides/zod-validation#advanced-patterns',
    tags: ['Zod'],
    parentTitle: 'Zod -- Validation TypeScript-first',
    keywords: ['discriminated union', 'recursive', 'branded types', 'generiques', 'patterns avances'],
  },
  {
    type: 'guide-section',
    title: 'Ecosysteme Zod et Migration v4',
    href: '/guides/zod-validation#ecosystem-v4',
    tags: ['Zod'],
    parentTitle: 'Zod -- Validation TypeScript-first',
    keywords: ['zod v4', 'migration', 'tRPC', 'drizzle', 'prisma', 'ecosysteme', 'librairies'],
  },

  // ==========================================================================
  // GUIDE : useMemo, useCallback et React.memo teste en live
  // ==========================================================================
  {
    type: 'guide',
    title: 'useMemo, useCallback et React.memo teste en live',
    description: 'Comparez 4 strategies d\'optimisation React avec des mesures reelles de temps de rendu.',
    href: '/guides/nextjs-demo/simulateur-performance',
    tags: ['React', 'Performance', 'Interactif'],
    keywords: ['memoisation', 'memo', 'useMemo', 'useCallback', 'React.memo', 'benchmark', 'simulateur', 'rendu', 'render time'],
  },

  // ==========================================================================
  // GUIDE : TanStack -- Ecosysteme complet React
  // ==========================================================================
  {
    type: 'guide',
    title: 'TanStack -- Ecosysteme complet React',
    description: 'Query, Router, Table, Virtual, Form, Store et Pacer. Du data fetching a l\'architecture de production.',
    href: '/guides/tanstack-react',
    tags: ['TanStack Query', 'TanStack Router', 'React'],
    keywords: ['react query', 'data fetching', 'cache', 'mutation', 'table', 'virtualisation', 'formulaire'],
  },
  {
    type: 'guide-section',
    title: "Introduction a l'ecosysteme TanStack",
    href: '/guides/tanstack-react#introduction',
    tags: ['TanStack'],
    parentTitle: 'TanStack -- Ecosysteme complet React',
    keywords: ['tanstack', 'presentation', 'vue ensemble', 'librairies'],
  },
  {
    type: 'guide-section',
    title: 'TanStack Query - Les Bases',
    href: '/guides/tanstack-react#query-basics',
    tags: ['TanStack Query'],
    parentTitle: 'TanStack -- Ecosysteme complet React',
    keywords: ['useQuery', 'queryClient', 'queryKey', 'data fetching', 'requete', 'cache', 'staleTime'],
  },
  {
    type: 'guide-section',
    title: 'Query - Options et Strategies Avancees',
    href: '/guides/tanstack-react#query-advanced',
    tags: ['TanStack Query'],
    parentTitle: 'TanStack -- Ecosysteme complet React',
    keywords: ['useInfiniteQuery', 'prefetch', 'pagination', 'parallel queries', 'dependent queries', 'select'],
  },
  {
    type: 'guide-section',
    title: 'Mutations et Invalidation du Cache',
    href: '/guides/tanstack-react#mutations-invalidation',
    tags: ['TanStack Query'],
    parentTitle: 'TanStack -- Ecosysteme complet React',
    keywords: ['useMutation', 'invalidateQueries', 'optimistic update', 'mise a jour optimiste', 'cache invalidation'],
  },
  {
    type: 'guide-section',
    title: 'Query Patterns et queryOptions',
    href: '/guides/tanstack-react#query-patterns',
    tags: ['TanStack Query'],
    parentTitle: 'TanStack -- Ecosysteme complet React',
    keywords: ['queryOptions', 'query factory', 'patterns', 'organisation', 'bonnes pratiques query'],
  },
  {
    type: 'guide-section',
    title: 'TanStack Router - Routing Type-Safe',
    href: '/guides/tanstack-react#tanstack-router',
    tags: ['TanStack Router'],
    parentTitle: 'TanStack -- Ecosysteme complet React',
    keywords: ['router', 'routing', 'type-safe routing', 'file-based routing', 'navigation', 'liens types'],
  },
  {
    type: 'guide-section',
    title: 'TanStack Table - Tableaux Headless',
    href: '/guides/tanstack-react#tanstack-table',
    tags: ['TanStack Table'],
    parentTitle: 'TanStack -- Ecosysteme complet React',
    keywords: ['table', 'tableau', 'headless', 'tri', 'sorting', 'filtrage', 'pagination table', 'colonnes'],
  },
  {
    type: 'guide-section',
    title: 'TanStack Virtual - Virtualisation 60fps',
    href: '/guides/tanstack-react#tanstack-virtual',
    tags: ['TanStack Virtual'],
    parentTitle: 'TanStack -- Ecosysteme complet React',
    keywords: ['virtualisation', 'virtual scroll', 'liste longue', 'performance liste', 'windowing', 'useVirtualizer'],
  },
  {
    type: 'guide-section',
    title: 'TanStack Form - Formulaires Performants',
    href: '/guides/tanstack-react#tanstack-form',
    tags: ['TanStack Form'],
    parentTitle: 'TanStack -- Ecosysteme complet React',
    keywords: ['formulaire', 'form', 'validation', 'useForm', 'champ', 'field', 'soumission'],
  },
  {
    type: 'guide-section',
    title: 'TanStack Store - State Reactif Minimal',
    href: '/guides/tanstack-react#tanstack-store',
    tags: ['TanStack Store'],
    parentTitle: 'TanStack -- Ecosysteme complet React',
    keywords: ['store', 'state', 'etat', 'reactif', 'signal', 'gestion etat', 'state management'],
  },
  {
    type: 'guide-section',
    title: 'TanStack Pacer - Timing et Scheduling',
    href: '/guides/tanstack-react#tanstack-pacer',
    tags: ['TanStack Pacer'],
    parentTitle: 'TanStack -- Ecosysteme complet React',
    keywords: ['debounce', 'throttle', 'rate limit', 'timing', 'scheduling', 'tempo'],
  },
  {
    type: 'guide-section',
    title: 'DevTools et Debugging',
    href: '/guides/tanstack-react#devtools',
    tags: ['TanStack'],
    parentTitle: 'TanStack -- Ecosysteme complet React',
    keywords: ['devtools', 'debug', 'react query devtools', 'inspection', 'outils developpement'],
  },
  {
    type: 'guide-section',
    title: 'SSR et Integration Next.js',
    href: '/guides/tanstack-react#ssr-nextjs',
    tags: ['TanStack Query', 'Next.js'],
    parentTitle: 'TanStack -- Ecosysteme complet React',
    keywords: ['ssr', 'server side rendering', 'next.js', 'hydration', 'prefetch serveur', 'dehydrate'],
  },
  {
    type: 'guide-section',
    title: 'Architecture de Production',
    href: '/guides/tanstack-react#architecture-production',
    tags: ['TanStack'],
    parentTitle: 'TanStack -- Ecosysteme complet React',
    keywords: ['architecture', 'production', 'structure projet', 'organisation code', 'scalable'],
  },

  // ==========================================================================
  // GUIDE : React 19 -- Bonnes pratiques seniors
  // ==========================================================================
  {
    type: 'guide',
    title: 'React 19 -- Bonnes pratiques seniors',
    description: 'Patterns avances React 19 : Compiler, Server Components, Actions. Solutions eprouvees et cas d\'usage professionnels.',
    href: '/guides/react-19-advanced',
    tags: ['React 19', 'Server Components', 'Compiler'],
    keywords: ['react 19', 'bonnes pratiques', 'senior', 'avance', 'patterns', 'nouveautes react'],
  },
  {
    type: 'guide-section',
    title: 'Introduction a React 19',
    href: '/guides/react-19-advanced#introduction',
    tags: ['React 19'],
    parentTitle: 'React 19 -- Bonnes pratiques seniors',
    keywords: ['react 19', 'nouveautes', 'migration', 'changelog', 'quoi de neuf'],
  },
  {
    type: 'guide-section',
    title: 'Hook use() & Suspense 2.0',
    href: '/guides/react-19-advanced#use-hook',
    tags: ['React 19'],
    parentTitle: 'React 19 -- Bonnes pratiques seniors',
    keywords: ['use()', 'hook use', 'suspense', 'promise', 'context', 'async', 'data fetching react'],
  },
  {
    type: 'guide-section',
    title: 'React Compiler',
    href: '/guides/react-19-advanced#react-compiler',
    tags: ['React 19', 'Compiler'],
    parentTitle: 'React 19 -- Bonnes pratiques seniors',
    keywords: ['react compiler', 'compilation', 'optimisation automatique', 'babel', 'memoisation auto', 'react forget'],
  },
  {
    type: 'guide-section',
    title: 'React Server Components (RSC)',
    href: '/guides/react-19-advanced#server-components',
    tags: ['React 19', 'RSC'],
    parentTitle: 'React 19 -- Bonnes pratiques seniors',
    keywords: ['rsc', 'server components', 'composants serveur', 'rendu serveur', 'zero bundle', 'use server'],
  },
  {
    type: 'guide-section',
    title: 'Actions & Async Transitions',
    href: '/guides/react-19-advanced#actions-transitions',
    tags: ['React 19'],
    parentTitle: 'React 19 -- Bonnes pratiques seniors',
    keywords: ['actions', 'transitions', 'useTransition', 'startTransition', 'async', 'formulaire action'],
  },
  {
    type: 'guide-section',
    title: 'useActionState & useOptimistic',
    href: '/guides/react-19-advanced#use-action-state',
    tags: ['React 19'],
    parentTitle: 'React 19 -- Bonnes pratiques seniors',
    keywords: ['useActionState', 'useOptimistic', 'optimistic update', 'mise a jour optimiste', 'form state'],
  },
  {
    type: 'guide-section',
    title: 'Streaming & Partial Pre-rendering',
    href: '/guides/react-19-advanced#streaming',
    tags: ['React 19'],
    parentTitle: 'React 19 -- Bonnes pratiques seniors',
    keywords: ['streaming', 'ppr', 'partial pre-rendering', 'suspense boundary', 'chargement progressif'],
  },
  {
    type: 'guide-section',
    title: 'Bundle Optimization',
    href: '/guides/react-19-advanced#bundle-optimization',
    tags: ['React 19'],
    parentTitle: 'React 19 -- Bonnes pratiques seniors',
    keywords: ['bundle', 'taille bundle', 'tree-shaking', 'code splitting', 'lazy loading', 'optimisation'],
  },
  {
    type: 'guide-section',
    title: 'Performance Hooks',
    href: '/guides/react-19-advanced#performance-hooks',
    tags: ['React 19'],
    parentTitle: 'React 19 -- Bonnes pratiques seniors',
    keywords: ['useMemo', 'useCallback', 'useDeferredValue', 'useTransition', 'hooks performance', 'optimisation rendu'],
  },
  {
    type: 'guide-section',
    title: 'Memory Management',
    href: '/guides/react-19-advanced#memory-management',
    tags: ['React 19'],
    parentTitle: 'React 19 -- Bonnes pratiques seniors',
    keywords: ['memoire', 'memory leak', 'fuite memoire', 'cleanup', 'useEffect cleanup', 'garbage collection'],
  },
  {
    type: 'guide-section',
    title: 'Data Fetching Patterns',
    href: '/guides/react-19-advanced#data-fetching',
    tags: ['React 19'],
    parentTitle: 'React 19 -- Bonnes pratiques seniors',
    keywords: ['data fetching', 'recuperation donnees', 'fetch', 'waterfall', 'parallel', 'preload'],
  },
  {
    type: 'guide-section',
    title: 'State Consolidation Patterns',
    href: '/guides/react-19-advanced#state-consolidation',
    tags: ['React 19'],
    parentTitle: 'React 19 -- Bonnes pratiques seniors',
    keywords: ['state', 'etat', 'consolidation', 'useReducer', 'reducer', 'gestion etat', 'simplification'],
  },
  {
    type: 'guide-section',
    title: 'Architecture Scalable',
    href: '/guides/react-19-advanced#architecture',
    tags: ['React 19'],
    parentTitle: 'React 19 -- Bonnes pratiques seniors',
    keywords: ['architecture', 'scalable', 'structure projet', 'organisation', 'dossiers', 'modules'],
  },
  {
    type: 'guide-section',
    title: 'Error Handling & Boundaries',
    href: '/guides/react-19-advanced#error-handling',
    tags: ['React 19'],
    parentTitle: 'React 19 -- Bonnes pratiques seniors',
    keywords: ['error boundary', 'gestion erreurs', 'ErrorBoundary', 'try catch', 'fallback', 'erreur'],
  },
  {
    type: 'guide-section',
    title: 'TypeScript Advanced Patterns',
    href: '/guides/react-19-advanced#typescript-patterns',
    tags: ['React 19', 'TypeScript'],
    parentTitle: 'React 19 -- Bonnes pratiques seniors',
    keywords: ['typescript', 'generiques', 'generics', 'type inference', 'discriminated union', 'typage avance'],
  },
  {
    type: 'guide-section',
    title: 'Testing Strategy',
    href: '/guides/react-19-advanced#testing-strategy',
    tags: ['React 19'],
    parentTitle: 'React 19 -- Bonnes pratiques seniors',
    keywords: ['test', 'testing', 'vitest', 'jest', 'react testing library', 'strategie test', 'tdd', 'unitaire'],
  },
  {
    type: 'guide-section',
    title: 'Accessibility (a11y)',
    href: '/guides/react-19-advanced#accessibility',
    tags: ['React 19'],
    parentTitle: 'React 19 -- Bonnes pratiques seniors',
    keywords: ['accessibilite', 'a11y', 'aria', 'wcag', 'screen reader', 'clavier', 'contraste'],
  },
  {
    type: 'guide-section',
    title: 'Custom Hooks Patterns',
    href: '/guides/react-19-advanced#custom-hooks',
    tags: ['React 19'],
    parentTitle: 'React 19 -- Bonnes pratiques seniors',
    keywords: ['custom hook', 'hooks personnalises', 'useLocalStorage', 'useFetch', 'abstraction', 'reutilisation'],
  },
  {
    type: 'guide-section',
    title: 'Refs as Props & Document Metadata',
    href: '/guides/react-19-advanced#refs-metadata',
    tags: ['React 19'],
    parentTitle: 'React 19 -- Bonnes pratiques seniors',
    keywords: ['ref', 'useRef', 'forwardRef', 'ref callback', 'metadata', 'document title', 'head', 'seo'],
  },

  // ==========================================================================
  // GUIDE : Guide Next.js 16
  // ==========================================================================
  {
    type: 'guide',
    title: 'Guide Next.js 16',
    description: 'Modes de rendu SSR, SSG, ISR et Client Components. Retours d\'experience sur des projets en production avec exemples concrets.',
    href: '/guides/nextjs-demo',
    tags: ['Next.js 16', 'React 19', 'TypeScript'],
    keywords: ['nextjs', 'next.js 16', 'app router', 'react server components', 'fullstack', 'framework'],
  },
  {
    type: 'guide-section',
    title: 'Introduction a Next.js 16',
    href: '/guides/nextjs-demo#introduction',
    tags: ['Next.js'],
    parentTitle: 'Guide Next.js 16',
    keywords: ['nextjs', 'introduction', 'presentation', 'pourquoi next.js', 'avantages'],
  },
  {
    type: 'guide-section',
    title: 'Server-Side Rendering (SSR)',
    href: '/guides/nextjs-demo#ssr',
    tags: ['Next.js', 'SSR'],
    parentTitle: 'Guide Next.js 16',
    keywords: ['ssr', 'rendu serveur', 'server side rendering', 'getServerSideProps', 'dynamic rendering', 'rendu dynamique'],
  },
  {
    type: 'guide-section',
    title: 'Static Site Generation (SSG)',
    href: '/guides/nextjs-demo#ssg',
    tags: ['Next.js', 'SSG'],
    parentTitle: 'Guide Next.js 16',
    keywords: ['ssg', 'site statique', 'static generation', 'getStaticProps', 'generateStaticParams', 'build time'],
  },
  {
    type: 'guide-section',
    title: 'Incremental Static Regeneration (ISR)',
    href: '/guides/nextjs-demo#isr',
    tags: ['Next.js', 'ISR'],
    parentTitle: 'Guide Next.js 16',
    keywords: ['isr', 'regeneration incrementale', 'revalidate', 'on-demand revalidation', 'cache', 'stale-while-revalidate'],
  },
  {
    type: 'guide-section',
    title: 'Client-Side Rendering (CSR)',
    href: '/guides/nextjs-demo#csr',
    tags: ['Next.js', 'CSR'],
    parentTitle: 'Guide Next.js 16',
    keywords: ['csr', 'rendu client', 'client side rendering', 'useEffect', 'spa', 'single page app', 'use client'],
  },
  {
    type: 'guide-section',
    title: 'Hybrid (Server + Client)',
    href: '/guides/nextjs-demo#hybrid',
    tags: ['Next.js'],
    parentTitle: 'Guide Next.js 16',
    keywords: ['hybride', 'server client', 'composition', 'island architecture', 'hydration partielle'],
  },
  {
    type: 'guide-section',
    title: 'Client Components',
    href: '/guides/nextjs-demo#client-components',
    tags: ['Next.js'],
    parentTitle: 'Guide Next.js 16',
    keywords: ['client component', 'use client', 'composant client', 'interactivite', 'hooks', 'useState'],
  },
  {
    type: 'guide-section',
    title: 'Dynamic Import & Code Splitting',
    href: '/guides/nextjs-demo#dynamic-import',
    tags: ['Next.js'],
    parentTitle: 'Guide Next.js 16',
    keywords: ['dynamic import', 'code splitting', 'next/dynamic', 'lazy loading', 'chargement dynamique', 'bundle splitting'],
  },
  {
    type: 'guide-section',
    title: 'Server Actions',
    href: '/guides/nextjs-demo#server-actions',
    tags: ['Next.js'],
    parentTitle: 'Guide Next.js 16',
    keywords: ['server action', 'use server', 'action serveur', 'formulaire', 'mutation', 'revalidatePath'],
  },
  {
    type: 'guide-section',
    title: 'Streaming & Suspense',
    href: '/guides/nextjs-demo#streaming',
    tags: ['Next.js'],
    parentTitle: 'Guide Next.js 16',
    keywords: ['streaming', 'suspense', 'loading.tsx', 'chargement progressif', 'skeleton', 'fallback'],
  },
  {
    type: 'guide-section',
    title: 'Performance Frontend',
    href: '/guides/nextjs-demo#frontend-performance',
    tags: ['Next.js'],
    parentTitle: 'Guide Next.js 16',
    keywords: ['performance frontend', 'lcp', 'fcp', 'cls', 'core web vitals', 'lighthouse', 'optimisation client'],
  },
  {
    type: 'guide-section',
    title: 'Performance Backend',
    href: '/guides/nextjs-demo#backend-performance',
    tags: ['Next.js'],
    parentTitle: 'Guide Next.js 16',
    keywords: ['performance backend', 'cache serveur', 'database', 'api', 'ttfb', 'edge runtime', 'middleware'],
  },
  {
    type: 'guide-section',
    title: 'Mesure de Performance',
    href: '/guides/nextjs-demo#performance-measurement',
    tags: ['Next.js'],
    parentTitle: 'Guide Next.js 16',
    keywords: ['mesure performance', 'web vitals', 'lighthouse', 'profiling', 'devtools', 'analyse performance'],
  },
  {
    type: 'guide-section',
    title: 'Securite',
    href: '/guides/nextjs-demo#security',
    tags: ['Next.js'],
    parentTitle: 'Guide Next.js 16',
    keywords: ['securite', 'security', 'xss', 'csrf', 'injection', 'headers', 'csp', 'content security policy'],
  },
  {
    type: 'guide-section',
    title: 'React Best Practices',
    href: '/guides/nextjs-demo#react-patterns',
    tags: ['Next.js', 'React'],
    parentTitle: 'Guide Next.js 16',
    keywords: ['bonnes pratiques', 'best practices', 'patterns react', 'conventions', 'clean code'],
  },
  {
    type: 'guide-section',
    title: 'Composition Patterns',
    href: '/guides/nextjs-demo#composition',
    tags: ['Next.js', 'React'],
    parentTitle: 'Guide Next.js 16',
    keywords: ['composition', 'children', 'render props', 'compound components', 'slots', 'inversion de controle'],
  },
  {
    type: 'guide-section',
    title: 'Architecture',
    href: '/guides/nextjs-demo#architecture',
    tags: ['Next.js'],
    parentTitle: 'Guide Next.js 16',
    keywords: ['architecture', 'structure projet', 'dossiers', 'organisation', 'modules', 'layers'],
  },
  {
    type: 'guide-section',
    title: 'Accessibilite (a11y)',
    href: '/guides/nextjs-demo#accessibility',
    tags: ['Next.js'],
    parentTitle: 'Guide Next.js 16',
    keywords: ['accessibilite', 'a11y', 'aria', 'wcag', 'screen reader', 'clavier', 'contraste'],
  },
  {
    type: 'guide-section',
    title: 'Patterns Avances',
    href: '/guides/nextjs-demo#advanced-patterns',
    tags: ['Next.js'],
    parentTitle: 'Guide Next.js 16',
    keywords: ['patterns avances', 'middleware', 'intercepting routes', 'parallel routes', 'route groups'],
  },
  {
    type: 'guide-section',
    title: 'Comparaison & Conclusion',
    href: '/guides/nextjs-demo#comparison',
    tags: ['Next.js'],
    parentTitle: 'Guide Next.js 16',
    keywords: ['comparaison', 'conclusion', 'recapitulatif', 'quand utiliser', 'choix rendu'],
  },

  // ==========================================================================
  // GUIDE : useMemo, useCallback et React.memo
  // ==========================================================================
  {
    type: 'guide',
    title: 'useMemo, useCallback et React.memo',
    description: 'Comprendre les 3 mecanismes de memoisation React avec des exemples concrets et testables.',
    href: '/guides/react-memoization',
    tags: ['React', 'Performance', 'Hooks'],
    keywords: ['memoisation', 'memo', 'useMemo', 'useCallback', 'React.memo', 'performance', 're-render', 'optimisation'],
  },
  {
    type: 'guide-section',
    title: 'Introduction a la Memoisation React',
    href: '/guides/react-memoization#introduction',
    tags: ['React'],
    parentTitle: 'useMemo, useCallback et React.memo',
    keywords: ['memoisation', 'introduction', 'pourquoi memoiser', 'concept', 'cache'],
  },
  {
    type: 'guide-section',
    title: 'Le Probleme du Re-render',
    href: '/guides/react-memoization#probleme-re-render',
    tags: ['React'],
    parentTitle: 'useMemo, useCallback et React.memo',
    keywords: ['re-render', 'rendu', 'render inutile', 'reconciliation', 'virtual dom', 'performance rendu'],
  },
  {
    type: 'guide-section',
    title: 'React.memo - Memoiser un Composant',
    href: '/guides/react-memoization#react-memo',
    tags: ['React'],
    parentTitle: 'useMemo, useCallback et React.memo',
    keywords: ['React.memo', 'memo', 'HOC', 'higher order component', 'shallow comparison', 'composant memo'],
  },
  {
    type: 'guide-section',
    title: 'useMemo - Memoiser une Valeur',
    href: '/guides/react-memoization#usememo',
    tags: ['React'],
    parentTitle: 'useMemo, useCallback et React.memo',
    keywords: ['useMemo', 'valeur calculee', 'calcul couteux', 'memoisation valeur', 'dependances'],
  },
  {
    type: 'guide-section',
    title: 'useCallback - Memoiser une Fonction',
    href: '/guides/react-memoization#usecallback',
    tags: ['React'],
    parentTitle: 'useMemo, useCallback et React.memo',
    keywords: ['useCallback', 'fonction memoisee', 'callback stable', 'reference stable', 'dependances'],
  },
  {
    type: 'guide-section',
    title: 'Le Trio en Action - Exemple Complet',
    href: '/guides/react-memoization#trio-en-action',
    tags: ['React'],
    parentTitle: 'useMemo, useCallback et React.memo',
    keywords: ['trio', 'exemple complet', 'combinaison', 'cas pratique', 'useMemo useCallback memo'],
  },
  {
    type: 'guide-section',
    title: 'Comparaison Complete des Trois',
    href: '/guides/react-memoization#comparaison-complete',
    tags: ['React'],
    parentTitle: 'useMemo, useCallback et React.memo',
    keywords: ['comparaison', 'difference', 'quand utiliser', 'tableau comparatif', 'memo vs useMemo vs useCallback'],
  },
  {
    type: 'guide-section',
    title: 'Erreurs Courantes et Anti-Patterns',
    href: '/guides/react-memoization#erreurs-courantes',
    tags: ['React'],
    parentTitle: 'useMemo, useCallback et React.memo',
    keywords: ['erreurs', 'anti-pattern', 'pieges', 'mauvaises pratiques', 'common mistakes'],
  },
  {
    type: 'guide-section',
    title: 'Quand ne PAS Memoiser',
    href: '/guides/react-memoization#quand-ne-pas-memoiser',
    tags: ['React'],
    parentTitle: 'useMemo, useCallback et React.memo',
    keywords: ['quand ne pas', 'over-optimization', 'premature optimization', 'cout memoisation'],
  },
  {
    type: 'guide-section',
    title: "React Compiler et l'Avenir",
    href: '/guides/react-memoization#react-compiler',
    tags: ['React'],
    parentTitle: 'useMemo, useCallback et React.memo',
    keywords: ['react compiler', 'futur', 'memoisation automatique', 'react forget', 'avenir'],
  },

  // ==========================================================================
  // ARTICLE : Pourquoi le TDD cote front n'est pas aussi facile que le TDD cote back
  // ==========================================================================
  {
    type: 'article',
    title: "Pourquoi le TDD cote front n'est pas aussi facile que le TDD cote back",
    description: 'Une analyse approfondie des defis specifiques du Test-Driven Development en frontend, compare aux pratiques backend etablies.',
    href: '/blog/tdd-frontend-vs-backend',
    tags: ['TDD', 'Frontend', 'Testing', 'Best Practices'],
    keywords: ['test driven development', 'tdd', 'test', 'frontend testing', 'backend testing', 'vitest', 'jest', 'testing library'],
  },
  {
    type: 'article-heading',
    title: 'Introduction',
    href: '/blog/tdd-frontend-vs-backend#introduction',
    tags: ['TDD'],
    parentTitle: "TDD cote front vs back",
    keywords: ['tdd', 'introduction', 'contexte'],
  },
  {
    type: 'article-heading',
    title: 'Le probleme du rendu visuel',
    href: '/blog/tdd-frontend-vs-backend#le-probleme-visuel',
    tags: ['TDD', 'Frontend'],
    parentTitle: "TDD cote front vs back",
    keywords: ['rendu visuel', 'ui testing', 'visual testing', 'snapshot', 'dom'],
  },
  {
    type: 'article-heading',
    title: 'Les defis specifiques au frontend',
    href: '/blog/tdd-frontend-vs-backend#les-defis-specifiques',
    tags: ['TDD', 'Frontend'],
    parentTitle: "TDD cote front vs back",
    keywords: ['defis', 'difficultes', 'specificites frontend'],
  },
  {
    type: 'article-heading',
    title: '1. Etat asynchrone omnipresent',
    href: '/blog/tdd-frontend-vs-backend#etat-asynchrone',
    tags: ['TDD'],
    parentTitle: "TDD cote front vs back",
    keywords: ['asynchrone', 'async', 'state', 'etat', 'promise', 'await'],
  },
  {
    type: 'article-heading',
    title: '2. Complexite des interactions utilisateur',
    href: '/blog/tdd-frontend-vs-backend#interactions-utilisateur',
    tags: ['TDD'],
    parentTitle: "TDD cote front vs back",
    keywords: ['interactions', 'evenements', 'click', 'user event', 'formulaire'],
  },
  {
    type: 'article-heading',
    title: '3. Le DOM et le CSS',
    href: '/blog/tdd-frontend-vs-backend#dom-et-css',
    tags: ['TDD'],
    parentTitle: "TDD cote front vs back",
    keywords: ['dom', 'css', 'style', 'layout', 'responsive', 'media query'],
  },
  {
    type: 'article-heading',
    title: '4. Mocks et dependances externes',
    href: '/blog/tdd-frontend-vs-backend#mocks-complexes',
    tags: ['TDD'],
    parentTitle: "TDD cote front vs back",
    keywords: ['mock', 'stub', 'spy', 'dependances', 'api mock', 'msw'],
  },
  {
    type: 'article-heading',
    title: '5. Separation des preoccupations',
    href: '/blog/tdd-frontend-vs-backend#separation-concerns',
    tags: ['TDD'],
    parentTitle: "TDD cote front vs back",
    keywords: ['separation of concerns', 'solid', 'architecture', 'decouplage', 'responsabilite'],
  },
  {
    type: 'article-heading',
    title: 'Pourquoi continuer malgre tout ?',
    href: '/blog/tdd-frontend-vs-backend#pourquoi-continuer',
    tags: ['TDD'],
    parentTitle: "TDD cote front vs back",
    keywords: ['motivation', 'avantages tdd', 'benefices', 'qualite code'],
  },
  {
    type: 'article-heading',
    title: 'Conclusion',
    href: '/blog/tdd-frontend-vs-backend#conclusion',
    tags: ['TDD'],
    parentTitle: "TDD cote front vs back",
    keywords: ['conclusion', 'resume', 'synthese'],
  },

  // ==========================================================================
  // ARTICLE : Redux vs React Context vs Zustand
  // ==========================================================================
  {
    type: 'article',
    title: 'Redux vs React Context vs Zustand : quel state management choisir ?',
    description: 'Comparaison technique de trois approches de gestion d\'etat en React.',
    href: '/blog/redux-vs-context-vs-zustand',
    tags: ['React', 'State Management', 'Redux', 'Zustand', 'Context API'],
    keywords: ['state management', 'gestion etat', 'store', 'flux', 'comparaison', 'choix technique'],
  },
  {
    type: 'article-heading',
    title: 'Introduction',
    href: '/blog/redux-vs-context-vs-zustand#introduction',
    tags: ['State Management'],
    parentTitle: 'Redux vs Context vs Zustand',
    keywords: ['state management', 'introduction', 'contexte', 'problematique'],
  },
  {
    type: 'article-heading',
    title: 'React Context API',
    href: '/blog/redux-vs-context-vs-zustand#react-context',
    tags: ['Context API'],
    parentTitle: 'Redux vs Context vs Zustand',
    keywords: ['useContext', 'provider', 'consumer', 'createContext', 'context api'],
  },
  {
    type: 'article-heading',
    title: 'Les limites de Context',
    href: '/blog/redux-vs-context-vs-zustand#context-limites',
    tags: ['Context API'],
    parentTitle: 'Redux vs Context vs Zustand',
    keywords: ['limites context', 're-render', 'performance context', 'problemes'],
  },
  {
    type: 'article-heading',
    title: 'Redux Toolkit',
    href: '/blog/redux-vs-context-vs-zustand#redux-toolkit',
    tags: ['Redux'],
    parentTitle: 'Redux vs Context vs Zustand',
    keywords: ['redux toolkit', 'rtk', 'createSlice', 'configureStore', 'reducer', 'action'],
  },
  {
    type: 'article-heading',
    title: 'Quand Redux est pertinent',
    href: '/blog/redux-vs-context-vs-zustand#redux-quand',
    tags: ['Redux'],
    parentTitle: 'Redux vs Context vs Zustand',
    keywords: ['quand redux', 'cas usage', 'grande application', 'devtools', 'middleware'],
  },
  {
    type: 'article-heading',
    title: 'Zustand',
    href: '/blog/redux-vs-context-vs-zustand#zustand',
    tags: ['Zustand'],
    parentTitle: 'Redux vs Context vs Zustand',
    keywords: ['zustand', 'create', 'store minimal', 'lightweight', 'simple'],
  },
  {
    type: 'article-heading',
    title: 'Pourquoi Zustand seduit',
    href: '/blog/redux-vs-context-vs-zustand#zustand-avantages',
    tags: ['Zustand'],
    parentTitle: 'Redux vs Context vs Zustand',
    keywords: ['avantages zustand', 'simplicite', 'boilerplate', 'performance zustand'],
  },
  {
    type: 'article-heading',
    title: 'Comparaison directe',
    href: '/blog/redux-vs-context-vs-zustand#comparaison',
    tags: ['State Management'],
    parentTitle: 'Redux vs Context vs Zustand',
    keywords: ['comparaison', 'tableau', 'versus', 'benchmark', 'performance'],
  },
  {
    type: 'article-heading',
    title: 'Impact de React 19',
    href: '/blog/redux-vs-context-vs-zustand#react-19',
    tags: ['React 19', 'State Management'],
    parentTitle: 'Redux vs Context vs Zustand',
    keywords: ['react 19', 'impact', 'use()', 'server components', 'avenir state management'],
  },
  {
    type: 'article-heading',
    title: 'Guide de choix par projet',
    href: '/blog/redux-vs-context-vs-zustand#guide-choix',
    tags: ['State Management'],
    parentTitle: 'Redux vs Context vs Zustand',
    keywords: ['guide choix', 'decision', 'quel choisir', 'recommandation', 'taille projet'],
  },
  {
    type: 'article-heading',
    title: 'Conclusion',
    href: '/blog/redux-vs-context-vs-zustand#conclusion',
    tags: ['State Management'],
    parentTitle: 'Redux vs Context vs Zustand',
    keywords: ['conclusion', 'resume', 'synthese', 'recommandation finale'],
  },
];

// ---------------------------------------------------------------------------
// LOGIQUE DE RECHERCHE
// ---------------------------------------------------------------------------

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function searchItems(query: string): GroupedResults {
  const empty: GroupedResults = {
    guides: [],
    guideSections: [],
    articles: [],
    articleHeadings: [],
  };

  if (!query || query.length < 2) return empty;

  const normalizedQuery = normalize(query);
  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  const matches = SEARCH_INDEX.filter((item) => {
    const searchableText = normalize(
      [
        item.title,
        item.description,
        item.parentTitle,
        ...item.tags,
        ...(item.keywords ?? []),
      ]
        .filter(Boolean)
        .join(' ')
    );
    return terms.every((term) => searchableText.includes(term));
  });

  return {
    guides: matches.filter((i) => i.type === 'guide').slice(0, 5),
    guideSections: matches.filter((i) => i.type === 'guide-section').slice(0, 5),
    articles: matches.filter((i) => i.type === 'article').slice(0, 3),
    articleHeadings: matches.filter((i) => i.type === 'article-heading').slice(0, 5),
  };
}
