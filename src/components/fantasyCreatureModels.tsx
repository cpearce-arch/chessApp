import { Eyes, mat, type PaletteProps } from './fantasy/modelParts'

/** Models face +Z; Black rotates 180° in FantasyPiece. */

export function GoblinModel({ body, accent, secondary, detail }: PaletteProps) {
  return (
    <group scale={1.1}>
      <mesh position={[0, 0.24, 0.04]} castShadow>
        <sphereGeometry args={[0.22, 22, 22]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.46, 0.08]} castShadow>
        <sphereGeometry args={[0.2, 20, 20]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[0, 0.48, 0.22]} rotation={[0.2, 0, 0]} castShadow>
        <coneGeometry args={[0.06, 0.14, 5]} />
        {mat(body)}
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.22, 0.58, -0.02]} rotation={[0, 0, s * 0.8]} castShadow>
          <coneGeometry args={[0.06, 0.22, 4]} />
          {mat(body)}
        </mesh>
      ))}
      <Eyes y={0.5} z={0.18} spacing={0.07} size={0.028} iris="#ffeb3b" />
      <mesh position={[0.14, 0.28, 0.12]} rotation={[0, -0.4, 0.3]} castShadow>
        <boxGeometry args={[0.04, 0.12, 0.02]} />
        {mat('#90a4ae', { metalness: 0.6 })}
      </mesh>
      <mesh position={[0, 0.16, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.14, 8]} />
        {mat(accent)}
      </mesh>
      {[-0.08, 0.08].map((x) => (
        <mesh key={x} position={[x, 0.06, 0.06]} castShadow>
          <capsuleGeometry args={[0.04, 0.08, 4, 6]} />
          {mat(detail)}
        </mesh>
      ))}
    </group>
  )
}

export function GolemModel({ body, accent, secondary, detail }: PaletteProps) {
  return (
    <group scale={1.08}>
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.5, 0.28, 0.42]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.42, 0]} castShadow>
        <boxGeometry args={[0.42, 0.32, 0.36]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[0, 0.62, 0.02]} castShadow>
        <boxGeometry args={[0.35, 0.22, 0.3]} />
        {mat(accent)}
      </mesh>
      <Eyes y={0.58} z={0.16} spacing={0.09} size={0.04} iris={detail} />
      {[-0.38, 0.38].map((x) => (
        <mesh key={x} position={[x, 0.38, 0]} castShadow>
          <boxGeometry args={[0.14, 0.35, 0.14]} />
          {mat(accent)}
        </mesh>
      ))}
      {[
        [0.12, 0.35, 0.18],
        [-0.1, 0.25, -0.16],
        [0.08, 0.55, -0.12],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <sphereGeometry args={[0.05, 8, 8]} />
          {mat('#558b2f')}
        </mesh>
      ))}
      <mesh position={[0, 0.08, 0]} castShadow>
        <boxGeometry args={[0.55, 0.12, 0.48]} />
        {mat(detail, { emissive: detail, intensity: 0.15 })}
      </mesh>
    </group>
  )
}

export function GhostModel({ body, accent, secondary, detail }: PaletteProps) {
  const sheet = (
    <meshStandardMaterial
      color={body}
      transparent
      opacity={0.82}
      roughness={0.35}
      metalness={0.02}
      emissive={accent}
      emissiveIntensity={0.12}
    />
  )
  return (
    <group>
      <mesh position={[0, 0.38, 0]} castShadow>
        <sphereGeometry args={[0.2, 18, 18]} />
        {sheet}
      </mesh>
      <mesh position={[0, 0.22, 0]} castShadow>
        <coneGeometry args={[0.28, 0.42, 16, 1, true]} />
        {sheet}
      </mesh>
      {[-0.14, 0.14].map((x) => (
        <mesh key={x} position={[x, 0.08, 0.04]} rotation={[0.4, 0, x > 0 ? -0.5 : 0.5]} castShadow>
          <capsuleGeometry args={[0.04, 0.18, 6, 8]} />
          {sheet}
        </mesh>
      ))}
      <Eyes y={0.42} z={0.16} spacing={0.06} size={0.034} iris={detail} />
      <mesh position={[0, 0.02, 0]}>
        <torusGeometry args={[0.18, 0.012, 8, 24]} />
        <meshStandardMaterial
          color={secondary}
          transparent
          opacity={0.55}
          emissive={accent}
          emissiveIntensity={0.35}
        />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshStandardMaterial color={secondary} emissive={detail} emissiveIntensity={0.5} transparent opacity={0.9} />
      </mesh>
    </group>
  )
}

export function WizardModel({ body, accent, secondary, detail }: PaletteProps) {
  return (
    <group scale={1.08}>
      <mesh position={[0, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.24, 0.38, 14]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.52, 0.02]} castShadow>
        <sphereGeometry args={[0.14, 16, 16]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[0, 0.78, 0]} castShadow>
        <coneGeometry args={[0.18, 0.38, 8]} />
        {mat(detail)}
      </mesh>
      <mesh position={[0, 0.62, 0.14]} castShadow>
        <sphereGeometry args={[0.06, 10, 10]} />
        {mat(secondary)}
      </mesh>
      <Eyes y={0.54} z={0.12} spacing={0.045} size={0.018} />
      <mesh position={[0.22, 0.35, 0.08]} castShadow>
        <cylinderGeometry args={[0.025, 0.03, 0.55, 8]} />
        {mat(accent, { metalness: 0.35 })}
      </mesh>
      <mesh position={[0.22, 0.62, 0.08]} castShadow>
        <sphereGeometry args={[0.06, 12, 12]} />
        {mat('#e1f5fe', { emissive: '#29b6f6', intensity: 0.55 })}
      </mesh>
      <mesh position={[-0.12, 0.42, 0.1]} rotation={[0, 0, 0.4]} castShadow>
        <capsuleGeometry args={[0.035, 0.12, 4, 6]} />
        {mat(secondary)}
      </mesh>
    </group>
  )
}

export function DragonModel({ body, accent, secondary, detail }: PaletteProps) {
  return (
    <group scale={1.06}>
      <mesh position={[0, 0.32, 0.04]} castShadow>
        <capsuleGeometry args={[0.16, 0.32, 10, 16]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.52, 0.18]} rotation={[-0.45, 0, 0]} castShadow>
        <capsuleGeometry args={[0.1, 0.28, 8, 14]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.66, 0.32]} castShadow>
        <sphereGeometry args={[0.13, 16, 16]} />
        {mat(secondary)}
      </mesh>
      {[-0.07, 0.07].map((x) => (
        <mesh key={x} position={[x, 0.78, 0.28]} castShadow>
          <coneGeometry args={[0.035, 0.12, 4]} />
          {mat(accent, { emissive: accent, intensity: 0.25 })}
        </mesh>
      ))}
      <Eyes y={0.68} z={0.38} spacing={0.055} size={0.026} iris={detail} />
      <mesh position={[0, 0.38, 0.12]} castShadow>
        <sphereGeometry args={[0.08, 12, 12]} />
        {mat(detail, { emissive: detail, intensity: 0.7 })}
      </mesh>
      {[-0.32, 0.32].map((x) => (
        <mesh key={x} position={[x, 0.55, -0.06]} rotation={[0.2, x > 0 ? -0.5 : 0.5, 0.15]} castShadow>
          <boxGeometry args={[0.03, 0.4, 0.28]} />
          {mat(secondary)}
        </mesh>
      ))}
      <mesh position={[0, 0.28, -0.22]} rotation={[0.45, 0, 0]} castShadow>
        <capsuleGeometry args={[0.07, 0.35, 6, 10]} />
        {mat(accent, { emissive: accent, intensity: 0.2 })}
      </mesh>
    </group>
  )
}

export function PaladinModel({ body, accent, secondary, detail }: PaletteProps) {
  return (
    <group scale={1.08}>
      <mesh position={[0, 0.34, 0]} castShadow>
        <capsuleGeometry args={[0.16, 0.3, 10, 16]} />
        {mat(body, { metalness: 0.55, roughness: 0.35 })}
      </mesh>
      <mesh position={[0, 0.58, 0.02]} castShadow>
        <sphereGeometry args={[0.13, 16, 16]} />
        {mat(secondary, { metalness: 0.45 })}
      </mesh>
      <mesh position={[0, 0.72, 0.06]} castShadow>
        <cylinderGeometry args={[0.1, 0.12, 0.08, 6]} />
        {mat(accent, { metalness: 0.65, emissive: accent, intensity: 0.15 })}
      </mesh>
      <Eyes y={0.6} z={0.12} spacing={0.045} size={0.02} />
      <mesh position={[-0.2, 0.38, 0.08]} castShadow>
        <boxGeometry args={[0.06, 0.28, 0.04]} />
        {mat(detail, { metalness: 0.5 })}
      </mesh>
      <mesh position={[0.2, 0.36, 0.06]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.04, 0.38, 0.06]} />
        {mat('#78909c', { metalness: 0.6 })}
      </mesh>
      <mesh position={[0, 0.42, -0.12]} rotation={[0.15, 0, 0]} castShadow>
        <boxGeometry args={[0.28, 0.32, 0.04]} />
        {mat(body, { metalness: 0.4 })}
      </mesh>
      <mesh position={[0, 0.14, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.26, 0.12, 12]} />
        {mat(detail, { metalness: 0.35 })}
      </mesh>
    </group>
  )
}
