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

/** Eyes face +Z (toward opponent for White). */
export function Eyes({
  y,
  z,
  spacing = 0.08,
  size = 0.032,
}: {
  y: number
  z: number
  spacing?: number
  size?: number
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
            {mat('#0f172a')}
          </mesh>
        </group>
      ))}
    </>
  )
}

export function ClosedEyes({ y, z, width = 0.07 }: { y: number; z: number; width?: number }) {
  return (
    <>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * width * 0.55, y, z]} rotation={[0, 0, side * 0.15]} castShadow>
          <capsuleGeometry args={[0.012, width, 4, 6]} />
          {mat('#1e293b')}
        </mesh>
      ))}
    </>
  )
}

export function Claws({
  positions,
  color,
}: {
  positions: [number, number, number][]
  color: string
}) {
  return (
    <>
      {positions.map((p, i) => (
        <mesh key={i} position={p} rotation={[0.4, 0, 0]} castShadow>
          <coneGeometry args={[0.018, 0.05, 4]} />
          {mat(color)}
        </mesh>
      ))}
    </>
  )
}

export function StripeRing({ y, color }: { y: number; color: string }) {
  return (
    <mesh position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
      <torusGeometry args={[0.2, 0.018, 6, 24]} />
      {mat(color)}
    </mesh>
  )
}

export type PaletteProps = {
  body: string
  accent: string
  secondary: string
  detail: string
}

export function ModelRoot({ children }: { children: ReactNode }) {
  return <group rotation={[0, 0, 0]}>{children}</group>
}
