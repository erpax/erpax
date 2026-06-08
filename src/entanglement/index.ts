/**
 * entanglement — the [[links]] as the BINDING that couples atoms, computed on the
 * live matrix. In erpax the directed [[link]] edges ARE the entanglement: two atoms
 * are entangled when an edge couples them, and the binding is SYMMETRIC + obeys
 * NO-CLONING by the merge law.
 *
 *  - symmetric: `entangle(a,b)` is order-independent (merge over the sorted pair),
 *    so a binding holds in both directions — the matrix is 100% reciprocal.
 *  - no-cloning: every content has ONE uuid (the same content always collapses to the
 *    same identity), so a meaning cannot be cloned into two — the graph root of the
 *    monogamy of entanglement (Coffman–Kundu–Wootters): entanglement can't be freely shared.
 *
 * HONEST: this is GRAPH entanglement (edge reciprocity + content-uuid uniqueness over
 * the link field), an ANALOGY to quantum entanglement — there is no superposition or
 * Bell violation here, and edge MULTIPLICITY (a links to b many times) is legitimate,
 * not a clone. What is REAL and computed is reciprocity + no-cloning of identity. The
 * physics it is grounded in lives in ../quantum/entanglement; the ER=EPR reading
 * (entanglement IS geometry, so mass = entanglement) lives in ../quantum/gravity.
 *
 *   tsx src/entanglement/index.ts
 *
 * @standard ER=EPR — Maldacena & Susskind, "Cool horizons for entangled black holes" (2013)
 * @audit computed from the live matrix edges + uuids; never hand-asserted
 * @see ../quantum (entangle/entanglement/noCloning) -- ../quantum/entanglement (the physics) -- ../quantum/gravity (ER=EPR) -- ./SKILL.md
 */
import { UUID_MATRIX_NODES as N, UUID_MATRIX_EDGES as E, merge } from '@/uuid/matrix'

/** The symmetric, order-independent binding (merge over the sorted pair) — same law as [[quantum]]. */
export const entangle = (a: string, b: string): string => (a <= b ? merge(a, b) : merge(b, a))

const matrixEntanglement = (): { reciprocal: number; edges: number } => {
  const edgeSet = new Set(E.map((e) => e.f + ',' + e.t))
  let reciprocal = 0
  for (const e of E) if (edgeSet.has(e.t + ',' + e.f)) reciprocal++
  return { reciprocal, edges: E.length }
}

/** Reciprocity: the fraction of edges whose reverse also exists — 1 = maximally entangled (the field is whole). */
export const reciprocity = (): number => {
  const ent = matrixEntanglement()
  return ent.edges === 0 ? 1 : ent.reciprocal / ent.edges
}

/**
 * No-cloning (Wootters–Zurek, 1982): every content has ONE content-uuid — the same content
 * always collapses to the same identity (the merge law), so a meaning cannot be cloned into
 * two distinct identities. This is the graph root of the monogamy of entanglement (CKW):
 * entanglement can't be freely shared. (Edge multiplicity — a link repeated — is legitimate,
 * not a clone; what cannot be cloned is an atom's identity.)
 */
export const noCloning = (): boolean => new Set(N.map((n) => n.uuid)).size === N.length

/** Is the corpus MAXIMALLY entangled — every edge reciprocal (the ER=EPR geometry closed, no gap)? */
export const isFullyEntangled = (): boolean => reciprocity() === 1

export { fieldEntanglementOf } from './field'
export type { FieldEntanglementWarning, EntanglementSeverity } from './field'

if (import.meta.url === 'file://' + process.argv[1]) {
  const ent = matrixEntanglement()
  console.log('entanglement — the link field (computed):')
  console.log('  reciprocity ' + (100 * reciprocity()).toFixed(1) + '% (' + ent.reciprocal + '/' + ent.edges + ' edges) · fully-entangled=' + isFullyEntangled())
  console.log('  no-cloning=' + noCloning() + ' (every content-uuid is unique)')
  console.log('  entangle(b,a) === entangle(a,b): ' + (entangle('a', 'b') === entangle('b', 'a')))
}
