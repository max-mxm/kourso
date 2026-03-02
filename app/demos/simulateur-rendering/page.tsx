'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, BookOpen, ArrowRight } from 'lucide-react';
import { CodeBlock } from '@/components/course/code-block';
import { AnimatedSection } from '@/components/ui/animated-section';
import { RenderingSimulator } from '@/app/demos/_components/rendering-simulator';
import { RENDERING_CODE_TABS } from '@/app/demos/_constants/rendering-code-tabs';

export default function SimulateurRenderingPage() {
  const [activeCodeTab, setActiveCodeTab] = useState('ssr');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50/20 to-slate-50 dark:from-slate-950 dark:via-purple-950/50 dark:to-indigo-950">
      <div className="container max-w-6xl py-12 md:py-16 space-y-10">

        <AnimatedSection delay={0}>
          <Link
            href="/guides/nextjs-demo#comparison"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-purple-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au guide Next.js 16
          </Link>
        </AnimatedSection>

        <div className="space-y-6">
          <AnimatedSection delay={100}>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                Modes de Rendu
              </span>
              <span className="rounded-full bg-purple-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white shadow-lg shadow-purple-500/50">
                Interactif
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200} variant="scale">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              SSR, SSG, ISR, CSR et Streaming comparés en temps réel
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-4xl">
              Visualisez les différences entre les 5 modes de rendering Next.js sur un scénario
              de page produit e-commerce. Observez comment chaque mode charge, affiche et rend
              interactive la même page.
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={400}>
          <div className="relative overflow-hidden rounded-2xl border-2 border-indigo-400/30 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-6 max-w-4xl dark:border-indigo-400/20">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl animate-glow-pulse" />
            <div className="relative flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-purple-600 shadow-lg shadow-purple-500/30">
                <Activity className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-black text-indigo-700 dark:text-indigo-400">
                  Simulation pédagogique basée sur des données de référence
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Les timings affichés illustrent les proportions relatives entre les modes de rendering,
                  basés sur des benchmarks documentés (Vercel, Core Web Vitals).
                  Les performances réelles varient selon l&apos;infrastructure et la configuration.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={500}>
          <div className="rounded-3xl bg-white border-2 border-purple-500/20 shadow-2xl shadow-purple-500/10 p-6 md:p-8 space-y-8 dark:bg-slate-900 dark:border-purple-400/30 dark:shadow-purple-500/20">
            <RenderingSimulator />

            <div className="border-t-2 border-purple-500/20 pt-8 dark:border-purple-400/20">
              <h2 className="text-2xl font-black tracking-tight text-foreground mb-6">
                Code Next.js de chaque mode
              </h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {RENDERING_CODE_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCodeTab(tab.id)}
                    className={`relative px-4 py-2.5 text-sm font-semibold rounded-xl border-2 transition-all duration-200 ${
                      activeCodeTab === tab.id
                        ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-500/30'
                        : 'text-foreground/70 border-border/50 hover:border-purple-500/30 hover:text-purple-600 hover:-translate-y-0.5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              {RENDERING_CODE_TABS.map((tab) =>
                activeCodeTab === tab.id ? (
                  <CodeBlock
                    key={tab.id}
                    code={tab.code}
                    language="typescript"
                    filename={tab.filename}
                    category="rendering"
                  />
                ) : null
              )}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={600}>
          <Link
            href="/guides/nextjs-demo#comparison"
            className="group relative block overflow-hidden rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-50 to-pink-50 p-8 transition-all duration-500 hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1 dark:from-slate-900 dark:to-purple-950/30 dark:border-purple-400/30"
          >
            <div className="relative z-10 flex items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 shadow-lg shadow-purple-500/30 transition-transform duration-300 group-hover:scale-110">
                    <BookOpen className="h-6 w-6 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-2xl font-black text-foreground">
                    Retour à la théorie
                  </span>
                </div>
                <p className="text-base text-foreground/70 pl-16">
                  Avantages, inconvénients et cas d&apos;usage de chaque mode dans le guide complet
                </p>
              </div>
              <ArrowRight className="h-8 w-8 flex-shrink-0 text-purple-600 transition-transform duration-300 group-hover:translate-x-2" strokeWidth={2.5} />
            </div>

            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-purple-500/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </Link>
        </AnimatedSection>

      </div>
    </div>
  );
}
