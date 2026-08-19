import { exactMaxOf, exactMinOf, exactTrunc } from '@/algebra'
/**
 * wave/load — self-balancing horo-phase partition + cost formulas.
 */
import { describe, it, expect } from 'vitest'
import { HORO_DIGITS } from '@/horo'
import { followEveryPathAll } from '@/path'
import {
  laneCostAt,
  laneCostSplit,
  laneSpeedupCeiling,
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

  // The corpus GROWS, so a pinned census (`3157 paths, 451 each`) is a test that rots on the next
  // atom — and it did. What the partition actually promises is an INVARIANT: every path lands in
  // exactly one of seven waves, and no wave carries more than one item above another. That holds at
  // any corpus size, which is what makes it a law rather than a snapshot.
  it('distributes every path into 7 horo waves, balanced to within one item', () => {
    const paths = followEveryPathAll()
    expect(paths.length).toBeGreaterThan(0)

    const plan = selfBalancingWaveLoad(paths, { weightOf: pathComparableUnits })
    expect(plan.waveCount).toBe(7)

    const counts = plan.waves.map((w) => w.itemCount)
    // conservation: nothing lost, nothing duplicated across the partition
    expect(counts.reduce((a, b) => a + b, 0)).toBe(paths.length)
    // balance: the spread across waves is at most one item
    expect(exactMaxOf(counts) - exactMinOf(counts)).toBeLessThanOrEqual(1)
    const floorShare = exactTrunc(paths.length / 7)
    expect(counts.every((c) => c === floorShare || c === floorShare + 1)).toBe(true)

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

describe('laneCostSplit — what is paid ONCE vs what scales', () => {
  // the README face regen, measured 2026-08-01 in one process each
  const MEASURED = [
    { items: 1, ms: 82_387 },
    { items: 8, ms: 127_071 },
  ]

  it('separates the fixed boot from the per-item work — 92% of a one-atom run is setup', () => {
    const split = laneCostSplit(MEASURED)
    expect(split.marginalMs).toBeCloseTo((127_071 - 82_387) / 7, 6)
    expect(split.fixedMs).toBeCloseTo(82_387 - split.marginalMs, 6)
    expect(split.fixedShare).toBeGreaterThan(0.9) // the boot dominates a single-item run
    // and it round-trips: the split reproduces both measurements
    for (const m of MEASURED) expect(laneCostAt(split, m.items)).toBeCloseTo(m.ms, 6)
  })

  it('one sample CANNOT separate fixed from marginal — it refuses rather than guessing', () => {
    expect(() => laneCostSplit([{ items: 1, ms: 100 }])).toThrow(/two samples/)
    expect(() => laneCostSplit([{ items: 4, ms: 100 }, { items: 4, ms: 120 }])).toThrow(/different item counts/)
  })

  it('the speedup is a CEILING — the fixed term does not divide (Amdahl, stated honestly)', () => {
    const split = laneCostSplit(MEASURED)
    const n = 3191
    const seven = laneSpeedupCeiling(split, n, 7)
    const fourteen = laneSpeedupCeiling(split, n, 14)
    expect(seven).toBeGreaterThan(1)
    expect(fourteen).toBeGreaterThan(seven) // the reflected partition adds lanes …
    expect(fourteen).toBeLessThan(2 * seven) // … but never doubles the speedup: fixed is undivided
    // the hard ceiling: infinite lanes still pay the boot
    const ceiling = 1 + (n * split.marginalMs) / split.fixedMs
    expect(laneSpeedupCeiling(split, n, 1e9)).toBeLessThanOrEqual(ceiling)
    expect(laneCostAt(split, n, 1e9)).toBeGreaterThan(split.fixedMs)
  })

  it('re-paying the fixed cost per item is the unfolded form — and it is the expensive one', () => {
    const split = laneCostSplit(MEASURED)
    const n = 3191
    const onePass = laneCostAt(split, n)
    const perItem = n * (split.fixedMs + split.marginalMs)
    expect(perItem).toBeGreaterThan(10 * onePass) // ~73h vs ~5.7h — the cost of regen-per-directive
  })
})
