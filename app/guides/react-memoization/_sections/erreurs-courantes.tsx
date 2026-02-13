import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function ErreursCourantesSection() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground leading-relaxed">
        La memoisation est un outil puissant, mais mal utilisee, elle peut degrader les performances,
        introduire des bugs subtils ou simplement ajouter de la complexite sans aucun benefice.
        Voici les quatre erreurs les plus frequentes, avec pour chacune le code problematique
        et la correction.
      </p>

      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-xl font-bold text-foreground mb-3">Erreur 1 : Tout memoiser par defaut</h3>
        <p className="text-foreground/80 leading-relaxed">
          Envelopper chaque composant avec React.memo et chaque valeur avec useMemo est un reflexe
          courant mais contre-productif. Chaque memoisation a un cout : comparaison des dependances,
          memoire pour le cache, complexite du code. Si le composant est leger ou si les props
          changent a chaque render, ce cout depasse le benefice.
        </p>
      </div>

      <CodeBlock
        code={`// ANTI-PATTERN : tout memoiser sans raison

import { memo, useCallback, useMemo } from 'react';

// Memoiser un composant trivial : aucun benefice
const Label = memo(function Label({ text }: { text: string }) {
  // Ce composant rend un seul <span> : cout de render < 0.01ms
  // Le cout de comparaison des props par memo est du meme ordre
  return <span className="text-sm text-gray-600">{text}</span>;
});

function FormField({ label, value, onChange }: FormFieldProps) {
  // Memoiser un calcul trivial : plus couteux que le calcul lui-meme
  const trimmedValue = useMemo(() => value.trim(), [value]);
  // value.trim() prend ~0.001ms
  // La comparaison des deps de useMemo prend ~0.001ms aussi
  // Aucun gain, mais code plus complexe

  // useCallback sans consommateur memoise : overhead pur
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );
  // handleChange est passe a <input>, un element natif
  // Les elements natifs ne beneficient PAS de React.memo
  // Cette memoisation ne sert strictement a rien

  return (
    <div>
      <Label text={label} />
      <input value={trimmedValue} onChange={handleChange} />
    </div>
  );
}`}
        language="tsx"
        filename="over-memoization.tsx"
        highlightLines={[6, 14, 15, 16, 21, 22, 27, 28]}
        category="best-practices"
      />

      <CodeBlock
        code={`// CORRECTION : memoiser uniquement ce qui en a besoin

function FormField({ label, value, onChange }: FormFieldProps) {
  // Pas de useMemo : value.trim() est instantane
  const trimmedValue = value.trim();

  // Pas de useCallback : <input> est un element natif
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      {/* Pas de memo : Label est trivial */}
      <span className="text-sm text-gray-600">{label}</span>
      <input value={trimmedValue} onChange={handleChange} />
    </div>
  );
}

// Regle : ne memoiser que lorsque le Profiler montre un probleme
// ou quand un enfant React.memo a besoin de references stables`}
        language="tsx"
        filename="correct-approach.tsx"
        highlightLines={[4, 7, 14]}
        category="best-practices"
      />

      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-xl font-bold text-foreground mb-3">Erreur 2 : Oublier des dependances (stale closures)</h3>
        <p className="text-foreground/80 leading-relaxed">
          Quand une fonction memorisee par useCallback ou useMemo lit une variable mais ne la liste pas
          dans ses dependances, elle capture une valeur obsolete. C&apos;est le bug de la &quot;stale closure&quot; :
          la fonction fonctionne avec des donnees du passe.
        </p>
      </div>

      <CodeBlock
        code={`// BUG : stale closure - la fonction utilise une valeur obsolete

import { useCallback, useState } from 'react';

function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [draft, setDraft] = useState('');

  // BUG : draft n'est PAS dans les dependances
  const handleSend = useCallback(() => {
    if (!draft.trim()) return;

    // draft est capture au moment de la creation du callback
    // Si l'utilisateur tape "Bonjour" puis "Comment ca va",
    // handleSend enverra toujours la valeur de draft au premier render
    setMessages(prev => [...prev, draft]); // draft est toujours ''
    setDraft('');
  }, []); // <-- PROBLEME : deps vides, draft n'est jamais mis a jour

  return (
    <div>
      <ul>
        {messages.map((msg, i) => <li key={i}>{msg}</li>)}
      </ul>
      <input value={draft} onChange={e => setDraft(e.target.value)} />
      <button onClick={handleSend}>Envoyer</button>
    </div>
  );
}

// Execution pas a pas :
// 1. Render initial : draft = '', handleSend capture draft = ''
// 2. L'utilisateur tape "Bonjour" : draft = 'Bonjour'
// 3. handleSend est TOUJOURS la version du render initial
// 4. L'utilisateur clique sur Envoyer
// 5. handleSend lit draft... qui vaut '' (la valeur capturee)
// 6. Le message envoye est vide !`}
        language="tsx"
        filename="stale-closure-bug.tsx"
        highlightLines={[10, 16, 18]}
        category="best-practices"
      />

      <CodeBlock
        code={`// CORRECTION : inclure draft dans les dependances

function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [draft, setDraft] = useState('');

  // FIX 1 : Ajouter draft aux dependances
  const handleSend = useCallback(() => {
    if (!draft.trim()) return;
    setMessages(prev => [...prev, draft]); // draft est a jour
    setDraft('');
  }, [draft]); // <-- draft dans les deps : la fonction se recree quand draft change

  // FIX 2 (alternative) : utiliser un ref pour les valeurs qui changent souvent
  // Utile quand vous voulez une reference stable ET une valeur a jour
  const draftRef = useRef(draft);
  draftRef.current = draft; // Mis a jour a chaque render

  const handleSendStable = useCallback(() => {
    if (!draftRef.current.trim()) return;
    setMessages(prev => [...prev, draftRef.current]);
    setDraft('');
  }, []); // Pas besoin de draft dans les deps : on lit la ref

  return (
    <div>
      <ul>
        {messages.map((msg, i) => <li key={i}>{msg}</li>)}
      </ul>
      <input value={draft} onChange={e => setDraft(e.target.value)} />
      <button onClick={handleSend}>Envoyer</button>
    </div>
  );
}`}
        language="tsx"
        filename="stale-closure-fix.tsx"
        highlightLines={[8, 12, 17, 18, 20, 24]}
        category="best-practices"
      />

      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-xl font-bold text-foreground mb-3">Erreur 3 : React.memo sans stabiliser les props</h3>
        <p className="text-foreground/80 leading-relaxed">
          Envelopper un composant avec React.memo mais continuer a lui passer des objets et fonctions
          inline en props est l&apos;une des erreurs les plus frequentes. Le memo est contourne a chaque
          render car les references changent. Vous payez le cout de la comparaison sans aucun benefice.
        </p>
      </div>

      <CodeBlock
        code={`// PROBLEME : memo contourne par des props inline

import { memo, useState } from 'react';

// Le composant EST memoize...
const ExpensiveList = memo(function ExpensiveList({
  items,
  config,
  onItemClick,
}: {
  items: string[];
  config: { pageSize: number; showHeader: boolean };
  onItemClick: (item: string) => void;
}) {
  console.log('ExpensiveList render -', items.length, 'items');
  return (
    <ul>
      {items.map(item => (
        <li key={item} onClick={() => onItemClick(item)}>{item}</li>
      ))}
    </ul>
  );
});

function PageBroken() {
  const [theme, setTheme] = useState('light');
  const items = ['React', 'Vue', 'Angular', 'Svelte'];

  return (
    <div>
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Theme : {theme}
      </button>

      <ExpensiveList
        items={items}
        // Nouvel objet a chaque render -> memo contourne
        config={{ pageSize: 20, showHeader: true }}
        // Nouvelle fonction a chaque render -> memo contourne
        onItemClick={(item) => console.log('Clic:', item)}
      />
      {/* Resultat : ExpensiveList se re-rend a chaque
          changement de theme malgre React.memo */}
    </div>
  );
}`}
        language="tsx"
        filename="memo-bypassed.tsx"
        highlightLines={[6, 38, 40, 42, 43]}
        category="best-practices"
      />

      <CodeBlock
        code={`// SOLUTION : stabiliser les references avec useMemo et useCallback

import { memo, useCallback, useMemo, useState } from 'react';

function PageFixed() {
  const [theme, setTheme] = useState('light');
  const items = ['React', 'Vue', 'Angular', 'Svelte'];

  // useMemo stabilise la reference de l'objet config
  const config = useMemo(
    () => ({ pageSize: 20, showHeader: true }),
    [] // Pas de dependances = reference stable
  );

  // useCallback stabilise la reference de la fonction
  const handleItemClick = useCallback((item: string) => {
    console.log('Clic:', item);
  }, []);

  return (
    <div>
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Theme : {theme}
      </button>

      <ExpensiveList
        items={items}
        config={config}         // Meme reference entre les renders
        onItemClick={handleItemClick} // Meme reference entre les renders
      />
      {/* Resultat : ExpensiveList ne se re-rend PAS
          quand le theme change */}
    </div>
  );
}`}
        language="tsx"
        filename="memo-working.tsx"
        highlightLines={[10, 11, 16, 17, 28, 29]}
        category="best-practices"
      />

      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-xl font-bold text-foreground mb-3">Erreur 4 : useMemo pour des calculs triviaux</h3>
        <p className="text-foreground/80 leading-relaxed">
          Utiliser useMemo pour des operations qui prennent quelques microsecondes (addition, concatenation,
          acces a une propriete) ajoute de la complexite sans benefice mesurable. Le cout de useMemo
          (comparaison des dependances, stockage en memoire) est du meme ordre que le calcul lui-meme.
        </p>
      </div>

      <CodeBlock
        code={`// ANTI-PATTERN : useMemo pour des calculs triviaux

function UserGreeting({ firstName, lastName, age }: UserProps) {
  // Inutile : la concatenation prend ~0.001ms
  const fullName = useMemo(
    () => \`\${firstName} \${lastName}\`,
    [firstName, lastName]
  );

  // Inutile : une addition prend ~0.000001ms
  const birthYear = useMemo(
    () => new Date().getFullYear() - age,
    [age]
  );

  // Inutile : un acces a propriete prend ~0.0001ms
  const isAdult = useMemo(() => age >= 18, [age]);

  return (
    <div>
      <h2>{fullName}</h2>
      <p>Ne en {birthYear}</p>
      {isAdult && <span>Majeur</span>}
    </div>
  );
}

// CORRECTION : calcul direct, simple et lisible

function UserGreeting({ firstName, lastName, age }: UserProps) {
  const fullName = \`\${firstName} \${lastName}\`;
  const birthYear = new Date().getFullYear() - age;
  const isAdult = age >= 18;

  return (
    <div>
      <h2>{fullName}</h2>
      <p>Ne en {birthYear}</p>
      {isAdult && <span>Majeur</span>}
    </div>
  );
}

// Regle : reservez useMemo aux calculs qui prennent > 1ms
// ou aux objets qui doivent avoir une reference stable`}
        language="tsx"
        filename="trivial-memo.tsx"
        highlightLines={[5, 6, 11, 12, 17, 31, 32, 33]}
        category="best-practices"
      />

      <ConceptCard
        title="Resume des 4 erreurs a eviter"
        description="Gardez ces regles en tete pour utiliser la memoisation de maniere efficace et pertinente."
        category="best-practices"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-background/50 border border-red-500/20">
            <h4 className="font-bold text-foreground mb-1">1. Tout memoiser par defaut</h4>
            <p className="text-sm text-muted-foreground">
              Chaque memoisation a un cout. Ne memoiser que ce que le Profiler identifie comme problematique.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-background/50 border border-red-500/20">
            <h4 className="font-bold text-foreground mb-1">2. Oublier des dependances</h4>
            <p className="text-sm text-muted-foreground">
              Les stale closures causent des bugs subtils. Activez le plugin ESLint exhaustive-deps.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-background/50 border border-red-500/20">
            <h4 className="font-bold text-foreground mb-1">3. memo sans stabiliser les props</h4>
            <p className="text-sm text-muted-foreground">
              React.memo est inutile si les objets et fonctions sont crees inline dans le parent.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-background/50 border border-red-500/20">
            <h4 className="font-bold text-foreground mb-1">4. useMemo pour des calculs triviaux</h4>
            <p className="text-sm text-muted-foreground">
              Reservez useMemo aux calculs &gt; 1ms ou aux references qui doivent rester stables.
            </p>
          </div>
        </div>
      </ConceptCard>
    </div>
  );
}
