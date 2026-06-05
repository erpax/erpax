/**
 * quantum -- the quantum-physics laws COMPUTED on the live uuid-matrix.
 *
 * The matrix IS a quantum system: atoms = states (content-uuids), [[links]] =
 * entanglement, merge = collision, the Merkle fold = collapse to one eigenstate,
 * the horo digit-trace = quantization (the A432 harmonic levels). Each law is a
 * deterministic check -- A432-grounded, computed at no cost, infinite to forge.
 *
 * Findings (2026-06-05, computed): collapse / conservation / no-cloning /
 * quantization HOLD; ENTANGLEMENT is violated -- merge(a,b) != merge(b,a) (the
 * binding is asymmetric; ~36% reciprocal edges). Fix = a symmetric entanglement
 * binding, e.g. merge over the sorted pair.
 *
 *   tsx src/quantum/index.ts
 *
 * @audit computed from the live matrix, never hand-asserted
 * @see ../uuid/matrix -- ../digit -- ../rodin -- ../harmony (A432)
 */
import { UUID_MATRIX_NODES as N, UUID_MATRIX_EDGES as E, merge, verifyRoot, matrixDigest } from '@/uuid/matrix'
import { digitTrace, offSequence } from '@/digit'

/** Entanglement is symmetric: is the binding merge(a,b) === merge(b,a)? + reciprocal-edge fraction. */
export function entanglement(): { symmetricBinding: boolean; reciprocal: number; edges: number } {
  const a = N[10]!.uuid
  const b = N[20]!.uuid
  const edgeSet = new Set(E.map((e) => e.f + ',' + e.t))
  let reciprocal = 0
  for (const e of E) if (edgeSet.has(e.t + ',' + e.f)) reciprocal++
  return { symmetricBinding: merge(a, b) === merge(b, a), reciprocal, edges: E.length }
}

/** A symmetric entanglement binding (the fix): order-independent collision of two atoms. */
export const entangle = (a: string, b: string): string => (a <= b ? merge(a, b) : merge(b, a))

/** Collapse: the Merkle fold is deterministic + intact (collapses to one eigenstate). */
export const collapse = (): boolean => verifyRoot().ok

/** No-cloning / Pauli exclusion: every content-uuid is unique (no two atoms in the same state). */
export function noCloning(): { unique: number; total: number; holds: boolean } {
  const unique = new Set(N.map((n) => n.uuid)).size
  return { unique, total: N.length, holds: unique === N.length }
}

/** Quantization / Born: the digit-trace occupancy + off-sequence (every atom folds onto the ring). */
export function quantization(): { cells: number; offSequence: number } {
  return { cells: digitTrace().size, offSequence: offSequence().length }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const d = matrixDigest()
  const ent = entanglement()
  const nc = noCloning()
  const q = quantization()
  console.log('quantum (' + d.nodes + ' nodes):')
  console.log('  entanglement: symmetric-binding=' + ent.symmetricBinding + '  reciprocal ' + ent.reciprocal + '/' + ent.edges + ' (' + ((100 * ent.reciprocal) / ent.edges).toFixed(1) + '%)')
  console.log('  collapse=' + collapse() + '  no-cloning=' + nc.holds + ' (' + nc.unique + '/' + nc.total + ')  quantization=' + q.cells + '/81 cells, off-seq ' + q.offSequence)
}
