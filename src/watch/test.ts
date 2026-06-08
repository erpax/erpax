import { describe, it, expect } from 'vitest'
import { deviceReadingFromWatch } from '@/watch'
import { deviceReadingFromWatch as canonical } from '@/medical/device'

describe('watch — IS medical/device wearable facet', () => {
  it('re-exports smartwatch HR capture', () => {
    const at = '2026-06-08T12:00:00.000Z'
    expect(deviceReadingFromWatch(74, at)).toEqual(canonical(74, at))
  })
})
