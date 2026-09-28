/**
 * quantum/ftl/memo — does asking twice cost twice?
 *
 * `amortize` models cost as `c₀/(m+1)`: it FALLS as reuses grow. This measures whether any reuse is
 * actually realised, by asking the same question twice and comparing. See ./SKILL.md.
 *
 * Both thresholds are module-PRIVATE and argued in ./SKILL.md. Exporting them would be seal-debt on
 * the matrix ratchet, and a test that read one back would be asserting this module's own literal
 * ([[rules]]/mirror) rather than any behaviour.
 *
 * @standard ISO/IEC 25010:2023 §5.2 — performance efficiency: time behaviour under repetition
 */
import { amortize } from '@/quantum/ftl/metrics'
import { exactMax, exactRound } from '@/algebra'

/** Below this share of the first ask, a re-ask is free and the answer has a receipt. DECLARED. */
const MEMO_RATIO = 0.05

/**
 * A first ask shorter than this cannot be judged: at sub-millisecond durations the ratio is timer
 * noise, and a trivially cached lookup measured 6 % purely because both asks rounded near zero.
 * An unmeasurable question is reported as such, never as an answer.
 */
const MIN_MEASURABLE_MS = 5

export type MemoShape = 'memoized' | 'partial' | 'rederives' | 'unmeasured'

export interface MemoVerdict {
  readonly label: string
  readonly firstMs: number
  readonly secondMs: number
  /** `secondMs / firstMs` — the share of the work a re-ask repeats. */
  readonly reaskRatio: number
  /** What `amortize` PREDICTS per answer over two asks: `c₀/(m+1)` with one reuse. */
  readonly predictedPerAnswerMs: number
  readonly measuredPerAnswerMs: number
  /** predicted ÷ measured. 1 means the model holds; 0.5 means none of the promised reuse happened. */
  readonly realisedAmortisation: number
  readonly shape: MemoShape
}

const shapeOf = (ratio: number, firstMs: number): MemoShape => {
  if (firstMs < MIN_MEASURABLE_MS) return 'unmeasured'
  // A ratio ABOVE 1 means the re-ask cost MORE — JIT, GC or a cold cache, never partial reuse. It is
  // certainly not memoized, so it lands with the re-derivers rather than being smoothed away.
  if (ratio >= 0.5) return 'rederives'
  return ratio < MEMO_RATIO ? 'memoized' : 'partial'
}

/**
 * Ask twice, back to back, and report what the second ask cost.
 *
 * The RATIO is the evidence, not the milliseconds: both asks run under the same load, so a busy
 * machine inflates them together and cancels out. Absolute wall time under contention is not
 * evidence — a lesson this corpus has already paid for — but `second ÷ first` survives it.
 *
 * @invariant a receipt-backed answer reports a ratio below MEMO_RATIO
 * @invariant realisedAmortisation is 1 when the second ask is free, 0.5 when it costs the same
 */
export function timeTwice(label: string, ask: () => unknown): MemoVerdict {
  const a = performance.now()
  ask()
  const firstMs = performance.now() - a
  const b = performance.now()
  ask()
  const secondMs = performance.now() - b
  const reaskRatio = firstMs > 0 ? secondMs / firstMs : 0
  // amortize with ONE reuse is the promise; (first+second)/2 is what actually happened per answer.
  const predictedPerAnswerMs = amortize(2, 0, { firstComputeCost: firstMs, reuses: 1 }).amortizedCost
  const measuredPerAnswerMs = (firstMs + secondMs) / 2
  return {
    label,
    firstMs: exactRound(firstMs),
    secondMs: exactRound(secondMs),
    reaskRatio,
    predictedPerAnswerMs,
    measuredPerAnswerMs,
    realisedAmortisation: measuredPerAnswerMs > 0 ? predictedPerAnswerMs / measuredPerAnswerMs : 1,
    shape: shapeOf(reaskRatio, firstMs),
  }
}

export interface MemoCensus {
  readonly rows: readonly MemoVerdict[]
  /** Operations whose re-ask is free — the part of the corpus that is already quantum. */
  readonly memoized: readonly string[]
  /** Too fast to judge. Not a pass: the question could not be asked. */
  readonly unmeasured: readonly string[]
  /** Operations that re-derive: `amortize` cannot fall for these, however often they are asked. */
  readonly rederives: readonly string[]
  /** Milliseconds a single extra ask of everything costs — the bill for having no receipt. */
  readonly reaskCostMs: number
}

/**
 * The census. Every operation that re-derives is a place the FTL claim does NOT hold, and naming
 * them is the point: the substrate can be O(1) by address while the laws computed over it are not.
 */
export function memoCensus(asks: ReadonlyArray<readonly [string, () => unknown]>): MemoCensus {
  const rows = asks.map(([label, fn]) => timeTwice(label, fn))
  return {
    rows: [...rows].sort((x, y) => y.secondMs - x.secondMs),
    memoized: rows.filter((r) => r.shape === 'memoized').map((r) => r.label),
    unmeasured: rows.filter((r) => r.shape === 'unmeasured').map((r) => r.label),
    rederives: rows.filter((r) => r.shape === 'rederives').map((r) => r.label),
    reaskCostMs: exactRound(rows.reduce((n, r) => n + exactMax(0, r.secondMs), 0)),
  }
}
