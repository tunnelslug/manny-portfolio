/* Public, resume-backed copy only. Essay bodies are seeded from takes
   already on mannyflo.com, his LinkedIn headline, and github.com/tunnelslug.
   If a take could not be verified, it is not here. */

export const PERSON = {
  name: 'Manny Flores',
  role: 'Identity engineering, SF Bay',
  email: 'manny@flores.network',
  x: 'https://x.com/tunnelslug',
  xHandle: '@tunnelslug',
  github: 'https://github.com/tunnelslug',
  linkedin: 'https://linkedin.com/in/mannyflores11',
  thesis:
    'Identity has been my whole career: who gets in, what they can touch, and how access ends when they leave. Ten years of that across fintech and healthcare. Lately the newest users on the network are not people, so the job now is making sure AI tools live by the same rules as everyone else: who, and what, can do what.',
  now: 'On leave. Thinking about who owns the agents when the people are out.',
  aside: 'I run. I collect things I do not need.',
}

export const WORK = [
  {
    num: '01',
    title: 'Okta as code',
    problem:
      'The Okta tenant lived in clicks. Policy drifted. A change was whatever someone remembered to screenshot.',
    constraint:
      'The tenant still had to stay consistent while six acquisitions landed in it, and identity changes still had to survive review.',
    shipped:
      'Okta config moved into Terraform. Changes get reviewed like pull requests. Drift is gone.',
    changed:
      'Access policy is a reviewed artifact, not a console habit.',
    href: 'https://github.com/tunnelslug/okta-terraform-foundation',
  },
  {
    num: '02',
    title: 'A paved road for AI workloads',
    problem:
      'Engineers could stand up an AI prototype on GCP in an afternoon. Production was a hand-built exception.',
    constraint:
      'The work is to make AI tooling adoptable without letting every prototype become its own estate.',
    shipped:
      'Project factories, IAM bindings, and access controls live in Terraform. The path from local to hosted is a reviewed change.',
    changed:
      'Shipping an AI-assisted tool no longer means inventing a new identity model on the way out the door.',
  },
  {
    num: '03',
    title: 'The collaboration surface',
    problem:
      'Everyone works in Google Workspace. Every new AI tool that attaches to it is another OAuth grant and another place to look.',
    constraint:
      'You cannot freeze the tools people need. You can watch what they connect.',
    shipped:
      'Access policies, DLP, third-party OAuth, and audit coverage are being tightened on the surface people actually use.',
    changed:
      'The attack surface grows when someone installs a new AI tool. That is the part I am watching.',
  },
]

export const ESSAYS = [
  {
    slug: 'agents-are-users',
    title: 'Agents are users',
    date: '2026-08-18',
    dek: 'If it can act, it gets an identity, a scope, and a trail.',
    source: 'mannyflo.com: agents get identities, scopes, and an audit trail; LinkedIn headline: identity governance for AI agents; MCP enablement on the current site.',
    body: [
      'The newest users on the network are not people. That is not a metaphor. Claude Code, ChatGPT, Cursor, and Gemini Enterprise already act inside the SaaS stack.',
      'A person gets an account, a joiner ticket, a leaver ticket, and someone who notices when the ticket never closes. An agent that skips that path is just standing access with a nicer UI.',
      'So the rule is boring on purpose. Agents get identities. They get scopes. They get an audit trail. MCP talks to the rest of the stack through the IdP, not around it.',
      'If your access model still says "user" and means a human with a laptop, the agents are already past you.',
    ],
  },
  {
    slug: 'reviews-assume-a-human',
    title: 'Access reviews still assume a human works here',
    date: '2026-08-12',
    dek: 'Certification campaigns were built for joiners, movers, and leavers.',
    source: 'mannyflo.com: Okta Identity Governance rollout, certification campaigns, joiners/movers/leavers, service accounts.',
    body: [
      'Access reviews are good at a specific story. Someone joined. Someone moved. Someone left. A manager attests. A campaign closes.',
      'I led an Okta Identity Governance rollout on that story: certification campaigns, policy-driven lifecycle, audit responses that still assume a named human is on the other end of the ticket.',
      'Agents do not go on parental leave. They do not accept a new role in Workday. They do not trigger the leaver workflow unless you taught the system they are a user.',
      'If the campaign cannot see the agent, the access is unreviewed standing privilege. We already retired that pattern for people. The agents inherited it.',
    ],
  },
  {
    slug: 'unowned-agents',
    title: 'Unowned, employee-built, already in production',
    date: '2026-08-08',
    dek: 'The exception is how estates get built.',
    source: 'mannyflo.com: GCP paved road; prototype to production without sprawl; reviewed change, not a hand-built exception.',
    body: [
      'The dangerous agent is not the one the vendor sold you. It is the one an engineer stood up on a Tuesday because the paved road was slower than a prototype.',
      'I have watched that movie on GCP. Local to hosted is easy. Identity, project structure, and who can do what are the part people skip when they are trying to show a demo.',
      'A paved road is not a lecture. It is project factories and IAM bindings in Terraform, so the path to production is a reviewed change. If the exception is faster, the exception becomes the estate.',
      'Employee-built agents without an owner are just unowned production. Treat them that way before the audit does.',
    ],
  },
  {
    slug: 'vendors-ship-faster',
    title: 'Vendors ship agents faster than owners do',
    date: '2026-08-04',
    dek: 'Every new tool is another grant on the collaboration surface.',
    source: 'mannyflo.com: Workspace hardening; attack surface grows every time someone installs a new AI tool; third-party OAuth.',
    body: [
      'The vendors are not waiting for your identity program. They ship an agent, they ask for OAuth, and they land where people already work.',
      'Google Workspace is that place. Access policies, DLP, third-party OAuth, audit. The boring surface. It gets more interesting every time someone installs a new AI tool.',
      'You will not win by banning the tools. You win by making the grant visible, scoped, and revocable, and by noticing when a new one appears.',
      'Owners move at the speed of review. Vendors move at the speed of a changelog. Plan for that gap, or the gap plans for you.',
    ],
  },
  {
    slug: 'credentials-that-leave',
    title: 'Credentials that go home',
    date: '2026-08-01',
    dek: 'If a service account can hold a secret forever, it will.',
    source: 'mannyflo.com: service accounts authenticate through brokered credentials, checked out from the vault, never held.',
    body: [
      'Long-lived service account keys are standing access with extra steps. Someone will paste one into a config file and forget which Tuesday it was.',
      'The model I want is dull. The agent checks a credential out of the vault, uses it, and gives it back. Nothing holds a secret because it might need it later.',
      'Brokered credentials are how you keep agents on the same rule as people: access is issued, it expires, and you can see who asked.',
      'If the key lives in the repo, the agent already has a better job than your administrators.',
    ],
  },
]

export function getEssay(slug) {
  return ESSAYS.find((essay) => essay.slug === slug) ?? null
}

export function formatDate(iso) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
