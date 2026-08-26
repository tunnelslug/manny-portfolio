import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import ResumeDialog from './components/ResumeDialog';
import ProjectCard from './components/ProjectCard';
import ThemeToggle from './components/ThemeToggle';
import FramerButton from './components/FramerButton';

const IconArrow = () => <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />;

const Eyebrow = ({ label }) => (
  <div className="eyebrow">
    <span>{label}</span>
  </div>
);

const NAV_SECTIONS = [
  { id: 'about',    label: 'about' },
  { id: 'scope',    label: 'scope' },
  { id: 'plan',     label: 'trajectory' },
  { id: 'projects', label: 'current focus' },
  { id: 'stack',    label: 'stack' },
];

const initialSection = () => {
  if (typeof window === 'undefined') return 'about';
  const hash = window.location.hash.slice(1);
  return NAV_SECTIONS.some(s => s.id === hash) ? hash : 'about';
};

const App = () => {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    const observers = NAV_SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-15% 0px -25% 0px', threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (typeof window !== 'undefined' && window.history?.replaceState) {
        window.history.replaceState(null, '', `#${sectionId}`);
      }
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const valid = NAV_SECTIONS.some(s => s.id === hash) || document.getElementById(hash);
    if (!valid) return;
    const el = document.getElementById(hash);
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }));
    }
  }, []);

  const scope = [
    {
      domain: 'Identity & Access Architecture',
      state: 'operating',
      desc: "Authentication flows in Okta: SAML, OAuth 2.0, OIDC, plus SCIM for downstream provisioning. The full user lifecycle: birthright access, joiners, movers, leavers, rehires, service accounts, and the edge cases SCIM can't reach.",
    },
    {
      domain: 'Identity Governance & Audit',
      state: 'operating',
      desc: 'Led the Okta Identity Governance rollout: access certification campaigns and policy-driven lifecycle controls. Audit responses across SOX controls, access reviews, and service accounts, working directly with external auditors. Identity changes ship through technical reviews I author.',
    },
    {
      domain: 'AI Tooling Governance',
      state: 'expanding',
      desc: 'The identity side of Claude Code, ChatGPT, Cursor, and Gemini Enterprise: rollout review, access controls, and MCP integration enablement across the SaaS stack. Agents get identities, scopes, and an audit trail. Service accounts authenticate through brokered credentials, checked out from the vault programmatically and returned, never held.',
    },
    {
      domain: 'Cloud Governance (GCP)',
      state: 'operating',
      desc: 'Terraform-managed IAM and project structure, so engineers move AI workloads from prototype to production without creating sprawl.',
    },
    {
      domain: 'Collaboration Security',
      state: 'hardening',
      desc: 'The surface where everyone works. Hardened, audited, and watched.',
    },
  ];

  const changeLog = [
    {
      kind: 'changed',
      label: 'Shifted',
      items: [
        {
          title: 'Role',
          body: 'Systems Administrator to Senior Systems Engineer, team lead.',
        },
        {
          title: 'Access requests',
          body: 'Manual tickets to automated fulfillment.',
        },
      ],
    },
    {
      kind: 'added',
      label: 'Stood up',
      items: [
        {
          title: 'Okta Identity Governance',
          body: 'Led the rollout: certification campaigns and policy-driven lifecycle controls.',
        },
        {
          title: 'Six acquisitions into one Okta tenant',
          body: 'Say, X1, Bitstamp, TradePMR, Chartr, WonderFi.',
        },
        {
          title: 'Identity governance for AI tools',
          body: 'Claude Code, ChatGPT, Cursor, and Gemini Enterprise.',
        },
        {
          title: 'Okta config as Terraform',
          body: 'Clicks to code: drift gone, changes reviewed like PRs.',
        },
      ],
    },
    {
      kind: 'removed',
      label: 'Retired',
      items: [
        {
          title: 'Unreviewed standing access',
          body: 'Replaced by certification campaigns.',
        },
        {
          title: 'Acquired Entra ID tenants',
          body: 'Owned through migration: support, audit, decommission.',
        },
      ],
    },
  ];

  const skills = [
    { category: 'Identity & Access', items: ['Okta OIE', 'OIG', 'Entra ID', 'SAML 2.0', 'OAuth 2.0', 'OIDC', 'SCIM', 'RBAC', 'Zero Trust'] },
    { category: 'Automation & IaC', items: ['Python', 'Bash', 'Okta Workflows', 'Terraform', 'GCP IAM', 'APIs & Integrations'] },
    { category: 'Corp Apps Infra', items: ['GCP', 'Google Workspace', 'Okta', 'Slack', 'Jira', 'Workday'] },
    { category: 'AI & Governance', items: ['MCP', 'Claude Code', 'ChatGPT', 'Cursor', 'Gemini Enterprise', 'LLM Access Controls'] },
  ];

  const currentProjects = [
    {
      title: 'Terraform Okta: Identity as Code',
      status: 'Operating',
      description: 'Okta config lives in Terraform now, not in clicks. Config drift is gone, changes get reviewed like code, and policy stays consistent across the tenant.',
      tags: ['Okta', 'Terraform', 'IaC', 'Identity Infrastructure'],
    },
    {
      title: 'Secure GCP for AI Workloads',
      status: 'Operating',
      description: 'A paved road from local prototype to hosted service. Project factories, IAM bindings, and access controls all live in Terraform, so shipping an AI-assisted tool to production is a reviewed change, not a hand-built exception.',
      tags: ['GCP', 'Terraform', 'IAM', 'AI Enablement'],
    },
    {
      title: 'Google Workspace Security Hardening',
      status: 'Building',
      description: "Tightening Google Workspace: access policies, DLP, third-party OAuth, audit coverage. The attack surface gets bigger every time someone installs a new AI tool, and that's the part I'm watching.",
      tags: ['Google Workspace', 'DLP', 'OAuth Governance', 'Security'],
    },
  ];

  const year = new Date().getFullYear();

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>

      <div className="papel-band" role="presentation" aria-hidden="true">
        <span style={{ background: '#E6376A' }} />
        <span style={{ background: '#1E4FA6' }} />
        <span style={{ background: '#D6A03B' }} />
        <span style={{ background: '#C25425' }} />
        <span style={{ background: '#4A7F5C' }} />
        <span style={{ background: '#1F3F8C' }} />
        <span style={{ background: '#1B1208' }} />
      </div>

      <header className="nav-shell">
        <nav className="nav-row" aria-label="Main navigation">
          <button
            className="wordmark"
            onClick={() => scrollToSection('about')}
            aria-label="mannyflo, return to top"
          >
            mannyflo<span className="wordmark-dot">.</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="nav-desktop">
              {NAV_SECTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  className={`nav-item ${activeSection === id ? 'active' : ''}`}
                  onClick={() => scrollToSection(id)}
                  aria-current={activeSection === id ? 'page' : undefined}
                >
                  {label}
                </button>
              ))}
            </div>

            <ThemeToggle />

            <button
              className={`hamburger ${isMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMenuOpen(o => !o)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
            >
              <span /><span /><span />
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-nav"
        className={`nav-mobile ${isMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        {NAV_SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            className={`nav-item ${activeSection === id ? 'active' : ''}`}
            onClick={() => scrollToSection(id)}
            tabIndex={isMenuOpen ? 0 : -1}
            aria-current={activeSection === id ? 'page' : undefined}
          >
            {label}
          </button>
        ))}
      </div>

      <main id="main">
        <section
          id="about"
          className="hero"
          aria-labelledby="hero-name"
        >
          <div className="hero-grid">
            <div className="hero-text-block">
              <Eyebrow label="Identity & access" />

              <h1 id="hero-name" className="hero-name">
                Manny Flores
              </h1>
              <p className="hero-role">
                Senior Systems Engineer · Corporate Systems lead, Robinhood
              </p>
              <p className="hero-place">SF Bay Area · in role since 2024</p>

              <p className="hero-lede">
                Identity has been my whole career: who gets in, what they can touch,
                and how access ends when they leave. Ten years of that across fintech
                and healthcare. Lately the newest users on the network are not people,
                so the job now is making sure AI tools live by the same rules as
                everyone else:
                <span className="accent">who, and what, can do what.</span>
              </p>
            </div>

            <div className="hero-cta-row">
              <FramerButton
                href="/resume.pdf"
                onClick={(e) => { e.preventDefault(); setResumeOpen(true); }}
              >
                Resume <IconArrow />
              </FramerButton>
              <FramerButton href="mailto:manny@flores.network" variant="ghost">
                Get in Touch
              </FramerButton>
              <FramerButton
                href="https://linkedin.com/in/mannyflores11"
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
              >
                LinkedIn
              </FramerButton>
              <FramerButton
                href="https://github.com/tunnelslug"
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
              >
                GitHub
              </FramerButton>
            </div>

            <figure className="hero-portrait-block">
              <img
                src="/profile2.png"
                alt="Portrait of Manny Flores"
                className="hero-portrait"
                width="220"
                height="220"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </figure>

            <nav className="mandate-index" aria-label="Access domains at a glance">
              {scope.map((item, i) => (
                <a
                  key={item.domain}
                  className="mandate-index-item"
                  href={`#scope-${i + 1}`}
                >
                  <span className="mandate-index-num">{String(i + 1).padStart(2, '0')}</span>
                  <strong>{item.domain}</strong>
                </a>
              ))}
            </nav>
          </div>
        </section>

        <section
          id="scope"
          className="section"
          aria-labelledby="scope-h"
        >
          <Eyebrow label="Scope" />
          <h2 id="scope-h" className="section-headline">
            Access domains.
          </h2>
          <p className="section-lede">
            The identity, cloud, and collaboration stack the company runs on.
            The mandate: harden the foundation, make AI tooling adoptable, keep sprawl down.
          </p>

          <div className="scope-list">
            {scope.map((item, i) => (
              <div key={item.domain} className="scope-row" id={`scope-${i + 1}`}>
                <span className="scope-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div className="scope-body">
                  <h3>{item.domain}</h3>
                  <p>{item.desc}</p>
                </div>
                <span className={`pill pill--${item.state}`}>{item.state}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          id="plan"
          className="section"
          aria-labelledby="plan-h"
        >
          <Eyebrow label="Trajectory" />
          <h2 id="plan-h" className="section-headline">
            What changed.
          </h2>
          <p className="section-lede">
            A decade of identity work across fintech and healthcare.
            Every line is on the <button className="lede-link" onClick={() => setResumeOpen(true)}>resume</button>.
          </p>

          <div className="change-log">
            {changeLog.map((group) => (
              <div key={group.kind} className={`change-group change-group--${group.kind}`}>
                <h3 className="change-group-label">{group.label}</h3>
                {group.items.map((item) => (
                  <div key={item.title} className="change-item">
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section
          id="projects"
          className="section"
          aria-labelledby="projects-h"
        >
          <Eyebrow label="Shipped & shipping" />
          <h2 id="projects-h" className="section-headline">
            Current focus.
          </h2>

          <div className="project-list">
            {currentProjects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                status={project.status}
                description={project.description}
                tags={project.tags}
              />
            ))}
          </div>
        </section>

        <section
          id="stack"
          className="section"
          aria-labelledby="stack-h"
        >
          <Eyebrow label="Capability" />
          <h2 id="stack-h" className="section-headline">
            Stack.
          </h2>

          <div className="skills-grid">
            {skills.map((group) => (
              <div key={group.category}>
                <div className="skill-group-title">
                  {group.category}
                </div>
                <div className="flex flex-wrap gap-1">
                  {group.items.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="colophon" aria-label="Site footer">
        <div className="colophon-meta">
          <span>© {year} Manny Flores · SF Bay Area</span>
          <span>mannyflo.com</span>
        </div>
      </footer>

      <Analytics />
      <SpeedInsights />
      <ResumeDialog open={resumeOpen} onOpenChange={setResumeOpen} />
    </>
  );
};

export default App;
