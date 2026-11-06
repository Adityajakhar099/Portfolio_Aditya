import '@fontsource/bebas-neue'
import '@fontsource-variable/manrope'
import '@fontsource-variable/caveat'
import './styles/global.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { registerGSAPPlugins } from './animations'
import App from './App.tsx'

registerGSAPPlugins()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
