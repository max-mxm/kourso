'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  ArrowRightLeft,
  Bell,
  CheckCircle2,
  Database,
  Loader2,
  Play,
  Server,
  SquareTerminal,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type InboundAdapterKey = 'http-controller' | 'cli-handler' | 'queue-consumer';
type PaymentAdapterKey = 'stripe' | 'mock-fast' | 'mock-declined';
type RepositoryAdapterKey = 'memory' | 'postgres';
type NotificationAdapterKey = 'log' | 'webhook';

interface CreateOrderCommand {
  customerId: string;
  amountCents: number;
  currency: 'EUR';
  source: 'http' | 'cli' | 'queue';
}

interface PaymentReceipt {
  provider: string;
  transactionId: string;
  authorized: true;
}

interface DeliveryReceipt {
  channel: string;
  deliveryId: string;
}

interface OrderEntity {
  id: string;
  customerId: string;
  amountCents: number;
  currency: 'EUR';
  status: 'PAID';
  paymentProvider: string;
  createdAt: string;
}

interface PersistedOrder extends OrderEntity {
  storage: 'InMemory' | 'PostgreSQL';
  persistedAt: string;
}

interface OrderCreatedEvent {
  orderId: string;
  customerId: string;
  amountCents: number;
  occurredAt: string;
}

interface PaymentPort {
  charge(input: {
    amountCents: number;
    currency: string;
    reference: string;
  }): Promise<PaymentReceipt>;
}

interface OrderRepositoryPort {
  save(order: OrderEntity): Promise<PersistedOrder>;
}

interface NotificationPort {
  publishOrderCreated(event: OrderCreatedEvent): Promise<DeliveryReceipt>;
}

interface UseCaseDeps {
  paymentPort: PaymentPort;
  orderRepository: OrderRepositoryPort;
  notificationPort: NotificationPort;
}

interface TimelineEntry {
  label: string;
  detail: string;
  time: string;
}

type DemoResult =
  | { type: 'idle' }
  | {
      type: 'success';
      payload: {
        order: PersistedOrder;
        payment: PaymentReceipt;
        delivery: DeliveryReceipt;
        selectedAdapters: {
          inbound: string;
          payment: string;
          repository: string;
          notification: string;
        };
      };
    }
  | { type: 'error'; message: string };

interface HexagonalArchitectureDemoProps {
  className?: string;
  compact?: boolean;
}

const INBOUND_ADAPTERS: Record<
  InboundAdapterKey,
  {
    label: string;
    description: string;
    latencyMs: number;
    source: CreateOrderCommand['source'];
    customerPrefix: string;
  }
> = {
  'http-controller': {
    label: 'HttpCreateOrderController',
    description: 'Adapter entrant API HTTP (JSON request -> command)',
    latencyMs: 120,
    source: 'http',
    customerPrefix: 'http',
  },
  'cli-handler': {
    label: 'CliCreateOrderHandler',
    description: 'Adapter entrant CLI pour scripts ops',
    latencyMs: 80,
    source: 'cli',
    customerPrefix: 'cli',
  },
  'queue-consumer': {
    label: 'QueueCreateOrderConsumer',
    description: 'Adapter entrant message queue (event -> command)',
    latencyMs: 170,
    source: 'queue',
    customerPrefix: 'queue',
  },
};

const PAYMENT_ADAPTERS: Record<
  PaymentAdapterKey,
  {
    label: string;
    description: string;
    latencyMs: number;
    provider: string;
    behavior: 'success' | 'declined';
  }
> = {
  stripe: {
    label: 'StripePaymentAdapter',
    description: 'Provider externe classique (latence reseau)',
    latencyMs: 700,
    provider: 'Stripe',
    behavior: 'success',
  },
  'mock-fast': {
    label: 'MockPaymentAdapter',
    description: 'Double de test rapide',
    latencyMs: 140,
    provider: 'MockPay',
    behavior: 'success',
  },
  'mock-declined': {
    label: 'FailingPaymentAdapter',
    description: 'Simule un paiement refuse',
    latencyMs: 260,
    provider: 'MockPay',
    behavior: 'declined',
  },
};

const REPOSITORY_ADAPTERS: Record<
  RepositoryAdapterKey,
  {
    label: string;
    description: string;
    latencyMs: number;
    storage: PersistedOrder['storage'];
  }
> = {
  memory: {
    label: 'InMemoryOrderRepository',
    description: 'Adapter ultra rapide pour tests et preview',
    latencyMs: 45,
    storage: 'InMemory',
  },
  postgres: {
    label: 'PostgresOrderRepository',
    description: 'Adapter SQL production',
    latencyMs: 330,
    storage: 'PostgreSQL',
  },
};

const NOTIFICATION_ADAPTERS: Record<
  NotificationAdapterKey,
  {
    label: string;
    description: string;
    latencyMs: number;
    channel: string;
  }
> = {
  log: {
    label: 'LogNotificationAdapter',
    description: 'Adapter sortant simple (application log)',
    latencyMs: 25,
    channel: 'app-log',
  },
  webhook: {
    label: 'WebhookNotificationAdapter',
    description: 'Adapter sortant webhook vers CRM/ERP',
    latencyMs: 220,
    channel: 'webhook',
  },
};

function sleep(durationMs: number) {
  return new Promise((resolve) => setTimeout(resolve, durationMs));
}

function formatPrice(cents: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(cents / 100);
}

function createPaymentPort(adapterKey: PaymentAdapterKey): PaymentPort {
  const config = PAYMENT_ADAPTERS[adapterKey];

  return {
    async charge({ amountCents, currency, reference }) {
      await sleep(config.latencyMs);

      if (config.behavior === 'declined') {
        throw new Error(
          `Paiement refuse par ${config.label} pour ${formatPrice(amountCents)} ${currency}`
        );
      }

      return {
        provider: config.provider,
        transactionId: `tx_${reference}_${Math.random().toString(36).slice(2, 8)}`,
        authorized: true,
      };
    },
  };
}

function createOrderRepositoryPort(
  adapterKey: RepositoryAdapterKey
): OrderRepositoryPort {
  const config = REPOSITORY_ADAPTERS[adapterKey];

  return {
    async save(order) {
      await sleep(config.latencyMs);
      return {
        ...order,
        storage: config.storage,
        persistedAt: new Date().toISOString(),
      };
    },
  };
}

function createNotificationPort(
  adapterKey: NotificationAdapterKey
): NotificationPort {
  const config = NOTIFICATION_ADAPTERS[adapterKey];

  return {
    async publishOrderCreated(event) {
      await sleep(config.latencyMs);
      return {
        channel: config.channel,
        deliveryId: `evt_${event.orderId}_${Math.random().toString(36).slice(2, 7)}`,
      };
    },
  };
}

async function createOrderUseCase(
  command: CreateOrderCommand,
  deps: UseCaseDeps,
  log: (label: string, detail: string) => void
) {
  log('Application: CreateOrderUseCase', 'Execution du use case via port entrant');
  log('Domain: Money VO', 'Validation du montant et des invariants metier');

  if (!Number.isInteger(command.amountCents) || command.amountCents < 100) {
    throw new Error('Le montant minimum est de 1,00 EUR');
  }

  const reference = `ord_${Date.now().toString(36)}`;

  log('Outbound port: PaymentPort', 'Demande d encaissement a un adapter externe');
  const payment = await deps.paymentPort.charge({
    amountCents: command.amountCents,
    currency: command.currency,
    reference,
  });

  log('Domain: Order entity', 'Creation de l aggregate Order en statut PAID');
  const order: OrderEntity = {
    id: reference,
    customerId: command.customerId,
    amountCents: command.amountCents,
    currency: command.currency,
    status: 'PAID',
    paymentProvider: payment.provider,
    createdAt: new Date().toISOString(),
  };

  log('Outbound port: OrderRepositoryPort', 'Persistance de la commande');
  const persistedOrder = await deps.orderRepository.save(order);

  const event: OrderCreatedEvent = {
    orderId: persistedOrder.id,
    customerId: persistedOrder.customerId,
    amountCents: persistedOrder.amountCents,
    occurredAt: persistedOrder.persistedAt,
  };

  log('Outbound port: NotificationPort', 'Publication de l event OrderCreated');
  const delivery = await deps.notificationPort.publishOrderCreated(event);

  log('Presenter', 'Transformation du resultat en payload de reponse');

  return {
    order: persistedOrder,
    payment,
    delivery,
  };
}

export function HexagonalArchitectureDemo({
  className,
  compact = false,
}: HexagonalArchitectureDemoProps) {
  const [amountInput, setAmountInput] = useState('12900');
  const [inboundAdapter, setInboundAdapter] =
    useState<InboundAdapterKey>('http-controller');
  const [paymentAdapter, setPaymentAdapter] = useState<PaymentAdapterKey>('stripe');
  const [repositoryAdapter, setRepositoryAdapter] =
    useState<RepositoryAdapterKey>('memory');
  const [notificationAdapter, setNotificationAdapter] =
    useState<NotificationAdapterKey>('log');
  const [isRunning, setIsRunning] = useState(false);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [result, setResult] = useState<DemoResult>({ type: 'idle' });

  const selectedInbound = useMemo(
    () => INBOUND_ADAPTERS[inboundAdapter],
    [inboundAdapter]
  );
  const selectedPayment = useMemo(
    () => PAYMENT_ADAPTERS[paymentAdapter],
    [paymentAdapter]
  );
  const selectedRepository = useMemo(
    () => REPOSITORY_ADAPTERS[repositoryAdapter],
    [repositoryAdapter]
  );
  const selectedNotification = useMemo(
    () => NOTIFICATION_ADAPTERS[notificationAdapter],
    [notificationAdapter]
  );

  const runDemo = useCallback(async () => {
    if (isRunning) return;

    const parsedAmount = Number(amountInput);
    if (!Number.isFinite(parsedAmount)) {
      setResult({ type: 'error', message: 'Le montant doit etre numerique.' });
      return;
    }

    setIsRunning(true);
    setTimeline([]);
    setResult({ type: 'idle' });

    const appendTimeline = (label: string, detail: string) => {
      setTimeline((current) => [
        ...current,
        {
          label,
          detail,
          time: new Date().toLocaleTimeString('fr-FR'),
        },
      ]);
    };

    try {
      appendTimeline(
        `Inbound adapter: ${selectedInbound.label}`,
        'Transformation du payload entrant en CreateOrderCommand'
      );

      await sleep(selectedInbound.latencyMs);

      const command: CreateOrderCommand = {
        customerId: `${selectedInbound.customerPrefix}_customer_demo`,
        amountCents: Math.round(parsedAmount),
        currency: 'EUR',
        source: selectedInbound.source,
      };

      const useCaseResult = await createOrderUseCase(
        command,
        {
          paymentPort: createPaymentPort(paymentAdapter),
          orderRepository: createOrderRepositoryPort(repositoryAdapter),
          notificationPort: createNotificationPort(notificationAdapter),
        },
        appendTimeline
      );

      setResult({
        type: 'success',
        payload: {
          order: useCaseResult.order,
          payment: useCaseResult.payment,
          delivery: useCaseResult.delivery,
          selectedAdapters: {
            inbound: selectedInbound.label,
            payment: selectedPayment.label,
            repository: selectedRepository.label,
            notification: selectedNotification.label,
          },
        },
      });
    } catch (error) {
      setResult({
        type: 'error',
        message: error instanceof Error ? error.message : 'Erreur inattendue',
      });
    } finally {
      setIsRunning(false);
    }
  }, [
    amountInput,
    isRunning,
    notificationAdapter,
    paymentAdapter,
    repositoryAdapter,
    selectedInbound,
    selectedNotification.label,
    selectedPayment.label,
    selectedRepository.label,
  ]);

  const resetDemo = useCallback(() => {
    if (isRunning) return;
    setTimeline([]);
    setResult({ type: 'idle' });
  }, [isRunning]);

  return (
    <div
      className={cn(
        'space-y-6 rounded-2xl border border-border/50 bg-card p-4 md:p-6 shadow-sm',
        className
      )}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h4 className="text-xl font-black tracking-tight text-foreground">
            Sandbox Hexagonal Architecture
          </h4>
          <span className="rounded-md bg-cyan-500/15 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-cyan-700 dark:text-cyan-400">
            interactif
          </span>
        </div>
        {!compact && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            Cette simulation couvre les briques complete d un flux hexagonal:
            adapter entrant, use case, entites domaine, ports sortants et adapters
            d infrastructure.
          </p>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        <label className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Montant (centimes)
          </span>
          <input
            type="number"
            min={100}
            step={100}
            value={amountInput}
            onChange={(event) => setAmountInput(event.target.value)}
            className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm"
          />
        </label>

        <label className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Adapter entrant
          </span>
          <select
            value={inboundAdapter}
            onChange={(event) =>
              setInboundAdapter(event.target.value as InboundAdapterKey)
            }
            className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm"
          >
            {Object.entries(INBOUND_ADAPTERS).map(([key, adapter]) => (
              <option key={key} value={key}>
                {adapter.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Adapter paiement
          </span>
          <select
            value={paymentAdapter}
            onChange={(event) => setPaymentAdapter(event.target.value as PaymentAdapterKey)}
            className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm"
          >
            {Object.entries(PAYMENT_ADAPTERS).map(([key, adapter]) => (
              <option key={key} value={key}>
                {adapter.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Adapter repository
          </span>
          <select
            value={repositoryAdapter}
            onChange={(event) =>
              setRepositoryAdapter(event.target.value as RepositoryAdapterKey)
            }
            className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm"
          >
            {Object.entries(REPOSITORY_ADAPTERS).map(([key, adapter]) => (
              <option key={key} value={key}>
                {adapter.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Adapter notification
          </span>
          <select
            value={notificationAdapter}
            onChange={(event) =>
              setNotificationAdapter(event.target.value as NotificationAdapterKey)
            }
            className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm"
          >
            {Object.entries(NOTIFICATION_ADAPTERS).map(([key, adapter]) => (
              <option key={key} value={key}>
                {adapter.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-border/40 bg-muted/20 p-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <SquareTerminal className="h-4 w-4 text-violet-600" />
            Inbound actif
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{selectedInbound.description}</p>
        </div>
        <div className="rounded-xl border border-border/40 bg-muted/20 p-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Server className="h-4 w-4 text-cyan-600" />
            Payment actif
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{selectedPayment.description}</p>
        </div>
        <div className="rounded-xl border border-border/40 bg-muted/20 p-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Database className="h-4 w-4 text-emerald-600" />
            Repository actif
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{selectedRepository.description}</p>
        </div>
        <div className="rounded-xl border border-border/40 bg-muted/20 p-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Bell className="h-4 w-4 text-orange-600" />
            Notification active
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{selectedNotification.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={runDemo}
          disabled={isRunning}
          className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-wait disabled:opacity-70"
        >
          {isRunning ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Play className="h-4 w-4" />
          )}
          {isRunning ? 'Execution...' : 'Executer le flux complet'}
        </button>
        <button
          onClick={resetDemo}
          disabled={isRunning}
          className="inline-flex items-center gap-2 rounded-lg border border-border/60 px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted/40 disabled:opacity-70"
        >
          <ArrowRightLeft className="h-4 w-4" />
          Reinitialiser
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border/50 bg-background/70 p-4">
          <h5 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Timeline de traitement
          </h5>
          <div className="mt-3 space-y-2">
            {timeline.length === 0 && (
              <p className="text-sm text-muted-foreground">Aucune execution pour le moment.</p>
            )}
            {timeline.map((entry, index) => (
              <div
                key={`${entry.time}-${index}`}
                className="rounded-lg border border-border/30 bg-muted/20 px-3 py-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground">{entry.label}</p>
                  <span className="text-[11px] text-muted-foreground">{entry.time}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{entry.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border/50 bg-background/70 p-4">
          <h5 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Resultat
          </h5>

          {result.type === 'idle' && (
            <p className="mt-3 text-sm text-muted-foreground">
              Executez la demo pour voir le resultat du use case.
            </p>
          )}

          {result.type === 'success' && (
            <div className="mt-3 space-y-3">
              <p className="inline-flex items-center gap-2 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Commande creee
              </p>
              <pre className="overflow-x-auto rounded-lg border border-border/40 bg-muted/20 p-3 text-xs leading-relaxed text-foreground/90">
                <code>
                  {JSON.stringify(
                    {
                      orderId: result.payload.order.id,
                      status: result.payload.order.status,
                      amount: formatPrice(result.payload.order.amountCents),
                      paymentProvider: result.payload.payment.provider,
                      storage: result.payload.order.storage,
                      notificationChannel: result.payload.delivery.channel,
                      adapters: result.payload.selectedAdapters,
                    },
                    null,
                    2
                  )}
                </code>
              </pre>
              <p className="text-xs text-muted-foreground">
                Le domaine reste stable. Seules les implementations des ports
                changent entre les executions.
              </p>
            </div>
          )}

          {result.type === 'error' && (
            <div className="mt-3 space-y-2">
              <p className="inline-flex items-center gap-2 rounded-md bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-700 dark:text-red-400">
                <XCircle className="h-3.5 w-3.5" />
                Execution en erreur
              </p>
              <p className="text-sm text-foreground/85">{result.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
