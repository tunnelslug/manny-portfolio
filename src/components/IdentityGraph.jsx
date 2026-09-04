import React, { useId, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { fabricNodes, fabricDefaultReadout, fabricIntro, lens } from '../content/portfolio';
import { audit } from '../lib/audit';
import { useMediaQuery } from '../lib/useMediaQuery';

/* The access fabric. The portrait sits at the center; every
   system in scope hangs off it. Edges carry small pulses: outward for the
   systems he configures, inward for the identities that request access.
   Hover or focus a node for its one-line brief; click to pin it.
   Reduced motion: no pulses, no draw-in, everything simply present.

   Two layouts from the same data:
   full     portrait centered, nodes radiating, labels with sub lines (desktop)
   compact  portrait left, nodes fanned into a column on the right, name-only
            labels (phones: short enough to share the first screen with the CTAs) */

const LAYOUTS = {
  full: {
    w: 420, h: 440, cx: 210, cy: 220,
    half: 75, gap: 9, nodeR: 5, nodeGap: 4,
    pos: (n) => ({ x: n.x, y: n.y, labelPos: n.labelPos }),
  },
  compact: {
    w: 360, h: 196, cx: 70, cy: 98,
    half: 58, gap: 8, nodeR: 4.5, nodeGap: 4,
    pos: (n) => ({ x: n.compact.x, y: n.compact.y, labelPos: 'right' }),
  },
};

const NODE_HIT_R = 24;

/* Point where the ray from the center toward (x, y) leaves the portrait ring. */
function ringExit(L, x, y) {
  const dx = x - L.cx;
  const dy = y - L.cy;
  const h = L.half + L.gap;
  const t = Math.min(
    dx !== 0 ? Math.abs(h / dx) : Infinity,
    dy !== 0 ? Math.abs(h / dy) : Infinity,
  );
  return { x: L.cx + dx * t, y: L.cy + dy * t };
}

function edgeFor(L, node, p) {
  const a = ringExit(L, p.x, p.y);
  const dx = p.x - a.x;
  const dy = p.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const trim = L.nodeR + L.nodeGap;
  const b = { x: p.x - (dx / len) * trim, y: p.y - (dy / len) * trim };
  // Pulses follow the path direction, so inbound edges are drawn node -> ring.
  const [from, to] = node.flow === 'in' ? [b, a] : [a, b];
  return {
    d: `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} L ${to.x.toFixed(1)} ${to.y.toFixed(1)}`,
    len: Math.round(len - trim),
  };
}

function labelLayout(p) {
  const { x, y, labelPos } = p;
  switch (labelPos) {
    case 'above': return { anchor: 'middle', nx: x, ny: y - 26, sx: x, sy: y - 14 };
    case 'left':  return { anchor: 'end',    nx: x - 13, ny: y - 2, sx: x - 13, sy: y + 10 };
    case 'right': return { anchor: 'start',  nx: x + 13, ny: y - 2, sx: x + 13, sy: y + 10 };
    default:      return { anchor: 'middle', nx: x, ny: y + 22, sx: x, sy: y + 34 };
  }
}

const PULSE = [
  { dur: 3.6, begin: 1.2 },
  { dur: 4.4, begin: 2.1 },
  { dur: 3.9, begin: 0.6 },
  { dur: 4.8, begin: 2.9 },
  { dur: 3.3, begin: 1.7 },
  { dur: 4.1, begin: 3.4 },
  { dur: 3.7, begin: 0.2 },
];

/* `live` flips once the page is actually visible (after the boot ceremony),
   which is when the draw-in should run. */
const IdentityGraph = ({ role = 'engineer', live = false }) => {
  const reduce = useReducedMotion();
  const compact = useMediaQuery('(max-width: 768px)');
  const uid = useId().replace(/:/g, '');
  const [hovered, setHovered] = useState(null);
  const [pinned, setPinned] = useState(null);

  const L = compact ? LAYOUTS.compact : LAYOUTS.full;
  const layoutName = compact ? 'compact' : 'full';

  const activeId = pinned ?? hovered;
  const active = fabricNodes.find((n) => n.id === activeId);
  const intro = compact && !active;
  const readout = active
    ? lens(role, active.detail)
    : lens(role, compact ? fabricIntro : fabricDefaultReadout);

  const togglePin = (id) => {
    setPinned((p) => {
      const next = p === id ? null : id;
      if (next) audit('graph.inspected', id);
      return next;
    });
  };

  const onKey = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      togglePin(id);
    }
  };

  const summary = `Access fabric: ${fabricNodes.map((n) => n.label).join(', ')}, all administered by Manny Flores.`;

  const portraitBox = {
    left: `${((L.cx - L.half) / L.w) * 100}%`,
    top: `${((L.cy - L.half) / L.h) * 100}%`,
    width: `${((L.half * 2) / L.w) * 100}%`,
    height: `${((L.half * 2) / L.h) * 100}%`,
  };

  return (
    <div className={`ig ${live ? 'is-live' : ''} ${reduce ? 'is-static' : ''}`} data-layout={layoutName}>
      <div className="ig-graph">
        <svg
          className="ig-svg"
          viewBox={`0 0 ${L.w} ${L.h}`}
          role="group"
          aria-label={summary}
          focusable="false"
        >
          {/* portrait ring */}
          <rect
            className="ig-ring"
            x={L.cx - L.half - 6} y={L.cy - L.half - 6}
            width={L.half * 2 + 12} height={L.half * 2 + 12}
            rx="9"
          />

          {/* edges */}
          {fabricNodes.map((n, i) => {
            const edge = edgeFor(L, n, L.pos(n));
            return (
              <path
                key={n.id}
                id={`${uid}-edge-${n.id}`}
                className={`ig-edge ${n.retired ? 'ig-edge--retired' : ''} ${activeId === n.id ? 'is-active' : ''}`}
                d={edge.d}
                style={{ '--i': i, '--len': edge.len }}
              />
            );
          })}

          {/* pulses: access flowing along the edges */}
          {!reduce && fabricNodes.map((n, i) => {
            if (n.flow === 'none') return null;
            const p = PULSE[i % PULSE.length];
            const timing = { dur: `${p.dur}s`, begin: `${p.begin}s`, repeatCount: 'indefinite' };
            return (
              <circle key={`pulse-${n.id}`} className={`ig-pulse ${n.flow === 'in' ? 'ig-pulse--in' : ''}`} r="2.6" opacity="0">
                <animateMotion {...timing}>
                  <mpath href={`#${uid}-edge-${n.id}`} />
                </animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.88;1" {...timing} />
              </circle>
            );
          })}

          {/* nodes */}
          {fabricNodes.map((n, i) => {
            const p = L.pos(n);
            const l = labelLayout(p);
            const isActive = activeId === n.id;
            return (
              <g
                key={n.id}
                className={`ig-node ${isActive ? 'is-active' : ''} ${n.retired ? 'ig-node--retired' : ''}`}
                style={{ '--i': i }}
                tabIndex={0}
                role="button"
                aria-pressed={pinned === n.id}
                aria-label={`${n.label}, ${n.sub}. ${lens(role, n.detail)}`}
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(n.id)}
                onBlur={() => setHovered(null)}
                onClick={() => togglePin(n.id)}
                onKeyDown={(e) => onKey(e, n.id)}
              >
                {compact ? (
                  /* row-shaped hit area: the dot plus its label, so the whole
                     line is tappable even though the rows sit close together */
                  <rect className="ig-hit" x={p.x - 14} y={p.y - 12} width="150" height="24" rx="4" />
                ) : (
                  <circle className="ig-hit" cx={p.x} cy={p.y} r={NODE_HIT_R} />
                )}
                <circle className="ig-dot" cx={p.x} cy={p.y} r={L.nodeR} />
                <text className="ig-name" x={l.nx} y={compact ? p.y + 4 : l.ny} textAnchor={l.anchor}>{n.label}</text>
                {!compact && (
                  <text className="ig-sub" x={l.sx} y={l.sy} textAnchor={l.anchor}>{n.sub}</text>
                )}
              </g>
            );
          })}
        </svg>

        <img
          src="/profile2.png"
          alt="Portrait of Manny Flores"
          className="ig-portrait"
          style={portraitBox}
          width="240"
          height="240"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <p className={`ig-readout ${active ? 'is-detail' : ''} ${intro ? 'is-intro' : ''}`} aria-live="polite">
        {active && <span className="ig-readout-key">{active.label} · </span>}
        {intro && <span className="ig-readout-name">{fabricIntro.name}. </span>}
        {readout}
      </p>
    </div>
  );
};

export default IdentityGraph;
