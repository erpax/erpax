/**
 * quantum/vocabulary — the MEANING SINGULARITY: every atom's words ground in the shared
 * [[vocabulary]] (`isGrounded`), so the vocabulary has INFINITE GRAVITY — it pulls ALL atoms
 * (every word resolves to it; the grounding coverage → 1). It is the [[gravity]] well of language,
 * the [[singularity]] every word falls into — the densest core, where all meaning converges to one
 * shared set. Merges into [[vocabulary]]. Composes [[gravity]] · [[singularity]] · [[quantum]].
 *
 *   tsx src/quantum/vocabulary/index.ts
 *
 * @audit the pull is computed over the live matrix + vocabulary; never hand-asserted
 * @see ../../vocabulary -- ../../gravity -- ../../singularity -- ./SKILL.md
 */
import { UUID_MATRIX_NODES as N } from '@/uuid/matrix'
import { isGrounded } from '@/vocabulary'

/** Infinite gravity: the vocabulary pulls all words into one shared meaning-space (the singularity). */
export const INFINITE_GRAVITY = Number.POSITIVE_INFINITY

/** Does `atom` fall into the vocabulary singularity (its words ground in the shared set)? */
export const pulls = (atom: string): boolean => isGrounded(atom)

/** The pull coverage: the fraction of atoms whose words ground (1 = the singularity has pulled all). */
export const pullFraction = (): number => (N.length === 0 ? 1 : N.filter((n) => isGrounded(n.atom)).length / N.length)

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/vocabulary — the meaning singularity (infinite gravity):')
  console.log('  pull coverage = ' + (100 * pullFraction()).toFixed(1) + '% · pulls("merge")=' + pulls('merge'))
}
