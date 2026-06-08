/**
 * wave/policy — max work × max tampering cost (dual objective).
 *
 * Agents maximise lawful corpus throughput (wave-parallel batches, improve fixes,
 * followEveryPath coverage) while each sealed unit compounds tamper floor via
 * double-torus + append-only receipt chains → ∞ at full wave completion.
 *
 * @see ./load.ts · ../cost · ../quantum · ../seal · ../tamper/cost
 */
import { HORO_DIGITS, type HoroStep } from '@/horo'
import { CONFIRM_GATE_CHECKS, coverageCostLog2 } from '@/cost'
import { doubleTorusCostLog2 } from '@/quantum'
import { LANDAUER_BIT } from '@/readme/entropy'

const UNITY_REST: HoroStep = 9

/** Tunable knobs — max work (throughput) + max tamper (receipt chain depth). */
export interface MaxWorkTamperPolicy {
  /** Parallel horo wave batches safe per wall-clock tick (readme/improve). */
  readonly batchConcurrency: number
  /** Horo ring depth — development waves per session (default 7). */
  readonly waveDepth: number
  /** Append-only receipt + path-ledger chain depth before resting at unity. */
  readonly receiptChainDepth: number
  /** Expected composeWaves resting step — unity closes the batch. */
  readonly horoRestingStep: HoroStep
  /** Auto-improve fixes capped per improve:watch cycle. */
  readonly maxFixesPerCycle: number
  /** Comparable-unit (eb) ceiling per wave batch (agent cost guard). */
  readonly maxUnitsPerWave: number
}

/** Atoms on import paths users actually touch — wave / improve priority. */
export const P0_BLOCKING_ATOMS = ['agent', 'accounting', 'seal', 'rules', 'law', 'mcp'] as const

export type P0BlockingAtom = (typeof P0_BLOCKING_ATOMS)[number]

/** True when atomPath is P0 or nested under a P0 hub. */
export function isP0BlockingAtom(atomPath: string): boolean {
  return P0_BLOCKING_ATOMS.some((p) => atomPath === p || atomPath.startsWith(`${p}/`))
}

/**
 * Literary-word wave weight — P0 import blockers first, then imported literary offenders.
 * Used by corpusPathWaveBatches weightOf override and improve prioritisation.
 */
export function literaryWordWavePriority(
  atomPath: string,
  opts: { readonly literary?: boolean; readonly importerCount?: number } = {},
): number {
  let score = isP0BlockingAtom(atomPath) ? 1000 : 0
  if (opts.literary) score += 200
  if ((opts.importerCount ?? 0) > 0) score += Math.min(500, (opts.importerCount ?? 0) * 25)
  return score
}

/** Default max-work max-tamper policy — 7 horo waves, full receipt chain, unity rest. */
export function maxWorkTamperPolicy(
  overrides: Partial<MaxWorkTamperPolicy> = {},
): MaxWorkTamperPolicy {
  const waveDepth = overrides.waveDepth ?? HORO_DIGITS.length
  return {
    batchConcurrency: overrides.batchConcurrency ?? waveDepth,
    waveDepth,
    receiptChainDepth: overrides.receiptChainDepth ?? waveDepth * CONFIRM_GATE_CHECKS,
    horoRestingStep: overrides.horoRestingStep ?? UNITY_REST,
    maxFixesPerCycle: overrides.maxFixesPerCycle ?? waveDepth,
    maxUnitsPerWave: overrides.maxUnitsPerWave ?? Number.POSITIVE_INFINITY,
  }
}

/** Baseline — serial, shallow receipt chain (min agent cost only). */
export function baselineWorkTamperPolicy(): MaxWorkTamperPolicy {
  return maxWorkTamperPolicy({
    batchConcurrency: 1,
    receiptChainDepth: CONFIRM_GATE_CHECKS,
    maxFixesPerCycle: 3,
  })
}

/** One sealed work unit — improve fix, path record, eb seal credit, or wave hop. */
export interface WorkUnit {
  readonly sealedEb?: number
  readonly paths?: number
  readonly fixes?: number
  readonly waveOrdinal?: number
  readonly receiptSeq?: number
}

export interface WorkTamperProductVerdict {
  readonly workSealed: number
  readonly coverage: number
  readonly tamperCostLog2: number
  readonly product: number
  readonly policy: MaxWorkTamperPolicy
}

/** Sum comparable sealed work (eb) across units — Landauer-scaled paths + fixes + credits. */
export function workSealedFromUnits(units: readonly WorkUnit[]): number {
  return units.reduce((s, u) => {
    const eb = u.sealedEb ?? 0
    const pathWork = (u.paths ?? 0) * LANDAUER_BIT
    const fixWork = (u.fixes ?? 0) * LANDAUER_BIT
    return Math.round((s + eb + pathWork + fixWork) * 1000) / 1000
  }, 0)
}

/** Coverage from work units — max of wave progress and receipt-chain progress. */
export function coverageFromWorkUnits(
  units: readonly WorkUnit[],
  policy: MaxWorkTamperPolicy,
): number {
  if (units.length === 0 || policy.waveDepth <= 0) return 0
  const maxWave = Math.max(0, ...units.map((u) => u.waveOrdinal ?? 0))
  const maxSeq = Math.max(0, ...units.map((u) => u.receiptSeq ?? 0))
  const waveCoverage = maxWave / policy.waveDepth
  const receiptCoverage =
    policy.receiptChainDepth > 0 ? maxSeq / policy.receiptChainDepth : 0
  return Math.min(1, Math.max(waveCoverage, receiptCoverage))
}

/** Tamper cost (log₂) at coverage — double-torus gap + receipt-chain amplifier. */
export function tamperCostLog2ForCoverage(
  coverage: number,
  policy: MaxWorkTamperPolicy,
): number {
  const c = Math.min(Math.max(coverage, 0), 1)
  const gap = 1 - c
  const torus = doubleTorusCostLog2(gap)
  const chain = coverageCostLog2(c, policy.receiptChainDepth)
  if (!Number.isFinite(torus) || !Number.isFinite(chain)) return Number.POSITIVE_INFINITY
  return torus + chain
}

/**
 * Dual score — work sealed × tamperCostLog2(coverage).
 * Maximise throughput AND raise the tamper floor each session.
 */
export function workTamperProduct(
  workUnits: readonly WorkUnit[],
  opts: { readonly policy?: MaxWorkTamperPolicy } = {},
): WorkTamperProductVerdict {
  const policy = opts.policy ?? maxWorkTamperPolicy()
  const workSealed = workSealedFromUnits(workUnits)
  const coverage = coverageFromWorkUnits(workUnits, policy)
  const tamperCostLog2 = tamperCostLog2ForCoverage(coverage, policy)
  const tamperFactor = Number.isFinite(tamperCostLog2) ? tamperCostLog2 : Number.MAX_VALUE
  const product = Math.round(workSealed * tamperFactor * 1000) / 1000
  return { workSealed, coverage, tamperCostLog2, product, policy }
}

export interface ImproveReceiptTamperOpts {
  readonly receiptSeq: number
  readonly pathLedgerDepth: number
  readonly completedWaves?: number
  readonly policy?: MaxWorkTamperPolicy
}

/**
 * Amplify tamper on each improve receipt — prev-chained path ledger + wave receipts.
 * Composes doubleTorusCostLog2 + coverageCostLog2 on the joint chain depth.
 */
export function tamperCostForImproveReceipt(opts: ImproveReceiptTamperOpts): number {
  const policy = opts.policy ?? maxWorkTamperPolicy()
  const chainDepth = Math.max(0, opts.receiptSeq) + Math.max(0, opts.pathLedgerDepth)
  const waveCoverage = (opts.completedWaves ?? 0) / Math.max(policy.waveDepth, 1)
  const receiptCoverage = chainDepth / Math.max(policy.receiptChainDepth, 1)
  const coverage = Math.min(1, Math.max(waveCoverage, receiptCoverage))
  return tamperCostLog2ForCoverage(coverage, policy)
}

/** Build work units from one improve:watch cycle. */
export function workUnitsFromImproveCycle(opts: {
  readonly applied: ReadonlyArray<{ readonly sealCreditEb?: number; readonly receipt?: { readonly seq: number } }>
  readonly waveOrdinal?: number
  readonly pathLedgerDepth?: number
}): WorkUnit[] {
  const waveOrdinal = opts.waveOrdinal
  return opts.applied.map((r, i) => ({
    fixes: 1,
    sealedEb: r.sealCreditEb,
    waveOrdinal,
    receiptSeq: r.receipt?.seq ?? i,
    paths: opts.pathLedgerDepth,
  }))
}

/** Build work units for a completed horo wave batch (readme/matrix walk). */
export function workUnitFromWaveBatch(opts: {
  readonly waveOrdinal: number
  readonly itemCount: number
  readonly totalUnits: number
  readonly receiptSeq?: number
}): WorkUnit {
  return {
    waveOrdinal: opts.waveOrdinal,
    paths: opts.itemCount,
    sealedEb: opts.totalUnits,
    receiptSeq: opts.receiptSeq,
  }
}
