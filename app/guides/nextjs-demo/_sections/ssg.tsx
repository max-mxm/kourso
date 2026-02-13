import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { SSGDemoWrapper } from '../_components/demo-wrappers';

export default function SSGSection() {
  return (
    <div className="space-y-8">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-foreground/80">
          La <strong>Static Site Generation (SSG)</strong> génère le HTML au moment du build. Parfait pour le contenu qui change rarement.
        </p>
      </div>

      <ConceptCard
        title="Build Time Generation"
        description="Les pages sont générées une seule fois pendant le build et servies comme fichiers statiques depuis un CDN."
        category="rendering"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">⚡</span>
            <span><strong>Ultra rapide</strong> : Pas de calcul serveur, juste du HTML statique</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">💰</span>
            <span><strong>Économique</strong> : Hébergement CDN peu coûteux</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">🔒</span>
            <span><strong>Sécurisé</strong> : Pas de serveur dynamique à protéger</span>
          </li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// Page statique générée au build
export default async function BlogPost({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  // Cette fonction s'exécute UNE SEULE FOIS au build
  const post = await fetch(\`https://api.example.com/posts/\${slug}\`, {
    cache: 'force-cache' // Cache permanent
  }).then(res => res.json());

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

// Génère toutes les pages possibles au build
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts')
    .then(res => res.json());

  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}`}
        language="typescript"
        filename="app/blog/[slug]/page.tsx"
        highlightLines={[10, 21, 22, 23, 24, 25, 26, 27, 28]}
        category="rendering"
      />

      <SSGDemoWrapper />
    </div>
  );
}
