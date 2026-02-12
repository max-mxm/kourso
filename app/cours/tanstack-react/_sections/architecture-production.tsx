import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';

export default function ArchitectureProductionSection() {
  const queryOrganizationComparison = [
    {
      name: 'Inline (debutant)',
      description: 'Les queries sont declarees directement dans les composants, sans abstraction.',
      pros: [
        'Simple et rapide a ecrire',
        'Pas de fichier supplementaire',
        'Bon pour les prototypes',
      ],
      cons: [
        'Duplication des queryKeys',
        'queryFn dupliquee dans plusieurs composants',
        'Pas de reutilisabilite',
        'Refactoring couteux',
      ],
      useCases: [
        'Prototypes et preuves de concept',
        'Composants avec une seule query unique',
      ],
      color: 'rgb(168, 85, 247)',
    },
    {
      name: 'Query Factories (recommande)',
      description: 'Les queries sont organisees en factories avec queryOptions(), reutilisables et type-safe.',
      pros: [
        'Reutilisabilite maximale',
        'queryKeys centralises et coherents',
        'Type inference automatique',
        'Invalidation precise et previsible',
      ],
      cons: [
        'Fichiers supplementaires a creer',
        'Courbe d\'apprentissage initiale',
        'Peut sembler excessif pour les petits projets',
      ],
      useCases: [
        'Applications de production',
        'Equipes de plus de 2 developpeurs',
        'Projets avec plus de 10 queries',
      ],
      color: 'rgb(0, 150, 136)',
    },
    {
      name: 'Custom Hooks (compose)',
      description: 'Les query factories sont encapsulees dans des hooks personnalises avec logique metier.',
      pros: [
        'Encapsulation de la logique metier',
        'API simplifiee pour les consommateurs',
        'Testabilite amelioree',
        'Combine factory + logique applicative',
      ],
      cons: [
        'Couche d\'abstraction supplementaire',
        'Risque de sur-ingenierie',
        'Plus de code a maintenir',
      ],
      useCases: [
        'Queries avec logique metier complexe',
        'Compositions de queries et mutations',
        'Logique partagee entre plusieurs pages',
      ],
      color: 'rgb(249, 115, 22)',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Construire une application avec l&apos;ecosysteme TanStack en production demande une organisation
          rigoureuse. Cette section couvre les patterns d&apos;architecture eprouves : separation des couches,
          query factories type-safe, hooks personnalises et strategies d&apos;invalidation. L&apos;objectif est
          une codebase maintenable par une equipe, pas seulement par son auteur initial.
        </p>
      </div>

      <h3 className="text-xl font-semibold text-foreground">
        Organisation du code : API layer, query factories, hooks
      </h3>

      <CodeBlock
        code={`// Structure recommandee pour un projet TanStack en production
//
// src/
// ├── api/                    # Couche HTTP pure
// │   ├── client.ts           # Instance fetch/axios configuree
// │   ├── users.api.ts        # Endpoints utilisateurs
// │   ├── products.api.ts     # Endpoints produits
// │   └── orders.api.ts       # Endpoints commandes
// │
// ├── queries/                # Query factories (queryOptions)
// │   ├── users.queries.ts    # Factories pour les queries utilisateurs
// │   ├── products.queries.ts # Factories pour les queries produits
// │   └── orders.queries.ts   # Factories pour les queries commandes
// │
// ├── hooks/                  # Hooks personnalises (logique metier)
// │   ├── use-users.ts        # Hook combinant queries + mutations users
// │   ├── use-cart.ts         # Hook panier (queries + store + mutations)
// │   └── use-auth.ts         # Hook auth (queries + redirections)
// │
// └── components/             # Composants React

// -- 1. Couche API : fonctions HTTP pures, sans React --
// src/api/client.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

interface ApiError {
  status: number;
  message: string;
  code: string;
}

async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(\`\${API_BASE}\${endpoint}\`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({
      status: response.status,
      message: response.statusText,
      code: 'UNKNOWN_ERROR',
    }));
    throw error;
  }

  return response.json();
}

export { apiClient };

// -- src/api/users.api.ts --
import { apiClient } from './client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: string;
}

export interface UsersListParams {
  page?: number;
  limit?: number;
  role?: User['role'];
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export const usersApi = {
  list: (params: UsersListParams = {}) =>
    apiClient<PaginatedResponse<User>>(
      \`/users?\${new URLSearchParams(params as Record<string, string>)}\`
    ),

  getById: (id: string) =>
    apiClient<User>(\`/users/\${id}\`),

  create: (data: Omit<User, 'id' | 'createdAt'>) =>
    apiClient<User>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<User>) =>
    apiClient<User>(\`/users/\${id}\`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiClient<void>(\`/users/\${id}\`, { method: 'DELETE' }),
};`}
        language="typescript"
        filename="api-layer.ts"
        highlightLines={[3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 18]}
        category="advanced"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Query factories avec queryOptions()
      </h3>

      <CodeBlock
        code={`// src/queries/users.queries.ts
import { queryOptions } from '@tanstack/react-query';
import { usersApi, type UsersListParams } from '@/api/users.api';

// Query factory : centralise les queryKeys et queryFn
// queryOptions() infere automatiquement le type de retour

export const usersQueries = {
  // Cle racine pour toutes les queries utilisateurs
  all: () => queryOptions({
    queryKey: ['users'] as const,
  }),

  // Liste paginee avec filtres
  list: (params: UsersListParams = {}) => queryOptions({
    queryKey: ['users', 'list', params] as const,
    queryFn: () => usersApi.list(params),
    staleTime: 1000 * 30, // 30 secondes
  }),

  // Detail d'un utilisateur
  detail: (id: string) => queryOptions({
    queryKey: ['users', 'detail', id] as const,
    queryFn: () => usersApi.getById(id),
    staleTime: 1000 * 60, // 1 minute
    enabled: !!id, // ne fetch pas si id est vide
  }),
};

// -- Utilisation dans les composants --

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Dans un composant de liste
function UsersList({ role }: { role?: string }) {
  // Type automatiquement infere : PaginatedResponse<User>
  const { data, isLoading } = useQuery(
    usersQueries.list({ role: role as any, page: 1 })
  );
  // data.data est User[], data.total est number, etc.
}

// Dans un composant de detail
function UserProfile({ userId }: { userId: string }) {
  // Type automatiquement infere : User
  const { data: user } = useQuery(usersQueries.detail(userId));
  // user.name, user.email, etc. sont type-safe
}

// Invalidation precise
function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      usersApi.update(id, data),
    onSuccess: (_, { id }) => {
      // Invalider uniquement la liste et le detail modifie
      queryClient.invalidateQueries({ queryKey: usersQueries.list().queryKey });
      queryClient.invalidateQueries({ queryKey: usersQueries.detail(id).queryKey });
    },
  });
}

// Prefetching dans un Server Component
// app/users/page.tsx
export default async function UsersPage() {
  const queryClient = new QueryClient();

  // Reutilise exactement la meme query factory
  await queryClient.prefetchQuery(usersQueries.list({ page: 1 }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UsersList />
    </HydrationBoundary>
  );
}`}
        language="typescript"
        filename="users.queries.ts"
        highlightLines={[8, 10, 11, 12, 15, 16, 17, 18, 19, 23, 24, 25, 26, 27, 58, 59, 60]}
        category="advanced"
      />

      <h3 className="text-xl font-semibold text-foreground">
        TypeScript generics avec queryOptions()
      </h3>

      <CodeBlock
        code={`// Patterns TypeScript avances pour des queries entierement type-safe

import { queryOptions, type QueryKey } from '@tanstack/react-query';

// -- Pattern 1 : Query factory generique --
// Reutilisable pour n'importe quelle entite CRUD

interface CrudApi<T, TCreate = Omit<T, 'id' | 'createdAt'>> {
  list: (params?: Record<string, unknown>) => Promise<{ data: T[]; total: number }>;
  getById: (id: string) => Promise<T>;
  create: (data: TCreate) => Promise<T>;
  update: (id: string, data: Partial<T>) => Promise<T>;
  delete: (id: string) => Promise<void>;
}

function createQueryFactory<T>(
  baseKey: string,
  api: CrudApi<T>
) {
  return {
    all: () => queryOptions({
      queryKey: [baseKey] as const,
    }),

    list: (params?: Record<string, unknown>) => queryOptions({
      queryKey: [baseKey, 'list', params] as const,
      queryFn: () => api.list(params),
      staleTime: 1000 * 30,
    }),

    detail: (id: string) => queryOptions({
      queryKey: [baseKey, 'detail', id] as const,
      queryFn: () => api.getById(id),
      staleTime: 1000 * 60,
      enabled: !!id,
    }),
  };
}

// Utilisation : toutes les factories ont les memes patterns
const usersQueries = createQueryFactory<User>('users', usersApi);
const productsQueries = createQueryFactory<Product>('products', productsApi);
const ordersQueries = createQueryFactory<Order>('orders', ordersApi);

// -- Pattern 2 : Hooks type-safe avec parametres generiques --

function useEntityList<T>(
  factory: ReturnType<typeof createQueryFactory<T>>,
  params?: Record<string, unknown>
) {
  const query = useQuery(factory.list(params));

  return {
    items: query.data?.data ?? [],
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

// Utilisation : le type est automatiquement infere
function ProductPage() {
  const { items, total } = useEntityList(productsQueries);
  // items est Product[], total est number
  return <div>{items.map(p => <span key={p.id}>{p.name}</span>)}</div>;
}

// -- Pattern 3 : QueryKey typees pour l'invalidation --

type UsersQueryKey = ReturnType<typeof usersQueries.all>['queryKey']
  | ReturnType<typeof usersQueries.list>['queryKey']
  | ReturnType<typeof usersQueries.detail>['queryKey'];

// Fonction d'invalidation type-safe
function invalidateUsersQueries(
  queryClient: QueryClient,
  key: UsersQueryKey
) {
  return queryClient.invalidateQueries({ queryKey: key });
}`}
        language="typescript"
        filename="generic-query-factory.ts"
        highlightLines={[16, 17, 18, 19, 42, 43, 44, 48, 49, 50, 51]}
        category="advanced"
      />

      <ConceptCard
        title="Arbre de decision : quel outil TanStack pour quel besoin"
        description="L'ecosysteme TanStack couvre des domaines distincts. Chaque outil a un perimetre precis et ne devrait pas etre utilise en dehors de celui-ci."
        category="advanced"
      >
        <ul className="space-y-3 text-sm text-foreground/80">
          <li>
            -- <strong>Donnees serveur</strong> (API REST, GraphQL) : <code>TanStack Query</code>.
            Cache, revalidation, mutations, optimistic updates. C&apos;est le premier outil a adopter.
          </li>
          <li>
            -- <strong>Tableaux de donnees</strong> (tri, filtrage, pagination) : <code>TanStack Table</code>.
            Headless, type-safe, combine avec Query pour le data fetching et Virtual pour les grands volumes.
          </li>
          <li>
            -- <strong>Formulaires complexes</strong> (validation, multi-etapes) : <code>TanStack Form</code>.
            Re-renders granulaires, validation async native, integration Zod.
          </li>
          <li>
            -- <strong>Listes longues</strong> (+ de 100 elements) : <code>TanStack Virtual</code>.
            Virtualisation verticale, horizontale, grille. A combiner avec Table pour les grands tableaux.
          </li>
          <li>
            -- <strong>Routage type-safe</strong> (params, search, loaders) : <code>TanStack Router</code>.
            Alternative a Next.js App Router avec type-safety de bout en bout.
          </li>
          <li>
            -- <strong>Controle de debit</strong> (debounce, throttle) : <code>TanStack Pacer</code>.
            Hooks reactifs pour limiter la frequence des operations couteuses.
          </li>
          <li>
            -- <strong>Etat local reactif</strong> (partage entre composants) : <code>TanStack Store</code>.
            Ultra-leger (~2 KB), utiliser uniquement si Zustand ou Context sont trop lourds.
          </li>
        </ul>
      </ConceptCard>

      <h3 className="text-xl font-semibold text-foreground">
        Strategies d&apos;organisation des queries
      </h3>

      <ComparisonTable modes={queryOrganizationComparison} />

      <ConceptCard
        title="Checklist de mise en production"
        description="Avant de deployer une application basee sur l'ecosysteme TanStack, verifier systematiquement ces points critiques."
        category="advanced"
      >
        <ul className="space-y-3 text-sm text-foreground/80">
          <li>
            -- <strong>Strategie de cache</strong> : chaque query a un staleTime et un gcTime adaptes a la
            frequence de changement des donnees. Les donnees rarement modifiees (profil, configuration)
            ont un staleTime eleve (5-10 min). Les donnees temps reel (notifications, chat) ont un
            staleTime bas (0-5s) ou un refetchInterval.
          </li>
          <li>
            -- <strong>Gestion des erreurs</strong> : chaque query et mutation a un gestionnaire d&apos;erreur.
            Utiliser un QueryErrorBoundary global et des gestionnaires specifiques par composant.
            Configurer le retry : 3 tentatives pour les erreurs 5xx, 0 pour les erreurs 4xx.
          </li>
          <li>
            -- <strong>DevTools</strong> : configures en mode development avec chargement lazy.
            Token de debug pour activation en production. Verifier qu&apos;aucune donnee sensible
            n&apos;est exposee dans le cache (tokens, mots de passe).
          </li>
          <li>
            -- <strong>Types TypeScript</strong> : toutes les queries utilisent queryOptions() avec
            des types de retour explicites. Les queryKeys sont typees via &quot;as const&quot;.
            L&apos;invalidation utilise les queryKeys des factories, pas des chaines de caracteres.
          </li>
          <li>
            -- <strong>Prefetching SSR</strong> : les pages critiques prefetchent leurs donnees
            cote serveur via prefetchQuery + HydrationBoundary. Verifier que le premier rendu
            n&apos;affiche pas de loading state.
          </li>
          <li>
            -- <strong>Bundle size</strong> : verifier que les DevTools ne sont pas inclus dans
            le bundle de production. Utiliser un import dynamique ou le tree-shaking natif.
            Cible : moins de 30 KB supplementaires pour l&apos;ensemble de l&apos;ecosysteme TanStack.
          </li>
        </ul>
      </ConceptCard>

      <h3 className="text-xl font-semibold text-foreground">
        Recapitulatif de l&apos;ecosysteme
      </h3>

      <CodeBlock
        code={`// Resume : quand utiliser chaque outil TanStack
//
// ┌─────────────────────────────────────────────────────────────────┐
// │                    ECOSYSTEME TANSTACK                         │
// ├─────────────────┬───────────────────────────────────────────────┤
// │  TanStack Query │ Donnees serveur : cache, sync, mutations     │
// │                 │ -> Premier outil a adopter                   │
// │                 │ -> Remplace useEffect + useState pour le     │
// │                 │    data fetching                             │
// ├─────────────────┼───────────────────────────────────────────────┤
// │  TanStack Table │ Tableaux headless : tri, filtre, pagination  │
// │                 │ -> Combine avec Query (data) et Virtual      │
// │                 │    (performance)                             │
// ├─────────────────┼───────────────────────────────────────────────┤
// │  TanStack Form  │ Formulaires reactifs : validation granulaire │
// │                 │ -> Alternative a React Hook Form quand la    │
// │                 │    performance par champ est critique        │
// ├─────────────────┼───────────────────────────────────────────────┤
// │ TanStack Virtual│ Virtualisation : listes de 1000+ elements   │
// │                 │ -> Ne rend que les elements visibles         │
// │                 │ -> Vertical, horizontal, grille              │
// ├─────────────────┼───────────────────────────────────────────────┤
// │ TanStack Router │ Routage type-safe : params, search, loaders │
// │                 │ -> Alternative a Next.js Router              │
// │                 │ -> Type-safety de bout en bout               │
// ├─────────────────┼───────────────────────────────────────────────┤
// │  TanStack Pacer │ Controle de debit : debounce, throttle      │
// │                 │ -> Hooks reactifs pour limiter les appels    │
// ├─────────────────┼───────────────────────────────────────────────┤
// │  TanStack Store │ Store reactif : ~2 KB, immutable            │
// │                 │ -> Moteur interne de Form et Router          │
// │                 │ -> Standalone pour l'etat local partage     │
// ├─────────────────┼───────────────────────────────────────────────┤
// │  TanStack Start │ Framework full-stack (beta)                  │
// │                 │ -> Routeur + SSR + Server Functions          │
// │                 │ -> L'alternative TanStack a Next.js         │
// └─────────────────┴───────────────────────────────────────────────┘
//
// Ordre d'adoption recommande :
// 1. Query (indispensable)
// 2. Table (si tableaux de donnees)
// 3. Virtual (si listes longues)
// 4. Form (si formulaires complexes)
// 5. Pacer (si controle de debit)
// 6. Store (si besoin specifique)
// 7. Router / Start (migration complete)`}
        language="text"
        filename="tanstack-ecosystem-recap.txt"
        category="advanced"
      />
    </div>
  );
}
