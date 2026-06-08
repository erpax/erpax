import { describe, it, expect } from 'vitest'
import { deviceReadingFromAnesthesia } from '@/anesthesia'
import { observationsFromMedicalDevice } from '@/medical/device'

describe('anesthesia — IS medical/device surgical facet', () => {
  it('maps FiO2 and MAP to LOINC observations', () => {
    const at = '2026-06-08T12:00:00.000Z'
    const reading = deviceReadingFromAnesthesia(40, 85, at)
    const obs = observationsFromMedicalDevice('anesthesia', reading)
    expect(obs.map((o) => o.code).sort()).toEqual(['3150-0', '8478-0'])
  })
})
