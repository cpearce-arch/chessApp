import type { Square } from 'chess.js'

export const SQUARE_SIZE = 1
export const BOARD_OFFSET = 3.5

/** Map chess square to world X/Z (Y is up). White sits on near side (positive Z). */
export function squareToWorld(square: Square): [number, number, number] {
  const file = square.charCodeAt(0) - 'a'.charCodeAt(0)
  const rank = parseInt(square[1]!, 10) - 1
  const x = file - BOARD_OFFSET
  const z = rank - BOARD_OFFSET
  return [x * SQUARE_SIZE, 0, z * SQUARE_SIZE]
}

export function isLightSquare(square: Square): boolean {
  const file = square.charCodeAt(0) - 'a'.charCodeAt(0)
  const rank = parseInt(square[1]!, 10) - 1
  return (file + rank) % 2 === 0
}

export function squareFromGrid(fileIndex: number, rankIndex: number): Square {
  const file = String.fromCharCode('a'.charCodeAt(0) + fileIndex)
  return `${file}${rankIndex + 1}` as Square
}
