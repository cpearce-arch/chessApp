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
  accent: string
  body: string
  tagline: string
}

/** Stylized Pokémon stand-ins per chess role (original 3D shapes, not official assets). */
export const POKEMON_BY_ROLE: Record<PokemonRole, PokemonPieceMeta> = {
  pawn: {
    name: 'Pichu',
    role: 'pawn',
    accent: '#f7d046',
    body: '#ffe566',
    tagline: 'Tiny spark on the front line',
  },
  rook: {
    name: 'Snorlax',
    role: 'rook',
    accent: '#2ecc71',
    body: '#1e8449',
    tagline: 'Immovable wall',
  },
  knight: {
    name: 'Rapidash',
    role: 'knight',
    accent: '#ff6b35',
    body: '#f4a261',
    tagline: 'Leaps in an L',
  },
  bishop: {
    name: 'Alakazam',
    role: 'bishop',
    accent: '#9b59b6',
    body: '#6c3483',
    tagline: 'Diagonal mind',
  },
  queen: {
    name: 'Mewtwo',
    role: 'queen',
    accent: '#bdc3c7',
    body: '#7f8c8d',
    tagline: 'Psychic commander',
  },
  king: {
    name: 'Arceus',
    role: 'king',
    accent: '#ecf0f1',
    body: '#d4ac0d',
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
    body: shadeColor(base.body, -0.35),
    accent: shadeColor(base.accent, -0.25),
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
