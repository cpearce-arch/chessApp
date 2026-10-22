import type { ComponentType } from 'react'
import type { FantasyRole } from '../fantasy/pieces'
import { metaForFenPiece } from '../fantasy/pieces'
import {
  DragonModel,
  GoblinModel,
  GolemModel,
  GhostModel,
  PaladinModel,
  WizardModel,
} from './fantasyCreatureModels'
import type { PaletteProps } from './fantasy/modelParts'

type Props = {
  fenChar: string
  color: 'w' | 'b'
  selected?: boolean
}

const MODELS: Record<FantasyRole, ComponentType<PaletteProps>> = {
  pawn: GoblinModel,
  rook: GolemModel,
  knight: GhostModel,
  bishop: WizardModel,
  queen: DragonModel,
  king: PaladinModel,
}

const ROLE_SCALE: Record<FantasyRole, number> = {
  pawn: 0.96,
  rook: 1.08,
  knight: 1.02,
  bishop: 1.05,
  queen: 1.1,
  king: 1.08,
}

const FACING_Y: Record<'w' | 'b', number> = {
  w: 0,
  b: Math.PI,
}

export function FantasyPiece({ fenChar, color, selected }: Props) {
  const meta = metaForFenPiece(fenChar)
  const role = roleFromFen(fenChar)
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

function roleFromFen(fenChar: string): FantasyRole {
  const map: Record<string, FantasyRole> = {
    p: 'pawn',
    r: 'rook',
    n: 'knight',
    b: 'bishop',
    q: 'queen',
    k: 'king',
  }
  return map[fenChar.toLowerCase()] ?? 'pawn'
}
