import { Play } from 'lucide-react';
import { getDemosForCatalog } from '@/lib/content';
import { DemosPageClient } from './demos-page-client';

export const metadata = {
  title: 'Demos Interactives React & Next.js',
  description:
    'Explorez des demos interactives pour visualiser et tester des concepts frontend en direct : React, Next.js, Performance, Optimisations.',
  alternates: {
    canonical: '/demos',
  },
  openGraph: {
    title: 'Demos Interactives | Maxpaths',
    description: 'Simulateurs interactifs avec mesures reelles : performance React, rendering Next.js. Testez en direct dans votre navigateur.',
    images: [{ url: '/api/og?title=Demos+Interactives+React+%26+Next.js&category=optimization', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Demos Interactives | Maxpaths',
    description: 'Simulateurs interactifs avec mesures reelles : performance React, rendering Next.js.',
    images: ['/api/og?title=Demos+Interactives+React+%26+Next.js&category=optimization'],
  },
};

export default function DemosPage() {
  const demos = getDemosForCatalog();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <main className="container py-8 md:py-12">
        <div className="space-y-8 md:space-y-12">
          <div className="space-y-4 text-center md:text-left animate-fade-slide-down">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight">
              Catalogue des démos
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0">
              Explorez des démos interactives pour visualiser et tester des concepts frontend en direct.
            </p>
          </div>

          <DemosPageClient demos={demos} />

          <div className="rounded-2xl border border-dashed border-border/50 bg-muted/20 p-12 text-center space-y-4 animate-fade-slide-up stagger-12">
            <div className="inline-flex w-20 h-20 rounded-2xl bg-muted items-center justify-center">
              <Play className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Nouvelles demos en preparation
              </h2>
              <p className="text-muted-foreground">
                D&apos;autres demos interactives sont en cours de developpement pour vous aider a mieux comprendre les concepts avances.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
