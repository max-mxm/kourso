import { CodeBlock } from '@/components/course/code-block';
import { ConceptCard } from '@/components/course/concept-card';
import { ComparisonTable } from '@/components/course/comparison-table';

export default function ReduxVsContextVsZustandContent() {
  return (
    <>
      <h2 id="introduction">Introduction</h2>

      <p>
        La gestion d'etat est l'un des sujets les plus debattus dans l'ecosysteme
        React. Chaque projet finit par se poser la meme question : comment partager
        et synchroniser l'etat entre les composants ? Trois approches dominent le
        paysage en 2026 : la solution native React Context, l'ecosysteme etabli
        Redux Toolkit, et le minimaliste Zustand.
      </p>

      <p>
        Chacune repond a des besoins differents, et le choix depend rarement d'une
        superiorite technique absolue. Il depend du contexte : taille du projet,
        complexite de l'etat, frequence des mises a jour, et preferences de
        l'equipe.
      </p>

      <ConceptCard
        title="Trois philosophies, trois trade-offs"
        description="Chaque solution repond a un besoin specifique dans le spectre de la gestion d'etat."
        category="architecture"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>
            <strong>React Context</strong> : solution native, zero dependance,
            concue pour partager des donnees qui changent rarement (theme, locale, auth)
          </li>
          <li>
            <strong>Redux Toolkit</strong> : ecosysteme complet avec middleware,
            DevTools, et patterns bien documentes pour les applications complexes
          </li>
          <li>
            <strong>Zustand</strong> : store minimaliste (~2kB) avec selecteurs
            performants, sans Provider, et une API volontairement simple
          </li>
        </ul>
      </ConceptCard>

      <h2 id="react-context">React Context API</h2>

      <p>
        React Context est integre directement dans React. Il permet de passer des
        donnees a travers l'arbre de composants sans prop drilling. Le pattern
        classique repose sur un Provider qui encapsule un sous-arbre et des
        consumers (via <code>useContext</code>) qui lisent la valeur.
      </p>

      <CodeBlock
        code={`// React Context : solution native
import { createContext, useContext, useState, useMemo } from 'react';

interface AuthContextType {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (credentials: Credentials) => {
    const user = await authService.login(credentials);
    setUser(user);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // useMemo pour eviter les re-renders inutiles du Provider
  const value = useMemo(() => ({ user, login, logout }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personnalise avec validation
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit etre utilise dans un AuthProvider');
  }
  return context;
}`}
        language="tsx"
        filename="context/auth-context.tsx"
        highlightLines={[10, 26, 35, 37]}
        category="architecture"
      />

      <p>
        Context brille pour les donnees qui changent rarement : theme,
        langue, utilisateur connecte, configuration globale. Son integration
        native evite toute dependance externe et reste familiere pour tout
        developpeur React.
      </p>

      <h3 id="context-limites">Les limites de Context</h3>

      <p>
        Le probleme principal de Context est la performance :{' '}
        <strong>tous les composants qui consomment un Context se re-rendent
        quand la valeur change</strong>, meme s'ils n'utilisent qu'une partie
        de cette valeur. Il n'y a pas de selecteurs natifs.
      </p>

      <CodeBlock
        code={`// Probleme : re-render de TOUS les consumers
const AppContext = createContext<AppState>(defaultState);

function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    user: null,
    theme: 'light',
    notifications: [],
    cart: { items: [], total: 0 },
  });

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
}

// Ce composant se re-rend quand N'IMPORTE QUELLE partie du state change
// Meme si seul 'theme' l'interesse, un ajout au panier le re-rend
function ThemeToggle() {
  const { state, setState } = useContext(AppContext);
  //       ^-- re-render a chaque changement de notifications, cart, user...
  return (
    <button onClick={() => setState(s => ({ ...s, theme: s.theme === 'light' ? 'dark' : 'light' }))}>
      {state.theme}
    </button>
  );
}`}
        language="tsx"
        filename="Probleme de re-render avec Context"
        highlightLines={[20, 21, 22, 23]}
        category="architecture"
      />

      <p>
        La solution classique consiste a diviser en plusieurs Contexts
        (ThemeContext, CartContext, NotificationContext...), mais cela cree
        un &quot;Provider hell&quot; avec de nombreux Providers imbriques en haut
        de l'arbre. C'est un compromis, pas une solution elegante.
      </p>

      <h2 id="redux-toolkit">Redux Toolkit</h2>

      <p>
        Redux Toolkit (RTK) est la version moderne de Redux. Il simplifie
        considerablement le boilerplate historique avec <code>createSlice</code>,
        l'immutabilite via Immer, et un store configure par defaut avec les bons
        middleware.
      </p>

      <CodeBlock
        code={`// Redux Toolkit : createSlice + configureStore
import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: CartItem[];
  total: number;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], total: 0 } as CartState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      // Immer permet la "mutation" directe (immutable en coulisses)
      state.items.push(action.payload);
      state.total += action.payload.price;
    },
    removeItem(state, action: PayloadAction<string>) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        state.items = state.items.filter(i => i.id !== action.payload);
        state.total -= item.price;
      }
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

// Types inferes automatiquement
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`}
        language="tsx"
        filename="store/cart-slice.ts"
        highlightLines={[9, 13, 14, 15, 31, 33, 34]}
        category="architecture"
      />

      <h3 id="redux-quand">Quand Redux est pertinent</h3>

      <p>
        Redux prend tout son sens dans les applications a forte complexite
        d'etat ou les equipes ont besoin de conventions strictes. Ses atouts
        principaux :
      </p>

      <ul>
        <li>
          <strong>DevTools</strong> : time-travel debugging, inspection de chaque
          action, etat courant visualise en temps reel
        </li>
        <li>
          <strong>Middleware</strong> : thunks pour l'asynchrone, listener
          middleware pour les effets de bord, integration avec RTK Query pour
          le cache API
        </li>
        <li>
          <strong>Predictabilite</strong> : flux unidirectionnel strict, chaque
          changement d'etat est tracable via une action
        </li>
        <li>
          <strong>Ecosysteme</strong> : redux-persist, RTK Query, redux-saga,
          des centaines de middleware communautaires
        </li>
      </ul>

      <p>
        Le cout : une courbe d'apprentissage, un bundle plus lourd (~12kB
        gzipped), et un overhead de setup qui n'est pas justifie pour les petits
        projets.
      </p>

      <h2 id="zustand">Zustand</h2>

      <p>
        Zustand prend le contre-pied de Redux : pas de Provider, pas de
        boilerplate, une API minimale. Le store est cree avec une seule
        fonction <code>create</code> et les composants y souscrivent
        directement via un hook.
      </p>

      <CodeBlock
        code={`// Zustand : store minimaliste et performant
import { create } from 'zustand';

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  total: 0,
  addItem: (item) => set((state) => ({
    items: [...state.items, item],
    total: state.total + item.price,
  })),
  removeItem: (id) => set((state) => {
    const item = state.items.find(i => i.id === id);
    return {
      items: state.items.filter(i => i.id !== id),
      total: state.total - (item?.price ?? 0),
    };
  }),
  clearCart: () => set({ items: [], total: 0 }),
}));

// Usage direct : pas de Provider, pas de wrapper
function CartTotal() {
  // Selecteur : ce composant ne re-rend QUE quand 'total' change
  const total = useCartStore((state) => state.total);
  return <span>{total} EUR</span>;
}

function AddToCartButton({ item }: { item: CartItem }) {
  // Selecteur stable : reference de fonction, ne change jamais
  const addItem = useCartStore((state) => state.addItem);
  return <button onClick={() => addItem(item)}>Ajouter</button>;
}`}
        language="tsx"
        filename="store/cart-store.ts"
        highlightLines={[12, 30, 32, 33, 38, 39]}
        category="architecture"
      />

      <h3 id="zustand-avantages">Pourquoi Zustand seduit</h3>

      <p>
        Zustand a gagne en popularite pour plusieurs raisons :
      </p>

      <ul>
        <li>
          <strong>Taille</strong> : ~2kB gzipped, soit 6x moins que Redux Toolkit
        </li>
        <li>
          <strong>Pas de Provider</strong> : le store existe en dehors de l'arbre
          React, utilisable partout (composants, utilitaires, tests)
        </li>
        <li>
          <strong>Selecteurs integres</strong> : chaque composant souscrit
          uniquement a la partie du state qui l'interesse, evitant les re-renders
          inutiles par defaut
        </li>
        <li>
          <strong>TypeScript-first</strong> : inference de types naturelle,
          pas de types additionnels a maintenir
        </li>
        <li>
          <strong>Middleware extensible</strong> : persist (localStorage),
          devtools, immer, combine pour des besoins specifiques
        </li>
      </ul>

      <h2 id="comparaison">Comparaison directe</h2>

      <ComparisonTable
        modes={[
          {
            name: 'React Context',
            description: 'Solution native pour partager des donnees dans l\'arbre de composants.',
            pros: [
              'Zero dependance, integre a React',
              'API simple et connue de tous',
              'Parfait pour les donnees a faible frequence de changement',
            ],
            cons: [
              'Re-render de tous les consumers a chaque changement',
              'Pas de selecteurs natifs',
              'Performance degradee avec des updates frequents',
              'Provider hell si multiple Contexts',
            ],
            useCases: [
              'Theme, langue, authentification',
              'Configuration globale',
              'Petites applications',
            ],
            color: 'rgb(0, 150, 136)',
          },
          {
            name: 'Redux Toolkit',
            description: 'Ecosysteme complet avec middleware, DevTools et conventions strictes.',
            pros: [
              'DevTools puissants (time-travel debugging)',
              'Middleware riche (thunks, listeners, RTK Query)',
              'Ecosysteme mature et documente',
              'Patterns previsibles pour les grandes equipes',
            ],
            cons: [
              'Boilerplate reduit mais toujours present',
              'Courbe d\'apprentissage significative',
              'Bundle ~12kB gzipped',
              'Overhead pour les petits projets',
            ],
            useCases: [
              'Applications large-scale',
              'Etat complexe avec logique metier',
              'Besoin de middleware et DevTools',
              'Equipes structurees avec conventions',
            ],
            color: 'rgb(124, 58, 237)',
          },
          {
            name: 'Zustand',
            description: 'Store minimaliste avec selecteurs performants et API simple.',
            pros: [
              'API minimaliste (~2kB gzipped)',
              'Pas de Provider requis',
              'Selecteurs integres (re-renders optimises)',
              'TypeScript-first avec inference naturelle',
              'Compatible React Server Components',
            ],
            cons: [
              'DevTools moins puissants que Redux',
              'Ecosysteme plus petit',
              'Moins de conventions imposees',
            ],
            useCases: [
              'Projets de taille moyenne',
              'Remplacement de Context pour la performance',
              'Etat client-side cible',
              'Prototypage rapide et iterations',
            ],
            color: 'rgb(249, 115, 22)',
          },
        ]}
      />

      <h2 id="react-19">Impact de React 19</h2>

      <p>
        React 19 change la donne de plusieurs facons. Les Server Components
        reduisent le besoin d'etat cote client en deplacant le data fetching sur
        le serveur. Le nouveau hook <code>use()</code> permet de lire un Context
        de maniere conditionnelle, ce qui etait impossible avec{' '}
        <code>useContext</code>.
      </p>

      <ConceptCard
        title="React 19 redefinit les besoins en state management"
        description="Moins d'etat client signifie moins de complexite dans le choix de la solution."
        category="architecture"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>
            <strong>Server Components</strong> : les donnees fetchees sur le
            serveur n'ont plus besoin d'etre dans un store client. TanStack Query
            ou SWR gerent le cache API, pas Redux.
          </li>
          <li>
            <strong>Hook use()</strong> : permet de lire un Context dans des
            conditions ou boucles, plus flexible que useContext.
          </li>
          <li>
            <strong>Actions et useActionState</strong> : la gestion des
            formulaires et mutations server-side est nativement geree, sans
            store externe.
          </li>
          <li>
            <strong>Distinction cle</strong> : etat serveur (cache de donnees
            API) vs etat client (UI, preferences, formulaires). Seul l'etat
            client necessite un store.
          </li>
        </ul>
      </ConceptCard>

      <h2 id="guide-choix">Guide de choix par projet</h2>

      <p>
        Le choix depend du contexte. Voici un guide pragmatique base sur la
        taille du projet et la nature de l'etat a gerer :
      </p>

      <ConceptCard
        title="Recommandations par contexte"
        description="Il n'y a pas de solution universelle. Le choix depend de la taille du projet, de l'equipe, et de la nature de l'etat."
        category="architecture"
      >
        <ul className="space-y-3 text-sm text-foreground/80">
          <li>
            <strong>Petite app, peu d'etat partage</strong> : React Context
            suffit. Le theme, l'auth, et quelques preferences globales ne
            justifient pas une dependance externe.
          </li>
          <li>
            <strong>App moyenne, etat client frequemment mis a jour</strong> :
            Zustand. Sa legerete, ses selecteurs, et l'absence de Provider en
            font le choix pragmatique par defaut.
          </li>
          <li>
            <strong>Large app, logique complexe, equipe structuree</strong> :
            Redux Toolkit. Les DevTools, le middleware, et les conventions
            imposees sont precieux a cette echelle.
          </li>
          <li>
            <strong>Etat serveur (cache API)</strong> : ni Redux, ni Context,
            ni Zustand. Utilisez TanStack Query ou SWR, concus specifiquement
            pour le cache de donnees server.
          </li>
        </ul>
      </ConceptCard>

      <p>
        Un pattern courant en 2026 : <strong>Zustand pour l'etat client +
        TanStack Query pour l'etat serveur</strong>. Cette combinaison couvre
        la grande majorite des besoins sans la complexite de Redux, tout en
        restant performante et maintenable.
      </p>

      <h2 id="conclusion">Conclusion</h2>

      <p>
        Il n'y a pas de &quot;meilleure&quot; solution de state management. React Context
        est ideal pour les donnees stables partagees, Zustand pour un store
        client performant et leger, Redux Toolkit pour les applications complexes
        necessitant structure et outillage.
      </p>

      <p>
        Avec React 19 et les Server Components, la tendance est claire :{' '}
        <strong>minimiser l'etat client</strong>. Deplacez les donnees serveur
        vers TanStack Query ou les Server Components, et reservez le store
        client uniquement pour l'etat qui appartient reellement au navigateur :
        UI state, preferences utilisateur, formulaires en cours.
      </p>

      <p>
        Le vrai enjeu n'est pas &quot;quel outil choisir&quot; mais &quot;de combien d'etat
        client ai-je reellement besoin ?&quot;. Moins il y en a, plus le choix de
        l'outil devient simple.
      </p>
    </>
  );
}
