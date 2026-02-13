'use client';

import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';
import { Check } from 'lucide-react';

export function FrontendPerformanceSection() {
  const bundleOptimizationModes = [
    {
      name: 'Moment.js',
      description: 'Librairie de dates populaire mais volumineuse',
      pros: ['API riche', 'Documentation complète'],
      cons: ['291 KB minifiée', 'Import tout ou rien', 'Non tree-shakable'],
      useCases: ['Applications legacy', 'Besoins complets de manipulation de dates'],
      color: 'rgb(239, 68, 68)'
    },
    {
      name: 'date-fns',
      description: 'Alternative moderne et modulaire',
      pros: ['12 KB par fonction', 'Tree-shakable', 'Import sélectif'],
      cons: ['API différente de Moment', 'Migration nécessaire'],
      useCases: ['Applications modernes', 'Optimisation bundle', 'Next.js recommandé'],
      color: 'rgb(34, 197, 94)'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Les Core Web Vitals sont les métriques essentielles pour mesurer l'expérience utilisateur.
          Next.js fournit des outils natifs pour optimiser chacune de ces métriques.
        </p>
      </div>

      {/* Core Web Vitals */}
      <ConceptCard
        title="Core Web Vitals : Les Métriques Critiques"
        description="Google définit 4 métriques clés pour évaluer la performance perçue par l'utilisateur. Chaque métrique a un seuil à respecter."
        category="optimization"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-background/50 border border-border/50">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground mb-1">LCP - Largest Contentful Paint</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Temps de chargement du plus grand élément visible
                </p>
                <div className="text-xs font-mono px-2 py-1 rounded bg-green-500/10 text-green-600 dark:text-green-400 inline-block">
                  Objectif : &lt; 2.5s
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-border/50">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground mb-1">INP - Interaction to Next Paint</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Réactivité aux interactions utilisateur
                </p>
                <div className="text-xs font-mono px-2 py-1 rounded bg-green-500/10 text-green-600 dark:text-green-400 inline-block">
                  Objectif : &lt; 200ms
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-border/50">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground mb-1">CLS - Cumulative Layout Shift</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Stabilité visuelle (éléments qui bougent)
                </p>
                <div className="text-xs font-mono px-2 py-1 rounded bg-green-500/10 text-green-600 dark:text-green-400 inline-block">
                  Objectif : &lt; 0.1
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-border/50">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground mb-1">TTFB - Time to First Byte</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Temps de réponse initial du serveur
                </p>
                <div className="text-xs font-mono px-2 py-1 rounded bg-green-500/10 text-green-600 dark:text-green-400 inline-block">
                  Objectif : &lt; 600ms
                </div>
              </div>
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* Solutions par métrique */}
      <ConceptCard
        title="Solutions Next.js par Métrique"
        description="Next.js fournit des optimisations natives pour chaque Core Web Vital. Voici comment les utiliser efficacement."
        category="optimization"
      >
        <div className="space-y-6">
          {/* LCP */}
          <div>
            <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Check className="w-5 h-5 text-primary" />
              Optimiser LCP avec next/image
            </h4>
            <CodeBlock
              code={`import Image from 'next/image';

export function HeroSection() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero"
      width={1200}
      height={600}
      priority // Charge immédiatement (pas de lazy loading)
      placeholder="blur" // Affiche un placeholder flou pendant le chargement
      blurDataURL="data:image/..." // Base64 de l'image floue
      quality={85} // Compression optimale (par défaut 75)
    />
  );
}`}
              language="tsx"
              filename="app/components/hero.tsx"
              highlightLines={[7, 8, 9, 10]}
              category="optimization"
            />
          </div>

          {/* INP */}
          <div>
            <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Check className="w-5 h-5 text-blue-500" />
              Optimiser INP avec Server Actions
            </h4>
            <CodeBlock
              code={`'use server';

import { revalidatePath } from 'next/cache';

export async function updateProfile(formData: FormData) {
  const name = formData.get('name');

  // Traitement côté serveur (pas de JS client)
  await db.user.update({ name });

  // Revalidation instantanée
  revalidatePath('/profile');

  return { success: true };
}

// Côté client : useOptimistic pour UI instantanée
'use client';

import { useOptimistic } from 'react';

export function ProfileForm() {
  const [optimisticName, setOptimisticName] = useOptimistic(name);

  return (
    <form action={async (formData) => {
      setOptimisticName(formData.get('name')); // UI instantanée
      await updateProfile(formData); // Serveur en arrière-plan
    }}>
      <input name="name" defaultValue={optimisticName} />
    </form>
  );
}`}
              language="tsx"
              filename="app/actions.ts"
              highlightLines={[11, 12, 26, 27]}
              category="optimization"
            />
          </div>

          {/* CLS */}
          <div>
            <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Check className="w-5 h-5 text-orange-500" />
              Optimiser CLS avec dimensions explicites
            </h4>
            <CodeBlock
              code={`// ❌ MAUVAIS : Provoque un Layout Shift
<img src="/banner.jpg" alt="Banner" />

// ✅ BON : Dimensions explicites
<Image
  src="/banner.jpg"
  alt="Banner"
  width={1200}
  height={300}
  className="w-full h-auto" // Responsive mais ratio préservé
/>

// ✅ BON : Skeleton Loader
export function ProductCard({ loading }: { loading: boolean }) {
  if (loading) {
    return (
      <div className="h-[400px] animate-pulse bg-muted/50 rounded-lg">
        <div className="h-48 bg-muted" /> {/* Image placeholder */}
        <div className="p-4 space-y-2">
          <div className="h-6 bg-muted rounded" /> {/* Titre */}
          <div className="h-4 bg-muted rounded w-2/3" /> {/* Prix */}
        </div>
      </div>
    );
  }

  return <div className="h-[400px]">...</div>;
}`}
              language="tsx"
              filename="app/components/product-card.tsx"
              highlightLines={[5, 6, 7, 8, 17, 27]}
              category="optimization"
            />
          </div>

          {/* TTFB */}
          <div>
            <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Check className="w-5 h-5 text-purple-500" />
              Optimiser TTFB avec Edge Runtime et Streaming
            </h4>
            <CodeBlock
              code={`// Edge Runtime : Déployé sur CDN global
export const runtime = 'edge';

export async function GET(request: Request) {
  const data = await fetchData();
  return Response.json(data);
}

// Static Rendering : TTFB quasi-instantané
export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await db.product.findUnique({
    where: { id: params.id }
  });

  return <ProductDetail product={product} />;
}

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }]; // Pages pré-générées
}

// Streaming avec Suspense : HTML partiel envoyé immédiatement
export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<Skeleton />}>
        <SlowComponent /> {/* Chargé en streaming */}
      </Suspense>
    </div>
  );
}`}
              language="tsx"
              filename="app/api/data/route.ts"
              highlightLines={[2, 10, 19, 26, 27]}
              category="optimization"
            />
          </div>
        </div>
      </ConceptCard>

      {/* Bundle Optimization */}
      <ConceptCard
        title="Optimisation du Bundle JavaScript"
        description="Réduire la taille du bundle améliore le Time to Interactive (TTI) et le First Contentful Paint (FCP). Next.js offre plusieurs stratégies."
        category="optimization"
      >
        <div className="space-y-6">
          {/* Tree Shaking */}
          <div>
            <h4 className="font-bold text-foreground mb-3">1. Tree Shaking : Importer uniquement ce qui est utilisé</h4>
            <ComparisonTable modes={bundleOptimizationModes} />
          </div>

          {/* Dynamic Imports */}
          <div>
            <h4 className="font-bold text-foreground mb-3">2. Dynamic Imports : Code Splitting automatique</h4>
            <CodeBlock
              code={`import dynamic from 'next/dynamic';

// ❌ MAUVAIS : Import statique (toujours chargé)
import HeavyChart from '@/components/heavy-chart';

// ✅ BON : Dynamic import (chargé à la demande)
const HeavyChart = dynamic(() => import('@/components/heavy-chart'), {
  loading: () => <div>Chargement du graphique...</div>,
  ssr: false // Désactive le SSR si le composant utilise des APIs navigateur
});

export function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        Afficher le graphique
      </button>

      {showChart && <HeavyChart />} {/* Chargé uniquement si affiché */}
    </div>
  );
}

// Impact : TTI réduit de 40% sur /dashboard
// Bundle initial : 450 KB → 180 KB
// Bundle HeavyChart : 270 KB (chargé à la demande)`}
              language="tsx"
              filename="app/dashboard/page.tsx"
              highlightLines={[7, 8, 9, 21, 24, 25, 26]}
              category="optimization"
            />
          </div>

          {/* Server Components */}
          <div>
            <h4 className="font-bold text-foreground mb-3">3. Server Components : Zéro JavaScript par défaut</h4>
            <CodeBlock
              code={`// ✅ Server Component (par défaut dans App Router)
// Rendu côté serveur, zéro JS envoyé au client
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await db.post.findUnique({ where: { slug: params.slug } });

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* Client Component uniquement pour l'interactivité */}
      <LikeButton postId={post.id} />
    </article>
  );
}

// components/like-button.tsx
'use client'; // ⚠️ Ajoute du JS au bundle client

import { useState } from 'react';

export function LikeButton({ postId }: { postId: string }) {
  const [liked, setLiked] = useState(false);

  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? '❤️' : '🤍'} J'aime
    </button>
  );
}

// Impact : Réduction de 70% du JavaScript client
// Avant (tout en client) : 250 KB de JS
// Après (Server Components) : 75 KB de JS (uniquement LikeButton)`}
              language="tsx"
              filename="app/blog/[slug]/page.tsx"
              highlightLines={[1, 2, 12, 17, 31, 32, 33]}
              category="optimization"
            />
          </div>
        </div>
      </ConceptCard>

      {/* Images & Fonts */}
      <ConceptCard
        title="Optimisation Images et Polices"
        description="Les images et polices représentent souvent 60-80% du poids d'une page. Next.js automatise leur optimisation."
        category="optimization"
      >
        <div className="space-y-6">
          {/* Images */}
          <div>
            <h4 className="font-bold text-foreground mb-3">Images : next/image automatise tout</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                <h5 className="font-bold text-red-600 dark:text-red-400 mb-2">Sans next/image</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Format PNG/JPG volumineux</li>
                  <li>• Pas de lazy loading</li>
                  <li>• Chargé en pleine résolution</li>
                  <li>• Impact : 2.5 MB de données</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                <h5 className="font-bold text-green-600 dark:text-green-400 mb-2">Avec next/image</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Format WebP/AVIF moderne</li>
                  <li>• Lazy loading automatique</li>
                  <li>• Responsive (srcset généré)</li>
                  <li>• Impact : 180 KB (-93%)</li>
                </ul>
              </div>
            </div>
            <CodeBlock
              code={`import Image from 'next/image';

export function ProductGallery() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <Image
          key={product.id}
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          quality={85} // 85 = bon compromis qualité/poids
          loading="lazy" // Par défaut (sauf si priority={true})
          placeholder="blur" // Placeholder flou pendant chargement
          blurDataURL={product.blurHash}
        />
      ))}
    </div>
  );
}

// Next.js génère automatiquement :
// - /product.webp?w=640&q=85
// - /product.webp?w=750&q=85
// - /product.webp?w=828&q=85
// - /product.webp?w=1080&q=85
// Le navigateur choisit la taille adaptée`}
              language="tsx"
              filename="app/components/product-gallery.tsx"
              highlightLines={[12, 13, 14, 15]}
              category="optimization"
            />
          </div>

          {/* Fonts */}
          <div>
            <h4 className="font-bold text-foreground mb-3">Polices : next/font élimine le Flash of Unstyled Text</h4>
            <CodeBlock
              code={`import { Inter, Roboto_Mono } from 'next/font/google';

// Chargement optimisé avec preload et display:swap
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Affiche texte immédiatement, swap dès que police chargée
  preload: true, // Précharge dans <head>
  variable: '--font-inter', // Variable CSS
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={\`\${inter.variable} \${robotoMono.variable}\`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}

// CSS généré automatiquement :
// @font-face {
//   font-family: '__Inter_xyz';
//   src: url(/_next/static/media/abc-123.woff2) format('woff2');
//   font-display: swap;
// }
//
// Impact : FOUT éliminé, CLS amélioré`}
              language="tsx"
              filename="app/layout.tsx"
              highlightLines={[6, 7, 8, 13, 19]}
              category="optimization"
            />
          </div>
        </div>
      </ConceptCard>

      {/* Impact Mesurable */}
      <ConceptCard
        title="Impact Mesurable sur les Performances"
        description="Résultats concrets d'optimisation sur une application Next.js de production"
        category="optimization"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Avant Optimisation</h4>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-foreground">LCP</span>
                  <span className="text-sm font-mono text-red-600 dark:text-red-400">4.2s</span>
                </div>
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[84%]" />
                </div>
              </div>
              <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-foreground">INP</span>
                  <span className="text-sm font-mono text-red-600 dark:text-red-400">380ms</span>
                </div>
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-full" />
                </div>
              </div>
              <div className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-foreground">CLS</span>
                  <span className="text-sm font-mono text-orange-600 dark:text-orange-400">0.18</span>
                </div>
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 w-[72%]" />
                </div>
              </div>
              <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-foreground">Bundle JS</span>
                  <span className="text-sm font-mono text-red-600 dark:text-red-400">450 KB</span>
                </div>
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[90%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Après Optimisation</h4>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-foreground">LCP</span>
                  <span className="text-sm font-mono text-green-600 dark:text-green-400">1.8s</span>
                </div>
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[36%]" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  -57% grâce à next/image priority
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
                  -68% grâce à Server Actions + useOptimistic
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-foreground">CLS</span>
                  <span className="text-sm font-mono text-green-600 dark:text-green-400">0.05</span>
                </div>
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[10%]" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  -72% grâce à dimensions explicites + skeletons
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-foreground">Bundle JS</span>
                  <span className="text-sm font-mono text-green-600 dark:text-green-400">135 KB</span>
                </div>
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[27%]" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  -70% grâce à Server Components + dynamic imports
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <h5 className="font-bold text-foreground mb-2">Résultat Business</h5>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Taux de conversion : +23%</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Taux de rebond : -18%</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Temps de session : +42%</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Score Google Lighthouse : 95/100</span>
            </li>
          </ul>
        </div>
      </ConceptCard>
    </div>
  );
}
