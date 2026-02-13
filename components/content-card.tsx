import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  href: string;
  type: 'guide' | 'article';
  title: string;
  description: string;
  tags: string[];
  accentColor: string;
  badge?: string;
  sections?: number;
  duration?: string;
  publishedAt?: string;
  readingTime?: number;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
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
  publishedAt,
  readingTime,
}: ContentCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-border/50 bg-card p-4 sm:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
      style={{ borderTopWidth: '2px', borderTopColor: accentColor }}
    >
      <div className="flex h-full flex-col text-center md:text-left">
        {/* Header: type + badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            {type === 'guide' ? 'Guide' : 'Article'}
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
        <h3 className="text-lg md:text-xl font-bold leading-tight mb-3 transition-colors duration-200 group-hover:text-primary line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4 justify-center md:justify-start">
          {tags.slice(0, 3).map((tag) => (
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
          <span className="text-sm text-muted-foreground">
            {type === 'guide'
              ? sections
                ? `${sections} sections${duration ? ` · ~${duration}` : ''}`
                : duration ? `~${duration}` : ''
              : `${publishedAt ? formatDate(publishedAt) : ''}${readingTime ? ` · ${readingTime} min` : ''}`}
          </span>
          <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
        </div>
      </div>
    </Link>
  );
}
