import { ArrowLeft } from 'lucide-react';

const layers = [
  {
    title: 'Infrastructure',
    examples: ['HTTP', 'CLI', 'SQL', 'Queue', 'Webhook'],
    className:
      'border-cyan-500/30 bg-cyan-500/10 text-cyan-800 dark:text-cyan-300',
  },
  {
    title: 'Adapters',
    examples: ['Controllers', 'Repositories', 'Gateways'],
    className:
      'border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300',
  },
  {
    title: 'Application',
    examples: ['Use cases', 'DTO', 'Ports'],
    className:
      'border-orange-500/30 bg-orange-500/10 text-orange-800 dark:text-orange-300',
  },
  {
    title: 'Domain',
    examples: ['Entities', 'Value Objects', 'Rules'],
    className:
      'border-primary/30 bg-primary/10 text-primary dark:text-primary',
  },
] as const;

export function DependencyDirectionSchema() {
  return (
    <div className="space-y-4 rounded-xl border border-border/50 bg-card p-4 sm:p-6">
      <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Schema direction des dependances
      </h4>

      <div className="grid gap-3 md:grid-cols-4">
        {layers.map((layer, index) => (
          <div key={layer.title} className="space-y-2">
            <div className={`rounded-lg border p-3 ${layer.className}`}>
              <p className="text-sm font-bold">{layer.title}</p>
              <ul className="mt-2 space-y-1 text-xs text-foreground/85">
                {layer.examples.map((example) => (
                  <li key={example}>- {example}</li>
                ))}
              </ul>
            </div>
            {index < layers.length - 1 && (
              <div className="flex justify-center md:justify-end text-muted-foreground">
                <ArrowLeft className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Lecture de droite a gauche: chaque couche peut dependre de la couche
        interne, jamais de la couche externe.
      </p>
    </div>
  );
}
