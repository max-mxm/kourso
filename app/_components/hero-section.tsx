import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-[95vh] flex items-center py-12 md:py-20">
      {/* Stratified Layers Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Bande 1: Top diagonal teal */}
        <div
          className="absolute -top-32 left-0 right-0 h-64 opacity-[0.08] dark:opacity-[0.06]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, var(--primary) 30%, transparent 70%)',
            transform: 'skewY(-6deg)',
            transformOrigin: 'top left'
          }}
        />

        {/* Bande 2: Middle diagonal violet */}
        <div
          className="absolute top-1/3 left-0 right-0 h-80 opacity-[0.06] dark:opacity-[0.05]"
          style={{
            background: 'linear-gradient(90deg, var(--brand-secondary) 0%, transparent 50%, var(--brand-secondary) 100%)',
            transform: 'skewY(4deg)',
            transformOrigin: 'center'
          }}
        />

        {/* Bande 3: Lower diagonal teal-violet mix */}
        <div
          className="absolute bottom-0 left-0 right-0 h-96 opacity-[0.07] dark:opacity-[0.055]"
          style={{
            background: 'linear-gradient(90deg, var(--primary) 0%, var(--brand-secondary) 50%, transparent 80%)',
            transform: 'skewY(-3deg)',
            transformOrigin: 'bottom right'
          }}
        />

        {/* Highlight accent vertical gauche */}
        <div
          className="absolute top-0 bottom-0 left-0 w-1/4 opacity-[0.04] dark:opacity-[0.03]"
          style={{
            background: 'linear-gradient(180deg, var(--primary) 0%, transparent 60%)'
          }}
        />

        {/* Subtle grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '150px 150px'
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Grid 2 colonnes desktop, flex mobile */}
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* COLONNE GAUCHE (60%) - Titre */}
          <div className="lg:col-span-3 text-center lg:text-left">
            {/* Eyebrow avec barre verticale */}
            <div
              className="flex items-center justify-center lg:justify-start gap-4 animate-fade-up opacity-0"
              style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
            >
              <div className="w-1 h-10 bg-primary animate-grow-vertical" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }} />
              <span className="px-3 py-1 text-xs font-bold tracking-[0.2em] uppercase bg-brand-secondary/10 text-primary rounded border border-primary/20">
                Frontend&ensp;/&ensp;React&ensp;/&ensp;Next.js
              </span>
            </div>

            {/* H1 MONUMENTALE */}
            <h1
              className="text-[clamp(4rem,12vw,10rem)] leading-[0.95] mt-12"
            >
              <span className="block font-black tracking-[-0.04em] text-foreground lg:bg-gradient-to-r lg:from-foreground lg:via-primary/60 lg:to-brand-secondary/40 lg:bg-clip-text lg:text-transparent animate-slideInUp-title opacity-0" style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}>
                Bonnes pratiques
              </span>
              <span className="block font-thin tracking-[0.02em] text-primary ml-0 lg:ml-16 animate-text-shimmer opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                frontend
              </span>
            </h1>
          </div>

          {/* COLONNE DROITE (40%) - Texte descriptif + CTAs */}
          <div className="lg:col-span-2 flex flex-col justify-center space-y-10">
            {/* Description avec bordure accentuée */}
            <div
              className="relative pl-6 animate-fade-up opacity-0"
              style={{ animationDelay: '0.65s', animationFillMode: 'forwards' }}
            >
              {/* Barre accent gauche */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary via-brand-secondary to-primary/30" />

              <div className="space-y-4">
                <p className="text-[clamp(1.125rem,2.5vw,1.375rem)] text-foreground/90 leading-relaxed font-medium">
                  Documentation technique et retours d'expérience sur l'écosystème React.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Guides détaillés, patterns éprouvés et analyses de performance pour construire des applications frontend robustes et performantes.
                </p>
              </div>
            </div>

            {/* Stats rapides */}
            <div
              className="grid grid-cols-2 gap-6 animate-fade-up opacity-0"
              style={{ animationDelay: '0.85s', animationFillMode: 'forwards' }}
            >
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary">5</div>
                <div className="text-sm text-muted-foreground">Guides techniques</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-brand-secondary">2</div>
                <div className="text-sm text-muted-foreground">Démos interactives</div>
              </div>
            </div>

            {/* CTAs redesignés */}
            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-up opacity-0"
              style={{ animationDelay: '1.05s', animationFillMode: 'forwards' }}
            >
              <Link
                href="/guides"
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative">Explorer les guides</span>
                <svg className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/blog"
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-border/60 hover:border-primary/40 font-semibold rounded-lg hover:bg-primary/5 transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                <span className="relative">Lire le blog</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de séparation gradient teal→violet→teal */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
}
