/**
 * readings — device-collapsed snapshots feeding the analog stream.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { readingBoundaryHolds, readingUuid } from '@/readings'

describe('readings — device boundary', () => {
  it('readingBoundaryHolds accepts lawful collapsed captures', () => {
    expect(readingBoundaryHolds({ signal: 'rppg', numbers: [72], at: '2026-06-08T12:00:00.000Z' })).toBe(true)
  })

  it('readingBoundaryHolds rejects biofield and raw stream leakage', () => {
    expect(readingBoundaryHolds({ signal: 'biofield', numbers: [1], at: 'T' })).toBe(false)
    expect(
      readingBoundaryHolds({
        signal: 'rppg',
        numbers: [1],
        at: 'T',
        rawStream: new Uint8Array([1]),
      }),
    ).toBe(false)
  })

  it('readingUuid is deterministic content-address', () => {
    const r = { signal: 'hrv', numbers: [42], at: '2026-06-08T12:00:00.000Z' }
    expect(readingUuid(r)).toBe(readingUuid(r))
    expect(readingUuid(r)).toMatch(/^[0-9a-f-]{36}$/)
  })
})
