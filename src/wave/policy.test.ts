/**
 * wave/policy — max work × max tampering cost dual objective.
 */
import { describe, it, expect } from 'vitest'
import { HORO_DIGITS } from '@/horo'
import { CONFIRM_GATE_CHECKS } from '@/cost'
import { followEveryPathAll } from '@/path'
import {
  maxWorkTamperPolicy,
  baselineWorkTamperPolicy,
  workTamperProduct,
  workSealedFromUnits,
  tamperCostLog2ForCoverage,
  tamperCostForImproveReceipt,
  workUnitFromWaveBatch,
  literaryWordWavePriority,
  isP0BlockingAtom,
  type WorkUnit,
} from './policy'
import { selfBalancingWaveLoad, pathComparableUnits } from './load'
import { scheduleCorpusPathsInWaves } from './scheduler'
import { UNITY } from './index'

describe('maxWorkTamperPolicy — dual objective knobs', () => {
  it('defaults to 7 horo waves, full receipt chain, unity rest', () => {
    const p = maxWorkTamperPolicy()
    expect(p.waveDepth).toBe(7)
    expect(p.batchConcurrency).toBe(7)
    expect(p.receiptChainDepth).toBe(7 * CONFIRM_GATE_CHECKS)
    expect(p.horoRestingStep).toBe(UNITY)
    expect(p.maxFixesPerCycle).toBe(7)
  })

  it('baseline is serial — min agent cost only', () => {
    const b = baselineWorkTamperPolicy()
    expect(b.batchConcurrency).toBe(1)
    expect(b.waveDepth).toBe(7)
    expect(b.receiptChainDepth).toBe(CONFIRM_GATE_CHECKS)
    expect(b.maxFixesPerCycle).toBe(3)
  })
})

describe('workTamperProduct — work sealed × tamperCostLog2(coverage)', () => {
  const sevenWaveUnits = (): WorkUnit[] => {
    const plan = scheduleCorpusPathsInWaves()
    expect(plan.waveCount).toBe(7)
    return plan.waves.map((w, i) =>
      workUnitFromWaveBatch({
        waveOrdinal: w.ordinal,
        itemCount: w.itemCount,
        totalUnits: w.totalUnits,
        receiptSeq: (i + 1) * CONFIRM_GATE_CHECKS,
      }),
    )
  }

  it('7-wave session beats baseline on product score', () => {
    const policy = maxWorkTamperPolicy()
    const session = workTamperProduct(sevenWaveUnits(), { policy })
    const baseline = workTamperProduct(
      [
        workUnitFromWaveBatch({
          waveOrdinal: 1,
          itemCount: followEveryPathAll().length,
          totalUnits: selfBalancingWaveLoad(followEveryPathAll(), { weightOf: pathComparableUnits })
            .totalUnits,
          receiptSeq: 1,
        }),
      ],
      { policy: baselineWorkTamperPolicy() },
    )
    expect(session.workSealed).toBeGreaterThan(0)
    expect(session.workSealed).toBeCloseTo(baseline.workSealed, 0)
    expect(session.coverage).toBe(1)
    expect(baseline.coverage).toBeLessThan(1)
    expect(session.tamperCostLog2).toBe(Number.POSITIVE_INFINITY)
    expect(baseline.tamperCostLog2).toBeLessThan(session.tamperCostLog2)
    expect(session.product).toBe(Number.POSITIVE_INFINITY)
    expect(baseline.product).toBeLessThan(session.product)
    expect(Number.isFinite(baseline.product)).toBe(true)
  })

  it('tamper cost grows with coverage before infinity at 1', () => {
    const policy = maxWorkTamperPolicy()
    const early = tamperCostLog2ForCoverage(1 / 7, policy)
    const mid = tamperCostLog2ForCoverage(6 / 7, policy)
    const done = tamperCostLog2ForCoverage(1, policy)
    expect(mid).toBeGreaterThan(early)
    expect(done).toBe(Number.POSITIVE_INFINITY)
  })

  it('workSealedFromUnits sums eb + Landauer-scaled paths/fixes', () => {
    const sealed = workSealedFromUnits([
      { sealedEb: 2, paths: 10, fixes: 3 },
    ])
    expect(sealed).toBeGreaterThan(2)
  })
})

describe('tamperCostForImproveReceipt — path ledger + wave chain amplifier', () => {
  it('grows with receipt seq and path ledger depth', () => {
    const policy = maxWorkTamperPolicy()
    const early = tamperCostForImproveReceipt({
      receiptSeq: 1,
      pathLedgerDepth: 0,
      completedWaves: 1,
      policy,
    })
    const late = tamperCostForImproveReceipt({
      receiptSeq: 7,
      pathLedgerDepth: 14,
      completedWaves: 6,
      policy,
    })
    const done = tamperCostForImproveReceipt({
      receiptSeq: policy.receiptChainDepth,
      pathLedgerDepth: policy.receiptChainDepth,
      completedWaves: 7,
      policy,
    })
    expect(late).toBeGreaterThan(early)
    expect(done).toBe(Number.POSITIVE_INFINITY)
  })
})

describe('literaryWordWavePriority — P0 import blockers first', () => {
  it('boosts agent/accounting/seal over random vocabulary', () => {
    expect(isP0BlockingAtom('agent/skill')).toBe(true)
    expect(literaryWordWavePriority('agent', { literary: true, importerCount: 3 })).toBeGreaterThan(
      literaryWordWavePriority('abdomen', { literary: true, importerCount: 0 }),
    )
  })
})

describe('policy horo alignment', () => {
  it('7-wave plan rests at policy horoRestingStep', () => {
    const policy = maxWorkTamperPolicy()
    const plan = selfBalancingWaveLoad(followEveryPathAll(), { weightOf: pathComparableUnits })
    expect(plan.restingStep).toBe(policy.horoRestingStep)
    expect(plan.waves.map((w) => w.step)).toEqual([
      HORO_DIGITS[0],
      HORO_DIGITS[1],
      HORO_DIGITS[2],
      HORO_DIGITS[3],
      HORO_DIGITS[4],
      HORO_DIGITS[5],
      HORO_DIGITS[6],
    ])
  })
})
