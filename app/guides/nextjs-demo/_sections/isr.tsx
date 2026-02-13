import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ISRDemoWrapper } from '../_components/demo-wrappers';

export default function ISRSection() {
  return (
    <div className="space-y-8">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-foreground/80">
          L&apos;<strong>Incremental Static Regeneration (ISR)</strong> combine le meilleur des deux mondes : vitesse du statique avec fraîcheur du dynamique.
        </p>
      </div>

      <ConceptCard
        title="Le meilleur des deux mondes"
        description="ISR sert une page statique instantanément, puis la régénère en arrière-plan selon un intervalle défini."
        category="optimization"
      >
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10 text-orange-500 font-bold">1</div>
            <p className="text-foreground/80">Première requête : génération au build</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10 text-orange-500 font-bold">2</div>
            <p className="text-foreground/80">Requêtes suivantes : page statique en cache</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10 text-orange-500 font-bold">3</div>
            <p className="text-foreground/80">Après X secondes : régénération en arrière-plan</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10 text-orange-500 font-bold">4</div>
            <p className="text-foreground/80">Nouvelle version servie aux prochains visiteurs</p>
          </div>
        </div>
      </ConceptCard>

      <CodeBlock
        code={`// Page ISR avec revalidation toutes les 60 secondes
export default async function ProductPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  // Revalidation toutes les 60 secondes
  const product = await fetch(\`https://api.example.com/products/\${id}\`, {
    next: { revalidate: 60 } // Clé magique ISR
  }).then(res => res.json());

  return (
    <div>
      <h1>{product.name}</h1>
      <p className="text-2xl font-bold">{product.price} €</p>
      <p className="text-sm text-gray-500">
        Stock : {product.stock} unités
      </p>
    </div>
  );
}

// Ou revalidation à la demande (on-demand)
export async function generateStaticParams() {
  const products = await fetch('https://api.example.com/products')
    .then(res => res.json());

  return products.map((product: { id: string }) => ({
    id: product.id,
  }));
}`}
        language="typescript"
        filename="app/products/[id]/page.tsx"
        highlightLines={[11]}
        category="optimization"
      />

      <ISRDemoWrapper />
    </div>
  );
}
