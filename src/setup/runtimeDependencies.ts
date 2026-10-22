/**
 * Eager side-effect imports so Vite bundles every runtime dependency into the app
 * (no CDN scripts or lazy third-party loads at runtime).
 */
import 'react'
import 'react-dom/client'
import * as THREE from 'three'
import '@react-three/fiber'
import '@react-three/drei'
import { Chess } from 'chess.js'
import { useTexture } from '@react-three/drei'
import { ALL_SPRITE_IDS } from '../pokemon/spriteIds'
import { configureTextBuilder, preloadFont } from '../shims/troika-three-text'
// Troika cannot parse woff2 in Electron/file:// — use woff (see troika font parser).
import labelFontUrl from '@fontsource/inter/files/inter-latin-400-normal.woff?url'

void Chess
void THREE

const isFileProtocol =
  typeof window !== 'undefined' && window.location.protocol === 'file:'

configureTextBuilder({
  defaultFontURL: labelFontUrl,
  // Web workers often fail to load from file:// inside packaged Electron apps.
  useWorker: !isFileProtocol,
})

export const LABEL_FONT_URL = labelFontUrl

const FONT_PRELOAD_MS = 4000

/** Best-effort font warmup; never blocks the UI indefinitely. */
function preloadPokemonSprites() {
  const base = import.meta.env.BASE_URL ?? './'
  for (const id of ALL_SPRITE_IDS) {
    useTexture.preload(`${base}pokemon/${id}.png`)
  }
}

export function preloadRuntimeAssets(): Promise<void> {
  preloadPokemonSprites()
  return new Promise((resolve) => {
    let settled = false
    const done = () => {
      if (!settled) {
        settled = true
        resolve()
      }
    }
    const timer = window.setTimeout(done, FONT_PRELOAD_MS)
    try {
      preloadFont({ font: labelFontUrl }, () => {
        window.clearTimeout(timer)
        done()
      })
    } catch {
      window.clearTimeout(timer)
      done()
    }
  })
}
