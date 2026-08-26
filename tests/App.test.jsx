import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../src/App.jsx'
import EssayPage from '../src/pages/EssayPage.jsx'

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

  it('renders a named human and the identity thesis on first paint', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Manny Flores' })).toBeInTheDocument()
    expect(screen.getByText(/Identity engineering, SF Bay/)).toBeInTheDocument()
    expect(screen.getByText(/who, and what, can do what/)).toBeInTheDocument()
    expect(screen.getByText(/On leave/)).toBeInTheDocument()
  })

  it('renders work and writing as the only two blocks', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Selected work' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Writing' })).toBeInTheDocument()
    expect(screen.getByText('Okta as code')).toBeInTheDocument()
    expect(screen.getByText('A paved road for AI workloads')).toBeInTheDocument()
    expect(screen.getByText('The collaboration surface')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Agents are users' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'RSS' })).toHaveAttribute('href', '/rss.xml')
  })

  it('does not render the retired console costume', () => {
    render(<App />)
    expect(screen.queryByText(/terraform plan/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/exit 0/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/access logged/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/signing you in/i)).not.toBeInTheDocument()
    expect(screen.queryByText('OPERATING')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'the plan' })).not.toBeInTheDocument()
  })

  it('keeps hash targets for work and writing', () => {
    const { container } = render(<App />)
    expect(container.querySelector('#work')).not.toBeNull()
    expect(container.querySelector('#writing')).not.toBeNull()
  })

  it('renders the footer with the current year', () => {
    render(<App />)
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${year} Manny Flores`))).toBeInTheDocument()
  })

  it('opens the resume dialog from the masthead', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Resume' }))
    expect(screen.getByTitle('Manny Flores Resume PDF Viewer')).toBeInTheDocument()
  })
})

describe('EssayPage', () => {
  it('renders a verified essay', () => {
    render(<EssayPage slug="agents-are-users" />)
    expect(screen.getByRole('heading', { name: 'Agents are users' })).toBeInTheDocument()
    expect(screen.getByText(/Agents get identities/)).toBeInTheDocument()
  })

  it('renders a missing state for unknown slugs', () => {
    render(<EssayPage slug="not-a-real-note" />)
    expect(screen.getByRole('heading', { name: 'Not found' })).toBeInTheDocument()
  })
})
