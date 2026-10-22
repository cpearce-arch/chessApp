/**
 * Top-level UI: header (turn, AI level), 3D viewport, piece legend, promotion modal.
 * Game rules live in useChessGame; this file only lays out HTML and passes props to SceneRoot.
 */
import { useState } from 'react'
import { useChessGame } from './hooks/useChessGame'
import { SceneRoot } from './components/SceneRoot'
import type { AiDifficulty } from './lib/chessAI'
import './App.css'

/** Human-readable promotion choices (chess piece letter → fantasy name). */
const PROMO_LABELS = {
  q: 'Dragon (Queen)',
  r: 'Golem (Rook)',
  b: 'Wizard (Bishop)',
  n: 'Ghost (Knight)',
} as const

export default function App() {
  const [aiDifficulty, setAiDifficulty] = useState<AiDifficulty>('medium')
  const {
    board,
    snapshot,
    selected,
    legalTargets,
    pendingPromotion,
    onSquareClick,
    promote,
    resetGame,
    aiThinking,
  } = useChessGame(true, aiDifficulty)

  const turnLabel =
    snapshot.isGameOver
      ? snapshot.result
      : aiThinking
        ? 'AI thinking…'
        : snapshot.turn === 'w'
          ? 'Your move (White)'
          : 'AI move (Black)'

  return (
    <div className="app">
      <header className="hud">
        <div>
          <h1>Fantasy Chess 3D</h1>
          <p className="subtitle">You play White vs AI Black — battle on a tavern tabletop</p>
        </div>
        <div className="status">
          <span className="pill">{turnLabel}</span>
          {snapshot.inCheck && !snapshot.isGameOver && (
            <span className="pill warn">Check!</span>
          )}
          <label className="difficulty">
            AI
            <select
              value={aiDifficulty}
              onChange={(e) => setAiDifficulty(e.target.value as AiDifficulty)}
              disabled={aiThinking}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <button type="button" onClick={resetGame} disabled={aiThinking}>
            New game
          </button>
        </div>
      </header>

      <main className="viewport">
        <SceneRoot
          board={board}
          selected={selected}
          legalTargets={legalTargets}
          onSquareClick={onSquareClick}
        />
      </main>

      <aside className="legend">
        <h2>Armies</h2>
        <ul>
          <li>Goblin — pawn</li>
          <li>Golem — rook</li>
          <li>Ghost — knight</li>
          <li>Wizard — bishop</li>
          <li>Dragon — queen</li>
          <li>Paladin — king</li>
        </ul>
        <p className="note">
          Grimdark cathedral set — PBR miniatures, stained glass, and hell-braziers. White dawn
          vs Black umbral palettes.
        </p>
      </aside>

      {pendingPromotion && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Promote pawn">
          <div className="modal">
            <h3>Promote your Goblin</h3>
            <p>Choose a champion:</p>
            <div className="promo-grid">
              {(Object.keys(PROMO_LABELS) as (keyof typeof PROMO_LABELS)[]).map((key) => (
                <button key={key} type="button" onClick={() => promote(key)}>
                  {PROMO_LABELS[key]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
