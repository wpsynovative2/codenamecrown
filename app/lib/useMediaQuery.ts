"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * SSR-safe media query hook.
 *
 * Uses useSyncExternalStore rather than useState + useEffect so the value is
 * read during render instead of being written back from an effect (which
 * triggers a cascading re-render).
 *
 * The server snapshot is always `false`, so components must be written so the
 * desktop layout is the pre-hydration default.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}
