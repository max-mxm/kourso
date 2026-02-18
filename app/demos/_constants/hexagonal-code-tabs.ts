export type HexagonalBrickLayer =
  | 'domain'
  | 'application'
  | 'ports'
  | 'inbound-adapters'
  | 'outbound-adapters'
  | 'composition'
  | 'testing';

export interface HexagonalCodeBrick {
  id: string;
  label: string;
  layer: HexagonalBrickLayer;
  filename: string;
  language: string;
  description: string;
  code: string;
}

export const HEXAGONAL_LAYER_ORDER: HexagonalBrickLayer[] = [
  'domain',
  'application',
  'ports',
  'inbound-adapters',
  'outbound-adapters',
  'composition',
  'testing',
];

export const HEXAGONAL_LAYER_LABELS: Record<HexagonalBrickLayer, string> = {
  domain: 'Domaine',
  application: 'Application',
  ports: 'Ports',
  'inbound-adapters': 'Adapters entrants',
  'outbound-adapters': 'Adapters sortants',
  composition: 'Composition root',
  testing: 'Tests',
};

export const HEXAGONAL_CODE_BRICKS: HexagonalCodeBrick[] = [
  {
    id: 'money-vo',
    label: 'Money VO',
    layer: 'domain',
    filename: 'domain/orders/value-objects/money.ts',
    language: 'typescript',
    description: 'Value Object qui protege les invariants metier du montant.',
    code: `export class Money {
  private constructor(
    private readonly cents: number,
    private readonly currency: 'EUR'
  ) {}

  static fromCents(raw: number): Money {
    if (!Number.isInteger(raw)) {
      throw new Error('Amount must be an integer in cents');
    }
    if (raw < 100) {
      throw new Error('Minimum amount is 1.00 EUR');
    }

    return new Money(raw, 'EUR');
  }

  toCents(): number {
    return this.cents;
  }

  toCurrency(): 'EUR' {
    return this.currency;
  }
}`,
  },
  {
    id: 'order-entity',
    label: 'Order entity',
    layer: 'domain',
    filename: 'domain/orders/entities/order.ts',
    language: 'typescript',
    description: 'Aggregate racine du domaine, independant de Next.js et de la DB.',
    code: `import { Money } from '../value-objects/money';

export interface CreatePaidOrderInput {
  id: string;
  customerId: string;
  amount: Money;
  paymentProvider: string;
  createdAtIso: string;
}

export class Order {
  private constructor(
    readonly id: string,
    readonly customerId: string,
    readonly amount: Money,
    readonly status: 'PAID',
    readonly paymentProvider: string,
    readonly createdAtIso: string
  ) {}

  static createPaid(input: CreatePaidOrderInput): Order {
    if (!input.customerId) {
      throw new Error('Customer id is required');
    }

    return new Order(
      input.id,
      input.customerId,
      input.amount,
      'PAID',
      input.paymentProvider,
      input.createdAtIso
    );
  }
}`,
  },
  {
    id: 'create-order-command',
    label: 'CreateOrderCommand',
    layer: 'application',
    filename: 'application/orders/dto/create-order.command.ts',
    language: 'typescript',
    description: 'Contrat de commande qui traverse la frontiere inbound -> application.',
    code: `export interface CreateOrderCommand {
  customerId: string;
  amountCents: number;
  currency: 'EUR';
  source: 'http' | 'cli' | 'queue';
}

export interface CreateOrderResult {
  orderId: string;
  amountCents: number;
  paymentProvider: string;
  storage: 'InMemory' | 'PostgreSQL';
  notificationChannel: string;
}`,
  },
  {
    id: 'create-order-use-case',
    label: 'CreateOrderUseCase',
    layer: 'application',
    filename: 'application/orders/use-cases/create-order.use-case.ts',
    language: 'typescript',
    description: 'Orchestre le domaine et les ports sortants, sans connaitre les adapters.',
    code: `import { Money } from '@/domain/orders/value-objects/money';
import { Order } from '@/domain/orders/entities/order';
import type {
  PaymentPort,
  OrderRepositoryPort,
  NotificationPort,
} from '../ports/outbound';
import type { CreateOrderCommand, CreateOrderResult } from '../dto/create-order.command';

export class CreateOrderUseCase {
  constructor(
    private readonly paymentPort: PaymentPort,
    private readonly repositoryPort: OrderRepositoryPort,
    private readonly notificationPort: NotificationPort
  ) {}

  async execute(command: CreateOrderCommand): Promise<CreateOrderResult> {
    const amount = Money.fromCents(command.amountCents);

    const payment = await this.paymentPort.charge({
      amountCents: amount.toCents(),
      currency: amount.toCurrency(),
      reference: \`ord_\${Date.now().toString(36)}\`,
    });

    const order = Order.createPaid({
      id: \`ord_\${Date.now().toString(36)}\`,
      customerId: command.customerId,
      amount,
      paymentProvider: payment.provider,
      createdAtIso: new Date().toISOString(),
    });

    const persisted = await this.repositoryPort.save(order);

    const delivery = await this.notificationPort.publishOrderCreated({
      orderId: persisted.id,
      customerId: persisted.customerId,
      amountCents: persisted.amountCents,
      occurredAt: persisted.persistedAt,
    });

    return {
      orderId: persisted.id,
      amountCents: persisted.amountCents,
      paymentProvider: payment.provider,
      storage: persisted.storage,
      notificationChannel: delivery.channel,
    };
  }
}`,
  },
  {
    id: 'inbound-port',
    label: 'Inbound port',
    layer: 'ports',
    filename: 'application/orders/ports/inbound/create-order.use-case.port.ts',
    language: 'typescript',
    description: 'Interface d entree pour le use case (port entrant).',
    code: `import type { CreateOrderCommand, CreateOrderResult } from '../../dto/create-order.command';

export interface CreateOrderUseCasePort {
  execute(command: CreateOrderCommand): Promise<CreateOrderResult>;
}`,
  },
  {
    id: 'payment-port',
    label: 'PaymentPort',
    layer: 'ports',
    filename: 'application/orders/ports/outbound/payment.port.ts',
    language: 'typescript',
    description: 'Port sortant pour l encaissement.',
    code: `export interface PaymentPort {
  charge(input: {
    amountCents: number;
    currency: 'EUR';
    reference: string;
  }): Promise<{
    provider: string;
    transactionId: string;
    authorized: true;
  }>;
}`,
  },
  {
    id: 'repository-port',
    label: 'OrderRepositoryPort',
    layer: 'ports',
    filename: 'application/orders/ports/outbound/order-repository.port.ts',
    language: 'typescript',
    description: 'Port sortant de persistance.',
    code: `import type { Order } from '@/domain/orders/entities/order';

export interface OrderRepositoryPort {
  save(order: Order): Promise<{
    id: string;
    customerId: string;
    amountCents: number;
    storage: 'InMemory' | 'PostgreSQL';
    persistedAt: string;
  }>;
}`,
  },
  {
    id: 'notification-port',
    label: 'NotificationPort',
    layer: 'ports',
    filename: 'application/orders/ports/outbound/notification.port.ts',
    language: 'typescript',
    description: 'Port sortant de publication d event.',
    code: `export interface NotificationPort {
  publishOrderCreated(event: {
    orderId: string;
    customerId: string;
    amountCents: number;
    occurredAt: string;
  }): Promise<{
    channel: string;
    deliveryId: string;
  }>;
}`,
  },
  {
    id: 'http-controller',
    label: 'HTTP controller',
    layer: 'inbound-adapters',
    filename: 'infrastructure/orders/adapters/inbound/http/create-order.controller.ts',
    language: 'typescript',
    description: 'Adapter entrant HTTP qui mappe la requete vers la commande.',
    code: `import type { NextRequest } from 'next/server';
import type { CreateOrderUseCasePort } from '@/application/orders/ports/inbound/create-order.use-case.port';

export async function postCreateOrder(
  request: NextRequest,
  useCase: CreateOrderUseCasePort
) {
  const body = await request.json();

  const command = {
    customerId: String(body.customerId),
    amountCents: Number(body.amountCents),
    currency: 'EUR' as const,
    source: 'http' as const,
  };

  const result = await useCase.execute(command);

  return Response.json(result, { status: 201 });
}`,
  },
  {
    id: 'cli-handler',
    label: 'CLI handler',
    layer: 'inbound-adapters',
    filename: 'infrastructure/orders/adapters/inbound/cli/create-order.command.ts',
    language: 'typescript',
    description: 'Adapter entrant CLI pour batch ou maintenance.',
    code: `import type { CreateOrderUseCasePort } from '@/application/orders/ports/inbound/create-order.use-case.port';

export async function runCreateOrderCli(
  argv: { customerId: string; amountCents: string },
  useCase: CreateOrderUseCasePort
) {
  const result = await useCase.execute({
    customerId: argv.customerId,
    amountCents: Number(argv.amountCents),
    currency: 'EUR',
    source: 'cli',
  });

  console.log('Order created', result);
}`,
  },
  {
    id: 'stripe-payment-adapter',
    label: 'StripePaymentAdapter',
    layer: 'outbound-adapters',
    filename: 'infrastructure/orders/adapters/outbound/payment/stripe-payment.adapter.ts',
    language: 'typescript',
    description: 'Implementation concrete du PaymentPort vers Stripe.',
    code: `import type { PaymentPort } from '@/application/orders/ports/outbound/payment.port';

export class StripePaymentAdapter implements PaymentPort {
  constructor(private readonly stripe: Stripe) {}

  async charge(input: {
    amountCents: number;
    currency: 'EUR';
    reference: string;
  }) {
    const intent = await this.stripe.paymentIntents.create({
      amount: input.amountCents,
      currency: input.currency.toLowerCase(),
      metadata: { reference: input.reference },
      confirm: true,
      payment_method: 'pm_card_visa',
    });

    if (intent.status !== 'succeeded') {
      throw new Error('Payment declined');
    }

    return {
      provider: 'Stripe',
      transactionId: intent.id,
      authorized: true as const,
    };
  }
}`,
  },
  {
    id: 'mock-payment-adapter',
    label: 'MockPaymentAdapter',
    layer: 'outbound-adapters',
    filename: 'infrastructure/orders/adapters/outbound/payment/mock-payment.adapter.ts',
    language: 'typescript',
    description: 'Adapter sortant de test pour scenarios rapides.',
    code: `import type { PaymentPort } from '@/application/orders/ports/outbound/payment.port';

export class MockPaymentAdapter implements PaymentPort {
  constructor(private readonly shouldFail = false) {}

  async charge(input: {
    amountCents: number;
    currency: 'EUR';
    reference: string;
  }) {
    if (this.shouldFail) {
      throw new Error('Mock decline');
    }

    return {
      provider: 'MockPay',
      transactionId: \`mock_\${input.reference}\`,
      authorized: true as const,
    };
  }
}`,
  },
  {
    id: 'postgres-repository-adapter',
    label: 'Postgres repository',
    layer: 'outbound-adapters',
    filename: 'infrastructure/orders/adapters/outbound/repository/postgres-order.repository.ts',
    language: 'typescript',
    description: 'Implementation SQL de OrderRepositoryPort.',
    code: `import type { PrismaClient } from '@prisma/client';
import type { Order } from '@/domain/orders/entities/order';
import type { OrderRepositoryPort } from '@/application/orders/ports/outbound/order-repository.port';

export class PostgresOrderRepository implements OrderRepositoryPort {
  constructor(private readonly prisma: PrismaClient) {}

  async save(order: Order) {
    const created = await this.prisma.order.create({
      data: {
        id: order.id,
        customerId: order.customerId,
        amountCents: order.amount.toCents(),
        status: order.status,
        paymentProvider: order.paymentProvider,
      },
    });

    return {
      id: created.id,
      customerId: created.customerId,
      amountCents: created.amountCents,
      storage: 'PostgreSQL' as const,
      persistedAt: new Date().toISOString(),
    };
  }
}`,
  },
  {
    id: 'memory-repository-adapter',
    label: 'InMemory repository',
    layer: 'outbound-adapters',
    filename: 'infrastructure/orders/adapters/outbound/repository/in-memory-order.repository.ts',
    language: 'typescript',
    description: 'Implementation en memoire pour tests et preview.',
    code: `import type { Order } from '@/domain/orders/entities/order';
import type { OrderRepositoryPort } from '@/application/orders/ports/outbound/order-repository.port';

export class InMemoryOrderRepository implements OrderRepositoryPort {
  private readonly store: Map<string, Order> = new Map();

  async save(order: Order) {
    this.store.set(order.id, order);

    return {
      id: order.id,
      customerId: order.customerId,
      amountCents: order.amount.toCents(),
      storage: 'InMemory' as const,
      persistedAt: new Date().toISOString(),
    };
  }
}`,
  },
  {
    id: 'notification-adapter',
    label: 'Webhook notification',
    layer: 'outbound-adapters',
    filename: 'infrastructure/orders/adapters/outbound/notification/webhook-notification.adapter.ts',
    language: 'typescript',
    description: 'Adapter sortant de notification (event publication).',
    code: `import type { NotificationPort } from '@/application/orders/ports/outbound/notification.port';

export class WebhookNotificationAdapter implements NotificationPort {
  constructor(private readonly endpoint: string) {}

  async publishOrderCreated(event: {
    orderId: string;
    customerId: string;
    amountCents: number;
    occurredAt: string;
  }) {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error('Notification delivery failed');
    }

    return {
      channel: 'webhook',
      deliveryId: \`wh_\${event.orderId}\`,
    };
  }
}`,
  },
  {
    id: 'composition-root',
    label: 'Composition root',
    layer: 'composition',
    filename: 'infrastructure/orders/order-module.ts',
    language: 'typescript',
    description: 'Assemblage des implementations concretes autour du use case.',
    code: `import { CreateOrderUseCase } from '@/application/orders/use-cases/create-order.use-case';
import { StripePaymentAdapter } from './adapters/outbound/payment/stripe-payment.adapter';
import { PostgresOrderRepository } from './adapters/outbound/repository/postgres-order.repository';
import { WebhookNotificationAdapter } from './adapters/outbound/notification/webhook-notification.adapter';

export function buildCreateOrderModule(deps: {
  stripeClient: Stripe;
  prisma: PrismaClient;
  webhookUrl: string;
}) {
  const paymentAdapter = new StripePaymentAdapter(deps.stripeClient);
  const repositoryAdapter = new PostgresOrderRepository(deps.prisma);
  const notificationAdapter = new WebhookNotificationAdapter(deps.webhookUrl);

  const useCase = new CreateOrderUseCase(
    paymentAdapter,
    repositoryAdapter,
    notificationAdapter
  );

  return { useCase };
}`,
  },
  {
    id: 'use-case-test',
    label: 'Use case test',
    layer: 'testing',
    filename: 'application/orders/use-cases/create-order.use-case.spec.ts',
    language: 'typescript',
    description: 'Test unitaire du use case avec fakes sur les ports sortants.',
    code: `import { describe, expect, it } from 'vitest';
import { CreateOrderUseCase } from './create-order.use-case';

describe('CreateOrderUseCase', () => {
  it('creates a paid order with fake adapters', async () => {
    const fakePaymentPort = {
      charge: async () => ({
        provider: 'FakePay',
        transactionId: 'tx_test',
        authorized: true as const,
      }),
    };

    const fakeRepositoryPort = {
      save: async (order: any) => ({
        id: order.id,
        customerId: order.customerId,
        amountCents: order.amount.toCents(),
        storage: 'InMemory' as const,
        persistedAt: new Date().toISOString(),
      }),
    };

    const fakeNotificationPort = {
      publishOrderCreated: async () => ({
        channel: 'test',
        deliveryId: 'evt_test',
      }),
    };

    const useCase = new CreateOrderUseCase(
      fakePaymentPort,
      fakeRepositoryPort,
      fakeNotificationPort
    );

    const result = await useCase.execute({
      customerId: 'customer_1',
      amountCents: 1900,
      currency: 'EUR',
      source: 'http',
    });

    expect(result.paymentProvider).toBe('FakePay');
    expect(result.storage).toBe('InMemory');
  });
});`,
  },
];
