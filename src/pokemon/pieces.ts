export type PokemonRole =
  | 'pawn'
  | 'rook'
  | 'knight'
  | 'bishop'
  | 'queen'
  | 'king'

export interface PokemonPieceMeta {
  name: string
  role: PokemonRole
  /** Main fur / skin */
  body: string
  /** Mane, belly, psychic glow, etc. */
  accent: string
  /** Second tone (belly, face, tail) */
  secondary: string
  /** Small details (ear tips, eyes, wheel) */
  detail: string
  tagline: string
}

/** Stylized Pokémon silhouettes (original 3D geometry, not official assets). */
export const POKEMON_BY_ROLE: Record<PokemonRole, PokemonPieceMeta> = {
  pawn: {
    name: 'Pichu',
    role: 'pawn',
    body: '#ffd54f',
    accent: '#ff8fab',
    secondary: '#fff176',
    detail: '#2d2d2d',
    tagline: 'Tiny spark on the front line',
  },
  rook: {
    name: 'Snorlax',
    role: 'rook',
    body: '#1e6b5c',
    accent: '#145246',
    secondary: '#f5ead6',
    detail: '#0d3d34',
    tagline: 'Immovable wall',
  },
  knight: {
    name: 'Rapidash',
    role: 'knight',
    body: '#fce4c4',
    accent: '#ff5722',
    secondary: '#fff3e0',
    detail: '#5d4037',
    tagline: 'Leaps in an L',
  },
  bishop: {
    name: 'Alakazam',
    role: 'bishop',
    body: '#ffc107',
    accent: '#6a1b9a',
    secondary: '#ffecb3',
    detail: '#4a148c',
    tagline: 'Diagonal mind',
  },
  queen: {
    name: 'Mewtwo',
    role: 'queen',
    body: '#b0bec5',
    accent: '#9575cd',
    secondary: '#eceff1',
    detail: '#37474f',
    tagline: 'Psychic commander',
  },
  king: {
    name: 'Arceus',
    role: 'king',
    body: '#fffde7',
    accent: '#ffc107',
    secondary: '#fafafa',
    detail: '#ffb300',
    tagline: 'Protect at all costs',
  },
}

const PIECE_LETTER_TO_ROLE: Record<string, PokemonRole> = {
  p: 'pawn',
  r: 'rook',
  n: 'knight',
  b: 'bishop',
  q: 'queen',
  k: 'king',
}

export function roleFromChessPieceLetter(letter: string | undefined): PokemonRole {
  if (!letter) return 'pawn'
  return PIECE_LETTER_TO_ROLE[letter.toLowerCase()] ?? 'pawn'
}

export function metaForFenPiece(fenChar: string): PokemonPieceMeta {
  const isWhite = fenChar === fenChar.toUpperCase()
  const role = roleFromChessPieceLetter(fenChar)
  const base = POKEMON_BY_ROLE[role]
  if (isWhite) return base
  return {
    ...base,
    body: shadeColor(base.body, -0.28),
    accent: shadeColor(base.accent, -0.2),
    secondary: shadeColor(base.secondary, -0.25),
    detail: shadeColor(base.detail, -0.15),
  }
}

function shadeColor(hex: string, amount: number): string {
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
