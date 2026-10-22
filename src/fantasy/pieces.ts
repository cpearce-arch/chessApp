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
}

export const FANTASY_BY_ROLE: Record<FantasyRole, FantasyPieceMeta> = {
  pawn: {
    name: 'Goblin',
    role: 'pawn',
    body: '#5d8a45',
    accent: '#8b5a2b',
    secondary: '#7cb342',
    detail: '#3e2723',
  },
  rook: {
    name: 'Golem',
    role: 'rook',
    body: '#78909c',
    accent: '#546e7a',
    secondary: '#455a64',
    detail: '#26c6da',
  },
  knight: {
    name: 'Ghost',
    role: 'knight',
    body: '#e8eaf6',
    accent: '#7e57c2',
    secondary: '#b39ddb',
    detail: '#311b92',
  },
  bishop: {
    name: 'Wizard',
    role: 'bishop',
    body: '#3949ab',
    accent: '#ffd54f',
    secondary: '#e8eaf6',
    detail: '#1a237e',
  },
  queen: {
    name: 'Dragon',
    role: 'queen',
    body: '#c62828',
    accent: '#ff6f00',
    secondary: '#8e0000',
    detail: '#ffeb3b',
  },
  king: {
    name: 'Paladin',
    role: 'king',
    body: '#cfd8dc',
    accent: '#ffc107',
    secondary: '#eceff1',
    detail: '#37474f',
  },
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
  const base = FANTASY_BY_ROLE[role]
  if (isWhite) return base
  return {
    ...base,
    body: shade(base.body, -0.22),
    accent: shade(base.accent, -0.18),
    secondary: shade(base.secondary, -0.25),
    detail: shade(base.detail, -0.1),
  }
}

function shade(hex: string, amount: number): string {
  const raw = hex.replace('#', '')
  const num = parseInt(raw, 16)
  const r = clamp(((num >> 16) & 0xff) * (1 + amount))
  const g = clamp(((num >> 8) & 0xff) * (1 + amount))
  const b = clamp((num & 0xff) * (1 + amount))
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

function clamp(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)))
}
