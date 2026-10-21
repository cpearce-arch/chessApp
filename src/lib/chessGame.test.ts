import { describe, expect, it } from 'vitest'
import { ChessGame } from './chessGame'

describe('ChessGame', () => {
  it('starts with white to move', () => {
    const game = new ChessGame()
    expect(game.snapshot().turn).toBe('w')
  })

  it('accepts legal opening moves', () => {
    const game = new ChessGame()
    expect(game.move('e2', 'e4')).toBe(true)
    expect(game.snapshot().turn).toBe('b')
  })

  it('rejects illegal moves', () => {
    const game = new ChessGame()
    expect(game.move('e2', 'e5')).toBe(false)
  })
})
