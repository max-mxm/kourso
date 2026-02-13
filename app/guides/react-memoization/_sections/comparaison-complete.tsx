import { ConceptCard } from '@/components/course/concept-card';
import { ComparisonTable } from '@/components/course/comparison-table';

export default function ComparaisonCompleteSection() {
  const memoTools = [
    {
      name: 'React.memo',
      description: 'HOC qui empeche le re-render si les props sont identiques (shallow comparison par defaut).',
      pros: [
        'Evite les re-renders couteux des composants enfants',
        'Simple a appliquer (envelopper le composant)',
        'Fonctionne avec les composants fonctionnels et classes',
      ],
      cons: [
        'Shallow comparison par defaut (objets/fonctions inline contournent le memo)',
        'Inutile si les props changent a chaque render',
        'Overhead de comparaison des props a chaque render du parent',
      ],
      useCases: [
        'Composants lourds en rendu (graphiques, listes longues)',
        'Listes avec beaucoup d\'items (chaque item memoize)',
        'Composants recevant des props stables (primitives, refs useMemo/useCallback)',
      ],
      color: 'rgb(0, 150, 136)',
    },
    {
      name: 'useMemo',
      description: 'Hook qui cache le resultat d\'un calcul entre les renders. Re-execute uniquement quand les dependances changent.',
      pros: [
        'Evite les recalculs couteux (filtrage, tri, formatage)',
        'Stabilise les references d\'objets pour React.memo',
        'Type-safe avec TypeScript (inference automatique)',
      ],
      cons: [
        'Consomme de la memoire (cache le resultat precedent)',
        'Comparaison des dependances a chaque render',
        'Peut masquer des problemes d\'architecture (state derive mal concu)',
      ],
      useCases: [
        'Calculs complexes : filtrage, tri, aggregation de grandes listes',
        'Derived state : valeur calculee a partir de props ou state',
        'Stabiliser les props objet pour que React.memo fonctionne',
      ],
      color: 'rgb(59, 130, 246)',
    },
    {
      name: 'useCallback',
      description: 'Hook qui cache une definition de fonction entre les renders. La reference reste stable tant que les dependances ne changent pas.',
      pros: [
        'Stabilise les references de fonctions pour React.memo',
        'Evite les re-renders inutiles des enfants memoises',
        'Essentiel pour les dependances de useEffect',
      ],
      cons: [
        'Inutile sans consommateur memoize (React.memo ou useEffect)',
        'Closure stale si les dependances sont incorrectes',
        'Overhead de memoisation (comparaison des deps)',
      ],
      useCases: [
        'Callbacks passes a des enfants enveloppes par React.memo',
        'Fonctions dans les dependances de useEffect',
        'Event handlers stables pour des composants optimises',
      ],
      color: 'rgb(168, 85, 247)',
    },
  ];

  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground leading-relaxed">
        Les trois outils de memoisation React repondent a des besoins differents mais complementaires.
        Ce tableau comparatif synthetise leurs forces, limites et cas d&apos;usage pour vous aider
        a choisir le bon outil selon le contexte.
      </p>

      <ComparisonTable modes={memoTools} />

      <ConceptCard
        title="Regles pratiques : quand utiliser quoi"
        description="Un guide de decision rapide pour choisir le bon outil de memoisation selon votre situation."
        category="best-practices"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
            <h4 className="font-bold text-foreground mb-2">Utilisez React.memo quand...</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>Le composant est couteux a rendre (graphique, longue liste, SVG complexe)</li>
              <li>Le composant recoit souvent les memes props</li>
              <li>Le parent se re-rend frequemment pour des raisons sans rapport avec l&apos;enfant</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-blue-500/20">
            <h4 className="font-bold text-foreground mb-2">Utilisez useMemo quand...</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>Un calcul prend plus de quelques millisecondes (mesure avec le Profiler)</li>
              <li>Vous devez stabiliser une reference objet pour un enfant memoise</li>
              <li>Vous derivez des donnees complexes a partir de state ou props</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-purple-500/20">
            <h4 className="font-bold text-foreground mb-2">Utilisez useCallback quand...</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>La fonction est passee en prop a un enfant enveloppe par React.memo</li>
              <li>La fonction est dans le tableau de dependances d&apos;un useEffect</li>
              <li>La fonction est passee a un hook tiers qui compare les references</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-orange-500/20">
            <h4 className="font-bold text-foreground mb-2">Ne memoisez PAS quand...</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>Le composant est leger et rapide a rendre (&lt; 1ms)</li>
              <li>Les props changent presque a chaque render</li>
              <li>Vous n&apos;avez pas mesure de probleme de performance reel</li>
              <li>Le composant est un noeud feuille sans enfants complexes</li>
            </ul>
          </div>
        </div>
      </ConceptCard>

      <ConceptCard
        title="La chaine de memoisation"
        description="Pour que la memoisation soit efficace, chaque maillon de la chaine doit etre en place. Un seul maillon manquant et toute l'optimisation est perdue."
        category="best-practices"
      >
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-background/50 border border-border/50">
            <p className="text-sm text-foreground/80">
              <strong className="text-foreground">Maillon 1</strong> : Le composant enfant est enveloppe par
              <code className="text-primary"> React.memo</code>
            </p>
          </div>
          <div className="flex justify-center text-muted-foreground text-xs">+</div>
          <div className="p-3 rounded-lg bg-background/50 border border-border/50">
            <p className="text-sm text-foreground/80">
              <strong className="text-foreground">Maillon 2</strong> : Les props objet sont stabilisees par
              <code className="text-blue-500"> useMemo</code>
            </p>
          </div>
          <div className="flex justify-center text-muted-foreground text-xs">+</div>
          <div className="p-3 rounded-lg bg-background/50 border border-border/50">
            <p className="text-sm text-foreground/80">
              <strong className="text-foreground">Maillon 3</strong> : Les props fonction sont stabilisees par
              <code className="text-purple-500"> useCallback</code>
            </p>
          </div>
          <div className="flex justify-center text-muted-foreground text-xs">=</div>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/30">
            <p className="text-sm text-foreground font-medium">
              Resultat : le composant enfant ne se re-rend que lorsque ses donnees changent reellement.
            </p>
          </div>
        </div>
      </ConceptCard>
    </div>
  );
}
