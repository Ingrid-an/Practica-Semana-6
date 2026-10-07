import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// PASO 1: <BrowserRouter> envuelve toda la aplicación.
// IA: Usa la History API del navegador, así las URLs cambian (/peliculas, /nueva...)
// sin recargar la página. Es la base de una SPA.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
