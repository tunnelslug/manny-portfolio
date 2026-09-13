// Post-build prerender: injects server-rendered HTML into the built shell so
// crawlers, link previews, and no-JS clients see real page content.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { ESSAYS, PERSON } from '../src/content/site.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

const { render } = await import(path.join(dist, 'server/entry-server.js'))
const template = readFileSync(path.join(dist, 'index.html'), 'utf8')

function buildPage(route, head = {}) {
  const body = render(route)
  let html = template.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  if (head.title) {
    html = html.replace(/<title>.*?<\/title>/, `<title>${head.title}</title>`)
    html = html.replace(
      /(<meta property="og:title" content=").*?(")/,
      `$1${head.title}$2`,
    )
  }
  if (head.description) {
    html = html.replace(
      /(<meta name="description" content=").*?(")/,
      `$1${head.description}$2`,
    )
    html = html.replace(
      /(<meta property="og:description" content=").*?(")/,
      `$1${head.description}$2`,
    )
  }
  if (head.url) {
    html = html.replace(/(<meta property="og:url" content=").*?(")/, `$1${head.url}$2`)
    html = html.replace(/(<link rel="canonical" href=").*?(")/, `$1${head.url}$2`)
  }
  return html
}

writeFileSync(path.join(dist, 'index.html'), buildPage('/'))

mkdirSync(path.join(dist, 'bio'), { recursive: true })
writeFileSync(
  path.join(dist, 'bio/index.html'),
  buildPage('/bio', {
    title: 'Manny Flores · Links',
    description:
      'Links for Manny Flores: personal site, LinkedIn, GitHub, Instagram, and more.',
    url: 'https://www.mannyflo.com/bio',
  }),
)

for (const essay of ESSAYS) {
  const dir = path.join(dist, 'writing', essay.slug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(
    path.join(dir, 'index.html'),
    buildPage(`/writing/${essay.slug}`, {
      title: `${essay.title} · ${PERSON.name}`,
      description: essay.dek,
      url: `https://www.mannyflo.com/writing/${essay.slug}`,
    }),
  )
}

const rssItems = ESSAYS.map((essay) => `    <item>
      <title>${escapeXml(essay.title)}</title>
      <link>https://www.mannyflo.com/writing/${essay.slug}</link>
      <guid>https://www.mannyflo.com/writing/${essay.slug}</guid>
      <pubDate>${new Date(`${essay.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(essay.dek)}</description>
    </item>`).join('\n')

writeFileSync(
  path.join(dist, 'rss.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Manny Flores</title>
    <link>https://www.mannyflo.com/</link>
    <description>Notes on identity, access, and the agents now using both.</description>
${rssItems}
  </channel>
</rss>
`,
)

rmSync(path.join(dist, 'server'), { recursive: true, force: true })

console.log(`Prerendered: /, /bio, ${ESSAYS.length} essays, rss.xml`)

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}
