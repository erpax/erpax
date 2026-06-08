import { describe, it, expect } from 'vitest'
import { vitalDevices, deviceReadingFromBp } from '@/vital'
import { devicesInCategory } from '@/medical/device'
import { readingBoundaryHolds } from '@/readings'

describe('vital — IS medical/device vitals category', () => {
  it('lists seven vital modalities from the registry', () => {
    expect(vitalDevices()).toEqual(devicesInCategory('vitals'))
    expect(vitalDevices()).toHaveLength(7)
  })

  it('bp cuff capture crosses the device boundary', () => {
    expect(readingBoundaryHolds(deviceReadingFromBp(118, 76, '2026-06-08T12:00:00.000Z'))).toBe(true)
  })
})
