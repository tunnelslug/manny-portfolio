import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BioPage from './pages/BioPage.jsx'
import EssayPage from './pages/EssayPage.jsx'
import { matchRoute } from './lib/routes.js'

const route = matchRoute(window.location.pathname)
const page =
  route.name === 'bio' ? <BioPage /> :
  route.name === 'essay' ? <EssayPage slug={route.slug} /> :
  <App />

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {page}
  </StrictMode>,
)
