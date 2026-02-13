import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function UseActionStateSection() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          <code className="text-primary">useActionState</code> (anciennement useFormState) et <code className="text-primary">useOptimistic</code>
          sont les nouveaux hooks React 19 pour gérer les actions avec état et updates optimistes.
        </p>
      </div>

      <ConceptCard
        title="useActionState : Forms Simplifiés"
        description="Gérer l'état d'une action (form submission) avec pending, errors et résultat."
        category="rendering"
      >
        <p className="text-sm text-foreground/80">
          useActionState remplace useFormState et simplifie la gestion des forms avec validation serveur,
          états pending automatiques et intégration native avec les Server Actions.
        </p>
      </ConceptCard>

      <CodeBlock
        code={`// useActionState pour form submission
import { useActionState } from 'react';

async function updateProfile(prevState: State, formData: FormData) {
  'use server'; // Server Action

  const name = formData.get('name') as string;
  
  try {
    await db.user.update({ data: { name } });
    return { success: true, message: 'Profil mis à jour' };
  } catch (error) {
    return { success: false, error: 'Échec de la mise à jour' };
  }
}

export function ProfileForm() {
  const [state, action, isPending] = useActionState(updateProfile, {
    success: false,
    message: '',
    error: ''
  });

  return (
    <form action={action}>
      {state.error && <div className="error">{state.error}</div>}
      {state.success && <div className="success">{state.message}</div>}
      
      <input name="name" required />
      <button disabled={isPending}>
        {isPending ? 'Envoi...' : 'Mettre à jour'}
      </button>
    </form>
  );
}`}
        language="tsx"
        filename="components/profile-form.tsx"
        highlightLines={[18, 25]}
        category="rendering"
      />

      <ConceptCard
        title="useOptimistic : UX Instantanée"
        description="Afficher immédiatement le résultat attendu avant la confirmation serveur."
        category="rendering"
      >
        <p className="text-sm text-foreground/80">
          useOptimistic permet d&apos;update l&apos;UI instantanément (optimistic update) puis de revenir en arrière
          automatiquement si l&apos;action échoue.
        </p>
      </ConceptCard>

      <CodeBlock
        code={`// useOptimistic pour like instantané
import { useOptimistic, useTransition } from 'react';

export function LikeButton({ postId, initialLikes }: Props) {
  const [likes, setLikes] = useState(initialLikes);
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (current, amount: number) => current + amount
  );
  const [isPending, startTransition] = useTransition();

  async function handleLike() {
    // ✅ Update optimiste immédiate
    addOptimisticLike(1);

    // Appel serveur en arrière-plan
    startTransition(async () => {
      const newLikes = await likePost(postId);
      setLikes(newLikes); // Update réel
      // Si l'appel échoue, optimisticLikes revient automatiquement à 'likes'
    });
  }

  return (
    <button onClick={handleLike} disabled={isPending}>
      ❤️ {optimisticLikes} {isPending && '⏳'}
    </button>
  );
}`}
        language="tsx"
        filename="components/like-button.tsx"
        highlightLines={[5, 6, 7, 8, 13, 18]}
        category="rendering"
      />
    </div>
  );
}
