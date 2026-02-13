import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function DevToolsSection() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Les DevTools de l&apos;ecosysteme TanStack sont des panneaux de debogage integres directement
          dans votre application. Ils permettent d&apos;inspecter le cache de React Query, l&apos;etat du
          routeur et la configuration des tables en temps reel. C&apos;est l&apos;equivalent d&apos;un tableau
          de bord de production pour vos outils de developpement.
        </p>
      </div>

      <h3 className="text-xl font-semibold text-foreground">
        React Query DevTools : installation et configuration
      </h3>

      <CodeBlock
        code={`// Installation
// npm install @tanstack/react-query-devtools

// app/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60, // 1 minute
            gcTime: 1000 * 60 * 5, // 5 minutes
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Le panneau DevTools s'affiche en bas de l'ecran */}
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition="bottom-right"
      />
    </QueryClientProvider>
  );
}`}
        language="tsx"
        filename="providers.tsx"
        highlightLines={[8, 27, 28, 29, 30]}
        category="best-practices"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Lire le panneau React Query DevTools
      </h3>

      <CodeBlock
        code={`// Guide de lecture du panneau React Query DevTools
//
// Le panneau affiche toutes les queries en cache avec leur etat :
//
// -- ETATS DES QUERIES --
//
// [fresh]   Vert     La donnee est a jour, pas de refetch necessaire
//                    -> staleTime n'est pas encore ecoule
//
// [stale]   Jaune    La donnee est perimee, sera refetchee au prochain trigger
//                    -> staleTime est ecoule, attend un trigger (focus, mount, etc.)
//
// [fetching] Bleu    Requete en cours d'execution
//                    -> Le loader tourne, la requete est partie au serveur
//
// [paused]  Gris     La requete est en pause (mode offline)
//                    -> Le navigateur est hors ligne, la requete reprendra
//
// [inactive] Gris    Aucun composant n'observe cette query
//           fonce    -> La donnee reste en cache pendant gcTime
//
// -- INFORMATIONS PAR QUERY --
//
// Query Key  : identifiant unique de la query (ex: ['users', { page: 1 }])
// Data        : la derniere donnee recue, visualisable en JSON
// Observers   : nombre de composants abonnes a cette query
// Last Updated: timestamp de la derniere mise a jour
// State       : etat courant (fresh, stale, fetching, etc.)
//
// -- TIMERS IMPORTANTS --
//
// staleTime : duree pendant laquelle la donnee est consideree fraiche
//             Defaut: 0 (toujours stale). Recommande: 30s-5min selon le cas
//
// gcTime    : duree de retention en cache apres que tous les observers
//             se sont desabonnes. Defaut: 5 minutes
//
// refetchInterval : intervalle de refetch automatique (si configure)
//
// -- ACTIONS DISPONIBLES --
//
// Refetch   : Force un refetch immediat de la query
// Invalidate: Marque la query comme stale, refetch au prochain trigger
// Reset     : Reinitialise la query a son etat initial
// Remove    : Supprime la query du cache`}
        language="text"
        filename="devtools-guide.txt"
        category="best-practices"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Router DevTools et Table DevTools
      </h3>

      <CodeBlock
        code={`// -- TanStack Router DevTools --
// Affiche l'etat complet du routeur : route active, params, search, loaders

// npm install @tanstack/router-devtools
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

// Dans votre root route (TanStack Router uniquement)
export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  ),
});

// Informations visibles :
// - Arbre des routes avec la route active
// - Search params et path params en temps reel
// - Etat des loaders (pending, success, error)
// - Matches de route et composants rendus

// -- TanStack Table DevTools --
// Inspecte l'etat interne d'une instance de table

// npm install @tanstack/react-table-devtools
import { ReactTableDevtools } from '@tanstack/react-table-devtools';

function DataTable() {
  const table = useReactTable({ /* ... */ });

  return (
    <div>
      <table>{/* rendu de la table */}</table>
      <ReactTableDevtools table={table} />
    </div>
  );
}

// Informations visibles :
// - Etat du tri, filtrage, pagination
// - Donnees brutes de chaque ligne
// - Colonnes visibles et leur configuration
// - Performance de rendu des cellules`}
        language="tsx"
        filename="router-table-devtools.tsx"
        highlightLines={[6, 12, 28, 35]}
        category="best-practices"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Panneau DevTools unifie
      </h3>

      <CodeBlock
        code={`// Configuration unifiee pour un projet utilisant plusieurs outils TanStack
// Tous les DevTools sont accessibles depuis un seul point d'entree

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

// Panneau unifie avec chargement conditionnel
export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 30,
            gcTime: 1000 * 60 * 5,
            retry: 2,
            refetchOnWindowFocus: true,
          },
          mutations: {
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/* React Query DevTools */}
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition="bottom-right"
      />

      {/* En production, les devtools sont automatiquement exclus
          du bundle par le tree-shaking grace au process.env.NODE_ENV */}
    </QueryClientProvider>
  );
}`}
        language="tsx"
        filename="unified-devtools.tsx"
        highlightLines={[34, 35, 36, 37]}
        category="best-practices"
      />

      <ConceptCard
        title="DevTools en production : activation conditionnelle"
        description="Les DevTools TanStack sont automatiquement exclues du bundle de production grace au tree-shaking. Mais il est parfois utile de les activer temporairement pour deboguer un probleme en production."
        category="best-practices"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>-- <strong>Par defaut</strong> : les imports de devtools sont elimines en production par votre bundler (Webpack, Vite, Turbopack)</li>
          <li>-- <strong>Activation temporaire</strong> : utiliser un query param secret (<code>?debug=true</code>) pour charger les devtools dynamiquement via <code>React.lazy()</code></li>
          <li>-- <strong>Securite</strong> : ne jamais exposer de donnees sensibles dans le cache. Les devtools affichent toutes les queries, y compris les tokens</li>
          <li>-- <strong>Performance</strong> : les devtools en mode production ajoutent un overhead. Les activer uniquement pour le diagnostic, puis les desactiver</li>
        </ul>
      </ConceptCard>

      <h3 className="text-xl font-semibold text-foreground">
        Configuration complete avec chargement lazy
      </h3>

      <CodeBlock
        code={`'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, lazy, Suspense } from 'react';

// Chargement lazy : les DevTools ne sont telecharges que si necessaire
const ReactQueryDevtools = lazy(() =>
  import('@tanstack/react-query-devtools').then((mod) => ({
    default: mod.ReactQueryDevtools,
  }))
);

// Detecter si les devtools doivent etre actives
function shouldShowDevtools(): boolean {
  if (typeof window === 'undefined') return false;

  // Mode developpement : toujours actif
  if (process.env.NODE_ENV === 'development') return true;

  // Mode production : actif uniquement via query param secret
  const params = new URLSearchParams(window.location.search);
  return params.get('debug') === process.env.NEXT_PUBLIC_DEBUG_TOKEN;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,
            gcTime: 1000 * 60 * 10,
            retry: (failureCount, error) => {
              // Ne pas retry les erreurs 4xx
              if (error instanceof Response && error.status < 500) return false;
              return failureCount < 3;
            },
            refetchOnWindowFocus: process.env.NODE_ENV === 'production',
          },
        },
      })
  );

  const showDevtools = shouldShowDevtools();

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {showDevtools && (
        <Suspense fallback={null}>
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-right"
          />
        </Suspense>
      )}
    </QueryClientProvider>
  );
}`}
        language="tsx"
        filename="lazy-devtools.tsx"
        highlightLines={[7, 8, 9, 10, 14, 15, 16, 17, 18, 19, 20, 21, 22, 49, 50, 51, 52, 53, 54]}
        category="best-practices"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Strategies de debogage
      </h3>

      <ConceptCard
        title="Diagnostiquer les problemes courants"
        description="Les DevTools permettent d'identifier rapidement les causes des problemes de performance et de comportement dans vos applications TanStack."
        category="best-practices"
      >
        <ul className="space-y-3 text-sm text-foreground/80">
          <li>
            -- <strong>Queries toujours stale</strong> : verifier que staleTime est configure.
            Valeur par defaut : 0 (toujours stale). Si toutes vos queries sont jaunes dans le panneau,
            augmenter staleTime a 30 secondes minimum pour les donnees qui ne changent pas souvent.
          </li>
          <li>
            -- <strong>Cycles de refetch infinis</strong> : verifier les queryKeys. Si une queryKey
            contient un objet recree a chaque render (ex: queryKey: [&apos;users&apos;, {'{'}filter{'}'}]),
            chaque render cree une nouvelle query. Stabiliser les references avec useMemo.
          </li>
          <li>
            -- <strong>Cache inspector</strong> : dans le panneau, cliquer sur une query pour voir
            ses donnees en cache, le nombre d&apos;observers et les timers. Si observers = 0 et la query
            reste en cache, le gcTime est peut-etre trop eleve.
          </li>
          <li>
            -- <strong>Mutations qui ne mettent pas a jour le cache</strong> : verifier que
            invalidateQueries() est appele dans onSuccess ou onSettled de la mutation.
            Les mutations ne mettent pas a jour le cache automatiquement.
          </li>
          <li>
            -- <strong>Donnees obsoletes apres navigation</strong> : verifier refetchOnMount
            et refetchOnWindowFocus. Si desactives, les donnees ne seront pas mises a jour
            lors du retour sur une page.
          </li>
        </ul>
      </ConceptCard>
    </div>
  );
}
