import { BookOpen } from 'lucide-react';
import { getGuidesOnlyForCatalog } from '@/lib/content';
import { GuidesPageClient } from './guides-page-client';

export default function CoursesPage() {
  const guides = getGuidesOnlyForCatalog();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <main className="container py-8 md:py-12">
        <div className="space-y-8 md:space-y-12">
          {/* En-tête */}
          <div className="space-y-4 text-center md:text-left animate-fade-slide-down">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight">
              Catalogue des guides
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0">
              Parcourez mes guides pratiques bases sur des retours d&apos;experience et des bonnes pratiques terrain.
            </p>
          </div>

          <GuidesPageClient guides={guides} />

          {/* Message guides à venir */}
          <div className="rounded-2xl border border-dashed border-border/50 bg-muted/20 p-12 text-center space-y-4 animate-fade-slide-up stagger-12">
            <div className="inline-flex w-20 h-20 rounded-2xl bg-muted items-center justify-center">
              <BookOpen className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Plus de guides en preparation
              </h3>
              <p className="text-muted-foreground">
                D&apos;autres guides sur React, TypeScript, Node.js et bien plus seront ajoutes prochainement. Restez a l&apos;ecoute !
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
