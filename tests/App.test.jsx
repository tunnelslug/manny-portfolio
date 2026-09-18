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
    for (const label of ['about', 'capabilities', 'the plan', 'building']) {
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
    const buildingBtn = within(nav).getByRole('button', { name: 'building' })
    await user.click(buildingBtn)
    expect(window.location.hash).toBe('#building')
  })

  it('puts X next to the other hero actions', () => {
    render(<App />)
    const x = screen.getAllByRole('link', { name: /^x$/i })[0]
    expect(x).toHaveAttribute('href', 'https://x.com/Mannyflo')
  })

  it('Get in Touch mails mannyflores1193@gmail.com', () => {
    render(<App />)
    const mail = screen.getAllByRole('link', { name: /get in touch/i })[0]
    expect(mail).toHaveAttribute('href', 'mailto:mannyflores1193@gmail.com')
  })

  it('hero names AI platforms, not AI tools held to a bar', () => {
    render(<App />)
    expect(screen.getByText(/AI platforms: accounts, scopes, and an offboard like everyone else/i)).toBeInTheDocument()
    expect(screen.queryByText(/hold AI tools to the same bar/i)).not.toBeInTheDocument()
    expect(screen.getByText(/Senior Systems Engineer · Corporate Systems Lead, Robinhood/)).toBeInTheDocument()
  })

  it('renders the footer with the current year', () => {
    render(<App />)
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${year} Manny Flores`))).toBeInTheDocument()
  })
})
