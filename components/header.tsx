'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-2xl font-black bg-gradient-to-r from-primary to-brand-secondary bg-clip-text text-transparent"
          >
            Kourso
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            <Link
              href="/cours"
              className={
                pathname.startsWith('/cours')
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground transition-colors'
              }
            >
              Cours
            </Link>
            <Link
              href="/blog"
              className={
                pathname.startsWith('/blog')
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground transition-colors'
              }
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={
                pathname === '/about'
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground transition-colors'
              }
            >
              À propos
            </Link>
          </nav>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}
