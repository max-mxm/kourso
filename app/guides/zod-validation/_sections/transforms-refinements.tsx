import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function TransformsRefinementsSection() {
  return (
    <div className="space-y-8">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-foreground/80">
          Au-dela de la validation, Zod peut transformer les donnees pendant le parsing
          et ajouter des regles de validation custom. C&apos;est ce qui en fait bien plus
          qu&apos;un simple validateur.
        </p>
      </div>

      <ConceptCard
        title=".transform() -- Modifier la sortie"
        description="Applique une fonction de transformation apres la validation. Le type de sortie peut differer du type d'entree."
        category="rendering"
      />

      <CodeBlock
        code={`import { z } from 'zod';

// Transformer une string en nombre
const NumericStringSchema = z.string()
  .transform((val) => parseInt(val, 10));
// Input : string -> Output : number

NumericStringSchema.parse('42');   // 42 (number)
NumericStringSchema.parse('abc');  // NaN (attention !)

// Transformer et valider le resultat avec pipe
const SafeNumericSchema = z.string()
  .transform((val) => parseInt(val, 10))
  .pipe(z.number().int().positive());
// Input : string -> parse int -> verifie que c'est un entier positif

SafeNumericSchema.parse('42');   // 42
SafeNumericSchema.parse('abc');  // ZodError (NaN n'est pas un entier positif)
SafeNumericSchema.parse('-5');   // ZodError (pas positif)`}
        language="typescript"
        filename="transform-basic.ts"
        highlightLines={[12, 13, 14]}
        category="rendering"
      />

      <CodeBlock
        code={`// z.coerce -- coercion automatique (plus simple que transform)
const CoercedNumber = z.coerce.number();
CoercedNumber.parse('42');     // 42
CoercedNumber.parse(true);     // 1

const CoercedDate = z.coerce.date();
CoercedDate.parse('2024-01-15');         // Date object
CoercedDate.parse(1705276800000);        // Date object (timestamp)

const CoercedBoolean = z.coerce.boolean();
CoercedBoolean.parse('true');   // true
CoercedBoolean.parse('');       // false
CoercedBoolean.parse(0);       // false
CoercedBoolean.parse(1);       // true

// Cas d'usage frequent : query parameters (toujours des strings)
const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.enum(['asc', 'desc']).default('desc'),
});

// URL : ?page=2&limit=50&sort=asc
PaginationSchema.parse({ page: '2', limit: '50', sort: 'asc' });
// { page: 2, limit: 50, sort: 'asc' } -- strings converties en nombres`}
        language="typescript"
        filename="coercion.ts"
        highlightLines={[17, 18, 19, 20]}
        category="rendering"
      />

      <ConceptCard
        title="Transforms avances"
        description="Les transforms peuvent normaliser, formatter ou enrichir les donnees validees."
        category="rendering"
      />

      <CodeBlock
        code={`// Normaliser un slug
const SlugSchema = z.string()
  .trim()
  .toLowerCase()
  .transform((val) => val.replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, ''));

SlugSchema.parse('  Mon Article ! '); // 'mon-article-'

// Transformer un objet complet
const CreateOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
    unitPrice: z.number().positive(),
  })),
  couponCode: z.string().optional(),
}).transform((order) => ({
  ...order,
  itemCount: order.items.length,
  subtotal: order.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
  hasCoupon: !!order.couponCode,
}));

type CreateOrderInput = z.input<typeof CreateOrderSchema>;
// { items: [...]; couponCode?: string }

type CreateOrderOutput = z.output<typeof CreateOrderSchema>;
// { items: [...]; couponCode?: string; itemCount: number; subtotal: number; hasCoupon: boolean }

// z.input vs z.infer (= z.output)
// z.input  = type AVANT transform
// z.infer  = type APRES transform (= z.output)`}
        language="typescript"
        filename="transforms-advanced.ts"
        highlightLines={[17, 23, 26]}
        category="rendering"
      />

      <ConceptCard
        title=".refine() -- Validation custom"
        description="Ajouter des regles de validation qui ne peuvent pas etre exprimees avec les methodes internes de Zod."
        category="rendering"
      />

      <CodeBlock
        code={`// Refine simple avec predicat
const NonEmptyArraySchema = z.array(z.string())
  .refine((arr) => arr.length > 0, {
    message: 'Le tableau ne doit pas etre vide',
  });

// Validation cross-field : mots de passe
const PasswordFormSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'], // Erreur attachee au champ confirmPassword
});

// Validation cross-field : dates coherentes
const DateRangeSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
}).refine((data) => data.endDate > data.startDate, {
  message: 'La date de fin doit etre apres la date de debut',
  path: ['endDate'],
});

// Refine async -- validation avec appel externe
const UniqueEmailSchema = z.string().email()
  .refine(async (email) => {
    const exists = await checkEmailExists(email);
    return !exists;
  }, {
    message: 'Cet email est deja utilise',
  });

// Utiliser avec parseAsync
await UniqueEmailSchema.parseAsync('jean@example.com');`}
        language="typescript"
        filename="refine-examples.ts"
        highlightLines={[11, 12, 13, 27, 28]}
        category="rendering"
      />

      <ConceptCard
        title=".superRefine() -- Validation avancee"
        description="Contrairement a refine(), superRefine() donne acces au contexte complet et permet d'ajouter plusieurs erreurs."
        category="rendering"
      />

      <CodeBlock
        code={`// superRefine -- plusieurs erreurs a la fois
const StrongPasswordSchema = z.string().superRefine((val, ctx) => {
  if (val.length < 8) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_small,
      minimum: 8,
      type: 'string',
      inclusive: true,
      message: 'Le mot de passe doit contenir au moins 8 caracteres',
    });
  }
  if (!/[A-Z]/.test(val)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Le mot de passe doit contenir au moins une majuscule',
    });
  }
  if (!/[0-9]/.test(val)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Le mot de passe doit contenir au moins un chiffre',
    });
  }
  if (!/[^a-zA-Z0-9]/.test(val)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Le mot de passe doit contenir au moins un caractere special',
    });
  }
});

// Toutes les regles non respectees sont retournees d'un coup
const result = StrongPasswordSchema.safeParse('abc');
// 4 erreurs simultanees au lieu d'une seule`}
        language="typescript"
        filename="superrefine-example.ts"
        highlightLines={[2, 32, 33]}
        category="rendering"
      />

      <CodeBlock
        code={`// pipe() -- chainer des schemas
// Utile pour separer validation et transformation
const DateStringSchema = z.string()
  .datetime()                    // 1. Valide que c'est un ISO datetime
  .pipe(z.coerce.date())         // 2. Convertit en Date
  .pipe(z.date().min(            // 3. Verifie que la date est dans le futur
    new Date(),
    'La date doit etre dans le futur'
  ));

// Chaque etape du pipe est independante et reutilisable
const ISODateTimeSchema = z.string().datetime();
const FutureDateSchema = z.date().min(new Date());

// Equivalent compose
const ComposedSchema = ISODateTimeSchema
  .pipe(z.coerce.date())
  .pipe(FutureDateSchema);`}
        language="typescript"
        filename="pipe-example.ts"
        highlightLines={[3, 4, 5, 6]}
        category="rendering"
      />
    </div>
  );
}
