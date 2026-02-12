import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Rocket, BookOpen, Target, Zap, Palette, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <h1 className="text-2xl font-black bg-gradient-to-r from-primary to-brand-secondary bg-clip-text text-transparent">
            Kourso
          </h1>
          <ThemeToggle />
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 md:py-32">
          <div className="max-w-5xl mx-auto">
            {/* Contenu principal */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block">
                  <span className="text-sm font-bold tracking-wider uppercase text-primary">
                    Plateforme d&apos;apprentissage
                  </span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
                  Maîtrisez les
                  <br />
                  <span className="bg-gradient-to-r from-primary to-brand-secondary bg-clip-text text-transparent">
                    technologies web
                  </span>
                  <br />
                  modernes
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Des cours interactifs et complets pour apprendre Next.js, React et les frameworks modernes avec des exemples concrets et des démos en temps réel.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/cours/nextjs-demo"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
                >
                  Commencer le cours Next.js
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </Link>
                <Link
                  href="/cours"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-border hover:border-primary/50 font-semibold rounded-xl hover:bg-primary/5 transition-all duration-200"
                >
                  Voir tous les cours
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8 border-t border-border/50">
                <div>
                  <div className="text-3xl font-black text-foreground">2</div>
                  <div className="text-sm text-muted-foreground">Cours disponibles</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-foreground">39</div>
                  <div className="text-sm text-muted-foreground">Sections détaillées</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-foreground">100%</div>
                  <div className="text-sm text-muted-foreground">Gratuit & Open Source</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Cours */}
        <section className="container mx-auto px-6 py-20">
          <div className="space-y-12">
            <div className="max-w-2xl">
              <h3 className="text-3xl font-black tracking-tight mb-4">
                Cours disponibles
              </h3>
              <p className="text-lg text-muted-foreground">
                Explorez notre collection de cours interactifs conçus pour vous faire progresser rapidement.
              </p>
            </div>

            {/* Liste des cours */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Cours Next.js */}
              <Link
                href="/cours/nextjs-demo"
                className="group relative rounded-2xl border border-border/50 bg-card p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] overflow-hidden"
              >
                {/* Gradient accent au survol */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-brand-secondary/10 flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-xs font-bold px-2 py-1 rounded bg-primary/10 text-primary">
                      POPULAIRE
                    </div>
                  </div>

                  <div>
                    <h4 className="text-2xl font-black mb-2 group-hover:text-primary transition-colors">
                      Guide Next.js 15
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Maîtrisez les modes de rendu modernes : SSR, SSG, ISR et Client Components avec des exemples interactifs.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      Next.js 15
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      React 19
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      TypeScript
                    </span>
                  </div>

                  <div className="pt-4 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">21 sections</span>
                    <span className="text-primary group-hover:translate-x-1 transition-transform duration-200">
                      Commencer →
                    </span>
                  </div>
                </div>
              </Link>

              {/* Cours React 19 */}
              <Link
                href="/cours/react-19-advanced"
                className="group relative rounded-2xl border border-border/50 bg-card p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] overflow-hidden"
              >
                {/* Gradient accent au survol */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-purple-500" />
                    </div>
                    <div className="text-xs font-bold px-2 py-1 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400">
                      NOUVEAU
                    </div>
                  </div>

                  <div>
                    <h4 className="text-2xl font-black mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      React 19 - Seniors
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Maîtrisez React 19, le Compiler, Server Components, Actions et tous les patterns avancés pour devs seniors.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      React 19
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      TypeScript
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      Avancé
                    </span>
                  </div>

                  <div className="pt-4 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">18 sections</span>
                    <span className="text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform duration-200">
                      Commencer →
                    </span>
                  </div>
                </div>
              </Link>

              {/* Placeholder cours futurs */}
              <div className="relative rounded-2xl border border-dashed border-border/50 bg-muted/20 p-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-muted-foreground/50" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-muted-foreground mb-2">
                    Plus de cours bientôt
                  </h4>
                  <p className="text-sm text-muted-foreground/80">
                    React avancé, TypeScript, et bien plus à venir...
                  </p>
                </div>
              </div>

              <div className="relative rounded-2xl border border-dashed border-border/50 bg-muted/20 p-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center">
                  <Target className="w-8 h-8 text-muted-foreground/50" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-muted-foreground mb-2">
                    Contributez
                  </h4>
                  <p className="text-sm text-muted-foreground/80">
                    Ce projet est open source. Ajoutez vos propres cours !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Fonctionnalités */}
        <section className="container mx-auto px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-brand-secondary/10 flex items-center justify-center border border-primary/20">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <h4 className="text-xl font-bold">Démos interactives</h4>
              <p className="text-muted-foreground leading-relaxed">
                Testez les concepts directement dans le navigateur avec des démos en temps réel pour chaque section.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-brand-secondary/10 flex items-center justify-center border border-primary/20">
                <Palette className="w-7 h-7 text-primary" />
              </div>
              <h4 className="text-xl font-bold">Design moderne</h4>
              <p className="text-muted-foreground leading-relaxed">
                Interface élégante avec thème sombre/clair, typographie soignée et animations fluides.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-brand-secondary/10 flex items-center justify-center border border-primary/20">
                <BarChart3 className="w-7 h-7 text-primary" />
              </div>
              <h4 className="text-xl font-bold">Suivi de progression</h4>
              <p className="text-muted-foreground leading-relaxed">
                Visualisez votre avancement avec une barre de progression et une navigation contextuelle.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 Kourso. Plateforme open source pour l&apos;apprentissage.
            </p>
            <div className="flex gap-4 text-sm">
              <Link href="/cours" className="text-muted-foreground hover:text-primary transition-colors">
                Cours
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                À propos
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
