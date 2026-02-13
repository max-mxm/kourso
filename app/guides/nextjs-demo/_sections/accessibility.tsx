import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';
import { Check } from 'lucide-react';

export default function AccessibilitySection() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="space-y-4">
        <p className="text-lg text-foreground/90 leading-relaxed">
          L'<strong>accessibilité (a11y)</strong> garantit que votre application est utilisable par tous,
          y compris les personnes en situation de handicap. Elle améliore l'expérience utilisateur globale,
          le SEO, et réduit les risques légaux. Ce guide couvre les principes WCAG 2.1 et les techniques pratiques.
        </p>
      </div>

      {/* WCAG 2.1 - 4 Principes POUR */}
      <ConceptCard
        title="WCAG 2.1 - Les 4 Principes POUR"
        description="Web Content Accessibility Guidelines définit 4 principes fondamentaux pour rendre le contenu web accessible à tous."
        category="best-practices"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                P
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">Perceptible</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• Alt text sur toutes les images</div>
                  <div>• Contraste minimum 4.5:1 (texte standard) ou 3:1 (texte large/UI)</div>
                  <div>• Design responsive adapté à tous les écrans</div>
                  <div>• Ne pas utiliser la couleur seule pour transmettre l'information (ajouter des icônes, du texte)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                O
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">Opérable</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• Navigation au clavier (Tab, Enter, Escape)</div>
                  <div>• Focus visible sur tous les éléments interactifs</div>
                  <div>• Éviter les timeouts trop courts (laisser le temps de lire/agir)</div>
                  <div>• Pas de contenu clignotant plus de 3 fois par seconde (risque d'épilepsie)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                U
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">Understandable (Compréhensible)</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• Attribut <code className="text-xs bg-muted px-1 py-0.5 rounded">lang="fr"</code> pour spécifier la langue</div>
                  <div>• Texte clair, sans jargon inutile</div>
                  <div>• Labels explicites sur les formulaires</div>
                  <div>• Messages d'erreur descriptifs</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                R
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">Robust (Robuste)</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• HTML valide et sémantique</div>
                  <div>• ARIA utilisé uniquement quand nécessaire (ne pas abuser)</div>
                  <div>• Compatible avec les technologies d'assistance (screen readers, etc.)</div>
                  <div>• Code qui fonctionne sur tous les navigateurs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* HTML Sémantique */}
      <CodeBlock
        code={`// ❌ MAUVAIS - Div soup sans sémantique
<div className="header">
  <div className="nav">
    <div className="link">Home</div>
    <div className="link">About</div>
  </div>
</div>
<div className="main">
  <div className="article">
    <div className="title">Mon article</div>
    <div className="content">Contenu...</div>
  </div>
</div>

// ✅ BON - HTML sémantique
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h1>Mon article</h1>
    <p>Contenu...</p>
  </article>
</main>

// Avantages :
// - Screen readers comprennent la structure
// - SEO amélioré (moteurs de recherche comprennent mieux)
// - Navigation au clavier native (liens vs divs cliquables)
// - Maintenance plus facile (la sémantique documente l'intention)`}
        language="tsx"
        filename="Comparaison HTML sémantique"
        highlightLines={[16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]}
        category="best-practices"
      />

      {/* Boutons vs Liens */}
      <ConceptCard
        title="Boutons vs Liens - Quand utiliser quoi ?"
        description="Choisir le bon élément HTML selon le contexte est crucial pour l'accessibilité et l'expérience utilisateur."
        category="best-practices"
      >
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="font-medium text-foreground mb-2">Utilisez un &lt;button&gt;</div>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                <span>Action sur la page actuelle (submit form, ouvrir modal, toggle menu)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                <span>Modification d'état (ajouter au panier, liker)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                <span>Déclencher du JavaScript</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <div className="font-medium text-foreground mb-2">Utilisez un &lt;a&gt;</div>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 text-purple-500 flex-shrink-0" />
                <span>Navigation vers une autre page ou section</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 text-purple-500 flex-shrink-0" />
                <span>Téléchargement de fichier</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 text-purple-500 flex-shrink-0" />
                <span>Ancre vers une section (#section-id)</span>
              </li>
            </ul>
          </div>
        </div>
      </ConceptCard>

      {/* ARIA Attributes */}
      <ConceptCard
        title="ARIA Attributes - Attributs d'Accessibilité"
        description="ARIA (Accessible Rich Internet Applications) enrichit la sémantique HTML pour les technologies d'assistance."
        category="best-practices"
      >
        <div className="space-y-4 text-sm">
          <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <div className="font-medium text-foreground mb-2">Roles</div>
            <div className="text-muted-foreground mb-2">
              Définissent le type d'élément pour les screen readers.
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>• <code className="bg-muted px-1 py-0.5 rounded">role="dialog"</code> - Modal ou dialogue</div>
              <div>• <code className="bg-muted px-1 py-0.5 rounded">aria-modal="true"</code> - Indique que c'est une vraie modal (bloque le reste de la page)</div>
              <div>• <code className="bg-muted px-1 py-0.5 rounded">role="alert"</code> - Message important (erreur, succès)</div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <div className="font-medium text-foreground mb-2">Labels</div>
            <div className="text-muted-foreground mb-2">
              Donnent un nom accessible à un élément.
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>• <code className="bg-muted px-1 py-0.5 rounded">aria-label="Fermer"</code> - Label invisible mais lu par les screen readers</div>
              <div>• <code className="bg-muted px-1 py-0.5 rounded">aria-labelledby="title-id"</code> - Référence un autre élément comme label</div>
              <div>• <code className="bg-muted px-1 py-0.5 rounded">aria-describedby="desc-id"</code> - Ajoute une description supplémentaire</div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <div className="font-medium text-foreground mb-2">States</div>
            <div className="text-muted-foreground mb-2">
              Communiquent l'état dynamique d'un composant.
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>• <code className="bg-muted px-1 py-0.5 rounded">aria-expanded="true"</code> - Menu déroulant ouvert/fermé</div>
              <div>• <code className="bg-muted px-1 py-0.5 rounded">aria-selected="true"</code> - Item sélectionné dans une liste</div>
              <div>• <code className="bg-muted px-1 py-0.5 rounded">aria-disabled="true"</code> - Élément désactivé</div>
              <div>• <code className="bg-muted px-1 py-0.5 rounded">aria-live="polite"</code> - Zone qui se met à jour dynamiquement (notifications)</div>
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* Example ARIA */}
      <CodeBlock
        code={`// Exemple complet : Modal accessible avec ARIA

export function AccessibleModal({
  isOpen,
  onClose,
  title,
  children
}: ModalProps) {
  useEffect(() => {
    // Focus trap - empêcher la navigation au clavier en dehors de la modal
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus sur le premier élément interactif
      const firstFocusable = modalRef.current?.querySelector('button, [href], input');
      (firstFocusable as HTMLElement)?.focus();
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={onClose}
      aria-label="Overlay de la modal"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="bg-white p-6 rounded-lg shadow-xl max-w-md"
        onClick={(e) => e.stopPropagation()} // Empêcher fermeture au clic sur le contenu
      >
        <h2 id="modal-title" className="text-xl font-bold mb-4">
          {title}
        </h2>
        <div id="modal-description">
          {children}
        </div>
        <button
          onClick={onClose}
          aria-label="Fermer la modal"
          className="mt-4 px-4 py-2 bg-primary text-white rounded"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}`}
        language="tsx"
        filename="components/accessible-modal.tsx"
        highlightLines={[10, 11, 12, 13, 14, 30, 31, 32, 33, 37, 44]}
        category="best-practices"
      />

      {/* Navigation Clavier */}
      <ConceptCard
        title="Navigation au Clavier"
        description="Permettre la navigation complète au clavier est essentiel pour l'accessibilité. Beaucoup d'utilisateurs n'utilisent pas de souris."
        category="best-practices"
      >
        <div className="space-y-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 mt-0.5 text-purple-500 flex-shrink-0" />
              <div>
                <span className="font-medium text-foreground">Focus Management</span>
                <div className="text-muted-foreground">
                  Tous les éléments interactifs doivent avoir un style de focus visible.
                  <code className="block mt-1 text-xs bg-muted px-2 py-1 rounded">
                    button:focus-visible {'{ outline: 2px solid hsl(var(--primary)) }'}
                  </code>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 mt-0.5 text-purple-500 flex-shrink-0" />
              <div>
                <span className="font-medium text-foreground">Skip Link</span>
                <div className="text-muted-foreground">
                  Lien invisible qui apparaît au focus pour sauter directement au contenu principal.
                  <code className="block mt-1 text-xs bg-muted px-2 py-1 rounded">
                    {'<a href="#main-content" className="skip-link">Skip to main content</a>'}
                  </code>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 mt-0.5 text-purple-500 flex-shrink-0" />
              <div>
                <span className="font-medium text-foreground">Focus Trap (Modal)</span>
                <div className="text-muted-foreground">
                  Quand une modal est ouverte, le focus doit rester piégé dans la modal jusqu'à sa fermeture.
                  Utilisez une librairie comme <code className="text-xs bg-muted px-1 py-0.5 rounded">focus-trap-react</code>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* Color Contrast */}
      <ConceptCard
        title="Color Contrast - Contraste des Couleurs"
        description="Un contraste insuffisant rend le texte illisible pour les personnes malvoyantes ou en situation de forte luminosité."
        category="best-practices"
      >
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="font-medium text-foreground mb-2">AA (Standard)</div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <span>4.5:1 minimum pour le texte standard</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <span>3:1 minimum pour le texte large (18px+ ou 14px+ gras) et les éléments UI</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <div className="font-medium text-foreground mb-2">AAA (Enhanced)</div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-purple-500 flex-shrink-0" />
                  <span>7:1 minimum pour le texte standard</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-purple-500 flex-shrink-0" />
                  <span>4.5:1 minimum pour le texte large</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Outils de vérification : Chrome DevTools Lighthouse, WebAIM Contrast Checker, axe DevTools
          </div>
        </div>
      </ConceptCard>

      {/* Screen Readers */}
      <ConceptCard
        title="Screen Readers - Lecteurs d'Écran"
        description="Les screen readers vocalisent le contenu web pour les utilisateurs aveugles ou malvoyants."
        category="best-practices"
      >
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 text-purple-500 flex-shrink-0" />
            <div>
              <span className="font-medium text-foreground">VoiceOver (macOS/iOS)</span>
              <span className="text-muted-foreground"> - Natif sur Mac et iPhone. Testez avec Cmd+F5</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 text-purple-500 flex-shrink-0" />
            <div>
              <span className="font-medium text-foreground">NVDA (Windows)</span>
              <span className="text-muted-foreground"> - Gratuit et open source. Le plus utilisé sur Windows</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 text-purple-500 flex-shrink-0" />
            <div>
              <span className="font-medium text-foreground">JAWS (Windows)</span>
              <span className="text-muted-foreground"> - Payant, très complet. Standard en entreprise</span>
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* Pièges à éviter */}
      <div className="border-2 border-red-500/30 rounded-lg p-6 bg-red-500/5">
        <h3 className="text-lg font-bold text-red-500 mb-4">Pièges à éviter en Accessibilité</h3>
        <div className="space-y-4 text-sm">
          <div className="space-y-2">
            <div className="font-medium text-foreground">1. outline: none sur :focus</div>
            <div className="text-muted-foreground">
              Ne jamais supprimer le outline sans le remplacer par un style de focus visible. Les utilisateurs au clavier doivent savoir où ils sont.
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-foreground">2. Div/span cliquables</div>
            <div className="text-muted-foreground">
              Utiliser <code className="text-xs bg-muted px-1 py-0.5 rounded">{'<div onClick={...}>'}</code> au lieu de <code className="text-xs bg-muted px-1 py-0.5 rounded">{'<button>'}</code>.
              Les divs ne sont pas focusables au clavier par défaut et ne communiquent pas leur rôle aux screen readers.
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-foreground">3. Images sans alt</div>
            <div className="text-muted-foreground">
              Toujours ajouter un attribut <code className="text-xs bg-muted px-1 py-0.5 rounded">alt</code> aux images.
              Si l'image est purement décorative, utilisez <code className="text-xs bg-muted px-1 py-0.5 rounded">alt=""</code> (vide).
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-foreground">4. Formulaires sans labels</div>
            <div className="text-muted-foreground">
              Chaque input doit avoir un <code className="text-xs bg-muted px-1 py-0.5 rounded">{'<label>'}</code> associé via l'attribut <code className="text-xs bg-muted px-1 py-0.5 rounded">htmlFor</code>.
              Les placeholders ne suffisent pas.
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-foreground">5. Contraste insuffisant</div>
            <div className="text-muted-foreground">
              Texte gris clair sur fond blanc (ou vice versa). Utilisez toujours un outil de vérification du contraste.
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-foreground">6. Pas de focus trap dans les modals</div>
            <div className="text-muted-foreground">
              Si l'utilisateur peut Tab en dehors de la modal, il perd le contexte. Implémentez un focus trap avec une librairie dédiée.
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-foreground">7. ARIA en excès</div>
            <div className="text-muted-foreground">
              Trop d'ARIA peut nuire à l'accessibilité. Utilisez ARIA uniquement quand le HTML sémantique ne suffit pas.
              Règle d'or : "No ARIA is better than bad ARIA".
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
