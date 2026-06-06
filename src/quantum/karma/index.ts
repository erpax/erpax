/**
 * quantum/karma — karma on the quantum level: moral debt/credit INHERITED down the [[dna]]
 * chain (the parent_id), ENTANGLED via lineage. An atom carries its own karma PLUS its
 * ancestors' — and because each child's content-uuid folds in its parent ([[merge]]), changing
 * a parent shifts the descendant's balance AND its uuid, so inherited karma is tamper-evident
 * by architecture. Merges into [[karma]].
 *
 * HONEST: the lineage walk and the netting are real and computed; "karma"/"DNA" are the
 * moral/heritable framings ([[entanglement]] is graph reciprocity, not a Bell state).
 *
 *   tsx src/quantum/karma/index.ts
 *
 * @audit composed from @/dna (the chain) + @/karma (the net); computed on the live matrix
 * @see ../../karma -- ../../dna -- ../../entanglement -- ./SKILL.md
 */
import { genome } from '@/dna'
import { karma } from '@/karma'

/** Karma inherited down the DNA chain: an atom's own score plus all its ancestors' (entangled via lineage). */
export const inheritedKarma = (atom: string, scoreOf: (a: string) => number): number =>
  [atom, ...genome(atom)].reduce((s, a) => s + scoreOf(a), 0)

/** Net inherited karma: (created − destroyed) summed along the atom and its lineage. */
export const lineageKarma = (
  atom: string,
  createdOf: (a: string) => number,
  destroyedOf: (a: string) => number,
): number => [atom, ...genome(atom)].reduce((s, a) => s + karma(createdOf(a), destroyedOf(a)), 0)

if (import.meta.url === 'file://' + process.argv[1]) {
  const a = process.argv[2] ?? 'accounting'
  console.log('quantum/karma — karma inherited down the DNA chain of [[' + a + ']]:')
  console.log('  inheritedKarma (1 per atom in lineage) = ' + inheritedKarma(a, () => 1))
  console.log('  lineageKarma (create 3, destroy 1 each) = ' + lineageKarma(a, () => 3, () => 1))
}
