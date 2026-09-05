/* Portfolio content. One voice: the engineering-console register, in the
   vocabulary of someone who builds it. No claim here that is not on the
   resume.

   Each section tells its facts once. Capabilities = what he can own and
   the tools it takes. Plan = the history, with the counts and names.
   Building = what is moving now, each with an artifact or a shape. */

export const sectionCopy = {
  capabilities: {
    headline: 'What I can own.',
    lede: 'Okta, Google Cloud, and Google Workspace at a public fintech: every login, permission, and offboarding runs through these. Green rows are in production and audited; amber rows are being built or hardened right now.',
  },
  plan: {
    headline: 'The access plan.',
    lede: 'Ten years of identity work as a Terraform plan: + is something that exists because I built it, ~ something I changed, - something I removed. Every line is on the ',
  },
  building: {
    headline: 'Building now.',
    lede: 'Three things in motion, each with the artifact or the shape behind it.',
  },
  contact: {
    headline: 'Get in touch.',
    lede: 'Hiring for identity, or want to compare notes on Okta as code, acquisition intake, or how agents should authenticate? Email is the fastest path.',
  },
};

/* What he can own. `tools` are the chips that used to live in a separate
   Stack section; they belong next to the capability they serve. */
export const capabilities = [
  {
    state: 'operating',
    title: 'Identity platform (Okta)',
    desc: "Authentication in Okta: SAML, OAuth 2.0, OIDC, and SCIM to everything downstream. The whole lifecycle from Workday: birthright access, joiners, movers, leavers, rehires, service accounts, and the edge cases SCIM can't reach, closed with Okta Workflows and Python.",
    tools: ['Okta OIE', 'SAML 2.0', 'OIDC', 'OAuth 2.0', 'SCIM', 'Okta Workflows', 'Workday', 'Python'],
  },
  {
    state: 'operating',
    title: 'Identity governance & audit',
    desc: 'Led the Okta Identity Governance rollout: access certification campaigns and policy-driven lifecycle controls. Audit responses across SOX controls, access reviews, and service accounts, working directly with external auditors. Identity changes ship through technical reviews I author.',
    tools: ['OIG', 'Access certifications', 'RBAC', 'SOX controls'],
  },
  {
    state: 'operating',
    title: 'Acquisition integration',
    desc: 'Intake for acquired companies: their apps and their identity provider brought onto the Okta standard as one repeatable process, not a per-deal scramble. Standalone IdPs are retired once their people are across; systems we already run are merged into ours.',
    tools: ['Okta', 'Entra ID', 'Google Workspace', 'App migration'],
  },
  {
    state: 'expanding',
    title: 'AI tooling governance',
    desc: 'Every AI tool the company adopts goes through the same gate as a new hire: SSO, group-based entitlement, offboarding. Each agent gets its own identity and an explicit scope list, so an MCP server touching Jira or Slack acts as itself, not as whoever installed it. Automation never holds a secret: service-account credentials are checked out of the vault at runtime and returned.',
    tools: ['MCP', 'Claude Code', 'ChatGPT', 'Cursor', 'Gemini Enterprise'],
  },
  {
    state: 'operating',
    title: 'Cloud governance (GCP)',
    desc: 'Google Cloud IAM and project structure as Terraform, so engineers get a paved road from prototype to production instead of asking for exceptions.',
    tools: ['GCP IAM', 'Terraform'],
  },
  {
    state: 'hardening',
    title: 'Collaboration security',
    desc: 'Google Workspace and Slack, where every employee and every new AI tool lands first. Who can share what outside the company, which third-party apps may connect, and what lands in the audit trail.',
    tools: ['Google Workspace', 'Slack', 'DLP', 'OAuth app governance'],
  },
];

/* The career as a plan diff. A comment after two or more spaces
   (`  # ...`) is rendered as its own span so phones can drop it to a
   second line. */
export const planLines = [
  {
    type: 'ctx',
    text: '# career/manny-flores · 10+ years · fintech + healthcare',
  },
  {
    type: 'chg',
    text: '~ role                = "Systems Administrator" -> "Senior Systems Engineer, team lead"',
  },
  {
    type: 'add',
    text: '+ okta_identity_governance         # led rollout: certification campaigns, policy lifecycle',
  },
  {
    type: 'add',
    text: '+ okta_tenant.acquisitions[6]      # Say, X1, Bitstamp, TradePMR, Chartr, WonderFi',
  },
  {
    type: 'add',
    text: '+ ai_tools.identity_governance[4]  # Claude Code, ChatGPT, Cursor, Gemini Enterprise',
  },
  {
    type: 'add',
    text: '+ okta_config.terraform            # clicks -> code: drift gone, changes reviewed like PRs',
  },
  {
    type: 'chg',
    text: '~ access_requests     = "manual tickets" -> "automated fulfillment"',
  },
  {
    type: 'chg',
    text: '~ acquisition_intake  = "per-deal" -> "company standard: apps + idp"',
  },
  {
    type: 'del',
    text: '- standing_access.unreviewed       # replaced by certification campaigns',
  },
  {
    type: 'del',
    text: '- acquired_idps.standalone         # unified into okta, then retired; entra id the largest',
  },
  {
    type: 'ctx',
    text: '# (unchanged fundamentals hidden: SAML, OAuth 2.0, OIDC, SCIM, Python, Terraform)',
  },
  {
    type: 'out',
    text: 'Plan: 4 to add, 3 to change, 2 to destroy.',
  },
];

export const planAriaLabel =
  'Career summary formatted as a Terraform plan: role changed from Systems Administrator to Senior Systems Engineer and team lead; added Okta Identity Governance rollout, six acquisitions merged into one Okta tenant, identity governance for four AI tools, and Okta configuration managed as Terraform code; access requests changed from manual tickets to automated fulfillment; acquisition intake changed from per-deal to a company standard covering apps and identity providers, merging duplicates of systems already run; unreviewed standing access removed; standalone acquired identity providers, Entra ID the largest, unified into Okta and retired.';

/* What is moving now. Each entry carries a `proof`: an artifact with a
   link, or the shape of the thing in mono lines. No proof, no entry. */
export const projects = [
  {
    status: 'Operating',
    title: 'Okta as Terraform',
    desc: "Okta's groups, group rules, apps, and sign-on policies live in Terraform, applied from CI with the plan attached to every change. Drift shows up in a diff, not in an audit. The foundation is public: state split per stack, so identity, apps, policies, authorization, and governance can be owned by different teams without sharing one state file.",
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
    title: 'Secure GCP for AI workloads',
    desc: 'A paved road from local prototype to hosted service. Project factories, IAM bindings, and access controls all live in Terraform, so shipping an AI-assisted tool to production is a reviewed change, not a hand-built exception.',
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
    title: 'Google Workspace hardening',
    desc: "Tightening Google Workspace: access policies, DLP, third-party OAuth, audit coverage. The attack surface gets bigger every time someone installs a new AI tool, and that's the part I'm watching.",
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
    detail: 'Okta: the identity provider. SAML, OIDC, and SCIM to every downstream app. Configuration lives in Terraform.',
  },
  {
    id: 'mna',
    x: 74, y: 96,
    label: 'm&a', sub: '6 acquired · idps -> okta',
    labelPos: 'above',
    flow: 'in',
    detail: 'Six acquisitions, each with its own IdP and app stack, brought onto the Okta standard. Standalone IdPs retired after, Entra ID the largest; duplicates of systems we already run, merged into ours.',
  },
  {
    id: 'gcp',
    x: 346, y: 96,
    label: 'gcp', sub: 'terraform',
    labelPos: 'right',
    flow: 'out',
    detail: 'Google Cloud: IAM bindings and project structure in Terraform. Prototype to production without sprawl.',
  },
  {
    id: 'workspace',
    x: 56, y: 240,
    label: 'workspace', sub: 'scim · oauth',
    labelPos: 'below',
    flow: 'out',
    detail: 'Google Workspace: provisioning over SCIM, third-party OAuth governed, DLP and audit coverage in progress.',
  },
  {
    id: 'saas',
    x: 364, y: 240,
    label: 'saas apps', sub: 'scim · saml',
    labelPos: 'below',
    flow: 'out',
    detail: 'Slack, Jira, Workday and the rest of the SaaS stack: SAML sign-in, SCIM lifecycle, MCP integrations reviewed.',
  },
  {
    id: 'svc',
    x: 110, y: 388,
    label: 'service accounts', sub: 'brokered creds',
    labelPos: 'below',
    flow: 'in',
    detail: 'Service accounts authenticate through brokered credentials: checked out from the vault programmatically and returned. Never held.',
  },
  {
    id: 'agents',
    x: 310, y: 388,
    label: 'ai agents', sub: 'scoped · audited',
    labelPos: 'below',
    flow: 'in',
    detail: 'Claude Code, ChatGPT, Cursor, Gemini Enterprise: each with an identity, explicit scopes, and an audit trail.',
  },
];

/* Under the graph when nothing is selected. */
export const fabricDefaultReadout = 'systems in scope · hover or click one';
