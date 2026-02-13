import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';

export default function TanStackRouterSection() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground leading-relaxed">
        TanStack Router est le premier routeur React a offrir une type-safety
        complete de bout en bout : chemins, parametres d&apos;URL, search
        params, loaders -- tout est infere et auto-complete par TypeScript.
        Fini les erreurs de typo dans les paths ou les search params non
        valides. Combine avec TanStack Query, il permet de charger les donnees
        au niveau des routes et d&apos;eliminer les waterfalls de requetes.
      </p>

      <ConceptCard
        title="Type-safety de bout en bout"
        description="TanStack Router est le seul routeur React ou chaque aspect de la navigation est entierement type par TypeScript, sans configuration manuelle des types."
        category="rendering"
      >
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-foreground text-sm">Paths auto-completes</h4>
              <p className="text-sm text-muted-foreground">
                Le composant Link n&apos;accepte que des chemins valides definis
                dans votre arbre de routes. Une faute de frappe dans le path est
                detectee a la compilation.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-foreground text-sm">Params types</h4>
              <p className="text-sm text-muted-foreground">
                Les parametres dynamiques ($userId) sont automatiquement
                disponibles avec leur type correct dans les composants, loaders
                et hooks.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
            <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-foreground text-sm">Search params valides</h4>
              <p className="text-sm text-muted-foreground">
                Les search params sont definis par un schema de validation
                (Zod, Valibot). Le type est infere automatiquement et les
                valeurs invalides sont rejetees.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
            <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-foreground text-sm">Loaders types</h4>
              <p className="text-sm text-muted-foreground">
                Les donnees chargees dans le loader sont automatiquement
                typees dans le composant de route via useLoaderData().
              </p>
            </div>
          </div>
        </div>
      </ConceptCard>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          File-based routing vs code-based routing
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          TanStack Router supporte deux approches : le file-based routing
          (recommande) ou le code-based routing genere par le plugin Vite. Le
          file-based routing est plus intuitif et suit des conventions
          similaires a Next.js, mais avec une type-safety complete.
        </p>
      </div>

      <CodeBlock
        code={`// ---- FILE-BASED ROUTING ----
// Structure de fichiers (convention TanStack Router)
//
// src/routes/
// |-- __root.tsx            # Layout racine
// |-- index.tsx              # /
// |-- about.tsx              # /about
// |-- users/
// |   |-- index.tsx          # /users
// |   |-- $userId.tsx        # /users/:userId (parametre dynamique)
// |   |-- $userId/
// |       |-- posts.tsx      # /users/:userId/posts
// |-- _authenticated/        # Layout group (pas dans l'URL)
// |   |-- dashboard.tsx      # /dashboard (avec layout authentifie)
// |   |-- settings.tsx       # /settings

// ---- src/routes/__root.tsx ----
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div>
      <Header />
      <main className="container mx-auto px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  ),
  // Error boundary global pour toutes les routes
  errorComponent: ({ error }) => (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Erreur inattendue</h1>
      <p className="text-muted-foreground">{error.message}</p>
    </div>
  ),
  // Composant affiche quand aucune route ne correspond
  notFoundComponent: () => (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold">Page introuvable</h1>
    </div>
  ),
});

// ---- CODE-BASED ROUTING ----
// Alternative : definir les routes en code pur
import { createRoute, createRouter } from '@tanstack/react-router';

const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users',
  component: UsersPage,
});

const userRoute = createRoute({
  getParentRoute: () => usersRoute,
  path: '/$userId',
  component: UserDetailPage,
});

// Construction de l'arbre de routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  usersRoute.addChildren([userRoute]),
]);

// Creation du routeur avec type-safety complete
const router = createRouter({ routeTree });

// Declaration du type pour l'auto-completion globale
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}`}
        language="tsx"
        filename="routes-definition.tsx"
        highlightLines={[20, 47, 48, 67, 68, 74, 75]}
        category="rendering"
      />

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Loaders : charger les donnees au niveau de la route
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          Les loaders sont la fonctionnalite qui distingue TanStack Router des
          autres routeurs React. Ils permettent de charger les donnees avant que
          le composant de route ne soit rendu, eliminant les waterfalls et les
          flash de chargement. Les donnees du loader sont typees et accessibles
          via useLoaderData().
        </p>
      </div>

      <CodeBlock
        code={`// src/routes/users/$userId.tsx
import { createFileRoute } from '@tanstack/react-router';

// Le loader s'execute AVANT que le composant ne soit rendu
export const Route = createFileRoute('/users/$userId')({
  // Le loader recoit les params de route types automatiquement
  loader: async ({ params }) => {
    // params.userId est type string (comme dans l'URL)
    const userId = parseInt(params.userId, 10);

    // Charger les donnees en parallele
    const [user, posts] = await Promise.all([
      fetch(\`/api/users/\${userId}\`).then((r) => r.json()),
      fetch(\`/api/users/\${userId}/posts\`).then((r) => r.json()),
    ]);

    return { user, posts };
  },

  // Composant de route : les donnees du loader sont deja disponibles
  component: UserDetailPage,

  // Affiche pendant le chargement du loader
  pendingComponent: () => <UserDetailSkeleton />,

  // Temps minimum d'affichage du pending pour eviter les flash
  pendingMinMs: 200,

  // Affiche si le loader echoue
  errorComponent: ({ error }) => (
    <div className="p-4 text-red-500">
      Impossible de charger cet utilisateur : {error.message}
    </div>
  ),
});

function UserDetailPage() {
  // useLoaderData() retourne le type exact du retour du loader
  // Ici : { user: User; posts: Post[] }
  const { user, posts } = Route.useLoaderData();

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-1">
        <UserProfileCard user={user} />
      </div>
      <div className="col-span-2">
        <h2 className="text-xl font-bold mb-4">
          Articles de {user.name}
        </h2>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}`}
        language="tsx"
        filename="src/routes/users/$userId.tsx"
        highlightLines={[5, 7, 12, 13, 14, 17, 26, 40]}
        category="rendering"
      />

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Integration native avec TanStack Query
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          La combinaison TanStack Router + TanStack Query est la plus puissante.
          Le loader prefetch les donnees dans le cache de TanStack Query, puis
          le composant utilise useQuery pour lire le cache. Cela offre le
          meilleur des deux mondes : pas de waterfall ET revalidation
          automatique.
        </p>
      </div>

      <CodeBlock
        code={`// src/routes/users/$userId.tsx
import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { userQueryOptions, userPostsQueryOptions } from '@/lib/queries/users';

export const Route = createFileRoute('/users/$userId')({
  // Le loader prefetch les donnees dans le cache TanStack Query
  loader: async ({ context: { queryClient }, params }) => {
    const userId = parseInt(params.userId, 10);

    // ensureQueryData : retourne les donnees du cache si disponibles,
    // sinon fetch et met en cache
    await Promise.all([
      queryClient.ensureQueryData(userQueryOptions(userId)),
      queryClient.ensureQueryData(userPostsQueryOptions(userId)),
    ]);
  },

  component: UserDetailPage,
});

function UserDetailPage() {
  const { userId } = Route.useParams();
  const id = parseInt(userId, 10);

  // useSuspenseQuery lit le cache rempli par le loader
  // Les donnees sont GARANTIES d'etre disponibles (pas de isLoading)
  const { data: user } = useSuspenseQuery(userQueryOptions(id));
  const { data: posts } = useSuspenseQuery(userPostsQueryOptions(id));

  // La revalidation automatique de TanStack Query continue de fonctionner :
  // - refetch au window focus
  // - refetch selon staleTime
  // - invalidation apres mutation
  // Tout cela sans aucun code supplementaire

  return (
    <div>
      <h1 className="text-3xl font-bold">{user.name}</h1>
      <p className="text-muted-foreground">{user.email}</p>

      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">Articles ({posts.length})</h2>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
}

// ---- Configuration du routeur avec QueryClient ----
import { createRouter } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  // Passer le queryClient dans le contexte du routeur
  context: { queryClient },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}`}
        language="tsx"
        filename="router-query-integration.tsx"
        highlightLines={[8, 13, 14, 15, 27, 28, 29, 58, 59]}
        category="rendering"
      />

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Search params avec validation
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          TanStack Router permet de definir un schema de validation pour les
          search params de chaque route. Les valeurs sont automatiquement
          parsees, validees et typees. Les search params invalides sont
          remplaces par les valeurs par defaut.
        </p>
      </div>

      <CodeBlock
        code={`// src/routes/users/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

// Schema de validation des search params
const usersSearchSchema = z.object({
  page: z.number().int().positive().default(1).catch(1),
  limit: z.number().int().min(10).max(100).default(20).catch(20),
  role: z.enum(['all', 'admin', 'user', 'editor']).default('all').catch('all'),
  sortBy: z.enum(['name', 'email', 'createdAt']).default('createdAt').catch('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc').catch('desc'),
  search: z.string().optional().catch(undefined),
});

// Le type est infere automatiquement du schema
type UsersSearch = z.infer<typeof usersSearchSchema>;

export const Route = createFileRoute('/users/')({
  // Le schema valide et parse les search params
  validateSearch: usersSearchSchema,

  component: UsersListPage,
});

function UsersListPage() {
  // useSearch() retourne le type exact du schema
  // Chaque propriete est garantie d'avoir le bon type
  const { page, limit, role, sortBy, sortOrder, search } = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
    <div>
      {/* Filtres */}
      <div className="flex gap-4 mb-6">
        <select
          value={role}
          onChange={(e) =>
            navigate({
              search: (prev) => ({ ...prev, role: e.target.value as UsersSearch['role'], page: 1 }),
            })
          }
        >
          <option value="all">Tous les roles</option>
          <option value="admin">Administrateurs</option>
          <option value="user">Utilisateurs</option>
          <option value="editor">Editeurs</option>
        </select>

        <input
          type="text"
          value={search ?? ''}
          onChange={(e) =>
            navigate({
              search: (prev) => ({
                ...prev,
                search: e.target.value || undefined,
                page: 1,
              }),
            })
          }
          placeholder="Rechercher..."
        />
      </div>

      {/* Pagination */}
      <div className="flex gap-2">
        <button
          onClick={() => navigate({ search: (prev) => ({ ...prev, page: page - 1 }) })}
          disabled={page === 1}
        >
          Precedent
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => navigate({ search: (prev) => ({ ...prev, page: page + 1 }) })}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

// ---- Link type-safe avec search params ----
// TypeScript verifie que les search params sont valides
<Link
  to="/users"
  search={{ page: 1, role: 'admin', sortBy: 'name', sortOrder: 'asc', limit: 20 }}
>
  Voir les administrateurs
</Link>`}
        language="tsx"
        filename="search-params-validation.tsx"
        highlightLines={[6, 7, 8, 9, 10, 11, 12, 20, 28, 39, 40, 85, 86]}
        category="rendering"
      />

      <ComparisonTable
        modes={[
          {
            name: 'React Router',
            description:
              'Le routeur React historique, le plus utilise. API declarative, comunaute massive, integration large. v7 introduit les loaders et actions inspires de Remix.',
            pros: [
              'Ecosysteme et communaute massifs',
              'Documentation mature et complete',
              'Loaders et actions (v7+)',
              'Compatible avec tous les meta-frameworks',
            ],
            cons: [
              'Type-safety limitee (paths en string)',
              'Search params non types nativement',
              'Pas d&apos;auto-completion sur les routes',
              'Migration complexe entre versions majeures',
            ],
            useCases: [
              'Applications existantes avec React Router',
              'Projets privilegiant la stabilite ecosysteme',
              'Equipes familières avec l&apos;API',
            ],
            color: 'rgb(239, 68, 68)',
          },
          {
            name: 'TanStack Router',
            description:
              'Routeur 100% type-safe avec inference TypeScript complete. Loaders natifs, search params valides, integration TanStack Query, et auto-completion sur tous les aspects de la navigation.',
            pros: [
              'Type-safety complete de bout en bout',
              'Auto-completion paths, params, search params',
              'Integration native TanStack Query',
              'Search params avec validation schema',
              'Loaders avec prefetching',
            ],
            cons: [
              'Ecosysteme plus jeune',
              'Communaute plus petite',
              'Courbe d&apos;apprentissage TypeScript exigeante',
              'Non compatible avec Next.js (SPA seulement)',
            ],
            useCases: [
              'Nouvelles SPA avec TypeScript strict',
              'Applications avec TanStack Query',
              'Projets valorisant la type-safety maximale',
            ],
            color: 'rgb(0, 150, 136)',
          },
          {
            name: 'Next.js Router',
            description:
              'Routeur file-based integre a Next.js. App Router avec Server Components, Server Actions, layouts imbriques et streaming. Optimise pour le rendu serveur.',
            pros: [
              'Server Components natifs',
              'Streaming et Suspense integres',
              'Layouts imbriques puissants',
              'SEO et performance SSR optimaux',
              'Pas de configuration routing',
            ],
            cons: [
              'Couple a Next.js (pas portable)',
              'Type-safety des params limitee',
              'Search params non valides nativement',
              'Complexite Server/Client boundary',
            ],
            useCases: [
              'Applications full-stack avec SSR',
              'Sites avec fort besoin SEO',
              'Projets utilisant l&apos;ecosysteme Vercel',
            ],
            color: 'rgb(59, 130, 246)',
          },
        ]}
      />
    </div>
  );
}
