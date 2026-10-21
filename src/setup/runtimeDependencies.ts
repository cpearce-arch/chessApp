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
import { configureTextBuilder, preloadFont } from '../shims/troika-three-text'
import labelFontUrl from '@fontsource/inter/files/inter-latin-400-normal.woff2?url'

void Chess
void THREE

configureTextBuilder({
  defaultFontURL: labelFontUrl,
})

export const LABEL_FONT_URL = labelFontUrl

/** Preload label font into the troika atlas before the first frame renders. */
export function preloadRuntimeAssets(): Promise<void> {
  return new Promise((resolve) => {
    preloadFont({ font: labelFontUrl }, () => resolve())
  })
}
