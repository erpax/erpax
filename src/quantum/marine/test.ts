import { describe, it, expect } from 'vitest'
import { zoneOf, jurisdiction, generalAverage, NM_TERRITORIAL, NM_CONTIGUOUS, NM_EEZ } from '@/quantum/marine'

describe('quantum/marine — the law of the sea, encoded in math', () => {
  it('distance from the baseline fixes the UNCLOS zone (geometry)', () => {
    expect(zoneOf(0)).toBe('territorial')
    expect(zoneOf(NM_TERRITORIAL)).toBe('territorial') // 12 nm inclusive
    expect(zoneOf(NM_TERRITORIAL + 1)).toBe('contiguous')
    expect(zoneOf(NM_CONTIGUOUS)).toBe('contiguous') // 24 nm
    expect(zoneOf(NM_CONTIGUOUS + 1)).toBe('eez')
    expect(zoneOf(NM_EEZ)).toBe('eez') // 200 nm
    expect(zoneOf(NM_EEZ + 1)).toBe('high-seas')
  })
  it('beyond all zones only the flag state governs (high seas → flag-state)', () => {
    expect(jurisdiction(zoneOf(6))).toBe('coastal-state')
    expect(jurisdiction(zoneOf(500))).toBe('flag-state')
  })
  it('general average shares the sacrifice in proportion to value, conserving the loss', () => {
    const ga = generalAverage(90, [300, 600])
    expect(ga).toEqual([30, 60])
    expect(ga.reduce((a, b) => a + b, 0)).toBe(90) // Σ contributions = the loss (double-entry)
    expect(generalAverage(50, [0, 0])).toEqual([0, 0]) // no value at risk → no contribution
  })
})
