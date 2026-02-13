import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { SSRDemoWrapper } from '../_components/demo-wrappers';

export default function SSRSection() {
  return (
    <div className="space-y-8">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-foreground/80">
          Le <strong>Server-Side Rendering (SSR)</strong> génère le HTML sur le serveur à chaque requête. Idéal pour le contenu dynamique et personnalisé.
        </p>
      </div>

      <ConceptCard
        title="Comment fonctionne le SSR ?"
        description="À chaque requête, Next.js exécute le composant côté serveur, récupère les données nécessaires, et envoie le HTML complet au client."
        category="rendering"
      >
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 font-bold">1</div>
            <p className="text-foreground/80">Client demande une page</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 font-bold">2</div>
            <p className="text-foreground/80">Serveur exécute le composant React</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 font-bold">3</div>
            <p className="text-foreground/80">Données récupérées (API, DB)</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 font-bold">4</div>
            <p className="text-foreground/80">HTML complet envoyé au client</p>
          </div>
        </div>
      </ConceptCard>

      <CodeBlock
        code={`// Page SSR avec données dynamiques
export default async function UserProfile({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  // Cette fonction s'exécute côté serveur à chaque requête
  const user = await fetch(\`https://api.example.com/users/\${id}\`, {
    cache: 'no-store' // Pas de cache, données toujours fraîches
  }).then(res => res.json());

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Dernière connexion : {new Date(user.lastLogin).toLocaleString()}</p>
    </div>
  );
}

// Les composants sont Server Components par défaut dans Next.js 16`}
        language="typescript"
        filename="app/users/[id]/page.tsx"
        highlightLines={[9, 10]}
        category="rendering"
      />

      <SSRDemoWrapper />
    </div>
  );
}
