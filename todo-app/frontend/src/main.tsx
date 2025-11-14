import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import App from './App.tsx'
import Toast from './components/Toast.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toast />
  </StrictMode>,
)