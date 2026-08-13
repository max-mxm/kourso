import { ArticleMetadata } from '@/lib/blog/types';

export const metadata: ArticleMetadata = {
  slug: 'redux-vs-context-vs-zustand',
  title: 'Redux vs React Context vs Zustand : quel state management choisir ?',
  description:
    'Comparaison technique de trois approches de gestion d\'etat en React : Redux Toolkit, React Context API, et Zustand. Criteres de choix, exemples de code, et recommandations par taille de projet.',
  author: 'Maxime',
  publishedAt: '2026-02-13',
  readingTime: 14,
  category: 'architecture',
  tags: ['React', 'State Management', 'Redux', 'Zustand', 'Context API'],
  featured: false,
  tableOfContents: [
    { id: 'introduction', title: 'Introduction', level: 2 },
    { id: 'react-context', title: 'React Context API', level: 2 },
    { id: 'context-limites', title: 'Les limites de Context', level: 3 },
    { id: 'redux-toolkit', title: 'Redux Toolkit', level: 2 },
    { id: 'redux-quand', title: 'Quand Redux est pertinent', level: 3 },
    { id: 'zustand', title: 'Zustand', level: 2 },
    { id: 'zustand-avantages', title: 'Pourquoi Zustand seduit', level: 3 },
    { id: 'comparaison', title: 'Comparaison directe', level: 2 },
    { id: 'react-19', title: 'Impact de React 19', level: 2 },
    { id: 'guide-choix', title: 'Guide de choix par projet', level: 2 },
    { id: 'conclusion', title: 'Conclusion', level: 2 },
  ],
  seoTitle: 'Redux vs Context vs Zustand : Comparaison State Management React 2026 | maxpaths Blog',
  seoDescription:
    'Redux Toolkit, React Context ou Zustand ? Comparaison approfondie avec exemples de code, avantages, inconvenients et guide de choix selon la taille de votre projet React.',
  keywords: ['State Management', 'Redux', 'Redux Toolkit', 'RTK', 'React Context', 'Context API', 'Zustand', 'Global State', 'Flux Pattern', 'useContext', 'createSlice', 'configureStore', 'Immer'],

  // Open Graph
  ogTitle: 'Redux vs Context vs Zustand : Quel State Management Choisir ?',
  ogDescription: 'Comparaison technique de trois approches de gestion d\'etat en React. Redux Toolkit, React Context API, Zustand avec exemples de code et guide de choix.',
  ogImage: '/api/og?title=Redux+vs+Context+vs+Zustand&category=architecture',

  // Twitter Card
  twitterCard: 'summary_large_image',
  twitterTitle: 'Redux vs Context vs Zustand : Guide de Choix',
  twitterDescription: 'Comparaison approfondie : Redux Toolkit, React Context, Zustand. Exemples de code et recommandations par taille de projet.',
};
