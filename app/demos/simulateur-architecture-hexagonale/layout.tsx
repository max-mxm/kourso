import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Simulateur Architecture Hexagonale : Ports & Adapters en Direct',
  description:
    'Testez le swap d adapters en live sur un use case metier. Visualisez timeline, resultat et impact sur la testabilite.',
  openGraph: {
    title: 'Simulateur Architecture Hexagonale | Maxpaths',
    description:
      'Changez les adapters sans toucher au domaine. Demo interactive Ports & Adapters.',
    type: 'article',
    images: [
      {
        url: '/api/og?title=Simulateur+Architecture+Hexagonale&category=best-practices',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simulateur Architecture Hexagonale | Maxpaths',
    description:
      'Demo interactive: remplacez les adapters et observez un domaine stable.',
    images: ['/api/og?title=Simulateur+Architecture+Hexagonale&category=best-practices'],
  },
};

export default function SimulateurArchitectureHexagonaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
