/* Portfolio content, in two lenses.
   `eng`   the engineering-console voice (default).
   `plain` the same facts for anyone: recruiters, family, a peer from
           another field. Translation only. No claim exists in one lens
           that is not on the resume and present in the other. */

export const ROLES = ['engineer', 'anyone'];
export const ROLE_STORAGE_KEY = 'mf-role';

export const lens = (role, pair) => (role === 'anyone' ? pair.plain : pair.eng);

export const sectionCopy = {
  scope: {
    headline: { eng: 'Access domains.', plain: 'What I look after.' },
    lede: {
      eng: 'The identity, cloud, and collaboration stack the company runs on. The mandate: harden the foundation, make AI tooling adoptable, keep sprawl down.',
      plain: 'The systems I am responsible for at work, and what state each one is in. Green means running and settled; amber means it is changing right now.',
    },
  },
  plan: {
    headline: { eng: 'The access plan.', plain: 'Ten years, as a change plan.' },
    lede: {
      eng: 'A decade of identity work, written the way this audience reads change. Every line is on the ',
      plain: 'A decade of identity work, written as a change plan: the format engineers read before approving what is about to change. Each line is explained under it, and every line is on the ',
    },
  },
  projects: {
    headline: { eng: 'Current focus.', plain: 'What I am building now.' },
  },
  stack: {
    headline: { eng: 'Stack.', plain: 'Tools.' },
  },
};

export const scope = [
  {
    state: 'operating',
    title: { eng: 'Identity & Access Architecture', plain: 'Who gets in, and how' },
    desc: {
      eng: "Authentication flows in Okta: SAML, OAuth 2.0, OIDC, plus SCIM for downstream provisioning. The full user lifecycle: birthright access, joiners, movers, leavers, rehires, service accounts, and the edge cases SCIM can't reach.",
      plain: 'I run the company sign-in system (Okta). When someone joins, their accounts get created and they receive the access their job calls for. When they change teams, it changes with them. When they leave, it ends. The same rules cover people who come back and the accounts that belong to machines rather than humans.',
    },
  },
  {
    state: 'operating',
    title: { eng: 'Identity Governance & Audit', plain: 'Proving the access is right' },
    desc: {
      eng: 'Led the Okta Identity Governance rollout: access certification campaigns and policy-driven lifecycle controls. Audit responses across SOX controls, access reviews, and service accounts, working directly with external auditors. Identity changes ship through technical reviews I author.',
      plain: 'On a schedule, managers confirm their people still need what they can reach. I led the rollout of that process (Okta Identity Governance). When outside auditors ask who could touch what and why, I answer with records rather than memory. Any change to how sign-in works gets a written review first, and I write those reviews.',
    },
  },
  {
    state: 'expanding',
    title: { eng: 'AI Tooling Governance', plain: 'Rules for AI tools' },
    desc: {
      eng: 'The identity side of Claude Code, ChatGPT, Cursor, and Gemini Enterprise: rollout review, access controls, and MCP integration enablement across the SaaS stack. Agents get identities, scopes, and an audit trail. Service accounts authenticate through brokered credentials, checked out from the vault programmatically and returned, never held.',
      plain: 'AI tools such as Claude Code, ChatGPT, Cursor, and Gemini are the newest users at the company. My job is making sure they live by the same rules as people: each gets its own identity, only the access it needs, and a record of what it did. Passwords for automated accounts are borrowed from a vault for a moment and handed back, never kept.',
    },
  },
  {
    state: 'operating',
    title: { eng: 'Cloud Governance (GCP)', plain: 'Cloud guardrails' },
    desc: {
      eng: 'Terraform-managed IAM and project structure, so engineers move AI workloads from prototype to production without creating sprawl.',
      plain: 'Engineers should be able to take an AI project from a laptop to production without asking me for an exception. The permissions and project layout on Google Cloud are written as code (Terraform), so the safe path is also the easy one.',
    },
  },
  {
    state: 'hardening',
    title: { eng: 'Collaboration Security', plain: 'Where everyone works' },
    desc: {
      eng: 'The surface where everyone works. Hardened, audited, and watched.',
      plain: 'Email, documents, chat: the tools the whole company lives in. I lock them down, keep track of who and what can reach them, and watch for changes.',
    },
  },
];

/* The career as a plan diff. `text` is the mono line; `gloss` is the
   plain-English reading shown under it in the anyone lens. */
export const planLines = [
  {
    type: 'ctx',
    text: '# career/manny-flores · 10+ years · fintech + healthcare',
    gloss: 'A decade of identity work across finance and healthcare companies.',
  },
  {
    type: 'chg',
    text: '~ role                = "Systems Administrator" -> "Senior Systems Engineer, team lead"',
    gloss: 'Started as a systems administrator. Now a senior engineer leading the team.',
  },
  {
    type: 'add',
    text: '+ okta_identity_governance         # led rollout: certification campaigns, policy lifecycle',
    gloss: 'Led the rollout of access reviews: managers regularly confirm what their people can reach.',
  },
  {
    type: 'add',
    text: '+ okta_tenant.acquisitions[6]      # Say, X1, Bitstamp, TradePMR, Chartr, WonderFi',
    gloss: 'Merged the logins of six acquired companies into one sign-in system.',
  },
  {
    type: 'add',
    text: '+ ai_tools.identity_governance[4]  # Claude Code, ChatGPT, Cursor, Gemini Enterprise',
    gloss: 'Set up identity and access rules for four AI tools.',
  },
  {
    type: 'add',
    text: '+ okta_config.terraform            # clicks -> code: drift gone, changes reviewed like PRs',
    gloss: 'Moved the sign-in system settings from clicks into code, so every change is reviewed before it happens.',
  },
  {
    type: 'chg',
    text: '~ access_requests     = "manual tickets" -> "automated fulfillment"',
    gloss: 'Access requests used to be tickets someone handled by hand. Now they are fulfilled automatically.',
  },
  {
    type: 'del',
    text: '- standing_access.unreviewed       # replaced by certification campaigns',
    gloss: 'Removed permanent access that nobody was checking. Scheduled reviews replaced it.',
  },
  {
    type: 'del',
    text: '- entra_id.tenants.acquired        # owned through migration: support, audit, decommission',
    gloss: 'Took over the acquired companies\u2019 old Microsoft sign-in systems, kept them running and audited, then shut them down.',
  },
  {
    type: 'ctx',
    text: '# (unchanged fundamentals hidden: SAML, OAuth 2.0, OIDC, SCIM, Python, Terraform)',
    gloss: 'The fundamentals (standard sign-in protocols, Python, Terraform) have not changed.',
  },
  {
    type: 'out',
    text: 'Plan: 4 to add, 2 to change, 2 to destroy.',
    gloss: 'In short: four things added, two changed, two removed.',
  },
];

export const planAriaLabel =
  'Career summary formatted as a Terraform plan: role changed from Systems Administrator to Senior Systems Engineer and team lead; added Okta Identity Governance rollout, six acquisitions merged into one Okta tenant, identity governance for four AI tools, and Okta configuration managed as Terraform code; access requests changed from manual tickets to automated fulfillment; unreviewed standing access removed; acquired Entra ID tenants owned through migration and decommissioned.';

export const projects = [
  {
    status: 'Operating',
    title: { eng: 'Terraform Okta: Identity as Code', plain: 'Sign-in settings as code' },
    desc: {
      eng: 'Okta config lives in Terraform now, not in clicks. Config drift is gone, changes get reviewed like code, and policy stays consistent across the tenant.',
      plain: 'The sign-in system used to be configured by clicking through an admin console. Now the configuration is written down as code: another person reviews every change before it happens, and the system cannot quietly drift from what was approved.',
    },
    tags: ['Okta', 'Terraform', 'IaC', 'Identity Infrastructure'],
  },
  {
    status: 'Operating',
    title: { eng: 'Secure GCP for AI Workloads', plain: 'A safe path to production for AI tools' },
    desc: {
      eng: 'A paved road from local prototype to hosted service. Project factories, IAM bindings, and access controls all live in Terraform, so shipping an AI-assisted tool to production is a reviewed change, not a hand-built exception.',
      plain: 'When an engineer builds an AI-assisted tool, there is a ready-made, pre-approved way to run it in the cloud. Permissions are set correctly from the start, so shipping is a reviewed change rather than a one-off favor.',
    },
    tags: ['GCP', 'Terraform', 'IAM', 'AI Enablement'],
  },
  {
    status: 'Building',
    title: { eng: 'Google Workspace Security Hardening', plain: 'Locking down email, docs, and chat' },
    desc: {
      eng: "Tightening Google Workspace: access policies, DLP, third-party OAuth, audit coverage. The attack surface gets bigger every time someone installs a new AI tool, and that's the part I'm watching.",
      plain: 'Tightening the tools everyone uses: who can share what outside the company, which third-party apps may connect, and keeping a complete record. Every new AI tool someone connects widens the surface, and that is the part I watch.',
    },
    tags: ['Google Workspace', 'DLP', 'OAuth Governance', 'Security'],
  },
];

export const skills = [
  {
    category: 'Identity & Access',
    plain: 'Sign-in systems and the standards they speak.',
    items: ['Okta OIE', 'OIG', 'Entra ID', 'SAML 2.0', 'OAuth 2.0', 'OIDC', 'SCIM', 'RBAC', 'Zero Trust'],
  },
  {
    category: 'Automation & IaC',
    plain: 'Scripts and code that make changes repeatable and reviewed.',
    items: ['Python', 'Bash', 'Okta Workflows', 'Terraform', 'GCP IAM', 'APIs & Integrations'],
  },
  {
    category: 'Corp Apps Infra',
    plain: 'The company tools I run day to day.',
    items: ['GCP', 'Google Workspace', 'Okta', 'Slack', 'Jira', 'Workday'],
  },
  {
    category: 'AI & Governance',
    plain: 'The AI tools I govern, and how agents connect to things.',
    items: ['MCP', 'Claude Code', 'ChatGPT', 'Cursor', 'Gemini Enterprise', 'LLM Access Controls'],
  },
];

/* Nodes of the access fabric drawn in the hero. Positions are in the
   graph's 420 x 440 viewBox; the operator (portrait) sits at the center.
   Every node and relation is a scope row or stack chip elsewhere on the page. */
export const fabricNodes = [
  {
    id: 'okta',
    x: 210, y: 44,
    label: 'okta', sub: 'idp · saml · oidc · scim',
    labelPos: 'above',
    flow: 'out',
    detail: {
      eng: 'Okta: the identity provider. SAML, OIDC, and SCIM to every downstream app. Configuration lives in Terraform.',
      plain: 'Okta is the sign-in system everything else trusts. Its settings are written as code and reviewed.',
    },
  },
  {
    id: 'entra',
    x: 74, y: 96,
    label: 'entra id', sub: 'retired',
    labelPos: 'left',
    flow: 'none',
    retired: true,
    detail: {
      eng: 'Entra ID tenants from six acquisitions: supported and audited through migration, then decommissioned.',
      plain: 'The acquired companies came with their own Microsoft sign-in systems. Kept running through the move, then shut down.',
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
      plain: 'Google Cloud, where AI projects run. Permissions are written as code so the safe path is the easy one.',
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
      plain: 'Email, docs, and chat. Accounts arrive automatically, outside apps are vetted, sharing is watched.',
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
      plain: 'The other tools people use every day. Accounts open and close in step with the sign-in system.',
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
      plain: 'Accounts that belong to software, not people. They borrow a password from a vault for a moment and hand it back.',
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
      plain: 'The AI tools. Each one has its own identity, only the access it needs, and a record of what it did.',
    },
  },
];

export const fabricDefaultReadout = {
  eng: 'operator · sf bay area · since 2024 · pick a node',
  plain: 'the systems I run · pick a node to see what it does',
};
