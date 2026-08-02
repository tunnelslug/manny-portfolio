// Post-build prerender: injects server-rendered HTML into the built shell so
// crawlers, link previews, and no-JS clients see real page content.
// Runs after `vite build` (client) and `vite build --ssr` (server entry).
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

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
    url: 'https://mannyflo.com/bio',
  }),
)

// The SSR bundle is build tooling, not a deployable asset.
rmSync(path.join(dist, 'server'), { recursive: true, force: true })

console.log('Prerendered: / and /bio')
