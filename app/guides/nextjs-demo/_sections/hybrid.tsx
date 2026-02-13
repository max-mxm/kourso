import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { Check } from 'lucide-react';

export default function HybridSection() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="space-y-4">
        <p className="text-lg text-foreground/90 leading-relaxed">
          Le mode <strong>Hybrid</strong> combine Server Components (SSR) et Client Components (CSR) dans la même page.
          Next.js 13+ permet de mixer stratégiquement les deux approches pour optimiser performance et interactivité.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Par défaut, tous les composants sont des Server Components. Seuls ceux marqués avec{' '}
          <code className="text-xs bg-muted px-1 py-0.5 rounded">'use client'</code> deviennent des Client Components.
        </p>
      </div>

      {/* Analogie du gâteau */}
      <ConceptCard
        title="Analogie : Le gâteau décoré"
        description="Imaginez un gâteau préparé en cuisine (serveur) et livré déjà cuit. Le client reçoit le gâteau prêt à manger, mais peut ajouter du glaçage ou des décorations sur place. La base est servie toute faite, seules les finitions sont appliquées côté client."
        category="rendering"
      >
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
            <span>Base du gâteau = Server Components (HTML pré-rendu)</span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
            <span>Glaçage = Client Components (interactivité JS)</span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
            <span>Résultat = Page complète optimisée</span>
          </div>
        </div>
      </ConceptCard>

      {/* Règle d'or */}
      <div className="p-6 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
        <h3 className="text-lg font-bold text-foreground mb-3">Règle d'or du mode Hybrid</h3>
        <p className="text-foreground/90 leading-relaxed">
          <strong>Maximum en Server Components, minimum en Client Components.</strong> Gardez le plus de logique possible côté serveur.
          Isolez uniquement les parties qui nécessitent de l'interactivité (événements, state, hooks React).
        </p>
      </div>

      {/* Pattern recommandé */}
      <ConceptCard
        title="Pattern recommandé : Server Component parent"
        description="Structurez votre application avec des Server Components en racine et des Client Components isolés pour les interactions."
        category="rendering"
      />

      <CodeBlock
        code={`// app/products/page.tsx (Server Component par défaut)
import { ProductList } from './product-list';
import { AddToCartButton } from './add-to-cart-button';

export default async function ProductsPage() {
  // Fetch côté serveur - données disponibles immédiatement
  const products = await fetch('https://api.example.com/products').then(r => r.json());

  return (
    <div>
      <h1>Nos produits</h1>
      {/* Server Component - rendu HTML statique */}
      <ProductList products={products} />
    </div>
  );
}

// app/products/product-list.tsx (Server Component)
import { AddToCartButton } from './add-to-cart-button';

export function ProductList({ products }: { products: Product[] }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.price} €</p>
          {/* Client Component isolé - seulement pour l'interactivité */}
          <AddToCartButton productId={product.id} />
        </li>
      ))}
    </ul>
  );
}

// app/products/add-to-cart-button.tsx (Client Component)
'use client';

import { useState } from 'react';

export function AddToCartButton({ productId }: { productId: number }) {
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    // Logique interactive côté client
    setAdded(true);
    // ... appel API pour ajouter au panier
  };

  return (
    <button onClick={handleClick}>
      {added ? 'Ajouté !' : 'Ajouter au panier'}
    </button>
  );
}`}
        language="tsx"
        filename="app/products/page.tsx"
        highlightLines={[1, 2, 18, 32, 36]}
        category="rendering"
      />

      {/* suppressHydrationWarning */}
      <ConceptCard
        title="Gérer les mismatches avec suppressHydrationWarning"
        description="Lorsque vous avez un contenu intentionnellement différent entre serveur et client (comme une date ou un thème), utilisez suppressHydrationWarning pour éviter les avertissements React."
        category="rendering"
      />

      <CodeBlock
        code={`'use client';

export function CurrentTime() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Supprime l'avertissement car le contenu serveur/client est volontairement différent
  return <div suppressHydrationWarning>{time}</div>;
}`}
        language="tsx"
        filename="components/current-time.tsx"
        highlightLines={[14]}
        category="rendering"
      />

      {/* Optimisation du bundle */}
      <ConceptCard
        title="Optimiser la taille du bundle JavaScript"
        description="Placer la frontière 'use client' au plus bas niveau possible réduit la quantité de JavaScript envoyée au navigateur."
        category="rendering"
      >
        <div className="space-y-4 text-sm">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="font-medium text-red-500 mb-2">Mauvaise pratique</div>
            <div className="text-muted-foreground">
              Marquer tout le layout avec <code className="text-xs bg-muted px-1 py-0.5 rounded">'use client'</code> force
              l'envoi de tout le code au client, même les parties statiques.
            </div>
          </div>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="font-medium text-green-500 mb-2">Bonne pratique</div>
            <div className="text-muted-foreground">
              Isoler uniquement le bouton interactif avec <code className="text-xs bg-muted px-1 py-0.5 rounded">'use client'</code>.
              Le reste du layout reste en Server Component (HTML pur, 0 JS).
            </div>
          </div>
        </div>
      </ConceptCard>

      <CodeBlock
        code={`// ❌ Mauvais : Tout le layout devient client
'use client';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <Header />
      <button onClick={() => setMenuOpen(!menuOpen)}>Menu</button>
      {children}
      <Footer />
    </div>
  );
}

// ✅ Bon : Seul le bouton menu est client
import { MenuButton } from './menu-button';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <MenuButton /> {/* Composant client isolé */}
      {children}
      <Footer />
    </div>
  );
}

// menu-button.tsx
'use client';
export function MenuButton() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <button onClick={() => setMenuOpen(!menuOpen)}>Menu</button>;
}`}
        language="tsx"
        filename="app/layout.tsx"
        highlightLines={[2, 18, 32]}
        category="rendering"
      />

      {/* Quand utiliser */}
      <ConceptCard
        title="Quand utiliser le mode Hybrid ?"
        description="Le mode Hybrid est la solution par défaut pour la plupart des applications Next.js modernes."
        category="rendering"
      >
        <div className="space-y-3 text-sm">
          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="font-medium text-foreground mb-2">Cas d'usage idéaux</div>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                <span><strong>Layout + Header/Footer</strong> - Parties statiques en Server, navigation interactive en Client</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                <span><strong>Blog avec commentaires</strong> - Articles en SSG, section commentaires en Client</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                <span><strong>E-commerce</strong> - Liste produits en SSR, panier et filtres en Client</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                <span><strong>Dashboard avec widgets</strong> - Layout en Server, graphiques interactifs en Client</span>
              </li>
            </ul>
          </div>
        </div>
      </ConceptCard>

      {/* Pièges à éviter */}
      <div className="border-2 border-red-500/30 rounded-lg p-6 bg-red-500/5">
        <h3 className="text-lg font-bold text-red-500 mb-4">Pièges à éviter avec Hybrid</h3>
        <div className="space-y-4 text-sm">
          <div className="space-y-2">
            <div className="font-medium text-foreground">1. 'use client' trop haut dans l'arbre</div>
            <div className="text-muted-foreground">
              Placer <code className="text-xs bg-muted px-1 py-0.5 rounded">'use client'</code> sur un composant parent force
              tous ses enfants à devenir des Client Components, même s'ils n'ont pas besoin d'interactivité. Descendez la frontière
              au plus bas niveau possible.
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-foreground">2. Passer des fonctions Server → Client</div>
            <div className="text-muted-foreground">
              Vous ne pouvez pas passer de fonctions depuis un Server Component vers un Client Component comme props.
              Les fonctions ne sont pas sérialisables. Utilisez Server Actions à la place.
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-foreground">3. Variables d'environnement privées exposées</div>
            <div className="text-muted-foreground">
              Les variables d'environnement utilisées dans des Client Components sont exposées au navigateur.
              Ne mettez jamais de secrets (clés API privées, tokens) dans des composants marqués <code className="text-xs bg-muted px-1 py-0.5 rounded">'use client'</code>.
              Utilisez Route Handlers ou Server Actions pour les appels sécurisés.
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-foreground">4. Oublier les limites de serialization</div>
            <div className="text-muted-foreground">
              Seuls les types sérialisables (JSON) peuvent transiter entre Server et Client Components : string, number, boolean, array, object.
              Les classes, fonctions, Date, Map, Set ne sont pas supportés directement.
            </div>
          </div>
        </div>
      </div>

      {/* Résumé visuel */}
      <ConceptCard
        title="Résumé : Quand utiliser quoi ?"
        description="Choisissez la bonne stratégie selon vos besoins."
        category="rendering"
      >
        <div className="space-y-3 text-sm">
          <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
            <div className="font-medium text-foreground mb-1">Server Component</div>
            <div className="text-muted-foreground text-xs">
              Contenu statique, fetch de données, SEO, zéro JavaScript envoyé au client
            </div>
          </div>
          <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
            <div className="font-medium text-foreground mb-1">Client Component</div>
            <div className="text-muted-foreground text-xs">
              Événements (onClick, onChange), hooks (useState, useEffect), interactivité, animations
            </div>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="font-medium text-blue-500 mb-1">Hybrid (recommandé)</div>
            <div className="text-muted-foreground text-xs">
              Combiner les deux : Server Components pour la structure, Client Components isolés pour l'interaction
            </div>
          </div>
        </div>
      </ConceptCard>
    </div>
  );
}
