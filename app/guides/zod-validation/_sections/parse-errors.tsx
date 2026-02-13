import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { Check, X } from 'lucide-react';

export default function ParseErrorsSection() {
  return (
    <div className="space-y-8">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-foreground/80">
          Zod offre deux strategies de parsing : <code>parse()</code> qui lance une exception
          en cas d&apos;erreur, et <code>safeParse()</code> qui retourne un objet resultat.
          Le choix entre les deux depend du contexte d&apos;utilisation.
        </p>
      </div>

      <ConceptCard
        title="parse() -- Fail fast"
        description="Lance une ZodError si les donnees sont invalides. Ideal quand les donnees doivent absolument etre valides."
        category="fundamentals"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span>Retourne directement la donnee typee</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span>Arrete l&apos;execution immediatement si invalide</span>
          </li>
          <li className="flex items-start gap-2">
            <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <span>Necessite un try/catch pour gerer l&apos;erreur</span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`import { z } from 'zod';

const UserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().positive(),
});

// parse() lance une exception si invalide
try {
  const user = UserSchema.parse({
    name: 'Jean Dupont',
    email: 'jean@example.com',
    age: 30,
  });
  // user est type : { name: string; email: string; age: number }
  console.log(user.name); // 'Jean Dupont'
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error(error.issues);
  }
}`}
        language="typescript"
        filename="parse-example.ts"
        highlightLines={[10, 18, 19]}
        category="fundamentals"
      />

      <ConceptCard
        title="safeParse() -- Gestion gracieuse"
        description="Retourne un objet { success, data } ou { success, error } sans lancer d'exception. Recommande pour les formulaires et API."
        category="fundamentals"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span>Pas besoin de try/catch</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span>Acces structure aux erreurs par champ</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span>Plus performant que try/catch en cas d&apos;echec frequent</span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`const result = UserSchema.safeParse({
  name: '',
  email: 'pas-un-email',
  age: -5,
});

if (result.success) {
  // result.data est type { name: string; email: string; age: number }
  console.log(result.data);
} else {
  // result.error est une ZodError
  console.log(result.error.issues);
  // [
  //   { code: 'too_small', minimum: 1, path: ['name'], message: '...' },
  //   { code: 'invalid_string', path: ['email'], message: 'Invalid email' },
  //   { code: 'too_small', minimum: 0, path: ['age'], message: '...' }
  // ]
}`}
        language="typescript"
        filename="safe-parse-example.ts"
        highlightLines={[7, 10]}
        category="fundamentals"
      />

      <ConceptCard
        title="Formater les erreurs"
        description="ZodError propose plusieurs methodes pour transformer les erreurs en formats exploitables."
        category="fundamentals"
      />

      <CodeBlock
        code={`const result = UserSchema.safeParse({ name: '', email: 'bad', age: -1 });

if (!result.success) {
  // flatten() -- ideal pour les formulaires
  const flat = result.error.flatten();
  // {
  //   formErrors: [],          // erreurs globales
  //   fieldErrors: {
  //     name: ['String must contain at least 1 character(s)'],
  //     email: ['Invalid email'],
  //     age: ['Number must be greater than 0'],
  //   }
  // }

  // format() -- structure imbriquee
  const formatted = result.error.format();
  // {
  //   name: { _errors: ['String must contain at least 1 character(s)'] },
  //   email: { _errors: ['Invalid email'] },
  //   age: { _errors: ['Number must be greater than 0'] },
  //   _errors: []
  // }

  // issues -- acces brut a chaque erreur
  result.error.issues.forEach((issue) => {
    console.log(\`\${issue.path.join('.')}: \${issue.message}\`);
  });
}`}
        language="typescript"
        filename="error-formatting.ts"
        highlightLines={[5, 17]}
        category="fundamentals"
      />

      <CodeBlock
        code={`// Messages d'erreur personnalises
const ContactSchema = z.object({
  name: z.string({
    required_error: 'Le nom est requis',
    invalid_type_error: 'Le nom doit etre une chaine',
  }).min(2, 'Le nom doit contenir au moins 2 caracteres'),

  email: z.string()
    .min(1, 'L\\'email est requis')
    .email('Format d\\'email invalide'),

  phone: z.string()
    .regex(/^\\+?[0-9]{10,14}$/, 'Numero de telephone invalide')
    .optional(),

  message: z.string()
    .min(10, 'Le message doit contenir au moins 10 caracteres')
    .max(1000, 'Le message ne peut pas depasser 1000 caracteres'),
});

// Chaque champ a des messages clairs et en francais
const result = ContactSchema.safeParse({
  name: 'J',
  email: 'pas-valide',
  message: 'Court',
});
// Erreurs :
// name: 'Le nom doit contenir au moins 2 caracteres'
// email: 'Format d\\'email invalide'
// message: 'Le message doit contenir au moins 10 caracteres'`}
        language="typescript"
        filename="custom-error-messages.ts"
        highlightLines={[3, 4, 5]}
        category="fundamentals"
      />

      <ConceptCard
        title="Erreurs explicites en console -- le vrai confort en dev"
        description="Contrairement aux erreurs generiques JavaScript, Zod structure chaque erreur avec le chemin exact, le type attendu vs recu, et votre message personnalise. En dev ou au build, on comprend immediatement d'ou vient le probleme."
        category="fundamentals"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>path</strong> : le chemin exact du champ en erreur (ex: [&apos;user&apos;, &apos;address&apos;, &apos;zipCode&apos;])</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>code</strong> : le type d&apos;erreur (invalid_type, too_small, invalid_string...)</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>expected / received</strong> : ce qui etait attendu vs ce qui a ete recu</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>message</strong> : votre message personnalise, configurable par champ ou globalement</span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// SANS ZOD : erreur generique, difficile a tracer
const user = apiResponse.data;
console.log(user.profile.email.toUpperCase());
// TypeError: Cannot read properties of undefined (reading 'toUpperCase')
// D'ou vient le probleme ? profile est null ? email est undefined ? Aucune idee.

// AVEC ZOD : erreur structuree, on comprend tout immediatement
const result = UserSchema.safeParse(apiResponse.data);
if (!result.success) {
  console.error(result.error.issues);
  // [
  //   {
  //     code: 'invalid_type',
  //     expected: 'string',
  //     received: 'number',
  //     path: ['profile', 'email'],
  //     message: 'Expected string, received number'
  //   },
  //   {
  //     code: 'too_small',
  //     minimum: 1,
  //     type: 'string',
  //     inclusive: true,
  //     path: ['name'],
  //     message: 'Le nom est requis'
  //   }
  // ]
  // On sait EXACTEMENT : quel champ, quelle regle, quel type attendu vs recu
}

// Personnaliser TOUS les messages globalement avec setErrorMap
import { z } from 'zod';

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  // Personnaliser les erreurs de type
  if (issue.code === z.ZodIssueCode.invalid_type) {
    return { message: \`Attendu \${issue.expected}, recu \${issue.received}\` };
  }
  // Personnaliser les erreurs de longueur
  if (issue.code === z.ZodIssueCode.too_small) {
    return { message: \`Minimum \${issue.minimum} caracteres requis\` };
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);
// Maintenant TOUTES les erreurs Zod utilisent vos messages personnalises`}
        language="typescript"
        filename="console-debug.ts"
        highlightLines={[8, 9, 10, 36, 46]}
        category="fundamentals"
      />

      <ConceptCard
        title="Double filet : erreurs UI + console"
        description="Couple avec React Hook Form, Zod offre un double avantage : l'utilisateur voit les erreurs dans l'interface, et le developpeur voit les details techniques en console. Le deuxieme argument de handleSubmit() est la pour ca."
        category="fundamentals"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Cote UI</strong> : zodResolver transforme les erreurs Zod en formState.errors pour l&apos;affichage</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Cote console</strong> : handleSubmit(onValid, onInvalid) -- le 2e argument recoit les erreurs structurees</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>En dev</strong> : chaque erreur inclut message, type et ref vers l&apos;element DOM concerne</span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// Pattern "double filet" : erreurs UI + console
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().min(1, 'L\\'email est requis').email('Email invalide'),
  password: z.string().min(8, 'Minimum 8 caracteres'),
});

type LoginForm = z.infer<typeof LoginSchema>;

export function LoginFormComponent() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  // Callback quand le formulaire est VALIDE
  function onValid(data: LoginForm) {
    console.log('Donnees validees :', data);
  }

  // Callback quand le formulaire est INVALIDE
  // -> handleSubmit accepte un 2e argument pour capturer les erreurs
  function onInvalid(errors: Record<string, unknown>) {
    console.error('Erreurs de validation :', errors);
    // Console affiche :
    // {
    //   email: { message: 'Email invalide', type: 'invalid_string', ref: input#email },
    //   password: { message: 'Minimum 8 caracteres', type: 'too_small', ref: input#password }
    // }
    // -> On voit le message, le type d'erreur Zod, et la reference DOM
  }

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <div>
        <input {...register('email')} placeholder="Email" />
        {/* L'utilisateur voit l'erreur dans l'UI */}
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <input {...register('password')} type="password" placeholder="Mot de passe" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <button type="submit">Se connecter</button>
    </form>
  );
  // Resultat : l'utilisateur voit "Email invalide" dans le formulaire
  // ET le developpeur voit la structure complete dans la console du navigateur
}`}
        language="tsx"
        filename="rhf-double-filet.tsx"
        highlightLines={[25, 26, 36]}
        category="fundamentals"
      />

      <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8">
        <h3 className="text-lg font-bold mb-4">Quand utiliser parse vs safeParse ?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">parse() est adapte pour :</h4>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>Validation au demarrage (env vars)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>Donnees internes de confiance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>Scripts et migrations</span>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">safeParse() est adapte pour :</h4>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span>Formulaires utilisateur</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span>API endpoints (requetes entrantes)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span>Reponses d&apos;API externes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
