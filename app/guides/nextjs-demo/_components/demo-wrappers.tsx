'use client';

import { InteractiveDemo } from '@/components/course/interactive-demo';

export function SSRDemoWrapper() {
  return (
    <InteractiveDemo
      title="Démo SSR en temps réel"
      description="Cliquez pour simuler une requête SSR. Notez que l'heure change à chaque chargement."
      demoType="ssr"
      onRun={async () => {
        await new Promise(resolve => setTimeout(resolve, 800));
        return {
          data: {
            timestamp: new Date().toISOString(),
            serverTime: new Date().toLocaleTimeString('fr-FR'),
            mode: 'Server-Side Rendered'
          },
          timestamp: Date.now()
        };
      }}
    />
  );
}

export function SSGDemoWrapper() {
  return (
    <InteractiveDemo
      title="Démo SSG"
      description="Simulez une page statique. L'heure reste fixe car elle a été générée au build."
      demoType="ssg"
      onRun={async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const buildTime = new Date('2026-02-12T10:00:00');
        return {
          data: {
            buildTime: buildTime.toISOString(),
            displayTime: buildTime.toLocaleTimeString('fr-FR'),
            mode: 'Static Site Generated',
            note: 'Cette page a été générée au build et ne change pas'
          },
          timestamp: Date.now()
        };
      }}
    />
  );
}

export function ISRDemoWrapper() {
  return (
    <InteractiveDemo
      title="Démo ISR"
      description="La page est mise en cache pendant 60 secondes. Après ce délai, elle se régénère en arrière-plan."
      demoType="isr"
      onRun={async () => {
        await new Promise(resolve => setTimeout(resolve, 600));
        return {
          data: {
            currentTime: new Date().toISOString(),
            displayTime: new Date().toLocaleTimeString('fr-FR'),
            mode: 'Incremental Static Regeneration',
            revalidateAfter: '60 secondes',
            cacheStatus: 'MISS - Régénération en cours'
          },
          timestamp: Date.now()
        };
      }}
    />
  );
}

export function ClientDemoWrapper() {
  return (
    <InteractiveDemo
      title="Démo Client Component"
      description="Ce composant s'exécute côté client et peut gérer l'interactivité en temps réel."
      demoType="client"
      onRun={async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return {
          data: {
            clientInfo: {
              userAgent: typeof window !== 'undefined' ? window.navigator.userAgent.substring(0, 50) + '...' : 'N/A',
              language: typeof window !== 'undefined' ? window.navigator.language : 'N/A',
              screenWidth: typeof window !== 'undefined' ? window.screen.width : 'N/A',
            },
            mode: 'Client Component',
            note: 'Ces données proviennent du navigateur'
          },
          timestamp: Date.now()
        };
      }}
    />
  );
}
