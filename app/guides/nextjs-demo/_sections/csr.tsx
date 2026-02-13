import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { Check } from 'lucide-react';

export default function CSRSection() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="space-y-4">
        <p className="text-lg text-foreground/90 leading-relaxed">
          Le <strong>Client-Side Rendering (CSR)</strong> envoie un HTML quasi-vide au navigateur.
          Le JavaScript se charge ensuite, fetch les données côté client, puis affiche le contenu final.
          Le serveur Next.js ne fait que servir des fichiers statiques.
        </p>
      </div>

      {/* Analogie IKEA */}
      <ConceptCard
        title="Analogie : Le meuble IKEA"
        description="Imaginez recevoir un carton plat contenant toutes les pièces détachées d'un meuble. Le serveur vous envoie le carton (HTML vide + JS), puis vous assemblez tout chez vous (navigateur). Le meuble final apparaît seulement après assemblage complet."
        category="rendering"
      >
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
            <span>Carton plat = HTML minimal (~2KB)</span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
            <span>Instructions = JavaScript bundle (~200KB)</span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
            <span>Assemblage = Exécution dans le navigateur</span>
          </div>
        </div>
      </ConceptCard>

      {/* Cycle de vie détaillé */}
      <ConceptCard
        title="Cycle de vie du CSR"
        description="Voici ce qui se passe réellement lorsqu'un utilisateur charge une page CSR dans Next.js."
        category="rendering"
      >
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center flex-shrink-0 font-bold text-xs">
              1
            </div>
            <div>
              <div className="font-medium text-foreground">Requête initiale</div>
              <div className="text-muted-foreground">Navigateur demande la page au serveur Next.js</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center flex-shrink-0 font-bold text-xs">
              2
            </div>
            <div>
              <div className="font-medium text-foreground">HTML minimal (~2KB)</div>
              <div className="text-muted-foreground">Serveur renvoie un squelette avec <code className="text-xs bg-muted px-1 py-0.5 rounded">&lt;div id=&quot;root&quot;&gt;&lt;/div&gt;</code></div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center flex-shrink-0 font-bold text-xs">
              3
            </div>
            <div>
              <div className="font-medium text-foreground">Download JS (~200KB)</div>
              <div className="text-muted-foreground">Téléchargement du bundle React + Next.js + votre code</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center flex-shrink-0 font-bold text-xs">
              4
            </div>
            <div>
              <div className="font-medium text-foreground">Exécution JavaScript</div>
              <div className="text-muted-foreground">React monte le composant et exécute <code className="text-xs bg-muted px-1 py-0.5 rounded">useEffect</code></div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center flex-shrink-0 font-bold text-xs">
              5
            </div>
            <div>
              <div className="font-medium text-foreground">Fetch client</div>
              <div className="text-muted-foreground">Appel API depuis le navigateur pour récupérer les données</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center flex-shrink-0 font-bold text-xs">
              6
            </div>
            <div>
              <div className="font-medium text-foreground">Contenu visible (2-3 secondes)</div>
              <div className="text-muted-foreground">L'utilisateur voit enfin le contenu final</div>
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* Exemple de code */}
      <CodeBlock
        code={`'use client';

import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch côté client au montage du composant
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Erreur fetch:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []); // Exécuté une seule fois après le premier render

  if (loading) {
    return <div>Chargement des utilisateurs...</div>;
  }

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}`}
        language="tsx"
        filename="app/users/page.tsx"
        highlightLines={[1, 15, 26]}
        category="rendering"
      />

      {/* Performance */}
      <ConceptCard
        title="Caractéristiques de performance"
        description="Le CSR offre un compromis spécifique entre rapidité initiale et temps d'affichage final."
        category="rendering"
      >
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
            <div>
              <span className="font-medium text-foreground">TTFB rapide</span>
              <span className="text-muted-foreground"> - Le serveur répond instantanément avec du HTML vide</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 text-orange-500 flex-shrink-0" />
            <div>
              <span className="font-medium text-foreground">FCP lent</span>
              <span className="text-muted-foreground"> - First Contentful Paint retardé par le téléchargement et l'exécution JS</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 text-red-500 flex-shrink-0" />
            <div>
              <span className="font-medium text-foreground">SEO limité</span>
              <span className="text-muted-foreground"> - Les robots voient un HTML vide (sauf si rendu dynamique activé)</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
            <div>
              <span className="font-medium text-foreground">Interactivité maximale</span>
              <span className="text-muted-foreground"> - Toute la logique React est disponible immédiatement après hydratation</span>
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* Quand utiliser */}
      <ConceptCard
        title="Quand utiliser le CSR ?"
        description="Le Client-Side Rendering brille dans des contextes spécifiques où l'interactivité prime sur le SEO."
        category="rendering"
      >
        <div className="space-y-3 text-sm">
          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="font-medium text-foreground mb-2">Cas d'usage idéaux</div>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                <span><strong>Dashboards privés</strong> - Zones protégées par authentification (pas besoin de SEO)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                <span><strong>Applications interactives</strong> - Outils, calculateurs, éditeurs en temps réel</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                <span><strong>Pages avec données en temps réel</strong> - Chats, notifications, live feeds</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                <span><strong>PWAs (Progressive Web Apps)</strong> - Applications web installables</span>
              </li>
            </ul>
          </div>
        </div>
      </ConceptCard>

      {/* Pièges à éviter */}
      <div className="border-2 border-red-500/30 rounded-lg p-6 bg-red-500/5">
        <h3 className="text-lg font-bold text-red-500 mb-4">Pièges à éviter avec CSR</h3>
        <div className="space-y-4 text-sm">
          <div className="space-y-2">
            <div className="font-medium text-foreground">1. Tout mettre en CSR</div>
            <div className="text-muted-foreground">
              Évitez de marquer toute votre application avec <code className="text-xs bg-muted px-1 py-0.5 rounded">'use client'</code>.
              Privilégiez le rendu serveur par défaut et isolez uniquement les composants interactifs.
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-foreground">2. Oublier les états de loading</div>
            <div className="text-muted-foreground">
              Toujours afficher un skeleton ou spinner pendant le fetch. L'utilisateur ne doit jamais voir une page blanche.
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-foreground">3. Abuser de useEffect</div>
            <div className="text-muted-foreground">
              Évitez les chaînes de <code className="text-xs bg-muted px-1 py-0.5 rounded">useEffect</code> qui dépendent les uns des autres.
              Cela crée des cascades de requêtes et ralentit la page. Privilégiez React Query ou SWR pour gérer le cache.
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-foreground">4. Ignorer les erreurs de fetch</div>
            <div className="text-muted-foreground">
              Toujours gérer les cas d'erreur avec des try/catch et afficher un message clair à l'utilisateur.
              Ne laissez jamais l'interface dans un état indéfini.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
