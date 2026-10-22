import type { PokemonRole } from '../pokemon/pieces'
import { PokemonSpritePiece } from './PokemonSpritePiece'

type Props = {
  fenChar: string
  color: 'w' | 'b'
  selected?: boolean
}

const ROLE_SCALE: Record<PokemonRole, number> = {
  pawn: 1,
  rook: 1.05,
  knight: 1,
  bishop: 1,
  queen: 1.02,
  king: 1.04,
}

export function PokemonPiece({ fenChar, color, selected }: Props) {
  const fenRole = fenChar.toLowerCase()
  const roleMap: Record<string, PokemonRole> = {
    p: 'pawn',
    r: 'rook',
    n: 'knight',
    b: 'bishop',
    q: 'queen',
    k: 'king',
  }
  const role = roleMap[fenRole] ?? 'pawn'

  return (
    <group scale={ROLE_SCALE[role]}>
      {selected && (
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.44, 0.52, 32]} />
          <meshBasicMaterial color="#ffd166" transparent opacity={0.9} />
        </mesh>
      )}
      <PokemonSpritePiece role={role} color={color} />
    </group>
  )
}
