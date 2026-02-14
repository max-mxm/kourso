import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ContentCardProps {
  href: string;
  type: 'guide' | 'article' | 'demo';
  title: string;
  description: string;
  tags: string[];
  accentColor: string;
  badge?: string;
  sections?: number;
  duration?: string;
  level?: string;
  publishedAt?: string;
  readingTime?: number;
  variant?: 'default' | 'featured';
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function guideFooter(sections?: number, duration?: string, level?: string): string {
  return [
    sections ? `${sections} sections` : null,
    duration ? `~${duration}` : null,
    level ?? null,
  ].filter(Boolean).join(' · ');
}

function articleFooter(publishedAt?: string, readingTime?: number): string {
  return [
    publishedAt ? formatDate(publishedAt) : null,
    readingTime ? `${readingTime} min` : null,
  ].filter(Boolean).join(' · ');
}

export function ContentCard({
  href,
  type,
  title,
  description,
  tags,
  accentColor,
  badge,
  sections,
  duration,
  level,
  publishedAt,
  readingTime,
  variant = 'default',
}: ContentCardProps) {
  const isFeatured = variant === 'featured';
  const displayTags = isFeatured ? tags : tags.slice(0, 3);
  return (
    <Link
      href={href}
      className={cn(
        "group block rounded-xl border border-border/50 bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5",
        isFeatured ? 'p-6 sm:p-8 md:p-10' : 'p-4 sm:p-6',
      )}
      style={{ borderTopWidth: '2px', borderTopColor: accentColor }}
    >
      <div className={cn(
        "flex h-full flex-col text-center md:text-left",
        isFeatured && 'gap-1',
      )}>
        {/* Header: type + badge */}
        <div className={cn("flex items-center justify-between", isFeatured ? 'mb-5' : 'mb-4')}>
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            {type === 'guide' ? 'Guide' : type === 'demo' ? 'Démo' : 'Article'}
          </span>
          {badge && (
            <span className={cn(
              "text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md",
              badge === 'INTERACTIF'
                ? 'bg-orange-500/15 text-orange-600 dark:text-orange-400'
                : 'bg-primary/10 text-primary'
            )}>
              {badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className={cn(
          "font-bold leading-tight transition-colors duration-200 group-hover:text-primary",
          isFeatured
            ? 'text-2xl md:text-3xl mb-4'
            : 'text-lg md:text-xl mb-3 line-clamp-2',
        )}>
          {title}
        </h3>

        {/* Description */}
        <p className={cn(
          "text-muted-foreground leading-relaxed flex-1",
          isFeatured
            ? 'text-sm sm:text-base mb-5'
            : 'text-xs sm:text-sm line-clamp-3 mb-4',
        )}>
          {description}
        </p>

        {/* Tags */}
        <div className={cn(
          "flex flex-wrap gap-1.5 justify-center md:justify-start",
          isFeatured ? 'mb-5' : 'mb-4',
        )}>
          {displayTags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center md:justify-between pt-4 border-t border-border/30 gap-2">
          <span className={cn("text-muted-foreground", isFeatured ? 'text-sm' : 'text-sm')}>
            {type === 'guide'
              ? guideFooter(sections, duration, level)
              : articleFooter(publishedAt, readingTime)}
          </span>
          <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
        </div>
      </div>
    </Link>
  );
}
