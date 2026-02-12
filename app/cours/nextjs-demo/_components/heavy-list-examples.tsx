'use client';

import { useState, useMemo, useCallback, memo } from 'react';
import { Search, Star } from 'lucide-react';

// Génération de données de test
interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  category: string;
}

const generateProducts = (count: number): Product[] => {
  const categories = ['Électronique', 'Vêtements', 'Maison', 'Sport', 'Livres'];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Produit ${i + 1}`,
    price: Math.floor(Math.random() * 1000) + 10,
    rating: Math.floor(Math.random() * 5) + 1,
    category: categories[Math.floor(Math.random() * categories.length)],
  }));
};

const products = generateProducts(1000);

// Composant Item SANS optimisation
function ProductItem({ product }: { product: Product }) {
  // Simule un calcul coûteux
  const expensiveCalculation = () => {
    let result = 0;
    for (let i = 0; i < 100000; i++) {
      result += Math.random();
    }
    return result;
  };

  expensiveCalculation();

  return (
    <div className="p-2 border-b border-border hover:bg-muted/50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="text-sm font-medium text-foreground">
            {product.name}
          </h4>
          <p className="text-xs text-foreground/60">{product.category}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-foreground">
            {product.price} €
          </p>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            <span className="text-xs text-foreground/70">{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant Item AVEC React.memo
const ProductItemMemo = memo(
  ({ product }: { product: Product }) => {
    const expensiveCalculation = () => {
      let result = 0;
      for (let i = 0; i < 100000; i++) {
        result += Math.random();
      }
      return result;
    };

    expensiveCalculation();

    return (
      <div className="p-2 border-b border-border hover:bg-muted/50 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h4 className="text-sm font-medium text-foreground">
              {product.name}
            </h4>
            <p className="text-xs text-foreground/60">{product.category}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">
              {product.price} €
            </p>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              <span className="text-xs text-foreground/70">
                {product.rating}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.product.id === nextProps.product.id
);

ProductItemMemo.displayName = 'ProductItemMemo';

// SCÉNARIO 1 : Sans optimisation
export function HeavyListBaseline() {
  const [search, setSearch] = useState('');

  // Filtrage SANS useMemo
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handler SANS useCallback
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 w-4 h-4 text-foreground/40" />
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Rechercher..."
          className="w-full pl-8 pr-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="h-64 overflow-y-auto border border-border rounded-lg">
        {filteredProducts.slice(0, 50).map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <p className="text-xs text-foreground/60 text-center">
        {filteredProducts.length} produits trouvés
      </p>
    </div>
  );
}

// SCÉNARIO 2 : Avec React.memo uniquement
export function HeavyListWithMemo() {
  const [search, setSearch] = useState('');

  // Filtrage SANS useMemo
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handler SANS useCallback
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 w-4 h-4 text-foreground/40" />
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Rechercher..."
          className="w-full pl-8 pr-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="h-64 overflow-y-auto border border-border rounded-lg">
        {filteredProducts.slice(0, 50).map((product) => (
          <ProductItemMemo key={product.id} product={product} />
        ))}
      </div>
      <p className="text-xs text-foreground/60 text-center">
        {filteredProducts.length} produits trouvés
      </p>
    </div>
  );
}

// SCÉNARIO 3 : Avec useMemo uniquement
export function HeavyListWithUseMemo() {
  const [search, setSearch] = useState('');

  // Filtrage AVEC useMemo
  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  // Handler SANS useCallback
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 w-4 h-4 text-foreground/40" />
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Rechercher..."
          className="w-full pl-8 pr-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="h-64 overflow-y-auto border border-border rounded-lg">
        {filteredProducts.slice(0, 50).map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <p className="text-xs text-foreground/60 text-center">
        {filteredProducts.length} produits trouvés
      </p>
    </div>
  );
}

// SCÉNARIO 4 : Tout optimisé
export function HeavyListOptimized() {
  const [search, setSearch] = useState('');

  // Filtrage AVEC useMemo
  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  // Handler AVEC useCallback
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    []
  );

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 w-4 h-4 text-foreground/40" />
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Rechercher..."
          className="w-full pl-8 pr-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="h-64 overflow-y-auto border border-border rounded-lg">
        {filteredProducts.slice(0, 50).map((product) => (
          <ProductItemMemo key={product.id} product={product} />
        ))}
      </div>
      <p className="text-xs text-foreground/60 text-center">
        {filteredProducts.length} produits trouvés
      </p>
    </div>
  );
}
