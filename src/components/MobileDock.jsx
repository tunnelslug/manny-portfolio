import React from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';

/* Phone-only action bar. The hero CTAs live in the first screen; once they
   scroll away this docks the same four actions to the bottom edge, inside
   the thumb zone. Hidden on desktop and whenever a dialog or the menu is up. */
const MobileDock = ({ visible, onResume, onFollow }) => {
  const tab = visible ? 0 : -1;
  return (
    <nav
      className={`dock ${visible ? 'is-visible' : ''}`}
      aria-label="Quick actions"
      aria-hidden={!visible}
      data-testid="mobile-dock"
    >
      <a className="dock-primary" href="mailto:manny@flores.network" onClick={onFollow('mailto')} tabIndex={tab}>
        Get in Touch <ArrowRight size={16} aria-hidden="true" />
      </a>
      <a
        className="dock-item"
        href="https://linkedin.com/in/mannyflores11"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onFollow('linkedin')}
        tabIndex={tab}
      >
        <LinkedinIcon size={18} />
        <span>LinkedIn</span>
      </a>
      <a
        className="dock-item"
        href="https://github.com/tunnelslug"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onFollow('github')}
        tabIndex={tab}
      >
        <GithubIcon size={18} />
        <span>GitHub</span>
      </a>
      <button type="button" className="dock-item" onClick={onResume} tabIndex={tab}>
        <FileText size={18} aria-hidden="true" />
        <span>Resume</span>
      </button>
    </nav>
  );
};

export default MobileDock;
