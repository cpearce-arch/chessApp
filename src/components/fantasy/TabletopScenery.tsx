import { Float } from '@react-three/drei'
import { mat } from './modelParts'

/** Tavern / dungeon tabletop — props sit outside the 8×8 play area. */
export function TabletopScenery() {
  return (
    <group>
      <TableSurface />
      <DungeonAlcove />
      <TorchSconce position={[-5.8, 2.2, -4.5]} rotation={[0, 0.35, 0]} />
      <TorchSconce position={[5.8, 2.2, -4.5]} rotation={[0, -0.35, 0]} />
      <CandleCluster position={[-5.2, 0.02, 4.8]} />
      <CandleCluster position={[5.4, 0.02, 5.2]} scale={0.85} />
      <D20Die position={[-5.5, 0.08, 2.2]} rotation={[0.4, 0.8, 0.2]} />
      <ScrollAndQuill position={[4.8, 0.02, -5.2]} />
      <MugAndCoins position={[-4.2, 0.02, -5.4]} />
      <OpenGrimoire position={[5.6, 0.02, 1.8]} rotation={[0, -0.6, 0]} />
    </group>
  )
}

function TableSurface() {
  return (
    <group position={[0, -0.11, 0]}>
      {/* Plank top */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 16]} />
        <meshStandardMaterial color="#4e342e" roughness={0.82} metalness={0.04} />
      </mesh>
      {/* Carved rim */}
      <mesh receiveShadow position={[0, -0.06, 0]}>
        <boxGeometry args={[18.4, 0.12, 16.4]} />
        <meshStandardMaterial color="#3e2723" roughness={0.88} />
      </mesh>
      {/* Felt play mat inset (under board squares) */}
      <mesh receiveShadow position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9.2, 9.2]} />
        <meshStandardMaterial color="#1b4332" roughness={0.95} metalness={0} />
      </mesh>
      {/* Gold trim on mat */}
      <mesh position={[0, 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.55, 4.65, 4, 64]} />
        <meshStandardMaterial color="#bcaaa4" roughness={0.4} metalness={0.55} />
      </mesh>
    </group>
  )
}

function DungeonAlcove() {
  const stone = { color: '#37474f', roughness: 0.92, metalness: 0.02 }
  return (
    <group position={[0, 1.8, -7.2]}>
      <mesh receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[22, 9]} />
        <meshStandardMaterial {...stone} />
      </mesh>
      {/* Arch */}
      <mesh position={[0, -0.5, 0.15]}>
        <torusGeometry args={[3.2, 0.35, 12, 48, Math.PI]} />
        <meshStandardMaterial color="#455a64" roughness={0.9} />
      </mesh>
      {/* Side walls */}
      <mesh receiveShadow position={[-6.5, -0.5, 1.2]} rotation={[0, 0.55, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial {...stone} />
      </mesh>
      <mesh receiveShadow position={[6.5, -0.5, 1.2]} rotation={[0, -0.55, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial {...stone} />
      </mesh>
      {/* Banner */}
      <mesh position={[0, 1.2, 0.2]} castShadow>
        <planeGeometry args={[2.4, 3.2]} />
        <meshStandardMaterial color="#4a148c" roughness={0.75} emissive="#311b92" emissiveIntensity={0.08} />
      </mesh>
      <mesh position={[0, 2.6, 0.22]} castShadow>
        <boxGeometry args={[2.6, 0.12, 0.06]} />
        {mat('#ffc107', { metalness: 0.5, roughness: 0.35 })}
      </mesh>
      {/* Wall runes (emissive) */}
      {[-2.2, 2.2].map((x) => (
        <mesh key={x} position={[x, 0.4, 0.18]}>
          <ringGeometry args={[0.35, 0.42, 6]} />
          <meshStandardMaterial color="#80deea" emissive="#00bcd4" emissiveIntensity={0.35} />
        </mesh>
      ))}
    </group>
  )
}

function TorchSconce({
  position,
  rotation,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow position={[0, -0.8, 0]}>
        <boxGeometry args={[0.25, 0.5, 0.2]} />
        {mat('#546e7a', { metalness: 0.65, roughness: 0.35 })}
      </mesh>
      <mesh castShadow position={[0, -0.2, 0.08]}>
        <cylinderGeometry args={[0.06, 0.08, 0.35, 8]} />
        {mat('#5d4037')}
      </mesh>
      <Float speed={2.2} rotationIntensity={0.08} floatIntensity={0.06}>
        <mesh position={[0, 0.05, 0.1]} castShadow>
          <coneGeometry args={[0.09, 0.22, 10]} />
          <meshStandardMaterial color="#ff6f00" emissive="#ff9100" emissiveIntensity={0.85} transparent opacity={0.92} />
        </mesh>
      </Float>
      <pointLight position={[0, 0.15, 0.25]} color="#ffb74d" intensity={0.55} distance={7} decay={2} />
    </group>
  )
}

function CandleCluster({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh receiveShadow position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.14, 0.16, 0.03, 12]} />
        {mat('#4e342e')}
      </mesh>
      {[
        [0, 0.04, 0],
        [-0.05, 0.035, 0.04],
        [0.05, 0.038, -0.03],
      ].map(([x, y, z], i) => (
        <group key={i} position={[x as number, y as number, z as number]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.018, 0.022, 0.08, 10]} />
            {mat('#fff8e1')}
          </mesh>
          <Float speed={3 + i} floatIntensity={0.04}>
            <mesh position={[0, 0.05, 0]}>
              <sphereGeometry args={[0.022, 10, 10]} />
              <meshStandardMaterial color="#ffecb3" emissive="#ff8f00" emissiveIntensity={0.7} />
            </mesh>
          </Float>
        </group>
      ))}
      <pointLight position={[0, 0.12, 0]} color="#ffe0b2" intensity={0.35} distance={4} decay={2} />
    </group>
  )
}

function D20Die({
  position,
  rotation,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <icosahedronGeometry args={[0.14, 0]} />
      <meshStandardMaterial color="#7e57c2" emissive="#651fff" emissiveIntensity={0.15} roughness={0.35} metalness={0.2} />
    </mesh>
  )
}

function ScrollAndQuill({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, 0.25, 0]}>
      <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.5, 16]} />
        {mat('#efebe9')}
      </mesh>
      <mesh castShadow position={[0.22, 0.02, 0.08]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.28, 0.01, 0.18]} />
        {mat('#fff8e1', { roughness: 0.9 })}
      </mesh>
      <mesh castShadow position={[0.35, 0.04, 0.12]} rotation={[0.3, 0.2, -0.8]}>
        <coneGeometry args={[0.015, 0.22, 6]} />
        {mat('#5d4037')}
      </mesh>
      <mesh castShadow position={[0.08, 0.025, -0.06]}>
        <cylinderGeometry args={[0.025, 0.025, 0.05, 10]} />
        {mat('#263238')}
      </mesh>
    </group>
  )
}

function MugAndCoins({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.09, 0.07, 0.14, 14]} />
        {mat('#6d4c41', { metalness: 0.35, roughness: 0.45 })}
      </mesh>
      <mesh castShadow position={[0.11, 0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.06, 0.012, 8, 16, Math.PI]} />
        {mat('#5d4037')}
      </mesh>
      {[
        [0.18, 0.012, 0.05],
        [0.22, 0.014, 0.02],
        [0.2, 0.013, -0.04],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} rotation={[Math.PI / 2, 0, i * 0.7]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.008, 16]} />
          {mat('#ffc107', { metalness: 0.85, roughness: 0.25 })}
        </mesh>
      ))}
    </group>
  )
}

function OpenGrimoire({
  position,
  rotation,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow position={[-0.08, 0.03, 0]} rotation={[0, 0.35, 0]}>
        <boxGeometry args={[0.22, 0.04, 0.16]} />
        {mat('#4e342e')}
      </mesh>
      <mesh castShadow position={[0.08, 0.03, 0]} rotation={[0, -0.35, 0]}>
        <boxGeometry args={[0.22, 0.04, 0.16]} />
        {mat('#4e342e')}
      </mesh>
      <mesh position={[0, 0.045, 0]}>
        <planeGeometry args={[0.18, 0.12]} />
        <meshStandardMaterial color="#fff9c4" emissive="#ffd54f" emissiveIntensity={0.12} roughness={0.85} />
      </mesh>
    </group>
  )
}
