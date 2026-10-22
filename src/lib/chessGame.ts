/**
 * Thin wrapper around chess.js — single place for move validation and board snapshots.
 * The 3D UI never talks to chess.js directly; it goes through this class.
 */
import { Chess, type Square } from 'chess.js'

export type GameSnapshot = {
  fen: string
  turn: 'w' | 'b'
  inCheck: boolean
  isGameOver: boolean
  result: string | null
}

export class ChessGame {
  private chess = new Chess()

  snapshot(): GameSnapshot {
    return {
      fen: this.chess.fen(),
      turn: this.chess.turn(),
      inCheck: this.chess.inCheck(),
      isGameOver: this.chess.isGameOver(),
      result: this.chess.isGameOver() ? this.resultMessage() : null,
    }
  }

  board(): ({ square: Square; type: string; color: 'w' | 'b' } | null)[][] {
    return this.chess.board()
  }

  legalMovesFrom(square: Square): Square[] {
    if (this.chess.isGameOver()) return []
    return this.chess
      .moves({ square, verbose: true })
      .map((m) => m.to as Square)
  }

  move(from: Square, to: Square, promotion?: 'q' | 'r' | 'b' | 'n'): boolean {
    try {
      const result = this.chess.move({ from, to, promotion: promotion ?? 'q' })
      return result !== null
    } catch {
      // chess.js throws on illegal moves; treat as "move rejected"
      return false
    }
  }

  reset(): void {
    this.chess.reset()
  }

  private resultMessage(): string {
    if (this.chess.isCheckmate()) {
      const winner = this.chess.turn() === 'w' ? 'Black' : 'White'
      return `Checkmate — ${winner} wins`
    }
    if (this.chess.isStalemate()) return 'Stalemate — draw'
    if (this.chess.isDraw()) return 'Draw'
    return 'Game over'
  }
}
