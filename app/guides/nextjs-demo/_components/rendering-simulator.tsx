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

  // Build active scenarios based on settings
  const activeScenarios: RenderingScenarioConfig[] = RENDERING_SCENARIOS.map((scenario) => {
    // Replace ISR HIT with ISR MISS if toggle is off
    if (scenario.id === 'isr-hit' && !isrCacheHit) {
      return ISR_MISS_SCENARIO;
    }
    return scenario;
  });

  // Apply network multiplier
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

  // Cleanup on unmount
  useEffect(() => {
    return () => stopAnimation();
  }, [stopAnimation]);

  // Reset when settings change during idle
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
      {/* Header + Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-1">
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
              className="px-3 py-2 text-sm font-medium rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
          <button
            onClick={startSimulation}
            disabled={isRunning}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shrink-0"
          >
            <Play className="w-4 h-4" />
            {isRunning ? 'En cours...' : 'Lancer la simulation'}
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Network preset */}
        <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg border border-border">
          {networkPreset === 'fast' ? (
            <Wifi className="w-4 h-4 text-muted-foreground" />
          ) : (
            <WifiOff className="w-4 h-4 text-orange-500" />
          )}
          <span className="text-sm font-medium text-foreground">Reseau</span>
          <div className="flex gap-1">
            {NETWORK_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setNetworkPreset(preset.id)}
                disabled={isRunning}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  networkPreset === preset.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted'
                } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* ISR Cache toggle */}
        <button
          onClick={() => setIsrCacheHit(!isrCacheHit)}
          disabled={isRunning}
          className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors flex items-center gap-2 ${
            isrCacheHit
              ? 'text-muted-foreground border-border hover:bg-muted'
              : 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30'
          } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          ISR : Cache {isrCacheHit ? 'HIT' : 'MISS'}
        </button>
      </div>

      {/* Time scale */}
      {(isRunning || hasCompleted) && (
        <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground px-1">
          <span>0ms</span>
          <span>{Math.round(maxDuration * 0.25)}ms</span>
          <span>{Math.round(maxDuration * 0.5)}ms</span>
          <span>{Math.round(maxDuration * 0.75)}ms</span>
          <span>{Math.round(maxDuration)}ms</span>
        </div>
      )}

      {/* Timelines + Previews */}
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

      {/* Phase legend */}
      {(isRunning || hasCompleted) && (
        <div className="flex flex-wrap gap-3 text-xs pt-2">
          {(Object.entries(PHASE_COLORS) as [PhaseType, (typeof PHASE_COLORS)[PhaseType]][])
            .filter(([key]) => key !== 'idle')
            .map(([key, config]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-sm ${config.bg}`} />
                <span className="text-muted-foreground">{config.label}</span>
              </div>
            ))}
          <div className="flex items-center gap-1.5 ml-2 pl-2 border-l border-border">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">FCP</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-muted-foreground">LCP</span>
          </div>
        </div>
      )}

      {/* Comparison chart */}
      {hasCompleted && (
        <div className="pt-2">
          <RenderingComparisonChart scenarios={displayScenarios} />
        </div>
      )}
    </div>
  );
}
