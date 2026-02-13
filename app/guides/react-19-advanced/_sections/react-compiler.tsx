import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';
import { Check, X } from 'lucide-react';

export default function ReactCompilerSection() {
  const optimizationModes = [
    {
      name: 'React 18 Manuel',
      description: 'useMemo/useCallback explicites',
      pros: ['Contrôle total', 'Prévisible'],
      cons: ['Verbeux', 'Oublis fréquents', 'Dépendances incorrectes'],
      useCases: ['Legacy code', 'Cas très spécifiques'],
      color: 'rgb(239, 68, 68)' // red-500
    },
    {
      name: 'React Compiler (19)',
      description: 'Optimisation automatique build-time',
      pros: ['Zéro boilerplate', 'Pas d\'oublis', 'Fine-grained memoization'],
      cons: ['Moins de contrôle', 'Debugging plus complexe'],
      useCases: ['Par défaut', 'Nouvelle codebase', 'Migration progressive'],
      color: 'rgb(34, 197, 94)' // green-500
    }
  ];

  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Le <strong>React Compiler</strong> est une transformation build-time qui analyse votre code
          et insère automatiquement les optimisations nécessaires. Il élimine le besoin de
          <code className="text-primary mx-1">useMemo</code>, <code className="text-primary">useCallback</code> et
          <code className="text-primary mx-1">memo()</code> dans 95% des cas.
        </p>
      </div>

      <ConceptCard
        title="Comment Fonctionne le React Compiler"
        description="Un compilateur qui transforme votre code React en code optimisé avec memoization automatique."
        category="rendering"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span><strong>Analyse statique</strong> : Détecte automatiquement les valeurs réactives (props, state)</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span><strong>Fine-grained memoization</strong> : Optimise au niveau des expressions, pas seulement des composants</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span><strong>Inférence de dépendances</strong> : Calcule automatiquement les dépendances (plus besoin de les spécifier)</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span><strong>Build-time</strong> : Zéro impact runtime, optimisations appliquées au build</span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// Installation et Configuration
// 1. Installer le plugin Babel
npm install --save-dev babel-plugin-react-compiler

// 2. Configuration Babel
// babel.config.js
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      target: '19', // Version de React
      runtimeModule: 'react/compiler-runtime'
    }]
  ]
};

// 3. Pour Next.js 16+
// next.config.js
module.exports = {
  experimental: {
    reactCompiler: true
  }
};

// 4. Pour Vite
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', { target: '19' }]]
      }
    })
  ]
});`}
        language="typescript"
        filename="Configuration"
        highlightLines={[8, 9, 10, 19, 20, 33]}
        category="rendering"
      />

      <CodeBlock
        code={`// Avant : React 18 avec useMemo/useCallback manuel
import { useMemo, useCallback, memo } from 'react';

function ExpensiveComponent({ data, onUpdate }: Props) {
  // ❌ Verbeux : callback memoization manuelle
  const handleClick = useCallback(() => {
    onUpdate(data.id);
  }, [onUpdate, data.id]);

  // ❌ Verbeux : calcul memoizé manuellement
  const processedData = useMemo(() => {
    return data.items.map(item => ({
      ...item,
      computed: expensiveCalculation(item)
    }));
  }, [data.items]);

  // ❌ Verbeux : sous-composant memoizé
  const ListItem = memo(({ item }: { item: Item }) => (
    <div>{item.name}</div>
  ));

  return (
    <div onClick={handleClick}>
      {processedData.map(item => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default memo(ExpensiveComponent);`}
        language="tsx"
        filename="components/expensive-component-old.tsx"
        highlightLines={[6, 11, 19, 32]}
        category="rendering"
      />

      <CodeBlock
        code={`// Après : React 19 avec Compiler (automatique)
function ExpensiveComponent({ data, onUpdate }: Props) {
  // ✅ Le Compiler gère la memoization automatiquement
  const handleClick = () => {
    onUpdate(data.id);
  };

  // ✅ Memoization automatique du calcul
  const processedData = data.items.map(item => ({
    ...item,
    computed: expensiveCalculation(item)
  }));

  // ✅ Pas besoin de memo() pour les sous-composants
  function ListItem({ item }: { item: Item }) {
    return <div>{item.name}</div>;
  }

  return (
    <div onClick={handleClick}>
      {processedData.map(item => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  );
}

// ✅ Pas besoin de memo() wrapper
export default ExpensiveComponent;`}
        language="tsx"
        filename="components/expensive-component-new.tsx"
        highlightLines={[4, 5, 6, 9, 10, 11, 15, 28]}
        category="rendering"
      />

      <ComparisonTable modes={optimizationModes} />

      <ConceptCard
        title="Quand Garder useMemo/useCallback ?"
        description="Le Compiler ne remplace pas 100% des cas. Voici quand continuer à utiliser les hooks manuels."
        category="rendering"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              Compiler Gère (95% des cas)
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Callbacks simples passés en props</li>
              <li>• Calculs dérivés de state/props</li>
              <li>• Rendu conditionnel</li>
              <li>• Listes et maps</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
              <X className="w-5 h-5 text-orange-600" />
              Garder useMemo/useCallback (5% des cas)
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Calculs extrêmement coûteux (regex complexes, parsing massif)</li>
              <li>• Référence d&apos;identité critique (WeakMap keys, refs)</li>
              <li>• Logique avec side-effects intentionnels</li>
              <li>• Performance profiling indique un besoin explicite</li>
            </ul>
          </div>
        </div>
      </ConceptCard>

      <CodeBlock
        code={`// Cas où useMemo reste pertinent
import { useMemo } from 'react';

function DataProcessor({ rawData }: Props) {
  // ✅ Calcul VRAIMENT coûteux : garder useMemo
  const parsedData = useMemo(() => {
    // Parsing de 10MB de JSON + transformations lourdes
    const parsed = JSON.parse(rawData);
    return complexTransformation(parsed); // 100ms+
  }, [rawData]);

  // ✅ WeakMap nécessite référence stable
  const cache = useMemo(() => new WeakMap(), []);

  // ❌ Calcul simple : laisser le Compiler gérer
  const count = data.length; // Pas besoin de useMemo ici

  return <div>{parsedData.summary}</div>;
}`}
        language="tsx"
        filename="components/data-processor.tsx"
        highlightLines={[5, 6, 7, 8, 9, 12, 15]}
        category="rendering"
      />

      <ConceptCard
        title="Migration Progressive"
        description="Stratégie pour adopter le Compiler sur une codebase existante."
        category="rendering"
      >
        <div className="space-y-3 text-sm text-foreground/80">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 font-bold text-xs">
              1
            </div>
            <div>
              <strong>Activer en opt-in</strong> : Commencer par les nouveaux composants uniquement
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 font-bold text-xs">
              2
            </div>
            <div>
              <strong>Monitoring</strong> : Utiliser React DevTools Profiler pour comparer avant/après
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 font-bold text-xs">
              3
            </div>
            <div>
              <strong>Supprimer progressivement</strong> : Retirer useMemo/useCallback une fois le Compiler confirmé actif
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 font-bold text-xs">
              4
            </div>
            <div>
              <strong>Opt-out si besoin</strong> : Utiliser <code className="text-primary">&quot;use no memo&quot;</code> directive pour désactiver sur un composant spécifique
            </div>
          </div>
        </div>
      </ConceptCard>

      <CodeBlock
        code={`// Opt-out du Compiler pour un composant spécifique
'use no memo'; // Directive spéciale

function LegacyComponent({ data }: Props) {
  // Ce composant ne sera PAS optimisé par le Compiler
  // Utile pour des composants avec logique complexe non-standard
  const result = complexLegacyLogic(data);

  return <div>{result}</div>;
}`}
        language="tsx"
        filename="components/legacy-component.tsx"
        highlightLines={[1]}
        category="rendering"
      />

      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">Recommandations Seniors</h3>
        <ul className="space-y-2 text-foreground/80">
          <li>
            <strong>Activer le Compiler dès le début</strong> sur les nouveaux projets React 19
          </li>
          <li>
            <strong>Supprimer les useMemo/useCallback inutiles</strong> une fois le Compiler actif
          </li>
          <li>
            <strong>Profiler avant d&apos;optimiser manuellement</strong> : le Compiler est souvent suffisant
          </li>
          <li>
            <strong>Utiliser React DevTools Profiler</strong> pour valider les optimisations
          </li>
          <li>
            <strong>Garder un œil sur la taille du bundle</strong> : le Compiler ajoute du runtime minimal
          </li>
        </ul>
      </div>
    </div>
  );
}
