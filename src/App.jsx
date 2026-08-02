import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ResumeDialog from './components/ResumeDialog';
import ExpertiseCard from './components/ExpertiseCard';
import ProjectCard from './components/ProjectCard';
import StewardCard from './components/StewardCard';
import ThemeToggle from './components/ThemeToggle';
import FramerButton from './components/FramerButton';

const IconArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const Eyebrow = ({ chapter, label }) => (
  <div className={`eyebrow${chapter ? ` eyebrow-ch-${chapter}` : ''}`}>
    <span className="eyebrow-dot" aria-hidden="true">●</span>
    <span>
      {chapter ? `CHAPTER ${chapter} · ` : ''}
      {label}
    </span>
  </div>
);

const NAV_SECTIONS = [
  { id: 'about',      label: 'about' },
  { id: 'trajectory', label: 'stewardship' },
  { id: 'projects',   label: 'in the making' },
  { id: 'stack',      label: 'the platform' },
];

const AnimatedUnderline = () => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <svg 
      className="absolute left-[-2px] right-[-2px] bottom-[-2px] w-[calc(100%+4px)] h-[5px] pointer-events-none" 
      viewBox="0 0 100 5" 
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d="M0,4 C12,1 25,4.5 38,3 C51,1.5 63,4.5 75,3 C85,1.5 93,4 100,3"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={
          shouldReduceMotion 
            ? { duration: 0.01 }
            : { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
        }
      />
    </svg>
  );
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

const portraitVariants = (shouldReduceMotion) => shouldReduceMotion ? {
  hidden: { opacity: 1, scale: 1 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.01 } }
} : {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1] } }
};

const App = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Sync active nav item to scroll position
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
    const valid = NAV_SECTIONS.some(s => s.id === hash);
    if (!valid) return;
    const el = document.getElementById(hash);
    if (el) {
      setActiveSection(hash);
      requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }));
    }
  }, []);

  const skills = [
    { category: 'Identity & Access', items: ['Okta OIE', 'SAML 2.0', 'OAuth 2.0', 'OIDC', 'SCIM', 'RBAC', 'Zero Trust'] },
    { category: 'Automation & IaC', items: ['Python', 'Bash', 'Okta Workflows', 'Terraform', 'GCP IAM', 'APIs & Integrations'] },
    { category: 'Corp Apps Infra', items: ['GCP', 'Google Workspace', 'Okta', 'Slack', 'Jira', 'Workday'] },
    { category: 'AI & Governance', items: ['MCP', 'AI Orchestration', 'LLM Access Controls', 'Sprawl Prevention', 'OIG', 'ABAC'] },
  ];

  const expertise = [
    {
      title: 'Identity & Access Management',
      description: 'I own the identity stack: how people get in, what they can touch, and how access ends when they leave.',
      details: [
        'Okta administration, SAML 2.0, OAuth 2.0, OIDC integrations',
        'SCIM provisioning and user lifecycle automation',
        'Zero Trust architecture and RBAC policy design',
        'SOX compliance and IAM roadmap ownership',
      ],
    },
    {
      title: 'AI-Powered Identity Automation',
      description: "Building the identity layer that lets enterprise AI tools work: bridging Okta auth to apps that don't support direct OAuth, and handling the lifecycle edge cases SCIM can't reach.",
      details: [
        'Okta MCP integrations enabling enterprise AI tool adoption',
        'LLM access governance for enterprise AI tools',
        "Lifecycle edge cases beyond SCIM's reach",
        'Self-healing identity workflows',
      ],
    },
    {
      title: 'Automation & Integration Engineering',
      description: 'Removing repetitive ops work with scripts and integrations built to hold up over time.',
      details: [
        'Okta Workflows for identity lifecycle events',
        'Python and Bash scripting for system automation',
        'API integrations across SaaS, ITSM, and HRIS platforms',
        'Terraform for infrastructure-as-code',
      ],
    },
    {
      title: 'Corporate Applications Infrastructure',
      description: 'I own the core infrastructure layer the company depends on to build and ship: Okta, GCP, and Google Workspace.',
      details: [
        'Okta administration and Terraform-based IaC for identity',
        'GCP governance aligned to company AI workloads and sprawl prevention',
        'Google Workspace security hardening and administration',
        'Technical review authorship for identity changes',
        'Lifecycle governance and tech debt execution',
      ],
    },
  ];

  const currentProjects = [
    {
      title: 'Terraform Okta: Identity as Code',
      status: 'Building',
      description: 'Moving Okta config from clicks to Terraform. Config drift disappears, changes get reviewed like code, and policy stays consistent across the tenant.',
      tags: ['Okta', 'Terraform', 'IaC', 'Identity Infrastructure', 'Corp Apps'],
    },
    {
      title: 'Secure GCP for AI Workloads',
      status: 'Building',
      description: 'Building the GCP foundation that lets engineers ship AI-assisted tools to production safely. Terraform-managed IAM, project structure, and access controls, so teams move from local prototypes to hosted services without creating sprawl.',
      tags: ['GCP', 'Terraform', 'IAM', 'AI Enablement', 'Sprawl Prevention'],
    },
    {
      title: 'Google Workspace Security Hardening',
      status: 'Building',
      description: "Tightening Google Workspace: access policies, DLP, third-party OAuth, audit coverage. The attack surface gets bigger every time someone installs a new AI tool, and that's the part I'm watching.",
      tags: ['Google Workspace', 'DLP', 'OAuth Governance', 'Security', 'Corp Apps'],
    },
  ];

  const stewardship = [
    { area: 'Identity & Access Architecture', desc: 'Zero-trust design, Okta lifecycle automation, and enterprise SSO for the workforce.' },
    { area: 'Cloud Governance (GCP)',         desc: 'Preventing infrastructure sprawl while enabling engineers to safely deploy AI workloads to production.' },
    { area: 'Collaboration Security',         desc: 'Google Workspace hardening, OAuth risk management, and Data Loss Prevention (DLP).' },
    { area: 'Technical Strategy',             desc: 'Leading engineering reviews, resolving high-impact technical debt, and defining roadmap execution.' },
  ];

  const now = new Date();
  const year = now.getFullYear();
  const monthNum = String(now.getMonth() + 1).padStart(2, '0');
  const monthName = now.toLocaleString('en-US', { month: 'long' });

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>

      {/* Masthead · magazine top rule */}
      <div className="masthead" role="presentation">
        <span className="masthead-dot" aria-hidden="true">●</span>
        <span>Cuaderno · {year}</span>
        <span className="masthead-spacer" />
        <span>No. {monthNum} · {monthName}</span>
      </div>

      {/* Heritage Ribbon · papel-picado color band, once per page */}
      <div className="heritage-ribbon" role="presentation" aria-hidden="true">
        <span className="ribbon-stewardship" />
        <span className="ribbon-making" />
        <span className="ribbon-stack" />
      </div>

      {/* Navigation */}
      <header className="nav-shell">
        <nav className="nav-row" aria-label="Main navigation">
          <button
            className="wordmark"
            onClick={() => scrollToSection('about')}
            aria-label="mannyflo, return to top"
          >
            mannyflo.
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

      <main id="main">
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
                <Eyebrow label="ENGINEER" />
              </motion.div>

              <motion.h1 id="hero-name" className="hero-name" variants={faderVariants(shouldReduceMotion)}>
                Manny Flores
              </motion.h1>
              <motion.p className="hero-role" variants={faderVariants(shouldReduceMotion)}>
                Senior Systems Engineer
              </motion.p>

              <motion.p className="hero-lede" variants={faderVariants(shouldReduceMotion)}>
                Securing the perimeter and infrastructure for the company's workforce. 
                I architect the <span className="accent">identity lifecycle and access governance</span>{' '}
                that allows engineers to adopt AI tooling safely, without compromising zero-trust.
              </motion.p>
            </motion.div>

            <motion.div className="hero-cta-row" variants={faderVariants(shouldReduceMotion)}>
              <FramerButton href="mailto:manny@flores.network">
                Get in Touch <IconArrow />
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
                variant="ghost"
                onClick={() => setResumeOpen(true)}
              >
                Resume
              </FramerButton>
            </motion.div>

            <motion.div className="hero-meta" aria-label="Current role and location" variants={faderVariants(shouldReduceMotion)}>
              <span className="hero-meta-mark" aria-hidden="true">●</span>
              <span>Robinhood</span>
              <span className="hero-meta-sep" aria-hidden="true">·</span>
              <span>Corporate Apps Infra</span>
              <span className="hero-meta-sep" aria-hidden="true">·</span>
              <span>SF Bay Area</span>
              <span className="hero-meta-sep" aria-hidden="true">·</span>
              <span>2024 to present</span>
            </motion.div>

            <motion.img
              src="/profile2.png"
              alt="Portrait of Manny Flores"
              className="hero-portrait"
              width="240"
              height="240"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              variants={portraitVariants(shouldReduceMotion)}
            />
          </div>
        </motion.section>

        {/* Trajectory · What I Steward */}
        <motion.section 
          id="trajectory" 
          className="section" 
          aria-labelledby="trajectory-h"
          variants={staggerContainer(shouldReduceMotion)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.div variants={faderVariants(shouldReduceMotion)}>
            <Eyebrow chapter="01" label="SCOPE" />
          </motion.div>
          <motion.h2 id="trajectory-h" className="section-headline" variants={faderVariants(shouldReduceMotion)}>
            Stewardship.
          </motion.h2>
          <motion.p className="section-lede" variants={faderVariants(shouldReduceMotion)}>
            I own the identity, cloud, and collaboration stack that the company runs on at Robinhood.
            The mandate: harden the foundation, make AI tooling adoptable, and keep things from sprawling.
          </motion.p>

          <motion.div className="steward-grid" variants={staggerContainer(shouldReduceMotion)}>
            {stewardship.map((item, i) => (
              <motion.div key={i} variants={faderVariants(shouldReduceMotion)}>
                <StewardCard
                  num={String(i + 1).padStart(2, '0')}
                  area={item.area}
                  description={item.desc}
                />
              </motion.div>
            ))}
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
            <Eyebrow chapter="02" label="CURRENT FOCUS" />
          </motion.div>
          <motion.h2 id="projects-h" className="section-headline relative inline-block" variants={faderVariants(shouldReduceMotion)}>
            In the <em>making<AnimatedUnderline /></em>.
          </motion.h2>

          <motion.div className="project-list" variants={staggerContainer(shouldReduceMotion)}>
            {currentProjects.map((project, index) => (
              <motion.div key={index} variants={faderVariants(shouldReduceMotion)}>
                <ProjectCard
                  title={project.title}
                  status={project.status}
                  description={project.description}
                  tags={project.tags}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Stack · Expertise + Tools */}
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
            <Eyebrow chapter="03" label="THE PLATFORM" />
          </motion.div>
          <motion.h2 id="stack-h" className="section-headline" variants={faderVariants(shouldReduceMotion)}>
            Stack.
          </motion.h2>

          <motion.div className="expertise-grid" variants={staggerContainer(shouldReduceMotion)}>
            {expertise.map((item, index) => (
              <motion.div key={index} variants={faderVariants(shouldReduceMotion)}>
                <ExpertiseCard
                  num={String(index + 1).padStart(2, '0')}
                  title={item.title}
                  description={item.description}
                  details={item.details}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="stack-tools" variants={faderVariants(shouldReduceMotion)}>
            <div className="stack-tools-label">
              <span className="stack-tools-label-bar" aria-hidden="true" />
              TOOLS
            </div>
            <motion.div className="skills-grid" variants={staggerContainer(shouldReduceMotion)}>
              {skills.map((group, index) => (
                <motion.div key={index} variants={faderVariants(shouldReduceMotion)}>
                  <div className="skill-group-title">
                    <span className="skill-group-bar" aria-hidden="true" />
                    {group.category}
                  </div>
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
          </motion.div>
        </motion.section>

      </main>

      {/* Colophon */}
      <footer className="colophon" aria-label="Site colophon">
        <dl className="colophon-grid">
          <div className="colophon-block">
            <dt>Set in</dt>
            <dd>Fraunces, Newsreader, Cutive Mono.</dd>
          </div>
          <div className="colophon-block">
            <dt>Built with</dt>
            <dd>React, Vite, Vercel.</dd>
          </div>
          <div className="colophon-block">
            <dt>Built for</dt>
            <dd>Recruiters, peer engineers, and the family who asks what I actually do.</dd>
          </div>
        </dl>

        <div className="colophon-meta">
          <span>
            <span className="colophon-mark" aria-hidden="true">●</span>{' '}
            © {year} Manny Flores · SF Bay Area
          </span>
          <span>FIN.</span>
        </div>
      </footer>

      <Analytics />
      <SpeedInsights />
      <ResumeDialog open={resumeOpen} onOpenChange={setResumeOpen} />
    </>
  );
};

export default App;
