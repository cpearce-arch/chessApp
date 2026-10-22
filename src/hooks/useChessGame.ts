/**
 * React hook: connects UI clicks to ChessGame and schedules AI replies.
 *
 * Uses a `tick` counter to re-read the engine after moves (ChessGame is mutable, not React state).
 * vsAi=true: human is always White; Black moves after a short delay via chooseAIMove.
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Square } from 'chess.js'
import { ChessGame } from '../lib/chessGame'
import { chooseAIMove, type AiDifficulty } from '../lib/chessAI'

export function useChessGame(vsAi = true, aiDifficulty: AiDifficulty = 'medium') {
  const [engine] = useState(() => new ChessGame())
  const [tick, setTick] = useState(0)
  const [selected, setSelected] = useState<Square | null>(null)
  const [pendingPromotion, setPendingPromotion] = useState<{
    from: Square
    to: Square
  } | null>(null)
  const [aiThinking, setAiThinking] = useState(false)

  const snapshot = useMemo(() => engine.snapshot(), [engine, tick])
  const board = useMemo(() => engine.board(), [engine, tick])

  const legalTargets = useMemo(() => {
    if (!selected) return [] as Square[]
    return engine.legalMovesFrom(selected)
  }, [engine, selected, tick])

  const refresh = useCallback(() => setTick((t) => t + 1), [])

  const resetGame = useCallback(() => {
    engine.reset()
    setSelected(null)
    setPendingPromotion(null)
    refresh()
  }, [engine, refresh])

  const completeMove = useCallback(
    (from: Square, to: Square, promotion?: 'q' | 'r' | 'b' | 'n') => {
      const moved = engine.move(from, to, promotion)
      if (moved) {
        setSelected(null)
        setPendingPromotion(null)
        refresh()
      }
      return moved
    },
    [engine, refresh],
  )

  const onSquareClick = useCallback(
    (square: Square) => {
      if (snapshot.isGameOver) return
      if (vsAi && snapshot.turn === 'b') return
      if (aiThinking) return

      const piece = board
        .flat()
        .find((p) => p?.square === square)

      if (selected) {
        if (legalTargets.includes(square)) {
          const movingPiece = board
            .flat()
            .find((p) => p?.square === selected)
          const isPromotion =
            movingPiece?.type === 'p' &&
            ((movingPiece.color === 'w' && square[1] === '8') ||
              (movingPiece.color === 'b' && square[1] === '1'))

          if (isPromotion) {
            setPendingPromotion({ from: selected, to: square })
            return
          }
          completeMove(selected, square)
          return
        }
      }

      if (piece && piece.color === snapshot.turn) {
        setSelected(square)
        return
      }

      setSelected(null)
    },
    [
      aiThinking,
      board,
      completeMove,
      legalTargets,
      selected,
      snapshot.isGameOver,
      snapshot.turn,
      vsAi,
    ],
  )

  // When it becomes Black's turn, run the AI after a human-readable pause.
  useEffect(() => {
    if (!vsAi || snapshot.isGameOver || snapshot.turn !== 'b' || pendingPromotion) {
      setAiThinking(false)
      return
    }

    setAiThinking(true)
    const delay = aiDifficulty === 'easy' ? 280 : aiDifficulty === 'medium' ? 450 : 650
    const timer = window.setTimeout(() => {
      const aiMove = chooseAIMove(snapshot.fen, aiDifficulty)
      if (aiMove) {
        completeMove(aiMove.from, aiMove.to, aiMove.promotion ?? 'q')
      }
      setAiThinking(false)
    }, delay)

    return () => {
      window.clearTimeout(timer)
      setAiThinking(false)
    }
  }, [
    aiDifficulty,
    completeMove,
    pendingPromotion,
    snapshot.fen,
    snapshot.isGameOver,
    snapshot.turn,
    tick,
    vsAi,
  ])

  const promote = useCallback(
    (choice: 'q' | 'r' | 'b' | 'n') => {
      if (!pendingPromotion) return
      completeMove(pendingPromotion.from, pendingPromotion.to, choice)
    },
    [completeMove, pendingPromotion],
  )

  return {
    board,
    snapshot,
    selected,
    legalTargets,
    pendingPromotion,
    onSquareClick,
    promote,
    resetGame,
    vsAi,
    aiDifficulty,
    aiThinking,
  }
}
