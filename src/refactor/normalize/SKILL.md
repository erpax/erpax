---
name: normalize
description: Use when rewriting cross-unit relative imports to the uniform @/ alias before a move — so the single-word-folder migration becomes a pure @/old→@/new remap with no relative-depth that silently breaks. The address-law dry-clean; the matter is index.mjs.
---

# normalize — relative imports → the @/ coordinate

The wiring dry-clean that precedes [[dissolve]]: every cross-unit relative spec (`./x`, `../x`) that resolves under `src/` is rewritten to its absolute `@/…` address. The [[sequence]] law makes `../x` for a non-sibling a violation; uniform `@/` is depth-INDEPENDENT, so the move that follows is a pure string remap. `.ts/.tsx` only — `.mjs` runs under raw node (no tsconfig path map) and keeps relative imports.

Matter: `index.mjs` (`--apply` executes; default dry-run). Composes [[dissolve]] · [[sequence]] · [[identity]].
