import React, { useState, useEffect, useRef } from 'react';

/* Boot Ceremony · identity boot sequence, played once per session.
   An OIDC-style sign-in issues the visitor a scoped session, then fades
   to reveal the page. Always the warm-charcoal console surface in both
   themes (a terminal is dark on purpose).
   Skips on esc, click, scroll, or touch. prefers-reduced-motion renders
   nothing. Client-only: mounts after hydration so the prerendered HTML
   never carries the overlay (crawlers and no-JS visitors skip it). */

const INK = 'oklch(15.5% 0.010 50)';
const PAPER = 'oklch(92% 0.010 75)';
const DIM = 'oklch(57% 0.010 65)';
const BODY = 'oklch(73% 0.010 70)';
const GRANT = 'oklch(74% 0.125 150)';
const CLAY = 'oklch(70% 0.135 48)';

const BootCeremony = ({
  domain = 'idp.mannyflo.com',
  prompt = 'guest@mannyflo.com [role:visitor scopes:read.portfolio ttl:24h]',
  speed = 1,
  holdMs = 900,
  oncePerSession = true,
  storageKey = 'mf-boot-seen',
  zIndex = 300,
  onDone,
}) => {
  const [phase, setPhase] = useState('idle'); // idle -> run -> fade -> gone
  const doneRef = useRef(false);

  const seq = [
    { text: 'oidc device_code flow · initiating', status: 'step' },
    { text: `issuer: ${domain} · verified · mfa satisfied`, status: 'step', highlight: 'verified' },
    { text: 'session issued · least privilege applied', status: 'ok' },
  ];
  const stepMs = 550 / speed;
  const cardAt = 350 + seq.length * stepMs;
  const hintAt = cardAt + 400;

  const finish = (fast) => {
    if (doneRef.current) return;
    doneRef.current = true;
    setPhase('fade');
    // Completion timer lives outside the run-phase effect on purpose:
    // that effect's cleanup fires on the run -> fade transition and must
    // not cancel the transition to 'gone'.
    setTimeout(() => {
      if (oncePerSession) {
        try { sessionStorage.setItem(storageKey, '1'); } catch { /* private mode */ }
      }
      setPhase('gone');
      if (onDone) onDone();
    }, fast ? 180 : 400);
  };

  // Client-only gate: decide after mount, so SSR output stays clean.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try { seen = oncePerSession && sessionStorage.getItem(storageKey) === '1'; } catch { /* private mode */ }
    if (reduced || seen) {
      doneRef.current = true;
      setPhase('gone');
      if (onDone) onDone();
      return;
    }
    setPhase('run');
  }, []);

  useEffect(() => {
    if (phase !== 'run') return;
    const total = hintAt + 500 + holdMs;
    const autoT = setTimeout(() => finish(false), total);
    const onKey = (e) => { if (e.key === 'Escape') finish(true); };
    const onWheel = () => finish(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchmove', onWheel, { passive: true });
    return () => {
      clearTimeout(autoT);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchmove', onWheel);
    };
  }, [phase]);

  if (phase === 'idle' || phase === 'gone') return null;

  const renderText = (l) => {
    if (l.highlight && l.text.includes(l.highlight)) {
      const [a, b] = l.text.split(l.highlight);
      return <span>{a}<span style={{ color: GRANT }}>{l.highlight}</span>{b}</span>;
    }
    return l.text;
  };

  const bracket = prompt.indexOf(' [');
  const userPart = bracket > 0 ? prompt.slice(0, bracket) : prompt;
  const metaPart = bracket > 0 ? prompt.slice(bracket) : '';

  return (
    <div
      onClick={() => finish(true)}
      role="status"
      aria-label="Signing you in. Press escape, click, or scroll to skip."
      style={{
        position: 'fixed', inset: 0, zIndex,
        background: INK,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        fontFamily: 'var(--font-mono)',
        opacity: phase === 'fade' ? 0 : 1,
        transition: 'opacity 400ms ease',
        animation: 'bootFadeIn 200ms ease both',
      }}
    >
      <style>{`
        @keyframes bootFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bootLogIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bootBlink { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
      `}</style>
      <div style={{ width: 'min(640px, 88%)' }}>
        <div style={{ fontSize: '0.82rem', lineHeight: 2.2, color: BODY }}>
          {seq.map((l, i) => (
            <div key={i} style={{ animation: 'bootLogIn 0.4s both', animationDelay: `${(350 + i * stepMs) / 1000}s` }}>
              <span style={{ color: l.status === 'ok' ? GRANT : DIM }}>{l.status === 'ok' ? '✓ ' : '▸ '}</span>
              {renderText(l)}
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 20, padding: '13px 18px',
            background: 'oklch(18.8% 0.011 55)',
            border: `1px solid ${CLAY}`,
            borderRadius: 6,
            fontSize: '0.85rem',
            animation: 'bootLogIn 0.4s both',
            animationDelay: `${cardAt / 1000}s`,
            color: BODY,
          }}
        >
          <span style={{ color: CLAY }}>{userPart}</span>
          {metaPart && <span>{metaPart}</span>}
          <span style={{ animation: 'bootBlink 1.1s step-end infinite', color: PAPER }}> {'▌'}</span>
        </div>
        <div
          style={{
            marginTop: 26, fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            color: DIM,
            animation: 'bootLogIn 0.4s both',
            animationDelay: `${hintAt / 1000}s`,
          }}
        >
          esc · click · scroll to skip
        </div>
      </div>
    </div>
  );
};

export default BootCeremony;
