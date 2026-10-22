import type { ComponentType } from 'react'
import { Text } from '@react-three/drei'
import type { PokemonRole } from '../pokemon/pieces'
import { metaForFenPiece } from '../pokemon/pieces'
import { LABEL_FONT_URL } from '../setup/runtimeDependencies'
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
    <group>
      {selected && (
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.38, 0.46, 32]} />
          <meshBasicMaterial color="#ffd166" transparent opacity={0.9} />
        </mesh>
      )}
      <Model body={meta.body} accent={meta.accent} secondary={meta.secondary} detail={meta.detail} />
      <Text
        position={[0, 1.08, 0]}
        font={LABEL_FONT_URL}
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {meta.name}
      </Text>
    </group>
  )
}
