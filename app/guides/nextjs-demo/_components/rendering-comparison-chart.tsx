'use client';

import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import type { RenderingScenarioConfig } from '../_constants/rendering-scenarios-config';

interface RenderingComparisonChartProps {
  scenarios: RenderingScenarioConfig[];
}

type MetricKey = 'ttfb' | 'fcp' | 'lcp' | 'tti';

interface MetricConfig {
  key: MetricKey;
  label: string;
  unit: string;
  thresholds: { good: number; acceptable: number };
}

const METRIC_CONFIGS: MetricConfig[] = [
  {
    key: 'ttfb',
    label: 'TTFB',
    unit: 'ms',
    thresholds: { good: 100, acceptable: 400 },
  },
  {
    key: 'fcp',
    label: 'FCP',
    unit: 'ms',
    thresholds: { good: 200, acceptable: 500 },
  },
  {
    key: 'lcp',
    label: 'LCP',
    unit: 'ms',
    thresholds: { good: 250, acceptable: 600 },
  },
  {
    key: 'tti',
    label: 'TTI',
    unit: 'ms',
    thresholds: { good: 300, acceptable: 700 },
  },
];

function getMetricColor(value: number, thresholds: { good: number; acceptable: number }): string {
  if (value <= thresholds.good) return 'text-green-600 dark:text-green-400';
  if (value <= thresholds.acceptable) return 'text-orange-600 dark:text-orange-400';
  return 'text-red-600 dark:text-red-400';
}

function getBarColor(value: number, thresholds: { good: number; acceptable: number }): string {
  if (value <= thresholds.good) return 'bg-gradient-to-r from-green-500 to-green-600';
  if (value <= thresholds.acceptable) return 'bg-gradient-to-r from-orange-500 to-orange-600';
  return 'bg-gradient-to-r from-red-500 to-red-600';
}

export function RenderingComparisonChart({ scenarios }: RenderingComparisonChartProps) {
  const [activeMetric, setActiveMetric] = useState<MetricKey>('lcp');
  const [animateResults, setAnimateResults] = useState(true);

  const config = METRIC_CONFIGS.find((m) => m.key === activeMetric)!;
  const maxValue = Math.max(
    ...scenarios.map((s) => s.metrics[activeMetric]),
    1
  );

  // Trigger animation on metric change
  const handleMetricChange = (key: MetricKey) => {
    setAnimateResults(false);
    setActiveMetric(key);
    requestAnimationFrame(() => {
      setAnimateResults(true);
    });
  };

  return (
    <div className="border border-border rounded-lg p-4 bg-card">
      <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
        <TrendingUp className="w-4 h-4" />
        Comparaison des metriques
      </h5>

      {/* Metric selector tabs */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {METRIC_CONFIGS.map((metric) => (
          <button
            key={metric.key}
            onClick={() => handleMetricChange(metric.key)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
              activeMetric === metric.key
                ? 'bg-primary/10 text-primary border-primary/20'
                : 'text-muted-foreground border-border/50 hover:bg-muted'
            }`}
          >
            {metric.label}
          </button>
        ))}
      </div>

      {/* Bars */}
      <div className="space-y-3">
        {scenarios.map((scenario, index) => {
          const value = scenario.metrics[activeMetric];
          const widthPercent = maxValue > 0 ? (value / maxValue) * 100 : 0;

          return (
            <div key={scenario.id} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: scenario.color }}
                  />
                  <span className="text-foreground font-medium">
                    {scenario.shortName}
                  </span>
                </div>
                <span
                  className={`font-mono text-xs ${getMetricColor(
                    value,
                    config.thresholds
                  )}`}
                >
                  {value} {config.unit}
                </span>
              </div>
              <div className="h-7 bg-muted rounded overflow-hidden flex items-center">
                <div
                  className={`h-full transition-all duration-700 ease-out flex items-center justify-end pr-2 ${getBarColor(
                    value,
                    config.thresholds
                  )}`}
                  style={{
                    width: animateResults
                      ? `${Math.max(widthPercent, 3)}%`
                      : '0%',
                    transitionDelay: `${index * 120}ms`,
                  }}
                >
                  {animateResults && widthPercent > 18 && (
                    <span className="text-white text-[10px] font-bold">
                      {value}ms
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-foreground/70">
              Rapide (&lt; {config.thresholds.good}ms)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-foreground/70">
              Acceptable ({config.thresholds.good}-{config.thresholds.acceptable}ms)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-foreground/70">
              Lent (&gt; {config.thresholds.acceptable}ms)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
