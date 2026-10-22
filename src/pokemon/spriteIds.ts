import type { PokemonRole } from './pieces'

/** National Pokédex ids for bundled HOME-style renders in public/pokemon/. */
export const POKEDEX_BY_ROLE: Record<PokemonRole, number> = {
  pawn: 172, // Pichu
  rook: 143, // Snorlax
  knight: 78, // Rapidash
  bishop: 65, // Alakazam
  queen: 150, // Mewtwo
  king: 493, // Arceus
}

export const ALL_SPRITE_IDS = Object.values(POKEDEX_BY_ROLE)

export function spriteUrlForRole(role: PokemonRole): string {
  const id = POKEDEX_BY_ROLE[role]
  const base = import.meta.env.BASE_URL ?? './'
  return `${base}pokemon/${id}.png`
}
