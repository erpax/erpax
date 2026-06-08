import { describe, it, expect } from 'vitest'
import { deviceReadingFromBed } from '@/bed'
import { readingBoundaryHolds } from '@/readings'

describe('bed — IS medical/device hospital facet', () => {
  it('bed alarm capture crosses boundary', () => {
    expect(readingBoundaryHolds(deviceReadingFromBed(1, '2026-06-08T12:00:00.000Z'))).toBe(true)
  })
})
