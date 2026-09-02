import { useSyncExternalStore } from 'react';

/* Session audit trail. Client-side only: the visitor's own actions on this
   page, kept in memory for the life of the tab. Nothing is sent anywhere.
   The point is to show what an audit trail is by keeping one on the visitor. */

const MAX_EVENTS = 60;
const EMPTY = [];

let events = EMPTY;
let seq = 0;
const listeners = new Set();

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function audit(action, detail = '') {
  const entry = { id: ++seq, at: new Date(), action, detail };
  events = [...events, entry].slice(-MAX_EVENTS);
  listeners.forEach((l) => l());
  return entry;
}

export function resetAudit() {
  events = EMPTY;
  seq = 0;
  listeners.forEach((l) => l());
}

export function useAuditLog() {
  return useSyncExternalStore(subscribe, () => events, () => EMPTY);
}

export const formatTime = (d) =>
  [d.getHours(), d.getMinutes(), d.getSeconds()]
    .map((n) => String(n).padStart(2, '0'))
    .join(':');
