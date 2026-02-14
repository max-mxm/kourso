'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface MobileMenuProps {
  pathname: string;
  onClose: () => void;
}

export function MobileMenu({ pathname, onClose }: MobileMenuProps) {
  const [isDark, setIsDark] = useState(false);

  // Disable body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();

    // Observer pour détecter les changements de thème
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed inset-0 top-16 z-40 bg-[#ffffff] dark:bg-[#0c0c0c] md:hidden border-t border-slate-200 dark:border-slate-800">
      <nav className="container py-8 flex flex-col gap-2 bg-inherit">
        <MobileNavLink href="/" active={pathname === '/'} onClick={onClose}>
          Accueil
        </MobileNavLink>
        <MobileNavLink href="/guides" active={pathname.startsWith('/guides')} onClick={onClose}>
          Guides
        </MobileNavLink>
        <MobileNavLink href="/demos" active={pathname.startsWith('/demos')} onClick={onClose}>
          Démos
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
        ${active ? 'bg-primary/10 text-primary' : 'bg-muted/50 text-foreground hover:bg-muted'}
      `}
    >
      {children}
    </Link>
  );
}
