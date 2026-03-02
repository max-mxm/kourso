'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Play, RotateCcw, Wifi, WifiOff } from 'lucide-react';
import {
  RENDERING_SCENARIOS,
  ISR_MISS_SCENARIO,
  NETWORK_PRESETS,
  PHASE_COLORS,
  getMaxDuration,
  applyNetworkMultiplier,
  type RenderingScenarioConfig,
  type PhaseType,
} from '../_constants/rendering-scenarios-config';
import { RenderingTimeline } from './rendering-timeline';
import { RenderingPagePreview } from './rendering-page-preview';
import { RenderingComparisonChart } from './rendering-comparison-chart';

type SimulationState = 'idle' | 'running' | 'completed';

// Animation speed multiplier (1 = real-time, 0.5 = 2x faster display)
const ANIMATION_SPEED = 1.8;

export function RenderingSimulator() {
  const [simulationState, setSimulationState] = useState<SimulationState>('idle');
  const [elapsedMs, setElapsedMs] = useState(0);
  const [networkPreset, setNetworkPreset] = useState('fast');
  const [isrCacheHit, setIsrCacheHit] = useState(true);

  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);

  const activeScenarios: RenderingScenarioConfig[] = RENDERING_SCENARIOS.map((scenario) => {
    if (scenario.id === 'isr-hit' && !isrCacheHit) {
      return ISR_MISS_SCENARIO;
    }
    return scenario;
  });

  const networkMultiplier =
    NETWORK_PRESETS.find((p) => p.id === networkPreset)?.latencyMultiplier ?? 1;

  const displayScenarios = activeScenarios.map((s) =>
    applyNetworkMultiplier(s, networkMultiplier)
  );

  const maxDuration = getMaxDuration(displayScenarios);

  const stopAnimation = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  const startSimulation = useCallback(() => {
    stopAnimation();
    setElapsedMs(0);
    elapsedRef.current = 0;
    setSimulationState('running');
    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const rawElapsed = now - startTimeRef.current;
      const scaled = rawElapsed * ANIMATION_SPEED;
      elapsedRef.current = scaled;
      setElapsedMs(scaled);

      if (scaled < maxDuration) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setElapsedMs(maxDuration);
        setSimulationState('completed');
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [maxDuration, stopAnimation]);

  const resetSimulation = useCallback(() => {
    stopAnimation();
    setElapsedMs(0);
    elapsedRef.current = 0;
    setSimulationState('idle');
  }, [stopAnimation]);

  useEffect(() => {
    return () => stopAnimation();
  }, [stopAnimation]);

  useEffect(() => {
    if (simulationState === 'completed') {
      resetSimulation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkPreset, isrCacheHit]);

  const isRunning = simulationState === 'running';
  const hasCompleted = simulationState === 'completed';

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-2xl font-black tracking-tight text-foreground mb-2">
            Simulateur de Rendering
          </h4>
          <p className="text-sm text-foreground/70">
            Comparez visuellement les 5 modes de rendering Next.js
          </p>
        </div>
        <div className="flex gap-2">
          {simulationState === 'completed' && (
            <button
              onClick={resetSimulation}
              className="px-4 py-2.5 text-sm font-bold rounded-xl border-2 border-border/50 text-foreground/70 hover:border-purple-500/30 hover:text-purple-600 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" strokeWidth={2.5} />
              Reset
            </button>
          )}
          <button
            onClick={startSimulation}
            disabled={isRunning}
            className="group relative px-6 py-3 bg-purple-600 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 shrink-0 animate-pulse-shadow-purple"
          >
            <Play className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" strokeWidth={2.5} />
            {isRunning ? 'En cours...' : 'Lancer la simulation'}
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-3 px-4 py-3 bg-muted/50 rounded-xl border-2 border-border/50 hover:border-purple-500/20 transition-all duration-300">
          {networkPreset === 'fast' ? (
            <Wifi className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />
          ) : (
            <WifiOff className="w-5 h-5 text-orange-600" strokeWidth={2.5} />
          )}
          <span className="text-sm font-bold text-foreground whitespace-nowrap">Réseau</span>
          <div className="flex gap-2">
            {NETWORK_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setNetworkPreset(preset.id)}
                disabled={isRunning}
                onMouseEnter={(e) => {
                  if (networkPreset !== preset.id && !isRunning) {
                    e.currentTarget.classList.add('animate-wiggle');
                  }
                }}
                onAnimationEnd={(e) => {
                  e.currentTarget.classList.remove('animate-wiggle');
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border-2 transition-all duration-200 ${
                  networkPreset === preset.id
                    ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/30'
                    : 'text-foreground/70 border-border/50 hover:border-purple-500/30 hover:text-purple-600'
                } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsrCacheHit(!isrCacheHit)}
          disabled={isRunning}
          onMouseEnter={(e) => {
            if (!isRunning) {
              e.currentTarget.classList.add('animate-wiggle');
            }
          }}
          onAnimationEnd={(e) => {
            e.currentTarget.classList.remove('animate-wiggle');
          }}
          className={`px-4 py-2.5 text-sm font-bold rounded-xl border-2 transition-all duration-200 flex items-center gap-2 ${
            isrCacheHit
              ? 'text-foreground/70 border-border/50 hover:border-purple-500/30 hover:text-purple-600 hover:-translate-y-0.5'
              : 'bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-500/40 shadow-md shadow-orange-500/20'
          } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          ISR : Cache {isrCacheHit ? 'HIT' : 'MISS'}
        </button>
      </div>

      {(isRunning || hasCompleted) && (
        <div className="flex items-center justify-between text-[11px] font-mono font-bold text-muted-foreground px-1 tabular-nums">
          <span>0ms</span>
          <span>{Math.round(maxDuration * 0.25)}ms</span>
          <span>{Math.round(maxDuration * 0.5)}ms</span>
          <span>{Math.round(maxDuration * 0.75)}ms</span>
          <span>{Math.round(maxDuration)}ms</span>
        </div>
      )}

      <div className="space-y-5">
        {displayScenarios.map((scenario) => (
          <div key={scenario.id} className="space-y-2">
            <RenderingTimeline
              scenario={scenario}
              elapsedMs={elapsedMs}
              maxDuration={maxDuration}
              isRunning={isRunning}
              hasCompleted={hasCompleted}
            />
            <div className="ml-0 sm:ml-[72px]">
              <RenderingPagePreview
                scenario={scenario}
                elapsedMs={elapsedMs}
                isRunning={isRunning}
                hasCompleted={hasCompleted}
              />
            </div>
          </div>
        ))}
      </div>

      {(isRunning || hasCompleted) && (
        <div className="flex flex-wrap gap-4 text-xs pt-4 border-t-2 border-border/30">
          {(Object.entries(PHASE_COLORS) as [PhaseType, (typeof PHASE_COLORS)[PhaseType]][])
            .filter(([key]) => key !== 'idle')
            .map(([key, config]) => (
              <div key={key} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-md ${config.bg} shadow-md ${config.shadow}`} />
                <span className="text-foreground/70 font-semibold">{config.label}</span>
              </div>
            ))}
          <div className="flex items-center gap-2 ml-2 pl-4 border-l-2 border-border/50">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/50" />
            <span className="text-foreground/70 font-semibold">FCP</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-md shadow-blue-500/50" />
            <span className="text-foreground/70 font-semibold">LCP</span>
          </div>
        </div>
      )}

      {hasCompleted && (
        <div className="pt-2">
          <RenderingComparisonChart scenarios={displayScenarios} />
        </div>
      )}
    </div>
  );
}
