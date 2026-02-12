import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { Check } from 'lucide-react';

export default function ActionsTransitionsSection() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          React 19 introduit les <strong>Actions</strong> - des fonctions async dans des transitions qui gèrent automatiquement
          les états pending, errors et optimistic updates. C&apos;est une révolution pour les forms et mutations.
        </p>
      </div>

      <ConceptCard
        title="Actions & useTransition"
        description="Les Actions simplifient drastiquement la gestion des états asynchrones dans React."
        category="rendering"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span><strong>Pending automatique</strong> : isPending géré par React pendant l&apos;exécution</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span><strong>Error handling intégré</strong> : try/catch automatique avec Error Boundaries</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span><strong>Optimistic updates</strong> : UI update immédiat avec rollback auto si échec</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span><strong>Non-blocking UI</strong> : L&apos;UI reste responsive pendant l&apos;action</span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// React 18 : Gestion manuelle du loading/error
import { useState } from 'react';

function FormOld() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    try {
      await submitForm(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <button disabled={isPending}>
        {isPending ? 'Envoi...' : 'Envoyer'}
      </button>
    </form>
  );
}`}
        language="tsx"
        filename="React 18 - Manuel"
        highlightLines={[4, 5, 9, 10, 15, 17]}
        category="rendering"
      />

      <CodeBlock
        code={`// React 19 : Actions avec useTransition
import { useTransition } from 'react';

function FormNew() {
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // ✅ startTransition accepte maintenant des fonctions async !
    startTransition(async () => {
      await submitForm(data);
      // isPending = true pendant l'exécution
      // Si une erreur est throw, Error Boundary la catch
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <button disabled={isPending}>
        {isPending ? 'Envoi...' : 'Envoyer'}
      </button>
    </form>
  );
}`}
        language="tsx"
        filename="React 19 - Actions"
        highlightLines={[5, 11, 12, 20]}
        category="rendering"
      />

      <CodeBlock
        code={`// Pattern : Form Action avec validation
import { useTransition } from 'react';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export function LoginForm() {
  const [isPending, startTransition] = useTransition();

  async function handleLogin(formData: FormData) {
    startTransition(async () => {
      // Validation
      const data = schema.parse({
        email: formData.get('email'),
        password: formData.get('password')
      });

      // Appel API
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      // Redirect ou update UI
      window.location.href = '/dashboard';
    });
  }

  return (
    <form action={handleLogin}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button disabled={isPending}>
        {isPending ? 'Connexion...' : 'Se connecter'}
      </button>
    </form>
  );
}`}
        language="tsx"
        filename="components/login-form.tsx"
        highlightLines={[14, 36, 39]}
        category="rendering"
      />

      <CodeBlock
        code={`// Pattern : useTransition pour navigation non-bloquante
import { useTransition, useState } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value); // ✅ Update immédiat (UI responsive)

    // ✅ Recherche en transition (non-bloquant)
    startTransition(async () => {
      const data = await searchAPI(value);
      setResults(data);
    });
  }

  return (
    <div>
      <input
        value={query}
        onChange={handleSearch}
        placeholder="Rechercher..."
      />

      {/* Visual feedback pendant la recherche */}
      {isPending && <span className="spinner">⏳</span>}

      <ul style={{ opacity: isPending ? 0.6 : 1 }}>
        {results.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}`}
        language="tsx"
        filename="components/search.tsx"
        highlightLines={[11, 14, 15, 16, 29, 31]}
        category="rendering"
      />

      <ConceptCard
        title="Concurrent Rendering & Interruptibilité"
        description="React 19 active le concurrent rendering par défaut - les transitions peuvent être interrompues."
        category="rendering"
      >
        <div className="space-y-3 text-sm text-foreground/80">
          <p>
            Avec le concurrent rendering, React peut <strong>interrompre</strong> une transition en cours
            si une mise à jour plus urgente arrive (ex: un clic utilisateur).
          </p>
          <div className="p-4 rounded-lg bg-background/50 border border-blue-500/20">
            <h4 className="font-bold text-foreground mb-2">Exemple : Recherche interruptible</h4>
            <p className="text-muted-foreground">
              L&apos;utilisateur tape &quot;react&quot; puis immédiatement &quot;vue&quot;. React annule automatiquement
              la recherche &quot;react&quot; en cours et lance &quot;vue&quot; - pas besoin de debounce manuel !
            </p>
          </div>
        </div>
      </ConceptCard>

      <CodeBlock
        code={`// Pattern avancé : Multiple transitions avec priorité
import { useTransition } from 'react';

function DataDashboard() {
  const [urgentPending, startUrgentTransition] = useTransition();
  const [backgroundPending, startBackgroundTransition] = useTransition();

  function refreshData() {
    // ✅ Transition urgente (haute priorité)
    startUrgentTransition(async () => {
      await fetchCriticalData();
    });

    // ✅ Transition background (basse priorité)
    startBackgroundTransition(async () => {
      await fetchAnalytics();
    });

    // Si l'utilisateur clique pendant ce temps,
    // React peut interrompre backgroundTransition mais pas urgentTransition
  }

  return (
    <div>
      <button onClick={refreshData}>
        Rafraîchir {urgentPending && '⏳'}
      </button>
      {backgroundPending && <div className="bg-loading">Chargement analytics...</div>}
    </div>
  );
}`}
        language="tsx"
        filename="components/dashboard.tsx"
        highlightLines={[4, 5, 9, 14]}
        category="rendering"
      />

      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">Recommandations Seniors</h3>
        <ul className="space-y-2 text-foreground/80">
          <li>
            <strong>Utiliser useTransition pour toutes les mutations</strong> : Forms, updates, navigation
          </li>
          <li>
            <strong>Combiner avec useOptimistic</strong> pour une UX instantanée (voir section suivante)
          </li>
          <li>
            <strong>Error Boundaries obligatoires</strong> : Les erreurs dans les transitions sont catchées par Error Boundary
          </li>
          <li>
            <strong>Éviter les transitions imbriquées</strong> : Complexité inutile, préférer une seule transition
          </li>
        </ul>
      </div>
    </div>
  );
}
