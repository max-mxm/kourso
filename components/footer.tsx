import Link from 'next/link';
import { Linkedin, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Branding */}
          <div className="md:col-span-5 space-y-4 text-center md:text-left">
            <h3 className="text-xl font-bold text-foreground tracking-tight">
              Koursorr
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-md mx-auto md:mx-0 text-sm">
              Blog et bonnes pratiques frontend par Maxime Morellon.
              Retours d&apos;experience, patterns eprouves et guides techniques.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 justify-center md:justify-start">
              <a
                href="https://www.linkedin.com/in/maxime-morellon-7a9403112"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                aria-label="LinkedIn de Maxime Morellon"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.maxime-morellon.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                aria-label="Portfolio de Maxime Morellon"
              >
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 space-y-4 text-center md:text-left">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2 items-center md:items-start">
              <Link href="/" className="text-sm text-foreground hover:text-primary transition-colors">
                Accueil
              </Link>
              <Link href="/guides" className="text-sm text-foreground hover:text-primary transition-colors">
                Guides
              </Link>
              <Link href="/blog" className="text-sm text-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-sm text-foreground hover:text-primary transition-colors">
                A propos
              </Link>
            </nav>
          </div>

          {/* Guides */}
          <div className="md:col-span-4 space-y-4 text-center md:text-left">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Guides disponibles
            </h4>
            <nav className="flex flex-col gap-2 items-center md:items-start">
              <Link href="/guides/nextjs-demo" className="text-sm text-foreground hover:text-primary transition-colors">
                Guide Next.js 16
              </Link>
              <Link href="/guides/react-19-advanced" className="text-sm text-foreground hover:text-primary transition-colors">
                React 19 -- Seniors
              </Link>
              <Link href="/guides/tanstack-react" className="text-sm text-foreground hover:text-primary transition-colors">
                TanStack -- Ecosysteme React
              </Link>
              <Link href="/guides/react-memoization" className="text-sm text-foreground hover:text-primary transition-colors">
                useMemo, useCallback, React.memo
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 md:mt-12 md:pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 Koursorr &middot; Cree par{' '}
            <a
              href="https://www.maxime-morellon.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Maxime Morellon
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            Fait avec Next.js et React
          </p>
        </div>
      </div>
    </footer>
  );
}
