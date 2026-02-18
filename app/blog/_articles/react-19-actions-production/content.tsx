import { CodeBlock } from '@/components/course/code-block';
import { ConceptCard } from '@/components/course/concept-card';
import { ComparisonTable } from '@/components/course/comparison-table';

export default function React19ActionsProductionContent() {
  return (
    <>
      <h2 id="introduction">Introduction</h2>
      <p>
        Les formulaires React classiques accumulent vite du boilerplate :
        <code>useState</code> pour chaque champ, un <code>pending</code> local,
        une gestion d erreurs repetitive, puis un <code>try/catch</code> par
        soumission. React 19 propose une alternative plus directe avec les
        Actions et trois hooks complementaires.
      </p>

      <ConceptCard
        title="Le probleme recurrent"
        description="Les formulaires finissent par dupliquer les memes patterns partout."
        category="best-practices"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>Etat du bouton soumis a la main.</li>
          <li>Erreurs reseau recopiees dans chaque composant.</li>
          <li>Optimistic UI difficile a generaliser.</li>
        </ul>
      </ConceptCard>

      <h2 id="pourquoi-actions">Pourquoi les Actions changent la donne</h2>
      <p>
        Une Action est une fonction async associee directement a un formulaire.
        React orchestre le cycle de soumission et expose l etat via
        <code>useActionState</code> et <code>useFormStatus</code>. Resultat :
        vous ecrivez moins de glue-code et vous concentrez sur la logique metier.
      </p>

      <ComparisonTable
        modes={[
          {
            name: 'Formulaire classique',
            description: 'Gestion manuelle des states et du cycle async',
            pros: ['Controle total', 'Compatible partout'],
            cons: ['Boilerplate', 'Erreurs repetitives', 'Pending fragile'],
            useCases: ['Legacy', 'Formulaires tres simples'],
            color: 'rgb(249, 115, 22)',
          },
          {
            name: 'React 19 Actions',
            description: 'Action + hooks pour etat, pending et erreurs',
            pros: ['Moins de code', 'Etat centralise', 'Optimistic UI simple'],
            cons: ['Nouveaux patterns a apprendre'],
            useCases: ['Nouveaux projets', 'Formulaires critiques'],
            color: 'rgb(168, 85, 247)',
          },
        ]}
      />

      <h2 id="useactionstate">useActionState : etat et erreurs sans glue-code</h2>
      <p>
        <code>useActionState</code> encapsule le resultat d une Action et l etat
        associe. Vous centralisez les erreurs et les reponses sans multiplier les
        variables locales.
      </p>

      <CodeBlock
        code={`// useActionState : centraliser resultat + erreurs
import { useActionState } from 'react';

type ActionState = {
  ok: boolean;
  message: string;
};

async function createOrderAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const amountCents = Number(formData.get('amountCents'));

  if (!Number.isFinite(amountCents) || amountCents < 100) {
    return { ok: false, message: 'Montant minimum: 1,00 EUR' };
  }

  await fakeApiCall(amountCents);

  return { ok: true, message: 'Commande creee' };
}

export function OrderForm() {
  const [state, action] = useActionState(createOrderAction, {
    ok: false,
    message: '',
  });

  return (
    <form action={action}>
      <input name="amountCents" placeholder="12900" />
      <button type="submit">Valider</button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`}
        language="tsx"
        filename="order-form.tsx"
        category="best-practices"
      />

      <h2 id="useformstatus">useFormStatus : des boutons vraiment fiables</h2>
      <p>
        <code>useFormStatus</code> expose l etat du formulaire le plus proche.
        Vos boutons se desactivent automatiquement pendant la soumission, sans
        prop drilling.
      </p>

      <CodeBlock
        code={`import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Envoi...' : 'Creer la commande'}
    </button>
  );
}

export function OrderForm({ action }: { action: (fd: FormData) => void }) {
  return (
    <form action={action}>
      <input name="amountCents" />
      <SubmitButton />
    </form>
  );
}`}
        language="tsx"
        filename="submit-button.tsx"
        category="best-practices"
      />

      <h2 id="useoptimistic">useOptimistic : UI immediate sans tricher</h2>
      <p>
        <code>useOptimistic</code> permet d afficher un nouvel element avant la
        reponse serveur. Ideal pour commentaires, checklists, ou items de
        commandes.
      </p>

      <CodeBlock
        code={`import { useOptimistic, useState } from 'react';

type Comment = { id: string; body: string; optimistic?: boolean };

export function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [optimisticComments, addOptimistic] = useOptimistic(
    comments,
    (state, newComment: Comment) => [...state, newComment]
  );

  async function submit(body: string) {
    const temp = { id: crypto.randomUUID(), body, optimistic: true };
    addOptimistic(temp);

    const saved = await saveComment(body);
    setComments((prev) => prev.filter((c) => c.id !== temp.id).concat(saved));
  }

  return (
    <div>
      {optimisticComments.map((comment) => (
        <p key={comment.id} className={comment.optimistic ? 'opacity-60' : ''}>
          {comment.body}
        </p>
      ))}
    </div>
  );
}`}
        language="tsx"
        filename="comments.tsx"
        category="best-practices"
      />

      <h2 id="checklist-production">Checklist production</h2>
      <ConceptCard
        title="Points a valider avant mise en prod"
        description="Les Actions reduisent le code, pas vos exigences de qualite."
        category="best-practices"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>Validation input cote client et serveur.</li>
          <li>Gestion d erreurs centralisee (messages clairs).</li>
          <li>Idempotence sur les actions critiques.</li>
          <li>Logging et tracing par action.</li>
          <li>Fallback si le formulaire echoue (retry, support).</li>
        </ul>
      </ConceptCard>

      <h2 id="conclusion">Conclusion</h2>
      <p>
        React 19 Actions rend les formulaires plus previsible et plus concis.
        Combinez <code>useActionState</code> pour l etat, <code>useFormStatus</code>
        pour le pending et <code>useOptimistic</code> pour l experience. Vous
        reduisez le boilerplate sans perdre en controle.
      </p>
    </>
  );
}
