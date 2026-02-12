'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

type DemoState = 'idle' | 'loading' | 'success' | 'error';
type DemoType = 'ssr' | 'ssg' | 'isr' | 'client';

interface InteractiveDemoProps {
  title: string;
  description: string;
  demoType: DemoType;
  onRun: () => Promise<{ data?: unknown; error?: string; timestamp?: number }>;
  className?: string;
}

const demoColors: Record<DemoType, string> = {
  ssr: 'rgb(0, 150, 136)', // Teal
  ssg: 'rgb(59, 130, 246)', // Blue
  isr: 'rgb(249, 115, 22)', // Orange
  client: 'rgb(168, 85, 247)', // Violet
};

const demoLabels: Record<DemoType, string> = {
  ssr: 'SSR',
  ssg: 'SSG',
  isr: 'ISR',
  client: 'Client',
};

export function InteractiveDemo({
  title,
  description,
  demoType,
  onRun,
  className
}: InteractiveDemoProps) {
  const [state, setState] = useState<DemoState>('idle');
  const [result, setResult] = useState<{ data?: unknown; error?: string; timestamp?: number } | null>(null);

  const handleRun = async () => {
    setState('loading');
    setResult(null);

    try {
      const response = await onRun();
      setResult(response);
      setState(response.error ? 'error' : 'success');
    } catch (error) {
      setResult({ error: String(error) });
      setState('error');
    }
  };

  const accentColor = demoColors[demoType];

  return (
    <div
      className={cn(
        'rounded-xl border-2 overflow-hidden bg-card shadow-sm transition-all duration-300',
        state === 'loading' && 'shadow-lg',
        className
      )}
      style={{ borderColor: state === 'idle' ? 'rgb(var(--border))' : accentColor }}
    >
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-bold px-2 py-1 rounded"
                style={{
                  backgroundColor: `${accentColor}15`,
                  color: accentColor
                }}
              >
                {demoLabels[demoType]}
              </span>
              <h4 className="text-lg font-bold text-foreground">{title}</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          <button
            onClick={handleRun}
            disabled={state === 'loading'}
            className={cn(
              'px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2',
              'border-2 disabled:opacity-50 disabled:cursor-not-allowed',
              state === 'idle' && 'border-border hover:border-primary bg-background hover:bg-primary/5',
              state === 'loading' && 'border-primary/50 bg-primary/5 cursor-wait',
              state === 'success' && 'border-green-500/50 bg-green-500/5',
              state === 'error' && 'border-red-500/50 bg-red-500/5'
            )}
          >
            {state === 'loading' && (
              <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            )}
            {state === 'idle' && 'Lancer la démo'}
            {state === 'loading' && 'Chargement...'}
            {state === 'success' && (
              <>
                <Check className="w-4 h-4" />
                Succès
              </>
            )}
            {state === 'error' && (
              <>
                <X className="w-4 h-4" />
                Erreur
              </>
            )}
          </button>
        </div>
      </div>

      {/* Result Panel */}
      {result && (
        <div
          className={cn(
            'p-6 transition-all duration-300',
            state === 'success' && 'bg-green-500/5',
            state === 'error' && 'bg-red-500/5'
          )}
        >
          {state === 'success' && result.data != null && (
            <div className="space-y-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Résultat
              </div>
              <pre className="text-sm bg-background/50 rounded-lg p-4 overflow-x-auto border border-border/50">
                <code>{JSON.stringify(result.data, null, 2)}</code>
              </pre>
              {result.timestamp && (
                <div className="text-xs text-muted-foreground">
                  Généré à {new Date(result.timestamp).toLocaleTimeString('fr-FR')}
                </div>
              )}
            </div>
          )}

          {state === 'error' && result.error && (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide">
                Erreur
              </div>
              <p className="text-sm text-foreground/80">{result.error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
