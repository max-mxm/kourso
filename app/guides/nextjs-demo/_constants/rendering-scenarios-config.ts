export type PhaseType = 'server' | 'network' | 'client' | 'hydration' | 'fetch' | 'idle';

export interface SimulationPhase {
  id: string;
  label: string;
  startMs: number;
  durationMs: number;
  type: PhaseType;
  description: string;
}

export interface RenderingMetrics {
  ttfb: number;
  fcp: number;
  lcp: number;
  tti: number;
  jsBundle: number; // KB
  htmlSize: number; // KB
}

export interface RenderingScenarioConfig {
  id: string;
  name: string;
  shortName: string;
  description: string;
  color: string;
  phases: SimulationPhase[];
  metrics: RenderingMetrics;
  pageStates: PageStateTransition[];
}

export type PageVisualState = 'blank' | 'shell' | 'loading' | 'partial-1' | 'partial-2' | 'complete';

export interface PageStateTransition {
  atMs: number;
  state: PageVisualState;
  label: string;
}

export interface NetworkPreset {
  id: string;
  label: string;
  latencyMultiplier: number;
  description: string;
}

export const NETWORK_PRESETS: NetworkPreset[] = [
  {
    id: 'fast',
    label: 'Fibre',
    latencyMultiplier: 1,
    description: '20ms de latence',
  },
  {
    id: 'slow-3g',
    label: '3G lent',
    latencyMultiplier: 3,
    description: '200ms de latence, debit reduit',
  },
];

export const PHASE_COLORS: Record<PhaseType, { bg: string; text: string; label: string }> = {
  server: {
    bg: 'bg-blue-500',
    text: 'text-blue-700 dark:text-blue-300',
    label: 'Serveur',
  },
  network: {
    bg: 'bg-slate-400 dark:bg-slate-500',
    text: 'text-slate-600 dark:text-slate-300',
    label: 'Reseau',
  },
  client: {
    bg: 'bg-emerald-500',
    text: 'text-emerald-700 dark:text-emerald-300',
    label: 'Client (parse/render)',
  },
  hydration: {
    bg: 'bg-violet-500',
    text: 'text-violet-700 dark:text-violet-300',
    label: 'Hydration',
  },
  fetch: {
    bg: 'bg-orange-500',
    text: 'text-orange-700 dark:text-orange-300',
    label: 'Fetch API (client)',
  },
  idle: {
    bg: 'bg-gray-200 dark:bg-gray-700',
    text: 'text-gray-500 dark:text-gray-400',
    label: 'Attente',
  },
};

// --- SSR ---
const ssrScenario: RenderingScenarioConfig = {
  id: 'ssr',
  name: 'Server-Side Rendering',
  shortName: 'SSR',
  description: 'HTML genere sur le serveur a chaque requete',
  color: 'rgb(59, 130, 246)', // blue-500
  phases: [
    {
      id: 'ssr-request',
      label: 'Requete',
      startMs: 0,
      durationMs: 20,
      type: 'network',
      description: 'Requete envoyee au serveur',
    },
    {
      id: 'ssr-server',
      label: 'Serveur + Fetch',
      startMs: 20,
      durationMs: 430,
      type: 'server',
      description: 'Execution du composant React + fetch des donnees',
    },
    {
      id: 'ssr-transfer',
      label: 'Transfert HTML',
      startMs: 450,
      durationMs: 50,
      type: 'network',
      description: 'HTML complet envoye au navigateur',
    },
    {
      id: 'ssr-parse',
      label: 'Parse + Paint',
      startMs: 500,
      durationMs: 100,
      type: 'client',
      description: 'Le navigateur parse le HTML et affiche le contenu',
    },
    {
      id: 'ssr-hydration',
      label: 'Hydration',
      startMs: 600,
      durationMs: 150,
      type: 'hydration',
      description: 'React attache les event listeners au HTML existant',
    },
  ],
  metrics: {
    ttfb: 500,
    fcp: 600,
    lcp: 600,
    tti: 750,
    jsBundle: 85,
    htmlSize: 45,
  },
  pageStates: [
    { atMs: 0, state: 'blank', label: 'Page blanche' },
    { atMs: 600, state: 'complete', label: 'Contenu complet' },
  ],
};

// --- SSG ---
const ssgScenario: RenderingScenarioConfig = {
  id: 'ssg',
  name: 'Static Site Generation',
  shortName: 'SSG',
  description: 'HTML pre-genere au build, servi depuis un CDN',
  color: 'rgb(34, 197, 94)', // green-500
  phases: [
    {
      id: 'ssg-cdn',
      label: 'CDN',
      startMs: 0,
      durationMs: 30,
      type: 'network',
      description: 'Le CDN sert le HTML pre-genere instantanement',
    },
    {
      id: 'ssg-parse',
      label: 'Parse + Paint',
      startMs: 30,
      durationMs: 50,
      type: 'client',
      description: 'Le navigateur parse et affiche le HTML',
    },
    {
      id: 'ssg-hydration',
      label: 'Hydration',
      startMs: 80,
      durationMs: 150,
      type: 'hydration',
      description: 'React hydrate le HTML statique',
    },
  ],
  metrics: {
    ttfb: 30,
    fcp: 80,
    lcp: 80,
    tti: 230,
    jsBundle: 85,
    htmlSize: 42,
  },
  pageStates: [
    { atMs: 0, state: 'blank', label: 'Page blanche' },
    { atMs: 80, state: 'complete', label: 'Contenu complet' },
  ],
};

// --- ISR (Cache HIT) ---
const isrHitScenario: RenderingScenarioConfig = {
  id: 'isr-hit',
  name: 'ISR (Cache HIT)',
  shortName: 'ISR',
  description: 'Page en cache, servie comme du statique',
  color: 'rgb(234, 179, 8)', // yellow-500
  phases: [
    {
      id: 'isr-hit-cdn',
      label: 'CDN (cache)',
      startMs: 0,
      durationMs: 30,
      type: 'network',
      description: 'Le CDN sert la page cachee',
    },
    {
      id: 'isr-hit-parse',
      label: 'Parse + Paint',
      startMs: 30,
      durationMs: 50,
      type: 'client',
      description: 'Le navigateur parse et affiche le HTML',
    },
    {
      id: 'isr-hit-hydration',
      label: 'Hydration',
      startMs: 80,
      durationMs: 150,
      type: 'hydration',
      description: 'React hydrate le HTML cache',
    },
  ],
  metrics: {
    ttfb: 30,
    fcp: 80,
    lcp: 80,
    tti: 230,
    jsBundle: 85,
    htmlSize: 42,
  },
  pageStates: [
    { atMs: 0, state: 'blank', label: 'Page blanche' },
    { atMs: 80, state: 'complete', label: 'Contenu complet' },
  ],
};

// --- ISR (Cache MISS) ---
const isrMissScenario: RenderingScenarioConfig = {
  id: 'isr-miss',
  name: 'ISR (Cache MISS)',
  shortName: 'ISR',
  description: 'Cache expire, regeneration cote serveur',
  color: 'rgb(234, 179, 8)',
  phases: [
    {
      id: 'isr-miss-request',
      label: 'Requete',
      startMs: 0,
      durationMs: 20,
      type: 'network',
      description: 'Requete au serveur (cache expire)',
    },
    {
      id: 'isr-miss-server',
      label: 'Regeneration',
      startMs: 20,
      durationMs: 430,
      type: 'server',
      description: 'Le serveur regenere la page avec les nouvelles donnees',
    },
    {
      id: 'isr-miss-transfer',
      label: 'Transfert HTML',
      startMs: 450,
      durationMs: 50,
      type: 'network',
      description: 'HTML regenere envoye au navigateur',
    },
    {
      id: 'isr-miss-parse',
      label: 'Parse + Paint',
      startMs: 500,
      durationMs: 100,
      type: 'client',
      description: 'Le navigateur parse et affiche le HTML',
    },
    {
      id: 'isr-miss-hydration',
      label: 'Hydration',
      startMs: 600,
      durationMs: 150,
      type: 'hydration',
      description: 'React hydrate le HTML',
    },
  ],
  metrics: {
    ttfb: 500,
    fcp: 600,
    lcp: 600,
    tti: 750,
    jsBundle: 85,
    htmlSize: 45,
  },
  pageStates: [
    { atMs: 0, state: 'blank', label: 'Page blanche' },
    { atMs: 600, state: 'complete', label: 'Contenu complet' },
  ],
};

// --- CSR ---
const csrScenario: RenderingScenarioConfig = {
  id: 'csr',
  name: 'Client-Side Rendering',
  shortName: 'CSR',
  description: 'HTML minimal, tout le rendu cote navigateur',
  color: 'rgb(249, 115, 22)', // orange-500
  phases: [
    {
      id: 'csr-html',
      label: 'HTML minimal',
      startMs: 0,
      durationMs: 20,
      type: 'network',
      description: 'Serveur envoie un HTML quasi-vide avec <div id="root">',
    },
    {
      id: 'csr-js-download',
      label: 'JS Download',
      startMs: 20,
      durationMs: 300,
      type: 'network',
      description: 'Le navigateur telecharge le bundle JavaScript (~200KB)',
    },
    {
      id: 'csr-js-execute',
      label: 'JS Execute',
      startMs: 320,
      durationMs: 200,
      type: 'client',
      description: 'Le navigateur parse et execute le JavaScript',
    },
    {
      id: 'csr-fetch',
      label: 'Fetch API',
      startMs: 520,
      durationMs: 400,
      type: 'fetch',
      description: 'React fait les appels API pour recuperer les donnees',
    },
    {
      id: 'csr-render',
      label: 'Render final',
      startMs: 920,
      durationMs: 50,
      type: 'client',
      description: 'React rend le composant avec les donnees',
    },
  ],
  metrics: {
    ttfb: 20,
    fcp: 520,
    lcp: 970,
    tti: 970,
    jsBundle: 210,
    htmlSize: 2,
  },
  pageStates: [
    { atMs: 0, state: 'blank', label: 'Page blanche' },
    { atMs: 520, state: 'loading', label: 'Loading spinners' },
    { atMs: 970, state: 'complete', label: 'Contenu complet' },
  ],
};

// --- Streaming ---
const streamingScenario: RenderingScenarioConfig = {
  id: 'streaming',
  name: 'Streaming (SSR + Suspense)',
  shortName: 'Streaming',
  description: 'HTML envoye progressivement par chunks',
  color: 'rgb(124, 58, 237)', // violet-500
  phases: [
    {
      id: 'stream-request',
      label: 'Requete',
      startMs: 0,
      durationMs: 20,
      type: 'network',
      description: 'Requete envoyee au serveur',
    },
    {
      id: 'stream-shell',
      label: 'Shell HTML',
      startMs: 20,
      durationMs: 80,
      type: 'server',
      description: 'Le serveur envoie immediatement le shell (header, nav, skeletons)',
    },
    {
      id: 'stream-parse-shell',
      label: 'Parse shell',
      startMs: 100,
      durationMs: 50,
      type: 'client',
      description: 'Le navigateur affiche le shell avec les placeholders',
    },
    {
      id: 'stream-chunk1',
      label: 'Chunk : Produit',
      startMs: 150,
      durationMs: 150,
      type: 'server',
      description: 'Les infos produit arrivent (fetch rapide ~150ms)',
    },
    {
      id: 'stream-chunk2',
      label: 'Chunk : Prix',
      startMs: 300,
      durationMs: 200,
      type: 'server',
      description: 'Prix et stock arrivent (fetch moyen ~200ms)',
    },
    {
      id: 'stream-chunk3',
      label: 'Chunk : Avis',
      startMs: 500,
      durationMs: 250,
      type: 'server',
      description: 'Les avis utilisateurs arrivent (fetch lent ~250ms)',
    },
    {
      id: 'stream-hydration',
      label: 'Hydration',
      startMs: 750,
      durationMs: 100,
      type: 'hydration',
      description: 'Hydration selective de chaque chunk',
    },
  ],
  metrics: {
    ttfb: 100,
    fcp: 150,
    lcp: 150,
    tti: 350,
    jsBundle: 85,
    htmlSize: 48,
  },
  pageStates: [
    { atMs: 0, state: 'blank', label: 'Page blanche' },
    { atMs: 150, state: 'shell', label: 'Shell + skeletons' },
    { atMs: 300, state: 'partial-1', label: 'Infos produit' },
    { atMs: 500, state: 'partial-2', label: '+ Prix et stock' },
    { atMs: 750, state: 'complete', label: 'Contenu complet' },
  ],
};

export const RENDERING_SCENARIOS: RenderingScenarioConfig[] = [
  ssrScenario,
  ssgScenario,
  isrHitScenario,
  csrScenario,
  streamingScenario,
];

// ISR miss variant, used when the user toggles "Cache MISS"
export const ISR_MISS_SCENARIO = isrMissScenario;

export function getScenarioTotalDuration(scenario: RenderingScenarioConfig): number {
  const lastPhase = scenario.phases[scenario.phases.length - 1];
  return lastPhase.startMs + lastPhase.durationMs;
}

export function getMaxDuration(scenarios: RenderingScenarioConfig[]): number {
  return Math.max(...scenarios.map(getScenarioTotalDuration));
}

export function applyNetworkMultiplier(
  scenario: RenderingScenarioConfig,
  multiplier: number
): RenderingScenarioConfig {
  if (multiplier === 1) return scenario;

  let cumulativeOffset = 0;
  const newPhases = scenario.phases.map((phase) => {
    const newStart = phase.startMs + cumulativeOffset;
    const isNetworkSensitive = phase.type === 'network' || phase.type === 'fetch' || phase.type === 'server';
    const newDuration = isNetworkSensitive
      ? Math.round(phase.durationMs * multiplier)
      : phase.durationMs;
    const durationDiff = newDuration - phase.durationMs;
    cumulativeOffset += durationDiff;

    return { ...phase, startMs: newStart, durationMs: newDuration };
  });

  // Recalculate metrics based on phase changes
  const totalDuration = newPhases[newPhases.length - 1].startMs + newPhases[newPhases.length - 1].durationMs;
  const originalTotal = getScenarioTotalDuration(scenario);
  const ratio = totalDuration / originalTotal;

  // Recalculate page states proportionally
  const newPageStates = scenario.pageStates.map((ps) => ({
    ...ps,
    atMs: Math.round(ps.atMs * ratio),
  }));

  return {
    ...scenario,
    phases: newPhases,
    metrics: {
      ...scenario.metrics,
      ttfb: Math.round(scenario.metrics.ttfb * ratio),
      fcp: Math.round(scenario.metrics.fcp * ratio),
      lcp: Math.round(scenario.metrics.lcp * ratio),
      tti: Math.round(scenario.metrics.tti * ratio),
    },
    pageStates: newPageStates,
  };
}
