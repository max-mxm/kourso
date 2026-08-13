import { ArticleMetadata } from '@/lib/blog/types';

export const metadata: ArticleMetadata = {
  slug: 'ux-saas-ia-vitamcv',
  title: "L'UX d'un SaaS IA complexe : le cas VitamCV",
  description:
    "Pourquoi un SaaS IA utile ne se limite pas a un chat : architecture produit, validation humaine, preview temps reel et generation de CV avec VitamCV.",
  author: 'Maxime',
  publishedAt: '2026-08-14',
  readingTime: 12,
  category: 'architecture',
  tags: ['SaaS IA', 'UX', 'Next.js', 'AI SDK', 'VitamCV'],
  featured: true,
  tableOfContents: [
    { id: 'introduction', title: 'Introduction', level: 2 },
    { id: 'pas-un-chatbot', title: "Ce n'est pas juste un chatbot", level: 2 },
    { id: 'architecture-produit', title: 'Architecture produit', level: 2 },
    { id: 'phases-conversation', title: 'Les phases conversationnelles', level: 2 },
    { id: 'tool-ui', title: 'Tool UI et validation humaine', level: 2 },
    { id: 'preview-temps-reel', title: 'Preview CV en temps reel', level: 2 },
    { id: 'checklist', title: 'Checklist pour un SaaS IA utile', level: 2 },
    { id: 'conclusion', title: 'Conclusion', level: 2 },
  ],
  seoTitle: "UX SaaS IA : construire un produit utile avec Next.js | maxpaths",
  seoDescription:
    "Retour d'architecture sur VitamCV : chat IA, tools, validation humaine, preview temps reel, scoring et generation de documents dans un SaaS Next.js.",
  keywords: [
    'SaaS IA',
    'AI UX',
    'Next.js',
    'AI SDK',
    'assistant-ui',
    'VitamCV',
    'generateur CV IA',
    'tool calling',
    'Zustand',
    'UX IA',
  ],
  ogTitle: "L'UX d'un SaaS IA complexe : le cas VitamCV",
  ogDescription:
    "Un SaaS IA utile n'est pas un simple chat. Retour concret sur VitamCV : conversation, preview, validation et generation de CV.",
  ogImage:
    '/api/og?title=UX+SaaS+IA+avec+VitamCV&category=architecture',
  twitterCard: 'summary_large_image',
  twitterTitle: "UX SaaS IA : ce que VitamCV m'a appris",
  twitterDescription:
    'Architecture produit, tools IA, validation humaine et preview temps reel dans un SaaS Next.js.',
};
