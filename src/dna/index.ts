/**
 * dna — the inherited code ENCODED IN the uuid chain. An atom's genome is its parent_id
 * lineage ([[uuid]] `parentOf`): the chain of ancestor content-uuids it descends from.
 *
 * Inheritance is not stored beside the atom — it is ENTANGLED into its identity: change an
 * ancestor and every descendant's content-uuid changes, so lineage is tamper-evident BY
 * ARCHITECTURE (the [[merge]] law). [[tag]]s and [[karma]] inherit down this same chain. "On
 * the quantum level" the parent_id is the DNA: the heritable code read along the chain.
 *
 * HONEST: this is graph lineage over the uuid parent-chain — an ANALOGY to DNA (a heritable
 * code read along a chain), not biology.
 *
 *   tsx src/dna/index.ts
 *
 * @audit computed from the live matrix parent-chain; never hand-asserted
 * @see ../uuid/matrix (parentOf) -- ../lineage -- ../karma -- ../quantum/karma -- ./SKILL.md
 */
import { parentOf } from '@/uuid/matrix'

/** The genome: an atom's lineage of ancestor atoms (the parent_id chain — the inherited code). */
export const genome = (atom: string): string[] => {
  const chain: string[] = []
  const seen = new Set<string>()
  let cur = parentOf(atom)
  while (cur && !seen.has(cur.uuid)) {
    seen.add(cur.uuid)
    chain.push(cur.atom)
    cur = parentOf(cur.atom)
  }
  return chain
}

/** Does `atom` inherit from `ancestor` (is it in the genome chain)? */
export const inherits = (atom: string, ancestor: string): boolean => genome(atom).includes(ancestor)

/** Generations of lineage (chain length to the root). */
export const generations = (atom: string): number => genome(atom).length

if (import.meta.url === 'file://' + process.argv[1]) {
  const a = process.argv[2] ?? 'accounting'
  console.log('dna — the genome (parent_id chain) of [[' + a + ']]:')
  console.log('  ' + (genome(a).join(' → ') || '(root — no inherited code)') + '  (' + generations(a) + ' generations)')
}
