import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function TanStackPacerSection() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          TanStack Pacer fournit des primitives de controle de debit pour React : debounce, throttle
          et rate limiting. Plutot que de reimplementer ces patterns a chaque projet avec des
          solutions ad hoc, Pacer offre des hooks type-safe, testables et optimises pour les
          scenarios courants comme la recherche en temps reel, les gestionnaires de scroll
          et les appels API externes.
        </p>
      </div>

      <h3 className="text-xl font-semibold text-foreground">
        Les trois hooks principaux
      </h3>

      <CodeBlock
        code={`import {
  useDebouncedCallback,
  useThrottledValue,
  useQueuedState,
} from '@tanstack/react-pacer';

// -- useDebouncedCallback --
// Execute le callback apres un delai d'inactivite
// Cas d'usage : recherche, auto-save, validation
const [debouncedSearch] = useDebouncedCallback(
  (query: string) => {
    fetchSearchResults(query);
  },
  { wait: 300 } // 300ms apres la derniere frappe
);

// -- useThrottledValue --
// Limite la frequence de mise a jour d'une valeur
// Cas d'usage : position de scroll, curseur, resize
const [throttledPosition] = useThrottledValue(
  mousePosition,
  { wait: 16 } // ~60fps maximum
);

// -- useQueuedState --
// File d'attente FIFO pour les mises a jour d'etat
// Cas d'usage : notifications sequentielles, animations chainées
const [currentItem, queue] = useQueuedState<Notification>({
  maxSize: 10,
  onProcess: (notification) => {
    showToast(notification);
  },
});`}
        language="tsx"
        filename="pacer-hooks-overview.tsx"
        highlightLines={[10, 11, 12, 13, 14, 20, 21, 22, 28, 29, 30, 31, 32]}
        category="best-practices"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Debouncing : recherche en temps reel
      </h3>

      <CodeBlock
        code={`'use client';

import { useState } from 'react';
import { useDebouncedCallback } from '@tanstack/react-pacer';
import { useQuery } from '@tanstack/react-query';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
}

export function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // La recherche ne se declenche que 300ms apres la derniere frappe.
  // Chaque nouvelle frappe reinitialise le compteur.
  const [debouncedSetQuery] = useDebouncedCallback(
    (value: string) => {
      setSearchQuery(value);
    },
    { wait: 300 }
  );

  // TanStack Query ne fetch que lorsque searchQuery change
  const { data: results, isLoading, isFetching } = useQuery<SearchResult[]>({
    queryKey: ['search', searchQuery],
    queryFn: async () => {
      const response = await fetch(
        \`/api/search?q=\${encodeURIComponent(searchQuery)}\`
      );
      if (!response.ok) throw new Error('Erreur de recherche');
      return response.json();
    },
    enabled: searchQuery.length >= 2, // pas de requete sous 2 caracteres
    staleTime: 1000 * 60, // cache 1 minute
  });

  return (
    <div className="relative w-full max-w-lg">
      <input
        type="search"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          debouncedSetQuery(e.target.value);
        }}
        placeholder="Rechercher..."
        className="w-full rounded-lg border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
      />

      {/* Indicateur de chargement */}
      {isFetching && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}

      {/* Resultats */}
      {results && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-lg border border-border bg-background shadow-lg z-50">
          {results.map((result) => (
            <div
              key={result.id}
              className="px-4 py-3 hover:bg-muted/50 cursor-pointer border-b border-border/30 last:border-0"
            >
              <p className="font-medium text-sm">{result.title}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {result.description}
              </p>
              <span className="text-xs text-primary mt-1 inline-block">
                {result.category}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Aucun resultat */}
      {results && results.length === 0 && searchQuery.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-lg border border-border bg-background p-4 text-center text-sm text-muted-foreground shadow-lg z-50">
          Aucun resultat pour &laquo; {searchQuery} &raquo;
        </div>
      )}
    </div>
  );
}`}
        language="tsx"
        filename="debounced-search.tsx"
        highlightLines={[20, 21, 22, 23, 24, 36, 47, 48]}
        category="best-practices"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Throttling : gestionnaires de scroll et resize
      </h3>

      <CodeBlock
        code={`'use client';

import { useState, useEffect, useRef } from 'react';
import { useThrottledValue } from '@tanstack/react-pacer';

// -- Header qui se masque au scroll vers le bas --
export function SmartHeader() {
  const [scrollY, setScrollY] = useState(0);

  // Limiter les mises a jour a 60fps maximum
  // Sans throttle, onScroll peut declencher 100+ events/seconde
  const [throttledScrollY] = useThrottledValue(scrollY, {
    wait: 16, // ~60fps (1000ms / 60 = 16.67ms)
  });

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reagir au scroll throttle, pas au scroll brut
  useEffect(() => {
    const direction = throttledScrollY > lastScrollY.current ? 'down' : 'up';
    const delta = Math.abs(throttledScrollY - lastScrollY.current);

    // Ne changer la visibilite que pour les mouvements significatifs
    if (delta > 10) {
      setIsVisible(direction === 'up' || throttledScrollY < 100);
      lastScrollY.current = throttledScrollY;
    }
  }, [throttledScrollY]);

  return (
    <header
      className={\`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 bg-background/95 backdrop-blur border-b \${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }\`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        {/* Contenu du header */}
      </nav>
    </header>
  );
}

// -- Indicateur de progression de lecture --
export function ReadingProgress() {
  const [scrollPercent, setScrollPercent] = useState(0);

  const [throttledPercent] = useThrottledValue(scrollPercent, {
    wait: 32, // ~30fps suffit pour une barre de progression
  });

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setScrollPercent(Math.round(percent));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[60]">
      <div
        className="h-full bg-primary transition-[width] duration-150 ease-out"
        style={{ width: \`\${throttledPercent}%\` }}
      />
    </div>
  );
}`}
        language="tsx"
        filename="throttled-scroll.tsx"
        highlightLines={[12, 13, 57, 58]}
        category="best-practices"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Rate limiting : appels API externes
      </h3>

      <CodeBlock
        code={`'use client';

import { useDebouncedCallback } from '@tanstack/react-pacer';
import { useState, useCallback } from 'react';

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

// Hook personnalise : rate limiter pour API externes
function useRateLimitedCallback<T extends (...args: any[]) => Promise<any>>(
  callback: T,
  config: RateLimitConfig
) {
  const [requestTimestamps, setRequestTimestamps] = useState<number[]>([]);
  const [isLimited, setIsLimited] = useState(false);

  const execute = useCallback(
    async (...args: Parameters<T>) => {
      const now = Date.now();
      const windowStart = now - config.windowMs;

      // Nettoyer les timestamps hors fenetre
      const recentRequests = requestTimestamps.filter((ts) => ts > windowStart);

      if (recentRequests.length >= config.maxRequests) {
        setIsLimited(true);
        const oldestRequest = recentRequests[0];
        const waitTime = config.windowMs - (now - oldestRequest);
        console.warn(
          \`Rate limit atteint. Prochaine requete disponible dans \${Math.ceil(waitTime / 1000)}s\`
        );
        return null;
      }

      setIsLimited(false);
      setRequestTimestamps([...recentRequests, now]);
      return callback(...args);
    },
    [callback, config, requestTimestamps]
  );

  return { execute, isLimited };
}

// -- Utilisation avec une API de geocoding --
export function AddressAutocomplete() {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Maximum 10 requetes par minute (limite API gratuite typique)
  const { execute: geocode, isLimited } = useRateLimitedCallback(
    async (query: string) => {
      const response = await fetch(
        \`/api/geocode?q=\${encodeURIComponent(query)}\`
      );
      const data = await response.json();
      setSuggestions(data.suggestions);
    },
    { maxRequests: 10, windowMs: 60_000 }
  );

  // Combiner avec debounce : attendre 400ms + respecter la limite
  const [debouncedGeocode] = useDebouncedCallback(
    (value: string) => {
      if (value.length >= 3) {
        geocode(value);
      }
    },
    { wait: 400 }
  );

  return (
    <div className="space-y-2">
      <input
        onChange={(e) => debouncedGeocode(e.target.value)}
        placeholder="Saisissez une adresse..."
        className="w-full rounded-md border px-3 py-2"
      />

      {isLimited && (
        <p className="text-xs text-amber-600">
          Limite de requetes atteinte. Veuillez patienter quelques secondes.
        </p>
      )}

      {suggestions.length > 0 && (
        <ul className="rounded-md border divide-y">
          {suggestions.map((suggestion, i) => (
            <li key={i} className="px-3 py-2 text-sm hover:bg-muted/50 cursor-pointer">
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`}
        language="tsx"
        filename="rate-limited-api.tsx"
        highlightLines={[51, 52, 53, 54, 55, 56, 57, 58, 59, 63, 64, 65, 66, 67]}
        category="best-practices"
      />

      <h3 className="text-xl font-semibold text-foreground">
        Batching et file d&apos;attente
      </h3>

      <CodeBlock
        code={`'use client';

import { useQueuedState } from '@tanstack/react-pacer';
import { useState, useEffect } from 'react';

interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration: number;
}

// Systeme de notifications sequentielles :
// les toasts s'affichent un par un, pas tous en meme temps
export function ToastManager() {
  const [currentToast, setCurrentToast] = useState<ToastNotification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [, queue] = useQueuedState<ToastNotification>({
    maxSize: 20,
    onProcess: (toast) => {
      setCurrentToast(toast);
      setIsVisible(true);
    },
  });

  // Auto-dismiss apres la duree specifiee
  useEffect(() => {
    if (!currentToast) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      // Attendre la fin de l'animation avant de traiter le suivant
      setTimeout(() => {
        setCurrentToast(null);
        queue.next(); // Passer au toast suivant dans la file
      }, 300);
    }, currentToast.duration);

    return () => clearTimeout(timer);
  }, [currentToast, queue]);

  // API publique pour ajouter des toasts
  const addToast = (message: string, type: ToastNotification['type'] = 'info') => {
    queue.add({
      id: crypto.randomUUID(),
      message,
      type,
      duration: type === 'error' ? 5000 : 3000,
    });
  };

  return (
    <>
      {/* Zone d'affichage du toast courant */}
      {currentToast && (
        <div
          className={\`fixed bottom-6 right-6 z-50 max-w-sm rounded-lg border p-4 shadow-lg transition-all duration-300 \${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } \${
            currentToast.type === 'success'
              ? 'bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-800'
              : currentToast.type === 'error'
              ? 'bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-800'
              : 'bg-background border-border'
          }\`}
        >
          <p className="text-sm font-medium">{currentToast.message}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {queue.size} notification(s) en attente
          </p>
        </div>
      )}

      {/* Boutons de demonstration */}
      <div className="flex gap-2">
        <button
          onClick={() => addToast('Operation reussie', 'success')}
          className="px-3 py-1.5 text-sm rounded-md bg-green-600 text-white"
        >
          Succes
        </button>
        <button
          onClick={() => addToast('Une erreur est survenue', 'error')}
          className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white"
        >
          Erreur
        </button>
      </div>
    </>
  );
}`}
        language="tsx"
        filename="toast-queue.tsx"
        highlightLines={[19, 20, 21, 22, 23, 24, 25, 36, 37]}
        category="best-practices"
      />

      <ConceptCard
        title="Guide de decision : debounce, throttle ou rate limit"
        description="Chaque strategie de controle de debit repond a un besoin specifique. Voici comment choisir la bonne approche."
        category="best-practices"
      >
        <ul className="space-y-3 text-sm text-foreground/80">
          <li>
            -- <strong>Debounce</strong> (attendre la fin de l&apos;activite) : utiliser pour les saisies utilisateur ou l&apos;action
            ne doit se declencher qu&apos;apres un temps de pause. Exemples : recherche, auto-save, redimensionnement de fenetre.
            Delai typique : 200-500ms.
          </li>
          <li>
            -- <strong>Throttle</strong> (limiter la frequence) : utiliser quand l&apos;action doit se declencher regulierement
            pendant l&apos;activite. Exemples : position de scroll, mouvement de souris, progression. Delai typique : 16ms (60fps) a 100ms.
          </li>
          <li>
            -- <strong>Rate limit</strong> (quota maximum) : utiliser quand une API externe impose une limite de requetes.
            Exemples : API de geocoding, services tiers, endpoints sensibles. Configuration : X requetes par fenetre de temps.
          </li>
          <li>
            -- <strong>Queue/Batching</strong> (file d&apos;attente) : utiliser quand les operations doivent s&apos;executer
            sequentiellement ou par lot. Exemples : notifications, animations chainees, sync offline.
          </li>
        </ul>
      </ConceptCard>
    </div>
  );
}
