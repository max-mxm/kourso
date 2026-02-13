'use client';

import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { Check } from 'lucide-react';

export function DynamicImportSection() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <ConceptCard
        title="Dynamic Import - Lazy Loading Stratégique"
        description="Le dynamic import permet de charger des composants ou bibliothèques à la demande, uniquement lorsqu'ils sont nécessaires, au lieu de tout inclure dans le bundle initial."
        category="optimization"
      >
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Analogie : Imaginez Netflix. Vous ne téléchargez pas tous les films avant de commencer à regarder. Vous streamez le contenu à la demande. Le dynamic import fonctionne de la même manière : il ne charge que ce dont vous avez besoin, au moment où vous en avez besoin.
          </p>
        </div>
      </ConceptCard>

      {/* Syntaxe de base */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">Syntaxe de Base</h3>

        <CodeBlock
          code={`import dynamic from 'next/dynamic';

// Chargement lazy d'un composant lourd
const HeavyChart = dynamic(() => import('./components/heavy-chart'), {
  loading: () => <div>Chargement du graphique...</div>,
  ssr: false
});

export default function Dashboard() {
  return (
    <div>
      <h1>Tableau de bord</h1>
      {/* Le composant ne sera chargé que lorsqu'il sera rendu */}
      <HeavyChart data={chartData} />
    </div>
  );
}`}
          language="tsx"
          filename="app/dashboard/page.tsx"
          category="optimization"
        />
      </div>

      {/* Impact sur le bundle */}
      <ConceptCard
        title="Impact sur le Bundle Size"
        description="Le dynamic import permet de réduire drastiquement la taille du bundle initial en déplaçant le code vers des chunks séparés chargés à la demande."
        category="optimization"
      >
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Sans dynamic import */}
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <div className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">
                Sans Dynamic Import
              </div>
              <div className="space-y-1 text-sm">
                <div>Bundle initial : <span className="font-mono font-bold">500 KB</span></div>
                <div>Premier rendu : <span className="font-mono">~6 secondes</span></div>
                <div className="text-xs text-muted-foreground">Tout chargé en une fois</div>
              </div>
            </div>

            {/* Avec dynamic import */}
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <div className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                Avec Dynamic Import
              </div>
              <div className="space-y-1 text-sm">
                <div>Bundle initial : <span className="font-mono font-bold">50 KB</span></div>
                <div>Premier rendu : <span className="font-mono">~3 secondes</span></div>
                <div className="text-xs text-muted-foreground">450 KB chargés à la demande</div>
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Amélioration du First Contentful Paint (FCP) de 3 secondes grâce au lazy loading des composants lourds.
          </div>
        </div>
      </ConceptCard>

      {/* Cas d'usage */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">Quand Utiliser le Dynamic Import</h3>

        <ConceptCard
          title="Scénarios d'Utilisation Optimaux"
          description="Le dynamic import est particulièrement efficace dans les situations suivantes."
          category="optimization"
        >
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-foreground">Charts et visualisations lourdes</div>
                <div className="text-sm text-muted-foreground">Bibliothèques comme Chart.js, D3.js (100-300 KB)</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-foreground">Éditeurs riches (WYSIWYG)</div>
                <div className="text-sm text-muted-foreground">Quill, TinyMCE, Draft.js (200-500 KB)</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-foreground">Modals et dialogues</div>
                <div className="text-sm text-muted-foreground">Chargés uniquement à l'ouverture</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-foreground">Contenu below-the-fold</div>
                <div className="text-sm text-muted-foreground">Sections non visibles au chargement initial</div>
              </div>
            </div>
          </div>
        </ConceptCard>
      </div>

      {/* Exemple complet */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">Exemple Complet avec Options</h3>

        <CodeBlock
          code={`import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Composant lourd chargé dynamiquement
const RichTextEditor = dynamic(
  () => import('@/components/rich-text-editor'),
  {
    // État de chargement personnalisé
    loading: () => (
      <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="mt-2 text-sm text-muted-foreground">Chargement de l'éditeur...</p>
        </div>
      </div>
    ),
    // Désactiver le SSR si le composant utilise des APIs navigateur
    ssr: false
  }
);

export default function ArticleEditor() {
  return (
    <div className="space-y-6">
      <h1>Créer un Article</h1>

      {/* Le composant ne sera chargé qu'au premier rendu */}
      <RichTextEditor
        placeholder="Commencez à écrire..."
        onSave={(content) => console.log(content)}
      />
    </div>
  );
}`}
          language="tsx"
          filename="app/articles/new/page.tsx"
          highlightLines={[7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
          category="optimization"
        />
      </div>

      {/* Pièges courants */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">Pièges à Éviter</h3>

        <div className="space-y-6">
          {/* Piège 1 */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-foreground">1. Lazy-load des composants trop petits</div>

            <CodeBlock
              code={`// ❌ MAUVAIS - Composant trop léger (overhead > bénéfice)
const SmallButton = dynamic(() => import('./button'));

// ✅ BON - Garder les petits composants dans le bundle principal
import { Button } from './button';`}
              language="tsx"
              category="optimization"
            />
          </div>

          {/* Piège 2 */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-foreground">2. Oublier le loading state</div>

            <CodeBlock
              code={`// ❌ MAUVAIS - Pas de feedback visuel pendant le chargement
const Chart = dynamic(() => import('./chart'));

// ✅ BON - Loading state pour UX fluide
const Chart = dynamic(() => import('./chart'), {
  loading: () => <Skeleton className="h-64 w-full" />
});`}
              language="tsx"
              category="optimization"
            />
          </div>

          {/* Piège 3 */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-foreground">3. SSR désactivé par défaut sans raison</div>

            <CodeBlock
              code={`// ❌ MAUVAIS - Désactiver SSR sans raison (perte de SEO)
const ProductCard = dynamic(() => import('./product-card'), {
  ssr: false
});

// ✅ BON - Garder SSR activé si possible
const ProductCard = dynamic(() => import('./product-card'));

// ✅ BON - Désactiver SSR uniquement si nécessaire
const BrowserOnlyMap = dynamic(() => import('./map'), {
  ssr: false // Utilise window/navigator
});`}
              language="tsx"
              category="optimization"
            />
          </div>
        </div>
      </div>

      {/* Résumé */}
      <ConceptCard
        title="Points Clés à Retenir"
        description="Le dynamic import est un outil puissant d'optimisation, mais doit être utilisé avec discernement."
        category="optimization"
      >
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm text-muted-foreground">
              Réduire le bundle initial de 50-90% dans certains cas
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm text-muted-foreground">
              Améliorer le FCP de 2-4 secondes sur connexions lentes
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm text-muted-foreground">
              Toujours fournir un loading state pour une UX fluide
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm text-muted-foreground">
              Réserver pour composants lourds (100+ KB), pas les petits
            </span>
          </div>
        </div>
      </ConceptCard>
    </div>
  );
}
