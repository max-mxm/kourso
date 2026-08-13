'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { ANIMATION_TIMINGS } from '@/lib/animation-config';

/**
 * Hook pour orchestrer des animations avec délais contrôlés
 *
 * Usage:
 * ```tsx
 * const isReady = useAnimation(500); // Démarre après 500ms
 * return <div className={isReady ? 'animate-in' : 'opacity-0'}>...</div>
 * ```
 */
export function useAnimation(delay = 0): boolean {
  const [isReady, setIsReady] = useState(delay === 0);

  useEffect(() => {
    if (delay === 0) return;

    const timer = setTimeout(() => setIsReady(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return isReady;
}

/**
 * Hook pour détecter si l'utilisateur préfère un mouvement réduit
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === 'undefined') return () => {};
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      mediaQuery.addEventListener('change', onStoreChange);
      return () => mediaQuery.removeEventListener('change', onStoreChange);
    },
    () =>
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false,
    () => false
  );
}

/**
 * Hook pour des animations staggered (échelonnées)
 *
 * Usage:
 * ```tsx
 * const items = ['a', 'b', 'c'];
 * const delays = useStaggerAnimation(items.length, 100);
 *
 * items.map((item, i) => (
 *   <AnimatedSection key={item} delay={delays[i]}>
 *     {item}
 *   </AnimatedSection>
 * ))
 * ```
 */
export function useStaggerAnimation(
  count: number,
  baseDelay = ANIMATION_TIMINGS.instant
): number[] {
  return Array.from({ length: count }, (_, i) => i * baseDelay);
}
