import { describe, it, expect } from 'vitest'
import { deviceReadingFromUltrasound } from '@/ultrasound'
import { deviceReadingFromUltrasound as canonical } from '@/medical/device'

describe('ultrasound — IS medical/device imaging facet', () => {
  it('re-exports capture from the registry', () => {
    const at = '2026-06-08T12:00:00.000Z'
    expect(deviceReadingFromUltrasound(4.5, at)).toEqual(canonical(4.5, at))
  })
})
