import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';

export default function PerformanceHooksSection() {
  const hookComparison = [
    {
      name: 'useMemo',
      description: 'Memoize le résultat d\'un calcul',
      pros: ['Évite recalculs coûteux', 'Contrôle explicite'],
      cons: ['Boilerplate', 'Facile à mal utiliser'],
      useCases: ['Calculs très coûteux (>50ms)', 'Cas non gérés par le Compiler'],
      color: 'rgb(249, 115, 22)'
    },
    {
      name: 'React Compiler',
      description: 'Memoization automatique',
      pros: ['Zéro boilerplate', 'Optimisations fines', 'Pas d\'oublis'],
      cons: ['Debugging complexe', 'Moins de contrôle'],
      useCases: ['Par défaut dans React 19'],
      color: 'rgb(34, 197, 94)'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Avec le React Compiler, les hooks de performance (useMemo, useCallback, memo) deviennent
          optionnels dans 95% des cas. Focus sur les cas où ils restent pertinents.
        </p>
      </div>

      <ComparisonTable modes={hookComparison} />

      <CodeBlock
        code={`// Quand GARDER useMemo (React 19)
import { useMemo } from 'react';

function DataProcessor({ largeDataset }: Props) {
  // ✅ Calcul extrêmement coûteux : garder useMemo
  const processed = useMemo(() => {
    return largeDataset.map(item => {
      // Traitement lourd : parsing, regex complexes, etc.
      return heavyComputation(item); // >50ms
    });
  }, [largeDataset]);

  // ❌ Calcul simple : laisser le Compiler gérer
  const count = data.length; // Pas besoin de useMemo

  return <div>{processed}</div>;
}`}
        language="tsx"
        filename="Performance hooks"
        highlightLines={[5, 6, 7, 8, 9, 10, 13]}
        category="optimization"
      />

      <ConceptCard
        title="React DevTools Profiler"
        description="Mesurer les performances réelles avant d'optimiser."
        category="optimization"
      >
        <p className="text-sm text-foreground/80">
          Toujours profiler avant d&apos;ajouter useMemo/useCallback. Le Compiler gère déjà
          la plupart des optimisations - n&apos;optimisez que si le Profiler indique un problème.
        </p>
      </ConceptCard>
    </div>
  );
}
