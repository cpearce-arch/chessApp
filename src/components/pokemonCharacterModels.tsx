import type { PokemonPieceMeta } from '../pokemon/pieces'

type Palette = Pick<PokemonPieceMeta, 'body' | 'accent' | 'secondary' | 'detail'>

function mat(color: string, opts?: { emissive?: string; intensity?: number; metalness?: number }) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={0.48}
      metalness={opts?.metalness ?? 0.06}
      emissive={opts?.emissive ?? '#000000'}
      emissiveIntensity={opts?.intensity ?? 0}
    />
  )
}

/** Pichu — yellow mouse, oversized ears, pink cheeks, zig tail. */
export function PichuModel({ body, accent, secondary, detail }: Palette) {
  return (
    <group scale={1.15}>
      <mesh position={[0, 0.22, 0]} castShadow>
        <sphereGeometry args={[0.24, 22, 22]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.5, 0.04]} castShadow>
        <sphereGeometry args={[0.26, 22, 22]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[-0.22, 0.72, -0.02]} rotation={[0, 0, 0.65]} castShadow>
        <capsuleGeometry args={[0.055, 0.26, 4, 8]} />
        {mat(body)}
      </mesh>
      <mesh position={[-0.34, 0.98, -0.02]} castShadow>
        <sphereGeometry args={[0.075, 10, 10]} />
        {mat(detail)}
      </mesh>
      <mesh position={[0.22, 0.72, -0.02]} rotation={[0, 0, -0.65]} castShadow>
        <capsuleGeometry args={[0.055, 0.26, 4, 8]} />
        {mat(body)}
      </mesh>
      <mesh position={[0.34, 0.98, -0.02]} castShadow>
        <sphereGeometry args={[0.075, 10, 10]} />
        {mat(detail)}
      </mesh>
      <mesh position={[-0.12, 0.46, 0.22]} castShadow>
        <sphereGeometry args={[0.065, 12, 12]} />
        {mat(accent)}
      </mesh>
      <mesh position={[0.12, 0.46, 0.22]} castShadow>
        <sphereGeometry args={[0.065, 12, 12]} />
        {mat(accent)}
      </mesh>
      <mesh position={[0, 0.54, 0.24]} castShadow>
        <sphereGeometry args={[0.028, 8, 8]} />
        {mat(detail)}
      </mesh>
      <mesh position={[0, 0.08, -0.16]} rotation={[0.9, 0, 0]} castShadow>
        <boxGeometry args={[0.04, 0.16, 0.06]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.02, -0.22]} rotation={[1.2, 0, 0]} castShadow>
        <boxGeometry args={[0.035, 0.12, 0.05]} />
        {mat(detail)}
      </mesh>
    </group>
  )
}

/** Snorlax — wide teal bean, cream belly face, tiny feet. */
export function SnorlaxModel({ body, accent, secondary, detail }: Palette) {
  return (
    <group scale={1.12}>
      <mesh position={[0, 0.38, 0]} scale={[1.15, 1, 1.05]} castShadow>
        <sphereGeometry args={[0.4, 24, 24]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.34, 0.32]} castShadow>
        <sphereGeometry args={[0.34, 20, 20]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[0, 0.58, 0.28]} castShadow>
        <sphereGeometry args={[0.2, 18, 18]} />
        {mat(body)}
      </mesh>
      <mesh position={[-0.09, 0.6, 0.38]} castShadow>
        <sphereGeometry args={[0.035, 8, 8]} />
        {mat(detail)}
      </mesh>
      <mesh position={[0.09, 0.6, 0.38]} castShadow>
        <sphereGeometry args={[0.035, 8, 8]} />
        {mat(detail)}
      </mesh>
      <mesh position={[0, 0.52, 0.4]} castShadow>
        <boxGeometry args={[0.1, 0.03, 0.02]} />
        {mat(detail)}
      </mesh>
      <mesh position={[-0.42, 0.32, 0.1]} rotation={[0, 0, 0.55]} castShadow>
        <capsuleGeometry args={[0.11, 0.16, 6, 10]} />
        {mat(accent)}
      </mesh>
      <mesh position={[0.42, 0.32, 0.1]} rotation={[0, 0, -0.55]} castShadow>
        <capsuleGeometry args={[0.11, 0.16, 6, 10]} />
        {mat(accent)}
      </mesh>
      <mesh position={[-0.18, 0.06, 0.12]} castShadow>
        <sphereGeometry args={[0.08, 10, 10]} />
        {mat(accent)}
      </mesh>
      <mesh position={[0.18, 0.06, 0.12]} castShadow>
        <sphereGeometry args={[0.08, 10, 10]} />
        {mat(accent)}
      </mesh>
    </group>
  )
}

/** Rapidash — cream pony, red/orange mane & tail flame, horn. */
export function RapidashModel({ body, accent, secondary, detail }: Palette) {
  return (
    <group rotation={[0, -Math.PI / 2, 0]} scale={1.08}>
      <mesh position={[0, 0.34, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <capsuleGeometry args={[0.15, 0.42, 8, 16]} />
        {mat(body)}
      </mesh>
      <mesh position={[0.32, 0.4, 0]} rotation={[Math.PI / 2, 0, -0.45]} castShadow>
        <capsuleGeometry args={[0.09, 0.26, 6, 12]} />
        {mat(body)}
      </mesh>
      <mesh position={[0.48, 0.56, 0]} castShadow>
        <sphereGeometry args={[0.12, 14, 14]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[0.56, 0.68, 0]} castShadow>
        <coneGeometry args={[0.035, 0.18, 4]} />
        {mat(detail)}
      </mesh>
      {[-0.14, 0, 0.14].map((z, i) => (
        <mesh key={`b${i}`} position={[-0.2, 0.06, z]} castShadow>
          <cylinderGeometry args={[0.032, 0.038, 0.24, 6]} />
          {mat(body)}
        </mesh>
      ))}
      {[-0.14, 0, 0.14].map((z, i) => (
        <mesh key={`f${i}`} position={[0.22, 0.06, z]} castShadow>
          <cylinderGeometry args={[0.028, 0.034, 0.22, 6]} />
          {mat(body)}
        </mesh>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={`mane${i}`}
          position={[0.4 + i * 0.08, 0.62 + i * 0.05, (i - 1.5) * 0.06]}
          rotation={[0.15 + i * 0.05, 0, 0.25]}
          castShadow
        >
          <coneGeometry args={[0.07 - i * 0.008, 0.22, 5]} />
          {mat(accent, { emissive: accent, intensity: 0.35 })}
        </mesh>
      ))}
      <mesh position={[-0.36, 0.42, 0]} rotation={[0, 0, 0.75]} castShadow>
        <coneGeometry args={[0.09, 0.32, 5]} />
        {mat(accent, { emissive: accent, intensity: 0.5 })}
      </mesh>
      <mesh position={[-0.48, 0.52, 0]} castShadow>
        <sphereGeometry args={[0.07, 10, 10]} />
        {mat('#ffeb3b', { emissive: '#ff9800', intensity: 0.75 })}
      </mesh>
      <mesh position={[-0.54, 0.58, 0]} castShadow>
        <sphereGeometry args={[0.045, 8, 8]} />
        {mat('#fff59d', { emissive: '#ff5722', intensity: 0.9 })}
      </mesh>
    </group>
  )
}

/** Alakazam — yellow fox torso, purple legs, huge mustache, spoons. */
export function AlakazamModel({ body, accent, secondary, detail }: Palette) {
  return (
    <group scale={1.1}>
      <mesh position={[0, 0.24, 0]} castShadow>
        <cylinderGeometry args={[0.17, 0.22, 0.32, 12]} />
        {mat(accent)}
      </mesh>
      <mesh position={[0, 0.5, 0.02]} castShadow>
        <capsuleGeometry args={[0.15, 0.22, 8, 14]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.72, 0.1]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[-0.34, 0.68, 0.12]} rotation={[0, 0.15, Math.PI / 2.1]} castShadow>
        <capsuleGeometry args={[0.04, 0.42, 4, 8]} />
        {mat(body)}
      </mesh>
      <mesh position={[0.34, 0.68, 0.12]} rotation={[0, -0.15, Math.PI / 2.1]} castShadow>
        <capsuleGeometry args={[0.04, 0.42, 4, 8]} />
        {mat(body)}
      </mesh>
      <mesh position={[-0.07, 0.74, 0.2]} castShadow>
        <sphereGeometry args={[0.028, 8, 8]} />
        {mat('#c62828')}
      </mesh>
      <mesh position={[0.07, 0.74, 0.2]} castShadow>
        <sphereGeometry args={[0.028, 8, 8]} />
        {mat('#c62828')}
      </mesh>
      <mesh position={[-0.24, 0.38, 0.14]} rotation={[0.55, 0, -0.35]} castShadow>
        <capsuleGeometry args={[0.045, 0.32, 4, 8]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[-0.42, 0.26, 0.2]} rotation={[0.9, 0.2, 0]} castShadow>
        <sphereGeometry args={[0.085, 12, 12]} scale={[0.7, 1, 1.4]} />
        {mat(detail, { metalness: 0.45 })}
      </mesh>
      <mesh position={[0.24, 0.38, 0.14]} rotation={[0.55, 0, 0.35]} castShadow>
        <capsuleGeometry args={[0.045, 0.32, 4, 8]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[0.42, 0.26, 0.2]} rotation={[0.9, -0.2, 0]} castShadow>
        <sphereGeometry args={[0.085, 12, 12]} scale={[0.7, 1, 1.4]} />
        {mat(detail, { metalness: 0.45 })}
      </mesh>
    </group>
  )
}

/** Mewtwo — gray alien biped, purple tail & tube neck. */
export function MewtwoModel({ body, accent, secondary, detail }: Palette) {
  return (
    <group scale={1.12}>
      <mesh position={[-0.09, 0.2, -0.1]} castShadow>
        <capsuleGeometry args={[0.11, 0.2, 6, 12]} />
        {mat(body)}
      </mesh>
      <mesh position={[0.09, 0.2, -0.1]} castShadow>
        <capsuleGeometry args={[0.11, 0.2, 6, 12]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.4, 0.02]} scale={[0.85, 1, 0.9]} castShadow>
        <capsuleGeometry args={[0.13, 0.24, 8, 14]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.58, 0.04]} castShadow>
        <cylinderGeometry args={[0.055, 0.065, 0.22, 12]} />
        {mat(accent, { emissive: accent, intensity: 0.18 })}
      </mesh>
      <mesh position={[0, 0.76, 0.08]} scale={[0.9, 1.1, 0.85]} castShadow>
        <sphereGeometry args={[0.14, 16, 16]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[-0.07, 0.86, 0.12]} castShadow>
        <coneGeometry args={[0.035, 0.1, 4]} />
        {mat(body)}
      </mesh>
      <mesh position={[0.07, 0.86, 0.12]} castShadow>
        <coneGeometry args={[0.035, 0.1, 4]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.7, 0.22]} castShadow>
        <boxGeometry args={[0.07, 0.02, 0.02]} />
        {mat(detail)}
      </mesh>
      <mesh position={[0, 0.36, -0.26]} rotation={[0.55, 0, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.42, 6, 12]} />
        {mat(accent, { emissive: accent, intensity: 0.22 })}
      </mesh>
    </group>
  )
}

/** Arceus — golden horse, prominent wheel, long neck & horn. */
export function ArceusModel({ body, accent, secondary, detail }: Palette) {
  return (
    <group scale={1.14}>
      <mesh position={[0, 0.28, 0]} castShadow>
        <capsuleGeometry args={[0.15, 0.32, 8, 16]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.44, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.26, 0.045, 10, 36]} />
        {mat(detail, { metalness: 0.55, emissive: accent, intensity: 0.25 })}
      </mesh>
      <mesh position={[0, 0.56, 0.04]} rotation={[-0.4, 0, 0]} castShadow>
        <capsuleGeometry args={[0.08, 0.34, 6, 14]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[0, 0.78, 0.12]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.9, 0.18]} castShadow>
        <coneGeometry args={[0.045, 0.16, 4]} />
        {mat(accent, { metalness: 0.4, emissive: accent, intensity: 0.15 })}
      </mesh>
      <mesh position={[0, 0.1, -0.16]} rotation={[0.45, 0, 0]} castShadow>
        <capsuleGeometry args={[0.055, 0.26, 4, 10]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[-0.11, 0.06, 0.08]} castShadow>
        <cylinderGeometry args={[0.028, 0.034, 0.2, 6]} />
        {mat(body)}
      </mesh>
      <mesh position={[0.11, 0.06, 0.08]} castShadow>
        <cylinderGeometry args={[0.028, 0.034, 0.2, 6]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.44, 0.12]} rotation={[0.3, 0, 0]} castShadow>
        <boxGeometry args={[0.08, 0.12, 0.04]} />
        {mat(accent, { metalness: 0.35 })}
      </mesh>
    </group>
  )
}
