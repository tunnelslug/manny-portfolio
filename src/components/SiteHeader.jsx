import React from 'react';
import ThemeToggle from './ThemeToggle';
import { PERSON } from '../content/site';

export default function SiteHeader({ onResume, current }) {
  return (
    <header className="site-header">
      <a href="/" className="identity" aria-label="Manny Flores, home">
        <img
          src="/profile2.png"
          alt=""
          className="identity-photo"
          width="40"
          height="40"
        />
        <span>
          <span className="identity-name">{PERSON.name}</span>
          <span className="identity-role">{PERSON.role}</span>
        </span>
      </a>

      <nav className="site-nav" aria-label="Main navigation">
        <a href="/#work" aria-current={current === 'work' ? 'page' : undefined}>Work</a>
        <a href="/#writing" aria-current={current === 'writing' ? 'page' : undefined}>Writing</a>
        <button type="button" className="linkish" onClick={onResume}>Resume</button>
        <a href={`mailto:${PERSON.email}`}>Email</a>
        <a href={PERSON.x} target="_blank" rel="noopener noreferrer">{PERSON.xHandle}</a>
        <ThemeToggle />
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      © {new Date().getFullYear()} {PERSON.name}
    </footer>
  );
}
