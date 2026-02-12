'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type CategoryType =
  | 'fundamentals'
  | 'rendering'
  | 'optimization'
  | 'best-practices'
  | 'advanced'
  | 'architecture'
  | 'testing';

interface ConceptCardProps {
  title: string;
  description: string;
  category?: CategoryType;
  visual?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const categoryAccents: Record<CategoryType, string> = {
  fundamentals: 'from-primary/10 to-brand-secondary/10',
  rendering: 'from-blue-500/10 to-cyan-500/10',
  optimization: 'from-orange-500/10 to-amber-500/10',
  'best-practices': 'from-purple-500/10 to-pink-500/10',
  advanced: 'from-red-500/10 to-rose-500/10',
  architecture: 'from-blue-500/10 to-cyan-500/10',
  testing: 'from-orange-500/10 to-amber-500/10',
};

export function ConceptCard({
  title,
  description,
  category = 'fundamentals',
  visual,
  children,
  className
}: ConceptCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative rounded-xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-500',
        'opacity-0 translate-y-5',
        isVisible && 'opacity-100 translate-y-0',
        className
      )}
    >
      {/* Subtle gradient accent */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500',
          categoryAccents[category]
        )}
      />

      <div className="relative">
        {/* Content Layout - Asymétrique sur desktop */}
        <div className={cn(
          'grid gap-6 p-6',
          visual ? 'md:grid-cols-[2fr,1fr]' : 'md:grid-cols-1'
        )}>
          {/* Main Content */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground leading-tight">
              {title}
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>

            {children && (
              <div className="mt-6 space-y-3">
                {children}
              </div>
            )}
          </div>

          {/* Visual Element */}
          {visual && (
            <div className="flex items-center justify-center p-4 rounded-lg bg-muted/30">
              {visual}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
