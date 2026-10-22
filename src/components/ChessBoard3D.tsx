import { useMemo } from 'react'
import type { Square } from 'chess.js'
import { FantasyPiece } from './FantasyPiece'
import { stoneRoughnessMap } from './fantasy/proceduralTextures'
import { isLightSquare, squareFromGrid, squareToWorld } from '../board/coords'

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

export function ChessBoard3D({ board, selected, legalTargets, onSquareClick }: Props) {
  const squares = useMemo(() => {
    const list: { square: Square; light: boolean }[] = []
    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const square = squareFromGrid(file, rank)
        list.push({ square, light: isLightSquare(square) })
      }
    }
    return list
  }, [])

  const pieces = useMemo(() => {
    const list: { square: Square; fenChar: string; color: 'w' | 'b' }[] = []
    for (const row of board) {
      for (const cell of row) {
        if (!cell) continue
        const fenChar =
          cell.color === 'w' ? cell.type.toUpperCase() : cell.type.toLowerCase()
        list.push({ square: cell.square, fenChar, color: cell.color })
      }
    }
    return list
  }, [board])

  return (
    <group>
      {squares.map(({ square, light }) => {
        const [x, , z] = squareToWorld(square)
        const isSelected = selected === square
        const isTarget = legalTargets.includes(square)
        const baseLight = light ? '#d5cfc4' : '#3a3632'
        const baseDark = light ? '#8a8178' : '#1f1c19'
        let color = light ? baseLight : baseDark
        let emissive = '#000000'
        let intensity = 0
        if (isSelected) {
          color = '#ffd166'
          emissive = '#ffb300'
          intensity = 0.25
        } else if (isTarget) {
          color = light ? '#a5d6a7' : '#2e7d32'
          emissive = '#69f0ae'
          intensity = 0.12
        }

        return (
          <mesh
            key={square}
            position={[x, 0, z]}
            onClick={(e) => {
              e.stopPropagation()
              onSquareClick(square)
            }}
            receiveShadow
            castShadow
          >
            <boxGeometry args={[0.96, 0.12, 0.96]} />
            <meshPhysicalMaterial
              color={color}
              roughness={light ? 0.42 : 0.78}
              metalness={light ? 0.12 : 0.04}
              roughnessMap={stoneRoughnessMap()}
              emissive={emissive}
              emissiveIntensity={intensity}
              clearcoat={light ? 0.35 : 0.08}
              clearcoatRoughness={0.4}
              envMapIntensity={1.05}
            />
          </mesh>
        )
      })}

      {pieces.map(({ square, fenChar, color }) => {
        const [x, , z] = squareToWorld(square)
        return (
          <group key={`${square}-${fenChar}`} position={[x, 0.06, z]}>
            <FantasyPiece
              fenChar={fenChar}
              color={color}
              selected={selected === square}
            />
          </group>
        )
      })}
    </group>
  )
}
