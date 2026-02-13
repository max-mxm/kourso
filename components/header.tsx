'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import { NavLink } from './nav-link';
import { MobileMenu } from './mobile-menu';
import { SearchTrigger, SearchTriggerMobile } from './search/search-trigger';
import { SearchDialog } from './search/search-dialog';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-foreground tracking-tight"
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
            A propos
          </NavLink>
        </nav>

        {/* Actions: Search + ThemeToggle + Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <SearchTrigger onClick={() => setSearchOpen(true)} />
          <SearchTriggerMobile onClick={() => setSearchOpen(true)} />
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

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
