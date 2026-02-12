'use client';

import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';
import { Check, X } from 'lucide-react';

export function ReactPatternsSection() {
  const stateManagementTools = [
    {
      name: 'useState/useReducer',
      description: 'État local au composant React',
      pros: ['Simple', 'Pas de dépendance externe', 'Performant'],
      cons: ['Prop drilling', 'Difficile à partager'],
      useCases: ['État formulaire', 'Toggle UI', 'État composant isolé'],
      color: 'rgb(0, 150, 136)'
    },
    {
      name: 'Context API',
      description: 'Partage d\'état global sans prop drilling',
      pros: ['Natif React', 'Évite prop drilling', 'Simple pour état global'],
      cons: ['Re-render de tous consumers', 'Pas de devtools'],
      useCases: ['Theme', 'Langue', 'Auth user', 'Données rarement modifiées'],
      color: 'rgb(59, 130, 246)'
    },
    {
      name: 'Zustand',
      description: 'State management client minimaliste',
      pros: ['2 KB', 'API simple', 'Performant (re-render sélectif)', 'Devtools'],
      cons: ['Client-only', 'Une librairie de plus'],
      useCases: ['UI state complexe', 'Panier', 'Filtres', 'Modals'],
      color: 'rgb(168, 85, 247)'
    },
    {
      name: 'React Query / TanStack Query',
      description: 'Server state management (cache API)',
      pros: ['Cache intelligent', 'Refetch auto', 'Optimistic updates', 'Devtools'],
      cons: ['Courbe d\'apprentissage', 'Inutile sans API'],
      useCases: ['Données API', 'Server state', 'Synchronisation serveur'],
      color: 'rgb(239, 68, 68)'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Maîtriser les patterns React permet d'écrire du code plus maintenable, performant et lisible.
          Ce guide couvre les anti-patterns courants et les solutions modernes.
        </p>
      </div>

      {/* Hooks Anti-Patterns */}
      <ConceptCard
        title="Hooks Anti-Patterns : Les Erreurs Fréquentes"
        description="Les 3 erreurs les plus courantes avec les hooks React et leurs solutions élégantes."
        category="best-practices"
      >
        <div className="space-y-8">
          {/* 1. useEffect Abuse */}
          <div>
            <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              1. useEffect Abuse : Dérivation Directe vs useEffect
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                <div className="flex items-start gap-2 mb-2">
                  <X className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <h5 className="font-bold text-red-600 dark:text-red-400">Anti-Pattern</h5>
                </div>
                <p className="text-sm text-muted-foreground">
                  useEffect pour calculer valeur dérivée
                </p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                <div className="flex items-start gap-2 mb-2">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <h5 className="font-bold text-green-600 dark:text-green-400">Pattern Correct</h5>
                </div>
                <p className="text-sm text-muted-foreground">
                  Calculer pendant le render
                </p>
              </div>
            </div>
            <CodeBlock
              code={`// ❌ ANTI-PATTERN : useEffect inutile
function ProductList({ products }: { products: Product[] }) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // ⚠️ Cause 2 renders au lieu d'1 !
  useEffect(() => {
    setFilteredProducts(products.filter(p => p.inStock));
  }, [products]);

  return <div>{filteredProducts.map(...)}</div>;
}

// ✅ SOLUTION : Dérivation directe
function ProductList({ products }: { products: Product[] }) {
  // ✅ Calculé pendant le render (1 seul render)
  const filteredProducts = products.filter(p => p.inStock);

  return <div>{filteredProducts.map(...)}</div>;
}

// ✅ Si calcul coûteux : useMemo
function ProductList({ products }: { products: Product[] }) {
  const filteredProducts = useMemo(
    () => products.filter(p => p.inStock && expensiveCalculation(p)),
    [products] // Re-calcule uniquement si products change
  );

  return <div>{filteredProducts.map(...)}</div>;
}

// Règle : useEffect est pour les side effects (fetch, subscription, DOM)
// PAS pour la dérivation d'état !`}
              language="tsx"
              filename="components/product-list.tsx"
              highlightLines={[14, 15, 16, 21, 22, 23, 24, 25, 30, 31]}
              category="best-practices"
            />
          </div>

          {/* 2. Multiple useState */}
          <div>
            <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              2. Multiple useState : État Unifié avec useReducer
            </h4>
            <CodeBlock
              code={`// ❌ ANTI-PATTERN : Multiples useState liés
function CheckoutForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    // ... logique complexe avec 6 setters
  };
}

// ✅ SOLUTION : useReducer pour état complexe
type State = {
  form: { name: string; email: string; address: string };
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
};

type Action =
  | { type: 'UPDATE_FIELD'; field: keyof State['form']; value: string }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; error: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, form: { ...state.form, [action.field]: action.value } };
    case 'SUBMIT_START':
      return { ...state, status: 'loading', error: null };
    case 'SUBMIT_SUCCESS':
      return { ...state, status: 'success' };
    case 'SUBMIT_ERROR':
      return { ...state, status: 'error', error: action.error };
    default:
      return state;
  }
}

function CheckoutForm() {
  const [state, dispatch] = useReducer(reducer, {
    form: { name: '', email: '', address: '' },
    status: 'idle',
    error: null,
  });

  const handleSubmit = async () => {
    dispatch({ type: 'SUBMIT_START' });
    try {
      await submitForm(state.form);
      dispatch({ type: 'SUBMIT_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'SUBMIT_ERROR', error: error.message });
    }
  };

  return (
    <form>
      <input
        value={state.form.name}
        onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'name', value: e.target.value })}
      />
      {state.status === 'loading' && <Spinner />}
      {state.status === 'error' && <Error message={state.error} />}
    </form>
  );
}`}
              language="tsx"
              filename="components/checkout-form.tsx"
              highlightLines={[18, 19, 20, 21, 24, 30, 31, 32, 44, 45, 46, 47, 48, 51, 52]}
              category="best-practices"
            />
          </div>

          {/* 3. Prop Drilling */}
          <div>
            <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              3. Prop Drilling : Context API ou Zustand
            </h4>
            <CodeBlock
              code={`// ❌ ANTI-PATTERN : Prop drilling sur 5 niveaux
<App user={user}>
  <Layout user={user}>
    <Dashboard user={user}>
      <Sidebar user={user}>
        <UserProfile user={user} /> {/* user passé 5 fois ! */}
      </Sidebar>
    </Dashboard>
  </Layout>
</App>

// ✅ SOLUTION 1 : Context API (pour données rarement modifiées)
import { createContext, useContext } from 'react';

const UserContext = createContext<User | null>(null);

export function UserProvider({ children, user }: { children: React.ReactNode; user: User }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  const user = useContext(UserContext);
  if (!user) throw new Error('useUser must be inside UserProvider');
  return user;
}

// Utilisation
function App({ user }: { user: User }) {
  return (
    <UserProvider user={user}>
      <Layout>
        <Dashboard>
          <Sidebar>
            <UserProfile /> {/* ✅ Pas de props ! */}
          </Sidebar>
        </Dashboard>
      </Layout>
    </UserProvider>
  );
}

function UserProfile() {
  const user = useUser(); // ✅ Accès direct
  return <div>{user.name}</div>;
}

// ✅ SOLUTION 2 : Zustand (pour état UI fréquemment modifié)
import { create } from 'zustand';

const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
}));

// Utilisation dans n'importe quel composant (sans Provider !)
function CartButton() {
  const items = useCartStore(state => state.items); // ✅ Re-render uniquement si items change
  return <button>Panier ({items.length})</button>;
}

function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore(state => state.addItem); // ✅ Pas de re-render si items change
  return <button onClick={() => addItem(product)}>Ajouter</button>;
}`}
              language="tsx"
              filename="components/user-context.tsx"
              highlightLines={[14, 15, 16, 17, 19, 20, 21, 22, 31, 38, 39, 45, 46, 47, 48, 49, 53, 54, 58, 59]}
              category="best-practices"
            />
          </div>
        </div>
      </ConceptCard>

      {/* Component Composition Patterns */}
      <ConceptCard
        title="Component Composition Patterns"
        description="Patterns avancés pour créer des composants réutilisables et flexibles."
        category="best-practices"
      >
        <div className="space-y-8">
          {/* 1. Children Pattern */}
          <div>
            <h4 className="font-bold text-foreground mb-3">1. Children Pattern : Layout Composable</h4>
            <CodeBlock
              code={`// ✅ Pattern : Children pour composition flexible
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border p-6 shadow-sm">
      {children}
    </div>
  );
}

// Utilisation : Composition libre
<Card>
  <h2>Titre</h2>
  <p>Description</p>
  <button>Action</button>
</Card>

// Alternative : Slots nommés
function Card({
  header,
  content,
  footer
}: {
  header: React.ReactNode;
  content: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="card">
      <div className="card-header">{header}</div>
      <div className="card-content">{content}</div>
      <div className="card-footer">{footer}</div>
    </div>
  );
}

<Card
  header={<h2>Titre</h2>}
  content={<p>Description</p>}
  footer={<button>Action</button>}
/>`}
              language="tsx"
              filename="components/card.tsx"
              highlightLines={[2, 5, 10, 11, 12, 13, 18, 19, 20, 21, 29, 30, 31]}
              category="best-practices"
            />
          </div>

          {/* 2. Render Props */}
          <div>
            <h4 className="font-bold text-foreground mb-3">2. Render Props : Logique Réutilisable</h4>
            <CodeBlock
              code={`// ✅ Pattern : Render Props pour partager logique
interface MousePosition {
  x: number;
  y: number;
}

function MouseTracker({ render }: { render: (position: MousePosition) => React.ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <>{render(position)}</>;
}

// Utilisation : Render props
<MouseTracker
  render={({ x, y }) => (
    <div>
      Position : {x}, {y}
    </div>
  )}
/>

// Alternative moderne : Custom Hook
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
}

// Utilisation : Custom Hook (plus simple !)
function App() {
  const { x, y } = useMousePosition();
  return <div>Position : {x}, {y}</div>;
}`}
              language="tsx"
              filename="components/mouse-tracker.tsx"
              highlightLines={[7, 19, 23, 24, 25, 26, 27, 32, 44, 48, 49, 50]}
              category="best-practices"
            />
          </div>

          {/* 3. Compound Components */}
          <div>
            <h4 className="font-bold text-foreground mb-3">3. Compound Components : API Déclarative</h4>
            <CodeBlock
              code={`// ✅ Pattern : Compound Components (ex: Tabs)
import { createContext, useContext, useState } from 'react';

const TabsContext = createContext<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
} | null>(null);

function Tabs({ children, defaultTab }: { children: React.ReactNode; defaultTab: string }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabsList({ children }: { children: React.ReactNode }) {
  return <div className="tabs-list">{children}</div>;
}

function TabsTrigger({ value, children }: { value: string; children: React.ReactNode }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be inside Tabs');

  const { activeTab, setActiveTab } = context;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={activeTab === value ? 'active' : ''}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, children }: { value: string; children: React.ReactNode }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be inside Tabs');

  if (context.activeTab !== value) return null;

  return <div className="tabs-content">{children}</div>;
}

// Export comme namespace
export const TabsComponent = {
  Root: Tabs,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};

// Utilisation : API déclarative et flexible
import { TabsComponent } from './tabs';

<TabsComponent.Root defaultTab="account">
  <TabsComponent.List>
    <TabsComponent.Trigger value="account">Compte</TabsComponent.Trigger>
    <TabsComponent.Trigger value="password">Mot de passe</TabsComponent.Trigger>
  </TabsComponent.List>

  <TabsComponent.Content value="account">
    <p>Gérer votre compte</p>
  </TabsComponent.Content>

  <TabsComponent.Content value="password">
    <p>Changer votre mot de passe</p>
  </TabsComponent.Content>
</TabsComponent.Root>`}
              language="tsx"
              filename="components/tabs.tsx"
              highlightLines={[4, 5, 6, 9, 10, 13, 14, 23, 24, 27, 39, 40, 43, 48, 49, 50, 51, 52, 58, 59, 60]}
              category="best-practices"
            />
          </div>

          {/* 4. Higher-Order Components */}
          <div>
            <h4 className="font-bold text-foreground mb-3">4. Higher-Order Components (HOC) : Enrichir Composants</h4>
            <CodeBlock
              code={`// ✅ Pattern : HOC pour ajouter fonctionnalité
function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { user, loading } = useAuth();

    if (loading) return <Spinner />;
    if (!user) return <Redirect to="/login" />;

    return <Component {...props} />;
  };
}

// Utilisation
function DashboardPage() {
  return <div>Dashboard privé</div>;
}

export default withAuth(DashboardPage);

// ⚠️ HOC moins utilisé aujourd'hui, préférer :
// - Custom Hooks (plus simple)
// - Render Props
// - Compound Components

// Alternative moderne : Middleware Route
// app/dashboard/layout.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login'); // ✅ Redirect côté serveur

  return <>{children}</>;
}`}
              language="tsx"
              filename="components/with-auth.tsx"
              highlightLines={[2, 3, 6, 7, 8, 17, 26, 27, 29, 30, 31, 33, 35]}
              category="best-practices"
            />
          </div>
        </div>
      </ConceptCard>

      {/* Performance Optimization */}
      <ConceptCard
        title="Performance Optimization : Éviter Re-renders Inutiles"
        description="Techniques pour optimiser les performances React et réduire les re-renders."
        category="best-practices"
      >
        <div className="space-y-8">
          {/* React.memo */}
          <div>
            <h4 className="font-bold text-foreground mb-3">1. React.memo : Memoization de Composant</h4>
            <CodeBlock
              code={`// ❌ PROBLÈME : Re-render à chaque fois que parent re-render
function ProductCard({ product }: { product: Product }) {
  console.log('ProductCard render');
  return <div>{product.name}</div>;
}

function ProductList({ products }: { products: Product[] }) {
  const [count, setCount] = useState(0);

  // ⚠️ Chaque setCount() re-render TOUS les ProductCard !
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}

// ✅ SOLUTION : React.memo pour éviter re-render si props identiques
const ProductCard = React.memo(function ProductCard({ product }: { product: Product }) {
  console.log('ProductCard render'); // ✅ Ne log que si product change
  return <div>{product.name}</div>;
});

// ⚠️ Attention : React.memo compare par référence (===)
// Si product est un nouvel objet à chaque render, memo est inutile !

// ✅ Custom comparison pour deep equality
const ProductCard = React.memo(
  function ProductCard({ product }: { product: Product }) {
    return <div>{product.name}</div>;
  },
  (prevProps, nextProps) => prevProps.product.id === nextProps.product.id
);`}
              language="tsx"
              filename="components/product-card.tsx"
              highlightLines={[20, 21, 22, 29, 30, 31, 32, 33]}
              category="best-practices"
            />

            <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border">
              <h5 className="font-semibold text-foreground mb-2">Cas d'utilisation concrets de React.memo</h5>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li>
                  <strong>1. Items de liste</strong> : Dans une liste de produits, actualités ou messages où chaque item est indépendant
                </li>
                <li>
                  <strong>2. Composants de visualisation</strong> : Graphiques, cartes, tableaux qui sont coûteux à rendre
                </li>
                <li>
                  <strong>3. Sections de formulaire</strong> : Isoler les sections d'un formulaire complexe pour éviter re-render global
                </li>
                <li>
                  <strong>4. Composants feuilles</strong> : Composants en bout d'arbre sans enfants, purement présentationnels
                </li>
                <li>
                  <strong>5. Widgets indépendants</strong> : Timer, compteur, horloge qui ne dépendent pas du state parent
                </li>
              </ul>
            </div>
          </div>

          {/* useMemo */}
          <div>
            <h4 className="font-bold text-foreground mb-3">2. useMemo : Memoization de Valeur</h4>
            <CodeBlock
              code={`// ❌ PROBLÈME : Calcul coûteux à chaque render
function ProductList({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState('');

  // ⚠️ Re-calcule à chaque render (même si products/filter identiques)
  const filteredProducts = products
    .filter(p => p.name.includes(filter))
    .sort((a, b) => expensiveSort(a, b)); // Calcul coûteux

  return <div>{filteredProducts.map(...)}</div>;
}

// ✅ SOLUTION : useMemo pour memoizer le résultat
function ProductList({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState('');

  const filteredProducts = useMemo(
    () => products
      .filter(p => p.name.includes(filter))
      .sort((a, b) => expensiveSort(a, b)),
    [products, filter] // ✅ Re-calcule uniquement si products ou filter change
  );

  return <div>{filteredProducts.map(...)}</div>;
}

// ⚠️ N'utilisez useMemo que si :
// 1. Le calcul est coûteux (>10ms)
// 2. La valeur est passée à React.memo ou useEffect deps
// Sinon, useMemo ajoute de la complexité inutile !`}
              language="tsx"
              filename="components/product-list.tsx"
              highlightLines={[17, 18, 19, 20, 21, 22]}
              category="best-practices"
            />

            <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border">
              <h5 className="font-semibold text-foreground mb-2">Cas d'utilisation concrets de useMemo</h5>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li>
                  <strong>1. Filtrage et tri de listes longues</strong> : Liste de {'>'}1000 produits avec recherche/filtres multiples
                </li>
                <li>
                  <strong>2. Agrégations de données</strong> : Calcul de sommes, moyennes, groupBy sur datasets volumineux
                </li>
                <li>
                  <strong>3. Transformations coûteuses</strong> : Parsing de JSON complexe, formatting de dates, conversions d'unités
                </li>
                <li>
                  <strong>4. Objets de configuration</strong> : Création d'objets complexes passés à des composants memoizés
                </li>
                <li>
                  <strong>5. Calculs mathématiques</strong> : Matrices, statistiques, algorithmes récursifs ou itératifs lourds
                </li>
                <li>
                  <strong>6. Dérivation d'état</strong> : Calculer un état dérivé complexe à partir du state principal
                </li>
              </ul>
              <div className="mt-3 p-2 bg-background rounded text-xs text-foreground/70">
                <strong>Règle pratique :</strong> Si le calcul prend {'>'}10ms (vérifiable avec console.time), utilisez useMemo
              </div>
            </div>
          </div>

          {/* useCallback */}
          <div>
            <h4 className="font-bold text-foreground mb-3">3. useCallback : Memoization de Fonction</h4>
            <CodeBlock
              code={`// ❌ PROBLÈME : Nouvelle fonction à chaque render
function ProductList({ products }: { products: Product[] }) {
  const [count, setCount] = useState(0);

  // ⚠️ handleClick est une NOUVELLE fonction à chaque render
  // ProductCard re-render même si props.product identique (onClick change)
  const handleClick = (id: string) => {
    console.log('Clicked', id);
  };

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      {products.map(p => <ProductCard key={p.id} product={p} onClick={handleClick} />)}
    </div>
  );
}

// ✅ SOLUTION : useCallback pour référence stable
function ProductList({ products }: { products: Product[] }) {
  const [count, setCount] = useState(0);

  // ✅ handleClick garde la même référence entre renders
  const handleClick = useCallback((id: string) => {
    console.log('Clicked', id);
  }, []); // Deps vide = fonction jamais re-créée

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      {products.map(p => <ProductCard key={p.id} product={p} onClick={handleClick} />)}
    </div>
  );
}

// ⚠️ Si fonction dépend de state/props :
const handleClick = useCallback((id: string) => {
  console.log('Clicked', id, count); // count dans closure
}, [count]); // ✅ Re-créée uniquement si count change`}
              language="tsx"
              filename="components/product-list.tsx"
              highlightLines={[24, 25, 26, 37, 38, 39]}
              category="best-practices"
            />

            <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border">
              <h5 className="font-semibold text-foreground mb-2">Cas d'utilisation concrets de useCallback</h5>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li>
                  <strong>1. Event handlers dans des listes</strong> : onClick, onChange passés à des items de liste memoizés
                </li>
                <li>
                  <strong>2. Callbacks avec debounce/throttle</strong> : Recherche en temps réel, scroll handlers, resize listeners
                </li>
                <li>
                  <strong>3. Callbacks dans useEffect dependencies</strong> : Éviter re-exécution d'effet si fonction stable
                </li>
                <li>
                  <strong>4. Callbacks passés à des composants memoizés</strong> : Préserver les bénéfices de React.memo
                </li>
                <li>
                  <strong>5. Fonctions dans Context</strong> : Fonctions partagées via Context pour éviter re-render global
                </li>
                <li>
                  <strong>6. Handlers de formulaire complexes</strong> : Validation, transformation de données, soumission async
                </li>
              </ul>
              <div className="mt-3 p-2 bg-background rounded text-xs text-foreground/70">
                <strong>Attention :</strong> useCallback sans React.memo n'a pas d'impact sur la performance !
              </div>
            </div>
          </div>

          {/* Virtualization */}
          <div>
            <h4 className="font-bold text-foreground mb-3">4. Virtualization : Listes Longues</h4>
            <CodeBlock
              code={`// ❌ PROBLÈME : Render 10 000 éléments (lag + freeze)
function ProductList({ products }: { products: Product[] }) {
  return (
    <div>
      {products.map(p => <ProductCard key={p.id} product={p} />)} {/* 10 000 DOM nodes ! */}
    </div>
  );
}

// ✅ SOLUTION : react-window (virtualization)
import { FixedSizeList } from 'react-window';

function ProductList({ products }: { products: Product[] }) {
  return (
    <FixedSizeList
      height={600} // Hauteur container
      itemCount={products.length} // Nombre total items
      itemSize={100} // Hauteur d'un item
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          <ProductCard product={products[index]} />
        </div>
      )}
    </FixedSizeList>
  );
}

// Impact :
// Avant : 10 000 DOM nodes
// Après : ~10 DOM nodes (seulement les visibles)
// Performance : 60 FPS vs 5 FPS`}
              language="tsx"
              filename="components/product-list.tsx"
              highlightLines={[11, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24]}
              category="best-practices"
            />
          </div>
        </div>
      </ConceptCard>

      {/* State Management */}
      <ConceptCard
        title="State Management : Choisir le Bon Outil"
        description="Guide de décision pour choisir entre useState, Context, Zustand et React Query selon le cas d'usage."
        category="best-practices"
      >
        <ComparisonTable modes={stateManagementTools} />

        <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <h5 className="font-bold text-foreground mb-3">Règle de Décision</h5>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span><strong>Client state (UI)</strong> : useState, Zustand</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span><strong>Server state (API)</strong> : React Query, SWR</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span><strong>Global rarement modifié</strong> : Context API</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span><strong>Global fréquemment modifié</strong> : Zustand</span>
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* Error Boundaries */}
      <ConceptCard
        title="Error Boundaries : Gérer les Erreurs React"
        description="Capturer les erreurs React et afficher un fallback UI sans crasher toute l'application."
        category="best-practices"
      >
        <CodeBlock
          code={`// ✅ Error Boundary avec react-error-boundary
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="error-fallback">
      <h2>Une erreur est survenue</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Réessayer</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset app state (ex: clear cache)
      }}
      onError={(error, errorInfo) => {
        // Log error to Sentry/Bugsnag
        console.error('Error caught:', error, errorInfo);
      }}
    >
      <DangerousComponent />
    </ErrorBoundary>
  );
}

// ⚠️ Error Boundaries ne capturent PAS :
// - Event handlers (onClick, onChange)
// - Async code (setTimeout, fetch)
// - Server-side rendering
// - Errors dans Error Boundary lui-même

// Pour event handlers, utiliser try/catch :
function DangerousButton() {
  const handleClick = async () => {
    try {
      await riskyOperation();
    } catch (error) {
      toast.error('Erreur : ' + error.message);
    }
  };

  return <button onClick={handleClick}>Action risquée</button>;
}`}
          language="tsx"
          filename="app/layout.tsx"
          highlightLines={[2, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 38, 39, 40, 41, 42, 43]}
          category="best-practices"
        />
      </ConceptCard>

      {/* Pièges */}
      <ConceptCard
        title="Pièges Courants à Éviter"
        description="Les erreurs React les plus fréquentes et comment les détecter rapidement."
        category="best-practices"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-red-600 dark:text-red-400 mb-2">
                  1. useEffect en excès pour dérivation d'état
                </h5>
                <p className="text-sm text-muted-foreground">
                  Calculer directement pendant le render au lieu de useEffect. Utiliser useMemo si coûteux.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-red-600 dark:text-red-400 mb-2">
                  2. Multiples useState pour état lié
                </h5>
                <p className="text-sm text-muted-foreground">
                  Utiliser useReducer pour état complexe (ex: form avec loading/error/success).
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-red-600 dark:text-red-400 mb-2">
                  3. Fonctions inline dans props de composants memoizés
                </h5>
                <p className="text-sm text-muted-foreground">
                  Utiliser useCallback pour référence stable si composant utilise React.memo.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-red-600 dark:text-red-400 mb-2">
                  4. Mutation directe de state
                </h5>
                <p className="text-sm text-muted-foreground">
                  Toujours créer un nouvel objet/array (spread operator ou méthodes immutables).
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-red-600 dark:text-red-400 mb-2">
                  5. Oublier dependencies array dans useEffect/useMemo/useCallback
                </h5>
                <p className="text-sm text-muted-foreground">
                  ESLint exhaustive-deps détecte automatiquement. Toujours activer cette règle.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-red-600 dark:text-red-400 mb-2">
                  6. Oublier key prop dans listes
                </h5>
                <p className="text-sm text-muted-foreground">
                  Utiliser ID stable (jamais index). React ne peut pas optimiser les re-renders sans key.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ConceptCard>
    </div>
  );
}
