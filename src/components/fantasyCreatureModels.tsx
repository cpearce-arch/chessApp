/**
 * Procedural 3D miniatures built from Three.js primitives (spheres, boxes, capsules).
 * Each export is one chess role. All models face +Z; FantasyPiece rotates Black by π on Y.
 * Colors come from PaletteProps (see fantasy/pieces.ts).
 */
import {
  Eyes,
  G,
  ghostSheet,
  mat,
  ScaleSpine,
  StudRing,
  type PaletteProps,
} from './fantasy/modelParts'

/** Goblin — pawn. Hunched figure with ears, dagger, and backpack. */
export function GoblinModel({ body, accent, secondary, detail, cloth, trim }: PaletteProps) {
  return (
    <group scale={1.08}>
      <mesh position={[0, 0.26, 0.02]} castShadow>
        <sphereGeometry args={[0.24, G.sphere, G.sphere]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.24, 0.16, G.cylinder]} />
        {mat(accent)}
      </mesh>
      <StudRing y={0.14} radius={0.21} count={14} size={0.022} color={trim} emissive={trim} />
      <mesh position={[0, 0.14, 0.04]} castShadow>
        <cylinderGeometry args={[0.22, 0.2, 0.08, G.cylinder]} />
        {mat(cloth)}
      </mesh>
      {[-0.1, 0.1].map((x) => (
        <mesh key={x} position={[x, 0.1, 0.1]} rotation={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.08, 0.14, 0.02]} />
          {mat(accent)}
        </mesh>
      ))}
      <mesh position={[0, 0.48, 0.06]} castShadow>
        <sphereGeometry args={[0.21, G.sphere, G.sphere]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[0, 0.44, 0.2]} rotation={[0.25, 0, 0]} castShadow>
        <sphereGeometry args={[0.08, G.sphereMed, G.sphereMed]} />
        {mat(body)}
      </mesh>
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[s * 0.22, 0.58, -0.02]} rotation={[0, 0, s * 0.85]} castShadow>
            <coneGeometry args={[0.07, 0.26, G.cone]} />
            {mat(body)}
          </mesh>
          <mesh position={[s * 0.2, 0.52, 0.02]} rotation={[0, 0, s * 0.5]} castShadow>
            <coneGeometry args={[0.04, 0.12, G.cone]} />
            {mat(secondary)}
          </mesh>
        </group>
      ))}
      <Eyes y={0.5} z={0.2} spacing={0.075} size={0.03} iris={detail} angry />
      <mesh position={[0, 0.44, 0.24]} rotation={[0.5, 0, 0]} castShadow>
        <coneGeometry args={[0.035, 0.08, G.cone]} />
        {mat(accent)}
      </mesh>
      {[-0.05, -0.025, 0, 0.025, 0.05].map((x) => (
        <mesh key={x} position={[x, 0.38, 0.22]} rotation={[0.3, 0, 0]} castShadow>
          <coneGeometry args={[0.014, 0.038, 8]} />
          {mat('#eceff1')}
        </mesh>
      ))}
      <mesh position={[0.16, 0.32, 0.14]} rotation={[0, -0.5, 0.35]} castShadow>
        <boxGeometry args={[0.035, 0.14, 0.012]} />
        {mat(trim, { metalness: 0.75, roughness: 0.22 })}
      </mesh>
      <mesh position={[0.19, 0.38, 0.16]} rotation={[0, -0.5, 0.35]} castShadow>
        <boxGeometry args={[0.05, 0.06, 0.02]} />
        {mat(cloth)}
      </mesh>
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[s * 0.28, 0.34, 0.06]} rotation={[0.3, 0, s * -0.6]} castShadow>
            <capsuleGeometry args={[0.05, 0.14, G.capsuleRadial, G.capsuleHeight]} />
            {mat(body)}
          </mesh>
          <mesh position={[s * 0.34, 0.24, 0.12]} rotation={[0.5, 0, s * -0.4]} castShadow>
            <capsuleGeometry args={[0.045, 0.12, G.capsuleRadial, G.capsuleHeight]} />
            {mat(secondary)}
          </mesh>
          {[0, 1, 2, 3].map((i) => (
            <mesh
              key={i}
              position={[s * (0.36 + i * 0.008), 0.16 + i * 0.018, 0.14 + i * 0.018]}
              rotation={[0.6, 0, s * -0.2]}
              castShadow
            >
              <capsuleGeometry args={[0.012, 0.038, 8, 16]} />
              {mat(trim, { metalness: 0.4 })}
            </mesh>
          ))}
        </group>
      ))}
      {[-0.1, 0.1].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.08, 0.04]} castShadow>
            <capsuleGeometry args={[0.055, 0.1, G.capsuleRadial, G.capsuleHeight]} />
            {mat(body)}
          </mesh>
          <mesh position={[x, 0.02, 0.08]} castShadow>
            <boxGeometry args={[0.1, 0.04, 0.14]} />
            {mat(detail)}
          </mesh>
          <mesh position={[x, 0.04, 0.14]} castShadow>
            <boxGeometry args={[0.08, 0.03, 0.04]} />
            {mat(accent)}
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.32, -0.14]} castShadow>
        <sphereGeometry args={[0.12, G.sphereMed, G.sphereMed]} />
        {mat(cloth)}
      </mesh>
      <ScaleSpine
        color={trim}
        points={[
          [0, 0.34, -0.1],
          [0, 0.28, -0.12],
          [0, 0.22, -0.11],
        ]}
        scaleSize={0.028}
      />
    </group>
  )
}

/** Golem — rook. Blocky stone body, glowing runes, crystal shoulders. */
export function GolemModel({ body, accent, secondary, detail, cloth, trim }: PaletteProps) {
  const runeGlow = { emissive: detail, intensity: 0.5 }
  return (
    <group scale={1.06}>
      <mesh position={[0, 0.06, 0]} castShadow>
        <boxGeometry args={[0.58, 0.1, 0.52]} />
        {mat(cloth, { emissive: detail, intensity: 0.08 })}
      </mesh>
      <StudRing y={0.1} radius={0.26} count={16} size={0.018} color={trim} />
      {[-0.16, 0.16].map((x) => (
        <mesh key={x} position={[x, 0.16, 0]} castShadow>
          <boxGeometry args={[0.18, 0.14, 0.22]} />
          {mat(accent)}
        </mesh>
      ))}
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
      {[
        [0, 0.38, 0.22],
        [-0.08, 0.42, 0.2],
        [0.08, 0.42, 0.2],
        [-0.04, 0.36, 0.21],
        [0.04, 0.36, 0.21],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[0.035, 0.035, 0.018]} />
          {mat(detail, runeGlow)}
        </mesh>
      ))}
      <mesh position={[0, 0.48, 0.21]} castShadow>
        <torusGeometry args={[0.07, 0.014, G.torusTube, G.torusRing]} />
        {mat(detail, runeGlow)}
      </mesh>
      <mesh position={[0, 0.72, 0.06]} castShadow>
        <boxGeometry args={[0.32, 0.22, 0.28]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.78, 0.18]} castShadow>
        <boxGeometry args={[0.28, 0.1, 0.08]} />
        {mat(accent)}
      </mesh>
      <Eyes y={0.72} z={0.2} spacing={0.1} size={0.038} iris={detail} />
      {[
        [0.14, 0.35, 0.2],
        [-0.12, 0.28, -0.18],
        [0.06, 0.55, -0.14],
        [-0.18, 0.5, 0.1],
        [0.2, 0.62, 0.05],
        [-0.08, 0.62, -0.08],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <sphereGeometry args={[0.042, G.sphereLo, G.sphereLo]} />
          {mat(secondary)}
        </mesh>
      ))}
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
          {[0, 1, 2, 3].map((i) => (
            <mesh
              key={i}
              position={[x > 0 ? x + 0.1 : x - 0.1, 0.26 - i * 0.035, 0.1 + i * 0.018]}
              castShadow
            >
              <boxGeometry args={[0.048, 0.038, 0.055]} />
              {mat(body)}
            </mesh>
          ))}
        </group>
      ))}
      {[-0.34, 0.34].map((x) => (
        <mesh key={x} position={[x, 0.62, 0]} castShadow>
          <icosahedronGeometry args={[0.065, G.icosa]} />
          {mat(detail, { emissive: detail, intensity: 0.7, metalness: 0.25 })}
        </mesh>
      ))}
    </group>
  )
}

/** Ghost — knight. Translucent sheet, tendrils, chain links. */
export function GhostModel({ body, accent, secondary, detail, cloth, trim }: PaletteProps) {
  const sheet = ghostSheet(body, accent)
  const inner = ghostSheet(secondary, accent, 0.62)
  return (
    <group>
      <mesh position={[0, 0.42, 0]} castShadow>
        <sphereGeometry args={[0.21, G.sphere, G.sphere]} />
        {sheet}
      </mesh>
      <mesh position={[0, 0.52, 0]} castShadow>
        <sphereGeometry args={[0.08, G.sphereMed, G.sphereMed]} />
        <meshStandardMaterial color={trim} emissive={accent} emissiveIntensity={0.45} transparent opacity={0.88} />
      </mesh>
      <Eyes y={0.44} z={0.17} spacing={0.065} size={0.036} iris={detail} />
      <mesh position={[0, 0.34, 0.18]} castShadow>
        <torusGeometry args={[0.055, 0.014, G.torusTube, G.torusRing, Math.PI]} />
        <meshStandardMaterial color={cloth} emissive={accent} emissiveIntensity={0.55} />
      </mesh>
      <mesh position={[0, 0.24, 0]} castShadow>
        <coneGeometry args={[0.3, 0.48, G.cone, 1, true]} />
        {sheet}
      </mesh>
      <mesh position={[0, 0.2, 0.02]} castShadow>
        <coneGeometry args={[0.26, 0.4, G.cone, 1, true]} />
        {inner}
      </mesh>
      {[
        [0, 0.06, -0.08, 0],
        [-0.12, 0.04, 0.02, 0.4],
        [0.12, 0.04, 0.02, -0.4],
        [-0.08, 0.02, -0.12, 0.2],
        [0.08, 0.02, -0.1, -0.2],
        [0, 0.01, 0.1, 0.1],
      ].map(([x, y, z, rot], i) => (
        <mesh key={i} position={[x as number, y as number, z as number]} rotation={[0.5, 0, rot as number]} castShadow>
          <capsuleGeometry args={[0.035, 0.24, G.capsuleRadial, G.capsuleHeight]} />
          {sheet}
        </mesh>
      ))}
      {[-0.18, 0.18].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.28, 0.06]} rotation={[0.3, 0, x > 0 ? -0.6 : 0.6]} castShadow>
            <capsuleGeometry args={[0.04, 0.22, G.capsuleRadial, G.capsuleHeight]} />
            {sheet}
          </mesh>
          {[0, 1, 2, 3].map((i) => (
            <mesh
              key={i}
              position={[x + (x > 0 ? 0.04 : -0.04), 0.14 - i * 0.028, 0.1 + i * 0.018]}
              rotation={[0.5, 0, x > 0 ? -0.3 : 0.3]}
              castShadow
            >
              <capsuleGeometry args={[0.018, 0.065, 10, 20]} />
              {sheet}
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.016, G.torusTube, G.torusRing]} />
        <meshStandardMaterial color={secondary} transparent opacity={0.55} emissive={detail} emissiveIntensity={0.5} />
      </mesh>
      {[-0.06, 0, 0.06].map((x, i) => (
        <mesh key={i} position={[x, 0.56, -0.04]} rotation={[0.3, 0, 0]}>
          <torusGeometry args={[0.038, 0.01, 12, G.torusRing]} />
          {mat(trim, { metalness: 0.75, roughness: 0.28 })}
        </mesh>
      ))}
    </group>
  )
}

/** Wizard — bishop. Robes, hat, staff with glowing orb, floating runes. */
export function WizardModel({ body, accent, secondary, detail, cloth, trim }: PaletteProps) {
  return (
    <group scale={1.06}>
      <mesh position={[0, 0.22, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.32, 0.36, G.cylinder]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.38, 0.02]} castShadow>
        <cylinderGeometry args={[0.22, 0.26, 0.2, G.cylinder]} />
        {mat(cloth)}
      </mesh>
      <StudRing y={0.12} radius={0.28} count={18} size={0.022} color={trim} emissive={accent} />
      <mesh position={[0, 0.54, 0.04]} castShadow>
        <sphereGeometry args={[0.14, G.sphere, G.sphere]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[0, 0.46, 0.12]} castShadow>
        <sphereGeometry args={[0.09, G.sphereMed, G.sphereMed]} />
        {mat(secondary, { roughness: 0.35 })}
      </mesh>
      <mesh position={[0, 0.38, 0.14]} rotation={[0.2, 0, 0]} castShadow>
        <coneGeometry args={[0.1, 0.24, G.cone]} />
        {mat('#eceff1')}
      </mesh>
      <mesh position={[0, 0.68, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.06, G.cylinder]} />
        {mat(cloth)}
      </mesh>
      <mesh position={[0, 0.82, 0]} castShadow>
        <coneGeometry args={[0.2, 0.42, G.cone]} />
        {mat(cloth)}
      </mesh>
      <mesh position={[0, 0.62, 0.14]} rotation={[0.3, 0, 0]} castShadow>
        <boxGeometry args={[0.22, 0.02, 0.08]} />
        {mat(trim, { emissive: accent, intensity: 0.35 })}
      </mesh>
      <Eyes y={0.56} z={0.14} spacing={0.048} size={0.02} iris={detail} />
      <mesh position={[0.24, 0.38, 0.06]} castShadow>
        <cylinderGeometry args={[0.022, 0.028, 0.72, G.cylinder]} />
        {mat(trim, { metalness: 0.45, roughness: 0.32 })}
      </mesh>
      {[0.12, 0.28, 0.44, 0.58].map((y) => (
        <mesh key={y} position={[0.24, y, 0.06]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.032, 0.007, G.torusTube, G.torusRing]} />
          {mat(accent, { metalness: 0.35 })}
        </mesh>
      ))}
      <mesh position={[0.24, 0.72, 0.06]} castShadow>
        <sphereGeometry args={[0.07, G.sphere, G.sphere]} />
        {mat(detail, { emissive: detail, intensity: 0.85 })}
      </mesh>
      <mesh position={[0.24, 0.72, 0.06]}>
        <sphereGeometry args={[0.1, G.sphereMed, G.sphereMed]} />
        <meshStandardMaterial color={detail} transparent opacity={0.28} emissive={detail} emissiveIntensity={0.45} />
      </mesh>
      <mesh position={[-0.14, 0.36, 0.1]} rotation={[0, 0.4, 0.15]} castShadow>
        <boxGeometry args={[0.12, 0.16, 0.04]} />
        {mat(cloth)}
      </mesh>
      <mesh position={[-0.1, 0.36, 0.13]} rotation={[0, 0.4, 0.15]} castShadow>
        <boxGeometry args={[0.08, 0.12, 0.01]} />
        {mat(trim, { emissive: accent, intensity: 0.2 })}
      </mesh>
      <mesh position={[-0.2, 0.42, 0.08]} rotation={[0, 0, 0.5]} castShadow>
        <capsuleGeometry args={[0.035, 0.1, G.capsuleRadial, G.capsuleHeight]} />
        {mat(secondary)}
      </mesh>
      {[
        [-0.08, 0.62, 0.2],
        [0.06, 0.66, 0.18],
        [0, 0.7, 0.22],
        [-0.04, 0.74, 0.19],
        [0.04, 0.73, 0.21],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <icosahedronGeometry args={[0.028, 1]} />
          {mat(accent, { emissive: accent, intensity: 0.6 })}
        </mesh>
      ))}
    </group>
  )
}

/** Dragon — queen. Wings, horns, tail, chest gem, scale ridge along the back. */
export function DragonModel({ body, accent, secondary, detail, cloth, trim }: PaletteProps) {
  const spine: [number, number, number][] = []
  for (let i = 0; i < 8; i++) {
    spine.push([0, 0.32 + i * 0.04, -0.08 - i * 0.03])
  }
  return (
    <group scale={1.04}>
      <mesh position={[0, 0.34, 0.04]} castShadow>
        <capsuleGeometry args={[0.17, 0.34, G.capsuleRadial, G.capsuleHeight]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.38, 0.1]} castShadow>
        <sphereGeometry args={[0.14, G.sphere, G.sphere]} />
        {mat(secondary)}
      </mesh>
      <ScaleSpine points={spine} color={trim} scaleSize={0.032} />
      <mesh position={[0, 0.52, 0.2]} rotation={[-0.55, 0, 0]} castShadow>
        <capsuleGeometry args={[0.1, 0.26, G.capsuleRadial, G.capsuleHeight]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.68, 0.34]} castShadow>
        <sphereGeometry args={[0.14, G.sphere, G.sphere]} />
        {mat(secondary)}
      </mesh>
      <mesh position={[0, 0.66, 0.48]} rotation={[0.15, 0, 0]} castShadow>
        <boxGeometry args={[0.12, 0.06, 0.14]} />
        {mat(body)}
      </mesh>
      {[-0.06, 0.06].map((x) => (
        <mesh key={x} position={[x, 0.82, 0.32]} rotation={[-0.3, 0, x > 0 ? 0.25 : -0.25]} castShadow>
          <coneGeometry args={[0.035, 0.2, G.cone]} />
          {mat(accent, { emissive: accent, intensity: 0.35 })}
        </mesh>
      ))}
      {[-0.12, -0.08, -0.04, 0, 0.04, 0.08, 0.12].map((x) => (
        <mesh key={x} position={[x, 0.74, 0.26]} rotation={[-0.6, 0, 0]} castShadow>
          <coneGeometry args={[0.028, 0.11, G.cone]} />
          {mat(detail, { emissive: detail, intensity: 0.4 })}
        </mesh>
      ))}
      <Eyes y={0.7} z={0.42} spacing={0.058} size={0.028} iris={detail} angry />
      {[-0.04, 0.04].map((x) => (
        <mesh key={x} position={[x, 0.64, 0.5]} castShadow>
          <sphereGeometry args={[0.018, G.sphereLo, G.sphereLo]} />
          {mat(cloth)}
        </mesh>
      ))}
      <mesh position={[0, 0.4, 0.18]} castShadow>
        <icosahedronGeometry args={[0.065, G.icosa]} />
        {mat(detail, { emissive: detail, intensity: 0.9 })}
      </mesh>
      {[-0.34, 0.34].map((x) => (
        <group key={x} rotation={[0.15, x > 0 ? -0.55 : 0.55, x > 0 ? -0.15 : 0.15]}>
          <mesh position={[x, 0.58, -0.1]} castShadow>
            <boxGeometry args={[0.03, 0.42, 0.32]} />
            {mat(secondary)}
          </mesh>
          {[0.12, 0.24, 0.36, 0.48].map((dy) => (
            <mesh key={dy} position={[x, 0.58 - dy * 0.28, -0.1 - dy * 0.07]} castShadow>
              <boxGeometry args={[0.024, 0.12, 0.2 - dy * 0.12]} />
              {mat(body)}
            </mesh>
          ))}
          <mesh position={[x, 0.62, -0.08]} castShadow>
            <boxGeometry args={[0.018, 0.08, 0.12]} />
            {mat(cloth, { emissive: accent, intensity: 0.15 })}
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.28, -0.2]} rotation={[0.55, 0, 0]} castShadow>
        <capsuleGeometry args={[0.08, 0.28, G.capsuleRadial, G.capsuleHeight]} />
        {mat(body)}
      </mesh>
      <mesh position={[0, 0.18, -0.38]} rotation={[0.7, 0, 0]} castShadow>
        <coneGeometry args={[0.06, 0.22, G.cone]} />
        {mat(accent, { emissive: accent, intensity: 0.3 })}
      </mesh>
      {[-0.12, 0.12].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.14, 0.08]} castShadow>
            <capsuleGeometry args={[0.05, 0.12, G.capsuleRadial, G.capsuleHeight]} />
            {mat(body)}
          </mesh>
          {[0, 1, 2, 3].map((i) => (
            <mesh
              key={i}
              position={[x + (i - 1.5) * 0.022, 0.04, 0.14 + i * 0.018]}
              rotation={[0.4, 0, (i - 1.5) * 0.18]}
              castShadow
            >
              <coneGeometry args={[0.012, 0.055, 10]} />
              {mat(trim, { metalness: 0.55 })}
            </mesh>
          ))}
        </group>
      ))}
      {[-0.2, 0.2].map((x) => (
        <mesh key={x} position={[x, 0.42, 0.02]} rotation={[0, 0, x > 0 ? -0.4 : 0.4]} castShadow>
          <capsuleGeometry args={[0.04, 0.16, G.capsuleRadial, G.capsuleHeight]} />
          {mat(body)}
        </mesh>
      ))}
    </group>
  )
}

/** Paladin — king. Plate armor, cape, shield, sword, tabard. */
export function PaladinModel({ body, accent, secondary, detail, cloth, trim }: PaletteProps) {
  const plate = { metalness: 0.62, roughness: 0.28 }
  return (
    <group scale={1.06}>
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
          <StudRing y={0.08} radius={0.06} count={8} size={0.01} color={trim} />
        </group>
      ))}
      {[-0.1, 0.1].map((x) => (
        <mesh key={x} position={[x, 0.22, 0]} castShadow>
          <capsuleGeometry args={[0.06, 0.12, G.capsuleRadial, G.capsuleHeight]} />
          {mat(secondary, plate)}
        </mesh>
      ))}
      <mesh position={[0, 0.36, 0]} castShadow>
        <capsuleGeometry args={[0.17, 0.28, G.capsuleRadial, G.capsuleHeight]} />
        {mat(body, plate)}
      </mesh>
      <mesh position={[0, 0.38, 0.12]} castShadow>
        <boxGeometry args={[0.14, 0.18, 0.04]} />
        {mat(accent, { ...plate, emissive: accent, intensity: 0.15 })}
      </mesh>
      {[-0.22, 0.22].map((x) => (
        <mesh key={x} position={[x, 0.48, 0]} castShadow>
          <sphereGeometry args={[0.1, G.sphereMed, G.sphereMed]} />
          {mat(secondary, plate)}
        </mesh>
      ))}
      {[-0.24, 0.24].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.36, 0.04]} rotation={[0.2, 0, x > 0 ? -0.3 : 0.3]} castShadow>
            <capsuleGeometry args={[0.05, 0.16, G.capsuleRadial, G.capsuleHeight]} />
            {mat(body, plate)}
          </mesh>
          <mesh position={[x > 0 ? x + 0.06 : x - 0.06, 0.26, 0.08]} castShadow>
            <boxGeometry args={[0.08, 0.1, 0.08]} />
            {mat(detail, plate)}
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.58, 0.02]} castShadow>
        <sphereGeometry args={[0.14, G.sphere, G.sphere]} />
        {mat(secondary, plate)}
      </mesh>
      <mesh position={[0, 0.58, 0.14]} castShadow>
        <boxGeometry args={[0.12, 0.08, 0.04]} />
        {mat(body, plate)}
      </mesh>
      <mesh position={[0, 0.72, 0.04]} castShadow>
        <coneGeometry args={[0.04, 0.14, G.cone]} />
        {mat(trim, { ...plate, emissive: accent, intensity: 0.25 })}
      </mesh>
      <mesh position={[0, 0.58, 0.16]} castShadow>
        <boxGeometry args={[0.1, 0.025, 0.02]} />
        {mat(cloth)}
      </mesh>
      <Eyes y={0.58} z={0.14} spacing={0.04} size={0.015} iris={detail} />
      <mesh position={[0, 0.4, -0.14]} rotation={[0.15, 0, 0]} castShadow>
        <boxGeometry args={[0.32, 0.38, 0.03]} />
        {mat(cloth, { roughness: 0.72 })}
      </mesh>
      <mesh position={[0, 0.52, -0.15]} rotation={[0.15, 0, 0]} castShadow>
        <boxGeometry args={[0.26, 0.12, 0.02]} />
        {mat(trim, { emissive: accent, intensity: 0.12 })}
      </mesh>
      <mesh position={[-0.22, 0.38, 0.1]} rotation={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.14, 0.04, 6]} />
        {mat(body, plate)}
      </mesh>
      <mesh position={[-0.2, 0.38, 0.13]} rotation={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.02, G.cylinder]} />
        {mat(accent, { emissive: accent, intensity: 0.3 })}
      </mesh>
      <mesh position={[0.22, 0.42, 0.08]} rotation={[0, 0, -0.25]} castShadow>
        <boxGeometry args={[0.04, 0.32, 0.06]} />
        {mat(secondary, { metalness: 0.88, roughness: 0.18 })}
      </mesh>
      <mesh position={[0.24, 0.58, 0.1]} rotation={[0, 0, -0.25]} castShadow>
        <boxGeometry args={[0.06, 0.1, 0.04]} />
        {mat(trim, plate)}
      </mesh>
      <mesh position={[0.22, 0.26, 0.08]} rotation={[0, 0, -0.25]} castShadow>
        <boxGeometry args={[0.025, 0.08, 0.025]} />
        {mat(cloth)}
      </mesh>
      <mesh position={[0, 0.28, 0.1]} castShadow>
        <boxGeometry args={[0.24, 0.04, 0.02]} />
        {mat(cloth)}
      </mesh>
      <mesh position={[0, 0.24, 0.11]} castShadow>
        <boxGeometry args={[0.12, 0.14, 0.02]} />
        {mat(accent, { emissive: accent, intensity: 0.12 })}
      </mesh>
    </group>
  )
}
