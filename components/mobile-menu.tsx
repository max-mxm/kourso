'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface MobileMenuProps {
  pathname: string;
  onClose: () => void;
}

export function MobileMenu({ pathname, onClose }: MobileMenuProps) {
  // Disable body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-lg md:hidden animate-in fade-in slide-in-from-top-4">
      <nav className="container py-8 flex flex-col gap-2">
        <MobileNavLink href="/" active={pathname === '/'} onClick={onClose}>
          Accueil
        </MobileNavLink>
        <MobileNavLink href="/guides" active={pathname.startsWith('/guides')} onClick={onClose}>
          Guides
        </MobileNavLink>
        <MobileNavLink href="/blog" active={pathname.startsWith('/blog')} onClick={onClose}>
          Blog
        </MobileNavLink>
        <MobileNavLink href="/about" active={pathname === '/about'} onClick={onClose}>
          À propos
        </MobileNavLink>
      </nav>
    </div>
  );
}

interface MobileNavLinkProps {
  href: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function MobileNavLink({ href, active, onClick, children }: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        min-h-[44px] px-4 py-3 rounded-lg text-lg font-semibold transition-colors
        ${active ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'}
      `}
    >
      {children}
    </Link>
  );
}
