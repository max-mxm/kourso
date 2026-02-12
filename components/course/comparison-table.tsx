'use client';

import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface RenderingMode {
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  useCases: string[];
  color: string;
}

interface ComparisonTableProps {
  modes: RenderingMode[];
  className?: string;
}

export function ComparisonTable({ modes, className }: ComparisonTableProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* Mobile: Stacked cards */}
      <div className="space-y-4 md:hidden">
        {modes.map((mode) => (
          <div
            key={mode.name}
            className="rounded-xl border border-border/50 overflow-hidden shadow-sm"
          >
            {/* Card header */}
            <div
              className="px-4 py-3 border-b-2"
              style={{
                borderBottomColor: mode.color,
                backgroundColor: `${mode.color}10`
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: mode.color }}
                />
                <span className="font-bold text-foreground">{mode.name}</span>
              </div>
            </div>

            {/* Description */}
            <div className="px-4 py-3 text-sm text-muted-foreground leading-relaxed">
              {mode.description}
            </div>

            {/* Avantages */}
            <div className="px-4 py-3 bg-muted/20">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Avantages
              </div>
              <ul className="space-y-1.5">
                {mode.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/80">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inconvenients */}
            <div className="px-4 py-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Inconvenients
              </div>
              <ul className="space-y-1.5">
                {mode.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <X className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/80">{con}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cas d'usage */}
            <div className="px-4 py-3 bg-muted/20">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Cas d&apos;usage
              </div>
              <ul className="space-y-1.5">
                {mode.useCases.map((useCase, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-muted-foreground/50 mt-0.5">•</span>
                    <span className="text-foreground/80">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Table layout */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-border/50 shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {modes.map((mode) => (
                <th
                  key={mode.name}
                  className="p-4 text-left font-bold border-b-2 transition-colors"
                  style={{
                    borderBottomColor: mode.color,
                    backgroundColor: `${mode.color}10`
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: mode.color }}
                    />
                    <span className="text-foreground">{mode.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Description Row */}
            <tr className="bg-background">
              {modes.map((mode, index) => (
                <td
                  key={`${mode.name}-desc`}
                  className={cn(
                    'p-4 align-top border-r border-border/30',
                    index === modes.length - 1 && 'border-r-0'
                  )}
                >
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {mode.description}
                  </div>
                </td>
              ))}
            </tr>

            {/* Avantages Row */}
            <tr className="bg-muted/20">
              {modes.map((mode, index) => (
                <td
                  key={`${mode.name}-pros`}
                  className={cn(
                    'p-4 align-top border-r border-border/30',
                    index === modes.length - 1 && 'border-r-0'
                  )}
                >
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Avantages
                  </div>
                  <ul className="space-y-1.5">
                    {mode.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-foreground/80">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Inconvenients Row */}
            <tr className="bg-background">
              {modes.map((mode, index) => (
                <td
                  key={`${mode.name}-cons`}
                  className={cn(
                    'p-4 align-top border-r border-border/30',
                    index === modes.length - 1 && 'border-r-0'
                  )}
                >
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Inconvenients
                  </div>
                  <ul className="space-y-1.5">
                    {mode.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <X className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                        <span className="text-foreground/80">{con}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Cas d'usage Row */}
            <tr className="bg-muted/20">
              {modes.map((mode, index) => (
                <td
                  key={`${mode.name}-uses`}
                  className={cn(
                    'p-4 align-top border-r border-border/30',
                    index === modes.length - 1 && 'border-r-0'
                  )}
                >
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Cas d&apos;usage
                  </div>
                  <ul className="space-y-1.5">
                    {mode.useCases.map((useCase, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-muted-foreground/50 mt-0.5">•</span>
                        <span className="text-foreground/80">{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
