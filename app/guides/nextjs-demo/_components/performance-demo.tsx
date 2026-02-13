'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Timer, Zap, TrendingUp, TrendingDown, Gauge } from 'lucide-react';

interface Scenario {
  name: string;
  renderComponent: (props: { slowMode: boolean; runId: number }) => React.ReactNode;
  description?: string;
}

interface PerformanceDemoProps {
  scenarios: Scenario[];
  itemCount?: number;
  onItemCountChange?: (count: number) => void;
}

interface PerformanceMetrics {
  renderTime: number;
}

function MeasuredScenario({
  scenario,
  slowMode,
  runId,
  onMeasure,
}: {
  scenario: Scenario;
  slowMode: boolean;
  runId: number;
  onMeasure: (name: string, time: number) => void;
}) {
  const startRef = useRef<number>(0);

  useEffect(() => {
    if (runId > 0 && startRef.current > 0) {
      const endTime = performance.now();
      onMeasure(scenario.name, endTime - startRef.current);
    }
  }, [runId, scenario.name, onMeasure]);

  if (runId > 0) {
    startRef.current = performance.now();
  }

  return <>{scenario.renderComponent({ slowMode, runId })}</>;
}

export function PerformanceDemo({
  scenarios,
  itemCount = 50,
  onItemCountChange,
}: PerformanceDemoProps) {
  const [runId, setRunId] = useState(0);
  const [slowMode, setSlowMode] = useState(false);
  const [metrics, setMetrics] = useState<Record<string, PerformanceMetrics>>({});
  const [animateResults, setAnimateResults] = useState(false);

  const handleRunTest = useCallback(() => {
    setAnimateResults(false);
    setMetrics({});
    setRunId((prev) => prev + 1);
    requestAnimationFrame(() => {
      setAnimateResults(true);
    });
  }, []);

  const handleMeasure = useCallback((name: string, time: number) => {
    setMetrics((prev) => ({
      ...prev,
      [name]: { renderTime: time },
    }));
  }, []);

  const getPerformanceColor = (time: number): string => {
    if (time < 10) return 'text-green-600 dark:text-green-400';
    if (time < 50) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getBarColor = (time: number): string => {
    if (time < 10) return 'bg-gradient-to-r from-green-500 to-green-600';
    if (time < 50) return 'bg-gradient-to-r from-orange-500 to-orange-600';
    return 'bg-gradient-to-r from-red-500 to-red-600';
  };

  const getBarWidth = (time: number, maxTime: number): number => {
    return maxTime > 0 ? (time / maxTime) * 100 : 0;
  };

  const maxTime = Math.max(
    ...Object.values(metrics).map((m) => m.renderTime || 0),
    1
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-1">
            Comparateur de Performance
          </h4>
          <p className="text-sm text-foreground/70">
            Comparez les temps de rendu entre differentes approches d&apos;optimisation
          </p>
        </div>
        <button
          onClick={handleRunTest}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 shrink-0"
        >
          <Zap className="w-4 h-4" />
          Lancer le test
        </button>
      </div>

      {/* Controles */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Toggle mode ralenti */}
        <button
          onClick={() => setSlowMode(!slowMode)}
          className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors flex items-center gap-2 ${
            slowMode
              ? 'bg-primary/10 text-primary border-primary/30'
              : 'text-muted-foreground border-border hover:bg-muted'
          }`}
        >
          <Gauge className="w-4 h-4" />
          Mode ralenti {slowMode ? 'actif' : 'inactif'}
        </button>

        {/* Slider nombre d'items */}
        {onItemCountChange && (
          <div className="flex items-center gap-3 flex-1 px-3 py-2 bg-muted/50 rounded-lg border border-border">
            <label className="text-sm font-medium text-foreground whitespace-nowrap">
              Items
            </label>
            <input
              type="range"
              min={10}
              max={200}
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
      </div>

      {slowMode && (
        <p className="text-xs text-foreground/60 px-3 py-2 bg-muted/30 rounded-lg border border-border/50">
          Le mode ralenti simule visuellement les differences de vitesse : les items apparaissent progressivement.
          Plus la strategie est optimisee, plus les items apparaissent vite.
        </p>
      )}

      {/* Grille des scenarios avec composants reels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scenarios.map((scenario) => {
          const metric = metrics[scenario.name];

          return (
            <div
              key={scenario.name}
              className="border border-border rounded-lg overflow-hidden bg-card"
            >
              {/* Header du scenario */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/20">
                <div className="flex-1">
                  <h5 className="font-semibold text-foreground text-sm">
                    {scenario.name}
                  </h5>
                  {scenario.description && (
                    <p className="text-xs text-foreground/60">
                      {scenario.description}
                    </p>
                  )}
                </div>
                {metric && (
                  <div className="flex items-center gap-1.5">
                    {metric.renderTime < 20 ? (
                      <TrendingDown className="w-3.5 h-3.5 text-green-500" />
                    ) : (
                      <TrendingUp className="w-3.5 h-3.5 text-red-500" />
                    )}
                    <span
                      className={`text-sm font-mono font-semibold ${getPerformanceColor(
                        metric.renderTime
                      )}`}
                    >
                      {metric.renderTime.toFixed(1)}ms
                    </span>
                  </div>
                )}
              </div>

              {/* Composant rendu */}
              <div className="p-3">
                {runId > 0 ? (
                  <MeasuredScenario
                    key={runId}
                    scenario={scenario}
                    slowMode={slowMode}
                    runId={runId}
                    onMeasure={handleMeasure}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-foreground/40">
                    <Timer className="w-8 h-8 mb-2 opacity-50" />
                    <p className="text-sm">Cliquez sur &quot;Lancer le test&quot;</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Graphique comparatif */}
      {Object.keys(metrics).length > 1 && (
        <div className="border border-border rounded-lg p-4 bg-card">
          <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Comparaison visuelle
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
                        metric.renderTime
                      )}`}
                    >
                      {metric.renderTime.toFixed(1)} ms
                    </span>
                  </div>
                  <div className="h-8 bg-muted rounded overflow-hidden flex items-center">
                    <div
                      className={`h-full transition-all duration-700 ease-out flex items-center justify-end pr-2 ${getBarColor(
                        metric.renderTime
                      )}`}
                      style={{
                        width: animateResults
                          ? `${Math.max(getBarWidth(metric.renderTime, maxTime), 3)}%`
                          : '0%',
                        transitionDelay: `${scenarios.indexOf(scenario) * 150}ms`,
                      }}
                    >
                      {animateResults &&
                        getBarWidth(metric.renderTime, maxTime) > 15 && (
                          <span className="text-white text-xs font-bold">
                            {metric.renderTime.toFixed(1)} ms
                          </span>
                        )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legende */}
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
                <span className="text-foreground/70">
                  A optimiser (&gt; 50ms)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
