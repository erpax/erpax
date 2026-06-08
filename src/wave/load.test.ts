/**
 * wave/load — self-balancing horo-phase partition + cost formulas.
 */
import { describe, it, expect } from 'vitest'
import { HORO_DIGITS } from '@/horo'
import { followEveryPathAll } from '@/path'
import {
  selfBalancingWaveLoad,
  waveDispatchCost,
  tamperCostForWave,
  pathComparableUnits,
  scheduleCorpusPathsInWaves,
  createWaveSession,
  completeWaveHop,
  isWaveSessionReady,
  waveSessionVerdict,
  UNITY,
} from '@/wave'

describe('selfBalancingWaveLoad — horo-phase partition', () => {
  it('empty input rests at unity with zero waves', () => {
    const plan = selfBalancingWaveLoad([])
    expect(plan.waveCount).toBe(0)
    expect(plan.restingStep).toBe(UNITY)
    expect(plan.balanceRatio).toBe(1)
  })

  it('distributes 3087 paths into 7 balanced horo waves (441 each)', () => {
    const paths = followEveryPathAll()
    expect(paths.length).toBe(3087)

    const plan = selfBalancingWaveLoad(paths, { weightOf: pathComparableUnits })
    expect(plan.waveCount).toBe(7)
    expect(plan.waves.every((w) => w.itemCount === 441)).toBe(true)

    const steps = plan.waves.map((w) => w.step)
    expect(steps).toEqual([
      HORO_DIGITS[0],
      HORO_DIGITS[1],
      HORO_DIGITS[2],
      HORO_DIGITS[3],
      HORO_DIGITS[4],
      HORO_DIGITS[5],
      HORO_DIGITS[6],
    ])
    expect(plan.balanceRatio).toBeLessThanOrEqual(2)
    expect(plan.restingStep).toBe(UNITY)
  })

  it('scheduleCorpusPathsInWaves matches direct partition', () => {
    const scheduled = scheduleCorpusPathsInWaves()
    const direct = selfBalancingWaveLoad(followEveryPathAll(), { weightOf: pathComparableUnits })
    expect(scheduled.waveCount).toBe(direct.waveCount)
    expect(scheduled.totalUnits).toBe(direct.totalUnits)
  })

  it('respects maxItemsPerWave cap', () => {
    const items = Array.from({ length: 20 }, (_, i) => `atom-${i}`)
    const plan = selfBalancingWaveLoad(items, { maxItemsPerWave: 5 })
    expect(plan.waveCount).toBe(4)
    expect(plan.waves.every((w) => w.itemCount <= 5)).toBe(true)
  })
})

describe('waveDispatchCost — agent cost per wave', () => {
  it('derive path is cheaper than manual path', () => {
    const batch = { ordinal: 1, step: 1 as const, items: ['a', 'b'], totalUnits: 2, itemCount: 2 }
    const derive = waveDispatchCost(batch, { manualPath: false })
    const manual = waveDispatchCost(batch, { manualPath: true })
    expect(derive.verifyCost).toBeLessThan(manual.verifyCost)
    expect(derive.verifyCost).toBeGreaterThan(0)
  })
})

describe('tamperCostForWave — receipt chain tamper log2', () => {
  it('grows as waves complete and hits infinity at full coverage', () => {
    const batch = { ordinal: 1, step: 1 as const, items: ['x'], totalUnits: 1, itemCount: 1 }
    const early = tamperCostForWave(batch, { completedWaves: 1, totalWaves: 7 })
    const late = tamperCostForWave(batch, { completedWaves: 6, totalWaves: 7 })
    const done = tamperCostForWave(batch, { completedWaves: 7, totalWaves: 7 })
    expect(late).toBeGreaterThan(early)
    expect(done).toBe(Number.POSITIVE_INFINITY)
  })
})

describe('wave session — strict-apply persist gate', () => {
  const TS = '2026-06-08T12:00:00.000Z'

  it('blocks persist until all waves receipted', () => {
    const paths = followEveryPathAll().slice(0, 14)
    const plan = selfBalancingWaveLoad(paths)
    const session = createWaveSession(plan, 'corr-uuid-test')

    expect(isWaveSessionReady(session)).toBe(false)
    expect(waveSessionVerdict(session).complete).toBe(false)

    for (const w of plan.waves) {
      completeWaveHop(session, w.ordinal, TS, 'agent-a')
    }

    expect(isWaveSessionReady(session)).toBe(true)
    expect(session.waveReceipts).toHaveLength(plan.waveCount)
    expect(session.waveReceipts[1]!.prevLeafUuid).toBe(session.waveReceipts[0]!.leafUuid)
  })
})
