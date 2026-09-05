import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../src/App.jsx'
import { resetAudit } from '../src/lib/audit.js'
import { capabilities, projects, planLines, fabricNodes } from '../src/content/portfolio.js'

vi.mock('@vercel/analytics/react', () => ({ Analytics: () => null }))
vi.mock('@vercel/speed-insights/react', () => ({ SpeedInsights: () => null }))

describe('content', () => {
  it('renders every capability, case study, and plan line', () => {
    render(<App />)
    for (const row of capabilities) expect(screen.getByText(row.title)).toBeInTheDocument()
    for (const p of projects) expect(screen.getByText(p.title)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /career summary formatted as a terraform plan/i })).toBeInTheDocument()
  })

  it('every capability carries tools and every case study carries proof', () => {
    for (const row of capabilities) {
      expect(row.title.length).toBeGreaterThan(0)
      expect(row.desc.length).toBeGreaterThan(0)
      expect(row.tools.length).toBeGreaterThan(0)
    }
    for (const p of projects) {
      expect(p.proof.kind.length).toBeGreaterThan(0)
      expect(p.proof.lines.length).toBeGreaterThan(0)
      for (const line of p.proof.lines) expect(line).toHaveLength(2)
    }
    for (const n of fabricNodes) expect(n.detail.length).toBeGreaterThan(0)
  })

  it('links the one public artifact and nothing else', () => {
    render(<App />)
    const links = screen.getAllByRole('link').filter(a => a.className.includes('case-proof-link'))
    expect(links).toHaveLength(1)
    expect(links[0]).toHaveAttribute('href', 'https://github.com/tunnelslug/okta-terraform-foundation')
  })
})

describe('plan diff integrity', () => {
  it('summary line counts match the add / change / destroy lines', () => {
    const count = (t) => planLines.filter(l => l.type === t).length
    const out = planLines.find(l => l.type === 'out')
    expect(out.text).toBe(`Plan: ${count('add')} to add, ${count('chg')} to change, ${count('del')} to destroy.`)
  })
})

describe('session audit log', () => {
  beforeEach(() => {
    localStorage.clear()
    resetAudit()
  })

  it('issues a read-only session on load and exposes the count in the masthead', () => {
    render(<App />)
    const toggle = screen.getByRole('button', { name: /access logged/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle.textContent).toMatch(/· 1$/)
  })

  it('opens the panel and records the session and a resume open', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getAllByRole('button', { name: /^resume$/i })[0])
    await user.keyboard('{Escape}')
    await user.click(screen.getByRole('button', { name: /access logged/i }))

    const list = screen.getByRole('list', { name: /session events/i })
    const rows = within(list).getAllByRole('listitem')
    expect(rows[0]).toHaveTextContent('session.issued')
    expect(rows[0]).toHaveTextContent('read-only · this tab')
    expect(rows.some(r => r.textContent.includes('resume.opened'))).toBe(true)
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    render(<App />)
    const toggle = screen.getByRole('button', { name: /access logged/i })
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await user.keyboard('{Escape}')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})

describe('access fabric', () => {
  beforeEach(() => {
    localStorage.clear()
    resetAudit()
  })

  it('renders one focusable node per system in scope, plus the portrait', () => {
    render(<App />)
    const nodes = screen.getAllByRole('button', { pressed: false }).filter(b => b.classList.contains('ig-node'))
    expect(nodes).toHaveLength(fabricNodes.length)
    expect(screen.getByAltText(/portrait of manny flores/i)).toBeInTheDocument()
  })

  it('pins a node on click and shows its brief in the readout', async () => {
    const user = userEvent.setup()
    render(<App />)
    const okta = screen.getByRole('button', { name: /^okta,/i })
    await user.click(okta)
    expect(okta).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText(fabricNodes[0].detail, { exact: false })).toBeInTheDocument()
  })
})

describe('mobile dock', () => {
  let observers
  let RealIO

  beforeEach(() => {
    localStorage.clear()
    resetAudit()
    observers = []
    RealIO = window.IntersectionObserver
    window.IntersectionObserver = class {
      constructor(cb) { this.cb = cb; this.targets = []; observers.push(this) }
      observe(el) { this.targets.push(el) }
      unobserve() {}
      disconnect() {}
      takeRecords() { return [] }
    }
  })

  const observerFor = (className) =>
    observers.find(o => o.targets.some(t => t.classList?.contains(className)))

  it('stays hidden while the hero actions are on screen, then docks when they leave', async () => {
    render(<App />)
    const dock = screen.getByTestId('mobile-dock')
    expect(dock).toHaveAttribute('aria-hidden', 'true')

    const io = observerFor('hero-cta-row')
    expect(io).toBeTruthy()
    const { act } = await import('@testing-library/react')
    act(() => io.cb([{ isIntersecting: false }]))
    expect(dock).toHaveAttribute('aria-hidden', 'false')
    expect(within(dock).getByRole('link', { name: /get in touch/i })).toHaveAttribute('href', 'mailto:manny@flores.network')
    expect(within(dock).getByRole('button', { name: /resume/i })).toBeInTheDocument()

    act(() => io.cb([{ isIntersecting: true }]))
    expect(dock).toHaveAttribute('aria-hidden', 'true')
  })

  it('hides while the resume dialog is open', async () => {
    const user = userEvent.setup()
    render(<App />)
    const io = observerFor('hero-cta-row')
    const { act } = await import('@testing-library/react')
    act(() => io.cb([{ isIntersecting: false }]))
    const dock = screen.getByTestId('mobile-dock')
    await user.click(within(dock).getByRole('button', { name: /resume/i }))
    expect(dock).toHaveAttribute('aria-hidden', 'true')
    window.IntersectionObserver = RealIO
  })
})
