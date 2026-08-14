import Link from 'next/link';
import Image from 'next/image';

import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';
import { ConceptCard } from '@/components/course/concept-card';

const externalLinks = {
  vitamcv: 'https://vitamcv.app',
  vitamcvScanner: 'https://vitamcv.app/scanner',
  aiSdk: 'https://ai-sdk.dev/docs/introduction',
  aiSdkStreamText: 'https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text',
  aiSdkTools: 'https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling',
  assistantUi: 'https://www.assistant-ui.com/',
  assistantUiToolUi: 'https://www.assistant-ui.com/docs/tools/tool-ui',
  assistantUiToolkit:
    'https://www.assistant-ui.com/docs/migrations/toolkit-tools',
  nextRouteHandlers:
    'https://nextjs.org/docs/app/getting-started/route-handlers',
  zustand: 'https://zustand.docs.pmnd.rs/',
  supabase: 'https://supabase.com/docs',
  zod: 'https://zod.dev/',
  shadcn: 'https://ui.shadcn.com/',
};

const checklistItems = [
  {
    title: 'Frontiere d action',
    text: <>Identifier quelles actions le modele a vraiment le droit de faire.</>,
  },
  {
    title: 'Contrats tools',
    text: (
      <>
        Donner a chaque tool un schema d&apos;input strict et une responsabilite
        unique.
      </>
    ),
  },
  {
    title: 'Source de verite',
    text: <>Decider ce qui vit dans le store client et ce qui vit en base.</>,
  },
  {
    title: 'Actions visibles',
    text: <>Rendre les tool calls importants visibles dans l&apos;interface.</>,
  },
  {
    title: 'Validation humaine',
    text: (
      <>Prevoir une phase de validation humaine pour les contenus sensibles.</>
    ),
  },
  {
    title: 'Traçabilite',
    text: <>Garder une trace de source pour les donnees reformulees.</>,
  },
  {
    title: 'Scores calcules',
    text: (
      <>Eviter les scores inventes par le LLM quand un calcul est possible.</>
    ),
  },
  {
    title: 'Retries propres',
    text: (
      <>
        Gerer les streams interrompus et les retries sans rejouer les effets.
      </>
    ),
  },
  {
    title: 'Etats partiels',
    text: (
      <>
        Concevoir les etats partiels : profil vide, profil incomplet, erreur,
        reprise.
      </>
    ),
  },
  {
    title: 'Documentation',
    text: (
      <>
        Ajouter des liens documentaires clairs pour les technos structurantes.
      </>
    ),
  },
];

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary/80 hover:decoration-primary"
    >
      {children}
    </a>
  );
}

export default function UxSaasIaVitamcvContent() {
  return (
    <>
      <h2 id="introduction">Introduction</h2>
      <p>
        Quand on demarre un produit IA conversationnel, la tentation est simple :
        brancher un modele, afficher une zone de chat, streamer la reponse et
        appeler ca un assistant. Pour une demo, ca marche. Pour un SaaS, ca casse
        vite.
      </p>

      <p>
        Le probleme n&apos;est pas seulement de faire parler le modele. Le vrai
        probleme est de transformer une conversation floue en donnees
        structurees, de rendre ces donnees visibles, de permettre a
        l&apos;utilisateur de corriger, de persister les effets sans doublons, puis
        de produire un artefact final fiable. Dans le cas de{' '}
        <ExternalLink href={externalLinks.vitamcv}>VitamCV</ExternalLink>, cet
        artefact est un CV exportable, adapte a une offre, mais les questions
        d&apos;architecture sont les memes pour beaucoup de SaaS IA.
      </p>

      <p>
        Cet article ne cherche donc pas a dire “regardez mon SaaS”. Il part dans
        l&apos;autre sens : si on veut construire un produit de chat
        conversationnel serieux avec Next.js, React et AI SDK, quelles
        difficultes apparaissent, et comment peut-on structurer le systeme pour
        ne pas se retrouver avec un simple wrapper de ChatGPT ?
      </p>

      <div className="not-prose my-10 rounded-2xl border border-primary/20 bg-primary/5 p-5 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-16 w-44 items-center justify-center rounded-xl border border-border/60 bg-white px-4 shadow-xs dark:bg-slate-950">
            <Image
              src="/vitamcv-logo.svg"
              alt="Logo VitamCV, SaaS de generation de CV par IA"
              width={154}
              height={39}
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Etude de cas reelle
            </p>
            <p className="text-sm leading-relaxed text-foreground/80">
              VitamCV sert ici de terrain d&apos;observation : un SaaS IA avec
              chat, generation de CV, scoring, validation humaine et exports
              DOCX/PDF. Pas une maquette, pas une demo jetable : un produit qui
              doit survivre aux vrais usages.
            </p>
            <ExternalLink href={externalLinks.vitamcvScanner}>
              Tester le scanner gratuit VitamCV
            </ExternalLink>
          </div>
        </div>
      </div>

      <ConceptCard
        title="Le changement de modèle mental"
        description="Un chat IA devient un produit quand la conversation déclenche des états, des validations, des calculs et des sorties contrôlées."
        category="architecture"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>Le texte utilisateur est une entree non structuree.</li>
          <li>Les tools deviennent la frontiere entre langage et action.</li>
          <li>L&apos;UI doit rendre visibles les effets du modele.</li>
          <li>Le systeme doit rester recuperable si le stream s&apos;interrompt.</li>
        </ul>
      </ConceptCard>

      <h2 id="point-depart">Le point de départ : un chat ne suffit pas</h2>
      <p>
        Un CV est un bon cas d&apos;etude parce qu&apos;il force plusieurs
        contraintes a cohabiter. Il faut extraire des donnees d&apos;un document ou
        d&apos;une conversation, detecter les informations faibles, poser des
        questions utiles, reformuler sans inventer, comparer le profil a une
        offre, puis produire un fichier final.
      </p>

      <p>
        Si tout reste dans une bulle de chat, l&apos;utilisateur ne sait pas ce qui
        est retenu, ce qui a ete modifie, ni ce qui sera utilise pour generer le
        document. L&apos;experience devient impressionnante mais opaque. Le
        frontend doit donc jouer un role beaucoup plus important : il doit
        transformer le flux conversationnel en surface de controle.
      </p>

      <p>
        C&apos;est souvent la premiere claque quand on passe du prototype au
        produit : le modele peut etre bon, mais l&apos;utilisateur ne fait pas
        confiance a une boite noire. Il veut voir ce qui change, comprendre
        pourquoi, et garder la main avant qu&apos;un document parte dans la nature.
      </p>

      <ComparisonTable
        modes={[
          {
            name: 'Chat IA de démonstration',
            description: 'Une entrée texte, une réponse streamée, peu de mémoire produit',
            pros: ['Rapide a construire', 'Impressionnant en demo', 'Peu de design system'],
            cons: [
              'Etat implicite',
              'Sortie difficile a auditer',
              'Peu de controle utilisateur',
            ],
            useCases: ['POC', 'Support simple', 'Brainstorming'],
            color: 'rgb(14, 165, 233)',
          },
          {
            name: 'SaaS IA conversationnel',
            description: 'Conversation, état durable, tools métier et UI spécialisée',
            pros: [
              'Progression visible',
              'Donnees persistantes',
              'Actions verifiables',
            ],
            cons: [
              'Architecture plus stricte',
              'Gestion des erreurs plus delicate',
              'Front plus exigeant',
            ],
            useCases: ['CV', 'Legal tech', 'Finance', 'Outils internes IA'],
            color: 'rgb(124, 58, 237)',
          },
        ]}
      />

      <h2 id="stack-choisie">La stack choisie et pourquoi</h2>
      <p>
        Le socle technique de VitamCV combine{' '}
        <ExternalLink href={externalLinks.aiSdk}>AI SDK</ExternalLink>,{' '}
        <ExternalLink href={externalLinks.assistantUi}>assistant-ui</ExternalLink>,{' '}
        <ExternalLink href={externalLinks.nextRouteHandlers}>
          Next.js Route Handlers
        </ExternalLink>
        ,{' '}
        <ExternalLink href={externalLinks.zustand}>Zustand</ExternalLink>,{' '}
        <ExternalLink href={externalLinks.supabase}>Supabase</ExternalLink>,{' '}
        <ExternalLink href={externalLinks.zod}>Zod</ExternalLink> et{' '}
        <ExternalLink href={externalLinks.shadcn}>shadcn/ui</ExternalLink>.
        Chaque brique repond a une contrainte differente.
      </p>

      <ConceptCard
        title="Les responsabilités par bloc"
        description="Le choix de stack devient plus clair quand on le lit par frontières de responsabilité."
        category="architecture"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>
            <strong>AI SDK</strong> : streaming, tool calling, messages UI et
            integration provider.
          </li>
          <li>
            <strong>assistant-ui</strong> : primitives de chat, composer,
            messages, ToolUI et integration AI SDK.
          </li>
          <li>
            <strong>Next.js</strong> : frontiere serveur pour le provider IA,
            les secrets, l&apos;auth et la persistance.
          </li>
          <li>
            <strong>Zustand</strong> : etat client reactif pour le profil, les
            scores, les editions du panel et le Focus Mode.
          </li>
          <li>
            <strong>Supabase</strong> : source de verite durable, auth, RLS,
            documents et donnees utilisateur.
          </li>
        </ul>
      </ConceptCard>

      <p>
        Sur Maxpaths, j&apos;ai deja detaille le choix entre Redux, Context et
        Zustand dans{' '}
        <Link
          href="/blog/redux-vs-context-vs-zustand"
          className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary/80 hover:decoration-primary"
        >
          l&apos;article sur le state management React
        </Link>
        . Le cas VitamCV illustre bien pourquoi Zustand devient pertinent :
        l&apos;etat ne sert pas seulement a afficher un theme ou une modale. Il
        synchronise un chat, un panneau editable, une preview CV, des scores,
        des edits en attente et des effets venant de tools IA.
      </p>

      <p>
        Pour creuser les primitives citees dans cette architecture, les pages
        utiles sont la reference{' '}
        <ExternalLink href={externalLinks.aiSdkStreamText}>
          AI SDK <code>streamText</code>
        </ExternalLink>
        , le guide{' '}
        <ExternalLink href={externalLinks.aiSdkTools}>
          tools and tool calling
        </ExternalLink>{' '}
        et l&apos;integration{' '}
        <ExternalLink href={externalLinks.assistantUiToolUi}>
          ToolUI d&apos;assistant-ui
        </ExternalLink>
        .
      </p>

      <CodeBlock
        code={`Conversation utilisateur
  -> assistant-ui Thread + Composer
  -> POST /api/chat (Next.js Route Handler)
  -> AI SDK streamText()
  -> tools métier typés
  -> Supabase pour la vérité durable
  -> Zustand pour la réactivité frontend
  -> panel profil + preview CV + score cards`}
        language="bash"
        filename="architecture-conversationnelle.txt"
        category="architecture"
      />

      <p>
        Cote React,{' '}
        <ExternalLink href={externalLinks.assistantUi}>assistant-ui</ExternalLink>{' '}
        sert surtout a donner une forme produit a la conversation : messages,
        composer,{' '}
        <ExternalLink href={externalLinks.assistantUiToolUi}>
          rendu ToolUI
        </ExternalLink>{' '}
        et, dans les versions recentes, logique de{' '}
        <ExternalLink href={externalLinks.assistantUiToolkit}>
          toolkit
        </ExternalLink>
        . Pour un article, le plus interessant n&apos;est pas d&apos;embarquer un
        vrai chat, mais de montrer le genre d&apos;objet que l&apos;utilisateur doit
        voir quand une action IA devient sensible.
      </p>

      <div className="not-prose my-8 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
        <div className="border-b border-border/60 bg-muted/40 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-foreground">
              Exemple visuel Assistant UI
            </p>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              ToolUI
            </span>
          </div>
        </div>
        <div className="space-y-4 p-4">
          <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm leading-relaxed text-primary-foreground">
            Optimise cette experience pour une offre de Frontend Engineer IA.
          </div>
          <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-border/70 bg-background px-4 py-3 text-sm leading-relaxed text-foreground/85">
            Je peux te proposer une reformulation, mais je vais te laisser
            valider les points sensibles avant de modifier le profil.
          </div>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Validation de section
                </p>
                <p className="text-xs text-muted-foreground">
                  Experience professionnelle · source utilisateur conservee
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                action requise
              </span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-border/70 bg-background p-3">
                <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">
                  Original
                </p>
                <p className="text-sm text-foreground/80">
                  J&apos;ai travaille sur des interfaces React et un assistant IA.
                </p>
              </div>
              <div className="rounded-lg border border-primary/30 bg-background p-3">
                <p className="mb-1 text-xs font-semibold uppercase text-primary">
                  Proposition
                </p>
                <p className="text-sm text-foreground/80">
                  Conception d&apos;interfaces React conversationnelles connectees
                  a des workflows IA securises et mesurables.
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
                Accepter
              </span>
              <span className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground">
                Modifier
              </span>
              <span className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground">
                Reformuler
              </span>
            </div>
          </div>
        </div>
      </div>

      <h2 id="architecture-etat">La difficulté front : qui possède l'état ?</h2>
      <p>
        Dans une app React classique, la question “qui possede l&apos;etat ?”
        revient souvent. Dans une app IA conversationnelle, elle devient plus
        dure parce que plusieurs acteurs modifient le meme objet mental :
        l&apos;utilisateur, le modele, les tools, le panneau d&apos;edition, la
        base de donnees et parfois une reprise de conversation.
      </p>

      <p>
        C&apos;est la partie la moins spectaculaire a raconter, mais l&apos;une des
        plus importantes a construire. Un mauvais decoupage d&apos;etat donne une
        interface qui semble marcher, puis commence a mentir : un score qui ne
        correspond plus au profil, une preview en retard, un assistant qui
        felicite une correction qu&apos;il n&apos;a pas vraiment prise en compte.
      </p>

      <p>
        Dans VitamCV, la reponse est volontairement double. Supabase reste la
        source durable : ce qui doit survivre au refresh, au retry, au document
        genere ou a la reconnexion finit cote serveur. Zustand gere la
        reactivite locale : ce qui doit changer instantanement dans le panel,
        la preview, les animations et les composants ToolUI passe par le store.
      </p>

      <CodeBlock
        code={`// Modèle mental simplifié
type DurableState = {
  cvData: JsonResume;
  scores: Scores;
  targetJob: JobPosting | null;
  generatedDocuments: Document[];
};

type UiState = {
  focusedPanel: 'profile' | 'documents' | 'focus';
  pendingPanelEdits: PanelEdit[];
  highlightedSections: string[];
  conversationPhase: ConversationPhase;
};`}
        language="typescript"
        filename="state-boundaries.ts"
        category="architecture"
      />

      <p>
        Ce decoupage evite deux extremes. Tout mettre dans le chat rend
        l&apos;application opaque. Tout mettre directement en base rend
        l&apos;experience lente et peu fluide. Le frontend a besoin d&apos;un etat
        reactif pour donner un feedback immediat, mais cet etat doit rester
        reconcilie avec une verite durable.
      </p>

      <h2 id="phases-conversation">Les phases conversationnelles</h2>
      <p>
        Un autre piege classique consiste a garder un seul system prompt pour
        toute la conversation. C&apos;est confortable au debut, mais le modele se
        retrouve avec des objectifs contradictoires : accueillir, extraire,
        coacher, valider, scorer, generer. VitamCV utilise donc un system prompt
        dynamique par phase.
      </p>

      <p>
        La phase est calculee depuis l&apos;etat du profil. Elle ne sert pas a
        afficher une etape marketing, mais a changer les instructions envoyees
        au modele, la temperature et les tools pertinents.
      </p>

      <CodeBlock
        code={`type ConversationPhase =
  | 'onboarding'
  | 'extraction'
  | 'exploration'
  | 'validation';

function computePhase(profile: CvData): ConversationPhase {
  if (!profile.name && filledSections(profile) === 0) return 'onboarding';
  if (filledSections(profile) < 2) return 'extraction';
  if (filledSections(profile) < 3 || skills(profile).length < 3) {
    return 'exploration';
  }
  return 'validation';
}`}
        language="typescript"
        filename="conversation-phase.ts"
        category="architecture"
      />

      <ComparisonTable
        modes={[
          {
            name: 'Onboarding',
            description: 'Créer la confiance et choisir le chemin d’entrée',
            pros: ['Ton humain', 'Peu de contraintes', 'Deux chemins clairs'],
            cons: ['Ne doit pas déclencher trop tôt des tools'],
            useCases: ['Premier message', 'Upload CV ou départ de zéro'],
            color: 'rgb(45, 212, 191)',
          },
          {
            name: 'Extraction',
            description: 'Sauvegarder vite les données disponibles',
            pros: ['Temperature 0', 'Tool calls immédiats', 'Panel qui se remplit'],
            cons: ['Peu de place pour le coaching'],
            useCases: ['Parsing CV', 'Import de sections existantes'],
            color: 'rgb(59, 130, 246)',
          },
          {
            name: 'Exploration',
            description: 'Chercher la valeur cachée et les preuves concrètes',
            pros: ['Questions ciblées', 'Méthode STAR', 'Anti-imposter'],
            cons: ['Risque de trop questionner si le flow est mal dosé'],
            useCases: ['Achievements', 'Métriques', 'Skills implicites'],
            color: 'rgb(168, 85, 247)',
          },
          {
            name: 'Validation',
            description: 'Comparer original, proposition et version validée',
            pros: ['Temperature 0', 'Fidélité', 'Contrôle utilisateur'],
            cons: ['Peut devenir long sans ToolUI clair'],
            useCases: ['Work highlights', 'Projects', 'Summary'],
            color: 'rgb(244, 63, 94)',
          },
        ]}
      />

      <p>
        Le detail important est l&apos;escalade sans retour arriere. Une fois que
        l&apos;utilisateur atteint une phase avancee, la conversation ne regresse
        pas simplement parce qu&apos;il supprime une section dans le panel. Sinon,
        le modele peut redevenir incoherent : il recommence a poser des
        questions d&apos;onboarding alors que l&apos;utilisateur est deja dans une
        validation fine.
      </p>

      <h2 id="synchronisation">La synchronisation chat ↔ panel</h2>
      <p>
        Le pattern le plus important cote frontend est la synchronisation
        bidirectionnelle. Quand le modele appelle <code>updateProfile</code>, le
        panel doit se mettre a jour. Quand l&apos;utilisateur corrige le panel, le
        modele doit le savoir au prochain tour.
      </p>

      <CodeBlock
        code={`// Chat -> Panel
LLM appelle updateProfile({ section: 'work', data, source })
  -> résultat tool streamé
  -> ToolResultSync détecte le résultat
  -> useCvStore.setProfileWithSource(data, 'ai')
  -> panel + preview CV se mettent à jour

// Panel -> Chat
Utilisateur édite un champ
  -> store marque l'edit comme pending
  -> prochain POST /api/chat
  -> body() injecte panelEdits
  -> le LLM voit les corrections utilisateur`}
        language="bash"
        filename="chat-panel-sync.txt"
        category="architecture"
      />

      <p>
        Ce n&apos;est pas seulement un detail d&apos;implementation. C&apos;est ce
        qui permet au produit de ne pas mentir a l&apos;utilisateur. Si le panel
        montre une chose et le modele raisonne sur une autre, la confiance
        disparait. Dans un CV, cette incoherence peut produire une phrase fausse
        dans un document final.
      </p>

      <h2 id="tool-ui-validation">ToolUI : rendre les actions visibles</h2>
      <p>
        Le tool calling est souvent presente comme un sujet backend : le modele
        appelle une fonction. Dans une application conversationnelle, c&apos;est
        aussi un sujet UI. Certains tools ne doivent pas seulement modifier un
        etat, ils doivent afficher une interaction.
      </p>

      <p>
        C&apos;est la partie ou{' '}
        <ExternalLink href={externalLinks.assistantUiToolUi}>
          les ToolUI assistant-ui
        </ExternalLink>{' '}
        deviennent utiles. Un appel tool peut se transformer en carte dans le
        chat : validation d&apos;une section, score anime, analyse d&apos;offre,
        comparaison avant/apres. L&apos;IA ne reste pas une voix invisible ; elle
        produit des objets manipulables.
      </p>

      <CodeBlock
        code={`const tools = {
  updateProfile,      // effet durable : modifie le profil
  validateSection,   // humain dans la boucle : original vs proposé
  analyzeJobPosting, // extrait les exigences d'une offre
  computeScore,      // calcule un score explicable
  generateDocument,  // produit DOCX ou PDF
};`}
        language="typescript"
        filename="tools.ts"
        category="architecture"
      />

      <p>
        Pour la validation, VitamCV distingue les sections simples des sections
        narratives. Un nom, une langue ou un certificat peut etre confirme en
        texte. Une experience professionnelle ou un projet demande une vraie
        comparaison : texte original, version proposee, source, bouton accepter,
        modifier ou reformuler.
      </p>

      <ConceptCard
        title="Le principe de fidélité"
        description="Chaque donnée importante doit pouvoir revenir à quelque chose que l'utilisateur a dit ou confirmé."
        category="architecture"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>
            <code>original</code> : ce que l&apos;utilisateur a donne ou ce que
            le CV contient.
          </li>
          <li>
            <code>proposed</code> : la reformulation professionnelle proposee.
          </li>
          <li>
            <code>source</code> : la trace vers l&apos;information confirmee.
          </li>
          <li>
            <code>updateProfile</code> : appele apres validation, pas comme
            reflexe automatique sur tout texte genere.
          </li>
        </ul>
      </ConceptCard>

      <h2 id="focus-mode">Focus Mode : transformer, ne pas naviguer</h2>
      <p>
        Un SaaS IA conversationnel a besoin d&apos;un moment ou l&apos;utilisateur
        voit le resultat prendre forme. Pour VitamCV, ce moment est le Focus
        Mode : le panneau de droite s&apos;agrandit en preview CV, pendant que le
        chat reste visible.
      </p>

      <p>
        Ce moment compte presque autant que la qualite du texte genere. Quand le
        CV se remplit a cote de la conversation, l&apos;utilisateur n&apos;a plus
        l&apos;impression de discuter avec une IA abstraite : il voit son parcours
        devenir un objet concret.
      </p>

      <p>
        La decision UX importante est : transformer, ne pas naviguer. Une page
        separee de preview couperait le lien entre conversation et resultat. Une
        modale masquerait le chat. Un thumbnail serait trop petit pour creer la
        confiance. Le panneau qui grandit garde la meme geographie mentale :
        je parle a gauche, je vois mon CV se construire a droite.
      </p>

      <CodeBlock
        code={`Normal mode
┌───────────────────────┬──────────────┐
│ Chat conversationnel  │ Panel 420px  │
│                       │ Profil/Docs  │
└───────────────────────┴──────────────┘

Focus Mode
┌──────────────┬────────────────────────┐
│ Chat ~35%    │ Preview CV ~65%        │
│ toujours     │ scores + sections      │
│ utilisable   │ mises à jour en live   │
└──────────────┴────────────────────────┘`}
        language="bash"
        filename="focus-mode-layout.txt"
        category="architecture"
      />

      <p>
        Ce pattern est tres frontend : transitions, reflow, scroll preservation,
        responsive, reduced motion, sections vides qui doivent paraitre
        intentionnelles. Une preview partiellement remplie ne doit pas sembler
        cassee. Elle doit dire : “voici ce qu&apos;on a deja, voici ce qui manque”.
      </p>

      <h2 id="scoring">Scoring : ne pas laisser le LLM inventer le chiffre</h2>
      <p>
        Le scoring est un autre endroit ou une app IA peut devenir dangereuse.
        Demander au modele “donne un score a ce CV” produit souvent un chiffre
        plausible, mais difficile a expliquer. Dans{' '}
        <ExternalLink href={externalLinks.vitamcv}>VitamCV</ExternalLink>, le
        score est separe en plusieurs dimensions : match avec l&apos;offre,
        coherence du CV, authenticite du texte et score global.
      </p>

      <p>
        Le LLM peut aider a extraire ou normaliser des mots-cles. Mais le score
        final doit etre calcule par le systeme : overlap de mots-cles, presence
        de preuves, coherence temporelle, detection de keyword stuffing. C&apos;est
        une decision produit autant qu&apos;une decision technique.
      </p>

      <CodeBlock
        code={`// Modèle de scoring simplifié
const vitamScore =
  matchScore * 0.5 +
  coherenceScore * 0.25 +
  authenticityScore * 0.25;

// Le LLM aide à normaliser.
// Le système calcule le score final.`}
        language="typescript"
        filename="scoring.ts"
        category="architecture"
      />

      <ConceptCard
        title="Pourquoi c'est important"
        description="Un score généré par le LLM peut sembler crédible. Un score calculé peut être expliqué, testé et amélioré."
        category="architecture"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>Le candidat comprend ce qui manque vraiment.</li>
          <li>Le produit evite de promettre une verite magique.</li>
          <li>Les tests peuvent couvrir les fonctions de scoring.</li>
          <li>Le frontend peut afficher les deltas et les causes du score.</li>
        </ul>
      </ConceptCard>

      <h2 id="durable-turns">Streams interrompus, retry et effets idempotents</h2>
      <p>
        Une difficulte moins visible apparait quand le produit devient reel :
        que se passe-t-il si le stream s&apos;interrompt apres qu&apos;un tool a deja
        modifie le profil ? Si l&apos;utilisateur clique retry, faut-il rejouer le
        tool ? Si un document a ete genere ou un credit deduit, comment eviter
        le double effet ?
      </p>

      <p>
        La reponse n&apos;est pas purement frontend, mais le frontend en depend. Il
        doit pouvoir afficher un etat honnete : reponse interrompue, receipts de
        tools deja completes, bouton retry sur le bon turn, historique inerte,
        nouvelle conversation qui preserve le profil et les documents.
      </p>

      <CodeBlock
        code={`Turn utilisateur
  -> assistant envelope durable
  -> tool call enregistré avec input hash
  -> effet métier appliqué une seule fois
  -> receipt durable
  -> retry réutilise le résultat
  -> pas de double mutation`}
        language="bash"
        filename="idempotent-tool-effects.txt"
        category="architecture"
      />

      <p>
        C&apos;est le genre de sujet qui n&apos;apparait jamais dans une demo de chat,
        mais qui decide si le SaaS peut encaisser les vrais usages : reseau
        instable, refresh, onglet ferme, generation longue, erreur provider,
        retry impatient.
      </p>

      <h2 id="lecons">Leçons frontend et IA</h2>
      <p>
        La lecon principale est que le frontend d&apos;un SaaS IA ne se limite pas
        au rendu d&apos;une conversation. Il porte une partie de la confiance. Il
        doit montrer les effets, separer ce qui est propose de ce qui est
        valide, permettre la correction, et rendre les erreurs recuperables.
      </p>

      <p>
        En pratique, le “wow effect” ne vient pas seulement du modele. Il vient
        du moment ou l&apos;interface rend le travail du modele lisible : une
        section qui s&apos;illumine, une proposition que l&apos;on peut refuser, un
        score qui bouge pour une raison explicable, un retry qui ne duplique pas
        les effets.
      </p>

      <ConceptCard
        title="Les arbitrages qui ont le plus compté"
        description="Ce sont rarement les choix les plus visibles qui font tenir l'expérience."
        category="architecture"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>
            Phaser le prompt plutot que demander au modele de tout faire avec
            une seule instruction globale.
          </li>
          <li>
            Utiliser les tools comme contrats metier, pas comme simples helpers.
          </li>
          <li>
            Garder le chat et la preview dans le meme espace visuel.
          </li>
          <li>
            Synchroniser panel et conversation dans les deux sens.
          </li>
          <li>
            Calculer les scores critiques au lieu de les faire inventer.
          </li>
          <li>
            Penser retry, interruption et idempotence des le debut.
          </li>
        </ul>
      </ConceptCard>

      <h2 id="checklist">Checklist pour un SaaS IA conversationnel</h2>
      <div className="not-prose my-8 grid gap-3 sm:grid-cols-2">
        {checklistItems.map((item, index) => (
          <div
            key={item.title}
            className="rounded-xl border border-border/70 bg-card p-4 shadow-sm transition-colors hover:border-primary/35 hover:bg-primary/5"
          >
            <div className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  {item.title}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 id="conclusion">Conclusion</h2>
      <p>
        Construire un SaaS IA conversationnel avec Next.js, React et AI SDK ne
        consiste pas a ajouter un chat sur une app existante. C&apos;est concevoir
        un systeme ou le langage, l&apos;etat, l&apos;UI et les effets metier doivent
        rester coherents.
      </p>

      <p>
        <ExternalLink href={externalLinks.vitamcv}>VitamCV</ExternalLink> sert
        ici de cas concret parce que le domaine force la rigueur : un CV contient
        des donnees personnelles, des formulations sensibles, des preuves a
        respecter, un scoring a expliquer et un document final a produire. Mais
        les patterns sont reutilisables ailleurs : assistants metier, outils
        internes, onboarding intelligent, audit documentaire, workflows RH ou
        legal tech.
      </p>

      <p>
        Pour voir le principe cote utilisateur, le plus simple est de passer par
        le{' '}
        <ExternalLink href={externalLinks.vitamcvScanner}>
          scanner gratuit VitamCV
        </ExternalLink>
        . C&apos;est volontairement le point d&apos;entree le moins frictionnel :
        on part d&apos;un CV existant, puis on observe ce que le systeme peut
        extraire, scorer et expliquer.
      </p>

      <p>
        Le bon critere n&apos;est donc pas “est-ce que le modele repond bien ?”.
        C&apos;est plutot : est-ce que le produit sait quoi faire de cette reponse,
        comment la montrer, comment la verifier, et comment recuperer quand le
        monde reel interrompt le joli stream de la demo ?
      </p>
    </>
  );
}
