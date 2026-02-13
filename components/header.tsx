'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import { NavLink } from './nav-link';
import { MobileMenu } from './mobile-menu';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-black bg-gradient-to-r from-primary to-brand-secondary bg-clip-text text-transparent"
        >
          Koursorr
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/" active={pathname === '/'}>
            Accueil
          </NavLink>
          <NavLink href="/guides" active={pathname.startsWith('/guides')}>
            Guides
          </NavLink>
          <NavLink href="/blog" active={pathname.startsWith('/blog')}>
            Blog
          </NavLink>
          <NavLink href="/about" active={pathname === '/about'}>
            À propos
          </NavLink>
        </nav>

        {/* Desktop: ThemeToggle | Mobile: Hamburger + ThemeToggle */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <MobileMenu pathname={pathname} onClose={() => setMobileMenuOpen(false)} />
      )}
    </header>
  );
}
