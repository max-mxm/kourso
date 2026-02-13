export function BlogPreviewSkeleton() {
  return (
    <section className="py-24 bg-violet-500/5">
      <div className="container">
        {/* Header */}
        <div className="mb-12 space-y-2">
          <div className="h-4 w-28 rounded bg-muted animate-pulse" />
          <div className="h-10 w-64 rounded bg-muted animate-pulse" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured placeholder */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border-2 border-border/50 bg-card p-8 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-5 w-24 rounded-full bg-muted animate-pulse" />
                <div className="h-4 w-16 rounded bg-muted animate-pulse" />
              </div>
              <div className="h-8 w-3/4 rounded bg-muted animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-muted animate-pulse" />
                <div className="h-4 w-5/6 rounded bg-muted animate-pulse" />
                <div className="h-4 w-2/3 rounded bg-muted animate-pulse" />
              </div>
              <div className="flex gap-2 pt-2">
                <div className="h-6 w-16 rounded-full bg-muted animate-pulse" />
                <div className="h-6 w-20 rounded-full bg-muted animate-pulse" />
                <div className="h-6 w-14 rounded-full bg-muted animate-pulse" />
              </div>
            </div>
          </div>

          {/* Recent articles placeholders */}
          <div className="lg:col-span-5 space-y-6">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-border/50 bg-card p-6 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="h-5 w-24 rounded-full bg-muted animate-pulse" />
                  <div className="h-4 w-16 rounded bg-muted animate-pulse" />
                </div>
                <div className="h-6 w-3/4 rounded bg-muted animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
