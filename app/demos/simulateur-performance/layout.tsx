import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Simulateur Performance React : useMemo, useCallback, React.memo en Direct',
  description: 'Comparez 4 strategies d\'optimisation React avec des mesures reelles de temps de rendu. Testez React.memo, useMemo et useCallback en live dans votre navigateur.',
  alternates: {
    canonical: '/demos/simulateur-performance',
  },
  openGraph: {
    title: 'Simulateur Performance React | Maxpaths',
    description: 'Comparez React.memo, useMemo, useCallback avec des mesures reelles. Demo interactive en direct.',
    type: 'article',
    images: [{ url: '/api/og?title=Simulateur+Performance+React&category=optimization', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simulateur Performance React | Maxpaths',
    description: 'Comparez 4 strategies d\'optimisation React avec des mesures reelles de temps de rendu.',
    images: ['/api/og?title=Simulateur+Performance+React&category=optimization'],
  },
};

export default function SimulateurPerformanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
