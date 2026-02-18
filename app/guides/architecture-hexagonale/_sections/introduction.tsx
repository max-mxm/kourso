import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function IntroductionSection() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground leading-relaxed">
        L architecture hexagonale (Ports & Adapters) sert a proteger votre logique
        metier contre les changements techniques. Le framework, la base SQL,
        Redis ou un provider externe deviennent des details remplacables.
      </p>

      <ConceptCard
        title="Le probleme que l architecture hexagonale resout"
        description="Quand le metier depend directement de Prisma, Express ou Stripe, chaque changement technique cree un impact fort sur le coeur applicatif."
        category="fundamentals"
      >
        <div className="space-y-3 text-sm text-foreground/85">
          <p>- Difficile de tester le metier sans DB ou API externe.</p>
          <p>- Refactor long car tout est couple au framework.</p>
          <p>- Migration technique risquee (ORM, transport, provider).</p>
        </div>
      </ConceptCard>

      <CodeBlock
        code={`// BAD: couplage fort, le use case depend directement de Prisma et Stripe

import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET!);

export async function createOrder(amountCents: number, customerId: string) {
  if (amountCents < 100) throw new Error('Montant minimum: 1 EUR');

  const payment = await stripe.paymentIntents.create({
    amount: amountCents,
    currency: 'eur',
  });

  return prisma.order.create({
    data: {
      customerId,
      amountCents,
      status: payment.status === 'succeeded' ? 'PAID' : 'PENDING',
      paymentId: payment.id,
    },
  });
}

// Si Stripe ou Prisma changent, la logique metier doit etre reecrite.`}
        language="typescript"
        filename="couplage-fort.ts"
        highlightLines={[1, 3, 6, 12, 18]}
        category="fundamentals"
      />
    </div>
  );
}
