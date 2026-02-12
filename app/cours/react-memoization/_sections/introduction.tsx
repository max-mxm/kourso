import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function IntroductionSection() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground leading-relaxed">
        React fournit trois outils de memoisation pour optimiser les performances de vos applications :
        <strong className="text-foreground"> React.memo</strong>, <strong className="text-foreground">useMemo</strong> et
        <strong className="text-foreground"> useCallback</strong>. Chacun intervient a un niveau different du cycle de rendu.
        Comprendre quand et pourquoi les utiliser est essentiel pour ecrire du code React performant
        sans tomber dans le piege de la sur-optimisation.
      </p>

      <ConceptCard
        title="Le trio de la memoisation"
        description="React propose trois mecanismes complementaires. Chacun resout un probleme specifique dans le pipeline de rendu."
        category="fundamentals"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground mb-1">React.memo</h4>
                <p className="text-sm text-muted-foreground">
                  Higher-Order Component qui empeche le re-render d&apos;un composant si ses props n&apos;ont pas change.
                  Agit au niveau du composant entier.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-blue-500/20">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground mb-1">useMemo</h4>
                <p className="text-sm text-muted-foreground">
                  Hook qui met en cache le resultat d&apos;un calcul entre les renders.
                  Agit au niveau d&apos;une valeur calculee.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-purple-500/20">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground mb-1">useCallback</h4>
                <p className="text-sm text-muted-foreground">
                  Hook qui met en cache une definition de fonction entre les renders.
                  Agit au niveau d&apos;une reference de fonction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ConceptCard>

      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-xl font-bold text-foreground mb-3">Pourquoi la memoisation existe-t-elle ?</h3>
        <p className="text-foreground/80 leading-relaxed">
          Par defaut, quand un composant parent se re-rend, tous ses enfants se re-rendent egalement,
          meme si leurs props n&apos;ont pas change. Dans la plupart des cas, React est suffisamment rapide
          pour que cela ne pose aucun probleme. Mais lorsqu&apos;un composant effectue un calcul couteux,
          rend une longue liste, ou passe des callbacks a des enfants complexes, ces re-renders
          inutiles peuvent degrader l&apos;experience utilisateur.
        </p>
      </div>

      <CodeBlock
        code={`// Probleme : ce composant se re-rend a chaque changement du parent
// meme si "user" n'a pas change

interface UserCardProps {
  user: { name: string; email: string };
}

function UserCard({ user }: UserCardProps) {
  // Ce console.log s'affiche a CHAQUE render du parent
  console.log('UserCard render:', user.name);

  // Imaginons un calcul couteux ici...
  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(new Date());

  return (
    <div className="p-4 border rounded-lg">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <span>{formattedDate}</span>
    </div>
  );
}

// Le parent : chaque clic sur le bouton re-rend UserCard
function Dashboard() {
  const [count, setCount] = useState(0);
  const user = { name: 'Alice Dupont', email: 'alice@example.com' };

  return (
    <div>
      {/* Ce bouton modifie count, pas user */}
      <button onClick={() => setCount(c => c + 1)}>
        Compteur : {count}
      </button>

      {/* Pourtant UserCard se re-rend a chaque clic */}
      <UserCard user={user} />
    </div>
  );
}`}
        language="tsx"
        filename="dashboard.tsx"
        highlightLines={[10, 11, 32, 39]}
        category="fundamentals"
      />

      <ConceptCard
        title="Ce que vous apprendrez dans ce cours"
        description="Un parcours complet pour maitriser la memoisation React, de la theorie a la pratique en production."
        category="fundamentals"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5 flex-shrink-0">01</span>
            <span>Comprendre le mecanisme de re-render et identifier quand il devient problematique</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5 flex-shrink-0">02</span>
            <span>Maitriser React.memo et la comparaison superficielle des props</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5 flex-shrink-0">03</span>
            <span>Utiliser useMemo pour les calculs couteux et la stabilisation de references</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5 flex-shrink-0">04</span>
            <span>Appliquer useCallback pour stabiliser les fonctions passees en props</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5 flex-shrink-0">05</span>
            <span>Combiner les trois outils dans un scenario complet de production</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5 flex-shrink-0">06</span>
            <span>Eviter les erreurs courantes et savoir quand ne pas memoiser</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5 flex-shrink-0">07</span>
            <span>Decouvrir le React Compiler et l&apos;avenir de la memoisation automatique</span>
          </li>
        </ul>
      </ConceptCard>
    </div>
  );
}
