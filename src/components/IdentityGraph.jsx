import React, { useId, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { fabricNodes, fabricDefaultReadout } from '../content/portfolio';
import { audit } from '../lib/audit';

/* The access fabric. The portrait sits at the center; every system in
   scope hangs off it. Edges carry small pulses: outward for the systems he
   configures, inward for the identities that request access. Hover or
   focus a node for its one-line brief; click to pin it.
   Reduced motion: no pulses, no draw-in, everything simply present.
   Desktop only: phones get a plain hero (portrait, name, lede, actions). */

const VB_W = 420;
const VB_H = 440;
const CX = VB_W / 2;
const CY = VB_H / 2;
const HALF = 75;          // portrait half-size
const RING_GAP = 9;       // edge starts this far outside the portrait
const NODE_R = 5;
const NODE_GAP = 4;
const NODE_HIT_R = 24;

const portraitBox = {
  left: `${((CX - HALF) / VB_W) * 100}%`,
  top: `${((CY - HALF) / VB_H) * 100}%`,
  width: `${((HALF * 2) / VB_W) * 100}%`,
  height: `${((HALF * 2) / VB_H) * 100}%`,
};

/* Point where the ray from the center toward (x, y) leaves the portrait ring. */
function ringExit(x, y) {
  const dx = x - CX;
  const dy = y - CY;
  const h = HALF + RING_GAP;
  const t = Math.min(
    dx !== 0 ? Math.abs(h / dx) : Infinity,
    dy !== 0 ? Math.abs(h / dy) : Infinity,
  );
  return { x: CX + dx * t, y: CY + dy * t };
}

function edgeFor(node) {
  const a = ringExit(node.x, node.y);
  const dx = node.x - a.x;
  const dy = node.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const trim = NODE_R + NODE_GAP;
  const b = { x: node.x - (dx / len) * trim, y: node.y - (dy / len) * trim };
  // Pulses follow the path direction, so inbound edges are drawn node -> ring.
  const [from, to] = node.flow === 'in' ? [b, a] : [a, b];
  return {
    d: `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} L ${to.x.toFixed(1)} ${to.y.toFixed(1)}`,
    len: Math.round(len - trim),
  };
}

function labelLayout(node) {
  const { x, y, labelPos } = node;
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

/* `live` flips once the page has painted (App sets it shortly after mount),
   which is when the draw-in should run. */
const IdentityGraph = ({ live = false }) => {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, '');
  const [hovered, setHovered] = useState(null);
  const [pinned, setPinned] = useState(null);

  const activeId = pinned ?? hovered;
  const active = fabricNodes.find((n) => n.id === activeId);

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

  return (
    <div className={`ig ${live ? 'is-live' : ''} ${reduce ? 'is-static' : ''}`}>
      <div className="ig-graph">
        <svg
          className="ig-svg"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          role="group"
          aria-label={summary}
          focusable="false"
        >
          {/* portrait ring */}
          <rect
            className="ig-ring"
            x={CX - HALF - 6} y={CY - HALF - 6}
            width={HALF * 2 + 12} height={HALF * 2 + 12}
            rx="9"
          />

          {/* edges */}
          {fabricNodes.map((n, i) => {
            const edge = edgeFor(n);
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

          {/* the chosen edge carries a fast pulse while it is active:
              access visibly flowing to (or from) that one system */}
          {active && !reduce && active.flow !== 'none' && (
            <circle
              key={`fast-${active.id}`}
              className={`ig-pulse ig-pulse--fast ${active.flow === 'in' ? 'ig-pulse--in' : ''}`}
              r="3"
            >
              <animateMotion dur="1.1s" repeatCount="indefinite">
                <mpath href={`#${uid}-edge-${active.id}`} />
              </animateMotion>
            </circle>
          )}

          {/* nodes */}
          {fabricNodes.map((n, i) => {
            const l = labelLayout(n);
            const isActive = activeId === n.id;
            return (
              <g
                key={n.id}
                className={`ig-node ${isActive ? 'is-active' : ''} ${n.retired ? 'ig-node--retired' : ''}`}
                style={{ '--i': i }}
                tabIndex={0}
                role="button"
                aria-pressed={pinned === n.id}
                aria-label={`${n.label}, ${n.sub}. ${n.detail}`}
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(n.id)}
                onBlur={() => setHovered(null)}
                onClick={() => togglePin(n.id)}
                onKeyDown={(e) => onKey(e, n.id)}
              >
                <circle className="ig-hit" cx={n.x} cy={n.y} r={NODE_HIT_R} />
                {isActive && <circle className="ig-halo" cx={n.x} cy={n.y} r={NODE_R + 6} />}
                <circle className="ig-dot" cx={n.x} cy={n.y} r={NODE_R} />
                <text className="ig-name" x={l.nx} y={l.ny} textAnchor={l.anchor}>{n.label}</text>
                <text className="ig-sub" x={l.sx} y={l.sy} textAnchor={l.anchor}>{n.sub}</text>
              </g>
            );
          })}
        </svg>

        <img
          src="/portrait-300.webp"
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

      {/* Every readout is rendered in the same grid cell; only the current
          one is visible. The block is always as tall as its tallest text,
          so picking a node never moves what sits below the graph. */}
      <div className="ig-readouts" aria-live="polite">
        <p className={`ig-readout ${active ? '' : 'is-shown'}`} aria-hidden={Boolean(active)}>
          {fabricDefaultReadout}
        </p>
        {fabricNodes.map((n) => (
          <p
            key={n.id}
            className={`ig-readout is-detail ${activeId === n.id ? 'is-shown' : ''}`}
            aria-hidden={activeId !== n.id}
          >
            <span className="ig-readout-key">
              {n.label}<span className="ig-readout-sub"> · {n.sub}</span>
            </span>
            {n.detail}
          </p>
        ))}
      </div>
    </div>
  );
};

export default IdentityGraph;
