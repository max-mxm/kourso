'use client';

import { useMemo } from 'react';
import {
  type RenderingScenarioConfig,
  PHASE_COLORS,
  getScenarioTotalDuration,
} from '../_constants/rendering-scenarios-config';

interface RenderingTimelineProps {
  scenario: RenderingScenarioConfig;
  elapsedMs: number;
  maxDuration: number;
  isRunning: boolean;
  hasCompleted: boolean;
}

export function RenderingTimeline({
  scenario,
  elapsedMs,
  maxDuration,
  isRunning,
  hasCompleted,
}: RenderingTimelineProps) {
  const scenarioDuration = getScenarioTotalDuration(scenario);

  // FCP and LCP markers
  const fcpPosition = useMemo(
    () => (scenario.metrics.fcp / maxDuration) * 100,
    [scenario.metrics.fcp, maxDuration]
  );
  const lcpPosition = useMemo(
    () => (scenario.metrics.lcp / maxDuration) * 100,
    [scenario.metrics.lcp, maxDuration]
  );

  return (
    <div className="space-y-2">
      {/* Scenario header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: scenario.color }}
          />
          <span className="text-sm font-semibold text-foreground">
            {scenario.shortName}
          </span>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            {scenario.description}
          </span>
        </div>
        {hasCompleted && (
          <span className="text-xs font-mono text-muted-foreground">
            TTI: {scenario.metrics.tti}ms
          </span>
        )}
      </div>

      {/* Timeline bar */}
      <div className="relative h-9 bg-muted/50 rounded-lg overflow-hidden border border-border/50">
        {/* Phase segments */}
        {scenario.phases.map((phase) => {
          const leftPercent = (phase.startMs / maxDuration) * 100;
          const widthPercent = (phase.durationMs / maxDuration) * 100;
          const phaseStyle = PHASE_COLORS[phase.type];

          // Calculate fill progress for this phase
          const phaseEnd = phase.startMs + phase.durationMs;
          let fillPercent = 0;
          if (isRunning || hasCompleted) {
            if (elapsedMs >= phaseEnd) {
              fillPercent = 100;
            } else if (elapsedMs > phase.startMs) {
              fillPercent =
                ((elapsedMs - phase.startMs) / phase.durationMs) * 100;
            }
          }

          return (
            <div
              key={phase.id}
              className="absolute top-0 h-full group/phase"
              style={{
                left: `${leftPercent}%`,
                width: `${widthPercent}%`,
              }}
            >
              {/* Background track */}
              <div className="absolute inset-0 bg-muted/30 border-r border-border/20" />

              {/* Filled portion */}
              <div
                className={`absolute top-0 left-0 h-full ${phaseStyle.bg} transition-[width] duration-75 ease-linear`}
                style={{
                  width: `${fillPercent}%`,
                  opacity: 0.85,
                }}
              />

              {/* Phase label */}
              {widthPercent > 6 && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <span
                    className={`text-[10px] font-medium truncate px-1 ${
                      fillPercent > 50
                        ? 'text-white'
                        : 'text-foreground/60'
                    }`}
                  >
                    {phase.label}
                  </span>
                </div>
              )}

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-popover text-popover-foreground text-xs rounded-md shadow-lg border border-border opacity-0 group-hover/phase:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                <div className="font-semibold">{phase.label}</div>
                <div className="text-muted-foreground">
                  {phase.durationMs}ms - {phase.description}
                </div>
              </div>
            </div>
          );
        })}

        {/* FCP marker */}
        {hasCompleted && (
          <div
            className="absolute top-0 h-full w-px z-10"
            style={{ left: `${fcpPosition}%` }}
          >
            <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500 border border-white dark:border-slate-900" />
            <div className="absolute top-0 h-full w-px bg-emerald-500/50" />
          </div>
        )}

        {/* LCP marker (only if different from FCP) */}
        {hasCompleted && scenario.metrics.lcp !== scenario.metrics.fcp && (
          <div
            className="absolute top-0 h-full w-px z-10"
            style={{ left: `${lcpPosition}%` }}
          >
            <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-500 border border-white dark:border-slate-900" />
            <div className="absolute top-0 h-full w-px bg-blue-500/50" />
          </div>
        )}

        {/* Cursor (time indicator) */}
        {isRunning && (
          <div
            className="absolute top-0 h-full w-0.5 bg-red-500 z-20 transition-[left] duration-75 ease-linear"
            style={{
              left: `${Math.min((elapsedMs / maxDuration) * 100, 100)}%`,
            }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-500" />
          </div>
        )}

        {/* Completion indicator */}
        {hasCompleted && (
          <div
            className="absolute top-0 h-full w-0.5 bg-primary/30 z-10"
            style={{
              left: `${(scenarioDuration / maxDuration) * 100}%`,
            }}
          />
        )}
      </div>
    </div>
  );
}
