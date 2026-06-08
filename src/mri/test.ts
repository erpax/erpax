import { describe, it, expect } from 'vitest'
import { deviceReadingFromMri } from '@/mri'
import { deviceReadingFromMri as canonical } from '@/medical/device'

describe('mri — IS medical/device imaging facet', () => {
  it('re-exports capture from the registry', () => {
    const at = '2026-06-08T12:00:00.000Z'
    expect(deviceReadingFromMri(0.8, at)).toEqual(canonical(0.8, at))
  })
})
