# Piece artwork (maximum likeness)

Chess pieces use **Pokémon HOME–style character renders** bundled under `public/pokemon/` (sourced from [PokeAPI sprites](https://github.com/PokeAPI/sprites) at build time).

| Role | Species | Dex # |
|------|---------|-------|
| Pawn | Pichu | 172 |
| Rook | Snorlax | 143 |
| Knight | Rapidash | 78 |
| Bishop | Alakazam | 65 |
| Queen | Mewtwo | 150 |
| King | Arceus | 493 |

These images are **fan use** for a non-commercial hobby project. Pokémon © Nintendo / Game Freak / Creatures. This repo is not affiliated with or endorsed by them.

To refresh assets:

```bash
./scripts/fetch-pokemon-sprites.sh
```

Procedural 3D fallbacks remain in `src/components/pokemonCharacterModels.tsx` for reference but are not used in the live board.
