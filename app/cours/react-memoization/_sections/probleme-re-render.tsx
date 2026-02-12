import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function ProblemeReRenderSection() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground leading-relaxed">
        Avant de memoiser quoi que ce soit, il faut comprendre comment React decide de re-rendre
        un composant. Le mecanisme est simple : quand un etat change, React re-execute le composant
        et tous ses descendants. Mais re-render ne signifie pas forcement re-paint du DOM reel.
        Cette distinction est fondamentale.
      </p>

      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-xl font-bold text-foreground mb-3">Le cycle de rendu React</h3>
        <p className="text-foreground/80 leading-relaxed">
          Quand un composant appelle <code className="text-primary">setState</code>, React declenche
          une cascade : le composant se re-execute, produit un nouveau Virtual DOM, React compare
          l&apos;ancien et le nouveau (reconciliation), puis applique uniquement les differences au DOM reel.
          Les enfants suivent le meme processus, meme si leurs props sont identiques.
        </p>
      </div>

      <CodeBlock
        code={`// Demonstration : la cascade de re-renders

function App() {
  const [count, setCount] = useState(0);
  console.log('App render');       // S'affiche a chaque clic

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Incrementer ({count})
      </button>
      <Parent />
    </div>
  );
}

function Parent() {
  console.log('  Parent render');  // S'affiche aussi !
  return (
    <div>
      <Child />
      <Sibling />
    </div>
  );
}

function Child() {
  console.log('    Child render'); // S'affiche aussi !
  return <p>Je suis Child</p>;
}

function Sibling() {
  console.log('    Sibling render'); // S'affiche aussi !
  return <p>Je suis Sibling</p>;
}

// Console apres un clic sur "Incrementer" :
// App render
//   Parent render
//     Child render
//     Sibling render
//
// Tous les composants se re-executent, meme si
// aucun d'entre eux ne recoit "count" en prop.`}
        language="tsx"
        filename="cascade-demo.tsx"
        highlightLines={[5, 18, 27, 32, 37, 38, 39, 40]}
        category="fundamentals"
      />

      <ConceptCard
        title="Re-render et re-paint : deux choses differentes"
        description="Un re-render React (execution de la fonction composant) ne signifie pas que le navigateur va redessiner les pixels. React compare le Virtual DOM ancien et nouveau, et ne touche au DOM reel que si quelque chose a change."
        category="fundamentals"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
            <h4 className="font-bold text-foreground mb-2">Re-render (Virtual DOM)</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>La fonction composant est re-executee</li>
              <li>Un nouveau Virtual DOM est produit</li>
              <li>React compare ancien et nouveau</li>
              <li>Cout : execution JavaScript en memoire</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-background/50 border border-orange-500/20">
            <h4 className="font-bold text-foreground mb-2">Re-paint (DOM reel)</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>Le navigateur redessine des pixels</li>
              <li>Ne se produit que si le DOM est modifie</li>
              <li>React applique le diff minimal</li>
              <li>Cout : layout, paint, composite du navigateur</li>
            </ul>
          </div>
        </div>
      </ConceptCard>

      <CodeBlock
        code={`// Exemple concret : composant "lourd" avec un calcul couteux

interface ProductListProps {
  products: Product[];
  category: string;
}

function ProductList({ products, category }: ProductListProps) {
  console.log('ProductList render - debut du calcul...');

  // Simulation d'un traitement couteux : filtrage + tri + transformation
  // Sur 10 000 produits, ce calcul prend ~50ms
  const filteredProducts = products
    .filter(p => p.category === category)
    .sort((a, b) => b.rating - a.rating)
    .map(p => ({
      ...p,
      displayPrice: new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      }).format(p.price),
      slug: p.name.toLowerCase().replace(/\\s+/g, '-'),
    }));

  console.log(\`ProductList render - \${filteredProducts.length} produits traites\`);

  return (
    <ul>
      {filteredProducts.map(product => (
        <li key={product.id}>
          {product.name} - {product.displayPrice}
        </li>
      ))}
    </ul>
  );
}

// Parent : le compteur de notifications n'a RIEN a voir avec les produits
function StorePage() {
  const [notifications, setNotifications] = useState(0);
  const [products] = useState<Product[]>(generateProducts(10000));

  return (
    <div>
      <header>
        <button onClick={() => setNotifications(n => n + 1)}>
          Notifications ({notifications})
        </button>
      </header>

      {/* Ce composant refait le calcul couteux a chaque clic
          sur le bouton notifications, pour rien. */}
      <ProductList products={products} category="electronique" />
    </div>
  );
}`}
        language="tsx"
        filename="store-page.tsx"
        highlightLines={[9, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 52, 53]}
        category="fundamentals"
      />

      <ConceptCard
        title="Re-render n&apos;est pas toujours un probleme"
        description="React est extremement rapide. La reconciliation du Virtual DOM est optimisee pour traiter des milliers de composants en quelques millisecondes. Ne memoiser que lorsque vous avez mesure un probleme reel."
        category="fundamentals"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5 flex-shrink-0">--</span>
            <span>Un composant simple (texte, image, layout) se re-rend en moins de 0,1 ms</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5 flex-shrink-0">--</span>
            <span>React ne met a jour le DOM reel que si le Virtual DOM a effectivement change</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5 flex-shrink-0">--</span>
            <span>La memoisation a un cout : comparaison des deps, memoire supplementaire, complexite du code</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5 flex-shrink-0">--</span>
            <span>Regle d&apos;or : mesurer d&apos;abord avec le Profiler, optimiser ensuite</span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// Identifier les re-renders couteux avec React DevTools Profiler
//
// Etape 1 : Ouvrir React DevTools > onglet "Profiler"
// Etape 2 : Cliquer sur "Record" (bouton rond)
// Etape 3 : Effectuer l'interaction a analyser (clic, saisie, etc.)
// Etape 4 : Cliquer sur "Stop"
// Etape 5 : Analyser le flamegraph

// Ce que vous voyez dans le flamegraph :
//
// [App]              0.2ms
//   [StorePage]      0.3ms
//     [Header]       0.1ms
//     [ProductList]  47.3ms  <-- PROBLEME ICI
//       [ProductCard] x 842
//
// La barre "ProductList" est jaune/rouge = composant lent
// Les composants gris n'ont pas ete re-rendus
//
// Criteres pour decider d'optimiser :
// - Composant > 16ms (1 frame a 60fps) = a optimiser
// - Composant > 5ms avec interactions frequentes = a surveiller
// - Composant < 1ms = ne pas toucher

// Alternative programmatique : React.Profiler
import { Profiler } from 'react';

function onRenderCallback(
  id: string,
  phase: 'mount' | 'update',
  actualDuration: number, // temps de render en ms
  baseDuration: number,   // temps sans memoisation
  startTime: number,
  commitTime: number,
) {
  if (actualDuration > 16) {
    console.warn(
      \`[Perf] \${id} a pris \${actualDuration.toFixed(1)}ms (\${phase})\`
    );
  }
}

// Utilisation :
<Profiler id="ProductList" onRender={onRenderCallback}>
  <ProductList products={products} category="electronique" />
</Profiler>`}
        language="tsx"
        filename="profiling-guide.tsx"
        highlightLines={[14, 22, 23, 24, 36, 37, 38]}
        category="fundamentals"
      />

      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-xl font-bold text-foreground mb-3">Quand les re-renders deviennent un vrai probleme</h3>
        <p className="text-foreground/80 leading-relaxed">
          Les re-renders deviennent problematiques dans trois scenarios precis :
          lorsqu&apos;un composant effectue un <strong>calcul couteux</strong> a chaque render (filtrage, tri, formatage de grandes listes),
          lorsqu&apos;un composant <strong>rend un grand nombre d&apos;enfants</strong> (liste de centaines d&apos;elements),
          ou lorsque les re-renders se produisent a <strong>haute frequence</strong> (frappe clavier, mouvement de souris, scroll).
          Dans le reste des cas, faites confiance a React : il est deja optimise pour gerer les re-renders courants.
        </p>
      </div>
    </div>
  );
}
