import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../src/App.jsx'

vi.mock('@vercel/analytics/react', () => ({ Analytics: () => null }))
vi.mock('@vercel/speed-insights/react', () => ({ SpeedInsights: () => null }))

describe('App', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/')
  })

  it('renders the skip link targeting the main landmark', () => {
    render(<App />)
    const skip = screen.getByRole('link', { name: /skip to content/i })
    expect(skip).toHaveAttribute('href', '#main')
  })

  it('renders a <main id="main"> landmark', () => {
    const { container } = render(<App />)
    const main = container.querySelector('main#main')
    expect(main).not.toBeNull()
  })

  it('renders all nav sections as buttons', () => {
    render(<App />)
    const nav = screen.getByRole('navigation', { name: /main navigation/i })
    const navButtons = within(nav).getAllByRole('button')
    const labels = navButtons.map(b => b.textContent.trim().toLowerCase())
    for (const label of ['about', 'scope', 'the plan', 'current focus', 'stack']) {
      expect(labels).toContain(label)
    }
  })

  it('marks the active nav item with aria-current="page"', () => {
    render(<App />)
    const aboutButtons = screen.getAllByRole('button', { name: 'about' })
    expect(aboutButtons.some(b => b.getAttribute('aria-current') === 'page')).toBe(true)
  })

  it('opens and closes the mobile menu via the hamburger button', async () => {
    const user = userEvent.setup()
    render(<App />)
    const hamburger = screen.getByRole('button', { name: /open menu/i })
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
    await user.click(hamburger)
    expect(hamburger).toHaveAttribute('aria-expanded', 'true')
  })

  it('closes the mobile menu when Escape is pressed', async () => {
    const user = userEvent.setup()
    render(<App />)
    const hamburger = screen.getByRole('button', { name: /open menu/i })
    await user.click(hamburger)
    expect(hamburger).toHaveAttribute('aria-expanded', 'true')
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
  })

  it('updates the URL hash when a nav item is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    const nav = screen.getByRole('navigation', { name: /main navigation/i })
    const stackBtn = within(nav).getByRole('button', { name: 'stack' })
    await user.click(stackBtn)
    expect(window.location.hash).toBe('#stack')
  })

  it('renders the footer with the current year', () => {
    render(<App />)
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${year} Manny Flores`))).toBeInTheDocument()
  })

  it('keeps the Access Plan unique items: session, terraform plan, exit 0', () => {
    render(<App />)
    expect(screen.getByText(/access logged/)).toBeInTheDocument()
    expect(screen.getByText('terraform plan')).toBeInTheDocument()
    expect(screen.getByText('career/manny-flores')).toBeInTheDocument()
    expect(screen.getByText('exit 0')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Manny Flores' })).toBeInTheDocument()
    expect(screen.getByText(/Corporate Systems lead, Robinhood/)).toBeInTheDocument()
  })

  it('renders owned-domain and current-focus copy without waiting on scroll', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Access domains.' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'The access plan.' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Current focus.' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Stack.' })).toBeInTheDocument()
    expect(screen.getByText('Terraform Okta: Identity as Code')).toBeInTheDocument()
    expect(screen.getByText('Secure GCP for AI Workloads')).toBeInTheDocument()
    expect(screen.getByText('Google Workspace Security Hardening')).toBeInTheDocument()
    expect(screen.getByText(/Say, X1, Bitstamp, TradePMR, Chartr, WonderFi/)).toBeInTheDocument()
  })

  it('keeps hash targets for nav sections and first-screen domain links', () => {
    const { container } = render(<App />)
    for (const id of ['about', 'scope', 'plan', 'projects', 'stack']) {
      expect(container.querySelector(`#${id}`)).not.toBeNull()
    }
    for (const n of [1, 2, 3, 4, 5]) {
      expect(container.querySelector(`#scope-${n}`)).not.toBeNull()
    }
    const index = screen.getByRole('navigation', { name: /access domains at a glance/i })
    expect(within(index).getAllByRole('link')).toHaveLength(5)
  })
})
