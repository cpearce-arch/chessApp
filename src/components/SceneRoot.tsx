import { ContactShadows, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import type { Square } from 'chess.js'
import { ChessBoard3D } from './ChessBoard3D'
import { TabletopScenery } from './fantasy/TabletopScenery'

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
    <Canvas shadows dpr={[1, 2]} style={{ width: '100%', height: '100%' }}>
      <color attach="background" args={['#120e14']} />
      <fog attach="fog" args={['#1a1218', 14, 32]} />
      <PerspectiveCamera makeDefault position={[6, 7, 8]} fov={45} />
      <ambientLight intensity={0.32} color="#ffe8d6" />
      <directionalLight
        castShadow
        intensity={1.35}
        position={[5, 10, 4]}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
      />
      <directionalLight intensity={0.45} position={[-3, 4, -5]} color="#ffe0b2" />
      <pointLight intensity={0.4} position={[-4, 6, -3]} color="#7bdff2" />
      <hemisphereLight intensity={0.25} color="#e8eaf6" groundColor="#1a2634" />
      <Suspense fallback={null}>
        <TabletopScenery />
        <ChessBoard3D {...props} />
        <ContactShadows position={[0, -0.1, 0]} opacity={0.4} scale={14} blur={2.4} far={12} />
      </Suspense>
      <OrbitControls
        enablePan
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={5}
        maxDistance={16}
        target={[0, 0, 0]}
      />
    </Canvas>
  )
}
