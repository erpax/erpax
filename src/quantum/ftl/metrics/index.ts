import { algebraLog2, exactMax, exactTrunc } from '@/algebra'
import { uuid as toUuid } from '@/integrity'

export interface Reuse {
  readonly query: string
  readonly address: string
  readonly foldOps: 1
  readonly searchOps: number
  readonly speedupLog2: number
  readonly precomputed: true
}

/** reuse ≠ search: foldOps=1 · searchOps=n · speedupLog2=log₂(n). */
export function reuse(query: string, spaceSize: number): Reuse {
  const searchOps = exactMax(1, exactTrunc(spaceSize))
  return {
    query,
    address: toUuid(query),
    foldOps: 1,
    searchOps,
    speedupLog2: algebraLog2(searchOps),
    precomputed: true,
  }
}

export interface Amortize {
  readonly answers: number
  readonly tokens: number
  readonly efficiency: number
  readonly amortizedCost: number
  readonly scalesToInfinity: boolean
}

/** answers÷tokens → ∞ when tokens=0 ∧ answers>0; amortizedCost=c₀/(m+1)→0. */
export function amortize(
  answers: number,
  tokens: number,
  opts: { readonly firstComputeCost?: number; readonly reuses?: number } = {},
): Amortize {
  const a = exactMax(0, answers)
  const t = exactMax(0, tokens)
  const c0 = exactMax(0, opts.firstComputeCost ?? 1)
  const m = exactMax(0, exactTrunc(opts.reuses ?? 0))
  const efficiency = t === 0 ? (a > 0 ? Infinity : 0) : a / t
  return {
    answers: a,
    tokens: t,
    efficiency,
    amortizedCost: c0 / (m + 1),
    scalesToInfinity: t === 0 && a > 0,
  }
}

/** @index-cross.foldback child=quantum/ftl/metrics parent=quantum/ftl — this cross folds back into its parent. */
