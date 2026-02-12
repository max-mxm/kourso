'use client';

import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';
import { Check, X } from 'lucide-react';

export function AdvancedPatternsSection() {
  const optimisticUpdatesModes = [
    {
      name: 'Optimistic Updates',
      description: 'UI mise à jour instantanément, rollback si erreur',
      pros: ['Feedback immédiat', 'Meilleure UX', 'Pas de spinner'],
      cons: ['Complexité accrue', 'Gestion rollback', 'Pas pour tout'],
      useCases: ['Likes/votes', 'Todos', 'Comments', 'Favoris'],
      color: 'rgb(34, 197, 94)'
    },
    {
      name: 'Server Mutations Classiques',
      description: 'Attendre la réponse serveur avant mise à jour UI',
      pros: ['Simple', 'Fiable', 'Pas de rollback'],
      cons: ['Spinner visible', 'Latence perceptible', 'UX dégradée'],
      useCases: ['Paiements', 'Mutations critiques', 'Opérations irréversibles'],
      color: 'rgb(239, 68, 68)'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Les patterns avancés de Next.js permettent de créer des expériences utilisateur
          exceptionnelles grâce au streaming, aux parallel routes, au middleware edge,
          aux optimistic updates, au real-time et à l'internationalisation.
        </p>
      </div>

      {/* Pattern 1: Streaming avec Suspense */}
      <ConceptCard
        title="1. Streaming avec Suspense"
        description="Afficher progressivement le contenu au fur et à mesure de son chargement plutôt que d'attendre tout le contenu. Améliore le Time to First Byte (TTFB) et l'expérience utilisateur."
        category="advanced"
      >
        <div className="space-y-6">
          {/* Exemple de base */}
          <div>
            <h4 className="font-bold text-foreground mb-3">Exemple de Base : Suspense Multi-level</h4>
            <CodeBlock
              code={`import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <div>
      {/* Header s'affiche immédiatement */}
      <h1>Dashboard</h1>

      {/* Suspense Level 1 : Stats principales */}
      <Suspense fallback={<StatsSkeleton />}>
        <ExpensiveStats /> {/* Chargé en streaming */}
      </Suspense>

      {/* Suspense Level 2 : Graphiques */}
      <Suspense fallback={<ChartSkeleton />}>
        <AnalyticsChart /> {/* Chargé en parallèle */}
      </Suspense>

      {/* Suspense Level 3 : Activité récente */}
      <Suspense fallback={<ActivitySkeleton />}>
        <RecentActivity /> {/* Chargé en dernier */}
      </Suspense>
    </div>
  );
}

// Composant avec fetch asynchrone
async function ExpensiveStats() {
  // Simule un fetch lent (3 secondes)
  const stats = await fetch('https://api.example.com/stats', {
    next: { revalidate: 60 }
  }).then(res => res.json());

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.id} className="p-4 bg-card rounded-lg">
          <div className="text-2xl font-bold">{stat.value}</div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}`}
              language="tsx"
              filename="app/dashboard/page.tsx"
              highlightLines={[10, 11, 12, 15, 16, 17, 20, 21, 22]}
              category="advanced"
            />
          </div>

          {/* Convention loading.tsx */}
          <div>
            <h4 className="font-bold text-foreground mb-3">Convention Next.js : loading.tsx</h4>
            <CodeBlock
              code={`// app/dashboard/loading.tsx
// Next.js génère automatiquement un Suspense boundary
export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-48 bg-muted/50 rounded animate-pulse" />
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-muted/50 rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
}

// Équivalent manuel :
// <Suspense fallback={<Loading />}>
//   <DashboardPage />
// </Suspense>`}
              language="tsx"
              filename="app/dashboard/loading.tsx"
              highlightLines={[1, 2, 3, 4]}
              category="advanced"
            />
          </div>

          {/* Timeline de chargement */}
          <div className="p-4 rounded-lg bg-background/50 border border-border/50">
            <h5 className="font-bold text-foreground mb-3">Timeline de Chargement</h5>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs px-2 py-1 rounded bg-primary/10 text-primary">t=0ms</span>
                <span className="text-muted-foreground">HTML initial + Skeleton affiché</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">t=500ms</span>
                <span className="text-muted-foreground">ExpensiveStats complètes, skeleton remplacé</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs px-2 py-1 rounded bg-green-500/10 text-green-600 dark:text-green-400">t=800ms</span>
                <span className="text-muted-foreground">AnalyticsChart affiché</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs px-2 py-1 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400">t=1200ms</span>
                <span className="text-muted-foreground">RecentActivity affiché, page complète</span>
              </div>
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* Pattern 2: Parallel Routes */}
      <ConceptCard
        title="2. Parallel Routes (@slot)"
        description="Afficher plusieurs pages en parallèle dans le même layout. Parfait pour modals interceptées, dashboards multi-sections, ou A/B testing."
        category="advanced"
      >
        <div className="space-y-6">
          {/* Structure */}
          <div>
            <h4 className="font-bold text-foreground mb-3">Structure du Projet</h4>
            <CodeBlock
              code={`app/
├── @modal/              # Slot "modal"
│   ├── default.tsx      # Page par défaut (modal cachée)
│   ├── login/
│   │   └── page.tsx     # Modal de login
│   └── signup/
│       └── page.tsx     # Modal de signup
├── @sidebar/            # Slot "sidebar"
│   ├── default.tsx
│   └── page.tsx
├── layout.tsx           # Layout utilisant les slots
└── page.tsx             # Page principale`}
              language="bash"
              filename="app/ structure"
              highlightLines={[2, 8, 12]}
              category="advanced"
            />
          </div>

          {/* Layout utilisant les slots */}
          <div>
            <h4 className="font-bold text-foreground mb-3">Layout Utilisant les Slots</h4>
            <CodeBlock
              code={`// app/layout.tsx
export default function Layout({
  children,     // Page principale
  modal,        // Slot @modal
  sidebar       // Slot @sidebar
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Sidebar (chargée en parallèle) */}
      <aside className="w-64">{sidebar}</aside>

      {/* Contenu principal */}
      <main className="flex-1">{children}</main>

      {/* Modal (chargée en parallèle, conditionnellement visible) */}
      {modal}
    </div>
  );
}

// app/@modal/default.tsx
export default function ModalDefault() {
  return null; // Pas de modal par défaut
}

// app/@modal/login/page.tsx
export default function LoginModal() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-background p-8 rounded-lg">
        <h2>Login</h2>
        <form>{/* ... */}</form>
      </div>
    </div>
  );
}`}
              language="tsx"
              filename="app/layout.tsx"
              highlightLines={[3, 4, 5, 14, 17, 20, 26, 27, 31, 32, 33]}
              category="advanced"
            />
          </div>

          {/* Use Cases */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-background/50 border border-border/50">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-bold text-foreground mb-1">Modals Interceptées</h5>
                  <p className="text-sm text-muted-foreground">
                    Afficher un produit en modal sur /products, en page complète sur /products/[id]
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-background/50 border border-border/50">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-bold text-foreground mb-1">Dashboards</h5>
                  <p className="text-sm text-muted-foreground">
                    Sidebar avec navigation, contenu principal, et panneau de notifications
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-background/50 border border-border/50">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-bold text-foreground mb-1">A/B Testing</h5>
                  <p className="text-sm text-muted-foreground">
                    Afficher deux variantes d'une page en parallèle selon cookie/segment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* Pattern 3: Middleware (Edge Runtime) */}
      <ConceptCard
        title="3. Middleware (Edge Runtime)"
        description="Exécuter du code avant qu'une requête soit traitée, directement sur le CDN (Edge). Parfait pour auth check, A/B testing, redirections, et i18n."
        category="advanced"
      >
        <div className="space-y-6">
          {/* Exemple de base */}
          <div>
            <h4 className="font-bold text-foreground mb-3">Middleware : Auth Check + A/B Testing + i18n</h4>
            <CodeBlock
              code={`// middleware.ts (à la racine du projet)
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Auth Check : Rediriger vers /login si non authentifié
  const token = request.cookies.get('auth-token');
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. A/B Testing : Afficher variante selon cookie
  const variant = request.cookies.get('ab-variant') || 'A';
  const response = NextResponse.next();
  if (!request.cookies.has('ab-variant')) {
    // Assigner variant aléatoirement
    const randomVariant = Math.random() > 0.5 ? 'A' : 'B';
    response.cookies.set('ab-variant', randomVariant);
  }

  // 3. i18n : Rediriger selon langue navigateur
  const locale = request.headers.get('accept-language')?.split(',')[0] || 'en';
  if (pathname === '/' && !pathname.startsWith('/fr') && locale === 'fr') {
    return NextResponse.redirect(new URL('/fr', request.url));
  }

  // 4. Headers personnalisés
  response.headers.set('x-middleware-version', '1.0');

  return response;
}

// Configurer les paths où le middleware s'applique
export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};`}
              language="tsx"
              filename="middleware.ts"
              highlightLines={[7, 8, 9, 10, 13, 14, 18, 19, 23, 24, 25, 35, 36, 37, 38, 39]}
              category="advanced"
            />
          </div>

          {/* Limitations Edge Runtime */}
          <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/20">
            <h5 className="font-bold text-orange-600 dark:text-orange-400 mb-3 flex items-center gap-2">
              <X className="w-5 h-5" />
              Limitations du Edge Runtime
            </h5>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span>
                <span>Pas d'accès aux APIs Node.js (fs, crypto natif, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span>
                <span>Pas de connexion directe à PostgreSQL/MySQL (utiliser API REST)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span>
                <span>Timeout de 10 secondes maximum</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span>
                <span>Limité à 1 MB de code (middleware léger uniquement)</span>
              </li>
            </ul>
          </div>
        </div>
      </ConceptCard>

      {/* Pattern 4: Optimistic Updates */}
      <ConceptCard
        title="4. Optimistic Updates avec useOptimistic"
        description="Mettre à jour l'UI instantanément avant la réponse serveur, puis rollback si erreur. Hook React 19 natif pour une UX ultra-réactive."
        category="advanced"
      >
        <div className="space-y-6">
          {/* Exemple */}
          <div>
            <h4 className="font-bold text-foreground mb-3">Exemple : Todo List avec useOptimistic</h4>
            <CodeBlock
              code={`'use client';

import { useOptimistic, useTransition } from 'react';
import { addTodo } from './actions';

export function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [isPending, startTransition] = useTransition();

  // State optimiste : UI mise à jour instantanément
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    initialTodos,
    (state, newTodo: Todo) => [...state, newTodo]
  );

  const handleSubmit = async (formData: FormData) => {
    const text = formData.get('text') as string;

    // Créer un todo temporaire
    const tempTodo = {
      id: 'temp-' + Date.now(),
      text,
      completed: false,
      createdAt: new Date()
    };

    startTransition(async () => {
      // 1. UI mise à jour instantanément (optimiste)
      addOptimisticTodo(tempTodo);

      try {
        // 2. Server action en arrière-plan
        await addTodo(text);
        // 3. Revalidation automatique, vrai todo affiché
      } catch (error) {
        // 4. Rollback automatique si erreur
        console.error('Failed to add todo:', error);
        // useOptimistic gère le rollback automatiquement
      }
    });
  };

  return (
    <div>
      <form action={handleSubmit}>
        <input name="text" placeholder="Nouvelle tâche..." />
        <button type="submit" disabled={isPending}>
          Ajouter
        </button>
      </form>

      <ul className="space-y-2 mt-4">
        {optimisticTodos.map((todo) => (
          <li
            key={todo.id}
            className={todo.id.startsWith('temp-') ? 'opacity-50' : ''}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function addTodo(text: string) {
  await db.todo.create({ data: { text } });
  revalidatePath('/todos');
}`}
              language="tsx"
              filename="app/todos/todo-list.tsx"
              highlightLines={[10, 11, 12, 27, 28, 32, 35, 36, 37, 54, 55]}
              category="advanced"
            />
          </div>

          {/* Comparaison */}
          <div>
            <h4 className="font-bold text-foreground mb-3">Quand Utiliser ?</h4>
            <ComparisonTable modes={optimisticUpdatesModes} />
          </div>
        </div>
      </ConceptCard>

      {/* Pattern 5: Real-time avec Supabase */}
      <ConceptCard
        title="5. Real-time avec Supabase Realtime"
        description="Synchroniser l'UI en temps réel avec les changements de base de données. Supabase Realtime écoute les changements PostgreSQL et les diffuse via WebSocket."
        category="advanced"
      >
        <div className="space-y-6">
          {/* Exemple */}
          <div>
            <h4 className="font-bold text-foreground mb-3">Exemple : Inspections en Temps Réel</h4>
            <CodeBlock
              code={`'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export function InspectionsLiveList() {
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const supabase = createClient();

  useEffect(() => {
    // 1. Charger les données initiales
    async function loadInspections() {
      const { data } = await supabase
        .from('inspections')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) setInspections(data);
    }

    loadInspections();

    // 2. Écouter les changements en temps réel
    const channel = supabase
      .channel('inspections-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'inspections'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            // Nouvelle inspection ajoutée
            setInspections((prev) => [payload.new as Inspection, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            // Inspection modifiée
            setInspections((prev) =>
              prev.map((i) =>
                i.id === payload.new.id ? (payload.new as Inspection) : i
              )
            );
          } else if (payload.eventType === 'DELETE') {
            // Inspection supprimée
            setInspections((prev) =>
              prev.filter((i) => i.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    // 3. Cleanup : Unsubscribe au démontage
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <div className="space-y-4">
      {inspections.map((inspection) => (
        <div key={inspection.id} className="p-4 bg-card rounded-lg border">
          <h3 className="font-bold">{inspection.site_name}</h3>
          <p className="text-sm text-muted-foreground">
            {inspection.status}
          </p>
        </div>
      ))}
    </div>
  );
}`}
              language="tsx"
              filename="app/inspections/live-list.tsx"
              highlightLines={[24, 25, 26, 27, 28, 29, 30, 31, 34, 35, 36, 37, 38, 55, 56, 57]}
              category="advanced"
            />
          </div>

          {/* Use Cases */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h5 className="font-bold text-green-600 dark:text-green-400 mb-2 flex items-center gap-2">
                <Check className="w-5 h-5" />
                Quand Utiliser
              </h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Dashboards multi-utilisateurs</li>
                <li>• Chat et messagerie</li>
                <li>• Notifications en temps réel</li>
                <li>• Suivi de livraison/statut</li>
                <li>• Éditeurs collaboratifs</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/20">
              <h5 className="font-bold text-orange-600 dark:text-orange-400 mb-2 flex items-center gap-2">
                <X className="w-5 h-5" />
                Attention
              </h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Toujours cleanup avec removeChannel()</li>
                <li>• Limiter le nombre de subscriptions</li>
                <li>• Filtrer côté serveur (RLS Supabase)</li>
                <li>• Désactiver si utilisateur inactif</li>
              </ul>
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* Pattern 6: Internationalisation */}
      <ConceptCard
        title="6. Internationalisation (i18n) avec next-intl"
        description="Gérer plusieurs langues avec traductions, formatage de dates/nombres, et SEO optimisé. next-intl s'intègre parfaitement avec l'App Router."
        category="advanced"
      >
        <div className="space-y-6">
          {/* Structure */}
          <div>
            <h4 className="font-bold text-foreground mb-3">Structure du Projet</h4>
            <CodeBlock
              code={`messages/
├── en.json              # Anglais
├── fr.json              # Français
└── es.json              # Espagnol

app/
├── [locale]/            # Dynamic segment pour langue
│   ├── layout.tsx       # Layout par langue
│   ├── page.tsx         # Page d'accueil traduite
│   └── about/
│       └── page.tsx     # Page About traduite
└── i18n.ts              # Configuration i18n`}
              language="bash"
              filename="Structure i18n"
              highlightLines={[1, 2, 3, 4, 7, 8]}
              category="advanced"
            />
          </div>

          {/* Fichiers de traduction */}
          <div>
            <h4 className="font-bold text-foreground mb-3">Fichiers de Traduction</h4>
            <CodeBlock
              code={`// messages/en.json
{
  "home": {
    "title": "Welcome to Koursorr",
    "subtitle": "Learn Next.js with interactive courses"
  },
  "nav": {
    "courses": "Courses",
    "about": "About"
  }
}

// messages/fr.json
{
  "home": {
    "title": "Bienvenue sur Koursorr",
    "subtitle": "Apprenez Next.js avec des cours interactifs"
  },
  "nav": {
    "courses": "Cours",
    "about": "À propos"
  }
}`}
              language="json"
              filename="messages/en.json + fr.json"
              highlightLines={[3, 4, 5, 16, 17]}
              category="advanced"
            />
          </div>

          {/* Utilisation */}
          <div>
            <h4 className="font-bold text-foreground mb-3">Utilisation dans un Composant</h4>
            <CodeBlock
              code={`// app/[locale]/page.tsx
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('home');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
    </div>
  );
}

// Générer les routes pour chaque locale
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'es' }];
}`}
              language="tsx"
              filename="app/[locale]/page.tsx"
              highlightLines={[2, 6, 7, 11, 12, 18, 19]}
              category="advanced"
            />
          </div>

          {/* SEO */}
          <div>
            <h4 className="font-bold text-foreground mb-3">SEO : hreflang + sitemap</h4>
            <CodeBlock
              code={`// app/[locale]/layout.tsx
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: \`https://kourso.com/\${locale}\`,
      languages: {
        'en': 'https://kourso.com/en',
        'fr': 'https://kourso.com/fr',
        'es': 'https://kourso.com/es'
      }
    }
  };
}

// app/sitemap.ts
export default function sitemap() {
  const locales = ['en', 'fr', 'es'];

  return locales.flatMap((locale) => [
    {
      url: \`https://kourso.com/\${locale}\`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: \`https://kourso.com/\${locale}/courses\`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8
    }
  ]);
}`}
              language="tsx"
              filename="app/[locale]/layout.tsx"
              highlightLines={[8, 9, 10, 11, 12, 13, 23, 24, 25]}
              category="advanced"
            />
          </div>
        </div>
      </ConceptCard>

      {/* Pièges à Éviter */}
      <ConceptCard
        title="Pièges à Éviter avec les Patterns Avancés"
        description="Erreurs courantes lors de l'utilisation de patterns avancés et comment les éviter"
        category="advanced"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-red-600 dark:text-red-400 mb-1">
                  Suspense partout
                </h5>
                <p className="text-sm text-muted-foreground">
                  N'utilisez Suspense que pour les composants qui prennent plus de 200-300ms à charger.
                  Trop de Suspense boundaries peut fragmenter le HTML et ralentir le rendu.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-red-600 dark:text-red-400 mb-1">
                  Parallel routes trop complexes
                </h5>
                <p className="text-sm text-muted-foreground">
                  Limitez-vous à 2-3 slots maximum. Au-delà, le routing devient difficile à maintenir
                  et peut créer des bugs de navigation.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-red-600 dark:text-red-400 mb-1">
                  Middleware lourd
                </h5>
                <p className="text-sm text-muted-foreground">
                  Le middleware s'exécute sur chaque requête. Évitez les opérations lourdes (fetch API,
                  parsing JSON volumineux). Pas d'accès aux APIs Node.js (fs, crypto, database drivers).
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-red-600 dark:text-red-400 mb-1">
                  Optimistic updates sans rollback
                </h5>
                <p className="text-sm text-muted-foreground">
                  useOptimistic gère le rollback automatiquement, mais vous devez gérer les erreurs
                  utilisateur (toast, notification). Ne l'utilisez jamais pour des mutations critiques
                  (paiements, suppressions définitives).
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-red-600 dark:text-red-400 mb-1">
                  Real-time sans cleanup
                </h5>
                <p className="text-sm text-muted-foreground">
                  Toujours unsubscribe dans le cleanup de useEffect. Oublier le cleanup crée des memory
                  leaks et des subscriptions multiples.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-red-600 dark:text-red-400 mb-1">
                  i18n sans SEO
                </h5>
                <p className="text-sm text-muted-foreground">
                  Toujours générer hreflang tags et sitemap.xml pour chaque langue. Sans cela, Google
                  ne référencera qu'une seule version de votre site.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ConceptCard>
    </div>
  );
}
