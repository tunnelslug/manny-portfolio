// Keeps the CSP script-src sha256 hashes in vercel.json in sync with the
// inline <script> blocks in index.html. CSP hashes are exact — editing the
// inline script (even whitespace) invalidates the hash and the browser
// silently blocks the script.
//
//   node scripts/sync-csp.mjs           check mode: exits 1 on mismatch (runs in `npm run build`)
//   node scripts/sync-csp.mjs --write   rewrites vercel.json with the current hashes
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const write = process.argv.includes('--write')

// Prefer the built HTML (what actually ships); fall back to the source file
// so --write also works before a build. The inline script passes through the
// build unchanged, so both hash identically.
const htmlFile = ['dist/index.html', 'index.html']
  .map((f) => path.join(root, f))
  .find(existsSync)
const html = readFileSync(htmlFile, 'utf8')

// Attribute-less <script> blocks only: scripts with src are covered by
// 'self', and non-executable types (application/ld+json) are exempt from CSP.
const expected = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(
  ([, body]) => `'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`,
)

const vercelPath = path.join(root, 'vercel.json')
const config = JSON.parse(readFileSync(vercelPath, 'utf8'))
const cspHeader = config.headers
  .flatMap((h) => h.headers)
  .find((h) => h.key === 'Content-Security-Policy')

const directives = cspHeader.value.split(';').map((d) => d.trim())
const scriptSrcIndex = directives.findIndex((d) => d.startsWith('script-src'))
const tokens = directives[scriptSrcIndex].split(/\s+/)
const current = tokens.filter((t) => t.startsWith("'sha256-"))

const same =
  current.length === expected.length &&
  [...current].sort().every((h, i) => h === [...expected].sort()[i])

if (same) {
  console.log(`CSP script hashes in sync (${expected.length} inline script(s), checked against ${path.relative(root, htmlFile)})`)
  process.exit(0)
}

if (!write) {
  console.error('CSP script-src hashes in vercel.json do not match the inline <script> blocks in index.html.')
  console.error(`  in vercel.json: ${current.join(' ') || '(none)'}`)
  console.error(`  expected:       ${expected.join(' ') || '(none)'}`)
  console.error('The browser will silently block the out-of-sync script in production.')
  console.error('Fix: node scripts/sync-csp.mjs --write  (then commit vercel.json)')
  process.exit(1)
}

// Rebuild script-src: keep non-hash sources in order, hashes after 'self'.
const kept = tokens.filter((t) => !t.startsWith("'sha256-"))
const selfIndex = kept.indexOf("'self'")
kept.splice(selfIndex + 1, 0, ...expected)
directives[scriptSrcIndex] = kept.join(' ')
cspHeader.value = directives.join('; ')

writeFileSync(vercelPath, JSON.stringify(config, null, 2) + '\n')
console.log(`Updated vercel.json script-src hashes: ${expected.join(' ')}`)
