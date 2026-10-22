import { Billboard, useTexture } from '@react-three/drei'
import { SRGBColorSpace } from 'three'
import type { PokemonRole } from '../pokemon/pieces'
import { spriteUrlForRole } from '../pokemon/spriteIds'

type Props = {
  role: PokemonRole
  color: 'w' | 'b'
}

const SPRITE_HEIGHT: Record<PokemonRole, number> = {
  pawn: 0.72,
  rook: 0.95,
  knight: 0.88,
  bishop: 0.9,
  queen: 0.92,
  king: 0.94,
}

const SPRITE_WIDTH: Record<PokemonRole, number> = {
  pawn: 0.62,
  rook: 0.88,
  knight: 0.78,
  bishop: 0.72,
  queen: 0.68,
  king: 0.75,
}

export function PokemonSpritePiece({ role, color }: Props) {
  const texture = useTexture(spriteUrlForRole(role))
  texture.colorSpace = SRGBColorSpace

  const h = SPRITE_HEIGHT[role]
  const w = SPRITE_WIDTH[role]
  const pedestal = color === 'w' ? '#e2e8f0' : '#334155'
  const ring = color === 'w' ? '#94a3b8' : '#64748b'

  return (
    <group>
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.38, 0.44, 0.18, 28]} />
        <meshStandardMaterial color={pedestal} metalness={0.35} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.36, 0.44, 32]} />
        <meshStandardMaterial color={ring} metalness={0.5} roughness={0.35} />
      </mesh>

      <Billboard follow lockX={false} lockY={false} lockZ={false}>
        <mesh position={[0, 0.22 + h / 2, 0]} castShadow>
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial
            map={texture}
            transparent
            alphaTest={0.06}
            toneMapped={false}
            depthWrite
          />
        </mesh>
      </Billboard>

      {/* Second crossed plane for depth when orbiting (not camera-locked). */}
      <mesh position={[0, 0.22 + h / 2, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <planeGeometry args={[w * 0.85, h * 0.85]} />
        <meshBasicMaterial
          map={texture}
          transparent
          alphaTest={0.06}
          toneMapped={false}
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
