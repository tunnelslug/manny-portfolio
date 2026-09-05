/* Portfolio content, in two lenses.
   `eng`  the engineering-console voice (default): how it is built, in the
          vocabulary of someone who builds it.
   `rec`  the same facts for a recruiter or hiring manager who does not
          write SCIM connectors: plain English, what was owned, how big,
          what came of it. Product names and numbers stay because they are
          what gets searched for (Okta, Terraform, Google Cloud, SOX, six
          acquisitions); protocol acronyms do not. No claim exists in one
          lens that is not on the resume and present in the other.

   Each section tells its facts once. Capabilities = what he can own and
   the tools it takes. Plan = the history, with the counts and names.
   Building = what is moving now, each with an artifact or a shape. */

export const ROLES = ['engineer', 'recruiter'];
export const ROLE_STORAGE_KEY = 'mf-role';

export const lens = (role, pair) => (role === 'recruiter' ? pair.rec : pair.eng);

export const sectionCopy = {
  capabilities: {
    headline: { eng: 'What I can own.', rec: 'What I can own for you.' },
    lede: {
      eng: 'Okta, Google Cloud, and Google Workspace at a public fintech: every login, permission, and offboarding runs through these. Green rows are in production and audited; amber rows are being built or hardened right now.',
      rec: 'The systems I am responsible for at a public fintech, and the state each one is in. Green is running and audited; amber is being built or tightened right now.',
    },
  },
  plan: {
    headline: { eng: 'The access plan.', rec: 'Ten years, as a change plan.' },
    lede: {
      eng: 'Ten years of identity work as a Terraform plan: + is something that exists because I built it, ~ something I changed, - something I removed. Every line is on the ',
      rec: 'A decade of identity work in the format engineers read before approving a change: green lines were added, amber changed, red removed. Each line is explained beneath it, and every line is on the ',
    },
  },
  building: {
    headline: { eng: 'Building now.', rec: 'What I am building now.' },
    lede: {
      eng: 'Three things in motion, each with the artifact or the shape behind it.',
      rec: 'Three things in motion, each with what it looks like behind the scenes.',
    },
  },
  contact: {
    headline: { eng: 'Get in touch.', rec: 'Get in touch.' },
    lede: {
      eng: 'Hiring for identity, or want to compare notes on Okta as code, acquisition intake, or how agents should authenticate? Email is the fastest path.',
      rec: 'Hiring for an identity or corporate systems role? Email is the fastest way to reach me; LinkedIn works too.',
    },
  },
};

/* What he can own. `tools` are the chips that used to live in a separate
   Stack section; they belong next to the capability they serve. */
export const capabilities = [
  {
    state: 'operating',
    title: { eng: 'Identity platform (Okta)', rec: 'Who gets in, and how' },
    desc: {
      eng: "Authentication in Okta: SAML, OAuth 2.0, OIDC, and SCIM to everything downstream. The whole lifecycle from Workday: birthright access, joiners, movers, leavers, rehires, service accounts, and the edge cases SCIM can't reach, closed with Okta Workflows and Python.",
      rec: 'I run the company sign-in system (Okta) for every employee and every app. When someone joins, their accounts are created and they get the access their job calls for; when they change teams it changes with them; when they leave, it ends the same day. The same rules cover people who come back and the accounts that belong to software rather than humans.',
    },
    tools: ['Okta OIE', 'SAML 2.0', 'OIDC', 'OAuth 2.0', 'SCIM', 'Okta Workflows', 'Workday', 'Python'],
  },
  {
    state: 'operating',
    title: { eng: 'Identity governance & audit', rec: 'Proving the access is right' },
    desc: {
      eng: 'Led the Okta Identity Governance rollout: access certification campaigns and policy-driven lifecycle controls. Audit responses across SOX controls, access reviews, and service accounts, working directly with external auditors. Identity changes ship through technical reviews I author.',
      rec: 'On a schedule, managers confirm their people still need what they can reach; I led the company-wide rollout of that process (Okta Identity Governance). When the external auditors ask who could touch what and why, for SOX and beyond, I am the person who answers, with records rather than memory. Every change to how sign-in works gets a written review first, and I write those reviews.',
    },
    tools: ['OIG', 'Access certifications', 'RBAC', 'SOX controls'],
  },
  {
    state: 'operating',
    title: { eng: 'Acquisition integration', rec: 'Bringing acquired companies aboard' },
    desc: {
      eng: 'Intake for acquired companies: their apps and their identity provider brought onto the Okta standard as one repeatable process, not a per-deal scramble. Standalone IdPs are retired once their people are across; systems we already run are merged into ours.',
      rec: 'When the company buys another company, their people, apps, and sign-in system have to become ours. I run that as a repeatable process rather than a one-off scramble: everyone moves onto our sign-in, and their old system is shut down or, where we already run the same tool, merged into ours.',
    },
    tools: ['Okta', 'Entra ID', 'Google Workspace', 'App migration'],
  },
  {
    state: 'expanding',
    title: { eng: 'AI tooling governance', rec: 'Rules for AI tools' },
    desc: {
      eng: 'Every AI tool the company adopts goes through the same gate as a new hire: SSO, group-based entitlement, offboarding. Each agent gets its own identity and an explicit scope list, so an MCP server touching Jira or Slack acts as itself, not as whoever installed it. Automation never holds a secret: service-account credentials are checked out of the vault at runtime and returned.',
      rec: 'AI tools are the newest users at the company, and I own the access side of their rollout. Each tool gets its own identity, only the access it needs, and a record of what it did, the same bar as any employee. Passwords for automated accounts are borrowed from a vault for a moment and handed back, never kept.',
    },
    tools: ['MCP', 'Claude Code', 'ChatGPT', 'Cursor', 'Gemini Enterprise'],
  },
  {
    state: 'operating',
    title: { eng: 'Cloud governance (GCP)', rec: 'Cloud guardrails' },
    desc: {
      eng: 'Google Cloud IAM and project structure as Terraform, so engineers get a paved road from prototype to production instead of asking for exceptions.',
      rec: 'Engineers can take an AI project from a laptop to production on Google Cloud without asking me for an exception. Permissions and project layout are written as code (Terraform), so the safe path is also the easy one.',
    },
    tools: ['GCP IAM', 'Terraform'],
  },
  {
    state: 'hardening',
    title: { eng: 'Collaboration security', rec: 'Where everyone works' },
    desc: {
      eng: 'Google Workspace and Slack, where every employee and every new AI tool lands first. Who can share what outside the company, which third-party apps may connect, and what lands in the audit trail.',
      rec: 'Email, documents, and chat (Google Workspace and Slack): the tools the whole company lives in. I control who and what can reach them, what can leave the company, which outside apps may connect, and keep the record of all of it.',
    },
    tools: ['Google Workspace', 'Slack', 'DLP', 'OAuth app governance'],
  },
];

/* The career as a plan diff. `text` is the mono line; `gloss` is the
   plain-English meaning, shown under it in the recruiter lens. A comment
   after two or more spaces (`  # ...`) is rendered as its own span so
   phones can drop it to a second line. */
export const planLines = [
  {
    type: 'ctx',
    text: '# career/manny-flores · 10+ years · fintech + healthcare',
    gloss: 'More than ten years in identity and access, at fintech and healthcare companies.',
  },
  {
    type: 'chg',
    text: '~ role                = "Systems Administrator" -> "Senior Systems Engineer, team lead"',
    gloss: 'Grew from systems administrator to senior systems engineer leading the team.',
  },
  {
    type: 'add',
    text: '+ okta_identity_governance         # led rollout: certification campaigns, policy lifecycle',
    gloss: 'Led the company-wide rollout of Okta Identity Governance: managers now confirm on a schedule that their people still need the access they have, and access follows rules instead of tickets.',
  },
  {
    type: 'add',
    text: '+ okta_tenant.acquisitions[6]      # Say, X1, Bitstamp, TradePMR, Chartr, WonderFi',
    gloss: 'Brought six acquired companies onto one company-wide sign-in system.',
  },
  {
    type: 'add',
    text: '+ ai_tools.identity_governance[4]  # Claude Code, ChatGPT, Cursor, Gemini Enterprise',
    gloss: 'Owned who-can-do-what for the company rollout of four AI tools.',
  },
  {
    type: 'add',
    text: '+ okta_config.terraform            # clicks -> code: drift gone, changes reviewed like PRs',
    gloss: 'Moved the sign-in system from console clicks to code (Terraform): another person reviews every change before it happens, and nothing drifts from what was approved.',
  },
  {
    type: 'chg',
    text: '~ access_requests     = "manual tickets" -> "automated fulfillment"',
    gloss: 'Access requests that used to be worked by hand are now fulfilled automatically.',
  },
  {
    type: 'chg',
    text: '~ acquisition_intake  = "per-deal" -> "company standard: apps + idp"',
    gloss: 'Turned onboarding an acquired company from a one-off scramble into a repeatable playbook: their apps and sign-in move onto the company standard, and anything we already run gets merged.',
  },
  {
    type: 'del',
    text: '- standing_access.unreviewed       # replaced by certification campaigns',
    gloss: 'Removed access that nobody was checking; scheduled reviews replaced it.',
  },
  {
    type: 'del',
    text: '- acquired_idps.standalone         # unified into okta, then retired; entra id the largest',
    gloss: 'Shut down the separate sign-in systems that came with acquisitions once their people were on ours, Microsoft Entra ID the biggest; where a company already used a tool we run, such as Google Workspace, it was merged instead.',
  },
  {
    type: 'ctx',
    text: '# (unchanged fundamentals hidden: SAML, OAuth 2.0, OIDC, SCIM, Python, Terraform)',
    gloss: 'Constant throughout: the standard sign-in protocols, Python, and Terraform.',
  },
  {
    type: 'out',
    text: 'Plan: 4 to add, 3 to change, 2 to destroy.',
    gloss: 'Net: four things built, three ways of working changed, two risks removed.',
  },
];

export const planAriaLabel =
  'Career summary formatted as a Terraform plan: role changed from Systems Administrator to Senior Systems Engineer and team lead; added Okta Identity Governance rollout, six acquisitions merged into one Okta tenant, identity governance for four AI tools, and Okta configuration managed as Terraform code; access requests changed from manual tickets to automated fulfillment; acquisition intake changed from per-deal to a company standard covering apps and identity providers, merging duplicates of systems already run; unreviewed standing access removed; standalone acquired identity providers, Entra ID the largest, unified into Okta and retired.';

/* What is moving now. Each entry carries a `proof`: an artifact with a
   link, or the shape of the thing in mono lines. No proof, no entry. */
export const projects = [
  {
    status: 'Operating',
    title: { eng: 'Okta as Terraform', rec: 'Sign-in settings as code' },
    desc: {
      eng: "Okta's groups, group rules, apps, and sign-on policies live in Terraform, applied from CI with the plan attached to every change. Drift shows up in a diff, not in an audit. The foundation is public: state split per stack, so identity, apps, policies, authorization, and governance can be owned by different teams without sharing one state file.",
      rec: 'The sign-in system (Okta) used to be configured by clicking through an admin console. Now every setting is written down as code: a second person reviews each change before it happens, and the system cannot quietly drift from what was approved. The template I built for this is public on GitHub, laid out so different teams can safely own different parts of the same system.',
    },
    tags: ['Okta', 'Terraform', 'CI'],
    proof: {
      kind: 'artifact',
      link: { href: 'https://github.com/tunnelslug/okta-terraform-foundation', label: 'okta-terraform-foundation' },
      lines: [
        ['live/<env>/', 'one stack per concern, each with its own state'],
        ['identity', 'groups · group rules · authenticators · zones'],
        ['apps', 'oauth + saml apps · assignments'],
        ['policies', 'session · sign-on · mfa · password'],
        ['authz', 'auth servers · scopes · claims'],
        ['governance', 'oig labels · admin roles · resource sets'],
        ['auth', 'oauth 2.0 service app · no api tokens'],
      ],
    },
  },
  {
    status: 'Operating',
    title: { eng: 'Secure GCP for AI workloads', rec: 'A safe path to production for AI tools' },
    desc: {
      eng: 'A paved road from local prototype to hosted service. Project factories, IAM bindings, and access controls all live in Terraform, so shipping an AI-assisted tool to production is a reviewed change, not a hand-built exception.',
      rec: 'When an engineer builds an AI-assisted tool, there is a ready-made, pre-approved way to run it on Google Cloud. Permissions are right from the start, so shipping is a reviewed change rather than a one-off favor from the security team.',
    },
    tags: ['GCP', 'Terraform', 'IAM'],
    proof: {
      kind: 'shape',
      lines: [
        ['prototype ->', 'project factory: a terraform module, one PR'],
        ['->', 'iam bindings: least privilege by default'],
        ['->', 'access controls: audit on from day one'],
        ['production <-', 'a reviewed change, not a hand-built exception'],
      ],
    },
  },
  {
    status: 'Building',
    title: { eng: 'Google Workspace hardening', rec: 'Locking down email, docs, and chat' },
    desc: {
      eng: "Tightening Google Workspace: access policies, DLP, third-party OAuth, audit coverage. The attack surface gets bigger every time someone installs a new AI tool, and that's the part I'm watching.",
      rec: 'Tightening the tools everyone uses (Google Workspace): who can share what outside the company, which third-party apps may connect, and keeping a complete record. Every new AI tool someone connects widens the surface, and that is the part I watch.',
    },
    tags: ['Google Workspace', 'DLP', 'OAuth'],
    proof: {
      kind: 'surface',
      lines: [
        ['external sharing', 'who may share what, and with whom outside'],
        ['third-party oauth', 'reviewed before it gets scope'],
        ['dlp', 'the data that matters'],
        ['audit coverage', 'admin actions · external shares'],
      ],
    },
  },
];

/* Nodes of the access fabric drawn in the hero. Positions are in the
   graph's 420 x 440 viewBox; the portrait sits at the center.
   Every node and relation is a capability row or plan line elsewhere on the page. */
export const fabricNodes = [
  {
    id: 'okta',
    x: 210, y: 44,
    label: 'okta', sub: 'idp · saml · oidc · scim',
    labelPos: 'above',
    flow: 'out',
    detail: {
      eng: 'Okta: the identity provider. SAML, OIDC, and SCIM to every downstream app. Configuration lives in Terraform.',
      rec: 'Okta: the sign-in system every other system trusts. I own it; its settings are written as code and reviewed.',
    },
  },
  {
    id: 'mna',
    x: 74, y: 96,
    label: 'm&a', sub: '6 acquired · idps -> okta',
    labelPos: 'above',
    flow: 'in',
    detail: {
      eng: 'Six acquisitions, each with its own IdP and app stack, brought onto the Okta standard. Standalone IdPs retired after, Entra ID the largest; duplicates of systems we already run, merged into ours.',
      rec: 'Six companies we bought, each with its own sign-in system and apps, moved onto ours. Their leftover sign-in systems were shut down (Entra ID the biggest) or merged into tools we already run.',
    },
  },
  {
    id: 'gcp',
    x: 346, y: 96,
    label: 'gcp', sub: 'terraform',
    labelPos: 'right',
    flow: 'out',
    detail: {
      eng: 'Google Cloud: IAM bindings and project structure in Terraform. Prototype to production without sprawl.',
      rec: 'Google Cloud, where AI projects run. Permissions are written as code, so the safe path is the easy one.',
    },
  },
  {
    id: 'workspace',
    x: 56, y: 240,
    label: 'workspace', sub: 'scim · oauth',
    labelPos: 'below',
    flow: 'out',
    detail: {
      eng: 'Google Workspace: provisioning over SCIM, third-party OAuth governed, DLP and audit coverage in progress.',
      rec: 'Email, docs, and chat. Accounts arrive automatically, outside apps are vetted, sharing is watched.',
    },
  },
  {
    id: 'saas',
    x: 364, y: 240,
    label: 'saas apps', sub: 'scim · saml',
    labelPos: 'below',
    flow: 'out',
    detail: {
      eng: 'Slack, Jira, Workday and the rest of the SaaS stack: SAML sign-in, SCIM lifecycle, MCP integrations reviewed.',
      rec: 'Slack, Jira, Workday and the other tools people use every day. Accounts open and close in step with the sign-in system.',
    },
  },
  {
    id: 'svc',
    x: 110, y: 388,
    label: 'service accounts', sub: 'brokered creds',
    labelPos: 'below',
    flow: 'in',
    detail: {
      eng: 'Service accounts authenticate through brokered credentials: checked out from the vault programmatically and returned. Never held.',
      rec: 'Accounts that belong to software, not people. They borrow a password from a vault for a moment and hand it back.',
    },
  },
  {
    id: 'agents',
    x: 310, y: 388,
    label: 'ai agents', sub: 'scoped · audited',
    labelPos: 'below',
    flow: 'in',
    detail: {
      eng: 'Claude Code, ChatGPT, Cursor, Gemini Enterprise: each with an identity, explicit scopes, and an audit trail.',
      rec: 'Claude Code, ChatGPT, Cursor, Gemini Enterprise. Each has its own identity, only the access it needs, and a record of what it did.',
    },
  },
];

/* Under the graph when nothing is selected. */
export const fabricDefaultReadout = {
  eng: 'systems in scope · hover or click one',
  rec: 'the systems I run · hover or click one',
};
