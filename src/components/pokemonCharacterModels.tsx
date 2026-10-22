import { ClosedEyes, Eyes, mat, StripeRing, type PaletteProps } from './pokemon/modelParts'

/** All models face +Z (White toward Black). Black pieces rotate 180° in PokemonPiece. */

export function PichuModel({ body, accent, secondary, detail }: PaletteProps) {
  return (
    <group scale={1.12}>
      <mesh position={[0, 0.2, 0]} castShadow>
        <sphereGeometry args={[0.23, 28, 28]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.48, 0.02]} castShadow>
        <sphereGeometry args={[0.27, 28, 28]} />
        {mat(secondary)}
      </mesh>
      <StripeRing y={0.38} color={detail} />
      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh position={[side * 0.22, 0.7, -0.02]} rotation={[0, 0, side * 0.62]} castShadow>
            <capsuleGeometry args={[0.05, 0.28, 6, 12]} />
            {mat(body)}
          </mesh>
          <mesh position={[side * 0.36, 0.98, -0.02]} castShadow>
            <sphereGeometry args={[0.08, 12, 12]} />
            {mat(detail)}
          </mesh>
          <mesh position={[side * 0.22, 0.58, 0.02]} castShadow>
            <sphereGeometry args={[0.04, 10, 10]} />
            {mat(accent)}
          </mesh>
        </group>
      ))}
      <Eyes y={0.52} z={0.22} spacing={0.09} size={0.034} />
      <mesh position={[0, 0.46, 0.24]} castShadow>
        <sphereGeometry args={[0.022, 8, 8]} />
        {mat(detail)}
      </mesh>
      <mesh position={[0, 0.42, 0.23]} castShadow>
        <boxGeometry args={[0.04, 0.008, 0.01]} />
        {mat(detail)}
      </mesh>
      {[-0.14, 0.14].map((x) => (
        <mesh key={x} position={[x, 0.22, 0.08]} castShadow>
          <capsuleGeometry args={[0.035, 0.1, 4, 8]} />
          {mat(body)}
        </mesh>
      ))}
      {[-0.1, 0.1].map((x) => (
        <mesh key={`f${x}`} position={[x, 0.06, 0.1]} castShadow>
          <sphereGeometry args={[0.045, 10, 10]} />
          {mat(body)}
        </mesh>
      ))}
      <mesh position={[0, 0.1, -0.14]} rotation={[0.85, 0, 0]} castShadow>
        <boxGeometry args={[0.035, 0.14, 0.05]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.04, -0.2]} rotation={[1.1, 0, 0.3]} castShadow>
        <boxGeometry args={[0.03, 0.1, 0.04]} />
        {mat(detail)}
      </mesh>
      <mesh position={[0, 0.02, -0.24]} rotation={[1.3, 0, -0.25]} castShadow>
        <boxGeometry args={[0.028, 0.08, 0.035]} />
        {mat(body)}
      </mesh>
    </group>
  )
}

export function SnorlaxModel({ body, accent, secondary, detail }: PaletteProps) {
  return (
    <group scale={1.08}>
      <mesh position={[0, 0.36, 0]} scale={[1.2, 1, 1.08]} castShadow>
        <sphereGeometry args={[0.41, 32, 32]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.32, 0.34]} castShadow>
        <sphereGeometry args={[0.35, 28, 28]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[0, 0.56, 0.3]} castShadow>
        <sphereGeometry args={[0.21, 24, 24]} />
        {mat(body)}
      </mesh>
      <ClosedEyes y={0.58} z={0.42} width={0.08} />
      <mesh position={[0, 0.5, 0.44]} castShadow>
        <boxGeometry args={[0.12, 0.025, 0.02]} />
        {mat(detail)}
      </mesh>
      <mesh position={[0, 0.47, 0.43]} castShadow>
        <boxGeometry args={[0.06, 0.02, 0.015]} />
        {mat('#94a3b8')}
      </mesh>
      {[-0.44, 0.44].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.34, 0.12]} rotation={[0, 0, x > 0 ? -0.5 : 0.5]} castShadow>
            <capsuleGeometry args={[0.12, 0.2, 8, 14]} />
            {mat(accent)}
          </mesh>
          <mesh position={[x * 1.08, 0.22, 0.18]} castShadow>
            <sphereGeometry args={[0.07, 10, 10]} />
            {mat(accent)}
          </mesh>
        </group>
      ))}
      {[-0.2, 0.2].map((x) => (
        <group key={`leg${x}`}>
          <mesh position={[x, 0.08, 0.14]} castShadow>
            <cylinderGeometry args={[0.09, 0.1, 0.12, 12]} />
            {mat(accent)}
          </mesh>
          <mesh position={[x, 0.02, 0.16]} castShadow>
            <sphereGeometry args={[0.085, 12, 12]} />
            {mat(detail)}
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.62, 0.08]} castShadow>
        <sphereGeometry args={[0.05, 10, 10]} />
        {mat(accent)}
      </mesh>
    </group>
  )
}

export function RapidashModel({ body, accent, secondary, detail }: PaletteProps) {
  const leg = (x: number, z: number) => (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.14, 0]} castShadow>
        <cylinderGeometry args={[0.034, 0.04, 0.28, 8]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.02, 0.02]} castShadow>
        <boxGeometry args={[0.05, 0.03, 0.06]} />
        {mat(detail)}
      </mesh>
    </group>
  )

  return (
    <group>
      <mesh position={[0, 0.36, 0.05]} rotation={[0.15, 0, 0]} castShadow>
        <capsuleGeometry args={[0.16, 0.48, 10, 20]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.48, 0.32]} rotation={[-0.55, 0, 0]} castShadow>
        <capsuleGeometry args={[0.1, 0.28, 8, 16]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.58, 0.48]} castShadow>
        <sphereGeometry args={[0.13, 18, 18]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[0, 0.58, 0.58]} castShadow>
        <boxGeometry args={[0.08, 0.06, 0.12]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.68, 0.62]} castShadow>
        <coneGeometry args={[0.035, 0.2, 4]} />
        {mat(detail)}
      </mesh>
      <Eyes y={0.6} z={0.56} spacing={0.05} size={0.022} />
      {leg(-0.12, 0.18)}
      {leg(0.12, 0.18)}
      {leg(-0.12, -0.12)}
      {leg(0.12, -0.12)}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[0.02, 0.62 + i * 0.04, 0.38 + i * 0.03]}
          rotation={[-0.2 - i * 0.04, 0, (i - 2) * 0.08]}
          castShadow
        >
          <coneGeometry args={[0.06 - i * 0.006, 0.2, 5]} />
          {mat(accent, { emissive: accent, intensity: 0.4 })}
        </mesh>
      ))}
      <mesh position={[0, 0.38, -0.28]} rotation={[-0.9, 0, 0]} castShadow>
        <coneGeometry args={[0.1, 0.36, 5]} />
        {mat(accent, { emissive: accent, intensity: 0.55 })}
      </mesh>
      <mesh position={[0, 0.48, -0.38]} castShadow>
        <sphereGeometry args={[0.08, 12, 12]} />
        {mat('#ffeb3b', { emissive: '#ff9800', intensity: 0.8 })}
      </mesh>
      <mesh position={[0, 0.54, -0.44]} castShadow>
        <sphereGeometry args={[0.05, 10, 10]} />
        {mat('#fff9c4', { emissive: '#ff5722', intensity: 1 })}
      </mesh>
    </group>
  )
}

export function AlakazamModel({ body, accent, secondary, detail }: PaletteProps) {
  return (
    <group scale={1.08}>
      <mesh position={[-0.1, 0.18, 0.04]} castShadow>
        <capsuleGeometry args={[0.08, 0.16, 6, 12]} />
        {mat(accent)}
      </mesh>
      <mesh position={[0.1, 0.18, 0.04]} castShadow>
        <capsuleGeometry args={[0.08, 0.16, 6, 12]} />
        {mat(accent)}
      </mesh>
      <mesh position={[0, 0.34, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.22, 14]} />
        {mat(accent)}
      </mesh>
      <mesh position={[0, 0.5, 0.02]} castShadow>
        <capsuleGeometry args={[0.16, 0.24, 10, 18]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.58, 0.08]} castShadow>
        <boxGeometry args={[0.14, 0.06, 0.08]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[0, 0.72, 0.12]} castShadow>
        <sphereGeometry args={[0.16, 20, 20]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[0, 0.72, 0.22]} castShadow>
        <coneGeometry args={[0.08, 0.1, 4]} />
        {mat(body)}
      </mesh>
      <Eyes y={0.74} z={0.2} spacing={0.06} size={0.028} />
      <mesh position={[0, 0.82, 0.18]} castShadow>
        <octahedronGeometry args={[0.04, 0]} />
        {mat('#ef4444', { emissive: '#b91c1c', intensity: 0.3 })}
      </mesh>
      <mesh position={[-0.38, 0.7, 0.14]} rotation={[0, 0.1, Math.PI / 2.05]} castShadow>
        <capsuleGeometry args={[0.045, 0.48, 6, 12]} />
        {mat(body)}
      </mesh>
      <mesh position={[0.38, 0.7, 0.14]} rotation={[0, -0.1, Math.PI / 2.05]} castShadow>
        <capsuleGeometry args={[0.045, 0.48, 6, 12]} />
        {mat(body)}
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh
            position={[side * 0.26, 0.42, 0.1]}
            rotation={[0.5, side * 0.2, side * 0.35]}
            castShadow
          >
            <capsuleGeometry args={[0.05, 0.28, 6, 10]} />
            {mat(secondary)}
          </mesh>
          <mesh
            position={[side * 0.42, 0.28, 0.16]}
            rotation={[0.85, side * 0.15, 0]}
            castShadow
          >
            <sphereGeometry args={[0.09, 14, 14]} scale={[0.65, 1, 1.5]} />
            {mat(detail, { metalness: 0.5, roughness: 0.25 })}
          </mesh>
          <mesh position={[side * 0.48, 0.22, 0.22]} castShadow>
            <sphereGeometry args={[0.045, 10, 10]} />
            {mat(detail, { metalness: 0.55 })}
          </mesh>
        </group>
      ))}
    </group>
  )
}

export function MewtwoModel({ body, accent, secondary, detail }: PaletteProps) {
  return (
    <group scale={1.1}>
      {[-0.11, 0.11].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.22, 0.02]} castShadow>
            <capsuleGeometry args={[0.12, 0.22, 8, 14]} />
            {mat(body)}
          </mesh>
          <mesh position={[x, 0.08, 0.06]} castShadow>
            <sphereGeometry args={[0.09, 12, 12]} />
            {mat(body)}
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.4, 0.02]} scale={[0.82, 1, 0.88]} castShadow>
        <capsuleGeometry args={[0.14, 0.26, 10, 18]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.54, 0.04]} castShadow>
        <cylinderGeometry args={[0.05, 0.055, 0.08, 12]} />
        {mat(accent, { emissive: accent, intensity: 0.15 })}
      </mesh>
      <mesh position={[0, 0.62, 0.05]} castShadow>
        <cylinderGeometry args={[0.048, 0.052, 0.1, 12]} />
        {mat(accent, { emissive: accent, intensity: 0.18 })}
      </mesh>
      <mesh position={[0, 0.72, 0.06]} castShadow>
        <cylinderGeometry args={[0.046, 0.05, 0.1, 12]} />
        {mat(accent, { emissive: accent, intensity: 0.2 })}
      </mesh>
      <mesh position={[0, 0.82, 0.1]} scale={[0.88, 1.15, 0.82]} castShadow>
        <sphereGeometry args={[0.15, 22, 22]} />
        {mat(secondary)}
      </mesh>
      {[-0.08, 0.08].map((x) => (
        <mesh key={x} position={[x, 0.92, 0.14]} castShadow>
          <coneGeometry args={[0.04, 0.12, 4]} />
          {mat(body)}
        </mesh>
      ))}
      <Eyes y={0.84} z={0.18} spacing={0.055} size={0.026} />
      <mesh position={[0, 0.78, 0.2]} castShadow>
        <boxGeometry args={[0.08, 0.018, 0.015]} />
        {mat(detail)}
      </mesh>
      <mesh position={[0, 0.36, -0.28]} rotation={[0.5, 0, 0]} castShadow>
        <capsuleGeometry args={[0.1, 0.48, 8, 16]} />
        {mat(accent, { emissive: accent, intensity: 0.25 })}
      </mesh>
      <mesh position={[0, 0.22, -0.42]} castShadow>
        <sphereGeometry args={[0.08, 12, 12]} />
        {mat(accent, { emissive: accent, intensity: 0.2 })}
      </mesh>
      {[-0.18, 0.18].map((x) => (
        <mesh key={x} position={[x, 0.44, 0.06]} castShadow>
          <capsuleGeometry args={[0.025, 0.08, 4, 6]} />
          {mat(body)}
        </mesh>
      ))}
    </group>
  )
}

export function ArceusModel({ body, accent, secondary, detail }: PaletteProps) {
  const spoke = (rot: number) => (
    <mesh rotation={[Math.PI / 2, rot, 0]} castShadow>
      <boxGeometry args={[0.04, 0.42, 0.025]} />
      {mat(detail, { metalness: 0.5, emissive: accent, intensity: 0.15 })}
    </mesh>
  )

  return (
    <group scale={1.1}>
      <mesh position={[0, 0.28, 0.02]} castShadow>
        <capsuleGeometry args={[0.16, 0.34, 10, 20]} />
        {mat(body)}
      </mesh>
      <group position={[0, 0.44, 0]}>
        {spoke(0)}
        {spoke(Math.PI / 2)}
        {spoke(Math.PI / 4)}
        {spoke(-Math.PI / 4)}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.28, 0.048, 12, 40]} />
          {mat(detail, { metalness: 0.6, emissive: accent, intensity: 0.28 })}
        </mesh>
      </group>
      <mesh position={[0, 0.58, 0.06]} rotation={[-0.42, 0, 0]} castShadow>
        <capsuleGeometry args={[0.085, 0.38, 8, 16]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[0, 0.8, 0.14]} castShadow>
        <sphereGeometry args={[0.13, 20, 20]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.8, 0.24]} castShadow>
        <boxGeometry args={[0.1, 0.08, 0.14]} />
        {mat(secondary)}
      </mesh>
      <Eyes y={0.82} z={0.28} spacing={0.045} size={0.022} />
      <mesh position={[0, 0.94, 0.26]} castShadow>
        <coneGeometry args={[0.05, 0.18, 4]} />
        {mat(accent, { metalness: 0.45, emissive: accent, intensity: 0.2 })}
      </mesh>
      <mesh position={[0, 0.44, 0.1]} castShadow>
        <boxGeometry args={[0.1, 0.14, 0.05]} />
        {mat(accent, { metalness: 0.35 })}
      </mesh>
      {[-0.12, 0.12].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.1, 0.1]} castShadow>
            <cylinderGeometry args={[0.028, 0.034, 0.22, 8]} />
            {mat(body)}
          </mesh>
          <mesh position={[x, 0.02, 0.12]} castShadow>
            <cylinderGeometry args={[0.032, 0.026, 0.04, 8]} />
            {mat(detail, { metalness: 0.4 })}
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.12, -0.2]} rotation={[0.35, 0, 0]} castShadow>
        <capsuleGeometry args={[0.055, 0.3, 6, 12]} />
        {mat(secondary)}
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 0.08 - i * 0.02, -0.32 - i * 0.06]} castShadow>
          <sphereGeometry args={[0.045 - i * 0.008, 10, 10]} />
          {mat(secondary)}
        </mesh>
      ))}
    </group>
  )
}
