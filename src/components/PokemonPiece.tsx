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

type Props = {
  fenChar: string
  selected?: boolean
}

const MODELS: Record<
  PokemonRole,
  ComponentType<{ body: string; accent: string; secondary: string; detail: string }>
> = {
  pawn: PichuModel,
  rook: SnorlaxModel,
  knight: RapidashModel,
  bishop: AlakazamModel,
  queen: MewtwoModel,
  king: ArceusModel,
}

const ROLE_SCALE: Record<PokemonRole, number> = {
  pawn: 0.92,
  rook: 1.05,
  knight: 1,
  bishop: 1.02,
  queen: 1.06,
  king: 1.08,
}

export function PokemonPiece({ fenChar, selected }: Props) {
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
    <group scale={ROLE_SCALE[role]}>
      {selected && (
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.4, 0.48, 32]} />
          <meshBasicMaterial color="#ffd166" transparent opacity={0.9} />
        </mesh>
      )}
      <Model body={meta.body} accent={meta.accent} secondary={meta.secondary} detail={meta.detail} />
    </group>
  )
}
