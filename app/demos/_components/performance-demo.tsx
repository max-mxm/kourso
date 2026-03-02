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
    if (time < 10) return 'text-emerald-600 dark:text-emerald-400';
    if (time < 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getBarColor = (time: number): string => {
    if (time < 10) return 'bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30';
    if (time < 50) return 'bg-gradient-to-r from-yellow-500 to-amber-500 shadow-lg shadow-yellow-500/30';
    return 'bg-gradient-to-r from-red-500 to-orange-600 shadow-lg shadow-red-500/30';
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-2xl font-black tracking-tight text-foreground mb-2">
            Comparateur de Performance
          </h4>
          <p className="text-sm text-foreground/70">
            Comparez les temps de rendu entre différentes approches d&apos;optimisation
          </p>
        </div>
        <button
          onClick={handleRunTest}
          className="group relative px-6 py-3 bg-red-500 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30 active:scale-95 flex items-center gap-2 shrink-0 animate-pulse-shadow"
        >
          <Zap className="w-5 h-5 transition-transform duration-200 group-hover:rotate-12" strokeWidth={2.5} />
          Lancer le test
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setSlowMode(!slowMode)}
          onMouseEnter={(e) => {
            if (!slowMode) {
              e.currentTarget.classList.add('animate-wiggle');
            }
          }}
          onAnimationEnd={(e) => {
            e.currentTarget.classList.remove('animate-wiggle');
          }}
          className={`px-4 py-2.5 text-sm font-bold rounded-xl border-2 transition-all duration-200 flex items-center gap-2 ${
            slowMode
              ? 'bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/40 shadow-md shadow-red-500/20'
              : 'text-foreground/70 border-border/50 hover:border-red-500/30 hover:text-red-600 hover:-translate-y-0.5'
          }`}
        >
          <Gauge className="w-4 h-4" strokeWidth={2.5} />
          Mode ralenti {slowMode ? 'actif' : 'inactif'}
        </button>

        {onItemCountChange && (
          <div className="flex items-center gap-4 flex-1 px-4 py-3 bg-muted/50 rounded-xl border-2 border-border/50 hover:border-red-500/20 transition-all duration-300 group">
            <label className="text-sm font-bold text-foreground whitespace-nowrap">
              Items
            </label>
            <input
              type="range"
              min={10}
              max={200}
              step={10}
              value={itemCount}
              onChange={(e) => onItemCountChange(Number(e.target.value))}
              className="flex-1 accent-red-500 cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-200 [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:active:scale-125"
            />
            <span className="text-base font-mono font-black text-red-600 dark:text-red-400 min-w-[3ch] text-right tabular-nums">
              {itemCount}
            </span>
          </div>
        )}
      </div>

      {slowMode && (
        <p className="text-xs text-foreground/60 px-4 py-3 bg-yellow-500/10 rounded-xl border-2 border-yellow-500/20">
          Le mode ralenti simule visuellement les différences de vitesse : les items apparaissent progressivement.
          Plus la stratégie est optimisée, plus les items apparaissent vite.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scenarios.map((scenario) => {
          const metric = metrics[scenario.name];

          return (
            <div
              key={scenario.name}
              className="border-2 border-border/50 rounded-xl overflow-hidden bg-card hover:border-red-500/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b-2 border-border/30 bg-muted/20">
                <div className="flex-1">
                  <h5 className="font-bold text-foreground text-sm">
                    {scenario.name}
                  </h5>
                  {scenario.description && (
                    <p className="text-xs text-foreground/60 mt-0.5">
                      {scenario.description}
                    </p>
                  )}
                </div>
                {metric && (
                  <div className="flex items-center gap-2">
                    {metric.renderTime < 20 ? (
                      <TrendingDown className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-red-500" strokeWidth={2.5} />
                    )}
                    <span
                      className={`text-base font-mono font-black tabular-nums ${getPerformanceColor(
                        metric.renderTime
                      )}`}
                    >
                      {metric.renderTime.toFixed(1)}ms
                    </span>
                  </div>
                )}
              </div>

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
                    <Timer className="w-8 h-8 mb-2 opacity-50" strokeWidth={2} />
                    <p className="text-sm">Cliquez sur &quot;Lancer le test&quot;</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {Object.keys(metrics).length > 1 && (
        <div className="border-2 border-border/50 rounded-2xl p-6 bg-card">
          <h5 className="text-xl font-black tracking-tight text-foreground mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-500" strokeWidth={2.5} />
            Comparaison visuelle
          </h5>
          <div className="space-y-4">
            {scenarios.map((scenario) => {
              const metric = metrics[scenario.name];
              if (!metric) return null;

              return (
                <div key={scenario.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-bold">
                      {scenario.name}
                    </span>
                    <span
                      className={`font-mono font-black text-base tabular-nums ${getPerformanceColor(
                        metric.renderTime
                      )}`}
                    >
                      {metric.renderTime.toFixed(1)} ms
                    </span>
                  </div>
                  <div className="h-10 bg-muted/50 rounded-xl overflow-hidden flex items-center border-2 border-border/30">
                    <div
                      className={`h-full flex items-center justify-end pr-3 ${getBarColor(
                        metric.renderTime
                      )}`}
                      style={{
                        width: animateResults
                          ? `${Math.max(getBarWidth(metric.renderTime, maxTime), 3)}%`
                          : '0%',
                        transition: 'width 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
                        transitionDelay: `${scenarios.indexOf(scenario) * 150}ms`,
                      }}
                    >
                      {animateResults &&
                        getBarWidth(metric.renderTime, maxTime) > 15 && (
                          <span className="text-white text-sm font-black drop-shadow-md tabular-nums">
                            {metric.renderTime.toFixed(1)} ms
                          </span>
                        )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t-2 border-border/30">
            <div className="flex flex-wrap gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/30" />
                <span className="text-foreground/70 font-semibold">
                  Excellent (&lt; 10ms)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500 shadow-md shadow-yellow-500/30" />
                <span className="text-foreground/70 font-semibold">Acceptable (10-50ms)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500 shadow-md shadow-red-500/30" />
                <span className="text-foreground/70 font-semibold">
                  À optimiser (&gt; 50ms)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
