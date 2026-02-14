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
  // GUIDE : Zod : La validation TypeScript que vous auriez dû utiliser depuis le début
  // ==========================================================================
  {
    type: 'guide',
    title: 'Zod : La validation TypeScript que vous auriez dû utiliser depuis le début',
    description: 'Schemas, inference de types, validation de formulaires et d\'API. De la validation basique aux patterns de production.',
    href: '/guides/zod-validation',
    tags: ['Zod', 'TypeScript', 'Validation'],
    keywords: ['schema', 'parse', 'safeParse', 'z.object', 'z.string', 'z.infer', 'z.enum', 'z.lazy', 'z.brand', 'z.transform', 'z.refine', 'runtime validation', 'type inference', 'type erasure', 'validation donnees', 'type-safe', 'formulaire', 'api', 'zod v4'],
  },
  {
    type: 'guide-section',
    title: 'Introduction a Zod',
    href: '/guides/zod-validation#introduction',
    tags: ['Zod'],
    parentTitle: 'Zod : La validation TypeScript que vous auriez dû utiliser depuis le début',
    keywords: ['pourquoi zod', 'installation', 'type erasure', 'tsc', 'runtime validation'],
  },
  {
    type: 'guide-section',
    title: 'Schemas Primitifs et Methodes de Base',
    href: '/guides/zod-validation#primitive-schemas',
    tags: ['Zod'],
    parentTitle: 'Zod : La validation TypeScript que vous auriez dû utiliser depuis le début',
    keywords: ['z.string', 'z.number', 'z.boolean', 'z.date', 'z.bigint', 'z.literal', 'z.coerce', 'z.undefined', 'z.null', 'z.void', 'z.unknown', 'z.never', '.email', '.url', '.uuid', '.ip', '.cidr', '.emoji', '.datetime', '.nanoid', '.regex', '.min', '.max', '.trim', '.toLowerCase', '.optional', '.nullable', '.default', 'z.enum'],
  },
  {
    type: 'guide-section',
    title: 'parse, safeParse et Gestion des Erreurs',
    href: '/guides/zod-validation#parse-errors',
    tags: ['Zod'],
    parentTitle: 'Zod : La validation TypeScript que vous auriez dû utiliser depuis le début',
    keywords: ['.parse', '.parseAsync', 'safeParse', 'ZodError', 'flatten', 'format', '.issues', 'ZodIssueCode', 'setErrorMap', 'error handling'],
  },
  {
    type: 'guide-section',
    title: 'Objets, Arrays et Types Complexes',
    href: '/guides/zod-validation#complex-types',
    tags: ['Zod'],
    parentTitle: 'Zod : La validation TypeScript que vous auriez dû utiliser depuis le début',
    keywords: ['z.object', 'z.array', 'z.record', 'z.tuple', 'z.union', 'z.discriminatedUnion', 'z.intersection', 'z.nativeEnum', '.strict', '.passthrough', '.catchall'],
  },
  {
    type: 'guide-section',
    title: 'Schemas Composables',
    href: '/guides/zod-validation#composable-schemas',
    tags: ['Zod'],
    parentTitle: 'Zod : La validation TypeScript que vous auriez dû utiliser depuis le début',
    keywords: ['merge', 'extend', 'pick', 'omit', 'partial', '.required', 'z.input', 'z.output', 'standard schema', '.deepPartial', 'schema composition', 'reusable schemas'],
  },
  {
    type: 'guide-section',
    title: 'Transforms, Refinements et Pipes',
    href: '/guides/zod-validation#transforms-refinements',
    tags: ['Zod'],
    parentTitle: 'Zod : La validation TypeScript que vous auriez dû utiliser depuis le début',
    keywords: ['transform', 'refine', 'superRefine', 'pipe', 'z.preprocess', 'z.coerce', 'z.custom', 'z.brand', 'preprocessing', 'coercion'],
  },
  {
    type: 'guide-section',
    title: 'Performance, Bundle Size et Alternatives',
    href: '/guides/zod-validation#performance-bundle',
    tags: ['Zod'],
    parentTitle: 'Zod : La validation TypeScript que vous auriez dû utiliser depuis le début',
    keywords: ['bundle size', 'valibot', 'yup', 'joi', 'arktype', 'io-ts', 'superstruct', 'tree-shaking', 'ops/sec', 'gzipped'],
  },
  {
    type: 'guide-section',
    title: "Validation des Variables d'Environnement",
    href: '/guides/zod-validation#env-validation',
    tags: ['Zod'],
    parentTitle: 'Zod : La validation TypeScript que vous auriez dû utiliser depuis le début',
    keywords: ['env', 'process.env', 't3-env', 'createEnv', '@t3-oss/env-nextjs', 'NEXT_PUBLIC_', 'NODE_ENV', 'dotenv', 'configuration'],
  },
  {
    type: 'guide-section',
    title: 'Formulaires -- React Hook Form + Zod',
    href: '/guides/zod-validation#form-validation',
    tags: ['Zod', 'React Hook Form'],
    parentTitle: 'Zod : La validation TypeScript que vous auriez dû utiliser depuis le début',
    keywords: ['react-hook-form', 'zodResolver', 'useForm', 'register', 'handleSubmit', 'useFieldArray', 'formState', 'formulaire'],
  },
  {
    type: 'guide-section',
    title: 'Next.js Server Actions et Zod',
    href: '/guides/zod-validation#server-actions',
    tags: ['Zod', 'Next.js'],
    parentTitle: 'Zod : La validation TypeScript que vous auriez dû utiliser depuis le début',
    keywords: ['server action', 'useActionState', 'FormData', 'use server', 'NextRequest', 'NextResponse', 'validation serveur', 'next.js actions'],
  },
  {
    type: 'guide-section',
    title: 'Validation API -- Requetes et Reponses',
    href: '/guides/zod-validation#api-validation',
    tags: ['Zod', 'API'],
    parentTitle: 'Zod : La validation TypeScript que vous auriez dû utiliser depuis le début',
    keywords: ['api route', 'route handler', 'tRPC', 'json schema', 'toJSONSchema', 'request validation', 'response validation', 'endpoint'],
  },
  {
    type: 'guide-section',
    title: 'Patterns Avances',
    href: '/guides/zod-validation#advanced-patterns',
    tags: ['Zod'],
    parentTitle: 'Zod : La validation TypeScript que vous auriez dû utiliser depuis le début',
    keywords: ['discriminated union', 'recursive', 'branded types', 'z.lazy', 'z.brand', 'state machine', 'generic factory', 'generiques', 'ZodType', 'ZodTypeAny', 'nominal types', 'factory pattern', 'paginated response'],
  },
  {
    type: 'guide-section',
    title: 'Ecosysteme Zod et Migration v4',
    href: '/guides/zod-validation#ecosystem-v4',
    tags: ['Zod'],
    parentTitle: 'Zod : La validation TypeScript que vous auriez dû utiliser depuis le début',
    keywords: ['zod v4', 'migration', 'tRPC', 'drizzle', 'prisma', 'zod-form-data', 'zod-i18n-map', 'standard schema', '@hookform/resolvers'],
  },

  // ==========================================================================
  // GUIDE : Mémoisation React : Pourquoi vos optimisations ralentissent votre app teste en live
  // ==========================================================================
  {
    type: 'guide',
    title: 'Mémoisation React : Pourquoi vos optimisations ralentissent votre app teste en live',
    description: 'Comparez 4 strategies d\'optimisation React avec des mesures reelles de temps de rendu.',
    href: '/demos/simulateur-performance',
    tags: ['React', 'Performance', 'Interactif'],
    keywords: ['memoisation', 'memo', 'useMemo', 'useCallback', 'React.memo', 'benchmark', 'simulateur', 'render time', 'performance.now', 'benchmark live'],
  },

  // ==========================================================================
  // DEMO : Comparateur de modes de rendering
  // ==========================================================================
  {
    type: 'guide',
    title: 'SSR, SSG, ISR, CSR et Streaming compares en temps reel',
    description: 'Visualisez les differences entre les 5 modes de rendering Next.js. Timelines animees et metriques Core Web Vitals.',
    href: '/demos/simulateur-rendering',
    tags: ['Next.js', 'Rendering', 'Interactif'],
    keywords: ['ssr', 'ssg', 'isr', 'csr', 'streaming', 'core web vitals', 'ttfb', 'lcp', 'fcp', 'tti', 'simulateur', 'timeline'],
  },

  // ==========================================================================
  // GUIDE : TanStack : Comment éliminer 80% de votre boilerplate React
  // ==========================================================================
  {
    type: 'guide',
    title: 'TanStack : Comment éliminer 80% de votre boilerplate React',
    description: 'Query, Router, Table, Virtual, Form, Store et Pacer. Du data fetching a l\'architecture de production.',
    href: '/guides/tanstack-react',
    tags: ['TanStack Query', 'TanStack Router', 'React'],
    keywords: ['react query', 'tanstack query', 'data fetching', 'cache', 'useQuery', 'useMutation', 'useInfiniteQuery', 'queryClient', 'queryKey', 'headless', 'type-safe', 'staleTime', 'gcTime', 'invalidateQueries', 'server state', 'swr', 'apollo alternative'],
  },
  {
    type: 'guide-section',
    title: "Introduction a l'ecosysteme TanStack",
    href: '/guides/tanstack-react#introduction',
    tags: ['TanStack'],
    parentTitle: 'TanStack : Comment éliminer 80% de votre boilerplate React',
    keywords: ['tanstack', 'server state', 'client state', 'race condition', 'deduplication', 'framework-agnostic'],
  },
  {
    type: 'guide-section',
    title: 'TanStack Query - Les Bases',
    href: '/guides/tanstack-react#query-basics',
    tags: ['TanStack Query'],
    parentTitle: 'TanStack : Comment éliminer 80% de votre boilerplate React',
    keywords: ['useQuery', 'queryClient', 'QueryClient', 'queryKey', 'staleTime', 'gcTime', 'cacheTime', 'retry', 'refetchOnWindowFocus', 'refetchOnMount', 'refetchOnReconnect', 'isLoading', 'isFetching', 'isError', 'isPending', 'isSuccess', 'query function', 'QueryClientProvider'],
  },
  {
    type: 'guide-section',
    title: 'Query - Options et Strategies Avancees',
    href: '/guides/tanstack-react#query-advanced',
    tags: ['TanStack Query'],
    parentTitle: 'TanStack : Comment éliminer 80% de votre boilerplate React',
    keywords: ['useInfiniteQuery', 'getNextPageParam', 'getPreviousPageParam', 'hasNextPage', 'fetchNextPage', 'prefetchQuery', 'prefetchInfiniteQuery', 'pagination', 'cursor pagination', 'parallel queries', 'dependent queries', 'select', 'placeholderData', 'initialData', 'useQueries', 'refetchInterval', 'enabled', 'infinite scroll'],
  },
  {
    type: 'guide-section',
    title: 'Mutations et Invalidation du Cache',
    href: '/guides/tanstack-react#mutations-invalidation',
    tags: ['TanStack Query'],
    parentTitle: 'TanStack : Comment éliminer 80% de votre boilerplate React',
    keywords: ['useMutation', 'mutate', 'mutateAsync', 'invalidateQueries', 'refetchQueries', 'optimistic update', 'optimistic ui', 'onMutate', 'onSuccess', 'onError', 'onSettled', 'cancelQueries', 'setQueryData', 'getQueryData', 'rollback', 'mutation context'],
  },
  {
    type: 'guide-section',
    title: 'Query Patterns et queryOptions',
    href: '/guides/tanstack-react#query-patterns',
    tags: ['TanStack Query'],
    parentTitle: 'TanStack : Comment éliminer 80% de votre boilerplate React',
    keywords: ['queryOptions', 'query factory', 'prefetchQuery', 'QueryErrorResetBoundary', 'throwOnError', 'query key factory'],
  },
  {
    type: 'guide-section',
    title: 'TanStack Router - Routing Type-Safe',
    href: '/guides/tanstack-react#tanstack-router',
    tags: ['TanStack Router'],
    parentTitle: 'TanStack : Comment éliminer 80% de votre boilerplate React',
    keywords: ['tanstack router', 'router', 'type-safe routing', 'file-based routing', 'createRootRoute', 'createRoute', 'createFileRoute', 'Route', 'Outlet', 'Link', 'useNavigate', 'useParams', 'useSearch', 'validateSearch', 'ensureQueryData', 'useSuspenseQuery', 'pendingComponent', 'loaderData', 'beforeLoad'],
  },
  {
    type: 'guide-section',
    title: 'TanStack Table - Tableaux Headless',
    href: '/guides/tanstack-react#tanstack-table',
    tags: ['TanStack Table'],
    parentTitle: 'TanStack : Comment éliminer 80% de votre boilerplate React',
    keywords: ['tanstack table', 'useReactTable', 'createColumnHelper', 'ColumnDef', 'flexRender', 'getCoreRowModel', 'getSortedRowModel', 'getFilteredRowModel', 'getPaginationRowModel', 'getGroupedRowModel', 'getExpandedRowModel', 'headless table', 'sorting', 'filtrage', 'pagination', 'row selection', 'column visibility'],
  },
  {
    type: 'guide-section',
    title: 'TanStack Virtual - Virtualisation 60fps',
    href: '/guides/tanstack-react#tanstack-virtual',
    tags: ['TanStack Virtual'],
    parentTitle: 'TanStack : Comment éliminer 80% de votre boilerplate React',
    keywords: ['tanstack virtual', 'useVirtualizer', 'virtualisation', 'virtual scroll', 'windowing', 'estimateSize', 'overscan', 'measureElement', 'getTotalSize', 'getVirtualItems', 'scrollToIndex', 'scrollToOffset', 'react-window alternative', 'react-virtualized alternative', 'virtualItem', 'virtualRows'],
  },
  {
    type: 'guide-section',
    title: 'TanStack Form - Formulaires Performants',
    href: '/guides/tanstack-react#tanstack-form',
    tags: ['TanStack Form'],
    parentTitle: 'TanStack : Comment éliminer 80% de votre boilerplate React',
    keywords: ['useForm', 'form.Field', 'form.Subscribe', 'zodValidator', 'onChangeAsync', 'validatorAdapter', 'formulaire', 'validation'],
  },
  {
    type: 'guide-section',
    title: 'TanStack Store - State Reactif Minimal',
    href: '/guides/tanstack-react#tanstack-store',
    tags: ['TanStack Store'],
    parentTitle: 'TanStack : Comment éliminer 80% de votre boilerplate React',
    keywords: ['tanstack store', 'Store', 'createStore', 'setState', 'subscribe', 'useStore', 'selector', 'signal', 'state management', 'zustand alternative', 'redux alternative', 'reactive store'],
  },
  {
    type: 'guide-section',
    title: 'TanStack Pacer - Timing et Scheduling',
    href: '/guides/tanstack-react#tanstack-pacer',
    tags: ['TanStack Pacer'],
    parentTitle: 'TanStack : Comment éliminer 80% de votre boilerplate React',
    keywords: ['debounce', 'throttle', 'rate limit', 'useDebouncedCallback', 'useThrottledValue', 'useQueuedState', 'maxRequests', 'windowMs'],
  },
  {
    type: 'guide-section',
    title: 'DevTools et Debugging',
    href: '/guides/tanstack-react#devtools',
    tags: ['TanStack'],
    parentTitle: 'TanStack : Comment éliminer 80% de votre boilerplate React',
    keywords: ['devtools', 'debug', 'ReactQueryDevtools', 'TanStackRouterDevtools', 'buttonPosition', 'initialIsOpen'],
  },
  {
    type: 'guide-section',
    title: 'SSR et Integration Next.js',
    href: '/guides/tanstack-react#ssr-nextjs',
    tags: ['TanStack Query', 'Next.js'],
    parentTitle: 'TanStack : Comment éliminer 80% de votre boilerplate React',
    keywords: ['ssr', 'server side rendering', 'next.js', 'hydration', 'dehydrate', 'hydrate', 'HydrationBoundary', 'DehydratedState', 'useSuspenseQuery', 'server components', 'prefetchQuery', 'revalidate', 'streaming'],
  },
  {
    type: 'guide-section',
    title: 'Architecture de Production',
    href: '/guides/tanstack-react#architecture-production',
    tags: ['TanStack'],
    parentTitle: 'TanStack : Comment éliminer 80% de votre boilerplate React',
    keywords: ['architecture', 'production', 'apiClient', 'CrudApi', 'createQueryFactory', 'custom hooks pattern', 'scalable'],
  },

  // ==========================================================================
  // GUIDE : React 19 : Ce que les devs seniors font (et que vous devriez copier)
  // ==========================================================================
  {
    type: 'guide',
    title: 'React 19 : Ce que les devs seniors font (et que vous devriez copier)',
    description: 'Patterns avances React 19 : Compiler, Server Components, Actions. Solutions eprouvees et cas d\'usage professionnels.',
    href: '/guides/react-19-advanced',
    tags: ['React 19', 'Server Components', 'Compiler'],
    keywords: ['react 19', 'use()', 'useActionState', 'useOptimistic', 'useTransition', 'useDeferredValue', 'rsc', 'server components', 'server actions', 'use server', 'use client', 'concurrent rendering', 'react compiler', 'react forget', 'streaming', 'ppr', 'suspense'],
  },
  {
    type: 'guide-section',
    title: 'Introduction a React 19',
    href: '/guides/react-19-advanced#introduction',
    tags: ['React 19'],
    parentTitle: 'React 19 : Ce que les devs seniors font (et que vous devriez copier)',
    keywords: ['react 19', 'migration', 'breaking changes', 'upgrade', 'react 18', 'changelog'],
  },
  {
    type: 'guide-section',
    title: 'Hook use() & Suspense 2.0',
    href: '/guides/react-19-advanced#use-hook',
    tags: ['React 19'],
    parentTitle: 'React 19 : Ce que les devs seniors font (et que vous devriez copier)',
    keywords: ['use()', 'hook use', 'suspense', 'promise', 'context', 'async component', 'conditional hook', 'suspense 2.0', 'Suspense', 'fallback', 'await promise', 'use context'],
  },
  {
    type: 'guide-section',
    title: 'React Compiler',
    href: '/guides/react-19-advanced#react-compiler',
    tags: ['React 19', 'Compiler'],
    parentTitle: 'React 19 : Ce que les devs seniors font (et que vous devriez copier)',
    keywords: ['react compiler', 'babel-plugin-react-compiler', 'use no memo', 'react forget', 'automatic memoization', 'auto memoization', 'expression-level', 'forget compiler', 'compilation', 'jsx transform', 'eslint-plugin-react-compiler'],
  },
  {
    type: 'guide-section',
    title: 'React Server Components (RSC)',
    href: '/guides/react-19-advanced#server-components',
    tags: ['React 19', 'RSC'],
    parentTitle: 'React 19 : Ce que les devs seniors font (et que vous devriez copier)',
    keywords: ['rsc', 'server components', 'react server components', 'use client', 'use server', 'async component', 'server component', 'client component', 'zero bundle', 'zero js', 'hydration', 'prisma', 'database access', 'server-only'],
  },
  {
    type: 'guide-section',
    title: 'Actions & Async Transitions',
    href: '/guides/react-19-advanced#actions-transitions',
    tags: ['React 19'],
    parentTitle: 'React 19 : Ce que les devs seniors font (et que vous devriez copier)',
    keywords: ['useTransition', 'startTransition', 'isPending', 'non-blocking', 'interruptible', 'async actions', 'transition', 'concurrent mode', 'low priority update', 'action'],
  },
  {
    type: 'guide-section',
    title: 'useActionState & useOptimistic',
    href: '/guides/react-19-advanced#use-action-state',
    tags: ['React 19'],
    parentTitle: 'React 19 : Ce que les devs seniors font (et que vous devriez copier)',
    keywords: ['useActionState', 'useFormStatus', 'useOptimistic', 'optimistic update', 'optimistic ui', 'FormData', 'rollback', 'server mutation', 'form state', 'form action', 'pending state', 'isPending'],
  },
  {
    type: 'guide-section',
    title: 'Streaming & Partial Pre-rendering',
    href: '/guides/react-19-advanced#streaming',
    tags: ['React 19'],
    parentTitle: 'React 19 : Ce que les devs seniors font (et que vous devriez copier)',
    keywords: ['streaming', 'streaming ssr', 'ppr', 'partial pre-rendering', 'suspense boundary', 'Suspense', 'ttfb', 'fcp', 'selective hydration', 'progressive hydration', 'html streaming', 'renderToReadableStream'],
  },
  {
    type: 'guide-section',
    title: 'Bundle Optimization',
    href: '/guides/react-19-advanced#bundle-optimization',
    tags: ['React 19'],
    parentTitle: 'React 19 : Ce que les devs seniors font (et que vous devriez copier)',
    keywords: ['tree-shaking', 'code splitting', 'lazy loading', 'React.lazy', 'lazy()', 'dynamic()', 'next/dynamic', '@next/bundle-analyzer', 'webpack-bundle-analyzer', 'import()', 'dynamic import', 'barrel file'],
  },
  {
    type: 'guide-section',
    title: 'Performance Hooks',
    href: '/guides/react-19-advanced#performance-hooks',
    tags: ['React 19'],
    parentTitle: 'React 19 : Ce que les devs seniors font (et que vous devriez copier)',
    keywords: ['useMemo', 'useCallback', 'useDeferredValue', 'useTransition', 'concurrent', 'priority', 'scheduler'],
  },
  {
    type: 'guide-section',
    title: 'Memory Management',
    href: '/guides/react-19-advanced#memory-management',
    tags: ['React 19'],
    parentTitle: 'React 19 : Ce que les devs seniors font (et que vous devriez copier)',
    keywords: ['memory leak', 'cleanup', 'useEffect cleanup', 'garbage collection', 'removeEventListener', 'clearTimeout', 'clearInterval', 'WeakRef'],
  },
  {
    type: 'guide-section',
    title: 'Data Fetching Patterns',
    href: '/guides/react-19-advanced#data-fetching',
    tags: ['React 19'],
    parentTitle: 'React 19 : Ce que les devs seniors font (et que vous devriez copier)',
    keywords: ['data fetching', 'fetch', 'waterfall', 'parallel', 'preload', 'race condition', 'tanstack query', 'promise stability'],
  },
  {
    type: 'guide-section',
    title: 'State Consolidation Patterns',
    href: '/guides/react-19-advanced#state-consolidation',
    tags: ['React 19'],
    parentTitle: 'React 19 : Ce que les devs seniors font (et que vous devriez copier)',
    keywords: ['useReducer', 'reducer', 'discriminated union', 'state machine', 'impossible states', 'atomic update'],
  },
  {
    type: 'guide-section',
    title: 'Architecture Scalable',
    href: '/guides/react-19-advanced#architecture',
    tags: ['React 19'],
    parentTitle: 'React 19 : Ce que les devs seniors font (et que vous devriez copier)',
    keywords: ['architecture', 'scalable', 'feature-based', 'colocation', 'domain-driven', 'separation of concerns'],
  },
  {
    type: 'guide-section',
    title: 'Error Handling & Boundaries',
    href: '/guides/react-19-advanced#error-handling',
    tags: ['React 19'],
    parentTitle: 'React 19 : Ce que les devs seniors font (et que vous devriez copier)',
    keywords: ['error boundary', 'ErrorBoundary', 'getDerivedStateFromError', 'componentDidCatch', 'sentry', 'react-error-boundary', 'fallback'],
  },
  {
    type: 'guide-section',
    title: 'TypeScript Advanced Patterns',
    href: '/guides/react-19-advanced#typescript-patterns',
    tags: ['React 19', 'TypeScript'],
    parentTitle: 'React 19 : Ce que les devs seniors font (et que vous devriez copier)',
    keywords: ['typescript', 'generics', 'type inference', 'discriminated union', 'zod', 'as const', 'type guard', 'generic component'],
  },
  {
    type: 'guide-section',
    title: 'Testing Strategy',
    href: '/guides/react-19-advanced#testing-strategy',
    tags: ['React 19'],
    parentTitle: 'React 19 : Ce que les devs seniors font (et que vous devriez copier)',
    keywords: ['vitest', 'jest', 'react testing library', 'playwright', 'renderHook', 'act', 'fireEvent', 'screen', 'waitFor', 'tdd'],
  },
  {
    type: 'guide-section',
    title: 'Accessibility (a11y)',
    href: '/guides/react-19-advanced#accessibility',
    tags: ['React 19'],
    parentTitle: 'React 19 : Ce que les devs seniors font (et que vous devriez copier)',
    keywords: ['accessibilite', 'a11y', 'aria', 'wcag 2.2', 'screen reader', 'focus trap', 'headless ui', 'keyboard navigation'],
  },
  {
    type: 'guide-section',
    title: 'Custom Hooks Patterns',
    href: '/guides/react-19-advanced#custom-hooks',
    tags: ['React 19'],
    parentTitle: 'React 19 : Ce que les devs seniors font (et que vous devriez copier)',
    keywords: ['custom hook', 'useLocalStorage', 'useFetch', 'useMediaQuery', 'useDebounce', 'useThrottle', 'useIntersectionObserver', 'usePrevious', 'useAsync', 'useToggle', 'hook pattern'],
  },
  {
    type: 'guide-section',
    title: 'Refs as Props & Document Metadata',
    href: '/guides/react-19-advanced#refs-metadata',
    tags: ['React 19'],
    parentTitle: 'React 19 : Ce que les devs seniors font (et que vous devriez copier)',
    keywords: ['ref', 'useRef', 'forwardRef', 'ref callback', 'cleanup ref', 'document.title', 'meta tags', 'seo'],
  },

  // ==========================================================================
  // GUIDE : Next.js 16 : Les erreurs que j\'ai faites pour que vous ne les fassiez pas
  // ==========================================================================
  {
    type: 'guide',
    title: 'Next.js 16 : Les erreurs que j\'ai faites pour que vous ne les fassiez pas',
    description: 'Modes de rendu SSR, SSG, ISR et Client Components. Retours d\'experience sur des projets en production avec exemples concrets.',
    href: '/guides/nextjs-demo',
    tags: ['Next.js 16', 'React 19', 'TypeScript'],
    keywords: ['nextjs', 'next.js', 'next.js 16', 'app router', 'app directory', 'pages router', 'react server components', 'rsc', 'server actions', 'server components', 'rendering modes', 'ssr', 'ssg', 'isr', 'csr', 'ppr', 'generateStaticParams', 'generateMetadata', 'revalidatePath', 'fullstack', 'vercel'],
  },
  {
    type: 'guide-section',
    title: 'Introduction a Next.js 16',
    href: '/guides/nextjs-demo#introduction',
    tags: ['Next.js'],
    parentTitle: 'Next.js 16 : Les erreurs que j\'ai faites pour que vous ne les fassiez pas',
    keywords: ['nextjs', 'hot reload', 'file-based routing', 'dx', 'developer experience'],
  },
  {
    type: 'guide-section',
    title: 'Server-Side Rendering (SSR)',
    href: '/guides/nextjs-demo#ssr',
    tags: ['Next.js', 'SSR'],
    parentTitle: 'Next.js 16 : Les erreurs que j\'ai faites pour que vous ne les fassiez pas',
    keywords: ['ssr', 'server side rendering', 'getServerSideProps', 'dynamic rendering', 'dynamic route', 'cache no-store', 'cache force-dynamic', 'per-request', 'fetch', 'cookies()', 'headers()', 'searchParams'],
  },
  {
    type: 'guide-section',
    title: 'Static Site Generation (SSG)',
    href: '/guides/nextjs-demo#ssg',
    tags: ['Next.js', 'SSG'],
    parentTitle: 'Next.js 16 : Les erreurs que j\'ai faites pour que vous ne les fassiez pas',
    keywords: ['ssg', 'static generation', 'getStaticProps', 'getStaticPaths', 'generateStaticParams', 'build time', 'force-cache', 'static export', 'output export', 'cdn', 'edge', 'pre-rendering', 'static html'],
  },
  {
    type: 'guide-section',
    title: 'Incremental Static Regeneration (ISR)',
    href: '/guides/nextjs-demo#isr',
    tags: ['Next.js', 'ISR'],
    parentTitle: 'Next.js 16 : Les erreurs que j\'ai faites pour que vous ne les fassiez pas',
    keywords: ['isr', 'incremental static regeneration', 'revalidate', 'revalidatePath', 'revalidateTag', 'on-demand revalidation', 'on-demand isr', 'stale-while-revalidate', 'background regeneration', 'cache', 'next revalidate', 'unstable_cache'],
  },
  {
    type: 'guide-section',
    title: 'Client-Side Rendering (CSR)',
    href: '/guides/nextjs-demo#csr',
    tags: ['Next.js', 'CSR'],
    parentTitle: 'Next.js 16 : Les erreurs que j\'ai faites pour que vous ne les fassiez pas',
    keywords: ['csr', 'client side rendering', 'useEffect', 'useState', 'spa', 'single page app', 'use client', 'client component', 'ttfb', 'fcp', 'lcp', 'cls', 'inp', 'hydration', 'interactive'],
  },
  {
    type: 'guide-section',
    title: 'Hybrid (Server + Client)',
    href: '/guides/nextjs-demo#hybrid',
    tags: ['Next.js'],
    parentTitle: 'Next.js 16 : Les erreurs que j\'ai faites pour que vous ne les fassiez pas',
    keywords: ['hybride', 'server components', 'island architecture', 'hydration mismatch', 'suppressHydrationWarning', 'serialization'],
  },
  {
    type: 'guide-section',
    title: 'Client Components',
    href: '/guides/nextjs-demo#client-components',
    tags: ['Next.js'],
    parentTitle: 'Next.js 16 : Les erreurs que j\'ai faites pour que vous ne les fassiez pas',
    keywords: ['client component', 'use client', 'useState', 'browser apis', 'localStorage', 'event handlers', 'onClick', 'onChange'],
  },
  {
    type: 'guide-section',
    title: 'Dynamic Import & Code Splitting',
    href: '/guides/nextjs-demo#dynamic-import',
    tags: ['Next.js'],
    parentTitle: 'Next.js 16 : Les erreurs que j\'ai faites pour que vous ne les fassiez pas',
    keywords: ['dynamic import', 'code splitting', 'next/dynamic', 'lazy loading', 'ssr false', 'bundle splitting'],
  },
  {
    type: 'guide-section',
    title: 'Server Actions',
    href: '/guides/nextjs-demo#server-actions',
    tags: ['Next.js'],
    parentTitle: 'Next.js 16 : Les erreurs que j\'ai faites pour que vous ne les fassiez pas',
    keywords: ['server action', 'use server', 'revalidatePath', 'revalidateTag', 'FormData', 'progressive enhancement', 'mutation'],
  },
  {
    type: 'guide-section',
    title: 'Streaming & Suspense',
    href: '/guides/nextjs-demo#streaming',
    tags: ['Next.js'],
    parentTitle: 'Next.js 16 : Les erreurs que j\'ai faites pour que vous ne les fassiez pas',
    keywords: ['streaming', 'suspense', 'loading.tsx', 'ppr', 'partial prerendering', 'selective hydration', 'skeleton', 'fallback'],
  },
  {
    type: 'guide-section',
    title: 'Performance Frontend',
    href: '/guides/nextjs-demo#frontend-performance',
    tags: ['Next.js'],
    parentTitle: 'Next.js 16 : Les erreurs que j\'ai faites pour que vous ne les fassiez pas',
    keywords: ['lcp', 'fcp', 'cls', 'inp', 'ttfb', 'core web vitals', 'lighthouse', 'next/image', 'next/font', 'webp', 'avif'],
  },
  {
    type: 'guide-section',
    title: 'Performance Backend',
    href: '/guides/nextjs-demo#backend-performance',
    tags: ['Next.js'],
    parentTitle: 'Next.js 16 : Les erreurs que j\'ai faites pour que vous ne les fassiez pas',
    keywords: ['cache serveur', 'database', 'ttfb', 'edge runtime', 'prisma', 'n+1 query', 'upstash redis', 'middleware'],
  },
  {
    type: 'guide-section',
    title: 'Mesure de Performance',
    href: '/guides/nextjs-demo#performance-measurement',
    tags: ['Next.js'],
    parentTitle: 'Next.js 16 : Les erreurs que j\'ai faites pour que vous ne les fassiez pas',
    keywords: ['web vitals', 'lighthouse', 'profiling', 'devtools', 'react profiler', 'performance.now', 'vercel analytics'],
  },
  {
    type: 'guide-section',
    title: 'Securite',
    href: '/guides/nextjs-demo#security',
    tags: ['Next.js'],
    parentTitle: 'Next.js 16 : Les erreurs que j\'ai faites pour que vous ne les fassiez pas',
    keywords: ['securite', 'xss', 'csrf', 'injection', 'csp', 'content security policy', 'owasp', 'rls', 'bcrypt', 'DOMPurify'],
  },
  {
    type: 'guide-section',
    title: 'React Best Practices',
    href: '/guides/nextjs-demo#react-patterns',
    tags: ['Next.js', 'React'],
    parentTitle: 'Next.js 16 : Les erreurs que j\'ai faites pour que vous ne les fassiez pas',
    keywords: ['zustand', 'tanstack query', 'swr', 'immer', 'prop drilling', 'custom hooks', 'clean code'],
  },
  {
    type: 'guide-section',
    title: 'Composition Patterns',
    href: '/guides/nextjs-demo#composition',
    tags: ['Next.js', 'React'],
    parentTitle: 'Next.js 16 : Les erreurs que j\'ai faites pour que vous ne les fassiez pas',
    keywords: ['composition', 'children', 'render props', 'compound component', 'slots', 'provider pattern', 'dependency injection'],
  },
  {
    type: 'guide-section',
    title: 'Architecture',
    href: '/guides/nextjs-demo#architecture',
    tags: ['Next.js'],
    parentTitle: 'Next.js 16 : Les erreurs que j\'ai faites pour que vous ne les fassiez pas',
    keywords: ['architecture', 'solid', 'repository pattern', 'factory pattern', 'clean architecture', 'vitest', 'playwright', 'layers'],
  },
  {
    type: 'guide-section',
    title: 'Accessibilite (a11y)',
    href: '/guides/nextjs-demo#accessibility',
    tags: ['Next.js'],
    parentTitle: 'Next.js 16 : Les erreurs que j\'ai faites pour que vous ne les fassiez pas',
    keywords: ['accessibilite', 'a11y', 'aria', 'wcag 2.1', 'screen reader', 'focus trap', 'skip links', 'semantic html'],
  },
  {
    type: 'guide-section',
    title: 'Patterns Avances',
    href: '/guides/nextjs-demo#advanced-patterns',
    tags: ['Next.js'],
    parentTitle: 'Next.js 16 : Les erreurs que j\'ai faites pour que vous ne les fassiez pas',
    keywords: ['middleware', 'intercepting routes', 'parallel routes', 'route groups', 'next-intl', 'NextRequest', 'NextResponse', 'edge runtime', 'i18n'],
  },
  {
    type: 'guide-section',
    title: 'Comparaison & Conclusion',
    href: '/guides/nextjs-demo#comparison',
    tags: ['Next.js'],
    parentTitle: 'Next.js 16 : Les erreurs que j\'ai faites pour que vous ne les fassiez pas',
    keywords: ['ssr vs ssg', 'rendu dynamique', 'rendu statique', 'choix architecture', 'quand utiliser'],
  },

  // ==========================================================================
  // GUIDE : Mémoisation React : Pourquoi vos optimisations ralentissent votre app
  // ==========================================================================
  {
    type: 'guide',
    title: 'Mémoisation React : Pourquoi vos optimisations ralentissent votre app',
    description: 'Comprendre les 3 mecanismes de memoisation React avec des exemples concrets et testables.',
    href: '/guides/react-memoization',
    tags: ['React', 'Performance', 'Hooks'],
    keywords: ['memoisation', 'memo', 'useMemo', 'useCallback', 'React.memo', 're-render', 'reference stability', 'shallow comparison', 'dependency array'],
  },
  {
    type: 'guide-section',
    title: 'Introduction a la Memoisation React',
    href: '/guides/react-memoization#introduction',
    tags: ['React'],
    parentTitle: 'Mémoisation React : Pourquoi vos optimisations ralentissent votre app',
    keywords: ['memoisation', 'caching', 'prop comparison', 'cache'],
  },
  {
    type: 'guide-section',
    title: 'Le Probleme du Re-render',
    href: '/guides/react-memoization#probleme-re-render',
    tags: ['React'],
    parentTitle: 'Mémoisation React : Pourquoi vos optimisations ralentissent votre app',
    keywords: ['re-render', 'reconciliation', 'virtual dom', 'performance.now', 'react profiler', '60fps', '16ms', 'diff algorithm'],
  },
  {
    type: 'guide-section',
    title: 'React.memo - Memoiser un Composant',
    href: '/guides/react-memoization#react-memo',
    tags: ['React'],
    parentTitle: 'Mémoisation React : Pourquoi vos optimisations ralentissent votre app',
    keywords: ['React.memo', 'memo', 'HOC', 'higher order component', 'shallow comparison', 'areEqual', 'custom comparator', 'reference equality'],
  },
  {
    type: 'guide-section',
    title: 'useMemo - Memoiser une Valeur',
    href: '/guides/react-memoization#usememo',
    tags: ['React'],
    parentTitle: 'Mémoisation React : Pourquoi vos optimisations ralentissent votre app',
    keywords: ['useMemo', 'derived state', 'data transformation', 'Intl.NumberFormat', 'filtering', 'sorting', 'dependances'],
  },
  {
    type: 'guide-section',
    title: 'useCallback - Memoiser une Fonction',
    href: '/guides/react-memoization#usecallback',
    tags: ['React'],
    parentTitle: 'Mémoisation React : Pourquoi vos optimisations ralentissent votre app',
    keywords: ['useCallback', 'callback stable', 'reference stable', 'debounce', 'stale closure', 'closure', 'clearTimeout'],
  },
  {
    type: 'guide-section',
    title: 'Le Trio en Action - Exemple Complet',
    href: '/guides/react-memoization#trio-en-action',
    tags: ['React'],
    parentTitle: 'Mémoisation React : Pourquoi vos optimisations ralentissent votre app',
    keywords: ['useMemo useCallback memo', 'large list', 'reduce', 'filter', 'sort', 'currency formatting'],
  },
  {
    type: 'guide-section',
    title: 'Comparaison Complete des Trois',
    href: '/guides/react-memoization#comparaison-complete',
    tags: ['React'],
    parentTitle: 'Mémoisation React : Pourquoi vos optimisations ralentissent votre app',
    keywords: ['memo vs useMemo vs useCallback', 'overhead', 'memory consumption', 'comparison cost', 'quand utiliser'],
  },
  {
    type: 'guide-section',
    title: 'Erreurs Courantes et Anti-Patterns',
    href: '/guides/react-memoization#erreurs-courantes',
    tags: ['React'],
    parentTitle: 'Mémoisation React : Pourquoi vos optimisations ralentissent votre app',
    keywords: ['anti-pattern', 'over-memoization', 'exhaustive-deps', 'eslint', 'inline props', 'common mistakes'],
  },
  {
    type: 'guide-section',
    title: 'Quand ne PAS Memoiser',
    href: '/guides/react-memoization#quand-ne-pas-memoiser',
    tags: ['React'],
    parentTitle: 'Mémoisation React : Pourquoi vos optimisations ralentissent votre app',
    keywords: ['over-optimization', 'premature optimization', 'flamegraph', 'leaf component', 'highlight updates'],
  },
  {
    type: 'guide-section',
    title: "React Compiler et l'Avenir",
    href: '/guides/react-memoization#react-compiler',
    tags: ['React'],
    parentTitle: 'Mémoisation React : Pourquoi vos optimisations ralentissent votre app',
    keywords: ['react compiler', 'react forget', 'babel-plugin-react-compiler', 'use no memo', 'rules of react', 'purity', 'immutability'],
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
    parentTitle: "TDD Frontend vs Backend",
    keywords: ['red green refactor', 'test cycle', 'test unitaire'],
  },
  {
    type: 'article-heading',
    title: 'Le probleme du rendu visuel',
    href: '/blog/tdd-frontend-vs-backend#le-probleme-visuel',
    tags: ['TDD', 'Frontend'],
    parentTitle: "TDD Frontend vs Backend",
    keywords: ['rendu visuel', 'ui testing', 'visual testing', 'snapshot', 'dom'],
  },
  {
    type: 'article-heading',
    title: 'Les defis specifiques au frontend',
    href: '/blog/tdd-frontend-vs-backend#les-defis-specifiques',
    tags: ['TDD', 'Frontend'],
    parentTitle: "TDD Frontend vs Backend",
    keywords: ['async testing', 'dom testing', 'browser apis', 'flaky tests'],
  },
  {
    type: 'article-heading',
    title: '1. Etat asynchrone omnipresent',
    href: '/blog/tdd-frontend-vs-backend#etat-asynchrone',
    tags: ['TDD'],
    parentTitle: "TDD Frontend vs Backend",
    keywords: ['async', 'promise', 'await', 'waitFor', 'act', 'mock fetch'],
  },
  {
    type: 'article-heading',
    title: '2. Complexite des interactions utilisateur',
    href: '/blog/tdd-frontend-vs-backend#interactions-utilisateur',
    tags: ['TDD'],
    parentTitle: "TDD Frontend vs Backend",
    keywords: ['userEvent', 'click', 'keyboard', 'focus management', 'aria attributes'],
  },
  {
    type: 'article-heading',
    title: '3. Le DOM et le CSS',
    href: '/blog/tdd-frontend-vs-backend#dom-et-css',
    tags: ['TDD'],
    parentTitle: "TDD Frontend vs Backend",
    keywords: ['dom', 'css', 'toBeInTheDocument', 'toBeVisible', 'display none', 'media query'],
  },
  {
    type: 'article-heading',
    title: '4. Mocks et dependances externes',
    href: '/blog/tdd-frontend-vs-backend#mocks-complexes',
    tags: ['TDD'],
    parentTitle: "TDD Frontend vs Backend",
    keywords: ['mock', 'stub', 'spy', 'msw', 'IntersectionObserver', 'matchMedia', 'localStorage mock'],
  },
  {
    type: 'article-heading',
    title: '5. Separation des preoccupations',
    href: '/blog/tdd-frontend-vs-backend#separation-concerns',
    tags: ['TDD'],
    parentTitle: "TDD Frontend vs Backend",
    keywords: ['separation of concerns', 'solid', 'custom hooks', 'fonctions pures', 'logique metier'],
  },
  {
    type: 'article-heading',
    title: 'Pourquoi continuer malgre tout ?',
    href: '/blog/tdd-frontend-vs-backend#pourquoi-continuer',
    tags: ['TDD'],
    parentTitle: "TDD Frontend vs Backend",
    keywords: ['test-after development', 'regression testing', 'refactoring', 'cypress', 'playwright'],
  },
  {
    type: 'article-heading',
    title: 'Conclusion',
    href: '/blog/tdd-frontend-vs-backend#conclusion',
    tags: ['TDD'],
    parentTitle: "TDD Frontend vs Backend",
    keywords: ['approche hybride', 'test e2e', 'test integration', 'vitest', 'testing library'],
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
    keywords: ['state management', 'store', 'redux toolkit', 'rtk', 'rtk query', 'immer', 'createSlice', 'configureStore'],
  },
  {
    type: 'article-heading',
    title: 'Introduction',
    href: '/blog/redux-vs-context-vs-zustand#introduction',
    tags: ['State Management'],
    parentTitle: 'Redux vs Context vs Zustand',
    keywords: ['state management', 'prop drilling', 'server state', 'client state'],
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
    keywords: ['re-render', 'provider hell', 'selecteur', 'performance context'],
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
    keywords: ['devtools', 'middleware', 'thunk', 'time-travel debugging', 'rtk query', 'redux-persist'],
  },
  {
    type: 'article-heading',
    title: 'Zustand',
    href: '/blog/redux-vs-context-vs-zustand#zustand',
    tags: ['Zustand'],
    parentTitle: 'Redux vs Context vs Zustand',
    keywords: ['zustand', 'create', 'selector', 'useStore', 'set', 'get'],
  },
  {
    type: 'article-heading',
    title: 'Pourquoi Zustand seduit',
    href: '/blog/redux-vs-context-vs-zustand#zustand-avantages',
    tags: ['Zustand'],
    parentTitle: 'Redux vs Context vs Zustand',
    keywords: ['zustand persist', 'zustand devtools', 'zustand immer', 'selecteurs', 'typescript-first'],
  },
  {
    type: 'article-heading',
    title: 'Comparaison directe',
    href: '/blog/redux-vs-context-vs-zustand#comparaison',
    tags: ['State Management'],
    parentTitle: 'Redux vs Context vs Zustand',
    keywords: ['benchmark', 'bundle size', 'gzipped', 're-render performance', 'selecteurs'],
  },
  {
    type: 'article-heading',
    title: 'Impact de React 19',
    href: '/blog/redux-vs-context-vs-zustand#react-19',
    tags: ['React 19', 'State Management'],
    parentTitle: 'Redux vs Context vs Zustand',
    keywords: ['react 19', 'use()', 'server components', 'useActionState', 'tanstack query', 'swr'],
  },
  {
    type: 'article-heading',
    title: 'Guide de choix par projet',
    href: '/blog/redux-vs-context-vs-zustand#guide-choix',
    tags: ['State Management'],
    parentTitle: 'Redux vs Context vs Zustand',
    keywords: ['zustand vs redux', 'context vs zustand', 'server state vs client state', 'tanstack query'],
  },
  {
    type: 'article-heading',
    title: 'Conclusion',
    href: '/blog/redux-vs-context-vs-zustand#conclusion',
    tags: ['State Management'],
    parentTitle: 'Redux vs Context vs Zustand',
    keywords: ['etat client', 'etat serveur', 'minimiser state', 'zustand + tanstack query'],
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
