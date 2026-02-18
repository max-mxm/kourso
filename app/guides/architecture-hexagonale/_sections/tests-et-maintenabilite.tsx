import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function TestsEtMaintenabiliteSection() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground leading-relaxed">
        Le gain le plus visible arrive cote tests: vous pouvez valider la logique
        metier sans demarrer Postgres, Redis ou Stripe.
      </p>

      <CodeBlock
        code={`import { describe, expect, it } from 'vitest';
import { createOrderUseCase } from './create-order';

describe('createOrderUseCase', () => {
  it('cree une commande payee', async () => {
    const fakePaymentPort = {
      charge: async () => ({
        provider: 'FakePay',
        transactionId: 'tx_test',
        authorized: true as const,
      }),
    };

    const fakeRepository = {
      save: async (order: any) => ({
        ...order,
        storage: 'InMemory',
        persistedAt: new Date().toISOString(),
      }),
    };

    const result = await createOrderUseCase(
      {
        customerId: 'c_1',
        amountCents: 2400,
        currency: 'EUR',
      },
      {
        paymentPort: fakePaymentPort,
        orderRepository: fakeRepository,
      }
    );

    expect(result.order.status).toBe('PAID');
    expect(result.payment.provider).toBe('FakePay');
  });
});`}
        language="typescript"
        filename="create-order.spec.ts"
        highlightLines={[6, 14, 22, 29, 30, 33, 34]}
        category="optimization"
      />

      <ConceptCard
        title="Strategie de test recommandee"
        description="Concentrez vos tests sur le domaine, puis testez les adapters separement avec leurs dependances techniques."
        category="optimization"
      >
        <div className="space-y-3 text-sm text-foreground/85">
          <p>- Tests unitaires: use cases + fakes (rapides et stables).</p>
          <p>- Tests integration adapters: DB, API, cache, providers.</p>
          <p>- Tests E2E: parcours critiques seulement.</p>
        </div>
      </ConceptCard>
    </div>
  );
}
