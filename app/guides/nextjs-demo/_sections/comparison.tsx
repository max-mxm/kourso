import Link from 'next/link';
import { Activity, ArrowRight } from 'lucide-react';
import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';

export default function ComparisonSection() {
  const renderingModes = [
    {
      name: 'SSR',
      description: 'Rendu serveur à chaque requête',
      pros: [
        'Données toujours à jour',
        'Personnalisation par utilisateur',
        'SEO optimal'
      ],
      cons: [
        'Temps de réponse variable',
        'Charge serveur élevée',
        'Coûts de serveur'
      ],
      useCases: [
        'Dashboards utilisateur',
        'Flux sociaux',
        'Contenu personnalisé'
      ],
      color: 'rgb(0, 150, 136)'
    },
    {
      name: 'SSG',
      description: 'Génération statique au build',
      pros: [
        'Vitesse maximale',
        'Hébergement économique',
        'Mise en cache CDN'
      ],
      cons: [
        'Données figées au build',
        'Rebuild nécessaire pour MAJ',
        'Pas de personnalisation'
      ],
      useCases: [
        'Blog & documentation',
        'Landing pages',
        'Sites marketing'
      ],
      color: 'rgb(59, 130, 246)'
    },
    {
      name: 'ISR',
      description: 'Régénération incrémentale',
      pros: [
        'Vitesse du statique',
        'Données périodiquement fraîches',
        'Scalabilité'
      ],
      cons: [
        'Données légèrement obsolètes',
        'Configuration revalidate',
        'Complexité accrue'
      ],
      useCases: [
        'E-commerce (produits)',
        'Actualités',
        'Agrégateurs de contenu'
      ],
      color: 'rgb(249, 115, 22)'
    },
    {
      name: 'Client',
      description: 'Rendu côté navigateur',
      pros: [
        'Interactivité totale',
        'Pas de serveur nécessaire',
        'Expérience fluide'
      ],
      cons: [
        'SEO limité',
        'Temps de chargement initial',
        'Bundle JavaScript lourd'
      ],
      useCases: [
        'Applications SPA',
        'Outils interactifs',
        'Dashboards temps réel'
      ],
      color: 'rgb(168, 85, 247)'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-foreground/80">
          Comprenez les différences entre les modes de rendu pour choisir la meilleure stratégie selon votre cas d&apos;usage.
        </p>
      </div>

      <ComparisonTable modes={renderingModes} />

      {/* CTA vers le simulateur de rendering */}
      <Link
        href="/guides/nextjs-demo/simulateur-rendering"
        className="group block p-6 bg-muted/30 rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold text-foreground">
                Ouvrir le simulateur de rendering
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Comparez visuellement SSR, SSG, ISR, CSR et Streaming avec des timelines animees
              et des metriques Core Web Vitals detaillees.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 flex-shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </Link>

      <ConceptCard
        title="Stratégie Hybride"
        description="La puissance de Next.js réside dans la possibilité de mixer plusieurs modes de rendu dans une même application."
        category="advanced"
      >
        <div className="space-y-4 text-sm">
          <div className="rounded-lg bg-muted/50 p-4 border border-border/50">
            <p className="font-semibold text-foreground mb-2">Exemple d&apos;architecture hybride :</p>
            <ul className="space-y-1.5 text-foreground/80">
              <li className="flex items-start gap-2">
                <span className="text-primary">→</span>
                <span><strong>Page d&apos;accueil</strong> : SSG (contenu marketing)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">→</span>
                <span><strong>Liste produits</strong> : ISR revalidate 300 (5 min)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">→</span>
                <span><strong>Page produit</strong> : ISR revalidate 60 (1 min)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500">→</span>
                <span><strong>Panier</strong> : Client Component (interactivité)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">→</span>
                <span><strong>Dashboard utilisateur</strong> : SSR (données personnelles)</span>
              </li>
            </ul>
          </div>
        </div>
      </ConceptCard>

      <CodeBlock
        code={`// Architecture hybride dans un même projet

// 1. Page d'accueil - SSG
// app/page.tsx
export default async function Home() {
  const features = await fetch('https://api.example.com/features', {
    cache: 'force-cache' // Statique
  }).then(res => res.json());

  return <FeaturesGrid features={features} />;
}

// 2. Liste produits - ISR
// app/products/page.tsx
export default async function Products() {
  const products = await fetch('https://api.example.com/products', {
    next: { revalidate: 300 } // ISR 5 minutes
  }).then(res => res.json());

  return <ProductList products={products} />;
}

// 3. Dashboard utilisateur - SSR
// app/dashboard/page.tsx
export default async function Dashboard() {
  const userData = await fetch('https://api.example.com/user', {
    cache: 'no-store' // SSR, toujours frais
  }).then(res => res.json());

  return <UserDashboard data={userData} />;
}

// 4. Panier - Client Component
// components/cart.tsx
'use client';
import { useState } from 'react';

export function Cart() {
  const [items, setItems] = useState([]);
  // Interactivité totale côté client
  return <CartUI items={items} />;
}`}
        language="typescript"
        filename="Architecture hybride"
        highlightLines={[7, 17, 27, 35]}
        category="advanced"
      />

      <div className="rounded-xl border-2 border-red-500/30 bg-red-500/5 p-6">
        <h4 className="text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-wide mb-3">
          Conclusion
        </h4>
        <p className="text-sm text-foreground/80 leading-relaxed">
          Il n&apos;y a pas de solution unique. Analysez vos besoins en termes de performance, fraîcheur des données, SEO et interactivité pour choisir le bon mode de rendu pour chaque partie de votre application. Next.js vous donne cette flexibilité.
        </p>
      </div>
    </div>
  );
}
