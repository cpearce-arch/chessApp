import type { ComponentType } from 'react'
import type { PokemonRole } from '../pokemon/pieces'
import { metaForFenPiece } from '../pokemon/pieces'
import {
  AlakazamModel,
  ArceusModel,
  MewtwoModel,
  PichuModel,
  RapidashModel,
  SnorlaxModel,
} from './pokemonCharacterModels'
import type { PaletteProps } from './pokemon/modelParts'

type Props = {
  fenChar: string
  color: 'w' | 'b'
  selected?: boolean
}

const MODELS: Record<PokemonRole, ComponentType<PaletteProps>> = {
  pawn: PichuModel,
  rook: SnorlaxModel,
  knight: RapidashModel,
  bishop: AlakazamModel,
  queen: MewtwoModel,
  king: ArceusModel,
}

const ROLE_SCALE: Record<PokemonRole, number> = {
  pawn: 0.94,
  rook: 1.08,
  knight: 1.02,
  bishop: 1.05,
  queen: 1.08,
  king: 1.1,
}

/** White faces +Z toward Black; Black faces -Z toward White. */
const FACING_Y: Record<'w' | 'b', number> = {
  w: 0,
  b: Math.PI,
}

export function PokemonPiece({ fenChar, color, selected }: Props) {
  const meta = metaForFenPiece(fenChar)
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
  const Model = MODELS[role]

  return (
    <group rotation={[0, FACING_Y[color], 0]} scale={ROLE_SCALE[role]}>
      {selected && (
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.42, 0.5, 32]} />
          <meshBasicMaterial color="#ffd166" transparent opacity={0.9} />
        </mesh>
      )}
      <Model body={meta.body} accent={meta.accent} secondary={meta.secondary} detail={meta.detail} />
    </group>
  )
}
