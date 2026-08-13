'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Activity, ArrowRight } from 'lucide-react';
import { CodeBlock } from '@/components/course/code-block';
import { AnimatedSection } from '@/components/ui/animated-section';
import { PerformanceDemo } from '@/app/demos/_components/performance-demo';
import {
  HeavyListBaseline,
  HeavyListWithMemo,
  HeavyListWithUseMemo,
  HeavyListOptimized,
} from '@/app/demos/_components/heavy-list-examples';
import { PERFORMANCE_CODE_TABS } from '@/app/demos/_constants/performance-code-tabs';

export default function SimulateurPerformancePage() {
  const [itemCount, setItemCount] = useState(50);
  const [activeCodeTab, setActiveCodeTab] = useState('baseline');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50/30 to-yellow-50 dark:from-zinc-950 dark:via-purple-950/30 dark:to-zinc-900">
      <div className="container max-w-6xl py-12 md:py-16 space-y-10">

        <AnimatedSection delay={0}>
          <Link
            href="/guides/nextjs-demo#performance-measurement"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-red-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au guide Next.js 16
          </Link>
        </AnimatedSection>

        <div className="space-y-6">
          <AnimatedSection delay={100}>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-red-600 dark:text-red-400">
                Optimisations
              </span>
              <span className="rounded-full bg-red-500 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white shadow-lg shadow-red-500/50">
                Interactif
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200} variant="scale">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              useMemo, useCallback et React.memo testé en live
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-4xl">
              Comparez 4 stratégies d&apos;optimisation React en temps réel sur un benchmark
              interactif. Mesurez l&apos;impact de React.memo, useMemo et useCallback sur le
              temps de rendu d&apos;une liste de produits avec recherche.
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={400}>
          <div className="relative overflow-hidden rounded-2xl border-2 border-red-400/30 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 p-6 max-w-4xl dark:border-red-400/20">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-red-500/10 blur-3xl animate-glow-pulse" />
            <div className="relative flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-red-500 shadow-lg shadow-red-500/30">
                <Activity className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-black text-red-700 dark:text-red-400">
                  Mesures réelles, pas de simulation
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Les temps affichés sont mesurés en temps réel via <code className="text-xs bg-red-500/15 text-red-700 dark:text-red-400 px-2 py-0.5 rounded-md font-semibold">performance.now()</code> dans
                  votre navigateur. Chaque scénario exécute du vrai code React avec des calculs
                  coûteux — les résultats varient selon votre machine.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={500}>
          <div className="rounded-3xl bg-white border-2 border-red-500/20 shadow-2xl shadow-red-500/10 p-6 md:p-8 space-y-8 dark:bg-zinc-900 dark:border-red-400/30 dark:shadow-red-500/20">
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
                  description: 'Items mémorisés uniquement',
                  renderComponent: ({ slowMode, runId }) => (
                    <HeavyListWithMemo itemCount={itemCount} slowMode={slowMode} runId={runId} />
                  ),
                },
                {
                  name: 'Avec useMemo',
                  description: 'Liste filtrée mémorisée uniquement',
                  renderComponent: ({ slowMode, runId }) => (
                    <HeavyListWithUseMemo itemCount={itemCount} slowMode={slowMode} runId={runId} />
                  ),
                },
                {
                  name: 'Tout optimisé',
                  description: 'React.memo + useMemo + useCallback',
                  renderComponent: ({ slowMode, runId }) => (
                    <HeavyListOptimized itemCount={itemCount} slowMode={slowMode} runId={runId} />
                  ),
                },
              ]}
              itemCount={itemCount}
              onItemCountChange={setItemCount}
            />

            <div className="border-t-2 border-red-500/20 pt-8 dark:border-red-400/20">
              <h2 className="text-2xl font-black tracking-tight text-foreground mb-6">
                Code source de chaque approche
              </h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {PERFORMANCE_CODE_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCodeTab(tab.id)}
                    className={`relative px-4 py-2.5 text-sm font-semibold rounded-xl border-2 transition-all duration-200 ${
                      activeCodeTab === tab.id
                        ? 'bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/30'
                        : 'text-foreground/70 border-border/50 hover:border-red-500/30 hover:text-red-600 hover:-translate-y-0.5'
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
        </AnimatedSection>

        <AnimatedSection delay={600}>
          <Link
            href="/guides/nextjs-demo#performance-measurement"
            className="group relative block overflow-hidden rounded-3xl border-2 border-red-500/30 bg-gradient-to-br from-red-50 to-orange-50 p-8 transition-all duration-500 hover:border-red-500 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-1 dark:from-zinc-900 dark:to-red-950/30 dark:border-red-400/30"
          >
            <div className="relative z-10 flex items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500 shadow-lg shadow-red-500/30 transition-transform duration-300 group-hover:scale-110">
                    <BookOpen className="h-6 w-6 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-2xl font-black text-foreground">
                    Retour à la théorie
                  </span>
                </div>
                <p className="text-base text-foreground/70 pl-16">
                  Profiler API, outils de mesure, bonnes pratiques et analyse des résultats
                </p>
              </div>
              <ArrowRight className="h-8 w-8 flex-shrink-0 text-red-500 transition-transform duration-300 group-hover:translate-x-2" strokeWidth={2.5} />
            </div>

            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-red-500/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </Link>
        </AnimatedSection>

      </div>
    </div>
  );
}
