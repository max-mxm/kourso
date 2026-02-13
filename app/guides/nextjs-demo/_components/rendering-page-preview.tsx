'use client';

import { useMemo } from 'react';
import type {
  RenderingScenarioConfig,
  PageVisualState,
} from '../_constants/rendering-scenarios-config';

interface RenderingPagePreviewProps {
  scenario: RenderingScenarioConfig;
  elapsedMs: number;
  isRunning: boolean;
  hasCompleted: boolean;
}

export function RenderingPagePreview({
  scenario,
  elapsedMs,
  isRunning,
  hasCompleted,
}: RenderingPagePreviewProps) {
  const currentState = useMemo((): PageVisualState => {
    if (!isRunning && !hasCompleted) return 'blank';
    if (hasCompleted) {
      const lastState = scenario.pageStates[scenario.pageStates.length - 1];
      return lastState.state;
    }

    // Find the current state based on elapsed time
    let state: PageVisualState = 'blank';
    for (const transition of scenario.pageStates) {
      if (elapsedMs >= transition.atMs) {
        state = transition.state;
      }
    }
    return state;
  }, [scenario.pageStates, elapsedMs, isRunning, hasCompleted]);

  return (
    <div className="relative w-full h-28 rounded-lg border border-border/50 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-200">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-muted/50 border-b border-border/30">
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
        </div>
        <div className="flex-1 h-3.5 bg-muted rounded-sm mx-2" />
      </div>

      {/* Page content area */}
      <div className="p-2 space-y-1.5 relative">
        {currentState === 'blank' && <BlankState />}
        {currentState === 'shell' && <ShellState />}
        {currentState === 'loading' && <LoadingState />}
        {currentState === 'partial-1' && <Partial1State />}
        {currentState === 'partial-2' && <Partial2State />}
        {currentState === 'complete' && <CompleteState />}
      </div>

      {/* State label overlay */}
      {(isRunning || hasCompleted) && (
        <div className="absolute bottom-1 right-1.5">
          <span
            className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${
              currentState === 'complete'
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                : currentState === 'blank'
                  ? 'bg-muted text-muted-foreground'
                  : 'bg-orange-500/15 text-orange-600 dark:text-orange-400'
            }`}
          >
            {getStateLabel(currentState)}
          </span>
        </div>
      )}
    </div>
  );
}

function getStateLabel(state: PageVisualState): string {
  switch (state) {
    case 'blank':
      return 'Vide';
    case 'shell':
      return 'Shell';
    case 'loading':
      return 'Chargement...';
    case 'partial-1':
      return 'Partiel';
    case 'partial-2':
      return 'Quasi-complet';
    case 'complete':
      return 'Complet';
  }
}

// --- Visual states ---

function BlankState() {
  return <div className="h-16" />;
}

function ShellState() {
  return (
    <div className="space-y-1.5 animate-[fadeIn_0.2s_ease-out]">
      {/* Header skeleton */}
      <div className="h-2.5 w-20 bg-muted rounded-sm" />
      {/* Content skeletons */}
      <div className="flex gap-2">
        <div className="w-10 h-10 bg-muted rounded-sm animate-pulse" />
        <div className="flex-1 space-y-1">
          <div className="h-2 w-3/4 bg-muted rounded-sm animate-pulse" />
          <div className="h-2 w-1/2 bg-muted rounded-sm animate-pulse" />
          <div className="h-2 w-2/3 bg-muted rounded-sm animate-pulse" />
        </div>
      </div>
      {/* Price skeleton */}
      <div className="h-2 w-12 bg-muted rounded-sm animate-pulse" />
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center h-16 gap-1.5 animate-[fadeIn_0.2s_ease-out]">
      <div className="w-4 h-4 border-2 border-muted border-t-primary rounded-full animate-spin" />
      <span className="text-[9px] text-muted-foreground">Chargement...</span>
    </div>
  );
}

function Partial1State() {
  return (
    <div className="space-y-1.5 animate-[fadeIn_0.2s_ease-out]">
      {/* Header */}
      <div className="h-2.5 w-20 bg-primary/20 rounded-sm" />
      {/* Product info - loaded */}
      <div className="flex gap-2">
        <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center">
          <div className="w-5 h-5 bg-primary/20 rounded" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="h-2 w-3/4 bg-foreground/15 rounded-sm" />
          <div className="h-2 w-1/2 bg-foreground/10 rounded-sm" />
        </div>
      </div>
      {/* Price skeleton still loading */}
      <div className="h-2 w-12 bg-muted rounded-sm animate-pulse" />
    </div>
  );
}

function Partial2State() {
  return (
    <div className="space-y-1.5 animate-[fadeIn_0.2s_ease-out]">
      {/* Header */}
      <div className="h-2.5 w-20 bg-primary/20 rounded-sm" />
      {/* Product info - loaded */}
      <div className="flex gap-2">
        <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center">
          <div className="w-5 h-5 bg-primary/20 rounded" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="h-2 w-3/4 bg-foreground/15 rounded-sm" />
          <div className="h-2 w-1/2 bg-foreground/10 rounded-sm" />
        </div>
      </div>
      {/* Price loaded */}
      <div className="h-2 w-12 bg-emerald-500/30 rounded-sm" />
      {/* Reviews skeleton */}
      <div className="h-2 w-1/3 bg-muted rounded-sm animate-pulse" />
    </div>
  );
}

function CompleteState() {
  return (
    <div className="space-y-1.5 animate-[fadeIn_0.2s_ease-out]">
      {/* Header */}
      <div className="h-2.5 w-20 bg-primary/20 rounded-sm" />
      {/* Product info */}
      <div className="flex gap-2">
        <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center">
          <div className="w-5 h-5 bg-primary/20 rounded" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="h-2 w-3/4 bg-foreground/15 rounded-sm" />
          <div className="h-2 w-1/2 bg-foreground/10 rounded-sm" />
        </div>
      </div>
      {/* Price */}
      <div className="h-2 w-12 bg-emerald-500/30 rounded-sm" />
      {/* Reviews */}
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-1.5 w-1.5 rounded-full bg-yellow-400/60" />
        ))}
        <div className="h-2 w-8 bg-foreground/10 rounded-sm" />
      </div>
    </div>
  );
}
