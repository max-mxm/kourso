import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden py-20">
      {/* Abstract Background Shape */}
      <div className="absolute top-0 right-0 w-[40vw] h-[60vh] bg-gradient-to-br from-primary/20 to-brand-secondary/20 blur-3xl rounded-full" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Colonne 1-7: Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Eyebrow */}
            <div className="inline-block">
              <span className="text-xs font-bold tracking-wider uppercase text-primary">
                Bonnes pratiques React & Next.js
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-[clamp(3rem,8vw,6rem)] font-black leading-[1.05] tracking-tight">
              Bonnes pratiques testées sur des{' '}
              <span className="bg-gradient-to-r from-primary to-brand-secondary bg-clip-text text-transparent">
                projets réels
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-[clamp(1.125rem,2vw,1.5rem)] text-muted-foreground leading-relaxed max-w-2xl">
              Patterns éprouvés, solutions terrain et cas d'usage issus de 8 ans d'expérience par{' '}
              <a
                href="https://www.maxime-morellon.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground font-semibold hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4"
              >
                Maxime Morellon
              </a>
              . Partagés gratuitement avec la communauté des développeurs.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/guides/nextjs-demo"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
              >
                Explorer les ressources
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-border hover:border-primary/50 font-semibold rounded-xl hover:bg-primary/5 transition-all duration-200"
              >
                Voir tous les guides
              </Link>
            </div>

            {/* Stats Bar */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-border/50">
              <div>
                <div className="text-4xl font-black text-foreground">8 ans</div>
                <div className="text-sm text-muted-foreground">d'expérience</div>
              </div>
              <div>
                <div className="text-4xl font-black text-foreground">40+</div>
                <div className="text-sm text-muted-foreground">cas d'usage documentés</div>
              </div>
              <div>
                <div className="text-4xl font-black text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Open Source</div>
              </div>
            </div>
          </div>

          {/* Colonne 8-12: Visual */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/10 to-brand-secondary/10 border border-primary/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
