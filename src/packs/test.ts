/**
 * Packs invariants — the dispatch carton's laws, pinned as pure unit tests
 * (skill = test = script), grounded in the 118,716-row etrima audit.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @see src/packs/index.ts
 */
import { describe, it, expect } from 'vitest'
import type { CollectionBeforeChangeHook } from 'payload'
import { derivePackState, balanceWeight, PACK_RING } from '@/packs'
import { HORO_DIGITS } from '@/horo'

type HookArgs = Parameters<CollectionBeforeChangeHook>[0]
const weigh = (data: Record<string, unknown>) => {
  balanceWeight({ data, req: {}, collection: undefined, context: {}, operation: 'create' } as unknown as HookArgs)
  return data
}

describe('PACK_RING — the packing lifecycle', () => {
  it('walks the seven-position horo ring (1·2·4·8·7·5·9)', () => {
    expect(PACK_RING.map((s) => s.step)).toEqual([...HORO_DIGITS])
  })
})

describe('derivePackState — derived, never stored', () => {
  it('seals take precedence: closed ≻ delivered ≻ shipped', () => {
    expect(derivePackState({ closedAt: 'x', deliveredAt: 'y', shippedAt: 'z' })).toBe('closed')
    expect(derivePackState({ deliveredAt: 'y', shippedAt: 'z' })).toBe('delivered')
    expect(derivePackState({ shippedAt: 'z' })).toBe('shipped')
  })
  it('open when nothing packed', () => {
    expect(derivePackState({ unitsPacked: 0 })).toBe('open')
  })
  it('packing when partially packed', () => {
    expect(derivePackState({ unitsOrdered: 100, unitsPacked: 40 })).toBe('packing')
  })
  it('packed when full but not yet weighed', () => {
    expect(derivePackState({ unitsOrdered: 100, unitsPacked: 100 })).toBe('packed')
  })
  it('weighed when full and gross weight sealed', () => {
    expect(derivePackState({ unitsOrdered: 100, unitsPacked: 100, grossWeight: 12.5 })).toBe('weighed')
  })
})

describe('balanceWeight — grossWeight = netWeight + tareWeight (mass balance)', () => {
  it('derives gross from net + tare when both given', () => {
    expect(weigh({ netWeight: 10, tareWeight: 1.5, grossWeight: 999 }).grossWeight).toBe(11.5)
  })
  it('leaves a standalone gross reading untouched (only net or only gross)', () => {
    expect(weigh({ grossWeight: 12 }).grossWeight).toBe(12)
    expect(weigh({ netWeight: 10 }).grossWeight).toBeUndefined()
  })
  it('rounds to the gram (3 dp kg)', () => {
    expect(weigh({ netWeight: 1.0005, tareWeight: 0.0009 }).grossWeight).toBe(1.001)
  })
})
