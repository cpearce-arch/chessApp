import type { ReactNode } from 'react'

export function mat(
  color: string,
  opts?: { emissive?: string; intensity?: number; metalness?: number; roughness?: number },
) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={opts?.roughness ?? 0.48}
      metalness={opts?.metalness ?? 0.06}
      emissive={opts?.emissive ?? '#000000'}
      emissiveIntensity={opts?.intensity ?? 0}
    />
  )
}

export function Eyes({
  y,
  z,
  spacing = 0.08,
  size = 0.032,
  iris = '#0f172a',
}: {
  y: number
  z: number
  spacing?: number
  size?: number
  iris?: string
}) {
  return (
    <>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * spacing, y, z]}>
          <mesh castShadow>
            <sphereGeometry args={[size, 10, 10]} />
            {mat('#f8fafc')}
          </mesh>
          <mesh position={[0, 0, size * 0.35]} castShadow>
            <sphereGeometry args={[size * 0.55, 8, 8]} />
            {mat(iris)}
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
