'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useRouter, usePathname } from 'next/navigation';
import { Search, BookOpen, FileText, Hash, ArrowRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { searchItems, type SearchItem, type GroupedResults } from '@/lib/search-index';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

interface ResultGroup {
  label: string;
  icon: React.ReactNode;
  items: SearchItem[];
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GroupedResults>({
    guides: [],
    guideSections: [],
    articles: [],
    articleHeadings: [],
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Portal mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Focus input on open
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  // Close on route change
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setQuery('');
      setResults({
        guides: [],
        guideSections: [],
        articles: [],
        articleHeadings: [],
      });
      setActiveIndex(0);
    }
  }, [open]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setResults(searchItems(query));
      setActiveIndex(0);
    }, 150);
    return () => clearTimeout(timer);
  }, [query]);

  // Flat results for keyboard navigation
  const flatResults = useMemo(
    () => [
      ...results.guides,
      ...results.guideSections,
      ...results.articles,
      ...results.articleHeadings,
    ],
    [results]
  );

  // Scroll active item into view
  useEffect(() => {
    const activeEl = resultsRef.current?.querySelector(
      '[data-active="true"]'
    );
    activeEl?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const navigate = useCallback(
    (item: SearchItem) => {
      router.push(item.href);
      onClose();
    },
    [router, onClose]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((i) => Math.min(i + 1, flatResults.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((i) => Math.max(i - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (flatResults[activeIndex]) {
            navigate(flatResults[activeIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, flatResults, activeIndex, navigate, onClose]);

  // Build result groups for rendering
  const groups: ResultGroup[] = useMemo(() => {
    const g: ResultGroup[] = [];
    if (results.guides.length > 0) {
      g.push({
        label: 'Guides',
        icon: <BookOpen className="h-3.5 w-3.5" />,
        items: results.guides,
      });
    }
    if (results.guideSections.length > 0) {
      g.push({
        label: 'Sections de guide',
        icon: <Hash className="h-3.5 w-3.5" />,
        items: results.guideSections,
      });
    }
    if (results.articles.length > 0) {
      g.push({
        label: 'Articles',
        icon: <FileText className="h-3.5 w-3.5" />,
        items: results.articles,
      });
    }
    if (results.articleHeadings.length > 0) {
      g.push({
        label: "Sections d'article",
        icon: <Hash className="h-3.5 w-3.5" />,
        items: results.articleHeadings,
      });
    }
    return g;
  }, [results]);

  function getItemIcon(type: SearchItem['type']) {
    switch (type) {
      case 'guide':
        return <BookOpen className="h-4 w-4 flex-shrink-0 text-muted-foreground" />;
      case 'guide-section':
        return <Hash className="h-4 w-4 flex-shrink-0 text-muted-foreground" />;
      case 'article':
        return <FileText className="h-4 w-4 flex-shrink-0 text-muted-foreground" />;
      case 'article-heading':
        return <Hash className="h-4 w-4 flex-shrink-0 text-muted-foreground" />;
    }
  }

  // Track cumulative index for flat navigation
  let cumulativeIndex = 0;

  if (!open || !mounted) return null;

  const dialog = (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div className="relative mx-4 mt-4 md:mx-auto md:mt-[20vh] md:max-w-lg slide-in-from-top">
        <div className="overflow-hidden rounded-xl border border-border/50 bg-popover shadow-xl">
          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher dans les guides et articles..."
              className="flex-1 bg-transparent py-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none"
              autoComplete="off"
              spellCheck={false}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="flex-shrink-0 rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Effacer la recherche"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Results */}
          <div
            ref={resultsRef}
            className="max-h-[min(60vh,400px)] overflow-y-auto overscroll-contain"
          >
            {query.length < 2 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                Tapez au moins 2 caracteres pour rechercher
              </div>
            ) : flatResults.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                Aucun resultat pour &ldquo;{query}&rdquo;
              </div>
            ) : (
              <div className="py-2">
                {groups.map((group) => {
                  const groupItems = group.items.map((item) => {
                    const index = cumulativeIndex++;
                    const isActive = index === activeIndex;
                    return (
                      <button
                        key={item.href}
                        data-active={isActive}
                        onClick={() => navigate(item)}
                        className={cn(
                          'flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors',
                          isActive
                            ? 'bg-accent text-accent-foreground'
                            : 'hover:bg-muted'
                        )}
                      >
                        {getItemIcon(item.type)}
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium">
                            {item.title}
                          </div>
                          {(item.parentTitle || item.description) && (
                            <div className="truncate text-xs text-muted-foreground">
                              {item.parentTitle ?? item.description}
                            </div>
                          )}
                        </div>
                        <ArrowRight
                          className={cn(
                            'h-3.5 w-3.5 flex-shrink-0 transition-opacity',
                            isActive
                              ? 'opacity-100 text-accent-foreground'
                              : 'opacity-0'
                          )}
                        />
                      </button>
                    );
                  });

                  return (
                    <div key={group.label}>
                      <div className="flex items-center gap-2 px-4 pb-1 pt-3">
                        <span className="text-muted-foreground">
                          {group.icon}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {group.label}
                        </span>
                      </div>
                      {groupItems}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border/50 bg-muted px-1 py-0.5 font-mono text-[10px]">
                &uarr;&darr;
              </kbd>
              Naviguer
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border/50 bg-muted px-1 py-0.5 font-mono text-[10px]">
                &crarr;
              </kbd>
              Ouvrir
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border/50 bg-muted px-1 py-0.5 font-mono text-[10px]">
                esc
              </kbd>
              Fermer
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(dialog, document.body);
}
