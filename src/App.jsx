import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ResumeDialog from './components/ResumeDialog';
import ExpertiseCard from './components/ExpertiseCard';
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

const portraitVariants = (shouldReduceMotion) => shouldReduceMotion ? {
  hidden: { opacity: 1, scale: 1 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.01 } }
} : {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1] } }
};

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

  const scope = [
    {
      domain: 'Identity & Access Architecture',
      state: 'operating',
      desc: 'Authentication flows in Okta: SAML, OAuth 2.0, OIDC, plus SCIM for downstream provisioning. The full user lifecycle: birthright access, joiners, movers, leavers, rehires, and service account ownership.',
    },
    {
      domain: 'Identity Governance & Audit',
      state: 'operating',
      desc: 'Led the Okta Identity Governance rollout: access certification campaigns and policy-driven lifecycle controls. Audit responses across SOX controls, access reviews, and service accounts, working directly with external auditors.',
    },
    {
      domain: 'AI Tooling Governance',
      state: 'expanding',
      desc: 'The identity side of Claude Code, ChatGPT, Cursor, and Gemini Enterprise: rollout review, access controls, and MCP integration enablement across the SaaS stack. Agents get identities, scopes, and an audit trail.',
    },
    {
      domain: 'Cloud Governance (GCP)',
      state: 'operating',
      desc: 'Terraform-managed IAM and project structure, so engineers move AI workloads from prototype to production without creating sprawl.',
    },
    {
      domain: 'Collaboration Security',
      state: 'hardening',
      desc: 'Google Workspace: access policies, third-party OAuth risk, data loss prevention, audit coverage.',
    },
  ];

  /* The career, written the way the audience reads change. All lines resume-backed. */
  const planLines = [
    { type: 'ctx', text: '# career/manny-flores · 10+ years · fintech + healthcare' },
    { type: 'chg', text: '~ role                = "Systems Administrator" -> "Senior Systems Engineer, team lead"' },
    { type: 'add', text: '+ okta_identity_governance         # led rollout: certification campaigns, policy lifecycle' },
    { type: 'add', text: '+ okta_tenant.acquisitions[6]      # Say, X1, Bitstamp, TradePMR, Chartr, WonderFi' },
    { type: 'add', text: '+ ai_tools.identity_governance[4]  # Claude Code, ChatGPT, Cursor, Gemini Enterprise' },
    { type: 'add', text: '+ okta_config.terraform            # clicks -> code: drift gone, changes reviewed like PRs' },
    { type: 'chg', text: '~ access_requests     = "manual tickets" -> "automated fulfillment"' },
    { type: 'del', text: '- standing_access.unreviewed       # replaced by certification campaigns' },
    { type: 'ctx', text: '# (unchanged fundamentals hidden: SAML, OAuth 2.0, OIDC, SCIM, Python, Terraform)' },
    { type: 'out', text: 'Plan: 4 to add, 2 to change, 1 to destroy.' },
  ];

  const skills = [
    { category: 'Identity & Access', items: ['Okta OIE', 'OIG', 'SAML 2.0', 'OAuth 2.0', 'OIDC', 'SCIM', 'RBAC', 'Zero Trust'] },
    { category: 'Automation & IaC', items: ['Python', 'Bash', 'Okta Workflows', 'Terraform', 'GCP IAM', 'APIs & Integrations'] },
    { category: 'Corp Apps Infra', items: ['GCP', 'Google Workspace', 'Okta', 'Slack', 'Jira', 'Workday'] },
    { category: 'AI & Governance', items: ['MCP', 'Claude Code', 'ChatGPT', 'Cursor', 'Gemini Enterprise', 'LLM Access Controls'] },
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
      ],
    },
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

  const now = new Date();
  const year = now.getFullYear();
  const monthNum = String(now.getMonth() + 1).padStart(2, '0');

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

      {/* Masthead · session line */}
      <div className="masthead" role="presentation">
        <span className="masthead-dot" aria-hidden="true">●</span>
        <span>session {year}.{monthNum}</span>
        <span className="masthead-spacer" />
        <span>mannyflo.com<span className="masthead-extra"> · access logged</span></span>
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
                href="https://github.com/tunnelslug"
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
              >
                GitHub
              </FramerButton>
              <FramerButton
                variant="ghost"
                onClick={() => setResumeOpen(true)}
              >
                Resume
              </FramerButton>
            </motion.div>

            <motion.figure className="hero-portrait-block" variants={faderVariants(shouldReduceMotion)}>
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
              <figcaption className="hero-portrait-caption">SF Bay Area · since 2024</figcaption>
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
            Access domains.
          </motion.h2>
          <motion.p className="section-lede" variants={faderVariants(shouldReduceMotion)}>
            The identity, cloud, and collaboration stack the company runs on.
            The mandate: harden the foundation, make AI tooling adoptable, keep sprawl down.
          </motion.p>

          <motion.div className="scope-list" variants={staggerContainer(shouldReduceMotion)}>
            {scope.map((item, i) => (
              <motion.div key={i} className="scope-row" variants={faderVariants(shouldReduceMotion)}>
                <span className="scope-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div className="scope-body">
                  <h3>{item.domain}</h3>
                  <p>{item.desc}</p>
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
            The access plan.
          </motion.h2>
          <motion.p className="section-lede" variants={faderVariants(shouldReduceMotion)}>
            A decade of identity work, written the way this audience reads change.
            Every line is on the <button className="lede-link" onClick={() => setResumeOpen(true)}>resume</button>.
          </motion.p>

          <motion.div
            className="plan-block"
            variants={planContainer(shouldReduceMotion)}
          >
            <div className="plan-titlebar" aria-hidden="true">
              <span>terraform plan</span>
              <span className="plan-titlebar-right">career/manny-flores</span>
            </div>
            <div
              className="plan-lines"
              role="img"
              tabIndex={0}
              aria-label="Career summary formatted as a Terraform plan: role changed from Systems Administrator to Senior Systems Engineer and team lead; added Okta Identity Governance rollout, six acquisitions merged into one Okta tenant, identity governance for four AI tools, and Okta configuration managed as Terraform code; access requests changed from manual tickets to automated fulfillment; unreviewed standing access removed."
            >
              {planLines.map((line, i) => (
                <motion.div
                  key={i}
                  className={`plan-line plan-line--${line.type}`}
                  variants={planLineVariants(shouldReduceMotion)}
                >
                  {line.text}
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
            Current focus.
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
            <Eyebrow label="CAPABILITY" />
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

      {/* Footer */}
      <footer className="colophon" aria-label="Site footer">
        <div className="colophon-meta">
          <span>© {year} Manny Flores · SF Bay Area</span>
          <span className="tabular">exit 0</span>
        </div>
      </footer>

      <Analytics />
      <SpeedInsights />
      <ResumeDialog open={resumeOpen} onOpenChange={setResumeOpen} />
    </>
  );
};

export default App;
