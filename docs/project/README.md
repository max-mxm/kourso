# Projet - Koursorr

Contexte historique, stack technique, et vision du projet.

---

## 📄 Fichiers

### [import-summary.md](./import-summary.md)
Résumé complet de l'import depuis Scanorr.

**Contenu** :
- Ce qui a été importé (design system, architecture, guides)
- État actuel du projet
- Structure des fichiers créés
- Prochaines étapes suggérées
- Commandes utiles

**Quand consulter** :
- Onboarding sur le projet
- Comprendre l'origine du code
- Voir l'état actuel des fonctionnalités
- Questions sur l'historique

---

## 🎯 Vision du Projet

**Koursorr** est une plateforme simple pour partager et documenter les bonnes pratiques et retours d'expérience (REX).

### Objectifs
- **Simplicité** - Facile à contribuer, facile à consulter
- **Authenticité** - Bonnes pratiques réelles issues du terrain
- **Accessibilité** - Guides accessibles à tous, partout
- **Open Source** - Code ouvert et contributif

### Valeurs
- Partage de savoirs pratiques avant tout
- Retours d'expérience réels et testés
- Performance et accessibilité
- Communauté bienveillante

---

## 🛠️ Stack Technique

### Frontend
- **Next.js 16** - Framework React avec App Router
- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Utility-first CSS
- **Shadcn UI** - Composants UI réutilisables

### Styling
- **next-themes** - Gestion du thème dark/light
- **clsx** + **tailwind-merge** - Combinaison de classes CSS
- Design system custom (teal/violet)

### Tooling
- **ESLint** - Linting
- **TypeScript** - Type checking
- **Git** - Versioning

### Infrastructure (Futur)
- **Vercel** - Hébergement et déploiement
- **Supabase** ou **PlanetScale** - Base de données (si nécessaire)
- **Vercel Analytics** - Analytics (optionnel)

---

## 📊 État Actuel

### ✅ Complété
- Setup Next.js avec App Router
- Design system importé depuis Scanorr
- Système de thème dark/light opérationnel
- CourseLayout avec navigation et scroll spy
- Documentation complète organisée
- Composants de base (ThemeProvider, ThemeToggle)

### 🔨 En Cours
- Création du premier cours complet
- Composants de contenu (CodeBlock, ExplanationCard)
- Page de liste des cours

### 📋 À Faire
- Composants Shadcn UI supplémentaires
- Tests E2E
- Déploiement Vercel
- SEO et métadonnées
- Analytics (optionnel)
- Système de progression utilisateur (optionnel)

---

## 🗓️ Roadmap

### Phase 1 : MVP (Février 2026)
- [ ] Premier guide complet (Next.js REX)
- [ ] Page d'accueil avec liste des guides
- [ ] Responsive design complet
- [ ] Déploiement initial

### Phase 2 : Enrichissement (Mars 2026)
- [ ] 3-5 guides supplémentaires partagés par la communauté
- [ ] Composants interactifs (Quiz, Playground)
- [ ] Système de recherche
- [ ] Amélioration SEO

### Phase 3 : Communauté (Avril 2026)
- [ ] Contributions externes
- [ ] Système de feedback
- [ ] Analytics et métriques
- [ ] Documentation contributeurs

### Phase 4 : Scaling (Mai 2026+)
- [ ] Backend avec authentification (optionnel)
- [ ] Progression utilisateur (optionnel)
- [ ] Certificats (optionnel)
- [ ] API publique (optionnel)

---

## 📚 Historique

### Février 2026
- **12/02/2026** : Import du design system et architecture depuis Scanorr
- **12/02/2026** : Organisation de la documentation dans `docs/`
- **12/02/2026** : Création du CLAUDE.md avec référencement contextuel

### Origine
Le projet est basé sur le design system et l'architecture de **Scanorr**, un projet de démonstration Next.js. Les éléments suivants ont été importés et adaptés :
- Design system (couleurs teal/violet)
- Système de thème dark/light
- Architecture des cours (CourseLayout)
- Workflow Impeccable

---

## 🤝 Contribuer

### Comment Contribuer
1. Fork le projet
2. Créer une branche (`git checkout -b feature/ma-feature`)
3. Commit les changements (`git commit -m 'Ajout de ma feature'`)
4. Push vers la branche (`git push origin feature/ma-feature`)
5. Ouvrir une Pull Request

### Guidelines
- Lire la documentation dans `docs/`
- Respecter le design system
- Ajouter des tests si applicable
- Mettre à jour la documentation

---

## 📞 Contact

- **Issues** : GitHub Issues
- **Discussions** : GitHub Discussions
- **Email** : (à définir)

---

## 🔗 Voir Aussi

- [Architecture](../architecture/) - Structure technique
- [Design System](../design-system/) - Guidelines visuelles
- [Guides](../guides/) - Workflows pratiques

---

Dernière mise à jour : Février 2026
