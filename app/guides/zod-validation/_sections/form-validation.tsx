import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { Check } from 'lucide-react';

export default function FormValidationSection() {
  return (
    <div className="space-y-8">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-foreground/80">
          La validation de formulaires est l&apos;un des cas d&apos;usage les plus courants de Zod.
          Combine avec React Hook Form et le resolver Zod, vous obtenez une validation
          type-safe, reactive et avec des messages d&apos;erreur granulaires -- le tout sans
          ecrire de logique de validation manuelle.
        </p>
      </div>

      <ConceptCard
        title="React Hook Form + zodResolver"
        description="Le combo le plus utilise pour la validation de formulaires React. Le schema Zod sert a la fois de source de validation et de type."
        category="best-practices"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Un schema = validation + types</strong> : pas de duplication</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Validation reactive</strong> : sur blur, change ou submit</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Erreurs par champ</strong> : messages specifiques a chaque input</span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// npm install react-hook-form @hookform/resolvers zod

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 1. Definir le schema
const ContactFormSchema = z.object({
  name: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caracteres')
    .max(50, 'Le nom ne peut pas depasser 50 caracteres'),
  email: z.string()
    .min(1, 'L\\'email est requis')
    .email('Format d\\'email invalide'),
  subject: z.enum(['general', 'support', 'partnership'], {
    errorMap: () => ({ message: 'Veuillez selectionner un sujet' }),
  }),
  message: z.string()
    .min(10, 'Le message doit contenir au moins 10 caracteres')
    .max(1000, 'Maximum 1000 caracteres'),
  newsletter: z.boolean().default(false),
});

// 2. Inferer le type
type ContactForm = z.infer<typeof ContactFormSchema>;

// 3. Utiliser dans le composant
export function ContactFormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      newsletter: false,
    },
  });

  const onSubmit = async (data: ContactForm) => {
    // data est garanti valide et type
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('name')} placeholder="Votre nom" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <input {...register('email')} placeholder="Votre email" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <select {...register('subject')}>
          <option value="">Choisir un sujet</option>
          <option value="general">General</option>
          <option value="support">Support</option>
          <option value="partnership">Partenariat</option>
        </select>
        {errors.subject && <p className="text-red-500">{errors.subject.message}</p>}
      </div>

      <div>
        <textarea {...register('message')} placeholder="Votre message" />
        {errors.message && <p className="text-red-500">{errors.message.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Envoi...' : 'Envoyer'}
      </button>
    </form>
  );
}`}
        language="tsx"
        filename="contact-form.tsx"
        highlightLines={[34, 35]}
        category="best-practices"
      />

      <ConceptCard
        title="Formulaire d'inscription avec validation cross-field"
        description="Cas classique : verification que le mot de passe et sa confirmation correspondent."
        category="best-practices"
      />

      <CodeBlock
        code={`const SignupSchema = z.object({
  username: z.string()
    .min(3, 'Minimum 3 caracteres')
    .max(20, 'Maximum 20 caracteres')
    .regex(/^[a-zA-Z0-9_]+$/, 'Lettres, chiffres et underscores uniquement'),
  email: z.string().email('Email invalide'),
  password: z.string()
    .min(8, 'Minimum 8 caracteres')
    .regex(/[A-Z]/, 'Au moins une majuscule')
    .regex(/[0-9]/, 'Au moins un chiffre'),
  confirmPassword: z.string(),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'Vous devez accepter les conditions' }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

// Le type infere inclut tous les champs
type SignupForm = z.infer<typeof SignupSchema>;

// Dans le composant :
const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>({
  resolver: zodResolver(SignupSchema),
  mode: 'onBlur', // Valider quand l'utilisateur quitte le champ
});

// errors.confirmPassword?.message affiche :
// "Les mots de passe ne correspondent pas"
// grace au path: ['confirmPassword'] dans le refine`}
        language="typescript"
        filename="signup-form-schema.ts"
        highlightLines={[15, 16, 17, 26]}
        category="best-practices"
      />

      <CodeBlock
        code={`// Formulaire dynamique avec useFieldArray
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const InvoiceSchema = z.object({
  client: z.string().min(1, 'Client requis'),
  items: z.array(z.object({
    description: z.string().min(1, 'Description requise'),
    quantity: z.number().int().positive('Quantite positive'),
    unitPrice: z.number().positive('Prix positif'),
  })).min(1, 'Au moins un article'),
  notes: z.string().optional(),
});

type Invoice = z.infer<typeof InvoiceSchema>;

export function InvoiceForm() {
  const { register, control, handleSubmit, formState: { errors } } = useForm<Invoice>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      items: [{ description: '', quantity: 1, unitPrice: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register('client')} placeholder="Nom du client" />
      {errors.client && <p>{errors.client.message}</p>}

      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(\`items.\${index}.description\`)} />
          <input {...register(\`items.\${index}.quantity\`, { valueAsNumber: true })} type="number" />
          <input {...register(\`items.\${index}.unitPrice\`, { valueAsNumber: true })} type="number" />
          <button type="button" onClick={() => remove(index)}>Supprimer</button>
          {errors.items?.[index]?.description && (
            <p>{errors.items[index].description.message}</p>
          )}
        </div>
      ))}

      <button type="button" onClick={() => append({ description: '', quantity: 1, unitPrice: 0 })}>
        Ajouter un article
      </button>
      <button type="submit">Creer la facture</button>
    </form>
  );
}`}
        language="tsx"
        filename="invoice-form.tsx"
        highlightLines={[8, 27, 28, 29]}
        category="best-practices"
      />

      <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8">
        <h3 className="text-lg font-bold mb-4">Retour d&apos;experience -- Scanorr</h3>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-sm text-foreground/80 leading-relaxed">
            Sur{' '}
            <a href="https://scanorr.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
              Scanorr
            </a>
            , j&apos;utilise ce pattern Zod + React Hook Form pour tous les formulaires de saisie.
            Le gain principal : les messages d&apos;erreur sont definis une seule fois dans le schema,
            et ils sont automatiquement affiches au bon endroit dans le formulaire. Quand le
            schema change (par exemple, ajout d&apos;un champ obligatoire), TypeScript signale
            immediatement tous les endroits a mettre a jour. Ce pattern a considerablement
            reduit les bugs lies aux formulaires.
          </p>
        </div>
      </div>
    </div>
  );
}
