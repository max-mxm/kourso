import { CodeBlock } from '@/components/course/code-block';
import { RequestFlowSchema } from '../_components/request-flow-schema';

export default function FluxUseCaseSection() {
  return (
    <div className="space-y-8">
      <RequestFlowSchema />

      <CodeBlock
        code={`// Controller (adapter entrant)
export async function createOrderAction(formData: FormData) {
  const amountCents = Number(formData.get('amountCents'));

  const result = await createOrderUseCase(
    {
      customerId: 'customer_42',
      amountCents,
      currency: 'EUR',
    },
    {
      paymentPort: new StripePaymentAdapter(stripeClient),
      orderRepository: new PostgresOrderRepository(prisma),
    }
  );

  return result;
}

// Le use case ne depend pas de Next.js, Prisma ou Stripe.`}
        language="typescript"
        filename="create-order-action.ts"
        highlightLines={[1, 5, 11, 12, 13]}
        category="rendering"
      />
    </div>
  );
}
