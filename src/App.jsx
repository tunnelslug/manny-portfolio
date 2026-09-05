import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ResumeDialog from './components/ResumeDialog';
import CaseStudy from './components/CaseStudy';
import ThemeToggle from './components/ThemeToggle';
import FramerButton from './components/FramerButton';
import IdentityGraph from './components/IdentityGraph';
import RoleSwitch from './components/RoleSwitch';
import AuditLog from './components/AuditLog';
import MobileDock from './components/MobileDock';
import { audit } from './lib/audit';
import { useRole, setStoredRole } from './lib/role';
import { useMediaQuery } from './lib/useMediaQuery';
import {
  ROLES,
  lens,
  sectionCopy,
  capabilities,
  planLines,
  planAriaLabel,
  projects,
} from './content/portfolio';

const IconArrow = () => <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />;

const Eyebrow = ({ label }) => (
  <div className="eyebrow">
    <span>{label}</span>
  </div>
);

/* Text that changes with the reader's role. The key remount replays the
   .lens entrance so the swap reads as a deliberate re-render, not a flicker. */
const Lens = ({ role, pair }) => <span key={role} className="lens">{lens(role, pair)}</span>;

/* One name per section: the nav item, the eyebrow, and the hash all agree. */
const NAV_SECTIONS = [
  { id: 'about',        label: 'about',        eyebrow: 'IDENTITY & ACCESS MANAGEMENT' },
  { id: 'capabilities', label: 'capabilities', eyebrow: 'CAPABILITIES' },
  { id: 'plan',         label: 'the plan',     eyebrow: 'THE PLAN' },
  { id: 'building',     label: 'building',     eyebrow: 'BUILDING NOW' },
  { id: 'contact',      label: 'contact',      eyebrow: 'CONTACT' },
];
const eyebrowFor = (id) => NAV_SECTIONS.find((s) => s.id === id).eyebrow;

/* A plan line is `statement` plus, optionally, a `# comment` after a run of
   two or more spaces. Splitting them lets phones drop the comment to its
   own line while desktop keeps the aligned column. */
const splitPlanLine = (text) => {
  const i = text.search(/\s{2,}#\s/);
  return i === -1 ? [text, null] : [text.slice(0, i), text.slice(i)];
};

const faderVariants = (shouldReduceMotion) => shouldReduceMotion ? {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.01 } }
} : {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.165, 0.84, 0.44, 1],
    }
  }
};

const staggerContainer = (shouldReduceMotion) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: shouldReduceMotion ? 0.01 : 0.08,
    }
  }
});

/* Plan lines print like terminal output: quick per-line stagger. */
const planLineVariants = (shouldReduceMotion) => shouldReduceMotion ? {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { duration: 0.01 } }
} : {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18, ease: 'linear' } }
};

const planContainer = (shouldReduceMotion) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: shouldReduceMotion ? 0.01 : 0.14,
    }
  }
});

const Section = ({ id, labelledBy, className = '', shouldReduceMotion, children }) => (
  <motion.section
    id={id}
    className={`section ${className}`}
    aria-labelledby={labelledBy}
    variants={staggerContainer(shouldReduceMotion)}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-10%" }}
  >
    <motion.div variants={faderVariants(shouldReduceMotion)}>
      <Eyebrow label={eyebrowFor(id)} />
    </motion.div>
    {children}
  </motion.section>
);

const App = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [live, setLive] = useState(false);
  const [ctaOnScreen, setCtaOnScreen] = useState(true);
  const role = useRole();
  const shouldReduceMotion = useReducedMotion();
  // Phones get a plain hero; the access fabric is desktop only. SSR renders
  // desktop, and CSS hides the fabric below 768px until the client corrects.
  const phone = useMediaQuery('(max-width: 768px)');
  const lastViewed = useRef(null);
  const sessionIssued = useRef(false);
  const ctaRef = useRef(null);

  // The fabric draws in once the page has painted.
  useEffect(() => {
    const id = setTimeout(() => setLive(true), 220);
    return () => clearTimeout(id);
  }, []);

  // The docked bar takes over once the hero CTAs leave the viewport.
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setCtaOnScreen(entry.isIntersecting));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const setRole = useCallback((next) => {
    if (!ROLES.includes(next) || next === role) return;
    audit('role.changed', `${role} -> ${next}`);
    setStoredRole(next);
  }, [role]);

  // The visitor's reading session: read-only, no login, lives in this tab.
  useEffect(() => {
    if (sessionIssued.current) return;
    sessionIssued.current = true;
    audit('session.issued', `read-only · role:${role} · this tab`);
  }, [role]);

  // Sync active nav item to scroll position; log each section entered.
  useEffect(() => {
    const observers = NAV_SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          setActiveSection(id);
          if (lastViewed.current !== id) {
            lastViewed.current = id;
            audit('section.viewed', `#${id}`);
          }
        },
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
    const valid = NAV_SECTIONS.some(s => s.id === hash);
    if (!valid) return;
    const el = document.getElementById(hash);
    if (el) {
      setActiveSection(hash);
      requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }));
    }
  }, []);

  const openResume = () => {
    audit('resume.opened', '/resume.pdf');
    setResumeOpen(true);
  };

  const followed = (name) => () => audit('link.followed', name);

  const year = new Date().getFullYear();
  const recruiter = role === 'recruiter';
  const fade = faderVariants(shouldReduceMotion);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>

      {/* Papel picado stripe · identity mark, matches the favicon, once at the very top */}
      <div className="papel-band" role="presentation" aria-hidden="true">
        <span style={{ background: '#E6376A' }} />
        <span style={{ background: '#1E4FA6' }} />
        <span style={{ background: '#D6A03B' }} />
        <span style={{ background: '#C25425' }} />
        <span style={{ background: '#4A7F5C' }} />
        <span style={{ background: '#1F3F8C' }} />
        <span style={{ background: '#1B1208' }} />
      </div>

      {/* Masthead · the reading session: what this is, which lens, what got logged */}
      <aside className="masthead" aria-label="Reading session">
        <div className="masthead-session">
          <span className="masthead-dot" aria-hidden="true">●</span>
          <span>read-only</span>
          <span className="masthead-user">no login · this tab</span>
        </div>
        <div className="masthead-controls">
          <RoleSwitch role={role} onChange={setRole} />
          <AuditLog />
        </div>
      </aside>

      {/* Navigation */}
      <header className="nav-shell">
        <nav className="nav-row" aria-label="Main navigation">
          <button
            className="wordmark"
            onClick={() => scrollToSection('about')}
            aria-label="mannyflo, return to top"
          >
            mannyflo<span className="wordmark-dot">.</span>
          </button>

          <div className="flex items-center gap-4">
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
        <div className="nav-progress" aria-hidden="true" />
      </header>

      {/* Mobile nav drawer */}
      <div
        className={`nav-scrim ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />
      <div
        id="mobile-nav"
        className={`nav-mobile ${isMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
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
        {/* On phones the masthead is hidden; the log lives here (the lens is in the hero). */}
        <div className="nav-mobile-tools">
          <span className="nav-mobile-session"><span className="masthead-dot" aria-hidden="true">●</span> read-only · this tab</span>
          <AuditLog />
        </div>
      </div>

      <main id="main" data-role={role}>
        {/* Hero / About */}
        <motion.section
          id="about"
          className="hero"
          aria-labelledby="hero-name"
          variants={staggerContainer(shouldReduceMotion)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <div className="hero-grid">
            <motion.div className="hero-text-block" variants={staggerContainer(shouldReduceMotion)}>
              <motion.div variants={fade}>
                <Eyebrow label={eyebrowFor('about')} />
              </motion.div>

              <div className="hero-id">
                {phone && (
                  <motion.img
                    src="/portrait-152.webp"
                    alt="Portrait of Manny Flores"
                    className="hero-portrait"
                    width="152"
                    height="152"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    variants={fade}
                  />
                )}
                <div>
                  <motion.h1 id="hero-name" className="hero-name" variants={fade}>
                    Manny Flores
                  </motion.h1>
                  <motion.p className="hero-role" variants={fade}>
                    Senior Systems Engineer · Corporate Systems Lead, Robinhood
                  </motion.p>
                </div>
              </div>

              {phone && (
                /* Phones have no masthead; the lens has to be findable in the first screen. */
                <motion.div className="hero-lens" variants={fade}>
                  <RoleSwitch role={role} onChange={setRole} compact />
                </motion.div>
              )}

              <motion.p className="hero-lede" variants={fade}>
                Identity is what I do: who gets in, what they can touch, and how
                access ends when they leave. Ten years of building that across fintech
                and healthcare: sign-in and provisioning, governance and audit, acquired
                companies folded into one standard, and the rules that hold AI tools to
                the same bar as everyone else. The question never changes:{' '}
                <span className="accent">who, or what, is asking, what may it do, and can I prove it later</span>.
              </motion.p>
            </motion.div>

            <motion.div ref={ctaRef} className="hero-cta-row" variants={fade}>
              <FramerButton href="mailto:manny@flores.network" onClick={followed('mailto')}>
                Get in Touch <IconArrow />
              </FramerButton>
              <FramerButton
                href="https://linkedin.com/in/mannyflores11"
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                onClick={followed('linkedin')}
              >
                LinkedIn
              </FramerButton>
              <FramerButton
                href="https://github.com/tunnelslug"
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                onClick={followed('github')}
              >
                GitHub
              </FramerButton>
              <FramerButton
                variant="ghost"
                href="/resume.pdf"
                onClick={(e) => { e.preventDefault(); openResume(); }}
              >
                Resume
              </FramerButton>
            </motion.div>

            {phone && (
              /* The buttons are the last thing in a phone's first screen and
                 read like the end of the page. This says what follows. */
              <motion.nav className="hero-next" aria-label="Sections below" variants={fade}>
                <span className="hero-next-arrow" aria-hidden="true">↓</span>
                {NAV_SECTIONS.filter((s) => s.id !== 'about').map((s, i) => (
                  <React.Fragment key={s.id}>
                    {i > 0 && <span className="hero-next-sep" aria-hidden="true">·</span>}
                    <button type="button" className="hero-next-item" onClick={() => scrollToSection(s.id)}>
                      {s.label}
                    </button>
                  </React.Fragment>
                ))}
              </motion.nav>
            )}

            {!phone && (
              <motion.figure className="hero-fabric" variants={fade}>
                <IdentityGraph role={role} live={live} />
              </motion.figure>
            )}
          </div>
        </motion.section>

        {/* Capabilities · what he can own, and the tools it takes */}
        <Section id="capabilities" labelledBy="capabilities-h" shouldReduceMotion={shouldReduceMotion}>
          <motion.h2 id="capabilities-h" className="section-headline" variants={fade}>
            <Lens role={role} pair={sectionCopy.capabilities.headline} />
          </motion.h2>
          <motion.p className="section-lede" variants={fade}>
            <Lens role={role} pair={sectionCopy.capabilities.lede} />
          </motion.p>

          <motion.div className="cap-list" variants={staggerContainer(shouldReduceMotion)}>
            {capabilities.map((item, i) => (
              <motion.div key={i} className="cap-row" variants={fade}>
                <span className="cap-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="cap-title"><Lens role={role} pair={item.title} /></h3>
                <div className="cap-body">
                  <p><Lens role={role} pair={item.desc} /></p>
                  <ul className="cap-tools" aria-label="Tools">
                    {item.tools.map((tool) => (
                      <li key={tool} className="chip">{tool}</li>
                    ))}
                  </ul>
                </div>
                <span className={`pill pill--${item.state}`}>{item.state}</span>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* Plan · career as a plan diff */}
        <Section id="plan" labelledBy="plan-h" shouldReduceMotion={shouldReduceMotion}>
          <motion.h2 id="plan-h" className="section-headline" variants={fade}>
            <Lens role={role} pair={sectionCopy.plan.headline} />
          </motion.h2>
          <motion.p className="section-lede" variants={fade}>
            <Lens role={role} pair={sectionCopy.plan.lede} />
            <button className="lede-link" onClick={openResume}>resume</button>.{' '}
            {recruiter ? (
              <button className="lede-link" onClick={() => setRole('engineer')}>Back to the engineer view.</button>
            ) : (
              <button className="lede-link" onClick={() => setRole('recruiter')}>Hiring? Read it as a recruiter.</button>
            )}
          </motion.p>

          <motion.div
            className={`plan-block ${recruiter ? 'plan-block--annotated' : ''}`}
            variants={planContainer(shouldReduceMotion)}
          >
            <div className="plan-titlebar" aria-hidden="true">
              <span>terraform plan{recruiter && <span className="plan-titlebar-flag"> · annotated</span>}</span>
              <span className="plan-titlebar-right">career/manny-flores</span>
            </div>
            <div
              className="plan-lines"
              role="img"
              tabIndex={0}
              aria-label={planAriaLabel}
            >
              {planLines.map((line, i) => {
                const [statement, comment] = splitPlanLine(line.text);
                return (
                  <motion.div
                    key={i}
                    className={`plan-line plan-line--${line.type}`}
                    variants={planLineVariants(shouldReduceMotion)}
                  >
                    <span className="plan-line-text">
                      {statement}
                      {comment && <span className="plan-comment">{comment}</span>}
                    </span>
                    {recruiter && <span className="plan-gloss lens">{line.gloss}</span>}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </Section>

        {/* Building now · each with its artifact or shape */}
        <Section id="building" labelledBy="building-h" shouldReduceMotion={shouldReduceMotion}>
          <motion.h2 id="building-h" className="section-headline" variants={fade}>
            <Lens role={role} pair={sectionCopy.building.headline} />
          </motion.h2>
          <motion.p className="section-lede" variants={fade}>
            <Lens role={role} pair={sectionCopy.building.lede} />
          </motion.p>

          <motion.div className="case-list" variants={staggerContainer(shouldReduceMotion)}>
            {projects.map((project, index) => (
              <motion.div key={index} variants={fade}>
                <CaseStudy
                  title={<Lens role={role} pair={project.title} />}
                  status={project.status}
                  description={<Lens role={role} pair={project.desc} />}
                  tags={project.tags}
                  proof={project.proof}
                  onFollow={followed}
                />
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* Contact · the page ends on the ask, not on a chip cloud */}
        <Section id="contact" labelledBy="contact-h" className="section--contact" shouldReduceMotion={shouldReduceMotion}>
          <motion.h2 id="contact-h" className="section-headline" variants={fade}>
            <Lens role={role} pair={sectionCopy.contact.headline} />
          </motion.h2>
          <motion.p className="section-lede" variants={fade}>
            <Lens role={role} pair={sectionCopy.contact.lede} />
          </motion.p>
          <motion.div className="contact-row" variants={fade}>
            <FramerButton href="mailto:manny@flores.network" onClick={followed('mailto')}>
              manny@flores.network <IconArrow />
            </FramerButton>
            <FramerButton
              href="https://linkedin.com/in/mannyflores11"
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              onClick={followed('linkedin')}
            >
              LinkedIn
            </FramerButton>
            <FramerButton
              variant="ghost"
              href="/resume.pdf"
              onClick={(e) => { e.preventDefault(); openResume(); }}
            >
              Resume
            </FramerButton>
          </motion.div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="colophon" aria-label="Site footer">
        <div className="colophon-meta">
          <span>© {year} Manny Flores · SF Bay Area</span>
          <span className="tabular">exit 0</span>
        </div>
      </footer>

      <MobileDock
        visible={!ctaOnScreen && !resumeOpen && !isMenuOpen}
        onResume={openResume}
        onFollow={followed}
      />

      <Analytics />
      <SpeedInsights />
      <ResumeDialog open={resumeOpen} onOpenChange={setResumeOpen} />
    </>
  );
};

export default App;
