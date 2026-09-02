import React from 'react';
import { ROLES } from '../content/portfolio';

/* The reader's role. The page applies least privilege to jargon: the
   engineer lens reads like a console, the anyone lens reads like a
   conversation. Same facts in both. */
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
        title={r === 'anyone' ? 'Plain English, no jargon' : 'Engineering console voice'}
      >
        {r}
      </button>
    ))}
  </div>
);

export default RoleSwitch;
