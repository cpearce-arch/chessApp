import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import type { Square } from 'chess.js'
import { ChessBoard3D } from './ChessBoard3D'

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
      <color attach="background" args={['#0f1419']} />
      <PerspectiveCamera makeDefault position={[6, 7, 8]} fov={45} />
      <ambientLight intensity={0.45} />
      <directionalLight
        castShadow
        intensity={1.2}
        position={[5, 10, 4]}
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight intensity={0.35} position={[-4, 6, -3]} color="#7bdff2" />
      <ChessBoard3D {...props} />
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
