import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../src/App.jsx'
import { resetAudit } from '../src/lib/audit.js'
import { scope, projects, planLines, fabricNodes } from '../src/content/portfolio.js'

vi.mock('@vercel/analytics/react', () => ({ Analytics: () => null }))
vi.mock('@vercel/speed-insights/react', () => ({ SpeedInsights: () => null }))

describe('reader role lens', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.setItem('mf-boot-seen', '1')
    resetAudit()
  })

  it('defaults to the engineer lens and renders console copy', () => {
    render(<App />)
    const group = screen.getByRole('group', { name: /read as/i })
    expect(within(group).getByRole('button', { name: 'engineer' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText(scope[0].title.eng)).toBeInTheDocument()
    expect(screen.queryByText(scope[0].title.plain)).not.toBeInTheDocument()
  })

  it('switches every lensed surface to plain English and persists the choice', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'anyone' }))

    expect(screen.getByText(scope[0].title.plain)).toBeInTheDocument()
    expect(screen.getByText(projects[0].title.plain)).toBeInTheDocument()
    expect(screen.getByText(planLines[1].gloss)).toBeInTheDocument()
    expect(localStorage.getItem('mf-role')).toBe('anyone')
  })

  it('restores a stored role on load', () => {
    localStorage.setItem('mf-role', 'anyone')
    render(<App />)
    expect(screen.getByRole('button', { name: 'anyone' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText(scope[2].title.plain)).toBeInTheDocument()
  })

  it('offers the plain-English switch inline in the plan lede', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /read it in plain english/i }))
    expect(screen.getByText(planLines[0].gloss)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /back to the engineer view/i }))
    expect(screen.queryByText(planLines[0].gloss)).not.toBeInTheDocument()
  })

  it('never lets a lens carry a fact the other lacks: every pair has both sides', () => {
    for (const row of scope) {
      expect(row.title.eng.length).toBeGreaterThan(0)
      expect(row.title.plain.length).toBeGreaterThan(0)
      expect(row.desc.eng.length).toBeGreaterThan(0)
      expect(row.desc.plain.length).toBeGreaterThan(0)
    }
    for (const line of planLines) expect(line.gloss.length).toBeGreaterThan(0)
    for (const n of fabricNodes) {
      expect(n.detail.eng.length).toBeGreaterThan(0)
      expect(n.detail.plain.length).toBeGreaterThan(0)
    }
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
    sessionStorage.setItem('mf-boot-seen', '1')
    resetAudit()
  })

  it('issues a session on load and exposes the count in the masthead', () => {
    render(<App />)
    const toggle = screen.getByRole('button', { name: /access logged/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle.textContent).toMatch(/· 1$/)
  })

  it('opens the panel and records role changes', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'anyone' }))
    await user.click(screen.getByRole('button', { name: /access logged/i }))

    const list = screen.getByRole('list', { name: /session events/i })
    const rows = within(list).getAllByRole('listitem')
    expect(rows[0]).toHaveTextContent('session.issued')
    expect(rows[rows.length - 1]).toHaveTextContent('role.changed')
    expect(rows[rows.length - 1]).toHaveTextContent('engineer -> anyone')
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
    sessionStorage.setItem('mf-boot-seen', '1')
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
    expect(screen.getByText(fabricNodes[0].detail.eng, { exact: false })).toBeInTheDocument()
  })
})
