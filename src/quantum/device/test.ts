/**
 * quantum/device — real sensing only; numbers cross, stream stays.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { mayReport, boundaryCrossHolds, readingSnapshotUuid, MEDICAL_SIGNALS } from '@/quantum/device'

describe('quantum/device — may only collapse what is physically real', () => {
  it('detectable signals pass; biofield is forbidden', () => {
    expect(mayReport('rppg')).toBe(true)
    expect(mayReport('hrv')).toBe(true)
    expect(mayReport('biofield')).toBe(false)
    expect(mayReport('phantom')).toBe(false)
  })

  it('medical hardware signals are detectable', () => {
    expect(MEDICAL_SIGNALS).toContain('pressure')
    expect(MEDICAL_SIGNALS).toContain('spo2')
    expect(mayReport('pressure')).toBe(true)
    expect(mayReport('xray')).toBe(true)
  })
})

describe('quantum/device — capture on edge, numbers only cross', () => {
  it('boundaryCrossHolds rejects raw stream leakage', () => {
    expect(boundaryCrossHolds({ numbers: [72, 68] })).toBe(true)
    expect(boundaryCrossHolds({ numbers: [1], rawStream: new Uint8Array([1]) })).toBe(false)
    expect(boundaryCrossHolds({ numbers: [] })).toBe(false)
  })

  it('readingSnapshotUuid is deterministic content-address', () => {
    const r = { bpm: 72, ts: '2026-06-08T12:00:00.000Z' }
    expect(readingSnapshotUuid(r)).toBe(readingSnapshotUuid(r))
    expect(readingSnapshotUuid(r)).toMatch(/^[0-9a-f-]{36}$/)
  })
})
