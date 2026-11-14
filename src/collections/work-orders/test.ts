/**
 * Workorders invariants — the data-verified laws of the etrima execution leaf,
 * pinned as pure unit tests (skill = test = script). Every case mirrors an
 * @invariant banner in the atom, grounded in the 2.05M-row audit.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @see src/work/orders/index.ts
 */
import { describe, it, expect } from 'vitest'
import type { CollectionAfterChangeHook, CollectionBeforeChangeHook } from 'payload'
import {
  deriveState,
  machinesPerWorker,
  pieceRateWage,
  pieceWage,
  minutesRemaining,
  assertTotalsBalance,
  inheritShiftEfficiency,
  inheritPhaseSort,
  forwardProducedToNextPhase,
  WORKORDER_RING,
  Workorders,
} from '@/collections/work-orders'
import { HORO_DIGITS } from '@/utilities/horo'

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

describe('pieceWage — the unrounded wage the shift rolls up (etrima rounds the SUM, not each order)', () => {
  it('keeps the fraction pieceRateWage rounds away', () => {
    // 7 · 13 · 9 / 3600 = 0.2275 → shown as 0.23 on the order, rolled up as 0.2275
    expect(pieceWage({ unitsProduced: 7, unitSeconds: 13, payPerHour: 9 })).toBeCloseTo(0.2275, 10)
    expect(pieceRateWage({ unitsProduced: 7, unitSeconds: 13, payPerHour: 9 })).toBe(0.23)
  })
  it('summing unrounded then rounding differs from summing cents', () => {
    const order = { unitsProduced: 7, unitSeconds: 13, payPerHour: 9 }
    const orders = [order, order, order, order]
    const sum = (f: (o: typeof order) => number) => orders.reduce((a, o) => a + f(o), 0)
    expect(Math.round(sum(pieceWage) * 100) / 100).toBe(0.91) // 4 · 0.2275 = 0.91
    expect(Math.round(sum(pieceRateWage) * 100) / 100).toBe(0.92) // 4 · 0.23 — a cent the shift never paid
  })
  it('is zero on the same guards as the rounded wage', () => {
    expect(pieceWage({ unitsProduced: 0, unitSeconds: 60, payPerHour: 12 })).toBe(0)
    expect(pieceWage({ unitsProduced: 100, unitSeconds: 60, payPerHour: null })).toBe(0)
  })
})

describe('unitsScrap — the scrap counter carried over from the former operation-runs', () => {
  it('is a recorded (not derived) non-negative header counter', () => {
    const field = Workorders.fields.find((f) => 'name' in f && f.name === 'unitsScrap') as { type?: string; min?: number; admin?: { readOnly?: boolean } }
    expect(field?.type).toBe('number')
    expect(field?.min).toBe(0)
    expect(field?.admin?.readOnly).toBeUndefined()
  })
  it('is not touched by the Σ-options balance (options carry no scrap line)', () => {
    const data = { options: [{ ordered: 5, produced: 4, backordered: 1 }], unitsScrap: 2 }
    balance(data)
    expect(data.unitsScrap).toBe(2)
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

describe('inheritPhaseSort — the order copies its routing position from the lot-work-phase', () => {
  const never = async () => { throw new Error('findByID should not be called') }
  const sortOf = (data: Record<string, unknown>, findByID: (a: { collection: string; id: unknown }) => Promise<unknown>) =>
    inheritPhaseSort({ data, req: { payload: { findByID } }, collection: undefined, context: {}, operation: 'create' } as unknown as HookArgs)

  it('reads sort off an already-populated lotWorkPhase (no fetch)', async () => {
    const data: Record<string, unknown> = { lotWorkPhase: { id: 'p1', sort: 7 } }
    await sortOf(data, never)
    expect(data.lotWorkPhaseSort).toBe(7)
  })
  it('fetches the step from lot-work-phases by id', async () => {
    const data: Record<string, unknown> = { lotWorkPhase: 'p1' }
    await sortOf(data, async ({ collection, id }) => (collection === 'lot-work-phases' && id === 'p1' ? { id, sort: 13 } : null))
    expect(data.lotWorkPhaseSort).toBe(13)
  })
  it('a sort of 0 is a real position, not "missing"', async () => {
    const data: Record<string, unknown> = { lotWorkPhase: { id: 'p0', sort: 0 }, lotWorkPhaseSort: 5 }
    await sortOf(data, never)
    expect(data.lotWorkPhaseSort).toBe(0)
  })
  it('is untouched without a step, and best-effort when the step is unreachable', async () => {
    const none: Record<string, unknown> = { lotWorkPhaseSort: 4 }
    await sortOf(none, never)
    expect(none.lotWorkPhaseSort).toBe(4)
    const down: Record<string, unknown> = { lotWorkPhase: 'p1', lotWorkPhaseSort: 4 }
    await sortOf(down, async () => { throw new Error('db down') })
    expect(down.lotWorkPhaseSort).toBe(4)
  })
})

describe('forwardProducedToNextPhase — the conveyor finds the next phase by the lotVariant relationship', () => {
  type AfterArgs = Parameters<CollectionAfterChangeHook>[0]
  const convey = async (doc: Record<string, unknown>, successor: Record<string, unknown> | null) => {
    const finds: Array<{ where?: unknown; sort?: unknown }> = []
    const updates: Array<{ id: unknown; data: Record<string, unknown> }> = []
    const payload = {
      find: async (args: { where?: unknown; sort?: unknown }) => { finds.push(args); return { docs: successor ? [successor] : [] } },
      update: async (args: { id: unknown; data: Record<string, unknown> }) => { updates.push(args); return {} },
    }
    await forwardProducedToNextPhase({ doc, req: { payload, context: {} }, collection: undefined, context: {}, operation: 'update' } as unknown as AfterArgs)
    return { finds, updates }
  }
  const done = { id: 'wo1', completedAt: '2026-01-01T00:00:00.000Z', lotWorkPhaseSort: 3, options: [{ label: 'M', ordered: 10, produced: 9, backordered: 1 }] }

  it('queries work-orders of the same variant (by id, populated or not) with a greater sort', async () => {
    for (const lotVariant of ['v1', { id: 'v1' }]) {
      const { finds } = await convey({ ...done, lotVariant }, null)
      expect(finds).toHaveLength(1)
      expect(finds[0]?.sort).toBe('lotWorkPhaseSort')
      expect(finds[0]?.where).toEqual({ and: [{ lotVariant: { equals: 'v1' } }, { lotWorkPhaseSort: { greater_than: 3 } }] })
    }
  })
  it('feeds the successor the produced units as its ordered, and links both ways', async () => {
    const { updates } = await convey({ ...done, lotVariant: 'v1' }, { id: 'wo2' })
    expect(updates.map((u) => u.id)).toEqual(['wo2', 'wo1'])
    expect(updates[0]?.data).toEqual({ options: [{ label: 'M', ordered: 10, produced: 0, backordered: 0 }], forwardedFrom: 'wo1' })
    expect(updates[1]?.data).toEqual({ forwardedTo: 'wo2' })
  })
  it('does nothing without a variant, before completion, or once already forwarded', async () => {
    expect((await convey({ ...done }, { id: 'wo2' })).finds).toHaveLength(0)
    expect((await convey({ ...done, lotVariant: 'v1', completedAt: null }, { id: 'wo2' })).finds).toHaveLength(0)
    expect((await convey({ ...done, lotVariant: 'v1', forwardedTo: 'wo9' }, { id: 'wo2' })).finds).toHaveLength(0)
  })
})
