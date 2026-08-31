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

/**
 * The RATCHET floor for pull coverage — it may only ever be raised.
 *
 * The suite asserted a hand-typed 0.8 and the corpus measured 0.7946, so the bar had been
 * missed for longer than anyone knew, in a batch CI never reached. The CAUSE was not the
 * corpus: `vocabulary/words.ts` had been emitted on a machine where its declared dictionary
 * source (`/usr/share/dict/words`) was absent, so the shared set carried the schema.org and
 * standard-code terms and none of the English roots — `ledger`, `debit`, `algebra`, `wave`,
 * `skill` and 600-odd others read as ungrounded words in their own language.
 *
 * Re-emitted from all of its sources, the set is 2,943 roots and the coverage is 1: every atom
 * grounds. So the floor IS the horizon now, and the forcing function is real — a new atom whose
 * word grounds in nothing reddens this, which is exactly what the singularity claims.
 */
export const PULL_FLOOR = 1

/** The pull coverage: the fraction of atoms whose words ground (1 = the singularity has pulled all). */
export const pullFraction = (): number => (N.length === 0 ? 1 : N.filter((n) => isGrounded(n.atom)).length / N.length)

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/vocabulary — the meaning singularity (infinite gravity):')
  console.log('  pull coverage = ' + (100 * pullFraction()).toFixed(1) + '% · pulls("merge")=' + pulls('merge'))
}
