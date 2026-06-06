/**
 * convention/import — THE CONVENTION: every import is from an atom index (`@/x`), never a deep or
 * relative path. The atom's `index.ts` is its one public door (its content-uuid contract); reaching
 * past it to a deep internal (`@/x/y.ts`, a file) couples to what the atom never promised — the very
 * uncovered coupling [[tamper]]/import already prices as a gap that lowers tamper-[[cost]].
 *
 * This is the CONVENTION face of that law: a convention is followed-by-construction when its
 * coverage → 1. There is exactly one canonical measure — `importPurity` (the index-only fraction of
 * all `@/` imports, scanned LIVE over the real tree) — so this atom COMPOSES it rather than
 * re-deriving it (re-implementing the scan would be the duplication this audit hunts). Coverage IS
 * import purity: at 1 every import is from an index and the convention holds with zero entropy.
 *
 *   tsx src/convention/import/index.ts
 *
 * @audit coverage = importPurity() from @/tamper/import — scanned live over src, never hand-asserted
 * @see ../../tamper/import -- ../../cost -- ../../law -- ./SKILL.md
 */
import { importPurity } from '@/tamper/import'

/**
 * coverage ∈ [0,1] — the fraction of `@/` imports that read from an atom index (the convention).
 * Pure composition of the canonical `importPurity`: it is the index-only fraction by construction,
 * so it is already in [0,1] (the corpus is a non-empty tree of `@/` imports by architecture). No
 * default, no clamp — the value is the measurement.
 */
export const coverage = (): number => importPurity()

if (import.meta.url === 'file://' + process.argv[1]) {
  const c = coverage()
  console.log('convention/import — every import is from an atom index (@/x), never a deep/relative path:')
  console.log('  import-convention coverage = ' + (100 * c).toFixed(1) + '%  (1 ⇒ the convention holds with zero entropy)')
}
