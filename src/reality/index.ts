/**
 * reality — the live, shipped state: what is ACTUALLY on main / deployed, versus the model. The live
 * [[matrix]] root is reality's fingerprint; a claim is REAL iff it matches the live root ([[anchor]] /
 * [[verification]]). Merging to main and [[deploy]]ing is the act of making the model real — the
 * model collapses into the one true current state. Composes [[deploy]] · [[matrix]] · [[anchor]] · [[verification]].
 *
 *   tsx src/reality/index.ts
 *
 * @audit reality = the live matrix root; computed, never hand-asserted
 * @see ../deploy -- ../uuid/matrix -- ../anchor -- ../verification -- ../quantum/reality -- ./SKILL.md
 */
import { matrixDigest } from '@/uuid/matrix'

/** The fingerprint of reality: the live matrix root (the one true current state). */
export const realityRoot = (): string => matrixDigest().root

/** Is a claimed root the real (live) one? — content-addressed truth. */
export const isReal = (claimedRoot: string): boolean => claimedRoot === realityRoot()

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('reality — the live root: ' + realityRoot())
}
