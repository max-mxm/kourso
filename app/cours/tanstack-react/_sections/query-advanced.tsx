import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';

export default function QueryAdvancedSection() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground leading-relaxed">
        Maitriser les options avancees de useQuery permet de controler
        precisement le comportement du cache, d&apos;optimiser les performances
        reseau, et de creer des experiences utilisateur fluides. Cette section
        couvre les parametres de cache, les requetes conditionnelles, les
        transformations de donnees, la pagination infinie et les requetes
        dependantes.
      </p>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          staleTime vs gcTime : comprendre le cache
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          Ces deux parametres sont les plus importants de TanStack Query et les
          plus mal compris. staleTime determine quand les donnees sont
          considerees obsoletes, tandis que gcTime determine quand elles sont
          supprimees du cache. Les deux travaillent ensemble pour offrir une
          experience utilisateur optimale.
        </p>
      </div>

      <ComparisonTable
        modes={[
          {
            name: 'staleTime',
            description:
              'Duree pendant laquelle les donnees sont considerees fraiches. Tant que staleTime n&apos;est pas ecoule, aucune revalidation automatique ne sera declenchee (ni sur window focus, ni sur montage). Defaut : 0 (les donnees deviennent stale immediatement).',
            pros: [
              'Reduit les requetes reseau inutiles',
              'Les donnees en cache sont servies instantanement',
              'Controle fin sur la fraicheur par type de donnees',
              'Ameliore la perception de performance',
            ],
            cons: [
              'Des donnees obsoletes peuvent etre affichees',
              'Necessite de choisir la bonne valeur par cas',
              'Trop eleve : donnees desynchronisees',
              'Trop bas : requetes excessives',
            ],
            useCases: [
              'Donnees statiques : staleTime: Infinity',
              'Profils utilisateur : staleTime: 5min',
              'Listes de produits : staleTime: 30s',
              'Donnees temps reel : staleTime: 0',
            ],
            color: 'rgb(0, 150, 136)',
          },
          {
            name: 'gcTime',
            description:
              'Duree de retention du cache apres que TOUS les observateurs (composants) se sont desabonnes. Quand un composant est demonte, le timer gcTime demarre. Si aucun composant ne se reabonne avant l&apos;expiration, les donnees sont supprimees. Defaut : 5 minutes.',
            pros: [
              'Retour instantane sur les pages deja visitees',
              'Economise les requetes lors de navigation rapide',
              'Permet le pattern stale-while-revalidate',
              'Memoire liberee automatiquement',
            ],
            cons: [
              'Consomme de la memoire pour les donnees inactives',
              'Trop eleve : consommation memoire excessive',
              'Trop bas : perte du benefice cache',
              'Non applicable aux donnees sensibles',
            ],
            useCases: [
              'Navigation frequente : gcTime: 10min',
              'Grandes listes : gcTime: 2min',
              'Donnees sensibles : gcTime: 0',
              'Application SPA : gcTime: 30min',
            ],
            color: 'rgb(59, 130, 246)',
          },
        ]}
      />

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Options de revalidation
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          TanStack Query offre plusieurs declencheurs de revalidation automatique.
          Chacun peut etre active ou desactive selon vos besoins. Ces options ne
          s&apos;appliquent que lorsque les donnees sont considerees stale.
        </p>
      </div>

      <CodeBlock
        code={`import { useQuery } from '@tanstack/react-query';

// Configuration fine des options de revalidation
export function DashboardStats() {
  const { data } = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: fetchDashboardStats,

    // Refetch quand l'onglet reprend le focus (defaut: true)
    // Utile pour les donnees qui changent pendant que l'utilisateur
    // est sur un autre onglet
    refetchOnWindowFocus: true,

    // Refetch au montage du composant si les donnees sont stale (defaut: true)
    // Mettre false si le composant est monte/demonte frequemment
    refetchOnMount: true,

    // Refetch quand la connexion revient (defaut: true)
    // Essentiel pour les applications mobiles
    refetchOnReconnect: true,

    // Polling : refetch toutes les 30 secondes
    // Ideal pour les dashboards temps reel
    refetchInterval: 30_000,

    // Le polling continue meme quand l'onglet n'est pas visible
    // A utiliser avec parcimonie pour economiser les ressources
    refetchIntervalInBackground: false,
  });

  return <StatsGrid stats={data} />;
}

// Exemple : donnees statiques sans revalidation
export function AppConfig() {
  const { data: config } = useQuery({
    queryKey: ['config'],
    queryFn: fetchAppConfig,
    staleTime: Infinity,              // Jamais stale
    refetchOnWindowFocus: false,      // Pas de refetch au focus
    refetchOnMount: false,            // Pas de refetch au montage
    refetchOnReconnect: false,        // Pas de refetch a la reconnexion
  });

  return <ConfigDisplay config={config} />;
}`}
        language="tsx"
        filename="revalidation-options.tsx"
        highlightLines={[12, 17, 21, 25, 29]}
        category="rendering"
      />

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Requetes conditionnelles avec enabled
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          L&apos;option enabled permet de desactiver une query tant qu&apos;une
          condition n&apos;est pas remplie. La query ne sera pas executee et
          restera en etat pending. C&apos;est essentiel pour les requetes
          dependantes ou les formulaires de recherche.
        </p>
      </div>

      <CodeBlock
        code={`import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

// Exemple 1 : Recherche declenchee par l'utilisateur
export function UserSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  const { data: results, isLoading, isFetching } = useQuery({
    queryKey: ['users', 'search', debouncedTerm],
    queryFn: () => searchUsers(debouncedTerm),
    // Ne lance pas la requete tant que le terme fait moins de 3 caracteres
    enabled: debouncedTerm.length >= 3,
  });

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          // Debounce de 300ms avant de lancer la recherche
          clearTimeout(window.__searchTimeout);
          window.__searchTimeout = setTimeout(
            () => setDebouncedTerm(e.target.value),
            300
          );
        }}
        placeholder="Rechercher un utilisateur (min. 3 caracteres)..."
      />

      {isLoading && debouncedTerm.length >= 3 && <SearchSkeleton />}
      {isFetching && <span className="text-sm">Recherche en cours...</span>}

      {results?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

// Exemple 2 : Requete dependante d'une autre
export function UserPosts({ userId }: { userId: number | null }) {
  // Cette query ne se lance que quand userId est non-null
  const { data: posts } = useQuery({
    queryKey: ['users', userId, 'posts'],
    queryFn: () => fetchUserPosts(userId!),
    enabled: userId !== null,
  });

  return <PostList posts={posts ?? []} />;
}`}
        language="tsx"
        filename="conditional-queries.tsx"
        highlightLines={[13, 49]}
        category="rendering"
      />

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Transformation de donnees avec select
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          L&apos;option select permet de transformer les donnees retournees par
          la query function avant qu&apos;elles soient exposees au composant.
          Le resultat du select est mis en cache separement, et la
          transformation n&apos;est recalculee que lorsque les donnees brutes
          changent.
        </p>
      </div>

      <CodeBlock
        code={`import { useQuery } from '@tanstack/react-query';

interface ApiUser {
  id: number;
  first_name: string;
  last_name: string;
  email_address: string;
  is_active: boolean;
  created_at: string;
}

// La query function retourne les donnees brutes de l'API
async function fetchUsers(): Promise<ApiUser[]> {
  const res = await fetch('/api/users');
  return res.json();
}

// Composant 1 : n'a besoin que des noms
export function UserNameList() {
  const { data: names } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    // select transforme les donnees AVANT de les exposer
    // Si les donnees brutes n'ont pas change, select n'est pas recalcule
    select: (users) => users.map((u) => \`\${u.first_name} \${u.last_name}\`),
  });

  return (
    <ul>
      {names?.map((name, i) => <li key={i}>{name}</li>)}
    </ul>
  );
}

// Composant 2 : ne veut que les utilisateurs actifs
export function ActiveUserCount() {
  const { data: count } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    select: (users) => users.filter((u) => u.is_active).length,
  });

  return <span>Utilisateurs actifs : {count ?? 0}</span>;
}

// Composant 3 : transformation avec tri et mapping
export function UserDirectory() {
  const { data: directory } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    select: (users) =>
      users
        .filter((u) => u.is_active)
        .sort((a, b) => a.last_name.localeCompare(b.last_name))
        .map((u) => ({
          id: u.id,
          fullName: \`\${u.first_name} \${u.last_name}\`,
          email: u.email_address,
        })),
  });

  return <DirectoryTable entries={directory ?? []} />;
}

// Les 3 composants partagent le MEME cache pour ['users']
// mais chacun transforme les donnees differemment via select`}
        language="tsx"
        filename="select-transformation.tsx"
        highlightLines={[26, 41, 53, 54, 55, 56, 57, 58]}
        category="rendering"
      />

      <ConceptCard
        title="placeholderData vs initialData"
        description="Ces deux options servent a afficher des donnees avant que le fetch soit termine, mais elles ont des comportements tres differents au niveau du cache."
        category="rendering"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-background/50 border border-blue-500/30">
            <h4 className="font-bold text-foreground mb-2">placeholderData</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Donnees temporaires affichees pendant le premier chargement.
              Elles ne sont <strong>jamais ecrites dans le cache</strong> et
              disparaissent des que les vraies donnees arrivent. Le composant
              montre isPlaceholderData: true.
            </p>
            <p className="text-xs text-muted-foreground font-mono">
              Cas : afficher les donnees de la page precedente pendant le
              chargement de la suivante (pagination smooth).
            </p>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-primary/30">
            <h4 className="font-bold text-foreground mb-2">initialData</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Donnees initiales qui sont <strong>ecrites dans le cache</strong> comme
              si elles provenaient du serveur. Elles sont traitees comme de
              vraies donnees. Utile quand vous disposez deja des donnees
              (par exemple depuis un loader SSR ou un cache parent).
            </p>
            <p className="text-xs text-muted-foreground font-mono">
              Cas : hydrater le cache avec les donnees provenant d&apos;un
              Server Component ou d&apos;une page precedente.
            </p>
          </div>
        </div>
      </ConceptCard>

      <CodeBlock
        code={`import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useState } from 'react';

// placeholderData : pagination fluide sans flash de loading
export function PaginatedUsers() {
  const [page, setPage] = useState(1);

  const { data, isPlaceholderData, isFetching } = useQuery({
    queryKey: ['users', { page }],
    queryFn: () => fetchUsers({ page, limit: 20 }),
    // keepPreviousData garde les donnees de la page precedente
    // pendant le chargement de la nouvelle page
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      {/* Indicateur de chargement subtil sans supprimer le contenu */}
      <div className={isFetching ? 'opacity-60' : ''}>
        {data?.users.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Precedent
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          // Desactiver si on affiche des donnees placeholder
          // (la page suivante n'existe peut-etre pas)
          disabled={isPlaceholderData || !data?.hasMore}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

// initialData : hydratation depuis des donnees deja disponibles
export function UserDetail({ userId, prefetchedUser }: {
  userId: number;
  prefetchedUser: User;
}) {
  const { data: user } = useQuery({
    queryKey: ['users', userId],
    queryFn: () => fetchUser(userId),
    // Les donnees sont ecrites dans le cache immediatement
    initialData: prefetchedUser,
    // Indiquer quand initialData a ete recupere pour le staleTime
    initialDataUpdatedAt: Date.now() - 60_000, // il y a 1 minute
  });

  return <UserProfile user={user} />;
}`}
        language="tsx"
        filename="placeholder-vs-initial.tsx"
        highlightLines={[13, 53, 55]}
        category="rendering"
      />

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          useInfiniteQuery : scroll infini et pagination
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          useInfiniteQuery gere automatiquement l&apos;accumulation de pages
          de donnees. Il conserve toutes les pages chargees en cache et expose
          des fonctions pour charger les pages suivantes et precedentes.
        </p>
      </div>

      <CodeBlock
        code={`import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

interface PostsPage {
  posts: Post[];
  nextCursor: string | null;
  hasMore: boolean;
}

async function fetchPosts({ pageParam }: { pageParam: string | null }): Promise<PostsPage> {
  const url = pageParam
    ? \`/api/posts?cursor=\${pageParam}\`
    : '/api/posts';
  const res = await fetch(url);
  return res.json();
}

export function InfinitePostFeed() {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['posts', 'feed'],
    queryFn: fetchPosts,
    // Parametre initial pour la premiere page
    initialPageParam: null as string | null,
    // Extraire le curseur pour la page suivante
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
  });

  // Charger automatiquement la page suivante quand le sentinel est visible
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <FeedSkeleton />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div className="space-y-4">
      {/* data.pages est un tableau de toutes les pages chargees */}
      {data?.pages.map((page, pageIndex) =>
        page.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      )}

      {/* Sentinel element pour l'intersection observer */}
      <div ref={ref} className="h-10 flex items-center justify-center">
        {isFetchingNextPage && <LoadingSpinner />}
        {!hasNextPage && (
          <p className="text-muted-foreground text-sm">
            Tous les articles ont ete charges.
          </p>
        )}
      </div>
    </div>
  );
}`}
        language="tsx"
        filename="infinite-scroll.tsx"
        highlightLines={[30, 31, 32, 34, 36, 37, 42, 43, 44]}
        category="rendering"
      />

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Requetes paralleles et dependantes
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          Quand plusieurs queries sont independantes, elles s&apos;executent
          en parallele automatiquement. Pour les requetes qui dependent du
          resultat d&apos;une autre, l&apos;option enabled permet de creer
          une chaine de dependances.
        </p>
      </div>

      <CodeBlock
        code={`import { useQuery, useQueries } from '@tanstack/react-query';

// Requetes paralleles automatiques
// Ces deux queries se lancent en meme temps
export function UserDashboard({ userId }: { userId: number }) {
  const profileQuery = useQuery({
    queryKey: ['users', userId],
    queryFn: () => fetchUser(userId),
  });

  const postsQuery = useQuery({
    queryKey: ['users', userId, 'posts'],
    queryFn: () => fetchUserPosts(userId),
  });

  const notificationsQuery = useQuery({
    queryKey: ['users', userId, 'notifications'],
    queryFn: () => fetchUserNotifications(userId),
  });

  // Les 3 queries s'executent en parallele
  const isLoading = profileQuery.isLoading
    || postsQuery.isLoading
    || notificationsQuery.isLoading;

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="grid grid-cols-3 gap-6">
      <ProfileCard profile={profileQuery.data} />
      <PostsList posts={postsQuery.data} />
      <NotificationPanel notifications={notificationsQuery.data} />
    </div>
  );
}

// useQueries pour un nombre dynamique de queries paralleles
export function MultiUserComparison({ userIds }: { userIds: number[] }) {
  const userQueries = useQueries({
    queries: userIds.map((id) => ({
      queryKey: ['users', id],
      queryFn: () => fetchUser(id),
      staleTime: 5 * 60 * 1000,
    })),
  });

  const allLoaded = userQueries.every((q) => q.isSuccess);
  const users = userQueries.map((q) => q.data).filter(Boolean);

  return allLoaded ? <ComparisonGrid users={users} /> : <LoadingSkeleton />;
}

// Requetes dependantes : la seconde attend le resultat de la premiere
export function UserWithOrganization({ userId }: { userId: number }) {
  // 1. D'abord, charger l'utilisateur
  const { data: user } = useQuery({
    queryKey: ['users', userId],
    queryFn: () => fetchUser(userId),
  });

  // 2. Ensuite, charger l'organisation de l'utilisateur
  // Cette query ne se lance PAS tant que user est undefined
  const { data: organization } = useQuery({
    queryKey: ['organizations', user?.organizationId],
    queryFn: () => fetchOrganization(user!.organizationId),
    enabled: !!user?.organizationId,
  });

  return (
    <div>
      <UserCard user={user} />
      {organization && <OrganizationBadge org={organization} />}
    </div>
  );
}`}
        language="tsx"
        filename="parallel-dependent-queries.tsx"
        highlightLines={[21, 22, 23, 39, 40, 41, 42, 43, 63, 64, 65]}
        category="rendering"
      />
    </div>
  );
}
