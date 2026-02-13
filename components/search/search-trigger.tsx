'use client';

import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchTriggerProps {
  onClick: () => void;
}

export function SearchTrigger({ onClick }: SearchTriggerProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'hidden md:flex items-center gap-2 rounded-lg border border-border/50 px-3 py-1.5',
        'text-sm text-muted-foreground transition-colors',
        'hover:border-border hover:text-foreground hover:bg-accent/50'
      )}
      aria-label="Rechercher"
    >
      <Search className="h-4 w-4" />
      <span>Rechercher...</span>
      <kbd className="ml-4 rounded border border-border/50 bg-muted px-1.5 py-0.5 text-xs font-mono text-muted-foreground">
        ⌘K
      </kbd>
    </button>
  );
}

export function SearchTriggerMobile({ onClick }: SearchTriggerProps) {
  return (
    <button
      onClick={onClick}
      className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md hover:bg-accent transition-colors"
      aria-label="Rechercher"
    >
      <Search className="h-5 w-5" />
    </button>
  );
}
