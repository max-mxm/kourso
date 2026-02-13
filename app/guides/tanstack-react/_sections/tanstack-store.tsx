import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';

export default function TanStackStoreSection() {
  const storeComparison = [
    {
      name: 'TanStack Store',
      description: 'Store immutable et reactif en ~2 KB, moteur interne de TanStack Form et Router.',
      pros: [
        'Ultra-leger (~2 KB)',
        'Zero re-renders inutiles',
        'Framework-agnostic',
        'Pas de provider/context necessaire',
      ],
      cons: [
        'Ecosysteme de middleware limite',
        'Pas de DevTools dediees',
        'Communaute plus restreinte',
      ],
      useCases: [
        'Etat local partage entre composants proches',
        'Librairies framework-agnostic',
        'Cas ou le poids du bundle est critique',
      ],
      color: 'rgb(249, 115, 22)',
    },
    {
      name: 'Zustand',
      description: 'Store minimaliste avec une API simple basee sur des hooks, middleware riche.',
      pros: [
        'API extremement simple',
        'Middleware puissant (persist, devtools, immer)',
        'Excellente documentation',
        'Large adoption en production',
      ],
      cons: [
        'Specifique a React',
        'Legerement plus lourd (~3 KB)',
        'Selecteurs manuels pour eviter les re-renders',
      ],
      useCases: [
        'Etat global applicatif',
        'Etat persiste (localStorage, sessionStorage)',
        'Projets React avec besoin de middleware',
      ],
      color: 'rgb(168, 85, 247)',
    },
    {
      name: 'React Context',
      description: 'Solution native de React pour le partage d\'etat via l\'arbre de composants.',
      pros: [
        'Aucune dependance externe',
        'Integre nativement a React',
        'Ideal pour les themes et preferences',
      ],
      cons: [
        'Re-rend tous les consommateurs a chaque changement',
        'Pas de selecteurs natifs',
        'Performance degradee pour l\'etat qui change souvent',
      ],
      useCases: [
        'Theme, locale, authentification',
        'Configuration qui change rarement',
        'Props drilling sur 2-3 niveaux maximum',
      ],
      color: 'rgb(59, 130, 246)',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          <code>@tanstack/store</code> est un store reactif immutable qui pese environ 2 KB.
          Il constitue le moteur interne de TanStack Form et TanStack Router, gerant leurs
          mises a jour d&apos;etat avec une granularite fine. Son API minimaliste le rend
          egalement utilisable comme solution standalone pour la gestion d&apos;etat.
        </p>
      </div>

      <h3 className="text-xl font-semibold text-foreground">
        Creer un store reactif
      </h3>

      <CodeBlock
        code={`import { Store } from '@tanstack/store';

// Creation d'un store type-safe
interface CounterState {
  count: number;
  lastUpdated: Date | null;
}

const counterStore = new Store<CounterState>({
  count: 0,
  lastUpdated: null,
});

// Mise a jour immutable via setState
counterStore.setState((prev) => ({
  ...prev,
  count: prev.count + 1,
  lastUpdated: new Date(),
}));

// Ecouter les changements (framework-agnostic)
const unsubscribe = counterStore.subscribe(() => {
  console.log('Nouvel etat :', counterStore.state);
});

// Acceder a l'etat courant
console.log(counterStore.state.count); // 1

// Se desabonner
unsubscribe();`}
        language="typescript"
        filename="counter-store.ts"
        highlightLines={[9, 10, 11, 15, 16, 17, 18, 19]}
        category="optimization"
      />

      <h3 className="text-xl font-semibold text-foreground">
        useStore : integration React
      </h3>

      <CodeBlock
        code={`'use client';

import { Store, useStore } from '@tanstack/react-store';

// -- Definition du store en dehors du composant --
interface AppNotification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error';
  timestamp: number;
}

interface NotificationState {
  notifications: AppNotification[];
  unreadCount: number;
}

const notificationStore = new Store<NotificationState>({
  notifications: [],
  unreadCount: 0,
});

// Actions : fonctions pures qui mettent a jour le store
export function addNotification(message: string, type: AppNotification['type']) {
  notificationStore.setState((prev) => {
    const notification: AppNotification = {
      id: crypto.randomUUID(),
      message,
      type,
      timestamp: Date.now(),
    };
    return {
      notifications: [notification, ...prev.notifications],
      unreadCount: prev.unreadCount + 1,
    };
  });
}

export function markAllAsRead() {
  notificationStore.setState((prev) => ({
    ...prev,
    unreadCount: 0,
  }));
}

export function clearNotifications() {
  notificationStore.setState(() => ({
    notifications: [],
    unreadCount: 0,
  }));
}

// -- Composant : badge de notifications --
// Ne re-rend que lorsque unreadCount change
export function NotificationBadge() {
  const unreadCount = useStore(notificationStore, (state) => state.unreadCount);

  if (unreadCount === 0) return null;

  return (
    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
      {unreadCount > 99 ? '99+' : unreadCount}
    </span>
  );
}

// -- Composant : liste des notifications --
// Ne re-rend que lorsque le tableau notifications change
export function NotificationList() {
  const notifications = useStore(
    notificationStore,
    (state) => state.notifications
  );

  return (
    <div className="space-y-2 max-h-[400px] overflow-y-auto">
      {notifications.length === 0 ? (
        <p className="text-sm text-muted-foreground py-4 text-center">
          Aucune notification
        </p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-3 rounded-lg border border-border/50 text-sm"
          >
            <p className="font-medium">{notification.message}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(notification.timestamp).toLocaleTimeString('fr-FR')}
            </p>
          </div>
        ))
      )}
    </div>
  );
}`}
        language="tsx"
        filename="notification-store.tsx"
        highlightLines={[57, 58, 72, 73, 74]}
        category="optimization"
      />

      <ConceptCard
        title="Store : le moteur interne de Form et Router"
        description="@tanstack/store n'est pas seulement une librairie standalone. C'est le systeme reactif qui alimente TanStack Form (un store par champ) et TanStack Router (etat de navigation, search params). Comprendre Store permet de comprendre pourquoi ces outils sont si performants."
        category="optimization"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>-- <strong>TanStack Form</strong> : chaque champ est un micro-store independant. Modifier un champ ne notifie que son store, pas les autres</li>
          <li>-- <strong>TanStack Router</strong> : les search params et le loader data sont geres via des stores reactifs, permettant des mises a jour chirurgicales de l&apos;UI</li>
          <li>-- <strong>Implication pratique</strong> : si vous comprenez Store, vous pouvez etendre Form et Router avec des comportements personnalises</li>
        </ul>
      </ConceptCard>

      <h3 className="text-xl font-semibold text-foreground">
        Etat derive et selecteurs
      </h3>

      <CodeBlock
        code={`import { Store, useStore } from '@tanstack/react-store';

// -- Store e-commerce --
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  couponDiscount: number; // pourcentage
}

const cartStore = new Store<CartState>({
  items: [],
  couponCode: null,
  couponDiscount: 0,
});

// Actions
export function addToCart(item: Omit<CartItem, 'quantity'>) {
  cartStore.setState((prev) => {
    const existing = prev.items.find((i) => i.id === item.id);
    if (existing) {
      return {
        ...prev,
        items: prev.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    }
    return {
      ...prev,
      items: [...prev.items, { ...item, quantity: 1 }],
    };
  });
}

export function applyCoupon(code: string, discount: number) {
  cartStore.setState((prev) => ({
    ...prev,
    couponCode: code,
    couponDiscount: discount,
  }));
}

// -- Selecteurs derives --
// Ces fonctions calculent des valeurs a partir de l'etat du store.
// useStore n'execute un re-render que si le resultat du selecteur change.

export function CartItemCount() {
  const count = useStore(cartStore, (state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return <span className="text-sm font-medium">{count} articles</span>;
}

export function CartSubtotal() {
  const subtotal = useStore(cartStore, (state) =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  return (
    <span className="font-semibold">
      {subtotal.toFixed(2)} EUR
    </span>
  );
}

export function CartTotal() {
  // Selecteur compose : sous-total avec reduction appliquee
  const total = useStore(cartStore, (state) => {
    const subtotal = state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const discount = subtotal * (state.couponDiscount / 100);
    return subtotal - discount;
  });

  const hasDiscount = useStore(
    cartStore,
    (state) => state.couponDiscount > 0
  );

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg font-bold">{total.toFixed(2)} EUR</span>
      {hasDiscount && (
        <span className="text-xs text-green-600 font-medium">
          Reduction appliquee
        </span>
      )}
    </div>
  );
}`}
        language="tsx"
        filename="cart-store-selectors.tsx"
        highlightLines={[54, 55, 56, 63, 64, 76, 77, 78, 79, 80, 81]}
        category="optimization"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Comparaison des solutions de gestion d&apos;etat
      </h3>

      <ComparisonTable modes={storeComparison} />

      <ConceptCard
        title="Recommandation pratique"
        description="Le choix de la solution de gestion d'etat depend du contexte du projet, pas d'une preference technologique."
        category="optimization"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>-- <strong>Etat serveur</strong> (donnees API) : TanStack Query, toujours. Ne pas reinventer le cache</li>
          <li>-- <strong>Etat global complexe</strong> (panier, preferences, auth) : Zustand pour son ecosysteme mature</li>
          <li>-- <strong>Etat local partage</strong> (2-3 composants voisins) : TanStack Store ou un simple useState eleve</li>
          <li>-- <strong>Etat rarement modifie</strong> (theme, locale) : React Context reste le choix le plus simple</li>
          <li>-- <strong>Librairie framework-agnostic</strong> : TanStack Store est le seul choix viable a ~2 KB</li>
        </ul>
      </ConceptCard>
    </div>
  );
}
