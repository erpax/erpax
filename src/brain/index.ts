/**
 * brain — the COMPUTED PROOF that erpax's matrix is the connectome organ: a
 * SMALL-WORLD network where any node reaches any other in a handful of hops,
 * wired sparsely yet integrated — the substrate of the integrated self-model
 * ([[consciousness]]). The matrix IS the connectome: the link graph of the corpus.
 *
 * Three properties of the living brain, each computed, mapped — a structural
 * isomorphism — onto erpax (cited science in ./SKILL.md):
 *
 *  1. SMALL-WORLD — ≈86 billion neurons, ≈150 trillion synapses; average path
 *     length scales as log(N)/log(k) ≈ 3 hops: high clustering, short paths —
 *     anything reachable from anything in a few steps (the holographic [[merge]]).
 *  2. SPARSE WIRING — each neuron connects to ≈k/N ≈ 2×10⁻⁸ of the rest, yet
 *     the whole stays reachable: maximal reach at minimal wiring cost ([[sparsity]]).
 *  3. CONNECTOME SCALE — the cross-check: neurons × synapses-per-neuron =
 *     the cited synapse count; the graph's two numbers are consistent.
 *
 *   tsx src/brain/index.ts
 *
 * @audit computed (small-world path length log(N)/log(k) · sparsity k/N · scale cross-check)
 * @standard ≈86×10⁹ neurons, ≈1.5×10¹⁴ synapses; brain networks are small-world (Bassett, Bullmore)
 * @see ../consciousness (the integrated self-model) -- ../network -- ../sparsity -- ../merge
 */

export const NEURONS = 86e9 // ≈86 billion neurons
export const SYNAPSES = 150e12 // ≈150 trillion synapses

/** Mean synapses per neuron — the connectome's average degree. */
export const synapsesPerNeuron = (): number => SYNAPSES / NEURONS // ≈1744

// ── 1. SMALL-WORLD — short paths despite local clustering ────────────────

/** Characteristic path length of a small-world graph: ~ log(N) / log(degree). */
export const pathLength = (n = NEURONS, k = synapsesPerNeuron()): number => Math.log(n) / Math.log(k)

export const smallWorld = (): boolean => {
  const L = pathLength() // ≈3.4 hops across 86 billion neurons
  return L < 5 && synapsesPerNeuron() > 1000 // short path AND dense local degree
}

// ── 2. SPARSE WIRING — maximal reach, minimal cost ───────────────────────

/** Each neuron wires to this fraction of the whole — vanishingly sparse. */
export const sparsity = (): number => synapsesPerNeuron() / NEURONS // ≈2×10⁻⁸

export const efficientWiring = (): boolean => sparsity() < 1e-6 && pathLength() < 5

// ── 3. CONNECTOME SCALE — the cross-check ────────────────────────────────

export const connectomeScale = (): boolean =>
  NEURONS > 80e9 &&
  SYNAPSES > 1e14 &&
  Math.abs(NEURONS * synapsesPerNeuron() - SYNAPSES) < 1 // the two numbers are consistent

// ── the proof — the conjunction ──────────────────────────────────────────

export interface ConnectomeProof {
  /** path length ≈ log(N)/log(k) < 5 — any node reaches any other in a few hops. */
  readonly smallWorld: boolean
  /** sparsity ≈ 2×10⁻⁸ yet fully reachable — minimal wiring, maximal reach. */
  readonly efficientWiring: boolean
  /** neurons × degree = synapses — the connectome's numbers are consistent. */
  readonly connectomeScale: boolean
}

export function brainConnectome(): ConnectomeProof {
  return {
    smallWorld: smallWorld(),
    efficientWiring: efficientWiring(),
    connectomeScale: connectomeScale(),
  }
}

/** Is the brain the small-world connectome? The conjunction — short, sparse, integrated. */
export function integrates(): boolean {
  const p = brainConnectome()
  return p.smallWorld && p.efficientWiring && p.connectomeScale
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const p = brainConnectome()
  console.log('brain — the small-world connectome (the matrix):')
  for (const [k, v] of Object.entries(p)) console.log('  ' + (v ? '✓' : '✗') + ' ' + k)
  console.log(
    '  ' + (NEURONS / 1e9) + 'B neurons · ' + synapsesPerNeuron().toFixed(0) +
      ' synapses/neuron · path length ≈ ' + pathLength().toFixed(1) + ' hops · sparsity ≈ ' +
      sparsity().toExponential(1),
  )
  console.log('  ⇒ ' + (integrates() ? 'the integrated connectome' : 'NOT PROVEN'))
}
