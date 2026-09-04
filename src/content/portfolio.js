/* Portfolio content, in two lenses.
   `eng`  the engineering-console voice (default): how it is built.
   `rec`  the same facts for a recruiter or hiring manager: what was owned,
          at what scale, with what outcome. Not a simplification; a
          different question answered. No claim exists in one lens that is
          not on the resume and present in the other. */

export const ROLES = ['engineer', 'recruiter'];
export const ROLE_STORAGE_KEY = 'mf-role';

export const lens = (role, pair) => (role === 'recruiter' ? pair.rec : pair.eng);

export const sectionCopy = {
  scope: {
    headline: { eng: 'Access domains.', rec: 'Areas of ownership.' },
    lede: {
      eng: 'The identity, cloud, and collaboration stack the company runs on. The mandate: harden the foundation, make AI tooling adoptable, keep sprawl down.',
      rec: 'The identity, cloud, and collaboration stack for a public fintech, owned end to end. Green is running and audited; amber is actively being built or hardened.',
    },
  },
  plan: {
    headline: { eng: 'The access plan.', rec: 'Career, as a change record.' },
    lede: {
      eng: 'A decade of identity work, written the way this audience reads change. Every line is on the ',
      rec: 'Ten years in identity, formatted as the change plan engineers approve before anything ships. Each line is annotated with the outcome it stands for, and every line is on the '
    },
  },
  projects: {
    headline: { eng: 'Current focus.', rec: 'In flight.' },
  },
  stack: {
    headline: { eng: 'Stack.', rec: 'Stack.' },
  },
};

export const scope = [
  {
    state: 'operating',
    title: { eng: 'Identity & Access Architecture', rec: 'Identity platform ownership' },
    desc: {
      eng: "Authentication flows in Okta: SAML, OAuth 2.0, OIDC, plus SCIM for downstream provisioning. The full user lifecycle: birthright access, joiners, movers, leavers, rehires, service accounts, and the edge cases SCIM can't reach.",
      rec: 'Owns the company identity provider (Okta) and the full user lifecycle: joiners, movers, leavers, rehires, and service accounts. Single sign-on and automated provisioning across the application stack, including the edge cases automation does not reach.',
    },
  },
  {
    state: 'operating',
    title: { eng: 'Identity Governance & Audit', rec: 'Governance and audit' },
    desc: {
      eng: 'Led the Okta Identity Governance rollout: access certification campaigns and policy-driven lifecycle controls. Audit responses across SOX controls, access reviews, and service accounts, working directly with external auditors. Identity changes ship through technical reviews I author.',
      rec: 'Led the Okta Identity Governance rollout: recurring access certifications and policy-driven lifecycle controls. Point of contact for external auditors on SOX access controls, access reviews, and service accounts. Authors the technical reviews every identity change ships through.',
    },
  },
  {
    state: 'expanding',
    title: { eng: 'AI Tooling Governance', rec: 'AI tooling governance' },
    desc: {
      eng: 'The identity side of Claude Code, ChatGPT, Cursor, and Gemini Enterprise: rollout review, access controls, and MCP integration enablement across the SaaS stack. Agents get identities, scopes, and an audit trail. Service accounts authenticate through brokered credentials, checked out from the vault programmatically and returned, never held.',
      rec: 'Identity and access owner for the company rollout of Claude Code, ChatGPT, Cursor, and Gemini Enterprise: rollout review, access controls, and integration enablement across the SaaS stack. Agents get identities, least-privilege scopes, and an audit trail; automated credentials are brokered from a vault, never stored.',
    },
  },
  {
    state: 'operating',
    title: { eng: 'Cloud Governance (GCP)', rec: 'Cloud governance (GCP)' },
    desc: {
      eng: 'Terraform-managed IAM and project structure, so engineers move AI workloads from prototype to production without creating sprawl.',
      rec: 'Google Cloud IAM and project structure managed as code (Terraform), so engineering teams move AI workloads from prototype to production through a reviewed path instead of one-off exceptions.',
    },
  },
  {
    state: 'hardening',
    title: { eng: 'Collaboration Security', rec: 'Collaboration security' },
    desc: {
      eng: 'The surface where everyone works. Hardened, audited, and watched.',
      rec: 'Google Workspace and Slack, the surface every employee works in: access policy, data-loss prevention, third-party app governance, and audit coverage.',
    },
  },
];

/* The career as a plan diff. `text` is the mono line; `gloss` is the
   outcome it stands for, shown under it in the recruiter lens. */
export const planLines = [
  {
    type: 'ctx',
    text: '# career/manny-flores · 10+ years · fintech + healthcare',
    gloss: 'Ten-plus years in identity and access, across fintech and healthcare.',
  },
  {
    type: 'chg',
    text: '~ role                = "Systems Administrator" -> "Senior Systems Engineer, team lead"',
    gloss: 'Progressed from systems administrator to senior systems engineer and team lead.',
  },
  {
    type: 'add',
    text: '+ okta_identity_governance         # led rollout: certification campaigns, policy lifecycle',
    gloss: 'Led the Okta Identity Governance rollout: recurring access certifications and policy-driven lifecycle controls, company-wide.',
  },
  {
    type: 'add',
    text: '+ okta_tenant.acquisitions[6]      # Say, X1, Bitstamp, TradePMR, Chartr, WonderFi',
    gloss: 'Integrated six acquisitions into a single Okta tenant.',
  },
  {
    type: 'add',
    text: '+ ai_tools.identity_governance[4]  # Claude Code, ChatGPT, Cursor, Gemini Enterprise',
    gloss: 'Owned identity governance for the company rollout of four AI tools.',
  },
  {
    type: 'add',
    text: '+ okta_config.terraform            # clicks -> code: drift gone, changes reviewed like PRs',
    gloss: 'Moved Okta configuration into Terraform: no drift, every change peer-reviewed before it lands.',
  },
  {
    type: 'chg',
    text: '~ access_requests     = "manual tickets" -> "automated fulfillment"',
    gloss: 'Replaced hand-worked access tickets with automated fulfillment.',
  },
  {
    type: 'chg',
    text: '~ acquisition_intake  = "per-deal" -> "company standard: apps + idp"',
    gloss: 'Turned acquisition onboarding from a per-deal effort into a repeatable company standard covering applications and identity providers: unify into Okta, merge duplicates of systems already run.',
  },
  {
    type: 'del',
    text: '- standing_access.unreviewed       # replaced by certification campaigns',
    gloss: 'Eliminated unreviewed standing access; certification campaigns replaced it.',
  },
  {
    type: 'del',
    text: '- acquired_idps.standalone         # unified into okta, then retired; entra id the largest',
    gloss: 'Decommissioned the standalone identity providers that came with acquisitions after unifying them into Okta, Microsoft Entra ID the largest; duplicates of systems already run, such as Google Workspace, were merged instead.',
  },
  {
    type: 'ctx',
    text: '# (unchanged fundamentals hidden: SAML, OAuth 2.0, OIDC, SCIM, Python, Terraform)',
    gloss: 'Constant throughout: the standard identity protocols, Python, and Terraform.',
  },
  {
    type: 'out',
    text: 'Plan: 4 to add, 3 to change, 2 to destroy.',
    gloss: 'Net: four capabilities added, three processes changed, two liabilities removed.',
  },
];

export const planAriaLabel =
  'Career summary formatted as a Terraform plan: role changed from Systems Administrator to Senior Systems Engineer and team lead; added Okta Identity Governance rollout, six acquisitions merged into one Okta tenant, identity governance for four AI tools, and Okta configuration managed as Terraform code; access requests changed from manual tickets to automated fulfillment; acquisition intake changed from per-deal to a company standard covering apps and identity providers, merging duplicates of systems already run; unreviewed standing access removed; standalone acquired identity providers, Entra ID the largest, unified into Okta and retired.';

export const projects = [
  {
    status: 'Operating',
    title: { eng: 'Terraform Okta: Identity as Code', rec: 'Okta managed as code' },
    desc: {
      eng: 'Okta config lives in Terraform now, not in clicks. Config drift is gone, changes get reviewed like code, and policy stays consistent across the tenant.',
      rec: 'Moved the identity provider from console clicks to Terraform. Outcome: no configuration drift, every change peer-reviewed and traceable, consistent policy across the tenant.',
    },
    tags: ['Okta', 'Terraform', 'IaC', 'Identity Infrastructure'],
  },
  {
    status: 'Operating',
    title: { eng: 'Secure GCP for AI Workloads', rec: 'Secure cloud path for AI workloads' },
    desc: {
      eng: 'A paved road from local prototype to hosted service. Project factories, IAM bindings, and access controls all live in Terraform, so shipping an AI-assisted tool to production is a reviewed change, not a hand-built exception.',
      rec: 'A pre-approved route from prototype to production on Google Cloud, with project structure, IAM, and access controls in Terraform. Outcome: engineering ships AI-assisted tools through a reviewed change, not a security exception.',
    },
    tags: ['GCP', 'Terraform', 'IAM', 'AI Enablement'],
  },
  {
    status: 'Building',
    title: { eng: 'Google Workspace Security Hardening', rec: 'Google Workspace hardening' },
    desc: {
      eng: "Tightening Google Workspace: access policies, DLP, third-party OAuth, audit coverage. The attack surface gets bigger every time someone installs a new AI tool, and that's the part I'm watching.",
      rec: 'Tightening access policy, data-loss prevention, third-party OAuth, and audit coverage across the collaboration suite. Driven by the widening surface as employees connect new AI tools.',
    },
    tags: ['Google Workspace', 'DLP', 'OAuth Governance', 'Security'],
  },
];

export const skills = [
  {
    category: 'Identity & Access',
    rec: 'Identity platforms and the protocols behind single sign-on and provisioning.',
    items: ['Okta OIE', 'OIG', 'Entra ID', 'SAML 2.0', 'OAuth 2.0', 'OIDC', 'SCIM', 'RBAC', 'Zero Trust'],
  },
  {
    category: 'Automation & IaC',
    rec: 'Automation and infrastructure as code: changes that are repeatable and reviewed.',
    items: ['Python', 'Bash', 'Okta Workflows', 'Terraform', 'GCP IAM', 'APIs & Integrations'],
  },
  {
    category: 'Corp Apps Infra',
    rec: 'Corporate systems owned and operated.',
    items: ['GCP', 'Google Workspace', 'Okta', 'Slack', 'Jira', 'Workday'],
  },
  {
    category: 'AI & Governance',
    rec: 'AI tools under governance, and the integration layer agents use.',
    items: ['MCP', 'Claude Code', 'ChatGPT', 'Cursor', 'Gemini Enterprise', 'LLM Access Controls'],
  },
];

/* Nodes of the access fabric drawn in the hero. Positions are in the
   graph's 420 x 440 viewBox; the portrait sits at the center.
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
      rec: 'The identity provider, owned end to end: single sign-on and provisioning for every app, configuration managed as reviewed code.',
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
      rec: 'Six acquisitions integrated onto the Okta standard, apps and identity providers. Standalone IdPs decommissioned, Entra ID the largest; duplicate systems merged.',
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
      rec: 'Google Cloud IAM and project structure as code, giving engineering a reviewed path from prototype to production.',
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
      rec: 'Google Workspace: automated provisioning, third-party app governance, data-loss prevention and audit coverage in progress.',
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
      rec: 'Slack, Jira, Workday and the wider SaaS stack: single sign-on, automated lifecycle, AI integrations reviewed.',
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
      rec: 'Machine identities with brokered credentials: checked out from a vault on demand, never stored. Audit-clean by design.',
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
      rec: 'Claude Code, ChatGPT, Cursor, Gemini Enterprise: each with an identity, least-privilege scopes, and an audit trail.',
    },
  },
];

/* Under the graph when nothing is selected. */
export const fabricDefaultReadout = {
  eng: 'the systems in scope · pick a node',
  rec: 'areas of ownership · pick a node',
};
