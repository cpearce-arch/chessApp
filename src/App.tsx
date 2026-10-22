import { useChessGame } from './hooks/useChessGame'
import { SceneRoot } from './components/SceneRoot'
import './App.css'

const PROMO_LABELS = {
  q: 'Mewtwo (Queen)',
  r: 'Snorlax (Rook)',
  b: 'Alakazam (Bishop)',
  n: 'Rapidash (Knight)',
} as const

export default function App() {
  const {
    board,
    snapshot,
    selected,
    legalTargets,
    pendingPromotion,
    onSquareClick,
    promote,
    resetGame,
  } = useChessGame()

  const turnLabel = snapshot.turn === 'w' ? 'White' : 'Black'

  return (
    <div className="app">
      <header className="hud">
        <div>
          <h1>Pokémon Chess 3D</h1>
          <p className="subtitle">Web app — works in Chrome; drag to orbit, click squares to move</p>
        </div>
        <div className="status">
          <span className="pill">{snapshot.isGameOver ? snapshot.result : `${turnLabel} to move`}</span>
          {snapshot.inCheck && !snapshot.isGameOver && (
            <span className="pill warn">Check!</span>
          )}
          <button type="button" onClick={resetGame}>
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
        <h2>Party roster</h2>
        <ul>
          <li>Pichu — Pawn</li>
          <li>Snorlax — Rook</li>
          <li>Rapidash — Knight</li>
          <li>Alakazam — Bishop</li>
          <li>Mewtwo — Queen</li>
          <li>Arceus — King</li>
        </ul>
        <p className="note">
          Stylized 3D figures inspired by Pokémon roles. Run locally in the browser or the Mac
          desktop shell via Electron.
        </p>
      </aside>

      {pendingPromotion && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Promote pawn">
          <div className="modal">
            <h3>Evolve your Pichu</h3>
            <p>Choose a promotion form:</p>
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
