# Bonnes Pratiques - Partage de Retours d'Expérience

Standards de qualité et recommandations pour documenter efficacement vos bonnes pratiques et REX sur Koursorr.

---

## Principes Fondamentaux

### 1. Authenticité et Terrain

**✅ FAIRE :**
- Partager des expériences réelles et testées
- Utiliser un langage clair, direct, sans jargon marketing
- Utiliser les icônes Lucide React (via `iconName`)
- Structurer du problème à la solution
- Inclure apprentissages et pièges évités
- Citer les sources et créditer les contributeurs
- Valider avec l'équipe si c'est une REX professionnelle

**❌ NE JAMAIS FAIRE :**
- Théoriser sans exemples terrain réels
- Utiliser des émojis classiques (🎯, 📚, ✅, ❌) - aspect non professionnel
- Hard-coder les couleurs (utiliser les variables CSS)
- Créer de nouvelles catégories sans justification
- Mélanger contenu pédagogique avec REX
- Oublier les pièges et trade-offs

### 2. Cohérence

**Tous les guides doivent suivre :**
- Les 5 catégories strictes (fundamentals, rendering, optimization, best-practices, advanced)
- Le design system Koursorr (couleurs, typographie)
- La structure de fichiers recommandée
- Les composants standardisés (ConceptCard, CodeBlock, etc.)

---

## Structure du Contenu

### Organisation des Sections

**Recommandations par type :**

| Type | Sections | Durée estimée | Caractéristiques |
|------|----------|---------------|------------------|
| Pratique Basique | 5-8 | 15-30min | Problème, solution, résultats |
| Guide Complet | 10-15 | 45min-1h30 | Contexte, alternatives, REX détaillée |
| Cas Complexe | 15-20 | 1h30-2h30 | Architecture, décisions, trade-offs, apprentissages |

**Structure type d'une section :**

1. **Contexte Réel** (1-2 paragraphes)
   - Problème rencontré en production/projet réel
   - Enjeux et défis associés

2. **Solution Testée** (2-3 ConceptCards)
   - Approche utilisée
   - Implémentation technique
   - Résultats mesurables

3. **Exemples de code** (2-4 CodeBlocks)
   - Code réel utilisé en production
   - Highlighting des lignes importantes
   - Comparaisons avant/après si pertinent

4. **Comparaisons** (optionnel, ComparisonTable)
   - Alternatives testées
   - Avantages/inconvénients observés
   - Cas d'usage réels

5. **Apprentissages** (section finale)
   - Ce qui a marché
   - Pièges évités
   - Trade-offs et considérations

### Progression de la REX

**Du problème à la solution affinée :**
```
Section 1 : Contexte - Le problème rencontré
Section 2-3 : Première approche - Essais et erreurs
Section 4-7 : Solution affinée - Ce qui a marché
Section 8-10 : Optimisations et pièges évités
Section 11-13 : Trade-offs et considérations
Section 14-15 : Apprentissages et résultats mesurés
```

---

## Standards de Code

### Exemples de Code Terrain

**✅ Bon exemple (REX) :**
```tsx
// Pattern utilisé en production : Component avec TypeScript
// Contexte : Migration de 50+ boutons disparates vers un système cohérent
interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Button({ onClick, children, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg ${variant === 'primary' ? 'bg-primary text-white' : 'bg-secondary'}`}
    >
      {children}
    </button>
  );
}

// Usage réel
function App() {
  return <Button onClick={() => console.log('clicked')}>Click me</Button>;
}
```

**Caractéristiques d'une bonne REX :**
- ✅ Contexte réel expliqué (migration de 50+ boutons)
- ✅ Code testé en production
- ✅ TypeScript avec types explicites
- ✅ Exemple d'utilisation réel
- ✅ Respect des conventions

**❌ Mauvais exemple (théorique) :**
```tsx
// Bouton
function Button(props) {
  return <button onClick={props.onClick}>{props.children}</button>
}
```

**Problèmes :**
- ❌ Pas de contexte réel
- ❌ Pas de types
- ❌ Trop simpliste, pas utilisable en production
- ❌ Pas d'apprentissages partagés

### Highlighting de Code

```tsx
<CodeBlock
  code={`...`}
  language="tsx"
  filename="components/button.tsx"
  highlightLines={[5, 10, 15]} // Lignes qui ont résolu le problème
  category="fundamentals"
/>
```

**Highlighter les lignes clés :**
- Changements qui ont résolu le problème
- Points d'attention découverts (sécurité, performance)
- Différences par rapport à l'approche initiale
- Solutions éprouvées en production

---

## Partage d'Expérience Authentique

### Éléments d'une REX Crédible

**Toujours inclure :**
1. **Contexte réel** - Décrivez le projet, l'équipe, les contraintes
2. **Problème concret** - Quel était le vrai problème rencontré ?
3. **Essais/erreurs** - Qu'avez-vous tenté en premier ? Pourquoi ça n'a pas marché ?
4. **Solution finale** - Ce qui a finalement fonctionné
5. **Résultats mesurables** - Métriques, impact réel (temps, performance, bugs)
6. **Apprentissages** - Ce que vous feriez différemment maintenant
7. **Trade-offs** - Quels compromis avez-vous dû faire ?

### Structure Recommandée pour une REX

```markdown
## [Titre du Problème]

**Contexte :** Application e-commerce, 50k utilisateurs/jour, équipe de 4 devs

**Problème :** Temps de chargement de 8s sur la page produit, abandon 40%

**Tentatives :**
1. Optimisation des images → gain 1s seulement
2. Code splitting basique → pas d'impact significatif
3. Cache Redis → complexité accrue, maintenance difficile

**Solution :**
Migration vers Next.js App Router + Server Components
- 70% du code côté serveur
- Streaming HTML progressif
- ISR pour pages produits

**Résultats :**
- Temps chargement : 8s → 1.2s (-85%)
- Abandon : 40% → 12% (-70%)
- Core Web Vitals : tous verts

**Apprentissages :**
- Server Components éliminent vraiment les waterfalls
- ISR + on-demand revalidation = sweet spot pour l'e-commerce
- Migration progressive possible (1 page à la fois)

**Pièges évités :**
- Ne pas migrer tout d'un coup
- Client Components only when needed (forms, interactions)
- Monitoring indispensable pendant la migration
```

### Éviter le "Tutoriel Théorique"

**❌ Approche théorique :**
> Next.js offre le Server-Side Rendering qui améliore les performances. Voici comment l'utiliser...

**✅ Approche REX :**
> Notre application Vercel avait un LCP de 4.2s. Nous avons migré 15 pages vers App Router. Résultat : LCP à 1.1s. Le vrai gain vient du streaming HTML et de l'élimination des requêtes waterfall client-side.

### Métriques et Résultats Mesurables

**Toujours quantifier l'impact :**

| Type de métrique | Exemples | Format recommandé |
|------------------|----------|-------------------|
| Performance | Temps de chargement, LCP, FCP | Avant → Après (-X%) |
| Business | Taux de conversion, abandon | Avant → Après (-X%) |
| Code | Lignes de code, bundle size | Avant → Après (-X%) |
| Équipe | Temps de dev, bugs | Avant → Après (-X%) |
| Utilisateur | NPS, satisfaction | Avant → Après (+X points) |

**Exemples concrets :**

✅ **Bon (mesurable) :**
- Bundle size : 450kb → 180kb (-60%)
- Temps de build : 8min → 2min (-75%)
- Bugs production : 15/mois → 3/mois (-80%)
- Vélocité sprint : 25 points → 40 points (+60%)

❌ **Mauvais (vague) :**
- "Bien plus rapide"
- "Beaucoup moins de bugs"
- "L'équipe est plus productive"

### Trade-offs et Décisions

**Aucune solution n'est parfaite. Documenter les compromis :**

**Structure recommandée :**
```markdown
### Trade-offs de cette approche

**Ce que nous avons gagné :**
- Performance : LCP -60%
- Simplicité du code : -200 lignes

**Ce que nous avons perdu/sacrifié :**
- Compatibilité IE11 (acceptable pour notre cible B2B)
- Temps de build +30s (négligeable en CI/CD)

**Alternatives considérées :**
1. **Option A** : Code splitting manuel
   - ✅ Plus de contrôle
   - ❌ Maintenance complexe
   - ❌ Erreurs fréquentes

2. **Option B** : Server Components (choisi)
   - ✅ Automatique
   - ✅ Maintenable
   - ❌ Migration nécessaire

**Pourquoi ce choix :**
Gain de maintenance > coût de migration pour notre équipe de 4 devs
```

**Exemples de trade-offs honnêtes :**

✅ **Bon (honnête) :**
> Nous avons choisi Zustand au lieu de Redux. Avantage : -70% de boilerplate. Inconvénient : DevTools moins riches. Pour notre app, la simplicité l'emporte sur les outils de debug avancés dont nous n'avions pas besoin.

❌ **Mauvais (biaisé) :**
> Zustand est bien meilleur que Redux dans tous les cas.

---

## Design et Accessibilité

### Couleurs

**Variables CSS obligatoires :**
```css
/* ✅ FAIRE */
.element {
  background: hsl(var(--primary));
  color: hsl(var(--foreground));
}

/* ❌ NE PAS FAIRE */
.element {
  background: #009688; /* Hard-coded */
  color: #000000;
}
```

**Catégories de guides :**

| Catégorie | Gradient | Variables |
|-----------|----------|-----------|
| fundamentals | `from-primary to-brand-secondary` | Teal → Violet |
| rendering | `from-blue-500 to-cyan-500` | Bleu → Cyan |
| optimization | `from-orange-500 to-amber-500` | Orange → Ambre |
| best-practices | `from-purple-500 to-pink-500` | Violet → Rose |
| advanced | `from-red-500 to-rose-500` | Rouge → Rose |

### Contraste et Accessibilité

**Règles WCAG 2.2 Level AA :**
- Ratio minimum texte normal : **4.5:1**
- Ratio minimum texte large : **3:1**
- Focus visible obligatoire
- Navigation clavier complète

**Tester :**
```bash
# Lighthouse audit
npm run build
npx lighthouse http://localhost:3000/cours/[slug] --view
```

### Mode Dark/Light

**Toujours tester les deux modes :**
- Variables CSS gèrent automatiquement les couleurs
- Vérifier le contraste en dark mode
- Tester les gradients et bordures
- Valider les images/illustrations

---

## Icônes et Visuels

### Icônes Lucide React

**✅ Utiliser exclusivement Lucide React :**
```tsx
// Dans CourseLayout
{
  iconName: 'Rocket', // ✅ Nom de l'icône Lucide
  // ...
}
```

**Icônes recommandées par catégorie :**

| Catégorie | Icônes suggérées |
|-----------|------------------|
| Fundamentals | Rocket, BookOpen, Lightbulb |
| Rendering | Server, Monitor, Layers |
| Optimization | Zap, Gauge, Database |
| Best-practices | Shield, Code, CheckCircle |
| Advanced | Sparkles, Brain, Target |

[Liste complète : lucide.dev](https://lucide.dev/icons/)

### Visuels Personnalisés

**Si besoin d'illustrations :**
- Utiliser SVG (pas de PNG/JPG pour les icônes)
- Respecter la palette de couleurs
- Assurer l'accessibilité (alt text)
- Responsive (taille adaptative)

**ConceptCard avec visual :**
```tsx
<ConceptCard
  title="Architecture"
  description="Vue d'ensemble..."
  category="best-practices"
  visual={
    <svg>...</svg> // SVG inline ou composant
  }
/>
```

---

## Contenu et Langage

### Ton et Style Recommandé

**Caractéristiques :**
- **Authentique** : Parlez de vos vraies expériences, pas de théorie
- **Honnête** : N'hésitez pas à dire ce qui n'a pas marché
- **Clair** : Phrases courtes, vocabulaire précis, pas de jargon
- **Concret** : Expliquer le "pourquoi" ET le "comment", avec code réel
- **Actuel** : Référencer les versions réelles utilisées

**Exemples :**

✅ **Bon (REX) :**
> En production, nous avons migré vers le hook `use()` de React 19. Le problème : nos data fetches étaient dispersés dans 15 useEffect différents. Solution : centraliser avec `use()`. Résultat : -40% de code, zéro race conditions. Leçon : suspense et use() résolvent vraiment les race conditions.

❌ **Mauvais :**
> React 19 a un hook `use()` qui suspend le composant jusqu'à résolution de la promise, simplifiant le data fetching.

### Terminologie

**Utiliser les termes officiels :**
- Server Components (pas "composants serveur")
- Client Components (pas "composants client")
- Hook (pas "crochet")
- Props (pas "propriétés")
- State (ou "état" en français)

### Citations et Références

**Toujours citer les sources :**
```markdown
Selon la documentation officielle React 19 :
> "The React Compiler automatically optimizes your components..."

Source : [React v19 Documentation](https://react.dev/blog/2024/12/05/react-19)
```

**Créditer les contributeurs et inspirations :**
```markdown
**Crédits :**
Cette approche a été développée par l'équipe frontend (Marie, Alex, Thomas).
Inspiré par [article/projet externe] et adapté à notre contexte.

**Remerciements :**
- @marie pour l'implémentation initiale
- @alex pour l'optimisation du bundle
- Communauté React France pour les retours
```

---

## Tests et Validation

### Checklist Pré-Publication

**Contenu :**
- [ ] Toutes les sections basées sur expérience réelle
- [ ] Les exemples de code sont testés en production
- [ ] Pas d'émojis classiques
- [ ] Pas de hard-coding de couleurs
- [ ] Sources citées et contributeurs crédités
- [ ] Apprentissages et pièges documentés

**Technique :**
- [ ] Navigation fonctionne (scroll spy, sidebar)
- [ ] Progress bar s'affiche correctement
- [ ] Mode dark/light OK
- [ ] Responsive (mobile/tablette/desktop)
- [ ] Pas d'erreurs console
- [ ] Build production réussit

**Accessibilité :**
- [ ] Navigation clavier complète
- [ ] Focus visible
- [ ] Contraste suffisant (4.5:1)
- [ ] ARIA labels corrects si besoin

**Performance :**
- [ ] Lighthouse score > 90
- [ ] LCP < 2.5s
- [ ] INP < 200ms
- [ ] CLS < 0.1

### Commandes de Test

```bash
# Dev server
npm run dev

# Build production
npm run build

# Lint
npm run lint

# Type check
npx tsc --noEmit

# Lighthouse
npx lighthouse http://localhost:3000/cours/[slug] --view
```

---

## Erreurs Courantes à Éviter

### 1. Émojis Classiques
❌ **ERREUR :** Utiliser 🎯, 📚, ✅, ❌ dans le contenu (aspect non professionnel)
✅ **CORRECTION :** Utiliser icônes Lucide React pour une interface professionnelle

### 2. Hard-coding Couleurs
❌ **ERREUR :** `color: #009688`
✅ **CORRECTION :** `color: hsl(var(--primary))`

### 3. Catégories Personnalisées
❌ **ERREUR :** Créer `category="security"`
✅ **CORRECTION :** Utiliser `category="best-practices"`

### 4. Navigation Non Mise à Jour
❌ **ERREUR :** Créer un guide sans l'ajouter à `app/page.tsx` et `app/cours/page.tsx`
✅ **CORRECTION :** Suivre le guide [ajouter-un-cours.md](./ajouter-un-cours.md)

### 5. Code Non Testé
❌ **ERREUR :** Copier du code trouvé en ligne sans le tester
✅ **CORRECTION :** Toujours exécuter et valider les exemples

### 6. Manque de Contexte
❌ **ERREUR :** Montrer du code sans expliquer le problème réel qu'il a résolu
✅ **CORRECTION :** Toujours expliquer le contexte terrain, le problème, puis la solution

### 7. Oubli du Responsive
❌ **ERREUR :** Tester uniquement sur desktop
✅ **CORRECTION :** Tester mobile, tablette, desktop

### 8. Ne Pas Documenter les Échecs
❌ **ERREUR :** Ne partager que les succès, cacher les erreurs et tentatives ratées
✅ **CORRECTION :** Documenter honnêtement ce qui n'a pas marché et pourquoi
```markdown
**Ce qui n'a PAS marché :**
1. Tentative 1 : Optimisation manuelle → Trop complexe, abandonné
2. Tentative 2 : Library X → Incompatible avec notre stack
3. Solution finale : Approche Y → Simple et efficace
```

### 9. Manque de Métriques
❌ **ERREUR :** "C'est plus rapide maintenant"
✅ **CORRECTION :** "Temps de chargement : 4.2s → 1.1s (-74%)"

---

## Ressources et Outils

### Documentation Interne
- [ajouter-un-cours.md](./ajouter-un-cours.md) - Guide complet
- [cours-structure.md](../architecture/cours-structure.md) - Architecture
- [categories.md](../design-system/categories.md) - Catégories et couleurs

### Outils Externes
- [Lucide Icons](https://lucide.dev/) - Icônes
- [Tailwind CSS](https://tailwindcss.com/) - Utility classes
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [React DevTools](https://react.dev/learn/react-developer-tools) - Debugging

### Références Officielles
- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## Exemples de Référence

### Guides Bien Structurés

**Next.js Demo** ([`app/cours/nextjs-demo/`](../../app/cours/nextjs-demo/))
- ✅ 21 sections organisées en 5 catégories
- ✅ Bon usage des composants
- ✅ Navigation complète

**React 19 Advanced** ([`app/cours/react-19-advanced/`](../../app/cours/react-19-advanced/))
- ✅ Contenu technique approfondi
- ✅ Exemples comparatifs React 18 vs 19
- ✅ Documentation basée sur l'expérience

---

## Conclusion

**L'authenticité avant la perfection :**
- Mieux vaut un retour d'expérience honnête et imparfait que théorie parfaite
- Partagez vos vraies histoires, succès ET échecs
- Les apprentissages les plus précieux viennent des erreurs
- La communauté apprend davantage de vos REX réelles

**Contribuer au savoir communautaire :**
- Partagez vos bonnes pratiques et leçons apprises
- Aidez d'autres développeurs à éviter vos erreurs
- Itérez et améliorer à base de retours
- Créditer les idées et contribueurs

---

**Merci de partager vos savoirs et expériences !** | Dernière mise à jour : Février 2026
