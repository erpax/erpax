import { exactAbs, exactMax } from '@/algebra'
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

/** One reading measured against its reference — the relative error, and the accuracy 1−error (floored at 0). */
export interface AccuracyError {
  readonly name: string
  readonly value: number
  readonly expected: number
  /** |value − expected| / max(|expected|, 1) — scale-free so a big number and a small one compare fairly. */
  readonly relError: number
}

/** Quantum ACCURACY — a metric measured against a reference (the standard), the complement of coherence. */
export interface Accuracy {
  /** how many readings had a reference to compare against. */
  readonly referenced: number
  /** aggregate accuracy in [0,1] — mean of (1 − relError) over referenced readings; 1 = every one exact. */
  readonly accuracy: number
  readonly errors: readonly AccuracyError[]
}

/**
 * Quantum accuracy — coherence is agreement among instruments; ACCURACY is agreement with the STANDARD. A
 * coherent metric is not a true one ([[rules]]/refutable, this atom's law: coherence ≠ truth), so accuracy asks
 * the other question: given a REFERENCE (known expected values), how close is each reading? Per-reading relative
 * error (scale-free), and an aggregate in [0,1]. Together they separate the two failures a measurement can have:
 * decoherence (instruments disagree with each other — quantomize) and inaccuracy (they agree, but with the wrong
 * value — here).
 *
 * HONEST BOUNDARY: accuracy is against the PROVIDED reference, never absolute truth — the corpus has no oracle,
 * and a reference can itself be wrong. This reports closeness-to-reference; a perfectly accurate reading against a
 * wrong reference is still wrong. Coherent + accurate is the most a measurement earns here; true is not on offer.
 *
 * @invariant a reading exactly equal to its reference contributes accuracy 1; a reading with no reference is not counted
 */
export function accuracy(metric: QuantumMetric, reference: Readonly<Record<string, number>>): Accuracy {
  const errors: AccuracyError[] = metric.readings
    .filter((r) => Object.prototype.hasOwnProperty.call(reference, r.name))
    .map((r) => {
      const expected = reference[r.name]!
      const relError = exactAbs(r.value - expected) / (exactAbs(expected) || 1)
      return { name: r.name, value: r.value, expected, relError }
    })
  const referenced = errors.length
  const acc = referenced === 0 ? 0 : errors.reduce((sum, e) => sum + exactMax(0, 1 - e.relError), 0) / referenced
  return { referenced, accuracy: acc, errors }
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
