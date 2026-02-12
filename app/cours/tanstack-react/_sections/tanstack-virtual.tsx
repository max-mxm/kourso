import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function TanStackVirtualSection() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Rendre 10 000 elements dans le DOM est un chemin direct vers le blocage du thread principal.
          TanStack Virtual resout ce probleme en ne rendant que les elements visibles dans le viewport,
          tout en maintenant un defilement fluide a 60 images par seconde. La librairie ne pese que ~3 KB
          et ne fait aucune hypothese sur votre couche de rendu.
        </p>
      </div>

      <ConceptCard
        title="Quand virtualiser une liste"
        description="La virtualisation n'est pas toujours necessaire. Voici les indicateurs concrets pour prendre la decision."
        category="optimization"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>-- <strong>Plus de 100 elements</strong> : le DOM commence a peser sur les performances de scroll</li>
          <li>-- <strong>Elements complexes</strong> : chaque ligne contient des composants imbriques, des images ou des interactions</li>
          <li>-- <strong>Mesure avant tout</strong> : utiliser le React Profiler ou les Chrome DevTools Performance pour identifier si le rendu DOM est le goulot</li>
          <li>-- <strong>Mobile en priorite</strong> : les appareils mobiles sont 3 a 5 fois plus lents que les desktops pour la manipulation DOM</li>
          <li>-- <strong>Seuil pratique</strong> : si le Time to Interactive depasse 100ms apres un scroll, la virtualisation est justifiee</li>
        </ul>
      </ConceptCard>

      <h3 className="text-xl font-semibold text-foreground">
        useVirtualizer : trois modes de virtualisation
      </h3>

      <CodeBlock
        code={`import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

// -- Liste verticale (cas le plus courant)
function VirtualList({ items }: { items: string[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48, // hauteur estimee par element
    overscan: 5, // elements pre-rendus hors viewport
  });

  return (
    <div
      ref={parentRef}
      className="h-[500px] overflow-auto"
    >
      <div
        style={{
          height: \`\${virtualizer.getTotalSize()}px\`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: \`\${virtualItem.size}px\`,
              transform: \`translateY(\${virtualItem.start}px)\`,
            }}
          >
            {items[virtualItem.index]}
          </div>
        ))}
      </div>
    </div>
  );
}

// -- Liste horizontale (carousel, timeline)
function HorizontalVirtualList({ items }: { items: string[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    horizontal: true,
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200, // largeur estimee par element
    overscan: 3,
  });

  return (
    <div ref={parentRef} className="overflow-x-auto">
      <div
        style={{
          width: \`\${virtualizer.getTotalSize()}px\`,
          height: '200px',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: \`\${virtualItem.size}px\`,
              transform: \`translateX(\${virtualItem.start}px)\`,
            }}
          >
            {items[virtualItem.index]}
          </div>
        ))}
      </div>
    </div>
  );
}

// -- Grille virtualisee (galerie, dashboard)
function VirtualGrid({ items }: { items: string[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const columns = 4;

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(items.length / columns),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
    overscan: 2,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: columns,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 250,
    overscan: 1,
  });

  return (
    <div ref={parentRef} className="h-[600px] overflow-auto">
      <div
        style={{
          height: \`\${rowVirtualizer.getTotalSize()}px\`,
          width: \`\${columnVirtualizer.getTotalSize()}px\`,
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) =>
          columnVirtualizer.getVirtualItems().map((virtualCol) => {
            const index = virtualRow.index * columns + virtualCol.index;
            if (index >= items.length) return null;

            return (
              <div
                key={\`\${virtualRow.key}-\${virtualCol.key}\`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: \`\${virtualCol.size}px\`,
                  height: \`\${virtualRow.size}px\`,
                  transform: \`translateX(\${virtualCol.start}px) translateY(\${virtualRow.start}px)\`,
                }}
              >
                {items[index]}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}`}
        language="tsx"
        filename="virtual-lists.tsx"
        highlightLines={[8, 9, 10, 11, 12, 49, 50]}
        category="optimization"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Strategies de dimensionnement
      </h3>

      <CodeBlock
        code={`import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useCallback } from 'react';

// -- Taille fixe : tous les elements ont la meme hauteur
const fixedVirtualizer = useVirtualizer({
  count: 10000,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 48, // valeur exacte, pas d'estimation
});

// -- Taille variable : hauteur connue a l'avance par element
const variableVirtualizer = useVirtualizer({
  count: messages.length,
  getScrollElement: () => parentRef.current,
  estimateSize: (index) => {
    // Hauteur differente selon le type de message
    const message = messages[index];
    if (message.type === 'image') return 300;
    if (message.type === 'code') return 200;
    return 64; // message texte standard
  },
});

// -- Taille dynamique mesuree : hauteur inconnue, mesuree au rendu
function DynamicSizeList({ items }: { items: ChatMessage[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80, // estimation initiale
    measureElement: (element) => {
      // Mesure reelle du DOM apres le rendu
      return element.getBoundingClientRect().height;
    },
  });

  return (
    <div ref={parentRef} className="h-[600px] overflow-auto">
      <div
        style={{
          height: \`\${virtualizer.getTotalSize()}px\`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            data-index={virtualItem.index}
            ref={virtualizer.measureElement}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: \`translateY(\${virtualItem.start}px)\`,
            }}
          >
            <ChatBubble message={items[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}`}
        language="tsx"
        filename="sizing-strategies.tsx"
        highlightLines={[6, 15, 16, 17, 33, 34, 35, 36, 51]}
        category="optimization"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Integration avec TanStack Table
      </h3>

      <CodeBlock
        code={`import { useVirtualizer } from '@tanstack/react-virtual';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';
import { useRef } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  lastActive: Date;
}

const columns: ColumnDef<User>[] = [
  { accessorKey: 'name', header: 'Nom' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
  {
    accessorKey: 'lastActive',
    header: 'Derniere activite',
    cell: ({ getValue }) =>
      new Intl.DateTimeFormat('fr-FR').format(getValue<Date>()),
  },
];

function VirtualizedTable({ data }: { data: User[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { rows } = table.getRowModel();

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 52,
    overscan: 10,
  });

  return (
    <div ref={parentRef} className="h-[600px] overflow-auto rounded-lg border">
      <table className="w-full">
        <thead className="sticky top-0 bg-background z-10 border-b">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-muted/50"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          <tr>
            <td
              colSpan={columns.length}
              style={{ height: \`\${virtualizer.getTotalSize()}px\`, position: 'relative' }}
            >
              {virtualizer.getVirtualItems().map((virtualRow) => {
                const row = rows[virtualRow.index];
                return (
                  <tr
                    key={row.id}
                    className="absolute w-full flex border-b hover:bg-muted/30"
                    style={{
                      height: \`\${virtualRow.size}px\`,
                      transform: \`translateY(\${virtualRow.start}px)\`,
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-sm flex-1">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// Utilisation : <VirtualizedTable data={tenThousandUsers} />`}
        language="tsx"
        filename="virtualized-table.tsx"
        highlightLines={[43, 44, 45, 46, 47]}
        category="optimization"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Exemple complet : 10 000 elements
      </h3>

      <CodeBlock
        code={`'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useMemo } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

// Generation de 10 000 produits pour la demonstration
function generateProducts(count: number): Product[] {
  const categories = ['Electronique', 'Vetements', 'Maison', 'Sport', 'Alimentation'];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: \`Produit \${(i + 1).toString().padStart(5, '0')}\`,
    price: Math.round(Math.random() * 500 * 100) / 100,
    category: categories[i % categories.length],
    inStock: Math.random() > 0.2,
  }));
}

export function ProductCatalog() {
  const parentRef = useRef<HTMLDivElement>(null);
  const products = useMemo(() => generateProducts(10_000), []);

  const virtualizer = useVirtualizer({
    count: products.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
    overscan: 8,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Catalogue : {products.length.toLocaleString('fr-FR')} produits
        </h2>
        <span className="text-sm text-muted-foreground">
          {virtualizer.getVirtualItems().length} elements rendus dans le DOM
        </span>
      </div>

      <div
        ref={parentRef}
        className="h-[500px] overflow-auto rounded-xl border border-border/50"
      >
        <div
          style={{
            height: \`\${virtualizer.getTotalSize()}px\`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const product = products[virtualItem.index];
            return (
              <div
                key={virtualItem.key}
                className="absolute top-0 left-0 w-full px-4 py-3 border-b border-border/30 flex items-center justify-between hover:bg-muted/30 transition-colors"
                style={{
                  height: \`\${virtualItem.size}px\`,
                  transform: \`translateY(\${virtualItem.start}px)\`,
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground font-mono w-12">
                    #{product.id}
                  </span>
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-sm">
                    {product.price.toFixed(2)} EUR
                  </span>
                  <span
                    className={\`text-xs px-2 py-0.5 rounded-full \${
                      product.inStock
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }\`}
                  >
                    {product.inStock ? 'En stock' : 'Rupture'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}`}
        language="tsx"
        filename="product-catalog-virtual.tsx"
        highlightLines={[29, 30, 31, 32, 33, 34, 35]}
        category="optimization"
      />

      <ConceptCard
        title="Points de vigilance en production"
        description="La virtualisation introduit des contraintes specifiques a prendre en compte avant la mise en production."
        category="optimization"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>-- <strong>Accessibilite</strong> : les lecteurs d&apos;ecran ne voient que les elements rendus. Ajouter aria-rowcount et aria-rowindex pour les tableaux</li>
          <li>-- <strong>Recherche navigateur</strong> : Ctrl+F ne trouve pas les elements hors viewport. Prevoir un champ de recherche applicatif</li>
          <li>-- <strong>SEO</strong> : le contenu virtualise n&apos;est pas indexable. Pour le contenu public, preferer la pagination serveur</li>
          <li>-- <strong>Scroll restoration</strong> : utiliser virtualizer.scrollToIndex() pour restaurer la position apres navigation</li>
          <li>-- <strong>Overscan</strong> : ajuster la valeur selon la vitesse de scroll. 5-10 elements est un bon point de depart</li>
        </ul>
      </ConceptCard>
    </div>
  );
}
