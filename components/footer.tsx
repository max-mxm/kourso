import Link from 'next/link';
import { Linkedin, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30 mt-32">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Colonne 1-5: Branding */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-2xl font-black bg-gradient-to-r from-primary to-brand-secondary bg-clip-text text-transparent">
              Koursorr
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Plateforme d&apos;apprentissage React et Next.js avec cours interactifs, exemples pratiques, et guides avancés.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/maxime-morellon-7a9403112"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                aria-label="LinkedIn de Maxime Morellon"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.maxime-morellon.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                aria-label="Portfolio de Maxime Morellon"
              >
                <Globe size={20} />
              </a>
            </div>
          </div>

          {/* Colonne 6-8: Navigation */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Accueil
              </Link>
              <Link href="/cours" className="text-foreground hover:text-primary transition-colors">
                Cours
              </Link>
              <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                À propos
              </Link>
            </nav>
          </div>

          {/* Colonne 9-12: Cours */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Cours disponibles
            </h4>
            <nav className="flex flex-col gap-2">
              <Link href="/cours/nextjs-demo" className="text-foreground hover:text-primary transition-colors">
                Guide Next.js 15
              </Link>
              <Link href="/cours/react-19-advanced" className="text-foreground hover:text-primary transition-colors">
                React 19 - Seniors
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Koursorr · Créé par{' '}
            <a
              href="https://www.maxime-morellon.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors font-semibold"
            >
              Maxime Morellon
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            Open Source · Gratuit · Made with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
