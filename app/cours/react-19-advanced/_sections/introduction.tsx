import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { Check, X } from 'lucide-react';

export default function IntroductionSection() {
  return (
    <div className="space-y-8">
      {/* Hero de la formation */}
      <div className="text-center space-y-4 mb-12 pb-8 border-b border-slate-200 dark:border-slate-800">
        <h1 className="from-primary to-brand-secondary bg-gradient-to-r bg-clip-text text-4xl md:text-5xl font-black tracking-tight text-transparent">
          React 19 - Bonnes Pratiques Seniors
        </h1>
        <p className="text-xl text-muted-foreground font-medium">
          Maîtriser les nouvelles fonctionnalités et les patterns avancés
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-foreground/80">
          React 19 marque une évolution majeure avec l&apos;introduction du <strong>React Compiler</strong>,
          des <strong>Server Components</strong> par défaut, et des APIs révolutionnaires comme <code className="text-primary">use()</code> et
          les <strong>Actions</strong>. Cette version transforme fondamentalement la façon dont nous développons des applications React performantes.
        </p>
      </div>

      <ConceptCard
        title="Les Piliers de React 19"
        description="React 19 apporte 4 changements fondamentaux qui redéfinissent le développement React moderne."
        category="fundamentals"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground mb-1">React Compiler</h4>
                <p className="text-sm text-muted-foreground">
                  Optimisation automatique avec memoization intelligente, éliminant le besoin de useMemo/useCallback dans la plupart des cas
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground mb-1">React Server Components</h4>
                <p className="text-sm text-muted-foreground">
                  Foundation de React 19, permettant un rendu serveur sans JavaScript côté client pour une performance optimale
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground mb-1">Actions & Async Transitions</h4>
                <p className="text-sm text-muted-foreground">
                  Gestion automatique des états pending, errors et optimistic updates avec les async transitions
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground mb-1">Hook use()</h4>
                <p className="text-sm text-muted-foreground">
                  Nouvelle API pour lire des ressources (promises, context) en mode conditionnel dans le render
                </p>
              </div>
            </div>
          </div>
        </div>
      </ConceptCard>

      <ConceptCard
        title="Nouveautés React 19"
        description="Les fonctionnalités ajoutées qui transforment le développement React."
        category="fundamentals"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>use()</strong> : Hook pour lire promises et context conditionnellement</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Actions</strong> : Fonctions async dans transitions avec gestion automatique des états</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>useActionState</strong> : Remplacement de useFormState pour gérer les actions</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>useOptimistic</strong> : Updates optimistes avec rollback automatique</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Refs as Props</strong> : Plus besoin de forwardRef dans 95% des cas</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Document Metadata</strong> : Tags title, meta, link dans les composants</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Error Handling amélioré</strong> : Dédoublonnage et options pour caught/uncaught errors</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Partial Pre-rendering</strong> (19.2) : Pré-render statique + dynamic fill</span>
          </li>
        </ul>
      </ConceptCard>

      <ConceptCard
        title="Breaking Changes & Migration"
        description="Points d'attention lors de la migration depuis React 18."
        category="fundamentals"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <span><strong>forwardRef</strong> : Déprécié, utiliser refs directement en props</span>
          </li>
          <li className="flex items-start gap-2">
            <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <span><strong>useFormState</strong> : Renommé en useActionState</span>
          </li>
          <li className="flex items-start gap-2">
            <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <span><strong>React.render</strong> : ReactDOM.render déprécié, utiliser createRoot</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span><strong>Concurrent rendering</strong> : Activé par défaut (pas de flag)</span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// React 18 vs React 19 - Comparaison

// ❌ React 18 - Verbeux avec forwardRef et useMemo
import { forwardRef, useMemo, useCallback } from 'react';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, children }, ref) => {
    const handleClick = useCallback(() => {
      onClick();
    }, [onClick]);

    const computedValue = useMemo(() => {
      return expensiveCalculation();
    }, []);

    return (
      <button ref={ref} onClick={handleClick}>
        {children}
      </button>
    );
  }
);

// ✅ React 19 - Simplifié avec Compiler et refs as props
function Button({ ref, onClick, children }: ButtonProps) {
  // Le React Compiler gère automatiquement la memoization
  const handleClick = () => onClick();
  const computedValue = expensiveCalculation();

  return (
    <button ref={ref} onClick={handleClick}>
      {children}
    </button>
  );
}`}
        language="tsx"
        filename="components/button.tsx"
        highlightLines={[22, 24, 25]}
        category="fundamentals"
      />

      <CodeBlock
        code={`// Migration Step-by-Step

// 1. Mettre à jour les dépendances
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}

// 2. Remplacer ReactDOM.render par createRoot (si pas déjà fait)
// ❌ Ancien
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));

// ✅ Nouveau
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root')!);
root.render(<App />);

// 3. Supprimer les forwardRef inutiles
// ❌ Avant
const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <input ref={ref} {...props} />
);

// ✅ Après
function Input({ ref, ...props }: InputProps) {
  return <input ref={ref} {...props} />;
}

// 4. Renommer useFormState en useActionState
// ❌ Avant
import { useFormState } from 'react-dom';

// ✅ Après
import { useActionState } from 'react';

// 5. Activer le React Compiler (optionnel mais recommandé)
// babel.config.js
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      target: '19'
    }]
  ]
};`}
        language="tsx"
        filename="migration-guide.ts"
        highlightLines={[2, 3, 4, 16, 17, 18, 27, 28, 29, 35]}
        category="fundamentals"
      />

      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">Philosophie React 19</h3>
        <p className="text-foreground/80 leading-relaxed">
          React 19 adopte une philosophie <strong>&quot;Convention over Configuration&quot;</strong> :
          le Compiler optimise automatiquement, les Server Components deviennent la norme,
          et les APIs sont simplifiées pour réduire le boilerplate. L&apos;objectif est de permettre
          aux développeurs de se concentrer sur la logique métier plutôt que sur les optimisations manuelles.
        </p>
      </div>
    </div>
  );
}
