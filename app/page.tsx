import type { Metadata } from 'next';
import { HeroSection } from './_components/hero-section';
import { FeaturedCourseCard } from './_components/featured-course-card';
import { BlogPreviewSection } from './_components/blog-preview-section';
import { PhilosophySection } from './_components/philosophy-section';
import { Rocket, Zap, Database, Brain, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Accueil',
  description: 'Bonnes pratiques React et Next.js issues de 8 ans d\'expérience. Patterns éprouvés, solutions terrain et retours d\'expérience partagés gratuitement.',
  openGraph: {
    title: 'Kourso - Bonnes pratiques React & Next.js',
    description: 'Patterns éprouvés, solutions terrain et retours d\'expérience partagés gratuitement',
    images: ['/og-image-home.png'],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Kourso",
  "url": "https://kourso.com",
  "inLanguage": "fr-FR",
  "description": "Plateforme de partage de bonnes pratiques React et Next.js basées sur des projets réels",
  "publisher": {
    "@type": "Organization",
    "name": "Kourso"
  }
};

export default function Home() {
  return (
    <>
      {/* JSON-LD WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Course Section */}
        <section className="container py-20">
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-wider uppercase text-primary">
                Ressources principales
              </span>
              <h2 className="text-[clamp(2rem,5vw,3rem)] font-black leading-tight">
                Explorez les bonnes pratiques
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Featured: Guide Next.js */}
              <FeaturedCourseCard
                id="nextjs-demo"
                title="Guide Next.js 15"
                description="Bonnes pratiques des modes de rendu : SSR, SSG, ISR et Client Components. Retours d'expérience sur des projets réels avec exemples concrets."
                sections={21}
                tags={['Next.js 15', 'React 19', 'TypeScript']}
                gradient="from-primary to-brand-secondary"
                badge="POPULAIRE"
                icon={Rocket}
              />

              {/* React 19 - Compact card */}
              <div className="md:col-span-4">
                <a
                  href="/cours/react-19-advanced"
                  className="group block h-full rounded-2xl border-2 border-border/50 bg-card p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="space-y-4 h-full flex flex-col">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-purple-500" />
                      </div>
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400">
                        NOUVEAU
                      </span>
                    </div>
                    <h3 className="text-2xl font-black group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      React 19 - Seniors
                    </h3>
                    <p className="text-muted-foreground flex-1">
                      Patterns avances React 19 : Compiler, Server Components, Actions. Solutions eprouvees et cas d&apos;usage professionnels.
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <span className="text-sm text-muted-foreground">18 sections</span>
                      <span className="text-purple-600 dark:text-purple-400 font-bold">→</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Link
                href="/cours/nextjs-demo#performance-measurement"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Voir la démo performance live
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Nouveaux cours */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* TanStack - Compact card */}
              <a
                href="/cours/tanstack-react"
                className="group block rounded-2xl border-2 border-border/50 bg-card p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="space-y-4 h-full flex flex-col">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center">
                      <Database className="w-6 h-6 text-orange-500" />
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400">
                      NOUVEAU
                    </span>
                  </div>
                  <h3 className="text-2xl font-black group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    TanStack - Ecosysteme Complet
                  </h3>
                  <p className="text-muted-foreground flex-1">
                    Query, Router, Table, Virtual, Form, Store et Pacer. Du data fetching a l&apos;architecture de production.
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-sm text-muted-foreground">14 sections</span>
                    <span className="text-orange-600 dark:text-orange-400 font-bold">→</span>
                  </div>
                </div>
              </a>

              {/* Memoisation - Compact card */}
              <a
                href="/cours/react-memoization"
                className="group block rounded-2xl border-2 border-border/50 bg-card p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="space-y-4 h-full flex flex-col">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center">
                      <Brain className="w-6 h-6 text-blue-500" />
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      NOUVEAU
                    </span>
                  </div>
                  <h3 className="text-2xl font-black group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    useMemo, useCallback, React.memo
                  </h3>
                  <p className="text-muted-foreground flex-1">
                    Comprendre les 3 mecanismes de memoisation React avec des exemples concrets et testables.
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-sm text-muted-foreground">10 sections</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">→</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Blog Preview */}
        <BlogPreviewSection />

        {/* Philosophy / About Maxime */}
        <PhilosophySection />
      </div>
    </>
  );
}
