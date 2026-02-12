import Link from 'next/link';

interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
}

export function NavLink({ href, active, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={
        active
          ? 'text-primary font-semibold'
          : 'text-muted-foreground hover:text-foreground transition-colors'
      }
    >
      {children}
    </Link>
  );
}
