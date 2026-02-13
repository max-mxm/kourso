import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';

export default function SSRNextJSSection() {
  const routerComparison = [
    {
      name: 'Pages Router',
      description: 'Architecture originale de Next.js avec getServerSideProps/getStaticProps pour le data fetching.',
      pros: [
        'Ecosysteme mature et stable',
        'Documentation abondante',
        'Patterns bien etablis',
        'Compatible avec toutes les librairies existantes',
      ],
      cons: [
        'Data fetching couple au fichier page',
        'Hydratation manuelle du cache Query',
        'Pas de Server Components natifs',
        'Waterfall de requetes difficile a eviter',
      ],
      useCases: [
        'Projets existants en migration progressive',
        'Equipes habituees au modele Pages Router',
        'Applications avec contraintes de compatibilite',
      ],
      color: 'rgb(59, 130, 246)',
    },
    {
      name: 'App Router',
      description: 'Architecture moderne de Next.js avec Server Components, Streaming et prefetching integre.',
      pros: [
        'Server Components natifs',
        'Streaming et Suspense integres',
        'prefetchQuery + dehydrate optimise',
        'Layouts imbriques et paralleles',
      ],
      cons: [
        'Courbe d\'apprentissage plus elevee',
        'Certaines librairies pas encore compatibles',
        'Debugging plus complexe (server vs client)',
      ],
      useCases: [
        'Nouveaux projets Next.js',
        'Applications avec fort besoin SEO',
        'Projets necessitant du streaming',
      ],
      color: 'rgb(0, 150, 136)',
    },
    {
      name: 'TanStack Start',
      description: 'Framework full-stack de TanStack avec routeur type-safe, SSR integre et data fetching optimal.',
      pros: [
        'Routeur 100% type-safe (params, search, loaders)',
        'Data fetching integre au routeur (loaders)',
        'Pas de frontiere server/client artificielle',
        'Demarrage le plus rapide pour un projet TanStack',
      ],
      cons: [
        'Ecosysteme encore jeune',
        'Moins de ressources communautaires',
        'Pas de deploiement Vercel optimise',
        'API en evolution',
      ],
      useCases: [
        'Projets greenfield avec ecosysteme TanStack complet',
        'Applications necessitant un routeur type-safe',
        'Equipes familiarisees avec TanStack',
      ],
      color: 'rgb(249, 115, 22)',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          L&apos;integration de TanStack Query avec le Server-Side Rendering est l&apos;un des patterns les plus
          puissants de l&apos;ecosysteme. Le principe : prefetcher les donnees cote serveur, les serialiser
          dans le HTML, puis les hydrater dans le cache client. L&apos;utilisateur voit un contenu
          instantane sans flash de chargement, et le cache client est immediatement operationnel.
        </p>
      </div>

      <h3 className="text-xl font-semibold text-foreground">
        Server Components + prefetchQuery + dehydrate
      </h3>

      <CodeBlock
        code={`// app/users/page.tsx (Server Component)
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { UserList } from './user-list';

// Fonction de fetch reutilisable (serveur et client)
async function fetchUsers(page: number) {
  const response = await fetch(
    \`\${process.env.API_URL}/users?page=\${page}&limit=20\`,
    { next: { revalidate: 60 } } // ISR : revalider toutes les 60 secondes
  );
  if (!response.ok) throw new Error('Erreur chargement utilisateurs');
  return response.json();
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  // Creer un QueryClient dedie a cette requete serveur
  const queryClient = new QueryClient();

  // Prefetch : la donnee est mise en cache AVANT le rendu
  await queryClient.prefetchQuery({
    queryKey: ['users', { page }],
    queryFn: () => fetchUsers(page),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* UserList est un Client Component qui utilise useQuery */}
      {/* Le cache est deja rempli : pas de loading state initial */}
      <UserList initialPage={page} />
    </HydrationBoundary>
  );
}`}
        language="tsx"
        filename="app/users/page.tsx"
        highlightLines={[28, 31, 32, 33, 34, 37, 38, 39, 40]}
        category="advanced"
      />

      <h3 className="text-xl font-semibold text-foreground">
        HydrationBoundary dans l&apos;App Router
      </h3>

      <CodeBlock
        code={`// app/users/user-list.tsx (Client Component)
'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UsersResponse {
  users: User[];
  totalPages: number;
  currentPage: number;
}

export function UserList({ initialPage }: { initialPage: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || initialPage;

  // useQuery consomme les donnees prefetchees par le Server Component.
  // Au premier rendu, la donnee est deja en cache : pas de loading.
  const { data, isLoading, isFetching, isPlaceholderData } =
    useQuery<UsersResponse>({
      queryKey: ['users', { page }],
      queryFn: async () => {
        const response = await fetch(\`/api/users?page=\${page}&limit=20\`);
        if (!response.ok) throw new Error('Erreur de chargement');
        return response.json();
      },
      placeholderData: keepPreviousData, // garder les donnees precedentes pendant le fetch
      staleTime: 1000 * 30, // considerer frais pendant 30 secondes
    });

  const goToPage = (newPage: number) => {
    router.push(\`/users?page=\${newPage}\`);
  };

  if (isLoading) {
    return <div className="animate-pulse">Chargement...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Indicateur de transition entre pages */}
      {isFetching && !isLoading && (
        <div className="h-1 bg-primary/20 rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-pulse w-full" />
        </div>
      )}

      {/* Liste des utilisateurs */}
      <div className={\`space-y-2 transition-opacity \${isPlaceholderData ? 'opacity-60' : 'opacity-100'}\`}>
        {data?.users.map((user) => (
          <div key={user.id} className="p-4 rounded-lg border border-border/50">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <span className="text-xs bg-muted px-2 py-0.5 rounded mt-1 inline-block">
              {user.role}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page <= 1}
          className="px-4 py-2 rounded-md border text-sm disabled:opacity-50"
        >
          Precedent
        </button>
        <span className="text-sm text-muted-foreground">
          Page {data?.currentPage} sur {data?.totalPages}
        </span>
        <button
          onClick={() => goToPage(page + 1)}
          disabled={page >= (data?.totalPages ?? 1)}
          className="px-4 py-2 rounded-md border text-sm disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}`}
        language="tsx"
        filename="app/users/user-list.tsx"
        highlightLines={[27, 28, 29, 30, 31, 35, 36]}
        category="advanced"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Streaming avec Suspense
      </h3>

      <CodeBlock
        code={`// app/dashboard/page.tsx
// Pattern : prefetch multiple + streaming progressif
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Suspense } from 'react';
import { DashboardStats } from './dashboard-stats';
import { RecentOrders } from './recent-orders';
import { UserActivity } from './user-activity';

// Fonctions de fetch separees
async function fetchStats() {
  const res = await fetch(\`\${process.env.API_URL}/dashboard/stats\`);
  return res.json();
}

async function fetchRecentOrders() {
  const res = await fetch(\`\${process.env.API_URL}/orders/recent\`);
  return res.json();
}

async function fetchUserActivity() {
  // Cette requete est lente (~2s)
  const res = await fetch(\`\${process.env.API_URL}/analytics/activity\`);
  return res.json();
}

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  // Prefetch les donnees rapides en parallele
  // Les donnees lentes seront streamees via Suspense
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['dashboard', 'stats'],
      queryFn: fetchStats,
    }),
    queryClient.prefetchQuery({
      queryKey: ['orders', 'recent'],
      queryFn: fetchRecentOrders,
    }),
  ]);

  // NE PAS attendre fetchUserActivity ici
  // Elle sera chargee en streaming cote client

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="grid gap-6">
        {/* Rendu immediat : donnees deja prefetchees */}
        <DashboardStats />
        <RecentOrders />

        {/* Streaming : affiche un skeleton pendant le chargement */}
        <Suspense
          fallback={
            <div className="h-64 rounded-lg bg-muted animate-pulse" />
          }
        >
          <UserActivity />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
}

// -- Composant streame --
// app/dashboard/user-activity.tsx
'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

interface ActivityData {
  date: string;
  activeUsers: number;
  sessions: number;
}

export function UserActivity() {
  // useSuspenseQuery declenche le Suspense boundary parent
  // Le composant ne se rend que lorsque les donnees sont disponibles
  const { data } = useSuspenseQuery<ActivityData[]>({
    queryKey: ['analytics', 'activity'],
    queryFn: async () => {
      const response = await fetch('/api/analytics/activity');
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <div className="rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">Activite utilisateurs</h3>
      <div className="space-y-2">
        {data.map((entry) => (
          <div key={entry.date} className="flex justify-between text-sm">
            <span>{new Date(entry.date).toLocaleDateString('fr-FR')}</span>
            <span className="font-medium">
              {entry.activeUsers} utilisateurs actifs
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}`}
        language="tsx"
        filename="streaming-dashboard.tsx"
        highlightLines={[36, 37, 38, 39, 40, 41, 42, 43, 44, 60, 61, 62, 63, 64, 86, 87, 88]}
        category="advanced"
      />

      <ConceptCard
        title="TanStack Start : le framework full-stack TanStack"
        description="TanStack Start est un framework full-stack construit sur TanStack Router. Il integre nativement le SSR, le data fetching via les loaders du routeur, et une type-safety de bout en bout. C'est l'alternative TanStack a Next.js, optimisee pour l'ecosysteme TanStack."
        category="advanced"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>-- <strong>Routeur type-safe</strong> : chaque route a des types inferes pour ses params, search params et loader data. Les erreurs de typage sont detectees a la compilation</li>
          <li>-- <strong>Loaders integres</strong> : le data fetching est declare au niveau de la route, pas du composant. Le routeur orchestre le prefetching automatiquement</li>
          <li>-- <strong>Server Functions</strong> : equivalent des Server Actions de Next.js, avec une API type-safe et des validations integrees</li>
          <li>-- <strong>Deploiement flexible</strong> : compatible avec Vercel, Cloudflare Workers, Netlify, Node.js et Bun</li>
          <li>-- <strong>Etat de maturite</strong> : en beta active (debut 2026). A considerer pour les nouveaux projets si l&apos;equipe est investie dans l&apos;ecosysteme TanStack</li>
        </ul>
      </ConceptCard>

      <h3 className="text-xl font-semibold text-foreground">
        Comparaison des approches SSR
      </h3>

      <ComparisonTable modes={routerComparison} />
    </div>
  );
}
