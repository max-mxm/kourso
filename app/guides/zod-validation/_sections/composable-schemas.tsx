import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { Check } from 'lucide-react';

export default function ComposableSchemasSection() {
  return (
    <div className="space-y-8">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-foreground/80">
          Un des atouts majeurs de Zod est la composabilite des schemas. Au lieu de dupliquer
          des definitions, vous derivez de nouveaux schemas a partir d&apos;un schema de base --
          exactement comme les utility types TypeScript (Pick, Omit, Partial).
        </p>
      </div>

      <ConceptCard
        title="Le pattern de base : deriver pour ne pas dupliquer"
        description="Definir un schema source, puis en deriver des variantes pour chaque contexte (creation, mise a jour, affichage public)."
        category="rendering"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>.extend()</strong> : ajouter des proprietes</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>.pick()</strong> : selectionner des proprietes</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>.omit()</strong> : exclure des proprietes</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>.partial()</strong> : tout rendre optionnel</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>.required()</strong> : tout rendre requis</span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`import { z } from 'zod';

// Schema de base -- la source de verite
const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['admin', 'editor', 'viewer']),
  avatar: z.string().url().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Creation : sans id ni timestamps (generes cote serveur)
const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
type CreateUser = z.infer<typeof CreateUserSchema>;
// { name: string; email: string; password: string; role: ...; avatar: string | null }

// Mise a jour partielle : tout optionnel sauf l'id
const UpdateUserSchema = UserSchema.pick({
  name: true,
  email: true,
  avatar: true,
  role: true,
}).partial();
type UpdateUser = z.infer<typeof UpdateUserSchema>;
// { name?: string; email?: string; avatar?: string | null; role?: ... }

// Vue publique : sans password ni timestamps
const PublicUserSchema = UserSchema.omit({
  password: true,
  updatedAt: true,
});
type PublicUser = z.infer<typeof PublicUserSchema>;
// { id: string; name: string; email: string; role: ...; avatar: ...; createdAt: Date }`}
        language="typescript"
        filename="composable-schemas.ts"
        highlightLines={[16, 25, 35]}
        category="rendering"
      />

      <ConceptCard
        title="extend() et merge()"
        description="Ajouter des proprietes a un schema existant ou fusionner deux schemas."
        category="rendering"
      />

      <CodeBlock
        code={`// extend() -- ajouter des proprietes
const BaseArticleSchema = z.object({
  title: z.string().min(1),
  content: z.string(),
});

const PublishedArticleSchema = BaseArticleSchema.extend({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  publishedAt: z.date(),
  author: z.object({
    name: z.string(),
    avatar: z.string().url().optional(),
  }),
});

// merge() -- fusionner deux schemas objets
const TimestampSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
});

const SoftDeleteSchema = z.object({
  deletedAt: z.date().nullable(),
  isActive: z.boolean(),
});

// Fusion de 3 schemas
const FullArticleSchema = PublishedArticleSchema
  .merge(TimestampSchema)
  .merge(SoftDeleteSchema);

type FullArticle = z.infer<typeof FullArticleSchema>;
// Combine toutes les proprietes des 3 schemas`}
        language="typescript"
        filename="extend-merge.ts"
        highlightLines={[7, 29, 30, 31]}
        category="rendering"
      />

      <ConceptCard
        title="Gestion des proprietes inconnues"
        description="Par defaut, Zod supprime les proprietes non definies dans le schema. Trois methodes pour controler ce comportement."
        category="rendering"
      />

      <CodeBlock
        code={`const ProductSchema = z.object({
  name: z.string(),
  price: z.number(),
});

const input = { name: 'Widget', price: 9.99, discount: 0.1, sku: 'W-001' };

// Comportement par defaut : strip (supprime les proprietes inconnues)
ProductSchema.parse(input);
// { name: 'Widget', price: 9.99 } -- discount et sku supprimes

// strict() -- rejette les proprietes inconnues
ProductSchema.strict().parse(input);
// ZodError: Unrecognized key(s) in object: 'discount', 'sku'

// passthrough() -- conserve les proprietes inconnues
ProductSchema.passthrough().parse(input);
// { name: 'Widget', price: 9.99, discount: 0.1, sku: 'W-001' }

// catchall() -- valide les proprietes inconnues avec un schema
ProductSchema.catchall(z.string()).parse({
  name: 'Widget',
  price: 9.99,
  note: 'fragile',  // OK : string
});`}
        language="typescript"
        filename="unknown-properties.ts"
        highlightLines={[9, 13, 17]}
        category="rendering"
      />

      <CodeBlock
        code={`// Pattern reel : schemas partages client/serveur
// schemas/user.ts -- fichier partage

import { z } from 'zod';

export const UserBaseSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  role: z.enum(['admin', 'editor', 'viewer']).default('viewer'),
});

// Pour le formulaire d'inscription (client)
export const SignupFormSchema = UserBaseSchema.extend({
  password: z.string().min(8, 'Minimum 8 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

// Pour la reponse API (serveur -> client)
export const UserResponseSchema = UserBaseSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
});

// Pour la mise a jour (client -> serveur)
export const UpdateProfileSchema = UserBaseSchema
  .pick({ name: true, email: true })
  .partial();

// Tous les types inferes automatiquement
export type SignupForm = z.infer<typeof SignupFormSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
export type UpdateProfile = z.infer<typeof UpdateProfileSchema>;`}
        language="typescript"
        filename="schemas/user.ts"
        highlightLines={[6, 13, 22, 28]}
        category="rendering"
      />
    </div>
  );
}
