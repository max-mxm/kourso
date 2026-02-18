import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { DependencyDirectionSchema } from '../_components/dependency-direction-schema';

export default function PrincipesFondamentauxSection() {
  return (
    <div className="space-y-8">
      <ConceptCard
        title="Regle de dependance"
        description="Le code metier (centre) ne connait pas les details techniques (exterieur). Il depend uniquement d abstractions."
        category="fundamentals"
      >
        <div className="space-y-3 text-sm text-foreground/85">
          <p>- Les adapters importent le domaine.</p>
          <p>- Le domaine n importe jamais les adapters.</p>
          <p>- Les ports sont definis dans le coeur, implementes a l exterieur.</p>
        </div>
      </ConceptCard>

      <DependencyDirectionSchema />

      <CodeBlock
        code={`// OK Le domaine definit les ports (interfaces)

export interface PaymentPort {
  charge(input: {
    amountCents: number;
    currency: string;
    reference: string;
  }): Promise<{
    provider: string;
    transactionId: string;
    authorized: true;
  }>;
}

export interface OrderRepositoryPort {
  save(order: OrderEntity): Promise<PersistedOrder>;
}

// Use case: depend uniquement des interfaces
export async function createOrderUseCase(
  command: CreateOrderCommand,
  deps: {
    paymentPort: PaymentPort;
    orderRepository: OrderRepositoryPort;
  }
) {
  // logique metier pure
}

// Les adapters (Stripe, Postgres, Mock...) se branchent via deps.`}
        language="typescript"
        filename="ports.ts"
        highlightLines={[1, 3, 14, 19, 23, 24, 25]}
        category="fundamentals"
      />
    </div>
  );
}
