/**
 * Workorders invariants — the data-verified laws of the etrima execution leaf,
 * pinned as pure unit tests (skill = test = script). Every case mirrors an
 * @invariant banner in the atom, grounded in the 2.05M-row audit.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @see src/work/orders/index.ts
 */
import { describe, it, expect } from 'vitest'
import type { CollectionBeforeChangeHook } from 'payload'
import {
  deriveState,
  machinesPerWorker,
  pieceRateWage,
  minutesRemaining,
  assertTotalsBalance,
  inheritShiftEfficiency,
  WORKORDER_RING,
} from '@/work/orders'
import { HORO_DIGITS } from '@/horo'

type HookArgs = Parameters<CollectionBeforeChangeHook>[0]
const balance = (data: Record<string, unknown>) =>
  assertTotalsBalance({ data, req: {}, collection: undefined, context: {}, operation: 'create' } as unknown as HookArgs)

// inheritShiftEfficiency is async + reads the work-shift authority via req.payload.findByID.
const inherit = (data: Record<string, unknown>, findByID: (a: { id: unknown }) => Promise<unknown>) =>
  inheritShiftEfficiency({ data, req: { payload: { findByID } }, collection: undefined, context: {}, operation: 'create' } as unknown as HookArgs)

describe('WORKORDER_RING — the horo lifecycle', () => {
  it('walks the seven-position ring exactly (1·2·4·8·7·5·9)', () => {
    expect(WORKORDER_RING.map((s) => s.step)).toEqual([...HORO_DIGITS])
  })
  it('carries the seven canonical state codes in order', () => {
    expect(WORKORDER_RING.map((s) => s.code)).toEqual([
      'open', 'ordered', 'in-production', 'packed', 'shipped', 'delivered', 'closed',
    ])
  })
})

describe('deriveState — derived, never stored', () => {
  it('seals take precedence: closed ≻ delivered ≻ shipped', () => {
    expect(deriveState({ closedAt: 'x', deliveredAt: 'y', completedAt: 'z' })).toBe('closed')
    expect(deriveState({ deliveredAt: 'y', completedAt: 'z' })).toBe('delivered')
    expect(deriveState({ completedAt: 'z' })).toBe('shipped')
  })
  it('open when nothing is ordered', () => {
    expect(deriveState({ unitsOrdered: 0, unitsProduced: 0 })).toBe('open')
  })
  it('ordered when ordered but none produced', () => {
    expect(deriveState({ unitsOrdered: 10, unitsProduced: 0 })).toBe('ordered')
  })
  it('in-production when partially produced', () => {
    expect(deriveState({ unitsOrdered: 10, unitsProduced: 4 })).toBe('in-production')
  })
  it('packed when produced meets or exceeds ordered', () => {
    expect(deriveState({ unitsOrdered: 10, unitsProduced: 10 })).toBe('packed')
    expect(deriveState({ unitsOrdered: 10, unitsProduced: 12 })).toBe('packed')
  })
})

describe('machinesPerWorker — null/0 ⇒ 1 (never divide by zero)', () => {
  it('coerces null, undefined, 0 and negatives to 1', () => {
    for (const v of [null, undefined, 0, -3, '0']) expect(machinesPerWorker(v)).toBe(1)
  })
  it('passes a real divisor through (truncated)', () => {
    expect(machinesPerWorker(4)).toBe(4)
    expect(machinesPerWorker(2.9)).toBe(2)
  })
})

describe('pieceRateWage — unitsProduced·unitSeconds·payPerHour / 3600 / mpw', () => {
  it('computes the canonical piece rate', () => {
    // 100 units · 60s · €12/h / 3600 / 1 = €20.00
    expect(pieceRateWage({ unitsProduced: 100, unitSeconds: 60, payPerHour: 12 })).toBe(20)
  })
  it('splits by machines-per-worker (the parallelism divisor)', () => {
    // same, mpw=4 → €5.00
    expect(pieceRateWage({ unitsProduced: 100, unitSeconds: 60, payPerHour: 12, machinesPerWorker: 4 })).toBe(5)
  })
  it('is zero when nothing produced, no rate, or no time', () => {
    expect(pieceRateWage({ unitsProduced: 0, unitSeconds: 60, payPerHour: 12 })).toBe(0)
    expect(pieceRateWage({ unitsProduced: 100, unitSeconds: 60, payPerHour: 0 })).toBe(0)
    expect(pieceRateWage({ unitsProduced: 100, unitSeconds: 0, payPerHour: 12 })).toBe(0)
  })
  it('rounds to two decimals', () => {
    expect(pieceRateWage({ unitsProduced: 1, unitSeconds: 1, payPerHour: 1 })).toBe(0)
    expect(pieceRateWage({ unitsProduced: 7, unitSeconds: 13, payPerHour: 9 })).toBe(0.23)
  })
})

describe('minutesRemaining — (ordered − produced)·unitSeconds / mpw / 60', () => {
  it('computes remaining work-minutes', () => {
    // (100 − 40) · 60s / 1 / 60 = 60 min
    expect(minutesRemaining({ unitsOrdered: 100, unitsProduced: 40, unitSeconds: 60 })).toBe(60)
  })
  it('is zero when nothing remains or no time', () => {
    expect(minutesRemaining({ unitsOrdered: 40, unitsProduced: 40, unitSeconds: 60 })).toBe(0)
    expect(minutesRemaining({ unitsOrdered: 100, unitsProduced: 40, unitSeconds: 0 })).toBe(0)
  })
})

describe('assertTotalsBalance — header = Σ options (double-entry, 100.0000% verified)', () => {
  it('recomputes all three totals from the options array', () => {
    const data: Record<string, unknown> = {
      options: [
        { label: 'A', ordered: 30, produced: 20, backordered: 10 },
        { label: 'B', ordered: 12, produced: 12, backordered: 0 },
      ],
      unitsOrdered: 999, unitsProduced: 999, unitsBackordered: 999, // stale; must be overwritten
    }
    balance(data)
    expect(data.unitsOrdered).toBe(42)
    expect(data.unitsProduced).toBe(32)
    expect(data.unitsBackordered).toBe(10)
  })
  it('zeroes the totals for an empty/absent options array', () => {
    const data: Record<string, unknown> = { unitsOrdered: 7 }
    balance(data)
    expect(data.unitsOrdered).toBe(0)
    expect(data.unitsProduced).toBe(0)
    expect(data.unitsBackordered).toBe(0)
  })
})

describe('inheritShiftEfficiency — the order reads efficiency back DOWN from the shift authority', () => {
  const never = async () => { throw new Error('findByID should not be called') }

  it('reads efficiencyPercent off an already-populated workShift (no fetch)', async () => {
    const data: Record<string, unknown> = { workShift: { id: 'ws1', efficiencyPercent: 73 }, efficiencyPercent: 0 }
    await inherit(data, never)
    expect(data.efficiencyPercent).toBe(73)
  })

  it('fetches the shift by id and inherits its efficiency', async () => {
    const data: Record<string, unknown> = { workShift: 'ws1' }
    await inherit(data, async ({ id }) => (id === 'ws1' ? { id, efficiencyPercent: 166 } : null))
    expect(data.efficiencyPercent).toBe(166)
  })

  it('leaves the order untouched when there is no shift', async () => {
    const data: Record<string, unknown> = { efficiencyPercent: 50 }
    await inherit(data, never)
    expect(data.efficiencyPercent).toBe(50)
  })

  it('is best-effort: an unreachable authority keeps the prior value', async () => {
    const data: Record<string, unknown> = { workShift: 'ws1', efficiencyPercent: 50 }
    await inherit(data, async () => { throw new Error('db down') })
    expect(data.efficiencyPercent).toBe(50)
  })
})
