import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';

export default function ReactCompilerSection() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Le React Compiler (anciennement React Forget) est un compilateur qui transforme automatiquement
          votre code React pour ajouter la memoisation optimale. Il analyse les dependances de chaque
          composant au build time et insere les equivalents de useMemo, useCallback et React.memo
          la ou c&apos;est necessaire. L&apos;objectif : ecrire du code React naturel et laisser le compilateur
          gerer les optimisations.
        </p>
      </div>

      <h3 className="text-xl font-semibold text-foreground">
        Avant/apres : le meme composant
      </h3>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-foreground/80 leading-relaxed">
          Voici un composant tel que vous l&apos;ecrivez, puis ce que le compilateur genere en sortie.
          Le code source reste simple et lisible, le compilateur gere l&apos;optimisation.
        </p>
      </div>

      <CodeBlock
        code={`// CE QUE VOUS ECRIVEZ (code source)

function ProductPage({ products, category }: ProductPageProps) {
  const [search, setSearch] = useState('');

  // Calcul derive : filtre les produits
  const filteredProducts = products
    .filter(p => p.category === category)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  // Callback passe a un enfant
  const handleSelect = (id: string) => {
    router.push(\`/products/\${id}\`);
  };

  return (
    <div>
      <SearchBar value={search} onChange={setSearch} />
      <ProductList
        products={filteredProducts}
        onSelect={handleSelect}
      />
      <ProductCount count={filteredProducts.length} />
    </div>
  );
}

// Aucun useMemo, aucun useCallback, aucun React.memo
// Le code est naturel, lisible et maintenable`}
        language="tsx"
        filename="source-code.tsx"
        highlightLines={[3, 7, 8, 9, 12, 13, 28, 29]}
        category="advanced"
      />

      <CodeBlock
        code={`// CE QUE LE COMPILATEUR GENERE (output simplifie)

function ProductPage({ products, category }: ProductPageProps) {
  const [search, setSearch] = useState('');

  // Le compilateur detecte que filteredProducts depend de
  // products, category et search.
  // Il insere l'equivalent d'un useMemo automatiquement.
  const filteredProducts = useMemo(
    () => products
      .filter(p => p.category === category)
      .filter(p => p.name.toLowerCase().includes(search.toLowerCase())),
    [products, category, search]
  );

  // Le compilateur detecte que handleSelect ne depend
  // d'aucune variable reactive (router est stable).
  // Il insere l'equivalent d'un useCallback.
  const handleSelect = useCallback(
    (id: string) => {
      router.push(\`/products/\${id}\`);
    },
    [] // aucune dependance reactive
  );

  return (
    <div>
      <SearchBar value={search} onChange={setSearch} />
      <ProductList
        products={filteredProducts}
        onSelect={handleSelect}
      />
      <ProductCount count={filteredProducts.length} />
    </div>
  );
}

// Le compilateur a aussi wrape les composants enfants
// avec l'equivalent de React.memo la ou c'est pertinent.
// Tout cela est transparent : vous ne voyez que le code source.`}
        language="tsx"
        filename="compiler-output.tsx"
        highlightLines={[9, 10, 11, 12, 13, 19, 20, 21, 22, 23]}
        category="advanced"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Ce que le compilateur fait vs ce qu&apos;il ne fait pas
      </h3>

      <ComparisonTable
        modes={[
          {
            name: 'Ce que le compilateur FAIT',
            description: 'Optimisations automatiques inserees au build time par le React Compiler',
            color: '#10b981',
            pros: [
              'Memoisation des valeurs derivees (equivalent useMemo)',
              'Memoisation des callbacks (equivalent useCallback)',
              'Memoisation des composants (equivalent React.memo)',
              'Analyse statique des dependances (jamais de stale closure)',
              'Granularite fine : memoisation au niveau expression, pas composant',
              'Compatible avec le code React existant sans modification',
            ],
            cons: [],
            useCases: [
              'Tout projet React 19+ avec un build step',
              'Migration progressive depuis un code avec memoisation manuelle',
            ],
          },
          {
            name: 'Ce que le compilateur NE FAIT PAS',
            description: 'Limites et cas ou l\'intervention manuelle reste necessaire',
            color: '#ef4444',
            pros: [],
            cons: [
              'Pas d\'optimisation algorithmique (O(n^2) reste O(n^2))',
              'Pas de virtualisation (utiliser TanStack Virtual)',
              'Pas de code splitting (utiliser React.lazy)',
              'Pas de restructuration de composants (extraire les composants reste votre travail)',
              'Pas de gestion du state serveur (utiliser TanStack Query)',
              'Ne fonctionne pas avec des patterns non-standard (mutation directe, eval)',
            ],
            useCases: [
              'Cas ou le profiling montre un probleme non lie au re-render',
              'Optimisations architecturales (lazy loading, virtualisation)',
            ],
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-foreground">
        Activer le React Compiler
      </h3>

      <CodeBlock
        code={`// Installation dans un projet Next.js 15+
// Le compilateur est inclus dans React 19

// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;

// Pour un projet Vite / Webpack classique :
// npm install babel-plugin-react-compiler

// babel.config.js
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      // Options du compilateur
      target: '19', // version React cible
    }],
  ],
};

// Verification : le compilateur log les composants optimises
// dans la console pendant le build.
// Si un composant ne peut pas etre optimise, un warning est emis.`}
        language="typescript"
        filename="compiler-setup.ts"
        highlightLines={[8, 9, 21, 22, 23]}
        category="advanced"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Les regles du compilateur
      </h3>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-foreground/80 leading-relaxed">
          Le React Compiler applique les &quot;Rules of React&quot; de maniere stricte. Si votre code
          les enfreint, le compilateur ne peut pas optimiser le composant concerne. Voici les regles
          qui importent le plus pour la compatibilite.
        </p>
      </div>

      <CodeBlock
        code={`// REGLE 1 : Les composants et hooks doivent etre purs
// Le compilateur suppose que le rendu est deterministe

// COMPATIBLE : pas d'effet de bord pendant le render
function GoodComponent({ items }: { items: Item[] }) {
  const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name));
  return <ul>{sorted.map(item => <li key={item.id}>{item.name}</li>)}</ul>;
}

// INCOMPATIBLE : mutation pendant le render
function BadComponent({ items }: { items: Item[] }) {
  items.sort((a, b) => a.name.localeCompare(b.name)); // Mutation du prop !
  return <ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>;
}


// REGLE 2 : Les props et state sont immutables
// Toujours creer de nouveaux objets, jamais muter

// COMPATIBLE
function handleAdd(item: Item) {
  setItems(prev => [...prev, item]); // Nouveau tableau
}

// INCOMPATIBLE
function handleAddBad(item: Item) {
  items.push(item);    // Mutation directe
  setItems(items);     // Meme reference, React ne detecte pas le changement
}


// REGLE 3 : Les valeurs de retour et arguments des hooks sont immutables
// Ne pas muter ce que useState ou useReducer retourne

// COMPATIBLE
const [user, setUser] = useState({ name: 'Alice', age: 30 });
setUser({ ...user, age: 31 }); // Nouvel objet

// INCOMPATIBLE
user.age = 31;         // Mutation directe de l'etat
setUser(user);         // Meme reference


// REGLE 4 : Pas de lecture de valeurs pendant le render
// qui changent entre les renders sans etre des props/state

// COMPATIBLE
function Timer() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{new Date(now).toLocaleTimeString()}</span>;
}

// INCOMPATIBLE : lit Date.now() pendant le render
function BadTimer() {
  return <span>{new Date(Date.now()).toLocaleTimeString()}</span>;
  // Le compilateur ne peut pas savoir quand invalider le cache
}`}
        language="tsx"
        filename="compiler-rules.tsx"
        highlightLines={[5, 6, 11, 12, 22, 27, 28, 37, 41, 42]}
        category="advanced"
      />

      <ConceptCard
        title="L'avenir de la memoisation React"
        description="Comment le paysage de l'optimisation React evolue avec le compilateur."
        category="advanced"
      >
        <div className="space-y-3 text-sm text-foreground/80">
          <div className="p-3 rounded-lg bg-background/50 border border-primary/20">
            <p className="font-bold text-foreground mb-1">Aujourd&apos;hui : transition progressive</p>
            <p>Le React Compiler est stable et utilisable en production depuis React 19.
            La memoisation manuelle reste valide et coexiste avec le compilateur.
            Les projets existants peuvent migrer progressivement.</p>
          </div>
          <div className="p-3 rounded-lg bg-background/50 border border-primary/20">
            <p className="font-bold text-foreground mb-1">Court terme : moins de code manuel</p>
            <p>Les nouveaux projets n&apos;ont plus besoin d&apos;ecrire useMemo/useCallback/React.memo.
            Le code source devient plus simple et plus lisible.
            Le plugin ESLint react-compiler aide a corriger les patterns incompatibles.</p>
          </div>
          <div className="p-3 rounded-lg bg-background/50 border border-primary/20">
            <p className="font-bold text-foreground mb-1">Long terme : memoisation manuelle obsolete</p>
            <p>A mesure que l&apos;ecosysteme adopte le compilateur, les hooks de memoisation manuelle
            deviendront progressivement inutiles. Comprendre le fonctionnement interne reste
            cependant essentiel pour diagnostiquer les problemes de performance.</p>
          </div>
        </div>
      </ConceptCard>

      <h3 className="text-xl font-semibold text-foreground">
        Arbre de decision final
      </h3>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-foreground/80 leading-relaxed">
          Voici la strategie recommandee pour gerer la memoisation dans vos projets React en 2025+.
        </p>
      </div>

      <CodeBlock
        code={`// ARBRE DE DECISION : memoisation React

// 1. Avez-vous active le React Compiler ?
//    OUI → N'ecrivez aucune memoisation manuelle.
//           Le compilateur gere tout automatiquement.
//           Si un composant est lent, profilez et cherchez
//           un probleme algorithmique, pas un probleme de memo.
//
//    NON → Continuez vers l'etape 2.

// 2. Y a-t-il un probleme de performance mesure ?
//    NON → N'ajoutez aucune memoisation. Revenez quand
//           un utilisateur ou un profiling montre un probleme.
//
//    OUI → Continuez vers l'etape 3.

// 3. Le probleme vient-il de re-renders inutiles ?
//    (Verifier avec le React DevTools Profiler)
//
//    NON → Le probleme est ailleurs (reseau, algorithme, bundle size).
//           La memoisation ne resoudra rien.
//
//    OUI → Continuez vers l'etape 4.

// 4. Quel type de re-render inutile ?
//
//    a) Un composant enfant re-render car ses props n'ont pas change
//       → React.memo sur l'enfant
//       → useMemo/useCallback dans le parent pour stabiliser les props
//
//    b) Un calcul couteux est reexecute inutilement
//       → useMemo sur le calcul
//
//    c) Une fonction recreee cause un re-render d'un enfant memoise
//       → useCallback sur la fonction

// 5. Re-profilez apres la memoisation.
//    Si pas d'amelioration mesurable → retirez la memoisation.

// RESUME EN UNE PHRASE :
// "Activez le compilateur. S'il n'est pas disponible,
//  mesurez d'abord, memoisez ensuite, re-mesurez pour confirmer."`}
        language="typescript"
        filename="decision-tree.ts"
        highlightLines={[3, 11, 17, 26, 27, 31, 34, 40, 41]}
        category="advanced"
      />

      <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-brand-secondary/5 border border-primary/20">
        <p className="text-foreground font-semibold text-lg mb-3">
          Recapitulatif du guide
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="space-y-2">
            <p className="font-bold text-foreground">React.memo</p>
            <p className="text-foreground/70">
              HOC qui skip le re-render d&apos;un composant si ses props n&apos;ont pas change (shallow compare).
              Utile pour les composants couteux avec des props stables.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-foreground">useMemo</p>
            <p className="text-foreground/70">
              Hook qui cache une valeur calculee. Utile pour les calculs couteux (&gt; 1ms) et
              pour stabiliser les references d&apos;objets passes a des enfants memoises.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-foreground">useCallback</p>
            <p className="text-foreground/70">
              Hook qui cache une fonction. Equivalent a useMemo(() =&gt; fn, deps).
              Utile quand la fonction est passee a un enfant wrape par React.memo.
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-primary/10">
          <p className="text-foreground/80">
            Avec le React Compiler, ces trois outils deviennent automatiques. Votre travail se concentre
            sur l&apos;architecture, la lisibilite et les optimisations algorithmiques.
          </p>
        </div>
      </div>
    </div>
  );
}
