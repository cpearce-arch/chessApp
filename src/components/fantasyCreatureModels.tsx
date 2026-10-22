import { Eyes, ghostSheet, mat, type PaletteProps } from './fantasy/modelParts'

/** Models face +Z; Black rotates 180° in FantasyPiece. */

export function GoblinModel({ body, accent, secondary, detail }: PaletteProps) {
  return (
    <group scale={1.08}>
      {/* torso */}
      <mesh position={[0, 0.26, 0.02]} castShadow>
        <sphereGeometry args={[0.24, 28, 28]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.24, 0.16, 12]} />
        {mat(accent)}
      </mesh>
      {/* loincloth / belt */}
      <mesh position={[0, 0.14, 0.04]} castShadow>
        <cylinderGeometry args={[0.22, 0.2, 0.08, 10]} />
        {mat(detail)}
      </mesh>
      {[-0.1, 0.1].map((x) => (
        <mesh key={x} position={[x, 0.1, 0.1]} rotation={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.08, 0.14, 0.02]} />
          {mat(accent)}
        </mesh>
      ))}
      {/* head */}
      <mesh position={[0, 0.48, 0.06]} castShadow>
        <sphereGeometry args={[0.21, 26, 26]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[0, 0.44, 0.2]} rotation={[0.25, 0, 0]} castShadow>
        <sphereGeometry args={[0.08, 14, 14]} />
        {mat(body)}
      </mesh>
      {/* ears */}
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[s * 0.22, 0.58, -0.02]} rotation={[0, 0, s * 0.85]} castShadow>
            <coneGeometry args={[0.07, 0.26, 6]} />
            {mat(body)}
          </mesh>
          <mesh position={[s * 0.2, 0.52, 0.02]} rotation={[0, 0, s * 0.5]} castShadow>
            <coneGeometry args={[0.04, 0.12, 5]} />
            {mat(secondary)}
          </mesh>
        </group>
      ))}
      <Eyes y={0.5} z={0.2} spacing={0.075} size={0.03} iris="#ffeb3b" angry />
      {/* nose */}
      <mesh position={[0, 0.44, 0.24]} rotation={[0.5, 0, 0]} castShadow>
        <coneGeometry args={[0.035, 0.08, 5]} />
        {mat('#558b2f')}
      </mesh>
      {/* teeth */}
      {[-0.04, 0, 0.04].map((x) => (
        <mesh key={x} position={[x, 0.38, 0.22]} rotation={[0.3, 0, 0]} castShadow>
          <coneGeometry args={[0.015, 0.04, 4]} />
          {mat('#eceff1')}
        </mesh>
      ))}
      {/* crude dagger */}
      <mesh position={[0.16, 0.32, 0.14]} rotation={[0, -0.5, 0.35]} castShadow>
        <boxGeometry args={[0.035, 0.14, 0.012]} />
        {mat('#90a4ae', { metalness: 0.75, roughness: 0.25 })}
      </mesh>
      <mesh position={[0.19, 0.38, 0.16]} rotation={[0, -0.5, 0.35]} castShadow>
        <boxGeometry args={[0.05, 0.06, 0.02]} />
        {mat('#6d4c41')}
      </mesh>
      {/* arms */}
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[s * 0.28, 0.34, 0.06]} rotation={[0.3, 0, s * -0.6]} castShadow>
            <capsuleGeometry args={[0.05, 0.14, 8, 12]} />
            {mat(body)}
          </mesh>
          <mesh position={[s * 0.34, 0.24, 0.12]} rotation={[0.5, 0, s * -0.4]} castShadow>
            <capsuleGeometry args={[0.045, 0.12, 6, 10]} />
            {mat(secondary)}
          </mesh>
          {[0, 1, 2].map((i) => (
            <mesh
              key={i}
              position={[s * (0.36 + i * 0.01), 0.16 + i * 0.02, 0.14 + i * 0.02]}
              rotation={[0.6, 0, s * -0.2]}
              castShadow
            >
              <capsuleGeometry args={[0.012, 0.04, 4, 6]} />
              {mat('#78909c')}
            </mesh>
          ))}
        </group>
      ))}
      {/* legs & feet */}
      {[-0.1, 0.1].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.08, 0.04]} castShadow>
            <capsuleGeometry args={[0.055, 0.1, 8, 12]} />
            {mat(body)}
          </mesh>
          <mesh position={[x, 0.02, 0.08]} castShadow>
            <boxGeometry args={[0.1, 0.04, 0.14]} />
            {mat(detail)}
          </mesh>
          <mesh position={[x, 0.04, 0.14]} castShadow>
            <boxGeometry args={[0.08, 0.03, 0.04]} />
            {mat('#455a64')}
          </mesh>
        </group>
      ))}
      {/* backpack sack */}
      <mesh position={[0, 0.32, -0.14]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        {mat('#795548')}
      </mesh>
    </group>
  )
}

export function GolemModel({ body, accent, secondary, detail }: PaletteProps) {
  const runeGlow = { emissive: detail, intensity: 0.45 }
  return (
    <group scale={1.06}>
      {/* base plinth */}
      <mesh position={[0, 0.06, 0]} castShadow>
        <boxGeometry args={[0.58, 0.1, 0.52]} />
        {mat(detail, { emissive: detail, intensity: 0.12 })}
      </mesh>
      {/* legs */}
      {[-0.16, 0.16].map((x) => (
        <mesh key={x} position={[x, 0.16, 0]} castShadow>
          <boxGeometry args={[0.18, 0.14, 0.22]} />
          {mat(accent)}
        </mesh>
      ))}
      {/* torso blocks */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <boxGeometry args={[0.52, 0.22, 0.44]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.42, 0.02]} castShadow>
        <boxGeometry args={[0.46, 0.24, 0.38]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[0, 0.58, 0.04]} castShadow>
        <boxGeometry args={[0.38, 0.2, 0.32]} />
        {mat(accent)}
      </mesh>
      {/* carved chest runes */}
      {[
        [0, 0.38, 0.22],
        [-0.08, 0.42, 0.2],
        [0.08, 0.42, 0.2],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[0.04, 0.04, 0.02]} />
          {mat(detail, runeGlow)}
        </mesh>
      ))}
      <mesh position={[0, 0.48, 0.21]} castShadow>
        <torusGeometry args={[0.06, 0.012, 8, 16]} />
        {mat(detail, runeGlow)}
      </mesh>
      {/* head */}
      <mesh position={[0, 0.72, 0.06]} castShadow>
        <boxGeometry args={[0.32, 0.22, 0.28]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.78, 0.18]} castShadow>
        <boxGeometry args={[0.28, 0.1, 0.08]} />
        {mat(accent)}
      </mesh>
      <Eyes y={0.72} z={0.2} spacing={0.1} size={0.038} iris={detail} />
      {/* moss / cracks */}
      {[
        [0.14, 0.35, 0.2],
        [-0.12, 0.28, -0.18],
        [0.06, 0.55, -0.14],
        [-0.18, 0.5, 0.1],
        [0.2, 0.62, 0.05],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <sphereGeometry args={[0.045, 10, 10]} />
          {mat('#558b2f')}
        </mesh>
      ))}
      {/* arms */}
      {[-0.42, 0.42].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.44, 0]} castShadow>
            <boxGeometry args={[0.14, 0.32, 0.16]} />
            {mat(accent)}
          </mesh>
          <mesh position={[x > 0 ? x + 0.08 : x - 0.08, 0.32, 0.06]} castShadow>
            <boxGeometry args={[0.12, 0.14, 0.14]} />
            {mat(secondary)}
          </mesh>
          {[0, 1, 2].map((i) => (
            <mesh
              key={i}
              position={[x > 0 ? x + 0.1 : x - 0.1, 0.26 - i * 0.04, 0.1 + i * 0.02]}
              castShadow
            >
              <boxGeometry args={[0.05, 0.04, 0.06]} />
              {mat(body)}
            </mesh>
          ))}
        </group>
      ))}
      {/* shoulder crystals */}
      {[-0.34, 0.34].map((x) => (
        <mesh key={x} position={[x, 0.62, 0]} castShadow>
          <octahedronGeometry args={[0.06, 0]} />
          {mat(detail, { emissive: detail, intensity: 0.65, metalness: 0.2 })}
        </mesh>
      ))}
    </group>
  )
}

export function GhostModel({ body, accent, secondary, detail }: PaletteProps) {
  const sheet = ghostSheet(body, accent)
  return (
    <group>
      {/* head */}
      <mesh position={[0, 0.42, 0]} castShadow>
        <sphereGeometry args={[0.21, 28, 28]} />
        {sheet}
      </mesh>
      <mesh position={[0, 0.52, 0]} castShadow>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color={secondary} emissive={accent} emissiveIntensity={0.4} transparent opacity={0.85} />
      </mesh>
      <Eyes y={0.44} z={0.17} spacing={0.065} size={0.036} iris={detail} />
      {/* open mouth */}
      <mesh position={[0, 0.34, 0.18]} castShadow>
        <torusGeometry args={[0.05, 0.012, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#1a237e" emissive={accent} emissiveIntensity={0.5} />
      </mesh>
      {/* flowing sheet body — layered cones */}
      <mesh position={[0, 0.24, 0]} castShadow>
        <coneGeometry args={[0.3, 0.48, 24, 1, true]} />
        {sheet}
      </mesh>
      <mesh position={[0, 0.2, 0.02]} castShadow>
        <coneGeometry args={[0.26, 0.4, 20, 1, true]} />
        <meshStandardMaterial color={secondary} transparent opacity={0.55} emissive={accent} emissiveIntensity={0.08} />
      </mesh>
      {/* wispy tail tendrils */}
      {[
        [0, 0.06, -0.08, 0],
        [-0.12, 0.04, 0.02, 0.4],
        [0.12, 0.04, 0.02, -0.4],
        [-0.08, 0.02, -0.12, 0.2],
        [0.08, 0.02, -0.1, -0.2],
      ].map(([x, y, z, rot], i) => (
        <mesh key={i} position={[x as number, y as number, z as number]} rotation={[0.5, 0, rot as number]} castShadow>
          <capsuleGeometry args={[0.035, 0.22, 8, 12]} />
          {sheet}
        </mesh>
      ))}
      {/* arms */}
      {[-0.18, 0.18].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.28, 0.06]} rotation={[0.3, 0, x > 0 ? -0.6 : 0.6]} castShadow>
            <capsuleGeometry args={[0.04, 0.2, 8, 12]} />
            {sheet}
          </mesh>
          {[0, 1, 2].map((i) => (
            <mesh
              key={i}
              position={[x + (x > 0 ? 0.04 : -0.04), 0.14 - i * 0.03, 0.1 + i * 0.02]}
              rotation={[0.5, 0, x > 0 ? -0.3 : 0.3]}
              castShadow
            >
              <capsuleGeometry args={[0.018, 0.06, 4, 8]} />
              {sheet}
            </mesh>
          ))}
        </group>
      ))}
      {/* ectoplasm ring */}
      <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.014, 10, 32]} />
        <meshStandardMaterial color={secondary} transparent opacity={0.5} emissive={accent} emissiveIntensity={0.45} />
      </mesh>
      {/* chains (knight ghost trope) */}
      {[-0.06, 0.06].map((x, i) => (
        <mesh key={i} position={[x, 0.56, -0.04]} rotation={[0.3, 0, 0]}>
          <torusGeometry args={[0.035, 0.008, 6, 12]} />
          {mat('#78909c', { metalness: 0.7, roughness: 0.3 })}
        </mesh>
      ))}
    </group>
  )
}

export function WizardModel({ body, accent, secondary, detail }: PaletteProps) {
  return (
    <group scale={1.06}>
      {/* robes — layered */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.32, 0.36, 18]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.38, 0.02]} castShadow>
        <cylinderGeometry args={[0.22, 0.26, 0.2, 16]} />
        {mat(detail)}
      </mesh>
      {/* trim */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.sin(a) * 0.27, 0.12, Math.cos(a) * 0.27]} castShadow>
            <sphereGeometry args={[0.025, 8, 8]} />
            {mat(accent, { emissive: accent, intensity: 0.2 })}
          </mesh>
        )
      })}
      {/* head & beard */}
      <mesh position={[0, 0.54, 0.04]} castShadow>
        <sphereGeometry args={[0.14, 22, 22]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[0, 0.46, 0.12]} castShadow>
        <sphereGeometry args={[0.09, 16, 16]} />
        {mat('#cfd8dc')}
      </mesh>
      <mesh position={[0, 0.38, 0.14]} rotation={[0.2, 0, 0]} castShadow>
        <coneGeometry args={[0.1, 0.22, 12]} />
        {mat('#eceff1')}
      </mesh>
      {/* hat */}
      <mesh position={[0, 0.68, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.06, 16]} />
        {mat(detail)}
      </mesh>
      <mesh position={[0, 0.82, 0]} castShadow>
        <coneGeometry args={[0.2, 0.42, 12]} />
        {mat(detail)}
      </mesh>
      <mesh position={[0, 0.62, 0.14]} rotation={[0.3, 0, 0]} castShadow>
        <boxGeometry args={[0.22, 0.02, 0.08]} />
        {mat(accent, { emissive: accent, intensity: 0.25 })}
      </mesh>
      <Eyes y={0.56} z={0.14} spacing={0.048} size={0.02} />
      {/* staff */}
      <mesh position={[0.24, 0.38, 0.06]} castShadow>
        <cylinderGeometry args={[0.022, 0.028, 0.72, 10]} />
        {mat(accent, { metalness: 0.4, roughness: 0.35 })}
      </mesh>
      {[0.12, 0.28, 0.44, 0.58].map((y) => (
        <mesh key={y} position={[0.24, y, 0.06]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.032, 0.006, 6, 12]} />
          {mat('#5d4037')}
        </mesh>
      ))}
      {/* orb */}
      <mesh position={[0.24, 0.72, 0.06]} castShadow>
        <sphereGeometry args={[0.07, 20, 20]} />
        {mat('#e1f5fe', { emissive: '#29b6f6', intensity: 0.75 })}
      </mesh>
      <mesh position={[0.24, 0.72, 0.06]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#81d4fa" transparent opacity={0.25} emissive="#29b6f6" emissiveIntensity={0.3} />
      </mesh>
      {/* spell book */}
      <mesh position={[-0.14, 0.36, 0.1]} rotation={[0, 0.4, 0.15]} castShadow>
        <boxGeometry args={[0.12, 0.16, 0.04]} />
        {mat('#4e342e')}
      </mesh>
      <mesh position={[-0.1, 0.36, 0.13]} rotation={[0, 0.4, 0.15]} castShadow>
        <boxGeometry args={[0.08, 0.12, 0.01]} />
        {mat('#ffecb3', { emissive: accent, intensity: 0.15 })}
      </mesh>
      {/* free hand */}
      <mesh position={[-0.2, 0.42, 0.08]} rotation={[0, 0, 0.5]} castShadow>
        <capsuleGeometry args={[0.035, 0.1, 6, 10]} />
        {mat(secondary)}
      </mesh>
      {/* floating runes */}
      {[
        [-0.08, 0.62, 0.2],
        [0.06, 0.66, 0.18],
        [0, 0.7, 0.22],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <octahedronGeometry args={[0.025, 0]} />
          {mat(accent, { emissive: accent, intensity: 0.55 })}
        </mesh>
      ))}
    </group>
  )
}

export function DragonModel({ body, accent, secondary, detail }: PaletteProps) {
  return (
    <group scale={1.04}>
      {/* body */}
      <mesh position={[0, 0.34, 0.04]} castShadow>
        <capsuleGeometry args={[0.17, 0.34, 14, 24]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.38, 0.1]} castShadow>
        <sphereGeometry args={[0.14, 20, 20]} />
        {mat(secondary)}
      </mesh>
      {/* neck */}
      <mesh position={[0, 0.52, 0.2]} rotation={[-0.55, 0, 0]} castShadow>
        <capsuleGeometry args={[0.1, 0.26, 12, 20]} />
        {mat(body)}
      </mesh>
      {/* head */}
      <mesh position={[0, 0.68, 0.34]} castShadow>
        <sphereGeometry args={[0.14, 22, 22]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[0, 0.66, 0.48]} rotation={[0.15, 0, 0]} castShadow>
        <boxGeometry args={[0.12, 0.06, 0.14]} />
        {mat(body)}
      </mesh>
      {/* horns */}
      {[-0.06, 0.06].map((x) => (
        <mesh key={x} position={[x, 0.82, 0.32]} rotation={[-0.3, 0, x > 0 ? 0.25 : -0.25]} castShadow>
          <coneGeometry args={[0.035, 0.18, 6]} />
          {mat(accent, { emissive: accent, intensity: 0.3 })}
        </mesh>
      ))}
      {/* frill */}
      {[-0.1, -0.05, 0, 0.05, 0.1].map((x) => (
        <mesh key={x} position={[x, 0.74, 0.26]} rotation={[-0.6, 0, 0]} castShadow>
          <coneGeometry args={[0.03, 0.1, 4]} />
          {mat(detail, { emissive: detail, intensity: 0.35 })}
        </mesh>
      ))}
      <Eyes y={0.7} z={0.42} spacing={0.058} size={0.028} iris={detail} angry />
      {/* nostrils & smoke hint */}
      {[-0.04, 0.04].map((x) => (
        <mesh key={x} position={[x, 0.64, 0.5]} castShadow>
          <sphereGeometry args={[0.018, 8, 8]} />
          {mat('#212121')}
        </mesh>
      ))}
      {/* chest gem / fire core */}
      <mesh position={[0, 0.4, 0.18]} castShadow>
        <octahedronGeometry args={[0.06, 0]} />
        {mat(detail, { emissive: detail, intensity: 0.85 })}
      </mesh>
      {/* wings — segmented */}
      {[-0.34, 0.34].map((x) => (
        <group key={x} rotation={[0.15, x > 0 ? -0.55 : 0.55, x > 0 ? -0.15 : 0.15]}>
          <mesh position={[x, 0.58, -0.1]} castShadow>
            <boxGeometry args={[0.03, 0.42, 0.32]} />
            {mat(secondary)}
          </mesh>
          {[0.12, 0.24, 0.36].map((dy) => (
            <mesh key={dy} position={[x, 0.58 - dy * 0.3, -0.1 - dy * 0.08]} castShadow>
              <boxGeometry args={[0.025, 0.14, 0.22 - dy * 0.15]} />
              {mat(body)}
            </mesh>
          ))}
          <mesh position={[x, 0.62, -0.08]} castShadow>
            <boxGeometry args={[0.02, 0.08, 0.12]} />
            {mat(accent, { emissive: accent, intensity: 0.2 })}
          </mesh>
        </group>
      ))}
      {/* tail */}
      <mesh position={[0, 0.28, -0.2]} rotation={[0.55, 0, 0]} castShadow>
        <capsuleGeometry args={[0.08, 0.28, 10, 16]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.18, -0.38]} rotation={[0.7, 0, 0]} castShadow>
        <coneGeometry args={[0.06, 0.2, 6]} />
        {mat(accent, { emissive: accent, intensity: 0.25 })}
      </mesh>
      {/* legs & claws */}
      {[-0.12, 0.12].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.14, 0.08]} castShadow>
            <capsuleGeometry args={[0.05, 0.12, 8, 12]} />
            {mat(body)}
          </mesh>
          {[0, 1, 2].map((i) => (
            <mesh
              key={i}
              position={[x + (i - 1) * 0.025, 0.04, 0.14 + i * 0.02]}
              rotation={[0.4, 0, (i - 1) * 0.2]}
              castShadow
            >
              <coneGeometry args={[0.012, 0.05, 4]} />
              {mat('#37474f', { metalness: 0.5 })}
            </mesh>
          ))}
        </group>
      ))}
      {/* arm spines */}
      {[-0.2, 0.2].map((x) => (
        <mesh key={x} position={[x, 0.42, 0.02]} rotation={[0, 0, x > 0 ? -0.4 : 0.4]} castShadow>
          <capsuleGeometry args={[0.04, 0.16, 6, 10]} />
          {mat(body)}
        </mesh>
      ))}
    </group>
  )
}

export function PaladinModel({ body, accent, secondary, detail }: PaletteProps) {
  const plate = { metalness: 0.62, roughness: 0.28 }
  return (
    <group scale={1.06}>
      {/* greaves & sabatons */}
      {[-0.1, 0.1].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.1, 0.02]} castShadow>
            <boxGeometry args={[0.1, 0.14, 0.12]} />
            {mat(body, plate)}
          </mesh>
          <mesh position={[x, 0.03, 0.06]} castShadow>
            <boxGeometry args={[0.12, 0.05, 0.18]} />
            {mat(detail, plate)}
          </mesh>
        </group>
      ))}
      {/* cuisses */}
      {[-0.1, 0.1].map((x) => (
        <mesh key={x} position={[x, 0.22, 0]} castShadow>
          <capsuleGeometry args={[0.06, 0.12, 8, 12]} />
          {mat(secondary, plate)}
        </mesh>
      ))}
      {/* torso */}
      <mesh position={[0, 0.36, 0]} castShadow>
        <capsuleGeometry args={[0.17, 0.28, 12, 20]} />
        {mat(body, plate)}
      </mesh>
      <mesh position={[0, 0.38, 0.12]} castShadow>
        <boxGeometry args={[0.14, 0.18, 0.04]} />
        {mat(accent, { ...plate, emissive: accent, intensity: 0.12 })}
      </mesh>
      {/* pauldrons */}
      {[-0.22, 0.22].map((x) => (
        <mesh key={x} position={[x, 0.48, 0]} castShadow>
          <sphereGeometry args={[0.1, 16, 16]} />
          {mat(secondary, plate)}
        </mesh>
      ))}
      {/* arms */}
      {[-0.24, 0.24].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.36, 0.04]} rotation={[0.2, 0, x > 0 ? -0.3 : 0.3]} castShadow>
            <capsuleGeometry args={[0.05, 0.16, 8, 12]} />
            {mat(body, plate)}
          </mesh>
          <mesh position={[x > 0 ? x + 0.06 : x - 0.06, 0.26, 0.08]} castShadow>
            <boxGeometry args={[0.08, 0.1, 0.08]} />
            {mat(detail, plate)}
          </mesh>
        </group>
      ))}
      {/* helmet */}
      <mesh position={[0, 0.58, 0.02]} castShadow>
        <sphereGeometry args={[0.14, 22, 22]} />
        {mat(secondary, plate)}
      </mesh>
      <mesh position={[0, 0.58, 0.14]} castShadow>
        <boxGeometry args={[0.12, 0.08, 0.04]} />
        {mat(body, plate)}
      </mesh>
      <mesh position={[0, 0.72, 0.04]} castShadow>
        <coneGeometry args={[0.04, 0.14, 4]} />
        {mat(accent, { ...plate, emissive: accent, intensity: 0.2 })}
      </mesh>
      {/* visor slit */}
      <mesh position={[0, 0.58, 0.16]} castShadow>
        <boxGeometry args={[0.1, 0.025, 0.02]} />
        {mat('#263238')}
      </mesh>
      <Eyes y={0.58} z={0.14} spacing={0.04} size={0.015} iris="#b3e5fc" />
      {/* cape */}
      <mesh position={[0, 0.4, -0.14]} rotation={[0.15, 0, 0]} castShadow>
        <boxGeometry args={[0.32, 0.38, 0.03]} />
        {mat('#b71c1c', { roughness: 0.7 })}
      </mesh>
      {/* shield */}
      <mesh position={[-0.22, 0.38, 0.1]} rotation={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.14, 0.04, 6]} />
        {mat(body, plate)}
      </mesh>
      <mesh position={[-0.2, 0.38, 0.13]} rotation={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 6]} />
        {mat(accent, { emissive: accent, intensity: 0.25 })}
      </mesh>
      {/* sword */}
      <mesh position={[0.22, 0.42, 0.08]} rotation={[0, 0, -0.25]} castShadow>
        <boxGeometry args={[0.04, 0.32, 0.06]} />
        {mat('#cfd8dc', { metalness: 0.85, roughness: 0.2 })}
      </mesh>
      <mesh position={[0.24, 0.58, 0.1]} rotation={[0, 0, -0.25]} castShadow>
        <boxGeometry args={[0.06, 0.1, 0.04]} />
        {mat(accent, plate)}
      </mesh>
      <mesh position={[0.22, 0.26, 0.08]} rotation={[0, 0, -0.25]} castShadow>
        <boxGeometry args={[0.025, 0.08, 0.025]} />
        {mat('#5d4037')}
      </mesh>
      {/* belt & tabard */}
      <mesh position={[0, 0.28, 0.1]} castShadow>
        <boxGeometry args={[0.24, 0.04, 0.02]} />
        {mat('#4e342e')}
      </mesh>
      <mesh position={[0, 0.24, 0.11]} castShadow>
        <boxGeometry args={[0.12, 0.14, 0.02]} />
        {mat(accent, { emissive: accent, intensity: 0.1 })}
      </mesh>
    </group>
  )
}
