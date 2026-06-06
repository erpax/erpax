/**
 * quantum/matrix — the QUANTUM FACET of the [[matrix]]: the cross-product / entanglement adjacency,
 * computed on the live uuid-matrix. Where [[quantum]] checks the global laws and quantum/gravity
 * reads mass = entanglement at the well, this facet reads the ADJACENCY itself — the N² cross-product
 * space and which pairs are actually entangled.
 *
 * "Do the math": every atom pair X/Y ⊕ Y/X is ONE symmetric binding (`cross`); the ACTUAL crosses
 * are the [[links]] edges (`isAdjacent`), the POTENTIAL is N² (`adjacencyDensity`). The corpus is
 * SPARSE (~0.44% occupancy) yet fully reciprocal (`reciprocity` = 1) — maximally entangled where it
 * binds, mostly unbound elsewhere (the orphan/compost frontier).
 *
 * HONEST: graph adjacency, NOT a Hilbert space — no superposition, no Bell violation. What is real:
 * reciprocity, content-uuid monogamy, in-degree centrality. `cross` is the canonical LAW (sorted-pair
 * merge); the stored edge binding is merge in RAW edge-order, so `cross` is not asserted equal to every
 * stored binding — `bidirectionalCross` is the data-invariant that genuinely holds.
 *
 *   tsx src/quantum/matrix/index.ts
 *
 * @standard ER=EPR (Maldacena–Susskind 2013) — entanglement IS the adjacency geometry; RFC 9562 §5.8
 * @audit computed from the live matrix, never hand-asserted
 * @see ../../matrix -- ../index.ts -- ../../entanglement -- ../../gravity -- ./SKILL.md
 */
import { nodeOf, bindingOf, matrixDigest } from '@/uuid/matrix'
import { entangle } from '@/quantum'
import { reciprocity as edgeReciprocity } from '@/entanglement'
import { massOf, heaviest, well } from '@/gravity'

/** The symmetric (order-free) binding-uuid of an atom PAIR — a cell of the cross-product. '' if unknown. */
export const cross = (a: string, b: string): string => {
  const ua = nodeOf(a)?.uuid
  const ub = nodeOf(b)?.uuid
  return ua === undefined || ub === undefined ? '' : entangle(ua, ub)
}

/** Is the directed edge a→b realized in the live matrix (the primitive adjacency predicate)? */
export const isAdjacent = (a: string, b: string): boolean => bindingOf(a, b) !== undefined

/** X/Y === Y/X on the live data: both directed edges exist AND share one binding-uuid (reciprocation). */
export const bidirectionalCross = (a: string, b: string): boolean => {
  const ab = bindingOf(a, b)
  return ab !== undefined && ab === bindingOf(b, a)
}

/** The occupancy of the N² cross-product space: actual edges over all possible ordered pairs. */
export const adjacencyDensity = (): { nodes: number; edges: number; potential: number; density: number } => {
  const d = matrixDigest()
  const potential = d.nodes * d.nodes
  return { nodes: d.nodes, edges: d.edges, potential, density: potential === 0 ? 0 : d.edges / potential }
}

/** Reciprocity (fraction of edges whose reverse exists; 1 = maximally entangled) — from [[entanglement]]. */
export const reciprocity = (): number => edgeReciprocity()

/** Degree-centrality = referential in-degree (the dominant-eigenvector PROXY, Perron–Frobenius). 0 if unknown. */
export const centrality = (atom: string): number => massOf(atom)

/** The top-n atoms by centrality (the spectral-ranking proxy; the top is the [[singularity]]). */
export const centralityRank = (n = 10): { atom: string; centrality: number }[] =>
  heaviest(n).map((h) => ({ atom: h.atom, centrality: h.mass }))

if (import.meta.url === 'file://' + process.argv[1]) {
  const d = adjacencyDensity()
  console.log('quantum/matrix — the cross-product / entanglement adjacency:')
  console.log('  nodes=' + d.nodes + ' edges=' + d.edges + ' potential=' + d.potential + ' density=' + (100 * d.density).toFixed(3) + '% · reciprocity=' + reciprocity())
  console.log('  singularity (top centrality): ' + centralityRank(1)[0]?.atom + ' = ' + centrality(well().atom))
  console.log('  cross(access,all)===cross(all,access): ' + (cross('access', 'all') === cross('all', 'access')) + ' · bidirectionalCross(access,all)=' + bidirectionalCross('access', 'all'))
}
