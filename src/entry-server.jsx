import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import BioPage from './pages/BioPage.jsx'

// Build-time prerender entry. Framer-motion emits its initial "hidden" states
// as inline styles (opacity:0, translate); those are stripped so the static
// HTML ships fully visible for crawlers and no-JS clients. The client bundle
// re-renders on load and animations run normally.
export function render(path) {
  const Page = path === '/bio' ? BioPage : App
  const html = renderToString(
    <StrictMode>
      <Page />
    </StrictMode>,
  )
  return html.replace(/ style="opacity:0[^"]*"/g, '')
}
