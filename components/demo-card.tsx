import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DemoCardProps {
  href: string;
  title: string;
  description: string;
  tags: string[];
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  badge: string;
  duration: string;
  relatedGuide: string;
}

export function DemoCard({
  href,
  title,
  description,
  tags,
  gradientFrom,
  gradientTo,
  badge,
  duration,
}: DemoCardProps) {
  const badgeStyles = gradientFrom.includes('orange')
    ? 'bg-orange-500/15 text-orange-600 dark:text-orange-400'
    : gradientFrom.includes('blue')
      ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400'
      : 'bg-primary/10 text-primary';

  const accentIconColor = gradientFrom.includes('orange')
    ? 'text-orange-500'
    : gradientFrom.includes('blue')
      ? 'text-blue-500'
      : 'text-primary';

  return (
    <Link
      href={href}
      className="group relative block rounded-2xl border border-border/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <div
        className={cn(
          'h-1.5 bg-gradient-to-r',
          gradientFrom,
          gradientTo,
        )}
      />

      <div className="p-5 sm:p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <span className={cn(
            'text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md',
            badgeStyles,
          )}>
            {badge}
          </span>
          <span className="text-xs text-muted-foreground font-medium">
            ~{duration}
          </span>
        </div>

        <h3 className="text-lg md:text-xl font-bold leading-tight mb-3 transition-colors group-hover:text-primary flex items-start gap-2">
          <Play className={cn('w-5 h-5 mt-0.5 flex-shrink-0 transition-colors', accentIconColor, 'group-hover:text-primary')} />
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-4 border-t border-border/30 text-sm font-medium text-primary">
          Lancer la demo
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
