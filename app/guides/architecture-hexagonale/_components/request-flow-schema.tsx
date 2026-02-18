import { ArrowDown } from 'lucide-react';

const steps = [
  {
    title: '1. Adapter entrant',
    detail: 'Controller/API traduit la requete en commande metier.',
    color: 'text-cyan-700 dark:text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
  },
  {
    title: '2. Use case',
    detail: 'Le coeur applique les regles et orchestre les ports.',
    color: 'text-primary border-primary/30 bg-primary/10',
  },
  {
    title: '3. Ports sortants',
    detail: 'Le domaine appelle des interfaces abstraites.',
    color: 'text-orange-700 dark:text-orange-400 border-orange-500/30 bg-orange-500/10',
  },
  {
    title: '4. Adapters sortants',
    detail: 'DB, provider externe, cache implementent les ports.',
    color: 'text-emerald-700 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  },
];

export function RequestFlowSchema() {
  return (
    <div className="space-y-3 rounded-xl border border-border/50 bg-card p-4 sm:p-6">
      <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Schema de flux d execution
      </h4>

      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={step.title}>
            <div className={`rounded-lg border p-3 ${step.color}`}>
              <p className="text-sm font-semibold">{step.title}</p>
              <p className="mt-1 text-xs text-foreground/80">{step.detail}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="flex justify-center py-1 text-muted-foreground">
                <ArrowDown className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
