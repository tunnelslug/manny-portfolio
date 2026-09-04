import React from 'react';
import { ROLES } from '../content/portfolio';

/* The reader's role. The engineer lens says how it is built; the
   recruiter lens says what was owned and what came of it. Same facts. */
const RoleSwitch = ({ role, onChange, compact = false }) => (
  <div className={`role-switch ${compact ? 'role-switch--compact' : ''}`} role="group" aria-label="Read as">
    <span className="role-switch-label" aria-hidden="true">read as</span>
    {ROLES.map((r) => (
      <button
        key={r}
        type="button"
        className={`role-option ${role === r ? 'is-active' : ''}`}
        aria-pressed={role === r}
        onClick={() => onChange(r)}
        title={r === 'recruiter' ? 'Ownership, scale, outcomes' : 'How it is built'}
      >
        {r}
      </button>
    ))}
  </div>
);

export default RoleSwitch;
