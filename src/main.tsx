import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { preloadRuntimeAssets } from './setup/runtimeDependencies'
import App from './App.tsx'
import './index.css'

const rootEl = document.getElementById('root')

if (!rootEl) {
  throw new Error('Root element #root not found')
}

const root = createRoot(rootEl)

// Mount UI immediately so Electron never shows a blank window if font preload stalls.
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)

void preloadRuntimeAssets()
