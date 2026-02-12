'use client';

import { useState } from 'react';
import { CodeBlock } from '@/components/course/code-block';
import { ConceptCard } from '@/components/course/concept-card';
import { PerformanceDemo } from '../_components/performance-demo';
import {
  HeavyListBaseline,
  HeavyListWithMemo,
  HeavyListWithUseMemo,
  HeavyListOptimized,
} from '../_components/heavy-list-examples';

const CODE_TABS = [
  {
    id: 'baseline',
    label: 'Sans optimisation',
    code: `function ProductList() {
  const [search, setSearch] = useState('');

  // Filtrage recalculé à chaque render
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Nouvelle fonction créée à chaque render
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <input onChange={handleSearch} />
      {filteredProducts.map(product => (
        // ProductItem re-render même si product n'a pas changé
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

// Composant Item non optimisé
function ProductItem({ product }) {
  const expensiveCalculation = () => {
    let result = 0;
    for (let i = 0; i < 100000; i++) {
      result += Math.random();
    }
    return result;
  };

  expensiveCalculation();
  return <div>{product.name}</div>;
}`,
    filename: 'baseline.tsx',
  },
  {
    id: 'memo',
    label: 'React.memo',
    code: `function ProductList() {
  const [search, setSearch] = useState('');

  // Toujours recalculé
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <input onChange={handleSearch} />
      {filteredProducts.map(product => (
        // ProductItemMemo ne re-render que si product change
        <ProductItemMemo key={product.id} product={product} />
      ))}
    </div>
  );
}

// Composant memoizé avec comparaison custom
const ProductItemMemo = memo(
  ({ product }) => {
    const expensiveCalculation = () => { /* ... */ };
    expensiveCalculation();
    return <div>{product.name}</div>;
  },
  (prevProps, nextProps) => prevProps.product.id === nextProps.product.id
);`,
    filename: 'with-memo.tsx',
  },
  {
    id: 'usememo',
    label: 'useMemo',
    code: `function ProductList() {
  const [search, setSearch] = useState('');

  // Filtrage memoizé, recalculé uniquement si search change
  const filteredProducts = useMemo(
    () => products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <input onChange={handleSearch} />
      {filteredProducts.map(product => (
        // ProductItem re-render à chaque fois
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}`,
    filename: 'with-usememo.tsx',
  },
  {
    id: 'optimized',
    label: 'Tout optimisé',
    code: `function ProductList() {
  const [search, setSearch] = useState('');

  // Filtrage memoizé
  const filteredProducts = useMemo(
    () => products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  // Handler memoizé avec useCallback
  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  return (
    <div>
      <input onChange={handleSearch} />
      {filteredProducts.map(product => (
        // ProductItemMemo memoizé
        <ProductItemMemo key={product.id} product={product} />
      ))}
    </div>
  );
}

// Composant fully optimized
const ProductItemMemo = memo(
  ({ product }) => {
    const expensiveCalculation = () => { /* ... */ };
    expensiveCalculation();
    return <div>{product.name}</div>;
  },
  (prevProps, nextProps) => prevProps.product.id === nextProps.product.id
);`,
    filename: 'fully-optimized.tsx',
  },
];

export function PerformanceMeasurementSection() {
  const [itemCount, setItemCount] = useState(50);
  const [activeCodeTab, setActiveCodeTab] = useState('baseline');
  return (
    <div className="space-y-8">
      <h2 id="performance-measurement" className="group">
        Mesure et Comparaison des Performances
        <a
          href="#performance-measurement"
          className="opacity-0 group-hover:opacity-100 ml-2 text-primary"
        >
          #
        </a>
      </h2>

      <p className="text-foreground/80 leading-relaxed">
        Mesurer les performances de vos composants React est essentiel pour
        prendre des décisions d'optimisation éclairées. Cette section vous
        montre comment utiliser les outils de profilage et comparer
        concrètement différentes stratégies d'optimisation.
      </p>

      <ConceptCard
        title="Pourquoi mesurer les performances ?"
        description="L'optimisation prématurée est la racine de tous les maux, mais l'optimisation informée est essentielle"
        category="best-practices"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>
            <strong>Identifier les bottlenecks</strong> : Concentrez vos
            efforts là où ils ont le plus d'impact
          </li>
          <li>
            <strong>Valider les hypothèses</strong> : Une optimisation peut
            parfois ralentir le code
          </li>
          <li>
            <strong>Suivre les régressions</strong> : Détectez les dégradations
            de performance au fil du temps
          </li>
          <li>
            <strong>Communiquer l'impact</strong> : Chiffrez les améliorations
            pour justifier le temps investi
          </li>
        </ul>
      </ConceptCard>

      <h3 id="tools-available" className="group">
        Outils de Mesure Disponibles
        <a
          href="#tools-available"
          className="opacity-0 group-hover:opacity-100 ml-2 text-primary text-base"
        >
          #
        </a>
      </h3>

      <p className="text-foreground/80 leading-relaxed">
        React et le navigateur offrent plusieurs outils pour mesurer les
        performances :
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ConceptCard
          title="React DevTools Profiler"
          description="Outil visuel intégré au navigateur"
          category="optimization"
        >
          <ul className="text-sm text-foreground/80 space-y-1 mt-2">
            <li>Enregistre les sessions de rendu</li>
            <li>Visualise le Flame Graph des composants</li>
            <li>Identifie les composants lents</li>
            <li>Disponible dans Chrome et Firefox</li>
          </ul>
        </ConceptCard>

        <ConceptCard
          title="React Profiler API"
          description="Mesure programmatique des rendus"
          category="optimization"
        >
          <ul className="text-sm text-foreground/80 space-y-1 mt-2">
            <li>Composant Profiler intégré à React</li>
            <li>Callback onRender avec métriques</li>
            <li>Mesure actualDuration et baseDuration</li>
            <li>Utilisable en production</li>
          </ul>
        </ConceptCard>

        <ConceptCard
          title="Performance API"
          description="API native du navigateur"
          category="optimization"
        >
          <ul className="text-sm text-foreground/80 space-y-1 mt-2">
            <li>performance.mark() pour marquer des points</li>
            <li>performance.measure() pour calculer durées</li>
            <li>Haute précision (microseconde)</li>
            <li>Intégré au Performance Panel</li>
          </ul>
        </ConceptCard>

        <ConceptCard
          title="Custom Timers"
          description="Mesures simples avec Date ou performance.now()"
          category="optimization"
        >
          <ul className="text-sm text-foreground/80 space-y-1 mt-2">
            <li>Date.now() pour simplicité</li>
            <li>performance.now() pour précision</li>
            <li>Facile à intégrer dans le code</li>
            <li>Limité au contexte synchrone</li>
          </ul>
        </ConceptCard>
      </div>

      <h3 id="profiler-api-usage" className="group">
        Utilisation de l'API Profiler
        <a
          href="#profiler-api-usage"
          className="opacity-0 group-hover:opacity-100 ml-2 text-primary text-base"
        >
          #
        </a>
      </h3>

      <p className="text-foreground/80 leading-relaxed">
        Le composant <code className="text-sm">Profiler</code> de React permet
        de mesurer le temps de rendu de vos composants directement dans votre
        application :
      </p>

      <CodeBlock
        code={`import { Profiler, ProfilerOnRenderCallback } from 'react';

function MyComponent() {
  const onRender: ProfilerOnRenderCallback = (
    id,                    // "id" du Profiler qui vient de commit
    phase,                 // "mount" ou "update"
    actualDuration,        // Temps passé à render cette mise à jour
    baseDuration,          // Temps estimé sans memoization
    startTime,             // Quand React a commencé à render
    commitTime             // Quand React a commité cette mise à jour
  ) => {
    console.log(\`\${id} (\${phase}): \${actualDuration.toFixed(2)}ms\`);

    // Envoyez ces métriques à votre service d'analytics
    if (actualDuration > 100) {
      console.warn('Rendu lent détecté !');
    }
  };

  return (
    <Profiler id="MyComponent" onRender={onRender}>
      <div>
        {/* Votre composant ici */}
      </div>
    </Profiler>
  );
}`}
        language="typescript"
        filename="profiler-usage.tsx"
        category="optimization"
      />

      <ConceptCard
        title="Différence entre actualDuration et baseDuration"
        description="Comprendre les métriques de performance"
        category="optimization"
      >
        <div className="text-sm text-foreground/80 space-y-2 mt-2">
          <p>
            <strong>actualDuration</strong> : Temps réel passé à rendre le
            composant et ses enfants. Ce temps inclut les bénéfices des
            optimisations comme React.memo et useMemo.
          </p>
          <p>
            <strong>baseDuration</strong> : Temps estimé si aucun composant
            n'était memoizé. React le calcule en additionnant les durées de
            rendu les plus récentes de chaque composant.
          </p>
          <p className="mt-2 p-2 bg-muted rounded-lg">
            Si <code>actualDuration</code> est beaucoup plus petit que{' '}
            <code>baseDuration</code>, vos optimisations fonctionnent bien !
          </p>
        </div>
      </ConceptCard>

      <h3 id="interactive-demo" className="group">
        Démo Interactive : Comparaison des Stratégies
        <a
          href="#interactive-demo"
          className="opacity-0 group-hover:opacity-100 ml-2 text-primary text-base"
        >
          #
        </a>
      </h3>

      <p className="text-foreground/80 leading-relaxed">
        Voici une démonstration interactive qui compare 4 approches
        d'optimisation sur une liste de 1000 produits avec recherche en temps
        réel. Cliquez sur "Lancer le test" pour mesurer les performances :
      </p>

      <div className="my-6 p-6 bg-muted/30 rounded-lg border border-border space-y-6">
        <PerformanceDemo
          scenarios={[
            {
              name: 'Sans optimisation',
              description: 'Aucun memo, useMemo ou useCallback',
              component: <HeavyListBaseline itemCount={itemCount} />,
            },
            {
              name: 'Avec React.memo',
              description: 'Items memoizés uniquement',
              component: <HeavyListWithMemo itemCount={itemCount} />,
            },
            {
              name: 'Avec useMemo',
              description: 'Liste filtrée memoizée uniquement',
              component: <HeavyListWithUseMemo itemCount={itemCount} />,
            },
            {
              name: 'Tout optimisé',
              description: 'React.memo + useMemo + useCallback',
              component: <HeavyListOptimized itemCount={itemCount} />,
            },
          ]}
          itemCount={itemCount}
          onItemCountChange={setItemCount}
        />

        {/* Onglets code source */}
        <div className="border-t border-border pt-6">
          <h5 className="font-semibold text-foreground mb-4">
            Code source de chaque approche
          </h5>
          <div className="flex flex-wrap gap-2 mb-4">
            {CODE_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCodeTab(tab.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${
                  activeCodeTab === tab.id
                    ? 'bg-primary/10 text-primary border-primary/20'
                    : 'text-muted-foreground border-border/50 hover:bg-muted'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {CODE_TABS.map((tab) =>
            activeCodeTab === tab.id ? (
              <CodeBlock
                key={tab.id}
                code={tab.code}
                language="typescript"
                filename={tab.filename}
                category="optimization"
              />
            ) : null
          )}
        </div>
      </div>

      <h3 id="results-analysis" className="group">
        Analyse des Résultats
        <a
          href="#results-analysis"
          className="opacity-0 group-hover:opacity-100 ml-2 text-primary text-base"
        >
          #
        </a>
      </h3>

      <p className="text-foreground/80 leading-relaxed">
        Les résultats de la démo interactive montrent clairement l'impact de
        chaque optimisation :
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ConceptCard
          title="Sans optimisation"
          description="Temps de rendu : ~100-150ms"
          category="optimization"
        >
          <div className="text-sm text-foreground/80 space-y-1 mt-2">
            <p>
              <strong>Problèmes :</strong>
            </p>
            <ul className="list-disc list-inside">
              <li>Filtrage recalculé à chaque render</li>
              <li>Tous les items re-render systématiquement</li>
              <li>Calculs coûteux répétés inutilement</li>
            </ul>
          </div>
        </ConceptCard>

        <ConceptCard
          title="Avec React.memo"
          description="Temps de rendu : ~40-60ms"
          category="optimization"
        >
          <div className="text-sm text-foreground/80 space-y-1 mt-2">
            <p>
              <strong>Amélioration ~50% :</strong>
            </p>
            <ul className="list-disc list-inside">
              <li>Items ne re-render que si changés</li>
              <li>Filtrage toujours coûteux</li>
              <li>Bon compromis effort/résultat</li>
            </ul>
          </div>
        </ConceptCard>

        <ConceptCard
          title="Avec useMemo"
          description="Temps de rendu : ~30-50ms"
          category="optimization"
        >
          <div className="text-sm text-foreground/80 space-y-1 mt-2">
            <p>
              <strong>Amélioration ~60% :</strong>
            </p>
            <ul className="list-disc list-inside">
              <li>Filtrage optimisé</li>
              <li>Items re-render toujours</li>
              <li>Utile pour listes très longues</li>
            </ul>
          </div>
        </ConceptCard>

        <ConceptCard
          title="Tout optimisé"
          description="Temps de rendu : ~5-15ms"
          category="optimization"
        >
          <div className="text-sm text-foreground/80 space-y-1 mt-2">
            <p>
              <strong>Amélioration ~90% :</strong>
            </p>
            <ul className="list-disc list-inside">
              <li>Combinaison de toutes les optimisations</li>
              <li>Performance optimale</li>
              <li>Nécessite plus de code</li>
            </ul>
          </div>
        </ConceptCard>
      </div>

      <ConceptCard
        title="Quand optimiser ?"
        description="Règles pragmatiques pour décider"
        category="best-practices"
      >
        <div className="text-sm text-foreground/80 space-y-2 mt-2">
          <p>
            <strong>Optimisez si :</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Le temps de rendu dépasse 50ms de manière régulière</li>
            <li>
              Les utilisateurs se plaignent de ralentissements ou de lag
            </li>
            <li>Le composant est rendu fréquemment (ex: scroll, hover)</li>
            <li>Le profiler DevTools montre un bottleneck clair</li>
          </ul>
          <p className="mt-3">
            <strong>N'optimisez PAS si :</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Le rendu prend moins de 16ms (60 FPS)</li>
            <li>Le composant est rarement affiché</li>
            <li>L'optimisation complexifie excessivement le code</li>
            <li>Vous n'avez pas mesuré le problème</li>
          </ul>
        </div>
      </ConceptCard>

      <h3 id="dev-vs-prod" className="group">
        Différence Dev vs Production
        <a
          href="#dev-vs-prod"
          className="opacity-0 group-hover:opacity-100 ml-2 text-primary text-base"
        >
          #
        </a>
      </h3>

      <p className="text-foreground/80 leading-relaxed">
        Les performances en mode développement ne reflètent PAS les
        performances en production :
      </p>

      <CodeBlock
        code={`// Mode Développement
- React inclut des warnings et checks supplémentaires
- Source maps et stack traces détaillées
- Hot Module Replacement actif
- Double render en Strict Mode (React 18+)
→ 2-3x plus lent que production

// Mode Production
- Code minifié et optimisé
- Tree-shaking appliqué
- Pas de dev warnings
- Un seul render par update
→ Performance réelle pour les utilisateurs

// Toujours tester en production !
npm run build
npm run start`}
        language="bash"
        filename="dev-vs-prod.sh"
        category="optimization"
      />

      <ConceptCard
        title="Best Practice : Mesurer en Production"
        description="Utilisez des outils de Real User Monitoring (RUM)"
        category="best-practices"
      >
        <div className="text-sm text-foreground/80 space-y-2 mt-2">
          <p>Pour mesurer les performances réelles :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Vercel Analytics</strong> : Core Web Vitals automatiques
            </li>
            <li>
              <strong>Google Lighthouse</strong> : Audit complet de performance
            </li>
            <li>
              <strong>WebPageTest</strong> : Tests multi-localisations
            </li>
            <li>
              <strong>Custom RUM</strong> : Profiler API + analytics backend
            </li>
          </ul>
        </div>
      </ConceptCard>
    </div>
  );
}
