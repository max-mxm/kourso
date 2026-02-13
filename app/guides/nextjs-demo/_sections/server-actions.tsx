'use client';

import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { Check } from 'lucide-react';

export function ServerActionsSection() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <ConceptCard
        title="Server Actions - RPC Sécurisé et Type-Safe"
        description="Les Server Actions sont des fonctions exécutées côté serveur, appelées directement depuis des Client Components. Elles offrent une alternative moderne aux routes API traditionnelles."
        category="optimization"
      >
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Analogie : Imaginez un appel téléphonique sécurisé. Au lieu de crier vos informations bancaires dans la rue (API REST publique), vous utilisez un téléphone crypté avec vérification d'identité automatique (Server Action). La communication est directe, sécurisée, et vous n'avez pas besoin de configurer une ligne dédiée pour chaque conversation.
          </p>
        </div>
      </ConceptCard>

      {/* Syntaxe de base */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">Syntaxe de Base</h3>

        <CodeBlock
          code={`'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// Schéma de validation
const FormSchema = z.object({
  title: z.string().min(3, 'Titre trop court'),
  description: z.string().max(500, 'Description trop longue'),
});

// Server Action
export async function createPost(formData: FormData) {
  // Validation côté serveur
  const validatedFields = FormSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Logique métier (accès database, etc.)
  const { title, description } = validatedFields.data;

  await db.post.create({
    data: { title, description },
  });

  // Revalidation du cache
  revalidatePath('/posts');

  return { success: true };
}`}
          language="tsx"
          filename="app/_lib/server/actions.ts"
          highlightLines={[1, 14, 15, 16, 17, 18, 33]}
          category="optimization"
        />
      </div>

      {/* Utilisation depuis Client Component */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">Appel depuis un Client Component</h3>

        <CodeBlock
          code={`'use client';

import { useTransition } from 'react';
import { createPost } from '@/app/_lib/server/actions';

export function CreatePostForm() {
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await createPost(formData);

      if (result.errors) {
        // Afficher les erreurs
        console.error(result.errors);
      } else {
        // Succès
        toast.success('Post créé avec succès');
      }
    });
  }

  return (
    <form action={handleSubmit}>
      <input name="title" required />
      <textarea name="description" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Création...' : 'Créer'}
      </button>
    </form>
  );
}`}
          language="tsx"
          filename="app/posts/create-post-form.tsx"
          highlightLines={[10, 11]}
          category="optimization"
        />
      </div>

      {/* Avantages */}
      <ConceptCard
        title="Avantages des Server Actions"
        description="Les Server Actions offrent plusieurs bénéfices significatifs par rapport aux routes API traditionnelles."
        category="optimization"
      >
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-foreground">Type-safety de bout en bout</div>
              <div className="text-sm text-muted-foreground">TypeScript infère automatiquement les types entre client et serveur</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-foreground">Pas de route API nécessaire</div>
              <div className="text-sm text-muted-foreground">Réduction du boilerplate et de la complexité</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-foreground">Progressive Enhancement</div>
              <div className="text-sm text-muted-foreground">Fonctionne même sans JavaScript activé</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-foreground">Validation automatique double</div>
              <div className="text-sm text-muted-foreground">Client (UX rapide) + Serveur (sécurité garantie)</div>
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* Pattern avec enhanceAction */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">Pattern Avancé avec enhanceAction</h3>

        <CodeBlock
          code={`'use server';

import { enhanceAction } from '@/lib/server/enhance-action';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const FormSchema = z.object({
  title: z.string().min(3),
  description: z.string().max(500),
});

// Action avec validation et auth automatiques
export const submitDemoFormAction = enhanceAction(
  async (data, { user }) => {
    // data est déjà validé selon FormSchema
    // user est automatiquement vérifié (auth: true)

    // Logique métier
    await db.post.create({
      data: {
        ...data,
        authorId: user.id,
      },
    });

    // Revalidation
    revalidatePath('/dashboard');

    return { success: true };
  },
  {
    schema: FormSchema,
    auth: true, // Requiert authentification
  }
);`}
          language="tsx"
          filename="app/_lib/server/actions.ts"
          highlightLines={[13, 14, 15, 16, 30, 31]}
          category="optimization"
        />

        <div className="text-sm text-muted-foreground p-4 rounded-lg bg-muted/30">
          <strong>Note :</strong> Le helper <code className="px-1.5 py-0.5 rounded bg-muted text-foreground">enhanceAction</code> est un pattern de Scanorr qui encapsule la validation Zod, l'authentification, et la gestion d'erreurs dans une abstraction réutilisable.
        </div>
      </div>

      {/* Cycle de vie */}
      <ConceptCard
        title="Cycle de Vie d'une Server Action"
        description="Comprendre le flux complet d'exécution d'une Server Action."
        category="optimization"
      >
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                1
              </div>
              <div>
                <div className="font-medium text-foreground">Form Submit</div>
                <div className="text-sm text-muted-foreground">L'utilisateur soumet le formulaire</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                2
              </div>
              <div>
                <div className="font-medium text-foreground">Client Validation (optionnelle)</div>
                <div className="text-sm text-muted-foreground">Feedback UX immédiat avant l'envoi</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                3
              </div>
              <div>
                <div className="font-medium text-foreground">startTransition</div>
                <div className="text-sm text-muted-foreground">React marque l'UI comme pending</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                4
              </div>
              <div>
                <div className="font-medium text-foreground">RPC Call</div>
                <div className="text-sm text-muted-foreground">Appel sécurisé vers le serveur</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                5
              </div>
              <div>
                <div className="font-medium text-foreground">Server Validation</div>
                <div className="text-sm text-muted-foreground">Validation Zod + vérification sécurité</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                6
              </div>
              <div>
                <div className="font-medium text-foreground">Authentication Check</div>
                <div className="text-sm text-muted-foreground">Vérification du token/session utilisateur</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                7
              </div>
              <div>
                <div className="font-medium text-foreground">Exécution Métier</div>
                <div className="text-sm text-muted-foreground">Database write, API calls, etc.</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                8
              </div>
              <div>
                <div className="font-medium text-foreground">Revalidation</div>
                <div className="text-sm text-muted-foreground">Mise à jour du cache Next.js</div>
              </div>
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* Server Actions vs API Routes */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">Server Actions vs API Routes</h3>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Server Actions */}
          <div className="p-5 rounded-lg bg-green-500/10 border border-green-500/30 space-y-3">
            <div className="text-sm font-bold text-green-600 dark:text-green-400">
              Utiliser Server Actions pour :
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">Mutations (POST, PUT, DELETE)</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">Soumission de formulaires</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">Actions utilisateur (like, vote, save)</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">Progressive enhancement requis</span>
              </div>
            </div>
          </div>

          {/* API Routes */}
          <div className="p-5 rounded-lg bg-blue-500/10 border border-blue-500/30 space-y-3">
            <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
              Utiliser API Routes pour :
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">Webhooks (Stripe, GitHub, etc.)</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">API publique (documentation OpenAPI)</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">Requêtes GET complexes avec cache</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">Endpoints pour apps mobiles/externes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pièges courants */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">Pièges à Éviter</h3>

        <div className="space-y-6">
          {/* Piège 1 */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-foreground">1. Validation uniquement côté client</div>

            <CodeBlock
              code={`// ❌ MAUVAIS - Aucune validation serveur
'use server';
export async function updateProfile(formData: FormData) {
  await db.user.update({
    data: { name: formData.get('name') } // Dangereux !
  });
}

// ✅ BON - Validation serveur obligatoire
'use server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2).max(50),
});

export async function updateProfile(formData: FormData) {
  const validated = schema.parse({
    name: formData.get('name')
  });
  await db.user.update({ data: validated });
}`}
              language="tsx"
              category="optimization"
            />
          </div>

          {/* Piège 2 */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-foreground">2. Oublier 'use server' directive</div>

            <CodeBlock
              code={`// ❌ MAUVAIS - Pas de 'use server' = exécution client
export async function deletePost(id: string) {
  await db.post.delete({ where: { id } });
}

// ✅ BON - 'use server' en haut du fichier
'use server';

export async function deletePost(id: string) {
  await db.post.delete({ where: { id } });
}`}
              language="tsx"
              category="optimization"
            />
          </div>

          {/* Piège 3 */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-foreground">3. Retourner des données sensibles</div>

            <CodeBlock
              code={`// ❌ MAUVAIS - Exposer des données privées au client
'use server';
export async function getUser(id: string) {
  const user = await db.user.findUnique({ where: { id } });
  return user; // Contient password, email privé, etc.
}

// ✅ BON - Ne retourner que les données nécessaires
'use server';
export async function getUser(id: string) {
  const user = await db.user.findUnique({
    where: { id },
    select: { name: true, avatar: true } // Seulement public
  });
  return user;
}`}
              language="tsx"
              category="optimization"
            />
          </div>

          {/* Piège 4 */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-foreground">4. Pas de revalidation après mutation</div>

            <CodeBlock
              code={`// ❌ MAUVAIS - Cache non invalidé, UI désynchronisée
'use server';
export async function createPost(data: PostData) {
  await db.post.create({ data });
  return { success: true };
}

// ✅ BON - Revalidation du cache
'use server';
import { revalidatePath } from 'next/cache';

export async function createPost(data: PostData) {
  await db.post.create({ data });
  revalidatePath('/posts');
  return { success: true };
}`}
              language="tsx"
              category="optimization"
            />
          </div>
        </div>
      </div>

      {/* Résumé */}
      <ConceptCard
        title="Points Clés à Retenir"
        description="Les Server Actions sont un paradigme moderne pour les mutations côté serveur dans Next.js."
        category="optimization"
      >
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm text-muted-foreground">
              Type-safety de bout en bout sans configuration supplémentaire
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm text-muted-foreground">
              Toujours valider côté serveur, même avec validation client
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm text-muted-foreground">
              Utiliser revalidatePath/revalidateTag après mutations
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm text-muted-foreground">
              Privilégier Server Actions pour mutations, API Routes pour webhooks
            </span>
          </div>
        </div>
      </ConceptCard>
    </div>
  );
}
