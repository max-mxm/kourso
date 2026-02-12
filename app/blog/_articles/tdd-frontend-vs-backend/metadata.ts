import { ArticleMetadata } from '@/lib/blog/types';

export const metadata: ArticleMetadata = {
  slug: 'tdd-frontend-vs-backend',
  title: "Pourquoi le TDD côté front n'est pas aussi facile que le TDD côté back",
  description:
    'Une analyse approfondie des défis spécifiques du Test-Driven Development en frontend, comparé aux pratiques backend établies.',
  author: 'Maxime',
  publishedAt: '2026-02-12',
  readingTime: 11,
  category: 'testing',
  tags: ['TDD', 'Frontend', 'Testing', 'Best Practices'],
  featured: true,
  tableOfContents: [
    {
      id: 'introduction',
      title: 'Introduction',
      level: 2,
    },
    {
      id: 'le-probleme-visuel',
      title: 'Le problème du rendu visuel',
      level: 2,
    },
    {
      id: 'les-defis-specifiques',
      title: 'Les défis spécifiques au frontend',
      level: 2,
    },
    {
      id: 'etat-asynchrone',
      title: '1. État asynchrone omniprésent',
      level: 3,
    },
    {
      id: 'interactions-utilisateur',
      title: '2. Complexité des interactions utilisateur',
      level: 3,
    },
    {
      id: 'dom-et-css',
      title: '3. Le DOM et le CSS',
      level: 3,
    },
    {
      id: 'mocks-complexes',
      title: '4. Mocks et dépendances externes',
      level: 3,
    },
    {
      id: 'separation-concerns',
      title: '5. Séparation des préoccupations',
      level: 3,
    },
    {
      id: 'pourquoi-continuer',
      title: 'Pourquoi continuer malgré tout ?',
      level: 2,
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      level: 2,
    },
  ],

  // SEO
  seoTitle: 'TDD Frontend vs Backend : Les Défis Cachés | Koursorr Blog',
  seoDescription:
    'Découvrez pourquoi le TDD en frontend présente des défis uniques absents en backend : composants visuels, états asynchrones, et interactions utilisateur.',
};
