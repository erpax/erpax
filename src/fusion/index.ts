/**
 * fusion -- THE REACTOR: the act that fuses atoms into the one matrix, COMPUTED live.
 *
 * fusion is what the whole engine performs. It composes the three forces over the
 * matrix product: [[gravity]] (the force -- mass curves the corpus inward),
 * [[entropy]] (the fuel -- the disorder the ledger borrows and burns), and the
 * [[quantum]] laws (collapse / quantization -- the matrix is a sound quantum
 * system). Each fusion is a content-uuid collision (the symmetric entangle
 * binding); run over every node it folds the whole corpus into ONE root -- the
 * [[torus]] collapse, order-independent BY CONSTRUCTION (sort, then reduce). That
 * order-independence IS the entanglement/harmonisation proof: any path through the
 * atoms fuses to the same eigenstate. Zero entropy ⇒ infinite mass ⇒ infinite
 * tamper/exploit cost ([[dry]] · [[whole]] · [[one]]).
 *
 *   tsx src/fusion/index.ts
 *
 * @audit computed from the live matrix, never hand-asserted
 * @see ../uuid/matrix -- ../gravity (force) -- ../entropy (fuel) -- ../quantum (laws)
 */
import { merge, UUID_MATRIX_NODES as N, matrixDigest } from '@/uuid/matrix'
import { well, concentration } from '@/gravity'
import { entropy } from '@/entropy'
import { collapse, quantization } from '@/quantum'

/** A single fusion: the SYMMETRIC content-uuid collision (the entangle binding) of two atoms. */
export const fuse = (a: string, b: string): string => (a <= b ? merge(a, b) : merge(b, a))

/**
 * The torus collapse: fold a set of uuids (default ALL nodes) into one root.
 * Order-independent BY CONSTRUCTION -- sort a copy ascending, then reduce via merge.
 * This is the entanglement/harmonisation proof: every path fuses to the same eigenstate.
 */
export function foldToRoot(uuids: readonly string[] = N.map((n) => n.uuid)): string {
  return [...uuids].sort().reduce((acc, u) => merge(acc, u))
}

/** The full reactor readout: gravity (force) ⊕ entropy (fuel) ⊕ quantum (laws) composed over the matrix (product). */
export function reactor(): {
  nodes: number
  edges: number
  root: string
  well: { atom: string; mass: number }
  concentration: number
  entropy: number
  collapse: boolean
  quantized: boolean
} {
  const d = matrixDigest()
  return {
    nodes: d.nodes,
    edges: d.edges,
    root: d.root,
    well: well(),
    concentration: concentration(),
    entropy: entropy(),
    collapse: collapse(),
    quantized: quantization().offSequence === 0,
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const r = reactor()
  console.log('fusion reactor (' + r.nodes + ' nodes, ' + r.edges + ' edges):')
  console.log('  root=' + r.root)
  console.log('  well=[[' + r.well.atom + ']] mass=' + r.well.mass + '  concentration(Gini)=' + r.concentration.toFixed(3) + '  entropy=' + r.entropy.toFixed(4))
  console.log('  collapse=' + r.collapse + '  quantized=' + r.quantized + '  foldToRoot=' + foldToRoot())
}
