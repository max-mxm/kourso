import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function MemoryManagementSection() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Les <strong>fuites mémoire</strong> en React sont souvent causées par des event listeners non nettoyés,
          des timers actifs ou des subscriptions oubliées. React 19 n&apos;y change rien : le cleanup reste essentiel.
        </p>
      </div>

      <CodeBlock
        code={`// Pattern : Cleanup proper avec useEffect
import { useEffect } from 'react';

function LiveData() {
  useEffect(() => {
    // Setup : subscription
    const subscription = dataSource.subscribe(handleData);

    // ✅ Cleanup function : OBLIGATOIRE
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <div>Live Data</div>;
}

// ❌ Fuite mémoire : pas de cleanup
function LiveDataBad() {
  useEffect(() => {
    const subscription = dataSource.subscribe(handleData);
    // ❌ PAS de return = fuite mémoire
  }, []);

  return <div>Live Data</div>;
}`}
        language="tsx"
        filename="Cleanup patterns"
        highlightLines={[9, 10, 11, 22]}
        category="optimization"
      />

      <ConceptCard
        title="Sources Courantes de Fuites Mémoire"
        description="Les erreurs les plus fréquentes qui causent des fuites."
        category="optimization"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>• Event listeners non supprimés (addEventListener sans removeEventListener)</li>
          <li>• Timers actifs (setTimeout/setInterval sans clear)</li>
          <li>• Subscriptions non fermées (WebSocket, EventSource, RxJS)</li>
          <li>• Références circulaires dans les closures</li>
          <li>• State updates sur composants unmounted</li>
        </ul>
      </ConceptCard>

      <CodeBlock
        code={`// Pattern : Safe state update (éviter warning unmount)
import { useEffect, useRef } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    async function fetchData() {
      const result = await fetch('/api/data');
      
      // ✅ Update seulement si le composant est toujours monté
      if (isMountedRef.current) {
        setData(result);
      }
    }

    fetchData();

    return () => {
      isMountedRef.current = false; // Cleanup
    };
  }, []);

  return <div>{data}</div>;
}`}
        language="tsx"
        filename="Safe state updates"
        highlightLines={[6, 8, 14, 15, 22]}
        category="optimization"
      />
    </div>
  );
}
