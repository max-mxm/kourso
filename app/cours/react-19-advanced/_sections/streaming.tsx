import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function StreamingSection() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Le <strong>Streaming</strong> et le <strong>Partial Pre-rendering</strong> (React 19.2) permettent d&apos;envoyer
          progressivement le HTML au client pour un Time-to-First-Byte (TTFB) optimal.
        </p>
      </div>

      <CodeBlock
        code={`// Streaming avec Suspense
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>Ma Page</h1>
      
      {/* Shell envoyé immédiatement */}
      <Suspense fallback={<div>Chargement...</div>}>
        <SlowComponent /> {/* Streamed progressivement */}
      </Suspense>
    </div>
  );
}

async function SlowComponent() {
  const data = await fetch('https://api.slow.com/data');
  return <div>{data}</div>;
}`}
        language="tsx"
        filename="app/page.tsx"
        highlightLines={[10, 11]}
        category="rendering"
      />

      <ConceptCard
        title="Partial Pre-rendering (React 19.2)"
        description="Pré-render des parties statiques, streaming des parties dynamiques."
        category="rendering"
      >
        <p className="text-sm text-foreground/80">
          Partial Pre-rendering combine le meilleur du SSG (static) et du SSR (dynamic) :
          le shell statique est servi depuis le CDN, puis les parties dynamiques sont streamées.
        </p>
      </ConceptCard>
    </div>
  );
}
