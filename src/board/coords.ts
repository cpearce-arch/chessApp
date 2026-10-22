/**
 * Maps chess square names (e.g. "e4") to 3D world coordinates.
 * The board lies in the X/Z plane; Y is up. One square = one world unit.
 */
import type { Square } from 'chess.js'

export const SQUARE_SIZE = 1
/** Centers the 8×8 grid so (0,0,0) is roughly the middle of the board. */
export const BOARD_OFFSET = 3.5

/** World X/Z for a square. White's back rank sits toward +Z. */
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
