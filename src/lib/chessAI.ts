/**
 * Black player AI: minimax search with alpha–beta pruning.
 *
 * "Minimax" means Black tries to minimize White's advantage (scores are from White's view).
 * "Alpha–beta" skips branches that cannot beat the best line already found — faster, same result.
 * Depth is shallow (1–3 plies) so moves feel instant in the browser.
 */
import { Chess, type Square } from 'chess.js'

export type AiDifficulty = 'easy' | 'medium' | 'hard'

export type AiMove = {
  from: Square
  to: Square
  promotion?: 'q' | 'r' | 'b' | 'n'
}

/** Material values for position scoring (centipawn-style scale). */
const PIECE_VALUE: Record<string, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 0,
}

/** How many half-moves (plies) to look ahead per difficulty. */
const DEPTH: Record<AiDifficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
}

/** Small bonus for occupying central squares. */
const CENTER_BONUS: Partial<Record<Square, number>> = {
  d4: 12,
  e4: 12,
  d5: 12,
  e5: 12,
  c3: 4,
  f3: 4,
  c6: 4,
  f6: 4,
}

/** Positive score favors White; negative favors Black. */
function evaluate(chess: Chess): number {
  if (chess.isCheckmate()) {
    return chess.turn() === 'w' ? -100_000 : 100_000
  }
  if (chess.isDraw()) return 0

  let score = 0
  for (const row of chess.board()) {
    for (const cell of row) {
      if (!cell) continue
      const value = PIECE_VALUE[cell.type] ?? 0
      const sign = cell.color === 'w' ? 1 : -1
      score += sign * value
      const center = CENTER_BONUS[cell.square as Square]
      if (center) score += sign * center
    }
  }
  if (chess.inCheck()) {
    score += chess.turn() === 'w' ? -25 : 25
  }
  return score
}

/** Try captures first so search cuts off bad lines sooner. */
function orderedMoves(chess: Chess) {
  return chess.moves({ verbose: true }).sort((a, b) => {
    const capA = a.captured ? PIECE_VALUE[a.captured] ?? 0 : 0
    const capB = b.captured ? PIECE_VALUE[b.captured] ?? 0 : 0
    return capB - capA
  })
}

function minimax(chess: Chess, depth: number, alpha: number, beta: number): number {
  if (depth === 0 || chess.isGameOver()) {
    return evaluate(chess)
  }

  const moves = orderedMoves(chess)
  if (chess.turn() === 'w') {
    let maxEval = -Infinity
    for (const move of moves) {
      chess.move(move)
      maxEval = Math.max(maxEval, minimax(chess, depth - 1, alpha, beta))
      chess.undo()
      alpha = Math.max(alpha, maxEval)
      if (beta <= alpha) break
    }
    return maxEval
  }

  let minEval = Infinity
  for (const move of moves) {
    chess.move(move)
    minEval = Math.min(minEval, minimax(chess, depth - 1, alpha, beta))
    chess.undo()
    beta = Math.min(beta, minEval)
    if (beta <= alpha) break
  }
  return minEval
}

function toAiMove(m: { from: string; to: string; promotion?: string }): AiMove {
  return {
    from: m.from as Square,
    to: m.to as Square,
    promotion: (m.promotion as AiMove['promotion']) ?? 'q',
  }
}

/** Pick Black's move from a FEN string. Returns null if not Black's turn or game over. */
export function chooseAIMove(fen: string, difficulty: AiDifficulty): AiMove | null {
  const chess = new Chess(fen)
  if (chess.isGameOver() || chess.turn() !== 'b') return null

  const moves = orderedMoves(chess)
  if (moves.length === 0) return null

  if (difficulty === 'easy' && Math.random() < 0.5) {
    return toAiMove(moves[Math.floor(Math.random() * moves.length)]!)
  }

  const depth = DEPTH[difficulty]
  const scored: { move: (typeof moves)[0]; score: number }[] = []

  for (const move of moves) {
    chess.move(move)
    const score = depth <= 1 ? evaluate(chess) : minimax(chess, depth - 1, -Infinity, Infinity)
    chess.undo()
    scored.push({ move, score })
  }

  scored.sort((a, b) => a.score - b.score)

  if (difficulty === 'easy') {
    const pool = scored.slice(0, Math.min(4, scored.length))
    return toAiMove(pool[Math.floor(Math.random() * pool.length)]!.move)
  }

  return toAiMove(scored[0]!.move)
}
