import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';

export default function TanStackFormSection() {
  const formComparison = [
    {
      name: 'React Hook Form',
      description: 'La reference etablie pour les formulaires React, basee sur des refs non controlees.',
      pros: [
        'Ecosysteme mature et vaste',
        'Documentation exhaustive',
        'Excellente integration Zod/Yup',
        'Large communaute et ressources',
      ],
      cons: [
        'Re-renders au niveau du formulaire entier avec watch()',
        'API parfois verbose pour les cas complexes',
        'Validation asynchrone moins intuitive',
      ],
      useCases: [
        'Formulaires classiques (login, inscription)',
        'Projets avec equipe habituee a RHF',
        'Integration rapide avec des composants UI existants',
      ],
      color: 'rgb(236, 72, 153)',
    },
    {
      name: 'TanStack Form',
      description: 'Architecture reactive basee sur @tanstack/store avec re-renders granulaires par champ.',
      pros: [
        'Re-renders isoles par champ modifie',
        'Validation sync, async et debounced native',
        'TypeScript-first avec inference complete',
        'Framework-agnostic (React, Vue, Solid, Angular)',
      ],
      cons: [
        'Ecosysteme plus jeune',
        'Moins de ressources communautaires',
        'API en evolution rapide',
      ],
      useCases: [
        'Formulaires complexes a haute performance',
        'Formulaires multi-etapes avec validation serveur',
        'Applications ou chaque milliseconde compte',
      ],
      color: 'rgb(249, 115, 22)',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          TanStack Form adopte une architecture fondamentalement differente des librairies de formulaires
          traditionnelles. En s&apos;appuyant sur <code>@tanstack/store</code>, chaque champ possede son propre
          abonnement reactif. Le resultat : seul le champ modifie se re-rend, pas le formulaire entier.
          Cette granularite devient critique dans les formulaires complexes avec des dizaines de champs.
        </p>
      </div>

      <ConceptCard
        title="Avantage de performance : re-renders granulaires"
        description="Dans un formulaire de 50 champs, une saisie dans un champ ne provoque qu'un seul re-render au lieu de 50. C'est le principe fondamental de TanStack Form."
        category="optimization"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>-- <strong>React Hook Form avec watch()</strong> : re-rend le composant parent a chaque changement, propageant aux enfants non memoises</li>
          <li>-- <strong>TanStack Form</strong> : chaque champ souscrit independamment au store. Les autres champs ne sont jamais notifies</li>
          <li>-- <strong>Impact mesurable</strong> : sur un formulaire de 30+ champs, la difference de reactivite est perceptible a l&apos;oeil nu</li>
        </ul>
      </ConceptCard>

      <h3 className="text-xl font-semibold text-foreground">
        useForm et l&apos;API Field
      </h3>

      <CodeBlock
        code={`'use client';

import { useForm } from '@tanstack/react-form';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  role: 'developer' | 'designer' | 'manager';
}

export function ProfileForm() {
  const form = useForm<UserProfile>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      bio: '',
      role: 'developer',
    },
    onSubmit: async ({ value }) => {
      // value est type-safe : UserProfile
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde du profil');
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      {/* Chaque field ne re-rend que lui-meme */}
      <form.Field
        name="firstName"
        children={(field) => (
          <div className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium">
              Prenom
            </label>
            <input
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="w-full rounded-md border px-3 py-2"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-sm text-red-500">
                {field.state.meta.errors.join(', ')}
              </p>
            )}
          </div>
        )}
      />

      <form.Field
        name="email"
        children={(field) => (
          <div className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium">
              Email
            </label>
            <input
              id={field.name}
              type="email"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="w-full rounded-md border px-3 py-2"
            />
          </div>
        )}
      />

      <form.Field
        name="role"
        children={(field) => (
          <div className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium">
              Role
            </label>
            <select
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value as UserProfile['role'])}
              className="w-full rounded-md border px-3 py-2"
            >
              <option value="developer">Developpeur</option>
              <option value="designer">Designer</option>
              <option value="manager">Manager</option>
            </select>
          </div>
        )}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <button
            type="submit"
            disabled={!canSubmit}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground disabled:opacity-50"
          >
            {isSubmitting ? 'Enregistrement...' : 'Enregistrer le profil'}
          </button>
        )}
      />
    </form>
  );
}`}
        language="tsx"
        filename="profile-form.tsx"
        highlightLines={[14, 15, 16, 17, 18, 19, 20, 21, 48, 49, 50]}
        category="optimization"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Validation synchrone, asynchrone et debounced
      </h3>

      <CodeBlock
        code={`import { useForm } from '@tanstack/react-form';

export function RegistrationForm() {
  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      await registerUser(value);
    },
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
      {/* Validation synchrone : executee a chaque changement */}
      <form.Field
        name="username"
        validators={{
          onChange: ({ value }) => {
            if (value.length < 3) {
              return 'Le nom d\\'utilisateur doit contenir au moins 3 caracteres';
            }
            if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
              return 'Caracteres autorises : lettres, chiffres, tirets et underscores';
            }
            return undefined;
          },
        }}
        children={(field) => (
          <div className="space-y-2">
            <label className="text-sm font-medium">Nom d&apos;utilisateur</label>
            <input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="w-full rounded-md border px-3 py-2"
            />
            {field.state.meta.errors.map((error, i) => (
              <p key={i} className="text-sm text-red-500">{error}</p>
            ))}
          </div>
        )}
      />

      {/* Validation asynchrone avec debounce */}
      <form.Field
        name="email"
        validators={{
          onChangeAsyncDebounceMs: 500, // attend 500ms apres la derniere saisie
          onChangeAsync: async ({ value }) => {
            // Verification cote serveur
            const response = await fetch(
              \`/api/check-email?email=\${encodeURIComponent(value)}\`
            );
            const { available } = await response.json();

            if (!available) {
              return 'Cette adresse email est deja utilisee';
            }
            return undefined;
          },
        }}
        children={(field) => (
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="w-full rounded-md border px-3 py-2"
            />
            {field.state.meta.isValidating && (
              <p className="text-sm text-muted-foreground">Verification en cours...</p>
            )}
            {field.state.meta.errors.map((error, i) => (
              <p key={i} className="text-sm text-red-500">{error}</p>
            ))}
          </div>
        )}
      />

      {/* Validation au blur uniquement */}
      <form.Field
        name="password"
        validators={{
          onBlur: ({ value }) => {
            if (value.length < 8) return 'Minimum 8 caracteres';
            if (!/[A-Z]/.test(value)) return 'Au moins une majuscule requise';
            if (!/[0-9]/.test(value)) return 'Au moins un chiffre requis';
            return undefined;
          },
        }}
        children={(field) => (
          <div className="space-y-2">
            <label className="text-sm font-medium">Mot de passe</label>
            <input
              type="password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="w-full rounded-md border px-3 py-2"
            />
          </div>
        )}
      />
    </form>
  );
}`}
        language="tsx"
        filename="registration-validation.tsx"
        highlightLines={[21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 52, 53, 54, 55]}
        category="optimization"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Integration avec Zod
      </h3>

      <CodeBlock
        code={`import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';

// Schema Zod reutilisable (partage front/back)
const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caracteres'),
  email: z.string().email('Adresse email invalide'),
  subject: z.enum(['support', 'commercial', 'partenariat'], {
    errorMap: () => ({ message: 'Veuillez selectionner un sujet' }),
  }),
  message: z
    .string()
    .min(10, 'Le message doit contenir au moins 10 caracteres')
    .max(2000, 'Le message ne peut pas depasser 2000 caracteres'),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'Vous devez accepter les conditions' }),
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const form = useForm<ContactFormData>({
    defaultValues: {
      name: '',
      email: '',
      subject: 'support',
      message: '',
      acceptTerms: false as unknown as true,
    },
    validatorAdapter: zodValidator(),
    validators: {
      // Validation du formulaire entier avec Zod
      onChange: contactSchema,
    },
    onSubmit: async ({ value }) => {
      // value est de type ContactFormData
      await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(value),
      });
    },
  });

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}
      className="space-y-6"
    >
      <form.Field
        name="name"
        children={(field) => (
          <div className="space-y-1">
            <label className="text-sm font-medium">Nom complet</label>
            <input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-sm text-red-500">
                {field.state.meta.errors.join(', ')}
              </p>
            )}
          </div>
        )}
      />

      <form.Field
        name="message"
        children={(field) => (
          <div className="space-y-1">
            <label className="text-sm font-medium">Message</label>
            <textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              rows={5}
              className="w-full rounded-md border px-3 py-2 resize-none"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                {field.state.meta.errors.length > 0
                  ? field.state.meta.errors[0]
                  : ''}
              </span>
              <span>{field.state.value.length} / 2000</span>
            </div>
          </div>
        )}
      />

      <form.Subscribe
        selector={(s) => [s.canSubmit, s.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full py-2 rounded-md bg-primary text-primary-foreground"
          >
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
          </button>
        )}
      />
    </form>
  );
}`}
        language="tsx"
        filename="zod-integration.tsx"
        highlightLines={[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 32, 33, 34, 35]}
        category="optimization"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Validation cote serveur
      </h3>

      <CodeBlock
        code={`// --- Cote serveur : server action (Next.js App Router) ---
'use server';

import { z } from 'zod';

const orderSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive().max(100),
  shippingAddress: z.object({
    street: z.string().min(5),
    city: z.string().min(2),
    postalCode: z.string().regex(/^\\d{5}$/, 'Code postal invalide'),
    country: z.string().length(2),
  }),
});

export async function validateOrder(data: unknown) {
  const result = orderSchema.safeParse(data);

  if (!result.success) {
    // Retourne les erreurs formatees par champ
    return {
      success: false as const,
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Validations metier cote serveur
  const product = await db.product.findUnique({
    where: { id: result.data.productId },
  });

  if (!product) {
    return {
      success: false as const,
      errors: { productId: ['Produit introuvable'] },
    };
  }

  if (product.stock < result.data.quantity) {
    return {
      success: false as const,
      errors: {
        quantity: [\`Stock insuffisant. \${product.stock} unites disponibles.\`],
      },
    };
  }

  return { success: true as const, data: result.data };
}

// --- Cote client : integration avec TanStack Form ---
'use client';

import { useForm } from '@tanstack/react-form';
import { validateOrder } from './actions';

export function OrderForm({ productId }: { productId: string }) {
  const form = useForm({
    defaultValues: {
      productId,
      quantity: 1,
      shippingAddress: {
        street: '',
        city: '',
        postalCode: '',
        country: 'FR',
      },
    },
    onSubmit: async ({ value }) => {
      const result = await validateOrder(value);

      if (!result.success) {
        // Appliquer les erreurs serveur aux champs correspondants
        Object.entries(result.errors).forEach(([field, messages]) => {
          form.setFieldMeta(field as any, (prev) => ({
            ...prev,
            errors: messages ?? [],
          }));
        });
        return;
      }

      // Succes : redirection ou notification
      window.location.href = \`/orders/confirmation\`;
    },
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
      <form.Field
        name="quantity"
        validators={{
          onChange: ({ value }) =>
            value < 1 ? 'Quantite minimum : 1' : undefined,
        }}
        children={(field) => (
          <div>
            <label>Quantite</label>
            <input
              type="number"
              min={1}
              max={100}
              value={field.state.value}
              onChange={(e) => field.handleChange(Number(e.target.value))}
            />
            {field.state.meta.errors.map((err, i) => (
              <p key={i} className="text-red-500 text-sm">{err}</p>
            ))}
          </div>
        )}
      />
      {/* ...autres champs d'adresse */}
    </form>
  );
}`}
        language="tsx"
        filename="server-validation.tsx"
        highlightLines={[17, 18, 19, 20, 21, 22, 23, 24, 25, 72, 73, 74, 75, 76, 77, 78, 79]}
        category="optimization"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Comparaison : React Hook Form vs TanStack Form
      </h3>

      <ComparisonTable modes={formComparison} />
    </div>
  );
}
