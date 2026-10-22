import * as THREE from 'three'

function fillNoise(canvas: HTMLCanvasElement, base: number, spread: number, seed: number) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const { width, height } = canvas
  const img = ctx.createImageData(width, height)
  for (let i = 0; i < img.data.length; i += 4) {
    const n = base + (hash(i + seed) - 0.5) * spread
    const v = Math.max(0, Math.min(255, Math.floor(n * 255)))
    img.data[i] = v
    img.data[i + 1] = v
    img.data[i + 2] = v
    img.data[i + 3] = 255
  }
  ctx.putImageData(img, 0, 0)
}

function hash(n: number): number {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

function makeCanvasTexture(
  size: number,
  paint: (canvas: HTMLCanvasElement) => void,
  repeat = 4,
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  paint(canvas)
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(repeat, repeat)
  tex.colorSpace = THREE.NoColorSpace
  return tex
}

let stoneRough: THREE.CanvasTexture | null = null
let metalRough: THREE.CanvasTexture | null = null
let leatherBump: THREE.CanvasTexture | null = null
let scaleNormal: THREE.CanvasTexture | null = null

export function stoneRoughnessMap(): THREE.CanvasTexture {
  if (!stoneRough) {
    stoneRough = makeCanvasTexture(256, (c) => fillNoise(c, 0.72, 0.35, 1), 3)
  }
  return stoneRough
}

export function metalRoughnessMap(): THREE.CanvasTexture {
  if (!metalRough) {
    metalRough = makeCanvasTexture(256, (c) => fillNoise(c, 0.28, 0.22, 2), 6)
  }
  return metalRough
}

export function leatherBumpMap(): THREE.CanvasTexture {
  if (!leatherBump) {
    leatherBump = makeCanvasTexture(256, (c) => fillNoise(c, 0.5, 0.55, 3), 5)
  }
  return leatherBump
}

/** Fake normal-ish detail via bump for scales & carved stone. */
export function organicBumpMap(): THREE.CanvasTexture {
  if (!scaleNormal) {
    scaleNormal = makeCanvasTexture(256, (c) => fillNoise(c, 0.45, 0.65, 4), 8)
  }
  return scaleNormal
}
