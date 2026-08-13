import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Simulateur Rendering Next.js : SSR, SSG, ISR en Direct',
  description: 'Visualisez les differences entre SSR, SSG, ISR, CSR et Streaming. Timelines animees et metriques Core Web Vitals en temps reel.',
  alternates: {
    canonical: '/demos/simulateur-rendering',
  },
  openGraph: {
    title: 'Simulateur Rendering Next.js | Maxpaths',
    description: 'Visualisez SSR, SSG, ISR, CSR et Streaming avec des timelines animees et Core Web Vitals en temps reel.',
    type: 'article',
    images: [{ url: '/api/og?title=Simulateur+Rendering+Next.js&category=rendering', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simulateur Rendering Next.js | Maxpaths',
    description: 'Visualisez les differences entre SSR, SSG, ISR, CSR et Streaming en temps reel.',
    images: ['/api/og?title=Simulateur+Rendering+Next.js&category=rendering'],
  },
};

export default function SimulateurRenderingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
