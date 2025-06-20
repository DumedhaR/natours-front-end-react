import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/style.css'
import './index.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
