'use client';

import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { Check, X } from 'lucide-react';

export function CompositionSection() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Les patterns de composition permettent de créer des composants flexibles et maintenables
          en évitant les props booléens prolifiques. Inspirés des recommandations officielles de Vercel,
          ces patterns favorisent la composition over configuration.
        </p>
      </div>

      {/* Éviter les boolean props */}
      <ConceptCard
        title="Éviter les Boolean Props"
        description="Les props booléens créent une prolifération de configurations et rendent les composants difficiles à maintenir. Préférer la composition."
        category="best-practices"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <div className="flex items-start gap-2 mb-2">
                <X className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <h5 className="font-bold text-red-600 dark:text-red-400">Problème</h5>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Explosion combinatoire des props booléens
              </p>
              <div className="text-xs font-mono space-y-1 text-muted-foreground">
                <div>showHeader: boolean</div>
                <div>showFooter: boolean</div>
                <div>showSidebar: boolean</div>
                <div>showCloseButton: boolean</div>
                <div className="text-red-600 dark:text-red-400 mt-2">
                  = 16 combinaisons possibles
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <div className="flex items-start gap-2 mb-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <h5 className="font-bold text-green-600 dark:text-green-400">Solution</h5>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Composition avec children et slots
              </p>
              <div className="text-xs font-mono space-y-1 text-muted-foreground">
                <div>Modal.Header</div>
                <div>Modal.Body</div>
                <div>Modal.Footer</div>
                <div>Modal.CloseButton</div>
                <div className="text-green-600 dark:text-green-400 mt-2">
                  = Flexibilité infinie
                </div>
              </div>
            </div>
          </div>

          <CodeBlock
            code={`// ❌ ANTI-PATTERN : Boolean props proliferation
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  showHeader?: boolean;
  showFooter?: boolean;
  showCloseButton?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'danger';
  centered?: boolean;
  fullScreen?: boolean;
  children: React.ReactNode;
}

function Modal({
  isOpen,
  onClose,
  showHeader = true,
  showFooter = false,
  showCloseButton = true,
  size = 'medium',
  variant = 'primary',
  centered = false,
  fullScreen = false,
  children
}: ModalProps) {
  // Logique complexe avec 10+ props booléens
  // Difficile à tester, maintenir et étendre

  return (
    <div className={cn(
      'modal',
      size === 'small' && 'modal-small',
      size === 'medium' && 'modal-medium',
      size === 'large' && 'modal-large',
      centered && 'modal-centered',
      fullScreen && 'modal-fullscreen'
    )}>
      {showHeader && <div className="modal-header">...</div>}
      <div className="modal-body">{children}</div>
      {showFooter && <div className="modal-footer">...</div>}
      {showCloseButton && <button onClick={onClose}>×</button>}
    </div>
  );
}

// Utilisation : Props booléens complexes
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  showHeader={true}
  showFooter={true}
  showCloseButton={false}
  size="large"
  variant="primary"
  centered={true}
>
  Content
</Modal>`}
            language="tsx"
            filename="components/modal.tsx"
            highlightLines={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 27, 28, 30, 31, 32, 33, 34, 35, 36, 38, 39, 40]}
            category="best-practices"
          />

          <CodeBlock
            code={`// ✅ SOLUTION : Composition avec Compound Components
import { createContext, useContext } from 'react';

const ModalContext = createContext<{
  isOpen: boolean;
  onClose: () => void;
} | null>(null);

function Modal({ isOpen, onClose, children }: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <ModalContext.Provider value={{ isOpen, onClose }}>
      <div className="modal-overlay">
        <div className="modal-container">
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
}

function ModalHeader({ children }: { children: React.ReactNode }) {
  return <div className="modal-header">{children}</div>;
}

function ModalBody({ children }: { children: React.ReactNode }) {
  return <div className="modal-body">{children}</div>;
}

function ModalFooter({ children }: { children: React.ReactNode }) {
  return <div className="modal-footer">{children}</div>;
}

function ModalCloseButton() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('ModalCloseButton must be inside Modal');

  return (
    <button onClick={context.onClose} className="modal-close">
      ×
    </button>
  );
}

// Export comme namespace
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.CloseButton = ModalCloseButton;

export { Modal };

// Utilisation : Composition déclarative et flexible
<Modal isOpen={isOpen} onClose={handleClose}>
  <Modal.Header>
    <h2>Titre</h2>
    <Modal.CloseButton />
  </Modal.Header>

  <Modal.Body>
    <p>Contenu du modal</p>
  </Modal.Body>

  <Modal.Footer>
    <button onClick={handleClose}>Annuler</button>
    <button onClick={handleSave}>Enregistrer</button>
  </Modal.Footer>
</Modal>

// Variante sans header :
<Modal isOpen={isOpen} onClose={handleClose}>
  <Modal.Body>
    <p>Contenu simple</p>
  </Modal.Body>
</Modal>

// Variante avec seulement un CloseButton :
<Modal isOpen={isOpen} onClose={handleClose}>
  <Modal.CloseButton />
  <Modal.Body>
    <p>Contenu avec close button</p>
  </Modal.Body>
</Modal>

// Avantages :
// ✅ Flexibilité totale (composer comme souhaité)
// ✅ Pas de props booléens
// ✅ API déclarative et lisible
// ✅ Facile à tester et maintenir`}
            language="tsx"
            filename="components/modal.tsx"
            highlightLines={[2, 9, 10, 11, 12, 13, 17, 18, 19, 20, 21, 52, 53, 54, 55, 59, 60, 61, 62, 63, 65, 66, 67, 68, 70, 71, 72, 73, 74, 75, 78, 79, 80, 81, 82, 85, 86, 87, 88, 89, 90, 93, 94, 95, 96]}
            category="best-practices"
          />
        </div>
      </ConceptCard>

      {/* Compound Components Pattern */}
      <ConceptCard
        title="Compound Components : API Déclarative"
        description="Structure avec contexte partagé pour créer des composants liés (Tabs, Accordion, Select). Pattern inspiré de Radix UI et Shadcn."
        category="best-practices"
      >
        <CodeBlock
          code={`// ✅ Pattern : Compound Components (exemple Tabs)
import { createContext, useContext, useState } from 'react';

const TabsContext = createContext<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
} | null>(null);

function Tabs({ children, defaultTab }: {
  children: React.ReactNode;
  defaultTab: string;
}) {
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

function TabsTrigger({ value, children }: {
  value: string;
  children: React.ReactNode;
}) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be inside Tabs');

  const { activeTab, setActiveTab } = context;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={activeTab === value ? 'active' : ''}
      role="tab"
      aria-selected={activeTab === value}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, children }: {
  value: string;
  children: React.ReactNode;
}) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be inside Tabs');

  if (context.activeTab !== value) return null;

  return (
    <div className="tabs-content" role="tabpanel">
      {children}
    </div>
  );
}

// Export comme namespace
Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

export { Tabs };

// Utilisation : API déclarative
<Tabs defaultTab="account">
  <Tabs.List>
    <Tabs.Trigger value="account">Compte</Tabs.Trigger>
    <Tabs.Trigger value="password">Mot de passe</Tabs.Trigger>
    <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
  </Tabs.List>

  <Tabs.Content value="account">
    <h2>Paramètres du compte</h2>
    <p>Gérez vos informations personnelles</p>
  </Tabs.Content>

  <Tabs.Content value="password">
    <h2>Sécurité</h2>
    <p>Changez votre mot de passe</p>
  </Tabs.Content>

  <Tabs.Content value="notifications">
    <h2>Notifications</h2>
    <p>Gérez vos préférences de notifications</p>
  </Tabs.Content>
</Tabs>

// Avantages :
// ✅ État partagé via Context (activeTab)
// ✅ API déclarative et self-documenting
// ✅ Type-safe avec TypeScript
// ✅ Accessible (ARIA attributes)
// ✅ Extensible (facile d'ajouter Tabs.Icon, etc.)`}
          language="tsx"
          filename="components/tabs.tsx"
          highlightLines={[4, 5, 6, 9, 10, 11, 14, 16, 17, 18, 30, 33, 36, 37, 38, 39, 40, 50, 53, 56, 57, 58, 63, 64, 65, 70, 71, 72, 73, 74, 75, 97, 98, 99, 100, 101]}
          category="best-practices"
        />
      </ConceptCard>

      {/* Children over Render Props */}
      <ConceptCard
        title="Children Over Render Props"
        description="Privilégier children pour la composition au lieu des render props (renderHeader, renderFooter). Plus simple et idiomatique en React."
        category="best-practices"
      >
        <div className="space-y-6">
          <CodeBlock
            code={`// ❌ ÉVITER : Render Props proliferation
interface CardProps {
  renderHeader?: () => React.ReactNode;
  renderBody: () => React.ReactNode;
  renderFooter?: () => React.ReactNode;
  renderActions?: () => React.ReactNode;
}

function Card({ renderHeader, renderBody, renderFooter, renderActions }: CardProps) {
  return (
    <div className="card">
      {renderHeader && <div className="card-header">{renderHeader()}</div>}
      <div className="card-body">{renderBody()}</div>
      {renderFooter && <div className="card-footer">{renderFooter()}</div>}
      {renderActions && <div className="card-actions">{renderActions()}</div>}
    </div>
  );
}

// Utilisation : Verbose et peu lisible
<Card
  renderHeader={() => <h2>Titre</h2>}
  renderBody={() => <p>Contenu</p>}
  renderFooter={() => <button>Action</button>}
/>`}
            language="tsx"
            filename="components/card.tsx"
            highlightLines={[2, 3, 4, 5, 6, 12, 13, 14, 15, 21, 22, 23, 24]}
            category="best-practices"
          />

          <CodeBlock
            code={`// ✅ PRÉFÉRER : Children pour composition
function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}

function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="card-header">{children}</div>;
}

function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="card-body">{children}</div>;
}

function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className="card-footer">{children}</div>;
}

// Export namespace
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export { Card };

// Utilisation : Simple et déclaratif
<Card>
  <Card.Header>
    <h2>Titre</h2>
  </Card.Header>

  <Card.Body>
    <p>Contenu de la carte</p>
  </Card.Body>

  <Card.Footer>
    <button>Action</button>
  </Card.Footer>
</Card>

// Variante : Composition flexible
<Card>
  <Card.Body>
    <p>Carte simple sans header ni footer</p>
  </Card.Body>
</Card>

// Avantages :
// ✅ Plus lisible (pas de fonctions imbriquées)
// ✅ Type-safe automatiquement
// ✅ Permet composition libre
// ✅ Idiomatique React`}
            language="tsx"
            filename="components/card.tsx"
            highlightLines={[2, 3, 6, 7, 10, 11, 14, 15, 19, 20, 21, 26, 27, 28, 29, 31, 32, 33, 35, 36, 37, 38, 41, 42, 43, 44, 45, 48, 49, 50, 51]}
            category="best-practices"
          />
        </div>
      </ConceptCard>

      {/* State-Context-Interface Pattern */}
      <ConceptCard
        title="State-Context-Interface : Dependency Injection"
        description="Séparer l'état (state), le contexte (context) et l'interface (composants) pour créer des APIs génériques et testables."
        category="best-practices"
      >
        <CodeBlock
          code={`// ✅ Pattern : State-Context-Interface
// 1. STATE : Logique métier (réutilisable et testable)
import { useState } from 'react';

export function useAccordionState(defaultOpen?: string) {
  const [openItem, setOpenItem] = useState<string | null>(defaultOpen ?? null);

  const toggle = (item: string) => {
    setOpenItem((current) => (current === item ? null : item));
  };

  const isOpen = (item: string) => openItem === item;

  return { openItem, toggle, isOpen };
}

// 2. CONTEXT : Partage de l'état (dependency injection)
import { createContext, useContext } from 'react';

type AccordionContextValue = ReturnType<typeof useAccordionState>;

const AccordionContext = createContext<AccordionContextValue | null>(null);

export function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be inside Accordion');
  }
  return context;
}

// 3. INTERFACE : Composants UI (consomment le contexte)
function Accordion({ children, defaultOpen }: {
  children: React.ReactNode;
  defaultOpen?: string;
}) {
  const state = useAccordionState(defaultOpen);

  return (
    <AccordionContext.Provider value={state}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ value, children }: {
  value: string;
  children: React.ReactNode;
}) {
  return <div className="accordion-item">{children}</div>;
}

function AccordionTrigger({ value, children }: {
  value: string;
  children: React.ReactNode;
}) {
  const { toggle, isOpen } = useAccordionContext();

  return (
    <button
      onClick={() => toggle(value)}
      className={isOpen(value) ? 'open' : 'closed'}
    >
      {children}
    </button>
  );
}

function AccordionContent({ value, children }: {
  value: string;
  children: React.ReactNode;
}) {
  const { isOpen } = useAccordionContext();

  if (!isOpen(value)) return null;

  return <div className="accordion-content">{children}</div>;
}

// Export
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

export { Accordion };

// Utilisation :
<Accordion defaultOpen="item-1">
  <Accordion.Item value="item-1">
    <Accordion.Trigger value="item-1">
      Question 1
    </Accordion.Trigger>
    <Accordion.Content value="item-1">
      Réponse 1
    </Accordion.Content>
  </Accordion.Item>

  <Accordion.Item value="item-2">
    <Accordion.Trigger value="item-2">
      Question 2
    </Accordion.Trigger>
    <Accordion.Content value="item-2">
      Réponse 2
    </Accordion.Content>
  </Accordion.Item>
</Accordion>

// Avantages :
// ✅ État testable indépendamment (useAccordionState)
// ✅ Context pour dependency injection
// ✅ Composants UI découplés de la logique
// ✅ Réutilisable (ex: useAccordionState dans autre UI)`}
          language="tsx"
          filename="components/accordion.tsx"
          highlightLines={[2, 5, 6, 8, 9, 10, 12, 14, 18, 20, 22, 24, 25, 26, 27, 28, 29, 33, 34, 35, 36, 38, 40, 41, 42, 43, 56, 58, 59, 60, 61, 62, 71, 73, 75, 113, 114, 115, 116, 117]}
          category="best-practices"
          />
      </ConceptCard>

      {/* Lift State Pattern */}
      <ConceptCard
        title="Lift State : Partage entre Siblings"
        description="Déplacer l'état dans un provider parent pour permettre aux composants frères (siblings) d'y accéder sans prop drilling."
        category="best-practices"
      >
        <div className="space-y-6">
          <CodeBlock
            code={`// ❌ PROBLÈME : Siblings ne peuvent pas partager l'état
function ParentComponent() {
  return (
    <div>
      <ComponentA /> {/* A l'état du panier */}
      <ComponentB /> {/* B veut accéder au panier */}
    </div>
  );
}

// ComponentA gère son état local
function ComponentA() {
  const [cart, setCart] = useState<Item[]>([]);

  const addItem = (item: Item) => {
    setCart([...cart, item]);
  };

  return <ProductList onAddItem={addItem} />;
}

// ComponentB ne peut pas accéder au panier de A
function ComponentB() {
  // Comment afficher le nombre d'items dans le panier ?
  return <CartButton itemCount={???} />;
}`}
            language="tsx"
            filename="components/parent.tsx"
            highlightLines={[5, 6, 12, 13, 23, 25]}
            category="best-practices"
          />

          <CodeBlock
            code={`// ✅ SOLUTION : Lift State dans un Provider
import { createContext, useContext, useState } from 'react';

type CartContextValue = {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (item: Item) => {
    setItems((prev) => [...prev, item]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const itemCount = items.length;

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be inside CartProvider');
  }
  return context;
}

// Utilisation : Wrapping parent
function ParentComponent() {
  return (
    <CartProvider>
      <ComponentA />
      <ComponentB />
    </CartProvider>
  );
}

// ComponentA : Ajoute au panier
function ComponentA() {
  const { addItem } = useCart(); // ✅ Accès au context

  return <ProductList onAddItem={addItem} />;
}

// ComponentB : Affiche le nombre d'items
function ComponentB() {
  const { itemCount } = useCart(); // ✅ Accès au context

  return <CartButton itemCount={itemCount} />;
}

// Avantages :
// ✅ État partagé entre siblings
// ✅ Pas de prop drilling
// ✅ Re-render sélectif (itemCount vs items)
// ✅ Testable (mock CartProvider)`}
            language="tsx"
            filename="components/cart-provider.tsx"
            highlightLines={[4, 5, 6, 7, 8, 11, 13, 14, 16, 17, 18, 20, 21, 22, 24, 26, 27, 28, 29, 33, 34, 35, 36, 37, 38, 43, 44, 45, 46, 47, 48, 52, 53, 58, 59, 64, 65, 66, 67]}
            category="best-practices"
          />
        </div>
      </ConceptCard>

      {/* Récapitulatif */}
      <ConceptCard
        title="Récapitulatif : Choisir le Bon Pattern"
        description="Guide de décision pour choisir le pattern de composition adapté à votre cas d'usage."
        category="best-practices"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-foreground mb-2">
                  Compound Components
                </h5>
                <p className="text-sm text-muted-foreground">
                  Pour composants avec état partagé (Tabs, Accordion, Select, Dropdown).
                  Les sous-composants doivent communiquer entre eux.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-foreground mb-2">
                  Children Composition
                </h5>
                <p className="text-sm text-muted-foreground">
                  Pour layouts simples sans état partagé (Card, Modal, Panel).
                  Composition libre sans logique complexe.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-foreground mb-2">
                  State-Context-Interface
                </h5>
                <p className="text-sm text-muted-foreground">
                  Pour composants complexes avec logique métier réutilisable.
                  Séparer état (testable) et interface (UI).
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-foreground mb-2">
                  Lift State (Provider)
                </h5>
                <p className="text-sm text-muted-foreground">
                  Pour partager état entre siblings ou composants distants.
                  Éviter prop drilling tout en gardant l'état accessible.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-red-500/5 border border-red-500/20">
          <h5 className="font-bold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
            <X className="w-5 h-5" />
            À Éviter
          </h5>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
              <span>Props booléens multiples (showX, hasY, isZ)</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
              <span>Render props excessifs (renderX pour chaque slot)</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
              <span>Prop drilling sur plus de 2 niveaux</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
              <span>Logique métier mélangée avec UI dans le composant</span>
            </li>
          </ul>
        </div>
      </ConceptCard>
    </div>
  );
}
