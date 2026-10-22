/**
 * Fantasy army colors: separate palettes for White (Dawn) and Black (Umbral).
 * metaForFenPiece() picks colors from the letter case in FEN (uppercase = White).
 */
export type FantasyRole =
  | 'pawn'
  | 'rook'
  | 'knight'
  | 'bishop'
  | 'queen'
  | 'king'

export interface FantasyPieceMeta {
  name: string
  role: FantasyRole
  body: string
  accent: string
  secondary: string
  detail: string
  /** Capes, sashes, robe lining */
  cloth: string
  /** Metal trim, buckles, hat bands */
  trim: string
}

export type PiecePalette = Pick<
  FantasyPieceMeta,
  'body' | 'accent' | 'secondary' | 'detail' | 'cloth' | 'trim'
>

/** Dawn covenant — warm metals, bright cloth, gold trim. */
export const PALETTE_WHITE: Record<FantasyRole, PiecePalette> = {
  pawn: {
    body: '#72bf55',
    accent: '#d4a24a',
    secondary: '#a5d86a',
    detail: '#fff59d',
    cloth: '#6d4c41',
    trim: '#ffca28',
  },
  rook: {
    body: '#b0bec5',
    accent: '#78909c',
    secondary: '#eceff1',
    detail: '#00e5ff',
    cloth: '#546e7a',
    trim: '#80deea',
  },
  knight: {
    body: '#fafafa',
    accent: '#b39ddb',
    secondary: '#ede7f6',
    detail: '#651fff',
    cloth: '#e1bee7',
    trim: '#d1c4e9',
  },
  bishop: {
    body: '#3949ab',
    accent: '#ffd54f',
    secondary: '#e8eaf6',
    detail: '#82b1ff',
    cloth: '#1a237e',
    trim: '#ffecb3',
  },
  queen: {
    body: '#e53935',
    accent: '#ffb300',
    secondary: '#ffcdd2',
    detail: '#ffeb3b',
    cloth: '#b71c1c',
    trim: '#ffd54f',
  },
  king: {
    body: '#eceff1',
    accent: '#ffc107',
    secondary: '#cfd8dc',
    detail: '#455a64',
    cloth: '#1565c0',
    trim: '#ffe082',
  },
}

/** Umbral host — basalt, void purples, ember and toxic accents. */
export const PALETTE_BLACK: Record<FantasyRole, PiecePalette> = {
  pawn: {
    body: '#33691e',
    accent: '#5d4037',
    secondary: '#558b2f',
    detail: '#c6ff00',
    cloth: '#3e2723',
    trim: '#827717',
  },
  rook: {
    body: '#37474f',
    accent: '#263238',
    secondary: '#455a64',
    detail: '#ea80fc',
    cloth: '#212121',
    trim: '#ce93d8',
  },
  knight: {
    body: '#424242',
    accent: '#1b5e20',
    secondary: '#616161',
    detail: '#69f0ae',
    cloth: '#212121',
    trim: '#b9f6ca',
  },
  bishop: {
    body: '#311b92',
    accent: '#76ff03',
    secondary: '#4527a0',
    detail: '#b388ff',
    cloth: '#1a0033',
    trim: '#ccff90',
  },
  queen: {
    body: '#4a148c',
    accent: '#7c4dff',
    secondary: '#311b92',
    detail: '#18ffff',
    cloth: '#120338',
    trim: '#e040fb',
  },
  king: {
    body: '#37474f',
    accent: '#ff5252',
    secondary: '#263238',
    detail: '#ff8a80',
    cloth: '#b71c1c',
    trim: '#ffcdd2',
  },
}

const NAMES: Record<FantasyRole, string> = {
  pawn: 'Goblin',
  rook: 'Golem',
  knight: 'Ghost',
  bishop: 'Wizard',
  queen: 'Dragon',
  king: 'Paladin',
}

const LETTER_TO_ROLE: Record<string, FantasyRole> = {
  p: 'pawn',
  r: 'rook',
  n: 'knight',
  b: 'bishop',
  q: 'queen',
  k: 'king',
}

export function roleFromLetter(letter: string | undefined): FantasyRole {
  if (!letter) return 'pawn'
  return LETTER_TO_ROLE[letter.toLowerCase()] ?? 'pawn'
}

export function metaForFenPiece(fenChar: string): FantasyPieceMeta {
  const isWhite = fenChar === fenChar.toUpperCase()
  const role = roleFromLetter(fenChar)
  const colors = isWhite ? PALETTE_WHITE[role] : PALETTE_BLACK[role]
  return { name: NAMES[role], role, ...colors }
}
