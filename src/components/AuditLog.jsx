import React, { useEffect, useId, useRef, useState } from 'react';
import { useAuditLog, formatTime } from '../lib/audit';

/* "access logged" in the masthead, made literal. Opens a panel listing the
   visitor's own session events. Client-side only. */
const AuditLog = () => {
  const events = useAuditLog();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  useEffect(() => {
    if (open && listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [open, events.length]);

  return (
    <div className="audit" ref={rootRef}>
      <button
        type="button"
        className={`audit-toggle ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        access logged<span className="audit-count tabular"> · {events.length}</span>
      </button>

      <div id={panelId} className={`audit-panel ${open ? 'is-open' : ''}`} hidden={!open}>
        <div className="audit-head">
          <span>audit log · this session</span>
          <button type="button" className="audit-close" onClick={() => setOpen(false)} aria-label="Close audit log">
            ✕
          </button>
        </div>
        <ol className="audit-list" ref={listRef} aria-label="Session events, oldest first">
          {events.map((e) => (
            <li key={e.id} className="audit-row">
              <time className="audit-time tabular" dateTime={e.at.toISOString()}>{formatTime(e.at)}</time>
              <span className="audit-action">{e.action}</span>
              <span className="audit-detail">{e.detail}</span>
            </li>
          ))}
        </ol>
        <div className="audit-foot">kept in this tab only · nothing leaves the browser</div>
      </div>
    </div>
  );
};

export default AuditLog;
