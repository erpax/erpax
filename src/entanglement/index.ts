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
import { entangle as quantumEntangle, entanglement as quantumEntanglement, noCloning as quantumNoCloning } from '@/quantum'

/** The symmetric, order-independent binding (merge over the sorted pair) — re-exported from [[quantum]]. */
export const entangle = quantumEntangle

/** Reciprocity: the fraction of edges whose reverse also exists — 1 = maximally entangled (the field is whole). */
export const reciprocity = (): number => {
  const ent = quantumEntanglement()
  return ent.edges === 0 ? 1 : ent.reciprocal / ent.edges
}

/**
 * No-cloning (Wootters–Zurek, 1982): every content has ONE content-uuid — the same content
 * always collapses to the same identity (the merge law), so a meaning cannot be cloned into
 * two distinct identities. This is the graph root of the monogamy of entanglement (CKW):
 * entanglement can't be freely shared. (Edge multiplicity — a link repeated — is legitimate,
 * not a clone; what cannot be cloned is an atom's identity.)
 */
export const noCloning = (): boolean => quantumNoCloning().holds

/** Is the corpus MAXIMALLY entangled — every edge reciprocal (the ER=EPR geometry closed, no gap)? */
export const isFullyEntangled = (): boolean => reciprocity() === 1

if (import.meta.url === 'file://' + process.argv[1]) {
  const ent = quantumEntanglement()
  console.log('entanglement — the link field (computed):')
  console.log('  reciprocity ' + (100 * reciprocity()).toFixed(1) + '% (' + ent.reciprocal + '/' + ent.edges + ' edges) · fully-entangled=' + isFullyEntangled())
  console.log('  no-cloning=' + noCloning() + ' (every content-uuid is unique)')
  console.log('  entangle(b,a) === entangle(a,b): ' + (entangle('a', 'b') === entangle('b', 'a')))
}
