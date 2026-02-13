import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';
import { Check } from 'lucide-react';

export default function ServerComponentsSection() {
  const componentTypes = [
    {
      name: 'Server Components',
      description: 'Rendu 100% serveur, zéro JS client',
      pros: ['Bundle size réduit', 'Accès direct DB/API', 'SEO optimal', 'Secrets sécurisés'],
      cons: ['Pas d\'interactivité', 'Pas de hooks useState/useEffect', 'Pas de browser APIs'],
      useCases: ['Layouts', 'Fetch de données', 'Contenu statique', 'Marketing pages'],
      color: 'rgb(59, 130, 246)'
    },
    {
      name: 'Client Components',
      description: 'Rendu client avec hydration',
      pros: ['Interactivité', 'Hooks complets', 'Browser APIs', 'Real-time updates'],
      cons: ['JavaScript au client', 'Bundle size++', 'Hydration overhead'],
      useCases: ['Forms', 'Modals', 'Interactivity', 'Client state'],
      color: 'rgb(168, 85, 247)'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Les <strong>React Server Components (RSC)</strong> sont la foundation de React 19. Ils permettent
          un rendu serveur sans envoyer de JavaScript au client, réduisant drastiquement la taille du bundle
          et améliorant les performances initiales.
        </p>
      </div>

      <ConceptCard
        title="Server Components : Zero-Bundle React"
        description="Les Server Components ne sont jamais envoyés au client - seulement leur output HTML."
        category="rendering"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span><strong>Zéro JavaScript client</strong> : Le composant n&apos;est jamais téléchargé au navigateur</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span><strong>Accès direct aux ressources</strong> : Database, filesystem, secrets sans exposition</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span><strong>Streaming automatique</strong> : Progressive rendering avec Suspense</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span><strong>Async par défaut</strong> : Composants peuvent être async functions</span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// Server Component (par défaut dans Next.js 13+ App Router)
import { prisma } from '@/lib/db';

// ✅ Async component - SEULEMENT possible en Server Component
export default async function UserList() {
  // ✅ Accès direct à la DB - Pas besoin d'API route
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true }
  });

  // ✅ Ce code ne sera JAMAIS envoyé au client
  const API_SECRET = process.env.SECRET_KEY; // Sécurisé !

  return (
    <div>
      <h1>Users ({users.length})</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

// Caractéristiques :
// - Pas de 'use client'
// - Peut être async
// - Accès direct DB/filesystem
// - Pas de useState, useEffect, onClick, etc.
// - Zéro JS envoyé au client`}
        language="tsx"
        filename="app/users/page.tsx (Server Component)"
        highlightLines={[5, 7, 8, 12]}
        category="rendering"
      />

      <CodeBlock
        code={`// Client Component - Pour l'interactivité
'use client'; // ⚠️ Directive obligatoire

import { useState } from 'react';

export function Counter() {
  // ✅ Hooks autorisés dans Client Components
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      {/* ✅ Event handlers autorisés */}
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// Caractéristiques :
// - Directive 'use client' en haut du fichier
// - Tous les hooks React disponibles
// - Event handlers (onClick, onChange, etc.)
// - Browser APIs (window, document, localStorage)
// - Ce composant + ses dépendances = envoyés au client`}
        language="tsx"
        filename="components/counter.tsx (Client Component)"
        highlightLines={[1, 7, 14]}
        category="rendering"
      />

      <ComparisonTable modes={componentTypes} />

      <ConceptCard
        title="Composition Server + Client"
        description="La vraie puissance : combiner Server et Client Components intelligemment."
        category="rendering"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-background/50 border border-blue-500/20">
            <h4 className="font-bold text-foreground mb-2">Pattern 1 : Server Component avec Client enfants</h4>
            <p className="text-sm text-muted-foreground">
              Un Server Component peut importer et rendre des Client Components. Le Server fait le fetch, le Client gère l&apos;interactivité.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-purple-500/20">
            <h4 className="font-bold text-foreground mb-2">Pattern 2 : Client Component avec Server children via props</h4>
            <p className="text-sm text-muted-foreground">
              Un Client Component peut recevoir des Server Components en children/props, permettant l&apos;interactivité autour de contenu serveur.
            </p>
          </div>
        </div>
      </ConceptCard>

      <CodeBlock
        code={`// Pattern : Server Component parent avec Client Component enfant
import { prisma } from '@/lib/db';
import { LikeButton } from '@/components/like-button'; // Client Component

// ✅ Server Component (async)
export default async function PostPage({ params }: { params: { id: string } }) {
  // Fetch côté serveur
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { author: true, likes: true }
  });

  return (
    <article>
      <h1>{post.title}</h1>
      <p>Par {post.author.name}</p>
      <div>{post.content}</div>

      {/* ✅ Client Component pour l'interactivité */}
      <LikeButton postId={post.id} initialLikes={post.likes.length} />
    </article>
  );
}

// components/like-button.tsx (Client)
'use client';
import { useState } from 'react';

export function LikeButton({ postId, initialLikes }: Props) {
  const [likes, setLikes] = useState(initialLikes);

  return (
    <button onClick={() => setLikes(likes + 1)}>
      ❤️ {likes} likes
    </button>
  );
}`}
        language="tsx"
        filename="app/post/[id]/page.tsx"
        highlightLines={[5, 19, 25, 26]}
        category="rendering"
      />

      <CodeBlock
        code={`// Pattern Avancé : Client wrapper avec Server children
// components/tabs.tsx (Client Component)
'use client';
import { useState, ReactNode } from 'react';

export function Tabs({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {/* Interactivité gérée ici */}
      <div className="tabs">
        <button onClick={() => setActiveTab(0)}>Tab 1</button>
        <button onClick={() => setActiveTab(1)}>Tab 2</button>
      </div>

      {/* ✅ children peut être un Server Component ! */}
      <div className="tab-content">{children}</div>
    </div>
  );
}

// app/dashboard/page.tsx (Server Component)
import { Tabs } from '@/components/tabs';
import { prisma } from '@/lib/db';

export default async function Dashboard() {
  const data = await prisma.metrics.findMany();

  return (
    <Tabs>
      {/* ✅ Contenu Server Component dans Client wrapper */}
      <div>
        {data.map(metric => (
          <div key={metric.id}>{metric.value}</div>
        ))}
      </div>
    </Tabs>
  );
}`}
        language="tsx"
        filename="Composition avancée"
        highlightLines={[2, 3, 17, 31, 32]}
        category="rendering"
      />

      <ConceptCard
        title="Règles des Server Components"
        description="Ce que vous POUVEZ et NE POUVEZ PAS faire dans un Server Component."
        category="rendering"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <h4 className="font-bold text-foreground mb-2">✅ Autorisé</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• async/await</li>
              <li>• Direct DB access</li>
              <li>• File system (fs)</li>
              <li>• process.env secrets</li>
              <li>• Imports de librairies serveur</li>
              <li>• Rendering de Client Components</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <h4 className="font-bold text-foreground mb-2">❌ Interdit</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• useState, useEffect, useContext</li>
              <li>• Event handlers (onClick, onChange)</li>
              <li>• Browser APIs (window, document)</li>
              <li>• createContext (côté serveur)</li>
              <li>• Lifecycle hooks</li>
            </ul>
          </div>
        </div>
      </ConceptCard>

      <CodeBlock
        code={`// Anti-patterns courants

// ❌ ERREUR : useState dans Server Component
export default async function Page() {
  const [count, setCount] = useState(0); // ❌ ERREUR !
  return <div>{count}</div>;
}

// ❌ ERREUR : onClick dans Server Component
export default async function Page() {
  return (
    <button onClick={() => console.log('click')}> // ❌ ERREUR !
      Click me
    </button>
  );
}

// ❌ ERREUR : Importer Server Component dans Client Component
'use client';
import { ServerData } from './server-data'; // ❌ Server Component !

export function ClientWrapper() {
  return <ServerData />; // ❌ Ne fonctionnera pas
}

// ✅ CORRECT : Passer en children
export function ClientWrapper({ children }: { children: ReactNode }) {
  return <div className="wrapper">{children}</div>;
}

// app/page.tsx
import { ClientWrapper } from './client-wrapper';
import { ServerData } from './server-data';

export default function Page() {
  return (
    <ClientWrapper>
      <ServerData /> {/* ✅ CORRECT */}
    </ClientWrapper>
  );
}`}
        language="tsx"
        filename="Anti-patterns et corrections"
        highlightLines={[5, 12, 20, 27, 28, 38]}
        category="rendering"
      />

      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">Best Practices Seniors</h3>
        <ul className="space-y-2 text-foreground/80">
          <li>
            <strong>Server Components par défaut</strong> : N&apos;ajouter &apos;use client&apos; que quand nécessaire
          </li>
          <li>
            <strong>Data fetching au plus proche</strong> : Fetch dans le composant qui utilise les données (colocation)
          </li>
          <li>
            <strong>Pas d&apos;over-client</strong> : Ne pas mettre &apos;use client&apos; sur un parent si seul l&apos;enfant en a besoin
          </li>
          <li>
            <strong>Composition intelligente</strong> : Utiliser children/props pour injecter Server dans Client
          </li>
          <li>
            <strong>Streaming avec Suspense</strong> : Wrapper les Server Components lents avec Suspense
          </li>
        </ul>
      </div>
    </div>
  );
}
