import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ResumeDialog from './components/ResumeDialog';
import BootCeremony from './components/BootCeremony';
import ProjectCard from './components/ProjectCard';
import ThemeToggle from './components/ThemeToggle';
import FramerButton from './components/FramerButton';
import IdentityGraph from './components/IdentityGraph';
import RoleSwitch from './components/RoleSwitch';
import AuditLog from './components/AuditLog';
import MobileDock from './components/MobileDock';
import { audit } from './lib/audit';
import { useRole, setStoredRole } from './lib/role';
import {
  ROLES,
  lens,
  sectionCopy,
  scope,
  planLines,
  planAriaLabel,
  projects,
  skills,
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

const NAV_SECTIONS = [
  { id: 'about',    label: 'about' },
  { id: 'scope',    label: 'scope' },
  { id: 'plan',     label: 'the plan' },
  { id: 'projects', label: 'current focus' },
  { id: 'stack',    label: 'stack' },
];

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

const App = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [booted, setBooted] = useState(false);
  const [ctaOnScreen, setCtaOnScreen] = useState(true);
  const role = useRole();
  const shouldReduceMotion = useReducedMotion();
  const lastViewed = useRef(null);
  const sessionIssued = useRef(false);
  const ctaRef = useRef(null);

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

  // Issue the visitor's session once, after hydration.
  useEffect(() => {
    if (sessionIssued.current) return;
    sessionIssued.current = true;
    audit('session.issued', `guest@mannyflo.com · role:${role} · ttl:24h`);
  }, [role]);

  const onBooted = useCallback(() => setBooted(true), []);

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

  const now = new Date();
  const year = now.getFullYear();
  const monthNum = String(now.getMonth() + 1).padStart(2, '0');
  const plain = role === 'anyone';

  return (
    <>
      <BootCeremony oncePerSession onDone={onBooted} />

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

      {/* Masthead · the visitor's session: who you are here, what you can read, what got logged */}
      <div className="masthead">
        <div className="masthead-session">
          <span className="masthead-dot" aria-hidden="true">●</span>
          <span>session {year}.{monthNum}</span>
          <span className="masthead-user">guest@mannyflo.com</span>
        </div>
        <div className="masthead-controls">
          <RoleSwitch role={role} onChange={setRole} />
          <AuditLog />
        </div>
      </div>

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
              <motion.div variants={faderVariants(shouldReduceMotion)}>
                <Eyebrow label="IDENTITY & ACCESS MANAGEMENT" />
              </motion.div>

              <motion.h1 id="hero-name" className="hero-name" variants={faderVariants(shouldReduceMotion)}>
                Manny Flores
              </motion.h1>
              <motion.p className="hero-role" variants={faderVariants(shouldReduceMotion)}>
                Senior Systems Engineer · Corporate Systems lead, Robinhood
              </motion.p>

              <motion.p className="hero-lede" variants={faderVariants(shouldReduceMotion)}>
                Identity has been my whole career: who gets in, what they can touch,
                and how access ends when they leave. Ten years of that across fintech
                and healthcare. Lately the newest users on the network are not people,
                so the job now is making sure AI tools live by the same rules as
                everyone else: <span className="accent">who, and what, can do what</span>.
              </motion.p>
            </motion.div>

            <motion.div ref={ctaRef} className="hero-cta-row" variants={faderVariants(shouldReduceMotion)}>
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

            <motion.figure className="hero-fabric" variants={faderVariants(shouldReduceMotion)}>
              <IdentityGraph role={role} live={booted} />
            </motion.figure>
          </div>
        </motion.section>

        {/* Scope · Access domains */}
        <motion.section
          id="scope"
          className="section"
          aria-labelledby="scope-h"
          variants={staggerContainer(shouldReduceMotion)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.div variants={faderVariants(shouldReduceMotion)}>
            <Eyebrow label="SCOPE" />
          </motion.div>
          <motion.h2 id="scope-h" className="section-headline" variants={faderVariants(shouldReduceMotion)}>
            <Lens role={role} pair={sectionCopy.scope.headline} />
          </motion.h2>
          <motion.p className="section-lede" variants={faderVariants(shouldReduceMotion)}>
            <Lens role={role} pair={sectionCopy.scope.lede} />
          </motion.p>

          <motion.div className="scope-list" variants={staggerContainer(shouldReduceMotion)}>
            {scope.map((item, i) => (
              <motion.div key={i} className="scope-row" variants={faderVariants(shouldReduceMotion)}>
                <span className="scope-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div className="scope-body">
                  <h3><Lens role={role} pair={item.title} /></h3>
                  <p><Lens role={role} pair={item.desc} /></p>
                </div>
                <span className={`pill pill--${item.state}`}>{item.state}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Plan · career as a plan diff */}
        <motion.section
          id="plan"
          className="section"
          aria-labelledby="plan-h"
          variants={staggerContainer(shouldReduceMotion)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.div variants={faderVariants(shouldReduceMotion)}>
            <Eyebrow label="TRAJECTORY" />
          </motion.div>
          <motion.h2 id="plan-h" className="section-headline" variants={faderVariants(shouldReduceMotion)}>
            <Lens role={role} pair={sectionCopy.plan.headline} />
          </motion.h2>
          <motion.p className="section-lede" variants={faderVariants(shouldReduceMotion)}>
            <Lens role={role} pair={sectionCopy.plan.lede} />
            <button className="lede-link" onClick={openResume}>resume</button>.{' '}
            {plain ? (
              <button className="lede-link" onClick={() => setRole('engineer')}>Back to the engineer view.</button>
            ) : (
              <button className="lede-link" onClick={() => setRole('anyone')}>Not an engineer? Read it in plain English.</button>
            )}
          </motion.p>

          <motion.div
            className={`plan-block ${plain ? 'plan-block--annotated' : ''}`}
            variants={planContainer(shouldReduceMotion)}
          >
            <div className="plan-titlebar" aria-hidden="true">
              <span>terraform plan{plain && <span className="plan-titlebar-flag"> · annotated</span>}</span>
              <span className="plan-titlebar-right">career/manny-flores</span>
            </div>
            <div
              className="plan-lines"
              role="img"
              tabIndex={0}
              aria-label={planAriaLabel}
            >
              {planLines.map((line, i) => (
                <motion.div
                  key={i}
                  className={`plan-line plan-line--${line.type}`}
                  variants={planLineVariants(shouldReduceMotion)}
                >
                  <span className="plan-line-text">{line.text}</span>
                  {plain && <span className="plan-gloss lens">{line.gloss}</span>}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Projects · Currently Building */}
        <motion.section
          id="projects"
          className="section"
          aria-labelledby="projects-h"
          variants={staggerContainer(shouldReduceMotion)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.div variants={faderVariants(shouldReduceMotion)}>
            <Eyebrow label="SHIPPED & SHIPPING" />
          </motion.div>
          <motion.h2 id="projects-h" className="section-headline" variants={faderVariants(shouldReduceMotion)}>
            <Lens role={role} pair={sectionCopy.projects.headline} />
          </motion.h2>

          <motion.div className="project-list" variants={staggerContainer(shouldReduceMotion)}>
            {projects.map((project, index) => (
              <motion.div key={index} variants={faderVariants(shouldReduceMotion)}>
                <ProjectCard
                  title={<Lens role={role} pair={project.title} />}
                  status={project.status}
                  description={<Lens role={role} pair={project.desc} />}
                  tags={project.tags}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Stack · Tools */}
        <motion.section
          id="stack"
          className="section"
          aria-labelledby="stack-h"
          variants={staggerContainer(shouldReduceMotion)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.div variants={faderVariants(shouldReduceMotion)}>
            <Eyebrow label="CAPABILITY" />
          </motion.div>
          <motion.h2 id="stack-h" className="section-headline" variants={faderVariants(shouldReduceMotion)}>
            <Lens role={role} pair={sectionCopy.stack.headline} />
          </motion.h2>

          <motion.div className="skills-grid" variants={staggerContainer(shouldReduceMotion)}>
            {skills.map((group, index) => (
              <motion.div key={index} variants={faderVariants(shouldReduceMotion)}>
                <div className="skill-group-title">
                  <span className="skill-group-bar" aria-hidden="true" />
                  {group.category}
                </div>
                {plain && <p className="skill-group-plain lens">{group.plain}</p>}
                <motion.div className="flex flex-wrap gap-1" variants={staggerContainer(shouldReduceMotion)}>
                  {group.items.map((skill, i) => (
                    <motion.span
                      key={i}
                      className="skill-tag"
                      variants={faderVariants(shouldReduceMotion)}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

      </main>

      {/* Footer */}
      <footer className="colophon" aria-label="Site footer">
        <div className="colophon-meta">
          <span>© {year} Manny Flores · SF Bay Area</span>
          <span className="tabular">exit 0</span>
        </div>
      </footer>

      <MobileDock
        visible={booted && !ctaOnScreen && !resumeOpen && !isMenuOpen}
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
