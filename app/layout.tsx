import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./styles/demo-animations.css";
import "./styles/animations.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://maxpaths.com'),

  title: {
    default: 'Maxpaths — Bonnes pratiques frontend par Maxime Morellon',
    template: '%s | Maxpaths'
  },

  description: 'Guides React et Next.js, articles techniques et retours d\'experience par Maxime Morellon. Patterns eprouves et solutions issues de 8 ans de developpement frontend.',

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

  authors: [{ name: 'Maxime Morellon', url: 'https://www.maxime-morellon.dev' }],
  creator: 'Maxime Morellon',

  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://maxpaths.com',
    siteName: 'Maxpaths',
    title: 'Maxpaths - Bonnes pratiques React & Next.js',
    description: 'Patterns éprouvés, solutions terrain et retours d\'expérience partagés gratuitement',
    images: [
      {
        url: '/og-image.png',
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
    images: ['/og-image.png'],
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
              "url": "https://maxpaths.com",
              "logo": "https://maxpaths.com/logo.png",
              "description": "Plateforme de partage de bonnes pratiques React et Next.js basées sur des projets réels",
              "founder": {
                "@type": "Person",
                "name": "Maxime Morellon",
                "url": "https://www.maxime-morellon.dev",
                "sameAs": [
                  "https://www.linkedin.com/in/maxime-morellon-7a9403112"
                ]
              },
              "sameAs": [
                "https://www.linkedin.com/in/maxime-morellon-7a9403112",
                "https://www.maxime-morellon.dev"
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
              "jobTitle": "Senior Frontend Developer",
              "url": "https://www.maxime-morellon.dev",
              "sameAs": [
                "https://www.linkedin.com/in/maxime-morellon-7a9403112"
              ],
              "knowsAbout": [
                "React",
                "Next.js",
                "TypeScript",
                "Frontend Architecture",
                "Web Performance"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="light" storageKey="Maxpaths-ui-theme">
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
