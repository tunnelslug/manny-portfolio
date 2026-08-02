import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BioPage from './pages/BioPage.jsx'

const isBioRoute = window.location.pathname.replace(/\/+$/, '') === '/bio'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isBioRoute ? <BioPage /> : <App />}
  </StrictMode>,
)
