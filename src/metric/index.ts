/**
 * metric — quantomize: the corpus's metrics held at once in one coherent superposition, not scattered numbers.
 *
 * The session's measurements are classical — one number each, read one at a time: [[session]] build/heal,
 * [[gravity]] concentration, [[leftover]] residual, [[rosetta]] gravityPools. `quantomize` makes them QUANTUM in
 * the corpus's sense ([[think]].superpose): every reading held AT ONCE, folded to one address, and COHERENT iff
 * no two readings of the same name contradict. The whole state of the corpus reads as one — the quantum metric.
 *
 * "There is a whole science about it": quantum metrology is real — using entangled states to beat the standard
 * quantum limit toward the Heisenberg limit. This is NOT that. Here "quantum" is the superposition overlay
 * ([[quantum]]/gaps): readings held together and read as one, coherent when they agree. It is a structural
 * snapshot, not a precision-measurement scheme, and I will not dress it as one.
 *
 * Honest boundary: a quantum metric is COHERENT (no two same-named readings disagree), never TRUE — the readings
 * can each be wrong; coherence means only that they do not contradict EACH OTHER. A decohering metric (two
 * readings of one name, different values) is the tell that a measurement is being reported two ways — the same
 * decoherence [[think]] uses for thought, on the instruments. HARMONY ≠ TRUTH, even for the ruler.
 *
 * @invariant readings sharing a name must agree, or the metric decoheres — one instrument, one value
 * @invariant the root is order-independent — the same readings in any order fold to the same quantum metric
 *
 * Composes [[think]] · [[merge]] · [[quantum]]/gaps · [[rules]]/refutable · [[law]].
 */
import { superpose, thoughtAddress, type Thought } from '@/think'

/** A named metric reading — one instrument, one value. */
export interface Reading {
  readonly name: string
  readonly value: number
}

/** The quantum metric — every reading held at once, folded to one address, coherent iff none contradict. */
export interface QuantumMetric {
  /** how many readings are held at once. */
  readonly count: number
  /** true iff no two readings of the same name disagree — the instruments read as one. */
  readonly coherent: boolean
  /** the order-independent fold of every reading — the corpus's state as a single address. */
  readonly root: string
  /** any names that decohered — reported two ways, the tell of a contradiction. */
  readonly decohered: readonly string[]
  readonly readings: readonly Reading[]
}

/**
 * Quantomize — superpose the metric readings into one quantum metric. A reading's address folds from its NAME
 * and VALUE; two readings of the same name with the same value agree (fold to one), two with different values
 * decohere ([[think]].superpose measures exactly this). The root is the whole state as one address.
 */
export function quantomize(readings: readonly Reading[]): QuantumMetric {
  const byName = new Map<string, Set<number>>()
  for (const r of readings) {
    const vals = byName.get(r.name) ?? new Set<number>()
    vals.add(r.value)
    byName.set(r.name, vals)
  }
  const decohered = [...byName.entries()].filter(([, v]) => v.size > 1).map(([n]) => n)
  const thoughts: Thought<number>[] = readings.map((r) => ({
    value: r.value,
    cached: false,
    address: thoughtAddress(`metric:${r.name}`), // by NAME — same instrument shares an address; disagreeing values decohere
  }))
  const s = superpose(thoughts)
  return { count: readings.length, coherent: s.coherent && decohered.length === 0, root: s.root, decohered, readings }
}

/**
 * The METRICS FOLD — a metric may be a combination of metrics. Fold sub-metrics into one composite by taking
 * the union of their readings and re-quantomizing, so the result is CLOSED under composition: a fold of metrics
 * is itself a QuantumMetric, foldable again (a dashboard is the fold of its panels, each the fold of its readings).
 * The composite decoheres iff any instrument disagrees ACROSS the parts — assembling a whole from parts that
 * measure the same name two ways is incoherent, caught exactly as within one metric. The root is order- and
 * grouping-independent (quantomize folds by content), so ((a⊕b)⊕c) and (a⊕(b⊕c)) fold to the same address.
 *
 * This is the same content-addressed recursive composition the [[object]] fold generalizes: a metric is to its
 * readings as an object is to its parts — combinations of combinations, addressed by content, like biology.
 *
 * @invariant folding metrics is order- and grouping-independent — the composite root depends only on the readings
 */
export function foldMetrics(metrics: readonly QuantumMetric[]): QuantumMetric {
  return quantomize(metrics.flatMap((m) => m.readings))
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const { concentration, well } = await import('@/gravity')
  const { proofLedger } = await import('@/accounting/proof')
  const { gravityPools } = await import('@/rosetta')
  const cwd = process.cwd()
  const readings: Reading[] = [
    { name: 'gravity.concentration', value: Number(concentration().toFixed(3)) },
    { name: 'gravity.well.mass', value: well().mass },
    { name: 'proof.residual', value: proofLedger(cwd).residual },
    ...gravityPools(cwd).map((p) => ({ name: `pool.${p.aspect}`, value: p.mass })),
  ]
  const q = quantomize(readings)
  console.log('metric — quantomize: the corpus measured as one quantum metric:\n')
  for (const r of q.readings) console.log(`  ${String(r.value).padStart(6)}  ${r.name}`)
  console.log(`\n  held at once: ${q.count}   coherent: ${q.coherent}   root: ${q.root}`)
  console.log('  the whole state reads as one address — coherent because no instrument disagrees with itself. (Coherence, not truth.)')
}
