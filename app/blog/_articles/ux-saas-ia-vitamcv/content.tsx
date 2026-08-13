import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';
import { ConceptCard } from '@/components/course/concept-card';

export default function UxSaasIaVitamcvContent() {
  return (
    <>
      <h2 id="introduction">Introduction</h2>
      <p>
        Beaucoup de produits IA commencent par une zone de texte, un historique
        de messages et un bouton envoyer. C&apos;est suffisant pour une demo.
        Ce n&apos;est pas suffisant pour un SaaS qui doit transformer une
        intention floue en resultat fiable.
      </p>

      <p>
        VitamCV part d&apos;un cas volontairement difficile : aider une personne
        a construire un CV, analyser une offre, extraire ses experiences,
        reformuler sans inventer, calculer un score, puis generer un document
        exploitable. Le produit embarque du chat, de l&apos;AI SDK, Next.js, une
        base Supabase, du state temps reel, des composants UI metier et une
        couche de securite.
      </p>

      <ConceptCard
        title="Le vrai sujet"
        description="Un SaaS IA utile ne repond pas seulement. Il collecte, structure, valide et produit un artefact final."
        category="architecture"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>Le chat sert a comprendre le contexte utilisateur.</li>
          <li>Les tools transforment les intentions en actions controlees.</li>
          <li>L&apos;interface garde l&apos;utilisateur dans la boucle.</li>
          <li>Le document final doit rester fiable, exportable et relisible.</li>
        </ul>
      </ConceptCard>

      <h2 id="pas-un-chatbot">Ce n&apos;est pas juste un chatbot</h2>
      <p>
        Un chatbot classique peut donner des conseils. Un generateur de CV doit
        faire davantage : reconnaitre les informations utiles, poser les bonnes
        questions, eviter les hallucinations, conserver les donnees, puis
        produire un fichier propre.
      </p>

      <ComparisonTable
        modes={[
          {
            name: 'Chat IA generique',
            description: 'Une conversation libre, peu structuree',
            pros: ['Rapide a prototyper', 'Flexible', 'Peu de contraintes UI'],
            cons: [
              'Sortie difficile a fiabiliser',
              'Peu de controle sur les donnees',
              'Risque de reformulations inventees',
            ],
            useCases: ['Brainstorming', 'Aide ponctuelle', 'Support simple'],
            color: 'rgb(14, 165, 233)',
          },
          {
            name: 'SaaS IA metier',
            description: 'Conversation, actions typees et interface specialisee',
            pros: [
              'Donnees persistantes',
              'Validation humaine',
              'Resultat final exploitable',
            ],
            cons: [
              'Architecture plus exigeante',
              'Besoin de garde-fous',
              'UX plus difficile a dessiner',
            ],
            useCases: ['CV', 'Legal tech', 'Finance', 'Outils internes IA'],
            color: 'rgb(124, 58, 237)',
          },
        ]}
      />

      <h2 id="architecture-produit">Architecture produit</h2>
      <p>
        Dans VitamCV, le chat n&apos;est qu&apos;une entree. L&apos;experience
        repose sur une architecture split-view : conversation d&apos;un cote,
        panneau de donnees et preview CV de l&apos;autre. L&apos;utilisateur voit
        son profil se construire pendant qu&apos;il parle.
      </p>

      <CodeBlock
        code={`Chat assistant-ui
  -> POST /api/chat
  -> AI SDK streamText()
  -> tools metier
  -> Supabase + Zustand
  -> panneau profil + preview CV
  -> generation DOCX / PDF`}
        language="bash"
        filename="architecture-vitamcv.txt"
        category="architecture"
      />

      <p>
        Cette separation change tout. Le chat reste naturel, mais le produit ne
        depend pas d&apos;une reponse texte fragile. Les donnees importantes
        passent par des tools explicites, typés et affiches dans l&apos;UI.
      </p>

      <h2 id="phases-conversation">Les phases conversationnelles</h2>
      <p>
        La conversation suit plusieurs phases : onboarding, extraction,
        exploration, validation. Chaque phase change le comportement du modele.
        En extraction, on cherche la fiabilite. En exploration, on veut aider
        l&apos;utilisateur a retrouver des details et des resultats concrets. En
        validation, on verrouille la qualite.
      </p>

      <ConceptCard
        title="Pourquoi phaser le prompt ?"
        description="Le meme prompt ne peut pas etre bon a la fois pour accueillir, extraire, coacher et valider."
        category="architecture"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>Onboarding : ton humain, peu de contraintes.</li>
          <li>Extraction : appels tools rapides et deterministes.</li>
          <li>Exploration : questions courtes, recherche de preuves.</li>
          <li>Validation : reformulations controlees et accord utilisateur.</li>
        </ul>
      </ConceptCard>

      <h2 id="tool-ui">Tool UI et validation humaine</h2>
      <p>
        Le tool calling devient vraiment utile quand il est visible. VitamCV ne
        cache pas tout dans une reponse assistant. Certaines actions produisent
        une interface : carte de score, analyse d&apos;offre, comparaison
        avant/apres, validation section par section.
      </p>

      <CodeBlock
        code={`const tools = {
  updateProfile,      // ecrit une section du CV
  validateSection,   // demande une validation humaine
  analyzeJobPosting, // extrait les exigences d'une offre
  computeScore,      // calcule un score programmatique
  generateDocument,  // produit le DOCX ou le PDF
};`}
        language="typescript"
        filename="tools.ts"
        category="architecture"
      />

      <p>
        Le point important : le LLM propose, mais l&apos;utilisateur garde le
        controle. Pour un CV, c&apos;est essentiel. Une phrase trop brillante
        mais fausse peut nuire au candidat. Une bonne UX IA doit donc rendre les
        propositions modifiables, refusables et traçables.
      </p>

      <h2 id="preview-temps-reel">Preview CV en temps reel</h2>
      <p>
        La preview est plus qu&apos;un bonus visuel. Elle transforme une
        conversation abstraite en progression visible. Quand une experience est
        ajoutee, quand un score change, quand une competence apparait,
        l&apos;utilisateur comprend ce que le systeme fait.
      </p>

      <p>
        C&apos;est aussi une maniere de reduire la magie noire. Un SaaS IA doit
        expliquer son travail par son interface. La confiance vient moins du
        modele que de la clarte du flux : source, transformation, validation,
        resultat.
      </p>

      <h2 id="checklist">Checklist pour un SaaS IA utile</h2>
      <ConceptCard
        title="Les questions a poser avant de shipper"
        description="Une interface IA doit etre pensee comme un systeme produit complet."
        category="architecture"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>Quelles actions le modele a-t-il vraiment le droit de faire ?</li>
          <li>Chaque tool a-t-il un schema d&apos;entree strict ?</li>
          <li>Les donnees sensibles restent-elles cote serveur ?</li>
          <li>Le score est-il calcule ou invente par le modele ?</li>
          <li>L&apos;utilisateur peut-il corriger avant la sortie finale ?</li>
          <li>Le produit fonctionne-t-il encore si le modele se trompe ?</li>
        </ul>
      </ConceptCard>

      <h2 id="conclusion">Conclusion</h2>
      <p>
        VitamCV m&apos;a confirme une conviction simple : le futur des apps IA
        ne sera pas seulement conversationnel. Il sera structure. Les meilleurs
        produits IA combinent chat, tools, validation, preview, securite et
        generation d&apos;artefacts.
      </p>

      <p>
        Si vous construisez un SaaS IA avec Next.js, ne commencez pas par
        demander quel modele utiliser. Commencez par definir ce que le modele a
        le droit de changer, ce que l&apos;utilisateur doit valider, et comment
        votre interface rend chaque etape comprehensible.
      </p>

      <p>
        C&apos;est exactement la direction de VitamCV : un generateur de CV IA qui
        ne se contente pas de produire du texte, mais accompagne la personne
        jusqu&apos;a un document fiable, adapte et exportable.
      </p>
    </>
  );
}
