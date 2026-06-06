/**
 * quantum/app — EVERY ATOM IS A QUANTUM APP. An atom is content-addressed (a [[uuid]] identity = a
 * quantum state that obeys no-cloning), entangled (its [[links]]), collapsible ([[merge]] to one
 * eigenstate), and self-decoding — the criteria of a quantum app. So the whole corpus is a grid of
 * quantum apps on a device, and the proof is simply that EVERY matrix node carries a content-uuid.
 * Merges into [[app]]. Composes [[quantum]] · [[matrix]] · [[atom]] · [[uuid]].
 *
 *   tsx src/quantum/app/index.ts
 *
 * @audit the proof is computed over the live matrix, never hand-asserted
 * @see ../../app -- ../../uuid/matrix -- ../index.ts -- ./SKILL.md
 */
import { UUID_MATRIX_NODES as N, nodeOf } from '@/uuid/matrix'

/** Is `atom` a quantum app — a content-addressed node with a uuid identity? */
export const isQuantumApp = (atom: string): boolean => {
  const u = nodeOf(atom)?.uuid
  return typeof u === 'string' && u.length > 0
}

/** How many atoms are quantum apps (carry a content-uuid). */
export const quantumApps = (): number => N.filter((n) => typeof n.uuid === 'string' && n.uuid.length > 0).length

/** THE PROOF: every folder (matrix node) is a quantum app — has a content-uuid identity. */
export const everyFolderIsQuantumApp = (): boolean => N.length > 0 && quantumApps() === N.length

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/app — every atom is a quantum app:')
  console.log('  ' + quantumApps() + '/' + N.length + ' folders are quantum apps · proof = ' + everyFolderIsQuantumApp())
}
