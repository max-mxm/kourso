import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function UseCallbackSection() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground leading-relaxed">
        <code className="text-primary">useCallback</code> met en cache une definition de fonction
        entre les renders. Contrairement a <code className="text-primary">useMemo</code> qui cache
        un resultat, useCallback cache la fonction elle-meme. Son utilite principale : stabiliser
        les references de fonctions passees en props a des enfants memoises ou utilisees dans les
        dependances de <code className="text-primary">useEffect</code>.
      </p>

      <CodeBlock
        code={`// Syntaxe de base : useCallback

import { useCallback, useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  // Sans useCallback : cette fonction est recreee a chaque render
  // const handleAddTodo = () => { ... };

  // Avec useCallback : la meme reference est reutilisee
  // tant que les dependances ne changent pas
  const handleAddTodo = useCallback(() => {
    if (!inputValue.trim()) return;

    setTodos(prev => [
      ...prev,
      { id: crypto.randomUUID(), text: inputValue, done: false },
    ]);
    setInputValue('');
  }, [inputValue]);
  // ^^^^^^^^^ Depend de inputValue car on le lit dans le callback.
  // Quand inputValue change, la fonction est recreee avec la nouvelle valeur.

  const handleToggle = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }, []);
  // ^^ Pas de dependance : on utilise la forme fonctionnelle de setState
  // donc on n'a pas besoin de lire "todos" directement.
  // Cette reference reste stable pour TOUTE la vie du composant.

  const handleDelete = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return (
    <div>
      <input value={inputValue} onChange={e => setInputValue(e.target.value)} />
      <button onClick={handleAddTodo}>Ajouter</button>
      <TodoList
        todos={todos}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}`}
        language="tsx"
        filename="todo-app.tsx"
        highlightLines={[14, 22, 26, 33, 37]}
        category="optimization"
      />

      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-xl font-bold text-foreground mb-3">Equivalence avec useMemo</h3>
        <p className="text-foreground/80 leading-relaxed">
          <code className="text-primary">useCallback(fn, deps)</code> est strictement equivalent a
          <code className="text-primary"> useMemo(() =&gt; fn, deps)</code>. Le hook useCallback est
          un raccourci syntaxique fourni par React pour un cas d&apos;usage tres courant :
          memoiser une fonction plutot qu&apos;une valeur.
        </p>
      </div>

      <CodeBlock
        code={`// Equivalence useCallback / useMemo

import { useCallback, useMemo } from 'react';

function SearchForm({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('');

  // Ces deux lignes sont STRICTEMENT equivalentes :

  // Version useCallback (syntaxe dediee, plus lisible)
  const handleSearch = useCallback(
    () => onSearch(query),
    [onSearch, query]
  );

  // Version useMemo (generique, meme resultat)
  const handleSearchAlt = useMemo(
    () => () => onSearch(query), // useMemo retourne la fonction
    [onSearch, query]
  );

  // handleSearch === handleSearchAlt (meme comportement)
  // Preferez useCallback pour les fonctions : plus explicite et lisible.

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Rechercher</button>
    </div>
  );
}`}
        language="tsx"
        filename="equivalence.tsx"
        highlightLines={[11, 12, 13, 17, 18, 19]}
        category="optimization"
      />

      <ConceptCard
        title="Sans consommateur memoise, useCallback seul est inutile"
        description="useCallback ne sert a rien si la fonction n'est pas passee a un composant enveloppe par React.memo ou utilisee dans un tableau de dependances (useEffect, useMemo). Sans consommateur qui tire parti de la reference stable, vous ajoutez de la complexite sans gain."
        category="optimization"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5 flex-shrink-0">--</span>
            <span>useCallback + React.memo = le composant enfant ne se re-rend pas (utile)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5 flex-shrink-0">--</span>
            <span>useCallback + useEffect deps = l&apos;effet ne se relance pas (utile)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 font-bold mt-0.5 flex-shrink-0">--</span>
            <span>useCallback seul, sans consommateur = overhead sans benefice (inutile)</span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// ANTI-PATTERN : useCallback sans React.memo

import { useCallback, useState } from 'react';

function ParentBroken() {
  const [count, setCount] = useState(0);

  // useCallback stabilise la reference de handleClick...
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Compteur : {count}
      </button>

      {/* MAIS ChildComponent n'est PAS memoize !
          Il se re-rend a chaque changement de count,
          que handleClick soit stable ou non.
          useCallback ne fait rien d'utile ici. */}
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

// ChildComponent se re-rend a chaque render du parent
// car il n'est pas enveloppe par React.memo
function ChildComponent({ onClick }: { onClick: () => void }) {
  console.log('ChildComponent render'); // Toujours affiche
  return <button onClick={onClick}>Action</button>;
}

// -----------------------------------------------

// PATTERN CORRECT : useCallback + React.memo

import { memo } from 'react';

function ParentFixed() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Compteur : {count}
      </button>

      {/* MemoizedChild est enveloppe par memo,
          et handleClick est une reference stable.
          MemoizedChild ne se re-rend PAS quand count change. */}
      <MemoizedChild onClick={handleClick} />
    </div>
  );
}

const MemoizedChild = memo(function MemoizedChild({
  onClick,
}: {
  onClick: () => void;
}) {
  console.log('MemoizedChild render'); // Seulement au mount
  return <button onClick={onClick}>Action</button>;
});`}
        language="tsx"
        filename="callback-patterns.tsx"
        highlightLines={[9, 19, 20, 21, 22, 45, 55, 56, 57, 62]}
        category="optimization"
      />

      <CodeBlock
        code={`// useCallback avec useEffect : eviter les boucles infinies

import { useCallback, useEffect, useState } from 'react';

interface SearchResults {
  items: Array<{ id: string; title: string }>;
  total: number;
}

function SearchPage({ apiBase }: { apiBase: string }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults | null>(null);

  // La fonction de recherche depend de apiBase (prop) et query (state)
  const fetchResults = useCallback(async () => {
    if (!query.trim()) {
      setResults(null);
      return;
    }

    const response = await fetch(
      \`\${apiBase}/search?q=\${encodeURIComponent(query)}\`
    );
    const data: SearchResults = await response.json();
    setResults(data);
  }, [apiBase, query]);
  // fetchResults est recree UNIQUEMENT quand apiBase ou query changent

  // useEffect depend de fetchResults
  // Grace a useCallback, cet effet ne se relance que quand
  // apiBase ou query changent (pas a chaque render)
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [fetchResults]);
  // Sans useCallback sur fetchResults :
  //   fetchResults serait une nouvelle reference a chaque render
  //   -> useEffect se relancerait a chaque render
  //   -> requete API a chaque render = boucle infinie potentielle

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Rechercher..."
      />
      {results && (
        <div>
          <p>{results.total} resultats</p>
          <ul>
            {results.items.map(item => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}`}
        language="tsx"
        filename="search-with-effect.tsx"
        highlightLines={[15, 26, 32, 38, 40, 41, 42]}
        category="optimization"
      />
    </div>
  );
}
