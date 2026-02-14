# 🚀 maxpaths - Partage de Bonnes Pratiques Web

Un blog personnel où je partage mes retours d'expérience (REX), bonnes pratiques terrain, cours, vidéos et animations pour Next.js, React et les technologies web modernes.

![Next.js 16](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)
![React 19](https://img.shields.io/badge/React-19.2.3-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=flat-square&logo=tailwindcss)

## ✨ Fonctionnalités

- 📚 **Guides pratiques** : Sections détaillées avec exemples issus de projets réels et démos en temps réel
- ⚡ **Démos live** : Testez les concepts directement dans le navigateur (SSR, SSG, ISR, Client Components)
- 🎨 **Design moderne** : Interface élégante avec thème sombre/clair automatique
- 📊 **Suivi de progression** : Barre de progression et navigation contextuelle avec scroll spy
- 🔥 **Performance optimale** : Next.js 16 avec Turbopack et App Router
- 🎯 **Responsive** : Design adapté mobile/tablet/desktop

## 🎓 Guides de Terrain

### Guide Next.js 16
Un guide complet regroupant les bonnes pratiques et retours d'expérience sur les modes de rendu modernes avec 6 sections :

1. **Introduction** : Découverte de Next.js et de ses avantages
2. **SSR** : Server-Side Rendering avec démo en temps réel
3. **SSG** : Static Site Generation pour la performance maximale
4. **ISR** : Incremental Static Regeneration pour le meilleur des deux mondes
5. **Client Components** : Gestion de l'interactivité côté client
6. **Patterns avancés** : Comparaison et stratégies hybrides

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+ installé
- npm ou pnpm

### Installation

```bash
# Cloner le repository
git clone <votre-repo>
cd maxpaths

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🛠️ Stack technique

### Frontend
- **Framework** : Next.js 16.1.6 (App Router)
- **UI Library** : React 19.2.3
- **Language** : TypeScript 5.x
- **Styling** : Tailwind CSS v4
- **Components** : Shadcn UI (prêt à l'emploi)

### Design System
- **Palette** : Teal (#009688) + Violet (#7c3aed)
- **Thème** : Mode sombre/clair avec `next-themes`
- **Typographie** : Geist Sans + Geist Mono
- **Animations** : Transitions fluides avec keyframes CSS

## 📁 Structure du projet

```
maxpaths/
├── app/
│   ├── cours/
│   │   ├── nextjs-demo/
│   │   │   ├── _components/       # Composants spécifiques au cours
│   │   │   └── page.tsx           # Page du cours Next.js
│   │   └── page.tsx               # Liste des cours
│   ├── about/
│   │   └── page.tsx               # Page À propos
│   ├── layout.tsx                 # Layout racine
│   ├── page.tsx                   # Page d'accueil
│   ├── globals.css                # Styles globaux
│   └── styles/                    # Styles thématiques
├── components/
│   ├── course/
│   │   ├── course-layout.tsx      # Layout avec scroll spy
│   │   ├── code-block.tsx         # Block de code stylisé
│   │   ├── concept-card.tsx       # Carte de concept
│   │   ├── comparison-table.tsx   # Tableau comparatif
│   │   └── interactive-demo.tsx   # Démo interactive
│   ├── theme-provider.tsx         # Provider de thème
│   └── theme-toggle.tsx           # Toggle dark/light
├── lib/
│   └── utils.ts                   # Fonctions utilitaires
└── docs/                          # Documentation complète
    ├── architecture/
    ├── design-system/
    └── guides/
```

## 🎨 Design System

### Couleurs principales

**Light Mode :**
- Primary : `rgb(0, 150, 136)` - Teal
- Secondary : `rgb(124, 58, 237)` - Violet
- Background : `rgb(255, 255, 255)`
- Foreground : `rgb(10, 10, 10)`

**Dark Mode :**
- Primary : `rgb(0, 150, 136)` - Teal (identique)
- Secondary : `rgb(139, 92, 246)` - Violet plus clair
- Background : `rgb(10, 10, 10)`
- Foreground : `rgb(250, 250, 250)`

### Gradients des catégories

- **Fondamentaux** : Teal → Violet
- **Rendering** : Bleu → Cyan
- **Optimization** : Orange → Ambre
- **Best Practices** : Violet → Rose
- **Advanced** : Rouge → Rose

## 📝 Scripts disponibles

```bash
npm run dev      # Lancer le serveur de développement
npm run build    # Build de production
npm run start    # Lancer le build de production
npm run lint     # Linter ESLint
```

## 📚 Documentation

Documentation complète disponible dans `/docs` :

- [Architecture des cours](docs/architecture/cours-structure.md)
- [Guide des couleurs](docs/design-system/colors.md)
- [Typographie](docs/design-system/typography.md)
- [Workflow Impeccable](docs/guides/impeccable-workflow.md)

## 📄 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) pour le framework
- [Tailwind CSS](https://tailwindcss.com/) pour le styling
- [Shadcn UI](https://ui.shadcn.com/) pour les composants
- [Vercel](https://vercel.com/) pour l'hébergement

---

Un blog pour partager mon expérience frontend | Retours d'expérience terrain et bonnes pratiques
