import { ArrowRight, Link2 } from 'lucide-react';

const inboundAdapters = [
  'HTTP Controller',
  'CLI Command',
  'Queue Consumer',
];

const outboundAdapters = [
  'SQL Repository',
  'Redis Cache',
  'Payment Provider',
];

export function HexagonalSchema() {
  return (
    <div className="space-y-4 rounded-xl border border-border/50 bg-card p-4 sm:p-6">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Link2 className="h-3.5 w-3.5" />
        Schema coeur + adapters
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-400">
            Adapters entrants
          </p>
          <ul className="mt-2 space-y-1 text-sm text-foreground/85">
            {inboundAdapters.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:flex justify-center text-muted-foreground">
          <ArrowRight className="h-5 w-5" />
        </div>

        <div className="rounded-lg border-2 border-primary/40 bg-primary/10 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Hexagone metier
          </p>
          <ul className="mt-2 space-y-1 text-sm text-foreground/85">
            <li>- Entites</li>
            <li>- Use cases</li>
            <li>- Ports (interfaces)</li>
          </ul>
        </div>

        <div className="hidden lg:flex justify-center text-muted-foreground">
          <ArrowRight className="h-5 w-5" />
        </div>

        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            Adapters sortants
          </p>
          <ul className="mt-2 space-y-1 text-sm text-foreground/85">
            {outboundAdapters.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Regle cle: les dependances pointent vers le centre (le metier). Les adapters
        peuvent changer sans impacter les regles metier.
      </p>
    </div>
  );
}
