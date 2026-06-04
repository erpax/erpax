/**
 * Pack Items invariants — the pack line's laws, pinned as pure unit tests
 * (skill = test = script), grounded in the 200,993-row etrima audit.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @see src/packitems/index.ts
 */
import { describe, it, expect } from 'vitest'
import type { CollectionBeforeChangeHook } from 'payload'
import { rollUpOptions } from '@/packitems'

type HookArgs = Parameters<CollectionBeforeChangeHook>[0]
const roll = (data: Record<string, unknown>) => {
  rollUpOptions({ data, req: {}, collection: undefined, context: {}, operation: 'create' } as unknown as HookArgs)
  return data
}

describe('rollUpOptions — header = Σ options WHEN options supplied (else header stands)', () => {
  it('recomputes the header from options when the breakdown is present (the 0.17% case)', () => {
    const d = roll({
      options: [
        { label: 'A', ordered: 30, packed: 20 },
        { label: 'B', ordered: 12, packed: 12 },
      ],
      unitsOrdered: 999, unitsPacked: 999, // stale; must be overwritten from options
    })
    expect(d.unitsOrdered).toBe(42)
    expect(d.unitsPacked).toBe(32)
  })
  it('leaves the recorded header alone when no options (the 99.92% header-only case)', () => {
    const d = roll({ unitsOrdered: 50, unitsPacked: 48 })
    expect(d.unitsOrdered).toBe(50)
    expect(d.unitsPacked).toBe(48)
  })
})

describe('rollUpOptions — unitsBackordered = max(0, ordered − packed)', () => {
  it('is the unpacked remainder', () => {
    expect(roll({ unitsOrdered: 50, unitsPacked: 48 }).unitsBackordered).toBe(2)
  })
  it('never goes negative (over-pack clamps to 0)', () => {
    expect(roll({ unitsOrdered: 50, unitsPacked: 60 }).unitsBackordered).toBe(0)
  })
  it('derives from the option-summed header too', () => {
    const d = roll({ options: [{ ordered: 30, packed: 20 }], unitsOrdered: 0, unitsPacked: 0 })
    expect(d.unitsBackordered).toBe(10)
  })
})
