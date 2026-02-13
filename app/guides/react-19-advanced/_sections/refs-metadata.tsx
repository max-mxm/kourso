import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function RefsMetadataSection() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          React 19 simplifie les refs avec <strong>refs as props</strong> (plus besoin de forwardRef) et
          permet de gérer les <strong>metadata documents</strong> (title, meta) directement dans les composants.
        </p>
      </div>

      <CodeBlock
        code={`// React 18 : forwardRef obligatoire
import { forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return <input ref={ref} {...props} />;
  }
);

// React 19 : ref directement en prop
function Input({ ref, ...props }: InputProps) {
  return <input ref={ref} {...props} />;
}

// Usage identique
function Form() {
  const inputRef = useRef<HTMLInputElement>(null);

  return <Input ref={inputRef} placeholder="Email" />;
}`}
        language="tsx"
        filename="Refs as props"
        highlightLines={[4, 5, 6, 7, 11, 12, 19]}
        category="advanced"
      />

      <ConceptCard
        title="Document Metadata dans React 19"
        description="Gérer title, meta et link directement dans vos composants."
        category="advanced"
      >
        <p className="text-sm text-foreground/80">
          React 19 permet d&apos;inclure les tags &lt;title&gt;, &lt;meta&gt; et &lt;link&gt; directement
          dans vos composants. React les hoistera automatiquement dans le &lt;head&gt; du document.
        </p>
      </ConceptCard>

      <CodeBlock
        code={`// Document Metadata directement dans le composant
export function BlogPost({ post }: Props) {
  return (
    <article>
      {/* ✅ React 19 : Metadata dans le composant */}
      <title>{post.title} - Mon Blog</title>
      <meta name="description" content={post.excerpt} />
      <meta property="og:title" content={post.title} />
      <meta property="og:image" content={post.coverImage} />
      <link rel="canonical" href={\`https://blog.com/\${post.slug}\`} />

      {/* Contenu de la page */}
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}

// React hoiste automatiquement les tags dans <head>
// Résultat HTML :
// <head>
//   <title>Mon Article - Mon Blog</title>
//   <meta name="description" content="..." />
//   ...
// </head>
// <body>
//   <article>
//     <h1>Mon Article</h1>
//     ...
//   </article>
// </body>`}
        language="tsx"
        filename="Document metadata"
        highlightLines={[6, 7, 8, 9, 10]}
        category="advanced"
      />

      <CodeBlock
        code={`// Pattern : Metadata dynamique avec Server Component
export default async function ProductPage({ params }: Props) {
  const product = await fetchProduct(params.id);

  return (
    <div>
      {/* Metadata SEO dynamique */}
      <title>{product.name} - Shop</title>
      <meta name="description" content={product.description} />
      <meta property="og:title" content={product.name} />
      <meta property="og:image" content={product.image} />
      <meta property="product:price:amount" content={product.price} />
      <link rel="canonical" href={\`https://shop.com/products/\${product.slug}\`} />

      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <span>{product.price}€</span>
    </div>
  );
}`}
        language="tsx"
        filename="app/products/[id]/page.tsx"
        highlightLines={[8, 9, 10, 11, 12, 13]}
        category="advanced"
      />

      <ConceptCard
        title="Avantages des Metadata React 19"
        description="Pourquoi gérer les metadata directement dans les composants."
        category="advanced"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>• <strong>Colocation</strong> : Metadata proche du contenu concerné</li>
          <li>• <strong>Type-safety</strong> : TypeScript valide les props des meta tags</li>
          <li>• <strong>Composition</strong> : Metadata héritée et surchargeable</li>
          <li>• <strong>SSR natif</strong> : Fonctionne automatiquement avec Server Components</li>
        </ul>
      </ConceptCard>
    </div>
  );
}
