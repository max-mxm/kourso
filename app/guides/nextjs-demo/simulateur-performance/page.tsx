'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Timer, BookOpen } from 'lucide-react';
import { CodeBlock } from '@/components/course/code-block';
import { PerformanceDemo } from '../_components/performance-demo';
import {
  HeavyListBaseline,
  HeavyListWithMemo,
  HeavyListWithUseMemo,
  HeavyListOptimized,
} from '../_components/heavy-list-examples';
import { PERFORMANCE_CODE_TABS } from '../_constants/performance-code-tabs';

export default function SimulateurPerformancePage() {
  const [itemCount, setItemCount] = useState(50);
  const [activeCodeTab, setActiveCodeTab] = useState('baseline');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container max-w-5xl py-8 md:py-12 space-y-8">
        {/* Navigation retour */}
        <Link
          href="/guides/nextjs-demo#performance-measurement"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au guide Next.js 16
        </Link>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Optimisations
            </span>
            <span className="rounded-md bg-orange-500/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-orange-600 dark:text-orange-400">
              Interactif
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            useMemo, useCallback et React.memo teste en live
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Comparez 4 strategies d&apos;optimisation React en temps reel sur un benchmark
            interactif. Mesurez l&apos;impact de React.memo, useMemo et useCallback sur le
            temps de rendu d&apos;une liste de produits avec recherche.
          </p>

          {/* Callout mesures reelles */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 max-w-3xl">
            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20">
              <div className="h-2 w-2 rounded-full bg-green-500" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                Mesures reelles, pas de simulation
              </p>
              <p className="text-sm text-muted-foreground">
                Les temps affiches sont mesures en temps reel via <code className="text-xs bg-muted px-1 py-0.5 rounded">performance.now()</code> dans
                votre navigateur. Chaque scenario execute du vrai code React avec des calculs
                couteux -- les resultats varient selon votre machine.
              </p>
            </div>
          </div>
        </div>

        {/* Simulateur */}
        <div className="rounded-2xl bg-white/50 p-6 shadow-lg shadow-slate-200/50 backdrop-blur-sm md:p-8 dark:bg-slate-900/50 dark:shadow-slate-950/50 space-y-8">
          <PerformanceDemo
            scenarios={[
              {
                name: 'Sans optimisation',
                description: 'Aucun memo, useMemo ou useCallback',
                renderComponent: ({ slowMode, runId }) => (
                  <HeavyListBaseline itemCount={itemCount} slowMode={slowMode} runId={runId} />
                ),
              },
              {
                name: 'Avec React.memo',
                description: 'Items memoizes uniquement',
                renderComponent: ({ slowMode, runId }) => (
                  <HeavyListWithMemo itemCount={itemCount} slowMode={slowMode} runId={runId} />
                ),
              },
              {
                name: 'Avec useMemo',
                description: 'Liste filtree memoizee uniquement',
                renderComponent: ({ slowMode, runId }) => (
                  <HeavyListWithUseMemo itemCount={itemCount} slowMode={slowMode} runId={runId} />
                ),
              },
              {
                name: 'Tout optimise',
                description: 'React.memo + useMemo + useCallback',
                renderComponent: ({ slowMode, runId }) => (
                  <HeavyListOptimized itemCount={itemCount} slowMode={slowMode} runId={runId} />
                ),
              },
            ]}
            itemCount={itemCount}
            onItemCountChange={setItemCount}
          />

          {/* Onglets code source */}
          <div className="border-t border-border pt-6">
            <h3 className="font-semibold text-foreground mb-4">
              Code source de chaque approche
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {PERFORMANCE_CODE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCodeTab(tab.id)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${
                    activeCodeTab === tab.id
                      ? 'bg-primary/10 text-primary border-primary/20'
                      : 'text-muted-foreground border-border/50 hover:bg-muted'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {PERFORMANCE_CODE_TABS.map((tab) =>
              activeCodeTab === tab.id ? (
                <CodeBlock
                  key={tab.id}
                  code={tab.code}
                  language="typescript"
                  filename={tab.filename}
                  category="optimization"
                />
              ) : null
            )}
          </div>
        </div>

        {/* CTA vers la theorie */}
        <Link
          href="/guides/nextjs-demo#performance-measurement"
          className="group block rounded-2xl bg-white/50 p-6 shadow-lg shadow-slate-200/50 backdrop-blur-sm dark:bg-slate-900/50 dark:shadow-slate-950/50 border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  Lire la theorie sur la mesure de performance
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Profiler API, outils de mesure, bonnes pratiques et analyse des resultats.
              </p>
            </div>
            <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all" />
          </div>
        </Link>
      </div>
    </div>
  );
}
