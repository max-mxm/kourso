import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function QueryBasicsSection() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground leading-relaxed">
        TanStack Query transforme la facon dont vous gerez les donnees
        asynchrones dans React. Au lieu de jongler avec useState, useEffect et
        des variables loading/error manuelles, vous declarezce que vous voulez
        fetcher et TanStack Query s&apos;occupe du reste : cache, revalidation,
        deduplication, retry automatique et synchronisation entre composants.
      </p>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Installation et configuration initiale
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          L&apos;installation necessite un seul package principal. Le
          QueryClient est l&apos;instance centrale qui gere le cache de toutes
          vos queries. Le QueryClientProvider doit envelopper votre application
          pour rendre le client accessible a tous les composants via le contexte
          React.
        </p>
      </div>

      <CodeBlock
        code={`// Installation
// npm install @tanstack/react-query
// npm install @tanstack/react-query-devtools (optionnel, recommande)

// app/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  // Creer le QueryClient dans un useState pour eviter
  // le partage entre requetes serveur en SSR
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Les donnees sont considerees fraiches pendant 60 secondes
            staleTime: 60 * 1000,
            // Le cache est conserve 5 minutes apres la derniere utilisation
            gcTime: 5 * 60 * 1000,
            // Retry 3 fois avec backoff exponentiel par defaut
            retry: 3,
            // Refetch quand la fenetre reprend le focus
            refetchOnWindowFocus: true,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}`}
        language="tsx"
        filename="app/providers.tsx"
        highlightLines={[16, 17, 18, 22, 24, 28]}
        category="fundamentals"
      />

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          useQuery : le hook fondamental
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          useQuery prend deux parametres essentiels : une <strong>query
          key</strong> qui identifie de facon unique les donnees dans le cache,
          et une <strong>query function</strong> qui effectue le fetch. En
          retour, il expose un objet riche avec l&apos;etat complet de la
          requete.
        </p>
      </div>

      <CodeBlock
        code={`import { useQuery } from '@tanstack/react-query';

// Type pour nos donnees
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'editor';
  createdAt: string;
}

// Fonction de fetch separee (bonne pratique)
async function fetchUsers(): Promise<User[]> {
  const response = await fetch('/api/users');

  if (!response.ok) {
    // TanStack Query attend une Error throwee pour declencher isError
    throw new Error(\`Erreur HTTP \${response.status}: \${response.statusText}\`);
  }

  return response.json();
}

// Composant utilisant useQuery
export function UserList() {
  const {
    data: users,       // Les donnees (undefined tant que pas chargees)
    isLoading,         // true au premier chargement (pas de donnees en cache)
    isFetching,        // true a chaque fetch (y compris revalidation en background)
    isError,           // true si la derniere requete a echoue
    error,             // L'objet Error si isError === true
    status,            // 'pending' | 'error' | 'success'
    isStale,           // true si les donnees sont considerees obsoletes
    isPlaceholderData, // true si on affiche des donnees placeholder
    refetch,           // Fonction pour forcer un refetch manuel
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  // Etat de chargement initial
  if (isLoading) {
    return <UserListSkeleton />;
  }

  // Gestion d'erreur
  if (isError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">
          Impossible de charger les utilisateurs : {error.message}
        </p>
        <button onClick={() => refetch()} className="mt-2 text-red-600 underline">
          Reessayer
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Indicateur de revalidation en arriere-plan */}
      {isFetching && (
        <div className="text-sm text-muted-foreground mb-2">
          Mise a jour en cours...
        </div>
      )}

      <ul className="space-y-2">
        {users?.map((user) => (
          <li key={user.id} className="p-3 border rounded-lg">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
              {user.role}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}`}
        language="tsx"
        filename="components/user-list.tsx"
        highlightLines={[27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38]}
        category="fundamentals"
      />

      <ConceptCard
        title="Cycle de vie d&apos;une query"
        description="Comprendre les differents etats par lesquels passe une query est essentiel pour gerer correctement l&apos;affichage dans vos composants."
        category="fundamentals"
      >
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
            <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-foreground text-sm">pending (isLoading)</h4>
              <p className="text-sm text-muted-foreground">
                Etat initial. Aucune donnee en cache. La query function est en
                cours d&apos;execution pour la premiere fois. C&apos;est le
                moment d&apos;afficher un skeleton ou un spinner.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-foreground text-sm">success (isSuccess)</h4>
              <p className="text-sm text-muted-foreground">
                Les donnees ont ete recues avec succes. Elles sont stockees en
                cache et accessibles via data. La query peut etre fresh
                (staleTime non ecoule) ou stale (prete a etre revalidee).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
            <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-foreground text-sm">error (isError)</h4>
              <p className="text-sm text-muted-foreground">
                La query function a echoue apres les tentatives de retry. L&apos;objet
                error contient les details. Les donnees precedemment en cache
                restent accessibles si elles existent.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-foreground text-sm">isFetching (revalidation)</h4>
              <p className="text-sm text-muted-foreground">
                Un fetch est en cours, mais ce n&apos;est pas forcement le
                premier. La revalidation en arriere-plan se produit quand la
                fenetre reprend le focus, ou quand staleTime est ecoule. Les
                donnees existantes restent affichees pendant ce temps.
              </p>
            </div>
          </div>
        </div>
      </ConceptCard>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Query Keys : la cle de voute du cache
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          Les query keys sont des tableaux serializables qui identifient de
          facon unique les donnees en cache. TanStack Query utilise un
          algorithme de serialisation deterministe : l&apos;ordre des proprietes
          dans un objet n&apos;a pas d&apos;importance. Deux composants
          utilisant la meme query key partagent automatiquement les memes
          donnees en cache.
        </p>
      </div>

      <CodeBlock
        code={`// Query keys : du simple au complexe

// 1. String simple -- liste globale
useQuery({ queryKey: ['users'], queryFn: fetchUsers });

// 2. Avec un identifiant -- un element specifique
useQuery({ queryKey: ['users', userId], queryFn: () => fetchUser(userId) });

// 3. Avec un objet de filtres -- liste filtree
useQuery({
  queryKey: ['users', { role: 'admin', status: 'active' }],
  queryFn: () => fetchUsers({ role: 'admin', status: 'active' }),
});

// 4. Cle hierarchique -- sous-ressource
useQuery({
  queryKey: ['users', userId, 'posts'],
  queryFn: () => fetchUserPosts(userId),
});

// 5. Avec pagination
useQuery({
  queryKey: ['users', { page, limit, sortBy }],
  queryFn: () => fetchUsers({ page, limit, sortBy }),
});

// IMPORTANT : la serialisation est deterministe
// Ces deux cles sont IDENTIQUES en cache :
['users', { role: 'admin', status: 'active' }]
['users', { status: 'active', role: 'admin' }]

// Ces deux cles sont DIFFERENTES (l'ordre des elements du tableau compte) :
['users', 'active']
['active', 'users']

// Invalidation hierarchique :
// invalidateQueries({ queryKey: ['users'] }) invalide TOUTES ces queries :
// ['users']
// ['users', 1]
// ['users', { role: 'admin' }]
// ['users', 1, 'posts']`}
        language="tsx"
        filename="query-keys-examples.ts"
        highlightLines={[29, 30, 31, 34, 35]}
        category="fundamentals"
      />

      <ConceptCard
        title="Regles de serialisation des query keys"
        description="Les query keys suivent des regles precises de serialisation qui determinent si deux queries partagent ou non les memes donnees en cache."
        category="fundamentals"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>
              <strong>Les tableaux sont compares par reference positionnelle</strong> :
              [&apos;users&apos;, 1] et [1, &apos;users&apos;] sont deux cles differentes.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>
              <strong>Les objets sont serialises de facon deterministe</strong> :
              l&apos;ordre des proprietes est ignore. {`{ a: 1, b: 2 }`} egal {`{ b: 2, a: 1 }`}.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>
              <strong>L&apos;invalidation est hierarchique</strong> :
              invalider [&apos;users&apos;] invalide aussi [&apos;users&apos;, 1]
              et [&apos;users&apos;, 1, &apos;posts&apos;].
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>
              <strong>Seules les valeurs serializables sont acceptees</strong> :
              pas de fonctions, pas de classes, pas de symboles dans les query keys.
            </span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// Fetch d'un utilisateur unique avec useQuery
import { useQuery } from '@tanstack/react-query';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

async function fetchUserProfile(userId: number): Promise<UserProfile> {
  const response = await fetch(\`/api/users/\${userId}\`);
  if (!response.ok) {
    throw new Error('Utilisateur introuvable');
  }
  return response.json();
}

export function UserProfile({ userId }: { userId: number }) {
  const { data: profile, isLoading, isError, error } = useQuery({
    queryKey: ['users', userId],
    queryFn: () => fetchUserProfile(userId),
    // La query est desactivee si userId est invalide
    enabled: userId > 0,
    // Les donnees d'un profil restent fraiches 2 minutes
    staleTime: 2 * 60 * 1000,
  });

  if (isLoading) return <ProfileSkeleton />;
  if (isError) return <ErrorMessage message={error.message} />;
  if (!profile) return null;

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">{profile.name}</h2>
          <p className="text-muted-foreground">{profile.email}</p>
        </div>
      </div>

      <p className="text-foreground/80 mb-4">{profile.bio}</p>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold">{profile.stats.posts}</p>
          <p className="text-sm text-muted-foreground">Articles</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{profile.stats.followers}</p>
          <p className="text-sm text-muted-foreground">Abonnes</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{profile.stats.following}</p>
          <p className="text-sm text-muted-foreground">Abonnements</p>
        </div>
      </div>
    </div>
  );
}`}
        language="tsx"
        filename="components/user-profile.tsx"
        highlightLines={[26, 27, 28, 30, 32]}
        category="fundamentals"
      />
    </div>
  );
}
