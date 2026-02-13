import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function QueryPatternsSection() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground leading-relaxed">
        A mesure qu&apos;une application grandit, la gestion des queries devient
        un enjeu d&apos;architecture. Repeter les query keys et les query
        functions dans chaque composant conduit a des incoherences, des erreurs
        de typage et un code difficile a maintenir. Cette section presente les
        patterns d&apos;organisation qui transforment TanStack Query en une
        couche de donnees robuste et scalable.
      </p>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          queryOptions() : centraliser key et function
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          Le helper queryOptions() cree un objet reutilisable qui encapsule la
          query key, la query function et toutes les options. TypeScript infere
          automatiquement le type de retour. Cet objet peut etre passe
          directement a useQuery, prefetchQuery ou fetchQuery.
        </p>
      </div>

      <CodeBlock
        code={`import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query';

// ---- Definition centralisee ----

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'editor';
}

// queryOptions cree un objet type-safe reutilisable partout
export const userQueryOptions = (userId: number) =>
  queryOptions({
    queryKey: ['users', userId],
    queryFn: async (): Promise<User> => {
      const res = await fetch(\`/api/users/\${userId}\`);
      if (!res.ok) throw new Error('Utilisateur introuvable');
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });

export const usersListQueryOptions = (filters?: { role?: string; page?: number }) =>
  queryOptions({
    queryKey: ['users', 'list', filters ?? {}],
    queryFn: async (): Promise<{ users: User[]; total: number }> => {
      const params = new URLSearchParams();
      if (filters?.role) params.set('role', filters.role);
      if (filters?.page) params.set('page', String(filters.page));
      const res = await fetch(\`/api/users?\${params}\`);
      return res.json();
    },
    staleTime: 30 * 1000,
  });

// ---- Utilisation dans les composants ----

// Le type de data est infere automatiquement : User
export function UserProfile({ userId }: { userId: number }) {
  const { data: user } = useQuery(userQueryOptions(userId));
  return <div>{user?.name}</div>;
}

// Prefetch avec les memes options
export function UserLink({ userId }: { userId: number }) {
  const queryClient = useQueryClient();

  const handleMouseEnter = () => {
    // Prefetch au survol : les options sont identiques
    queryClient.prefetchQuery(userQueryOptions(userId));
  };

  return (
    <a href={\`/users/\${userId}\`} onMouseEnter={handleMouseEnter}>
      Voir le profil
    </a>
  );
}`}
        language="tsx"
        filename="query-options.ts"
        highlightLines={[13, 14, 15, 25, 26, 41, 50]}
        category="rendering"
      />

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Query key factory : un module dedie
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          Le pattern query key factory centralise toutes les query keys d&apos;un
          domaine dans un objet unique. Chaque methode retourne une query key
          typee. Cela garantit la coherence entre les queries et les
          invalidations, et facilite le refactoring.
        </p>
      </div>

      <CodeBlock
        code={`// lib/queries/users.ts - Query Key Factory

// Le factory centralise toutes les keys d'un domaine
export const userKeys = {
  // Racine du domaine
  all: ['users'] as const,

  // Listes avec filtres
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: UserFilters) => [...userKeys.lists(), filters] as const,

  // Details individuels
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,

  // Sous-ressources
  posts: (userId: number) => [...userKeys.detail(userId), 'posts'] as const,
  settings: (userId: number) => [...userKeys.detail(userId), 'settings'] as const,
} as const;

// Exemple pour un autre domaine
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters: PostFilters) => [...postKeys.lists(), filters] as const,
  detail: (id: number) => [...postKeys.all, 'detail', id] as const,
  comments: (postId: number) => [...postKeys.detail(postId), 'comments'] as const,
} as const;

// ---- Utilisation ----

// Dans les queries
useQuery({
  queryKey: userKeys.detail(42),
  queryFn: () => fetchUser(42),
});

useQuery({
  queryKey: userKeys.list({ role: 'admin', page: 1 }),
  queryFn: () => fetchUsers({ role: 'admin', page: 1 }),
});

// Dans les invalidations
// Invalider TOUTES les listes utilisateur (quel que soit le filtre)
queryClient.invalidateQueries({ queryKey: userKeys.lists() });

// Invalider TOUT ce qui concerne le user 42
queryClient.invalidateQueries({ queryKey: userKeys.detail(42) });

// Invalider absolument toutes les queries utilisateur
queryClient.invalidateQueries({ queryKey: userKeys.all });`}
        language="tsx"
        filename="lib/queries/users.ts"
        highlightLines={[4, 7, 10, 14, 17, 18, 33, 44, 47, 50]}
        category="rendering"
      />

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Custom hooks : l&apos;interface finale
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          Combiner queryOptions avec un query key factory dans des custom hooks
          offre une API propre et type-safe pour vos composants. Les composants
          n&apos;ont aucune connaissance de la structure du cache ou des
          endpoints API.
        </p>
      </div>

      <CodeBlock
        code={`// hooks/use-users.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from '@/lib/queries/users';

// ---- Hooks de lecture ----

export function useUser(userId: number) {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000,
    enabled: userId > 0,
  });
}

export function useUsers(filters?: UserFilters) {
  return useQuery({
    queryKey: userKeys.list(filters ?? {}),
    queryFn: () => fetchUsers(filters),
    staleTime: 30 * 1000,
  });
}

export function useUserPosts(userId: number) {
  return useQuery({
    queryKey: userKeys.posts(userId),
    queryFn: () => fetchUserPosts(userId),
    enabled: userId > 0,
  });
}

// ---- Hooks de mutation ----

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserOnServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserPayload }) =>
      updateUserOnServer(id, data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(userKeys.detail(updatedUser.id), updatedUser);
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserOnServer,
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: userKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}

// ---- Utilisation dans un composant ----

export function UserManager() {
  const { data: users, isLoading } = useUsers({ role: 'admin' });
  const createUser = useCreateUser();
  const deleteUser = useDeleteUser();

  if (isLoading) return <Skeleton />;

  return (
    <div>
      {users?.map((user) => (
        <div key={user.id} className="flex justify-between">
          <span>{user.name}</span>
          <button onClick={() => deleteUser.mutate(user.id)}>
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
}`}
        language="tsx"
        filename="hooks/use-users.ts"
        highlightLines={[8, 17, 25, 34, 45, 57, 73, 74, 75]}
        category="rendering"
      />

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Prefetching : anticiper les besoins
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          Le prefetching charge des donnees dans le cache avant que
          l&apos;utilisateur n&apos;en ait besoin. Quand il navigue vers la
          page correspondante, les donnees sont deja disponibles et la page
          s&apos;affiche instantanement. Deux approches : prefetchQuery
          (imperatif) et le hook usePrefetchQuery (declaratif).
        </p>
      </div>

      <CodeBlock
        code={`import {
  useQueryClient,
  usePrefetchQuery,
} from '@tanstack/react-query';
import { userQueryOptions } from '@/lib/queries/users';

// ---- Approche imperative : prefetchQuery ----

// Prefetch au survol d'un lien
export function UserListItem({ user }: { user: User }) {
  const queryClient = useQueryClient();

  return (
    <Link
      href={\`/users/\${user.id}\`}
      onMouseEnter={() => {
        // Prefetch les donnees du profil quand l'utilisateur survole le lien
        queryClient.prefetchQuery(userQueryOptions(user.id));
      }}
      onFocus={() => {
        // Egalement au focus pour l'accessibilite clavier
        queryClient.prefetchQuery(userQueryOptions(user.id));
      }}
    >
      {user.name}
    </Link>
  );
}

// Prefetch dans un loader (SSR ou route transition)
export async function prefetchUserPage(queryClient: QueryClient, userId: number) {
  // Prefetch en parallele : profil + posts
  await Promise.all([
    queryClient.prefetchQuery(userQueryOptions(userId)),
    queryClient.prefetchQuery({
      queryKey: ['users', userId, 'posts'],
      queryFn: () => fetchUserPosts(userId),
    }),
  ]);
}

// ---- Approche declarative : usePrefetchQuery ----

// Le hook prefetch automatiquement au montage du composant
export function UserPageLayout({ userId }: { userId: number }) {
  // Les donnees sont prefetchees des que ce composant est monte
  // Utile pour prefetcher les donnees de la prochaine section visible
  usePrefetchQuery(userQueryOptions(userId));

  return (
    <div>
      {/* Ce composant sera monte plus tard, mais les donnees sont deja en cache */}
      <Suspense fallback={<Skeleton />}>
        <UserProfile userId={userId} />
      </Suspense>
    </div>
  );
}`}
        language="tsx"
        filename="prefetching-patterns.tsx"
        highlightLines={[18, 22, 33, 34, 48]}
        category="rendering"
      />

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Gestion d&apos;erreurs globale et retry
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          TanStack Query offre une gestion d&apos;erreurs a deux niveaux :
          global via les callbacks du QueryCache, et local via les options de
          chaque query. Le retry automatique avec backoff exponentiel est
          configure par defaut et peut etre personnalise finement.
        </p>
      </div>

      <CodeBlock
        code={`import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { toast } from 'sonner';

// ---- Configuration globale des erreurs ----

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // Notification globale pour toutes les erreurs de query
      // Seulement si la query avait deja des donnees (revalidation echouee)
      if (query.state.data !== undefined) {
        toast.error(\`Erreur de mise a jour : \${error.message}\`);
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      // Notification globale pour toutes les erreurs de mutation
      toast.error(\`Operation echouee : \${error.message}\`);
    },
  }),
  defaultOptions: {
    queries: {
      // ---- Configuration du retry ----

      // Nombre de tentatives (defaut: 3)
      retry: 3,

      // Fonction personnalisee : ne pas retenter les 404
      retry: (failureCount, error) => {
        if (error instanceof HttpError && error.status === 404) return false;
        if (error instanceof HttpError && error.status === 401) return false;
        return failureCount < 3;
      },

      // Delai entre les tentatives (backoff exponentiel par defaut)
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Attempt 0 : 1s, Attempt 1 : 2s, Attempt 2 : 4s (max 30s)

      // Gestion globale d'erreur par defaut
      throwOnError: false, // Ne pas propager aux Error Boundaries par defaut
    },
    mutations: {
      // Les mutations ne retentent pas par defaut (donnees pourraient etre dupliquees)
      retry: false,
    },
  },
});

// ---- Classe d'erreur personnalisee ----

class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

// Fetch wrapper qui throw des HttpError typees
async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new HttpError(
      response.status,
      \`\${response.status}: \${response.statusText}\`,
    );
  }

  return response.json();
}`}
        language="tsx"
        filename="error-handling-global.ts"
        highlightLines={[7, 8, 16, 17, 30, 31, 32, 33, 37, 40]}
        category="rendering"
      />

      <ConceptCard
        title="Error Boundaries et TanStack Query"
        description="TanStack Query s'integre nativement avec les Error Boundaries de React pour une gestion d'erreurs declarative au niveau du composant ou de la page."
        category="rendering"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-background/50 border border-border/50">
            <h4 className="font-bold text-foreground mb-2">throwOnError</h4>
            <p className="text-sm text-muted-foreground">
              En activant <code className="text-primary">throwOnError: true</code> sur
              une query, l&apos;erreur est propagee a l&apos;Error Boundary parent
              au lieu d&apos;etre geree dans le composant. Cela permet de definir
              un fallback UI au niveau de la page ou de la section, sans polluer
              chaque composant avec de la logique d&apos;erreur.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-border/50">
            <h4 className="font-bold text-foreground mb-2">useQueryErrorResetBoundary</h4>
            <p className="text-sm text-muted-foreground">
              Ce hook fournit une fonction reset qui permet a l&apos;Error
              Boundary de relancer les queries echouees quand l&apos;utilisateur
              clique sur un bouton &quot;Reessayer&quot;. Combine avec le composant
              QueryErrorResetBoundary, il offre une experience de recovery
              complete.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-border/50">
            <h4 className="font-bold text-foreground mb-2">Strategie recommandee</h4>
            <p className="text-sm text-muted-foreground">
              Utilisez throwOnError pour les queries critiques ou le composant ne
              peut pas fonctionner sans donnees (profil utilisateur, configuration).
              Gardez la gestion locale (isError) pour les queries secondaires ou une
              degradation gracieuse est possible (suggestions, recommandations).
            </p>
          </div>
        </div>
      </ConceptCard>
    </div>
  );
}
