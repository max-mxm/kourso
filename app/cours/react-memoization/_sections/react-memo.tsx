import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function ReactMemoSection() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground leading-relaxed">
        <code className="text-primary">React.memo</code> est un Higher-Order Component (HOC)
        qui enveloppe un composant et empeche son re-render si ses props n&apos;ont pas change.
        C&apos;est l&apos;outil le plus visible du trio de memoisation : il agit au niveau du composant entier
        et decide si l&apos;execution de la fonction composant peut etre sautee.
      </p>

      <CodeBlock
        code={`// Syntaxe de base : envelopper un composant avec React.memo

import { memo } from 'react';

interface UserCardProps {
  name: string;
  email: string;
  role: string;
}

// Sans memo : se re-rend a CHAQUE render du parent
function UserCard({ name, email, role }: UserCardProps) {
  console.log('UserCard render:', name);
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-bold">{name}</h3>
      <p className="text-gray-600">{email}</p>
      <span className="text-sm bg-blue-100 px-2 py-1 rounded">{role}</span>
    </div>
  );
}

// Avec memo : ne se re-rend QUE si name, email ou role changent
const MemoizedUserCard = memo(function UserCard({
  name,
  email,
  role,
}: UserCardProps) {
  console.log('MemoizedUserCard render:', name);
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-bold">{name}</h3>
      <p className="text-gray-600">{email}</p>
      <span className="text-sm bg-blue-100 px-2 py-1 rounded">{role}</span>
    </div>
  );
});

// Export direct (pattern le plus courant)
export default memo(UserCard);`}
        language="tsx"
        filename="user-card.tsx"
        highlightLines={[24, 25, 26, 27]}
        category="rendering"
      />

      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-xl font-bold text-foreground mb-3">Comparaison superficielle (shallow comparison)</h3>
        <p className="text-foreground/80 leading-relaxed">
          Par defaut, <code className="text-primary">React.memo</code> effectue une comparaison superficielle
          des props : il verifie l&apos;egalite par reference (<code>===</code>) pour chaque prop.
          Pour les types primitifs (string, number, boolean), cela fonctionne parfaitement.
          Pour les objets et fonctions, c&apos;est la que les pieges commencent.
        </p>
      </div>

      <CodeBlock
        code={`// CAS 1 : Props primitives - React.memo FONCTIONNE parfaitement

import { memo, useState } from 'react';

const ExpensiveChart = memo(function ExpensiveChart({
  title,
  value,
  showLegend,
}: {
  title: string;      // Primitive : comparaison par valeur
  value: number;      // Primitive : comparaison par valeur
  showLegend: boolean; // Primitive : comparaison par valeur
}) {
  console.log('ExpensiveChart render');
  // Simulation d'un rendu couteux (graphique SVG complexe)
  const paths = Array.from({ length: 1000 }, (_, i) => (
    <path key={i} d={\`M\${i} \${Math.sin(i) * value}\`} />
  ));

  return (
    <div>
      <h3>{title}</h3>
      <svg>{paths}</svg>
      {showLegend && <Legend />}
    </div>
  );
});

function Dashboard() {
  const [notifications, setNotifications] = useState(0);

  return (
    <div>
      <button onClick={() => setNotifications(n => n + 1)}>
        Notifications ({notifications})
      </button>

      {/* "Revenue mensuelle", 42000 et true ne changent pas
          entre les renders -> ExpensiveChart ne se re-rend PAS */}
      <ExpensiveChart
        title="Revenue mensuelle"    // "Revenue mensuelle" === "Revenue mensuelle" -> true
        value={42000}                 // 42000 === 42000 -> true
        showLegend={true}             // true === true -> true
      />
      {/* Resultat : le clic sur Notifications ne declenche PAS
          le re-render de ExpensiveChart */}
    </div>
  );
}`}
        language="tsx"
        filename="stable-primitives.tsx"
        highlightLines={[5, 39, 40, 41, 42, 43, 44]}
        category="rendering"
      />

      <CodeBlock
        code={`// CAS 2 : Objets et fonctions inline - React.memo est CONTOURNE

import { memo, useState } from 'react';

const UserProfile = memo(function UserProfile({
  user,
  onEdit,
}: {
  user: { name: string; age: number };
  onEdit: () => void;
}) {
  console.log('UserProfile render'); // S'affiche a CHAQUE render du parent !
  return (
    <div>
      <h3>{user.name}, {user.age} ans</h3>
      <button onClick={onEdit}>Modifier</button>
    </div>
  );
});

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Compteur : {count}
      </button>

      <UserProfile
        // PROBLEME 1 : objet literal = nouvelle reference a chaque render
        // { name: 'Alice', age: 30 } !== { name: 'Alice', age: 30 }
        // car ce sont deux objets differents en memoire
        user={{ name: 'Alice', age: 30 }}

        // PROBLEME 2 : fonction inline = nouvelle reference a chaque render
        // () => {} !== () => {}
        // car ce sont deux fonctions differentes en memoire
        onEdit={() => console.log('edit')}
      />
      {/* memo compare les props par reference (===)
          Objet precedent !== Nouvel objet -> re-render
          Fonction precedente !== Nouvelle fonction -> re-render
          Resultat : memo est completement inutile ici */}
    </div>
  );
}`}
        language="tsx"
        filename="inline-objects-problem.tsx"
        highlightLines={[12, 34, 35, 39, 40, 42, 43, 44]}
        category="rendering"
      />

      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-xl font-bold text-foreground mb-3">Comparateur personnalise (areEqual)</h3>
        <p className="text-foreground/80 leading-relaxed">
          Pour les cas ou la comparaison superficielle ne suffit pas,
          <code className="text-primary"> React.memo</code> accepte un second argument : une fonction
          de comparaison personnalisee. Cette fonction recoit les anciennes et nouvelles props et
          retourne <code>true</code> si le composant ne doit PAS se re-rendre.
        </p>
      </div>

      <CodeBlock
        code={`// Comparateur personnalise : controle fin sur la comparaison

import { memo } from 'react';

interface DataGridProps {
  data: Array<{ id: string; value: number; label: string }>;
  columns: string[];
  onRowClick: (id: string) => void;
  lastUpdated: Date;
}

// areEqual retourne true = PAS de re-render
// areEqual retourne false = re-render
function areEqual(prevProps: DataGridProps, nextProps: DataGridProps): boolean {
  // Comparer la longueur et les IDs des donnees (pas la reference)
  if (prevProps.data.length !== nextProps.data.length) return false;

  // Verifier si les donnees ont reellement change (deep comparison ciblee)
  const dataChanged = prevProps.data.some((item, index) => {
    const next = nextProps.data[index];
    return item.id !== next.id || item.value !== next.value;
  });
  if (dataChanged) return false;

  // Les colonnes changent rarement, comparer par longueur + contenu
  if (prevProps.columns.length !== nextProps.columns.length) return false;
  if (prevProps.columns.some((col, i) => col !== nextProps.columns[i])) return false;

  // Ignorer onRowClick (sera stabilise par useCallback dans le parent)
  // Ignorer lastUpdated si la difference est < 1 seconde
  const timeDiff = Math.abs(
    nextProps.lastUpdated.getTime() - prevProps.lastUpdated.getTime()
  );
  if (timeDiff > 1000) return false;

  return true; // Props considerees identiques, pas de re-render
}

const DataGrid = memo(function DataGrid({
  data,
  columns,
  onRowClick,
  lastUpdated,
}: DataGridProps) {
  console.log('DataGrid render -', data.length, 'lignes');

  return (
    <table>
      <thead>
        <tr>
          {columns.map(col => <th key={col}>{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id} onClick={() => onRowClick(row.id)}>
            <td>{row.label}</td>
            <td>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}, areEqual); // <-- second argument : la fonction de comparaison

export default DataGrid;`}
        language="tsx"
        filename="data-grid.tsx"
        highlightLines={[14, 37, 40, 63]}
        category="rendering"
      />

      <ConceptCard
        title="React.memo est un HOC, pas un hook"
        description="Contrairement a useMemo et useCallback, React.memo n'est pas un hook. C'est un Higher-Order Component : une fonction qui prend un composant et retourne un nouveau composant. Cette distinction est importante."
        category="rendering"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-background/50 border border-blue-500/20">
            <h4 className="font-bold text-foreground mb-2">HOC (React.memo)</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>Enveloppe un composant entier</li>
              <li>Decide si le render est necessaire</li>
              <li>S&apos;applique a l&apos;exterieur du composant</li>
              <li>Fonctionne avec les composants classes et fonctions</li>
              <li>Compare les props entre deux renders</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-background/50 border border-purple-500/20">
            <h4 className="font-bold text-foreground mb-2">Hooks (useMemo, useCallback)</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>Agissent a l&apos;interieur d&apos;un composant</li>
              <li>Mettent en cache des valeurs ou fonctions</li>
              <li>S&apos;utilisent dans le corps de la fonction composant</li>
              <li>Fonctionnent uniquement avec les composants fonctions</li>
              <li>Comparent un tableau de dependances</li>
            </ul>
          </div>
        </div>
      </ConceptCard>
    </div>
  );
}
