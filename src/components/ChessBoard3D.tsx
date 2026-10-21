import { useMemo } from 'react'
import type { Square } from 'chess.js'
import { PokemonPiece } from './PokemonPiece'
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
    const list: { square: Square; fenChar: string }[] = []
    for (const row of board) {
      for (const cell of row) {
        if (!cell) continue
        const fenChar =
          cell.color === 'w' ? cell.type.toUpperCase() : cell.type.toLowerCase()
        list.push({ square: cell.square, fenChar })
      }
    }
    return list
  }, [board])

  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[9.5, 9.5]} />
        <meshStandardMaterial color="#1a2634" roughness={0.95} />
      </mesh>

      {squares.map(({ square, light }) => {
        const [x, , z] = squareToWorld(square)
        const isSelected = selected === square
        const isTarget = legalTargets.includes(square)
        const base = light ? '#e8edf2' : '#3d5a80'
        let color = base
        if (isSelected) color = '#ffd166'
        else if (isTarget) color = light ? '#95d5b2' : '#40916c'

        return (
          <mesh
            key={square}
            position={[x, 0, z]}
            onClick={(e) => {
              e.stopPropagation()
              onSquareClick(square)
            }}
            receiveShadow
          >
            <boxGeometry args={[0.96, 0.12, 0.96]} />
            <meshStandardMaterial color={color} roughness={0.65} metalness={0.05} />
          </mesh>
        )
      })}

      {pieces.map(({ square, fenChar }) => {
        const [x, , z] = squareToWorld(square)
        return (
          <group key={`${square}-${fenChar}`} position={[x, 0.12, z]}>
            <PokemonPiece fenChar={fenChar} selected={selected === square} />
          </group>
        )
      })}
    </group>
  )
}
