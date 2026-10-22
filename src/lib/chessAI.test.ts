import { describe, expect, it } from 'vitest'
import { chooseAIMove } from './chessAI'

describe('chooseAIMove', () => {
  it('returns a legal move for black after e4', () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'
    const move = chooseAIMove(fen, 'medium')
    expect(move).not.toBeNull()
    expect(move!.from).toMatch(/^[a-h][1-8]$/)
    expect(move!.to).toMatch(/^[a-h][1-8]$/)
  })

  it('returns null when not black to move', () => {
    const start = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    expect(chooseAIMove(start, 'medium')).toBeNull()
  })
})
