'use client';

import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';
import { ComparisonTable } from '@/components/course/comparison-table';
import { Check, X } from 'lucide-react';

export function BackendPerformanceSection() {
  const queryOptimizationModes = [
    {
      name: 'N+1 Queries',
      description: 'Requêtes séquentielles pour chaque relation',
      pros: ['Code simple', 'Facile à comprendre'],
      cons: ['101 queries SQL', 'Temps : 1250ms', 'Scalabilité impossible'],
      useCases: ['Jamais en production', 'Prototype rapide uniquement'],
      color: 'rgb(239, 68, 68)'
    },
    {
      name: 'Query avec Include',
      description: 'Une seule requête avec JOIN',
      pros: ['1 query SQL', 'Temps : 45ms', 'Amélioration 20x-100x'],
      cons: ['Nécessite planification', 'Schéma relationnel requis'],
      useCases: ['Production recommandée', 'Toute relation parent-enfant'],
      color: 'rgb(34, 197, 94)'
    }
  ];

  const indexTypes = [
    {
      name: 'B-tree Index',
      description: 'Index standard pour égalité et ranges',
      pros: ['O(log n) vs O(n)', 'Supporte <, >, =, BETWEEN', 'Amélioration 100x-1000x'],
      cons: ['Espace disque', 'Ralentit INSERT/UPDATE'],
      useCases: ['Colonnes WHERE fréquentes', 'Foreign keys', 'ORDER BY'],
      color: 'rgb(59, 130, 246)'
    },
    {
      name: 'Partial Index',
      description: 'Index conditionnel sur sous-ensemble de données',
      pros: ['Moins d\'espace disque', 'Plus rapide', 'Ciblé sur cas fréquents'],
      cons: ['Requiert prédiction du pattern', 'Pas utilisé si WHERE différent'],
      useCases: ['status = "active"', 'deleted_at IS NULL', 'Filtres récurrents'],
      color: 'rgb(249, 115, 22)'
    },
    {
      name: 'Composite Index',
      description: 'Index sur plusieurs colonnes (ordre important)',
      pros: ['Optimise queries multi-colonnes', 'Couvre plusieurs cas'],
      cons: ['Ordre critique', 'Taille importante', 'Maintenance complexe'],
      useCases: ['WHERE a = ? AND b = ?', 'ORDER BY a, b', 'Groupes fréquents'],
      color: 'rgb(168, 85, 247)'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Les optimisations backend ont un impact direct sur TTFB et LCP. Une requête lente peut
          bloquer tout le rendu de la page. Voici les techniques essentielles pour améliorer
          les performances côté serveur.
        </p>
      </div>

      {/* N+1 Query Problem */}
      <ConceptCard
        title="Le Problème N+1 : L'Erreur la Plus Coûteuse"
        description="Le problème N+1 survient quand on fait une requête par élément dans une boucle. C'est l'anti-pattern le plus fréquent et le plus facile à corriger."
        category="optimization"
      >
        <div className="space-y-6">
          {/* Comparaison visuelle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <div className="flex items-center gap-2 mb-3">
                <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                <h4 className="font-bold text-red-600 dark:text-red-400">N+1 Queries</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="font-mono text-xs p-2 rounded bg-background/50">
                  SELECT * FROM posts LIMIT 100
                </div>
                <div className="font-mono text-xs p-2 rounded bg-background/50 opacity-60">
                  SELECT * FROM users WHERE id = 1
                </div>
                <div className="font-mono text-xs p-2 rounded bg-background/50 opacity-60">
                  SELECT * FROM users WHERE id = 2
                </div>
                <div className="text-center text-muted-foreground">... x100</div>
                <div className="font-mono text-xs p-2 rounded bg-background/50 opacity-60">
                  SELECT * FROM users WHERE id = 100
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-red-500/20">
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  101 queries • 1250ms
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h4 className="font-bold text-green-600 dark:text-green-400">Query avec Include</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="font-mono text-xs p-2 rounded bg-background/50">
                  SELECT posts.*, users.*
                </div>
                <div className="font-mono text-xs p-2 rounded bg-background/50">
                  FROM posts
                </div>
                <div className="font-mono text-xs p-2 rounded bg-background/50">
                  LEFT JOIN users ON posts.user_id = users.id
                </div>
                <div className="font-mono text-xs p-2 rounded bg-background/50">
                  LIMIT 100
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-green-500/20">
                <p className="text-sm font-bold text-green-600 dark:text-green-400">
                  1 query • 45ms
                </p>
              </div>
            </div>
          </div>

          {/* Code examples */}
          <div>
            <h4 className="font-bold text-foreground mb-3">Exemple avec Prisma</h4>
            <CodeBlock
              code={`// ❌ MAUVAIS : N+1 Problem
export async function getPosts() {
  const posts = await db.post.findMany({ take: 100 });

  // ⚠️ 100 requêtes supplémentaires !
  const postsWithAuthors = await Promise.all(
    posts.map(async (post) => ({
      ...post,
      author: await db.user.findUnique({ where: { id: post.userId } })
    }))
  );

  return postsWithAuthors;
}
// Résultat : 101 queries, 1250ms

// ✅ BON : Include
export async function getPosts() {
  const posts = await db.post.findMany({
    take: 100,
    include: {
      author: true, // JOIN automatique
      comments: {
        include: {
          author: true // Nested include
        }
      }
    }
  });

  return posts;
}
// Résultat : 1 query, 45ms

// Impact : Amélioration de 27x (1250ms → 45ms)`}
              language="tsx"
              filename="app/lib/queries.ts"
              highlightLines={[5, 6, 7, 8, 9, 10, 21, 22, 23, 24, 25, 26, 27]}
              category="optimization"
            />
          </div>

          <ComparisonTable modes={queryOptimizationModes} />
        </div>
      </ConceptCard>

      {/* Database Indexing */}
      <ConceptCard
        title="Database Indexing : De O(n) à O(log n)"
        description="Les index transforment des scans séquentiels (lents) en recherches arborescentes (rapides). Un index bien placé peut améliorer une requête de 100x à 1000x."
        category="optimization"
      >
        <div className="space-y-6">
          {/* Types d'index */}
          <div>
            <h4 className="font-bold text-foreground mb-3">Types d'Index et Cas d'Usage</h4>
            <ComparisonTable modes={indexTypes} />
          </div>

          {/* B-tree Index */}
          <div>
            <h4 className="font-bold text-foreground mb-3">1. B-tree Index : L'Index Standard</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                <h5 className="font-bold text-red-600 dark:text-red-400 mb-2">Sans Index (Seq Scan)</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Scan séquentiel : O(n)</li>
                  <li>• 100,000 rows scannées</li>
                  <li>• Temps : 450ms</li>
                  <li>• CPU : 100%</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                <h5 className="font-bold text-green-600 dark:text-green-400 mb-2">Avec B-tree Index</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Index Scan : O(log n)</li>
                  <li>• 45 rows scannées</li>
                  <li>• Temps : 3ms</li>
                  <li>• CPU : 5%</li>
                </ul>
              </div>
            </div>
            <CodeBlock
              code={`-- Exemple : Recherche d'inspections par compte
-- Sans index :
SELECT * FROM property_inspections
WHERE account_id = '123';
-- Seq Scan sur 100,000 rows : 450ms

-- Créer un index B-tree
CREATE INDEX idx_inspections_account_id
ON property_inspections(account_id);

-- Avec index :
SELECT * FROM property_inspections
WHERE account_id = '123';
-- Index Scan sur 45 rows : 3ms

-- Amélioration : 150x plus rapide`}
              language="sql"
              filename="migrations/add-index.sql"
              highlightLines={[8, 9]}
              category="optimization"
            />
          </div>

          {/* Partial Index */}
          <div>
            <h4 className="font-bold text-foreground mb-3">2. Partial Index : Index Conditionnel</h4>
            <CodeBlock
              code={`-- Cas d'usage : Filtrer uniquement les inspections actives
-- 90% des requêtes cherchent status IN ('draft', 'pending')
-- 10% cherchent status = 'completed'

-- ❌ MAUVAIS : Index complet (indexe aussi les 'completed')
CREATE INDEX idx_inspections_account_status
ON property_inspections(account_id, status);
-- Taille : 12 MB

-- ✅ BON : Partial Index (indexe uniquement les actives)
CREATE INDEX idx_inspections_active
ON property_inspections(account_id)
WHERE status IN ('draft', 'pending');
-- Taille : 2 MB (5x plus petit)
-- Performance : 2x plus rapide (moins de données à scanner)

-- Requête optimisée automatiquement
SELECT * FROM property_inspections
WHERE account_id = '123' AND status = 'draft';
-- Index Scan sur idx_inspections_active : 1ms

-- ⚠️ Requête NON optimisée par cet index
SELECT * FROM property_inspections
WHERE account_id = '123' AND status = 'completed';
-- Seq Scan (l'index ne couvre pas 'completed')`}
              language="sql"
              filename="migrations/add-partial-index.sql"
              highlightLines={[11, 12, 13]}
              category="optimization"
            />
          </div>

          {/* Composite Index */}
          <div>
            <h4 className="font-bold text-foreground mb-3">3. Composite Index : L'Ordre est CRITIQUE</h4>
            <CodeBlock
              code={`-- ⚠️ L'ORDRE DES COLONNES EST CRUCIAL

-- Cas 1 : Index (account_id, created_at)
CREATE INDEX idx_inspections_account_date
ON property_inspections(account_id, created_at);

-- ✅ Optimise ces requêtes :
SELECT * FROM property_inspections
WHERE account_id = '123'; -- Utilise l'index

SELECT * FROM property_inspections
WHERE account_id = '123' AND created_at > '2024-01-01'; -- Utilise l'index

SELECT * FROM property_inspections
WHERE account_id = '123' ORDER BY created_at DESC; -- Utilise l'index

-- ❌ N'optimise PAS ces requêtes :
SELECT * FROM property_inspections
WHERE created_at > '2024-01-01'; -- Seq Scan (created_at n'est pas en première position)

-- Règle : Un index composite (a, b, c) optimise :
-- WHERE a = ?
-- WHERE a = ? AND b = ?
-- WHERE a = ? AND b = ? AND c = ?
-- Mais PAS :
-- WHERE b = ?
-- WHERE c = ?
-- WHERE b = ? AND c = ?

-- Solution : Créer des index séparés si nécessaire
CREATE INDEX idx_inspections_date
ON property_inspections(created_at); -- Pour requêtes sans account_id`}
              language="sql"
              filename="migrations/composite-index.sql"
              highlightLines={[4, 5, 17, 18]}
              category="optimization"
            />
          </div>
        </div>
      </ConceptCard>

      {/* Caching Hierarchy */}
      <ConceptCard
        title="Hiérarchie de Cache : Du Plus Rapide au Plus Lent"
        description="Le cache idéal dépend de la fréquence de mise à jour et de la durée de vie souhaitée. Next.js offre plusieurs niveaux de cache."
        category="optimization"
      >
        <div className="space-y-6">
          {/* Hiérarchie visuelle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-green-500/5 border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-bold text-foreground">1. React cache()</h5>
                  <span className="text-xs font-mono px-2 py-1 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                    ~ms
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Cache mémoire pendant le rendu. Déduplication automatique des requêtes identiques.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/5 border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-bold text-foreground">2. Next.js Data Cache</h5>
                  <span className="text-xs font-mono px-2 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    secondes/minutes
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Cache serveur persistant. Revalidation par temps ou tag.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/5 border-l-4 border-orange-500">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-bold text-foreground">3. Redis / KV</h5>
                  <span className="text-xs font-mono px-2 py-1 rounded bg-orange-500/10 text-orange-600 dark:text-orange-400">
                    minutes/heures
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Cache distribué. Partagé entre instances. Idéal pour sessions, rate limiting.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/5 border-l-4 border-purple-500">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-bold text-foreground">4. CDN Cache</h5>
                  <span className="text-xs font-mono px-2 py-1 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    heures/jours
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Cache global au plus près de l'utilisateur. Pour assets statiques et pages SSG.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center p-6 rounded-lg bg-muted/20">
              <div className="text-center space-y-3">
                <div className="text-6xl font-bold text-primary">4</div>
                <p className="text-sm text-muted-foreground">niveaux de cache</p>
                <div className="pt-3 border-t border-border/50">
                  <p className="text-xs text-muted-foreground">Du plus rapide (ms)</p>
                  <p className="text-xs text-muted-foreground">au plus lent (jours)</p>
                </div>
              </div>
            </div>
          </div>

          {/* React cache() */}
          <div>
            <h4 className="font-bold text-foreground mb-3">1. React cache() : Déduplication de Requêtes</h4>
            <CodeBlock
              code={`import { cache } from 'react';

// Sans cache : 3 requêtes identiques
export async function getUser(id: string) {
  return await db.user.findUnique({ where: { id } });
}

// ✅ Avec cache : 1 seule requête, résultat partagé
export const getUser = cache(async (id: string) => {
  console.log('DB query:', id); // Appelé 1 seule fois
  return await db.user.findUnique({ where: { id } });
});

// Page : Plusieurs composants appellent getUser('123')
export default async function ProfilePage() {
  const user = await getUser('123'); // Query DB

  return (
    <div>
      <Header user={await getUser('123')} /> {/* Cache hit */}
      <Sidebar user={await getUser('123')} /> {/* Cache hit */}
      <Profile user={await getUser('123')} /> {/* Cache hit */}
    </div>
  );
}

// Résultat : 1 query au lieu de 4`}
              language="tsx"
              filename="app/lib/queries.ts"
              highlightLines={[9, 10, 11]}
              category="optimization"
            />
          </div>

          {/* Next.js Data Cache */}
          <div>
            <h4 className="font-bold text-foreground mb-3">2. Next.js Data Cache : Revalidation Granulaire</h4>
            <CodeBlock
              code={`// Revalidation par temps
export async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 } // Cache 60 secondes
  });
  return res.json();
}

// Revalidation par tag
export async function getPost(id: string) {
  const res = await fetch(\`https://api.example.com/posts/\${id}\`, {
    next: { tags: ['posts', \`post-\${id}\`] }
  });
  return res.json();
}

// Invalider le cache manuellement
import { revalidateTag, revalidatePath } from 'next/cache';

export async function updatePost(id: string, data: any) {
  await db.post.update({ where: { id }, data });

  // Invalide tous les posts
  revalidateTag('posts');

  // Invalide un post spécifique
  revalidateTag(\`post-\${id}\`);

  // Invalide une route complète
  revalidatePath('/blog');
}

// Impact : TTFB réduit de 800ms à 50ms sur hits de cache`}
              language="tsx"
              filename="app/lib/api.ts"
              highlightLines={[4, 12, 23, 26, 29]}
              category="optimization"
            />
          </div>

          {/* Redis/KV */}
          <div>
            <h4 className="font-bold text-foreground mb-3">3. Redis / KV : Cache Distribué</h4>
            <CodeBlock
              code={`import { kv } from '@vercel/kv';

// Cache distribué pour sessions utilisateur
export async function getUserSession(userId: string) {
  // Vérifier le cache d'abord
  const cached = await kv.get(\`session:\${userId}\`);
  if (cached) return cached;

  // Si pas en cache, query DB
  const session = await db.session.findUnique({ where: { userId } });

  // Store in cache (expire après 1 heure)
  await kv.setex(\`session:\${userId}\`, 3600, JSON.stringify(session));

  return session;
}

// Rate limiting avec Redis
export async function checkRateLimit(ip: string) {
  const key = \`rate-limit:\${ip}\`;
  const count = await kv.incr(key);

  // Expire après 1 minute
  if (count === 1) {
    await kv.expire(key, 60);
  }

  // Max 100 requêtes par minute
  if (count > 100) {
    throw new Error('Rate limit exceeded');
  }
}

// Impact : Queries DB réduites de 90%`}
              language="tsx"
              filename="app/lib/cache.ts"
              highlightLines={[6, 13, 21, 24, 25]}
              category="optimization"
            />
          </div>
        </div>
      </ConceptCard>

      {/* Query Optimization */}
      <ConceptCard
        title="Optimisation des Requêtes SQL"
        description="Au-delà des index, l'écriture des requêtes SQL a un impact énorme. Voici les patterns à adopter et éviter."
        category="optimization"
      >
        <div className="space-y-6">
          {/* SELECT colonnes nécessaires */}
          <div>
            <h4 className="font-bold text-foreground mb-3">1. SELECT uniquement les colonnes nécessaires</h4>
            <CodeBlock
              code={`-- ❌ MAUVAIS : SELECT * (transfert inutile de données)
SELECT * FROM property_inspections
WHERE account_id = '123';
-- Transfert : 5.2 MB pour 1000 rows

-- ✅ BON : SELECT colonnes nécessaires
SELECT id, address, status, created_at
FROM property_inspections
WHERE account_id = '123';
-- Transfert : 180 KB pour 1000 rows (-97%)

-- Avec Prisma
// ❌ MAUVAIS
const inspections = await db.propertyInspection.findMany({
  where: { accountId: '123' }
});

// ✅ BON
const inspections = await db.propertyInspection.findMany({
  where: { accountId: '123' },
  select: {
    id: true,
    address: true,
    status: true,
    createdAt: true
  }
});`}
              language="sql"
              filename="optimized-queries.sql"
              highlightLines={[6, 7, 8, 18, 19, 20, 21, 22, 23, 24, 25]}
              category="optimization"
            />
          </div>

          {/* Pagination avec Cursor */}
          <div>
            <h4 className="font-bold text-foreground mb-3">2. Pagination avec Cursor (pas OFFSET)</h4>
            <CodeBlock
              code={`-- ❌ MAUVAIS : OFFSET (scanne toutes les rows précédentes)
SELECT * FROM posts
ORDER BY created_at DESC
LIMIT 20 OFFSET 10000;
-- Scan : 10,020 rows pour retourner 20 rows
-- Temps : 850ms sur page 500

-- ✅ BON : Cursor-based pagination
SELECT * FROM posts
WHERE created_at < '2024-01-15T10:30:00Z'
ORDER BY created_at DESC
LIMIT 20;
-- Scan : 20 rows
-- Temps : 5ms sur page 500 (170x plus rapide)

-- Avec Prisma
// ✅ Cursor pagination
const posts = await db.post.findMany({
  take: 20,
  cursor: lastPost ? { id: lastPost.id } : undefined,
  orderBy: { createdAt: 'desc' }
});

// Retourner le cursor pour la page suivante
return {
  posts,
  nextCursor: posts[posts.length - 1]?.id
};`}
              language="sql"
              filename="pagination.sql"
              highlightLines={[9, 10, 11, 12, 18, 19, 20, 21]}
              category="optimization"
            />
          </div>

          {/* Aggregations */}
          <div>
            <h4 className="font-bold text-foreground mb-3">3. Aggregations en SQL (pas en application)</h4>
            <CodeBlock
              code={`// ❌ MAUVAIS : Aggregation en JavaScript
const inspections = await db.propertyInspection.findMany({
  where: { accountId: '123' }
}); // Transfert de 10,000 rows

const stats = {
  total: inspections.length,
  completed: inspections.filter(i => i.status === 'completed').length,
  avgScore: inspections.reduce((sum, i) => sum + i.score, 0) / inspections.length
};
// Temps : 450ms, Transfert : 8 MB

// ✅ BON : Aggregation en SQL
const stats = await db.propertyInspection.aggregate({
  where: { accountId: '123' },
  _count: { id: true },
  _avg: { score: true }
});

const completed = await db.propertyInspection.count({
  where: { accountId: '123', status: 'completed' }
});
// Temps : 12ms, Transfert : 200 bytes

// SQL généré :
-- SELECT COUNT(id), AVG(score)
-- FROM property_inspections
-- WHERE account_id = '123';
--
-- SELECT COUNT(*)
-- FROM property_inspections
-- WHERE account_id = '123' AND status = 'completed';

// Impact : 37x plus rapide, 40,000x moins de données transférées`}
              language="tsx"
              filename="aggregations.ts"
              highlightLines={[13, 14, 15, 16, 17, 19, 20, 21]}
              category="optimization"
            />
          </div>
        </div>
      </ConceptCard>

      {/* EXPLAIN ANALYZE */}
      <ConceptCard
        title="EXPLAIN ANALYZE : Diagnostiquer les Requêtes Lentes"
        description="EXPLAIN ANALYZE montre exactement comment PostgreSQL exécute une requête. C'est l'outil #1 pour identifier les goulots d'étranglement."
        category="optimization"
      >
        <div className="space-y-6">
          {/* Exemple d'analyse */}
          <div>
            <h4 className="font-bold text-foreground mb-3">Lire un Plan d'Exécution</h4>
            <CodeBlock
              code={`-- Analyser une requête
EXPLAIN ANALYZE
SELECT * FROM property_inspections
WHERE account_id = '123' AND status = 'draft';

-- Résultat SANS index :
Seq Scan on property_inspections  (cost=0.00..2543.00 rows=45 width=1024)
                                    (actual time=0.123..450.234 rows=45 loops=1)
  Filter: ((account_id = '123') AND (status = 'draft'))
  Rows Removed by Filter: 99955
Planning Time: 0.345 ms
Execution Time: 450.567 ms

-- ⚠️ Signes d'alerte :
-- 1. "Seq Scan" : Scan séquentiel (pas d'index utilisé)
-- 2. "Rows Removed by Filter: 99955" : 99,955 rows scannées pour rien
-- 3. "Execution Time: 450.567 ms" : Très lent

-- Solution : Créer un index
CREATE INDEX idx_inspections_account_status
ON property_inspections(account_id, status);

-- Résultat AVEC index :
Index Scan using idx_inspections_account_status on property_inspections
  (cost=0.29..12.45 rows=45 width=1024)
  (actual time=0.023..2.456 rows=45 loops=1)
  Index Cond: ((account_id = '123') AND (status = 'draft'))
Planning Time: 0.234 ms
Execution Time: 2.567 ms

-- ✅ Améliorations :
-- 1. "Index Scan" : Index utilisé
-- 2. "Index Cond" : Filtrage via index (pas scan)
-- 3. "Execution Time: 2.567 ms" : 175x plus rapide`}
              language="sql"
              filename="explain-analyze.sql"
              highlightLines={[7, 8, 10, 11, 20, 21, 24, 25, 26, 28, 29]}
              category="optimization"
            />
          </div>

          {/* Signes d'alerte */}
          <div>
            <h4 className="font-bold text-foreground mb-3">Signes d'Alerte dans EXPLAIN</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <h5 className="font-bold text-red-600 dark:text-red-400">Problèmes Critiques</h5>
                </div>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 dark:text-red-400 font-mono text-xs mt-1">•</span>
                    <div>
                      <strong className="text-foreground">Seq Scan</strong>
                      <p className="text-muted-foreground">Scan séquentiel au lieu d'index</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 dark:text-red-400 font-mono text-xs mt-1">•</span>
                    <div>
                      <strong className="text-foreground">Rows Removed: 99%+</strong>
                      <p className="text-muted-foreground">Presque toutes les rows filtrées après scan</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 dark:text-red-400 font-mono text-xs mt-1">•</span>
                    <div>
                      <strong className="text-foreground">loops &gt; 1</strong>
                      <p className="text-muted-foreground">Nested loops (N+1 probable)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 dark:text-red-400 font-mono text-xs mt-1">•</span>
                    <div>
                      <strong className="text-foreground">cost: 10000+</strong>
                      <p className="text-muted-foreground">Coût estimé très élevé</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <h5 className="font-bold text-green-600 dark:text-green-400">Bons Signes</h5>
                </div>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 font-mono text-xs mt-1">•</span>
                    <div>
                      <strong className="text-foreground">Index Scan</strong>
                      <p className="text-muted-foreground">Index utilisé efficacement</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 font-mono text-xs mt-1">•</span>
                    <div>
                      <strong className="text-foreground">Index Only Scan</strong>
                      <p className="text-muted-foreground">Données lues depuis l'index uniquement</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 font-mono text-xs mt-1">•</span>
                    <div>
                      <strong className="text-foreground">rows estimées = actual</strong>
                      <p className="text-muted-foreground">Statistiques à jour</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 font-mono text-xs mt-1">•</span>
                    <div>
                      <strong className="text-foreground">Execution &lt; 10ms</strong>
                      <p className="text-muted-foreground">Performance optimale</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Workflow d'optimisation */}
          <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
            <h4 className="font-bold text-foreground mb-4">Workflow d'Optimisation</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Identifier la requête lente</p>
                  <p className="text-xs text-muted-foreground">Logs, monitoring, profiler Next.js</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Lancer EXPLAIN ANALYZE</p>
                  <p className="text-xs text-muted-foreground">Analyser le plan d'exécution</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Créer les index nécessaires</p>
                  <p className="text-xs text-muted-foreground">B-tree, partial, ou composite selon le cas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">4</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Re-lancer EXPLAIN ANALYZE</p>
                  <p className="text-xs text-muted-foreground">Vérifier l'amélioration</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">5</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Mesurer en production</p>
                  <p className="text-xs text-muted-foreground">Confirmer les gains réels</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ConceptCard>
    </div>
  );
}
