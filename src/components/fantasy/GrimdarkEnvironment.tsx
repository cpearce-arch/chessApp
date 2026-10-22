/**
 * Large-scale set dressing: cathedral, columns, stained glass lights, braziers, floor mosaic.
 * Composes TabletopScenery (table + props) inside a wider grimdark hall. Non-interactive decor.
 */
import { Float, Sparkles } from '@react-three/drei'
import { useMemo } from 'react'
import { emberFlame, pbr, stainedGlass } from './pbrMaterials'
import { stoneRoughnessMap } from './proceduralTextures'
import { TabletopScenery } from './TabletopScenery'

/**
 * Elden Ring / Skyrim gothic ruin + Doom hell-brazier mood.
 * Layered over the playable tabletop set.
 */
export function GrimdarkEnvironment() {
  return (
    <group>
      <CathedralShell />
      <Colonnades />
      <StainedGlassWindows />
      <HellBraziers />
      <FloorMosaic />
      <ElderGeometricInlays />
      <DistantRuins />
      <AshParticles />
      <TabletopScenery />
    </group>
  )
}

function stoneMat(color: string, emissive?: string, intensity = 0) {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={0.92}
      metalness={0.04}
      roughnessMap={stoneRoughnessMap()}
      bumpMap={stoneRoughnessMap()}
      bumpScale={0.04}
      emissive={emissive ?? '#000000'}
      emissiveIntensity={intensity}
      envMapIntensity={0.85}
    />
  )
}

function CathedralShell() {
  return (
    <group position={[0, 4.5, -10]}>
      {/* Back apse */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[28, 14]} />
        {stoneMat('#2c3338')}
      </mesh>
      {/* Rib vaults */}
      {[-4, 0, 4].map((x) => (
        <mesh key={x} position={[x, 2.5, 0.8]} rotation={[0.55, 0, 0]}>
          <torusGeometry args={[5.5, 0.22, 16, 64, Math.PI * 0.55]} />
          {stoneMat('#37474f')}
        </mesh>
      ))}
      {/* Main arch */}
      <mesh position={[0, -1.2, 0.6]}>
        <torusGeometry args={[4.8, 0.45, 20, 72, Math.PI]} />
        {stoneMat('#455a64')}
      </mesh>
      {/* Doom-ish skull relief */}
      <mesh position={[0, 0.5, 0.35]} castShadow>
        <sphereGeometry args={[0.55, 40, 40]} />
        {stoneMat('#263238', '#ff3d00', 0.06)}
      </mesh>
      <mesh position={[-0.22, 0.55, 0.75]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.22, 0.55, 0.75]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
    </group>
  )
}

function Colonnades() {
  const positions: [number, number, number][] = [
    [-8, 0, -3],
    [-8, 0, 2],
    [8, 0, -3],
    [8, 0, 2],
    [-10, 0, -6],
    [10, 0, -6],
  ]
  return (
    <group>
      {positions.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh castShadow receiveShadow position={[0, 2.2, 0]}>
            <cylinderGeometry args={[0.35, 0.42, 4.4, 24]} />
            {stoneMat('#546e7a')}
          </mesh>
          <mesh castShadow position={[0, 4.5, 0]}>
            <boxGeometry args={[1.1, 0.35, 1.1]} />
            {stoneMat('#78909c')}
          </mesh>
          <mesh position={[0, 1.8, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.5, 0.06, 12, 32]} />
            {pbr('#ffd54f', 'metal', { emissive: '#ff8f00', intensity: 0.15 })}
          </mesh>
        </group>
      ))}
    </group>
  )
}

function StainedGlassWindows() {
  const panes: { pos: [number, number, number]; rot: [number, number, number]; color: string }[] = [
    { pos: [-7.8, 3.2, -5.5], rot: [0, 0.42, 0], color: '#7c4dff' },
    { pos: [7.8, 3.2, -5.5], rot: [0, -0.42, 0], color: '#00b0ff' },
    { pos: [0, 4.8, -8.8], rot: [0, 0, 0], color: '#ffd740' },
  ]
  return (
    <group>
      {panes.map(({ pos, rot, color }, i) => (
        <group key={i} position={pos} rotation={rot}>
          <mesh>
            <planeGeometry args={[2.2, 3.4]} />
            {stainedGlass(color, 0.75)}
          </mesh>
          <spotLight
            position={[0, 0, 0.4]}
            angle={0.45}
            penumbra={0.6}
            intensity={0.9}
            color={color}
            distance={14}
            castShadow={false}
          />
        </group>
      ))}
    </group>
  )
}

function HellBraziers() {
  const spots: [number, number, number][] = [
    [-6.5, 0, -6],
    [6.5, 0, -6],
    [-9, 0, 0],
    [9, 0, 0],
  ]
  return (
    <>
      {spots.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh castShadow position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.35, 0.45, 0.7, 16]} />
            {pbr('#37474f', 'stone')}
          </mesh>
          <mesh castShadow position={[0, 0.75, 0]}>
            <cylinderGeometry args={[0.42, 0.38, 0.15, 16]} />
            {pbr('#263238', 'metal', { metalness: 0.85 })}
          </mesh>
          <Float speed={2.5} floatIntensity={0.08}>
            <mesh position={[0, 1.05, 0]}>
              <coneGeometry args={[0.22, 0.55, 20]} />
              {emberFlame('#ff5722')}
            </mesh>
          </Float>
          <pointLight position={[0, 1.1, 0]} color="#ff6e40" intensity={1.1} distance={9} decay={2} castShadow={i < 2} />
        </group>
      ))}
    </>
  )
}

function FloorMosaic() {
  const tiles = useMemo(() => {
    const list: { x: number; z: number; c: string }[] = []
    for (let x = -14; x <= 14; x += 2) {
      for (let z = -12; z <= 12; z += 2) {
        if (Math.abs(x) < 5 && Math.abs(z) < 5) continue
        const checker = (x + z) % 4 === 0
        list.push({ x, z, c: checker ? '#1c2024' : '#252a30' })
      }
    }
    return list
  }, [])

  return (
    <group position={[0, -0.14, 0]}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[32, 28]} />
        {stoneMat('#1a1d21')}
      </mesh>
      {tiles.map(({ x, z, c }) => (
        <mesh key={`${x}-${z}`} position={[x, -0.135, z]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[1.85, 1.85]} />
          <meshPhysicalMaterial color={c} roughness={0.78} metalness={0.08} roughnessMap={stoneRoughnessMap()} envMapIntensity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

function ElderGeometricInlays() {
  const runes = useMemo(() => {
    const pts: [number, number, number][] = []
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2
      pts.push([Math.sin(a) * 5.2, -0.12, Math.cos(a) * 5.2])
    }
    return pts
  }, [])

  return (
    <group>
      {runes.map((p, i) => (
        <mesh key={i} position={p} rotation={[-Math.PI / 2, 0, i * 0.52]}>
          <ringGeometry args={[0.15, 0.22, 6]} />
          {pbr('#ffd54f', 'metal', { emissive: '#00e5ff', intensity: 0.35, metalness: 0.95 })}
        </mesh>
      ))}
    </group>
  )
}

function DistantRuins() {
  return (
    <group>
      {[-14, 14].map((x) => (
        <mesh key={x} position={[x, 3, -14]} receiveShadow>
          <boxGeometry args={[3, 6, 2]} />
          {stoneMat('#263238')}
        </mesh>
      ))}
      <mesh position={[0, 2, -16]} receiveShadow>
        <boxGeometry args={[8, 4, 1.5]} />
        {stoneMat('#37474f')}
      </mesh>
      {/* Broken bridge silhouette */}
      <mesh position={[0, 1.2, -13.5]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[12, 0.4, 1.2]} />
        {stoneMat('#455a64')}
      </mesh>
    </group>
  )
}

function AshParticles() {
  return (
    <>
      <Sparkles count={120} scale={[18, 6, 16]} size={2.5} speed={0.22} opacity={0.35} color="#ffab91" position={[0, 3, -2]} />
      <Sparkles count={80} scale={[14, 8, 12]} size={1.8} speed={0.15} opacity={0.25} color="#b388ff" position={[0, 4, -6]} />
      <fog attach="fog" args={['#0d0a10', 10, 38]} />
    </>
  )
}
