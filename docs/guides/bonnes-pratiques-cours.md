# Bonnes Pratiques - Création de Cours

Standards de qualité et recommandations pour créer des cours professionnels sur Kourso.

---

## Principes Fondamentaux

### 1. Professionnalisme

**✅ FAIRE :**
- Utiliser un langage clair et précis
- Utiliser les icônes Lucide React (via `iconName`)
- Structurer le contenu de manière logique
- Fournir des exemples concrets et testables
- Citer les sources officielles

**❌ NE JAMAIS FAIRE :**
- Utiliser des émojis classiques (🎯, 📚, ✅, ❌) - aspect non professionnel
- Hard-coder les couleurs (utiliser les variables CSS)
- Créer de nouvelles catégories sans justification
- Mélanger plusieurs styles de contenu
- Négliger l'accessibilité

### 2. Cohérence

**Tous les cours doivent suivre :**
- Les 5 catégories strictes (fundamentals, rendering, optimization, best-practices, advanced)
- Le design system Kourso (couleurs, typographie)
- La structure de fichiers recommandée
- Les composants standardisés (ConceptCard, CodeBlock, etc.)

---

## Structure du Contenu

### Organisation des Sections

**Recommandations par niveau :**

| Niveau | Sections | Durée estimée | Caractéristiques |
|--------|----------|---------------|------------------|
| Débutant | 8-10 | 1-2h | Introduction, concepts de base, exemples simples |
| Intermédiaire | 12-15 | 2-3h | Concepts avancés, comparaisons, patterns courants |
| Avancé | 15-20 | 3-5h | Techniques expertes, optimisations, architecture |

**Structure type d'une section :**

1. **Introduction** (1-2 paragraphes)
   - Contexte et problématique
   - Ce qui sera appris

2. **Concepts clés** (2-3 ConceptCards)
   - Explications visuelles
   - Points importants
   - Exemples concrets

3. **Exemples de code** (2-4 CodeBlocks)
   - Code commenté
   - Highlighting des lignes importantes
   - Comparaisons avant/après si pertinent

4. **Comparaisons** (optionnel, ComparisonTable)
   - Alternatives
   - Avantages/inconvénients
   - Cas d'usage

5. **Best Practices** (section finale)
   - Recommandations
   - Pièges à éviter
   - Ressources supplémentaires

### Progression Pédagogique

**Du simple au complexe :**
```
Section 1 : Introduction + Concepts de base
Section 2-3 : Fondamentaux détaillés
Section 4-7 : Implémentation et patterns
Section 8-10 : Optimisations
Section 11-13 : Bonnes pratiques
Section 14-15 : Techniques avancées
```

---

## Standards de Code

### Exemples de Code

**✅ Bon exemple :**
```tsx
// Pattern : Component avec TypeScript
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

// Usage
function App() {
  return <Button onClick={() => console.log('clicked')}>Click me</Button>;
}
```

**Caractéristiques :**
- ✅ TypeScript avec types explicites
- ✅ Commentaire descriptif
- ✅ Code complet et testable
- ✅ Exemple d'utilisation inclus
- ✅ Respect des conventions

**❌ Mauvais exemple :**
```tsx
// Bouton
function Button(props) {
  return <button onClick={props.onClick}>{props.children}</button>
}
```

**Problèmes :**
- ❌ Pas de types
- ❌ Trop simpliste
- ❌ Pas d'exemple d'utilisation
- ❌ Pas de style/variantes

### Highlighting de Code

```tsx
<CodeBlock
  code={`...`}
  language="tsx"
  filename="components/button.tsx"
  highlightLines={[5, 10, 15]} // Lignes importantes
  category="fundamentals"
/>
```

**Highlighter les lignes :**
- Nouvelles APIs / fonctionnalités
- Points d'attention (sécurité, performance)
- Différences par rapport à une version précédente
- Patterns recommandés

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

**Catégories de cours :**

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

### Ton et Style

**Caractéristiques :**
- **Professionnel** : Pas de familiarité excessive
- **Clair** : Phrases courtes, vocabulaire précis
- **Pédagogique** : Expliquer le "pourquoi", pas seulement le "comment"
- **Actuel** : Référencer les versions récentes (2026)

**Exemples :**

✅ **Bon :**
> React 19 introduit le hook `use()` qui permet de lire des promises directement dans le render. Contrairement à `useEffect`, `use()` suspend le composant jusqu'à la résolution de la promise, simplifiant drastiquement le code de data fetching.

❌ **Mauvais :**
> Salut ! Alors React 19 c'est trop cool, y'a un nouveau hook `use()` qui déchire tout 🚀🔥 Tu vas adorer !

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

---

## Tests et Validation

### Checklist Pré-Publication

**Contenu :**
- [ ] Toutes les sections sont complètes
- [ ] Les exemples de code sont testés
- [ ] Pas d'émojis classiques
- [ ] Pas de hard-coding de couleurs
- [ ] Sources citées

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
❌ **ERREUR :** Utiliser 🎯, 📚, ✅, ❌ dans le contenu
✅ **CORRECTION :** Utiliser icônes Lucide React

### 2. Hard-coding Couleurs
❌ **ERREUR :** `color: #009688`
✅ **CORRECTION :** `color: hsl(var(--primary))`

### 3. Catégories Personnalisées
❌ **ERREUR :** Créer `category="security"`
✅ **CORRECTION :** Utiliser `category="best-practices"`

### 4. Navigation Non Mise à Jour
❌ **ERREUR :** Créer un cours sans l'ajouter à `app/page.tsx` et `app/cours/page.tsx`
✅ **CORRECTION :** Suivre le guide [ajouter-un-cours.md](./ajouter-un-cours.md)

### 5. Code Non Testé
❌ **ERREUR :** Copier du code trouvé en ligne sans le tester
✅ **CORRECTION :** Toujours exécuter et valider les exemples

### 6. Manque de Contexte
❌ **ERREUR :** Montrer du code sans expliquer le problème qu'il résout
✅ **CORRECTION :** Toujours expliquer le "pourquoi" avant le "comment"

### 7. Oubli du Responsive
❌ **ERREUR :** Tester uniquement sur desktop
✅ **CORRECTION :** Tester mobile, tablette, desktop

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

### Cours Bien Structurés

**Next.js Demo** ([`app/cours/nextjs-demo/`](../../app/cours/nextjs-demo/))
- ✅ 21 sections organisées en 5 catégories
- ✅ Bon usage des composants
- ✅ Navigation complète

**React 19 Advanced** ([`app/cours/react-19-advanced/`](../../app/cours/react-19-advanced/))
- ✅ Contenu technique approfondi
- ✅ Exemples comparatifs React 18 vs 19
- ✅ Documentation exhaustive

---

## Conclusion

**La qualité avant la quantité :**
- Mieux vaut 10 sections excellentes que 20 sections médiocres
- Toujours tester et valider avant de publier
- Écouter les retours et itérer

**Contribuer à l'excellence :**
- Suivre ces bonnes pratiques
- Proposer des améliorations
- Documenter les nouveaux patterns

---

**Dernière mise à jour** : Février 2026
