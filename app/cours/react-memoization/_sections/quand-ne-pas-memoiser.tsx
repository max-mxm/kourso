import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function QuandNePasMemoiserSection() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          La memoisation n&apos;est pas une optimisation gratuite. Elle a un cout en memoire, en complexite
          du code et en temps de comparaison des dependances. Dans de nombreux cas, ne PAS memoiser est
          la meilleure decision. Cette section etablit des regles concretes pour savoir quand la memoisation
          est contre-productive.
        </p>
      </div>

      <ConceptCard
        title="Regles de decision : faut-il memoiser ?"
        description="Avant d'ajouter React.memo, useMemo ou useCallback, passez par cette checklist."
        category="advanced"
      >
        <div className="space-y-3 text-sm text-foreground/80">
          <div className="p-3 rounded-lg bg-background/50 border border-border/50">
            <p className="font-bold text-foreground mb-1">1. Le composant est leger (leaf node)</p>
            <p>Un composant qui rend quelques elements HTML sans enfants complexes se re-render en moins de 0.1ms.
            Le cout de React.memo (comparaison des props) est du meme ordre. Pas de memoisation.</p>
          </div>
          <div className="p-3 rounded-lg bg-background/50 border border-border/50">
            <p className="font-bold text-foreground mb-1">2. Les props changent a chaque render</p>
            <p>Si les props changent systematiquement (position dans une animation, timestamp, objet derive du state parent),
            React.memo compare et laisse passer a chaque fois. Vous payez le cout de comparaison sans aucun skip.</p>
          </div>
          <div className="p-3 rounded-lg bg-background/50 border border-border/50">
            <p className="font-bold text-foreground mb-1">3. Pas de profiling prealable</p>
            <p>Si vous n&apos;avez pas mesure un probleme de performance avec le React DevTools Profiler,
            vous optimisez a l&apos;aveugle. La memoisation prematuree ajoute de la complexite sans benefice prouve.</p>
          </div>
          <div className="p-3 rounded-lg bg-background/50 border border-border/50">
            <p className="font-bold text-foreground mb-1">4. Le calcul est trivial</p>
            <p>Les operations qui prennent moins de 1ms (concatenation, acces propriete, arithmetique simple)
            ne justifient pas useMemo. La comparaison des dependances coute autant que le calcul.</p>
          </div>
        </div>
      </ConceptCard>

      <h3 className="text-xl font-semibold text-foreground">
        Exemple : quand la memoisation AJOUTE de la complexite
      </h3>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-foreground/80 leading-relaxed">
          Voici un composant ou chaque memoisation est inutile. Le code est plus long, plus difficile a lire,
          et les performances sont identiques (voire legerement moins bonnes a cause de l&apos;overhead).
        </p>
      </div>

      <CodeBlock
        code={`// ANTI-PATTERN : memoisation excessive sur un composant simple

import { memo, useMemo, useCallback, useState } from 'react';

// memo inutile : le composant est un leaf node trivial
const StatusBadge = memo(function StatusBadge({ active }: { active: boolean }) {
  return (
    <span className={active ? 'text-green-600' : 'text-red-600'}>
      {active ? 'Actif' : 'Inactif'}
    </span>
  );
});

function UserCard({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);

  // useMemo inutile : concatenation instantanee
  const fullName = useMemo(
    () => \`\${user.firstName} \${user.lastName}\`,
    [user.firstName, user.lastName]
  );

  // useMemo inutile : acces propriete
  const initials = useMemo(
    () => user.firstName[0] + user.lastName[0],
    [user.firstName, user.lastName]
  );

  // useCallback inutile : passe a un element natif <button>
  // Les elements natifs ne sont pas wrapes par React.memo
  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  // useCallback inutile : passe a un element natif <button>
  const handleCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          {initials}
        </div>
        <div>
          <h3 className="font-medium">{fullName}</h3>
          <StatusBadge active={user.isActive} />
        </div>
      </div>
      <div className="mt-3">
        {isEditing ? (
          <button onClick={handleCancel}>Annuler</button>
        ) : (
          <button onClick={handleEdit}>Modifier</button>
        )}
      </div>
    </div>
  );
}`}
        language="tsx"
        filename="over-memoized.tsx"
        highlightLines={[6, 18, 19, 24, 25, 31, 32, 36, 37]}
        category="advanced"
      />

      <CodeBlock
        code={`// VERSION CORRECTE : simple, lisible, performante

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span className={active ? 'text-green-600' : 'text-red-600'}>
      {active ? 'Actif' : 'Inactif'}
    </span>
  );
}

function UserCard({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);

  // Calculs directs : instantanes, pas besoin de cache
  const fullName = \`\${user.firstName} \${user.lastName}\`;
  const initials = user.firstName[0] + user.lastName[0];

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          {initials}
        </div>
        <div>
          <h3 className="font-medium">{fullName}</h3>
          <StatusBadge active={user.isActive} />
        </div>
      </div>
      <div className="mt-3">
        {isEditing ? (
          <button onClick={() => setIsEditing(false)}>Annuler</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Modifier</button>
        )}
      </div>
    </div>
  );
}

// Resultat : meme performance, 30% de code en moins, plus lisible`}
        language="tsx"
        filename="clean-version.tsx"
        highlightLines={[3, 14, 15, 31, 33]}
        category="advanced"
      />

      <h3 className="text-xl font-semibold text-foreground">
        La regle d&apos;or : mesurer d&apos;abord, memoiser ensuite
      </h3>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-foreground/80 leading-relaxed">
          Le React DevTools Profiler est l&apos;outil qui distingue les optimisations utiles des optimisations
          prematurees. Il mesure le temps reel de chaque render et identifie les composants qui ralentissent
          votre application. Sans cette mesure, toute memoisation est une supposition.
        </p>
      </div>

      <CodeBlock
        code={`// Workflow de profiling pour decider de la memoisation

// Etape 1 : Installer les React DevTools (extension navigateur)
// Onglet "Profiler" dans les DevTools React

// Etape 2 : Enregistrer une session
// - Cliquer sur "Record"
// - Effectuer l'interaction a analyser (clic, saisie, navigation)
// - Cliquer sur "Stop"

// Etape 3 : Analyser les flamegraphs
// Le Profiler affiche :
// - Chaque composant qui a re-render
// - Le temps de render en millisecondes
// - La raison du re-render (props changed, state changed, hooks changed)

// Etape 4 : Identifier les candidats a la memoisation
// Chercher les composants qui :
// ✓ Se re-rendent frequemment (a chaque keystroke, scroll, etc.)
// ✓ Prennent > 1ms a re-render
// ✓ N'ont pas besoin de re-render (props inchangees)

// Etape 5 : Appliquer la memoisation ciblee
// UNIQUEMENT sur les composants identifies en etape 4

// Exemple concret de profiling :
// Avant : <ProductList> re-render en 15ms a chaque keystroke du search
// Analyse : ProductList recoit une prop onSelect recree a chaque render
// Fix : useCallback sur onSelect + React.memo sur ProductList
// Apres : <ProductList> skip le re-render, search fluide

// Etape 6 : Re-profiler pour verifier
// Confirmer que la memoisation a bien reduit le temps de render
// Si pas d'amelioration mesurable : retirer la memoisation

// Le "Highlight updates" dans les React DevTools
// est aussi utile pour visualiser les re-renders en temps reel.
// Components > Settings > "Highlight updates when components render"
// Les composants qui re-rendent s'entourent d'une bordure coloree.`}
        language="typescript"
        filename="profiling-workflow.ts"
        highlightLines={[19, 20, 21, 28, 29, 30, 31]}
        category="advanced"
      />

      <ConceptCard
        title="Quand NE PAS memoiser : resume"
        description="Gardez ces situations en tete pour eviter la memoisation inutile."
        category="advanced"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-background/50 border border-border/50">
            <h4 className="font-bold text-foreground mb-2">Ne pas memoiser quand...</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>-- Le composant est un leaf node simple</li>
              <li>-- Les props changent a chaque render</li>
              <li>-- Le calcul prend moins de 1ms</li>
              <li>-- Le callback est passe a un element natif</li>
              <li>-- Aucun profiling n&apos;a ete fait</li>
              <li>-- Le composant enfant n&apos;est pas wrape par React.memo</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-background/50 border border-border/50">
            <h4 className="font-bold text-foreground mb-2">Memoiser quand...</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>-- Le Profiler montre un re-render couteux (&gt; 1ms)</li>
              <li>-- Le composant enfant est wrape par React.memo</li>
              <li>-- Le calcul traite &gt; 100 elements</li>
              <li>-- La valeur est utilisee comme dependance de useEffect</li>
              <li>-- Le re-render cause un lag perceptible par l&apos;utilisateur</li>
              <li>-- L&apos;objet/fonction doit avoir une reference stable</li>
            </ul>
          </div>
        </div>
      </ConceptCard>

      <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-brand-secondary/5 border border-primary/20">
        <p className="text-foreground font-semibold text-lg mb-2">
          Principe directeur
        </p>
        <p className="text-foreground/80 leading-relaxed">
          &quot;Ecrivez d&apos;abord du code lisible et simple. Mesurez les performances avec le Profiler.
          Memoiser uniquement la ou le Profiler montre un probleme. Re-mesurez pour confirmer le gain.
          Si le gain n&apos;est pas mesurable, retirez la memoisation.&quot;
        </p>
      </div>
    </div>
  );
}
