import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function ImplementationNextjsSection() {
  return (
    <div className="space-y-8">
      <CodeBlock
        code={`src/
  domain/
    orders/
      entities/order.ts
      ports/payment-port.ts
      ports/order-repository-port.ts
      use-cases/create-order.ts

  infrastructure/
    orders/
      adapters/inbound/create-order-action.ts
      adapters/outbound/stripe-payment-adapter.ts
      adapters/outbound/postgres-order-repository.ts

  app/
    (dashboard)/orders/page.tsx

// Regle de lecture:
// - domain/ ne depend de rien d externe
// - infrastructure/ depend du domain
// - app/ assemble les dependencies`}
        language="plaintext"
        filename="architecture-projet.txt"
        highlightLines={[2, 3, 4, 12, 13, 14, 20, 24, 25, 26]}
        category="best-practices"
      />

      <ConceptCard
        title="Comment brancher les dependances dans Next.js"
        description="Composez les adapters au bord de l application (server action, route handler, job worker)."
        category="best-practices"
      >
        <div className="space-y-3 text-sm text-foreground/85">
          <p>- Le domaine reste framework-agnostique.</p>
          <p>- Les adapters sont instancies a l entree (composition root).</p>
          <p>- Un changement de provider devient un changement localise.</p>
        </div>
      </ConceptCard>
    </div>
  );
}
