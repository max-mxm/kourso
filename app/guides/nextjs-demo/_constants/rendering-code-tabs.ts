export interface RenderingCodeTab {
  id: string;
  label: string;
  filename: string;
  code: string;
}

export const RENDERING_CODE_TABS: RenderingCodeTab[] = [
  {
    id: 'ssr',
    label: 'SSR',
    filename: 'app/product/[id]/page.tsx',
    code: `// Server Component par defaut (pas de 'use client')
// Execute sur le serveur A CHAQUE requete

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  // fetch() sans cache = SSR dynamique
  const product = await fetch(
    \`https://api.store.com/products/\${params.id}\`,
    { cache: 'no-store' }
  ).then(res => res.json());

  const reviews = await fetch(
    \`https://api.store.com/reviews/\${params.id}\`,
    { cache: 'no-store' }
  ).then(res => res.json());

  return (
    <main>
      <h1>{product.name}</h1>
      <p>{product.price} EUR</p>
      <p>Stock : {product.stock} unites</p>

      <section>
        <h2>{reviews.length} avis</h2>
        {reviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </section>
    </main>
  );
}

// Le serveur attend TOUTES les donnees
// avant d'envoyer le HTML complet au client.
// TTFB eleve, mais SEO excellent.`,
  },
  {
    id: 'ssg',
    label: 'SSG',
    filename: 'app/product/[id]/page.tsx',
    code: `// Page statique generee au BUILD time
// Necessite generateStaticParams()

export async function generateStaticParams() {
  const products = await fetch(
    'https://api.store.com/products'
  ).then(res => res.json());

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  // fetch() avec cache par defaut = statique
  const product = await fetch(
    \`https://api.store.com/products/\${params.id}\`
  ).then(res => res.json());

  const reviews = await fetch(
    \`https://api.store.com/reviews/\${params.id}\`
  ).then(res => res.json());

  return (
    <main>
      <h1>{product.name}</h1>
      <p>{product.price} EUR</p>
      {/* Donnees figees au moment du build */}
      <p>Stock : {product.stock} unites</p>

      <section>
        <h2>{reviews.length} avis</h2>
        {reviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </section>
    </main>
  );
}

// HTML pre-genere, servi depuis un CDN.
// Ultra-rapide mais donnees potentiellement obsoletes.`,
  },
  {
    id: 'isr',
    label: 'ISR',
    filename: 'app/product/[id]/page.tsx',
    code: `// Incremental Static Regeneration
// Combine vitesse du statique + fraicheur des donnees

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  // revalidate = 60 : regenere en arriere-plan
  // toutes les 60 secondes si une requete arrive
  const product = await fetch(
    \`https://api.store.com/products/\${params.id}\`,
    { next: { revalidate: 60 } }
  ).then(res => res.json());

  const reviews = await fetch(
    \`https://api.store.com/reviews/\${params.id}\`,
    { next: { revalidate: 60 } }
  ).then(res => res.json());

  return (
    <main>
      <h1>{product.name}</h1>
      <p>{product.price} EUR</p>
      <p>Stock : {product.stock} unites</p>

      <section>
        <h2>{reviews.length} avis</h2>
        {reviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </section>
    </main>
  );
}

// Cache HIT : servi comme du statique (~30ms)
// Cache MISS : regenere cote serveur (~500ms)
// Stale-while-revalidate : l'ancien HTML est servi
// pendant que le nouveau se genere en arriere-plan.`,
  },
  {
    id: 'csr',
    label: 'CSR',
    filename: 'app/product/[id]/page.tsx',
    code: `'use client';

import { useState, useEffect } from 'react';

// Client-Side Rendering : tout se passe dans le navigateur
export default function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // Les fetch partent du NAVIGATEUR
      const [productRes, reviewsRes] = await Promise.all([
        fetch(\`/api/products/\${params.id}\`),
        fetch(\`/api/reviews/\${params.id}\`),
      ]);

      setProduct(await productRes.json());
      setReviews(await reviewsRes.json());
      setLoading(false);
    }
    fetchData();
  }, [params.id]);

  if (loading) {
    return <ProductSkeleton />; // Skeleton visible
  }

  return (
    <main>
      <h1>{product.name}</h1>
      <p>{product.price} EUR</p>
      <p>Stock : {product.stock} unites</p>

      <section>
        <h2>{reviews.length} avis</h2>
        {reviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </section>
    </main>
  );
}

// Le navigateur telecharge le JS, l'execute,
// puis fait les appels API. Le contenu n'apparait
// qu'apres le retour des donnees.
// TTFB rapide, mais LCP tres lent.`,
  },
  {
    id: 'streaming',
    label: 'Streaming',
    filename: 'app/product/[id]/page.tsx',
    code: `import { Suspense } from 'react';

// Streaming : le HTML est envoye progressivement
export default function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main>
      {/* Le shell (header, nav) est envoye immediatement */}
      <Header />

      {/* Chaque Suspense = un chunk independant */}
      <Suspense fallback={<ProductSkeleton />}>
        {/* Ce composant async fetch ses propres donnees */}
        <ProductInfo id={params.id} />
      </Suspense>

      <Suspense fallback={<PriceSkeleton />}>
        <PriceAndStock id={params.id} />
      </Suspense>

      <Suspense fallback={<ReviewsSkeleton />}>
        {/* Le composant le plus lent ne bloque pas les autres */}
        <Reviews id={params.id} />
      </Suspense>
    </main>
  );
}

// Composant async (Server Component)
async function ProductInfo({ id }: { id: string }) {
  const product = await fetch(
    \`https://api.store.com/products/\${id}\`
  ).then(res => res.json());

  return (
    <section>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </section>
  );
}

// Le serveur envoie le shell immediatement,
// puis chaque chunk arrive des qu'il est pret.
// L'utilisateur voit du contenu en ~150ms au lieu de ~750ms.`,
  },
];
