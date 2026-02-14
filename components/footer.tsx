import { Linkedin, Globe } from 'lucide-react';
import { LogoOption3 } from './logo-option-3';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="container py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + Description */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <LogoOption3 />
            <p className="text-muted-foreground text-sm text-center md:text-left max-w-md">
              Blog et bonnes pratiques frontend. Retours d&apos;experience, patterns eprouves et guides techniques.
            </p>
            <span className="text-xs text-muted-foreground/80 text-center md:text-left">
              Fait avec passion par{' '}
              <a
                href="https://www.maxime-morellon.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Maxime Morellon
              </a>
            </span>
          </div>

          {/* Social Links + Copyright */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/maxime-morellon-7a9403112"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://www.maxime-morellon.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-colors"
              aria-label="Portfolio"
            >
              <Globe size={18} />
            </a>
            <div className="hidden md:block w-px h-6 bg-border/50" />
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              &copy; 2026 Maxpaths
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
