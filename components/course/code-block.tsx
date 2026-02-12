'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

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

export function CodeBlock({
  code,
  language,
  filename,
  highlightLines = [],
  category = 'fundamentals'
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');
  const borderColor = categoryColors[category];

  return (
    <div
      className="group relative rounded-lg overflow-hidden bg-muted/30 transition-all duration-300 hover:shadow-lg"
      style={{ borderLeft: `4px solid ${borderColor}` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border/50 bg-muted/20">
        <div className="flex items-center gap-3">
          {filename && (
            <span className="text-sm font-medium text-foreground/80">{filename}</span>
          )}
          <span
            className="text-xs font-mono px-2 py-0.5 rounded"
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
          className="text-xs px-3 py-1.5 rounded-md bg-background/50 border border-border/50 hover:bg-background hover:border-primary/50 transition-all duration-200 font-medium flex items-center gap-1.5"
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
      <div className="overflow-x-auto">
        <pre className="p-4 sm:p-6 text-sm leading-relaxed">
          <code className="font-mono">
            {lines.map((line, index) => {
              const lineNumber = index + 1;
              const isHighlighted = highlightLines.includes(lineNumber);

              return (
                <div
                  key={index}
                  className={cn(
                    'flex gap-4 px-2 -mx-2 rounded transition-colors',
                    isHighlighted && 'bg-primary/10'
                  )}
                >
                  <span className="text-muted-foreground/40 select-none text-right w-8 flex-shrink-0">
                    {lineNumber}
                  </span>
                  <span className="text-foreground/90 flex-1">{line || ' '}</span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
}
