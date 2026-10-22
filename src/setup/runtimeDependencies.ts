/**
 * Side-effect imports so Vite bundles all runtime libraries into the app
 * (chess, Three.js, React Three Fiber). No CDN scripts at runtime.
 *
 * preloadRuntimeAssets() exists for future font/texture warmup; it resolves immediately today.
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
