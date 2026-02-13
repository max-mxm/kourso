import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function StateConsolidationSection() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Un pattern courant chez les developpeurs React : multiplier les appels a <code className="text-primary">useState</code> pour
          chaque variable d&apos;etat. Cette approche semble intuitive, mais elle introduit des <strong>etats impossibles</strong>,
          des updates non-atomiques, et des bugs subtils. Consolider l&apos;etat dans un objet unique ou utiliser{' '}
          <code className="text-primary">useReducer</code> resout ces problemes.
        </p>
      </div>

      <ConceptCard
        title="Pourquoi les useState eparpilles posent probleme"
        description="Des states separes pour des donnees liees creent une surface de bugs significative."
        category="optimization"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>• <strong>Etats impossibles</strong> : loading=true et submitted=true ne devraient jamais coexister, mais rien ne l&apos;empeche</li>
          <li>• <strong>Updates non-atomiques</strong> : entre deux setState successifs, un render intermediaire peut survenir avec un etat incoherent</li>
          <li>• <strong>Maintenance complexe</strong> : ajouter un champ implique un nouveau useState, un nouveau setter, et des interactions a gerer</li>
          <li>• <strong>Tests fragiles</strong> : tester les combinaisons d&apos;etats independants multiplie les cas de test</li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// Anti-pattern : useState eparpilles
function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [validating, setValidating] = useState(false);

  async function handleSubmit() {
    setValidating(false);
    setLoading(true);
    setError(null);
    setSubmitted(false);
    // Probleme : entre ces appels, un render peut afficher
    // un etat incoherent (loading=true + submitted=true)

    try {
      await submitForm({ name, email });
      setLoading(false);
      setSubmitted(true);
      // Bug potentiel : si un autre effet lit 'loading'
      // entre ces deux lignes, il voit un etat impossible
    } catch (err) {
      setLoading(false);
      setError((err as Error).message);
      // Rien n'empeche submitted=true ET error d'etre defini
      // si un render precedent a deja setSubmitted(true)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {loading && <Spinner />}
      {error && <div className="error">{error}</div>}
      {submitted && <div className="success">Envoye !</div>}
      {/* 6 variables d'etat a coordonner manuellement */}
    </form>
  );
}`}
        language="tsx"
        filename="components/user-form.tsx (anti-pattern)"
        highlightLines={[3, 4, 5, 6, 7, 8, 12, 13, 14, 15, 21, 22]}
        category="optimization"
      />

      <CodeBlock
        code={`// Solution : etat consolide avec type discrimine
interface FormState {
  name: string;
  email: string;
  status: 'idle' | 'validating' | 'submitting' | 'success' | 'error';
  error: string | null;
}

function UserForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    status: 'idle',
    error: null,
  });

  async function handleSubmit() {
    // Une seule update atomique : pas d'etat intermediaire incoherent
    setForm(prev => ({ ...prev, status: 'submitting', error: null }));

    try {
      await submitForm({ name: form.name, email: form.email });
      setForm(prev => ({ ...prev, status: 'success' }));
    } catch (err) {
      setForm(prev => ({
        ...prev,
        status: 'error',
        error: (err as Error).message,
      }));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {form.status === 'submitting' && <Spinner />}
      {form.status === 'error' && <div className="error">{form.error}</div>}
      {form.status === 'success' && <div className="success">Envoye !</div>}
      {/* Le status discrimine rend les etats impossibles... impossibles */}
    </form>
  );
}`}
        language="tsx"
        filename="components/user-form.tsx (consolide)"
        highlightLines={[5, 19, 23, 25, 26, 27, 28]}
        category="optimization"
      />

      <ConceptCard
        title="Quand passer a useReducer"
        description="Pour les transitions d'etat complexes avec plusieurs actions, useReducer rend la logique explicite et testable."
        category="optimization"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>• <strong>useState consolide</strong> : suffisant quand les transitions sont simples (2-4 champs lies, logique lineaire)</li>
          <li>• <strong>useReducer</strong> : preferable quand les transitions sont nombreuses, ont des regles metier, ou doivent etre testees unitairement</li>
          <li>• <strong>Avantage cle</strong> : le reducer est une fonction pure, testable sans React, avec des transitions explicites</li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// useReducer : transitions explicites et testables
type FormAction =
  | { type: 'SET_FIELD'; field: keyof FormFields; value: string }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; error: string }
  | { type: 'RESET' };

interface FormFields {
  name: string;
  email: string;
}

interface FormState extends FormFields {
  status: 'idle' | 'submitting' | 'success' | 'error';
  error: string | null;
}

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value, status: 'idle' };
    case 'SUBMIT_START':
      return { ...state, status: 'submitting', error: null };
    case 'SUBMIT_SUCCESS':
      return { ...state, status: 'success' };
    case 'SUBMIT_ERROR':
      return { ...state, status: 'error', error: action.error };
    case 'RESET':
      return { name: '', email: '', status: 'idle', error: null };
  }
}

// Chaque transition est explicite et documentee par le type
function UserForm() {
  const [state, dispatch] = useReducer(formReducer, {
    name: '', email: '', status: 'idle', error: null,
  });

  async function handleSubmit() {
    dispatch({ type: 'SUBMIT_START' });
    try {
      await submitForm({ name: state.name, email: state.email });
      dispatch({ type: 'SUBMIT_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'SUBMIT_ERROR', error: (err as Error).message });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={state.name}
        onChange={e => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
      />
      {/* Chaque action est typee et auto-documentee */}
    </form>
  );
}`}
        language="tsx"
        filename="hooks/use-form-reducer.ts"
        highlightLines={[2, 3, 4, 5, 6, 7, 19, 36, 37, 41, 44, 46]}
        category="optimization"
      />

      <ConceptCard
        title="Recommandations"
        description="Choisir la bonne approche selon la complexite de l'etat."
        category="optimization"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>• <strong>2-3 etats lies</strong> (ex: data + loading + error) : consolider dans un seul useState avec un objet type</li>
          <li>• <strong>Transitions complexes</strong> avec plusieurs actions possibles : useReducer avec discriminated union</li>
          <li>• <strong>Etats independants</strong> (ex: isOpen d&apos;un modal + query de recherche) : garder des useState separes</li>
          <li>• <strong>React 19</strong> : le React Compiler optimise le batching, mais les etats impossibles restent un probleme de conception, pas de performance</li>
        </ul>
      </ConceptCard>
    </div>
  );
}
