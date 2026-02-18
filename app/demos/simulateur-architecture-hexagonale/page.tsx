'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { CodeBlock } from '@/components/course/code-block';
import { HexagonalArchitectureDemo } from '@/app/demos/_components/hexagonal-architecture-demo';
import {
  HEXAGONAL_CODE_BRICKS,
  HEXAGONAL_LAYER_LABELS,
  HEXAGONAL_LAYER_ORDER,
  HexagonalBrickLayer,
} from '@/app/demos/_constants/hexagonal-code-tabs';

type LayerFilter = 'all' | HexagonalBrickLayer;

type CodeBlockCategory =
  | 'fundamentals'
  | 'rendering'
  | 'optimization'
  | 'best-practices'
  | 'advanced'
  | 'architecture'
  | 'testing';

const LAYER_TO_CATEGORY: Record<HexagonalBrickLayer, CodeBlockCategory> = {
  domain: 'architecture',
  application: 'best-practices',
  ports: 'rendering',
  'inbound-adapters': 'optimization',
  'outbound-adapters': 'optimization',
  composition: 'advanced',
  testing: 'testing',
};

export default function SimulateurArchitectureHexagonalePage() {
  const [activeLayer, setActiveLayer] = useState<LayerFilter>('all');
  const [activeBrickId, setActiveBrickId] = useState<string>(
    HEXAGONAL_CODE_BRICKS[0]?.id ?? ''
  );

  const filteredBricks = useMemo(() => {
    if (activeLayer === 'all') return HEXAGONAL_CODE_BRICKS;
    return HEXAGONAL_CODE_BRICKS.filter((brick) => brick.layer === activeLayer);
  }, [activeLayer]);

  const activeBrick = useMemo(() => {
    return (
      filteredBricks.find((brick) => brick.id === activeBrickId) ??
      filteredBricks[0] ??
      HEXAGONAL_CODE_BRICKS[0]
    );
  }, [activeBrickId, filteredBricks]);

  const layerCounts = useMemo(() => {
    return HEXAGONAL_LAYER_ORDER.reduce((acc, layer) => {
      acc[layer] = HEXAGONAL_CODE_BRICKS.filter((brick) => brick.layer === layer).length;
      return acc;
    }, {} as Record<HexagonalBrickLayer, number>);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50/40 to-emerald-50 dark:from-zinc-950 dark:via-cyan-950/30 dark:to-zinc-900">
      <div className="container max-w-6xl py-12 md:py-16 space-y-10">
        <AnimatedSection delay={0}>
          <Link
            href="/guides/architecture-hexagonale#demo-interactive"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-cyan-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au guide Architecture Hexagonale
          </Link>
        </AnimatedSection>

        <div className="space-y-6">
          <AnimatedSection delay={120}>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-400">
                Architecture
              </span>
              <span className="rounded-full bg-cyan-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white shadow-lg shadow-cyan-500/40">
                Interactif
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200} variant="scale">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] bg-gradient-to-br from-cyan-700 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
              Architecture hexagonale testee en direct
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-4xl">
              Executez un flux complet (inbound, use case, ports, adapters) puis
              inspectez le code de chaque brique de l architecture hexagonale.
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={400}>
          <div className="relative overflow-hidden rounded-2xl border-2 border-cyan-400/30 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-emerald-500/10 p-6 max-w-4xl dark:border-cyan-400/20">
            <div className="relative flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-cyan-600 shadow-lg shadow-cyan-500/30">
                <Layers className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-black text-cyan-700 dark:text-cyan-400">
                  Ce que vous validez avec cette demo
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Le domaine reste stable pendant que les adapters evoluent.
                  L explorateur de code couvre toutes les briques: domaine,
                  application, ports, adapters, composition root et tests.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={500}>
          <div className="rounded-3xl bg-white border-2 border-cyan-500/20 shadow-2xl shadow-cyan-500/10 p-6 md:p-8 space-y-8 dark:bg-zinc-900 dark:border-cyan-400/30 dark:shadow-cyan-500/20">
            <HexagonalArchitectureDemo />

            <div className="border-t-2 border-cyan-500/20 pt-8 dark:border-cyan-400/20 space-y-6">
              <h3 className="text-2xl font-black tracking-tight text-foreground">
                Explorateur complet des briques hexagonales
              </h3>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveLayer('all')}
                  className={`px-3 py-2 rounded-lg border text-sm font-semibold transition ${
                    activeLayer === 'all'
                      ? 'bg-cyan-600 text-white border-cyan-600'
                      : 'border-border/60 text-foreground/80 hover:border-cyan-500/40 hover:text-cyan-700'
                  }`}
                >
                  Toutes les couches ({HEXAGONAL_CODE_BRICKS.length})
                </button>
                {HEXAGONAL_LAYER_ORDER.map((layer) => (
                  <button
                    key={layer}
                    onClick={() => setActiveLayer(layer)}
                    className={`px-3 py-2 rounded-lg border text-sm font-semibold transition ${
                      activeLayer === layer
                        ? 'bg-cyan-600 text-white border-cyan-600'
                        : 'border-border/60 text-foreground/80 hover:border-cyan-500/40 hover:text-cyan-700'
                    }`}
                  >
                    {HEXAGONAL_LAYER_LABELS[layer]} ({layerCounts[layer]})
                  </button>
                ))}
              </div>

              <div className="grid gap-6 xl:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
                <aside className="min-w-0 rounded-xl border border-border/50 bg-muted/10 p-4 space-y-2 max-h-[560px] overflow-y-auto">
                  {filteredBricks.map((brick) => (
                    <button
                      key={brick.id}
                      onClick={() => setActiveBrickId(brick.id)}
                      className={`w-full text-left rounded-lg border px-3 py-2 transition ${
                        activeBrick?.id === brick.id
                          ? 'border-cyan-500/50 bg-cyan-500/10'
                          : 'border-border/40 hover:border-cyan-500/30 hover:bg-muted/30'
                      }`}
                    >
                      <p className="text-sm font-semibold text-foreground">{brick.label}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">
                        {HEXAGONAL_LAYER_LABELS[brick.layer]}
                      </p>
                    </button>
                  ))}
                </aside>

                {activeBrick && (
                  <div className="min-w-0 space-y-3">
                    <div className="rounded-lg border border-border/40 bg-muted/20 p-3">
                      <p className="text-sm font-semibold text-foreground">{activeBrick.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activeBrick.description}
                      </p>
                    </div>
                    <CodeBlock
                      code={activeBrick.code}
                      language={activeBrick.language}
                      filename={activeBrick.filename}
                      category={LAYER_TO_CATEGORY[activeBrick.layer]}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={600}>
          <Link
            href="/guides/architecture-hexagonale#schema-ports-adapters"
            className="group relative block overflow-hidden rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-br from-cyan-50 to-emerald-50 p-8 transition-all duration-500 hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-1 dark:from-zinc-900 dark:to-cyan-950/30 dark:border-cyan-400/30"
          >
            <div className="relative z-10 flex items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-600 shadow-lg shadow-cyan-500/30 transition-transform duration-300 group-hover:scale-110">
                    <BookOpen className="h-6 w-6 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-2xl font-black text-foreground">
                    Retour a la theorie
                  </span>
                </div>
                <p className="text-base text-foreground/70 pl-16">
                  Ports, adapters, schemas et plan de migration complet dans le guide
                </p>
              </div>
              <ArrowRight className="h-8 w-8 flex-shrink-0 text-cyan-600 transition-transform duration-300 group-hover:translate-x-2" strokeWidth={2.5} />
            </div>
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
}
