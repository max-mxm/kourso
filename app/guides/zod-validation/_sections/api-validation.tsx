import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { Check, AlertTriangle } from 'lucide-react';

export default function ApiValidationSection() {
  return (
    <div className="space-y-8">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-foreground/80">
          Les APIs sont une frontiere de confiance. Que vous receviez des requetes ou consommiez
          des APIs externes, les donnees doivent etre validees. Zod s&apos;integre naturellement
          dans les Route Handlers Next.js et avec tRPC pour une validation de bout en bout.
        </p>
      </div>

      <ConceptCard
        title="Valider les requetes entrantes"
        description="Chaque Route Handler devrait valider le body, les query params et les headers avant de les utiliser."
        category="best-practices"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <span>Le body d&apos;une requete est toujours <code>unknown</code> en realite</span>
          </li>
          <li className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <span>Les query params sont toujours des strings</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span>safeParse retourne des erreurs structurees pour une reponse 400 propre</span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// app/api/users/route.ts -- Next.js Route Handler
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(['admin', 'editor', 'viewer']).default('viewer'),
});

export async function POST(request: NextRequest) {
  // 1. Parser le body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Body JSON invalide' },
      { status: 400 },
    );
  }

  // 2. Valider avec Zod
  const result = CreateUserSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Donnees invalides',
        details: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  // 3. Utiliser les donnees validees
  const user = await db.user.create({ data: result.data });

  return NextResponse.json(user, { status: 201 });
}`}
        language="typescript"
        filename="app/api/users/route.ts"
        highlightLines={[24, 36]}
        category="best-practices"
      />

      <CodeBlock
        code={`// Valider les query params
// GET /api/users?page=2&limit=50&role=admin

const QueryParamsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  role: z.enum(['admin', 'editor', 'viewer']).optional(),
  search: z.string().optional(),
});

export async function GET(request: NextRequest) {
  const searchParams = Object.fromEntries(request.nextUrl.searchParams);
  const result = QueryParamsSchema.safeParse(searchParams);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Parametres invalides', details: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { page, limit, role, search } = result.data;
  // page: number, limit: number, role?: string, search?: string
  // Les strings ont ete converties en nombres grace a z.coerce

  const users = await db.user.findMany({
    where: {
      ...(role && { role }),
      ...(search && { name: { contains: search } }),
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  return NextResponse.json({ data: users, page, limit });
}`}
        language="typescript"
        filename="api-query-params.ts"
        highlightLines={[4, 12, 13]}
        category="best-practices"
      />

      <ConceptCard
        title="Valider les reponses d'API externes"
        description="Ne jamais faire confiance aux donnees d'une API que vous ne controlez pas. Validez les reponses comme vous validez les inputs utilisateur."
        category="best-practices"
      />

      <CodeBlock
        code={`// Valider les reponses d'API externes
const GitHubUserSchema = z.object({
  id: z.number(),
  login: z.string(),
  avatar_url: z.string().url(),
  html_url: z.string().url(),
  name: z.string().nullable(),
  bio: z.string().nullable(),
  public_repos: z.number(),
});

type GitHubUser = z.infer<typeof GitHubUserSchema>;

async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(\`https://api.github.com/users/\${username}\`);

  if (!response.ok) {
    throw new Error(\`GitHub API error: \${response.status}\`);
  }

  const data = await response.json();

  // Valider la reponse -- si GitHub change son API, on le sait immediatement
  return GitHubUserSchema.parse(data);
}

// Variante avec safeParse pour une gestion plus fine
async function fetchGitHubUserSafe(username: string) {
  const response = await fetch(\`https://api.github.com/users/\${username}\`);
  const data = await response.json();
  const result = GitHubUserSchema.safeParse(data);

  if (!result.success) {
    console.error('API GitHub a change son format:', result.error.issues);
    // Alerter, logger, fallback...
    return null;
  }

  return result.data;
}`}
        language="typescript"
        filename="validate-external-api.ts"
        highlightLines={[24, 32, 33, 34]}
        category="best-practices"
      />

      <CodeBlock
        code={`// Integration tRPC -- validation de bout en bout
import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

const appRouter = t.router({
  // Input valide automatiquement par Zod
  getUser: t.procedure
    .input(z.object({
      id: z.string().uuid(),
    }))
    .query(async ({ input }) => {
      // input.id est type string (garanti uuid)
      const user = await db.user.findUnique({ where: { id: input.id } });
      return user;
    }),

  createUser: t.procedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
      role: z.enum(['admin', 'editor', 'viewer']).default('viewer'),
    }))
    .mutation(async ({ input }) => {
      // input est valide et type automatiquement
      return await db.user.create({ data: input });
    }),
});

// Cote client, les types sont inferes automatiquement
// trpc.getUser.useQuery({ id: '...' })
// trpc.createUser.useMutation()`}
        language="typescript"
        filename="trpc-integration.ts"
        highlightLines={[10, 11, 12, 20, 21, 22, 23]}
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
            , la validation des objets API avec Zod a ete un changement majeur. Avant, les erreurs
            liees a des donnees mal formees apparaissaient en production, souvent dans des endroits
            eloignes de la source du probleme. Avec Zod, chaque reponse d&apos;API externe est validee
            des la reception. Quand un format change, l&apos;erreur est immediate et precise, ce qui
            a drastiquement reduit le temps de diagnostic.
          </p>
        </div>
      </div>
    </div>
  );
}
