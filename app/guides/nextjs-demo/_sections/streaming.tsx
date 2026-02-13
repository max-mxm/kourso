'use client';

import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';
import { Check, Zap, Clock } from 'lucide-react';

export function StreamingSection() {
  const streamingPatterns = [
    {
      name: 'Suspense Unique',
      description: 'Un seul Suspense wrappant toute la page',
      pros: ['Simple à implémenter', 'Moins de code'],
      cons: ['Page blanche jusqu\'à tout charger', 'Mauvaise UX', 'LCP élevé'],
      useCases: ['À éviter en production'],
      color: 'rgb(239, 68, 68)'
    },
    {
      name: 'Suspense Granulaires',
      description: 'Multiples Suspense pour chaque composant lent',
      pros: ['Shell HTML instantané', 'Streaming parallèle', 'LCP optimal'],
      cons: ['Plus de code', 'Complexité accrue'],
      useCases: ['Dashboard', 'Pages avec données multiples', 'Production'],
      color: 'rgb(34, 197, 94)'
    },
    {
      name: 'Partial Prerendering (PPR)',
      description: 'Shell statique + slots dynamiques (Next.js 16+)',
      pros: ['Meilleur des deux mondes', 'Shell instantané', 'Données à jour'],
      cons: ['Experimental', 'Next.js 16+ uniquement'],
      useCases: ['E-commerce', 'Pages produit', 'Blog avec commentaires'],
      color: 'rgb(124, 58, 237)'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Le streaming React résout le problème du "tout ou rien" : au lieu d'attendre que TOUTES les données soient chargées
          avant d'afficher la page, Next.js envoie progressivement le HTML par chunks dès qu'il est prêt.
          Résultat : perception de vitesse 2-3× plus rapide et amélioration significative des Core Web Vitals.
        </p>
      </div>

      {/* Le problème du "tout ou rien" */}
      <ConceptCard
        title="Le Problème du Tout ou Rien"
        description="Sans streaming, l'utilisateur voit une page blanche jusqu'à ce que TOUTES les données soient chargées, même si 95% de la page est prête."
        category="optimization"
      >
        <div className="space-y-6">
          {/* Schéma temporel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-lg bg-red-500/5 border border-red-500/20">
              <div className="flex items-start gap-3 mb-4">
                <Clock className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-bold text-red-600 dark:text-red-400 mb-2">Sans Streaming</h5>
                  <p className="text-sm text-muted-foreground">Page blanche pendant 3.5 secondes</p>
                </div>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-24 px-2 py-1 bg-muted rounded text-muted-foreground">0s</div>
                  <span className="text-muted-foreground">Requête envoyée</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 px-2 py-1 bg-muted rounded text-muted-foreground">0.5s</div>
                  <span className="text-muted-foreground">Header chargé</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 px-2 py-1 bg-muted rounded text-muted-foreground">1s</div>
                  <span className="text-muted-foreground">UserProfile chargé</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 px-2 py-1 bg-red-500/20 rounded text-red-600 dark:text-red-400">3.5s</div>
                  <span className="text-red-600 dark:text-red-400">SlowDataTable chargé</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 px-2 py-1 bg-green-500/20 rounded text-green-600 dark:text-green-400">3.5s</div>
                  <span className="text-green-600 dark:text-green-400">Page affichée (TOUT)</span>
                </div>
              </div>
              <div className="mt-4 text-xs text-red-600 dark:text-red-400 font-medium">
                LCP : 3.5s - Perception : très lent
              </div>
            </div>

            <div className="p-5 rounded-lg bg-green-500/5 border border-green-500/20">
              <div className="flex items-start gap-3 mb-4">
                <Zap className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-bold text-green-600 dark:text-green-400 mb-2">Avec Streaming</h5>
                  <p className="text-sm text-muted-foreground">Shell visible en 0.5s</p>
                </div>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-24 px-2 py-1 bg-muted rounded text-muted-foreground">0s</div>
                  <span className="text-muted-foreground">Requête envoyée</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 px-2 py-1 bg-green-500/20 rounded text-green-600 dark:text-green-400">0.5s</div>
                  <span className="text-green-600 dark:text-green-400">Header affiché</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 px-2 py-1 bg-green-500/20 rounded text-green-600 dark:text-green-400">1s</div>
                  <span className="text-green-600 dark:text-green-400">UserProfile affiché</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 px-2 py-1 bg-muted rounded text-muted-foreground">1-3.5s</div>
                  <span className="text-muted-foreground">Skeleton visible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 px-2 py-1 bg-green-500/20 rounded text-green-600 dark:text-green-400">3.5s</div>
                  <span className="text-green-600 dark:text-green-400">SlowDataTable affiché</span>
                </div>
              </div>
              <div className="mt-4 text-xs text-green-600 dark:text-green-400 font-medium">
                LCP : 0.5s - Perception : instantané
              </div>
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* Comment fonctionne le streaming */}
      <ConceptCard
        title="Comment Fonctionne le Streaming React"
        description="React 18 + Next.js 13+ envoient le HTML par chunks progressifs au lieu d'attendre la génération complète côté serveur."
        category="optimization"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-background/50 border border-border/50">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground mb-1">1. Shell HTML envoyé immédiatement</h4>
                <p className="text-sm text-muted-foreground">
                  Layout, navigation, header sont rendus côté serveur et envoyés instantanément (50-100ms).
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-border/50">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground mb-1">2. Parties dynamiques en parallèle</h4>
                <p className="text-sm text-muted-foreground">
                  Chaque composant dans un Suspense charge ses données en parallèle (pas en séquence).
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-border/50">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground mb-1">3. Chunks progressifs envoyés</h4>
                <p className="text-sm text-muted-foreground">
                  Dès qu'un composant est prêt, son HTML est envoyé au client et hydraté automatiquement.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-border/50">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground mb-1">4. Hydratation sélective</h4>
                <p className="text-sm text-muted-foreground">
                  React hydrate uniquement les composants visibles en priorité (visible &gt; hors écran).
                </p>
              </div>
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* Pattern #1 : Suspense granulaires */}
      <ConceptCard
        title="Pattern #1 : Suspense Granulaires"
        description="Éviter un seul Suspense global. Créer un Suspense par composant lent pour du streaming parallèle optimal."
        category="optimization"
      >
        <div className="space-y-6">
          <ComparisonTable modes={streamingPatterns} />

          <div className="space-y-4">
            <CodeBlock
              code={`// ❌ MAUVAIS : Un seul Suspense global
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Header />
      <UserProfile />
      <SlowDataTable />
      <Footer />
    </Suspense>
  );
}

// Problème :
// - Page blanche jusqu'à ce que SlowDataTable soit chargé (3.5s)
// - Header, UserProfile et Footer (rapides) bloqués par SlowDataTable
// - LCP : 3.5s (très mauvais)
// - Perception : lent et frustrant`}
              language="tsx"
              filename="app/dashboard/page.tsx"
              highlightLines={[6, 7, 8, 9, 10, 15, 16, 17]}
              category="optimization"
            />

            <CodeBlock
              code={`// ✅ BON : Suspense granulaires (un par composant lent)
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <div>
      {/* Header : pas de Suspense (rapide) */}
      <Header />

      {/* UserProfile : Suspense dédié */}
      <Suspense fallback={<ProfileSkeleton />}>
        <UserProfile />
      </Suspense>

      {/* SlowDataTable : Suspense dédié */}
      <Suspense fallback={<TableSkeleton />}>
        <SlowDataTable />
      </Suspense>

      {/* Footer : pas de Suspense (rapide) */}
      <Footer />
    </div>
  );
}

// Avantages :
// ✅ Header visible en 50ms (shell HTML)
// ✅ UserProfile visible en 1s (chargé en parallèle)
// ✅ SlowDataTable visible en 3.5s (streaming indépendant)
// ✅ LCP : 50ms (Header = LCP)
// ✅ Perception : instantané et progressif`}
              language="tsx"
              filename="app/dashboard/page.tsx"
              highlightLines={[8, 11, 12, 13, 16, 17, 18, 27, 28, 29, 30]}
              category="optimization"
            />
          </div>
        </div>
      </ConceptCard>

      {/* Pattern #2 : loading.tsx automatique */}
      <ConceptCard
        title="Pattern #2 : loading.tsx Automatique"
        description="Next.js wrap automatiquement votre page dans un Suspense si vous créez un fichier loading.tsx. Pratique pour du streaming global."
        category="optimization"
      >
        <CodeBlock
          code={`// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="space-y-6 p-8 animate-pulse">
      <div className="h-12 bg-muted/50 rounded-lg w-1/3" />
      <div className="h-64 bg-muted/50 rounded-lg" />
      <div className="h-96 bg-muted/50 rounded-lg" />
    </div>
  );
}

// app/dashboard/page.tsx
export default async function DashboardPage() {
  // Next.js wrap automatiquement dans :
  // <Suspense fallback={<Loading />}>
  //   <DashboardPage />
  // </Suspense>

  const data = await fetchDashboardData(); // Async Server Component

  return (
    <div>
      <h1>Dashboard</h1>
      <DataTable data={data} />
    </div>
  );
}

// Équivalent manuel :
// app/dashboard/page.tsx (sans loading.tsx)
import { Suspense } from 'react';

async function DashboardContent() {
  const data = await fetchDashboardData();
  return <DataTable data={data} />;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<Loading />}>
      <DashboardContent />
    </Suspense>
  );
}

// Quand utiliser loading.tsx :
// ✅ Toute la page est lente (API unique)
// ✅ Pas besoin de Suspense granulaires
// ❌ Éviter si multiples sources de données (préférer Suspense granulaires)`}
          language="tsx"
          filename="app/dashboard/loading.tsx"
          highlightLines={[2, 13, 14, 15, 16, 17, 19, 38, 39, 40, 41, 48, 49, 50]}
          category="optimization"
        />
      </ConceptCard>

      {/* Pattern #3 : Partial Prerendering (PPR) */}
      <ConceptCard
        title="Pattern #3 : Partial Prerendering (PPR)"
        description="Le meilleur des deux mondes : shell statique généré à la build + slots dynamiques streamés à la demande. Experimental dans Next.js 16+."
        category="optimization"
      >
        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
            <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-500" />
              Concept du PPR
            </h5>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                Le PPR génère un <strong>shell statique</strong> (layout, header, navigation) à la build
                et identifie les <strong>slots dynamiques</strong> (données utilisateur, panier, prix en temps réel).
              </p>
              <p>
                À la requête, le shell est servi instantanément depuis le CDN (TTFB ~10ms),
                puis les slots sont streamés en parallèle avec les données fraîches.
              </p>
            </div>
          </div>

          <CodeBlock
            code={`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: 'incremental', // Active PPR de manière incrémentale
  },
};

export default nextConfig;

// app/product/[id]/page.tsx
import { Suspense } from 'react';

export const experimental_ppr = true; // Active PPR pour cette page

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div>
      {/* STATIQUE : Généré à la build, servi depuis CDN */}
      <Header />
      <Breadcrumb productId={params.id} />

      {/* DYNAMIQUE : Streamé à la demande */}
      <Suspense fallback={<PriceSkeleton />}>
        <ProductPrice productId={params.id} />
      </Suspense>

      {/* STATIQUE : Généré à la build */}
      <ProductDescription productId={params.id} />

      {/* DYNAMIQUE : Streamé à la demande */}
      <Suspense fallback={<StockSkeleton />}>
        <ProductStock productId={params.id} />
      </Suspense>

      {/* DYNAMIQUE : Streamé à la demande */}
      <Suspense fallback={<ReviewsSkeleton />}>
        <ProductReviews productId={params.id} />
      </Suspense>
    </div>
  );
}

// Résultat :
// 1. Shell HTML statique servi en 10ms depuis CDN
// 2. ProductPrice, ProductStock, ProductReviews streamés en parallèle
// 3. TTFB : 10ms (shell) + streaming progressif (données fraîches)
// 4. Meilleur des deux mondes : vitesse statique + données dynamiques`}
            language="tsx"
            filename="app/product/[id]/page.tsx"
            highlightLines={[5, 15, 19, 20, 21, 23, 24, 25, 26, 28, 30, 31, 32, 33, 35, 36, 37, 38, 42, 43, 44, 45]}
            category="optimization"
          />
        </div>
      </ConceptCard>

      {/* Amélioration Core Web Vitals */}
      <ConceptCard
        title="Amélioration Mesurable des Core Web Vitals"
        description="Impact concret du streaming sur les métriques de performance et l'expérience utilisateur."
        category="optimization"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Sans Streaming</h4>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-foreground">LCP</span>
                  <span className="text-sm font-mono text-red-600 dark:text-red-400">3.5s</span>
                </div>
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[70%]" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Page blanche jusqu'au chargement complet
                </p>
              </div>
              <div className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-foreground">INP</span>
                  <span className="text-sm font-mono text-orange-600 dark:text-orange-400">350ms</span>
                </div>
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 w-[70%]" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Hydratation bloquante de tout le DOM
                </p>
              </div>
              <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-foreground">Perception</span>
                  <span className="text-sm font-mono text-red-600 dark:text-red-400">Lent</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Utilisateur attend 3.5s sans feedback visuel
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Avec Streaming</h4>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-foreground">LCP</span>
                  <span className="text-sm font-mono text-green-600 dark:text-green-400">0.5s</span>
                </div>
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[10%]" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  -86% grâce au shell HTML instantané
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-foreground">INP</span>
                  <span className="text-sm font-mono text-green-600 dark:text-green-400">120ms</span>
                </div>
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[24%]" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  -66% grâce à l'hydratation sélective
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-foreground">Perception</span>
                  <span className="text-sm font-mono text-green-600 dark:text-green-400">Instantané</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Shell visible en 500ms, feedback visuel immédiat
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <h5 className="font-bold text-foreground mb-2">Impact Business</h5>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Taux de rebond : -32% (perception de vitesse)</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Temps sur page : +58% (engagement amélioré)</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Taux de conversion : +19% (friction réduite)</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Score SEO Google : +15 points (LCP amélioré)</span>
            </li>
          </ul>
        </div>
      </ConceptCard>
    </div>
  );
}
