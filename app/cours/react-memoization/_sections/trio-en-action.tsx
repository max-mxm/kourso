import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function TrioEnActionSection() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground leading-relaxed">
        Individuellement, chaque outil de memoisation a un role precis. Mais leur veritable puissance
        se revele quand ils travaillent ensemble. Cette section presente un scenario complet
        de production ou React.memo, useMemo et useCallback collaborent pour optimiser un
        tableau de bord avec des interactions frequentes.
      </p>

      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-xl font-bold text-foreground mb-3">Le scenario : un tableau de bord analytique</h3>
        <p className="text-foreground/80 leading-relaxed">
          Imaginons un tableau de bord avec un compteur de notifications en temps reel,
          une liste de 5 000 transactions filtrable, et un graphique statistique couteux a rendre.
          L&apos;utilisateur clique frequemment sur le bouton de notifications.
          Sans memoisation, chaque clic relance le filtrage des 5 000 lignes et le rendu du graphique.
        </p>
      </div>

      <CodeBlock
        code={`// VERSION SANS MEMOISATION
// Chaque clic sur "notifications" re-rend TOUT

import { useState } from 'react';

interface Transaction {
  id: string;
  label: string;
  amount: number;
  date: string;
  category: 'income' | 'expense';
}

// ---------- Composant Parent ----------
function AnalyticsDashboard() {
  const [notifications, setNotifications] = useState(0);
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [transactions] = useState<Transaction[]>(
    generateTransactions(5000) // 5 000 transactions
  );

  // PROBLEME 1 : Ce calcul se relance a CHAQUE render
  // y compris quand on clique sur notifications
  const filteredTransactions = transactions
    .filter(t => filter === 'all' || t.category === filter)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(t => ({
      ...t,
      displayAmount: new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      }).format(t.amount),
    }));
  // ~45ms pour 5000 elements

  // PROBLEME 2 : Nouvel objet a chaque render
  const stats = {
    total: filteredTransactions.reduce((sum, t) => sum + t.amount, 0),
    count: filteredTransactions.length,
    average: filteredTransactions.length > 0
      ? filteredTransactions.reduce((sum, t) => sum + t.amount, 0) / filteredTransactions.length
      : 0,
  };

  // PROBLEME 3 : Nouvelle fonction a chaque render
  const handleTransactionClick = (id: string) => {
    console.log('Transaction selectionnee:', id);
  };

  console.log('Dashboard render - tout se re-execute');

  return (
    <div>
      <header>
        <button onClick={() => setNotifications(n => n + 1)}>
          Notifications ({notifications})
        </button>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value as typeof filter)}
        >
          <option value="all">Toutes</option>
          <option value="income">Revenus</option>
          <option value="expense">Depenses</option>
        </select>
      </header>

      {/* Tout se re-rend a chaque clic sur notifications */}
      <StatsChart stats={stats} />
      <TransactionList
        transactions={filteredTransactions}
        onItemClick={handleTransactionClick}
      />
    </div>
  );
}

// Ces composants se re-rendent systematiquement
function StatsChart({ stats }: { stats: { total: number; count: number; average: number } }) {
  console.log('StatsChart render - rendu SVG couteux...');
  // Rendu d'un graphique SVG complexe (~30ms)
  return <div>Graphique : {stats.count} transactions</div>;
}

function TransactionList({
  transactions,
  onItemClick,
}: {
  transactions: Array<Transaction & { displayAmount: string }>;
  onItemClick: (id: string) => void;
}) {
  console.log('TransactionList render -', transactions.length, 'lignes');
  return (
    <ul>
      {transactions.map(t => (
        <li key={t.id} onClick={() => onItemClick(t.id)}>
          {t.label} : {t.displayAmount}
        </li>
      ))}
    </ul>
  );
}

// Console apres clic sur Notifications :
// Dashboard render - tout se re-execute    (~45ms calcul)
// StatsChart render - rendu SVG couteux... (~30ms rendu)
// TransactionList render - 5000 lignes     (~20ms rendu)
// TOTAL : ~95ms par clic = lag perceptible`}
        language="tsx"
        filename="dashboard-sans-memo.tsx"
        highlightLines={[24, 25, 37, 46, 49, 69, 70, 100, 101, 102, 103]}
        category="optimization"
      />

      <CodeBlock
        code={`// VERSION AVEC MEMOISATION
// Chaque outil a un role precis dans l'optimisation

import { memo, useCallback, useMemo, useState } from 'react';

interface Transaction {
  id: string;
  label: string;
  amount: number;
  date: string;
  category: 'income' | 'expense';
}

// ---------- Composant Parent ----------
function AnalyticsDashboard() {
  const [notifications, setNotifications] = useState(0);
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [transactions] = useState<Transaction[]>(
    generateTransactions(5000)
  );

  // SOLUTION 1 : useMemo pour le calcul couteux
  // Ne recalcule QUE quand transactions ou filter changent
  // Cliquer sur notifications ne relance PAS ce calcul
  const filteredTransactions = useMemo(() => {
    console.log('Recalcul filteredTransactions...');
    return transactions
      .filter(t => filter === 'all' || t.category === filter)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(t => ({
        ...t,
        displayAmount: new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'EUR',
        }).format(t.amount),
      }));
  }, [transactions, filter]);

  // SOLUTION 2 : useMemo pour stabiliser la reference objet
  // stats est derive de filteredTransactions
  // Meme reference tant que filteredTransactions ne change pas
  const stats = useMemo(() => ({
    total: filteredTransactions.reduce((sum, t) => sum + t.amount, 0),
    count: filteredTransactions.length,
    average: filteredTransactions.length > 0
      ? filteredTransactions.reduce((sum, t) => sum + t.amount, 0) / filteredTransactions.length
      : 0,
  }), [filteredTransactions]);

  // SOLUTION 3 : useCallback pour stabiliser la reference fonction
  // handleTransactionClick garde la meme reference entre les renders
  const handleTransactionClick = useCallback((id: string) => {
    console.log('Transaction selectionnee:', id);
  }, []);

  console.log('Dashboard render');

  return (
    <div>
      <header>
        <button onClick={() => setNotifications(n => n + 1)}>
          Notifications ({notifications})
        </button>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value as typeof filter)}
        >
          <option value="all">Toutes</option>
          <option value="income">Revenus</option>
          <option value="expense">Depenses</option>
        </select>
      </header>

      {/* React.memo empeche le re-render si les props sont stables */}
      <MemoizedStatsChart stats={stats} />
      <MemoizedTransactionList
        transactions={filteredTransactions}
        onItemClick={handleTransactionClick}
      />
    </div>
  );
}

// SOLUTION 4 : React.memo sur les composants enfants
// Ne se re-rend que si stats change (reference stable grace a useMemo)
const MemoizedStatsChart = memo(function StatsChart({
  stats,
}: {
  stats: { total: number; count: number; average: number };
}) {
  console.log('StatsChart render');
  return <div>Graphique : {stats.count} transactions</div>;
});

// Ne se re-rend que si transactions ou onItemClick changent
const MemoizedTransactionList = memo(function TransactionList({
  transactions,
  onItemClick,
}: {
  transactions: Array<Transaction & { displayAmount: string }>;
  onItemClick: (id: string) => void;
}) {
  console.log('TransactionList render -', transactions.length, 'lignes');
  return (
    <ul>
      {transactions.map(t => (
        <li key={t.id} onClick={() => onItemClick(t.id)}>
          {t.label} : {t.displayAmount}
        </li>
      ))}
    </ul>
  );
});

// Console apres clic sur Notifications :
// Dashboard render                        (~0.3ms)
//
// C'est TOUT. StatsChart et TransactionList ne se re-rendent PAS.
// useMemo retourne les valeurs en cache, useCallback la meme reference.
// React.memo compare les props : identiques -> pas de re-render.
//
// Console apres changement de filtre :
// Dashboard render
// Recalcul filteredTransactions...         (~45ms, necessaire)
// StatsChart render                        (~30ms, necessaire)
// TransactionList render - 3200 lignes     (~15ms, necessaire)
// Les re-renders sont limites aux cas ou les donnees changent reellement.`}
        language="tsx"
        filename="dashboard-avec-memo.tsx"
        highlightLines={[25, 26, 38, 42, 43, 53, 54, 78, 79, 88, 89, 96, 115, 116, 117, 118]}
        category="optimization"
      />

      <ConceptCard
        title="Trace d&apos;execution : que se passe-t-il exactement ?"
        description="Quand l'utilisateur clique sur 'Notifications', voici le cheminement precis de React a travers le code optimise."
        category="optimization"
      >
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-background/50 border border-border/50">
            <h4 className="font-bold text-foreground text-sm mb-1">Etape 1 : setState declenche le render</h4>
            <p className="text-xs text-muted-foreground">
              setNotifications(n =&gt; n + 1) marque AnalyticsDashboard pour re-render.
              React re-execute la fonction composant.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-background/50 border border-border/50">
            <h4 className="font-bold text-foreground text-sm mb-1">Etape 2 : useMemo verifie ses dependances</h4>
            <p className="text-xs text-muted-foreground">
              [transactions, filter] n&apos;ont pas change (notifications n&apos;est pas dans les deps).
              useMemo retourne le resultat en cache sans recalculer. Meme chose pour stats.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-background/50 border border-border/50">
            <h4 className="font-bold text-foreground text-sm mb-1">Etape 3 : useCallback retourne la meme reference</h4>
            <p className="text-xs text-muted-foreground">
              Les dependances de handleTransactionClick ([]) n&apos;ont pas change.
              useCallback retourne la meme reference de fonction.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-background/50 border border-border/50">
            <h4 className="font-bold text-foreground text-sm mb-1">Etape 4 : React.memo compare les props</h4>
            <p className="text-xs text-muted-foreground">
              MemoizedStatsChart : stats est la meme reference -&gt; pas de re-render.
              MemoizedTransactionList : transactions et onItemClick sont les memes references -&gt; pas de re-render.
              Seul le header se met a jour pour afficher le nouveau compteur.
            </p>
          </div>
        </div>
      </ConceptCard>

      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-xl font-bold text-foreground mb-3">Comparaison des performances</h3>
        <p className="text-foreground/80 leading-relaxed">
          Sur ce scenario avec 5 000 transactions, le gain est significatif.
          Sans memoisation, chaque clic sur le bouton de notifications coute environ 95ms
          (calcul + rendu graphique + rendu liste). Avec memoisation, le meme clic coute
          environ 0,3ms : seul le composant parent se re-execute, et les enfants sont sautes.
          C&apos;est un facteur d&apos;amelioration de plus de 300x sur cette interaction specifique.
        </p>
      </div>
    </div>
  );
}
