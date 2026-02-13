'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, BookOpen } from 'lucide-react';
import { CodeBlock } from '@/components/course/code-block';
import { RenderingSimulator } from '../_components/rendering-simulator';
import { RENDERING_CODE_TABS } from '../_constants/rendering-code-tabs';

export default function SimulateurRenderingPage() {
  const [activeCodeTab, setActiveCodeTab] = useState('ssr');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container max-w-5xl py-8 md:py-12 space-y-8">
        {/* Navigation retour */}
        <Link
          href="/guides/nextjs-demo#comparison"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au guide Next.js 16
        </Link>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Modes de Rendu
            </span>
            <span className="rounded-md bg-blue-500/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400">
              Interactif
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            SSR, SSG, ISR, CSR et Streaming compares en temps reel
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Visualisez les differences entre les 5 modes de rendering Next.js sur un scenario
            de page produit e-commerce. Observez comment chaque mode charge, affiche et rend
            interactive la meme page.
          </p>

          {/* Callout simulation */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 max-w-3xl">
            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20">
              <Activity className="h-3 w-3 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                Simulation pedagogique basee sur des donnees de reference
              </p>
              <p className="text-sm text-muted-foreground">
                Les timings affiches illustrent les proportions relatives entre les modes de rendering,
                bases sur des benchmarks documentes (Vercel, Core Web Vitals).
                Les performances reelles varient selon l&apos;infrastructure et la configuration.
              </p>
            </div>
          </div>
        </div>

        {/* Simulateur */}
        <div className="rounded-2xl bg-white/50 p-6 shadow-lg shadow-slate-200/50 backdrop-blur-sm md:p-8 dark:bg-slate-900/50 dark:shadow-slate-950/50 space-y-8">
          <RenderingSimulator />

          {/* Onglets code source */}
          <div className="border-t border-border pt-6">
            <h3 className="font-semibold text-foreground mb-4">
              Code Next.js de chaque mode
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {RENDERING_CODE_TABS.map((tab) => (
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

        {/* CTA vers la theorie */}
        <Link
          href="/guides/nextjs-demo#comparison"
          className="group block rounded-2xl bg-white/50 p-6 shadow-lg shadow-slate-200/50 backdrop-blur-sm dark:bg-slate-900/50 dark:shadow-slate-950/50 border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  Lire la comparaison detaillee des modes de rendering
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Avantages, inconvenients et cas d&apos;usage de chaque mode dans le guide complet.
              </p>
            </div>
            <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all" />
          </div>
        </Link>
      </div>
    </div>
  );
}
