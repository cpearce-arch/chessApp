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

void Chess
void THREE

export function preloadRuntimeAssets(): Promise<void> {
  return Promise.resolve()
}
