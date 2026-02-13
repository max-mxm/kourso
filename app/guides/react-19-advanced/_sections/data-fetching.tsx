import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function DataFetchingSection() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          React 19 change fondamentalement le data fetching : <code className="text-primary">use() + Suspense</code> remplace
          useEffect pour éviter les race conditions et simplifier le code.
        </p>
      </div>

      <CodeBlock
        code={`// ❌ React 18 : useEffect (race conditions possibles)
function UserProfile({ userId }: Props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      setLoading(true);
      const data = await fetchUser(userId);
      
      if (!cancelled) {
        setUser(data);
        setLoading(false);
      }
    }

    loadUser();

    return () => { cancelled = true; }; // Cleanup pour race condition
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}

// ✅ React 19 : use() + Suspense (pas de race condition)
import { use, Suspense } from 'react';

function UserProfile({ userId }: Props) {
  const userPromise = useMemo(() => fetchUser(userId), [userId]);
  const user = use(userPromise); // Suspend automatiquement

  return <div>{user.name}</div>; // Simple !
}

export function UserPage({ userId }: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfile userId={userId} />
    </Suspense>
  );
}`}
        language="tsx"
        filename="Data fetching patterns"
        highlightLines={[6, 7, 20, 29, 31, 32, 34, 39]}
        category="optimization"
      />

      <ConceptCard
        title="TanStack Query : La Solution Seniors"
        description="Pour des besoins avancés (caching, revalidation, mutations), TanStack Query reste indispensable."
        category="optimization"
      >
        <p className="text-sm text-foreground/80">
          TanStack Query (React Query) gère automatiquement le caching, la revalidation, les mutations optimistes,
          et bien plus. C&apos;est la bibliothèque de référence pour le data fetching en production.
        </p>
      </ConceptCard>

      <CodeBlock
        code={`// TanStack Query v5 avec React 19
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function UserProfile() {
  const queryClient = useQueryClient();

  // ✅ Fetch avec cache automatique
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000 // Cache 5 min
  });

  // ✅ Mutation avec invalidation auto
  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      // Invalide et refetch automatiquement
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={() => updateMutation.mutate({ name: 'New Name' })}>
        Update
      </button>
    </div>
  );
}`}
        language="tsx"
        filename="TanStack Query pattern"
        highlightLines={[8, 9, 10, 11, 15, 16, 17, 19]}
        category="optimization"
      />
    </div>
  );
}
