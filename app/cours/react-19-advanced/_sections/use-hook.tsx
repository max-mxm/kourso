import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';
import { Check } from 'lucide-react';

export default function UseHookSection() {
  const useCases = [
    {
      name: 'Lire une Promise',
      description: 'Suspendre le rendu jusqu\'à la résolution de la promise',
      pros: [
        'Syntaxe simple et intuitive',
        'Intégration native avec Suspense',
        'Gestion automatique du loading'
      ],
      cons: [
        'Nécessite un boundary Suspense',
        'Promise doit être stable (pas recréée à chaque render)'
      ],
      useCases: [
        'Data fetching dans des composants',
        'Chargement de ressources async',
        'Lazy loading de données'
      ],
      color: 'rgb(59, 130, 246)' // blue-500
    },
    {
      name: 'Lire un Context',
      description: 'Accéder au context de manière conditionnelle',
      pros: [
        'Permet les early returns',
        'Simplification du code',
        'Pas besoin de wrapper HOC'
      ],
      cons: [
        'Syntaxe différente de useContext',
        'Courbe d\'apprentissage'
      ],
      useCases: [
        'Accès conditionnel au context',
        'Branches conditionnelles',
        'Simplification de logique complexe'
      ],
      color: 'rgb(168, 85, 247)' // purple-500
    }
  ];

  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Le hook <code className="text-primary">use()</code> est l&apos;une des innovations majeures de React 19.
          Il permet de <strong>lire des ressources</strong> (promises, context) directement dans le render,
          avec la possibilité d&apos;utilisation <strong>conditionnelle</strong> - ce qui était impossible avec les hooks classiques.
        </p>
      </div>

      <ConceptCard
        title="use() : Un Hook Révolutionnaire"
        description="Contrairement aux autres hooks, use() peut être appelé conditionnellement et dans des boucles, ouvrant de nouvelles possibilités architecturales."
        category="fundamentals"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Suspension automatique</strong> : Suspense jusqu&apos;à la résolution de la promise</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Utilisation conditionnelle</strong> : Peut être appelé après un early return</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Intégration Suspense</strong> : Fonctionne nativement avec les boundaries Suspense</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Type-safe</strong> : Inférence TypeScript automatique du type de retour</span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// Exemple 1 : Lire une Promise avec use()
import { use, Suspense } from 'react';

// Promise stable (créée en dehors du composant ou avec useMemo)
const userPromise = fetchUser(userId);

function UserProfile() {
  // use() suspend le rendu jusqu'à la résolution
  const user = use(userPromise);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// Wrapper avec Suspense obligatoire
export function UserProfilePage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <UserProfile />
    </Suspense>
  );
}`}
        language="tsx"
        filename="app/profile/page.tsx"
        highlightLines={[8, 21, 22]}
        category="fundamentals"
      />

      <CodeBlock
        code={`// Exemple 2 : Utilisation Conditionnelle (IMPOSSIBLE avec useContext)
import { use } from 'react';
import { ThemeContext } from './theme-context';

function Button({ variant }: ButtonProps) {
  // ✅ use() PEUT être appelé après un early return
  if (variant === 'unstyled') {
    return <button>Click me</button>;
  }

  // Lecture du context seulement si nécessaire
  const theme = use(ThemeContext);

  return (
    <button style={{ backgroundColor: theme.primaryColor }}>
      Styled Button
    </button>
  );
}

// ❌ Impossible avec useContext (violera les Rules of Hooks)
function ButtonWrong({ variant }: ButtonProps) {
  if (variant === 'unstyled') {
    return <button>Click me</button>;
  }

  // ❌ ERREUR: useContext appelé conditionnellement
  const theme = useContext(ThemeContext);

  return <button>...</button>;
}`}
        language="tsx"
        filename="components/button.tsx"
        highlightLines={[6, 7, 8, 12, 22, 23, 24, 27]}
        category="fundamentals"
      />

      <ConceptCard
        title="Patterns Avancés avec use()"
        description="Techniques pour maximiser l'efficacité du hook use() dans des scénarios complexes."
        category="fundamentals"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
            <h4 className="font-bold text-foreground mb-2">1. Promise Stable avec useMemo</h4>
            <p className="text-sm text-muted-foreground">
              La promise doit être stable (même référence) entre les renders. Utiliser useMemo ou créer la promise en dehors du composant.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
            <h4 className="font-bold text-foreground mb-2">2. Streaming de Données</h4>
            <p className="text-sm text-muted-foreground">
              Combiner use() avec des promises qui se résolvent progressivement pour un streaming de données fluide.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
            <h4 className="font-bold text-foreground mb-2">3. Waterfall vs Parallel</h4>
            <p className="text-sm text-muted-foreground">
              Attention aux waterfalls : créer toutes les promises avant d&apos;appeler use() pour un chargement parallèle.
            </p>
          </div>
        </div>
      </ConceptCard>

      <CodeBlock
        code={`// Pattern : Promise Stable avec useMemo
import { use, useMemo, Suspense } from 'react';

function UserDashboard({ userId }: { userId: string }) {
  // ✅ Promise stable grâce à useMemo
  const userPromise = useMemo(() => {
    return fetchUser(userId);
  }, [userId]); // Recréée seulement si userId change

  const user = use(userPromise);

  return <div>Welcome, {user.name}!</div>;
}

// ❌ Anti-pattern : Promise recréée à chaque render
function UserDashboardWrong({ userId }: { userId: string }) {
  // ❌ Nouvelle promise à chaque render = boucle infinie
  const userPromise = fetchUser(userId);
  const user = use(userPromise);

  return <div>Welcome, {user.name}!</div>;
}`}
        language="tsx"
        filename="app/dashboard/page.tsx"
        highlightLines={[5, 6, 7, 8, 17, 18]}
        category="fundamentals"
      />

      <CodeBlock
        code={`// Pattern : Parallel Loading (éviter les waterfalls)
import { use, useMemo } from 'react';

function UserWithPosts({ userId }: { userId: string }) {
  // ✅ Créer TOUTES les promises AVANT de les consommer
  const promises = useMemo(() => {
    const userPromise = fetchUser(userId);
    const postsPromise = fetchPosts(userId);
    return { userPromise, postsPromise };
  }, [userId]);

  // Consommer en parallèle
  const user = use(promises.userPromise);
  const posts = use(promises.postsPromise);

  return (
    <div>
      <h1>{user.name}</h1>
      <ul>
        {posts.map(post => <li key={post.id}>{post.title}</li>)}
      </ul>
    </div>
  );
}

// ❌ Anti-pattern : Waterfall (séquentiel)
function UserWithPostsWrong({ userId }: { userId: string }) {
  const userPromise = useMemo(() => fetchUser(userId), [userId]);
  const user = use(userPromise); // Attend user...

  // ❌ posts ne commence à charger QUE quand user est résolu
  const postsPromise = useMemo(() => fetchPosts(userId), [userId]);
  const posts = use(postsPromise);

  return <div>...</div>;
}`}
        language="tsx"
        filename="app/profile/page.tsx"
        highlightLines={[6, 7, 8, 9, 13, 14, 28, 31, 32]}
        category="fundamentals"
      />

      <ComparisonTable modes={useCases} />

      <CodeBlock
        code={`// Pattern : Error Handling avec use() et Error Boundary
import { use, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function DataComponent({ dataPromise }: { dataPromise: Promise<Data> }) {
  const data = use(dataPromise); // Si reject, throw l'erreur

  return <div>{data.content}</div>;
}

export function DataPage() {
  const dataPromise = useMemo(() => fetchData(), []);

  return (
    <ErrorBoundary
      fallback={<div>Erreur lors du chargement</div>}
      onError={(error) => console.error(error)}
    >
      <Suspense fallback={<div>Chargement...</div>}>
        <DataComponent dataPromise={dataPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}`}
        language="tsx"
        filename="app/data/page.tsx"
        highlightLines={[6, 15, 16, 17, 19]}
        category="fundamentals"
      />

      <ConceptCard
        title="use() vs useEffect pour Data Fetching"
        description="La nouvelle approche recommandée pour charger des données dans React 19."
        category="fundamentals"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <h4 className="font-bold text-foreground mb-2">useEffect (React 18)</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Race conditions possibles</li>
              <li>• Gestion manuelle du loading</li>
              <li>• Logique complexe d&apos;état</li>
              <li>• Waterfalls fréquents</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <h4 className="font-bold text-foreground mb-2">use() + Suspense (React 19)</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Pas de race conditions</li>
              <li>• Loading automatique via Suspense</li>
              <li>• Code déclaratif et simple</li>
              <li>• Parallel loading natif</li>
            </ul>
          </div>
        </div>
      </ConceptCard>

      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">Recommandations Seniors</h3>
        <ul className="space-y-2 text-foreground/80">
          <li>
            <strong>Toujours wrapper avec Suspense</strong> : use() nécessite un boundary Suspense parent
          </li>
          <li>
            <strong>Promises stables</strong> : Utiliser useMemo ou créer hors du composant
          </li>
          <li>
            <strong>Préférer use() à useEffect</strong> pour le data fetching (moins de bugs, meilleure perf)
          </li>
          <li>
            <strong>Error Boundaries</strong> : Toujours gérer les rejections de promises
          </li>
          <li>
            <strong>TanStack Query</strong> : Pour des besoins avancés (caching, revalidation, mutations)
          </li>
        </ul>
      </div>
    </div>
  );
}
