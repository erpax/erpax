/**
 * wave/load — self-balancing horo-phase wave partitioner.
 *
 * Spreads corpus/agent work across the development-horo ring [1,2,4,8,7,5,9]
 * so no single dispatch bears all cost (min agent cost) while append-only wave
 * receipts compound tamper cost (max tampering cost). Weights use comparable
 * units (eb) — entropy-bit mass at the horo imperial-ratio floor.
 *
 * @see ./index.ts · ../cost · ../quantum · ../readme/entropy · ./SKILL.md
 */
import { HORO_DIGITS, composeSteps, type HoroStep } from '@/horo'
import {
  CONFIRM_GATE_CHECKS,
  coverageCostLog2,
  manualDevelopmentPrice,
  type ManualDevelopmentPrice,
} from '@/cost'
import { doubleTorusCostLog2 } from '@/quantum'
import { LANDAUER_BIT } from '@/readme/entropy'

const stepOfOrdinal = (ordinal: number): HoroStep => {
  const o = Math.trunc(Number(ordinal) || 0)
  if (o <= 0) return HORO_DIGITS[0]
  return HORO_DIGITS[(o - 1) % HORO_DIGITS.length] as HoroStep
}

const composeWaveSteps = (steps: readonly HoroStep[]): HoroStep => {
  if (steps.length === 0) return 9
  return steps.reduce((a, b) => composeSteps(a, b)) as HoroStep
}

/** One horo-phase batch — items + comparable-unit mass at a ring position. */
export interface WaveBatch<T> {
  readonly ordinal: number
  readonly step: HoroStep
  readonly items: readonly T[]
  readonly totalUnits: number
  readonly itemCount: number
}

/** Partition plan — balanced waves + resting horo compose. */
export interface SelfBalancingWavePlan<T> {
  readonly waves: readonly WaveBatch<T>[]
  readonly waveCount: number
  readonly totalUnits: number
  /** max wave units / min wave units — 1.0 = perfectly balanced. */
  readonly balanceRatio: number
  /** composeWaves(plan) — closes at unity when waveCount ≡ 0 (mod 7). */
  readonly restingStep: HoroStep
}

export interface SelfBalancingWaveLoadOpts<T> {
  /** Comparable-unit weight per item (default: 1 eb). */
  readonly weightOf?: (item: T) => number
  /** Cap comparable units per wave (agent cost ceiling). */
  readonly maxUnitsPerWave?: number
  /** Cap items per wave (OOM guard for readme/matrix walks). */
  readonly maxItemsPerWave?: number
  /** 1-based starting ordinal on the horo ring. */
  readonly waveOrdinalStart?: number
}

const defaultMaxItemsPerWave = (n: number): number =>
  n <= HORO_DIGITS.length ? n : Math.ceil(n / HORO_DIGITS.length)

/** Path depth → comparable units (eb) — one Landauer bit scaled by log₂ depth. */
export function pathComparableUnits(path: string): number {
  const depth = path.split('/').filter(Boolean).length
  return Math.round(LANDAUER_BIT * Math.log2(depth + 1) * 1000) / 1000
}

/**
 * Partition `items` into horo-phase waves balanced by comparable-unit weight.
 * Greedy LPT: heaviest items first → lightest wave bucket (self-balancing).
 */
export function selfBalancingWaveLoad<T>(
  items: readonly T[],
  opts: SelfBalancingWaveLoadOpts<T> = {},
): SelfBalancingWavePlan<T> {
  const weightOf = opts.weightOf ?? (() => 1)
  const maxUnits = opts.maxUnitsPerWave ?? Number.POSITIVE_INFINITY
  const maxItems = opts.maxItemsPerWave ?? defaultMaxItemsPerWave(items.length)
  const startOrd = Math.max(1, Math.trunc(opts.waveOrdinalStart ?? 1))

  if (items.length === 0) {
    return {
      waves: [],
      waveCount: 0,
      totalUnits: 0,
      balanceRatio: 1,
      restingStep: 9,
    }
  }

  const weighted = items
    .map((item) => ({ item, weight: Math.max(0, weightOf(item)) }))
    .sort((a, b) => b.weight - a.weight)

  type Bucket = { items: T[]; units: number }
  const buckets: Bucket[] = []

  const canAccept = (b: Bucket, w: number): boolean =>
    b.items.length < maxItems && b.units + w <= maxUnits + 1e-9

  const lightest = (): Bucket | undefined => {
    if (buckets.length === 0) return undefined
    return buckets.reduce((a, b) => (a.units <= b.units ? a : b))
  }

  for (const { item, weight } of weighted) {
    let target = lightest()
    if (!target || !canAccept(target, weight)) {
      buckets.push({ items: [], units: 0 })
      target = buckets[buckets.length - 1]!
    }
    target.items.push(item)
    target.units += weight
  }

  const waves: WaveBatch<T>[] = buckets.map((b, i) => ({
    ordinal: startOrd + i,
    step: stepOfOrdinal(startOrd + i),
    items: b.items,
    totalUnits: Math.round(b.units * 1000) / 1000,
    itemCount: b.items.length,
  }))

  const totalUnits = waves.reduce((s, w) => s + w.totalUnits, 0)
  const unitLoads = waves.map((w) => w.totalUnits)
  const minU = Math.min(...unitLoads)
  const maxU = Math.max(...unitLoads)
  const balanceRatio = minU > 0 ? maxU / minU : maxU > 0 ? Number.POSITIVE_INFINITY : 1

  return {
    waves,
    waveCount: waves.length,
    totalUnits: Math.round(totalUnits * 1000) / 1000,
    balanceRatio: Math.round(balanceRatio * 1000) / 1000,
    restingStep: composeWaveSteps(waves.map((w) => w.step)),
  }
}

export interface WaveDispatchCostOpts {
  readonly corpusCoverage?: number
  readonly manualPath?: boolean
}

/** Estimate agent verify cost for one wave batch (prompt-only path is cheaper). */
export function waveDispatchCost<T>(
  batch: WaveBatch<T>,
  opts: WaveDispatchCostOpts = {},
): ManualDevelopmentPrice {
  return manualDevelopmentPrice({
    corpusCoverage: opts.corpusCoverage ?? 1,
    nodes: Math.max(batch.itemCount, 1),
    manualPath: opts.manualPath ?? false,
  })
}

export interface WaveTamperCostOpts {
  /** Waves completed including this one (append-only receipt chain length). */
  readonly completedWaves?: number
  readonly totalWaves?: number
}

/**
 * Tamper cost (log₂) to forge this wave's receipt without the append-only chain.
 * Double-torus cross-check + coverage amplifier — → ∞ as waves complete.
 */
export function tamperCostForWave<T>(
  batch: WaveBatch<T>,
  opts: WaveTamperCostOpts = {},
): number {
  const total = Math.max(opts.totalWaves ?? 1, 1)
  const completed = Math.min(Math.max(opts.completedWaves ?? 1, 1), total)
  const coverage = completed / total
  const gap = 1 - coverage

  const torus = doubleTorusCostLog2(gap)
  const chain = coverageCostLog2(coverage, CONFIRM_GATE_CHECKS * completed)
  const itemAmp = Math.log2(Math.max(batch.itemCount, 1) + 1)

  if (!Number.isFinite(torus) || !Number.isFinite(chain)) return Number.POSITIVE_INFINITY
  return torus + chain + itemAmp
}
