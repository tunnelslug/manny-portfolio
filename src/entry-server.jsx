import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import BioPage from './pages/BioPage.jsx'
import EssayPage from './pages/EssayPage.jsx'
import { matchRoute } from './lib/routes.js'

export function render(path) {
  const route = matchRoute(path)
  const page =
    route.name === 'bio' ? <BioPage /> :
    route.name === 'essay' ? <EssayPage slug={route.slug} /> :
    <App />

  const html = renderToString(
    <StrictMode>
      {page}
    </StrictMode>,
  )
  return html.replace(/ style="opacity:0[^"]*"/g, '')
}
