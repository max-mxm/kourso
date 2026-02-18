'use client';

import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { Highlight, themes } from 'prism-react-renderer';
import { useTheme } from '@/components/theme-provider';

type CategoryType =
  | 'fundamentals'
  | 'rendering'
  | 'optimization'
  | 'best-practices'
  | 'advanced'
  | 'architecture'
  | 'testing';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  highlightLines?: number[];
  category?: CategoryType;
}

const categoryColors: Record<CategoryType, string> = {
  fundamentals: 'rgb(0, 150, 136)', // Teal
  rendering: 'rgb(59, 130, 246)', // Blue
  optimization: 'rgb(249, 115, 22)', // Orange
  'best-practices': 'rgb(168, 85, 247)', // Violet
  advanced: 'rgb(239, 68, 68)', // Rouge
  architecture: 'rgb(59, 130, 246)', // Blue
  testing: 'rgb(249, 115, 22)', // Orange
};

const plainLanguages = ['text', 'plaintext', 'plain'];

const EMPTY_HIGHLIGHT_LINES: number[] = [];

function subscribeToColorScheme(callback: () => void) {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getSystemDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function useResolvedDark() {
  const { theme } = useTheme();
  const systemDark = useSyncExternalStore(
    subscribeToColorScheme,
    getSystemDark,
    () => false
  );

  if (theme === 'system') return systemDark;
  return theme === 'dark';
}

export function CodeBlock({
  code,
  language,
  filename,
  highlightLines = EMPTY_HIGHLIGHT_LINES,
  category = 'fundamentals'
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const isDark = useResolvedDark();
  const copyTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => clearTimeout(copyTimerRef.current);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  const borderColor = categoryColors[category];
  const prismTheme = isDark ? themes.oneDark : themes.oneLight;
  const isPlain = plainLanguages.includes(language);

  return (
    <div
      className="group relative w-full min-w-0 max-w-full rounded-lg overflow-hidden bg-muted/30 transition-all duration-300 hover:shadow-lg"
      style={{ borderLeft: `4px solid ${borderColor}` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-border/50 bg-muted/20">
        <div className="min-w-0 flex items-center gap-3">
          {filename && (
            <span
              className="min-w-0 truncate text-sm font-medium text-foreground/80"
              title={filename}
            >
              {filename}
            </span>
          )}
          <span
            className="shrink-0 text-xs font-mono px-2 py-0.5 rounded"
            style={{
              backgroundColor: `${borderColor}15`,
              color: borderColor
            }}
          >
            {language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="shrink-0 text-xs px-3 py-1.5 rounded-md bg-background/50 border border-border/50 hover:bg-background hover:border-primary/50 transition-all duration-200 font-medium flex items-center gap-1.5"
          aria-label="Copier le code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copié
            </>
          ) : (
            'Copier'
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="max-w-full overflow-x-auto">
        <Highlight
          theme={prismTheme}
          code={code.trim()}
          language={isPlain ? 'plain' : language}
        >
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre className="min-w-max p-4 sm:p-6 text-sm leading-relaxed" style={{ background: 'transparent' }}>
              <code className="font-mono">
                {tokens.map((line, index) => {
                  const lineNumber = index + 1;
                  const isHighlighted = highlightLines.includes(lineNumber);
                  const lineProps = getLineProps({ line });

                  return (
                    <div
                      key={index}
                      {...lineProps}
                      className={cn(
                        'flex gap-4 px-2 -mx-2 rounded transition-colors',
                        isHighlighted && 'bg-primary/10'
                      )}
                    >
                      <span className="text-muted-foreground/40 select-none text-right w-8 flex-shrink-0">
                        {lineNumber}
                      </span>
                      <span className="flex-1">
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </span>
                    </div>
                  );
                })}
              </code>
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
