import { CodeBlock } from '@/components/course/code-block';
import { ConceptCard } from '@/components/course/concept-card';

export default function React192ActivityUseEffectEventContent() {
  return (
    <>
      <h2 id="introduction">Introduction</h2>
      <p>
        React 19.2 introduit des primitives qui ciblent deux besoins concrets :
        prioriser l UI visible et comprendre pourquoi une interaction devient
        lente. Activity et useEffectEvent adressent le rendu et les listeners.
        Les Performance Tracks aident a diagnostiquer les goulots.
      </p>

      <h2 id="activity">Activity : pre-render sans bloquer</h2>
      <p>
        Activity permet de pre-render des sous-arbres non visibles ou non
        prioritaires, tout en gardant la UI principale fluide. C est utile pour
        les tabs, drawers ou pages prechargees.
      </p>

      <CodeBlock
        code={`// Concept : pre-renderer un panel non visible
import { Activity, useState } from 'react';

export function SettingsTabs() {
  const [tab, setTab] = useState<'profile' | 'billing'>('profile');

  return (
    <div>
      <button onClick={() => setTab('profile')}>Profil</button>
      <button onClick={() => setTab('billing')}>Facturation</button>

      <Activity mode={tab === 'profile' ? 'active' : 'hidden'}>
        <ProfilePanel />
      </Activity>

      <Activity mode={tab === 'billing' ? 'active' : 'hidden'}>
        <BillingPanel />
      </Activity>
    </div>
  );
}`}
        language="tsx"
        filename="settings-tabs.tsx"
        category="advanced"
      />

      <ConceptCard
        title="Quand l utiliser"
        description="Activity est utile quand le contenu est lourd, mais pas encore visible."
        category="advanced"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>Tabs et panneaux secondaires.</li>
          <li>Drawer qui s ouvre rarement.</li>
          <li>Pre-chargement d une route lente.</li>
        </ul>
      </ConceptCard>

      <h2 id="useeffectevent">useEffectEvent : listeners stables</h2>
      <p>
        <code>useEffectEvent</code> permet d ecrire des listeners qui lisent les
        props et state recents sans re-installer l effet. C est parfait pour les
        events globaux (scroll, resize, analytics).
      </p>

      <CodeBlock
        code={`import { useEffect, useEffectEvent, useState } from 'react';

export function ScrollTracker() {
  const [count, setCount] = useState(0);

  const onScroll = useEffectEvent(() => {
    setCount((c) => c + 1);
  });

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <p>Scroll events: {count}</p>;
}`}
        language="tsx"
        filename="scroll-tracker.tsx"
        category="advanced"
      />

      <h2 id="performance-tracks">Performance Tracks : lire les traces</h2>
      <p>
        Les Performance Tracks dans React DevTools exposent les phases de rendu,
        les commits et les transitions. Utilisez-les pour isoler le composant ou
        la phase qui provoque une latence perceptible.
      </p>

      <ConceptCard
        title="Signal a surveiller"
        description="Trois indicateurs utiles pour diagnostiquer une UI lente."
        category="advanced"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>Commits trop frequents pendant une interaction.</li>
          <li>Renders longs dans la phase de layout.</li>
          <li>Transitions qui bloquent le thread principal.</li>
        </ul>
      </ConceptCard>

      <h2 id="checklist">Checklist adoption</h2>
      <ConceptCard
        title="Avant de basculer"
        description="Gardez un cadre simple pour ne pas sur-optimiser."
        category="advanced"
      >
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>Mesurer l interaction actuelle (profiling).</li>
          <li>Isoler les sous-arbres lourds.</li>
          <li>Appliquer Activity sur les zones non visibles.</li>
          <li>Remplacer les listeners instables par useEffectEvent.</li>
          <li>Re-profiler pour verifier le gain.</li>
        </ul>
      </ConceptCard>

      <h2 id="conclusion">Conclusion</h2>
      <p>
        React 19.2 fournit des outils pour mieux prioriser le rendu et mieux
        diagnostiquer les lenteurs. Utilises avec mesure, Activity et
        useEffectEvent peuvent rendre une UI plus fluide et plus previsible.
      </p>
    </>
  );
}
