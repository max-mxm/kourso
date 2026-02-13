import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { Check } from 'lucide-react';

export default function IntroductionSection() {
  return (
    <div className="space-y-8">
      {/* Hero de la formation */}
      <div className="text-center space-y-4 mb-12 pb-8 border-b border-slate-200 dark:border-slate-800">
        <h1 className="from-primary to-brand-secondary bg-gradient-to-r bg-clip-text text-4xl md:text-5xl font-black tracking-tight text-transparent">
          Guide Next.js 15
        </h1>
        <p className="text-xl text-muted-foreground font-medium">
          Maîtriser les modes de rendu modernes
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-foreground/80">
          Next.js est un framework React qui permet de créer des applications web modernes avec une excellente performance et une expérience développeur optimale. La version 15 apporte des améliorations significatives en termes de rendu et d&apos;optimisation.
        </p>
      </div>

      <ConceptCard
        title="Pourquoi Next.js ?"
        description="Next.js résout les défis majeurs du développement React moderne en offrant plusieurs modes de rendu adaptés à chaque besoin."
        category="fundamentals"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Performance</strong> : Rendu côté serveur pour un temps de chargement initial rapide</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>SEO</strong> : Contenu prérendu pour une meilleure indexation</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Flexibilité</strong> : Choix du mode de rendu par page ou composant</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>DX</strong> : Hot reload, TypeScript, routing automatique</span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// Structure d'un projet Next.js 15
app/
├── layout.tsx          // Layout racine
├── page.tsx            // Page d'accueil
├── about/
│   └── page.tsx        // Route /about
└── blog/
    ├── page.tsx        // Liste des articles
    └── [slug]/
        └── page.tsx    // Article individuel

// Exemple de page simple
export default function Home() {
  return (
    <main>
      <h1>Bienvenue sur Next.js 15</h1>
    </main>
  );
}`}
        language="typescript"
        filename="Structure du projet"
        category="fundamentals"
      />
    </div>
  );
}
