import { useSyncExternalStore } from 'react';

/* Media query as external state. Server snapshot is `false`, so prerendered
   HTML is the desktop layout; the client corrects on first render. */
export function useMediaQuery(query) {
  const subscribe = (listener) => {
    if (typeof window === 'undefined' || !window.matchMedia) return () => {};
    const mq = window.matchMedia(query);
    mq.addEventListener?.('change', listener);
    return () => mq.removeEventListener?.('change', listener);
  };
  const get = () =>
    typeof window !== 'undefined' && window.matchMedia
      ? Boolean(window.matchMedia(query).matches)
      : false;
  return useSyncExternalStore(subscribe, get, () => false);
}
