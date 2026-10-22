import type { ReactNode } from 'react'

/** Subdivision budget — tuned for ~32 hero meshes on board with headroom. */
export const G = {
  sphere: 56,
  sphereMed: 40,
  sphereLo: 28,
  cylinder: 36,
  capsuleRadial: 20,
  capsuleHeight: 40,
  cone: 28,
  torusTube: 16,
  torusRing: 64,
  ring: 72,
  icosa: 2,
} as const

export function mat(
  color: string,
  opts?: {
    emissive?: string
    intensity?: number
    metalness?: number
    roughness?: number
    transparent?: boolean
    opacity?: number
  },
) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={opts?.roughness ?? 0.48}
      metalness={opts?.metalness ?? 0.06}
      emissive={opts?.emissive ?? '#000000'}
      emissiveIntensity={opts?.intensity ?? 0}
      transparent={opts?.transparent}
      opacity={opts?.opacity ?? 1}
    />
  )
}

export function ghostSheet(body: string, accent: string, opacity = 0.78) {
  return (
    <meshStandardMaterial
      color={body}
      transparent
      opacity={opacity}
      roughness={0.32}
      metalness={0.02}
      emissive={accent}
      emissiveIntensity={0.16}
    />
  )
}

export function Eyes({
  y,
  z,
  spacing = 0.08,
  size = 0.032,
  iris = '#0f172a',
  angry = false,
}: {
  y: number
  z: number
  spacing?: number
  size?: number
  iris?: string
  angry?: boolean
}) {
  const browTilt = angry ? 0.35 : 0.12
  return (
    <>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * spacing, y, z]}>
          <mesh castShadow>
            <sphereGeometry args={[size, G.sphereMed, G.sphereMed]} />
            {mat('#f8fafc')}
          </mesh>
          <mesh position={[0, 0, size * 0.38]} castShadow>
            <sphereGeometry args={[size * 0.58, G.sphereLo, G.sphereLo]} />
            {mat(iris, { emissive: iris, intensity: 0.08 })}
          </mesh>
          <mesh position={[0, size * 0.55, size * 0.1]} rotation={[0, 0, side * browTilt]} castShadow>
            <boxGeometry args={[size * 1.4, size * 0.35, size * 0.25]} />
            {mat('#374151')}
          </mesh>
        </group>
      ))}
    </>
  )
}

/** Decorative studs along a horizontal ring (golem rivets, robe beads). */
export function StudRing({
  y,
  radius,
  count,
  size,
  color,
  emissive,
}: {
  y: number
  radius: number
  count: number
  size: number
  color: string
  emissive?: string
}) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.sin(a) * radius, y, Math.cos(a) * radius]} castShadow>
            <sphereGeometry args={[size, G.sphereLo, G.sphereLo]} />
            {mat(color, emissive ? { emissive, intensity: 0.35 } : undefined)}
          </mesh>
        )
      })}
    </>
  )
}

/** Scale bumps along a spine (dragon / tail detail). */
export function ScaleSpine({
  points,
  color,
  scaleSize = 0.035,
}: {
  points: [number, number, number][]
  color: string
  scaleSize?: number
}) {
  return (
    <>
      {points.map((p, i) => (
        <mesh key={i} position={p} rotation={[0.4, i * 0.7, 0]} castShadow>
          <coneGeometry args={[scaleSize, scaleSize * 1.6, G.cone]} />
          {mat(color, { metalness: 0.15, roughness: 0.4 })}
        </mesh>
      ))}
    </>
  )
}

export type PaletteProps = {
  body: string
  accent: string
  secondary: string
  detail: string
  cloth: string
  trim: string
}

export function ModelRoot({ children }: { children: ReactNode }) {
  return <group>{children}</group>
}
