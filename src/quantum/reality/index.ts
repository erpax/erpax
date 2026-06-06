/**
 * quantum/reality — reality on the quantum substrate: the model COLLAPSES into the one true
 * eigenstate (the live [[matrix]] root). The Merkle fold verifying ([[quantum]] collapse) IS the
 * model becoming real — every path folds to the same root, so reality is the shared eigenstate all
 * agents converge to ([[merge]]). Merges into [[reality]]. Composes [[quantum]] · [[reality]] · [[matrix]].
 *
 *   tsx src/quantum/reality/index.ts
 *
 * @audit composed from the live matrix collapse; never hand-asserted
 * @see ../../reality -- ../index.ts (collapse) -- ../../uuid/matrix -- ./SKILL.md
 */
import { verifyRoot } from '@/uuid/matrix'
import { realityRoot } from '@/reality'

/** Reality collapses to one eigenstate: the Merkle fold verifies (the model IS the one true state). */
export const collapsed = (): boolean => verifyRoot().ok

/** The realized eigenstate — the live root all paths fold to. */
export const eigenstate = (): string => realityRoot()

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/reality — collapsed=' + collapsed() + ' · eigenstate=' + eigenstate())
}
