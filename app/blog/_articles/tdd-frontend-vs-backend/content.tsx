import { CodeBlock } from '@/components/course/code-block';
import { ConceptCard } from '@/components/course/concept-card';
import { ComparisonTable } from '@/components/course/comparison-table';

export default function TDDFrontendVsBackendContent() {
  return (
    <>
      <h2 id="introduction">Introduction</h2>

      <p>
        Le Test-Driven Development (TDD) est une pratique bien établie en
        backend, avec des exemples classiques comme les tests unitaires de
        fonctions pures, les endpoints d'API et la logique métier. Mais quand
        il s'agit de frontend, les choses se compliquent rapidement.
      </p>

      <p>
        Pourquoi est-ce si différent ? Pourquoi les mêmes principes qui
        fonctionnent parfaitement en backend semblent soudainement inadaptés ou
        difficiles à appliquer côté client ?
      </p>

      <ConceptCard
        title="Les chiffres parlent d'eux-mêmes"
        description="La maintenance des tests frontend représente un défi majeur en termes de temps et de complexité"
        category="testing"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>
            <strong>30-50% du temps</strong> : Part de la maintenance des tests
            frontend (contre 15-20% en backend)
          </li>
          <li>
            <strong>Centaines de ms vs &lt;1ms</strong> : Temps d'exécution d'un
            test frontend comparé à un test unitaire backend
          </li>
          <li>
            <strong>Imprévisibilité</strong> : Il est beaucoup plus facile de
            prédire comment une API sera consommée que la myriade de façons dont
            un utilisateur peut interagir avec une interface
          </li>
        </ul>
      </ConceptCard>

      <ConceptCard
        title="La promesse du TDD"
        description="Le TDD promet un code plus fiable, mieux structuré et plus maintenable. Mais cette promesse s'applique-t-elle uniformément au frontend ?"
        category="testing"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>
            <strong>Red</strong> : Écrire un test qui échoue
          </li>
          <li>
            <strong>Green</strong> : Écrire le code minimal pour passer le test
          </li>
          <li>
            <strong>Refactor</strong> : Améliorer le code sans casser les tests
          </li>
        </ul>
      </ConceptCard>

      <h2 id="le-probleme-visuel">Le problème du rendu visuel</h2>

      <p>
        En backend, un test vérifie souvent une sortie textuelle ou numérique
        prévisible. En frontend, vous testez des composants visuels avec état,
        interactions utilisateur, et rendu conditionnel.
      </p>

      <p>
        La différence est fondamentale : <strong>une API backend peut être définie
        par une simple structure JSON</strong>, alors que même la fonctionnalité
        frontend la plus simple est définie non seulement par son comportement,
        mais aussi par <strong>des milliers de pixels rendus à l'écran</strong>.
      </p>

      <p>
        Le vrai défi ? Nous n'avons pas encore de bon moyen d'expliquer à une
        machine quels pixels sont critiques et lesquels ne le sont pas. Changer
        les mauvais pixels peut rendre une fonctionnalité complètement inutilisable,
        mais comment automatiser cette vérification ?
      </p>

      <CodeBlock
        code={`// Backend : Test simple et prévisible
test('calculateTotal should return sum of prices', () => {
  const result = calculateTotal([10, 20, 30]);
  expect(result).toBe(60);
});

// Frontend : Test complexe avec rendu et interactions
test('Button should toggle modal on click', async () => {
  render(<App />);
  const button = screen.getByRole('button', { name: /open modal/i });

  // État initial
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  // Interaction
  await userEvent.click(button);

  // Vérifications multiples
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.getByText(/modal content/i)).toBeVisible();
});`}
        language="typescript"
        filename="tests-comparison.test.ts"
        category="testing"
      />

      <p>
        Le test backend est <strong>déterministe</strong> : mêmes entrées =
        mêmes sorties. Le test frontend doit gérer le rendu, l'état du DOM, les
        animations, et la visibilité des éléments.
      </p>

      <ComparisonTable
        modes={[
          {
            name: 'Backend TDD',
            description: 'Tests unitaires de fonctions et logique métier',
            pros: [
              'Fonctions pures prévisibles',
              'Pas de dépendance au DOM',
              'Exécution rapide (< 1ms par test)',
              'Stack traces claires',
            ],
            cons: [
              'Nécessite mocks pour I/O',
              'Tests d\'intégration plus lents',
            ],
            useCases: [
              'API endpoints',
              'Business logic',
              'Data transformations',
              'Validations',
            ],
            color: 'rgb(0, 150, 136)',
          },
          {
            name: 'Frontend TDD',
            description: 'Tests de composants, interactions et rendu',
            pros: [
              'Simule comportement utilisateur',
              'Détecte bugs visuels',
              'Testing Library mature',
              'Intégration avec navigateur',
            ],
            cons: [
              'Lent (render + DOM + cleanup)',
              'Flaky tests fréquents',
              'Complexité des mocks (fetch, timers)',
              'Difficile pour CSS/animations',
              'Setup verbeux',
            ],
            useCases: [
              'Composants interactifs',
              'Formulaires',
              'États UI complexes',
              'Navigation',
            ],
            color: 'rgb(249, 115, 22)',
          },
        ]}
      />

      <h2 id="les-defis-specifiques">Les défis spécifiques au frontend</h2>

      <h3 id="etat-asynchrone">1. État asynchrone omniprésent</h3>

      <p>
        En frontend, presque tout est asynchrone : fetch, animations, debounce,
        événements utilisateur. Tester ces comportements en TDD nécessite{' '}
        <code>waitFor</code>, <code>act</code>, et autres utilitaires complexes.
      </p>

      <p>
        Historiquement, les outils de test frontend ne permettaient pas de lancer
        des tests d'intégration en quelques secondes. Les tests devaient soit se
        limiter à de la logique métier pure, soit tourner dans un navigateur avec
        <strong> plusieurs minutes de setup</strong>. Bien que les outils modernes
        comme Jest et React Testing Library aient considérablement amélioré la
        situation, le problème fondamental demeure : tester l'asynchrone est
        intrinsèquement plus complexe que tester du code synchrone.
      </p>

      <CodeBlock
        code={`test('Load user data on mount', async () => {
  // Mock fetch
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ name: 'Alice', age: 30 }),
    })
  );

  render(<UserProfile userId="123" />);

  // État initial : loading
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // Attendre fin du fetch
  await waitFor(() => {
    expect(screen.getByText(/alice/i)).toBeInTheDocument();
  });

  // Vérifier les données
  expect(screen.getByText(/30/i)).toBeInTheDocument();
});`}
        language="typescript"
        filename="async-test.test.tsx"
        category="testing"
      />

      <p>
        Ce test simple nécessite déjà :
      </p>

      <ul>
        <li>Mock de <code>fetch</code></li>
        <li>Gestion de l'état loading</li>
        <li><code>waitFor</code> pour attendre la résolution asynchrone</li>
        <li>Vérifications d'état multiple (loading → success)</li>
      </ul>

      <p>
        En backend, le même test serait :
      </p>

      <CodeBlock
        code={`test('getUserById returns user data', async () => {
  const user = await getUserById('123');
  expect(user).toEqual({ name: 'Alice', age: 30 });
});`}
        language="typescript"
        filename="backend-test.test.ts"
        category="testing"
      />

      <h3 id="interactions-utilisateur">
        2. Complexité des interactions utilisateur
      </h3>

      <p>
        Les interactions utilisateur sont imprévisibles et multiples : click,
        hover, focus, keyboard navigation, drag & drop, touch events, gestures
        mobiles (pinch, swipe), double tap...
      </p>

      <p>
        Comme le soulignent de nombreux développeurs : <strong>il est beaucoup
        plus facile de prédire comment une API sera consommée que la myriade de
        façons dont un utilisateur peut interagir avec une interface</strong>.
        Ajoutez à cela les défis du design responsive — avec tant d'appareils et
        de tailles d'écran différents — et vous obtenez un espace de test
        exponentiellement plus complexe qu'en backend.
      </p>

      <CodeBlock
        code={`test('Dropdown opens on click and closes on outside click', async () => {
  render(<Dropdown />);

  const trigger = screen.getByRole('button', { name: /open/i });

  // Ouvrir
  await userEvent.click(trigger);
  expect(screen.getByRole('menu')).toBeInTheDocument();

  // Cliquer en dehors
  await userEvent.click(document.body);
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
});

test('Dropdown opens on keyboard Enter', async () => {
  render(<Dropdown />);

  const trigger = screen.getByRole('button');
  trigger.focus();

  // Appuyer sur Enter
  await userEvent.keyboard('{Enter}');
  expect(screen.getByRole('menu')).toBeInTheDocument();

  // Appuyer sur Escape
  await userEvent.keyboard('{Escape}');
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
});`}
        language="typescript"
        filename="interactions-test.test.tsx"
        category="testing"
      />

      <p>
        Un simple dropdown nécessite des tests pour : click, outside click,
        keyboard navigation, focus management, ARIA attributes... Comparez cela
        à un backend où une fonction <code>toggleDropdown()</code> changerait
        juste un booléen.
      </p>

      <h3 id="dom-et-css">3. Le DOM et le CSS</h3>

      <p>
        Le DOM est un arbre complexe, mutable, et imprévisible. Le CSS ajoute
        une couche de comportement (visibilité, layout, animations) difficile à
        tester.
      </p>

      <ConceptCard
        title="Le problème du CSS"
        description="Comment tester qu'un élément est vraiment visible à l'écran ?"
        category="testing"
      >
        <p className="text-sm text-foreground/80">
          <code>toBeInTheDocument()</code> vérifie la présence dans le DOM,
          mais pas la visibilité. Un élément peut être masqué par CSS (
          <code>display: none</code>, <code>visibility: hidden</code>,{' '}
          <code>opacity: 0</code>).
        </p>
        <p className="text-sm text-foreground/80 mt-2">
          <code>toBeVisible()</code> aide, mais ne détecte pas les cas
          complexes comme <code>position: absolute; left: -9999px</code> ou un
          parent avec <code>overflow: hidden</code>.
        </p>
      </ConceptCard>

      <h3 id="mocks-complexes">4. Mocks et dépendances externes</h3>

      <p>
        Tester les containers frontend est <strong>particulièrement difficile</strong>{' '}
        car vous devez mocker de nombreux appels API et données. De plus, écrire
        des sélecteurs pour interagir avec des composants imbriqués est délicat.
        Une question revient souvent : <strong>que faut-il tester exactement ?</strong>{' '}
        Les feuilles de style ? La méthode render de chaque composant ? Comment
        gérer les interactions et mocker les données ?
      </p>

      <p>
        Frontend dépend de nombreuses APIs navigateur difficiles à mocker :
      </p>

      <ul>
        <li>
          <code>window.matchMedia</code> (media queries)
        </li>
        <li>
          <code>IntersectionObserver</code> (lazy loading)
        </li>
        <li>
          <code>ResizeObserver</code> (responsive)
        </li>
        <li>
          <code>localStorage</code>, <code>sessionStorage</code>
        </li>
        <li>
          <code>navigator.geolocation</code>
        </li>
        <li>
          <code>requestAnimationFrame</code>
        </li>
      </ul>

      <CodeBlock
        code={`// Setup requis avant chaque test
beforeEach(() => {
  // Mock IntersectionObserver
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
    takeRecords() {
      return [];
    }
  };

  // Mock matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  // Mock localStorage
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
  global.localStorage = localStorageMock as any;
});`}
        language="typescript"
        filename="setup-tests.ts"
        category="testing"
      />

      <p>
        En backend, vous mockez peut-être une base de données ou un service
        externe avec des entrées/sorties claires. En frontend, vous mockez{' '}
        <strong>le navigateur entier</strong> — un environnement complexe avec
        des centaines d'APIs et comportements imprévisibles.
      </p>

      <h3 id="separation-concerns">5. Séparation des préoccupations</h3>

      <p>
        Un défi souvent sous-estimé en frontend est la{' '}
        <strong>séparation de la logique métier du code UI</strong>. En backend,
        la séparation entre couches (contrôleur, service, repository) est bien
        établie. En frontend, la logique métier est souvent entrelacée avec le
        rendu, les événements, et l'état des composants.
      </p>

      <p>
        Ce problème est particulièrement prononcé dans les applications React
        modernes où les hooks mélangent état, effets de bord, et logique métier.
        Tester cette logique nécessite soit de mocker tout le contexte React,
        soit d'extraire laborieusement la logique dans des fonctions pures —
        ce qui devrait être fait dès le début mais ne l'est souvent pas.
      </p>

      <ConceptCard
        title="Recommandation pratique"
        description="Extraire la logique métier pour faciliter les tests"
        category="best-practices"
      >
        <p className="text-sm text-foreground/80">
          Plutôt que de tester des composants entiers avec toutes leurs
          dépendances, <strong>extrayez la logique métier</strong> dans des
          fonctions pures ou des custom hooks réutilisables. Ces unités isolées
          sont beaucoup plus faciles à tester et ressemblent au code backend.
        </p>
        <p className="text-sm text-foreground/80 mt-2">
          Exemple : Au lieu de tester un formulaire complet, testez séparément
          la fonction de validation, le formattage des données, et la logique
          de soumission.
        </p>
      </ConceptCard>

      <h2 id="pourquoi-continuer">Pourquoi continuer malgré tout ?</h2>

      <p>
        Malgré ces défis, le TDD en frontend reste précieux pour :
      </p>

      <ul>
        <li>
          <strong>Fiabilité</strong> : Détecter les régressions visuelles et
          comportementales
        </li>
        <li>
          <strong>Documentation</strong> : Les tests documentent les cas
          d'usage
        </li>
        <li>
          <strong>Confiance</strong> : Refactorer sans peur
        </li>
        <li>
          <strong>Accessibilité</strong> : Tester avec Testing Library force à
          penser ARIA et sémantique
        </li>
      </ul>

      <ConceptCard
        title="L'approche pragmatique"
        description="TDD strict n'est pas toujours la meilleure approche en frontend"
        category="best-practices"
      >
        <p className="text-sm text-foreground/80">
          Privilégiez le <strong>Test-After Development</strong> pour les
          composants visuels complexes. Écrivez d'abord le composant,{' '}
          <strong>puis</strong> ajoutez les tests pour les comportements
          critiques.
        </p>
        <p className="text-sm text-foreground/80 mt-2">
          Réservez le TDD strict pour la logique métier pure (validations,
          formatters, utils) qui ressemble au backend.
        </p>
      </ConceptCard>

      <h2 id="conclusion">Conclusion</h2>

      <p>
        Le TDD côté frontend n'est pas impossible, mais il est{' '}
        <strong>fondamentalement différent</strong> du TDD backend. Les défis
        proviennent de la nature même du frontend : visuel, asynchrone,
        interactif, et dépendant du DOM.
      </p>

      <p>
        Au lieu de forcer le TDD strict partout, adoptez une{' '}
        <strong>approche hybride</strong> :
      </p>

      <ul>
        <li>TDD pour la logique métier pure</li>
        <li>Test-After pour les composants visuels</li>
        <li>Tests d'intégration pour les flows critiques</li>
        <li>Tests E2E (Playwright, Cypress) pour les scénarios utilisateur</li>
      </ul>

      <p>
        Le but n'est pas de suivre dogmatiquement le TDD, mais de{' '}
        <strong>produire du code fiable</strong>. Et parfois, cela signifie
        adapter la méthodologie au contexte.
      </p>

      <p>
        Les outils modernes (2025-2026) comme Vitest, Testing Library, et
        Playwright ont considérablement amélioré l'expérience de test frontend.
        Mais ils ne peuvent pas éliminer la complexité inhérente au testing
        d'interfaces visuelles et interactives. L'important est de{' '}
        <strong>trouver l'équilibre</strong> entre couverture de tests et
        pragmatisme, en reconnaissant que certains aspects du frontend sont
        simplement plus difficiles à tester que d'autres.
      </p>
    </>
  );
}
