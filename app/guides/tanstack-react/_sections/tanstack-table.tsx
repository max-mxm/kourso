import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';

export default function TanStackTableSection() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          TanStack Table est une librairie headless pour construire des tableaux et datagrids puissants.
          Headless signifie qu&apos;elle gere toute la logique (tri, filtrage, pagination, selection, groupement)
          mais ne rend aucun markup HTML. Vous gardez le controle total du rendu, du style et de l&apos;accessibilite.
          C&apos;est la librairie de tableaux la plus telechargee de l&apos;ecosysteme React avec plus de 3 millions
          de telechargements hebdomadaires.
        </p>
      </div>

      <ConceptCard
        title="Philosophie headless"
        description="Comprendre ce que signifie headless et pourquoi c'est un avantage determinant pour les projets en production."
        category="optimization"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>-- <strong>Zero markup impose</strong> : vous utilisez vos propres composants (div, table, ou meme canvas)</li>
          <li>-- <strong>Zero CSS impose</strong> : compatible Tailwind, CSS Modules, styled-components, ou n&apos;importe quel systeme</li>
          <li>-- <strong>Logique pure</strong> : le core ne depend pas de React. Des adaptateurs existent pour Vue, Solid, Svelte, Lit</li>
          <li>-- <strong>Tree-shakable</strong> : n&apos;importez que les fonctionnalites utilisees (sorting, filtering, pagination...)</li>
          <li>-- <strong>TypeScript first</strong> : generics sur les donnees, colonnes et cellules entierement types</li>
        </ul>
      </ConceptCard>

      <h3 className="text-xl font-semibold text-foreground">
        Installation et configuration de base
      </h3>

      <CodeBlock
        code={`import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: Date;
}

// 1. Definir les colonnes avec typage complet
const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Nom',
    cell: (info) => (
      <span className="font-medium">{info.getValue<string>()}</span>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: (info) => {
      const role = info.getValue<string>();
      const colors: Record<string, string> = {
        admin: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        editor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        viewer: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
      };
      return (
        <span className={\`text-xs px-2 py-1 rounded-full \${colors[role]}\`}>
          {role}
        </span>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Inscription',
    cell: (info) =>
      new Intl.DateTimeFormat('fr-FR').format(info.getValue<Date>()),
  },
];

// 2. Creer et utiliser la table
function BasicTable({ data }: { data: User[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full border-collapse">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="border-b">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="px-4 py-3 text-left text-sm font-semibold"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-b hover:bg-muted/30">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="px-4 py-3 text-sm">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}`}
        language="tsx"
        filename="basic-table.tsx"
        highlightLines={[17, 56, 57, 58, 59]}
        category="optimization"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Tri multi-colonnes
      </h3>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-foreground/80 leading-relaxed">
          Le tri est la fonctionnalite la plus demandee sur les tableaux. TanStack Table gere
          nativement le tri sur une ou plusieurs colonnes, avec un controle total sur l&apos;algorithme
          de comparaison et l&apos;indicateur visuel.
        </p>
      </div>

      <CodeBlock
        code={`import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
} from '@tanstack/react-table';
import { useState } from 'react';

function SortableTable({ data, columns }: TableProps) {
  // State du tri : gere par React, lu par TanStack Table
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // Options de tri
    enableMultiSort: true,        // Shift+clic pour trier sur plusieurs colonnes
    enableSortingRemoval: true,   // 3eme clic retire le tri
    maxMultiSortColCount: 3,      // Maximum 3 colonnes de tri simultanees
  });

  // Dans le header :
  // <th onClick={header.column.getToggleSortingHandler()}>
  //   {header.column.columnDef.header}
  //   {{ asc: ' ↑', desc: ' ↓' }[header.column.getIsSorted() as string] ?? ''}
  // </th>

  // Tri personnalise par colonne :
  const customColumns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: 'Nom',
      sortingFn: 'text',           // Tri alphabetique natif
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      sortingFn: 'datetime',       // Tri chronologique natif
    },
    {
      accessorKey: 'priority',
      header: 'Priorite',
      // Tri personnalise : haute > moyenne > basse
      sortingFn: (rowA, rowB, columnId) => {
        const order = { haute: 3, moyenne: 2, basse: 1 };
        const a = order[rowA.getValue<string>(columnId) as keyof typeof order];
        const b = order[rowB.getValue<string>(columnId) as keyof typeof order];
        return a - b;
      },
    },
  ];

  return table;
}`}
        language="tsx"
        filename="sorting.tsx"
        highlightLines={[11, 16, 17, 21, 22, 23, 48, 49, 50, 51]}
        category="optimization"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Filtrage global et par colonne
      </h3>

      <CodeBlock
        code={`import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import { useState } from 'react';

function FilterableTable({ data, columns }: TableProps) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // Filtre global : cherche dans toutes les colonnes
    globalFilterFn: 'includesString',
  });

  return (
    <div className="space-y-4">
      {/* Recherche globale */}
      <input
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Rechercher dans toutes les colonnes..."
        className="w-full px-4 py-2 border rounded-lg"
      />

      {/* Filtres par colonne */}
      <div className="flex gap-2">
        {table.getHeaderGroups()[0].headers.map((header) => (
          <input
            key={header.id}
            value={(header.column.getFilterValue() as string) ?? ''}
            onChange={(e) => header.column.setFilterValue(e.target.value)}
            placeholder={\`Filtrer \${header.column.columnDef.header}...\`}
            className="px-3 py-1 text-sm border rounded"
          />
        ))}
      </div>

      {/* Indicateur de resultats */}
      <p className="text-sm text-muted-foreground">
        {table.getFilteredRowModel().rows.length} resultat(s)
        sur {data.length} lignes
      </p>

      {/* ... rendu du tableau ... */}
    </div>
  );

  // Filtre personnalise par colonne :
  // {
  //   accessorKey: 'role',
  //   filterFn: (row, columnId, filterValue) => {
  //     return row.getValue<string>(columnId) === filterValue;
  //   },
  // }
}`}
        language="tsx"
        filename="filtering.tsx"
        highlightLines={[10, 11, 20, 21, 24, 25]}
        category="optimization"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Pagination
      </h3>

      <CodeBlock
        code={`import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  type PaginationState,
} from '@tanstack/react-table';
import { useState } from 'react';

function PaginatedTable({ data, columns }: TableProps) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* ... rendu du tableau ... */}

      {/* Controles de pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Debut
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Precedent
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Suivant
          </button>
          <button
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Fin
          </button>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <span>
            Page {table.getState().pagination.pageIndex + 1} sur{' '}
            {table.getPageCount().toLocaleString()}
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="px-2 py-1 border rounded"
          >
            {[10, 20, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize} par page
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}`}
        language="tsx"
        filename="pagination.tsx"
        highlightLines={[10, 11, 12, 13, 19, 20, 22]}
        category="optimization"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Selection, visibilite et redimensionnement
      </h3>

      <CodeBlock
        code={`import {
  useReactTable,
  getCoreRowModel,
  type RowSelectionState,
  type VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';

function AdvancedTable({ data, columns }: TableProps) {
  // -- Selection de lignes
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // -- Visibilite des colonnes
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    email: true,
    role: true,
    createdAt: false, // Colonne masquee par defaut
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      columnVisibility,
    },
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    // Selection conditionnelle :
    // enableRowSelection: (row) => row.original.role !== 'admin',
  });

  // Colonne de checkbox pour la selection
  const selectionColumn: ColumnDef<User> = {
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    size: 40,
  };

  // Toggle visibilite des colonnes
  const ColumnToggle = () => (
    <div className="flex gap-2 mb-4">
      {table.getAllLeafColumns().map((column) => (
        <label key={column.id} className="flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            checked={column.getIsVisible()}
            onChange={column.getToggleVisibilityHandler()}
          />
          {column.id}
        </label>
      ))}
    </div>
  );

  // Indicateur de selection
  const selectedCount = Object.keys(rowSelection).length;
  // selectedCount donne le nombre de lignes selectionnees

  return { table, ColumnToggle, selectedCount };
}`}
        language="tsx"
        filename="advanced-features.tsx"
        highlightLines={[11, 14, 15, 16, 17, 18, 27, 28, 31, 37]}
        category="optimization"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Groupement et agregation
      </h3>

      <CodeBlock
        code={`import {
  useReactTable,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  type GroupingState,
} from '@tanstack/react-table';
import { useState } from 'react';

function GroupedTable({ data, columns }: TableProps) {
  const [grouping, setGrouping] = useState<GroupingState>(['department']);

  const table = useReactTable({
    data,
    columns: [
      {
        accessorKey: 'department',
        header: 'Departement',
        // Fonction d'agregation pour le groupe
        aggregationFn: 'count',
        aggregatedCell: ({ getValue }) =>
          \`\${getValue()} employe(s)\`,
      },
      {
        accessorKey: 'salary',
        header: 'Salaire',
        // Agregation : moyenne des salaires par departement
        aggregationFn: 'mean',
        aggregatedCell: ({ getValue }) =>
          \`Moyenne: \${Math.round(getValue<number>()).toLocaleString('fr-FR')} EUR\`,
      },
      {
        accessorKey: 'name',
        header: 'Nom',
      },
    ],
    state: { grouping },
    onGroupingChange: setGrouping,
    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  // Rendu avec gestion des groupes
  // {table.getRowModel().rows.map((row) => (
  //   <tr key={row.id}>
  //     {row.getVisibleCells().map((cell) => (
  //       <td key={cell.id}>
  //         {cell.getIsGrouped() ? (
  //           // Cellule de groupe : bouton expand/collapse
  //           <button onClick={row.getToggleExpandedHandler()}>
  //             {row.getIsExpanded() ? '▼' : '▶'}{' '}
  //             {flexRender(cell.column.columnDef.cell, cell.getContext())}
  //           </button>
  //         ) : cell.getIsAggregated() ? (
  //           // Cellule agregee : affiche le resultat d'agregation
  //           flexRender(cell.column.columnDef.aggregatedCell, cell.getContext())
  //         ) : cell.getIsPlaceholder() ? null : (
  //           // Cellule normale
  //           flexRender(cell.column.columnDef.cell, cell.getContext())
  //         )}
  //       </td>
  //     ))}
  //   </tr>
  // ))}

  return table;

  // Fonctions d'agregation disponibles :
  // 'sum'      - Somme des valeurs
  // 'min'      - Valeur minimale
  // 'max'      - Valeur maximale
  // 'extent'   - [min, max]
  // 'mean'     - Moyenne
  // 'median'   - Mediane
  // 'unique'   - Valeurs uniques
  // 'uniqueCount' - Nombre de valeurs uniques
  // 'count'    - Nombre d'elements
}`}
        language="tsx"
        filename="grouping-aggregation.tsx"
        highlightLines={[11, 20, 21, 28, 29, 41, 42]}
        category="optimization"
      />

      <ComparisonTable
        modes={[
          {
            name: 'TanStack Table',
            description: 'Librairie headless, zero markup, logique pure avec adaptateurs multi-framework',
            color: '#f97316',
            pros: [
              'Controle total du rendu et du style',
              'Bundle leger (tree-shakable, ~15 KB)',
              'TypeScript first avec generics complets',
              'Compatible tous les frameworks UI (Tailwind, MUI, etc.)',
              'Extensible via plugins et fonctions personnalisees',
            ],
            cons: [
              'Plus de code a ecrire pour le rendu',
              'Pas de composants pre-faits',
              'Courbe d\'apprentissage pour les features avancees',
            ],
            useCases: [
              'Projets avec design system personnalise',
              'Dashboards et back-offices sur mesure',
              'Applications multi-framework',
            ],
          },
          {
            name: 'AG Grid',
            description: 'Datagrid complet avec rendu integre, orientee enterprise avec licence commerciale',
            color: '#3b82f6',
            pros: [
              'Fonctionnalites enterprise tres completes',
              'Rendu integre et performant (canvas)',
              'Excel export, pivot tables, charts integres',
            ],
            cons: [
              'Licence payante pour les features avancees',
              'Bundle lourd (~300 KB min)',
              'Style difficile a personnaliser en profondeur',
              'Lock-in sur l\'API AG Grid',
            ],
            useCases: [
              'Applications financieres et trading',
              'ERP et outils enterprise lourds',
              'Besoin d\'export Excel natif',
            ],
          },
          {
            name: 'Material UI DataGrid',
            description: 'Datagrid integree a l\'ecosysteme Material UI avec rendu Material Design',
            color: '#8b5cf6',
            pros: [
              'Integration native Material UI',
              'Bonne documentation',
              'Version communautaire gratuite',
            ],
            cons: [
              'Lie a Material UI (difficile a utiliser avec Tailwind)',
              'Fonctionnalites avancees payantes (Pro/Premium)',
              'Bundle consequent avec la dependance MUI',
              'Personnalisation limitee par le theme MUI',
            ],
            useCases: [
              'Projets deja bases sur Material UI',
              'Prototypage rapide avec Material Design',
              'Applications internes sans exigence de design',
            ],
          },
        ]}
      />

      <ConceptCard
        title="Checklist tableau de production"
        description="Points essentiels a verifier avant de livrer un tableau TanStack Table en production."
        category="optimization"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>-- <strong>Accessibilite</strong> : utiliser des elements table/thead/tbody semantiques, ajouter scope=&quot;col&quot; sur les th, aria-sort sur les colonnes triees</li>
          <li>-- <strong>Performance</strong> : virtualiser avec TanStack Virtual au-dela de 100 lignes, memoiser les colonnes avec useMemo</li>
          <li>-- <strong>Responsive</strong> : masquer les colonnes secondaires sur mobile avec columnVisibility, ou basculer vers une vue carte</li>
          <li>-- <strong>Etat persistant</strong> : sauvegarder le tri, les filtres et la pagination dans l&apos;URL (searchParams) pour le partage de liens</li>
          <li>-- <strong>Loading states</strong> : afficher un skeleton pendant le chargement des donnees, desactiver les controles pendant les requetes</li>
          <li>-- <strong>Empty state</strong> : prevoir un message quand le filtrage ne retourne aucun resultat</li>
        </ul>
      </ConceptCard>
    </div>
  );
}
