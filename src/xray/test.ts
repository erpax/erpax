import { describe, it, expect } from 'vitest'
import { deviceReadingFromXray } from '@/xray'
import { deviceReadingFromXray as canonical } from '@/medical/device'
import { readingBoundaryHolds } from '@/readings'

describe('xray — IS medical/device imaging facet', () => {
  it('re-exports capture from the registry', () => {
    const at = '2026-06-08T12:00:00.000Z'
    expect(deviceReadingFromXray(1.2, at)).toEqual(canonical(1.2, at))
    expect(readingBoundaryHolds(deviceReadingFromXray(1.2, at))).toBe(true)
  })
})
