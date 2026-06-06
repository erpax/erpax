/**
 * convention/shallow — IMPORT THE INDEX, NOT A DEEP FILE. The naming convention for couplings:
 * an import is SHALLOW when it reaches an atom's index (`@/x`, or a sub-atom `@/x/y` that is itself
 * a dir carrying an index) — the one public door — and DEEP when it reaches past the seal to an
 * internal file (`@/x/y.ts`). Shallow imports keep the import graph sealed; deep ones are uncovered
 * couplings a tamper can change behind the public face.
 *
 * This is the CONVENTION face (the named principle) of the matter-twin [[tamper]]/import, which
 * already computes the cost. So this atom does NOT re-scan the tree — it COMPOSES `importPurity`
 * (DRY: the one canonical import-graph reader). `coverage()` is that index-only fraction, the live
 * shallowness of the whole corpus; it is in [0,1] by construction (a fraction of a non-empty,
 * architecturally-guaranteed import set), with NO default — the value is the law, measured.
 *
 *   tsx src/convention/shallow/index.ts
 *
 * @audit coverage = importPurity() read live from @/tamper/import; never re-implemented, never defaulted
 * @see ../../tamper/import (the matter-twin cost) -- ../../law -- ./SKILL.md
 */
import { importPurity } from '@/tamper/import'

/**
 * The corpus's SHALLOW-import coverage ∈ [0,1]: the index-only fraction of all `@/` imports
 * (index `@/x` or real sub-atom-with-index ÷ total `@/` imports). Composes the canonical
 * `importPurity` — the single source for the import-graph; computed LIVE over the real tree.
 */
export function coverage(): number {
  return importPurity()
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const c = coverage()
  console.log('convention/shallow — import the index, not a deep file:')
  console.log('  shallow-import coverage (index-only fraction) = ' + (100 * c).toFixed(1) + '%')
  console.log('  ' + (c === 1 ? 'sealed — every import is shallow' : 'a deep import is open — coverage < 1'))
}
