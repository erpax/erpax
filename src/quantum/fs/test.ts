/**
 * quantum/fs — snapshot never overwrite; dedup by content-uuid.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { snapshotAddress, dedupHolds, neverOverwrite } from '@/quantum/fs'

describe('quantum/fs — content-addressed filesystem', () => {
  it('same content ⇒ same snapshot address (merge dedup)', () => {
    const a = { file: 'x', v: 1 }
    expect(dedupHolds(a, a)).toBe(true)
    expect(dedupHolds(a, { file: 'y', v: 2 })).toBe(false)
  })

  it('neverOverwrite — mutation is a new address unless content identical', () => {
    const v1 = { n: 1 }
    const v2 = { n: 2 }
    expect(neverOverwrite(v1, v2)).toBe(true)
    expect(neverOverwrite(v1, v1)).toBe(true)
  })

  it('snapshotAddress is a content-uuid', () => {
    expect(snapshotAddress({ x: 1 })).toMatch(/^[0-9a-f-]{36}$/)
  })
})
