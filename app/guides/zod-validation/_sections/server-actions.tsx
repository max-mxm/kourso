import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { AlertTriangle, Check } from 'lucide-react';

export default function ServerActionsSection() {
  return (
    <div className="space-y-8">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-foreground/80">
          Les Server Actions de Next.js recoivent des FormData non types depuis le client.
          Meme si votre formulaire est valide cote client, vous devez toujours revalider
          cote serveur -- un utilisateur malveillant peut envoyer n&apos;importe quoi directement
          a votre endpoint.
        </p>
      </div>

      <ConceptCard
        title="Pourquoi revalider cote serveur ?"
        description="La validation client est une commodite UX. La validation serveur est une necessite de securite."
        category="best-practices"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <span>Un curl ou un script peut contourner toute validation client</span>
          </li>
          <li className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <span>Les DevTools permettent de modifier le DOM et les formulaires</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span>Zod valide les memes schemas cote client ET serveur</span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// Pattern de base : Server Action avec Zod
'use server';

import { z } from 'zod';

const CreatePostSchema = z.object({
  title: z.string().min(1, 'Le titre est requis').max(200),
  content: z.string().min(10, 'Minimum 10 caracteres'),
  category: z.enum(['tech', 'design', 'business']),
  published: z.boolean().default(false),
});

type ActionState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

export async function createPost(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // 1. Extraire et valider les donnees
  const result = CreatePostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    category: formData.get('category'),
    published: formData.get('published') === 'on',
  });

  // 2. Retourner les erreurs si invalide
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  // 3. Les donnees sont validees et typees
  const { title, content, category, published } = result.data;

  try {
    await db.post.create({
      data: { title, content, category, published },
    });
    return { success: true, message: 'Article cree avec succes' };
  } catch {
    return { success: false, message: 'Erreur lors de la creation' };
  }
}`}
        language="typescript"
        filename="app/actions/create-post.ts"
        highlightLines={[24, 25, 33, 34, 40]}
        category="best-practices"
      />

      <ConceptCard
        title="Utilisation avec useActionState"
        description="Le hook useActionState de React 19 se combine naturellement avec les Server Actions validees par Zod."
        category="best-practices"
      />

      <CodeBlock
        code={`'use client';

import { useActionState } from 'react';
import { createPost } from '@/app/actions/create-post';

export function CreatePostForm() {
  const [state, formAction, isPending] = useActionState(createPost, {
    success: false,
  });

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="title">Titre</label>
        <input id="title" name="title" />
        {state.errors?.title && (
          <p className="text-red-500 text-sm">{state.errors.title[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="content">Contenu</label>
        <textarea id="content" name="content" />
        {state.errors?.content && (
          <p className="text-red-500 text-sm">{state.errors.content[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="category">Categorie</label>
        <select id="category" name="category">
          <option value="">Choisir</option>
          <option value="tech">Tech</option>
          <option value="design">Design</option>
          <option value="business">Business</option>
        </select>
        {state.errors?.category && (
          <p className="text-red-500 text-sm">{state.errors.category[0]}</p>
        )}
      </div>

      <div>
        <label>
          <input type="checkbox" name="published" />
          Publier immediatement
        </label>
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? 'Creation...' : 'Creer l\\'article'}
      </button>

      {state.success && (
        <p className="text-green-600">{state.message}</p>
      )}
      {!state.success && state.message && (
        <p className="text-red-500">{state.message}</p>
      )}
    </form>
  );
}`}
        language="tsx"
        filename="components/create-post-form.tsx"
        highlightLines={[7, 8, 12]}
        category="best-practices"
      />

      <ConceptCard
        title="Pattern avance : schema partage client/serveur"
        description="Definir le schema dans un fichier partage pour que la validation client et serveur utilisent exactement les memes regles."
        category="best-practices"
      />

      <CodeBlock
        code={`// schemas/post.ts -- fichier partage (ni 'use client' ni 'use server')
import { z } from 'zod';

export const CreatePostSchema = z.object({
  title: z.string().min(1, 'Le titre est requis').max(200, 'Maximum 200 caracteres'),
  content: z.string().min(10, 'Minimum 10 caracteres'),
  category: z.enum(['tech', 'design', 'business']),
  published: z.boolean().default(false),
});

export type CreatePostInput = z.infer<typeof CreatePostSchema>;

// --------------------
// app/actions/create-post.ts -- Server Action
'use server';
import { CreatePostSchema } from '@/schemas/post';

export async function createPost(prevState: ActionState, formData: FormData) {
  const result = CreatePostSchema.safeParse(/* ... */);
  // ...
}

// --------------------
// components/create-post-form.tsx -- Client
'use client';
import { CreatePostSchema, type CreatePostInput } from '@/schemas/post';
import { zodResolver } from '@hookform/resolvers/zod';

// Meme schema pour la validation client (React Hook Form)
// ET pour la validation serveur (Server Action)
// -> Zero duplication, zero desynchronisation`}
        language="typescript"
        filename="pattern-schema-partage.ts"
        highlightLines={[4, 11, 27, 31, 32]}
        category="best-practices"
      />
    </div>
  );
}
