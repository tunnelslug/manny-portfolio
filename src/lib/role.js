import { useSyncExternalStore } from 'react';
import { ROLES, ROLE_STORAGE_KEY } from '../content/portfolio';

/* The reader's role, persisted per browser. Read through
   useSyncExternalStore so the prerendered HTML (engineer) hydrates
   cleanly and then re-renders into the stored role, no mismatch. */

const DEFAULT_ROLE = 'engineer';
const listeners = new Set();

const read = () => {
  try {
    const stored = localStorage.getItem(ROLE_STORAGE_KEY);
    return ROLES.includes(stored) ? stored : DEFAULT_ROLE;
  } catch {
    return DEFAULT_ROLE;
  }
};

const subscribe = (listener) => {
  listeners.add(listener);
  const onStorage = (e) => { if (e.key === ROLE_STORAGE_KEY) listener(); };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
};

export function getRole() {
  return read();
}

export function setStoredRole(next) {
  if (!ROLES.includes(next)) return;
  try { localStorage.setItem(ROLE_STORAGE_KEY, next); } catch { /* private mode */ }
  listeners.forEach((l) => l());
}

export function useRole() {
  return useSyncExternalStore(subscribe, read, () => DEFAULT_ROLE);
}
