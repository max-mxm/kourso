import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface FeaturedCourseCardProps {
  id: string;
  title: string;
  description: string;
  sections: number;
  tags: string[];
  gradient: string;
  badge?: string;
  icon: LucideIcon;
}

export function FeaturedCourseCard({
  id,
  title,
  description,
  sections,
  tags,
  gradient,
  badge,
  icon: Icon,
}: FeaturedCourseCardProps) {
  return (
    <Link
      href={`/guides/${id}`}
      className="group relative rounded-3xl border-2 border-border/50 bg-card p-12 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden md:col-span-8"
    >
      {/* Thick left border accent */}
      <div className={`absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b ${gradient}`} />

      {/* Hover gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

      <div className="relative space-y-6">
        {/* Badge + Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} bg-opacity-10 flex items-center justify-center`}>
              <Icon className="w-8 h-8 text-primary" />
            </div>
            {badge && (
              <div className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary uppercase tracking-wider">
                {badge}
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[clamp(1.5rem,3vw,3.5rem)] font-black leading-tight group-hover:translate-x-2 transition-transform duration-300">
          <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
            {title}
          </span>
        </h3>

        {/* Description */}
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-sm px-3 py-1 rounded-full bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-6 flex items-center justify-between border-t border-border/50">
          <span className="text-muted-foreground font-medium">{sections} sections</span>
          <span className="text-primary font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
            Commencer
            <span className="text-2xl">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
