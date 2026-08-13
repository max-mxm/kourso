import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./styles/demo-animations.css";
import "./styles/animations.css";
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileNavProvider, MobileNavFAB } from "@/components/mobile-nav-fab";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const isVercelDeployment = Boolean(process.env.VERCEL_ENV);

export const metadata: Metadata = {
  metadataBase: new URL('https://www.maxpaths.dev'),

  title: {
    default: 'Maxpaths — Bonnes pratiques frontend par Maxime Morellon',
    template: '%s | Maxpaths'
  },

  description: 'Guides React, Next.js, TypeScript et IA appliquee par Maxime Morellon. Patterns frontend, workflows IA et solutions issues de projets en production.',

  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  manifest: '/site.webmanifest',

  keywords: [
    'React',
    'Next.js',
    'TypeScript',
    'bonnes pratiques',
    'best practices',
    'retours d\'expérience',
    'patterns',
    'solutions',
    'cas d\'usage',
    'développement web',
    'frontend',
    'architecture',
    'code quality',
    'clean code',
    'professionnels',
    'Maxime Morellon',
    'Server Components',
    'App Router'
  ],

  authors: [{ name: 'Maxime Morellon', url: 'https://maximemorellon.dev' }],
  creator: 'Maxime Morellon',

  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.maxpaths.dev',
    siteName: 'Maxpaths',
    title: 'Maxpaths - Bonnes pratiques React & Next.js',
    description: 'Patterns éprouvés, solutions terrain et retours d\'expérience partagés gratuitement',
    images: [
      {
        url: '/api/og?title=Maxpaths+-+Bonnes+Pratiques+React+%26+Next.js&category=fundamentals',
        width: 1200,
        height: 630,
        alt: 'Maxpaths - Bonnes pratiques React & Next.js',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Maxpaths - Bonnes pratiques React & Next.js',
    description: 'Patterns éprouvés et retours d\'expérience par Maxime Morellon',
    images: ['/api/og?title=Maxpaths+-+Bonnes+Pratiques+React+%26+Next.js&category=fundamentals'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#00695C' },
    { media: '(prefers-color-scheme: dark)', color: '#009688' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Inline script to prevent theme flash (FOUC) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('Maxpaths-ui-theme');if(t==='dark'){document.documentElement.classList.add('dark')}else{document.documentElement.classList.add('light')}}catch(e){document.documentElement.classList.add('light')}})()`,
          }}
        />
        {/* Organization Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Maxpaths",
              "url": "https://www.maxpaths.dev",
              "logo": "https://www.maxpaths.dev/maxpaths-logo.svg",
              "description": "Plateforme de partage de bonnes pratiques React, Next.js et IA appliquee basees sur des projets reels",
              "founder": {
                "@type": "Person",
                "name": "Maxime Morellon",
                "url": "https://maximemorellon.dev",
                "sameAs": [
                  "https://www.linkedin.com/in/maxime-morellon-7a9403112"
                ]
              },
              "sameAs": [
                "https://www.linkedin.com/in/maxime-morellon-7a9403112",
                "https://maximemorellon.dev"
              ]
            })
          }}
        />
        {/* Person Schema.org JSON-LD for Maxime Morellon */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Maxime Morellon",
              "jobTitle": "Senior Frontend Engineer",
              "url": "https://maximemorellon.dev",
              "sameAs": [
                "https://www.linkedin.com/in/maxime-morellon-7a9403112",
                "https://maximemorellon.dev"
              ],
              "knowsAbout": [
                "React",
                "Next.js",
                "TypeScript",
                "Frontend Architecture",
                "Web Performance",
                "Applied AI",
                "LLM Workflows",
                "RAG",
                "AI Agents"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isVercelDeployment && <Analytics />}
        <ThemeProvider defaultTheme="light" storageKey="Maxpaths-ui-theme">
          <MobileNavProvider>
            <Header />
            {children}
            <Footer />
            <MobileNavFAB />
          </MobileNavProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
