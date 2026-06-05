/**
 * Workshifts invariants — the efficiency + wage AUTHORITY, pinned as pure unit
 * tests (skill = test = script). Each case mirrors an @invariant banner in the
 * atom, grounded in the 376,780-row etrima audit.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @see src/workshifts/index.ts
 */
import { describe, it, expect } from 'vitest'
import type { CollectionBeforeChangeHook } from 'payload'
import { computeShiftAuthority, requireWageToClose } from '@/workshifts'

type HookArgs = Parameters<CollectionBeforeChangeHook>[0]
const compute = (data: Record<string, unknown>) => {
  computeShiftAuthority({ data, req: {}, collection: undefined, context: {}, operation: 'create' } as unknown as HookArgs)
  return data
}
const close = (data: Record<string, unknown>) =>
  requireWageToClose({ data, req: {}, collection: undefined, context: {}, operation: 'update' } as unknown as HookArgs)

describe('computeShiftAuthority — minutesBackordered = max(0, ordered − produced)', () => {
  it('is the unfinished remainder (ordered = produced + backordered)', () => {
    expect(compute({ minutesOrdered: 480, minutesProduced: 300 }).minutesBackordered).toBe(180)
  })
  it('never goes negative (over-production clamps to 0)', () => {
    expect(compute({ minutesOrdered: 200, minutesProduced: 260 }).minutesBackordered).toBe(0)
  })
})

describe('computeShiftAuthority — efficiency = ⌊produced·100 / presence⌋ (INTEGER truncation)', () => {
  it('truncates, never rounds (the data-verified 99.35% rule)', () => {
    // 355·100/480 = 73.95… → 73 (truncated, not 74)
    expect(compute({ minutesProduced: 355, presenceMinutes: 480 }).efficiencyPercent).toBe(73)
  })
  it('admits the leverage tail above 100', () => {
    expect(compute({ minutesProduced: 800, presenceMinutes: 480 }).efficiencyPercent).toBe(166)
  })
  it('falls back to 100 when presence or produced is 0 (the production pile-up)', () => {
    expect(compute({ minutesProduced: 0, presenceMinutes: 480 }).efficiencyPercent).toBe(100)
    expect(compute({ minutesProduced: 300, presenceMinutes: 0 }).efficiencyPercent).toBe(100)
  })
})

describe('computeShiftAuthority — wage = max(time-pay, order-rollup), rounded 2dp', () => {
  it('takes the greater pole — time-clock pay when it wins', () => {
    // payPerHour 10 · shiftMinutes 480 / 60 = €80 ; orderWage €50 → €80
    expect(compute({ payPerHour: 10, shiftMinutes: 480, orderWage: 50 }).wage).toBe(80)
  })
  it('takes the piece rollup when it wins', () => {
    expect(compute({ payPerHour: 10, shiftMinutes: 480, orderWage: 123.45 }).wage).toBe(123.45)
  })
  it('rounds to two decimals', () => {
    // 7/h · 65min /60 = 7.5833… → 7.58
    expect(compute({ payPerHour: 7, shiftMinutes: 65, orderWage: 0 }).wage).toBe(7.58)
  })
})

describe('requireWageToClose — a labour-day closes only once reconciled into a wage', () => {
  it('rejects a close with no settled wage (the authority was bypassed)', () => {
    expect(() => close({ status: 'closed' })).toThrow(/closes only once reconciled into a wage/)
    expect(() => close({ status: 'closed', wage: null })).toThrow()
  })
  it('allows a close once a wage is settled', () => {
    expect(() => close({ status: 'closed', wage: 80 })).not.toThrow()
  })
  it('is silent on non-closing writes', () => {
    expect(() => close({ status: 'started' })).not.toThrow()
  })
})
