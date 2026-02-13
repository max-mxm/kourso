import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function ComplexTypesSection() {
  return (
    <div className="space-y-8">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-foreground/80">
          Les schemas primitifs sont la base, mais les applications reelles manipulent
          des objets imbriques, des tableaux, des unions et des enumerations. Zod couvre
          tous ces cas avec une API coherente.
        </p>
      </div>

      <ConceptCard
        title="z.object() -- Le schema le plus utilise"
        description="Definit la structure d'un objet avec des proprietes typees. Chaque propriete est elle-meme un schema Zod."
        category="rendering"
      />

      <CodeBlock
        code={`import { z } from 'zod';

// Schema d'un utilisateur complet
const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().positive().optional(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    zipCode: z.string().regex(/^\\d{5}$/),
    country: z.string().default('FR'),
  }),
  tags: z.array(z.string()).default([]),
  createdAt: z.date(),
});

type User = z.infer<typeof UserSchema>;
// {
//   id: string;
//   name: string;
//   email: string;
//   age?: number | undefined;
//   address: { street: string; city: string; zipCode: string; country: string };
//   tags: string[];
//   createdAt: Date;
// }`}
        language="typescript"
        filename="object-schema.ts"
        highlightLines={[19]}
        category="rendering"
      />

      <ConceptCard
        title="z.array() -- Tableaux types"
        description="Valide chaque element d'un tableau avec le schema fourni. Methodes pour controler la taille."
        category="rendering"
      />

      <CodeBlock
        code={`// Tableau de strings
const tagsSchema = z.array(z.string());

// Contraintes sur le tableau
const itemsSchema = z.array(z.number())
  .nonempty('Au moins un element requis')  // [number, ...number[]]
  .min(2, 'Minimum 2 elements')
  .max(100, 'Maximum 100 elements');

// Tableau d'objets
const OrderSchema = z.object({
  id: z.string(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
    price: z.number().positive(),
  })).nonempty('La commande doit contenir au moins un article'),
  total: z.number().positive(),
});

// Tuples -- tableau avec types fixes par position
const CoordinatesSchema = z.tuple([
  z.number(),  // latitude
  z.number(),  // longitude
]);
// type : [number, number]

// Tuple avec rest element
const LogEntrySchema = z.tuple([
  z.date(),     // timestamp
  z.string(),   // level
]).rest(z.string()); // ...messages
// type : [Date, string, ...string[]]`}
        language="typescript"
        filename="array-tuple-schemas.ts"
        highlightLines={[6, 22, 23]}
        category="rendering"
      />

      <ConceptCard
        title="z.enum() et z.nativeEnum()"
        description="Deux approches pour valider des valeurs parmi un ensemble fini."
        category="rendering"
      />

      <CodeBlock
        code={`// z.enum() -- enumeration Zod (recommande)
const RoleSchema = z.enum(['admin', 'editor', 'viewer']);
type Role = z.infer<typeof RoleSchema>; // 'admin' | 'editor' | 'viewer'

// Acces aux valeurs
RoleSchema.options; // ['admin', 'editor', 'viewer']
RoleSchema.enum;    // { admin: 'admin', editor: 'editor', viewer: 'viewer' }

// z.nativeEnum() -- enum TypeScript existante
enum Status {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
}
const StatusSchema = z.nativeEnum(Status);
type StatusType = z.infer<typeof StatusSchema>; // Status

// Record -- objet avec cles dynamiques
const SettingsSchema = z.record(z.string(), z.boolean());
// type : Record<string, boolean>
// Valide : { darkMode: true, notifications: false }

// Record avec cle contrainte
const ScoresSchema = z.record(
  z.enum(['math', 'french', 'english']),
  z.number().min(0).max(20)
);
// type : Partial<Record<'math' | 'french' | 'english', number>>`}
        language="typescript"
        filename="enum-record-schemas.ts"
        highlightLines={[2, 16]}
        category="rendering"
      />

      <ConceptCard
        title="z.union() et z.discriminatedUnion()"
        description="Quand une donnee peut avoir plusieurs formes, les unions permettent de definir toutes les variantes acceptees."
        category="rendering"
      />

      <CodeBlock
        code={`// Union simple -- essaie chaque schema dans l'ordre
const StringOrNumberSchema = z.union([z.string(), z.number()]);
// Equivalent raccourci :
const shorthand = z.string().or(z.number());

// Discriminated union -- plus performante, utilise un champ discriminant
const EventSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('click'),
    x: z.number(),
    y: z.number(),
    target: z.string(),
  }),
  z.object({
    type: z.literal('keypress'),
    key: z.string(),
    modifiers: z.array(z.enum(['ctrl', 'shift', 'alt', 'meta'])),
  }),
  z.object({
    type: z.literal('scroll'),
    deltaX: z.number(),
    deltaY: z.number(),
  }),
]);

type Event = z.infer<typeof EventSchema>;
// { type: 'click'; x: number; y: number; target: string }
// | { type: 'keypress'; key: string; modifiers: ('ctrl' | 'shift' | 'alt' | 'meta')[] }
// | { type: 'scroll'; deltaX: number; deltaY: number }

// Avantage : Zod regarde d'abord le champ 'type'
// pour savoir quel schema appliquer -> beaucoup plus rapide`}
        language="typescript"
        filename="union-schemas.ts"
        highlightLines={[7, 31]}
        category="rendering"
      />

      <CodeBlock
        code={`// Intersection -- combiner deux schemas
const WithTimestamps = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
});

const PostSchema = z.object({
  title: z.string(),
  content: z.string(),
});

const PostWithTimestamps = z.intersection(PostSchema, WithTimestamps);
// Equivalent raccourci :
const shorthand = PostSchema.and(WithTimestamps);

type Post = z.infer<typeof PostWithTimestamps>;
// { title: string; content: string; createdAt: Date; updatedAt: Date }`}
        language="typescript"
        filename="intersection-schemas.ts"
        highlightLines={[12]}
        category="rendering"
      />
    </div>
  );
}
