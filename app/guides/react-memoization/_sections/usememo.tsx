import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function UseMemoSection() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground leading-relaxed">
        <code className="text-primary">useMemo</code> est un hook qui met en cache le resultat d&apos;un calcul
        entre les renders. Il re-execute le calcul uniquement lorsque ses dependances changent.
        Ses deux cas d&apos;usage principaux : eviter des calculs couteux et stabiliser des references
        d&apos;objets pour que <code className="text-primary">React.memo</code> fonctionne correctement.
      </p>

      <CodeBlock
        code={`// Cas d'usage 1 : memoiser un calcul couteux

import { useMemo, useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  inStock: boolean;
}

function ProductCatalog({ products }: { products: Product[] }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'rating'>('price');
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  // Sans useMemo : ce calcul s'execute a CHAQUE render
  // Avec 10 000 produits, c'est ~50ms a chaque frappe clavier
  const filteredAndSorted = useMemo(() => {
    console.log('Recalcul de la liste filtree...');

    // Etape 1 : Filtrer par recherche
    let result = products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    // Etape 2 : Filtrer par stock
    if (showInStockOnly) {
      result = result.filter(p => p.inStock);
    }

    // Etape 3 : Trier
    result.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      return b.rating - a.rating;
    });

    // Etape 4 : Formater les prix (couteux avec Intl)
    return result.map(p => ({
      ...p,
      displayPrice: new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      }).format(p.price),
    }));
  }, [products, search, sortBy, showInStockOnly]);
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Le calcul ne se relance QUE si l'une de ces 4 valeurs change.
  // Si un autre state du composant change (ex: un modal ouvert),
  // useMemo retourne le resultat en cache.

  return (
    <div>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Rechercher..."
      />
      <select
        value={sortBy}
        onChange={e => setSortBy(e.target.value as 'price' | 'rating')}
      >
        <option value="price">Prix</option>
        <option value="rating">Note</option>
      </select>
      <label>
        <input
          type="checkbox"
          checked={showInStockOnly}
          onChange={e => setShowInStockOnly(e.target.checked)}
        />
        En stock uniquement
      </label>

      <p>{filteredAndSorted.length} resultats</p>
      <ul>
        {filteredAndSorted.map(p => (
          <li key={p.id}>{p.name} - {p.displayPrice}</li>
        ))}
      </ul>
    </div>
  );
}`}
        language="tsx"
        filename="product-catalog.tsx"
        highlightLines={[21, 22, 49, 50, 51]}
        category="rendering"
      />

      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-xl font-bold text-foreground mb-3">Le piege des references : pourquoi useMemo est indispensable pour React.memo</h3>
        <p className="text-foreground/80 leading-relaxed">
          En JavaScript, deux objets avec le meme contenu ne sont pas egaux par reference :
          <code className="text-primary">{` { color: 'blue' } !== { color: 'blue' }`}</code>.
          A chaque render, un objet literal cree une nouvelle reference. Si cet objet est passe
          en prop a un composant enveloppe par <code className="text-primary">React.memo</code>,
          le memo est contourne car la reference a change. useMemo resout ce probleme.
        </p>
      </div>

      <CodeBlock
        code={`// Le piege de la reference : sans useMemo, React.memo est inutile

import { memo, useMemo, useState } from 'react';

// Composant enfant memoize
const ChartConfig = memo(function ChartConfig({
  config,
}: {
  config: { theme: string; animate: boolean; gridLines: number };
}) {
  console.log('ChartConfig render');
  return (
    <div>
      Theme: {config.theme}, Grille: {config.gridLines} lignes
    </div>
  );
});

// PROBLEME : sans useMemo
function DashboardBroken() {
  const [refreshCount, setRefreshCount] = useState(0);

  // Cet objet est recree a CHAQUE render = nouvelle reference
  // { theme: 'dark', ... } !== { theme: 'dark', ... } par reference
  const config = { theme: 'dark', animate: true, gridLines: 5 };

  return (
    <div>
      <button onClick={() => setRefreshCount(r => r + 1)}>
        Rafraichir ({refreshCount})
      </button>
      {/* memo est contourne : config est une nouvelle reference */}
      <ChartConfig config={config} />
    </div>
  );
}

// SOLUTION : avec useMemo
function DashboardFixed() {
  const [refreshCount, setRefreshCount] = useState(0);

  // useMemo retourne la MEME reference tant que les deps ne changent pas
  const config = useMemo(
    () => ({ theme: 'dark', animate: true, gridLines: 5 }),
    [] // Pas de dependances = reference stable pour toute la vie du composant
  );

  return (
    <div>
      <button onClick={() => setRefreshCount(r => r + 1)}>
        Rafraichir ({refreshCount})
      </button>
      {/* memo fonctionne : config est la meme reference */}
      <ChartConfig config={config} />
    </div>
  );
}`}
        language="tsx"
        filename="reference-trap.tsx"
        highlightLines={[25, 26, 43, 44, 45]}
        category="rendering"
      />

      <CodeBlock
        code={`// Exemple complet : liste de 10 000 elements avec filtre memoize

import { memo, useMemo, useState } from 'react';

interface Employee {
  id: string;
  name: string;
  department: string;
  salary: number;
  hireDate: string;
}

// Composant ligne memoize (ne re-rend que si l'employe change)
const EmployeeRow = memo(function EmployeeRow({
  employee,
  isSelected,
  onSelect,
}: {
  employee: Employee;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  console.log('EmployeeRow render:', employee.name);
  return (
    <tr
      className={isSelected ? 'bg-blue-50' : ''}
      onClick={() => onSelect(employee.id)}
    >
      <td>{employee.name}</td>
      <td>{employee.department}</td>
      <td>
        {new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'EUR',
        }).format(employee.salary)}
      </td>
      <td>{new Date(employee.hireDate).toLocaleDateString('fr-FR')}</td>
    </tr>
  );
});

function EmployeeDirectory({ employees }: { employees: Employee[] }) {
  const [filter, setFilter] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'name' | 'salary'>('name');

  // useMemo : le filtre + tri ne se recalcule que lorsque
  // employees, filter ou sortField changent.
  // Cliquer sur une ligne (selectedId change) ne relance PAS le calcul.
  const visibleEmployees = useMemo(() => {
    console.log('Recalcul de visibleEmployees...');

    const filtered = employees.filter(emp =>
      emp.name.toLowerCase().includes(filter.toLowerCase()) ||
      emp.department.toLowerCase().includes(filter.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (sortField === 'name') return a.name.localeCompare(b.name);
      return b.salary - a.salary;
    });
  }, [employees, filter, sortField]);
  // selectedId n'est PAS dans les deps -> cliquer ne recalcule pas

  return (
    <div>
      <input
        value={filter}
        onChange={e => setFilter(e.target.value)}
        placeholder="Filtrer par nom ou departement..."
      />
      <p>{visibleEmployees.length} employes affiches sur {employees.length}</p>
      <table>
        <thead>
          <tr>
            <th onClick={() => setSortField('name')}>Nom</th>
            <th>Departement</th>
            <th onClick={() => setSortField('salary')}>Salaire</th>
            <th>Embauche</th>
          </tr>
        </thead>
        <tbody>
          {visibleEmployees.map(emp => (
            <EmployeeRow
              key={emp.id}
              employee={emp}
              isSelected={emp.id === selectedId}
              onSelect={setSelectedId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}`}
        language="tsx"
        filename="employee-directory.tsx"
        highlightLines={[14, 50, 51, 52, 63, 64]}
        category="rendering"
      />

      <ConceptCard
        title="useMemo cache le RESULTAT, pas la fonction"
        description="Distinction essentielle : useMemo execute la fonction et cache ce qu'elle retourne. useCallback, lui, cache la fonction elle-meme sans l'executer. Confondre les deux est une erreur frequente."
        category="rendering"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-background/50 border border-blue-500/20">
            <h4 className="font-bold text-foreground mb-2">useMemo</h4>
            <p className="text-sm text-muted-foreground mb-2">Cache le resultat du calcul</p>
            <code className="text-xs bg-muted/50 px-2 py-1 rounded block">
              useMemo(() =&gt; expensiveCalc(data), [data])
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Retourne : la valeur calculee (ex: un tableau filtre, un objet formate)
            </p>
          </div>
          <div className="p-4 rounded-lg bg-background/50 border border-purple-500/20">
            <h4 className="font-bold text-foreground mb-2">useCallback</h4>
            <p className="text-sm text-muted-foreground mb-2">Cache la fonction elle-meme</p>
            <code className="text-xs bg-muted/50 px-2 py-1 rounded block">
              useCallback((id) =&gt; handleClick(id), [])
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Retourne : la reference de la fonction (pas son resultat)
            </p>
          </div>
        </div>
      </ConceptCard>
    </div>
  );
}
