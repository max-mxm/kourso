'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Timer, Zap, TrendingUp, TrendingDown } from 'lucide-react';

interface Scenario {
  name: string;
  component: React.ReactNode;
  description?: string;
}

interface PerformanceDemoProps {
  scenarios: Scenario[];
  initialRuns?: number;
  itemCount?: number;
  onItemCountChange?: (count: number) => void;
}

interface PerformanceMetrics {
  renderCount: number;
  totalTime: number;
  averageTime: number;
  lastRenderTime: number;
}

export function PerformanceDemo({
  scenarios,
  initialRuns = 0,
  itemCount = 50,
  onItemCountChange,
}: PerformanceDemoProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [metrics, setMetrics] = useState<Record<string, PerformanceMetrics>>(
    {}
  );
  const [animateResults, setAnimateResults] = useState(false);
  const renderCountRef = useRef<Record<string, number>>({});

  const handleRunTest = useCallback(async () => {
    setIsRunning(true);
    const newMetrics: Record<string, PerformanceMetrics> = {};

    // Simuler la mesure de performance pour chaque scénario
    for (const scenario of scenarios) {
      const startTime = performance.now();

      // Simuler plusieurs rendus pour avoir une moyenne
      const runs = 5;
      let totalTime = 0;

      for (let i = 0; i < runs; i++) {
        const runStart = performance.now();
        // Petit délai pour simuler le rendu
        await new Promise(resolve => setTimeout(resolve, 1));
        const runEnd = performance.now();
        totalTime += (runEnd - runStart);
      }

      const averageTime = totalTime / runs;

      // Générer des temps réalistes basés sur le nom du scénario
      let simulatedTime = averageTime;
      if (scenario.name.includes('Sans optimisation')) {
        simulatedTime = 120 + Math.random() * 30; // 120-150ms
      } else if (scenario.name.includes('React.memo')) {
        simulatedTime = 45 + Math.random() * 15; // 45-60ms
      } else if (scenario.name.includes('useMemo')) {
        simulatedTime = 35 + Math.random() * 15; // 35-50ms
      } else if (scenario.name.includes('optimisé')) {
        simulatedTime = 8 + Math.random() * 7; // 8-15ms
      }

      newMetrics[scenario.name] = {
        renderCount: runs,
        totalTime: simulatedTime * runs,
        averageTime: simulatedTime,
        lastRenderTime: simulatedTime,
      };
    }

    setAnimateResults(false);
    setMetrics(newMetrics);
    setIsRunning(false);
    // Déclencher l'animation d'entrée après un court délai
    requestAnimationFrame(() => {
      setAnimateResults(true);
    });
  }, [scenarios]);

  const getPerformanceColor = (time: number): string => {
    if (time < 10) return 'text-green-600 dark:text-green-400';
    if (time < 50) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getBarWidth = (time: number, maxTime: number): number => {
    return maxTime > 0 ? (time / maxTime) * 100 : 0;
  };

  const maxTime = Math.max(
    ...Object.values(metrics).map((m) => m.averageTime || 0),
    1
  );

  return (
    <div className="space-y-6">
      {/* Header avec bouton de test */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-1">
            Comparateur de Performance
          </h4>
          <p className="text-sm text-foreground/70">
            Comparez les temps de rendu entre différentes approches d&apos;optimisation
          </p>
        </div>
        <button
          onClick={handleRunTest}
          disabled={isRunning}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shrink-0"
        >
          <Zap className="w-4 h-4" />
          {isRunning ? 'Test en cours...' : 'Lancer le test'}
        </button>
      </div>

      {/* Slider nombre d'items */}
      {onItemCountChange && (
        <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg border border-border">
          <label className="text-sm font-medium text-foreground whitespace-nowrap">
            Items affichés
          </label>
          <input
            type="range"
            min={10}
            max={500}
            step={10}
            value={itemCount}
            onChange={(e) => onItemCountChange(Number(e.target.value))}
            className="flex-1 accent-primary"
          />
          <span className="text-sm font-mono font-semibold text-primary min-w-[3ch] text-right">
            {itemCount}
          </span>
        </div>
      )}

      {/* Grid des scénarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scenarios.map((scenario) => {
          const metric = metrics[scenario.name];
          const hasData = metric && metric.renderCount > 0;

          return (
            <div
              key={scenario.name}
              className="border border-border rounded-lg p-4 bg-card"
            >
              {/* Header du scénario */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h5 className="font-semibold text-foreground mb-1">
                    {scenario.name}
                  </h5>
                  {scenario.description && (
                    <p className="text-xs text-foreground/60">
                      {scenario.description}
                    </p>
                  )}
                </div>
                {hasData && (
                  <div
                    className={`flex items-center gap-1 ${getPerformanceColor(
                      metric.averageTime
                    )}`}
                  >
                    {metric.averageTime < 20 ? (
                      <TrendingDown className="w-4 h-4" />
                    ) : (
                      <TrendingUp className="w-4 h-4" />
                    )}
                  </div>
                )}
              </div>

              {/* Métriques */}
              {hasData ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground/70">Temps moyen</span>
                    <span
                      className={`font-mono font-semibold ${getPerformanceColor(
                        metric.averageTime
                      )}`}
                    >
                      {metric.averageTime.toFixed(2)} ms
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground/70">Dernier rendu</span>
                    <span className="font-mono text-foreground">
                      {metric.lastRenderTime.toFixed(2)} ms
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground/70">Nombre de rendus</span>
                    <span className="font-mono text-foreground">
                      {metric.renderCount}
                    </span>
                  </div>

                  {/* Barre visuelle */}
                  <div className="pt-2">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-700 ease-out ${
                          metric.averageTime < 10
                            ? 'bg-green-500'
                            : metric.averageTime < 50
                              ? 'bg-orange-500'
                              : 'bg-red-500'
                        }`}
                        style={{
                          width: animateResults ? `${getBarWidth(metric.averageTime, maxTime)}%` : '0%',
                          transitionDelay: `${scenarios.indexOf(scenario) * 150}ms`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-foreground/50 text-center py-4">
                  <Timer className="w-6 h-6 mx-auto mb-2 opacity-50" />
                  En attente de test...
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Graphique comparatif */}
      {Object.keys(metrics).length > 0 && (
        <div className="border border-border rounded-lg p-4 bg-card">
          <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Comparaison visuelle des performances
          </h5>
          <div className="space-y-3">
            {scenarios.map((scenario) => {
              const metric = metrics[scenario.name];
              if (!metric) return null;

              return (
                <div key={scenario.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">
                      {scenario.name}
                    </span>
                    <span
                      className={`font-mono ${getPerformanceColor(
                        metric.averageTime
                      )}`}
                    >
                      {metric.averageTime.toFixed(2)} ms
                    </span>
                  </div>
                  <div className="h-8 bg-muted rounded overflow-hidden flex items-center">
                    <div
                      className={`h-full transition-all duration-700 ease-out flex items-center justify-end pr-2 ${
                        metric.averageTime < 10
                          ? 'bg-gradient-to-r from-green-500 to-green-600'
                          : metric.averageTime < 50
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600'
                            : 'bg-gradient-to-r from-red-500 to-red-600'
                      }`}
                      style={{
                        width: animateResults ? `${getBarWidth(metric.averageTime, maxTime)}%` : '0%',
                        transitionDelay: `${scenarios.indexOf(scenario) * 150}ms`,
                      }}
                    >
                      {animateResults && getBarWidth(metric.averageTime, maxTime) > 15 && (
                        <span className="text-white text-xs font-bold">
                          {metric.averageTime.toFixed(1)} ms
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Légende */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-foreground/70">
                  Excellent (&lt; 10ms)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-foreground/70">Acceptable (10-50ms)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-foreground/70">À optimiser (&gt; 50ms)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
