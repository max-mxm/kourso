import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function AdvancedPatternsSection() {
  return (
    <div className="space-y-8">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-foreground/80">
          Zod va bien au-dela de la validation basique. Schemas recursifs, branded types,
          generiques et schemas custom permettent de modeliser des structures de donnees
          complexes tout en gardant la type-safety.
        </p>
      </div>

      <ConceptCard
        title="z.lazy() -- Schemas recursifs"
        description="Pour les structures de donnees qui se referent a elles-memes : arbres, menus imbriques, commentaires avec reponses."
        category="advanced"
      />

      <CodeBlock
        code={`import { z } from 'zod';

// Arbre de fichiers recursif
type FileNode = {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
};

const FileNodeSchema: z.ZodType<FileNode> = z.object({
  name: z.string().min(1),
  type: z.enum(['file', 'folder']),
  children: z.lazy(() => z.array(FileNodeSchema)).optional(),
});

// Valide une arborescence complete
FileNodeSchema.parse({
  name: 'src',
  type: 'folder',
  children: [
    { name: 'index.ts', type: 'file' },
    {
      name: 'components',
      type: 'folder',
      children: [
        { name: 'Button.tsx', type: 'file' },
        { name: 'Card.tsx', type: 'file' },
      ],
    },
  ],
});`}
        language="typescript"
        filename="recursive-schema.ts"
        highlightLines={[10, 13]}
        category="advanced"
      />

      <CodeBlock
        code={`// Commentaires avec reponses imbriquees
type Comment = {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  replies: Comment[];
};

const CommentSchema: z.ZodType<Comment> = z.object({
  id: z.string().uuid(),
  author: z.string().min(1),
  content: z.string().min(1),
  createdAt: z.string().datetime(),
  replies: z.lazy(() => z.array(CommentSchema)),
});

// Menu de navigation recursif
type MenuItem = {
  label: string;
  href?: string;
  children?: MenuItem[];
};

const MenuItemSchema: z.ZodType<MenuItem> = z.object({
  label: z.string(),
  href: z.string().url().optional(),
  children: z.lazy(() => z.array(MenuItemSchema)).optional(),
});`}
        language="typescript"
        filename="recursive-comments-menu.ts"
        highlightLines={[15, 28]}
        category="advanced"
      />

      <ConceptCard
        title="z.brand() -- Branded types"
        description="Creer des types nominaux pour distinguer des valeurs qui ont le meme type structurel mais des semantiques differentes."
        category="advanced"
      />

      <CodeBlock
        code={`// Sans branded types : rien n'empeche de melanger les IDs
function getUser(id: string) { /* ... */ }
function getPost(id: string) { /* ... */ }

getUser(postId);  // Pas d'erreur TypeScript, mais bug logique !

// Avec branded types : erreur a la compilation
const UserIdSchema = z.string().uuid().brand<'UserId'>();
const PostIdSchema = z.string().uuid().brand<'PostId'>();

type UserId = z.infer<typeof UserIdSchema>; // string & { __brand: 'UserId' }
type PostId = z.infer<typeof PostIdSchema>; // string & { __brand: 'PostId' }

function getUserSafe(id: UserId) { /* ... */ }
function getPostSafe(id: PostId) { /* ... */ }

const userId = UserIdSchema.parse('550e8400-e29b-41d4-a716-446655440000');
const postId = PostIdSchema.parse('660e8400-e29b-41d4-a716-446655440001');

getUserSafe(userId); // OK
getUserSafe(postId); // Erreur TypeScript !
// Argument of type 'string & Brand<"PostId">'
// is not assignable to parameter of type 'string & Brand<"UserId">'

// Autres exemples utiles
const EmailSchema = z.string().email().brand<'Email'>();
const MoneySchema = z.number().positive().brand<'Money'>();
const UrlSchema = z.string().url().brand<'SafeUrl'>();`}
        language="typescript"
        filename="branded-types.ts"
        highlightLines={[8, 9, 21, 22]}
        category="advanced"
      />

      <ConceptCard
        title="Schemas generiques (factory pattern)"
        description="Creer des fonctions qui retournent des schemas parametres pour eviter la repetition."
        category="advanced"
      />

      <CodeBlock
        code={`// Schema factory : reponse paginee generique
function paginatedResponse<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    data: z.array(itemSchema),
    meta: z.object({
      page: z.number().int().positive(),
      limit: z.number().int().positive(),
      total: z.number().int().nonnegative(),
      totalPages: z.number().int().nonnegative(),
    }),
  });
}

// Utilisation
const UserSchema = z.object({ id: z.string(), name: z.string() });
const PaginatedUsersSchema = paginatedResponse(UserSchema);

type PaginatedUsers = z.infer<typeof PaginatedUsersSchema>;
// { data: { id: string; name: string }[]; meta: { page: number; ... } }

// Schema factory : reponse API generique
function apiResponse<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.discriminatedUnion('status', [
    z.object({
      status: z.literal('success'),
      data: dataSchema,
    }),
    z.object({
      status: z.literal('error'),
      error: z.object({
        code: z.string(),
        message: z.string(),
        details: z.unknown().optional(),
      }),
    }),
  ]);
}

const UserResponseSchema = apiResponse(UserSchema);
type UserResponse = z.infer<typeof UserResponseSchema>;
// { status: 'success'; data: { id: string; name: string } }
// | { status: 'error'; error: { code: string; message: string; ... } }`}
        language="typescript"
        filename="schema-factory.ts"
        highlightLines={[2, 22, 23]}
        category="advanced"
      />

      <ConceptCard
        title="z.custom() et preprocess"
        description="Pour les cas ou les schemas natifs de Zod ne suffisent pas."
        category="advanced"
      />

      <CodeBlock
        code={`// z.custom() -- validation entierement custom
const FileSchema = z.custom<File>(
  (val) => val instanceof File,
  { message: 'Un fichier est requis' }
);

// Schema avec validation custom complexe
const ImageFileSchema = z.custom<File>(
  (val) => {
    if (!(val instanceof File)) return false;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(val.type)) return false;
    if (val.size > 5 * 1024 * 1024) return false; // 5 MB max
    return true;
  },
  { message: 'Image JPEG, PNG ou WebP de 5 MB maximum' }
);

// z.preprocess() -- transformer AVANT la validation
const FlexibleNumberSchema = z.preprocess(
  (val) => {
    if (typeof val === 'string') return Number(val);
    return val;
  },
  z.number().positive()
);

FlexibleNumberSchema.parse('42');   // 42
FlexibleNumberSchema.parse(42);     // 42
FlexibleNumberSchema.parse('abc');  // ZodError (NaN n'est pas positif)

// Discriminated union pour state machine
const TaskStateSchema = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('idle'),
  }),
  z.object({
    status: z.literal('loading'),
    startedAt: z.date(),
  }),
  z.object({
    status: z.literal('success'),
    data: z.unknown(),
    completedAt: z.date(),
  }),
  z.object({
    status: z.literal('error'),
    error: z.string(),
    failedAt: z.date(),
    retryCount: z.number().int().nonnegative(),
  }),
]);

type TaskState = z.infer<typeof TaskStateSchema>;
// Union discriminee sur 'status' -- TypeScript narrowe automatiquement`}
        language="typescript"
        filename="custom-preprocess.ts"
        highlightLines={[2, 19, 32]}
        category="advanced"
      />
    </div>
  );
}
