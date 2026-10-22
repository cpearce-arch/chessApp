import type { ReactNode } from 'react'

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

export function ghostSheet(body: string, accent: string) {
  return (
    <meshStandardMaterial
      color={body}
      transparent
      opacity={0.78}
      roughness={0.32}
      metalness={0.02}
      emissive={accent}
      emissiveIntensity={0.14}
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
            <sphereGeometry args={[size, 14, 14]} />
            {mat('#f8fafc')}
          </mesh>
          <mesh position={[0, 0, size * 0.38]} castShadow>
            <sphereGeometry args={[size * 0.58, 12, 12]} />
            {mat(iris)}
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

export type PaletteProps = {
  body: string
  accent: string
  secondary: string
  detail: string
}

export function ModelRoot({ children }: { children: ReactNode }) {
  return <group>{children}</group>
}
