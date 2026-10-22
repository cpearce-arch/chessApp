import type { PokemonPieceMeta } from '../pokemon/pieces'

type Palette = Pick<PokemonPieceMeta, 'body' | 'accent' | 'secondary' | 'detail'>

function mat(color: string, opts?: { emissive?: string; intensity?: number; metalness?: number }) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={0.55}
      metalness={opts?.metalness ?? 0.08}
      emissive={opts?.emissive ?? '#000000'}
      emissiveIntensity={opts?.intensity ?? 0}
    />
  )
}

/** Pichu — round mouse-like body, big ears with black tips, pink cheeks. */
export function PichuModel({ body, accent, secondary, detail }: Palette) {
  return (
    <group scale={0.95}>
      <mesh position={[0, 0.28, 0.02]} castShadow>
        <sphereGeometry args={[0.26, 20, 20]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.48, 0.06]} castShadow>
        <sphereGeometry args={[0.22, 20, 20]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[-0.2, 0.62, 0]} rotation={[0, 0, 0.55]} castShadow>
        <capsuleGeometry args={[0.05, 0.18, 4, 8]} />
        {mat(body)}
      </mesh>
      <mesh position={[-0.28, 0.78, 0]} castShadow>
        <sphereGeometry args={[0.06, 8, 8]} />
        {mat(detail)}
      </mesh>
      <mesh position={[0.2, 0.62, 0]} rotation={[0, 0, -0.55]} castShadow>
        <capsuleGeometry args={[0.05, 0.18, 4, 8]} />
        {mat(body)}
      </mesh>
      <mesh position={[0.28, 0.78, 0]} castShadow>
        <sphereGeometry args={[0.06, 8, 8]} />
        {mat(detail)}
      </mesh>
      <mesh position={[-0.1, 0.44, 0.18]} castShadow>
        <sphereGeometry args={[0.05, 10, 10]} />
        {mat(accent)}
      </mesh>
      <mesh position={[0.1, 0.44, 0.18]} castShadow>
        <sphereGeometry args={[0.05, 10, 10]} />
        {mat(accent)}
      </mesh>
      <mesh position={[0, 0.52, 0.2]} castShadow>
        <sphereGeometry args={[0.025, 8, 8]} />
        {mat(detail)}
      </mesh>
      <mesh position={[0, 0.14, -0.12]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.06, 0.14, 3]} />
        {mat(body)}
      </mesh>
    </group>
  )
}

/** Snorlax — huge teal blob, cream belly, sleepy face. */
export function SnorlaxModel({ body, accent, secondary, detail }: Palette) {
  return (
    <group scale={1.05}>
      <mesh position={[0, 0.42, 0]} castShadow>
        <sphereGeometry args={[0.42, 24, 24]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.32, 0.28]} castShadow>
        <sphereGeometry args={[0.32, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[0, 0.62, 0.22]} castShadow>
        <sphereGeometry args={[0.18, 16, 16]} />
        {mat(body)}
      </mesh>
      <mesh position={[-0.08, 0.64, 0.32]} castShadow>
        <boxGeometry args={[0.08, 0.02, 0.02]} />
        {mat(detail)}
      </mesh>
      <mesh position={[0.08, 0.64, 0.32]} castShadow>
        <boxGeometry args={[0.08, 0.02, 0.02]} />
        {mat(detail)}
      </mesh>
      <mesh position={[-0.38, 0.38, 0.08]} rotation={[0, 0, 0.4]} castShadow>
        <capsuleGeometry args={[0.1, 0.22, 6, 10]} />
        {mat(accent)}
      </mesh>
      <mesh position={[0.38, 0.38, 0.08]} rotation={[0, 0, -0.4]} castShadow>
        <capsuleGeometry args={[0.1, 0.22, 6, 10]} />
        {mat(accent)}
      </mesh>
      <mesh position={[0, 0.08, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.38, 0.12, 16]} />
        {mat(accent)}
      </mesh>
    </group>
  )
}

/** Rapidash — pony silhouette, horn, flowing mane, flame tail. */
export function RapidashModel({ body, accent, secondary, detail }: Palette) {
  return (
    <group rotation={[0, -Math.PI / 2, 0]}>
      <mesh position={[0, 0.32, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <capsuleGeometry args={[0.14, 0.38, 8, 16]} />
        {mat(body)}
      </mesh>
      <mesh position={[0.28, 0.38, 0]} rotation={[Math.PI / 2, 0, -0.35]} castShadow>
        <capsuleGeometry args={[0.08, 0.22, 6, 10]} />
        {mat(body)}
      </mesh>
      <mesh position={[0.42, 0.52, 0]} castShadow>
        <sphereGeometry args={[0.11, 12, 12]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[0.48, 0.62, 0]} castShadow>
        <coneGeometry args={[0.03, 0.14, 4]} />
        {mat(detail)}
      </mesh>
      {[-0.12, 0, 0.12].map((z, i) => (
        <mesh key={i} position={[-0.18, 0.08, z]} castShadow>
          <cylinderGeometry args={[0.03, 0.035, 0.22, 6]} />
          {mat(body)}
        </mesh>
      ))}
      {[-0.12, 0, 0.12].map((z, i) => (
        <mesh key={`f${i}`} position={[0.2, 0.08, z]} castShadow>
          <cylinderGeometry args={[0.028, 0.032, 0.2, 6]} />
          {mat(body)}
        </mesh>
      ))}
      {[0, 0.12, 0.24].map((x, i) => (
        <mesh key={`m${i}`} position={[0.38 + x * 0.15, 0.58 + i * 0.04, 0]} rotation={[0.2, 0, 0.3]} castShadow>
          <coneGeometry args={[0.06 - i * 0.01, 0.2, 5]} />
          {mat(accent, { emissive: accent, intensity: 0.25 })}
        </mesh>
      ))}
      <mesh position={[-0.32, 0.4, 0]} rotation={[0, 0, 0.8]} castShadow>
        <coneGeometry args={[0.08, 0.28, 5]} />
        {mat(accent, { emissive: accent, intensity: 0.45 })}
      </mesh>
      <mesh position={[-0.42, 0.48, 0]} castShadow>
        <sphereGeometry args={[0.06, 8, 8]} />
        {mat('#ffeb3b', { emissive: '#ff9800', intensity: 0.6 })}
      </mesh>
    </group>
  )
}

/** Alakazam — fox-like head, long mustache, spoon hands, purple lower body. */
export function AlakazamModel({ body, accent, secondary, detail }: Palette) {
  return (
    <group>
      <mesh position={[0, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.2, 0.35, 12]} />
        {mat(accent)}
      </mesh>
      <mesh position={[0, 0.52, 0.02]} castShadow>
        <capsuleGeometry args={[0.14, 0.2, 8, 12]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.68, 0.08]} castShadow>
        <sphereGeometry args={[0.14, 16, 16]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[-0.28, 0.66, 0.1]} rotation={[0, 0.2, Math.PI / 2]} castShadow>
        <capsuleGeometry args={[0.035, 0.32, 4, 8]} />
        {mat(body)}
      </mesh>
      <mesh position={[0.28, 0.66, 0.1]} rotation={[0, -0.2, Math.PI / 2]} castShadow>
        <capsuleGeometry args={[0.035, 0.32, 4, 8]} />
        {mat(body)}
      </mesh>
      <mesh position={[-0.06, 0.7, 0.18]} castShadow>
        <sphereGeometry args={[0.025, 8, 8]} />
        {mat('#e53935')}
      </mesh>
      <mesh position={[0.06, 0.7, 0.18]} castShadow>
        <sphereGeometry args={[0.025, 8, 8]} />
        {mat('#e53935')}
      </mesh>
      <mesh position={[-0.22, 0.42, 0.12]} rotation={[0.5, 0, -0.4]} castShadow>
        <capsuleGeometry args={[0.04, 0.28, 4, 8]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[-0.38, 0.32, 0.18]} rotation={[0.8, 0, 0]} castShadow>
        <sphereGeometry args={[0.07, 10, 10]} />
        {mat(detail, { metalness: 0.35 })}
      </mesh>
      <mesh position={[0.22, 0.42, 0.12]} rotation={[0.5, 0, 0.4]} castShadow>
        <capsuleGeometry args={[0.04, 0.28, 4, 8]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[0.38, 0.32, 0.18]} rotation={[0.8, 0, 0]} castShadow>
        <sphereGeometry args={[0.07, 10, 10]} />
        {mat(detail, { metalness: 0.35 })}
      </mesh>
    </group>
  )
}

/** Mewtwo — bipedal, tube neck, thick purple tail, horned head. */
export function MewtwoModel({ body, accent, secondary, detail }: Palette) {
  return (
    <group>
      <mesh position={[-0.08, 0.22, -0.12]} castShadow>
        <capsuleGeometry args={[0.1, 0.18, 6, 10]} />
        {mat(body)}
      </mesh>
      <mesh position={[0.08, 0.22, -0.12]} castShadow>
        <capsuleGeometry args={[0.1, 0.18, 6, 10]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.42, 0.02]} castShadow>
        <capsuleGeometry args={[0.12, 0.22, 8, 12]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.58, 0.04]} castShadow>
        <cylinderGeometry args={[0.06, 0.07, 0.18, 10]} />
        {mat(accent, { emissive: accent, intensity: 0.12 })}
      </mesh>
      <mesh position={[0, 0.72, 0.06]} castShadow>
        <sphereGeometry args={[0.13, 16, 16]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[-0.06, 0.8, 0.1]} castShadow>
        <coneGeometry args={[0.03, 0.08, 4]} />
        {mat(body)}
      </mesh>
      <mesh position={[0.06, 0.8, 0.1]} castShadow>
        <coneGeometry args={[0.03, 0.08, 4]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.68, 0.2]} castShadow>
        <boxGeometry args={[0.06, 0.025, 0.02]} />
        {mat(detail)}
      </mesh>
      <mesh position={[0, 0.38, -0.22]} rotation={[0.6, 0, 0]} castShadow>
        <capsuleGeometry args={[0.08, 0.35, 6, 10]} />
        {mat(accent, { emissive: accent, intensity: 0.15 })}
      </mesh>
    </group>
  )
}

/** Arceus — golden equine, wheel ring on torso, long neck. */
export function ArceusModel({ body, accent, secondary, detail }: Palette) {
  return (
    <group>
      <mesh position={[0, 0.26, 0]} castShadow>
        <capsuleGeometry args={[0.14, 0.28, 8, 14]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.42, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.22, 0.035, 8, 32]} />
        {mat(detail, { metalness: 0.45, emissive: accent, intensity: 0.2 })}
      </mesh>
      <mesh position={[0, 0.52, 0.02]} rotation={[-0.35, 0, 0]} castShadow>
        <capsuleGeometry args={[0.07, 0.28, 6, 12]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[0, 0.72, 0.1]} castShadow>
        <sphereGeometry args={[0.11, 14, 14]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.82, 0.16]} castShadow>
        <coneGeometry args={[0.04, 0.12, 4]} />
        {mat(accent, { metalness: 0.3 })}
      </mesh>
      <mesh position={[0, 0.12, -0.14]} rotation={[0.5, 0, 0]} castShadow>
        <capsuleGeometry args={[0.05, 0.22, 4, 8]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[-0.1, 0.08, 0.06]} castShadow>
        <cylinderGeometry args={[0.025, 0.03, 0.18, 6]} />
        {mat(body)}
      </mesh>
      <mesh position={[0.1, 0.08, 0.06]} castShadow>
        <cylinderGeometry args={[0.025, 0.03, 0.18, 6]} />
        {mat(body)}
      </mesh>
    </group>
  )
}
