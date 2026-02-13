import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function PrimitiveSchemasSection() {
  return (
    <div className="space-y-8">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-foreground/80">
          Zod fournit des schemas pour tous les types primitifs TypeScript, chacun avec
          des methodes de validation chainables. C&apos;est la base sur laquelle tout le reste
          est construit.
        </p>
      </div>

      <ConceptCard
        title="Types primitifs"
        description="Chaque type TypeScript a son equivalent Zod. Le schema valide la donnee et infere le type correspondant."
        category="fundamentals"
      />

      <CodeBlock
        code={`import { z } from 'zod';

// Types de base
const stringSchema = z.string();    // string
const numberSchema = z.number();    // number
const boolSchema = z.boolean();     // boolean
const dateSchema = z.date();        // Date
const bigintSchema = z.bigint();    // bigint

// Types speciaux
const undefinedSchema = z.undefined(); // undefined
const nullSchema = z.null();           // null
const voidSchema = z.void();           // void
const anySchema = z.any();             // any (a eviter)
const unknownSchema = z.unknown();     // unknown (prefere a any)
const neverSchema = z.never();         // never

// Litteraux
const tealSchema = z.literal('teal');         // 'teal'
const fortyTwoSchema = z.literal(42);         // 42
const trueSchema = z.literal(true);           // true`}
        language="typescript"
        filename="types-primitifs.ts"
        category="fundamentals"
      />

      <ConceptCard
        title="Validateurs de chaines"
        description="z.string() accepte des dizaines de methodes chainables pour valider le format, la longueur et le contenu."
        category="fundamentals"
      />

      <CodeBlock
        code={`const emailSchema = z.string().email('Email invalide');
const urlSchema = z.string().url('URL invalide');
const uuidSchema = z.string().uuid('UUID invalide');

// Longueur
const usernameSchema = z.string()
  .min(3, 'Minimum 3 caracteres')
  .max(20, 'Maximum 20 caracteres');

// Regex
const slugSchema = z.string()
  .regex(/^[a-z0-9-]+$/, 'Slug invalide : lettres minuscules, chiffres et tirets uniquement');

// Transformations de chaines
const normalizedEmail = z.string()
  .email()
  .trim()
  .toLowerCase();

// Formats courants
const ipSchema = z.string().ip();           // IPv4 ou IPv6
const cidrSchema = z.string().cidr();       // Notation CIDR
const emojiSchema = z.string().emoji();     // Emojis uniquement
const datetimeSchema = z.string().datetime(); // ISO 8601
const nanoidSchema = z.string().nanoid();   // Nanoid`}
        language="typescript"
        filename="validateurs-string.ts"
        highlightLines={[16, 17, 18]}
        category="fundamentals"
      />

      <ConceptCard
        title="Validateurs de nombres"
        description="z.number() offre des contraintes numeriques precises pour valider intervalles, entiers et proprietes mathematiques."
        category="fundamentals"
      />

      <CodeBlock
        code={`// Contraintes numeriques
const ageSchema = z.number()
  .int('L\\'age doit etre un entier')
  .min(0, 'L\\'age doit etre positif')
  .max(150, 'Age invalide');

const priceSchema = z.number()
  .positive('Le prix doit etre positif')
  .multipleOf(0.01, 'Maximum 2 decimales');

const temperatureSchema = z.number()
  .gte(-273.15, 'Impossible : en dessous du zero absolu')
  .finite();

// Raccourcis utiles
z.number().positive();    // > 0
z.number().nonnegative(); // >= 0
z.number().negative();    // < 0
z.number().nonpositive(); // <= 0
z.number().int();         // entier
z.number().finite();      // pas Infinity
z.number().safe();        // dans Number.MIN_SAFE_INTEGER..MAX_SAFE_INTEGER`}
        language="typescript"
        filename="validateurs-number.ts"
        category="fundamentals"
      />

      <ConceptCard
        title="Optionnel, nullable et valeurs par defaut"
        description="Trois methodes pour gerer l'absence de valeur, chacune avec un comportement distinct."
        category="fundamentals"
      />

      <CodeBlock
        code={`const schema = z.object({
  // Requis : doit etre present et non-null
  name: z.string(),

  // Optionnel : string | undefined
  bio: z.string().optional(),

  // Nullable : string | null
  avatar: z.string().url().nullable(),

  // Nullish : string | null | undefined
  nickname: z.string().nullish(),

  // Valeur par defaut : si absent, utilise la valeur fournie
  role: z.enum(['admin', 'user', 'viewer']).default('viewer'),

  // Optionnel avec defaut : toujours present dans le resultat
  notifications: z.boolean().default(true),
});

type Profile = z.infer<typeof schema>;
// {
//   name: string;
//   bio?: string | undefined;
//   avatar: string | null;
//   nickname?: string | null | undefined;
//   role: 'admin' | 'user' | 'viewer';       // jamais undefined grace a default
//   notifications: boolean;                    // jamais undefined grace a default
// }`}
        language="typescript"
        filename="optionnel-nullable-default.ts"
        highlightLines={[15, 18]}
        category="fundamentals"
      />
    </div>
  );
}
