import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function CustomHooksSection() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Les <strong>custom hooks</strong> sont l&apos;outil principal de réutilisation en React. Bien conçus,
          ils encapsulent la logique complexe et améliorent la testabilité.
        </p>
      </div>

      <CodeBlock
        code={`// Pattern : Custom Hook avec TypeScript
import { useState, useEffect } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        const json = await response.json();

        if (!cancelled) {
          setData(json);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url, refetchIndex]);

  const refetch = () => setRefetchIndex(i => i + 1);

  return { data, loading, error, refetch };
}

// Usage avec inférence de type
function UserProfile() {
  const { data: user, loading, error } = useFetch<User>('/api/user');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{user?.name}</div>;
}`}
        language="tsx"
        filename="hooks/use-fetch.ts"
        highlightLines={[11, 49, 51, 56]}
        category="advanced"
      />

      <ConceptCard
        title="Best Practices pour Custom Hooks"
        description="Les règles d'or pour créer des hooks réutilisables et maintenables."
        category="advanced"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>• <strong>Nommage</strong> : Toujours préfixer avec &quot;use&quot; (useMyHook)</li>
          <li>• <strong>Single Responsibility</strong> : Un hook = une responsabilité claire</li>
          <li>• <strong>TypeScript Generics</strong> : Pour la réutilisabilité avec type safety</li>
          <li>• <strong>Cleanup</strong> : Toujours nettoyer les effets (return dans useEffect)</li>
          <li>• <strong>Composition</strong> : Combiner des hooks simples plutôt qu&apos;un hook complexe</li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// Pattern : Hook composé (composition de hooks)
import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Composition : Combiner plusieurs hooks
function useSearchWithHistory(initialQuery = '') {
  const [query, setQuery] = useLocalStorage('searchQuery', initialQuery);
  const debouncedQuery = useDebounce(query, 300);
  const { data, loading } = useFetch<Result[]>(\`/api/search?q=\${debouncedQuery}\`);

  return { query, setQuery, results: data, loading };
}`}
        language="tsx"
        filename="Composition de hooks"
        highlightLines={[4, 14, 17, 29, 30, 31, 33]}
        category="advanced"
      />
    </div>
  );
}
