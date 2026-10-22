/**
 * WebGL canvas root: camera, lighting, HDRI environment, grimdark set, board, post-processing.
 * OrbitControls let the player rotate/zoom; clicks on squares are handled in ChessBoard3D.
 */
import { ContactShadows, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import * as THREE from 'three'
import type { Square } from 'chess.js'
import { ChessBoard3D } from './ChessBoard3D'
import { GrimdarkEnvironment } from './fantasy/GrimdarkEnvironment'
import { ACES_EXPOSURE } from './fantasy/pbrMaterials'
import { SceneEffects } from './rendering/SceneEffects'

type BoardCell = {
  square: Square
  type: string
  color: 'w' | 'b'
} | null

type Props = {
  board: BoardCell[][]
  selected: Square | null
  legalTargets: Square[]
  onSquareClick: (square: Square) => void
}

export function SceneRoot(props: Props) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%' }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: ACES_EXPOSURE,
      }}
    >
      <color attach="background" args={['#08060a']} />
      <PerspectiveCamera makeDefault position={[6.2, 7.2, 8.2]} fov={42} />
      <ambientLight intensity={0.18} color="#c9b8a8" />
      <directionalLight
        castShadow
        intensity={1.55}
        position={[4, 12, 6]}
        color="#fff5e6"
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.00035}
        shadow-camera-far={40}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />
      <directionalLight intensity={0.35} position={[-6, 5, -4]} color="#7e57c2" />
      <hemisphereLight intensity={0.22} color="#d1c4e9" groundColor="#1a1218" />
      <Suspense fallback={null}>
        <Environment preset="night" environmentIntensity={0.45} />
        <GrimdarkEnvironment />
        <ChessBoard3D {...props} />
        <ContactShadows position={[0, -0.1, 0]} opacity={0.55} scale={16} blur={2.8} far={14} />
      </Suspense>
      <SceneEffects />
      <OrbitControls
        enablePan
        minPolarAngle={0.25}
        maxPolarAngle={Math.PI / 2.15}
        minDistance={5.5}
        maxDistance={18}
        target={[0, 0.2, 0]}
      />
    </Canvas>
  )
}
